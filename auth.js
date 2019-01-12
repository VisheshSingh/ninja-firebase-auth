// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get email and password
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // create account
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
})

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => console.log('User logged out!'))
})

// signin
const signinForm = document.querySelector('#login-form');
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get email and password
    const email = signinForm['login-email'].value;
    const password = signinForm['login-password'].value;

    // signin
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        signinForm.reset();
    })
})