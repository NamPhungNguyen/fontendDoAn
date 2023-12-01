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

    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");

    if (page == null || page == 0) {
        // Xử lý khi page là null hoặc 0
    } else {
        for (var i = 1; i <= 4; i++) {
            var myDiv = document.getElementById("page" + i);

            if (i == page) {
                // Hiển thị div có ID là "page" + i
                myDiv.style.display = "block"; // hoặc myDiv.style.display = "";
            } else {
                // Ẩn các div khác
                myDiv.style.display = "none";
            }
        }
    }

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

            displayInitOrder(data);
        })
        .catch(error => {
            console.error("Error:", error);
            // Xử lý lỗi nếu cần
        });



    fetch("https://localhost:7156/api/Customer/GetAllWaitedDeliveredOrders/" + customerId, {
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

            displayWaitedDeliveredOrder(data);
        })
        .catch(error => {
            console.error("Error:", error);
            // Xử lý lỗi nếu cần
        });



    fetch("https://localhost:7156/api/Customer/GetAllOnWorkedOrders/" + customerId, {
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

            displayOnWorkedOrder(data);
        })
        .catch(error => {
            console.error("Error:", error);
            // Xử lý lỗi nếu cần
        });


    fetch("https://localhost:7156/api/Customer/GetAllHistory/" + customerId, {
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

            displayAllHistory(data);
        })
        .catch(error => {
            console.error("Error:", error);
            // Xử lý lỗi nếu cần
        });


});




function displayAllHistory(results) {

    var history = document.getElementById("history");
    history.innerHTML = "";
    var th = document.createElement("tr");
    th.innerHTML = `
    <th>Mã đơn hàng</th>
    <th>Tên đơn hàng</th>
    <th>Tài xế ứng tuyển</th>
    <th>Tình trạng sau khi kết thúc đơn</th>
`;
history.appendChild(th);
    results.forEach(result => {
        var resultTr = document.createElement("tr");
        resultTr.innerHTML = `
    <td>${result.orderId} </td>
    <td>${result.orderName} </td>
    <td>${result.ownedVehicleInfor.driver.fullName} - ${result.ownedVehicleInfor.vehicle.vehicleName} - ${result.ownedVehicleInfor.description}</td>
    <input type="hidden" id="${result.orderId}" value= "${result.ownedVehicleInfor.oVIId}"/>
    <td><button onclick="xoaTaiXe(${result.orderId})">Xóa tài xế</button></td>
`;

history.appendChild(resultTr);
    });

};




function displayOnWorkedOrder(results) {

    var onWorkedOrder = document.getElementById("onWorkedOrder");
    onWorkedOrder.innerHTML = "";
    var th = document.createElement("tr");
    th.innerHTML = `
    <th>Mã đơn hàng</th>
    <th>Tên đơn hàng</th>
    <th>Tài xế</th>
    <th>trạng thái đơn hàng hiện tại</th>
    <th>Thời gian đến dự kiến</th>
    <th>Xác nhận đơn hàng</th>
`;
    onWorkedOrder.appendChild(th);
    results.forEach(result => {
        var resultTr = document.createElement("tr");
        resultTr.innerHTML = `
    <td>${result.order.orderId} </td>
    <td>${result.order.orderName} </td>
    <td>${result.order.ownedVehicleInfor.driver.fullName} - ${result.order.ownedVehicleInfor.vehicle.vehicleName} - ${result.order.ownedVehicleInfor.description}</td>
    <td>${result.status} </td>
`;
        var td = document.createElement(td);
        if (new Date(result.order.arrivedDate) <= new Date()) {
            td.innerHTML = `<font color="red">${result.order.arrivedDate}</font>`;
        }
        else {
            td.innerHTML = `<font color="green">${result.order.arrivedDate}</font>`;
        }
        resultTr.appendChild(td);
        var button = document.createElement("td");
        if (result.statusId == 6) {
            button.innerHTML = `<td><p>Hãy thanh toán để xác nhận lấy hàng</p>
            <button>Chưa thể nhận</button></td>
            `;
        }
        else if (result.statusId == 14) {
            button.innerHTML = `<td>Hãy thanh toán để tài xế xác nhận nhập kho</td>
            `;
        }
        else if (result.statusId == 15 || result.statusId == 11) {
            button.innerHTML = `<td><button>Xác nhận kết thúc đơn hàng</button><td>
            `;
        }
        else {
            button.innerHTML = `<td></td>
            `;
        }

        resultTr.appendChild(button);
        onWorkedOrder.appendChild(resultTr);
    });

};



