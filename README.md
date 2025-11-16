# KR Image Generator

This project is a client-side React application for generating images using the Gemini API, with a backend powered by Google Firebase for user authentication and data storage.

## Firebase Setup

Before running the application, you need to set up a Firebase project.

1.  **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/), create a new project, and register a new web app.
2.  **Enable Authentication**: In your Firebase project, go to the "Authentication" section and enable the "Google" sign-in provider.
3.  **Authorize Domains**: In the "Authentication" section, go to the "Settings" tab. Under "Authorized domains", click "Add domain" and add the domain where your application will be hosted. If you are getting an `auth/unauthorized-domain` error, it means the domain you are using is not on this list. For local development, `localhost` is usually added by default.
4.  **Set up Firestore**: Go to the "Firestore Database" section and create a new database in production mode.
5.  **Configure Security Rules**: In the Firestore "Rules" tab, update the rules to allow authenticated users to read and write their own data. A secure starting point is:
    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /users/{userId} {
          allow read, write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }
    ```
6.  **Get Firebase Config**: In your project settings, find your web app's Firebase configuration object.
7.  **Add Config to App**: Create a new file `src/firebaseConfig.ts` and paste your configuration object there. The file should look like this:

    ```typescript
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    // Replace with your own Firebase project configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBK0XzEH7ZmcnpLIDg-pBrNzxowYwW0sjQ",
  authDomain: "kr-image-generator-backend.firebaseapp.com",
  projectId: "kr-image-generator-backend",
  storageBucket: "kr-image-generator-backend.firebasestorage.app",
  messagingSenderId: "1086560410470",
  appId: "1:1086560410470:web:13a9dd2f0db40fa371c6a7"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

## Running the Application

1.  Make sure you are in the **root directory** of the project.
2.  Follow the standard procedure to start your frontend development server (e.g., using `npm run dev`, `vite`, or your project's specific command).

The application will then be accessible in your browser.

## Troubleshooting

### Firebase: Error (auth/unauthorized-domain)

This is a common setup error. It means the domain you are using to run your application (e.g., `localhost`, `127.0.0.1`, or your deployed app's URL) has not been added to the list of "Authorized domains" in your Firebase project.

**Solution**:
1.  Go to your project in the [Firebase Console](https://console.firebase.google.com/).
2.  Navigate to **Authentication** > **Settings** tab.
3.  Under the **Authorized domains** section, click **Add domain**.
4.  Enter the domain from which your app is being served and click **Add**. For local development, if `localhost` is not already present, you should add it.
