// 图片列表
const img_list = [
  "./assets/image/image_01.jpg",
  "./assets/image/image_02.jpg",
  "./assets/image/image_03.jpg",
];

// 定时器
let interval;

// 初始索引 (索引范围：-1 ~ 4。包括首尾插入的图片。)
let cur_index = 0;

// 第一个图片对应初始偏移量 350px（向左偏移一个图片的宽度）
const init_translate_offset = 350;

// 最后一个图片对应最终偏移量 350 * 3 px （向左偏移三个图片的宽度）
const final_translate_offset = 350 * 3;

// 图片宽度
const img_width = 350;

// 过渡时间（ms）
const transition_time = 1000;

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

// 切换小圆点样式
const switchPointClass = () => {
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

// 切换到上一张图片
const switchPrevImg = () => {
  cur_index--;

  const cur_translate_offset = init_translate_offset + cur_index * img_width;
  box_div.style.transition = `all ${transition_time / 1000}s`;
  box_div.style.transform = `translateX(-${cur_translate_offset}px)`;

  // 切到尾部多插入的首部图片时，在其过渡完后，要做下调整，让其真的从头开始
  if (cur_index === -1) {
    setTimeout(() => {
      cur_index = img_list.length - 1;

      box_div.style.transition = "none";
      box_div.style.transform = `translateX(-${final_translate_offset}px)`;
    }, transition_time);
  }

  switchPointClass();
};

// 切换到下一张图片
const switchNextImg = () => {
  cur_index++;

  const cur_translate_offset = init_translate_offset + cur_index * img_width;
  box_div.style.transition = `all ${transition_time / 1000}s`;
  box_div.style.transform = `translateX(-${cur_translate_offset}px)`;

  // 切到尾部多插入的首部图片时，在其过渡完后，要做下调整，让其真的从头开始
  if (cur_index === img_list.length) {
    setTimeout(() => {
      cur_index = 0;

      box_div.style.transition = "none";
      box_div.style.transform = `translateX(-${init_translate_offset}px)`;
    }, transition_time);
  }

  switchPointClass();
};

// 初始化
const init = () => {
  // 头部多插一张尾部图片
  const begin_hidden_img = document.createElement("img");
  begin_hidden_img.src = img_list.at(-1);
  box_div.appendChild(begin_hidden_img);

  // 正常插入待轮播的图片及小圆点
  img_list.forEach((item, index) => {
    const img = document.createElement("img");
    img.src = item;
    box_div.appendChild(img);

    const div = document.createElement("div");
    if (index === 0) div.classList.add("cur-point");
    point_div.appendChild(div);
  });

  // 尾部多插一张头部图片
  const end_hidden_img = document.createElement("img");
  end_hidden_img.src = img_list[0];
  box_div.appendChild(end_hidden_img);

  // 自动轮播
  interval = setInterval(switchNextImg, 3000);

  // 监听器
  arrow_left_div.addEventListener(
    "click",
    throttle(switchPrevImg, transition_time)
  );
  arrow_right_div.addEventListener(
    "click",
    throttle(switchNextImg, transition_time)
  );
  box_div.addEventListener(
    "mouseenter",
    () => interval && clearInterval(interval)
  );
  box_div.addEventListener(
    "mouseleave",
    () => (interval = setInterval(switchNextImg, 3000))
  );
};

init();
