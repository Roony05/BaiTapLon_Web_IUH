const path = window.location.search;
const id = new URLSearchParams(path).get("id");
console.log(id);

const getData = async () => {
  const response = await fetch("../crawl_data/data.json");
  const data = await response.json();
  const product = data.find((item) => item.id == id);
  console.log(product);
  return product;
};

const createDetailProduct = async () => {
  const product = await getData();
  const mainContainer = document.getElementById("main_container");
  const titleProduct = document.getElementById("title_product");
  titleProduct.innerHTML = "Mua " + product.name;

  mainContainer.innerHTML += `
    <div class="row title-product">
      <div class="col-12 d-flex justify-content-center" style="color: white;">
        <p>${product.tieu_de}</p>
      </div>
    </div>

    <div class="row product-details">
      <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
        <div class="img-product">
          <img src="${product.img_src}" alt="${product.name}" class="img-fluid" id="product-image"/>
        </div>
      </div>

      <div class="col-lg-7 col-md-12 product-price d-flex flex-column justify-content-center align-items-start gap-3">
        <p><strong id="product-name">${product.name}</strong></p>
        <p>${product.doan_1}</p>
        <p>
          <button id="buyNowBtn" class="btn btn-primary">Đặt mua</button>
          <span style="margin-left: 1rem" id="product-price">${product.price}</span>
        </p>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <p>${product.doan_2}</p>
        <p>${product.doan_3}</p>
      </div>
    </div>
  `;

  // Khi nhấn "Đặt mua" => Lưu thông tin sản phẩm vào localStorage và chuyển trang
  document.getElementById("buyNowBtn").addEventListener("click", () => {
    // Đảm bảo định dạng dữ liệu chuẩn
    const productToStore = {
      id: product.id,
      name: product.name,
      price: parseInt(product.price.replace(/[₫.]/g, "")),
      img_src: product.img_src,
      tieu_de: product.tieu_de,
      quantity: 1 // default khi đặt mua là 1 sản phẩm
    };
    localStorage.setItem("selectedProduct", JSON.stringify(productToStore));
    window.location.href = "payment-page.html";
  });
};

const createAll = async () => {
  await createDetailProduct();
};

createAll();
