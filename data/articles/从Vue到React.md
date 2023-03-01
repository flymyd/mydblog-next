# 从Vue到React 18

以Vue2为主要参考对比，辅以部分Vue3概念，向React 18迁移的CookBook

## 零、QA快速索引

### Vue Template与JSX的区别？

[Mustache模板与JSX](##3. Mustache模板与JSX)

### Vue Options组件与React类组件的区别？

[React类组件/Vue Options组件](##4. React类组件/Vue Options组件)

### Vue Composition组件与React函数式组件的区别？

[React函数式组件/Vue Composition组件](##5. React函数式组件/Vue Composition组件)

### 如何在React中实现组件内部样式，类似于style scoped？

[React中的CSS方案](##11. React中的CSS方案)

## 1. 创建Vite-React工程

用点新东西吧。

```shell
yarn create vite react-study --template react-ts && cd ./react-study && yarn install
yarn add @types/node --dev
```

配置vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    open: false, 
  }
})
```

在tsconfig.json的complierOptions下增加节点

```json
"baseUrl": ".",
"paths": {
	"@/*": [
		"src/*"
	]
}
```

## 2. 起步：简单的Hello World

App.tsx

```tsx
import React from 'react'

function App() {
  const clickEvent = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e)
  }
  const helloWorld = `Hello world! Now timestamp is: ${new Date().getTime()}`
  const btnDom = <button onClick={clickEvent}>This is a JSX rendered button</button>
  const helloWorldTitle = <h1>{helloWorld}</h1>
  return (
    <div className="App">
      {helloWorldTitle}
      <p>{helloWorld}</p>
      {btnDom}
    </div>
  )
}

export default App
```

## 3. Mustache模板与JSX

不同于Vue中常见的模板语法，React使用JSX语法来描述DOM元素。

JSX在react中实质上只是React.createElement的语法糖。与Vue template相同的是，render函数返回的JSX有且只能有一个根节点。

**想直接返回多个子元素？试试[<React.Fragment>](https://react.docschina.org/docs/fragments.html)**

在Vue模板中，我们使用形如{{ 表达式 }}的Mustache语法以在模板中取得Vue实例中的响应式变量（或计算属性）；而在React JSX中则可以使用形如{ 表达式 }的语法来声明一个变量或vDOM。

与Vue不同的是，我们可以直接以变量的形式声明一个DOM元素，然后在组件实例的Render函数中以{}来引用。比如上述的App.tsx实例代码，实际上会输出一行以h1标签包裹的字符串、一行以p标签包裹的相同字符串以及一个绑定了clickEvent事件的按钮。

在使用Vue的模板语法时，我们通常利用v-bind指令（或它的语法糖冒号:）用来给DOM元素（或组件）传递一个动态值而非字符串字面量。如：

```html
<template>
  <button :id="koji" @click="shouting" type="button" :style="{marginLeft: '50px'}" :class="'btn-'+new Date().getTime()">
    {{ name }}
  </button>
</template>
<script>
  export default {
    data(){
      return {
        btnId: 'koji',
        name: 'Yajuu senpai'
      }
    },
    methods: {
      shouting(){
        alert('114514')
      }
    }
  }
</script>
```

而在React中应该使用{}代替""书写：

```react
function App() {
  const shouting = () => {
    alert('114514')
  }
  const name = 'Yajuu senpai'
  const btnId = 'koji'
  const btnDom = <button id={btnId} onClick={shouting} type="button" style={{marginLeft: '50px'}} className={`btn-${new Date().getTime()}`}>{name}</button>
  return (
    <div className="App">
      {btnDom}
    </div>
  )
}

export default App
```

上述对比示例中，按钮拥有几个属性

* type="button" 是一个字面量属性。
* id="koji" 绑定了btnId的值。
* 一个onClick事件，点击后执行函数shouting。在Vue中我们通常使用v-on:click的语法糖@click，而React中则会将HTML DOM Event转为小驼峰方式声明，即onclick变为onClick。
* style绑定了一个JavaScript对象（CSS Property）
* 在JSX中因为保留字的关系，class需要变为className。

**React函数式组件的return()和类组件中的render()都不能直接修改组件的状态（states及props）。**

**在React中父组件更新子组件的props，在子组件接收到新的props时会通过[componentWillReceiveProps()](https://reactjs.org/docs/react-component.html#componentwillreceiveprops)生命周期来执行this.setState()来更新视图，但不会引起第二次渲染。**

### onClick等事件的小坑

如果有这样一个组件：

```react
const Test: FC = () => {
  function shout(text: string) {
    console.log(text)
  }
  const showNow = () => {
    console.log("一针见血的")
  }
  return (
    <div>
      <button onClick={shout("错误用法")}>错误的</button>
      <button onClick={() => { shout("hello") }}>正确的</button>
      <button onClick={showNow}>一针见血的</button>
    </div>
  )
}
```

这个组件将会在渲染的时候首先打印"错误用法"，而后才会在点击按钮的时候打印"hello"，并且第一个按钮点击无反应。原因是组件渲染时直接将shout()当做一个函数执行了，而它返回了undefined，点击时实际上是onClick=undefined。

如果为shout增加返回值，比如return "哼哼哼"，那么"错误的"按钮将会导致页面报错。因为此时onClick="哼哼哼"，不是一个函数。

为什么"一针见血的"按钮就可以正常使用呢？因为它实际上就是onClick=()=>{}，onClick执行函数当然没问题。同理，如果写onClick={showNow()}就不行了。

当然，也可以进行柯里化：

```tsx
const shout = (text: string) => () => console.log(text);
return (
	<button onClick={shout("hello")}>柯里化的</button>
)
```

## 4. React类组件/Vue Options组件

上述示例中均以函数式组件为示例。但是在学习React的过程中，类组件依然是一个绕不开的话题。React的类组件之于函数式组件就类似Vue3中的script setup之于Vue2的选项式API。

来自React官方文档的Clock组件：Clock.jsx

```react
import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default Clock;
```

用Vue Options Api改写：Clock.vue

```html
<template>
	<div>
    <h1>Hello, world!</h1>
    <h2>It is {date.toLocaleTimeString()}.</h2>
  </div>
</template>
<script>
export default{
  data(){
    return {
      date: new Date(),
      timerID: null
    }
  },
  methods:{
    tick(){
      this.date = new Date()
    }
  },
  mounted(){
    this.timerId = setInterval(()=>this.tick(), 1000)
  },
  beforeDestroy(){
    clearInterval(this.timerID);
  }
}
</script>
```

简单地来说，React类组件中的state大概相当于Vue2中的data()，state是属于当前组件私有的数据。以上述代码为例，在Vue中，若要使响应式数据的变化反馈到模板上，我们只需要为this.date赋新值即可；但在React中需要使用this.setState()方法进行赋值操作。直接向state赋值是无法重新渲染组件的，如：

```react
this.state.date = new Date();   //这样不会触发DOM更新
```

关于setState（或useStates）的更多信息，参见[17. 使用state的一些要点](##17. 使用state的一些要点)

### 生命周期对比

详细的React[生命周期图](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

```react
class HelloWorld extends React.Component {
    // 继承react的props，和设置state的初始化
    constructor(props) {
      super(props); //不能缺少
      this.state = {
        color: props.initialColor
      };
    }
    // 类似Vue的beforeMoute，只mount前调用一次，在 render 之前调用
    componentWillMount();
     
    /* 类似Vue的template 该方法会创建一个虚拟DOM，用来表示组件的输出。
    render方法需要满足下面几点: 
      1.只能通过 this.props 和 this.state 访问数据（不能修改）
      2.可以返回 null,false 或者任何React组件 
      3.只能出现一个顶级组件，不能返回一组并列元素（**react16也支持返回数组了**） 
      4.不能改变组件的状态 
      5.不能修改DOM的输出 
    */
    render() {
        return <h1>Hello World!</h1>;
    }
    
    // 类似Vue的mounted, 在 render 之后调用,从这里开始可以通过 ReactDOM.findDOMNode(this) 获取到组件的 DOM 节点。
    componentDidMount() {
        //添加事件订阅，额外的DOM处理
    };
     
