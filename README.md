# Blog Platform with Authentication & Role-Based Access Control (RBAC)

This project is a full-stack blog application demonstrating secure authentication, robust Role-Based Access Control (RBAC), and RESTful API development. It was built to fulfill a Software Engineering Internship task.

The application serves two primary roles: **User** and **Admin**. Depending on the authenticated user's role, the UI adapts seamlessly, and the backend middleware secures endpoints to enforce permissions.

---

## 🔗 Live Demo
**Platform URL:** [https://aakash-group-blog-platform-with-rba.vercel.app/login](https://aakash-group-blog-platform-with-rba.vercel.app/login)

---

## 🌟 Core Features

### 1. Secure Authentication
- **User Registration & Login:** Stores user credentials securely.
- **Password Hashing:** Passwords are encrypted before persisting in the database using `bcryptjs`.
- **JWT-Based Authentication:** Employs JSON Web Tokens for stateless, secure session management (`jsonwebtoken`).

### 2. Role-Based Access Control (RBAC)
- **Roles Implemented:** `Admin` and `User`.
- **User Permissions:** Can create, read, update, and delete only their *own* posts.
- **Admin Permissions:** Can view all posts across the platform and has elevated privileges to delete *any* post. (Backend enforced via `isAdmin` middleware).
- **Dynamic UI:** Features and acton buttons are dynamically rendered based on the logged-in user's role.

### 3. Blog Functionality (CRUD)
- Complete functionality to **Create, Read, Update, and Delete** blog posts.

### 4. Added Bonus Features 🎁
- **Commenting System:** Users can add comments to blog posts. Handled via a relational mapped `comments` table.
- **Data Pagination:** Large lists of posts are divided into pages directly from the backend to enhance performance (limit & offset).

---

## 🛠️ Technology Stack

### Backend
- **Framework:** Node.js with Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Validation:** Joi validation (`joi`) for input sanitization.

### Frontend
- **Framework:** React.js (via Vite)
- **Styling:** Tailwind CSS (`@tailwindcss/postcss`)
- **Routing:** React Router v7 (`react-router-dom`)
- **State Management:** React Context API (`AuthContext`)
- **HTTP Client:** Axios

---

## 📂 Project Architecture & Folder Structure

The project employs a standard monorepo-style structure, decoupling frontend and backend.

```
.
├── backend
│   ├── config
│   │   └── database.js
│   ├── controllers
│   │   ├── admin
│   │   │   ├── deletePost.js
│   │   │   └── seedAdmin.js
│   │   ├── comments
│   │   │   ├── createComment.js
│   │   │   └── getAllComments.js
│   │   ├── posts
│   │   │   ├── createPost.js
│   │   │   ├── deletePost.js
│   │   │   ├── getAllposts.js
│   │   │   ├── getMyPost.js
│   │   │   ├── postDetails.js
│   │   │   └── updateMyPost.js
│   │   └── users
│   │       ├── getCurrentUser.js
│   │       ├── loginUser.js
│   │       ├── logout.js
│   │       └── registerUser.js
│   ├── DataBaseConnection.js
│   ├── index.js
│   ├── middlewares
│   │   ├── blogValidation
│   │   │   ├── sanitizeBlogInput.js
│   │   │   └── sanitizeUpdateBlog.js
│   │   ├── comments
│   │   │   └── sanitizeComment.js
│   │   ├── refreshToken
│   │   │   └── refreshToken.js
│   │   ├── RoleBaseAccessTokenCheck
│   │   │   ├── isAAdminCheck.js
│   │   │   └── validateRoleFromToken.js
│   │   └── userInputValidation
│   │       ├── validateLoginInput.js
│   │       └── validateRegisterInput.js
│   ├── model
│   │   ├── comments.js
│   │   ├── index.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   └── routes
│       ├── adminRoutes.js
│       ├── commentRoutes.js
│       ├── postRoutes.js
│       └── userRoutes.js
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── README.md
│   ├── src
│   │   ├── app
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── App.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── PublicRoute.jsx
│   │   │   └── routes.jsx
│   │   ├── assets
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── components
│   │   │   ├── layout
│   │   │   │   └── Navbar.jsx
│   │   │   └── ui
│   │   ├── context
│   │   │   └── AuthContext.jsx
│   │   ├── features
│   │   │   ├── admin
│   │   │   │   ├── components
│   │   │   │   │   └── AdminPostCard.jsx
│   │   │   │   ├── hooks
│   │   │   │   │   └── useAdminPosts.js
│   │   │   │   ├── pages
│   │   │   │   │   └── AdminDashboard.jsx
│   │   │   │   └── services
│   │   │   │       └── adminService.js
│   │   │   ├── auth
│   │   │   │   ├── components
│   │   │   │   │   └── InputField.jsx
│   │   │   │   ├── hooks
│   │   │   │   │   ├── useLoginForm.js
│   │   │   │   │   └── useRegisterForm.js
│   │   │   │   ├── pages
│   │   │   │   │   ├── Login.jsx
│   │   │   │   │   └── Register.jsx
│   │   │   │   └── services
│   │   │   │       └── authService.js
│   │   │   ├── comments
│   │   │   │   ├── components 
│   │   │   │   │   ├── CommentForm.jsx
│   │   │   │   │   └── CommentList.jsx
│   │   │   │   ├── hooks
│   │   │   │   │   └── useComments.js
│   │   │   │   └── services
│   │   │   │       └── commentService.js
│   │   │   └── posts
│   │   │       ├── components
│   │   │       │   └── PostCard.jsx
│   │   │       ├── hooks
│   │   │       │   ├── useCreatePost.jsx
│   │   │       │   ├── useMyPost.jsx
│   │   │       │   ├── usePostDetail.jsx
│   │   │       │   └── usePosts.js
│   │   │       ├── pages
│   │   │       │   ├── createPost.jsx
│   │   │       │   ├── MyPost.jsx
│   │   │       │   ├── PostDetail
│   │   │       │   │   └── PostDetail.jsx
│   │   │       │   └── PostList.jsx
│   │   │       └── services
│   │   │           └── postService.js
│   │   ├── hooks
│   │   ├── main.jsx
│   │   ├── services
│   │   ├── store
│   │   ├── styles
│   │   │   └── globals.css
│   │   └── utils
│   │       └── axiosInstance.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── README.md
└── SE Internship Task (2).pdf
```

---

## 🗄️ Database Schema & Relationships

The database is built on PostgreSQL using Sequelize ORM.

1. **Users Table:** Stores `id`, `username`, `email`, `password_hash`, and `role` (`ENUM('admin', 'user')`).
2. **Posts Table:** Stores `id`, `title`, `content`, `author_id` (Foreign Key referencing Users).
3. **Comments Table:** Stores `id`, `body`, `post_id` (Foreign Key -> Posts), and `user_id` (Foreign Key -> Users).

**Relationships:**
- A `User` `hasMany` `Posts` (1-to-N).
- A `Post` `hasMany` `Comments` (1-to-N).
- A `User` `hasMany` `Comments` (1-to-N).
(Configured with `ON DELETE CASCADES` mapping).

---

## 🔌 API Endpoints Summary

### Authentication Routes (`/api/v1/user`)
- `POST /register` - Register a new user
- `POST /login` - Login and receive JWT
- `POST /logout` - Invalidate session
- `GET /me` - Get current authenticated user metadata

### Posts Routes (`/api/v1/post`)
- `POST /create` - Create a new post
- `GET /all` - Fetch all posts (paginated)
- `GET /my-posts` - Fetch only posts authored by the logged-in user
- `GET /all/:id` - Fetch single post details
- `PUT /update-my-post` - Update an authenticated user's post
- `DELETE /my-post/:id` - Delete an authenticated user's post

### Comment Routes (`/api/v1/comment`)
- `POST /create` - Add a comment to a specific post
- `GET /get/:id` - Fetch all comments assigned to a specific post ID

### Admin Routes (`/api/v1/admin`)
- `GET /posts` - Fetch all system posts for admin view
- `DELETE /posts/:id` - Delete *any* user's post (Admin privileges only)

---

## 🔐 Authentication & RBAC Detailed Implementation

### 1. Token Validation (`decodeToken` middleware)
When a client makes a protected request, the API verifies the `JSON Web Token` sent in cookies/headers. If the token is valid, it decodes the payload, extracts the user `id` and `role`, and propagates them via the `req` object to the subsequent controllers.

### 2. General Input Sanitization
Various middlewares run across routes (e.g., `sanitizeBlogInput`, `sanitizeLoginInput`) utilizing `Joi` validation schemas to prevent malicious inputs or server crashes prior to logic execution.

### 3. Role Restriction (`isAdmin` middleware)
Attached specifically to `/api/v1/admin/*` endpoints. It intercepts the decoded token data, and throws an unauthorized `403` status immediately if `req.user.role !== 'admin'`, preventing the controller logic from ever executing for non-admins. This ensures that even if users expose UI elements, the backend acts as a definitive security wall.

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL running locally or in dockers

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd AkashGroupProject
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory based on required variables:
```env
# ---------------------- APP ----------------------
APP_PORT=3000

# ---------------------- DATABASE ----------------------
DATABASE_URL=postgresql://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
DB_DIALECT=postgres

# ---------------------- JWT ----------------------
JWT_SECRET=your_jwt_secret
ACCESS_EXPIRY=1h
REFRESH_EXPIRY=7d

# ---------------------- COOKIES (in milliseconds) ----------------------
ACCESS_COOKIE_EXPIRY=3600000
REFRESH_COOKIE_EXPIRY=604800000

#---------------------------- ADMIN CREDENTIALS--------------------------
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SuperSecure123!
```

Start the backend development server:
```bash
npm run dev
# OR
nodemon index.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `/frontend` directory:
```env
VITE_BASE_BACKEND_URI=http://localhost:3000
```

Start the frontend Vite server:
```bash
npm run dev
```

---

## 🤔 Assumptions & Design Decisions

1. **Separation of Concerns:** Opted for a modular Express routing configuration paired with controller isolation. This reduces file bloat and separates business logic from route endpoints.
2. **Joi Validations in Middleware:** Instead of polluting controllers with `if-else` block validations, `Joi` handles incoming request body parsing completely in the middleware abstraction tier.
3. **Frontend Featurization:** The React codebase structure adopts `features/` directory patterns to encapsulate logical concerns (i.e., combining components, hooks, and services related to 'posts' inside a specific folder instead of cross-polluting global scopes).
4. **Soft-Delete vs. Cascade:** Went with `ON DELETE CASCADE` for models like Comments referencing Posts. This simplifies orphan cleanup when an Admin or User forcibly deletes a post object. Optionally, soft deletes could be introduced later if preserving historical data is paramount.
