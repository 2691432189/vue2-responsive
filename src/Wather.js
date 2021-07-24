import { Dep } from './Dep'

export class Wather {
  constructor(data, expression, cd) {
    this.data = data
    this.expression = expression
    this.cd = cd
    this.value = this.get()
  }
  addDep(dep) {
    dep.addSub(this)
  }
  // 获取订阅属性的值并返回
  get() {
    // 将当前实例绑定到Dep.target上，window.target上也可以，它是什么属性绑定到什么身上并不重要，重要的是唯一性，因为要将当前Wather实例存入Dep订阅发布器中，是从Dep.target获取到的
    Dep.target = this
    // getValue()很重要，因为在这个函数中会去调用当前订阅的属性，获取它的属性值，也是因为这一步，getter才会知道都有谁订阅了当前属性，并将它们存入Dep订阅发布器中
    const val = parsePath(this.expression)(this.data)
    // 进行到这一步，说明当前Wather实例已被存入Dep订阅发布器中，那么为了下一个Wather实例也能正常存入Dep订阅发布器中，我们应把Dep.target清空
    Dep.target = null
    return val
  }
  // 当订阅的值发生改变，则调用cd回调函数，将当前对象和新旧三个值传回,并将旧值更改为新值
  upLoad() {
    const oldValue = deepClone(this.value)
    this.value = parsePath(this.expression)(this.data)
    this.cd.call(this.data, this.value, oldValue)
  }
}
// 获取当前订阅的值
function parsePath(expression) {
  const segments = expression.split('.')
  return function (obj) {
    segments.forEach((key) => {
      if (!obj) return
      obj = obj[key]
    })
    return obj
  }
}

// 深克隆
function deepClone(val) {
  if (typeof val == 'object') {
    return JSON.parse(JSON.stringify(val))
  } else {
    return val
  }
}
