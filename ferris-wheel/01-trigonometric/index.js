// 摩天轮半径
const ferris_radius = 105;

// 车厢半径
const item_radius = 20;

// 摩天轮中车厢的个数
const item_count = 8;

// 摩天轮中各车厢位置对象数组
const items = [];

// 将角度转为弧度。JS中使用弧度制，需要转换下。
const degree2Radian = (degree) => (degree * Math.PI) / 180;

// 计算摩天轮中每个车厢的位置
const getItemsPos = () => {
  // 计算均分后每份的角度
  const angle_degree = 360 / item_count;
  const angle_radian = degree2Radian(angle_degree);

  // 计算每个车厢的位置
  for (let i = 0; i < item_count; i++) {
    items.push({
      x: ferris_radius * Math.cos(angle_radian * i),
      y: ferris_radius * Math.sin(angle_radian * i),
    });
  }

  console.log(items);
};

// 遍历创建摩天轮车厢
const createItems = () => {
  const ferris_wheel = document.querySelector(".ferris-wheel");

  for (let i = 0; i < item_count; i++) {
    const div = document.createElement("div");
    div.className = "item";
    div.style.position = "absolute";
    div.style.top = `${ferris_radius + items[i].y}px`;
    div.style.left = `${ferris_radius + items[i].x - item_radius}px`;
    div.style.transformOrigin = "top center";

    ferris_wheel.appendChild(div);
  }
};

const init = () => {
  getItemsPos();
  createItems();
};

init();
