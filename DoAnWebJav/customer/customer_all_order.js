var storedUserInformation = localStorage.getItem('userInfo');
var parsedUserInformation = JSON.parse(storedUserInformation);
var customerId = parsedUserInformation.id;







let pageSize1 = 10;
let originalArray1 = [];
let currentPage1 = 1;
let displayArray1 = [];

const pagination1 = (currentPage1, numberItem1) => {
    let pri1 = document.getElementById("Previous1");
    let next1 = document.getElementById("Next1");
    pri1.style.display = "block";
    next1.style.display = "block";
    if (currentPage1 == 1) pri1.style.display = "none";

    const startIndex1 = (currentPage1 - 1) * numberItem1;
    currentPagenumberItem1 = startIndex1 + 1;
    displayArray1 = originalArray1.slice(startIndex1, startIndex1 + numberItem1);

    if ((originalArray1.slice(currentPage1 * numberItem1, currentPage1 * numberItem1 + numberItem1)).length === 0) next1.style.display = "none";
    displayInitOrder(displayArray1);
}

const goPrevious1 = () => {
    currentPage1--;
    if (currentPage1 < 0) {
        currentPage1 == 0;
    }
    else
        pagination1(currentPage1, pageSize1);
}
const goNext1 = () => {
    currentPage1++;
    pagination1(currentPage1, pageSize1);
}






let pageSize2 = 10;
let originalArray2 = [];
let currentPage2 = 1;
let displayArray2 = [];

const pagination2 = (currentPage2, numberItem2) => {
    let pri2 = document.getElementById("Previous2");
    let next2 = document.getElementById("Next2");
    pri2.style.display = "block";
    next2.style.display = "block";
    if (currentPage2 == 1) pri2.style.display = "none";

    const startIndex2 = (currentPage2 - 1) * numberItem2;
    currentPagenumberItem2 = startIndex2 + 1;
    displayArray2 = originalArray2.slice(startIndex2, startIndex2 + numberItem2);

    if ((originalArray2.slice(currentPage2 * numberItem2, currentPage2 * numberItem2 + numberItem2)).length === 0) next2.style.display = "none";
    displayWaitedDeliveredOrder(displayArray2);
}

const goPrevious2 = () => {
    currentPage2--;
    if (currentPage2 < 0) {
        currentPage2 == 0;
    }
    else
        pagination2(currentPage2, pageSize2);
}
const goNext2 = () => {
    currentPage2++;
    pagination2(currentPage2, pageSize2);
}





let pageSize3 = 10;
let originalArray3 = [];
let currentPage3 = 1;
let displayArray3 = [];

const pagination3 = (currentPage3, numberItem3) => {
    let pri3 = document.getElementById("Previous3");
    let next3 = document.getElementById("Next3");
    pri3.style.display = "block";
    next3.style.display = "block";
    if (currentPage3 == 1) pri3.style.display = "none";

    const startIndex3 = (currentPage3 - 1) * numberItem3;
    currentPagenumberItem3 = startIndex3 + 1;
    displayArray3 = originalArray3.slice(startIndex3, startIndex3 + numberItem3);

    if ((originalArray3.slice(currentPage3 * numberItem3, currentPage3 * numberItem3 + numberItem3)).length === 0) next3.style.display = "none";
    displayOnWorkedOrder(displayArray3);
}

const goPrevious3 = () => {
    currentPage3--;
    if (currentPage3 < 0) {
        currentPage3 == 0;
    }
    else
        pagination3(currentPage3, pageSize3);
}
const goNext3 = () => {
    currentPage3++;
    pagination3(currentPage3, pageSize3);
}





let pageSize4 = 10;
let originalArray4 = [];
let currentPage4 = 1;
let displayArray4 = [];

const pagination4 = (currentPage4, numberItem4) => {
    let pri4 = document.getElementById("Previous4");
    let next4 = document.getElementById("Next4");
    pri4.style.display = "block";
    next4.style.display = "block";
    if (currentPage4 == 1) pri4.style.display = "none";

    const startIndex4 = (currentPage4 - 1) * numberItem4;
    currentPagenumberItem4 = startIndex4 + 1;
    displayArray4 = originalArray4.slice(startIndex4, startIndex4 + numberItem4);

    if ((originalArray4.slice(currentPage4 * numberItem4, currentPage4 * numberItem4 + numberItem4)).length === 0) next4.style.display = "none";
    displayAllHistory(displayArray4);
}

const goPrevious4 = () => {
    currentPage4--;
    if (currentPage4 < 0) {
        currentPage4 == 0;
    }
    else
        pagination4(currentPage4, pageSize4);
}
const goNext4 = () => {
    currentPage4++;
    pagination4(currentPage4, pageSize4);
}








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
    //setInterval(function () {
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

            //displayInitOrder(data);
            originalArray1 = data;
            pagination1(1, pageSize1);
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

            //displayWaitedDeliveredOrder(data);
            originalArray2 = data;
            pagination2(1, pageSize2);
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

            //displayOnWorkedOrder(data);
            originalArray3 = data;
            pagination3(1, pageSize3);
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

            //displayAllHistory(data);
            originalArray4 = data;
            pagination4(1, pageSize4);
        })
        .catch(error => {
            console.error("Error:", error);
            // Xử lý lỗi nếu cần
        });
    // }, 5000);

});