    // 通过改变props或state来驱动视图的更改，会触发以下钩子
    componentWillReceiveProps();
    // 在react中这是一个性能优化的关键点，当父组件改变，全部子组件都会重新渲染
    // 可以通过该钩子返回false来阻止渲染，此处还有另外一种PureComponent实例
    // 参见https://reactjs.org/docs/react-api.html#reactpurecomponent
    // Vue对此做了优化，参见https://v2.cn.vuejs.org/v2/guide/comparison.html#运行时性能
    shouldComponentUpdate(nextProps, nextState){
        //return boolean
    };
    // 类似Vue的beforeUpdate
    componentWillUpdate();
    
    render();  //再次触发render，实际上Class Component中只会有一个render函数
    
    // 类似Vue的updated 
    componentDidUpdate();
    
    // 类似Vue的beforeDestroy,组件销毁之前被调用,在此钩子中，出于性能的考虑需移除在componentDidMount添加的事件订阅，网络请求等。
    componentWillUnmount() {
        //移除在componentDidMount添加的事件订阅，网络请求等
    };
 
}
```

### 类组件的事件绑定

React在JSX中传递的事件不是一个字符串，而是一个函数。比如在onClick中，它所绑定的函数会丢失this指向，所以要记得使用箭头函数或通过手动bind来将事件处理函数的this一直指向当前实例化对象。常见的绑定方式有三种：

```react
class Test extends React.Component {
  constructor(props: any) {
    super(props)
    this.handleClick = this.handleClick.bind(this);  //构造器预先bind方式要这样写
  }
  handleClick(text: string) {
    console.log(text)
  }
  noParams(){
    console.log("hello")
  }
  render(): React.ReactNode {
    return (
      <div>
        <button onClick={()=>{this.handleClick("Yajuu 114514")}}>箭头函数方式</button>
        {/* render中bind的函数不可以传参，因为bind是在函数的引用上使用的，因为它是Function.prototype.bind() */}
        <button onClick={this.noParams.bind(this)}>render中bind方式</button> 
        <button onClick={this.handleClick("Yajuu 114514")}>构造器预先bind方式</button> 
      </div>
    )
  }
}
```

### 函数式组件的事件绑定

参见[onClick等事件的小坑](###onClick等事件的小坑)

## 5. React函数式组件/Vue Composition组件 

**Function Component 是更彻底的状态驱动抽象，甚至没有 Class Component 生命周期的概念，只有一个状态，而 React 负责同步到 DOM。**

### 写法

总的来说，Vue Compotision的写法很像React函数式组件。以<script setup>写法举例：

```html
<template>
	<div>
    <h1>{{hello}}</h1>
    <button @click="hello='哼哼哼'">点我</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const hello = ref("Hello World!")
</script>
```

下面是React函数式组件写法：

```tsx
import { FC } from 'react'
import { useState } from 'react'

const Test: FC = () => {
  const [hello, setHello] = useState("Hello World!")
  return (
    <div>
      <h1>{hello}</h1>
      <button onClick={() => setHello("哼哼哼")}>点我</button>
    </div>
  )
}
```

在函数式组件中要使用useState hook进行state的声明和修改。useState的参数即为该state的初始值，使用数组解构可以得到一个访问state的引用以及用于更新该state的函数。在Vue Composition中，以ref()声明的响应式变量需要使用.value进行访问及更新，而React中的useState则是使用解构出的引用及更新函数分别进行访问/更新。

### 从生命周期钩子迁移到useEffect()

在Composition Api中访问生命周期可以使用形如onMounted(()=>{})的钩子，而在函数式组件中则可以使用[useEffect](https://zh-hans.reactjs.org/docs/hooks-effect.html)这个较为通用的hook。

useEffect的简单使用可以看下面的例子。若要进一步了解，参见[精读《useEffect完全指南》](https://zhuanlan.zhihu.com/p/60277120)

```javascript
import { useState, useEffect } from 'react'
function App() {
  const [num, setNum] = useState(1)
  const [count, setCount] = useState(1)
  useEffect(() => {
    console.log('哈哈哈哈')
  })
  return (
    <div>
      <button onClick={() => setNum(num + 1)}>点我修改num</button>
      <button onClick={() => setCount(count + 1)}>点我count</button>
    </div>
  )
}
```

第二个参数不传

```javascript
 useEffect(() => {
    console.log('哈哈哈哈')
 })
```

当` useEffect `第二个参数不传时，` 页面初始 `和` 数据更新 `的时候，第一个参数函数都会执行，所以此时初始页面时会输出一次` 哈哈哈哈 `，然后无论你点修改num或者修改count的按钮时，也都会输出` 哈哈哈哈`

第二个参数传空数组

```javascript
 useEffect(() => {
    console.log('哈哈哈哈')
 }, [])
```

当` useEffect `第二个参数传` [] `时，那么第一个参数函数只有在` 页面初始 `的时候才会执行，也就是只执行一次，无论你点修改num或者修改count的按钮，都不会执行这个函数

第二个参数传非空数组

```javascript
 // ①
 useEffect(() => {
    console.log('哈哈哈哈')
 }, [num])
 
 // ②
 useEffect(() => {
    console.log('哈哈哈哈')
 }, [count])
 
 // ③
 useEffect(() => {
    console.log('哈哈哈哈')
 }, [num, count])
```

当` useEffect `第二个参数传非空数组时，` 页面初始 `和` 依赖的数据发生更新 `的时候，第一个参数函数都会执行。比如上方例子：

- 只有按修改num按钮时，才会再次输出` 哈哈哈哈`
- 只有按修改count按钮时，才会再次输出` 哈哈哈哈`
- 无论按哪个按钮都会再次输出` 哈哈哈哈`

return清除操作

```javascript
useEffect(() => {
    const timeId = setTimeout(() => console.log('我是定时器'), 1000)
    return () => clearTimeout(timeId)
 })
```

React 会在组件卸载的时候执行清除操作。effect 在每次渲染的时候都会执行。React 会在执行当前 effect 之前对上一个 effect 进行清除。

## 6. 一些组件的相关知识

尽管上文中已经介绍过部分要点，不过还是有必要再总结一遍：

1. 无论是使用函数或是类来声明一个组件，它决不能修改它自己的 props。
2. 所有 React 组件都必须是纯函数，并禁止修改其自身 props 。
3. React是单项数据流，父组件改变了属性，那么子组件视图会更新。
4. 属性 props 是外界传递过来的，状态 state 是组件本身的，状态可以在组件中任意修改组件的属性和状态改变都会更新视图。

### 注册及使用组件

React组件没有全局注册和局部注册的概念，我们可以使用ES6的class或function来创建组件，调用通过import导入组件实例。

类组件：

```react
import React from "react";

class Hello extends React.Component {
  constructor(props) {
    super(props);
    // 这里类似于Vue Options中声明一组data(){return {}}
    this.state = { helloText: 'Welcome to Shimokita' };
  }
 	
  // 类似于Vue的模板
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>{this.state.helloText}</h2>
      </div>
    );
  }
}

export default Hello;
```

函数式组件：

```react
import { FC, useState } from "react";

const Test: FC = () => {
  const [helloText] = useState("Yajuu Senpai")
  return (
    <div>{helloText}</div>
  )
}
export default Test;
```

在父组件中使用：

```react
import { FC, useState } from 'react'
import Test from './Test'
import Hello from './Hello';
const App: FC = () => {
  const [value, setValue] = useState('')
  return (
    <div className='App'>
      <Test></Test>
      <Hello></Hello>
    </div>
  )
}

