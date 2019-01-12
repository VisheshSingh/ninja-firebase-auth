// rendering item list
const guideList = document.querySelector('.guides');

const snapshotGuides = (data) => {
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
}

// Toggling modals and item list
document.addEventListener('DOMContentLoaded', function () {

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    const items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
})

