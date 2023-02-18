// 摩天轮半径
const ferris_radius = 105;

// 车厢半径
const item_radius = 20;

// 摩天轮中车厢的个数
const item_count = 8;

// 摩天轮中各车厢位置（角度）数组
const items = [];

// 计算摩天轮中每个车厢的位置（角度）
const getItemsPos = () => {
  // 计算均分后每份的角度
  const degree = 360 / item_count;

  // 计算每个车厢的位置（角度）
  for (let i = 0; i < item_count; i++) {
    items.push(degree * i);
  }
};

// 遍历创建摩天轮车厢
const createItems = () => {
  const ferris_wheel = document.querySelector(".ferris-wheel");

  for (let i = 0; i < item_count; i++) {
    const div = document.createElement("div");
    div.id = `item-${i}`;
    div.className = "item";
    div.style.position = "absolute";
    div.style.top = `${ferris_radius - item_radius}px`;
    div.style.left = `${ferris_radius - item_radius}px`;

    div.style.transform = `
      rotate(${items[i]}deg) 
      translateY(-${ferris_radius - item_radius}px)
    `;

    // 伪元素自身角度修正
    const rule = `
      #item-${i}::after {
        transform-origin: top center;
        transform: rotate(-${items[i]}deg);
        animation: rotate2-${i + 1} 15s linear infinite;
      }`;

    // 添加伪元素样式
    document.styleSheets[0].insertRule(rule, 0);

    ferris_wheel.appendChild(div);
  }
};

const init = () => {
  getItemsPos();
  createItems();
};

init();