function displayWaitedDeliveredOrder(results) {

    var waitedOrder = document.getElementById("waitedOrder");
    waitedOrder.innerHTML = "";
    var th = document.createElement("tr");
    th.innerHTML = `
    <th>Mã đơn hàng</th>
    <th>Tên đơn hàng</th>
    <th>Tài xế ứng tuyển</th>
`;
    waitedOrder.appendChild(th);
    results.forEach(result => {
        var resultTr = document.createElement("tr");
        resultTr.innerHTML = `
    <td>${result.orderId} </td>
    <td>${result.orderName} </td>
    <td>${result.ownedVehicleInfor.driver.fullName} - ${result.ownedVehicleInfor.vehicle.vehicleName} - ${result.ownedVehicleInfor.description}</td>
    <input type="hidden" id="${result.orderId}" value= "${result.ownedVehicleInfor.oVIId}"/>
    <td><button onclick="xoaTaiXe(${result.orderId})">Xóa tài xế</button></td>
`;

        waitedOrder.appendChild(resultTr);
    });

};





function displayInitOrder(results) {

    var initOrder = document.getElementById("initOrder");
    initOrder.innerHTML = "";
    var th = document.createElement("tr");
    th.innerHTML = `
        <th>Mã đơn hàng</th>
        <th>Tên đơn hàng</th>
        <th>Tài xế ứng tuyển</th>
        <th></th>
        
    `;
    initOrder.appendChild(th);
    results.forEach(result => {
        var resultTr = document.createElement("tr");
        var orderId = result.orderId;
        resultTr.innerHTML = `
        <td>${result.orderId} </td>
        <td>${result.orderName} </td>
    `;

        var select = document.createElement("select");
        select.id = orderId;
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
                var dataLength = data.length;
                if (dataLength >= 1) {
                    data.forEach(result => {
                        var option = document.createElement("option");
                        option.value = result.oviId;
                        option.text = result.ownedVehicleInfor.driver.fullName + " - " + result.ownedVehicleInfor.vehicle.vehicleName + " - " + result.ownedVehicleInfor.description;
                        select.appendChild(option);
                    });

                    var td = document.createElement("td");
                    var td2 = document.createElement("td");
                    td2.innerHTML = `<button onclick="chonTaiXe(${orderId})">Chọn tài xế</button> `;
                    td.appendChild(select);
                    resultTr.appendChild(td);
                    resultTr.appendChild(td2);
                    initOrder.appendChild(resultTr);
                }
                else {
                    var chuaCoTX = document.createElement("td");
                    chuaCoTX.innerHTML = `<p>chưa có tài xế</p>`;
                    resultTr.appendChild(chuaCoTX);
                    resultTr.appendChild(document.createElement("td"));
                    initOrder.appendChild(resultTr);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                // Xử lý lỗi nếu cần
            });

        // var td = document.createElement("td");
        // var td2 = document.createElement("td");
        // td2.innerHTML = `<button>Chọn tài xế</button> `;
        // td.appendChild(select);
        // resultTr.appendChild(td);
        // resultTr.appendChild(td2);
        // initOrder.appendChild(resultTr);


    });

};


function chonTaiXe(orderId) {
    var confirmation = confirm("Bạn chắc chắn muốn chọn tài xế ?");

    var oVIId = document.getElementById(orderId).value;
    if (confirmation) {
        fetch('https://localhost:7156/api/Customer/AcceptedOrder/' + orderId + '/' + oVIId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => response.json())
            .then(data => {
                console.log("success:", data);
                if (data === true) {
                    fetch('https://localhost:7156/api/Customer/ContractedByCustomerOrder/' + orderId, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({}),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log("success:", data);
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
                    alert("Bạn đã xác nhận tài xế cho đơn hàng " + orderId);
                    window.location.href = "customer_all_order.html?page=2";
                } else {
                    alert("Có lỗi xảy ra khi chọn tài xế.");
                    window.location.href = "customer_home.html";
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    } else {

    }
}




function xoaTaiXe(orderId) {
    var confirmation = confirm("Bạn chắc chắn muốn xóa tài xế ?");

    var oVIId = document.getElementById(orderId).value;
    if (confirmation) {
        fetch('https://localhost:7156/api/Customer/DeleteContractedByCustomerOrder/' + orderId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => response.json())
            .then(data => {
                console.log("success:", data);
                if (data === true) {
                    fetch('https://localhost:7156/api/Customer/DeleteAcceptedOrder/' + orderId, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({}),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log("success:", data);
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
                    alert("Bạn đã xóa tài xế của đơn hàng " + orderId);
                    window.location.href = "customer_all_order.html?page=1";
                } else {
                    alert("Có lỗi xảy ra khi xóa tài xế.");
                    window.location.href = "customer_home.html";
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    } else {

    }
}