alter table public.page_views
  add column if not exists city text,
  add column if not exists region text,
  add column if not exists browser text,
  add column if not exists os text,
  add column if not exists language text,
  add column if not exists screen_size text,
  add column if not exists timezone text;

drop policy if exists "anyone can insert page views" on public.page_views;
create policy "anyone can insert page views"
on public.page_views for insert
to anon, authenticated
with check (
  path is not null
  and length(path) between 1 and 2048
  and (referrer is null or length(referrer) <= 2048)
  and (device is null or length(device) <= 64)
  and (country is null or length(country) <= 128)
  and (visitor_hash is null or length(visitor_hash) <= 128)
  and (city is null or length(city) <= 128)
  and (region is null or length(region) <= 128)
  and (browser is null or length(browser) <= 64)
  and (os is null or length(os) <= 64)
  and (language is null or length(language) <= 32)
  and (screen_size is null or length(screen_size) <= 32)
  and (timezone is null or length(timezone) <= 64)
);