export default App
```

### 组件的生命周期（八股文限定版）

**还别说，除开constructor真的有八种**

重要的事要强调：详细的React[生命周期图](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

constructor（调用React.Component的构造器，进行state的初始化及绑定事件处理方法等工作）

componentWillMount（类似beforeMounted，在这里调用this.setState不会引起组件的重新渲染）

render：根据props和state返回一个React Element。在这里不能调用this.setState，否则会改变组件的状态

componentDidMount：组件挂载到DOM后调用。此时已经可以获取到DOM，类似于Mounted。在这里调用this.setState也会引起组件的重新渲染。

componentWillReceiveProps(newProps)：父组件传给该组件新的props时触发的钩子，一般需要比较新props与this.props来决定是否执行props变化后的逻辑，例如根据新props调用this.setState触发重新渲染。

shouldComponentUpdate(newProps, newState)：该方法决定组件是否继续更新。一般通过比较新props、state与组件当前的props、state来决定该方法返回true还是false，从而减少组件不必要的渲染，优化性能。

componentWillUpdate(newProps, newState)：该方法在render调用前执行。

componentDidUpdate(oldProps, oldState)：组件更新后的钩子，可以在此处操作更新后的DOM

componentWillUnmount：卸载组件前调用，类似于beforeDestory。

### 类组件、函数式组件的一些区别

若要学习更多，参见[20. 从类组件迁移到函数式组件](##20. 从类组件迁移到函数式组件)

- 类组件可以获取实例化的 this，并且基于 this 做各种操作，函数组件不可以。
- 类组件有生命周期，函数组件没有。
- 类组件内部可以定义并维护 state， 函数组件为无状态组件（可以通过hooks useState实现）
- 类组件需要继承 Class，函数组件不需要。所以函数组件的性能比类组件的性能要高，因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可。

函数组件相比较类组件，优点是更轻量与灵活，便于逻辑的拆分复用。

### 类组件、函数式组件在TypeScript中

#### 函数式组件React.FC<>

* React.FC是函数式组件，是在TypeScript使用的一个泛型，FC就是FunctionComponent的缩写，事实上React.FC可以写成React.FunctionComponent：

  ```react
  const App: FunctionComponent<{ message: string }> = ({ message }) => (
    <div>{message}</div>
  );
  ```

* React.FC 包含了 PropsWithChildren 的泛型，不用显式的声明 props.children 的类型。React.FC<> 对于返回类型是显式的，而普通函数版本是隐式的（否则需要附加注释）*注意，React 18与低版本在此处有所不同，参见下文*

* React.FC提供了类型检查和自动完成的静态属性：displayName，propTypes和defaultProps（注意：defaultProps与React.FC结合使用会存在一些问题）。

* 使用React.FC来写 React 组件的时候，是不能用setState的，取而代之的是useState()、useEffect等 Hook API。

##### React 18和低版本的FC定义区别

* React 18不再预定义PropsWithChildren

  ```typescript
  type FC<P = {}> = FunctionComponent<P>;
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
  }
  ```

* React < 18则有

  ```typescript
  type FC<P = {}> = FunctionComponent<P>;
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P> | undefined;
    contextTypes?: ValidationMap<any> | undefined;
    defaultProps?: Partial<P> | undefined;
    displayName?: string | undefined;
  }
  ```

  

#### 类组件class xx extends React.Component

* 如需定义 class 组件，需要继承类组件 React.Component。
* 在TypeScript中，React.Component是通用类型（aka React.Component<PropType, StateType>），因此要为其提供（可选）prop和state类型参数。

### 定义组件的Props属性及默认值（参数类型检查）

#### 使用TypeScript的类型检查

```tsx
import React from 'react'
import { FC } from 'react'

// 声明一个人（大嘘）
// TS类型声明的精华都在接口上，可以方便地实现联合类型、子对象的类型检测等
interface People {
  pName: string,   //必选项 姓名
  age?: number,    //可选项 年龄
  company?: string //可选项 公司
}

// 类组件，可能是看起来最像Vue的写法
class TestClass extends React.Component<People, {}> {
  // 不加People类型的话可以声明任意个甚至零个默认值
  static defaultProps: People = {
    pName: '李田所',
    age: 24,
    company: 'COAT',
  }
  constructor(props: any) {
    super(props)
  }
  render(): React.ReactNode {
    return (
      <div>
        <p>{this.props.pName}</p>
        <p>{this.props.age}</p>
        <p>{this.props.company}</p>
      </div>
    )
  }
}

// 不需要设置默认值的FC组件，这样写很简单。
// 你是一个一个一个TypeScript啊啊啊啊啊啊
const TestFC: FC<People> = (props: People) => {
  return (
    <div>
      <p>{props.pName}</p>
      <p>{props.age}</p>
      <p>{props.company}</p>
    </div>
  )
}

// 如果想在FC组件上设置默认值，试试解构+默认参数似乎不错。不要跳类型体操，好吗？
const TestWithDefaultProps: FC<People> = ({ pName, age = 24, company = "NicoNico" }) => {
  return (
    <div>
      <p>{pName}</p>
      <p>{age}</p>
      <p>{company}</p>
    </div>
  )
}

const App: FC = () => {
  return (
    <div className='App'>
      <TestClass pName="张三浦" age={114514}></TestClass>
      <TestFC pName="哼哼哼"></TestFC>
      <TestWithDefaultProps pName="赵木村"></TestWithDefaultProps>
    </div>
  )
}

export default App
```

#### 使用JavaScript的类型检查

可以不要开历史的倒车吗？还要记得安装一个库```npm install prop-types --save```

```jsx
import React from 'react'
import { FC } from 'react'
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, {this.props.pName}</h1>
        <h2>I'm {this.props.age} years old</h2>
        <h3>{this.props.company}爆破</h3>
      </div>
    );
  }
}

Greeting.propTypes = {
  pName: PropTypes.string.isRequired,  //必选项需要在该属性上调用isRequired
  age: PropTypes.number,
  company: PropTypes.string
};
Greeting.defaultProps = {
  pName: '李田所',
  company: 'COAT'
}

// 函数式组件像上文TS写法中TestWithDefaultProps组件一样直接解构就行，懒得写了

const App: FC = () => {
  return (
    <div className='App'>
      <Greeting age={24}></Greeting>
    </div>
  )
}

export default App
```

更多用法，如声明联合类型、检查对象由特定的类型值组成等请参考[使用PropTypes类型检查](https://react.docschina.org/docs/typechecking-with-proptypes.html)

## 7. React中的父子组件通信、自定义事件、事件处理

### 父子组件通信

#### 父传子

1、使用props传递属性

2、使用ref

父组件通过`React.createRef()`创建`Ref`，保存在实例属性`myRef`上。父组件中，渲染子组件时，定义一个`Ref`属性，值为刚创建的`myRef`。

父组件调用子组件的`myFunc`函数，传递一个参数，子组件接收到参数，打印出参数。

参数从父组件传递给子组件，完成了父组件向子组件通信。

```javascript
import React, { Component, Fragment } from 'react';

class Son extends Component {
    myFunc(name) {
        console.log(name);
    }
    render() {
        return <></>;
    }
}

// 父组件
export default class Father extends Component {
    constructor(props) {
        super(props);
        // 创建Ref，并保存在实例属性myRef上
        this.myRef = React.createRef();
    }

    componentDidMount() {
        // 调用子组件的函数，传递一个参数
        this.myRef.current.myFunc('Jack');
    }
    render() {
        return (
            <>
                <Son ref={this.myRef} />
            </>
        );
    }
}
```

#### 子传父

1、使用回调函数，参见下文自定义事件

2、事件冒泡

点击子组件的`button`按钮，事件会冒泡到父组件身上，触发父组件的`onClick`函数，打印出`Jack`。点击的是子组件，父组件执行函数，完成了子组件向父组件通信。

```javascript
const Son = () => {
    return <button>点击</button>;
};

const Father = () => {
    const sayName = name => {
        console.log(name);
    };
    return (
        <div onClick={() => sayName('Jack')}>
            <Son />
        </div>
    );
};

export default Father;
```

### 自定义事件

在Vue中，我们通常会声明一组v-on与emit来进行自定义事件的传递。而在React中则可以通过props将事件处理器本身传递进子组件中用以调用。

Vue示例：

```html
<!-- 父组件 -->
<template>
	<Coat @rape="rape"></Coat>
</template>
<script>
	export default {
    methods: {
      rape(e){
        console.log(e)
      }
    }
  }
</script>

<!-- 子组件 -->
<template>
	<button @click="$emit('rape','哼哼哼啊啊啊啊啊')">子组件雷普父组件</button>
</template>
```

React示例

```tsx
const Test: FC<{ rape: Function }> = (props) => {
  return (
    <button onClick={() => { props.rape('哼哼哼啊啊啊啊啊') }}>子组件雷普父组件</button>
  )
}

const App: FC = () => {
  const onRape = (text: string) => {
    console.log(text)
  }
  return (
    <div className='App'>
      <Test rape={onRape}></Test>
    </div>
  )
}
```

### 事件处理

详解参见[React的事件处理](https://blog.csdn.net/Han_Zhou_Z/article/details/123338807)

## 7-1. React中的祖孙组件通信：Provider-Consumer

当组件嵌套层级过多时，使用props一层层地传递事件不是一个好主意。除了使用第三方状态库以外，还可以使用Provider-Consumer设计模式来解决这个问题。在Vue中，类似的模式是Provide-Inject。

相关阅读：[React组件设计模式-Provider-Consumer](https://juejin.cn/post/6844903861161820167)

### 类组件示例

```tsx
import React, { Component, createContext } from 'react'
import './index.css'

