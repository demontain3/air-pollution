# Vayu Backend

This document provides the setup instructions for the Vayu backend project.

## Setup

1. **Clone the repository**: Clone the backend repository to your local machine.

2. **Install dependencies**: Run `yarn install` to install all the necessary dependencies.

3. **Environment Variables**: Replace all the `template.env` files with your `.env` file. There are currently 3 `.env` files:
    - One in the root directory
    - One in the `auth` project root directory
    - One in the `notifications` project root directory
    
4. **Configuration for template  emails: For the first time running the app, email templates aren't set so go to the  directory /app/auth/src/auth.controller.ts in the vscode, uncomment the UseGuards() in create api.

5. **Start the Docker containers**: From the root directory, run `docker compose up`. This will create a PostgreSQL image and run the containers.

6. **Create Email Templates: from localhost:8002/api, create new notifications in order:

        **Note** While creating the email templates below for the first time, make sure you create only one instance of each email and the word "temporary" inside "Your otp is temporary" in "message" is exactly that (its case sensitive). In Real-time, the templates email message's "temporary" field will be replaced by actual otp and link.**

        1. {"title":"OTP", "message": "Your otp is temporary","subject":"Otp Verification"}
        2. {"title":"Reset Password", "message": "Your password reset link is temporary", "subject" : "Password Verification"} 

6. Then close the container uncomment the UseGuards() back and rerun the container. (This is needed only for the first time then no nee to comment it again)
## API Documentation

- Visit `localhost:8000/api` for the Auth API documentation.
- Visit `localhost:8002/api` for the Notifications API documentation.

## Ports

- Ports 8001 and 8003 are allocated for TCP connections.

## API Usage

### GetMany Requests

- **Ordering**: `localhost:8000/api/users?order[id]=DESC` or `localhost:8000/api/users?order[id]=ASC`
- **Range-based selection**: `localhost:8000/api/users?range=[{"property":"id","lower":11,"upper":12}]&order[id]=DESC`
- **Multiple range-based selection**: `localhost:8000/api/users?range=[{"property":"id","lower":11,"upper":12},{"property":"name","lower":"j","upper":"k"}]`
- **Pagination**: `localhost:8000/api/users?skip=1&take=1` (skip = number of items to skip, take = number of items to take after skip)
- **Where**: `localhost:8000/api/users?name=Amrit`

# Auth API Documentation

## Overview
This document outlines the authentication routes available in the application, including the required guards and roles for each endpoint.

## Endpoints

### 1. Log in a user
- **URL:** `/auth/login`
- **Method:** `POST`
- **Guard:** `LocalAuthGuard`
- **Role Required:** None

### 2. Request OTP for email verification
- **URL:** `/auth/request-otp`
- **Method:** `POST`
- **Guard:** None
- **Role Required:** None

### 3. Verify OTP
- **URL:** `/auth/verify-otp`
- **Method:** `POST`
- **Guard:** None
- **Role Required:** None

### 4. Request password reset
- **URL:** `/auth/forgot-password`
- **Method:** `POST`
- **Guard:** None
- **Role Required:** None

### 5. Reset password
- **URL:** `/auth/reset-password`
- **Method:** `POST`
- **Guard:** None
- **Role Required:** None

### 6. Log out a user
- **URL:** `/auth/logout`
- **Method:** `POST`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Authenticated user

### 7. Authenticate
- **Message Pattern:** `authenticate`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Authenticated user


# Users API Documentation

## Overview
This document outlines the user-related routes available in the application, including the required guards and roles for each endpoint.

## Endpoints

### 1. Sign up a new user
- **URL:** `/users/signup`
- **Method:** `POST`
- **Guard:** None
- **Role Required:** None

### 2. Get current user
- **URL:** `/users/me`
- **Method:** `GET`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Authenticated user

### 3. Update current user
- **URL:** `/users/me`
- **Method:** `PUT`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Authenticated user

### 4. Delete a user
- **URL:** `/users/:id`
- **Method:** `DELETE`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin

