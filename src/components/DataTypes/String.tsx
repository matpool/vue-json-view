import { defineComponent, reactive } from 'vue'
import DataTypeLabel from './DataTypeLabel'
import { toType } from '../../helpers/util'

//theme
import Theme from '../../themes/getStyle'

//attribute store for storing collapsed state
import { store } from '../../stores'

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const setting = store.get('setting')
    const state = reactive({
      collapsed: true,
    })

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed
    }

    return () => {
      const { collapseStringsAfterLength, displayDataTypes, theme } = setting

      let value: any = props.value
      const collapsible = toType(collapseStringsAfterLength) === 'integer'
      const style = { style: { cursor: 'default' } }

      if (collapsible && value.length > (collapseStringsAfterLength as number)) {
        style.style.cursor = 'pointer'
        if (state.collapsed) {
          value = (
            <span>
              {value.substring(0, collapseStringsAfterLength)}
              <span {...Theme(theme, 'ellipsis')}> ...</span>
            </span>
          )
        }
      }

      return (
        <div {...Theme(theme, 'string')}>
          {displayDataTypes && <DataTypeLabel typeName="string" theme={theme} />}
          <span class="string-value" {...style} onClick={toggleCollapsed}>
            "{value}"
          </span>
        </div>
      )
    }
  },
})
