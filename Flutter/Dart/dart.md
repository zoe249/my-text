## 1.Hello Dart

**Dart 入口文件是 main 函数，在Dart中打印内容是print()**

```dart
// 01-HelloWorld.dart
/**
* 函数返回值类型 函数名称(参数列表){
*  ... 函数体
* }
* 下面是一个完整的main函数
*/

// 在终端输入 dart 01-HelloWord.dart name 会打印出 'name'
void main(List<String> args) {
  print(args); // name
}
```

## 2.变量声明

### 2.1.明确的变量声明

类型 变量名 = 值

```dart
String name = '席华莲';
int age = 20;
double height = 169.9
```

### 2.2关键字声明

* var 关键字

  ```dart
  var message = 'hello dart';
  message = 'hello';
  ```

* const 关键字 是用来声明常量的 且在声明时就必须复制

  ```dart
  // const 是用来声明常量的 且在声明时就必须复制
  const message1 = 'const 声明的变量';
  message1 = ''; // 报错
  ```

* final 关键字 是用来声明常量的 且在声明时可以不赋值

  ```dart
  final message2;
  message2 = 'final 声明的常量';
  ```

* dynamic 关键字 用来声明动态类型

  ```dart
  dynamic zoe = 'hello';
  zoe = 134;
  ```

  
## 3.数据类型

#### 3.1 int 和 string 相互转换

​	字符串和数字之间的转化

```dart
// 字符串和数字转化
// 1.字符串转数字
var one = int.parse('111');
var two = double.parse('12.22');
print('${one} ${one.runtimeType}'); // 111 int
print('${two} ${two.runtimeType}'); // 12.22 double

// 2.数字转字符串
var num1 = 123;
var num2 = 123.456;
var num1Str = num1.toString();
var num2Str = num2.toString();
var num2StrD = num2.toStringAsFixed(2); // 保留两位小数
print('${num1Str} ${num1Str.runtimeType}'); // 123 String
print('${num2Str} ${num2Str.runtimeType}'); // 123.456 String
print('${num2StrD} ${num2StrD.runtimeType}'); // 123.46 String
```

**需要注意的是，在dart中并没有<font color="red">非空即真或者非0即真</font>的判断**

```dart
var message = 'hellow';
if (message) {  // 会提示错误
    print(message);
}
```

如果需要判断需要判断是否等于`null`

```dart
if(message != null) {
    print(message);
}
```

#### 3.2 字符串

字符串的拼接

* ${}  如果后面跟的是一个变量  `{}` 可以省略

  ```dart
  const message = 'hello world';
  print('$message')
  print('${message.runtimeType}')
  ```

#### 3.3集合

* List    List类型 [元素1，元素2...]    `js`中的数组  

* Set    Set 类型: {元素1，元素2...}    内容不允许重复

  ```dart
  List<String> names = ['zoe', 'xihl', '0102', 'zoe'];
  // 利用 Set 内容的唯一性去除重复
  final List<String> newName = List.from(Set.from(names));
  print(newName); // [zoe, xihl, 0102]
  ```

* Map Map类型{key:value}

  ```dart
  Map<String, dynamic> info = {"name": 'zoe', "age": 19};
  ```

#### 3.4函数

**函数使用** 类型 函数名 () {...函数体}

```dart
// 函数定义
int sum(int num1, int num2) {
  return num1 + num2;
}
```

**函数参数：**必传参数和可选参数

可选参数分为两种：

* 位置可选参数`[]` 
* 命名可选参数`{}`

```dart
void main(List<String> args){
    sum(10);
    sum2(11, num2: 3);
}
// 隐式的可选参数
void sum(int num1, [dynamic num2]) {
  print('$num1,$num2');
}

// 命名可选参数
void sum2(int num1, {dynamic num2, dynamic num3 = 3}) {
  print('$num1,$num2');
}
```

**函数是一等公民：**表示函数可以作为另一个函数的参数，也可以作为另一个函数的返回值

## 4.运算符

#### 4.1 特殊运算符

* `变量 ??= 值`当变量为null时，使用后面的内容进行赋值。当变量有值时，使用自己原来的值。

  ```dart
  void main(List<String> args) {
    dynamic name = 'xihualian';
  
    // 如果 name 有值，使用name的值
    // 如果 name 没有值，使用 "zoe"
    name ??= 'zoe';
  
    print(name);
  }
  ```

* `expr1 ?? expr2` 如果expr1是null，则返回expr2的结果; 如果expr1是null，则返回expr2的结果;

  ```dart
  var temp = 'why';
  var temp = null;
  var name = temp ?? 'kobe';
  print(name);
  ```

  

## 5.面向对象

#### 5.1 构造函数

```dart
class Person {
  String name = 'zoe';
  int age = 18;
  double height = 167.3;
  // 这里的 Person 就是 Person类的构造函数
  // Person(String name, {int age = 3, double height = 160.0}) {
  //   this.name = name;
  //   this.age = age;
  //   this.height = height;
  // }

  // 语法糖构造函数
  Person(this.name, {this.age = 0, this.height = 170});

  void eating() {
    print('${this.name}在吃饭');
  }
}

```

#### 5.2 命名构造函数

```dart
Map<String, dynamic> info = {'name': 'xhl', 'age': 13, 'height': 137.33};
// 通过命名构造函数实例化
final p1 = Person.formMap(info);
// 命名构造函数
Person.formMap(Map<String, dynamic> map) {
    this.name = map['name'];
    this.age = map['age'];
    this.height = map['height'];
}
```

