-- Delete all snippets that don't have a user_id (orphaned snippets)
DELETE FROM public.snippets 
WHERE user_id IS NULL;
