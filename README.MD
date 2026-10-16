# Jobs API

A REST API for tracking job applications, built as a Node.js/Express learning project. Registered users can manage their own jobs and track each application's status.

## Tech stack

- Node.js and Express 5
- MongoDB and Mongoose
- JWT authentication and bcryptjs password hashing
- Helmet, CORS, and express-rate-limit
- Centralized error-handling middleware

## Features

- User registration and login
- Protected endpoints using Bearer tokens
- Create, list, retrieve, update, and delete job applications
- Each job is scoped to the authenticated user
- Job statuses: `pending`, `interview`, and `declined`
- Mongoose schema validation and timestamps

## Getting started

Requires Node.js with support for `--env-file`, npm, and a MongoDB database.

```bash
git clone https://github.com/MostafaElSebai/Jobs-API.git
cd Jobs-API
npm install
```

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://127.0.0.1:27017/jobs-api
JWT_SECRET=replace-with-a-long-random-secret
JWT_LIFETIME=1d
PORT=3000
```

**Local startup limitation:** The current `app.js` exports the Express application for Vercel, but its `app.listen()` call is commented out. As a result, `npm start` loads the app and connects to MongoDB but does **not** start a local HTTP server. To run locally, enable a listener after the database connection succeeds or add a separate local entry point. The repository includes `vercel.json` for serverless routing.

## API endpoints

All routes start with `/api/v1`.

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | Public | Register a user |
| POST | `/auth/login` | Public | Authenticate and receive a JWT |
| GET | `/jobs` | Bearer token | List your jobs |
| POST | `/jobs` | Bearer token | Create a job |
| GET | `/jobs/:id` | Bearer token | Retrieve one of your jobs |
| PATCH | `/jobs/:id` | Bearer token | Update one of your jobs |
| DELETE | `/jobs/:id` | Bearer token | Delete one of your jobs |

### Authentication

Register with `name`, `email`, and `password`:

```http
POST /api/v1/auth/register
Content-Type: application/json

{"name":"Example User","email":"user@example.com","password":"example-password"}
```

Login uses `email` and `password`. Both authentication endpoints return a `token` field formatted as `Bearer <jwt>`. Include that value in the `Authorization` header for all job endpoints.

### Job example

```http
POST /api/v1/jobs
Authorization: Bearer <jwt>
Content-Type: application/json

{"company":"Example Co","position":"Backend Developer","status":"pending"}
```

`company` and `position` are required. `status` defaults to `pending` and can also be `interview` or `declined`.

The `GET /jobs/:id` endpoint returns a single job. A job that does not exist or is not owned by the authenticated user results in a 404 response.

## Project notes

This is a course-based backend project intended to demonstrate Express routing, JWT authentication, MongoDB modeling, and user-scoped CRUD. It is not presented as a production-ready service. Automated tests and a complete OpenAPI specification are not included. The local server startup path is an outstanding improvement.
