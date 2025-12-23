-- Create RFQ Threads Table
create table rfq_threads (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text not null default 'open' check (status in ('open', 'replied', 'closed', 'cancelled')),
  product_id uuid references products(id),
  buyer_id uuid references auth.users(id) not null,
  supplier_id uuid references auth.users(id) not null,
  subject text,
  last_message_at timestamp with time zone default timezone('utc'::text, now()),
  buyer_unread_count int default 0,
  supplier_unread_count int default 0
);

-- Create RFQ Messages Table
create table rfq_messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  thread_id uuid references rfq_threads(id) on delete cascade not null,
  sender_id uuid references auth.users(id) not null,
  message text not null,
  attachments jsonb,
  meta jsonb,
  read_at timestamp with time zone
);

-- Enable RLS
alter table rfq_threads enable row level security;
alter table rfq_messages enable row level security;

-- Policies for Threads
create policy "Users can view threads they are part of"
  on rfq_threads for select
  using ( auth.uid() = buyer_id or auth.uid() = supplier_id );

create policy "Buyers can create threads"
  on rfq_threads for insert
  with check ( auth.uid() = buyer_id );

create policy "Participants can update their threads"
  on rfq_threads for update
  using ( auth.uid() = buyer_id or auth.uid() = supplier_id );

-- Policies for Messages
create policy "Users can view messages in their threads"
  on rfq_messages for select
  using ( exists (
    select 1 from rfq_threads
    where id = rfq_messages.thread_id
    and (buyer_id = auth.uid() or supplier_id = auth.uid())
  ));

create policy "Participants can insert messages in their threads"
  on rfq_messages for insert
  with check ( exists (
    select 1 from rfq_threads
    where id = rfq_messages.thread_id
    and (buyer_id = auth.uid() or supplier_id = auth.uid())
  ) and sender_id = auth.uid() );

create policy "Participants can update messages (read status)"
  on rfq_messages for update
  using ( exists (
    select 1 from rfq_threads
    where id = rfq_messages.thread_id
    and (buyer_id = auth.uid() or supplier_id = auth.uid())
  ));

-- Realtime
alter publication supabase_realtime add table rfq_messages;
