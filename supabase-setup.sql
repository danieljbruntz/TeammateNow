-- Create storage bucket for avatars
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

-- Create policy to allow authenticated users to upload their own avatars
create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create policy to allow authenticated users to update their own avatars
create policy "Users can update their own avatar"
  on storage.objects for update
  using (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create policy to allow public access to view avatars
create policy "Anyone can view avatars"
  on storage.objects for select
  using (bucket_id = 'avatars'); 