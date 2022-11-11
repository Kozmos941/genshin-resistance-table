<script setup lang="ts">
import type { THItem, TDValue } from '$/types'
import { data, rowspan } from '@/data/table.json'
import { RACES } from '$/config'
import { usePiniaStore } from '$/store'
const pinia = usePiniaStore()

/* Props */
const { sign } = defineProps<{
  sign: { pattern: RegExp, replace: string }[]
  ths: THItem[]
}>()

/* Table Cell Setting */
const ROW_SPAN = new Map(Object.entries(rowspan))
const DATA = data.map(item => new Map(Object.entries(item)))

const set_span = (k: string) => ROW_SPAN.get(k)
const add_class = (v: TDValue) => {
  let c = []
  switch (typeof v) {
    case 'string':
      if (v === 'infinity') c.push('infty')
      break
    case 'number':
      if (v < 0) c.push('minus')
      if (v >= 75) c.push('gt-75')
      if (v >= 50) c.push('gt-50')
      if (v >= 20) c.push('gt-20')
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
      t = v
      sign.forEach(({ pattern, replace }) => {
        if (v.match(pattern)) t = t.replace(pattern, replace)
      })
      break
  }
  return t
}

function TCellRef(e: HTMLTableCellElement) {
  if (e.classList.contains('race')) {
    const [{ key }] = RACES.filter(({ value }) => value === e.innerText)
    pinia.tCellRaces.set(key, e)
    e.dataset.key = key
  }
}

</script>

<template>
  <tbody>
    <tr v-for="(row, index) in DATA" :key="'row' + index">
      <td v-for="[key, value] in row" :key="key + index" :rowspan="set_span(value)" :class="[key, add_class(value)]"
        v-html="check_data(value)" :ref="e => TCellRef(e as HTMLTableCellElement)"></td>
    </tr>
  </tbody>
</template>

<style scoped lang="postcss">
td {
  padding: 0.1rem;
  border-color: var(--color-light);
  border-style: solid;
  border-top-width: var(--border-width);
  border-bottom-width: var(--border-width);
  border-left-width: 0;
  border-right-width: 0;

  &.race {
    --size: 2rem;
    font-family: var(--font-serif);
    font-weight: 900;
    padding: 0 1.5rem;
    width: var(--size);
    font-size: var(--size);
    line-height: var(--size);
  }

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
    font-weight: 900;
  }
}

tbody {
  font-family: var(--font-sans);
  font-weight: 100;
  font-size: 1.675rem;
}
</style>
