export const permit = (...allowedRoles) => {
  return (req, res, next) => {
    // User must be authenticated first
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    // Check if user's role is one of the allowedRoles
    if (allowedRoles.includes(req.user.role)) {
      return next();
    }
    // Otherwise forbid
    res.status(403).json({ message: 'Forbidden: insufficient rights' });
  };
};