const COLOR = ['#B5E61D', '#ED1C24', '#00A2E8', '#A349A4', '#B97A57', '#A349A4']
const Theme = createContext(COLOR[1])

export default class grandfather extends Component {
  state = {
    theme: COLOR[0]
  }
  changeColor = () => {
    this.setState({
      theme: COLOR[Math.ceil(Math.random() * (COLOR.length - 1))]  // 随机获取颜色
    })
  }
  render() {
    return (
        <div className="grandfather">
          <div>当前主题为：{this.state.theme}</div>
          <div style={{ color: this.state.theme }}>grandfather</div>
          <Theme.Provider value={this.state.theme}>
            <Father></Father>
          </Theme.Provider >
          <button className="fixed2" onClick={this.changeColor}>换肤</button>
        </div>
      
    )
  }
}

function Father(props) {
  return (
    <div className="father">
      <Theme.Consumer>
        {
          (theme) => {
            return <div style={{ color: theme }}>father</div>
          }
        }
      </Theme.Consumer>
      <Son></Son>
    </div>
  )
}

function Son(props) {
  return (
    <div className="son">
      <Theme.Consumer>
        {
          (theme) => {
            return <div style={{ color: theme }}>son</div>
          }
        }
      </Theme.Consumer>
    </div>
  )
}
```

### 函数式组件示例（使用hooks）

```tsx
import React, { useState ,useContext, createContext } from 'react'
import './index.css'

const COLOR = ['#B5E61D', '#ED1C24', '#00A2E8', '#A349A4', '#B97A57', '#A349A4']
const Theme = createContext('#B5E61D')

export default function Grandfather() {
  const [ theme, setTheme ] = useState(COLOR[0])
  function changeColor() {
    setTheme(COLOR[Math.ceil(Math.random() * (COLOR.length - 1))])
  }
  return (
    <div className="grandfather">
      <div>当前主题为：{theme}</div>
      <div style={{ color: theme }}>grandfather</div>
      <Theme.Provider value={theme}>
        <Father></Father>
      </Theme.Provider>
      <button className="fixed3" onClick={changeColor}>换肤</button>
    </div>
  )
}
function Father(props) {
  return (
    <div className="father">
    // 在函数组件中一样可以使用Context.Consumer语法来拿数据
      <Theme.Consumer>
        {
          (theme) => <div style={{ color: theme }}>father</div>
        }
      </Theme.Consumer>
      <Son></Son>
    </div>
  )
}

function Son(props) {
  const theme = useContext(Theme) // 注意此处的Theme是开头createContext('#B5E61D')的返回值Theme
  return (
    <div className="son">
      <div style={{ color: theme }}>son</div>
    </div>
  )
}
```

### 实战：在文章分类页面中自定义筛选器

预期效果：Categories.tsx页面传入文章分类，点击筛选器的具体文章类别时可以动态修改Categories.tsx中的参数

文件结构：

```text
- src
  - components
    - CategoryList
      - CategoryList.tsx
      - CategoryListItem.tsx
      - Context.tsx
	- views
		- Categories.tsx
```

views/Categories.tsx

```tsx
import {FC, useState} from "react";
import FluidWrapper from "../Framework/FluidWrapper";
import CategoryList from "@/components/CategoryList/CategoryList";
import CategoryContext from "@/components/CategoryList/Context";

const listOpts = [{
  id: 1,
  name: "iPhone",
  children: [{id: 10, name: "iPhone 13 mini"}, {id: 11, name: "iPhone 13"}, {id: 12, name: "iPhone 13 Pro"}, {
    id: 13,
    name: "iPhone 13 Pro Max"
  }]
}, {
  id: 2,
  name: "MacBook Air",
  children: [{id: 20, name: "MacBook Air M1"}, {id: 21, name: "MacBook Air M2"},]
}]


const Categories: FC = () => {
  const [choseId, setCategory] = useState(Number());
  let setChoseId = (id: number) => {
    setCategory(id)
  }
  return (
    <FluidWrapper>
      <CategoryContext.Provider value={{choseId, setChoseId}}>
        <CategoryList options={listOpts}/>
      </CategoryContext.Provider>
      <span>已选择的类别ID：{choseId}</span>
    </FluidWrapper>
  )
}

export default Categories;
```

components/CategoryList/Context.tsx

```tsx
import React from "react";

export default React.createContext({
  choseId: 0,
  setChoseId: (id: number): void => {
  }
})
```

components/CategoryList/CategoryList.tsx

```tsx
import {FC} from "react";
import CategoryListItem from "@/components/CategoryList/CategoryListItem";

interface CategoryListType {
  options: Array<CategoryListItemType>
}

export interface CategoryListItemType {
  id: number,
  name: number | string,
  children?: Array<CategoryListItemType>
}

const CategoryList: FC<CategoryListType> = ({options}) => {
  return (
    <ul>
      {options.map(row => {
        return <li key={row.id}>
          <h3>{row.name}</h3>
          {row.children ? <CategoryListItem children={row.children}></CategoryListItem> : ""}
        </li>
      })}
    </ul>
  )
}

export default CategoryList;
```

components/CategoryList/CategoryListItem.tsx

```tsx
import {FC, useContext} from "react";
import CategoryContext from "@/components/CategoryList/Context";
import {CategoryListItemType} from "@/components/CategoryList/CategoryList";
import {animated} from "react-spring";

const CategoryListItem: FC<{ children: Array<CategoryListItemType> }> = ({children}) => {
  const context = useContext(CategoryContext)
  return (
    <animated.ul>
      {children.map(item => (
        <li key={item.id} onClick={() => {
          context.setChoseId(item.id)
        }}>{item.name}</li>
      ))}
    </animated.ul>
  )
}
export default CategoryListItem;
```

## 8. React实现插槽、Computed、Watch

### 实现插槽

向组件的props里传一个DOM进去就可以了，这里是JSX！

在Vue中，我们可以像这样通过插槽来实现在自定义组件ComponentA中插入组件ComponentB：

```html
// ComponentA.vue
<template>
	<div>
    <span>This is Component Yajuu</span>
    <slot></slot>
  </div>
</template>

// Test.vue
<template>
	<div>
    <ComponentA>
      <ComponentB></ComponentB>
  	</ComponentA>
  </div>
</template>
```

而在React中有一个props.children的概念，被父子件所包裹的子组件可以使用这个属性来获取。

扩展阅读：[React组件设计模式-组合组件](https://juejin.cn/post/6844903861166014477)

```tsx
import React, { FC } from "react";

const ChildComponent: FC = () => (
  <div>
    <span>This is ChildComponent</span>
  </div>
)

// 在React18中，FC不再内置PropsWithChildren的定义，需要手动定义一下，否则TS会报错
// 坑死了哼哼哼啊啊啊啊
const ParentComponent: FC<{ children?: React.ReactNode }> = (props) => (
  <div>
    <span>This is ParentComponent</span>
    {props.children}
  </div>
)

const Test: FC = () => {
  return (
    <>
      <ParentComponent>
        <ChildComponent></ChildComponent>
        <ChildComponent></ChildComponent>
      </ParentComponent>
    </>
  )
}
export default Test;
```

### 实现Watch

类组件中通过componentDidUpdate访问变化前的props和states

```tsx
class Test extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      count: 0
    }
  }
  componentDidUpdate(prevProps: any, prevState: any) {
    console.log(prevState.count)
    console.log(this.state.count)
  }
  clickCount() {
    this.setState((state: any) => ({
      count: state.count + 1
    }));
  }
  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.clickCount.bind(this)}>点我</button>
      </div>
    )
  }
}
```

函数式组件中写个Hook就好。

useWatch.js

```javascript
import { useEffect, useRef } from 'react'

const useWatch = (value, fn, config = { immediate: false }) => {
  const oldValue = useRef()
  const isFirst = useRef(false)
  useEffect(() => {
    if (isFirst.current) {
      fn(value, oldValue.current)
    } else {
      isFirst.current = true
      if (config.immediate) {
        fn(value, oldValue.current)
      }
    }
    oldValue.current = value
  }, [value])
}

