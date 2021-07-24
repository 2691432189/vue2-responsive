import defineReactive from './defineReactive'
import { myArray } from './array'
import observe from './observe'
import { def } from './def'
import { Dep } from './Dep'

export default class Observer {
  constructor(data) {
    this.data = data
    this.dep = new Dep()
    // 为当前对象添加一个不可枚举属性__ob__
    def(data, '__ob__', this)
    // 判断是对象还是数组，进行不同的响应式包装
    if (Array.isArray(data)) {
      Object.setPrototypeOf(data, myArray)
      this.forArray(data)
      // 遍历数组的每一项，进行响应式包装
    } else {
      this.walk(data)
    }
  }
  walk(data) {
    Object.keys(data).forEach((key) => defineReactive(data, key))
  }
  forArray(data) {
    for (let i = 0; i < data.length; i++) {
      observe(data[i])
    }
  }
}
