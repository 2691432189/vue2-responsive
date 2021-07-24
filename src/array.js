const arrayPrototype = Array.prototype
export const myArray = Object.create(arrayPrototype)
import { def } from './def'
const rewriteMethodsKey = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse',
]

rewriteMethodsKey.forEach((key) => {
  // 备份原始方法
  const originalMethods = arrayPrototype[key]
  // 重写方法
  def(
    myArray,
    key,
    function () {
      let inserted
      // arguments是伪数组，没有真正意义的数组方法，所以需要将其转换为真数组
      let args = [...arguments]
      // 处理数据，根据当前方法将传过来的数据进行整理，splice比较特殊，它传过来两个参数
      switch (key) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          // splice方法的第三个及以后的参数是新增的元素
          inserted = args.slice(2)
      }
      // 判断是否有新插入到当前数组中的值
      if (inserted) {
        // 将新出入的值重新遍历包装成响应式
        this.__ob__.forArray(inserted)
      }
      // 通知订阅发布器当前属性以更新(写在这里是因为数组不止增加值需要更新，删除值也需要进行更新)
      this.__ob__.dep.notify()
      // 我们在这里不能直接使用this.push，因为这样是调用重写后的方法
      // 应使用originalMethods.apply调用原始数组方法，this是调用这个方法的数组,arguments是将全部参数传过来
      return originalMethods.apply(this, args)
    },
    false
  )
})
