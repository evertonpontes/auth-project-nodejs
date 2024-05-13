# 👨‍🔧auth-project-nodejs

This application leverages Node.js to thoroughly explore the resouses and functionalities of user authentication and authorization systems.

## 🔧Functionalities

1. Register user into the _database_.
2. Validation system to ensure that the data provided is safe.
3. Authentication and Authorization system.
4. Logout system

## 👨‍💻Authentication

Authentication is facilitated using the user's credentials, specifically the email and password. These credentials are compared against the data stored in the _database_. Upon successful verification, a **token** and **refresh token** are sent back to the user for subsequent access to protected resources.

## 🔑Token & 🔁Refresh token

The token is a **JWT (JSON Web Token)** that grants access to private routes and validates the user's identity. When the token expires, the refresh token is used to generate a new token, thereby preventing the need for frequent logins. Additionally, each time a new token is generated using the refresh token, a new refresh token is also created and stored in the database. This process invalidates the previous refresh token, ensuring enhanced security and preventing unauthorized access.

## ⏳User inactivity

The refresh token has an expiration date. If the user remains inactive for a certain period of time, the refresh token will expire, requiring the user to perform a new login to obtain a fresh set of tokens for continued access. This mechanism enhances security by ensuring that tokens become invalid after a specified period of inactivity, prompting users to reauthenticate when necessary.

## `Schema.prisma`

```java
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id             String        @id @default(uuid())
  name           String
  email          String        @unique
  hashedPassword String
  RefreshToken   RefreshToken?

  @@map("users")
}

model RefreshToken {
  id        String @id @default(uuid())
  expiresIn Int
  userId    String @unique
  user      User   @relation(fields: [userId], references: [id])

  @@map("refresh-tokens")
}

```

## File `.env`

```bash
PORT=3000
DATABASE_URL="file:./dev.db"
ACCESS_TOKEN_SECRET_KEY="Your-Secret-Key"
```

## 💻Technologies

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

- Typescript
- Node.js
- Express.js
- Prisma
- SqLite
- zod
- jsonwebtoken
- bcrypt

## Requests

### Endpoint: `/register`

### method: `POST`

### Request body:

```json
{
  "name": "yourname",
  "email": "email@example.com",
  "password": "your-password"
}
```

##

### Endpoint: `/login`

### method: `POST`

### Request body:

```json
{
  "email": "email@example.com",
  "password": "your-password"
}
```

##

### Endpoint: `/refresh-token`

### method: `POST`

### Request body:

```json
{
  "refresh_token": "refresh-token-id"
}
```

##

### Endpoint: `/user`

### method: `GET`

### Request header:

```json
{
  "Authorization": "Bearer token"
}
```

##

### Endpoint: `/logout`

### method: `GET`

### Request header:

```json
{
  "Authorization": "Bearer token"
}
```

##

by [`evertonpontes`](https://github.com/evertonpontes)
