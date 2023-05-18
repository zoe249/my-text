# 一、类型

## 1、typescript相比于JavaScript新增类型



​	any 任意类型 声明为 any 的变量可以赋予任意类型的值

```typescript
let e:any = 1  any 声明为 any 的变量可以赋予任意类型的值 
e = true
e = '124'
```

​	unknown  unknown表示未知的类型； unknown 声明的变量不可以赋予其他类型的值

```typescript
// unknown
let un:unknown 
un = 21
un = true

let un1:string = un // 编辑器提示：不能将类型“unknown”分配给类型“string”
```

​	元组  固定长度的数组

```ts
 // 语法:[类型,类型,类型]
let h:[string,number]
h = ['123',123]
```

​	enum 枚举 

```tsx
enum Gender{
    male,
    famale
}
let i:{name:string,gender:Gender}
i={
    name:'tom',
    gender:Gender.male
}

```



​	viod 用来表示函数的返回值为空

```tsx
function fn(a):void{
}
```

​	never 不会返回任何值  不常用

```ts
function fn():never{
    throw new Error()
}
```

​	

## 2、类型断言

​	用来手动指定一个值的类型  语法：

* 变量 as 类型

  ```typescript
  let un2 = un as string
  ```

  

* <类型>  变量

  ```typescript
  let un2 = <string> un
  ```

* 特殊用法

  ```ts
  class Person{
  
  }
  
  class Student extends Person{
      studing(){
          console.log(131114);
      }
  }
  
  function sayHello(p:Person){
      (p as Student).studing()
  }
  
  const stu = new Student()
  sayHello(stu)
  ```

  

## 3、类型别名

* type 关键字定义类型别名

  `type idType = string|number|boolean`

* 列

  ```ts
  // type 关键字 定义类型别名
  type idType = string|number|boolean
  
  function id(id:idType){
      console.log(id)
  }
  
  id(123)    // 打印 123
  id('hello')  // 打印 hello
  id(true)  // 打印 true
  ```

## 4、可选链

* 语法 ？ 判断属性是否存在，如果存在继续执行，不存在则返回 undefined，不再继续执行

## 5、类型缩小

* typeof 类型缩小

  ```ts
  type IdType = string|number
  
  function printId(id:IdType){
      if(typeof id === 'string'){
          id.toUpperCase()
      }else{
          console.log(id)
      }
  }
  ```

  

* 等式类型缩小

  ```ts
  // 等式类型缩小
  type direction = 'left'|'right'
  function printDirection(dir:direction){
      switch(dir){
          case "left":
          console.log(dir)
      }
  }
  ```

  

* instanceof

  ```ts
  // instanceof
  function printTime(time:string|Date){
      if(time instanceof Date){
          console.log(time)
      }
  }
  ```

  

# 二、tsconfig.json  编译文件 

## compilerOptions 编译器的选项

| 属性             | 作用                         |
| :--------------- | ---------------------------- |
| target           | 编译成js的版本               |
| module           | 使用模块化版本               |
| lib              | 用来指定项目中使用多个库     |
| outDir           | 指定编译后文件所在目录       |
| outFile          | 编译后的代码合并到一个文件   |
| allowJs          | 是否编译js文件               |
| checkJs          | 检查JS代码是否符合规范       |
| removeComments   | 是否移除注释                 |
| noEmit           | 不生成编译后的文件           |
| noEmitOnError    | 有错误时不生成编译后的文件   |
| alwaysStrict     | 编译后的js文件是否为严格模式 |
| noImplicitAny    | 是否允许隐式any类型          |
| noImplicitThis   | 不允许不明确类型的this       |
| strictNullChecks | 严格检查控制                 |
| strict           | 严格模式  - 开启所有严格检查 |

# 三、webpack打包ts代码

# 四、typescript面向对象

## 1、class 类

* 使用 class 关键字定义一个Person 类

```tsx
calss Person{
    // 属性
    name:'tom';
    // 方法
    sayHi(){}
}
```

* static 修饰静态属性和方法 ，被static 修饰的属性和方法可以直接通过类去调用

```tsx
calss Person{
    // 属性
    static name:'tom';
    age:15;
    // 方法
    sayHi(){}
}
//创建一个 Person 实例
const man = new Person()
// 直接通过类调用静态属性
console.log(Person.name)
// 没有被static 修饰的属性需要通过实例调用
console.log(man.age)
```

* readonly 修饰只读属性 ，readonly修饰的属性不能通过实例去修改

```tsx
calss Person{
    // 属性
    static name:'tom';
    readonly age:15;
    // 方法
    sayHi(){}
}
//创建一个 Person 实例
const man = new Person()
man.age = 16 // 不能重新赋值 因为readonly修饰只读属性
```

* public 修饰的属性可以在任意位置调用

* private 私有变量  修饰的属性只能在类内部进行访问

  子类继承也不可访问

* protected 修饰的变量，父类 所继承的子类也可以访问

```ts
(function(){
    class Person{
       public _name:string;
       private _age:number;
       protected _gender:string;
       constructor(name:string,age:number,gender:string){
           this._name = name;
           this._age = age;
           this._gender = gender
       }
       get name(){
           console.log(this)
           return this._name
       };
       set name(value:string){
            this._name = value
            console.log(this)
       }
       
    }

    class Man extends Person{
        say(){
            super._age  // 不能访问 只能在定义的类中访问
            super._gender  // 继承父类  可以访问
        }
    }

    const per = new  Person('tom',14,'男')
    per._name // 可以访问

    per._age  // 不能访问 私有属性，不能直接访问
})()
```



