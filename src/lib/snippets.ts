import { db, auth } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  deleteDoc, 
  query, 
  where, 
  serverTimestamp, 
  writeBatch, 
  getDoc 
} from 'firebase/firestore';

export interface Snippet {
  id: string;
  title: string;
  code: string;
  content?: string;
  language: string;
  created_at?: any;
  updated_at?: any;
  createdAt?: any;
  updatedAt?: any;
  user_id?: string;
  userId?: string;
  tags?: string[];
  folder?: string;
  folder_path?: string[];
  is_favorite?: boolean;
  original_title?: string;
}

export interface Folder {
  id: string;
  name: string;
  path: string[];
  user_id: string;
  userId?: string;
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
      batch.set(folderRef, {
        name: folderName,
        path: [...currentPath],
        user_id: userId,
        userId: userId,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  }
  
  await batch.commit();
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
    // Check existing snippets in memory to avoid needing composite indexes in Firestore
    const userSnippetsQuery = query(
      collection(db, 'snippets'),
      where('userId', '==', user.uid)
    );
    const existingSnap = await getDocs(userSnippetsQuery);
    const hasDuplicate = existingSnap.docs.some(d => {
      const data = d.data();
      const sameTitle = data.title === title;
      const sameFolder = JSON.stringify(data.folder_path || []) === JSON.stringify(folderPath);
      return sameTitle && sameFolder;
    });

    let finalTitle = title;
    if (hasDuplicate) {
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
      content: code,
      language,
      userId: user.uid,
      user_id: user.uid,
      folder: folderPath.length > 0 ? folderPath[folderPath.length - 1] : null,
      folder_path: folderPath,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      original_title: title,
    });

    return {
      id: docRef.id,
      title: finalTitle,
      code,
      content: code,
      language,
      folder: folderPath.length > 0 ? folderPath[folderPath.length - 1] : undefined,
      folder_path: folderPath.length > 0 ? folderPath : undefined,
      created_at: new Date(),
      updated_at: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.uid,
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
        content: snippet.code,
        language: snippet.language,
        updated_at: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        ...snippet,
        content: snippet.code,
        updated_at: new Date(),
        updatedAt: new Date(),
      } as Snippet;
    } else {
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
    // Query without orderBy to avoid needing a Firestore composite index
    const q1 = query(
      collection(db, 'snippets'),
      where('userId', '==', user.uid)
    );
    const snap1 = await getDocs(q1);

    const q2 = query(
      collection(db, 'snippets'),
      where('user_id', '==', user.uid)
    );
    const snap2 = await getDocs(q2);

    const docMap = new Map<string, any>();
    snap1.docs.forEach(d => docMap.set(d.id, { id: d.id, ...d.data() }));
    snap2.docs.forEach(d => docMap.set(d.id, { id: d.id, ...d.data() }));

    const snippets = Array.from(docMap.values()).map(data => ({
      ...data,
      code: data.code || data.content || '',
      content: data.content || data.code || '',
    }));

    // Client-side sort descending by updatedAt / createdAt
    snippets.sort((a, b) => {
      const aTime = a.updatedAt?.toMillis?.() || a.updated_at?.toMillis?.() || a.createdAt?.toMillis?.() || 0;
      const bTime = b.updatedAt?.toMillis?.() || b.updated_at?.toMillis?.() || b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });

    return snippets as Snippet[];
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
    const snippetDoc = await getDoc(snippetRef);
    
    if (!snippetDoc.exists()) {
      throw new Error('Snippet not found');
    }

    const snippetData = snippetDoc.data();
    const ownerId = snippetData.userId || snippetData.user_id;
    if (ownerId !== user.uid) {
      throw new Error('You do not have permission to delete this snippet');
    }

    await deleteDoc(snippetRef);
  } catch (error) {
    console.error('Error deleting snippet:', error);
    throw error;
  }
}
