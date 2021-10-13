import { defineComponent } from 'vue'
import DataTypeLabel from './DataTypeLabel'

//theme
import Theme from '../../themes/getStyle'

export default defineComponent({
  props: {
    theme: String,
    value: Number,
    displayDataTypes: Boolean
  },
  render() {
    return (
      <div {...Theme(this.$props.theme, 'integer')}>
        <DataTypeLabel theme={this.$props.theme} displayDataTypes={this.$props.displayDataTypes} typeName="int" />
        {this.$props.value}
      </div>
    )
  },
})
