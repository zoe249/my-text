# CSS简介
## 简介
 CSS是层叠样式表（Cascading Style Sheets）的简称，有时候也会称为CSS样式表或级联样式表。
 CSS也是一种标记语言（CSS的学习其实就是学一堆的属性）
 CSS主要用于设置HTML页面中的文本内容（字体、大小、对齐方式等）图片的外形（宽高、边框样式、边距等），以及板面的布局和外观显示样式
 CSS让我们的网页更加丰富多彩，布局更加灵活自如，简单理解：CSS可以美化HTML，让HTML更加漂亮，让页面布局更加简单。
 css最大价值：由HTML专注做结构呈现，样式交由CSS美化，即结构（HTML）与样式（CSS）相分离。
 CSS的语法格式
 ```HTML
 选择器 {
 属性1:值1；
 属性2：值2；
}
/*  css 的注释 * / 
 ```
 1.使用HTML时，需要遵从一定的规范，css也是如此，要想熟练的使用css对网页进行修饰，首先需要了解css 样式规则
 2.css规则由两个重要的部分构成，选择器以及一条或多条声明。
 * 选择器是用于指定CSS样式的HTML标签，花括号内是该对象设置的具体样式。
 * 属性和属性值以“键值对”的形式出现
 * 属性是对指定的对象设置的样式属性，例如字体大小，文本颜色等。
 * 属性和属性值之间用英文":"分开。
 * 多个“键值对”之间用英文";"进行区分。
例如：所有的样式，都包含在<style\>标签内，表示是样式表，<style\>一般写到<head\>上方
```html
<head>
<style>
h4{
color:blue;
font-size:100px;
}
</style>
</head>
```
## 什么是选择器？
选择元素的一种方式
### 选择器的作用
	选择器（选择符）就是根据不同需求把不同的标签选出来这就是选择器的作用，简单来说，就是选择标签用的。
```css
h1{color:red;font-size:100px;}
/* 其中h1 就是选择器 */
/* color 和font-size 就是属性 */
/* red 和 100px 就是属性值 */
/* color:red; 就是声明 */
```
css的选择器包括：基础选择器和符合选择器
基础选择器：标签选择器，类选择器
标签选择器：会把页面中所有的这种标签选中，比较少用。
类选择器：会把拥有这个类名的标签都选中
类选择器的格式：
1.给标签添加一个属性， class="类名“
2.在css书写环境中，选择到这个标签， .类名{键值对}
类名的命名规范：
* 类名不能由数字开头，但是可以有数字
* 类名区分大小写，red 和 Red 是两个不同的类
* 类名不要带特殊符号，否则不起作用
* 命名使用可读性前的写法，多个单词之间可以用"-"符号链接起来
id 选择器 和 通配符选择器
\# id 选择器
\* 通配符选择器
\. 类选择器
## 字体相关的css 属性
text-align属性用于设置元素内文本内容的水平对齐方式
| 属性值 |解释  |
|--|--|
| left |左对齐（默认值）  |
|right| 右对齐|
|center|居中对齐|

text-decoration:underline（下划线）/ line-through(删除线);
文本缩进： text-indent:2rem;
font-size:18px;最小 12px;
默认字体是微软雅黑
font-faimily:“宋体”;
font-faimily:"微软雅黑“;

