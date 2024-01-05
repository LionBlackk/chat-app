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

### 1.Sign in UI

![image](https://github.com/LionBlackk/PBL4/assets/92169263/559a8c34-a4df-452c-8c89-ab8b5aa9f934)

### 2.Login UI

![image](https://github.com/LionBlackk/PBL4/assets/92169263/92202624-1a1a-49a7-94fc-9e9e2c5ea68a)

### 3.UI after login

![image](https://github.com/LionBlackk/PBL4/assets/92169263/21797fbc-e496-45e1-8e20-298ec6cf5737)

### 4.UI show users offline or online

![image](https://github.com/LionBlackk/PBL4/assets/92169263/d196e68f-3a55-4d97-b9c2-49a75399f2c3)

### 5.UI update information user

![image](https://github.com/LionBlackk/PBL4/assets/92169263/8a6d1783-6cb1-4e46-9f3d-35447d4264ed)

### 6.UI chat box

![image](https://github.com/LionBlackk/PBL4/assets/92169263/f843da8a-c062-484f-a46a-4147c6f6e814)

### 7.UI group chat box
![image](https://github.com/LionBlackk/PBL4/assets/92169263/c2ed14cb-e5e4-4eb0-934c-cef697e6cf15)
![image](https://github.com/LionBlackk/PBL4/assets/92169263/aa3175b3-e488-4ce2-bc1c-ca3660f0df04)

### 8.UI send file, image, ...

![image](https://github.com/LionBlackk/PBL4/assets/92169263/41d290df-eb2d-4f15-8168-aca0ec874513)

### 9.UI send emoji

![image](https://github.com/LionBlackk/PBL4/assets/92169263/0d8d36b2-bafe-4146-808d-907d8ee25dc9)

### 10.UI delete chat box

![image](https://github.com/LionBlackk/PBL4/assets/92169263/b60f8f3f-087d-43cb-aa3f-c7d0f75eda42)
