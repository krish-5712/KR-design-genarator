# KR Image Generator

This project includes a React frontend and a simple Node.js/Express backend.

## Running the Application

To run this application, you **must** start both the frontend development server and the backend server in **separate terminal windows**. The frontend cannot function without the backend running.

---

### **Terminal 1: Start the Backend Server**

The backend server stores user data, such as email, credits, and the number of images generated.

1.  **Navigate to the `server` directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    npm start
    ```

4.  **Confirm it's running:** Look for the confirmation message in your terminal. It should say:
    ```
    Backend server running at http://localhost:3001
    Admin endpoint to view all users: http://localhost:3001/admin/users
    ```
    **Leave this terminal window open.** If you close it, the backend will stop, and the app will fail.

---

### **Terminal 2: Start the Frontend**

The frontend is the React application that you see and interact with in the browser.

1.  Open a **new** terminal window.
2.  Make sure you are in the **root directory** of the project (the one containing the `server` folder).
3.  Follow the standard procedure to start your frontend development server (e.g., using `npm run dev`, `vite`, or your project's specific command).

---

### Admin Access

To view all user data, you can access the admin endpoint in your browser or with a tool like Postman/cURL, but only while the backend server is running.

-   **URL:** `http://localhost:3001/admin/users`

This will return a JSON object containing all registered users and their details.

### Data Storage

The backend uses a simple JSON file (`server/db.json`) as its database. You can view or even manually edit this file to manage user data directly. The server needs to be restarted for any manual changes to be reflected.