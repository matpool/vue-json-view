import { defineComponent, reactive } from 'vue'

import CopyToClipboard from './CopyToClipboard'

//attribute store for storing collapsed state
import AttributeStore from '../stores/ObjectAttributes'

//data type components
import {
  JsonBoolean,
  JsonDate,
  JsonFloat,
  JsonFunction,
  JsonInteger,
  JsonNan,
  JsonNull,
  JsonRegexp,
  JsonString,
  JsonUndefined,
} from './DataTypes/DataTypes'

//theme
import Theme from './../themes/getStyle'

export default defineComponent({
  props: {
    variable: {
      type: Object,
      required: true,
    },
    singleIndent: Number,
    type: String,
    theme: String,
    namespace: {
      type: Array,
      required: true,
    },
    indentWidth: Number,
    enableClipboard: [Function, Boolean],
    displayArrayKey: Boolean,
    quotesOnKeys: Boolean,
    vjvId: String,
  },
  setup(props) {
    const state = reactive({
      editMode: false,
      editValue: '',
      hovered: false,
      renameKey: false,
      parsedInput: {
        type: false,
        value: null,
      },
    })

    const { displayArrayKey } = AttributeStore.get(props.vjvId, 'global', 'setting', {})

    const getValue = (variable: any, editMode: any) => {
      const type = editMode ? false : variable.type
      switch (type) {
        case false:
          return null
        case 'string':
          return <JsonString value={variable.value} {...props} />
        case 'integer':
          return <JsonInteger value={variable.value} {...props} />
        case 'float':
          return <JsonFloat value={variable.value} {...props} />
        case 'boolean':
          return <JsonBoolean value={variable.value} {...props} />
        case 'function':
          return <JsonFunction value={variable.value} {...props} />
        case 'null':
          return <JsonNull {...props} />
        case 'nan':
          return <JsonNan {...props} />
        case 'undefined':
          return <JsonUndefined {...props} />
        case 'date':
          return <JsonDate value={variable.value} {...props} />
        case 'regexp':
          return <JsonRegexp value={variable.value} {...props} />
        default:
          // catch-all for types that weren't anticipated
          return <div class="object-value">{JSON.stringify(variable.value)}</div>
      }
    }

    return () => {
      return (
        <div
          {...Theme(props.theme, 'objectKeyVal', {
            paddingLeft: (props.indentWidth as number) * (props.singleIndent as number),
          })}
          onMouseenter={() => (state.hovered = true)}
          onMouseleave={() => (state.hovered = false)}
          class="variable-row"
          key={props.variable.name}
        >
          {props.type == 'array' ? (
            displayArrayKey ? (
              <span
                {...Theme(props.theme, 'array-key')}
                key={props.variable.name + '_' + props.namespace}
              >
                {props.variable.name}
                <div {...Theme(props.theme, 'colon')}>:</div>
              </span>
            ) : null
          ) : (
            <span>
              <span
                {...Theme(props.theme, 'object-name')}
                class="object-key"
                key={props.variable.name + '_' + props.namespace}
              >
                {!!props.quotesOnKeys && <span style={{ verticalAlign: 'top' }}>"</span>}
                <span style={{ display: 'inline-block' }}>{props.variable.name}</span>
                {!!props.quotesOnKeys && <span style={{ verticalAlign: 'top' }}>"</span>}
              </span>
              <span {...Theme(props.theme, 'colon')}>:</span>
            </span>
          )}
          <div
            class="variable-value"
            {...Theme(props.theme, 'variableValue', {
              cursor: 'default',
            })}
          >
            {getValue(props.variable, state.editMode)}
          </div>
          {props.enableClipboard ? (
            <CopyToClipboard
              rowHovered={state.hovered}
              hidden={state.editMode}
              src={props.variable.value}
              clickCallback={props.enableClipboard}
              theme={props.theme}
              namespace={[...props.namespace, props.variable.name]}
            />
          ) : null}
        </div>
      )
    }
  },
})