## css的书写位置
* 内嵌式的css,把css代码内嵌到html 中<head\>
* 行内式 <div\ style="color:red;"></div\>
* 外链式 新建 .css 文件 <head\> <link href="xxx.css"\></head\>
## 选择器的权重
权重：选择器的权重更高就听谁的
\*(通配符）< 标签选择器 <类选择器<id 选择器 < 行内样式 < !important
## 实例化三属性
```css
width:50px;
height:50px;
backgound-color:pink;
```
## 标签的显示模式
* 块级元素： div p h1-h6 ... 特点：独占一行，给宽和高是起作用的
* 行内元素： span em a 特点: 不会独占一整行，多个行内元素可以并排，给宽和高不起作用。本身内容撑开
* 行内块： img 可以并排，设置宽和高起作用
块：h1-h6 div p ul li ol dl dt dd
行：span strong b u i em ins del
行内块： img input
显示模式的转化：
display:block; 行内转为块元素
display:inline-block; 函内转为行内块元素
display:inline; 块元素转为行内元素
div 的默认显示模式是 block
span 的默认显示模式是 inline
img 的默认显示模式是  inline-block
## 复合选择器
1. 后代选择器
空格的意思是“里面的”
.box span 表示选择到.box这个盒子里面所有的span 元素
2. 并集选择器
逗号的意思是“和”
div,h1,p,span 表示 div 和 h1 和 p 和 span 标签
3. 链接的伪类选择器
a:link 选择到a 标签，未访问过的时候css属性
a:visited 选择到 a 标签，已经被访问过的css属性
a:hover 鼠标悬停在 a 标签上的时候css属性
a:active 鼠标点击a标签还没有松开键的时候的css 属性
伪类选择器以":" 开头
## 去除某些标签的默认样式
```css
strong{
	font-weight:normal;
}
em{
	font-style:normal;
}
a{
	text-decoration:none;
}
ul{
	list-style:none;
	margin:0;
	padding:0;
}
```
## 背景样式属性
```css
div{
	width:500px;
	height:500px;
	border:1px solid #000;
	background:url(images/sd.png) no-repeat right bottom;
	/* 背景默认平铺， no-repeat 表示不平铺，设置水平防线的位置和垂直方向的位置
	参数： left 左 right 右 top 上 bottom 下 center 中
	*/
}
```
合并写和分开写
```css
合并写法
div{
	background:pink url(images/sd.png) no-repeat right bottom;
}
分开写法
div{
	background-color:red;
	background-image:url(images/sd.png);
	background-repeat:no-repeat;
	background-position:-10px -100px;
}
```
## 内边距
盒子的内容到盒子边框的距离
```css
合属性
div{
	padding:10px;
}
分属性
div{
	padding-left:10px;
	padding-right:10px;
	padding-top:10px;
	padding-bottom:10px;
}
分属性
div{
	padding:10px 20px; /* 上下10px 左右20px */
	padding:10px 20px 30px; /* 上10px 左右20px 下30px */
	padding:10px 20px 30px 40px; /* 上10px 右20px 下30px 左 40px*/
}
```
特点：给盒子添加内边距或者边框都会增大盒子的占位，盒子的真正占位= width/height + padding + border
总结：
* 如果盒子想要保持原有的300*300的占位就应该减掉盒子的内边距和边框
css中的新属性
`box-size:border-box;`加了这个属性，给盒子添加内边距和边框都不会影响盒子的占位了，也就不用减宽高了
## 外边距
盒子外部与盒子的距离
```css
合属性
div{
	margin:1opx;
}
分属性
div{
	margin-left:10px;
	margin-right:10px;
	margin-top:10px;
	margin-bottom:10px;
}
分属性
div{
	margin:10px 20px; /* 上下10px 左右20px */
	margin:10px 20px 30px; /* 上10px 左右20px 下30px */
	margin:10px 20px 30px 40px; /* 上10px 右20px 下30px 左 40px*/
}
```
## css层叠性
所谓层叠性是指多种css样式的叠加
是浏览器处理突出的一个能力，如果一个属性通过两个选择器设置到同一个元素上，那么这个时候一个属性就会将另一个属性层叠掉。
比如给某个标签指定了内部文字颜色为红色，接着又指定了颜色为蓝色，此时出现了一个标签指定了相同样式不同值的情况，这就是样式冲突。
一般情况下，如果出现样式冲突，则会按照css书写的顺序，以最后的样式为准
css最后的执行口诀：长江后浪推前浪，前浪“死”在沙滩上
## css的继承性
* 和文字相关的属性会继承到子级元素中，如果自己本身就有这个属性了，就直接用自己的这个属性
* 所谓继承性是指书写css样式表时，子标签会继承父标签的某些样式，如文本颜色和字号，想要设置一个可继承的属性，只需要将它应用与父元素即可。
简单理解就是：子承父业
css最后的执行口诀：龙生龙 凤生凤 老鼠省的孩子会打洞
注意：恰当的使用继承可以简化代码。降低css样式的复杂性。子元素可以继承父元素的样式（一般继承文字三属性，字号、字体、颜色）
继承的特殊点：
* a标签本身有自己的默认样式（浏览器自动添加的）所以不能靠继承来设置字体颜色，字体大小可以继承
* h1标签的颜色可以继承，字体大小不能继承，字体加粗效果不能继承。
## 无效链接的写法
项目中在开发阶段，通常会把a 标签的href属性设置为无效链接，格式可以有以下几种：
```html
<a href="javascript:void(0);"> 无效链接</a>
<a href="javascript:;"> 无效链接</a>
<a href="#"> 无效链接</a>
```
## 溢出隐藏
```css
div{
	width:200px;
	height:200px;
	background:red;
	overflow:hidden; /* 隐藏超出的内容 */
	overflow:auto; /* 添加一个滚动条可以查看超出盒子内容 */
}
```
## 外边距合并
两个盒子上下排列，给上盒子一个下边距，给下盒子一个上边距，这时，真实的举例是最大的这个外边距，这种现象称为外边距合并，只有竖直方向上会有外边距合并的情况。
## 外边距塌陷
父子级两个盒子，给子级盒子添加上外边距，会影响到父级盒子也塌陷下来。
解决方式：
* 给父级盒子添加上边框
* 给父级盒子添加上内边距，注意父级高度要减去内边距的高度。
* 给父级盒子上添加overflow:hidden; 属性
## 边框属性
```css
格式: border: 粗细 样式 颜色；
border-top: 10px solid #000; (实线）
border-right:10px dashed red; (虚线）
border-bottom:10px dotted blue; (点）
border-left: 10px double #00f; (双实线）
分写
border-width:10px;
border-style:solid;
border-color:red;
```
## 文字居中和盒子居中
盒子居中：margin:0 auto;
文字居中：text-align:center;
注意事项： 行内元素设置，text-align:center; 不起作用，解决方法：display:block;width:500px;margin:0 auto;text-align:center;

## 浮动
浮动是用来实现并排效果的
注意事项：
* 浮动会影响其他盒子的原来的布局（块级盒子和行内盒子都会受影响）
* 同级盒子，要么都浮动，要么都不浮动
* 子级如果都浮动了，父级盒子如果没有给高度height的，而此时父盒子高度为0，导致父级盒子下方的盒子会往上跑，影响后面盒子的布局
解决：1.可以给父盒子加高度
			2.如果父盒子高度不确定，可以加overflow:hidden;
## 圆角属性
圆形的写法：`宽高相等，border-radius:50%;`
椭圆的写法：`宽高不相等`
胶囊的写法：`width:100px;height:30px;border-radius:25px;`
## 不透明度
opacity 和 rgba 都有不透明的效果
opacity:0.5; 半透明，取值范围0-1，最小值为0，最大值是1,0就是100%透明，1就是纯色。
1.opacity是元素的属性，而rgba是颜色的属性值
2.opacity能够让背景和内容同时透明，rgba只能给元素自身color或者(background)透明
`background:rgba(255 ,0, 0, 0.5)`
## 定位
浮动是解决“并排”问题
定位是解决“层级”问题
布局方式：标准流 浮动流 定位
定位：静态定位 相对定位 绝对定位 固定定位
### 静态定位：
盒子默认的定位方式，相当于没有定位
position:static;
### 相对定位：
position:relative;
特点：
* 占位（原来的位置），top，right left bottom
* 位置偏移的参考点：是原来的位置的左上角的点
* 加了定位的盒子层级比没有定位的盒子层级高
### 绝对定位
position:absolute;
特点：
* 不占位
* 位置偏移的参考点：是页面的左上角（片面的说法）实际上会从父级盒子开始，一级一级往上找，确定父级的这些盒子有没有定位。如果有定位，就按照这个定位的父级盒子来参考，如果所有父级盒子都没有定位，就按照网页左上角来参考。
* 子绝父相：子级是绝对定位，父级是相对定位
### 固定定位
position:fixed;
* 不占位
* 位置偏移的参考点：浏览器窗口，浏览器页面如何滚动都不会影响位置

浮动和定位的元素的默认宽度靠内容来撑开
浮动和定位的元素给宽高起作用

## 叠放次序（z-index）
相对多个元素同时设置定位时，定位元素之间有可能会发生重叠
在css 中，想要调整重叠定位元素的堆叠顺序，可以对定位元素应用z-index层叠等级属性，其取值可为正整数、负整数和0
注意：
* z-index 的默认值是0(IE为0，FF为auto)取值越大，定位元素在层叠元素中越居上。
* 如果取值相同，则根据书写顺序，后来居上
* 后面数字不一定能加单位
* 只有相对定位，绝对定位，固定定位有此属性，其余标准流、浮动、静态定位都无此属性，也不可指定此属性。

## 居中定位
```css
div{
	position:absolute;
	width:300px;
	height:300px;
	left:50%;
	top:50%;
	margin-left:-150px; /* 盒子 宽度的一半 */
	margin-top:-150px; /* 盒子高度的一半 */
}
```
## 表格
### 基本结构
```html
<style>
	table{
		border:1px solid #000;
		border-collapse:collapse; /* 边框折叠属性 */
		}
	td{
		border:1px solid #000;
}
</style>
<table>
<tr>
<td></td>
</tr>
</table>
```
### 表格合并
`<td rowspan="2"></td>` 合并两行
`<td colspan="2"></td>` 合并两列
### 表格的完整结构
```html
<table>
	<caption>表格标题</caption>
	<thead>
		<tr><th></th></tr>
	</thead>
	<tbody>
		<tr><td></td></tr>
	</tbody>
	<tfoot>
		<tr><td></td></tr>
	</tfoot>
</table>
```
## 表单
```html
<!-- 表单域的标签 -->
<form action="#" method="GET">
<input type="text"> <!-- 文本框 -->
<input type="password"> <!-- 密码框 -->
<input type="submit" value="提交"> <!-- 提交按钮 -->
</form>
```
input 经典的表单标签，可以通过变换它的type 属性达到变换表单元素的效果
type 决定了这个标签是什么样的表单元素，文本输入框，密码框，提交按钮等
value 这个表单元素的值，获取它的值，相当于获取用户输入的信息
placeholder 占位符，提示文本
```html
<!--按钮-->
<input type="button" value="普通按钮">
<button> 普通按钮</button>
<!--单选按钮-->
<imput type="radio" name="gender" value="man"> 男
<imput type="radio" name="gender" value="women"> 女
<!--多选按钮-->
<imput type="checkbox" name="hobby" value="book"> 看书
<imput type="checkbox" name="hobby" value="sport"> 运动
<!--下拉框-->
<select>
	<option value="shanghai">上海</option>
	<option value="beijing">北京</option>
</select>
<!--上传文件-->
<input type="file">
<!--多文本输入框-->
<textarea name="" id="" cols="30" row="10"> </textarea>
```
## 复合选择器 指定选择器
.box li.current 表示选择到有current这个类的li标签
.box1.box2 表示同时具有这两个类的标准
## 盒子的显示与隐藏
```css
div{
	width:200px;
	height:200px;
	display:none; /* 隐藏盒子，原来的位置不会占位 */
	visibility:hidden; /* 隐藏盒子，原来的位置会占位 */
	display:block; /* 把隐藏的盒子显示出来 */
}
```

## 字间距词间距
```css
p{
	letter-spacing:2px; /* 控制文字和字母之间的间距 */
	word-spacing:2px; /* 控制单词和单词之间的间距 */
}
```
## 限制文字在一行，超出文字用…代替
```css
div{
	width:200px;
	white-space:nowrap; /* 让文本不换行显示 */
	overflow:hidden;
	text-overflow:ellipsis; /* 使用省略号代替溢出部分 */
}
/* 设置最多不超过2行，固定写法 */
div{
	width:200px;
	overflow:hidden;
	text-overflow:ellipsis;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
```
## 鼠标指针的样式
```css
cursor:pointer; // 小手
cursor:default; // 箭头
cursor:move; // 可移动的提示
cursor:text; // 文本提示
cursor:not-allowed; // 禁止
```

## 页面上如何展示精灵图？
精灵图需要给成background
通过背景位置调节图片的位置到可以展示在盒子上的地方

## 伪元素
```css
/* 在盒子内部最开始的地方创建一个行内元素，必须要有content属性，这并不是一个真实标签，通过js无法获取 */
div::before{
	content:"";
	width:100px;
	height:100px;
	display:block;
	background:pink;
}
/* 在盒子内部的内容后面创建一个行内元素*/
div::after{
	content:"";
	width:100px;
	height:100px;
	display:block;
	background:pink;
}
```

## 清除浮动
清除的是浮动后对后面盒子的影响，父盒子的多有盒子都浮动了，父盒子没有给高度，父盒子的高度就变为0，
* 给父级盒子增加高度height属性
* {clear:both}
* {overflow:hidden}
* 使用after伪元素清除浮动，::after方式为空元素额外标签法的升级版，好处是不用单独加标签了
```css
.clearfix::after{
	content:"";
	display:block;
	height:0;
	clear:both;
	wisibility:hidden;
}
.clearfix{*200m:1} 
// 最后给父盒子添加clearfix 这个类 
```
* 使用双伪元素清除浮动
```css
.clearfix::before,.clearfix::after{
	content:"";
	display:table;
}
.clearfix{*200m:1} 
// 最后给父盒子添加clearfix 这个类 
```
## h5新增的标签
```html
<header></header>
<nav></nav>
<section>
	<aside></aside>
	<article><article>
</section>
<footer></footer>
```
## 垂直居中
vertiacal-align:baseline|top|middle|bottom；
它不影响块级元素中的内容对齐，它只针对与行内元素或者行内元素，特别是行内块元素，通常用来控制图片/表单域文字对齐。
例子：
```html
<div> class="box">
	<img src="images/icon.png" alt="">
	手机
<div>
<style>
	.box{
		width:300px;
		height:30px;
		line-height:30px;
		background:pink;
		font-size:14px;
	}
	.box img {
		vertical-align:middle;
	}
</style>
```

## CSS3新属性初步认识
`:nth-of-type 和 :nth-child`选择器两者都是选择作为第几个子元素某标签，但是又有区别

```html
<!-- start -->
<style>
/* :nth-of-type 选中的是同类型的第几个，前提是在于同类型 */
	div p:nth-of-type(2){
		background:pinkl;
	}
<style>
<div>
	<p>盒子</p>
	<span>span</span>
	<p>盒子2</p> <!-- 这是一个变粉色的盒子 -->
	<p>盒子</p>
</div>
<!-- end -->
<!-- start -->
<style>
/* :nth-child 选中的是同级中的第几个，前提在于同级 */
p:nth-child(2){
	background:pink;
}
</style>
<div>
	<p> 盒子</p>
	<span>盒子</span>
	<p>盒子</p>
</div>
<!-- 以上的样式不会生效，原因：样式中选择器的写法是作为第2个子元素的p元素，第2个子元素是span 标签，所以样式不会生效 -->
<!-- end -->
```
## 属性选择器
属性选择器格式：
选择器[标签属性名] {}
选择器[标签属性名=“”] {}
例子：
```html
<div>
	<a href="www.baidu.com">www.baidu.com</a> <br>
	<a href="www.jd.com">www.jd.com</a> <br>
	<a href="www.taobao.com">www.taobao.com</a> <br>
	<a href="www.wolfcode.cn">www.wolfcode.cn</a> <br>
	<a href="www.wolfcode.cn" title="demo">www.wolfcode.cn</a> <br>
	<a href="www.wolfcode.cn" title="Test">www.wolfcode.cn</a> <br>
	<a href="http://www.wolfcode.cn" title="Test">www.wolfcode.cn</a> <br>
	<a>我什么也不是</a>
	<input type="text">
	<input type="password">
</div>
<style>
/* 1.获取所有拥有href属性的a标签 */
a[href]{
	background:pink;
}
/* 2.获取href属性值为 www.baidu.com的a标签 */
a[href=“www.baidu.com”]{
	background:pink;
}
/* 3.获取href属性值以 www 开头的a标签 */
a[href^=“www”]{
	background:pink;
}
/* 4.获取href属性值以 com 结尾的a标签 */
a[href$=“com”]{
	background:pink;
}
/* 5.获取href属性值包含 wolf 的a标签 */
a[href*=“wolf ”]{
	background:pink;
}
/* 6.获取href属性值以www开头并且title属性中包含demo的a标签 */
a[href^=“www”][title*="demo"]{
	background:pink;
}
/* 7.获取type为text的表单元素 */
input[type="text"]{
	color:red;
}
</style>
```
## 阴影属性（box-shadow）
box-shadow:x轴的偏移量 y轴的偏移量 阴影的范围;
```css
/* 外阴影 */
box-shadow:10px 10px 10px #000;
/* 内阴影 */
box-shadow:10px 10px 10px #000 inset;
```

## 过度属性(transition)
格式：
transition:要发生变化的属性名 发生过度的时间 动画曲线默认不是匀速（ease）延迟多少时间开始;
transition:all 10s linear 2s;
例子：
```css
.box{
	width:300px;
	height:300px;
	background:pink;
	transition:all 1s;
}
.box:hover{
	width:600px;
}
/* transition 加在变化的这个盒子上 （不要写在hover）*/
```
## 转化（transform）
### 旋转
transform:rotate(30deg); 默认是z轴旋转
### 位移
```css
div{
	height:200px;
	width:200px;
	background:pink;
	transform:translateX(300px) translateY(300px);
	/*
	向x轴移动300px 向y轴移动300px
	transform:translate(50%,50%)
	向x轴移动宽度的50%；向y轴移动高度的50% 150px;
	*/
}
/* 通过定位实现居中 */
div{
	width:300px;
	height:200px;
	background:pink;
	position:fixed;
	left:50%;
	top:50%;
	transform:translate(-50%,-50%);
}
```
### 转换缩放
```css
	div{
	width:200px;
	height:200px;
	background:red;
	margin:100px auto;
	transform:scale(2); // 放大的倍数
}
```
### 多个转换设置
transform:rotate(30deg) translate(200px);
发生转化的时候，坐标系会跟着发生转换
旋转中心和旋转轴
transform-origin:0 10px; // 元素的坐标系距离x周0，距离y周10px做旋转，单位可以是像素或者百分比（%）
随着Y轴旋转
transform-origin:left/right;
随着X轴旋转
transform-origin:top/bottom;
transform-origin和transition一样，谁发生变化就放在谁身上。
## 动画属性
css动画效果分两步：
1.定义动画
2.通过动画属性给元素添加动画效果
```css

@keyframes play
from{
left:0;
}
to{
left:600px;
}
div{
	width:200px;
	height:200px;
	background:pink;
	position:absolute;
	left:0;
	top:0;
	animation:play 1s linear(匀速);
	// animation:play 1s linear infinite（无限次）;
}
```
格式：
animation:动画名称 播放时长1次 动画曲线 播放次数 是否往复运动（alternate）
animation-play-state:paused(暂停);
