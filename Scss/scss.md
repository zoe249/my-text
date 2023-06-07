## 运算符

### 等号操作符

| ==   | 等于   |
| ---- | ------ |
| !=   | 不等于 |

```scss
$theme: "red";

.container{
  @if $theme == 'red'{
    color: red;
  }
  @else{
    color: skyblue;
  }
}
```

### 比较运算符

| 符号      | 说明     |
| --------- | -------- |
| < （lt）  | 小于     |
| > （gt）  | 大于     |
| <=（lte） | 小于等于 |
| >=（gte） | 大于等于 |

```scss
$theme: 5;

.container{
  @if $theme >= 3{
    color: red;
  }
  @else{
    color: skyblue;
  }
}
```

### `scss`运算

`scss`数据类型包括：纯数字、百分号、`css单位`

`%`不能与 单位一起运算

纯数字与百分号或单位运算时会自动转化成相应的百分号与单位值

### 插值语句

```scss
$font-size: 12px;
$font-height:24px;

.container{
  font: $font-size/$font-height Helvetice;
}

// 编译后的css 
.container {
  font: 0.5 Helvetice;
}

// 我们希望编译后的css是
.container {
  font: 12px/24px Helvetice;
}
```

插值语句

```scss
.container{
    font: #{$font-size}/#{$font-height} Helvetice;
}
// 编译后的css是
.container {
  font: 12px/24px Helvetice;
}
```

### 函数

### `for`指令

```scss
// 语法
@for $i from 1 through 4 {
  .p#{$i} {
    width:10px;
  }
}

// 编译后
.p1 {
  width: 10px;
}

.p2 {
  width: 10px;
}

.p3 {
  width: 10px;
}

.p4 {
  width: 10px;
}/*# sourceMappingURL=test1.css.map */
```

`@for $i from 1 through 4` 与`@for $i from 1 to 4`的区别

`through`关键字会包含最后一项，在这里会循环4次；`to`关键字不会包含

下面使用`scss`实现的一个简单动画

```scss
// scss 
@keyframes loading {
  0% {
    opacity: 0.3;
    transform: translateY(0px);
  }
  50%{
    opacity: 1;
    transform: translateY(-20px);
    background: pink;
  }
  100%{
    opacity: 0.3;
    transform: translateY(0px);
  }
}

#loading {
  position: fixed;
  top: 200px;
  left: 46%;
}

#loading span {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: skyblue;
  opacity: 0.5;
  border-radius: 50%;
  animation: loading 1s infinite ease-in-out;
}

@for $i from 1 to 10 {
  #loading span:nth-child(#{$i}){
    left: 20 * ($i - 1) + px;
    // animation-delay: 20 * ($i - 1) / 100 + s;
    animation-delay: unquote($string: '0.'+($i - 1) + s);
  }
}
```

### each 指令

```scss
$color-list:yellow,skyblue,pink,orange;

@each $color in $color-list {
  $index: index($color-list,$color);
  .p#{$index - 1}{
    background-color: $color;
  }
}
// 编译后的css
.p0 {
  background-color: yellow;
}

.p1 {
  background-color: skyblue;
}

.p2 {
  background-color: pink;
}

.p3 {
  background-color: orange;
}/*# sourceMappingURL=test1.css.map */ 
```

### `@function`函数

##### **函数的定义**

```scss
@function function-name($param1,$param2){
  // 函数体
  @return $value
}
```

****

**连接符`function-name`与下划线`function_name`是等价的**

##### 任意参数

```scss
@function background-linear-liadient($direction,$gradients...){
  @return linear-gradient($direction,$gradients)
};

body{
  background-image: background-linear-liadient( to right, orange, pink);
}
```

**混入`mixin`喝函数`funciton`的区别**

* 混入`mixin`主要是通过传递参数的方式输出多样化的代码，为了可以实现代码复用

* 函数功能主要是通过传递参数后，经过函数的计算，最后`@return`输入一个值

## 三元表达式

```scss
$theme:'light';
.container{
  color: if($theme=='light',#000,#fff)
}
// 编译后的 css
.container {
  color: #000;
}/*# sourceMappingURL=test1.css.map */
```

## @use使用

```scss
@use '../uses/container';
@use '../style/about.css';
```

