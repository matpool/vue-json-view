import { defineComponent } from 'vue'
import DataTypeLabel from './DataTypeLabel'

//theme
import Theme from '../../themes/getStyle'

export default defineComponent({
  props: {
    theme: {
      type: String,
      required: true,
    },
    value: {
      type: Date,
      required: true,
    },
    displayDataTypes: Boolean,
  },
  render() {
    const display_options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }

    return (
      <div {...Theme(this.$props.theme, 'date')}>
        {this.$props.displayDataTypes && <DataTypeLabel theme={this.$props.theme} typeName="date" />}
        <span class="date-value" {...Theme(this.$props.theme, 'date-value')}>
          {this.$props.value.toLocaleTimeString('en-us', display_options as Intl.DateTimeFormatOptions)}
        </span>
      </div>
    )
  },
})
