# 轮播动效

## 场景

- 搜索热词轮播动效
- 气泡提醒轮播动效
- 热门书籍轮播动效
- 任务翻转轮播动效

## 要点

- 自动轮播
  - 鼠标悬停时，暂停自动轮播（悬停范围是整个大盒子，包括图片、左右箭头、底部小圆点）
- 手动轮播
  - 左右箭头手动轮播，节流时间要大于等于过渡时间，过渡动画未完成，限制手动切换轮播图，且给首尾边缘处理留足时间
  - 底部小圆点手动轮播，无须节流
- 头尾各插入一张或多张图片，以便无缝衔接

## 参考

- [js 移除动画 class 再立马添加该 class，没有效果](https://segmentfault.com/q/1010000010651887)
- [纯 js-普通轮播图、卡片式轮播图、堆叠式轮播图](https://juejin.cn/post/6844903939159277576)