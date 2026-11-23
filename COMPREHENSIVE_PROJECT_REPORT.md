# 📊 CodeFlow - Comprehensive Project Report

> **Project Name**: CodeFlow  
> **Version**: 0.0.0  
> **Type**: React + TypeScript + Vite Application  
> **Report Date**: November 18, 2026  
> **Authors**: Sharvesh C, Likhith

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Features](#core-features)
5. [Dependencies Analysis](#dependencies-analysis)
6. [Component Architecture](#component-architecture)
7. [State Management](#state-management)
8. [API Integrations](#api-integrations)
9. [Database & Storage](#database--storage)
10. [Authentication System](#authentication-system)
11. [Security Implementation](#security-implementation)
12. [Performance Optimizations](#performance-optimizations)
13. [Configuration Files](#configuration-files)
14. [Environment Variables](#environment-variables)
15. [Deployment Setup](#deployment-setup)
16. [File-by-File Breakdown](#file-by-file-breakdown)
17. [External Services](#external-services)
18. [Known Issues & Limitations](#known-issues--limitations)
19. [Future Enhancements](#future-enhancements)

---

## 1. Project Overview

### Purpose
CodeFlow is a cloud-based online code editor that allows developers to write, execute, and save code snippets in multiple programming languages without requiring local setup. It features AI-powered coding assistance, real-time code execution, and cloud storage for code snippets.

### Key Characteristics
- **Type**: Single Page Application (SPA)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.4.10
- **Deployment Platform**: Vercel
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **AI Backend**: Google Generative AI (Gemini)
- **Code Execution**: Judge0 API

### Target Users
- Developers who need quick code testing
- Students learning programming
- Teams sharing code snippets
- Anyone needing a portable coding environment

---

## 2. Technology Stack

### 2.1 Frontend Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI framework |
| TypeScript | 5.8.3 | Type-safe JavaScript |
| Vite | 5.4.10 | Build tool and dev server |
| React DOM | 18.3.1 | React DOM renderer |

### 2.2 Routing & Navigation

| Technology | Version | Purpose |
|------------|---------|---------|
| React Router DOM | 6.30.1 | Client-side routing |
| react-error-boundary | 6.1.1 | Error boundary for React |

### 2.3 UI Components & Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| TailwindCSS | 3.4.17 | Utility-first CSS framework |
| Radix UI (Multiple) | Various | Accessible component primitives |
| shadcn/ui | Custom | Component library built on Radix UI |
| Lucide React | 0.462.0 | Icon library |
| next-themes | 0.3.0 | Theme management |
| tailwind-merge | 2.6.0 | Merging Tailwind classes |
| clsx | 2.1.1 | Conditional className utility |
| class-variance-authority | 0.7.1 | Component variant management |
| tailwindcss-animate | 1.0.7 | Tailwind animations |

### 2.4 Code Editor

| Technology | Version | Purpose |
|------------|---------|---------|
| @monaco-editor/react | 4.7.0 | Monaco Editor wrapper for React |

### 2.5 Backend & Database

| Technology | Version | Purpose |
|------------|---------|---------|
| Firebase | 12.10.0 | Firebase SDK (Auth, Firestore, Storage) |
| @firebase/firestore | 4.9.2 | Firestore SDK |
| react-firebase-hooks | 5.1.1 | React hooks for Firebase |

### 2.6 AI Integration

| Technology | Version | Purpose |
|------------|---------|---------|
| @google/generative-ai | 0.21.0 | Google Gemini AI SDK |

### 2.7 Code Execution

| Technology | Version | Purpose |
|------------|---------|---------|
| Judge0 API | External | Code execution service (via fetch) |

### 2.8 Data Fetching & State

| Technology | Version | Purpose |
|------------|---------|---------|
| @tanstack/react-query | 5.83.0 | Data fetching and caching |
| React Context | Built-in | Global state management |

### 2.9 Form Handling & Validation

| Technology | Version | Purpose |
|------------|---------|---------|
| react-hook-form | 7.61.1 | Form state management |
| @hookform/resolvers | 3.10.0 | Form validation resolvers |
| zod | 3.25.76 | Schema validation |

### 2.10 Date & Time

| Technology | Version | Purpose |
|------------|---------|---------|
| date-fns | 3.6.0 | Date manipulation and formatting |
| react-day-picker | 8.10.1 | Date picker component |

### 2.11 UI Enhancements

| Technology | Version | Purpose |
|------------|---------|---------|
| react-markdown | 10.1.0 | Markdown rendering |
| embla-carousel-react | 8.6.0 | Carousel component |
| react-resizable-panels | 2.1.9 | Resizable panel components |
| sonner | 1.7.4 | Toast notifications |
| cmdk | 1.1.1 | Command palette |
| vaul | 0.9.9 | Drawer component |
| input-otp | 1.4.2 | One-time password input |
| recharts | 2.15.4 | Charting library |

### 2.12 Development Dependencies

| Technology | Version | Purpose |
|------------|---------|---------|
| @vitejs/plugin-react-swc | 3.11.0 | React SWC plugin for Vite |
| ESLint | 9.32.0 | Code linting |
| typescript-eslint | 8.38.0 | TypeScript ESLint |
| Prettier | 3.7.3 | Code formatting |
| @types/node | 22.19.1 | Node.js type definitions |
| @types/react | 18.3.27 | React type definitions |
| @types/react-dom | 18.3.7 | React DOM type definitions |
| autoprefixer | 10.4.21 | PostCSS autoprefixer |
| postcss | 8.5.6 | CSS transformation |
| firebase-admin | 12.7.0 | Firebase Admin SDK (server-side) |
| lovable-tagger | 1.1.11 | Development tooling |
| globals | 15.15.0 | Global type definitions |
| @tailwindcss/typography | 0.5.16 | Tailwind typography plugin |

---

## 3. Project Structure

```
CodeFlow-main-likhith/
├── .env                              # Environment variables (not in git)
├── .env.example                      # Environment variables template
├── .firebase/                        # Firebase configuration directory
├── .firebaserc                       # Firebase project configuration
├── .git/                            # Git repository
├── .gitignore                       # Git ignore rules
├── .graph-it/                        # Graph visualization tool
├── .prettierignore                   # Prettier ignore rules
├── .prettierrc.cjs                   # Prettier configuration
├── ARCHITECTURE.md                   # Architecture documentation
├── CONTRIBUTING.md                   # Contribution guidelines
├── LICENSE                          # MIT License
├── README.md                        # Project README
├── SEO_CHECKLIST.md                  # SEO audit checklist
├── api/                             # Vercel serverless functions (legacy)
│   └── ai-chat.js                   # AI chat API endpoint
├── assets/                          # Static assets (empty)
├── components.json                   # shadcn/ui configuration
├── dist/                            # Build output directory
├── eslint.config.js                 # ESLint configuration
├── firebase.json                     # Firebase deployment configuration
├── firestore.indexes.json           # Firestore indexes
├── firestore.rules                  # Firestore security rules
├── index.html                       # HTML entry point
├── node_modules/                    # Node dependencies
├── package-lock.json                # Dependency lock file
├── package.json                     # Project dependencies
├── postcss.config.js                # PostCSS configuration
├── public/                          # Public static files
│   ├── favicon.ico                  # Website favicon
│   ├── googlea1eca6d05e142b75.html  # Google verification
│   ├── placeholder.svg              # Placeholder image
│   └── robots.txt                   # Robots.txt for SEO
├── pytorch_prac.ipynb               # Jupyter notebook (unrelated)
├── src/                             # Source code directory
│   ├── App.css                      # App-specific styles
│   ├── App.tsx                      # Main App component
│   ├── components/                  # React components
│   │   ├── ui/                     # shadcn/ui components (49 files)
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   ├── tooltip.tsx
│   │   │   └── use-toast.ts
│   │   ├── AIChatWidget.tsx         # AI chat assistant widget
│   │   ├── Auth.tsx                 # Authentication UI component
│   │   ├── EditorComponent.tsx      # Monaco Editor wrapper
│   │   ├── NavLink.tsx              # Navigation link component
│   │   ├── Navbar.tsx               # Main navigation bar
│   │   ├── OutputConsole.tsx        # Code output console
│   │   ├── ProtectedRoute.tsx       # Route protection wrapper
│   │   ├── SnippetList.tsx          # Snippet list component
│   │   └── ThemeToggle.tsx          # Theme toggle button
│   ├── contexts/                    # React Context providers
│   │   ├── AuthContext.tsx         # Authentication context
│   │   └── ThemeContext.tsx        # Theme context
│   ├── hooks/                       # Custom React hooks
│   │   ├── use-mobile.tsx           # Mobile detection hook
│   │   ├── use-toast.ts             # Toast notification hook
│   │   ├── useAutoSave.ts           # Auto-save hook
│   │   ├── useDebounce.ts           # Debounce hook
│   │   └── useKeyboardShortcuts.ts  # Keyboard shortcuts hook
│   ├── integrations/                # Third-party integrations
│   │   └── firebase/
│   │       └── client.ts            # Firebase client initialization
│   ├── lib/                         # Utility libraries
│   │   ├── firebase.ts              # Firebase configuration
│   │   ├── gemini.ts                # Gemini AI integration
│   │   ├── piston.ts                # Judge0 code execution
│   │   ├── security.ts              # Security configurations
│   │   ├── snippets.ts              # Snippet CRUD operations
│   │   └── utils.ts                 # General utilities
│   ├── main.tsx                     # Application entry point
│   ├── pages/                       # Page components
│   │   ├── Editor.tsx               # Main editor page
│   │   ├── Index.tsx                # Index page (unused)
│   │   ├── Landing.tsx              # Landing page
│   │   ├── Login.tsx                # Login page
│   │   ├── NotFound.tsx             # 404 page
│   │   ├── Signup.tsx               # Signup page
│   │   ├── VerifyEmail.tsx          # Email verification page
│   │   └── update-password.tsx      # Password update page
│   ├── vite-env.d.ts                # Vite type definitions
│   └── index.css                    # Global styles
├── tailwind.config.ts               # TailwindCSS configuration
├── tsconfig.app.json               # TypeScript app config
├── tsconfig.json                   # TypeScript base config
├── tsconfig.node.json              # TypeScript node config
├── vercel-api/                     # Vercel API functions (new)
│   ├── api/
│   │   └── ai-chat.js              # AI chat API endpoint
│   └── package.json                # Vercel API dependencies
├── vercel.json                     # Vercel deployment config
└── vite.config.ts                  # Vite configuration
```

---

## 4. Core Features

### 4.1 Code Editor
- **Monaco Editor Integration**: Full-featured code editor (same as VS Code)
- **Multi-Language Support**: 15+ programming languages
- **Syntax Highlighting**: Beautiful syntax highlighting for all supported languages
- **Customizable**: Font size, line numbers, theme options
- **Keyboard Shortcuts**: Ctrl+S to save, F5 to run

### 4.2 Code Execution
- **Real-time Execution**: Run code instantly using Judge0 API
- **Output Display**: Console output with execution time
- **Error Handling**: Compile errors and runtime errors displayed
- **Language Support**: JavaScript, Python, Java, C, C++, C#, Go, Ruby, PHP, TypeScript, Kotlin, Swift, R, SQL, Rust

### 4.3 AI Assistant
- **Gemini AI Integration**: Powered by Google Generative AI
- **Context-Aware**: AI sees current code and language
- **Quick Prompts**: Pre-built prompts for common tasks
- **Chat History**: Maintains conversation context
- **Markdown Rendering**: AI responses formatted with markdown

### 4.4 Snippet Management
- **Save Snippets**: Save code with title and language
- **Folder Organization**: Create nested folder structures
- **Search & Filter**: Search by title/code, filter by language
- **Auto-Save**: Debounced auto-save after 2 seconds
- **Duplicate Handling**: Timestamps appended to duplicates
- **Delete Protection**: Ownership verification before deletion

### 4.5 Authentication
- **Email/Password**: Traditional authentication
- **Google Sign-in**: One-click OAuth
- **Email Verification**: Verify email addresses
- **Password Reset**: Forgot password flow
- **Protected Routes**: Editor requires authentication

### 4.6 Theme System
- **Light/Dark Mode**: Toggle between themes
- **System Preference**: Detects system theme preference
- **Persistent**: Theme saved to localStorage
- **Smooth Transitions**: Animated theme changes

### 4.7 Responsive Design
- **Mobile-Friendly**: Fully responsive layout
- **Mobile Menu**: Hamburger menu for mobile
- **Touch Targets**: Appropriate button sizes
- **Adaptive Layout**: Adjusts to screen size

---

## 5. Dependencies Analysis

### 5.1 Production Dependencies (56 packages)

#### Core Framework (4)
- react, react-dom, typescript, vite

#### UI & Styling (30)
- tailwindcss, @tailwindcss/typography, tailwindcss-animate
- tailwind-merge, clsx, class-variance-authority
- next-themes
- All Radix UI components (20+ packages)
- lucide-react, sonner, cmdk, vaul, input-otp
- embla-carousel-react, react-resizable-panels

#### Forms & Validation (3)
- react-hook-form, @hookform/resolvers, zod

#### Data & State (2)
- @tanstack/react-query, react-firebase-hooks

#### Editor (1)
- @monaco-editor/react

#### Firebase (2)
- firebase, @firebase/firestore

#### AI (1)
- @google/generative-ai

#### Utilities (4)
- date-fns, react-day-picker, react-markdown, recharts

#### Routing (1)
- react-router-dom

#### Error Handling (1)
- react-error-boundary

### 5.2 Development Dependencies (13 packages)

#### Build Tools (4)
- @vitejs/plugin-react-swc, vite
- autoprefixer, postcss

#### Linting & Formatting (3)
- eslint, typescript-eslint, prettier

#### Type Definitions (3)
- @types/node, @types/react, @types/react-dom

#### Firebase (1)
- firebase-admin

#### Tooling (2)
- lovable-tagger, globals

---

## 6. Component Architecture

### 6.1 Page Components (8 files)

| Component | Path | Purpose | Protected |
|-----------|------|---------|-----------|
| Landing | `src/pages/Landing.tsx` | Landing page with features | No |
| Editor | `src/pages/Editor.tsx` | Main code editor | Yes |
| Login | `src/pages/Login.tsx` | User login | No |
| Signup | `src/pages/Signup.tsx` | User registration | No |
| VerifyEmail | `src/pages/VerifyEmail.tsx` | Email verification | No |
| UpdatePassword | `src/pages/update-password.tsx` | Password update | No |
| NotFound | `src/pages/NotFound.tsx` | 404 error page | No |
| Index | `src/pages/Index.tsx` | Placeholder index | No |

### 6.2 Core Components (8 files)

| Component | Path | Purpose |
|-----------|------|---------|
| Navbar | `src/components/Navbar.tsx` | Main navigation bar |
| EditorComponent | `src/components/EditorComponent.tsx` | Monaco Editor wrapper |
| AIChatWidget | `src/components/AIChatWidget.tsx` | AI chat assistant |
| SnippetList | `src/components/SnippetList.tsx` | Snippet list sidebar |
| OutputConsole | `src/components/OutputConsole.tsx` | Code output display |
| Auth | `src/components/Auth.tsx` | Authentication UI |
| ProtectedRoute | `src/components/ProtectedRoute.tsx` | Route protection |
| ThemeToggle | `src/components/ThemeToggle.tsx` | Theme toggle button |

### 6.3 UI Components (49 files - shadcn/ui)

#### Layout Components
- accordion, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, card, carousel, collapsible, dialog, drawer, dropdown-menu, hover-card, menubar, navigation-menu, popover, scroll-area, select, separator, sheet, sidebar, skeleton, tabs, tooltip

#### Form Components
- checkbox, form, input, input-otp, label, radio-group, select, slider, switch, textarea, calendar, command, pagination

#### Feedback Components
- alert, progress, sonner, toast, toaster

#### Data Display
- chart, resizable, table

#### Utility Components
- context-menu, toggle, toggle-group

### 6.4 Context Providers (2 files)

| Context | Path | Purpose |
|---------|------|---------|
| AuthContext | `src/contexts/AuthContext.tsx` | Authentication state |
| ThemeContext | `src/contexts/ThemeContext.tsx` | Theme state |

### 6.5 Custom Hooks (5 files)

| Hook | Path | Purpose |
|------|------|---------|
| useAuth | `src/contexts/AuthContext.tsx` | Access auth context |
| useTheme | `src/contexts/ThemeContext.tsx` | Access theme context |
| useAutoSave | `src/hooks/useAutoSave.ts` | Debounced auto-save |
| useKeyboardShortcuts | `src/hooks/useKeyboardShortcuts.ts` | Keyboard shortcuts |
| useDebounce | `src/hooks/useDebounce.ts` | Debounce values |
| use-toast | `src/hooks/use-toast.ts` | Toast notifications |
| use-mobile | `src/hooks/use-mobile.tsx` | Mobile detection |

---

## 7. State Management

### 7.1 Global State (React Context)

#### AuthContext
- **State**: `currentUser`, `loading`
- **Methods**: `signup`, `login`, `logout`, `loginWithGoogle`, `sendSignInLink`, `isSignInLink`, `signInWithLink`
- **Provider**: Wraps entire application
- **Usage**: `useAuth()` hook

#### ThemeContext
- **State**: `theme` ('light' | 'dark')
- **Methods**: `toggleTheme`, `setTheme`
- **Provider**: Wraps entire application
- **Usage**: `useTheme()` hook
- **Persistence**: localStorage

### 7.2 Local State (useState)

#### Editor.tsx
- `code`: Current code in editor
- `language`: Selected programming language
- `output`: Code execution output
- `snippets`: User's code snippets
- `selectedSnippet`: Currently selected snippet
- `fontSize`: Editor font size
- `theme`: Editor theme
- `showLineNumbers`: Line numbers toggle
- `sidebarOpen`: Sidebar state
- `isSaving`: Save operation status

#### AIChatWidget.tsx
- `isOpen`: Widget open state
- `isMinimized`: Widget minimized state
- `input`: User input
- `messages`: Chat history
- `isLoading`: AI response loading
- `error`: Error state

#### SnippetList.tsx
- `hoveredId`: Hovered snippet ID
- `searchQuery`: Search text
- `languageFilter`: Language filter

### 7.3 Server State (React Query)

- Currently configured but not extensively used
- Could be used for caching API responses
- QueryClient configured in App.tsx

---

## 8. API Integrations

### 8.1 Judge0 API (Code Execution)

**Endpoint**: `https://ce.judge0.com/`

**Usage**:
- Submit code for execution
- Poll for results
- Get available runtimes

**Functions** (`src/lib/piston.ts`):
- `executeCode(code, language)`: Execute code and return output
- `getAvailableRuntimes()`: Fetch supported languages

**Language Mapping**:
```typescript
javascript: 63, python: 71, java: 62, c: 50, cpp: 54,
csharp: 51, ruby: 72, go: 60, rust: 73, php: 68,
typescript: 74, kotlin: 77, swift: 83, r: 80, sql: 86
```

**Execution Flow**:
1. Submit code with language ID
2. Receive token
3. Poll for result (max 20 attempts, 1s interval)
4. Parse output (stdout, stderr, compile_output)
5. Return formatted result

### 8.2 Google Generative AI (Gemini)

**SDK**: `@google/generative-ai`

**Usage**:
- Client-side: Direct SDK calls with API key
- Server-side: Via Vercel function (recommended)

**Functions** (`src/lib/gemini.ts`):
- `askGemini(history, newMessage, systemInstruction)`: Send message to AI

**Model Priority**:
1. gemini-2.5-flash
2. gemini-1.5-flash
3. gemini-2.0-flash

**Features**:
- Conversation history support
- System instructions
- Code context injection
- Fallback to backend endpoint

### 8.3 Firebase Services

#### Authentication
- Email/Password auth
- Google OAuth
- Email link auth
- Password reset

#### Firestore
- Snippets collection
- Folders collection
- User-specific queries
- Server timestamps

#### Storage
- Configured but not actively used
- Could be used for file uploads

### 8.4 Vercel Serverless Functions

**Endpoint**: `/api/ai-chat`

**File**: `vercel-api/api/ai-chat.js`

**Purpose**: Server-side AI API calls

**Features**:
- CORS headers
- API key protection (server-side)
- Model: gemini-2.5-flash
- Conversation history support

---

## 9. Database & Storage

### 9.1 Firestore Collections

#### Snippets Collection
**Document Structure**:
```typescript
{
  id: string,
  title: string,
  code: string,
  content: string, // duplicate of code
  language: string,
  userId: string,
  user_id: string, // duplicate field
  folder: string | null,
  folder_path: string[],
  created_at: Timestamp,
  updated_at: Timestamp,
  createdAt: Timestamp, // duplicate
  updatedAt: Timestamp, // duplicate
  original_title: string,
  tags?: string[],
  is_favorite?: boolean
}
```

**Queries**:
- Get all snippets by userId
- Get snippets by userId and folder_path
- Client-side sorting by updated_at

#### Folders Collection
**Document Structure**:
```typescript
{
  id: string, // path-based ID
  name: string,
  path: string[],
  user_id: string,
  userId: string, // duplicate
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### 9.2 Firestore Security Rules

**File**: `firestore.rules`

**Rules**:
- Read/Write: Authenticated users only
- User isolation: Users can only access their own data
- Ownership verification: Delete operations check ownership

### 9.3 Firestore Indexes

**File**: `firestore.indexes.json`

**Status**: Minimal indexes configured
- Avoids composite indexes by using client-side sorting
- Queries use single-field filters only

---

## 10. Authentication System

### 10.1 Firebase Authentication Methods

#### Email/Password
- `createUserWithEmailAndPassword(email, password)`
- `signInWithEmailAndPassword(email, password)`
- `updateProfile(user, { displayName })`

#### Google OAuth
- `signInWithPopup(auth, googleProvider)`
- `GoogleAuthProvider` configured

#### Email Link
- `sendSignInLinkToEmail(auth, email, actionCodeSettings)`
- `isSignInWithEmailLink(auth, url)`
- `signInWithEmailLink(auth, email, url)`

#### Password Reset
- Flow handled by Firebase UI
- Update password page

### 10.2 AuthContext Implementation

**State**:
- `currentUser`: Firebase User object
- `loading`: Auth state loading

**Methods**:
- `signup(email, password, displayName)`: Create account
- `login(email, password)`: Sign in
- `logout()`: Sign out
- `loginWithGoogle()`: Google sign-in
- `sendSignInLink(email)`: Send magic link
- `isSignInLink(url)`: Check if URL is sign-in link
- `signInWithLink(email, url)`: Complete sign-in with link

**Features**:
- Toast notifications for success/error
- Auto-redirect after auth
- Email storage for magic link completion

### 10.3 Protected Routes

**Component**: `ProtectedRoute`

**Usage**:
```tsx
<Route path="/editor" element={
  <ProtectedRoute>
    <Editor />
  </ProtectedRoute>
} />
```

**Behavior**:
- Redirects to `/login` if not authenticated
- Renders children if authenticated
- Shows loading state during auth check

---

## 11. Security Implementation

### 11.1 Security Configuration

**File**: `src/lib/security.ts`

**Rate Limiting**:
- Max 10 executions per minute
- Max 50 executions per hour
- In-memory rate limiter (per session)

**Code Limits**:
- Max code size: 100KB
- Max snippet title: 200 characters
- Max tags per snippet: 10
- Max tag length: 50 characters

**Timeouts**:
- Execution timeout: 30 seconds
- Network timeout: 10 seconds

### 11.2 Input Validation

**Functions**:
- `validateCodeSize(code)`: Check code size limit
- `validateSnippetTitle(title)`: Check title length
- `validateTags(tags)`: Check tag count and length

### 11.3 Firebase Security

**Authentication**:
- All Firestore operations require authentication
- User-specific data isolation
- Ownership verification on delete

**Environment Variables**:
- Firebase config in .env (client-side)
- Google AI key in Vercel env (server-side)
- Never commit secrets to git

### 11.4 CORS

**Vercel Function**:
- CORS headers enabled
- Allows all origins (should be restricted in production)

---

## 12. Performance Optimizations

### 12.1 Build Optimizations

**Vite Configuration**:
- React SWC plugin (faster than Babel)
- Path alias (@/ for src/)
- Development server on port 8080

**Production Build**:
- Code splitting (automatic)
- Tree shaking
- Minification
- Asset optimization

### 12.2 Runtime Optimizations

**Debouncing**:
- Auto-save: 2 seconds delay
- Search: 300ms delay
- Custom useDebounce hook

**Memoization**:
- EditorComponent: memoized
- SnippetList filtering: useMemo
- Language list: useMemo

**Lazy Loading**:
- Not implemented (could be added for routes)
- Monaco Editor loads on demand

### 12.3 Firebase Optimizations

**Query Optimization**:
- Avoid composite indexes
- Client-side sorting
- Batch operations for folders

**Connection Reuse**:
- Firebase app initialized once
- Auth instance reused
- Firestore instance reused

### 12.4 Font Optimization

**Google Fonts**:
- JetBrains Mono (monospace)
- Preconnect hints
- display: swap (fallback)

---

## 13. Configuration Files

### 13.1 package.json

**Scripts**:
- `dev`: Start development server
- `build`: Production build
- `build:dev`: Development build
- `lint`: Run ESLint
- `preview`: Preview production build

**Dependencies**: 56 production, 13 dev

### 13.2 vite.config.ts

**Configuration**:
- React SWC plugin
- Path alias: @/ → src/
- Dev server: host '::', port 8080
- Component tagger (dev mode only)

### 13.3 tailwind.config.ts

**Theme**:
- Dark mode: class-based
- Custom color palette (CSS variables)
- Custom animations (accordion)
- Custom font family (JetBrains Mono)

**Content Paths**:
- ./pages/**/*.{ts,tsx}
- ./components/**/*.{ts,tsx}
- ./app/**/*.{ts,tsx}
- ./src/**/*.{ts,tsx}

### 13.4 tsconfig.json

**Compiler Options**:
- baseUrl: '.'
- paths: { '@/*': ['./src/*'] }
- noImplicitAny: false
- skipLibCheck: true
- allowJs: true
- strictNullChecks: false

**References**:
- tsconfig.app.json
- tsconfig.node.json

### 13.5 vercel.json

**Configuration**:
- Framework: vite
- Build command: npm run build
- Output directory: dist
- Rewrites:
  - /api/(.*) → /api/$1
  - /(.*) → /index.html (SPA fallback)

### 13.6 firebase.json

**Deployment**:
- Hosting configuration
- Firestore rules
- Functions (if any)

### 13.7 .prettierrc.cjs

**Formatting Rules**:
- Semi: true
- Single quote: true
- Tab width: 2
- Trailing comma: es5

### 13.8 eslint.config.js

**Linting Rules**:
- React hooks plugin
- React refresh plugin
- TypeScript ESLint

---

## 14. Environment Variables

### 14.1 Required Variables (.env.example)

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Deployment Platform Configuration
VITE_DEPLOYMENT_PLATFORM=vercel

# AI Backend Configuration
VITE_AI_ENDPOINT=/api/ai-chat

# Google Gemini AI API Key
VITE_GEMINI_API_KEY=your-google-gemini-api-key
GOOGLE_AI_API_KEY=your-google-gemini-api-key
```

### 14.2 Vercel Environment Variables

**Required**:
- All VITE_FIREBASE_* variables
- GOOGLE_AI_API_KEY (server-side)

**Usage**:
- Client-side: VITE_* prefixed variables
- Server-side: Non-prefixed variables

### 14.3 Security Notes

- Never commit .env file
- Use .env.example as template
- Google AI key should be server-side only
- Firebase config is public (by design)

---

## 15. Deployment Setup

### 15.1 Vercel Deployment

**Configuration**: vercel.json

**Build Process**:
1. Install dependencies
2. Run npm run build
3. Output to dist/
4. Deploy static files

**API Functions**:
- Location: vercel-api/api/
- Package.json included
- Separate from main app

**Rewrites**:
- SPA routing handled by catch-all rewrite
- API routes forwarded to api/ directory

### 15.2 Firebase Deployment

**Services**:
- Authentication
- Firestore
- Hosting (optional)

**Commands**:
```bash
firebase login
firebase deploy
```

**Configuration**:
- .firebaserc: Project ID
- firebase.json: Deployment settings
- firestore.rules: Security rules
- firestore.indexes.json: Indexes

### 15.3 Development Setup

**Local Development**:
```bash
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

**Dev Server**:
- URL: http://localhost:8080
- Hot Module Replacement (HMR)
- Fast refresh with SWC

---

## 16. File-by-File Breakdown

### 16.1 Root Configuration Files

| File | Size | Purpose |
|------|------|---------|
| package.json | 3,064 bytes | Dependencies and scripts |
| vite.config.ts | 462 bytes | Vite configuration |
| tailwind.config.ts | 3,177 bytes | TailwindCSS configuration |
| tsconfig.json | 381 bytes | TypeScript base config |
| tsconfig.app.json | 652 bytes | TypeScript app config |
| tsconfig.node.json | 481 bytes | TypeScript node config |
| vercel.json | 322 bytes | Vercel deployment config |
| firebase.json | 788 bytes | Firebase deployment config |
| firestore.rules | 1,190 bytes | Firestore security rules |
| firestore.indexes.json | 46 bytes | Indexes configuration |
| .firebaserc | 61 bytes | Firebase project config |
| .gitignore | 342 bytes | Git ignore rules |
| .prettierrc.cjs | 393 bytes | Prettier config |
| eslint.config.js | 818 bytes | ESLint config |
| postcss.config.js | 87 bytes | PostCSS config |
| components.json | 434 bytes | shadcn/ui config |
| .env.example | 642 bytes | Environment template |
| index.html | 1,635 bytes | HTML entry point |

### 16.2 Source Files

#### Entry Points

| File | Size | Purpose |
|------|------|---------|
| src/main.tsx | 161 bytes | React entry point |
| src/App.tsx | 2,639 bytes | Main app component with routing |
| src/index.css | 7,005 bytes | Global styles |
| src/App.css | 55 bytes | App-specific styles |

#### Pages

| File | Size | Purpose |
|------|------|---------|
| src/pages/Editor.tsx | 32,218 bytes | Main editor page (904 lines) |
| src/pages/Landing.tsx | 10,578 bytes | Landing page (264 lines) |
| src/pages/Signup.tsx | 8,485 bytes | Signup page (247 lines) |
| src/pages/Login.tsx | 6,895 bytes | Login page (184 lines) |
| src/pages/update-password.tsx | 7,752 bytes | Password update page |
| src/pages/VerifyEmail.tsx | 4,479 bytes | Email verification page |
| src/pages/NotFound.tsx | 765 bytes | 404 page (30 lines) |
| src/pages/Index.tsx | 489 bytes | Placeholder index |

#### Core Components

| File | Size | Purpose |
|------|------|---------|
| src/components/AIChatWidget.tsx | 11,443 bytes | AI chat widget (313 lines) |
| src/components/Auth.tsx | 12,742 bytes | Auth UI component |
| src/components/Navbar.tsx | 6,296 bytes | Navigation bar (167 lines) |
| src/components/SnippetList.tsx | 8,623 bytes | Snippet list (247 lines) |
| src/components/EditorComponent.tsx | 2,434 bytes | Monaco wrapper (97 lines) |
| src/components/OutputConsole.tsx | 3,137 bytes | Output console |
| src/components/ProtectedRoute.tsx | 826 bytes | Route protection |
| src/components/ThemeToggle.tsx | 641 bytes | Theme toggle |
| src/components/NavLink.tsx | 798 bytes | Navigation link |

#### UI Components (shadcn/ui)

**Total**: 49 files

**Largest Components**:
- sidebar.tsx: 23,514 bytes (complex sidebar component)
- chart.tsx: 10,536 bytes (charting component)
- carousel.tsx: 6,280 bytes (carousel component)
- dialog.tsx: 3,855 bytes (dialog component)
- dropdown-menu.tsx: 7,328 bytes (dropdown menu)
- menubar.tsx: 8,010 bytes (menu bar)
- navigation-menu.tsx: 5,066 bytes (navigation menu)
- command.tsx: 4,905 bytes (command palette)
- context-menu.tsx: 7,279 bytes (context menu)
- select.tsx: 5,637 bytes (select component)

#### Contexts

| File | Size | Purpose |
|------|------|---------|
| src/contexts/AuthContext.tsx | 5,410 bytes | Authentication context (225 lines) |
| src/contexts/ThemeContext.tsx | 1,657 bytes | Theme context (76 lines) |

#### Hooks

| File | Size | Purpose |
|------|------|---------|
| src/hooks/use-toast.ts | 3,951 bytes | Toast notifications |
| src/hooks/useKeyboardShortcuts.ts | 1,635 bytes | Keyboard shortcuts (46 lines) |
| src/hooks/useAutoSave.ts | 1,165 bytes | Auto-save hook (55 lines) |
| src/hooks/use-mobile.tsx | 584 bytes | Mobile detection |
| src/hooks/useDebounce.ts | 382 bytes | Debounce hook (18 lines) |

#### Libraries

| File | Size | Purpose |
|------|------|---------|
| src/lib/snippets.ts | 7,114 bytes | Snippet CRUD (258 lines) |
| src/lib/piston.ts | 4,818 bytes | Judge0 integration (199 lines) |
| src/lib/gemini.ts | 3,265 bytes | Gemini AI (105 lines) |
| src/lib/security.ts | 2,894 bytes | Security config (121 lines) |
| src/lib/firebase.ts | 1,390 bytes | Firebase config (36 lines) |
| src/lib/utils.ts | 169 bytes | General utilities |

#### Integrations

| File | Size | Purpose |
|------|------|---------|
| src/integrations/firebase/client.ts | 1,415 bytes | Firebase client init (34 lines) |

#### API Functions

| File | Size | Purpose |
|------|------|---------|
| api/ai-chat.js | 2,112 bytes | Legacy AI endpoint (67 lines) |
| vercel-api/api/ai-chat.js | 2,112 bytes | Vercel AI endpoint (67 lines) |
| vercel-api/package.json | 147 bytes | Vercel API deps |

### 16.3 Public Files

| File | Size | Purpose |
|------|------|---------|
| public/favicon.ico | 14,451 bytes | Website favicon |
| public/googlea1eca6d05e142b75.html | 53 bytes | Google verification |
| public/placeholder.svg | 3,917 bytes | Placeholder image |
| public/robots.txt | 160 bytes | SEO robots.txt |

### 16.4 Documentation Files

| File | Size | Purpose |
|------|------|---------|
| README.md | 9,869 bytes | Project README (291 lines) |
| ARCHITECTURE.md | 88,364 bytes | Architecture documentation |
| SEO_CHECKLIST.md | 16,756 bytes | SEO audit report |
| CONTRIBUTING.md | 1,186 bytes | Contribution guidelines |
| LICENSE | 1,088 bytes | MIT License |

---

## 17. External Services

### 17.1 Firebase

**Services Used**:
- Authentication
- Firestore Database
- Analytics (optional)
- Storage (configured, unused)

**Pricing**: Free tier (Spark Plan)

**Data Location**: Default (US)

### 17.2 Judge0 API

**Service**: Code execution platform

**Endpoint**: https://ce.judge0.com/

**Pricing**: Free tier with rate limits

**Rate Limits**:
- 120 requests per minute
- 1000 requests per day (free tier)

### 17.3 Google Generative AI

**Service**: Gemini AI models

**Models Used**:
- gemini-2.5-flash (primary)
- gemini-1.5-flash (fallback)
- gemini-2.0-flash (fallback)

**Pricing**: Pay-as-you-go

**Free Tier**: Available with limits

### 17.4 Vercel

**Service**: Hosting and serverless functions

**Features**:
- Automatic HTTPS
- Global CDN
- Serverless functions
- Edge functions

**Pricing**: Free tier available

### 17.5 Google Fonts

**Service**: Web fonts

**Font Used**: JetBrains Mono

**Features**: CDN delivery, automatic optimization

---

## 18. Known Issues & Limitations

### 18.1 Technical Limitations

**SPA Architecture**:
- No server-side rendering (poor SEO)
- All content rendered client-side
- No dynamic meta tags per page
- Social sharing images missing

**Bundle Size**:
- Monaco Editor is heavy (~2MB)
- No code splitting implemented
- No lazy loading for routes
- Large initial bundle size

**Firebase**:
- Duplicate fields in documents (userId/user_id)
- No composite indexes (client-side sorting)
- Limited to 1GB storage on free tier
- 50K reads/day limit on free tier

**Judge0 API**:
- Rate limits on free tier
- Execution time limits (2s CPU, 128MB RAM)
- No persistent storage for execution results
- No file system access

### 18.2 Security Considerations

**CORS**:
- Vercel function allows all origins
- Should be restricted to specific domains

**Rate Limiting**:
- In-memory only (resets on server restart)
- No distributed rate limiting
- No IP-based limiting

**Input Validation**:
- Limited validation on user input
- No sanitization of code before execution
- Trusts Judge0 API for sandboxing

### 18.3 UX Limitations

**Mobile**:
- Monaco Editor not optimized for mobile
- Keyboard shortcuts don't work on mobile
- Touch interactions could be improved

**Offline**:
- No offline support
- No service worker
- No PWA features

**Collaboration**:
- No real-time collaboration
- No sharing snippets with others
- No version history

---

## 19. Future Enhancements

### 19.1 High Priority

**SEO Improvements**:
- Implement SSR with Next.js
- Add dynamic meta tags
- Create social preview images
- Generate sitemap.xml
- Update robots.txt

**Performance**:
- Implement code splitting
- Lazy load Monaco Editor
- Add service worker
- Optimize bundle size
- Add caching strategies

**Security**:
- Restrict CORS origins
- Implement distributed rate limiting
- Add input sanitization
- Add CSRF protection

### 19.2 Medium Priority

**Features**:
- Real-time collaboration (WebSocket)
- Share snippets with others
- Version history for snippets
- Export/import snippets
- Code templates library

**Editor**:
- Multiple file support
- File tree navigation
- Git integration
- Debugging support
- Terminal emulator

**AI**:
- Code completion suggestions
- Error explanation
- Code refactoring
- Test generation
- Documentation generation

### 19.3 Low Priority

**UX**:
- PWA support (offline mode)
- Mobile-optimized editor
- Keyboard shortcut customization
- Custom themes
- Plugin system

**Analytics**:
- User behavior tracking
- Code execution analytics
- Error tracking (Sentry)
- Performance monitoring

**Integrations**:
- GitHub integration
- GitLab integration
- VS Code extension
- Desktop app (Electron)

---

## 📊 Summary Statistics

### Code Metrics

- **Total TypeScript/TSX Files**: ~60 files
- **Total Lines of Code**: ~15,000+ lines
- **Total Dependencies**: 69 packages (56 prod, 13 dev)
- **UI Components**: 57 components (8 core + 49 shadcn/ui)
- **Custom Hooks**: 5 hooks
- **Context Providers**: 2 providers
- **API Endpoints**: 1 (AI chat)
- **Supported Languages**: 15+

### File Size Distribution

- **Largest File**: Editor.tsx (32KB, 904 lines)
- **Smallest File**: main.tsx (161 bytes, 6 lines)
- **Average Component Size**: ~5KB
- **Total Source Size**: ~200KB (unminified)

### Technology Coverage

- **Frontend Frameworks**: React, Vite, TypeScript
- **UI Libraries**: TailwindCSS, Radix UI, shadcn/ui
- **State Management**: React Context, React Query
- **Backend Services**: Firebase, Vercel Functions
- **AI Services**: Google Generative AI
- **Code Execution**: Judge0 API
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore

---

## 🎯 Conclusion

CodeFlow is a well-structured, modern web application that provides a comprehensive online code editing experience. It leverages cutting-edge technologies including React 18, TypeScript, Vite, Firebase, and Google AI to deliver a feature-rich platform for developers.

### Strengths
- Modern tech stack with excellent developer experience
- Comprehensive UI component library (shadcn/ui)
- Robust authentication system
- AI-powered coding assistance
- Multi-language code execution
- Clean, maintainable code structure
- Responsive design

### Areas for Improvement
- SEO (needs SSR)
- Performance (needs code splitting)
- Security (needs CORS restrictions)
- Bundle size (Monaco is heavy)
- Offline support (needs PWA)

### Overall Assessment
CodeFlow is a production-ready application with a solid foundation. The codebase is well-organized, follows best practices, and uses appropriate technologies for its use case. With the recommended enhancements, it could become a leading online code editor platform.

---

**Report Generated**: November 18, 2026  
**Report Version**: 1.0  
**Project Status**: Active Development  
**Maintainers**: Sharvesh C, Likhith
