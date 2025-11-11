module.exports = (req, res, next) => {
  const supplied = req.headers['x-admin-password'] || '';
  const expected = process.env.ADMIN_PASSWORD || 'admin123';
  if (supplied === expected) return next();
  return res.status(401).json({ message: 'Unauthorized: admin password missing or incorrect' });
};