function displayAllHistory(results) {

    var history = document.getElementById("history");
    history.innerHTML = "";
    if (results.length === 0) {
        history.innerHTML = `
    <tr>
    <th>Mã đơn hàng</th>
    <th>Tên đơn hàng</th>
    <th>Tài xế ứng tuyển</th>
    <th>Đánh giá</th>
    </tr>
    <tr>
    <td colspan="4">Bạn chưa có đơn hàng nào hoàn thành</td>
    </tr>
    `;
    }
    else {
        var th = document.createElement("tr");
        th.innerHTML = `
                <th>Mã đơn hàng</th>
                <th>Tên đơn hàng</th>
                <th>Tài xế ứng tuyển</th>
                <th>Đánh giá</th>
            `;
        history.appendChild(th);
        results.forEach(result => {
            var resultTr = document.createElement("tr");
            if (result.statusId == 139) {
                console.log("fix");
                resultTr.innerHTML = `
                    <td>${result.order.orderId} </td>
                    <td><a>${result.order.orderName} </a></td>
                    <td colspan=2><p><font color="red">Đã hết hạn</font></p></td>
                    `;
            }
            else {

                resultTr.innerHTML = `
                    <td>${result.order.orderId} </td>
                    <td><a href="detail_order.html?orderId=${result.order.orderId}" target="blank">${result.order.orderName} </a></td>
                    <td><a href="../public/view_driver_infor.html?driverId=${result.order.ownedVehicleInfor.driverId}" target="blank">${result.order.ownedVehicleInfor.driver.fullName} - ${result.order.ownedVehicleInfor.vehicle.vehicleName} - ${result.order.ownedVehicleInfor.description}</a></td>
                `;

                var td = document.createElement("td");
                if (result.statusId == 12)
                    td.innerHTML = `<button onclick="createRate(${result.order.orderId},${result.order.ownedVehicleInfor.driverId})">Đánh giá</button>
                        <div>
                        <div>1   2   3   4   5</div>
                        <div>
                            <input type="radio"  class="${result.order.orderId}"  name="r${result.order.orderId}" value=1 >
                            <input type="radio"  class="${result.order.orderId}"  name="r${result.order.orderId}" value=2 >
                            <input type="radio"  class="${result.order.orderId}"  name="r${result.order.orderId}" value=3 >
                            <input type="radio"  class="${result.order.orderId}"  name="r${result.order.orderId}" value=4 >
                            <input type="radio"  class="${result.order.orderId}"  name="r${result.order.orderId}" value=5 >
                        </div>
                        
                        </div>
                        <textarea type="text" id="c${result.order.orderId}" />`;

                else
                    td.innerHTML = `<p><font>Đã đánh giá</font></p>`;
                resultTr.appendChild(td);

            }
            history.appendChild(resultTr);
        });
    }
};




// function handleRadioChange(selectedRadio) {
//     // Lấy tất cả các ô chọn cùng một nhóm
//     var radios = document.querySelectorAll('input[class="' + selectedRadio.class + '"]');

//     // Lấy vị trí của ô chọn đã chọn trong danh sách
//     var selectedIndex = Array.from(radios).indexOf(selectedRadio);

//     // Duyệt qua tất cả các ô chọn và đặt hiển thị dựa trên vị trí
//     radios.forEach(function (radio, index) {
//         radio.style.display = index <= selectedIndex ? 'inline-block' : 'none';
//     });
// }

function createRate(orderId, driverId) {

    var storedUserInformation = localStorage.getItem('userInfo');
    var parsedUserInformation = JSON.parse(storedUserInformation);
    var customerId = parsedUserInformation.id;
    var comment = document.getElementById('c' + orderId).value;
    var rate = 0;
    var radios = document.getElementsByName('r' + orderId);
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            rate = radios[i].value;
            break;
        }
    }
    if (rate == 0) {
        alert("bạn phải chọn đánh giá");
    }
    else
        fetch("https://localhost:7156/api/Customer/RateDriver", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                rate: rate,
                commnent: comment,
                driverId: driverId,
                customerId: customerId,
                orderId: orderId,
                status: true,
                commenDate: new Date(),
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                window.location.href = "customer_all_order.html?page=4";
            })
            .catch(error => {
                console.error("Error:", error);
            });
}



