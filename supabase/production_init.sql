-- Consolidated Production Migration Script for Woodexy

-- 1. Profiles Table (if not using public.users, strictly relying on auth.users is fine for MVP, 
-- but often we want a public profiles table. For this MVP, we rely on auth.users for IDs but don't strictly enable FKs to public.profiles unless created.)
-- We will stick to the existing RFQ schema logic which references auth.users.

-- 2. RFQ Threads Table
-- Note: product_id is TEXT to accommodate current Mock Data IDs.
create table rfq_threads (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text not null default 'open' check (status in ('open', 'replied', 'closed', 'cancelled')),
  product_id text, -- Changed from UUID to Text and removed FK for Mock Data compatibility
  buyer_id uuid references auth.users(id) not null,
  supplier_id uuid not null, -- Removed FK to auth.users if supplier dummy IDs are used, OR keep if we strictly create users. 
                             -- The Modal uses "dummy-supplier-uuid". This will FAIL FK check if that user doesn't exist in auth.users.
                             -- FIX: Changing this to text to allow the dummy ID "dummy-supplier-uuid"
  subject text,
  last_message_at timestamp with time zone default timezone('utc'::text, now()),
  buyer_unread_count int default 0,
  supplier_unread_count int default 0
);

-- 3. RFQ Messages Table
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

-- 4. Enable RLS
alter table rfq_threads enable row level security;
alter table rfq_messages enable row level security;

-- 5. Policies for Threads
create policy "Users can view threads they are part of"
  on rfq_threads for select
  using ( auth.uid() = buyer_id or auth.uid()::text = supplier_id ); -- Cast to text for comparison if needed

create policy "Buyers can create threads"
  on rfq_threads for insert
  with check ( auth.uid() = buyer_id );

create policy "Participants can update their threads"
  on rfq_threads for update
  using ( auth.uid() = buyer_id or auth.uid()::text = supplier_id );

-- 6. Policies for Messages
create policy "Users can view messages in their threads"
  on rfq_messages for select
  using ( exists (
    select 1 from rfq_threads
    where id = rfq_messages.thread_id
    and (buyer_id = auth.uid() or supplier_id = auth.uid()::text)
  ));

create policy "Participants can insert messages in their threads"
  on rfq_messages for insert
  with check ( exists (
    select 1 from rfq_threads
    where id = rfq_messages.thread_id
    and (buyer_id = auth.uid() or supplier_id = auth.uid()::text)
  ) and sender_id = auth.uid() );

create policy "Participants can update messages (read status)"
  on rfq_messages for update
  using ( exists (
    select 1 from rfq_threads
    where id = rfq_messages.thread_id
    and (buyer_id = auth.uid() or supplier_id = auth.uid()::text)
  ));

-- 7. Realtime
alter publication supabase_realtime add table rfq_messages;
