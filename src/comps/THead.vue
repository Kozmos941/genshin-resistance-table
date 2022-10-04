<script setup>
const props = defineProps({
  ths: { type: Array, required: true },
});
</script>

<template>
  <thead>
    <tr>
      <th v-for="th in props.ths" :key="th.key" :class="th.key">
        {{ th.value }}
      </th>
    </tr>
  </thead>
</template>

<style scoped>
table thead {
  font-family: 'Poppins', 'Noto Serif SC', serif;
  font-weight: 900;
  font-size: 2.3em;
  border-color: var(--light-color);
  /* border-width: 0.2rem; */
  border-style: solid;
  border-top-width: 0.8rem;
  border-bottom-width: 0.4rem;
  border-left-width: 0;
  border-right-width: 0;
}

table thead tr th {
  padding: 0.2em;
}
</style>
