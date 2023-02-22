const inner_header_div = document.querySelector(".inner_header");
const outer_circle_div = document.querySelector(".outer_circle");

const resetOuterCircleAnime = () => {
  outer_circle_div.classList.remove("outer_circle_anime");
  setTimeout(() => outer_circle_div.classList.add("outer_circle_anime"), 0);
};

inner_header_div.addEventListener("animationiteration", resetOuterCircleAnime);

outer_circle_div.classList.add("outer_circle_anime");
