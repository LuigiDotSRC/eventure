import admin from 'firebase-admin';
import serviceAccountKey from '../serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
});

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting 'Bearer <token>'

    if (!token) {
        return res.status(401).send({ error: 'Unauthorized. No token provided.' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Attach the decoded token payload to the request
        next(); // Continue to the next middleware/route
    } catch (error) {
        return res.status(401).send({ error: 'Unauthorized. Invalid token.' });
    }
};
