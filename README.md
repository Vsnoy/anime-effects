# Anime Effects

## 备注

可结合 http://htmlpreview.github.io/? 来预览 html

## 效果

- 轮播
- 悬停
- 扫光
- 加载
- 箭头

## 技巧

## 动画常用套路

- 悬停（颜色、阴影、光暗、缩放、位移、透明度）

## 动画产生形式

- css 动画
- css 过渡，配合动作，诸如 hover
- css 动画，辅以 js 定时器/监听器
- css 过渡，辅以 js 定时器/监听器

### 动画无限循环

- css 多次循环动画 infinite
- js 监听器，监听动画结束，配合单次动画 class 移入移出
- js 定时器 setTimeout，time 设置为单次动画时间，模拟监听动画结束，配合单次动画 class 移入移出

### 动画循环间隔

- js 监听器，监听动画结束，配合定时器及单次动画 class 移入移出
- js 监听器，监听动画结束，配合单次延时动画 class 移入移出

### 动画结束后维持住最后状态

- animation-fill-mode 设置 forwards
- js 监听动画结束后，用 js 手动设置最后状态对应的 css
