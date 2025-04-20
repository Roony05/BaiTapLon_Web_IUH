import { firstCarousel } from "./first-carousel.js";
import { carousel_slick } from "../js/carousel.js";

const multiCarousel = async () => {
  const response = await fetch("/crawl_data/data.json");
  const data = await response.json();
  console.log(data);
  const mainContainer = document.getElementById("main_container");

  mainContainer.innerHTML += `
        <div class="multi-carousel-items">
          <div class="carousel-item">
          ${data
            .map((item) => {
              return `
            <a class="card card-item" href="detail-product.html?id=${item.id}">
              <img
                class="card-img-top"
                src="${item.img_src}"
                alt="${item.name}"
              />
              <div class="card-body">
                <h4 class="title">${item.name}</h4>
                <p class = "price">${item.price}</p>
              </div>
              <div class="card-footer">
                <button class="btn btn-primary" id="buyNowBtn-${item.id}">Đặt mua</button>
              </div>
            </a>
            `;
            })
            .join("")}
          </div>
        </div>
  `;
};

const createAll = async () => {
  firstCarousel();
  await multiCarousel();
  carousel_slick();
};
createAll();
