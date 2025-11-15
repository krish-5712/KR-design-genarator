import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 3001;

// --- Database Setup ---
const defaultData = { users: {} };
const db = await JSONFilePreset('db.json', defaultData);

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---

// [Admin] Get all users for admin dashboard
app.get('/admin/users', (req, res) => {
  res.json(db.data.users);
});

// [Public] "Get or Create" user for passwordless sign-in (e.g., Google)
app.post('/login', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const user = db.data.users[email];

  // If user exists and has a password, they must use password login
  if (user && user.passwordHash) {
    return res.status(403).json({ message: 'Please sign in with your password.' });
  }

  if (!user) {
    console.log(`[${new Date().toISOString()}] NEW USER: A new account was created for ${email}.`);
    // Create a new user with default values (for Google sign-in)
    db.data.users[email] = {
      email,
      credits: 10,
      imagesGenerated: 0,
    };
    await db.write();
  } else {
    console.log(`[${new Date().toISOString()}] SIGN IN: User ${email} signed in (passwordless).`);
  }

  res.status(200).json(db.data.users[email]);
});

// [Public] Login with password
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = db.data.users[email];
    if (!user || !user.passwordHash) {
        return res.status(404).json({ message: 'User not found or no password set.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (isMatch) {
        console.log(`[${new Date().toISOString()}] SIGN IN: User ${email} signed in with password.`);
        res.status(200).json(user);
    } else {
        res.status(401).json({ message: 'Invalid credentials.' });
    }
});


// [Public] Create a new user with a password
app.post('/user', async (req, res) => {
    const { email, passwordHash } = req.body;
    if (!email || !passwordHash) {
        return res.status(400).json({ message: 'Email and password hash are required.' });
    }
    
    if (db.data.users[email]) {
        return res.status(409).json({ message: 'User already exists.' });
    }

    const newUser = {
        email,
        passwordHash,
        credits: 10,
        imagesGenerated: 0,
    };
    db.data.users[email] = newUser;
    await db.write();
    
    console.log(`[${new Date().toISOString()}] NEW USER: Account created for ${email} with a password.`);

    res.status(201).json(newUser);
});


// [Protected] Get a specific user's data
app.get('/user/:email', (req, res) => {
    const { email } = req.params;
    const user = db.data.users[email];
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


// [Protected] Update user credits and/or image generation count
app.put('/user/:email', async (req, res) => {
  const { email } = req.params;
  const { credits, incrementImageCount } = req.body;
  const user = db.data.users[email];

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  if (typeof credits === 'number') {
      user.credits = credits;
  }

  if (incrementImageCount) {
      user.imagesGenerated = (user.imagesGenerated || 0) + 1;
  }

  await db.write();
  res.status(200).json(user);
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
  console.log('Admin endpoint to view all users: http://localhost:3001/admin/users');
});