export default useWatch
```

组件中使用：

```jsx
import { FC } from 'react'
import { useState } from 'react'
import useWatch from "./useWatch";
const Test: FC = () => {
  const [count, setCount] = useState(0)
  const clickCount = () => {
    setCount(count + 1);
  }
  useWatch(count, (newVal, oldVal) => {
    console.log(newVal, oldVal)
  })
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={clickCount}>点我</button>
    </div>
  )
}
```

### 实现Computed

类组件还是在componentDidUpdate里操作，都是一回事。当然，使用get收集依赖也行：

```jsx
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '田所浩二'
        }
    }
    get koji_computed() {
        return this.state.msg
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                msg: '使用软手机'
            })
        }, 2000)
    }
    render() {
        return (
            <div>
                { this.koji_computed }
            </div>
        )
    }
    
}
```

函数式组件用**useMemo**这个hook：

```jsx
import { useState, useMemo } from 'react'
function Demo() {
  const [name, setName] = useState('田所浩二')
  const [food, setFood] = useState('红茶')
  const msg = useMemo(() => `${name}享用${food}`, [name, food])
  const handleClick = (type: number) => {
    if (type === 1) {
      setName('淳平')
      setFood('迎宾酒')
    } else if (type === 2) {
      setName('我修院')
      setFood('雪')
    }
  }

  return (
    <div>
      <button onClick={() => handleClick(1)}>淳平Type</button>
      <button onClick={() => handleClick(2)}>我修院Type</button>
      <h1>{msg}</h1>
    </div>
  )
}
```



## 9. 从v-if、v-show、v-model迁移

在Vue中，v-if的本质是控制组件/DOM的渲染，而v-show只是控制它的display属性是否为none。所以在React中想要实现类似逻辑，只需要在render时使用三目运算符决定是否返回该DOM即可。

如果想通过props传递控制组件来实现类似于v-if/v-show的效果，则需要在render时判断props内的相关属性并填充相关逻辑。

```react
import React, { FC, useState } from 'react'

const Test = (props: { [x: string]: any; }) => {
  if (props['v-if']) {
    let isShow = props['v-show'] ? 'none' : 'block';
    return (
      <ul style={{ display: isShow }} >
        <li>Yajuu Senpai</li>
        <li>24</li>
      </ul>
    );
  } else {
    return (<></>);
  }
}
const App: FC = () => {
  const [vif, setVif] = useState(false)
  const clickIf = () => {
    setVif((state) => (!state))
  }
  const [vshow, setVshow] = useState(false)
  const clickShow = () => {
    setVshow((state) => (!state))
  }
  return (
    <div className='App'>
      <button onClick={clickIf}>v-if:{vif.toString()}</button>
      <button onClick={clickShow}>v-show:{vshow.toString()}</button>
      <Test v-if={vif} v-show={vshow}></Test>
    </div>
  )
}

export default App
```

以React写法来实现v-if的效果更是简单：

```jsx
import { useState } from 'react'
function Demo() {
  const [show, setShow] = useState(false)
  const changeShow = () => {
    setShow(!show)
  }
  return (
    <div>
      {show && <h1>哼哼哼啊啊啊啊啊</h1>}
      <button onClick={changeShow}>点我</button>
    </div>
  )
}
```

v-model本质上是利用名为value的prop和名为input的事件来实现数据的双向绑定。

```react
import React, { FC, useState } from 'react'

function Input(props: any) {
  const handleInput = (e: any) => {
    props['v-model'](e.target.value)
  }
  return (
    <>
      <input onChange={handleInput}></input>
    </>
  )
}

const App: FC = () => {
  const [value, setValue] = useState('')
  return (
    <div className='App'>
      <p>输入的值为：{value}</p>
      <Input v-model={setValue}></Input>
    </div>
  )
}

export default App
```

## 10. 从v-for、v-on:event迁移

### v-for

React里直接使用map在JSX中进行循环即可。当然，如果想要用for，也可以尝试在JSX中插入一段立即执行的匿名函数。

Vue示例：

```html
<div>
	<PostItem v-for="(item, i) in postItems" 
            :key="item.id" 
            :post="item" 
            @onVote="handleVote"></PostItem>
</div>
```

React示例：

```jsx
render(){
  return (
  	<div>
    	{this.state.postItems.map((item,index)=>
      	return (
					<PostItem key={item.id} post={item} onVote={this.handleVote}></PostItem>
      	)
      )}
    </div>
  )
}
```

使用立即执行函数：

```jsx
const data = [{
    foo: 111,
    bar: 222
  },{
    foo: 333,
    bar: 444
  }]
  return (
    <div className="App">
      {
         (() => {
          let domArr = [];
          for(const item of data) {
              domArr.push(<li>{item.foo},{item.bar}</li>)
          }
          return domArr;
        })()
      }
    </div>
  );
```

### v-on

参见[7. React中的父子组件通信、自定义事件、事件处理](##7. React中的父子组件通信、自定义事件、事件处理)

## 11. React中的CSS方案

### 内联样式

优点：官方推荐，直接使用CSS Property Class描述样式；组件私有的样式不会导致冲突；可以动态获取当前state中的状态

缺点：写法上都需要使用驼峰标识；会导致代码混乱；某些样式无法编写(比如伪类/伪元素)

```tsx
import { FC } from "react";

export const Header: FC = () => {
  return (
    <div style={{color: 'red'}}>114514</div>
  )
}
```

### 导入外部CSS文件

优点：写法和普通HTML开发相似，易于理解。

缺点：导入的CSS是全局样式，可能导致冲突。

```tsx
import { FC } from "react";
import './assets/css/Header.css'  // .title { color: red; }
export const Header: FC = () => {
  return (
    <div className="title">114514</div>
  )
}
```

### CSS Modules

优点：实现原理类似于<style scoped>，属于组件私有样式；

缺点：

* 引用的类名不能使用连接符(如 .header-title )，因为JS中不识别。尽管loader可以转换驼峰和连接符，但这将会出现如下情况：

  ```tsx
  .header-title {
    color: #999;
  }
  <div className="style['header-title']">第一种写法</div>
  <div className="style.headerTitle">第二种写法</div>
  ```

  这将会产生一些理解成本，而且可能因粗心而导致一些意料之外的问题。

* 动态修改样式时依然需要依赖于内联样式。

以xxx.module.css（或.scss / .less等等）命名的样式文件在被组件导入后会被加载为一个CSS Module。

示例：

```tsx
import { FC } from "react";
import HeaderStyle from '@/assets/css/Header.module.scss';
export const Header: FC = () => {
  return (
    <>
      <div className={HeaderStyle.blogHeaderTitle}>第一种写法</div>
      <div className={HeaderStyle['blog-header-title']}>第二种写法</div>
    </>
  )
}
```

#### Vite配置CSS Modules

详细说明参见[Vite CSS](https://cn.vitejs.dev/guide/features.html#css)

首先安装一个喜欢的CSS预处理器

```shell
# .scss and .sass
yarn add -D sass
# .less
yarn add -D less
# .styl and .stylus
yarn add -D stylus
```

然后配置vite.config.ts，使其支持驼峰转换：

```js
css:{
    modules:{
      localsConvention: 'camelCase'
    }
}
```

#### VSCode配置CSS Modules提示

```shell
# 安装依赖
yarn add -D typescript-plugin-css-modules
```

配置tsconfig.json

```json
{
  "compilerOptions": {
    ...
    "plugins": [{"name": "typescript-plugin-css-modules"}]
  }
  ...
}
```

配置VSCode settings.json

```json
{
	...
	"typescript.tsserver.pluginPaths": ["typescript-plugin-css-modules"],
	...
}

