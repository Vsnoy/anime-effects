// 轮播内容
const color_list = ["pink", "green", "blue"];

const cur_book_div = document.querySelector(".cur-book");
const next_book_div = document.querySelector(".next-book");

const animeLoopReset1 = () => {
  const first = color_list.shift();
  color_list.push(first);

  cur_book_div.style.backgroundColor = color_list[0] ?? "";
  next_book_div.style.backgroundColor = color_list[1] ?? "";

  cur_book_div.classList.remove("cur-book-animation");
  next_book_div.classList.remove("next-book-animation");

  next_book_div.style.transform = "translate(5px) scale(0.9)";

  // 不加 settimeout 的话，删除一个动画 class，再立马加上同一个 class，会没有效果
  // 详见：https://segmentfault.com/q/1010000010651887
  setTimeout(() => {
    next_book_div.classList.add("next-book-animation-2");
  }, 0);
};

const animeLoopReset2 = () => {
  const next_book_div_class_list = [...next_book_div.classList];

  if (next_book_div_class_list.includes("next-book-animation-2")) {
    next_book_div.style.transform = "translateX(5px) scale(0.9) rotate(5deg)";

    next_book_div.classList.remove("next-book-animation-2");

    cur_book_div.classList.add("cur-book-animation");
    next_book_div.classList.add("next-book-animation");
  }
};

cur_book_div.addEventListener("animationend", animeLoopReset1);
next_book_div.addEventListener("animationend", animeLoopReset2);

// 初始化
cur_book_div.style.backgroundColor = color_list[0] ?? "";
next_book_div.style.backgroundColor = color_list[1] ?? "";
cur_book_div.classList.add("cur-book-animation");
next_book_div.classList.add("next-book-animation");
