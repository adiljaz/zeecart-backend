import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  // Safely get env variables and trim them to prevent accidental spaces in Render Dashboard
  const envUsername = process.env.ADMIN_USERNAME?.trim() || 'Adiljaseem';
  const envPassword = process.env.ADMIN_PASSWORD?.trim() || 'Adiljaz@123';

  if (
    username === envUsername &&
    password === envPassword
  ) {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.json({ token, message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
