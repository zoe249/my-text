# css命名规范

## 1. 规范

- 必须以字母开头命名选择器，这样可保证在所有浏览器下都能兼容；
- 不允许单个字母的选择器出现；
- 不允许命名带有广告等英文的单词，例如 ad Jadv,adver,advertising 已防止该模块被浏览器当成垃圾广告过滤掉，任何文件的命名均如此；
- 下划线 '_'  禁止出现在 class 命名中，全小写统使用 '-' 连字符；
- 禁止驼峰命名className；
- 见名知意；

## 2. 规则

### (一)网页内容类：

标题: title
摘要: summary
箭头： arrow
商标： label
网站标志： logo
转角/圆角： corner
横幅广告： banner
子菜单： sub-menu
搜索： search
搜索框： search-box
登录： login
登录条：loginbar
工具条： toolbar
下拉： drop
标签页： tab
当前的： current
列表： list
滚动： scroll
服务： service
提示信息： msg
热点：hot
新闻： news
小技巧： tips
下载： download
栏目标题： title
热点： hot
加入： joinus
注册： regsiter
指南： guide
友情链接： friendlink
状态： status
版权： copyright
按钮： btn
合作伙伴： partner
投票： vote
左右中：left right center

### (二)注释的写法:

/*  content start  */

内容

/*  content end  */

### (三)id的命名:

(1)页面结构

容器: container
页头：header
内容：content/container
页面主体：main
页尾：footer
导航：nav
侧栏：sidebar
栏目：column
页面外围控制整体布局宽度：wrapper
左右中：left right center

(2)导航

导航：nav
主导航：main-nav
子导航：subnav
顶导航：topnav
边导航：sidebar
左导航：left-sidebar
右导航：right-sidebar
菜单：menu
子菜单：submenu
标题: title
摘要: summary

(3)功能

定时器：timer
标志：logo
广告：banner
登陆：login
登录条：loginbar
注册：regsiter
搜索：search
功能区：shop
标题：title
加入：joinus
状态：status
按钮：btn
滚动：scroll
标签页：tab
文章列表：list
提示信息：msg
当前的: current
小技巧：tips
图标: icon
注释：note
指南：guild
服务：service
热点：hot
新闻：news
下载：download
投票：vote
合作伙伴：partner
友情链接：link
版权：copyright

### (四)class的命名:

(1)颜色:使用颜色的名称或者16进制代码,如

.red { color: red; }
.f60 { color: #f60; }
.ff8600 { color: #ff8600; }

(2)字体大小,直接使用"font+字体大小"作为名称,如

.font12px { font-size: 12px; }
.font9pt {font-size: 9pt; }

(3)对齐样式,使用对齐目标的英文名称,如

.left { float:left; }
.bottom { float:bottom; }

(4)标题栏样式,使用"类别+功能"的方式命名,如

.bar-news { }
.barproduct { }



推荐的 CSS 书写顺序
//显示属性
display
list-style
position
float
clear

//自身属性
width
height
margin
padding
border
background

//文本属性
color
font
text-decoration
text-align
vertical-align
white-space
other text
content