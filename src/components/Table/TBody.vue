<script setup lang="ts">
import { data, rowspan } from '@/data/table.json'
import type { THItem, TDValue } from '$/types'

/* Props */
const { sign } = defineProps<{
  sign: { [key: string]: string }
  ths: THItem[]
}>()
const { INFINITY: infty, ASTERISK: aster, LINEFEED: br } = sign

/* Data */
const ROW_SPAN = new Map(Object.entries(rowspan))
const DATA = data.map(item => new Map(Object.entries(item)))
const set_span = (k: string) => (ROW_SPAN.has(k) ? ROW_SPAN.get(k) : 1)

/* Methods */
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
      else if (v.match(/\n/)) t = v.replace(/\n/, br)
      else t = v
      break
  }
  return t
}
</script>

<template>
  <tbody>
    <tr v-for="(row, index) in DATA" :key="'row' + index">
      <td v-for="[key, value] in row" :key="key + index" :rowspan="set_span(value)" :class="[key, add_class(value)]"
        v-html="check_data(value)"></td>
    </tr>
  </tbody>
</template>

<style scoped lang="postcss">
td {
  padding: 0.1rem;
  border-color: var(--color-light);
  border-style: solid;
  border-top-width: 0.0625rem;
  border-bottom-width: 0.0625rem;
  border-left-width: 0;
  border-right-width: 0;

  &.race,
  &.being,
  &.state {
    font-weight: 700;
    font-size: 1.5rem;
  }

  &.minus {
    font-weight: 900;
  }

  &.gt-20 {
    font-weight: 300;
  }

  &.gt-50 {
    font-weight: 500;
  }

  &.gt-75 {
    font-weight: 700;
    font-style: italic;
  }

  &.infty {
    font-family: 'Noto Sans SC';
    font-weight: 900;
  }
}

tbody {
  font-family: var(--font-sans);
  font-weight: 100;
  font-size: 1.675rem;
}
</style>
