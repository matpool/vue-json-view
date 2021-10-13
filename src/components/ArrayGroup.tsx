import { defineComponent, reactive, toRaw } from 'vue'
import Theme from './../themes/getStyle'

import VariableMeta from './VariableMeta'
import ObjectName from './ObjectName'
import ObjectComponent from './DataTypes/Object'

//icons
import { CollapsedIcon, ExpandedIcon } from './ToggleIcons'

//single indent is 5px
const SINGLE_INDENT = 5

export default defineComponent({
  props: {
    jsvRoot: Boolean,
    vjvId: String,
    src: Object,
    theme: String,
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
    const state = reactive<{ [key: string]: any[] }>({
      expanded: [],
    })

    function toggleCollapsed(i: number) {
      const newExpanded: any[] = []
      for (const j in state.expanded) {
        newExpanded.push(state.expanded[j])
      }
      newExpanded[i] = !newExpanded[i]
      state.expanded = newExpanded
    }

    function getExpandedIcon(i: number) {
      const { theme, iconStyle } = props

      if (state.expanded[i]) {
        return <ExpandedIcon {...{ theme, iconStyle }} />
      }

      return <CollapsedIcon {...{ theme, iconStyle }} />
    }

    return () => {
      const {
        src,
        groupArraysAfterLength,
        depth,
        name,
        theme,
        jsvRoot,
        namespace,
        parent_type,
        ...rest
      } = toRaw(props)

      let object_padding_left = 0

      const array_group_padding_left = props.indentWidth * SINGLE_INDENT

      if (!jsvRoot) {
        object_padding_left = props.indentWidth * SINGLE_INDENT
      }

      const size = groupArraysAfterLength
      const groups = Math.ceil(src.length / size)


      return (
        <div
          class="object-key-val"
          {...Theme(theme, jsvRoot ? 'jsv-root' : 'objectKeyVal', {
            paddingLeft: object_padding_left,
          })}
        >
          <ObjectName {...props} />

          <span>
            <VariableMeta size={src.length} {...props} />
          </span>
          {[...Array(groups)].map((_, i) => (
            <div
              key={i}
              class="object-key-val array-group"
              {...Theme(theme, 'objectKeyVal', {
                marginLeft: 6,
                paddingLeft: array_group_padding_left,
              })}
            >
              <span {...Theme(theme, 'brace-row')}>
                <div
                  class="icon-container"
                  {...Theme(theme, 'icon-container')}
                  onClick={() => {
                    toggleCollapsed(i)
                  }}
                >
                  {getExpandedIcon(i)}
                </div>
                {state.expanded[i] ? (
                  <ObjectComponent
                    key={name + i}
                    depth={0}
                    name={false}
                    collapsed={false}
                    groupArraysAfterLength={size}
                    index_offset={i * size}
                    src={src.slice(i * size, i * size + size)}
                    namespace={namespace}
                    type="array"
                    parent_type="array_group"
                    theme={theme}
                    {...rest}
                  />
                ) : (
                  <span
                    {...Theme(theme, 'brace')}
                    onClick={() => {
                      toggleCollapsed(i)
                    }}
                    class="array-group-brace"
                  >
                    [
                    <div {...Theme(theme, 'array-group-meta-data')} class="array-group-meta-data">
                      <span class="object-size" {...Theme(theme, 'object-size')}>
                        {i * size}
                        {' - '}
                        {i * size + size > src.length ? src.length : i * size + size}
                      </span>
                    </div>
                    ]
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      )
    }
  },
})
