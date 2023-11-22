document.addEventListener("DOMContentLoaded", function () {

    var storedUserInformation = localStorage.getItem('userInfo');

    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
    var parsedUserInformation = JSON.parse(storedUserInformation);

    // Truy cập giá trị của token từ đối tượng
    var token = parsedUserInformation.token;

    if (!token) {
        window.location.href = "home.html";
    } else {
        fetch('https://localhost:7156/api/Login/Check', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
                //Thêm các header khác nếu cần
            },
        })
            .then(response => {
                if (response.ok!=true ) {
                    window.location.href = "home.html";
                }
            })
            .then(data => {
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
    }
});