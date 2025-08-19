# Movies Backend API

A mini backend system for managing movies with **JWT-based authentication** and **role-based access control**.

---

## **Technologies Used**

- Node.js & Express.js  
- MongoDB & Mongoose  
- JWT Authentication  
- Bcrypt for password hashing  
- Multer for file uploads  
- XLSX for Excel parsing  
- Cors for cross-origin requests  

---

## **Environment Variables**

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/moviesdb
JWT_SECRET=your_jwt_secret

**
Folder Structure**

.
├── config/
│   └── db.js             # MongoDB connection
├── controllers/
│   ├── authController.js # Signup, login, logout
│   └── movieController.js# Movies CRUD & bulk upload
├── middleware/
│   └── authMiddleware.js # JWT & role-based protection
├── models/
│   └── User.js           # User schema
│   └── Movie.js          # Movie schema
├── routes/
│   ├── auth.js           # Auth routes
│   └── movies.js         # Movie routes
├── uploads/              # Excel uploads
├── .env
├── .gitignore
├── package.json
└── server.js

**API Endpoints**
| Method | Endpoint     | Description            | Body                          |
| ------ | ------------ | ---------------------- | ----------------------------- |
| POST   | /auth/signup | Register a new user    | `name, email, password, role` |
| POST   | /auth/login  | Login user/admin       | `email, password`             |
| POST   | /auth/logout | Logout user (optional) | None                          |

**Movie Routes (Admin)**
| Method | Endpoint            | Description                            | Body / Params                            |
| ------ | ------------------- | -------------------------------------- | ---------------------------------------- |
| POST   | /movies             | Create a single movie                  | `name, rating, genres[], watchedUsers[]` |
| POST   | /movies/bulk-upload | Upload Excel file with multiple movies | Form-data → `file`                       |
| GET    | /movies             | List movies (pagination/filter)        | Query: `page, limit, genre, rating`      |




