const init = () => {
  const add_box = document.querySelector(".add");
  const add_img_box = document.querySelector(".add img");
  const cart_box = document.querySelector(".cart");

  const add_rect = add_box.getBoundingClientRect();
  const cart_rect = cart_box.getBoundingClientRect();

  const add_left = add_rect.left;
  const cart_left = cart_rect.left;
  const add_top = add_rect.top;
  const cart_top = cart_rect.top;

  const anime_offset_x = cart_left - add_left;
  const anime_offset_y = cart_top - add_top;

  document.documentElement.style.setProperty("--x", `${anime_offset_x}px`);
  document.documentElement.style.setProperty("--y", `${anime_offset_y}px`);

  const resetAnime = () => {
    add_box.style.animation = "";
    add_img_box.style.animation = "";
  };

  const startAnime = () => {
    resetAnime();

    // 如果不加 settimeout，清空动画，又立刻加上动画，会没有效果
    // 参考：https://segmentfault.com/q/1010000010651887
    setTimeout(() => {
      add_box.style.animation = "shopping-cart-x 0.8s linear";
      add_img_box.style.animation =
        "shopping-cart-y 0.8s cubic-bezier(0.5,-0.5, 1, 1)";
    }, 0);
  };

  add_box.addEventListener("click", startAnime);
};

init();
