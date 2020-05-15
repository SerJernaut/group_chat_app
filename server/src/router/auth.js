const authRouter = require('express').Router();
const upload = require('../middlewares/multer.js');
const UserController = require('../controllers/user.controller.js');
const createValidationMW = require('../middlewares/validation/createValidationMW.js');
const {SING_UP_USER_SCHEMA, LOGIN_USER_SCHEMA} = require('./../utils/validation/user.js');

authRouter.post('/sign_up',
    upload.single('profilePicture'),
    (req, res, next) => {
        if (req.file) {
            req.body.profilePicture = req.file.filename;
        }
        next();
    },
    createValidationMW(SING_UP_USER_SCHEMA),
    UserController.checkIfUserLoginExist,
    UserController.createUser
);

authRouter.post('/login',
    createValidationMW(LOGIN_USER_SCHEMA),
    UserController.findUserByLogin,
    UserController.compareUserPassword,
    (req, res) => {
    const preparedUser = req.user.toObject();
    delete preparedUser.password;
        res.send(preparedUser)
    },
);

module.exports = authRouter;