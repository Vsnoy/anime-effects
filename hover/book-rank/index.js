const hover_id_list = [];

const div = document.querySelector(".book-rank");

const getIcon = (id) => {
  switch (id) {
    case 0:
      return "./assets/rank/rank_01.png";
    case 1:
      return "./assets/rank/rank_02.png";
    case 2:
      return "./assets/rank/rank_03.png";
    default:
      return "";
  }
};

// 关闭其他展开的书籍信息
const handleOtherHover = () => {
  const other_hover_id_list = hover_id_list.splice(1);
  if (other_hover_id_list.length === 0) return;

  other_hover_id_list.forEach((other_hover_id) => {
    const a = document.querySelector(`#book-item-${other_hover_id}`);
    const icon = getIcon(other_hover_id);

    const item = BOOK_INFO_LIST.filter((item) => item.id === other_hover_id)[0];
    const { name } = item;

    a.className = "book-item-simple";
    a.innerHTML = `
      <img class="book-icon" src="${icon}" />
      <div class="book-name">${name}</div>
    `;
  });
};

// 展开当前书籍信息
const handleHover = (e, ...params) => {
  const a = e.target;
  if (a.className === "book-item-hover") return;

  const [id, author, cover, name, intro] = params;
  const icon = getIcon(id);

  hover_id_list.unshift(id);

  a.className = "book-item-hover";
  a.innerHTML = `
    <img class="book-icon" src="${icon}" />
    <div class="book-content">
      <div class="book-name">${name}</div>
      <div class="book-intro">${intro}</div>
      <div class="book-author">${author}</div>
    </div>
    <div class="book-cover">
      <img src="${cover}" />
    </div>
  `;

  handleOtherHover();
};

BOOK_INFO_LIST.forEach((item) => {
  const { id, author, cover, name, intro } = item;
  const icon = getIcon(id);

  const a = document.createElement("a");

  a.id = `book-item-${id}`;
  a.href = "#";

  a.className = "book-item-simple";
  a.innerHTML = `
    <img class="book-icon" src="${icon}" />
    <div class="book-name">${name}</div>
  `;

  a.addEventListener("mouseenter", (e) =>
    handleHover(e, id, author, cover, name, intro)
  );

  div.appendChild(a);
});
