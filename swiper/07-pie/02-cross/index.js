// 循环次数
let loop_count = 0;

// 轮播头像列表
const header_list = [
  "./assets/header_1.jpg",
  "./assets/header_2.jpg",
  "./assets/header_3.jpg",
];

const first_header_img = document.querySelector(".header1");
const second_header_img = document.querySelector(".header2");
const third_header_img = document.querySelector(".header3");

const setImgSrc = () => {
  first_header_img.src = header_list[0];
  second_header_img.src = header_list[1];
  third_header_img.src = header_list[2];
};

const removeImgAnime = () => {
  first_header_img.classList.remove("animation1-2");
  first_header_img.classList.remove("animation1-1");

  second_header_img.classList.remove("animation2");
  third_header_img.classList.remove("animation3");
};

const addImgAnime = () => {
  loop_count++;

  if (loop_count % 3 === 1 || loop_count % 3 === 2) {
    second_header_img.classList.add("layer");
    first_header_img.classList.remove("layer");

    first_header_img.classList.add("animation1-1");
  } else {
    first_header_img.classList.add("layer");
    second_header_img.classList.remove("layer");

    first_header_img.classList.add("animation1-2");
  }

  second_header_img.classList.add("animation2");
  third_header_img.classList.add("animation3");
};

// 无限轮播。动画即将开始下一次循环播放时，重新赋值。
const animeLoopReset = () => {
  const first = header_list.shift();
  header_list.push(first);
  setImgSrc();

  removeImgAnime();
  setTimeout(addImgAnime, 0);
};

const init = () => {
  second_header_img.classList.add("layer");

  setImgSrc();
  addImgAnime();
};

first_header_img.addEventListener("animationend", () => {
  setTimeout(animeLoopReset, 500);
});

init();
