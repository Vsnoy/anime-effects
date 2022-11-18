// 轮播内容
const tip_list = [
  "一个人",
  "旅行路上",
  "放空大脑",
  // "做家务",
  // "清晨洗漱",
  // "散步时",
  // "通勤路上",
  // "眼睛好累",
];

const cur_bubble_div = document.querySelector(".cur-bubble");
const next_bubble_div = document.querySelector(".next-bubble");

// 无限轮播。动画即将开始下一次循环播放时，重新赋值。
const animeLoopReset = () => {
  const first = tip_list.shift();
  tip_list.push(first);

  cur_bubble_div.innerText = tip_list[0] ?? "";
  next_bubble_div.innerText = tip_list[1] ?? "";

  cur_bubble_div.classList.remove("animation");
  next_bubble_div.classList.remove("animation");

  // 如果不加 settimeout，删掉一个类，又立刻加上这个类，会没有效果
  // 参考：https://segmentfault.com/q/1010000010651887
  setTimeout(() => {
    cur_bubble_div.classList.add("animation");
    next_bubble_div.classList.add("animation");
  }, 0);
};

cur_bubble_div.addEventListener("animationend", animeLoopReset);

// 初始化
cur_bubble_div.innerText = tip_list[0] ?? "";
next_bubble_div.innerText = tip_list[1] ?? "";
cur_bubble_div.classList.add("animation");
next_bubble_div.classList.add("animation");