## 2、constructor  构造函数

构造函数通常会有多个实例，每个实例的属性值不同，此时就需要要通过构造函数在实例创建的时候赋值

```ts
calss Person{
    name:string;
    age:number;
    // 构造函数 在函数创建的使用调用
    constructor(name: string, age: number){
        this.name = name
        this.age = age
        consolo.log(this) // this 指向当前的实例对象
    }
}
const dog = new Dog('tom',14)
const dog1 = new Dog('jerry',14)

```

## 3、继承

* extends 关键字， 使用继承后，子类会拥有父类的所有属性和方法，

```ts
class Animal{  // 父类
     name:string;
     age:number;
     constructor(name: string, age: number){
            this.name = name
            this.age = age
            console.log(this)
     }  
     bark(){
        console.log('动物类')
     }
}

// 使用 extends 关键字继承父类
class dog extends Animal{  // 子类
    // 重写父类的方法
    bark(){
        console.log('狗')
    }
}
const dog = new Dog('tom',14)  //  
```

* super 关键字

```ts
class Animal{  // 父类
     name:string;
     constructor(name: string, age: number){
            this.name = name
            this.age = age
            console.log(this)
     }  
     bark(){
        console.log('动物类')
     }
}

class dog extends Animal{  // 子类
    bark(){
        // 掉用父类的 bark 方法
        super.bark()
    }
}
const dog = new Dog('tom',14)  //  
```

如果在子类中写了构造函数，子构造函数会对父类中的构造函数进行重写，此时必须使用 super 关键字调用父类构造函数

```ts
class Animal{
        name:string;
        age:number;
        constructor(name: string, age: number){
            this.name = name
            this.age = age
            console.log(this)
        }  
        bark(){
            console.log('动物类')
        }
}
class Dog extends Animal{
        constructor(name: string, age: number){
            // super() 调用父类构造函数
            super(name,age)
        }
}
```

<font color="red">**implements与extends的定位与区别**</font>

* **implements**

  实现，一个新的类，从父类或者接口实现所有的属性和方法,同时可以重写属性和方法。包括一些新的功能

*  **extends**

  继承，一个新的接口或者类，从父类或者接口继承所有的属性和方法，可以重写方法，但是不可重写属性

  * 接口不能实现接口或者类，所以实现只能用于类身上,即类可以实现接口或类
  * 接口可以继承接口或类
  * 类不可以继承接口，类只能继承类
  * 可多继承或者多实现

 

## 4、抽象类

* 抽象类不能被创建对象，只是用作被继承的类

abstract 修饰

```ts
abstract class Animal{
        bark(){
            console.log('动物类')
        }
 }
```

* 抽象方法

​	抽象方法使用 abstract 修饰，没有方法体，抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写

``` tsx
abstract class Animal{
    	// 抽象方法，子类必须进行重写
       abstract bark():viod
 }
 class Dog extends Animal{
        bark(): void {
            console.log('wwww')
        }
 }
```

**抽象方法例子**

​	需求：封装一个函数，实现计算传入图形的面积（如：矩形，圆形,三角形）

​	分析：各个图形计算面积的方法不同,要使函数具备通用性，单纯定义一个函数难以实现

```ts
// 传入一个图形，返回该图形的面积
// 因为传入图形的不确定性,很难实现该需求
function makeArea(shape:Shape){
}
```

​	解决：使用抽象类和抽象方法

```ts
// 求面积的函数
function makeArea(shape:Shape){
    return shape.getArea()
}

// 定义一个抽象类
abstract class Shape{
    abstract getArea():void
}

// 定义一个矩形类，继承 Shape 类
class Rectangle extends Shape{
    private width:number;
    private height:number; 
    constructor(w:number,h:number){
        super()
        this.width = w
        this.height = h
    }
    // 重写方法，计算矩形面积
    getArea(){
        return this.width*this.height
    }
}

// 定义一个circle类 求圆的面积
class Circle extends Shape{
    private r:number;
    constructor(r:number){
        super()
        this.r = r
    }
    // 重写 
    getArea(){
        return this.r*this.r
    }
}

// 矩形
let a = new Rectangle(10,20)
// 圆形
let b = new Circle(20)

console.log(makeArea(a));  // 打印矩形面积 200
console.log(makeArea(b));  // 打印圆形面积 400
```



## 5、接口

定义类时，可以使类去实现一个接口，使类满足接口的使用要求接口中的所有属性都不能有实际的值，接口中所有的方法都是抽象方法

```ts
interface myInterface{
        name:string;
        age:number;
        say():void
    }
interface myInterface2{
    
}
	// 接口可以实现多继承
    class myClass implements myInterface,myInterface2{
        name:string;
        age: number;
        constructor(name:string,age:number){
            this.name = name
            this.age = age
        }
        say(){
            console.log(this)
        }
        
    }
    let per = new myClass('tom',15)
    per.say()
    console.log(per)
```

* 接口interface 与 type的区别

  type 定义的别名不可以重复，

  interface 会将重复的 接口合并

## 6、泛型

定义函数或者类时，遇到类型不明确的时候可以使用泛型

```ts
// 指定 一个泛型 T，在函数调用的时候确定其类型
function fn<T>(a:T):T{
    return a
}
// 确定类型 string
fn<string>('123')



// 定义接口
interface inter{
    length:number
}
// 指定泛型 t 继承 inter 接口
function fun<t extends inter>(a:t):t{
    return a
}
```

# 五、模块

命名空间 : namespace

语法：namespace 名称 {}

```ts
namespace my {
    
}
```

