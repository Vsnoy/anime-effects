// 轮播内容
const color_list = ["pink", "green", "blue"];

const cur_book_div = document.querySelector(".cur-book");
const next_book_div = document.querySelector(".next-book");

// 初始化赋值
cur_book_div.style.backgroundColor = color_list[0] ?? "";
next_book_div.style.backgroundColor = color_list[1] ?? "";

// 无限轮播。动画即将开始下一次循环播放时，重新赋值。
const animeLoopReset = () => {
  const first = color_list.shift();
  color_list.push(first);

  cur_book_div.style.backgroundColor = color_list[0] ?? "";
  next_book_div.style.backgroundColor = color_list[1] ?? "";
  next_book_div.style.opacity = 0;
};

cur_book_div.addEventListener("animationiteration", animeLoopReset);
