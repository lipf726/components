import Cps from './lib//Cps/index'

const components = [
  Cps
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}

/*支持使用标签引入*/
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  Cps
}
