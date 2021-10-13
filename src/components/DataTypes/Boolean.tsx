import { defineComponent } from 'vue'
import DataTypeLabel from './DataTypeLabel'

//theme
import Theme from './../../themes/getStyle'

export default defineComponent({
  props: {
    theme: String,
    value: Boolean,
    displayDataTypes: Boolean,
  },
  setup(props) {
    return () => (
      <div {...Theme(props.theme, 'boolean')}>
        <DataTypeLabel theme={props.theme} displayDataTypes={props.displayDataTypes} typeName="bool" />
        {props.value ? 'true' : 'false'}
      </div>
    )
  },
})
