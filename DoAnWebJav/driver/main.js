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
                                        <tr>
                                            <td>Nguyen Thi No</td>
                                            <td>0905009999</td>
                                            <td>notn@gmail.com</td>
                                            <td>22</td>
                                            <td> <span>Nam</span> </td>
                                            <td><a class="btn btn-primary btn-sm">Edit</a> |
                                                <a class="btn btn-danger btn-sm">Del</a>
                                            </td>
                                        </tr>
    `;
    tableUsers.insertAdjacentElement('beforeend', output)
}