function displayOnWorkedOrder(results) {

    var onWorkedOrder = document.getElementById("onWorkedOrder");
    onWorkedOrder.innerHTML = "";
    if (results.length === 0) {
        onWorkedOrder.innerHTML = `
    <tr>
    <th>Mã đơn hàng</th>
    <th>Tên đơn hàng</th>
    <th>Tài xế</th>
    <th>trạng thái đơn hàng hiện tại</th>
    <th>Thời gian đến dự kiến</th>
    <th>Xác nhận đơn hàng</th>
    </tr>
    <tr>
    <td colspan="6">Bạn chưa có đơn hàng nào đang hoạt động</td>
    </tr>
    `;
    }
    else {
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
            var orderId = result.order.orderId;
            var resultTr = document.createElement("tr");
            resultTr.innerHTML = `
    <td>${result.order.orderId} </td>
    <td><a href="detail_order.html?orderId=${result.order.orderId}" target="blank">${result.order.orderName} </a></td>
    <td><a href="../public/view_driver_infor.html?driverId=${result.order.ownedVehicleInfor.driverId}" target="blank">${result.order.ownedVehicleInfor.driver.fullName} - ${result.order.ownedVehicleInfor.vehicle.vehicleName} - ${result.order.ownedVehicleInfor.description}</a></td>
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
            <button onclick="updateStatus(8,${orderId})">Chưa thể nhận</button></td>
            `;
            }
            else if (result.statusId == 14) {
                button.innerHTML = `<td>Hãy thanh toán để tài xế xác nhận nhập kho</td>
            `;
            }
            else if (result.statusId == 15 || result.statusId == 11) {
                button.innerHTML = `<td><button onclick="updateStatus(12,${orderId})">Xác nhận kết thúc đơn hàng</button><td>
            `;
            }
            else {
                button.innerHTML = `<td></td>
            `;
            }

            resultTr.appendChild(button);
            onWorkedOrder.appendChild(resultTr);
        });
    }
};



function updateStatus(statusId, driverId) {
    var api = "";
    switch (statusId) {
        case 8:
            api = "https://localhost:7156/api/Customer/UnTakenOrder/";
            break;
        case 12:
            api = "https://localhost:7156/api/Customer/TakenOrder/";
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
            window.location.href = "customer_all_order.html?page=3";
        })
        .catch(error => {
            console.error("Error:", error);
        });
}




function displayWaitedDeliveredOrder(results) {

    var waitedOrder = document.getElementById("waitedOrder");
    waitedOrder.innerHTML = "";
    if (results.length === 0) {
        waitedOrder.innerHTML = `
    <tr>
    <th>Mã đơn hàng</th>
    <th>Tên đơn hàng</th>
    <th>Tài xế ứng tuyển</th>
    </tr>
    <tr>
    <td colspan="3">Bạn chưa có đơn hàng nào được chọn</td>
    </tr>
    `;
    }
    else {
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
    <td><a href="detail_order.html?orderId=${result.orderId}" target="blank">${result.orderName} </a></td>
    <td><a href="../public/view_driver_infor.html?driverId=${result.ownedVehicleInfor.driverId}" target="blank">${result.ownedVehicleInfor.driver.fullName} - ${result.ownedVehicleInfor.vehicle.vehicleName} - ${result.ownedVehicleInfor.description}</a></td>
    <input type="hidden" id="${result.orderId}" value= "${result.ownedVehicleInfor.oVIId}"/>
    <td><button onclick="xoaTaiXe(${result.orderId})">Xóa tài xế</button></td>
`;

            waitedOrder.appendChild(resultTr);
        });
    }
};





function displayInitOrder(results) {

    var initOrder = document.getElementById("initOrder");
    initOrder.innerHTML = "";
    if (results.length === 0) {
        initOrder.innerHTML = `
    <tr>
    <th>Mã đơn hàng</th>
    <th>Tên đơn hàng</th>
    <th>Tài xế ứng tuyển</th>
    </tr>
    <tr>
    <td colspan="3">Bạn chưa có đơn hàng nào, hãy tạo đơn</td>
    </tr>
    `;
    }
    else {
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
        <td><a href="detail_order.html?orderId=${result.orderId}" target="blank">${result.orderName} </a></td>
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
                        var deleteButton = document.createElement("td")
                        deleteButton.innerHTML = `<button onclick="xoaDon(${orderId})">Xóa</button>`;
                        td2.innerHTML = `<button onclick="chonTaiXe(${orderId})">Chọn tài xế</button> `;
                        td.appendChild(select);
                        resultTr.appendChild(td);
                        resultTr.appendChild(td2);
                        resultTr.appendChild(deleteButton);
                        initOrder.appendChild(resultTr);
                    }
                    else {
                        var chuaCoTX = document.createElement("td");
                        chuaCoTX.colSpan = 2;
                        var deleteButton = document.createElement("td")
                        deleteButton.innerHTML = `<button onclick="xoaDon(${orderId})">Xóa</button>`;
                        chuaCoTX.innerHTML = `<p>chưa có tài xế</p>`;
                        resultTr.appendChild(chuaCoTX);
                        //resultTr.appendChild(document.createElement("td"));
                        resultTr.appendChild(deleteButton);
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
    }
};


function xoaDon(orderId) {
    var confirmation = confirm("Bạn chắc chắn muốn xóa đơn hàng ?");

    if (confirmation) {

        fetch('https://localhost:7156/api/Customer/deleteOrder?orderId=' + orderId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
            .then(response => response.json())
            .then(data => {
                console.log("success:", data);
                window.location.href = "customer_all_order.html?page=1";
            })
            .catch(error => {
                console.error("Error:", error);
            });

    }
}



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