```

### CSS in JS

该节部分via：[React中的CSS](https://blog.csdn.net/qq_27009517/article/details/122743311)

实际上，官方文档也有提到过CSS in JS这种方案：

- “CSS-in-JS” 是指一种模式，其中 CSS 由 JavaScript 生成而不是在外部文件中定义；
- 注意此功能并不是 React 的一部分，而是由第三方库提供。 React 对样式如何定义并没有明确态度；

在传统的前端开发中，我们通常会将结构（HTML）、样式（CSS）、逻辑（JavaScript）进行分离。

- 但是在前面的学习中，我们就提到过，React的思想中认为逻辑本身和UI是无法分离的，所以才会有了JSX的语法。
- 样式呢？样式也是属于UI的一部分；
- 事实上CSS-in-JS的模式就是一种将样式（CSS）也写入到JavaScript中的方式，并且可以方便的使用JavaScript的状态；
- 所以React有被人称之为 All in JS；

当然，这种开发的方式也受到了很多的批评：

- Stop using CSS in JavaScript for web development
- [https://hackernoon.com/stop-using-css-in-javascript-for-web-development-fa32fb873dcc](https://link.zhihu.com/?target=https%3A//hackernoon.com/stop-using-css-in-javascript-for-web-development-fa32fb873dcc)

批评声音虽然有，但是在我们看来很多优秀的CSS-in-JS的库依然非常强大、方便：

- CSS-in-JS通过JavaScript来为CSS赋予一些能力，包括类似于CSS预处理器一样的样式嵌套、函数定义、逻辑复用、动态修改状态等等；
- 依然CSS预处理器也具备某些能力，但是获取动态状态依然是一个不好处理的点；
- 所以，目前可以说CSS-in-JS是React编写CSS最为受欢迎的一种解决方案；

目前比较流行的CSS-in-JS的库有哪些呢？

- styled-components
- emotion
- glamorous

styled-components目前是社区最流行的CSS-in-JS库，但这里推荐使用emotion。它拥有相当全面的功能，体积小巧，而且还是为数不多的支持source-map的css-in-js框架之一。[Emotion文档](https://emotion.sh/docs/install)

#### Vite配置Emotion && Typescript支持

```shell
yarn add @emotion/react
yarn add -D @emotion/babel-plugin
yarn add -D @emotion/babel-preset-css-prop
```

配置vite.config.ts

```typescript
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
        babelrc: true
      },
    }),
  ],
});
```

配置tsconfig.json

```json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}
```

新建.babelrc

```json
{
  "presets": [
    [
      "@emotion/babel-preset-css-prop",
      {
        "autoLabel": "dev-only",
        "labelFormat": "[local]"
      }
    ]
  ]
}
```

示例：

```tsx
import { FC, Fragment } from "react";
import { css } from '@emotion/react'

const blogHeaderTitle = css`
  color: red;
  font-size: 114px;
`;
export const Header: FC = () => {
  return (
    <div>
      <div css={blogHeaderTitle}>123123123</div>
    </div>
  )
}
```

## 12. React Hook

React Hook既强大又灵活，它在有状态的函数式组件中十分重要。由于本人学习React的时间很短，尚不敢打包票说自己对Hooks有如何深刻的了解，故在此分享一些读过的文章以作参考学习之用。

* [React官方文档-Hooks](https://zh-hans.reactjs.org/docs/hooks-intro.html#motivation)
* [理解 React Hooks](https://cloud.tencent.com/developer/article/1360473?from=15425)
* [useState和useRef的区别](https://cloud.tencent.com/developer/article/1884542)
* [精读《React Hooks》](https://zhuanlan.zhihu.com/p/49408348)
* [精读《怎么用 React Hooks 造轮子》](https://zhuanlan.zhihu.com/p/50274018)
* [精读《React Hooks 最佳实践》](https://zhuanlan.zhihu.com/p/81752821)
* [精读《React Hooks 数据流》](https://zhuanlan.zhihu.com/p/126476910)

## 13. React中使用异步组件（懒加载组件）

参考官网文档[React.lazy](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy)

*注意！你的组件必须是export default形式！否则会报类型转换错误！*

## 14. 从Vue-Router到React-Router

在本文编写时，React-Router实为React-Router-Dom V6，Vue-Router为Vue-Router V4（为了易于接受，文中大部分例子使用V3举例说明，V4的例子会特别标注出）。下文简称“React中”及“Vue中”。

部分参考自[React-Router-Dom6 最佳实践](https://zhuanlan.zhihu.com/p/488571812)、[React-router 路由的使用及配置](https://juejin.cn/post/6844904031857410062#heading-1)、[React-Router官方文档（写的不容易懂）](https://reactrouter.com/en/main/getting-started/overview)、[React-Router官方文档Examples](https://v5.reactrouter.com/web/example/basic)、[vue-router和react-router使用的异同点](https://juejin.cn/post/6844904164531634190#heading-10)

首先安装依赖

```shell
yarn add react-router-dom
```

### Hash模式与History模式

无论是React中还是Vue中，路由的实现模式都基于这两种模式。

* Hash模式

  它的实现原理主要是基于window.onhashchange事件：

  ```js
  window.onhashchange = () => {
      let hash = location.hash
      console.log(hash)
  }
  ```

  hash 模式下，发起的请求也不会被 hash 值影响（http请求中），不会重新加载页面。

* History模式

  它基于 window.onpopstate 事件：

  ```js
  window.onpopstate = function(event) {
    alert("location: " + document.location + ", state: " + JSON.stringify(event.state))
  }
  ```

  通过浏览器提供的 history api，url 更加好看了，但刷新时如果服务器中没有相应的资源就可能会报 404，这是因为刷新后又去请求了服务器。

Vue若要切换路由模式需要在router.js（即路由声明文件）中修改，而React则是以不同组件包裹（类似于router-view，不过React版本的router-view自带了路由模式）来进行区分的。

```jsx
// Vue Router v3 ( Vue 2.x使用的路由 )
const router = new VueRouter({
  mode: 'history',  //或'hash'
  routes: [...]
})
// Vue Router v4 ( Vue 3.x使用的路由 )
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),  // Hash模式为createWebHashHistory
  routes: [],
})
// React Router Dom - main.tsx
// Hash模式为<HashRouter></HashRouter>
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

### React Router Dom V6常用路由组件

| 组件名     | 作用           | 说明                                                        |
| ---------- | -------------- | ----------------------------------------------------------- |
| <Routes>   | 一组路由       | 代替原来的<Switch>，所有子路由都用基础的Router Children表示 |
| <Route>    | 基础路由       | V6中可以嵌套                                                |
| <Link>     | 导航组件       | 在页面中跳转使用                                            |
| <Outlet /> | 自适应渲染组件 | 根据实际路由URL自动选择组件，一般用来实现嵌套路由           |

### &lt;router-link&gt;与&lt;Router&gt;组件

在Vue中我们可以使用router-link组件进行声明式路由跳转，如：

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

而在React中则可以使用Link标签达到类似效果：

```jsx
import * as React from "react";
import { Link } from "react-router-dom";

function UsersIndexPage({ users }) {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.id}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Vue中router-link默认是a标签。若想替换成span标签，可使用`<router-link tag='span'>`。点击后默认会给该标签添加.router-link-active类，若要自定义链接激活时使用的css类名，可使用`<router-link active-class="激活时的类名">`

React中Link没有激活属性。若要使用激活属性可用NavLink替代：

```jsx
import {NavLink} from "react-router-dom"
function App(props){
  return (
    <NavLink to='path' activeClassName='onActiveClz'></NavLink>
    <NavLink to='path' activeStyle={{color:'red'}}></NavLink>
  )
}
// 在React Router DOM v6中有变化：
<NavLink to={nav.route} style={({isActive}) =>
        isActive ? {color: "white"} : {color: 'rgba(245,245,247,0.8)'}
      }>{nav.name}</NavLink>
// 或：
<NavLink to={node.route} className={({isActive}) =>
              isActive ? HeaderStyle["blog-header-cell-active"] : HeaderStyle["blog-header-cell"]
            }>
              {node.name}
            </NavLink>
```

### 视图组件

Vue中router-view会渲染出路径所匹配到的视图组件：

```html
//App.vue
<template>
  <div>
    App组件
    <router-view></router-view>
  </div>
</template>
// user.vue
<template>
  <div>
    user组件
    <router-view></router-view>
  </div>
</template>
// name.vue
<template>
  <div>
    name组件
  </div>
