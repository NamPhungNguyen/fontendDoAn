// alert('hello')
const url = 'https://localhost:7156/api/Driver/GetVehicleList?driverId=1'

fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
            renderUsers(user);
        });
    });


const tableUsers = document.querySelector('#table-user')
const renderUsers = (user) => {
    const output = `
                                        
    `;
    tableUsers.insertAdjacentElement('beforeend', output)
}