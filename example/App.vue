<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import dayjs from 'dayjs'
import VueJsonView from '../src/VueJsonView'

const srcStr = ref<any>({
  string: 'this is a test string',
  integer: 42,
  empty_array: [],
  empty_object: {},
  array: [1, 2, 3, 'test'],
  float: -2.757,
  undefined_var: undefined,
  parent: {
    sibling1: true,
    sibling2: false,
    sibling3: null,
    isString: function (value) {
      if (typeof value === 'string') {
        return 'string'
      } else {
        return 'other'
      }
    },
  },
  string_number: '1234',
  date: new Date(),
  moment: dayjs(),
  regexp: /[0-9]/gi,
})

const collapsed = ref(1)
const theme = ref('monokai')
const sortKeys = ref(false)

function handleChange(e) {
  collapsed.value = +e.target.value
}
function handleSortKeysChange(e) {
  sortKeys.value = Boolean(e.target.value)
}

function onChange() {
  srcStr.value = JSON.stringify({ id: Math.random() })
}
</script>

<template>
  <div>
    <button @click="onChange">change</button>

    <input @blur="handleChange" />
    <select id="theme" v-model="theme" name="theme">
      <option value="monokai">monokai</option>
      <option value="apathy">apathy</option>
    </select>
    <select id="sortKeys" name="sortKeys" @change="handleSortKeysChange">
      <option value="false">false</option>
      <option value="true">true</option>
    </select>

    <VueJsonView :src="srcStr" :collapsed="collapsed" :theme="theme" :sort-keys="sortKeys" name="src" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.vue-json-view {
  padding: 4px 6px;
  border-radius: 3px;
  /*display: inline-block;*/
}
</style>
