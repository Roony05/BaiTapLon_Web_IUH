const path = window.location.search;
const id = new URLSearchParams(path).get("id");

const getData = async () => {
  const response = await fetch("../crawl_data/data.json");
  const data = await response.json();
  const product = data.find((item) => item.id == id);
  const pageTitle = document.getElementById("page-title");
  pageTitle.innerHTML =
    product.id == "RB1"
      ? "Đồng hồ Nam"
      : product.id == "RB5"
      ? "Đồng hồ Nữ"
      : product.id == "RB9"
      ? "Đồng hồ Cao Cấp"
      : "Đồng hồ Cổ Điển";
  //tôi muốn lấy 3 sản phẩm kế tiếp từ sản phẩm id này lưu trong 1 mảng
  const index = data.indexOf(product);
  const nextProducts = data.slice(index + 1, index + 4);
  const result = [product, ...nextProducts];
  console.log(result);
  return result;
};
const createNavDetailProduct = async () => {
  const products = await getData();
  const mainLeft = document.getElementById("main-left");
  const mainRight = document.getElementById("main-right");

  const leftProducts = products.slice(0, 2);
  const rightProducts = products.slice(2, 4);
  mainLeft.innerHTML = ""; // Xóa nội dung cũ
  mainRight.innerHTML = ""; // Xóa nội dung cũ
  leftProducts.forEach((product) => {
    mainLeft.innerHTML += `
            <div class="col-6 d-flex justify-content-center mt-5">
            <a class="card text-decoration-none" style="width: 18rem; max-height: 30rem" href="detail-product.html?id=${product.id}">
                <img
                src="${product.img_src}"
                class="card-img-top"
                alt="${product.name}"
                style="width: 100%; height: 70%"
                />
                <div class="card-body">
                <h5 class="card-title text-dark">${product.name}</h5>
                <p class="card-text text-danger">${product.price}</p>
                </div>
                <div class="card-footer d-flex justify-content-start">
                    <button class="btn btn-primary">Đặt mua</button>
                </div>
            </a>
            </div>
        `;
  });
  rightProducts.forEach((product) => {
    mainRight.innerHTML += `
                <div class="col-6 d-flex justify-content-center mt-5">
                <a class="card text-decoration-none" style="width: 18rem; max-height: 30rem" href="detail-product.html?id=${product.id}">
                    <img
                    src="${product.img_src}"
                    class="card-img-top"
                    alt="${product.name}"
                    style="width: 100%; height: 70%"
                    />
                    <div class="card-body">
                    <h5 class="card-title text-dark">${product.name}</h5>
                    <p class="card-text text-danger">${product.price}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-start">
                        <button class="btn btn-primary">Đặt mua</button>
                    </div>
                </a>
                </div>
        `;
  });
};
const createAll = async () => {
  await createNavDetailProduct();
};
createAll();
