# 🚀 CodeFlow

**CodeFlow** is a modern, cloud-based code editor and snippet management platform that allows developers to write, execute, and save code snippets across multiple programming languages. Built with React, TypeScript, and Firebase, CodeFlow provides a seamless coding experience with real-time execution and cloud storage.

![CodeFlow Banner](https://img.shields.io/badge/CodeFlow-Code%20Editor-blue?style=for-the-badge&logo=react)

## ✨ Features

### 🎯 Core Features
- **Multi-Language Support**: Write and execute code in 10+ programming languages including:
  - JavaScript (Node.js)
  - Python 3.8.1
  - Java (OpenJDK 13.0.1)
  - C (GCC 9.2.0)
  - C++ (GCC 9.2.0)
  - C# (Mono 6.6.0)
  - Go 1.13.5
  - Ruby 2.7.0
  - PHP 7.4.1
  - Bash 5.0.0

### 💾 Snippet Management
- **Save & Organize**: Save code snippets with custom titles
- **Search & Filter**: Quickly find snippets by title, content, or language
- **Auto-Save**: Automatic saving with visual status indicators
- **User-Specific Storage**: Each user's snippets are private and secure
- **Delete Protection**: Confirmation dialog before deleting snippets

### 🎨 Editor Features
- **Monaco Editor**: Powered by the same editor as VS Code
- **Syntax Highlighting**: Beautiful syntax highlighting for all supported languages
- **Theme Options**: Choose from Dark, Light, or High Contrast themes
- **Customizable Font Size**: Adjust font size from 12px to 24px
- **Line Numbers**: Toggle line numbers on/off
- **Code Templates**: Pre-loaded templates for each language

### 🔐 Authentication
- **Google Sign-In**: Secure authentication via Google OAuth
- **Email/Password**: Traditional email and password authentication
- **Email Verification**: Verify email addresses for added security
- **Password Reset**: Easy password recovery flow

### ⚡ Performance
- **Real-Time Execution**: Run code and see output instantly
- **Execution Time Tracking**: Monitor how long your code takes to run
- **Optimized Queries**: Efficient Firebase queries for fast snippet loading
- **Auto-Save Debouncing**: Smart auto-save that doesn't slow you down

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Lightning-fast build tool
- **React Router 6.30.1** - Client-side routing
- **TailwindCSS 3.4.17** - Utility-first CSS framework

### UI Components
- **shadcn/ui** - Beautiful, accessible components built on Radix UI
- **Monaco Editor** - Professional code editor
- **Lucide React** - Beautiful icon library
- **Sonner** - Elegant toast notifications

### Backend & Database
- **Firebase 12.6.0** - Backend-as-a-Service
  - **Firebase Authentication** - User authentication
  - **Cloud Firestore** - NoSQL database for snippets
  - **Firebase Analytics** - Usage analytics

### Additional Libraries
- **date-fns** - Date formatting and manipulation
- **react-markdown** - Markdown rendering
- **@tanstack/react-query** - Data fetching and caching
- **zod** - Schema validation

## 📦 Installation

### Prerequisites
- **Node.js** (v16 or higher)
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

3. **Configure Firebase**
   
   Create a `.env` file in the root directory with your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   **Note**: The current Firebase configuration is in `src/lib/firebase.ts`. For production, use environment variables instead of hardcoded values.

4. **Set Up Firestore Database**
   
   In your Firebase Console:
   - Go to **Firestore Database**
   - Create a database in production mode
   - Create a collection named `snippets`
   - Set up the following security rules:

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /snippets/{snippetId} {
         allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
         allow create: if request.auth != null;
       }
     }
   }
   ```

5. **Run the Development Server**
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
   - Navigate to the landing page
   - Click "Get Started" or "Login"
   - Sign in with Google or create an account with email/password

2. **Write Code**
   - Select a programming language from the dropdown
   - Write or paste your code in the Monaco editor
   - Use the toolbar to customize theme, font size, and line numbers

3. **Run Code**
   - Click the "Run" button or press `F5` or `Ctrl+Enter`
   - View output in the console panel
   - See execution time for performance monitoring

4. **Save Snippets**
   - Enter a title for your snippet
   - Click "Save" or press `Ctrl+S`
   - Auto-save will save changes automatically after 2 seconds of inactivity

5. **Manage Snippets**
   - View all your snippets in the left sidebar
   - Use the search bar to find specific snippets
   - Filter by programming language
   - Click on a snippet to load it
   - Hover over a snippet and click the trash icon to delete

### Keyboard Shortcuts

- `Ctrl+S` / `Cmd+S` - Save current snippet
- `F5` - Run code
- `Ctrl+Enter` - Run code (alternative)

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

### Adding Team Members to Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the ⚙️ gear icon → **Users and permissions**
4. Click **Add member**
5. Enter the teammate's Google email
6. Assign role:
   - **Editor** - For developers (recommended)
   - **Viewer** - For read-only access
   - **Owner** - For full control
7. Click **Add member**

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

Thanks to the contributors who built CodeFlow:

- **Sharvesh C** — Creator & Lead Developer  
  GitHub: [@SharveshC](https://github.com/SharveshC)

- **Likhith** — Co-Developer (Frontend & Features)  
  GitHub: [@likhith1253](https://github.com/likhith1253)

## 🙏 Acknowledgments

- **Monaco Editor** - For the amazing code editor
- **Firebase** - For backend infrastructure
- **shadcn/ui** - For beautiful UI components
- **Vite** - For blazing fast development experience
- **React** - For the powerful UI framework


