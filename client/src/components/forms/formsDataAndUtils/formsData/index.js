import Input from "../../Input";
import PasswordInput from "../../PasswordInput";
import FileInput from "../../FileInput";

export const fieldValuesForAuth = [
    {
        component: Input,
        fieldOptions: {
            name: 'login',
        },
        inputProps: {
            placeholder: 'Login',
        },
    },
    {
        component: PasswordInput,
        fieldOptions: {
            name: 'password',
        },
        inputProps: {
            placeholder: 'Password',
            type: 'password',
        },
    },
    {
        component: PasswordInput,
        fieldOptions: {
            name: 'confirmPassword',
        },
        inputProps: {
            placeholder: 'Confirm Password',
            type: 'password',
        },
    },
    {
        component: FileInput,
        fieldOptions: {
            name: 'profilePicture',
        },
        inputProps: {
            type: 'file',
            multiple : false,
            accept:'image/*'
        },
    }
];

export const fieldValuesForChatCreating =[
    {
        component: Input,
        fieldOptions: {
            name: 'chatName',
        },
        inputProps: {
            placeholder: 'Chat Name',
        },
    },
];

export const fieldValuesForMessageCreating = [
    {
        component: Input,
        fieldOptions: {
            name: 'messageBody',
        },
        inputProps: {
            placeholder: 'Message',
        },
    },
    /*{
        component: FileInput,
        fieldOptions: {
            name: 'picture',
        },
        inputProps: {
            type: 'file',
            multiple : false,
            accept:'image/!*'
        },
    }*/
];
