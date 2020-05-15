import * as yup from 'yup';

const FILE_SIZE = 6000 * 1024;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

const LOGIN_PATTERN = /^\w{6,16}$/;
const PASSWORD_PATTERN = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[A-Za-z0-9_@#%!?\-^]{8,60}$/;
const loginPatternMessage = 'Login should be 6 to 16 characters long, can contains letters, numbers or "- _" characters';
const passwordPatternMessage = 'Password should be 8 to 60 characters long, must contains uppercase and lowercase letters and numbers';

export const signUpSchema = yup.object().shape({
    login: yup.string().required().matches(LOGIN_PATTERN, loginPatternMessage).label('Login'),
    password: yup.string().min(8).required().matches(PASSWORD_PATTERN, passwordPatternMessage).label('Password'),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Both password need to be the same').label('Confirm password'),
    profilePicture: yup.mixed()
        .test("fileSize", "File too large", value => {
            if (value) {
                return value.size <= FILE_SIZE
            }
            return true;
        })
        .test("fileFormat", "Unsupported Format", value => {
            if (value) {
                return SUPPORTED_FORMATS.includes(value.type)
            }
            return true;
        })
});

export const signInSchema = yup.object().shape({
                                                   login: yup.string().required().label('Login'),
                                                   password: yup.string().required().label('Password'),
                                               });

const CHAT_NAME_PATTERN = /^\w{6,16}$/;
const chatNamePatternMessage = 'Chat name should be 6 to 16 characters long, can contains letters, numbers or "- _" characters';

export const createChatSchema = yup.object().shape({
   chatName: yup.string().required().matches(CHAT_NAME_PATTERN, chatNamePatternMessage).label('Chat name'),
});

const MESSAGE_BODY_PATTERN = /^(?!\s*$).+/;
const messageBodyPatternMessage = 'Message cannot be empty';

export const createMessageSchema = yup.object().shape({
    messageBody: yup.string().required().max(512).matches(MESSAGE_BODY_PATTERN, messageBodyPatternMessage).label('Message body'),
    /*picture: yup.mixed()
        .test("fileSize", "File too large", value => {
            if (value) {
                return value.size <= FILE_SIZE
            }
            return true;
        })
        .test("fileFormat", "Unsupported Format", value => {
            if (value) {
                return SUPPORTED_FORMATS.includes(value.type)
            }
            return true;
        })*/
});
