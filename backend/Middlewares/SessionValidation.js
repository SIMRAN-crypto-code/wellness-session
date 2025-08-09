const SessionModel = require('../Models/Session'); // Change path/model name as needed

const sessionAuth = async (req, res, next) => {
  const sessionId = req.params.id;

  try {
    const session = await SessionModel.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, msg: 'Session not found.' });
    }

    // Ensure the logged-in user owns the session
    if (session.user_id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, msg: 'You do not have permission to access this session.' });
    }

    // Attach session object to request if needed
    req.session = session;

    next();
  } catch (err) {
    console.error("🔥 sessionAuth error:", err);
    res.status(500).json({ success: false, msg: 'Server error while validating session access.' });
  }
};

module.exports = sessionAuth;


