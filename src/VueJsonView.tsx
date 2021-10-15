import { defineComponent, provide, reactive, ref, toRaw } from 'vue'

import JsonObject from './components/DataTypes/Object'
import ArrayGroup from './components/ArrayGroup'
import { toType } from './helpers/util'

//global theme
import Theme from './themes/getStyle'

export default defineComponent({
  name: 'VueJsonView',
  props: {
    theme: {
      type: String,
      default: '',
    },
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
    // initialize
    const setting = reactive({
      theme: 'rjv-default',
      collapseStringsAfterLength: 5,
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
      collapsed: false,
      sortKeys: true,
    })

    provide('setting', setting)

    const srcRef = ref({})
    const name = ref('root')

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
      if (!propsRaw.theme) {
        delete propsRaw.theme
      }
      const objectProps = {
        ...propsRaw,
        src: srcRef.value,
        name: name.value,
        namespace: [name.value],
        depth: 0,
        jsvRoot: true,
        type: toType(srcRef.value),
      }

      Object.assign(setting, propsRaw)

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
