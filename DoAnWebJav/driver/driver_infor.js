var storedUserInformation = localStorage.getItem("userInfo");
var parsedUserInformation = JSON.parse(storedUserInformation);
var userInfoContainer = document.getElementById("user-info");
if (parsedUserInformation) {
  var username = parsedUserInformation.username; // Giả sử tên người dùng được lưu trong userInfo
  var driver_id = parsedUserInformation.id; // Giả sử tên người dùng được lưu trong userInfo

  var userInfoElement = document.createElement("span");
  userInfoElement.textContent = "Chào, " + username; // Thông tin về người dùng

  userInfoContainer.appendChild(userInfoElement);

  logoutButton.addEventListener("click", function () {
    // Xóa thông tin người dùng từ localStorage và chuyển hướng về trang đăng nhập
    localStorage.removeItem("userInfo");
    window.location.href = "../public/login.html";
  });

  userInfoContainer.appendChild(logoutButton);
} else {
  // Chuyển hướng về trang đăng nhập nếu thông tin người dùng không được tìm thấy
  window.location.href = "../public/login.html";
}


// api lấy thông tin driver
const apiInforDriver = `https://localhost:7156/api/Driver/DriverInfor?driverId=${driver_id}`;

// api update driver
const apiUpdateDriver = `https://localhost:7156/api/Driver/UpdateDriver?driverId=${driver_id}`;

// api lấy danh sách xe
const apiGetNumberVehicle = `https://localhost:7156/api/Driver/GetVehicleList?driverId=${driver_id}`;

// api thêm vehicle
const apiAddVehicle = `https://localhost:7156/api/Driver/CreateVehicle`;

// api sửa xoá vehicle
const apiDeleteVehicle = `https://localhost:7156/api/Driver/DeleteVehicle?id=1`;

// lấy thông tin driver
fetch(apiInforDriver)
  .then((response) => {
    // Kiểm tra xem phản hồi có thành công không (status code 200)
    if (!response.ok) {
      throw new Error(`Lỗi mạng: ${response.status}`);
    }

    // Chuyển đổi phản hồi sang đối tượng JSON
    return response.json();
  })
  .then((data) => {
    // Xử lý dữ liệu từ phản hồi ở đây
    var dataDriver = data.driver;
    var vehicler = data.vehicle;
    var dataVehicler = vehicler[0].vehicle;
    // lấy thông tin driver
    var driver_name = document.querySelector(".driver_name");
    var image_driver = document.querySelector(".image_driver");
    var password = document.querySelector(".password");
    var email = document.querySelector(".email");
    var address = document.querySelector(".address");
    var phone = document.querySelector(".phone");
    driver_name.value = dataDriver.fullName;
    password.value = dataDriver.password;
    email.value = dataDriver.email;
    address.value = dataDriver.address;
    phone.value = dataDriver.phoneNumber;
    image_driver.src = dataDriver.avatarImageLink
      ? dataDriver.avatarImageLink
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTht9-qZYmqErdGMhJVbRf7BfhLRGspNWaFnR8nddu3x7Da7nqh23vsG6VWtG_VE9G9kLU&usqp=CAU";

    var name_verhicle = document.querySelector(".name_verhicle");
    var number_wheel = document.querySelector(".number_wheel");
    var status_verhicle = document.querySelector(".status_verhicle");
    var status_verhicle_true = document.querySelector(".status_verhicle_true");
    var status_verhicle_false = document.querySelector(
      ".status_verhicle_false"
    );
    name_verhicle.value = dataVehicler.vehicleName;
    number_wheel.value = dataVehicler.wheel;
    status_verhicle.value = dataVehicler.status;

    if (dataVehicler.status) {
      status_verhicle_true.checked = true;
    } else {
      status_verhicle_false.checked = true;
    }


    var storedUserInformation = localStorage.getItem("userInfo");
    var parsedUserInformation = JSON.parse(storedUserInformation);

    if (parsedUserInformation) {
        parsedUserInformation.username = dataDriver.fullName;
         // Cập nhật lại tên người dùng trong localStorage
        localStorage.setItem("userInfo", JSON.stringify(parsedUserInformation));

        // Tạo một container để chứa cả thông tin người dùng và nút đăng xuất
        var userInfoContainer = document.getElementById("user-info");

        var userGreeting = document.createElement("span");
        userGreeting.textContent = "Chào, " +     dataDriver.fullName;
        ; // Thông tin về người dùng

        var logoutButton = document.createElement("button");
        logoutButton.id = "logoutButton";
        logoutButton.textContent = "Đăng xuất";
        logoutButton.addEventListener("click", function () {
            // Xóa thông tin người dùng từ localStorage và chuyển hướng về trang đăng nhập
            localStorage.removeItem("userInfo");
            window.location.href = "../public/login.html";
        });

        userInfoContainer.innerHTML = ''; // Xóa nội dung hiện tại của userInfoContainer
        userInfoContainer.appendChild(userGreeting);
        userInfoContainer.appendChild(logoutButton);
    }
    // lấy thông tin xe
  })
  .catch((error) => {
    // Xử lý lỗi ở đây
    console.error("Đã xảy ra lỗi:", error);
  });

