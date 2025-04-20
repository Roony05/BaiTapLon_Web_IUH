const firstCarousel = async () => {
  const list_img = [
    "../img/run_img1.jpg",
    "../img/run_img2.jpg",
    "../img/run_img3.jpg",
    "../img/run_img4.jpg",
  ];

  const img_divs = list_img.map((image) => {
    return `
      <div class="single_carousel_item">
        <img src="${image}" alt="Carousel Image">
      </div>
    `;
  });

  const mainCarousel = document.getElementById("main_carousel");
  mainCarousel.innerHTML = img_divs.join("");
};

export { firstCarousel };
