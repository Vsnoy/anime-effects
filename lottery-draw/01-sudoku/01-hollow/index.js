const hollow = document.querySelector(".hollow");

// 奖品信息
const lottery_info_list = [
  ...LOTTERY_INFO_LIST.slice(0, 4),
  {
    id: "lottery",
    name: "抽奖",
  },
  ...LOTTERY_INFO_LIST.slice(4),
];

// 转动路径。顺时针旋转。
const lottery_path_list = [0, 1, 2, 4, 7, 6, 5, 3];

// 转动是否处于进行中标记变量
let lottery_progress_flag = false;
// 转动是否处于加速阶段标记变量
let lottery_speed_up_flag = false;
// 转动是否处于减速阶段标记变量
let lottery_slow_down_flag = false;

// 初始转速
const init_speed = 250;
// 当前转速
let cur_speed = init_speed;
// 缓冲步数（加速、减速缓冲）。这里设为缓冲一圈，即 8 步。
const buffer_num = 8;
// 缓冲递进速度。
const buffer_speed = 30;

// 当前转到的奖品 index
let lottery_cur_index = 0;
// 最终转到的奖品 id
let lottery_final_id = null;

// 定时器
let timer;

// 模拟接口请求获取抽奖结果
const fetchData = () => {
  // 接口响应时间，假定在 50-250 ms 内
  const response_time = Math.floor(Math.random() * 201) + 50;

  // 接口请求成功后返回中奖礼品 id
  setTimeout(() => {
    lottery_final_id = Math.floor(Math.random() * 8);
    lottery_slow_down_flag = true;
  }, response_time);
};

// 动画开始前，重置相关参数
const resetAnimeParams = () => {
  lottery_progress_flag = true;
  lottery_speed_up_flag = true;

  cur_speed = init_speed;

  lottery_cur_index = 0;
  lottery_final_id = null;
};

// 在转到下一个格子前，先无脑清空所有格子 active 状态
const resetActiveState = () => {
  lottery_info_list.forEach((item) => {
    const div = document.querySelector(`#item${item.id}`);
    div.classList.remove("item-active");
  });
};

// 给下一个格子设置 active 状态
const addActiveState = () => {
  const div = document.querySelector(
    `#item${lottery_path_list[lottery_cur_index]}`
  );
  div.classList.add("item-active");
};

// 创建奖品项
const createItems = () => {
  lottery_info_list.forEach((item, index) => {
    const div = document.createElement("div");
    div.id = `item${item.id}`;

    if (index === 4) {
      div.className = "item item-bg1";
      div.innerHTML = `<div class="name1">${item.name}</div>`;
      div.addEventListener("click", startAnime);
      div.style.cursor = "pointer";
    } else {
      div.className = "item item-bg2";
      div.innerHTML = `
        <img class="icon" src="${item.icon}" />
        <div class="name2">${item.name}</div>
      `;
    }

    hollow.appendChild(div);
  });
};

// 动画每走一个格子的过程
// 使用 settimeout 而不用 setinterval，方便控制转速
const stepAnime = () => {
  // 动画加速阶段
  if (lottery_speed_up_flag) {
    cur_speed -= buffer_speed;

    if ((init_speed - cur_speed) / buffer_speed === buffer_num) {
      lottery_speed_up_flag = false;
    }
  }

  // 动画减速阶段。
  // 如果接口返回结果较快，加速阶段动画还未完成，则先等加速完成，再减速。
  if (!lottery_speed_up_flag && lottery_slow_down_flag) {
    cur_speed += buffer_speed;

    if (cur_speed === init_speed) {
      lottery_slow_down_flag = false;
    }
  }

  // 一圈转完，重置，从头开始
  if (lottery_cur_index > 7) lottery_cur_index = 0;

  // 跳到下一个格子前，清空之前格子的 active 状态
  resetActiveState();
  // 给下一个格子设置 active 状态
  addActiveState();

  // 动画停止
  if (
    !lottery_slow_down_flag &&
    lottery_path_list[lottery_cur_index] === lottery_final_id
  ) {
    lottery_progress_flag = false;
    timer && clearTimeout(timer);

    return;
  }

  // 随着转动，按序加一
  lottery_cur_index++;

  timer = setTimeout(stepAnime, cur_speed);
};

// 开始转动动画
const startAnime = () => {
  // 上一轮动画还在进行中，则不能开启新的动画
  if (lottery_progress_flag) return;

  // 模拟接口请求，获取抽奖结果
  fetchData();

  // 动画开始前相关参数重置
  resetAnimeParams();

  // 正式开启动画
  stepAnime();
};

createItems();
