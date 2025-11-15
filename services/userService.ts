import bcrypt from 'bcryptjs';

export interface User {
  email: string;
  credits: number;
  imagesGenerated: number;
  passwordHash?: string; // Can be optional for Google-only users
}

const API_BASE_URL = 'http://localhost:3001';
const CURRENT_USER_SESSION_KEY = 'kr_image_generator_session_email';
const PREVIOUS_USERS_STORAGE_KEY = 'kr_image_generator_previous_users';

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            try {
                const errorData = await response.json();
                throw new Error(errorData.message || `Request failed with status ${response.status}`);
            } catch (jsonError) {
                throw new Error(`Request failed with status ${response.status}`);
            }
        }
        if (response.status === 204) { // Handle No Content responses
            return null;
        }
        return response.json();
    } catch (error) {
        if (error instanceof TypeError && error.message.toLowerCase().includes('failed to fetch')) {
            throw new Error('Connection failed. Please ensure the backend server is running and accessible.');
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unexpected network error occurred.');
    }
};


// Helper to manage the local list of previously logged in users
const addRecentUser = (user: User) => {
    const usersJson = localStorage.getItem(PREVIOUS_USERS_STORAGE_KEY);
    let users: User[] = usersJson ? JSON.parse(usersJson) : [];
    // Remove if exists to add it to the front
    users = users.filter(u => u.email !== user.email);
    users.unshift(user);
    // Limit to 5 recent users
    users = users.slice(0, 5);
    localStorage.setItem(PREVIOUS_USERS_STORAGE_KEY, JSON.stringify(users));
};

// Creates a new user with email and password
export const createUser = async (email: string, password: string):Promise<User> => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await apiFetch('/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, passwordHash }),
    });

    localStorage.setItem(CURRENT_USER_SESSION_KEY, user.email);
    addRecentUser(user);
    return user;
};


// Logs in a user. If password is provided, it's a password login.
// Otherwise, it's a "get or create" for Google sign-in.
export const login = async (email: string, password?: string): Promise<User> => {
  const isPasswordLogin = !!password;
  const endpoint = isPasswordLogin ? '/auth/login' : '/login';

  const user = await apiFetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  localStorage.setItem(CURRENT_USER_SESSION_KEY, user.email);
  addRecentUser(user);
  return user;
};

// Clears local session
export const logout = async (): Promise<void> => {
  localStorage.removeItem(CURRENT_USER_SESSION_KEY);
};

// Gets the currently logged-in user from the session and fetches fresh data
export const getCurrentUser = async (): Promise<User | null> => {
  const userEmail = localStorage.getItem(CURRENT_USER_SESSION_KEY);
  if (!userEmail) {
    return null;
  }
  
  try {
    const user = await apiFetch(`/user/${encodeURIComponent(userEmail)}`);
    return user;
  } catch (e) {
      if (e instanceof Error && e.message.includes('User not found')) {
           localStorage.removeItem(CURRENT_USER_SESSION_KEY);
      }
      console.error("Failed to fetch current user:", e);
      return null;
  }
};

// Updates a user's credits (e.g., for adding more)
export const updateCredits = async (email: string, newCreditCount: number): Promise<User> => {
    return apiFetch(`/user/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credits: newCreditCount }),
    });
};

// Records an image generation, which deducts one credit and increments the generation count
export const recordImageGeneration = async (email: string, creditsBefore: number): Promise<User> => {
    return apiFetch(`/user/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            credits: creditsBefore - 1,
            incrementImageCount: true 
        }),
    });
};


// Gets a list of users who have logged in before from local cache
export const getPreviouslyLoggedInUsers = async (): Promise<User[]> => {
  const usersJson = localStorage.getItem(PREVIOUS_USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};