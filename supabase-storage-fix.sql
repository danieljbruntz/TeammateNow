-- First, drop the existing policies that are too restrictive
drop policy if exists "Users can upload their own avatar" on storage.objects;
drop policy if exists "Users can update their own avatar" on storage.objects;
drop policy if exists "Anyone can view avatars" on storage.objects;

-- Create new policies that work with our upload pattern
-- Allow users to upload files named with their user ID
create policy "Users can upload their own avatar" on storage.objects
  for insert with check (
    bucket_id = 'avatars' 
    AND auth.uid()::text = split_part(name, '.', 1)
  );

-- Allow users to update files named with their user ID  
create policy "Users can update their own avatar" on storage.objects
  for update using (
    bucket_id = 'avatars' 
    AND auth.uid()::text = split_part(name, '.', 1)
  );

-- Allow users to delete their own avatar files
create policy "Users can delete their own avatar" on storage.objects
  for delete using (
    bucket_id = 'avatars' 
    AND auth.uid()::text = split_part(name, '.', 1)
  );

-- Allow public read access to all avatars
create policy "Anyone can view avatars" on storage.objects
  for select using (bucket_id = 'avatars'); 