// 轮播内容
const tip_list = ["邀请好友购买黑卡", "邀请好友购买金卡", "邀请好友购买银卡"];

const cur_card_div = document.querySelector(".cur-card");
const next_card_div = document.querySelector(".next-card");

// 无限轮播。动画即将开始下一次循环播放时，重新赋值。
const animeLoopReset = () => {
  const first = tip_list.shift();
  tip_list.push(first);

  cur_card_div.innerText = tip_list[0] ?? "";
  next_card_div.innerText = tip_list[1] ?? "";
};

cur_card_div.addEventListener("animationiteration", animeLoopReset);

// 初始化
cur_card_div.innerText = tip_list[0] ?? "";
next_card_div.innerText = tip_list[1] ?? "";