</template>
// routes.js
<script>
const router = new VueRouter({
    routes:[
      {
        path:'/user',
        component:user,
        children:[
          path:'/user/name',
          component:name
        ]
      }
    ]
})
</script>
```

* 路由为/user时，user组件渲染到App.vue中的router-view的位置
* 路由为/user/name时，user组件渲染到App.vue中的router-view的位置，name组件渲染到user.vue中的router-view的位置

React中Route组件负责匹配路由并渲染。`<Route>`在哪，组件就渲染在哪。

Router组件有几个参数用法：

* path: 指定路由的跳转路径

* exact: 精确匹配路由

* component: 路由对应的组件

  ```jsx
  import About from './pages/about';
  <Route path='/about' exact component={About}></Route>
  ```

* render： 通过写render函数返回具体的dom

  ```jsx
  <Route path='/about' exact render={() => (<div>about</div>)}></Route>
  ```

  render 也可以直接返回 About 组件

  ```jsx
  <Route path='/about' exact render={() => <About /> }></Route>
  ```

  使用render的好处是可以向组件传递自定义属性

  ```jsx
  <Route path='/about' exact render={(props) => {
      return <About {...props} name={'田所浩二'} />
  }}></Route>
  ```

  然后，就可在 About 组件中获取 props 和 name 属性：

  ```jsx
  componentDidMount() {
      console.log(this.props) 
  }
  
  // history: {length: 9, action: "POP", location: {…}, createHref: ƒ, push: ƒ, …}
  // location: {pathname: "/home", search: "", hash: "", state: undefined, key: "ad7bco"}
  // match: {path: "/home", url: "/home", isExact: true, params: {…}}
  // name: "cedric"
  ```
  
  render 方法也可用来进行权限认证：
  
  ```jsx
  <Route path='/user' exact render={(props) => {
      // isLogin 从 redux 中拿到, 判断用户是否登录
      return isLogin ? <User {...props} name={'田所浩二'} /> : <div>请先登录</div>
  }}></Route>
  ```
  
* location: 将与当前历史记录位置以外的位置相匹配，在路由过渡动效中很有用。

* sensitive: 区分路由大小写

注意：如果路由 Route 外部包裹 Routes 时，路由匹配到对应的组件后，就不会继续渲染其他组件了。但是如果外部不包裹 Switch 时，所有路由组件会先渲染一遍，然后选择到匹配的路由进行显示。

### 路由传参

该部分Hooks使用方法参考[【React Router v6】路由组件传参](https://blog.csdn.net/Svik_zy/article/details/126203649)

#### 路径参数——动态路由匹配

例子中的页面路径为`http://localhost:5173/Detail/114/Yajuu`

```tsx
// router/index.tsx
{
  path: "/Detail/:id/:name",
  element: <Detail />
}

// Header.tsx
import { FC } from "react";
import { useNavigate } from "react-router-dom";
export const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => { navigate('/Detail/114/Yajuu') }}>详情</div>
    </div>
  )
}

// Detail.tsx
import { FC } from "react";
import { useParams } from "react-router-dom";

const Detail: FC = () => {
  const {id, name} = useParams();
  return (
    <>
      <div>id:{id}</div>
      <div>name:{name}</div>
    </>
  )
}
export default Detail;
```

#### URL Search Params

例子中的页面路径为`http://localhost:5173/Detail?age=24`

```tsx
// router/index.tsx
{
  path: "/Detail",
  element: <Detail />
}

// Header.tsx
import { FC } from "react";
import { useNavigate } from "react-router-dom";
export const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => { navigate('/Detail?age=24') }}>详情</div>
    </div>
  )
}

// Detail.tsx
import { FC } from "react";
import { useSearchParams } from "react-router-dom";

const Detail: FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <div>age:{searchParams.get('age')}</div>
      <button onClick={() => { setSearchParams({age: "114514"})}}>便乘王爷</button>
    </>
  )
}
export default Detail;
```

#### Component State Params

参数不显示在URL中，类似Vue中的{ name, params }跳转方法

```tsx
// router/index.tsx
{
  path: "/Detail",
  element: <Detail />
}

// Header.tsx
import { FC } from "react";
import { useNavigate } from "react-router-dom";
export const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div onClick={() => {
        navigate('/Detail', {
          state: {
            age: 24,
            name: '李田所',
            company: 'COAT'
          }
        })
      }}>详情</div>
    </div>
  )
}

// Detail.tsx
import { FC } from "react";
import { useLocation } from "react-router-dom";

const Detail: FC = () => {
  const { state: { age, name, company } }: any = useLocation();
  return (
    <>
      <ul>
        <li>年龄：{age}</li>
        <li>姓名：{name}</li>
        <li>公司：{company}</li>
      </ul >
    </>
  )
}
export default Detail;
```

## 14-1. React-Router-Dom V6 搭建博客框架实战

#### 文件结构

```javascript
- src
	- App.tsx
	- main.tsx
  - Framework
	  - Header.tsx
		- MainBody.tsx
	- router
		- index.tsx
	- views
		- Index.tsx
		- About.tsx
		- History.tsx
		- Detail.tsx
```

#### 实现目标

首页默认加载`views/Index.tsx`，点击About可以离开该页面，显示单独的About.tsx页面；点击History可以携带路径参数跳转历史列表页面；点击Detail可以携带ID跳转文章详情页面。

### 代码配置

main.tsx

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

App.tsx

```tsx
import { useRoutes } from 'react-router-dom';
import './App.css'
import router from './router/index';

function App() {
  let element = useRoutes(router);
  return <div className="App">{element}</div>;
}

export default App;
```

router/index.tsx

```tsx
import { lazy, Suspense } from "react";
import { Framework } from "@/views/Index";
import Categories from "@/views/Categories";
import Tags from "@/views/Tags";
import Detail from "@/views/Detail";
import History from "@/views/History";
/**
 * 懒加载组件
 * @param path 
 * @returns 
 */
function LazyWrapper(path: string) {
  // React.lazy接受的组件必须为export default形式
  const Component = lazy(() => import(`../views${path}`))
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}

let router = [
  {
    path: "/About",
    element: LazyWrapper("/About"),
  },
  {
    path: "/",
    element: <Framework />,
    children: [
      {
        path: "/Detail",
        element: <Detail />
      },
      {
        path: "/History/:page",
        element: <History />
      },
    ],
  },
];

export default router;

```

Header.tsx

```tsx
// 用NavLink组件也可以。它甚至可以根据当前路由变色！
import { FC } from "react";
import { useNavigate } from "react-router-dom";
export const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      Header
      <div onClick={() => { navigate('/About') }}>关于我</div>
      <div onClick={() => { navigate('/History/893') }}>历史</div>
      <div onClick={() => { navigate('/Detail?id=114514') }}>详情</div>
      <NavLink to='/History/893' className={({isActive}) =>
              isActive ? "blog-header-cell-active" : "blog-header-cell"
      }>
              历史-组件版
      </NavLink>
    </div>
  )
}
```

MainBody.tsx

```tsx
import { FC } from "react"
import { Outlet, useRoutes } from "react-router-dom"

export const MainBody: FC = () => {
  return (
    <div style={{height: '50vh', backgroundColor: 'yellow'}}>
      <Outlet/>
    </div>
  )
}
```

views/About.tsx

```tsx
import { FC } from "react";

const About: FC = ()=>{
  return (
    <div>我是田所浩二</div>
  )
}
export default About;
```

views/History.tsx

```tsx
import { FC } from "react";
import { useParams } from "react-router-dom";

const History: FC = () => {
  const {page} = useParams();
  return (
    <div>
      历史记录页面，当前页码{ page }
    </div>
  )
}
export default History;
```

views/Detail.tsx

```tsx
import { FC } from "react";
import { useSearchParams } from "react-router-dom";

const Detail: FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      <div>文章ID:{searchParams.get('id')}</div>
      <button onClick={() => { setSearchParams({id: "1919810"})}}>文章有很多啊</button>
    </>
  )
}
export default Detail;
```

## 15. 从Vuex到Redux

