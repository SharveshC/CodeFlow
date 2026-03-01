import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Dynamic Firebase configuration based on deployment environment
const getFirebaseConfig = () => {
  const isVercel = import.meta.env.VITE_DEPLOYMENT_PLATFORM === 'vercel';
  
  if (isVercel) {
    // Vercel deployment - use environment variables or defaults
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyA6SFCk7RCJXni_Ve7KS0gt_BusgQ6BTTU',
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-vercel-app.vercel.app',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'codeflow-306fc',
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'codeflow-306fc.appspot.com',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '89644078286',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:89644078286:web:821870866b0cb4c8bbec9f',
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };
  }
  
  // Default Firebase configuration (for local development)
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };
};

// Initialize Firebase
const app = initializeApp(getFirebaseConfig());
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
