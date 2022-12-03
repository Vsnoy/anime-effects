// 图片列表
const img_list = [
  "./assets/image/image_01.jpg",
  "./assets/image/image_02.jpg",
  "./assets/image/image_03.jpg",
];

// 当前索引 (索引范围：0 ~ 2)
let cur_index = 0;
// 先前索引 (索引范围：0 ~ 2)
let pre_index = 0;
// 过渡时间（ms）
const transition_time = 1000;
// 自动轮播时间（ms）
const loop_time = 3000;
// 定时器
let interval;

// 实例
const opacity_div = document.querySelector(".opacity");
const box_div = document.querySelector(".box");
const arrow_left_div = document.querySelector(".arrow-left");
const arrow_right_div = document.querySelector(".arrow-right");
const point_div = document.querySelector(".point");

// 节流
const throttle = (fn, wait) => {
  let timer;

  return function (...args) {
    if (timer) return;

    fn.apply(this, args);
    timer = setTimeout(() => (timer = null), wait);
  };
};

// 切换小圆点
const switchPoint = () => {
  const point_div_children_list = [...point_div.children];

  point_div_children_list.forEach((item, index) => {
    if (index === cur_index) {
      point_div_children_list[index].classList.add("cur-point");
    } else {
      point_div_children_list[index].classList.remove("cur-point");
    }
  });
};

// 切换图片（上一张、下一张、小圆点）
const switchImg = ({ type, temp_cur_index, temp_pre_index }) => {
  cur_index = temp_cur_index;
  pre_index = temp_pre_index;

  // 超出头部边界，手动校准 cur_index
  if (type === "prev" && cur_index === -1) {
    cur_index = img_list.length - 1;
  }

  // 超出尾部边界，手动校准 cur_index
  if (type === "next" && cur_index === img_list.length) {
    cur_index = 0;
  }

  const cur_img = document.querySelector(
    `.opacity .box img:nth-of-type(${cur_index + 1})`
  );
  const pre_img = document.querySelector(
    `.opacity .box img:nth-of-type(${pre_index + 1})`
  );

  // 切换图片
  cur_img.style.opacity = "1";
  pre_img.style.opacity = "0";

  // 切换小圆点
  switchPoint();
};

// 自动轮播
const autoLoop = () => {
  interval = setInterval(() => {
    switchImg({
      type: "next",
      temp_cur_index: cur_index + 1,
      temp_pre_index: cur_index,
    });
  }, loop_time);

  opacity_div.addEventListener("mouseenter", cancelLoop);
  opacity_div.addEventListener("mouseleave", autoLoop);
};

// 取消自动轮播
const cancelLoop = () => {
  interval && clearInterval(interval);
};

// 初始化图片和小圆点
const initImgsAndPoints = () => {
  img_list.forEach((item, index) => {
    // 图片
    const img = document.createElement("img");
    img.src = item;
    box_div.appendChild(img);

    // 小圆点
    const div = document.createElement("div");
    if (index === 0) div.classList.add("cur-point");
    div.addEventListener("click", () => {
      switchImg({
        type: "point",
        temp_cur_index: index,
        temp_pre_index: cur_index,
      });
    });
    point_div.appendChild(div);
  });
};

const init = () => {
  // 初始化图片和小圆点
  initImgsAndPoints();

  // 自动轮播
  autoLoop();

  arrow_left_div.addEventListener(
    "click",
    throttle(() => {
      switchImg({
        type: "prev",
        temp_cur_index: cur_index - 1,
        temp_pre_index: cur_index,
      });
    }, transition_time)
  );
  arrow_right_div.addEventListener(
    "click",
    throttle(() => {
      switchImg({
        type: "next",
        temp_cur_index: cur_index + 1,
        temp_pre_index: cur_index,
      });
    }, transition_time)
  );
};

init();
