<script setup lang="ts">
import { data, rowspan } from '@/data/table.json'
import { THItem, TDValue } from '$/types'
// Props
const { ths, sign } = defineProps<{
  sign: { [key: string]: string }
  ths: THItem[]
}>()
const { INFINITY: infty, ASTERISK: aster } = sign
// Data
const ROW_SPAN = new Map(Object.entries(rowspan))
const DATA = data.map(item => new Map(Object.entries(item)))
const keyMap = ths.reduce((map, { key }) => map.set(key.slice(0, 2), key), new Map())
const set_span = (k: string) => (ROW_SPAN.has(k) ? ROW_SPAN.get(k) : 1)
// Methods
const add_class = (v: TDValue) => {
  let c = []
  switch (typeof v) {
    case 'string':
      if (v === 'infinity') c.push('infty')
      break
    case 'number':
      if (v < 0) c.push('minus')
      else if (v >= 75) c.push('gt-75')
      else if (v >= 50) c.push('gt-50')
      else if (v >= 20) c.push('gt-20')
      break
  }
  return c
}
const check_data = (v: TDValue) => {
  let t = ''
  switch (typeof v) {
    case 'number':
      t = v + '%'
      break
    case 'string':
      if (v === 'infinity') t = infty
      else if (v.match(/\*/)) t = v.replace(/\*/, aster)
      else if (v.match(/\n/)) t = v.replace(/\n/, '<br>')
      else t = v
      break
  }
  return t
}
</script>

<template>
  <tbody>
    <tr v-for="(row, index) in DATA" :key="'row'+index">
      <td v-for="[key, value] in row" :key="key+index" :rowSpan="set_span(value)"
        :class="[keyMap.get(key), add_class(value)]" v-html="check_data(value)"></td>
    </tr>
  </tbody>
</template>

<style scoped lang="postcss">
tbody {
  font-family: var(--font-sans);
  font-weight: 100;
  font-size: 1.5rem;

  & td {
    padding: 0.1rem;
    border-color: var(--color-light);
    border-style: solid;
    border-top-width: 0.0625rem;
    border-bottom-width: 0.0625rem;
    border-left-width: 0;
    border-right-width: 0;
  }
}
</style>
