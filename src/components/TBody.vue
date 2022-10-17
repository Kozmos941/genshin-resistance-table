<script setup lang="ts">
import { data, rowspan } from '@/assets/data.json'
import { THItem, TDValue } from '$types'

interface Props {
  sign: { [key: string]: string }
  ths: THItem[]
}
const { ths, sign } = defineProps<Props>()
const { INFINITY: infty, ASTERISK: aster } = sign

const ROW_SPAN = new Map(Object.entries(rowspan))
const DATA = data.map(item => new Map(Object.entries(item)))
const keyMap = ths.reduce(
  (map, { key }) => map.set(key.slice(0, 2), key),
  new Map()
)

const row_key = (i: number) => 'row' + i
const set_span = (k: string) =>
  ROW_SPAN.has(k) ? ROW_SPAN.get(k) : 1
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
  let t: any = v
  switch (typeof v) {
    case 'object':
      if (v === null) t = ''
      break
    case 'number':
      t += '%'
      break
    case 'string':
      if (v === 'infinity') t = infty
      else if (v.match(/\*/)) t = t.replace(/\*/, aster)
      else if (v.match(/\n/)) t = t.replace(/\n/, '<br>')
      break
  }
  return t
}
</script>

<template>
  <tbody>
    <tr v-for="(row, index) in DATA" :key="row_key(index)">
      <td
        v-for="[key, value] in row"
        :rowSpan="set_span(value)"
        :class="[keyMap.get(key), add_class(value)]"
        v-html="check_data(value)"></td>
    </tr>
  </tbody>
</template>

<style scoped lang="postcss">
tbody {
  font-family: 'Poppins', 'Noto Sans SC', sans-serif;
  font-weight: 100;
  font-size: 1.5rem;
  & td {
    padding: 0.1rem;
    border-color: var(--color-light);
    border-style: solid;
    border-top-width: 0.175rem;
    border-bottom-width: 0.175rem;
    border-left-width: 0;
    border-right-width: 0;
  }
}
</style>
