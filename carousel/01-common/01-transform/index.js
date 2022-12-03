// 图片列表
const img_list = [
  "./assets/image/image_01.jpg",
  "./assets/image/image_02.jpg",
  "./assets/image/image_03.jpg",
];

// 当前索引 (索引范围：-1 ~ 3。首尾各插一张图片。)
let cur_index = 0;
// 图片宽度
const img_width = 350;
// 初始偏移量（向左偏移一个图片的宽度）
const initial_translate_offset = img_width;
// 头部临界偏移量（向左偏移一个图片的宽度）
const head_translate_offset = img_width;
// 尾部临界偏移量 （向左偏移三个图片的宽度）
const tail_translate_offset = img_width * 3;
// 过渡时间（ms）
const transition_time = 1000;
// 自动轮播时间（ms）
const loop_time = 3000;
// 定时器
let interval;

// 实例
const transform_div = document.querySelector(".transform");
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
  let cur_point_index;

  if (cur_index === -1) {
    cur_point_index = img_list.length - 1;
  } else if (cur_index === img_list.length) {
    cur_point_index = 0;
  } else {
    cur_point_index = cur_index;
  }

  const point_div_children_list = [...point_div.children];

  point_div_children_list.forEach((item, index) => {
    if (index === cur_point_index) {
      point_div_children_list[index].classList.add("cur-point");
    } else {
      point_div_children_list[index].classList.remove("cur-point");
    }
  });
};

// 切换图片（上一张、下一张、小圆点）
const switchImg = ({ type, index }) => {
  cur_index = index;

  // 切换图片
  const cur_translate_offset = initial_translate_offset + img_width * cur_index;
  box_div.style.transition = `all ${transition_time / 1000}s`;
  box_div.style.transform = `translateX(-${cur_translate_offset}px)`;

  // 切换小圆点
  switchPoint();

  if (type === "point") return;

  // 切到头部多插入的尾部图片时，在其过渡完后，要做下调整，让其真的从尾开始
  if (type === "prev" && cur_index === -1) {
    setTimeout(() => {
      cur_index = img_list.length - 1;

      box_div.style.transition = "none";
      box_div.style.transform = `translateX(-${tail_translate_offset}px)`;
    }, transition_time);
  }

  // 切到尾部多插入的头部图片时，在其过渡完后，要做下调整，让其真的从头开始
  if (type === "next" && cur_index === img_list.length) {
    setTimeout(() => {
      cur_index = 0;

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

  transform_div.addEventListener("mouseenter", cancelLoop);
  transform_div.addEventListener("mouseleave", autoLoop);
};

// 取消自动轮播
const cancelLoop = () => {
  interval && clearInterval(interval);
};

// 初始化图片和小圆点
const initImgsAndPoints = () => {
  // 头部多插一张尾部图片
  const head_img = document.createElement("img");
  head_img.src = img_list.at(-1);
  box_div.appendChild(head_img);

  // 正常插入待轮播的图片及小圆点
  img_list.forEach((item, index) => {
    // 图片
    const img = document.createElement("img");
    img.src = item;
    box_div.appendChild(img);

    // 小圆点
    const div = document.createElement("div");
    if (index === 0) div.classList.add("cur-point");
    div.addEventListener("click", () => switchImg({ type: "point", index }));
    point_div.appendChild(div);
  });

  // 尾部多插一张头部图片
  const tail_img = document.createElement("img");
  tail_img.src = img_list[0];
  box_div.appendChild(tail_img);
};

// 初始化
const init = () => {
  // 初始化图片和小圆点
  initImgsAndPoints();

  // 自动轮播
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
