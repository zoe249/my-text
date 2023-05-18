# Gird 布局基本属性

## 一、基本概念

**容器属性：container**

外层大盒子就是容器属性 container

**项目属性：items**

里面的具体内容就是项目属性 item

## 容器属性

### 1、grid-template-*

**想写多少行或多少列，就填写相应属性的个数。不填写就会自动分配，将容器自动充满。**

```css
* grid-template-columns:100px 100px 100px;/*（表示三列）*/

* grid-template-rows:100px 100px 100px 100px; /* (表示四列) */

* repaet() /*  第一个参数是重复的次数，第二个是重复的值 */
grid-template-columns：repeat(3，100px);
等价于
grid-template-columns：100px 100px 100px;
```

##### 2、auto-fill

**有时单元格的带下是固定的，但是容器的大小不确定，auto-fill会自动对容器进行填充**

```css
grid-template-rows:(auto-fill,200px) 
```

##### 3、fr

  **方便表示比例关系fraction的缩写，片段的意思）**

```css
grid-template-columns：repeat（4，1fr）  /* 宽度平均分为四列等分 */
```

##### 4、minmax()

**产生一个长度范围，两个参数，一个最小，一个最大**

```css
grid-template-columns：1fr minmax（150px,1fr） /* 最小都不会小于150px */
```

##### 5、auto

**表示浏览器自己决定长度**

```css
grid-template-columns：100px auto 100px  /* 不写则默认 auto */
/* 中间自动填充，根据浏览器的大小自动计算 */
```

![](https://img-blog.csdnimg.cn/20210126151415514.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5eV93ag==,size_16,color_FFFFFF,t_70)

##### 6、网格线

**帮助定位 格子定位到哪跟线上**

```css
grid-template-columns:[c1] 100px [c2] 100px [c3]    /* 2列3跟网格线 */
```



![网格线](https://img-blog.csdnimg.cn/20210126110225870.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5eV93ag==,size_16,color_FFFFFF,t_70)



### 2、grid-row-gap  /  grid-columns-gap

**item 项目之间的间隔**

##### 	1、row-grp    

   **行与行之间的距离**

   #####     2、column-gap

​	**列于列之间的距离**

	##### 	3、gap   简写

```css
gap：20px 20px
```



### 3、**grid-template-areas**

**一个区域由单个或多个单元格组成 需要在项目属性里面设置】**

**每个单元格代表一个区域 （自己想怎么划分就怎么划分 一个格子可以成为一个区域 两个格子也可以成为一个区域）**

![](https://img-blog.csdnimg.cn/2021012615270085.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5eV93ag==,size_16,color_FFFFFF,t_70)

### 4、grid-auto-flow

**划分网格线以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是\**先行后列\**，即填满第一行，再开始放入第二行（就是子元素的排放顺序）**

##### 	1、 **grid-auto-flow：row**

 ##### 	2、grid-auto-flow：column 

##### 	3、dense   

​	**提高空间利用率**

​	![](https://img-blog.csdnimg.cn/20210126154209371.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5eV93ag==,size_16,color_FFFFFF,t_70)

### 5、justify-items(水平方向) / align-items(垂直方向)

​	**设置\**所有单元格\**内容的水平和垂直的对齐方式**

##### 	1、justify-items  水平方向

##### 	2、align-items 垂直方向

​	![](https://img-blog.csdnimg.cn/20210126154658214.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5eV93ag==,size_16,color_FFFFFF,t_70)

### 6、justify-content(水平方向) / align-content(垂直方向)

​	**设置\**整个内容区域\**的水平和垂直对齐方式**

​	![](https://img-blog.csdnimg.cn/20210126155641443.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5eV93ag==,size_16,color_FFFFFF,t_70)

 ### 7、grid-auto-columns / grid-auto-rows 

​	**用来设置\**多出来的项目\**的宽和高**

​	![](https://img-blog.csdnimg.cn/20210126160102942.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5eV93ag==,size_16,color_FFFFFF,t_70)



## 项目属性

### 	1、指定 item 的具体位置

 		**grid-column-start / grid-column-end**

​	 	**grid-row-start / grid-row-end**  **用来指定item的\**具体位置\****

```css
grid-column: 1 / 3; /* 第一个参数开始的位置，第二个参数结束的位置 */
grid-column-start: span 2;  /* 从开始方向跨两个单元格 */
grid-column-end: span 2;   /* 从结束方向跨域两个单元格 */
```

	### 	2、grid-area 指定项目在哪一个区域

​		**结合容器属性一起使用**

```css
grid-template-areas: 'a a a'
				   'b b b'
				   'c c c'
grid-area: b
```

![](https://img-blog.csdnimg.cn/20210126162414415.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3l5eV93ag==,size_16,color_FFFFFF,t_70)

​	简写  **grid-area**

    ```css
    grid-column-start:1
    grid-column-end:3
    grid-row-start:1
    grid-row-end:3
    
    grid-area：1 / 1 / 3 / 3
    ```

### 3、justify-self / algin-self

​	**只能用于单个项目（item) 的  水平/ 垂直     方向**

​	简写  **place-self：center center**