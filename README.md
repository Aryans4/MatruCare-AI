
# MatruCare AI – Hackathon Registration Portal

A MERN stack hackathon registration portal developed as part of the MatruCare AI Full Stack Developer Internship Programme.

## Features

- User signup with email verification using OTP.
- OTP expiration after 10 minutes.
- Resend OTP functionality.
- Secure password hashing using bcrypt.
- Login authentication using JWT.
- Protected routes for authenticated users.
- User dashboard with profile information.
- Hackathon registration form.
- Dynamic team member fields based on team size.
- View hackathon registration details.
- Contact form with email functionality.
- Responsive navigation and page layouts.

## Technology Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Nodemailer

## Project Structure

```text
MatruCare-AI/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── src/
│   ├── package.json
│   └── index.html
│
├── .gitignore
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Aryans4/MatruCare-AI.git
cd MatruCare-AI
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend folder using `.env.example` as a reference.

Configure the following environment variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email_address
EMAIL_PASS=your_gmail_app_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

Start the backend:

```bash
npx nodemon server.js
```

Alternatively:

```bash
node server.js
```

Backend URL: `http://localhost:3000`

### 3. Frontend Setup

Open a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/verify-otp` | Verify email OTP |
| POST | `/api/auth/resend-otp` | Resend OTP |
| POST | `/api/auth/login` | User login |

### User

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/user/me` | Get authenticated user profile |

### Hackathon

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/hackathon/register` | Submit hackathon registration |
| GET | `/api/hackathon/my-entry` | Get user's hackathon registration |

Protected endpoints require a valid JWT Bearer token.

## Security

- Passwords are hashed using bcrypt.
- JWT authentication protects private routes.
- OTP verification is required before login.
- OTP expires after 10 minutes.
- Environment variables are excluded from Git using `.gitignore`.

## GitHub Repository

https://github.com/Aryans4/MatruCare-AI
