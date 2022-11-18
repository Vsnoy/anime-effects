// 轮播内容
const book_list = [
  "https://bookcover.yuewen.com/qdbimg/349573/1032880389/90",
  "https://bookcover.yuewen.com/qdbimg/349573/1033573261/90",
  "https://bookcover.yuewen.com/qdbimg/349573/1035226896/90",
];

const cur_book_img = document.querySelector(".cur-book");
const next_book_img = document.querySelector(".next-book");

// 无限轮播。动画即将开始下一次循环播放时，重新赋值。
const animeLoopReset = () => {
  const first = book_list.shift();
  book_list.push(first);

  cur_book_img.src = book_list[0] ?? "";
  next_book_img.src = book_list[1] ?? "";

  next_book_img.style.opacity = 0;
};

cur_book_img.addEventListener("animationiteration", animeLoopReset);

// 初始化
cur_book_img.src = book_list[0] ?? "";
next_book_img.src = book_list[1] ?? "";
