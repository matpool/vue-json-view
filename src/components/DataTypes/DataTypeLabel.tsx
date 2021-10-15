import { defineComponent } from 'vue'

//theme
import Theme from './../../themes/getStyle'

export default defineComponent({
  props: {
    theme: {
      type: String,
      required: true,
    },
    typeName: {
      type: String,
      required: true,
    },
  },
  render() {
    return (
      <span class="data-type-label" {...Theme(this.$props.theme, 'data-type-label')}>
        {this.$props.typeName}
      </span>
    )
  },
})
