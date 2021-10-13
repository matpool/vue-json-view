import { defineComponent } from 'vue'
import DataTypeLabel from './DataTypeLabel'

//theme
import Theme from '../../themes/getStyle'

export default defineComponent({
  props: {
    theme: String,
    value: {
      type: RegExp,
      required: true,
    },
    displayDataTypes: Boolean
  },
  render() {
    return (
      <div {...Theme(this.$props.theme, 'regexp')}>
        <DataTypeLabel theme={this.$props.theme} displayDataTypes={this.$props.displayDataTypes} typeName="regexp" />
        {this.$props.value.toString()}
      </div>
    )
  },
})
