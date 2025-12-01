-- Add user_id column to snippets table
ALTER TABLE public.snippets 
ADD COLUMN user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view snippets" ON public.snippets;
DROP POLICY IF EXISTS "Anyone can create snippets" ON public.snippets;
DROP POLICY IF EXISTS "Anyone can update snippets" ON public.snippets;
DROP POLICY IF EXISTS "Anyone can delete snippets" ON public.snippets;

-- Create new policies
CREATE POLICY "Users can view their own snippets" 
ON public.snippets 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own snippets" 
ON public.snippets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own snippets" 
ON public.snippets 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own snippets" 
ON public.snippets 
FOR DELETE 
USING (auth.uid() = user_id);
