const router = require('express')();
const authRouter = require('./auth.js');
const chatRouter = require('./chat.js');
const {handleValidationError, handleApplicationError, handleMongoError } = require('../middlewares/errorHandler');
const checkAuth = require('../middlewares/auth/checkAuth.js');

router.use(authRouter);
router.use(checkAuth);
router.use(chatRouter);

router.use(handleApplicationError);
router.use(handleValidationError);
router.use(handleMongoError);


module.exports = router;