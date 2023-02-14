export const validateEmail = (email: string) => {
    //`@` 포함
    return email.match(
    "@");
}

export const validatePassword = (password: string) => {
    //8자 이상
    return password.length >= 8
}
