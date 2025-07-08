-- Drop all existing policies on storage.objects for avatars bucket
drop policy if exists "Users can upload their own avatar" on storage.objects;
drop policy if exists "Users can update their own avatar" on storage.objects;
drop policy if exists "Users can delete their own avatar" on storage.objects;
drop policy if exists "Anyone can view avatars" on storage.objects;

-- Create simple policies that definitely work
-- Allow any authenticated user to insert into avatars bucket
create policy "Authenticated users can upload avatars" on storage.objects
  for insert with check (
    bucket_id = 'avatars' AND auth.role() = 'authenticated'
  );

-- Allow any authenticated user to update in avatars bucket
create policy "Authenticated users can update avatars" on storage.objects
  for update using (
    bucket_id = 'avatars' AND auth.role() = 'authenticated'
  );

-- Allow any authenticated user to delete from avatars bucket
create policy "Authenticated users can delete avatars" on storage.objects
  for delete using (
    bucket_id = 'avatars' AND auth.role() = 'authenticated'
  );

-- Allow anyone to view avatars (public read)
create policy "Anyone can view avatars" on storage.objects
  for select using (bucket_id = 'avatars'); 