var storedUserInformation = localStorage.getItem('userInfo');
var parsedUserInformation = JSON.parse(storedUserInformation);
var customerId = parsedUserInformation.id;

$(document).ready(function () {
    // Handle navbar link clicks
    $('#navbar2 a').click(function (e) {
        e.preventDefault();
        var page = $(this).data('page');
        showContent(page);
    });

    function showContent(page) {
        // Ẩn tất cả các phần
        $('#content > div').hide();
        // Hiển thị phần tương ứng với trang được chọn
        $('#' + page).show();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("https://localhost:7156/api/Customer/GetAllInitializedOrders/" + customerId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Hiển thị kết quả trong div lớn
            displayInitOrder(data);;
        })
        .catch(error => {
            console.error("Error:", error);
            // Xử lý lỗi nếu cần
        });


});



function displayInitOrder(results) {

    var initOrder = document.getElementById("initOrder");
    initOrder.innerHTML = "";
    var th = document.createElement("tr");
    th.innerHTML = `
        <th>Mã đơn hàng</th>
        <th>Tên đơn hàng</th>
        <th>Tài xế ứng tuyển</th>
    `;
    initOrder.appendChild(th);
    results.forEach(result => {
        var resultTr = document.createElement("tr");
        resultTr.innerHTML = `
        <td>${result.orderId} </td>
        <td>${result.orderName} </td>
    `;

        var select = document.createElement("select");
        var dt = [];
        fetch("https://localhost:7156/api/Customer/WishAcceptDriverList/" + result.orderId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {


                dt = data;
                // if (dataLength >= 1) {

                //     data.forEach(result => {
                //         var option = document.createElement("option");
                //         option.value = result.oviId;
                //         option.text = result.ownedVehicleInfor.driver.fullName + " - " + result.ownedVehicleInfor.vehicle.vehicleName + " - " + result.ownedVehicleInfor.description;
                //         select.appendChild(option);

                //     })
                // }
                // else { select.disabled; }
            })
            .catch(error => {
                console.error("Error:", error);
                // Xử lý lỗi nếu cần
            });
        const dataLength = dt.length;
        if (dataLength >= 1) {

            dt.forEach(result => {
                var option = document.createElement("option");
                option.value = result.oviId;
                option.text = result.ownedVehicleInfor.driver.fullName + " - " + result.ownedVehicleInfor.vehicle.vehicleName + " - " + result.ownedVehicleInfor.description;
                select.appendChild(option);

            });
            var td = document.createElement("td");
            var td2 = document.createElement("td");
            td2.innerHTML = `<button>Chọn tài xế</button> `;
            td.appendChild(select);
            resultTr.appendChild(td);
            resultTr.appendChild(td2);
            initOrder.appendChild(resultTr);
        }
        else {
            // var td = document.createElement("td");
            // var td2 = document.createElement("td");
            // td2.innerHTML = `<button>Chọn tài xế</button> `;
            // td.appendChild(select);
            // resultTr.appendChild(td);
            // resultTr.appendChild(td2);
            // initOrder.appendChild(resultTr);
        }

        // var td = document.createElement("td");
        // var td2 = document.createElement("td");
        // td2.innerHTML = `<button>Chọn tài xế</button> `;
        // td.appendChild(select);
        // resultTr.appendChild(td);
        // resultTr.appendChild(td2);
        // initOrder.appendChild(resultTr);


    });

};
