const {AuthorizationError} = require('../../utils/errors');
const {User} = require('../../models');

async function checkAuth(req, res, next) {
    try {
        const {headers: {authorization: id}} = req;
        if (id) {
            const user = await User.findById(id);
            if (user) {
                return next();
            }
        }
        next(new AuthorizationError());
    } catch (e) {
        next(new AuthorizationError());
    }
}

module.exports = checkAuth;