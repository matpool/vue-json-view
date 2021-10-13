import { defineComponent, reactive, onBeforeUnmount } from 'vue'

import { toType } from './../helpers/util'

//clibboard icon
import { Clippy } from './icons'

//theme
import Theme from './../themes/getStyle'

export default defineComponent({
  props: {
    theme: String,
    src: [Object, String, Number, Boolean, Function],
    rowHovered: Boolean,
    hidden: Boolean,
    clickCallback: [Function, Boolean],
    namespace: Array,
  },
  setup(props: any) {
    const state = reactive({ copied: false })

    let copiedTimer: any = null

    onBeforeUnmount(() => {
      if (copiedTimer) {
        clearTimeout(copiedTimer)
        copiedTimer = null
      }
    })

    function handleCopy() {
      const container = document.createElement('textarea')

      container.innerHTML = JSON.stringify(clipboardValue(props.src), null, '  ')

      document.body.appendChild(container)
      container.select()
      document.execCommand('copy')

      document.body.removeChild(container)

      copiedTimer = setTimeout(() => {
        state.copied = false
      }, 5500)

      state.copied = true

      if (typeof props.clickCallback !== 'function') {
        return
      }

      props.clickCallback({
        src: props.src,
        namespace: props.namespace,
        name: props.namespace[props.namespace.length - 1],
      })
    }

    function getClippyIcon() {
      if (state.copied) {
        return (
          <span>
            <Clippy class="copy-icon" {...Theme(props.theme, 'copy-icon')} />
            <span {...Theme(props.theme, 'copy-icon-copied')}>✔</span>
          </span>
        )
      }

      return <Clippy class="copy-icon" {...Theme(props.theme, 'copy-icon')} />
    }

    function clipboardValue(value: any) {
      const type = toType(value)
      switch (type) {
        case 'function':
        case 'regexp':
          return value.toString()
        default:
          return value
      }
    }

    return () => {
      let style = (Theme(props.theme, 'copy-to-clipboard') as any).style
      let display = 'inline'

      if (props.hidden) {
        display = 'none'
      }

      return (
        <span
          class="copy-to-clipboard-container"
          title="Copy to clipboard"
          style={{
            verticalAlign: 'top',
            display: props.rowHovered ? 'inline-block' : 'none',
          }}
        >
          <span
            style={{
              ...style,
              display: display,
            }}
            onClick={handleCopy}
          >
            {getClippyIcon()}
          </span>
        </span>
      )
    }
  },
})
