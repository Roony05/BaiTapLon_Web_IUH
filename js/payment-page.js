// Lấy dữ liệu sản phẩm từ localStorage
const product = JSON.parse(localStorage.getItem("selectedProduct"));
console.log(product);
let quantity = 1; // Số lượng mặc định

// Lấy các phần tử trong HTML
const productInfo = document.getElementById("product-info");
const totalPriceElement = document.getElementById("total-price");
const quantityElement = document.getElementById("quantity");
const checkoutForm = document.getElementById("checkout-form");
const orderMessage = document.getElementById("order-message");
const paymentMethodSelect = document.getElementById("payment-method");
const bankInfo = document.getElementById("bank-info");

// Hàm để cập nhật tổng tiền
const updateTotalPrice = () => {
  const total = product.price * quantity;  // Tính tổng tiền
  totalPriceElement.textContent = total.toLocaleString() + "₫";  // Cập nhật vào HTML
};

// Hàm tạo thông tin sản phẩm
const createProductInfo = () => {
  productInfo.innerHTML = `
  <div class="d-flex justify-content-between align-items-center">
    <div class="text-start">
      <p><strong>${product.name}</strong></p>
      <p>${product.tieu_de}</p>
      <div class="quantity-control d-flex align-items-center">
        <button id="decrease" class="btn btn-secondary">-</button>
        <span id="quantity" class="mx-2">${quantity}</span>
        <button id="increase" class="btn btn-secondary">+</button>
      </div>
      <p class="mt-2"><strong>Giá: </strong><span>${product.price.toLocaleString()}₫</span></p>
    </div>
    <img src="${product.img_src}" alt="${product.name}" class="product-img img-fluid " style="width: 200px; height: auto;" />
  </div>
`;

  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");
  const quantityDisplay = document.getElementById("quantity");

  // Thêm sự kiện cho nút tăng và giảm số lượng
  increaseBtn.addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;
    updateTotalPrice();
  });

  decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
      updateTotalPrice();
    }
  });
};

// Hàm xử lý khi gửi form đặt hàng
const handleCheckout = (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const district = document.getElementById("district").value;
  const ward = document.getElementById("ward").value;
  const paymentMethod = paymentMethodSelect.value;
  const bankSlip = document.getElementById("bank-slip").files[0];

  // Kiểm tra xem thông tin khách hàng đã đầy đủ chưa
  if (!name || !phone || !address || !city || !district || !ward) {
    alert("Vui lòng nhập đầy đủ thông tin khách hàng.");
    return;
  }

  // Hiển thị thông báo thành công nếu đã nhập đầy đủ thông tin
  if (paymentMethod === "bank" && !bankSlip) {
    alert("Vui lòng tải ảnh chuyển khoản.");
    return;
  }

  // Thông báo đặt hàng thành công
  document.getElementById("order-message").classList.remove("d-none");

  // Xử lý dữ liệu đơn hàng ở đây, ví dụ: gửi tới server hoặc lưu vào localStorage
  console.log({
    productName: product.name,
    quantity: quantity,
    totalPrice: product.price * quantity,
    customerName: name,
    phone: phone,
    address: address,
    city: city,
    district: district,
    ward: ward,
    paymentMethod: paymentMethod,
    bankSlip: bankSlip ? bankSlip.name : null
  });
};

// Hàm cập nhật các lựa chọn quận/huyện dựa trên thành phố
const updateDistrictOptions = (city) => {
  let districts = [];
  switch (city) {
    case "Hanoi":
      districts = ["Ba Đình", "Hoàn Kiếm", "Hoàng Mai"];
      break;
    case "HCM":
      districts = ["Quận 1", "Quận Gò Vấp", "Quận 10"];
      break;
  }

  document.getElementById("district").innerHTML = "<option value=''>Chọn quận/huyện</option>";
  districts.forEach((district) => {
    document.getElementById("district").innerHTML += `<option value="${district}">${district}</option>`;
  });
  document.getElementById("ward").innerHTML = "<option value=''>Chọn xã/phường</option>"; // Reset ward options
};

// Hàm cập nhật các lựa chọn xã/phường dựa trên quận/huyện
const updateWardOptions = (district) => {
  let wards = [];
  switch (district) {
    case "Ba Đình":
      wards = ["Phúc Xá", "Trúc Bạch", "Vĩnh Phúc", "Cống Vị", "Liễu Giai", "Ngọc Hà", "Điện Biên", "Đội Cấn", "Ngọc Khánh", "Kim Mã", "Giảng Võ", "Thành Công", "Quán Thánh"];
    break;
    case "Hoàn Kiếm":
      wards = ["Phúc Tân", "Đồng Xuân", "Hàng Mã", "Hàng Buồm", "Hàng Đào", "Hàng Bồ", "Cửa Đông", "Lý Thái Tổ", "Hàng Bạc", "Hàng Gai", "Chương Dương", "Hàng Trống", "Cửa Nam", "Hàng Bông", "Tràng Tiền", "Trần Hưng Đạo", "Phan Chu Trinh", "Hàng Bài"];
    break;
    case "Hoàng Mai":
      wards = ["Định Công", "Giáp Bát", "Hoàng Liệt", "Hoàng Văn Thụ", "Lĩnh Nam", "Mai Động", "Tân Mai", "Thanh Trì", "Thịnh Liệt", "Trần Phú", "Tương Mai", "Vĩnh Hưng", "Yên Sở"];
    break;
    case "Quận 1":
      wards = ["Phường Bến Nghé","Phường Bến Thành","Phường Cầu Kho","Phường Cầu Ông Lãnh","Phường Cô Giang","Phường Đa Kao","Phường Nguyễn Cư Trinh","Phường Nguyễn Thái Bình","Phường Phạm Ngũ Lão","Phường Tân Định"];
    break;
    case "Quận Gò Vấp":
      wards = ["Phường 1","Phường 2","Phường 3","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15","Phường 16"];
    break;
    case "Quận 10": 
      wards = ["Phường 1","Phường 2","Phường 4","Phường 5","Phường 6","Phường 7","Phường 8","Phường 9","Phường 10","Phường 11","Phường 12","Phường 13","Phường 14","Phường 15"];
    break;
  }

  document.getElementById("ward").innerHTML = "<option value=''>Chọn xã/phường</option>";
  wards.forEach((ward) => {
    document.getElementById("ward").innerHTML += `<option value="${ward}">${ward}</option>`;
  });
};

// Lắng nghe sự kiện khi chọn thành phố
document.getElementById("city").addEventListener("change", (e) => {
  updateDistrictOptions(e.target.value);
});

// Lắng nghe sự kiện khi chọn quận/huyện
document.getElementById("district").addEventListener("change", (e) => {
  updateWardOptions(e.target.value);
});

// Lắng nghe sự kiện khi thay đổi phương thức thanh toán
paymentMethodSelect.addEventListener("change", () => {
  if (paymentMethodSelect.value === "bank") {
    bankInfo.classList.remove("d-none");
  } else {
    bankInfo.classList.add("d-none");
  }
});

// Gọi hàm tạo sản phẩm và cập nhật tổng tiền khi tải trang
window.onload = () => {
  createProductInfo();
  updateTotalPrice(); // Cập nhật tổng tiền ban đầu

  // Lắng nghe sự kiện khi người dùng gửi form đặt hàng
  checkoutForm.addEventListener("submit", handleCheckout);
}