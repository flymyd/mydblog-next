# JavaScript查漏补缺 - 1

## 安全地将字符串转换为数组

```javascript
const animal = 'fox 🦊🦊'
```

* `const res = animal.split('')`
* `const res = [...animal]`     // 从ES6开始字符串被添加了`Symbol.iterator`属性，所以它可以作为可迭代对象处理。
* `const res = Array.from(animal)`