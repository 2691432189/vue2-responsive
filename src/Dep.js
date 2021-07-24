export class Dep {
  constructor() {
    // subs用于存储当前属性的所有订阅者的Wather实例
    this.subs = []
  }
  // 只有当前属性发生改变，notify才会被setter调用，然后遍历subs通知所有订阅者的Wather实例进行相关的回调处理
  notify() {
    const subs = [...this.subs]
    subs.forEach((s) => s.upLoad())
  }
  // 当前属性有新的订阅者时，depend才会被调用，然后判断订阅者是否真的存在，存在则调用addSub将新的订阅者存入subs中
  depend() {
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  // 用于将新的订阅者存入subs中
  addSub(sub) {
    this.subs.push(sub)
  }
}
