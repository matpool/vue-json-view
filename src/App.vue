<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import dayjs from 'dayjs'
import VueJsonView from './VueJsonView'

const srcStr = {
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
    isString: function(value) {
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
}

const collapsed = ref(1)
</script>

<template>
<div>
  <VueJsonView :src="srcStr" :collapsed="collapsed" theme="monokai" />
  <button @click="collapsed = 2">change collapsed</button>
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
