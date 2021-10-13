import { defineComponent, reactive } from 'vue'
import DataTypeLabel from './DataTypeLabel'

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
      type: Function,
      required: true
    },
    displayDataTypes: Boolean
  },
  setup(props) {
    const state = reactive({
      collapsed: AttributeStore.get(props.vjvId, props.namespace, 'collapsed', true),
    })
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed
      // will be called after setState takes effect.
      AttributeStore.set(props.vjvId, props.namespace, 'collapsed', state.collapsed)
    }

    const getFunctionDisplay = (collapsed: boolean) => {
      if (collapsed) {
        return (
          <span>
            {props.value
              .toString()
              .replace(/\{[\s\S]+/, '')}
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
      const type_name = 'function'

      return (
        <div {...Theme(props.theme, 'function')}>
          <DataTypeLabel theme={props.theme} displayDataTypes={props.displayDataTypes} typeName={type_name} />
          <span
            {...Theme(props.theme, 'function-value')}
            class="rjv-function-container"
            onClick={toggleCollapsed}
          >
            {getFunctionDisplay(state.collapsed)}
          </span>
        </div>
      )
    }
  },
})