### 5. Get a user by ID
- **URL:** `/users/:id`
- **Method:** `GET`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin

### 6. Update a user by ID
- **URL:** `/users/:id`
- **Method:** `PUT`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin

### 7. Get all users
- **URL:** `/users`
- **Method:** `GET`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin

### 8. Upload profile picture
- **URL:** `/users/upload-profile-picture`
- **Method:** `POST`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Authenticated user

### 9. Change password
- **URL:** `/users/change-password`
- **Method:** `POST`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Authenticated user


# Notifications API Documentation

## Overview
This document outlines the notification-related routes available in the application, including the required guards and roles for each endpoint.

## Endpoints

### 1. Create a new notification
- **URL:** `/notifications`
- **Method:** `POST`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin

### 2. Update a notification
- **URL:** `/notifications/:id`
- **Method:** `PUT`
- **Guard:** `JwtAuthGuard`
- **Role Required:** None

### 3. Delete a notification
- **URL:** `/notifications/:id`
- **Method:** `DELETE`
- **Guard:** `JwtAuthGuard`
- **Role Required:** None

### 4. Get all notifications
- **URL:** `/notifications`
- **Method:** `GET`
- **Guard:** `JwtAuthGuard`
- **Role Required:** None

### 5. Get a notification by id
- **URL:** `/notifications/:id`
- **Method:** `GET`
- **Guard:** `JwtAuthGuard`
- **Role Required:** None

## Event Handlers

### 6. Handle send OTP email
- **Event Pattern:** `send_otp`
- **Description:** Handles sending OTP verification email.

### 7. Handle send reset password email
- **Event Pattern:** `send_reset_password`
- **Description:** Handles sending reset password email.

# API Documentation

## Positions API

### 1. Create a new position
- **URL:** `/positions`
- **Method:** `POST`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Creates a new position.

### 2. Get all positions
- **URL:** `/positions`
- **Method:** `GET`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Retrieves all positions.

### 3. Get a position by ID
- **URL:** `/positions/:id`
- **Method:** `GET`
- **Guard:** `JwtAuthGuard`
- **Role Required:** User
- **Description:** Retrieves a position by its ID.

### 4. Update a position
- **URL:** `/positions/:id`
- **Method:** `PATCH`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Updates a position by its ID.

### 5. Delete a position
- **URL:** `/positions/:id`
- **Method:** `DELETE`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Deletes a position by its ID.

## Routes API

### 1. Create a new route
- **URL:** `/routes`
- **Method:** `POST`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Creates a new route.

### 2. Get all routes
- **URL:** `/routes`
- **Method:** `GET`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Retrieves all routes.

### 3. Get a route by ID
- **URL:** `/routes/:id`
- **Method:** `GET`
- **Guard:** `JwtAuthGuard`
- **Role Required:** User
- **Description:** Retrieves a route by its ID.

### 4. Update a route
- **URL:** `/routes/:id`
- **Method:** `PATCH`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Updates a route by its ID.

### 5. Delete a route
- **URL:** `/routes/:id`
- **Method:** `DELETE`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Deletes a route by its ID.

## Sensor Data API

### 1. Create a new sensor data
- **URL:** `/sensorDatas`
- **Method:** `POST`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Creates a new sensor data.

### 2. Get all sensor data
- **URL:** `/sensorDatas`
- **Method:** `GET`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Retrieves all sensor data.

### 3. Get a sensor data by ID
- **URL:** `/sensorDatas/:id`
- **Method:** `GET`
- **Guard:** `JwtAuthGuard`
- **Role Required:** User
- **Description:** Retrieves a sensor data by its ID.

### 4. Update a sensor data
- **URL:** `/sensorDatas/:id`
- **Method:** `PATCH`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Updates a sensor data by its ID.

### 5. Delete a sensor data
- **URL:** `/sensorDatas/:id`
- **Method:** `DELETE`
- **Guard:** `JwtAuthGuard`
- **Role Required:** Admin
- **Description:** Deletes a sensor data by its ID.

