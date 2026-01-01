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
  serverTimestamp,
  writeBatch,
  getDoc,
  setDoc
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
  folder_path?: string[]; // Array of folder names representing the path
  is_favorite?: boolean;
  original_title?: string;
}

export interface Folder {
  id: string;
  name: string;
  path: string[]; // Full path to the folder
  user_id: string;
  created_at: any;
  updated_at: any;
}

/**
 * Ensures that all folders in the given path exist, creating them if necessary
 */
async function ensureFolderPathExists(folderPath: string[], userId: string): Promise<void> {
  if (!folderPath || folderPath.length === 0) return;

  const batch = writeBatch(db);
  let currentPath: string[] = [];
  
  for (const folderName of folderPath) {
    currentPath = [...currentPath, folderName];
    const folderId = currentPath.join('/');
    const folderRef = doc(db, 'folders', folderId);
    
    // Check if folder exists
    const folderDoc = await getDoc(folderRef);
    
    if (!folderDoc.exists()) {
      // Create the folder if it doesn't exist
      batch.set(folderRef, {
        name: folderName,
        path: [...currentPath],
        user_id: userId,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
    }
  }
  
  // Commit all folder creations in a single batch
  if (batch._mutations.length > 0) {
    await batch.commit();
  }
}

export async function saveSnippet(
  title: string,
  code: string,
  language: string,
  folderPath: string[] = []
): Promise<Snippet | null> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    // Add a timestamp to the title if a snippet with the same name exists in the same folder
    const queryConstraints = [
      where('user_id', '==', user.uid),
      where('title', '==', title),
      where('folder_path', '==', folderPath)
    ];
    
    const existingSnippets = await getDocs(
      query(collection(db, 'snippets'), ...queryConstraints)
    );
    
    let finalTitle = title;
    if (!existingSnippets.empty) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      finalTitle = `${title} (${timestamp})`;
    }

    // If folder path is provided, ensure the folder exists
    if (folderPath && folderPath.length > 0) {
      await ensureFolderPathExists(folderPath, user.uid);
    }

    const docRef = await addDoc(collection(db, 'snippets'), {
      title: finalTitle,
      code,
      language,
      user_id: user.uid,
      folder: folderPath.length > 0 ? folderPath[folderPath.length - 1] : null,
      folder_path: folderPath,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      original_title: title,
    });

    return {
      id: docRef.id,
      title: finalTitle,
      code,
      language,
      folder: folderPath.length > 0 ? folderPath[folderPath.length - 1] : undefined,
      folder_path: folderPath.length > 0 ? folderPath : undefined,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: user.uid,
      original_title: title,
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
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User not authenticated');
  }

  try {
    const snippetRef = doc(db, 'snippets', id);
    // First, get the snippet to verify ownership
    const snippetDoc = await getDoc(snippetRef);
    
    if (!snippetDoc.exists()) {
      throw new Error('Snippet not found');
    }

    const snippetData = snippetDoc.data();
    
    // Verify the current user is the owner of the snippet
    if (snippetData.user_id !== user.uid) {
      throw new Error('You do not have permission to delete this snippet');
    }

    // If we get here, the user is authenticated and owns the snippet
    await deleteDoc(snippetRef);
  } catch (error) {
    console.error('Error deleting snippet:', error);
    throw error;
  }
}
