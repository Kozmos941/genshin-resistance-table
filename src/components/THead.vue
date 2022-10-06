<script setup>
const props = defineProps({
  ths: { type: Array, required: true },
})
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
thead {
  font-family: 'Poppins', 'Noto Serif SC', serif;
  font-weight: 900;
  font-size: 2.375rem;
  border-style: solid;
  border-top-width: 0.5rem;
  border-bottom-width: 0.25rem;
  border-left-width: 0;
  border-right-width: 0;
}

th {
  padding: 0.375rem;
}
</style>
