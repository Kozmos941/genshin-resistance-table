<script setup>
import Data from '@/assets/data.json'

const props = defineProps({
  infty: { type: String, default: '∞' },
  aster: { type: String, default: '✱' },
})

const { data, rowSpan } = (function (data) {
  const tmpMap = new Map()
  const DataMap = data.map(v => new Map(Object.entries(v)))
  const keys = Object.keys(data[0]).slice(0, 2)
  keys.forEach(k => tmpMap.set(k, ''))
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
})(Data)

const row_key = i => 'row' + i
const col_key = (k, i) => k + i
const set_span = k => (rowSpan.has(k) ? rowSpan.get(k) : 1)

const add_class = v => {
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

const check_data = v => {
  let t = v
  if (v === null) t = ''
  // 'ㅤ' <= 这里有个空白符
  else
    switch (typeof v) {
      case 'string':
        if (v === 'infinity') t = props.infty
        else if (v.match(/\*/)) t = t.replace(/\*/, props.aster)
        else if (v.match(/\n/)) t = t.replace(/\n/, '<br />')
        break
      case 'number':
        t += '%'
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
        :key="col_key(key, index)"
        :class="[key, add_class(value)]"
        :rowSpan="set_span(value)"
        v-html="check_data(value)"></td>
    </tr>
  </tbody>
</template>

<style scoped>
tbody {
  font-family: 'Poppins', 'Noto Sans SC', sans-serif;
  font-weight: 100;
  font-size: 1.5rem;
}

td {
  padding: 0.1rem;
  border-color: var(--color-light);
  border-style: solid;
  border-top-width: 0.175rem;
  border-bottom-width: 0.175rem;
  border-left-width: 0;
  border-right-width: 0;
}
</style>
