# Canvas画布使用

### 一、创建画布实例

* Vue2 写法

​	uni.createCanvasContext([canvas-id],上下文)

```vue
<template>
	<canvas style="width: 300px; height: 500px; " canvas-id="myCanvas"></canvas>
</template>

<script>
	created(){
        const ctx = uni.createCanvasContext('myCanvas',this);
    }
</script>
```

* Vue3 写法

​	Vue3中不再有 this 实例对象,需要通过其他方法获取当前组件的 Vue 实例

```vue
<template>
	<view class="canvas" v-if="isShow">
		<canvas style="width: 375px; height: 100%; background-color: #aaffff;" canvas-id="myCanvas" id="myCanvas"></canvas>
	</view>
</template>
<script>
import { ref ,getCurrentInstance,inject} from 'vue'
export default {
    setUp(){
        const _this = getCurrentInstance() // 现在 _this 就是当前组件的 Vue 实例
        
        // 获取节点
        ctx = uni.createCanvasContext('myCanvas',_this)
    }
}
</script>
```

### 二、绘制

 ##### 	绘制图片

| 参数          | 类型   | 说明                                                 |
| ------------- | ------ | ---------------------------------------------------- |
| imageResource | String | 所要绘制的图片资源                                   |
| dx            | Number | 图像的左上角在目标canvas上 X 轴的位置                |
| dy            | Number | 图像的左上角在目标canvas上 Y 轴的位置                |
| dWidth        | Number | 在目标画布上绘制图像的宽度，允许对绘制的图像进行缩放 |
| dHeight       | Number | 在目标画布上绘制图像的高度，允许对绘制的图像进行缩放 |
| sx            | Number | 源图像的矩形选择框的左上角 X 坐标                    |
| sy            | Number | 源图像的矩形选择框的左上角 Y 坐标                    |
| sWidth        | Number | 源图像的矩形选择框的宽度                             |
| sHeight       | Number | 源图像的矩形选择框的高度                             |

```js
ctx.drawImage(path,x,y,width,height)
```

##### 绘制圆角图片

**思路: 在图片四角绘制弧线**

```js
// 左上角
ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5)
// 右上角
ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2)
// 右下角
ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5)
// 左下角
ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI)

// 绘制
ctx.drawImage(path,x,y,width,height)
```

##### 使用其他字体

CanvasContext.font string

当前字体样式的属性。符合 [CSS font 语法 (opens new window)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font)的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif。

```js
ctx.font = '10px sans-serif'  // 默认值
```

##### 绘制矩形

**圆角矩形**

```vue
<script>
    ctx.setFillStyle(color)  // 设置填充颜色
    ctx.setStrokeStyle(color) // 画笔颜色
    ctx.setLineJoin('round') // 设置圆角
    ctx.setLineWidth(radius) // 线条宽度
    ctx.strokeRect(x,y,width,height) // 绘制矩形，非填充
    ctx.fillRect(x,y,width,height) // 填充矩形
</script>
```

