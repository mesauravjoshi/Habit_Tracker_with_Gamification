const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ error: 'TOKEN NOT FOUND' });

    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        // console.log("Error line 16 jwt.js",err);
        res.status(401).json({ error: 'Invalid token' });
    }
}


module.exports = { jwtAuthMiddleware }