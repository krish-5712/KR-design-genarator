# KR Image Generator

This project is a client-side React application for generating images using the Gemini API, with a backend powered by Google Firebase for user authentication and data storage.

## Firebase Setup

Before running the application, you need to set up a Firebase project.

1.  **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/), create a new project, and register a new web app.
2.  **Enable Authentication**: In your Firebase project, go to the "Authentication" section and enable the "Google" sign-in provider.
3.  **Set up Firestore**: Go to the "Firestore Database" section and create a new database in production mode.
4.  **Configure Security Rules**: In the Firestore "Rules" tab, update the rules to allow authenticated users to read and write their own data. A secure starting point is:
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
5.  **Get Firebase Config**: In your project settings, find your web app's Firebase configuration object.
6.  **Add Config to App**: Create a new file `src/firebaseConfig.ts` and paste your configuration object there. The file should look like this:

    ```typescript
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    // Replace with your own Firebase project configuration
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

## Running the Application

1.  Make sure you are in the **root directory** of the project.
2.  Follow the standard procedure to start your frontend development server (e.g., using `npm run dev`, `vite`, or your project's specific command).

The application will then be accessible in your browser.
