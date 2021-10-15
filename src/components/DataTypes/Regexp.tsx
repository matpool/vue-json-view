import { defineComponent } from 'vue'
import DataTypeLabel from './DataTypeLabel'

//theme
import Theme from '../../themes/getStyle'

export default defineComponent({
  props: {
    theme: {
      type: String,
      required: true,
    },
    value: {
      type: RegExp,
      required: true,
    },
    displayDataTypes: Boolean,
  },
  render() {
    return (
      <div {...Theme(this.$props.theme, 'regexp')}>
        {this.$props.displayDataTypes && <DataTypeLabel theme={this.$props.theme} typeName="regexp" />}
        {this.$props.value.toString()}
      </div>
    )
  },
})