// chỉnh sửa thông tin driver
const form = document.querySelector(".form-user");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của form
  // Xử lí update dữ liệu
  const driverName = document.querySelector(".driver_name").value;
  const password = document.querySelector(".password").value;
  const email = document.querySelector(".email").value;
  const address = document.querySelector(".address").value;
  const phone = document.querySelector(".phone").value;
  const updatedData = {
    fullName: driverName,
    password: password,
    email: email,
    address: address,
    phoneNumber: phone,
    roleId: 3,
    able: true,
    status: true,
  };
  console.log(updatedData);
  fetch(apiUpdateDriver, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Lỗi mạng: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Xử lý phản hồi từ server (nếu cần)
      console.log("Dữ liệu sau khi cập nhật:", data);
      window.location.reload();
    })
    .catch((error) => {
      // Xử lý lỗi ở đây
      console.error("Đã xảy ra lỗi:", error);
    });
});



fetch(apiGetNumberVehicle)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Lỗi mạng: ${response.status}`);
    }
    return response.json();
  })
  .then((dataVehicles) => {
    const table = document.getElementById("table-user");

    // Xóa mọi hàng hiện tại trong bảng
    // while (table.rows.length > 1) {
    //   table.deleteRow(1);
    // }

    // Lặp qua từng phần tử trong mảng xe
    dataVehicles.forEach((vehicle) => {
      // Tạo một hàng mới trong bảng
      console.log(vehicle.oviId);
      const row = table.insertRow(-1);

      // Thêm các ô dữ liệu vào hàng
      const nameCell = row.insertCell(0);
      nameCell.textContent = vehicle.name;

      const desCell = row.insertCell(1);
      desCell.textContent = vehicle.description;

      const cargoCell = row.insertCell(2);
      cargoCell.textContent = vehicle.cargo;

      const fuelEfficiencyCell = row.insertCell(3);
      fuelEfficiencyCell.textContent = vehicle.fuelEfficiency;

      const statusCell = row.insertCell(4);
      statusCell.innerHTML = `<span>${vehicle.status}</span>`;

      const actionCell = row.insertCell(5);

      // Tạo nút Edit
      const editButton = document.createElement("a");
      editButton.className = "btn btn-primary btn-sm";
      editButton.textContent = "Edit";
      // Thêm sự kiện click cho nút "Edit" (thêm xử lý tương ứng)

      // Tạo nút Delete
      const deleteButton = document.createElement("a");
      deleteButton.className = "btn btn-danger btn-sm btnDelete";
      deleteButton.textContent = "Del";
      // Thêm sự kiện click cho nút "Delete"
      deleteButton.addEventListener("click", function () {
        handleDeleteVehicle(vehicle.oviId); // Gọi hàm xóa xe với ID hoặc thông tin phù hợp từ API
      });

      // Thêm nút Edit và nút Delete vào ô hành động
      actionCell.appendChild(editButton);
      actionCell.appendChild(document.createTextNode(" | "));
      actionCell.appendChild(deleteButton);
    });
  })
  .catch((error) => {
    console.error("Lỗi khi lấy danh sách xe:", error);
  });

function handleDeleteVehicle(oviId) {
  const deleteApiUrl = `https://localhost:7156/api/Driver/DeleteVehicle?id=${oviId}`;

  // Gửi yêu cầu xóa xe đến API
  fetch(deleteApiUrl, {
    method: "PUT",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Lỗi mạng: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      // Xóa hàng liên quan từ bảng sau khi xóa thành công từ API
      const table = document.getElementById("table-user");
      const rowIndex = findRowIndexByoviId(table, oviId);
      if (rowIndex !== -1) {
        table.deleteRow(rowIndex);
      } else {
        console.error("Không tìm thấy hàng để xóa.");
      }
      window.location.reload();
    })
    .catch((error) => {
      console.error("Lỗi khi xóa xe:", error);
    });
}

