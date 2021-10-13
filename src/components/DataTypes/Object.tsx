import { defineComponent, reactive, toRaw } from 'vue'
import { toType } from '../../helpers/util'

import VariableEditor from './../VariableEditor'
import VariableMeta from './../VariableMeta'
import ArrayGroup from './../ArrayGroup'
import ObjectName from './../ObjectName'

//attribute store
import AttributeStore from './../../stores/ObjectAttributes'

//icons
import { CollapsedIcon, ExpandedIcon } from './../ToggleIcons'

//theme
import Theme from './../../themes/getStyle'

//increment 1 with each nested object & array
const DEPTH_INCREMENT = 1
//single indent is 5px
const SINGLE_INDENT = 5

const getState = (props: any) => {
  const size = Object.keys(props.src).length
  const expanded =
    (props.collapsed === false || (props.collapsed !== true && props.collapsed > props.depth)) &&
    (!props.shouldCollapse ||
      props.shouldCollapse({
        name: props.name,
        src: props.src,
        type: toType(props.src),
        namespace: props.namespace,
      }) === false) &&
    //initialize closed if object has no items
    size !== 0
  const state = {
    expanded: AttributeStore.get(props.vjvId, props.namespace, 'expanded', expanded),
    object_type: props.type === 'array' ? 'array' : 'object',
    parent_type: props.type === 'array' ? 'array' : 'object',
    size,
    hovered: false,
  }
  return state
}

class JsonVariable {
  name: any
  value: any
  type: string

  constructor(name: any, value: any) {
    this.name = name
    this.value = value
    this.type = toType(value)
  }
}

const JsonObject = defineComponent({
  props: {
    jsvRoot: Boolean,
    vjvId: String,
    src: Object,
    theme: String,
    iconStyle: String,
    displayObjectSize: Boolean,
    enableClipboard: Boolean,
    name: String,
    namespace: Array,
    indentWidth: Number,
    displayDataTypes: Boolean,
    groupArraysAfterLength: Number,
    quotesOnKeys: Boolean,
    type: String,
    depth: Number,
    collapsed: [Boolean, Number],
  },
  setup(props: any) {
    const state = reactive(getState(props))

    function toggleCollapsed() {
      state.expanded = !state.expanded
      AttributeStore.set(props.vjvId, props.namespace, 'expanded', state.expanded)
    }
    function getObjectContent(_: any, src: any, contentProps: any) {
      return (
        <div class="pushed-content object-container">
          <div class="object-content" {...Theme(props.theme, 'pushed-content')}>
            {renderObjectContents(src, contentProps)}
          </div>
        </div>
      )
    }
    function getEllipsis() {
      const { size } = state

      if (size === 0) {
        //don't render an ellipsis when an object has no items
        return null
      } else {
        return (
          <div {...Theme(props.theme, 'ellipsis')} class="node-ellipsis" onClick={toggleCollapsed}>
            ...
          </div>
        )
      }
    }
    function getObjectMetaData(_: any) {
      const { size, hovered } = state
      return <VariableMeta rowHovered={hovered} size={size} {...toRaw(props)} />
    }
    function getBraceStart(object_type: any, expanded: boolean) {
      const { src, theme, iconStyle, parent_type } = props

      if (parent_type === 'array_group') {
        return (
          <span>
            <span {...Theme(theme, 'brace')}>{object_type === 'array' ? '[' : '{'}</span>
            {expanded ? getObjectMetaData(src) : null}
          </span>
        )
      }

      const IconComponent = expanded ? ExpandedIcon : CollapsedIcon

      return (
        <span>
          <span onClick={toggleCollapsed} {...Theme(theme, 'brace-row')}>
            <div class="icon-container" {...Theme(theme, 'icon-container')}>
              <IconComponent {...{ theme, iconStyle }} />
            </div>
            <ObjectName {...props} />
            <span {...Theme(theme, 'brace')}>{object_type === 'array' ? '[' : '{'}</span>
          </span>
          {expanded ? getObjectMetaData(src) : null}
        </span>
      )
    }
    function renderObjectContents(variables: any, contentProps: any) {
      let elements: any[] = [],
        variable
      let keys = Object.keys(variables || {})
      if (props.sortKeys && state.object_type !== 'array') {
        keys = keys.sort()
      }

      keys.forEach((name) => {
        variable = new JsonVariable(name, variables[name])

        if (props.parent_type === 'array_group' && props.index_offset) {
          variable.name = parseInt(variable.name) + props.index_offset
        }
        if (!variables.hasOwnProperty(name)) {
          return
        } else if (variable.type === 'object') {
          elements.push(
            <JsonObject
              {...contentProps}
              key={variable.name}
              depth={props.depth + DEPTH_INCREMENT}
              name={variable.name}
              src={variable.value}
              namespace={props.namespace.concat(variable.name)}
              parent_type={state.object_type}
              type="object"
            />,
          )
        } else if (variable.type === 'array') {
          let ObjectComponent = JsonObject

          if (props.groupArraysAfterLength && variable.value.length > props.groupArraysAfterLength) {
            ObjectComponent = ArrayGroup
          }

          elements.push(
            <ObjectComponent
              {...contentProps}
              key={variable.name}
              depth={props.depth + DEPTH_INCREMENT}
              name={variable.name}
              src={variable.value}
              namespace={props.namespace.concat(variable.name)}
              type="array"
              parent_type={state.object_type}
            />,
          )
        } else {
          elements.push(
            <VariableEditor
              {...contentProps}
              key={variable.name + '_' + props.namespace}
              variable={variable}
              singleIndent={SINGLE_INDENT}
              namespace={props.namespace}
              type={props.type}
            />,
          )
        }
      })

      return elements
    }

    return () => {
      Object.assign(state, getState(props))

      let styles: any = {}
      if (!props.jsvRoot && props.parent_type !== 'array_group') {
        styles.paddingLeft = props.indentWidth * SINGLE_INDENT
      } else if (props.parent_type === 'array_group') {
        styles.borderLeft = 0
        styles.display = 'inline'
      }

      return (
        <div
          class="object-key-val"
          onMouseenter={() => (state.hovered = true)}
          onMouseleave={() => (state.hovered = false)}
          {...Theme(props.theme, props.jsvRoot ? 'jsv-root' : 'objectKeyVal', styles)}
        >
          {getBraceStart(state.object_type, state.expanded)}
          {state.expanded ? getObjectContent(props.depth, props.src, props) : getEllipsis()}
          <span class="brace-row">
            <span
              style={{
                ...(Theme(props.theme, 'brace') as any).style,
                paddingLeft: state.expanded ? '3px' : '0px',
              }}
            >
              {state.object_type === 'array' ? ']' : '}'}
            </span>
            {state.expanded ? null : getObjectMetaData(props.src)}
          </span>
        </div>
      )
    }
  },
})

export default JsonObject
