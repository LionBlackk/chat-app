# PBL4

## Technology:

- Frontend: Next.js 13, React, Tailwind
- Backend: Node.js, Socket.io, MongoDB, Prisma
- Using Next-auth for authencation

## Features:

- Real-time messaging
- Message notifications and alerts
- Tailwind design for sleek UI
- Tailwind animations and transition effects
- Full responsiveness for all devices
- Credential authentication with NextAuth
- Google authentication integration
- Github authentication integration
- Send file, image, audio
- Client form validation and handling using react-hook-form
- Server error handling with react-toast
- Message read receipts
- Online/offline user status
- Group chats and one-on-one messaging
- Message attachments and file sharing
- User profile customization and settings

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/LionBlackk/PBL4
```

### Install packages in client folder, server folder

```shell
npm i
```

### Setup .env file

```js
DATABASE_URL=
NEXTAUTH_SECRET=

NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Setup Prisma

```shell
npx prisma db push

```

### Start the app include client folder, server folder

```shell
npm run dev
```

### Sign in UI

![Alt text](image.png)

### Login UI

![Alt text](image-1.png)

### UI after login

![Alt text](image-2.png)

### UI show users offline or online

![Alt text](image-3.png)

### UI update information user

![Alt text](image-4.png)

### UI chat box

![Alt text](image-5.png)

### UI group chat box

![Alt text](image-6.png)

### UI send file, image, ...

![Alt text](image-7.png)

### UI send emoji

![Alt text](image-8.png)

### UI delete chat box

![Alt text](image-9.png)
