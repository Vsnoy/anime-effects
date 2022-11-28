// 图片列表
const img_list = [
  "./assets/image/image_01.jpg",
  "./assets/image/image_02.jpg",
  "./assets/image/image_03.jpg",
];

// 初始索引（索引范围：-2 ~ 5，首尾各插两张图片）
let cur_index = 0;
// 图片宽度
const img_width = 150;
// 图片间距
const img_gap = 40;
// 初始偏移量 （向左偏移两个图片的宽度和间距）
const initial_translate_offset = (img_width + img_gap) * 2;
// 头部临界偏移量 （向左偏移一个图片的宽度和间距）
const head_translate_offset = img_width + img_gap;
// 尾部临界偏移量 （向左偏移三个图片的宽度和间距）
const tail_translate_offset = (img_width + img_gap) * 3;
// 过渡时间（ms）
const transition_time = 1000;
// 自动轮播时间（ms）
const loop_time = 3000;
// 定时器
let interval;

// 实例
const card_div = document.querySelector(".card");
const box_div = document.querySelector(".box");
const arrow_left_div = document.querySelector(".arrow-left");
const arrow_right_div = document.querySelector(".arrow-right");

// 节流
const throttle = (fn, wait) => {
  let timer;

  return function (...args) {
    if (timer) return;

    fn.apply(this, args);
    timer = setTimeout(() => (timer = null), wait);
  };
};

// 切换图片（上一张、下一张）
const switchImg = ({ type, index }) => {
  cur_index = index;

  // 切换图片
  const cur_translate_offset =
    initial_translate_offset + (img_width + img_gap) * cur_index;
  box_div.style.transition = `all ${transition_time / 1000}s`;
  box_div.style.transform = `translateX(-${cur_translate_offset}px)`;

  // 切到头部多插入的尾部图片时，在其过渡完后，要做下调整，让其真的从尾开始
  if (type === "prev" && cur_index === -2) {
    setTimeout(() => {
      cur_index = 1;

      box_div.style.transition = "none";
      box_div.style.transform = `translateX(-${tail_translate_offset}px)`;
    }, transition_time);
  }

  // 切到尾部多插入的头部图片时，在其过渡完后，要做下调整，让其真的从头开始
  if (type === "next" && cur_index === img_list.length - 1) {
    setTimeout(() => {
      cur_index = -1;

      box_div.style.transition = "none";
      box_div.style.transform = `translateX(-${head_translate_offset}px)`;
    }, transition_time);
  }
};

// 自动轮播
const autoLoop = () => {
  interval = setInterval(
    () => switchImg({ type: "next", index: cur_index + 1 }),
    loop_time
  );

  card_div.addEventListener("mouseenter", cancelLoop);
  card_div.addEventListener("mouseleave", autoLoop);
};

// 取消自动轮播
const cancelLoop = () => {
  interval && clearInterval(interval);
};

// 初始化图片
const initImgs = () => {
  // 头部多插入两张尾部图片
  img_list.slice(1).forEach((item) => {
    const img = document.createElement("img");
    img.src = item;
    box_div.appendChild(img);
  });

  // 正常插入待轮播的图片
  img_list.forEach((item) => {
    const img = document.createElement("img");
    img.src = item;
    box_div.appendChild(img);
  });

  // 尾部多插入两张头部图片
  img_list.slice(0, 2).forEach((item) => {
    const img = document.createElement("img");
    img.src = item;
    box_div.appendChild(img);
  });
};

// 初始化
const init = () => {
  initImgs();

  autoLoop();

  arrow_left_div.addEventListener(
    "click",
    throttle(
      () => switchImg({ type: "prev", index: cur_index - 1 }),
      transition_time
    )
  );
  arrow_right_div.addEventListener(
    "click",
    throttle(
      () => switchImg({ type: "next", index: cur_index + 1 }),
      transition_time
    )
  );
};

init();
