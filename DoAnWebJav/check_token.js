document.addEventListener("DOMContentLoaded", function () {
    var storedUserInformation = localStorage.getItem('userInfo');
    var parsedUserInformation = JSON.parse(storedUserInformation);

    var token = parsedUserInformation.token;
    var roleId = parsedUserInformation.roleId;

    if (!token || roleId !== 4) {
        window.location.href = "index.html";
    } else {
        var username = parsedUserInformation.username; // Giả sử thông tin username được lưu trong userInfo

        var userInfoElement = document.createElement('span');
        userInfoElement.textContent = 'Welcome, ' + username; // Thông tin về người dùng

        var userInfoContainer = document.getElementById('user-info');
        userInfoContainer.appendChild(userInfoElement);

        fetch('https://localhost:7156/api/Login/Check', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
                //Thêm các header khác nếu cần
            },
        })
        .then(response => {
            if (response.ok !== true) {
                window.location.href = "/DoAnWebJav/driver_home.html";
            }
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
        });
    }
});