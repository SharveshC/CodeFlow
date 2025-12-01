import { db, auth } from '@/integrations/firebase/client';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';

export interface Snippet {
  id: string;
  title: string;
  code: string;
  language: string;
  created_at: any; // Firestore timestamp
  updated_at: any; // Firestore timestamp
  user_id?: string;
  tags?: string[];
  folder?: string;
  is_favorite?: boolean;
}

export async function saveSnippet(
  title: string,
  code: string,
  language: string
): Promise<Snippet | null> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    const docRef = await addDoc(collection(db, 'snippets'), {
      title,
      code,
      language,
      user_id: user.uid,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });

    return {
      id: docRef.id,
      title,
      code,
      language,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: user.uid,
    };
  } catch (error) {
    console.error('Error saving snippet:', error);
    throw error;
  }
}

export async function upsertSnippet(
  snippet: Partial<Snippet> & { title: string; code: string; language: string }
): Promise<Snippet | null> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    if (snippet.id) {
      const snippetRef = doc(db, 'snippets', snippet.id);
      await updateDoc(snippetRef, {
        title: snippet.title,
        code: snippet.code,
        language: snippet.language,
        updated_at: serverTimestamp(),
      });

      // Return the updated snippet (we don't have the full document here)
      return {
        ...snippet,
        updated_at: new Date(),
      } as Snippet;
    } else {
      // Create new snippet
      return saveSnippet(snippet.title, snippet.code, snippet.language);
    }
  } catch (error) {
    console.error('Error upserting snippet:', error);
    throw error;
  }
}

export async function getAllSnippets(): Promise<Snippet[]> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    const q = query(
      collection(db, 'snippets'),
      where('user_id', '==', user.uid),
      orderBy('created_at', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Snippet[];
  } catch (error) {
    console.error('Error fetching snippets:', error);
    throw error;
  }
}

export async function deleteSnippet(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'snippets', id));
  } catch (error) {
    console.error('Error deleting snippet:', error);
    throw error;
  }
}
