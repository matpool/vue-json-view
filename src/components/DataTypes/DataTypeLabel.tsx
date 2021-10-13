import { defineComponent } from 'vue'

//theme
import Theme from './../../themes/getStyle'

export default defineComponent({
  props: {
    theme: String,
    typeName: String,
    displayDataTypes: Boolean,
  },
  render() {
    if (this.$props.displayDataTypes) {
      return (
        <span class="data-type-label" {...Theme(this.$props.theme, 'data-type-label')}>
          {this.$props.typeName}
        </span>
      )
    }
    return null
  },
})