[基本使用](https://www.cnblogs.com/bky419/p/16109583.html)

[简单梳理Redux的源码与运行机制](https://juejin.cn/post/6844903847094124552)

## 16. React和Vue中的Key、Diff

[为什么 React 的 Diff 算法不采用 Vue 的双端对比算法？](https://juejin.cn/post/7116141318853623839)

## 17. 使用state的一些要点

如果尝试使用`setState()`更新的数据依赖于this.props或this.state，那么应该向`setState()`传入一个函数而非一个对象，因为React 可能会把多个 `setState()`调用合并成一个调用，而`this.props` 和 `this.state` 可能会异步更新。

简而言之，第二次更新state时的逻辑如果是基于上一次的state，如state.counter += 1，那么它可能不会得到你预期中的值。

这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```react
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

阅读官网的setState函数有助于理解它与Vue的响应式数据修改的区别。

setState()有两个参数，分别是上述的updater函数以及可选的callback函数。如：

```react
this.setState((state)=>({
	date: new Date()
}),()=>{
	console.log(114)
});
```

每次时间更新后都会调用一次`console.log(114)`。

### 类似于Vue2中操作响应式对象或数组时需要注意的点

在修改state中的引用对象或数组时需要先进行浅拷贝再修改。

```react
import React from 'react'
import { FC, useState } from 'react'

function Demo() {
  const [obj, setObj] = useState({
    name: '我修院',
    lines: ['OC']
  })
  const onClickName = () => {
    setObj({ ...obj, name: '淳平' })
  }
  const onClickLines = () => {
    setObj({ ...obj, lines: [...obj.lines, '嗯', '嘛', '啊'] })
  }
  return (
    <div>
      <button onClick={onClickName}>{obj.name}</button>
      <button onClick={onClickLines}>上菜</button>
      {obj.lines.map(v => <p>{v}</p>)}
    </div>
  )
}
```

## 18. npm和yarn的区别

[命令对照](https://www.jianshu.com/p/56c6b171134c)

## 19. Render的Capture Value特性

本节参考[精读《Function VS Class 组件》](https://zhuanlan.zhihu.com/p/59558396)及[精读《useEffect 完全指南》](https://zhuanlan.zhihu.com/p/60277120)，部分内容有删改。

### 每次 Render 都有自己的 Props 与 State

可以认为每次 Render 的内容都会形成一个快照并保留下来，因此当状态变更而 Rerender 时，就形成了 N 个 Render 状态，而每个 Render 状态都拥有自己固定不变的 Props 与 State。

看下面的 `count`：

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

在每次点击时，`count` 只是一个不会变的常量，而且也不存在利用 `Proxy` 的双向绑定，只是一个常量存在于每次 Render 中。

初始状态下 `count` 值为 `0`，而随着按钮被点击，在每次 Render 过程中，`count` 的值都会被固化为 `1`、`2`、`3`：

```jsx
// During first render
function Counter() {
  const count = 0; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>;
  // ...
}

// After a click, our function is called again
function Counter() {
  const count = 1; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>;
  // ...
}

// After another click, our function is called again
function Counter() {
  const count = 2; // Returned by useState()
  // ...
  <p>You clicked {count} times</p>;
  // ...
}
```

其实不仅是对象，函数在每次渲染时也是独立的。这就是 **Capture Value** 特性。

### 每次 Render 都有自己的事件处理

解释了为什么下面的代码会输出 `5` 而不是 `3`:

```jsx
const App = () => {
  const [temp, setTemp] = React.useState(5);

  const log = () => {
    setTimeout(() => {
      console.log("3 秒前 temp = 5，现在 temp =", temp);
    }, 3000);
  };

  return (
    <div
      onClick={() => {
        log();
        setTemp(3);
        // 3 秒前 temp = 5，现在 temp = 5
      }}
    >
      xyz
    </div>
  );
};
```

在 `log` 函数执行的那个 Render 过程里，`temp` 的值可以看作常量 `5`，**执行** `**setTemp(3)**` **时会交由一个全新的 Render 渲染**，所以不会执行 `log` 函数。**而 3 秒后执行的内容是由** `**temp**` **为** `**5**` **的那个 Render 发出的**，所以结果自然为 `5`。

原因就是 `temp`、`log` 都拥有 Capture Value 特性。

### 每次 Render 都有自己的 Effects

`useEffect` 也一样具有 Capture Value 的特性。

`useEffect` 在实际 DOM 渲染完毕后执行，那 `useEffect` 拿到的值也遵循 Capture Value 的特性：

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

上面的 `useEffect` 在每次 Render 过程中，拿到的 `count` 都是固化下来的常量。

### 如何绕过 Capture Value

利用 `useRef` 就可以绕过 Capture Value 的特性。**可以认为** `**ref**` **在所有 Render 过程中保持着唯一引用，因此所有对** `**ref**` **的赋值或取值，拿到的都只有一个最终状态**，而不会在每个 Render 间存在隔离。

```jsx
function Example() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    // Set the mutable latest value
    latestCount.current = count;
    setTimeout(() => {
      // Read the mutable latest value
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });
  // ...
}
```

也可以简洁的认为，`ref` 是 Mutable 的，而 `state` 是 Immutable 的。

## 20. 从类组件迁移到函数式组件

本节参考[精读《Function VS Class 组件》](https://zhuanlan.zhihu.com/p/59558396)，部分内容有删改。

### 怎么替代 shouldComponentUpdate

说实话，Function Component 替代 `shouldComponentUpdate` 的方案并没有 Class Component 优雅，代码是这样的：

```jsx
const Button = React.memo(props => {
  // your component
});
```

或者在父级就直接生成一个自带 `memo` 的子元素：

```jsx
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  );
}
```

相比之下，Class Component 的写法通常是：

```react
class Button extends React.PureComponent {}
```

这样就自带了 `shallowEqual` 的 `shouldComponentUpdate`。

### 怎么替代 componentDidUpdate

由于 `useEffect` 每次 Render 都会执行，因此需要模拟一个 `useUpdate` 函数：

```jsx
const mounting = useRef(true);
useEffect(() => {
  if (mounting.current) {
    mounting.current = false;
  } else {
    fn();
  }
});
```

更多可以查看 [精读《怎么用 React Hooks 造轮子》](https://link.zhihu.com/?target=https%3A//github.com/dt-fe/weekly/blob/master/80.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md%23componentdidupdate)

### 怎么替代 forceUpdate

React 官方文档提供了一种方案：

```jsx
const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

function handleClick() {
  forceUpdate();
}
```

每次执行 `dispatch` 时，只要 `state` 变化就会触发组件更新。当然 `useState` 也同样可以模拟：

```jsx
const useUpdate = () => useState(0)[1];
```

我们知道 `useState` 下标为 1 的项是用来更新数据的，而且就算数据没有变化，调用了也会刷新组件，所以我们可以把返回一个没有修改数值的 `setValue`，这样它的功能就仅剩下刷新组件了。

更多可以查看 [精读《怎么用 React Hooks 造轮子》](https://link.zhihu.com/?target=https%3A//github.com/dt-fe/weekly/blob/master/80.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md%23force-update)

### state 拆分过多

`useState` 目前的一种实践，是将变量名打平，而非像 Class Component 一样写在一个 State 对象里：

```jsx
class ClassComponent extends React.PureComponent {
  state = {
    left: 0,
    top: 0,
    width: 100,
    height: 100
  };
}

// VS

function FunctionComponent {
  const [left,setLeft] = useState(0)
  const [top,setTop] = useState(0)
  const [width,setWidth] = useState(100)
  const [height,setHeight] = useState(100)
}
```

实际上在 Function Component 中也可以聚合管理 State：

```jsx
function FunctionComponent() {
  const [state, setState] = useState({
    left: 0,
    top: 0,
    width: 100,
    height: 100
  });
}
```

只是更新的时候，不再会自动 merge，而需要使用 `...state` 语法：

```jsx
setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
```

可以看到，更少的黑魔法，更可预期的结果。

### 获取上一个 props

虽然不怎么常用，但是毕竟 Class Component 可以通过 `componentWillReceiveProps` 拿到 `previousProps` 与 `nextProps`，对于 Function Component，最好通过自定义 Hooks 方式拿到上一个状态：

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return (
    <h1>
      Now: {count}, before: {prevCount}
    </h1>
  );
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

通过 `useEffect` 在组件渲染完毕后再执行的特性，再利用 `useRef` 的可变特性，让 `usePrevious` 的返回值是 “上一次” Render 时的。

可见，合理运用 `useEffect` `useRef`，可以做许多事情，而且封装成 CustomHook 后使用起来仍然很方便。

> 未来 `usePrevious` 可能成为官方 Hooks 之一。

### 性能注意事项

`useState` 函数的参数虽然是初始值，但由于整个函数都是 Render，因此每次初始化都会被调用，如果初始值计算非常消耗时间，建议使用函数传入，这样只会执行一次：

```jsx
function FunctionComponent(props) {
  const [rows, setRows] = useState(() => createRows(props.count));
}
```

> `useRef` 不支持这种特性，需要[写一些冗余的函判定是否进行过初始化](https://link.zhihu.com/?target=https%3A//reactjs.org/docs/hooks-faq.html%23how-to-create-expensive-objects-lazily)。

掌握了这些，Function Component 使用起来与 Class Component 就几乎没有差别了！

