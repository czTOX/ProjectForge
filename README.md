# ProjectForge

This project is developed by **Tomáš Navrkal**

## To run the app:

### Backend:
1. Navigate to the backend folder:
    ```sh
    cd backend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Deploy Prisma migrations:
    ```sh
    npx prisma migrate deploy
    ```
4. Start the backend server:
    ```sh
    npm run start
    ```

### Frontend:
1. Navigate to the frontend folder:
    ```sh
    cd frontend
    ```
2. Check if the "dist" folder exists:
    - If it exists, you can start the preview:
        ```sh
        npm run preview
        ```
    - If it doesn't exist:
        1. Install dependencies:
            ```sh
            npm install
            ```
        2. Build the project:
            ```sh
            npm run build
            ```
        3. Start the preview:
            ```sh
            npm run preview
            ```

### Ports:
- The frontend is running on **port 4242**.
- The backend is running on **port 4000** and accepts only requests from **port 4242**.
