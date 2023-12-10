


document.addEventListener("DOMContentLoaded", function () {

    const storedUserInformation = localStorage.getItem('userInfo');
    const parsedUserInformation = JSON.parse(storedUserInformation);
    const driverId = parsedUserInformation.id;
    var checkWorked = false;

    setInterval(function () {
        fetch("https://localhost:7156/api/Driver/DriverInfor?driverId=" + driverId, {
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
                console.log("success:", data);
                checkWorked = data.driver.isWorked;
                var isNotWorked = document.getElementById("isNotWorked");
                var isWorked = document.getElementById("isWorked");
                if (checkWorked == false || checkWorked == null) {
                    isNotWorked.style.display = "block";
                    isWorked.style.display = "none";



                    fetch("https://localhost:7156/api/Driver/GetAllAppliedOrders/" + driverId, {
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

                            displayAppliedOrder(data);
                        })
                        .catch(error => {
                            console.error("Error:", error);
                            // Xử lý lỗi nếu cần
                        });









                } else {
                    isNotWorked.style.display = "none";
                    isWorked.style.display = "block";




                    fetch("https://localhost:7156/api/Driver/GetOnWorkedOrder/" + driverId, {
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








                }
            })
            .catch(error => {
                console.error("Error:", error);
                // Xử lý lỗi nếu cần
            })
    }
        , 1000);

})








function displayOnWorkedOrder(results) {
    var orderId = results.order.orderId;
    var OnWorkedOrder = document.getElementById("OnWorkedOrder");
    OnWorkedOrder.innerHTML = " ";
    OnWorkedOrder.innerHTML = `
                    <tr>
                        <td><strong>Tên đơn hàng:</strong></td>
                        <td>${results.order.orderName}</td>
                    </tr>
                    <tr>
                        <td><strong>Khách hàng (xem chi tiết):</strong></td>
                        <td><a target="_blank" href="../public/view_customer_infor.html?customerId=${results.order.customerId}" >${results.order.customer.fullName}</a></td>
                    </tr>
                    <tr>
                        <td><strong>Ngày đi:</strong></td>
                        <td>${results.order.orderedDate}</td>
                    </tr>
                    <tr>
                        <td><strong>Ngày đến:</strong></td>
                        <td>${results.order.arrivedDate}</td>
                    </tr>
                    <tr>
                        <td><strong>Điểm đi:</strong></td>
                        <td>${results.order.provinceGo} - ${results.order.districtGo} - ${results.order.wardGo} - ${results.order.detailPositionGo}</td>
                    </tr>
                    <tr>
                        <td><strong>Điểm đến:</strong></td>
                        <td>${results.order.provinceCome} - ${results.order.districtCome} - ${results.order.wardCome} - ${results.order.detailPositionCome}</td>
                    </tr>
                    <tr>
                        <td><strong>Tổng trọng lượng:</strong></td>
                        <td>${results.order.totalWeight} (kilogram)</td>
                    </tr>
                    <tr>
                        <td><strong>Tổng khối lượng:</strong></td>
                        <td>${results.order.totalMass} (mét khối)</td>
                    </tr>
                    <tr>
                        <td><strong>Tiền công:</strong></td>
                        <td>${results.order.totalAmount}</td>
                    </tr>
                `;
    var OnWorkedOrderStatus = document.getElementById("OnWorkedOrderStatus");
    OnWorkedOrderStatus.innerHTML = `
    <tr>
    <th>Mã trạng thái</th>
    <th>Trạng thái</th>
    <th>Thời gian cập nhật</th>
    </tr>
    `;
    results.status.forEach(result => {
        var tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${result.statusId}</td>
        <td>${result.statusType.statusName}</td>
        <td>${result.date}</td>
        `;
        OnWorkedOrderStatus.appendChild(tr);
    });

    var UpdateStatus = document.getElementById("UpdateStatus");
    switch (results.newStatus) {
        case 3:
            UpdateStatus.innerHTML = `
            <button onclick="updateStatus(5,${orderId})">Chuyển hàng đến khách</button>
            `;
            break;
        case 4:
            UpdateStatus.innerHTML = `
            <button onclick="updateStatus(5,${orderId})">Chuyển hàng đến khách</button>
            `;
            break;
        case 5:
            UpdateStatus.innerHTML = `
            <button onclick="updateStatus(6,${orderId})">Hàng đã đến nơi</button>
            <button onclick="updateStatus(13,${orderId})">Đang gặp trục trặc</button>
            `;
            break;
        case 6:
            UpdateStatus.innerHTML = `
            <button onclick="updateStatus(11,${orderId})">Xác nhận đã được thanh toán</button>
            <button onclick="updateStatus(9,${orderId})">Chuyển hàng đến kho gần nhất</button>
            `;
            break;
        case 8:
            UpdateStatus.innerHTML = `
            <button onclick="updateStatus(9,${orderId})">Chuyển hàng đến kho gần nhất</button>
            `;
            break;
        case 9:
            UpdateStatus.innerHTML = `
            <button onclick="updateStatus(14,${orderId})">Hàng đã đến kho</button>
            <button onclick="updateStatus(5,${orderId})">Chuyển hàng đến khách</button>
            `;
            break;
        case 13:
            UpdateStatus.innerHTML = `
            <button onclick="updateStatus(5,${orderId})">Chuyển hàng đến khách</button>
            `;
            break;
        case 14:
            UpdateStatus.innerHTML = `
            <button onclick="updateStatus(11,${orderId})">Xác nhận đã được thanh toán</button>
            `;
            break;
        case 11:
            UpdateStatus.innerHTML = `
            <p><font color="green">Hàng đã được thanh toán và chờ khách hàng xác nhận</font></p>
            `;
            break;

        case 12:
            UpdateStatus.innerHTML = `
            `;
            break;

        case 15:
            UpdateStatus.innerHTML = `
            <p><font color="green">Hàng đã được thanh toán và chờ khách hàng xác nhận</font></p>
            `;
            break;
    }

};

function updateStatus(statusId, driverId) {
    var api = "";
    switch (statusId) {
        case 5:
            api = "https://localhost:7156/api/Driver/DeliveringOrder/";
            break;
        case 6:
            api = "https://localhost:7156/api/Driver/DeliveredOrder/";
            break;
        case 9:
            api = "https://localhost:7156/api/Driver/AlteringOrder/";
            break;
        case 11:
            api = "https://localhost:7156/api/Driver/PayedOrder/";
            break;
        case 13:
            api = "https://localhost:7156/api/Driver/AccidentOrder/";
            break;
        case 14:
            api = "https://localhost:7156/api/Driver/AlteredOrder/";
            break;
    }

    fetch(api + driverId, {
        method: 'POST',
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
            window.location.href = "driver_home.html";
        })
        .catch(error => {
            console.error("Error:", error);
        });
}





function displayAppliedOrder(results) {

    var AppliedOrder = document.getElementById("AppliedOrder");
    AppliedOrder.innerHTML = " ";
    var th = document.createElement("tr");
    th.innerHTML = `
    <th>Mã đơn hàng</th>
    <th>Tên đơn hàng</th>
    <th>Xe ứng tuyển</th>
    <th>Được chọn</th>
`;
    AppliedOrder.appendChild(th);
    results.forEach(result => {
        var resultTr = document.createElement("tr");
        resultTr.innerHTML = `
    <td>${result.order.orderId} </td>
    <td><a href="detail_order.html?orderId=${result.order.orderId}&oVIId=${result.oVI.oviId}">${result.order.orderName} </a></td>
    <td>${result.oVI.vehicle.vehicleName} - ${result.oVI.description}</td>
    <input type="hidden" id="${result.order.orderId}" value= "${result.order.orderId}"/>
`;
        var td = document.createElement("td");
        if (result.isChoosen == true) {
            td.innerHTML = `<button onclick="xoaDonKhiDaDuocChon(${result.order.orderId})"><font color="red">Xóa ứng tuyển</font></button>
                <button onclick="nhanDon(${result.order.orderId})"><font color="green">Nhận đơn</font></button>
                `;
        }
        else {
            td.innerHTML = `<button onclick="xoaDonKhiChuaDuocChon(${result.oVI.oviId},${result.order.orderId})"><font color="red">Xóa ứng tuyển</font></button>
            `;
        }
        resultTr.appendChild(td);
        AppliedOrder.appendChild(resultTr);
    });

};


function xoaDonKhiDaDuocChon(orderId) {
    var confirmation = confirm("Bạn chắc chắn không muốn nhận đơn này?");
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
                    alert("Bạn đã không nhận đơn hàng " + orderId);
                    window.location.href = "driver_home.html";
                } else {
                    alert("Có lỗi xảy ra khi xóa tài xế.");
                    window.location.href = "driver_home.html";
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    } else {

    }
}


function xoaDonKhiChuaDuocChon(oVIId, orderId) {
    var confirmation = confirm("Bạn chắc chắn muốn XÓA ứng tuyển?");
    if (confirmation) {
        fetch('https://localhost:7156/api/Driver/DeleteApplyOrder/' + oVIId + '/' + orderId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then((response) => {
                if (!response.ok) {
                    alert("bạn đã XÓA trước đó rồi.");
                }
                return response.json();
            })
            .then(data => {
                console.log("success:", data);
                window.location.href = 'driver_home.html';
            })
            .catch(error => {
                alert("Có lỗi xảy ra khi xóa ứng tuyển.");
            });
    }
    else {
    }
}


function nhanDon(orderId) {
    var confirmation = confirm("Bạn chắc chắn muốn NHẬN đơn hàng này?");
    if (confirmation) {
        fetch('https://localhost:7156/api/Driver/ContractedByDriverOrder/' + orderId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then((response) => {
                if (!response.ok) {
                    alert("bạn đã Nhận trước đó rồi.");
                }
                return response.json();
            })
            .then(data => {
                console.log("success:", data);
                var storedUserInformation = localStorage.getItem('userInfo');
                var parsedUserInformation = JSON.parse(storedUserInformation);
                var driverId = parsedUserInformation.id;
                fetch('https://localhost:7156/api/Driver/TurnToBeWorked?driverId=' + driverId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("bạn đã Nhận trước đó rồi.");
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("success:", data);

                        window.location.href = 'driver_home.html';
                    })
                    .catch(error => {
                        alert("Có lỗi xảy ra khi xóa ứng tuyển.");
                    });
            })
            .catch(error => {
                alert("Có lỗi xảy ra khi xóa ứng tuyển.");
            });
    }
    else {
    }
}







