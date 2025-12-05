// backend/middleware.js

export const authenticateUser = (req, res, next) => {
    const userId = req.headers['user-id'];

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Missing user-id header" });
    }

    // In a real app, you would verify a token here.
    // For now, we trust the header and set the user object.
    req.user = { id: userId };
    next();
};

