import { defineComponent, ref, toRaw } from 'vue'

import JsonObject from './components/DataTypes/Object'
import ArrayGroup from './components/ArrayGroup'
import { toType } from './helpers/util'
import ObjectAttributes from './stores/ObjectAttributes'

//global theme
import Theme from './themes/getStyle'

const defaultSetting = {
  name: 'root',
  theme: 'rjv-default',
  collapseStringsAfterLength: 50,
  shouldCollapse: false,
  quotesOnKeys: true,
  groupArraysAfterLength: 100,
  indentWidth: 2,
  enableClipboard: true,
  displayObjectSize: true,
  displayDataTypes: false,
  iconStyle: 'triangle',
  defaultValue: null,
  displayArrayKey: true,
}

export default defineComponent({
  props: {
    theme: String,
    src: {
      type: [String, Object],
      required: true,
    },
    collapsed: {
      type: [Boolean, Number],
      default: false,
    },
    sortKeys: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const srcRef = ref({})
    const name = ref(defaultSetting.name)

    const vjvId = Date.now().toString()

    return () => {
      try {
        if (typeof props.src === 'object') {
          srcRef.value = props.src
        } else {
          srcRef.value = JSON.parse(props.src)
        }
      } catch (error: any) {
        name.value = 'ERROR'
        srcRef.value = {
          message: error.message || 'src必须是一个JSON数据',
        }
      }

      const propsRaw: any = { ...toRaw(props) }
      delete propsRaw.src
      const objectProps = {
        ...defaultSetting,
        ...propsRaw,
        src: srcRef.value,
        namespace: [defaultSetting.name],
        depth: 0,
        jsvRoot: true,
        vjvId,
        type: toType(srcRef.value),
      }
      // initialize
      ObjectAttributes.set(vjvId, 'global', 'src', toRaw(srcRef.value))
      ObjectAttributes.set(vjvId, 'global', 'setting', objectProps)

      let ObjectComponent = JsonObject
      if (
        Array.isArray(srcRef.value) &&
        objectProps.groupArraysAfterLength &&
        srcRef.value.length > objectProps.groupArraysAfterLength
      ) {
        ObjectComponent = ArrayGroup
      }

      return (
        <div class="vue-json-view" {...Theme(objectProps.theme, 'app-container')}>
          <div class="pretty-json-container object-container">
            <div class="object-content">
              <ObjectComponent {...objectProps} />
            </div>
          </div>
        </div>
      )
    }
  },
})
