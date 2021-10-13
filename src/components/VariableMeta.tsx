import { defineComponent, toRaw } from 'vue'

import CopyToClipboard from './CopyToClipboard'

//theme
import Theme from './../themes/getStyle'

export default defineComponent({
  props: {
    theme: String,
    src: Object,
    size: Number,
    displayObjectSize: Boolean,
    enableClipboard: Boolean,
    namespace: Array,
    rowHovered: Boolean,
  },
  setup(props: any) {
    function getObjectSize() {
      if (props.displayObjectSize) {
        return (
          <span class="object-size" {...Theme(props.theme, 'object-size')}>
            {props.size} item{props.size === 1 ? '' : 's'}
          </span>
        )
      }
    }

    return () => (
      <div
        {...Theme(props.theme, 'object-meta-data')}
        class="object-meta-data"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {/* size badge display */}
        {getObjectSize()}
        {/* copy to clipboard icon */}
        {props.enableClipboard ? (
          <CopyToClipboard
            src={toRaw(props.src)}
            theme={props.theme}
            rowHovered={props.rowHovered}
            clickCallback={props.enableClipboard}
          />
        ) : null}
      </div>
    )
  },
})
