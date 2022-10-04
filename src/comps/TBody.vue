<script setup>
import Data from '@/assets/data.json';

const props = defineProps({
  infty: { type: String, default: '∞' },
  aster: { type: String, default: '✱' },
});

const row_key = i => 'row' + i;
const col_key = (k, i) => k + i;
const check_data = (value, classFlag = false) => {
  let text = value,
    className = '';
  if (value === null) text = '';
  // 'ㅤ' <= 这里有个空白符
  else
    switch (typeof value) {
      case 'string':
        if (value === 'infinity') {
          text = props.infty;
          className = value;
        }
        if (value.match(/\*/)) {
          text = text.replace(/\*/, props.aster);
        }
        if (value.match(/\n/)) {
          text = text.replace(/\n/, '<br />');
        }
        break;
      case 'number':
        text += '%';
        if (value < 0) className = 'minus';
        else if (value >= 75) className = 'greater-75';
        else if (value >= 50) className = 'greater-50';
        else if (value >= 20) className = 'greater-20';
        break;
    }
  return classFlag ? className : text;
};

const { data, rowSpan } = (function tableData(data) {
  const DataMap = data.map(v => new Map(Object.entries(v)));
  const keys = Object.keys(data[0]).slice(0, 2);
  const tmpMap = new Map();
  keys.map(k => {
    tmpMap.set(k, '');
  });
  const rowSpanMap = new Map();
  return {
    data: DataMap.map(row => {
      keys.map(key => {
        const value = row.get(key);
        if (tmpMap.get(key) !== value) {
          tmpMap.set(key, value);
          rowSpanMap.set(value, 1);
        } else {
          rowSpanMap.set(value, rowSpanMap.get(value) + 1);
          row.delete(key);
        }
      });
      return row;
    }),
    rowSpan: rowSpanMap,
  };
})(Data);

const set_span = key => (rowSpan.has(key) ? rowSpan.get(key) : 1);
</script>

<template>
  <tbody>
    <tr v-for="(row, index) in data" :key="row_key(index)">
      <td
        v-for="[key, value] in row"
        :key="col_key(key, index)"
        :class="[key, check_data(value, true)]"
        :rowSpan="set_span(value)"
        v-html="check_data(value)"
      ></td>
    </tr>
  </tbody>
</template>

<style scoped>
tbody {
  font-family: 'Poppins', 'Noto Sans SC', sans-serif;
  font-weight: 100;
  font-size: 1.5em;
}

tr td {
  padding: 0.1em;
  border-color: var(--light-color);
  border-style: solid;
  border-top-width: 0.2rem;
  border-bottom-width: 0.2rem;
  border-left-width: 0;
  border-right-width: 0;
}
</style>
