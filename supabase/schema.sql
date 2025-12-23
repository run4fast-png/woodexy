-- Create Products Table
create table products (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  species text not null,
  grade text,
  country text not null,
  price numeric not null,
  unit text not null default 'm3',
  certifications text[] default '{}',
  specifications jsonb default '{}',
  description text,
  images text[] default '{}',
  in_stock boolean default true,
  supplier_id uuid references auth.users(id)
);

-- Enable RLS
alter table products enable row level security;

-- Policies
create policy "Public products are viewable by everyone."
  on products for select
  using ( true );

create policy "Suppliers can insert their own products."
  on products for insert
  with check ( auth.uid() = supplier_id );

-- Create Indexes for Filtering
create index products_species_idx on products (species);
create index products_country_idx on products (country);
create index products_price_idx on products (price);
