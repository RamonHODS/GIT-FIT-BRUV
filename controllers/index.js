const router = require('express').Router();

const userRoutes = require('./api/userRoutes');

router.use('/api/users', userRoutes);

module.exports = router;