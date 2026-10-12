create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create table public.officers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  category text not null default 'section',
  ig_handle text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
grant select on public.officers to anon;
grant select, insert, update, delete on public.officers to authenticated;
grant all on public.officers to service_role;
alter table public.officers enable row level security;
create policy "Anyone can view officers" on public.officers for select to anon, authenticated using (true);
create policy "Admins insert officers" on public.officers for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update officers" on public.officers for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete officers" on public.officers for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

insert into public.officers (name, role, category, ig_handle, sort_order) values
('Fadhil Dwi Nugroho','Ketua Kelas','lead','dfadhil14',0),
('Akbar Ramadhan Yasid','Wakil Ketua','vice','akbarramadhanyasid',1),
('Adinda Nabila P.S','Sekretaris 1','secretary','0nyndaa_',2),
('Navissa Naora Nadzillin','Sekretaris 2','secretary','navissa_naura',3),
('Satria Moreno Prasetya','Bendahara 1','treasurer','morenrenno',4),
('Navisya Salfa Saifunisa','Bendahara 2','treasurer','napiezzz',5),
('Audy Valencia','Sie Kebersihan 1','section','ccciaaw_',6),
('Galih Ajeng Ayuningtyas','Sie Kebersihan 2','section','xxaj3ngqq._',7);