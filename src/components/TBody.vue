<script setup lang="ts">
import Data from '@/assets/data.json'
import { THItem, THKey, TDValue, TRow } from '$types'

interface Props {
  sign: { [key: string]: string }
  ths: THItem[]
}
const { ths, sign } = defineProps<Props>()
const { INFINITY: infty, ASTERISK: aster } = sign

const { data, rowSpan } = (function (data: TRow[]) {
  const DataMap = data.map(
    v => new Map(Object.entries(v) as [THKey, TDValue][])
  )
  const tmpMap = new Map()
  const keys = ths.slice(0, 2).map(({ key }) => key) as THKey[]
  keys.map(k => tmpMap.set(k, ''))
  const spanMap = new Map()
  return {
    data: DataMap.map(row => {
      keys.map(k => {
        const v = row.get(k)
        if (tmpMap.get(k) !== v) {
          tmpMap.set(k, v)
          spanMap.set(v, 1)
        } else {
          spanMap.set(v, spanMap.get(v) + 1)
          row.delete(k)
        }
      })
      return row
    }),
    rowSpan: spanMap,
  }
})(Data as TRow[])
const row_key = (i: number) => 'row' + i
const set_span = (k: TDValue) => (rowSpan.has(k) ? rowSpan.get(k) : 1)
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
    <tr v-for="(row, index) in data" :key="row_key(index)">
      <td
        v-for="[key, value] in row"
        :rowSpan="set_span(value)"
        :class="[key, add_class(value)]"
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
