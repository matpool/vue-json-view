import { defineComponent, reactive } from 'vue'
import DataTypeLabel from './DataTypeLabel'
import { toType } from '../../helpers/util'

//theme
import Theme from '../../themes/getStyle'

//attribute store for storing collapsed state
import AttributeStore from '../../stores/ObjectAttributes'

export default defineComponent({
  props: {
    theme: String,
    vjvId: String,
    namespace: Array,
    value: {
      type: String,
      required: true,
    },
    collapseStringsAfterLength: [Number, Boolean],
    displayDataTypes: Boolean
  },
  setup(props) {
    const state = reactive({
      collapsed: AttributeStore.get(props.vjvId, props.namespace, 'collapsed', true),
    })

    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed
      AttributeStore.set(props.vjvId, props.namespace, 'collapsed', state.collapsed)
    }

    return () => {
      let value: any = props.value
      let collapsible = toType(props.collapseStringsAfterLength) === 'integer'
      let style = { style: { cursor: 'default' } }

      if (collapsible && value.length > (props.collapseStringsAfterLength as number)) {
        style.style.cursor = 'pointer'
        if (state.collapsed) {
          value = (
            <span>
              {value.substring(0, props.collapseStringsAfterLength)}
              <span {...Theme(props.theme, 'ellipsis')}> ...</span>
            </span>
          )
        }
      }

      return (
        <div {...Theme(props.theme, 'string')}>
          <DataTypeLabel typeName="string" theme={props.theme} displayDataTypes={props.displayDataTypes} />
          <span class="string-value" {...style} onClick={toggleCollapsed}>
            "{value}"
          </span>
        </div>
      )
    }
  },
})
