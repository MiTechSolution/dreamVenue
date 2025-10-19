import jwt from 'jsonwebtoken';

export function generateToken(user) {
  const payload = { id: user.id, email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
