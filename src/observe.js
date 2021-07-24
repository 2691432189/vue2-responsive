import Observer from './Observer '
export default function (data) {
  // 判断当前属性是否为对象或数组类型，如果不是，则不需要进行响应式处理
  if (typeof data != 'object') return
  let ob
  // 判断当前属性有没有__ob__属性，并且__ob__是Observer的实例，则证明当前属性已经进行过响应式处理
  if (data.__ob__ && data.__ob__ instanceof Observer) {
    ob = data.__ob__
  } else {
    ob = new Observer(data)
  }
  return ob
}
