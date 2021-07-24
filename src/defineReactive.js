import observe from './observe'
import { Dep } from './Dep'

export default function defineReactive(data, key, val) {
  const dep = new Dep()
  // 正常调用这个方法只需要传data和key，val作为get()和set()的中间件使用
  // 递归继续进行响应式处理
  if (arguments.length == 2) val = data[key]
  let childOb = observe(val)
  Object.defineProperty(data, key, {
    get() {
      console.log('调用了' + key)
      // 判断是否有订阅者，有则通过dep.depend()将新的订阅者存入subs中
      if (Dep.target) {
        dep.depend()
        // 判断有没有子元素
        if (childOb) {
          // 将当前订阅者存入到子元素的Dep订阅发布器中，因为子元素发生改变也需要通知当前属性的订阅者
          childOb.dep.depend()
        }
      }
      return val
    },
    set(newValue) {
      console.log('修改了' + key + '为' + newValue)
      // 判断当前newValue与val是否完全一致，不是则递归继续进行响应式处理
      if (val != newValue) {
        observe(newValue)
        // 通过val中间件改写get()的返回值
        val = newValue
        dep.notify()
      }
    },
  })
}
