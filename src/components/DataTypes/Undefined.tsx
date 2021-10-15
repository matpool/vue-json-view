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
  setup(props) {
    return () => <div {...Theme(props.theme, 'undefined')}>undefined</div>
  },
})
