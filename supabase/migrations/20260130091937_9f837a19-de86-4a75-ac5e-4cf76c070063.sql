-- Create a storage bucket for tag images and mockups
INSERT INTO storage.buckets (id, name, public)
VALUES ('tag-images', 'tag-images', true);

-- Allow public read access to tag images
CREATE POLICY "Public read access for tag images"
ON storage.objects FOR SELECT
USING (bucket_id = 'tag-images');

-- Allow public upload to tag images (for the order form)
CREATE POLICY "Public upload access for tag images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tag-images');

-- Allow public update for tag images
CREATE POLICY "Public update access for tag images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'tag-images');