import express from 'express';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './app.js';

const router = express.Router();

router.get('/healthcheck', (req, res) => {
    res.send('Server is OK!');
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        res.json({ message: 'User created successfully!', uid: user.uid });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;