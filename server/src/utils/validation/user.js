const Joi                                        = require( '@hapi/joi');
const{ LOGIN_PATTERN, PASSWORD_PATTERN} = require( '../../constants');

const loginPatternMessage = 'Login should be 6 to 16 characters long, can contains letters, numbers or "- _" characters';
const passwordPatternMessage = 'Password should be 8 to 60 characters long, must contains uppercase and lowercase letters and numbers';

const loginSchema = Joi.string()
    .pattern( LOGIN_PATTERN).message(loginPatternMessage);

const passwordSchema = Joi.string()
    .pattern( PASSWORD_PATTERN ).message(passwordPatternMessage);

const userSchema = Joi.object( {
    login: loginSchema.label( 'Login' ),
    password: passwordSchema.label( 'Password' ),
    confirmPassword: Joi.ref( 'password' ),
    profilePicture: Joi.any(),
} );

const SING_UP_USER_SCHEMA = userSchema.and(
    ...[ 'login', 'password', 'confirmPassword'] );
const LOGIN_USER_SCHEMA = userSchema.and( ...['login', 'password'] );

module.exports = {
    SING_UP_USER_SCHEMA,
    LOGIN_USER_SCHEMA,
};