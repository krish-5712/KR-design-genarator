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
7.  **Add Config to App**: Open the `src/firebaseConfig.ts` file and replace the placeholder configuration with your project's configuration object.

## Running the Application

1.  **Install Dependencies**: Make sure you have Node.js installed. Open your terminal in the project's root directory and run:
    ```bash
    npm install
    ```

2.  **Start Development Server**: To run the application locally, use the following command:
    ```bash
    npm run dev
    ```
    This will start the Vite development server, and you can view your application in the browser at the URL provided (usually `http://localhost:5173`).

## Troubleshooting

### Firebase: Error (auth/unauthorized-domain)

This is a common setup error. It means the domain you are using to run your application (e.g., `localhost`, `127.0.0.1`, or your deployed app's URL) has not been added to the list of "Authorized domains" in your Firebase project.

**Solution**:
1.  Go to your project in the [Firebase Console](https://console.firebase.google.com/).
2.  Navigate to **Authentication** > **Settings** tab.
3.  Under the **Authorized domains** section, click **Add domain**.
4.  Enter the domain from which your app is being served and click **Add**. For local development, if `localhost` is not already present, you should add it.
