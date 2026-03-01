# 🚀 CodeFlow

**CodeFlow** is a modern, cloud-based code editor and AI-powered coding assistant that allows developers to write, execute, and save code snippets. Built with React, TypeScript, and deployed on Vercel with Firebase Authentication, CodeFlow provides a seamless coding experience with AI assistance and secure user management.

![CodeFlow Banner](https://img.shields.io/badge/CodeFlow-AI%20Code%20Editor-blue?style=for-the-badge&logo=react)

## ✨ Features

### 🎯 Core Features
- **AI-Powered Coding Assistant**: Get real-time code suggestions and completions
- **Monaco Editor**: The same editor that powers VS Code
- **Real-time Execution**: Run code directly in browser using Judge0 API
- **Cloud Storage**: Save and manage your code snippets securely
- **Theme Support**: Light and dark themes with system preference detection

### 💾 Snippet Management
- **Save & Organize**: Save and manage your code snippets with folder support
- **Folder Organization**: Create nested folder structures for better organization
- **Duplicate Handling**: Automatically appends timestamps to duplicate snippet names
- **User-Specific Storage**: Each user's snippets are private and secure
- **Delete Protection**: Confirmation dialog before deleting snippets with ownership verification

### 🎨 Editor Features
- **Monaco Editor**: Full-featured code editor with IntelliSense
- **Syntax Highlighting**: Beautiful syntax highlighting for multiple languages
- **Theme Options**: Light and dark themes with system preference detection
- **Line Numbers**: Toggle line numbers on/off

### 🔐 Authentication
- **Firebase Authentication**: Secure user authentication with enhanced error handling
- **Email/Password**: Traditional email and password authentication
- **Google Sign-in**: One-click Google authentication
- **Email Verification**: Verify email addresses for added security
- **Password Reset**: Easy password recovery flow
- **User-Friendly Errors**: Clear error messages for common auth issues

### ⚡ Performance
- **Optimized Build**: Built with Vite for fast development and production builds
- **Efficient State Management**: React Context for global state
- **Global CDN**: Deployed on Vercel for lightning-fast load times worldwide

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite 5.4.10** - Lightning-fast build tool
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework

### UI Components
- **shadcn/ui** - Accessible components built on Radix UI
- **Monaco Editor** - Professional code editor
- **Lucide React** - Beautiful icon library

### Backend & API
- **Firebase Authentication** - User authentication service
- **Vercel Functions** - Serverless API endpoints
- **Google Generative AI** - AI coding assistant backend

### Code Execution
- **Judge0 API** - Reliable code execution service
  - Supports 15+ programming languages
  - Asynchronous execution with polling
  - No whitelist restrictions

### AI Integration
- **Google Generative AI** - Powers AI coding assistant
- **React Query** - Data fetching and caching

## 📦 Installation

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **bun**
- **Git**
- **Firebase Account** (for authentication)
- **Google AI API Key** (for AI features)
- **Vercel Account** (for deployment)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SharveshC/CodeFlow.git
   cd CodeFlow
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up Firebase Authentication**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google)
   - Get your Firebase configuration object

4. **Configure Environment Variables**
   Create a `.env` file in root directory:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   
   # Deployment Configuration
   VITE_DEPLOYMENT_PLATFORM=vercel
   VITE_AI_ENDPOINT=/api/ai-chat
   ```

5. **Get Google AI API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - **Important**: Add this key only in Vercel environment variables

6. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:8080`

