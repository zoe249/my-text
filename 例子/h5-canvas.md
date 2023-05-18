# Cnavas

## 1、Canvas 简介

​	

## 2、Canvas 基本使用

####  2.1 canvas元素

* id，作为唯一标识

* width，画布内容的宽度像素大小

* height，画布内容高度的像素大小

  

​	`<canvas>` 看起来和 `<img>` 标签一样，只是 `<canvas>` 只有两个可选的属性 `width、heigth` 属性，而没有 `src、alt` 属性。

如果不给 `<canvas>` 设置 `widht、height` 属性时，则默认 `width`为300、`height` 为 150，单位都是 `px`。也可以使用 `css` 属性来设置宽高，但是如宽高属性和初始比例不一致，他会出现扭曲。所以，建议永远不要使用 `css` 属性来设置 `<canvas>` 的宽高。

​	<font color='red'>注意：建议永远不要使用css设置canvas的宽高</font>

**替换内容**

由于某些较老的浏览器（尤其是 IE9 之前的 IE 浏览器）或者浏览器不支持 HTML 元素 `<canvas>`，在这些浏览器上你应该总是能展示替代内容。

支持 `<canvas>` 的浏览器会只渲染 `<canvas>` 标签，而忽略其中的替代内容。不支持 `<canvas>` 的浏览器则 会直接渲染替代内容。

用文本替换：

```html
<canvas>
    你的浏览器不支持 canvas，请升级你的浏览器。
</canvas>
```

用 `<img>` 替换：

```html
<canvas>
    <img src="./美女.jpg" alt=""> 
</canvas>
```

结束标签 `</canvas>` 不可省略。

与 `<img>` 元素不同，`<canvas>` 元素需要结束标签(`</canvas>`)。如果结束标签不存在，则文档的其余部分会被认为是替代内容，将不会显示出来。

**canvas仅仅是一个画布标签，要绘制内容，只能用js**

#### 2.2 渲染上下文

`<canvas>` 会创建一个固定大小的画布，会公开一个或多个**渲染上下文**(画笔)，使用**渲染上下文**来绘制和处理要展示的内容。

```js
const canvas = document.getELementById('#cnavas')
// 获取 2d 的上下文对象
const ctx = canvas.getContext('2d')
```



#### 2.3 例子

以下实例绘制两个矩形

```html
<body>
  <!-- 建议永远不要使用CSS 设置 canvas 的宽高 -->
  <canvas id="canvas" width="500" height="500"></canvas>

  <script>
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
      
      ctx.fillStyle = "rgb(200, 0, 0)"
      // 绘制矩形1
      ctx.fillRect(10, 10, 55, 50)

      ctx.fillStyle = 'rgb(0,0,200,.5)'
      // 绘制矩形2
      ctx.fillRect(40, 40, 100, 200)
  </script>
</body>
```



## 3、绘制形状

<font color="skybule">`<canvas>` 只支持一种原生的图形绘制：**矩形**。所有其他图形都至少需要生成一种路径 (`path`)。不过，我们拥有众多路径生成的方法让复杂图形的绘制成为了可能。</font>

#### 3.1 绘制矩形

canvast 提供了三种方法绘制矩形：

- 1、**fillRect(x, y, width, height)**：绘制一个填充的矩形。
- 2、**strokeRect(x, y, width, height)**：绘制一个矩形的边框。
- 3、**clearRect(x, y, widh, height)**：清除指定的矩形区域，然后这块区域会变的完全透明。

**说明：**这 3 个方法具有相同的参数。

- **x, y**：指的是矩形的左上角的坐标。(相对于canvas的坐标原点)
- **width, height**：指的是绘制的矩形的宽和高。

## 4、绘制路径

图形的基本元素是路径。

路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。

一个路径，甚至一个子路径，都是闭合的。

使用路径绘制图形需要一些额外的步骤：

1. 创建路径起始点
2. 调用绘制方法去绘制出路径
3. 把路径封闭
4. 一旦路径生成，通过描边或填充路径区域来渲染图形。

下面是需要用到的方法：

1. `beginPath()`

   新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径

2. `moveTo(x, y)`

   把画笔移动到指定的坐标`(x, y)`。相当于设置路径的起始点坐标。

3. `closePath()`

   闭合路径之后，图形绘制命令又重新指向到上下文中

4. `stroke()`

   通过线条来绘制图形轮廓

5. `fill()`

   通过填充路径的内容区域生成实心的图形

#### 4.1 绘制三角形

```js
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.beginPath()	// 新建一条路径path
ctx.fillStyle = 'yellow'
ctx.moveTo(50, 50)
ctx.lineTo(200, 50)
ctx.lineTo(200, 200)
ctx.closePath()	// 闭合路径path
ctx.stroke()  // 绘制路径
ctx.fill()	// 填充颜色
```

![image-20221101111014140](D:\文档\文档\canvas\绘制三角形.png)

#### 4.2 绘制圆弧

有两个方法可以绘制圆弧：

1、**arc(x, y, r, startAngle, endAngle, anticlockwise)**: 以`(x, y)` 为圆心，以`r` 为半径，从 `startAngle` 弧度开始到`endAngle`弧度结束。`anticlosewise` 是布尔值，`true` 表示逆时针，`false` 表示顺时针(默认是顺时针)。

注意：

1. 这里的度数都是弧度。

2. `0` 弧度是指的 `x` 轴正方向。

   ```js
   radians=(Math.PI/180)*degrees   //角度转换成弧度
   ```

2、**arcTo(x1, y1, x2, y2, radius)**: 根据给定的控制点和半径画一段圆弧，最后再以直线连接两个控制点。

圆弧案例1

```js
/* 
  例子3 绘制圆弧1
*/
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.arc(100, 100, 50, 0, Math.PI * 4 / 3, false)
ctx.stroke()
```

圆弧案例2

```js
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.moveTo(50, 50);
//参数1、2：控制点1坐标   参数3、4：控制点2坐标  参数4：圆弧半径
ctx.arcTo(200, 50, 200, 200, 100);
ctx.lineTo(200, 200)
ctx.stroke()

ctx.beginPath();
ctx.rect(50, 50, 10, 10);
ctx.rect(200, 50, 10, 10)
ctx.rect(200, 200, 10, 10)
ctx.fill()
```

![img](https://www.runoob.com/wp-content/uploads/2018/12/3556678928-5b74dd8f1bd2a_articlex.png)

## 5、添加样式和颜色

在前面的绘制矩形章节中，只用到了默认的线条和颜色。

 如果想要给图形上色，有两个重要的属性可以做到。

1. `fillStyle = color` 设置图形的填充颜色
2. `strokeStyle = color` 设置图形轮廓的颜色

**备注：**

- \1. color 可以是表示 css 颜色值的字符串、渐变对象或者图案对象。
- \2. 默认情况下，线条和填充颜色都是黑色。
- \3. 一旦您设置了 strokeStyle 或者 fillStyle 的值，那么这个新值就会成为新绘制的图形的默认值。如果你要给每个图形上不同的颜色，你需要重新设置 fillStyle 或 strokeStyle 的值。









### 生活港

支付订单 >> 拆分订单
