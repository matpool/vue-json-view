import { defineComponent, reactive } from 'vue'
import DataTypeLabel from './DataTypeLabel'

//theme
import Theme from '../../themes/getStyle'

//attribute store for storing collapsed state
import { store } from '../../stores'

export default defineComponent({
  props: {
    theme: {
      type: String,
      required: true,
    },
    value: {
      type: Function,
      required: true,
    },
    displayDataTypes: Boolean,
  },
  setup(props) {
    const setting = store.get('setting')
    const state = reactive({
      collapsed: true,
    })
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed
    }

    const getFunctionDisplay = (collapsed: boolean) => {
      if (collapsed) {
        return (
          <span>
            {props.value.toString().replace(/\{[\s\S]+/, '')}
            <span class="function-collapsed" style={{ fontWeight: 'bold' }}>
              <span>{'{'}</span>
              <span {...Theme(props.theme, 'ellipsis')}>...</span>
              <span>{'}'}</span>
            </span>
          </span>
        )
      } else {
        return props.value.toString()
      }
    }

    return () => {
      const { displayDataTypes, theme } = setting

      return (
        <div {...Theme(theme, 'function')}>
          {displayDataTypes && <DataTypeLabel theme={theme} typeName="function" />}
          <span {...Theme(theme, 'function-value')} class="rjv-function-container" onClick={toggleCollapsed}>
            {getFunctionDisplay(state.collapsed)}
          </span>
        </div>
      )
    }
  },
})
