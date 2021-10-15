import { defineComponent } from 'vue'

//theme
import Theme from '../../themes/getStyle'

export default defineComponent({
  props: {
    theme: {
      type: String,
      required: true,
    },
  },
  render() {
    return <div {...Theme(this.$props.theme, 'nan')}>NaN</div>
  },
})
