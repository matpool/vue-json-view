import { defineComponent } from 'vue'

import Theme from './../themes/getStyle'

import { CircleMinus, CirclePlus, SquareMinus, SquarePlus, ArrowRight, ArrowDown } from './icons'

export const ExpandedIcon = defineComponent({
  props: {
    theme: String,
    iconStyle: String,
  },
  setup(props) {
    return () => {
      switch (props.iconStyle) {
        case 'triangle':
          return <ArrowDown {...Theme(props.theme, 'expanded-icon')} class="expanded-icon" />
        case 'square':
          return <SquareMinus {...Theme(props.theme, 'expanded-icon')} class="expanded-icon" />
        default:
          return <CircleMinus {...Theme(props.theme, 'expanded-icon')} class="expanded-icon" />
      }
    }
  },
})

export const CollapsedIcon = defineComponent({
  props: {
    theme: String,
    iconStyle: String,
  },
  setup(props) {
    return () => {
      switch (props.iconStyle) {
        case 'triangle':
          return <ArrowRight {...Theme(props.theme, 'collapsed-icon')} class="collapsed-icon" />
        case 'square':
          return <SquarePlus {...Theme(props.theme, 'collapsed-icon')} class="collapsed-icon" />
        default:
          return <CirclePlus {...Theme(props.theme, 'collapsed-icon')} class="collapsed-icon" />
      }
    }
  },
})
