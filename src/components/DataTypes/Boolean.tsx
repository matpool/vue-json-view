import { defineComponent } from 'vue'
import DataTypeLabel from './DataTypeLabel'

//theme
import Theme from './../../themes/getStyle'

export default defineComponent({
  props: {
    theme: {
      type: String,
      required: true,
    },
    value: Boolean,
    displayDataTypes: Boolean,
  },
  setup(props) {
    return () => (
      <div {...Theme(props.theme, 'boolean')}>
        {props.displayDataTypes && <DataTypeLabel theme={props.theme} typeName="bool" />}
        {props.value ? 'true' : 'false'}
      </div>
    )
  },
})
