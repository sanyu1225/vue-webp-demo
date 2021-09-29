const supportWebp = (function () {
  let elem = document.createElement('canvas')
  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  } else {
    return false
  }
})()

export default {
  install: (Vue) => {
    const version = Vue.version.split('.')[0]

    function update(el, option) {
      const attr = option.arg || 'src'
      if (el.tagName.toLowerCase() === 'img' && option.value) {
        if (option.value.indexOf('data:image') < 0) {
          const tmp =
            option.value.substring(0, option.value.lastIndexOf('.')) + '.webp'
          el.setAttribute(attr, supportWebp ? tmp : option.value)
        } else {
          el.setAttribute(attr, option.value)
        }
      }
    }

    switch (version) {
      case '3':
        Vue.directive('webp', (el) => {
          if (supportWebp) {
            el.classList.add('support-webp')
            if (!el.src?.endsWith('.webp')) {
              el.src += '.webp'
            }
          }
        })
        break
      case '2':
        Vue.directive('webp', function (el, binding) {
          update(el, {
            arg: binding.arg,
            value: binding.value,
          })
        })
        break
      case '1':
        Vue.directive('webp', {
          bind: function () {},
          update: function (val) {
            update(this.el, {
              arg: this.arg,
              value: val,
            })
          },
          unbind: function () {},
        })
        break
      default:
        console.log('can not get vue veision')
        break
    }
  },
}
