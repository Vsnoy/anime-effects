// 轮播内容
const tip_list = [
  "一个人",
  "旅行路上",
  "放开大脑",
  // "做家务",
  // "清晨洗漱",
  // "散步时",
  // "通勤路上",
  // "眼睛好累",
];

const cur_bubble_div = document.querySelector(".cur-bubble");
const next_bubble_div = document.querySelector(".next-bubble");

// 初始化赋值
cur_bubble_div.innerText = tip_list[0] ?? "";
next_bubble_div.innerText = tip_list[1] ?? "";

// 无限轮播。动画即将开始下一次循环播放时，重新赋值。
const animeLoopReset = () => {
  const first = tip_list.shift();
  tip_list.push(first);

  cur_bubble_div.innerText = tip_list[0] ?? "";
  next_bubble_div.innerText = tip_list[1] ?? "";
};

// 有限轮播。动画即将开始下一次循环播放时，重新赋值。
// const animeLoopReset = () => {
//   tip_list.shift();

//   // 如果数组中没有文案了，就停止动画
//   if (tip_list.length === 0) {
//     cur_bubble_div.style.animationPlayState = "paused";
//     next_bubble_div.style.animationPlayState = "paused";

//     cur_bubble_div.remove();
//     next_bubble_div.remove();

//     return;
//   }

//   cur_bubble_div.innerText = tip_list[0] ?? "";
//   next_bubble_div.innerText = tip_list[1] ?? "";
// };

cur_bubble_div.addEventListener("animationiteration", animeLoopReset);
