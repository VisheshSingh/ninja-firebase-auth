// rendering item list
const guideList = document.querySelector('.guides');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if (user) {
        if (user.admin) {
            adminItems.forEach(item => {
                item.style.display = 'block';
            })
        }
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
                <div>Logged in as ${user.email}</div>
                <p>${doc.data().bio}</p>
                <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
            `;
            accountDetails.innerHTML = html;
        })
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        adminItems.forEach(item => {
            item.style.display = 'none';
        })
        accountDetails.innerHTML = '';
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

const snapshotGuides = (data) => {

    if (data.length) {

        let html = '';
        data.forEach(doc => {
            const guide = doc.data()
            const li = `
                <li>
                    <div class="collapsible-header grey lighten-4">${guide.title}</div>
                    <div class="collapsible-body white"><span>${guide.content}</span></div>
                </li>
            `;
            html += li;
        });

        guideList.innerHTML = html;
    } else {
        guideList.innerHTML = `<h5 class="center-align">Login to view guides</h5>`;
    }
}

// Toggling modals and item list
document.addEventListener('DOMContentLoaded', function () {

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    const items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
})

