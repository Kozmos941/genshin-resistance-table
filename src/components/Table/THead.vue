<script setup lang="ts">
import { THItem } from '$/types'

const { ths } = defineProps<{
  ths: THItem[]
}>()

</script>

<template>
  <thead ref="theadRef">
    <tr>
      <th v-for="th in ths" :key="th.key" :class="th.key">
        {{ th.value }}
      </th>
    </tr>
  </thead>
</template>

<style scoped lang="postcss">
thead {
  position: sticky;
  top: 0;
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: 2.375rem;
  background-color: var(--color-dark);

  & th {
    padding: 0.375rem;
    border-style: solid;
    border-color: var(--color-light);
    border-top-width: 0.5rem;
    border-bottom-width: 0.25rem;
    border-left-width: 0;
    border-right-width: 0;
  }
}
</style>
