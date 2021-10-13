import { defineComponent } from 'vue'

//theme
import Theme from '../../themes/getStyle'

export default defineComponent({
  props: {
    theme: String,
  },
  setup(props) {
    return () => <div {...Theme(props.theme, 'undefined')}>undefined</div>
  },
})
