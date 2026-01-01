import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { Mail, Lock, Loader2 } from 'lucide-react';

interface CustomError extends Error {
  code?: string;
}
import { useToast } from './ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';

type AuthMode = 'signin' | 'signup';

interface AuthModalProps {
  mode?: AuthMode;
  onClose: () => void;
}

export function Auth() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Successfully signed out',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: 'Error signing out',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  if (currentUser) {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            setAuthMode('signin');
            setShowAuthModal(true);
          }}
          className="hidden sm:inline-flex"
        >
          Log In
        </Button>
        <Button 
          size="sm" 
          onClick={() => {
            setAuthMode('signup');
            setShowAuthModal(true);
          }}
          className="hidden sm:inline-flex"
        >
          Sign Up
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="sm:hidden"
          onClick={() => {
            setAuthMode('signin');
            setShowAuthModal(true);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Button>
      </div>
      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}

export function AuthModal({ 
  mode: initialMode = 'signin',
  onClose 
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const auth = getAuth();

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let errorMessage = 'An error occurred during sign up. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already in use. Please use a different email or sign in instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters long.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.';
          break;
      }
      
      const errorWithCustomMessage = new Error(errorMessage) as CustomError;
      errorWithCustomMessage.code = error.code;
      throw errorWithCustomMessage;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    try {
      setLoading(true);
      if (mode === 'signup') {
        await signup(email, password, fullName);
        toast({
          title: 'Account created successfully!',
          description: 'You can now sign in with your credentials.',
          variant: 'default',
        });
      } else {
        await login(email, password);
        toast({
          title: 'Successfully signed in!',
          variant: 'default',
        });
        onClose();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      toast({
        title: 'Successfully signed in with Google!',
        variant: 'default',
      });
      onClose();
    } catch (error: any) {
      toast({
        title: 'Error signing in with Google',
        description: error.message || 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address first',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/update-password`,
      });
      
      toast({
        title: 'Check your email',
        description: "We've sent a password reset link to your email",
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send reset email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start pt-20 justify-center z-50 p-4">
      <div className="bg-background border border-border/50 rounded-xl w-full max-w-md overflow-hidden shadow-2xl mt-8">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-muted-foreground">
              {mode === 'signin' 
                ? 'Enter your credentials to access your account' 
                : 'Create an account to get started'}
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-foreground/90">
                Email address
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 text-foreground/90 bg-background/50 hover:bg-background/70 focus:bg-background transition-colors"
                  disabled={loading}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-foreground/90">
                  Password
                </Label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    onClick={handleForgotPassword}
                    disabled={loading}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder={mode === 'signin' ? '••••••••' : 'At least 6 characters'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 text-foreground/90 bg-background/50 hover:bg-background/70 focus:bg-background transition-colors"
                  disabled={loading}
                  required
                  minLength={mode === 'signup' ? 6 : undefined}
                />
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-11 text-base font-medium rounded-lg bg-primary hover:bg-primary/90 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground pt-2">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button 
              type="button" 
              onClick={toggleMode}
              className="font-medium text-primary hover:text-primary/80 transition-colors"
              disabled={loading}
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}