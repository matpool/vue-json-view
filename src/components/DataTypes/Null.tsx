import { defineComponent } from 'vue'

//theme
import Theme from '../../themes/getStyle'

export default defineComponent({
  props: {
    theme: String,
  },
  render() {
    return <div {...Theme(this.$props.theme, 'null')}>NULL</div>
  },
})
