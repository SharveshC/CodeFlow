-- Add tags and folder support to snippets
ALTER TABLE public.snippets 
ADD COLUMN tags TEXT[] DEFAULT '{}',
ADD COLUMN folder TEXT DEFAULT 'default',
ADD COLUMN is_favorite BOOLEAN DEFAULT false;

-- Create index for better search performance
CREATE INDEX IF NOT EXISTS idx_snippets_user_id ON public.snippets(user_id);
CREATE INDEX IF NOT EXISTS idx_snippets_folder ON public.snippets(folder);
CREATE INDEX IF NOT EXISTS idx_snippets_tags ON public.snippets USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_snippets_favorite ON public.snippets(user_id, is_favorite) WHERE is_favorite = true;

-- Create folders table for organizing snippets
CREATE TABLE IF NOT EXISTS public.snippet_folders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  color TEXT DEFAULT '#6366f1',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, name)
);

-- Enable RLS on folders
ALTER TABLE public.snippet_folders ENABLE ROW LEVEL SECURITY;

-- Create policies for folders
CREATE POLICY "Users can view their own folders" 
ON public.snippet_folders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own folders" 
ON public.snippet_folders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own folders" 
ON public.snippet_folders 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own folders" 
ON public.snippet_folders 
FOR DELETE 
USING (auth.uid() = user_id);
