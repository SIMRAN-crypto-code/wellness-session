const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token is provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, msg: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token and get decoded payload (throws if invalid/expired)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user details from verified token
    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    return res.status(403).json({ success: false, msg: 'Invalid or expired token.' });
  }
};

module.exports = auth;
