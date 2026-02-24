# 🚀 CodeFlow

**CodeFlow** is a modern, cloud-based code editor and AI-powered coding assistant that allows developers to write, execute, and save code snippets. Built with React, TypeScript, and Firebase, CodeFlow provides a seamless coding experience with AI assistance, folder organization, and cloud storage.

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
- **Optimized Queries**: Efficient Firebase queries with proper indexing

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework

### UI Components
- **shadcn/ui** - Accessible components built on Radix UI
- **Monaco Editor** - Professional code editor
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Firebase** - Backend-as-a-Service
  - **Firebase Authentication** - User authentication
  - **Cloud Firestore** - NoSQL database for snippets
  - **Firestore Security Rules** - Data access control

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
- **Firebase Account** (for backend services)

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

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Set up Authentication (Email/Password and Google)
   - Create a Firestore database
   - Get your Firebase configuration object

4. **Configure Environment Variables**
   Create a `.env` file in root directory with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_GOOGLE_AI_API_KEY=your-google-ai-api-key
   ```

5. **Set Up Firestore Database**
   
   In your Firebase Console:
   - Go to **Firestore Database**
   - Create a database in production mode
   - Create collections named `snippets` and `folders`
   - Deploy the security rules from `firestore.rules`

6. **Deploy Firestore Security Rules**
   ```bash
   firebase login
   firebase init firestore
   firebase deploy --only firestore:rules
   ```

7. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:8080`

6. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

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
  content: string;         // Code content
  language: string;        // Programming language
  userId: string;          // User ID (from Firebase Auth)
  createdAt: Timestamp;    // Creation timestamp
  updatedAt: Timestamp;    // Last update timestamp
  tags?: string[];         // Optional tags
  folder?: string;         // Optional folder/category
  is_favorite?: boolean;   // Optional favorite flag
}
```

### Security Rules

Ensure your Firestore security rules allow users to only access their own snippets:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /snippets/{snippetId} {
      // Users can read their own snippets
      allow read: if request.auth != null && 
                     request.auth.uid == resource.data.userId;
      
      // Users can create snippets
      allow create: if request.auth != null && 
                       request.auth.uid == request.resource.data.userId;
      
      // Users can update their own snippets
      allow update: if request.auth != null && 
                       request.auth.uid == resource.data.userId;
      
      // Users can delete their own snippets
      allow delete: if request.auth != null && 
                       request.auth.uid == resource.data.userId;
    }
  }
}
```

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

## 🐛 Known Issues & Fixes

### Firestore Query Index Error
If you see an error about missing indexes when loading snippets, the app now handles this by sorting snippets in JavaScript instead of using Firestore's `orderBy`. This was fixed in commit `a5d4fd2`.

### Port Already in Use
If port 8080 is in use, Vite will automatically try port 8081 or the next available port.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **Sharvesh C**  
  GitHub: [@SharveshC](https://github.com/SharveshC)

- **Likhith**  
  GitHub: [@likhith1253](https://github.com/likhith1253)



