import observe from './observe'
import { Wather } from './Wather'

let obj = {
  a: [10, 20, []],
  b: 15,
  c: {
    d: {
      e: 20,
    },
  },
}

observe(obj)

new Wather(obj, 'a', function (val, oldVal) {
  console.log(val)
  console.log(oldVal)
  console.log('a从' + oldVal + '变成了' + val)
})

obj.a.push(40)
