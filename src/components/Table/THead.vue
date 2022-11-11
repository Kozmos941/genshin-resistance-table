<script setup lang="ts">
import type { THItem } from '$/types'

const { ths } = defineProps<{
  ths: THItem[]
}>()

</script>

<template>
  <thead>
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
    padding: 0.375rem 0;
    border-style: solid;
    border-color: var(--color-light);
    border-top-width: var(--border-width-outer);
    border-bottom-width: var(--border-width-inner);
    border-left-width: 0;
    border-right-width: 0;
  }
}
</style>
