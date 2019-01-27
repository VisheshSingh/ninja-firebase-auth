// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail })
        .then(result => console.log(result));
})
// listen to auth state changes
auth.onAuthStateChanged(user => {
    if (user) {
        // get data
        // db.collection('guides').get().then(snapshot => {
        //     snapshotGuides(snapshot.docs);
        //     setupUI(user);
        // })
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
        })

        // real-time data
        db.collection('guides').onSnapshot(snapshot => {
            snapshotGuides(snapshot.docs);
            setupUI(user);
        }, err => console.log(err.message));
    } else {
        setupUI();
        snapshotGuides([]);
    }
})
// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // add to db
    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value,
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
})

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get email and password
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // create account
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value
        })
    }).then(() => {
        console.log(cred);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch((err) => {
        signupForm.querySelector('.error').innerHTML = err.message;
    })
})

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
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
        // clasing the modal after login
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        signinForm.reset();
        signinForm.querySelector('.error').innerHTML = '';
    }).catch((err) => {
        signinForm.querySelector('.error').innerHTML = err.message;
    })
})