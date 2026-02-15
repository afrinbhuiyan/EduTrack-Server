// Authentication middleware
// This middleware validates the user token and sets req.user

module.exports = (req, res, next) => {
  try {
    // For development/testing - set a default user ID
    // In production, implement proper JWT verification
    
    const userId = req.headers['x-user-id'] || 'dev-user-123';
    
    // Set user info on request
    req.user = {
      id: userId
    };

    next();
    
    // Uncomment below for production JWT verification:
    /*
    const token = req.headers.authorization?.split(' ')[1] || req.headers['x-auth-token'];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization required' });
    }

    const userId = req.headers['x-user-id'];
    
    if (!userId) {
      return res.status(401).json({ message: 'User ID required in x-user-id header' });
    }

    req.user = {
      id: userId
    };

    next();
    */
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};