function findRowIndexByoviId(table, oviId) {
  // Tìm vị trí của hàng có chứa thông tin xe với ID tương ứng
  for (let i = 1; i < table.rows.length; i++) {
    const idCell = table.rows[i].cells[0]; // Giả sử ID của xe ở cột đầu tiên
    if (idCell.textContent === oviId.toString()) {
      return i;
    }
  }
  return -1; // Trả về -1 nếu không tìm thấy
}





//   console.log(driver_id);
// thêm vehicle
const btnaddvehicle = document.querySelector(".btn-add-vehicle");
const formVehicle = document.querySelector(".form-create-vehicle");
formVehicle.addEventListener("submit", (e) => {
  // Lấy dữ liệu từ các trường nhập liệu trong modal thêm xe
  e.preventDefault();
  // const nameVehicle = document.querySelector(".name-vehicle").value;
  const descriptionVehicle = document.querySelector(
    ".description-vehicle"
  ).value;
  const cargoVehicle = parseFloat(document.querySelector(".cargo-vehicle").value);
  const fuelEfficiencyVehicle = parseFloat(document.querySelector(".fuelEfficiency-vehicle").value);

  const statusVehicle = document.querySelector(".status-vehicle").checked;
  // Tạo đối tượng chứa dữ liệu để gửi lên API
  const newVehicle = {
    oviId: 25,
    driverId: driver_id,
    vihcleId: 0,
    description: descriptionVehicle,
    cargo: cargoVehicle,
    fuelEfficiency: fuelEfficiencyVehicle,
    status: statusVehicle,
  };
  console.log(newVehicle);
  // Gửi dữ liệu lên API để thêm mới xe
  fetch(apiAddVehicle, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newVehicle),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Lỗi mạng: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Xe đã được thêm mới:", data);

      window.location.reload();
      // Thực hiện các hành động tương ứng sau khi thêm mới xe thành công
      // Ví dụ: cập nhật bảng hoặc hiển thị thông báo
    })
    .catch((error) => {
      console.error("Đã xảy ra lỗi khi thêm mới xe:", error);
    });
});




// xoá vehicle
// const listBtnDelete = document.querySelectorAll(".btnDelete");



// setTimeout(() => {
//   const btnDeleteList = document.querySelectorAll(".btnDelete");
//   // console.log(btnDeleteList);
// }, 1000);
// // Gửi request DELETE để xoá phương tiện từ API
// function deleteVehicle(id) {
//   const apiDeleteVehicle = `https://localhost:7156/api/Driver/DeleteVehicle?id=${id}`;
//   fetch(apiDeleteVehicle, {
//     method: "PUT",
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Lỗi mạng: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(
//         `Phương tiện "${nameVehicle}" với ID ${vehicleId} đã được xóa.`
//       );
//       // Cập nhật lại bảng hoặc thực hiện các công việc cần thiết khi xóa thành công.
//       parentTd.parentElement.remove(); // Xoá hàng khỏi bảng
//     })
//     .catch((error) => {
//       console.error(`Đã xảy ra lỗi khi xóa phương tiện: ${error}`);
//     });
// }




