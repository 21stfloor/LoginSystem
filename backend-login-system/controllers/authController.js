import commonPasswords from 'common-password-checker';//TODO: Look for more updated third-party dependency for future support

function isCommonPassword(password) {
    return commonPasswords(password);
}

export {isCommonPassword};