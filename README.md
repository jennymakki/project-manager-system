# Project Manager API (Fullstack)

A full-stack project management application built with **Spring Boot + React** that allows users to manage boards, lists, tasks and comments through a drag-and-drop interface.

The project is built with a layered architecture and follows a feature-based design approach.

---

## Live Demo

### Frontend (Vercel):

https://project-manager-system-tawny.vercel.app

- React application
- Handles UI, authentication flow, dashboard, boards UI

### Backend API (Render):

https://project-manager-api-2z4a.onrender.com

- Spring Boot REST API
- JWT authentication
- Boards, Lists, Tasks, Comments CRUD

---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Token stored in localStorage (PostgreSQL will be implemented)
- Protected routes (frontend + backend)
- Secure password storage (BCrypt)

### Boards (Projects)
- Create, read, update, delete boards
- Each user has their own boards

### Dashboard
- Displays user-specific boards
- Protected dashboard access (requires login)

#### Tasks
- Create, update and delete tasks
- Drag & drop between lists

#### Comments
- Create and delete comments on tasks

#### User Experience
- Light/Dark mode
- Responsive UI
- Custom design system

### Frontend
- React + Vite
- Axios API layer
- Context-based authentication handling
- React Router protected routes
- LocalStorage JWT persistence

---

## Architecture

The backend follows a layered architecture:

- **Controller** → REST API endpoints
- **Service** → Business logic
- **Repository** → Database access (JPA)
- **Entity** → Domain models
- **DTO** → API contracts

Frontend architecture:

- Pages (Login, Register, Dashboard)
- API layer (axiosClient, authApi)
- AuthContext for session handling
- ProtectedRoute for route security

---

## Tech Stack

### Backend
- Java 25
- Spring Boot
- Spring Security + JWT
- Spring Data JPA (Hibernate)
- H2 Database (development)
- Maven

### Frontend
- React (Vite)
- TypeScript
- React Router
- Axios
- dnd-kit (Drag & Drop)
- Context API
- Custom Design System
  - Theme Provider
  - Light/Dark Mode
  - Reusable UI Components
  - Design Tokens
- Feature-Based Folder Structure
- Custom React Hooks

---

## Authentication Flow

1. User registers an account
2. User logs in with email + password
3. Backend returns JWT token
4. Token is stored in localStorage
5. Token is sent with every API request
6. Protected routes validate token presence

---

## API Overview

### Auth
POST /auth/register
POST /auth/login

### Boards
GET /boards
POST /boards
PUT /boards/{id}
DELETE /boards/{id}

### Lists
GET /boards/{boardId}/lists
POST /boards/{boardId}/lists

### Tasks
GET /lists/{listId}/tasks
POST /lists/{listId}/tasks
PUT /tasks/{taskId}
DELETE /tasks/{taskId}
PATCH /tasks/{taskId}/move

### Comments
GET /tasks/{taskId}/comments
POST /tasks/{taskId}/comments
DELETE /comments/{commentId}

---

## Testing Strategy

The project is designed with **TDD principles in mind**, including:

- Unit tests for service layer
- Integration tests for controllers
- Repository testing with H2 database

Each feature is developed using a Red → Green → Refactor cycle.

---

## Database

- H2 in-memory database (development mode)
- Auto-generated schema via Hibernate

---

## Future Improvements

- Task management (lists + tasks fully connected in UI)
- Task assignment to users
- Due dates for tasks
- Search & filtering
- Pagination
- PostgreSQL production database
- Docker deployment setup

---

## Getting Started

### Backend
```bash
mvn spring-boot:run
```

### Frontend
```bash
npm install
npm run dev
```

---

### What I Learned

- JWT authentication with Spring Security
- Full-stack architecture with React and Spring Boot
- Designing REST APIs with layered architecture
- Building reusable UI components and a custom design system
- Managing application state with Context API and custom hooks
- Implementing drag & drop interactions with dnd-kit
- Structuring applications using feature-based architecture
- Debugging authentication, CORS and client-server communication
