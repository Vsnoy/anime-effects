// 轮播头像列表
const header_list = [
  "./assets/header_1.jpg",
  "./assets/header_2.jpg",
  "./assets/header_3.jpg",
  "./assets/header_4.jpg",
  "./assets/header_5.jpg",
];

const first_header_img = document.querySelector(".header1");
const second_header_img = document.querySelector(".header2");
const third_header_img = document.querySelector(".header3");
const fourth_header_img = document.querySelector(".header4");
const fifth_header_img = document.querySelector(".header5");

const setImgSrc = () => {
  first_header_img.src = header_list[0];
  second_header_img.src = header_list[1];
  third_header_img.src = header_list[2];
  fourth_header_img.src = header_list[3];
  fifth_header_img.src = header_list[4];
};

const removeImgAnime = () => {
  first_header_img.classList.remove("animation1");
  second_header_img.classList.remove("animation2");
  third_header_img.classList.remove("animation2");
  fourth_header_img.classList.remove("animation2");
  fifth_header_img.classList.remove("animation3");
};

const addImgAnime = () => {
  first_header_img.classList.add("animation1");
  second_header_img.classList.add("animation2");
  third_header_img.classList.add("animation2");
  fourth_header_img.classList.add("animation2");
  fifth_header_img.classList.add("animation3");
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
  setImgSrc();
  addImgAnime();
};

first_header_img.addEventListener("animationend", () =>
  setTimeout(animeLoopReset, 1000)
);

init();