7. **Deploy to Vercel**
   - Push your code to GitHub
   - Go to [Vercel](https://vercel.com) and import your repository
   - Add environment variables in Vercel dashboard:
     - All Firebase variables from step 4
     - `GOOGLE_AI_API_KEY=your-actual-google-ai-key`
   - Deploy!

8. **Configure Firebase Domains**
   - In Firebase Console → Authentication → Settings
   - Add your Vercel domain to authorized domains

## 🎮 Usage

### Getting Started

1. **Sign Up / Login**
   - Navigate to landing page
   - Click "Get Started" or "Login"
   - Sign in with Google or create an account with email/password
   - Enhanced error messages guide you through any issues

2. **Write Code**
   - Select a programming language from dropdown (15+ languages supported)
   - Write or paste your code in Monaco editor
   - Use toolbar to customize theme, font size, and line numbers

3. **Run Code**
   - Click "Run" button or press `F5` or `Ctrl+Enter`
   - View output in console panel
   - See execution time for performance monitoring
   - Code execution powered by Judge0 API

4. **Save Snippets**
   - Enter a title for your snippet
   - Optionally select a folder or create a new one
   - Click "Save" or press `Ctrl+S`
   - Duplicate names automatically get timestamp appended
   - Auto-save will save changes automatically after 2 seconds of inactivity

5. **Manage Snippets**
   - View all your snippets in left sidebar
   - Navigate through folder structure
   - Use search bar to find specific snippets
   - Filter by programming language
   - Click on a snippet to load it
   - Hover over a snippet and click trash icon to delete (with confirmation)

### Keyboard Shortcuts

- `Ctrl+S` / `Cmd+S` - Save current snippet
- `F5` - Run code

## 📁 Project Structure

```
CodeFlow/
├── public/                  # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── EditorComponent.tsx
│   │   └── SnippetList.tsx
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useAutoSave.ts
│   │   └── useKeyboardShortcuts.ts
│   ├── integrations/      # Third-party integrations
│   │   └── firebase/
│   │       ├── client.ts
│   │       └── config.ts
│   ├── lib/               # Utility functions
│   │   ├── firebase.ts    # Firebase configuration
│   │   ├── snippets.ts    # Snippet CRUD operations
│   │   ├── security.ts    # Security utilities
│   │   └── utils.ts       # General utilities
│   ├── pages/             # Page components
│   │   ├── Editor.tsx     # Main editor page
│   │   ├── Landing.tsx    # Landing page
│   │   ├── Login.tsx      # Login page
│   │   ├── Signup.tsx     # Signup page
│   │   └── VerifyEmail.tsx
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables (not in repo)
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── vite.config.ts         # Vite configuration
```

## 🔥 Firebase Setup

### Authentication Setup

1. Go to **Firebase Console** → **Authentication**
2. Enable **Email/Password** sign-in method
3. Enable **Google** sign-in method
4. Add your domain to authorized domains

### Firestore Database Schema

**Collection: `snippets`**
```typescript
{
  id: string;              // Auto-generated document ID
  title: string;           // Snippet title
  code: string;            // Code content
  language: string;        // Programming language
  user_id: string;         // User ID (from Firebase Auth)
  created_at: Timestamp;    // Creation timestamp
  updated_at: Timestamp;    // Last update timestamp
  tags?: string[];         // Optional tags
  folder?: string;         // Optional folder name
  folder_path?: string[];  // Full folder path
  is_favorite?: boolean;   // Optional favorite flag
  original_title?: string;  // Original title before timestamp
}
```

**Collection: `folders`**
```typescript
{
  id: string;              // Auto-generated document ID (path-based)
  name: string;            // Folder name
  path: string[];          // Full path to folder
  user_id: string;         // User ID (from Firebase Auth)
  created_at: Timestamp;    // Creation timestamp
  updated_at: Timestamp;    // Last update timestamp
}
```

### Security Rules

Current security rules in `firestore.rules`:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write to their own snippets
    match /snippets/{snippetId} {
      allow read, update, delete: if request.auth != null && (
        (resource.data.keys().hasAll(['user_id']) && request.auth.uid == resource.data.user_id) ||
        (resource.data.keys().hasAll(['userId']) && request.auth.uid == resource.data.userId)
      );
      allow create: if request.auth != null && (
        (request.resource.data.keys().hasAll(['user_id']) && request.resource.data.user_id == request.auth.uid) ||
        (request.resource.data.keys().hasAll(['userId']) && request.resource.data.userId == request.auth.uid)
      );
    }
    
    // Allow users to read all snippets (for listing)
    match /snippets/{snippetId} {
      allow read: if request.auth != null;
    }
  }
}
```

## 🚀 Recent Updates

### v2.1.0 - Critical Fixes (Latest)
- ✅ **Gemini API Integration Fixed**: Resolved several API-related errors for the AI assistant
  - Fixed issues with API keys, model names, and API versions
  - Corrected request formats to ensure reliable AI assistant functionality
- ✅ **JSX Runtime Issue Fixed**: Resolved "react/jsx-runtime module not found" error
  - Reinstalled dependencies to fix React types resolution
  - Updated TypeScript configuration for proper JSX runtime support
- ✅ **Vite Build Issue Fixed**: Resolved Windows file system error with Vite 7.3.1
  - Downgraded Vite from 7.3.1 to 5.4.10 for Windows compatibility
  - Fixed `EISDIR: illegal operation on a directory` build error
- ✅ **TypeScript Compilation**: Fixed Firestore WriteBatch API usage
  - Removed private `_mutations` property access
  - Updated to use proper Firestore batch operations

### v2.0.0 - Major Updates
- ✅ **Judge0 API Integration**: Migrated from Piston API to avoid whitelist restrictions
- ✅ **Folder Organization**: Added nested folder support for snippets
- ✅ **Duplicate Handling**: Automatic timestamp appending for duplicate names
- ✅ **Enhanced Authentication**: Better error messages for auth issues
- ✅ **Delete Protection**: Ownership verification before deletion
- ✅ **TypeScript Organization**: Separated types into dedicated folder
- ✅ **Security Rules**: Updated to handle both `user_id` and `userId` fields
- ✅ **UI Improvements**: Removed Lovable branding, added custom preview support

### Supported Languages
- JavaScript (Node.js 18.15.0)
- Python (3.10.0)
- Java (15.0.2)
- C (10.2.0)
- C++ (10.2.0)
- C# (6.12.0)
- Go (1.16.0)
- Rust (1.56.0)
- PHP (8.0.0)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic

## � Troubleshooting

### Common Issues & Solutions

#### JSX Runtime Error
**Problem**: `This JSX tag requires the module path 'react/jsx-runtime' to exist, but none could be found`

**Solution**:
```bash
npm install  # Reinstall dependencies to fix React types
```

#### Vite Build Error on Windows
**Problem**: `EISDIR: illegal operation on a directory, read file: index.html`

**Solution**: This issue occurs with Vite 7.3.1 on Windows. The project uses Vite 5.4.10 for compatibility.

#### TypeScript Compilation Errors
**Problem**: TypeScript errors related to Firestore or React types

**Solution**:
```bash
npx tsc --project tsconfig.app.json --noEmit  # Check TypeScript errors
npm run build  # Verify build works
```

#### Development Server Issues
**Problem**: Dev server not starting or port conflicts

**Solution**:
```bash
npm run dev  # Starts on port 8080
# If port 8080 is occupied, the server will automatically use the next available port
```

### Development Workflow
After making changes:
1. **Test locally**: `npm run dev`
2. **Check TypeScript**: `npx tsc --project tsconfig.app.json --noEmit`
3. **Build verification**: `npm run build`
4. **Deploy**: `firebase deploy`

## �📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **Sharvesh C**  
  GitHub: [@SharveshC](https://github.com/SharveshC)

- **Likhith**  
  GitHub: [@likhith1253](https://github.com/likhith1253)



