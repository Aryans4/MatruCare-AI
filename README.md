# MatruCare AI – Hackathon Registration Portal

A full-stack MERN application that allows participants to create accounts, verify their email addresses through OTP, log in securely, access a personalized dashboard, and register for a hackathon.

## Live Application

- **Frontend:** https://matru-care-ai.vercel.app/
- **Backend:** https://matrucare-ai.onrender.com/
- **GitHub Repository:** https://github.com/Aryans4/MatruCare-AI

## Features

### 1. Home Page
- Responsive navigation bar.
- Hero section and event highlights.
- Hackathon information and registration CTA.
- Timeline and prizes sections.
- Footer with contact information and navigation links.

### 2. User Authentication
- User signup with full name, email and password.
- Six-digit email OTP verification.
- OTP expiration after 10 minutes.
- OTP resend functionality.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected application routes.

### 3. Dashboard
- Personalized user dashboard.
- User profile information.
- Hackathon registration status.
- Access to registration details.

### 4. Hackathon Registration
- Participant information.
- College, course, branch and academic year.
- Domain or track selection.
- Project name and description-related links.
- PPT and prototype URLs.
- Optional demo video URL.
- Team size selection.
- Dynamic team member details.
- Registration confirmation email.

### 5. Contact Page
- Contact form interface.
- Organizer contact information.
- Email contact: matrucareai@gmail.com

### 6. Email Notifications
- OTP verification emails.
- Registration confirmation emails.
- Resend API integration for email delivery.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Email Service | Resend API |
| API Communication | REST APIs, Axios |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |
| Version Control | Git, GitHub |

## Project Structure

```text
MatruCare-AI/
│
├── Backend/
│   ├── config/
│   │   ├── db.js
│   │   └── mailer.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── hackathonController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── hackathon.js
│   │   └── user.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── hackathonRoute.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── generateOTP.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── src/
│   └── package.json
│
├── screenshots/
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB database
- Git
- Resend account and API key

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

Create a `.env` file inside the Backend directory.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_sender
```

Configure the environment variables with your own credentials. Never commit the `.env` file.

Start the backend:

```bash
npm run dev
```

Use the start script defined in `Backend/package.json` if a development script is unavailable.

### 3. Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
```

Create a `.env` file inside Frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local Vite URL displayed in the terminal.

## API Documentation

Base URL:

```text
/api
```

### Authentication APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/verify-otp` | Verify email OTP |
| POST | `/auth/login` | Authenticate user |

### User APIs

| Method | Endpoint | Description |
|---|---|---|
| GET | `/user/me` | Get authenticated user profile |
| PUT | `/user/update` | Update user profile (optional) |

### Hackathon APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/hackathon/register` | Submit hackathon registration |
| GET | `/hackathon/my-entry` | Get user's registration |
| DELETE | `/hackathon/:id` | Delete registration (optional) |

Protected endpoints require a valid JWT access token in the Authorization header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

## Application Screenshots

### 1. Home Page
![Home Page](screenshots/01-home.png)

### 2. Signup Page
![Signup Page](screenshots/02-signup.png)

### 3. OTP Verification
![OTP Verification](screenshots/03-otp-verification.png)

### 4. Login Page
![Login Page](screenshots/04-login.png)

### 5. Dashboard
![Dashboard](screenshots/05-dashboard.png)

### 6. Hackathon Registration
![Hackathon Registration](screenshots/06-hackathon-registration.png)

### 7. Registered Dashboard
![Registered Dashboard](screenshots/07-registered-dashboard.png)

### 8. Registration Confirmation Email
![Confirmation Email](screenshots/08-confirmation-email.png)

### 9. Contact Page
![Contact Page](screenshots/09-contact.png)

## Security

- Passwords are hashed before database storage.
- JWT is used for authenticated routes.
- OTP verification is time-limited.
- Environment variables protect sensitive credentials.
- Protected routes restrict unauthorized