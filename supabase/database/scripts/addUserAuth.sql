-- inserts a row into public.profiles
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public."Users" (id, email, "firstName", "lastName")
  values (new.id, new.email, new.raw_user_meta_data ->> 'firstName', new.raw_user_meta_data ->> 'lastName');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();