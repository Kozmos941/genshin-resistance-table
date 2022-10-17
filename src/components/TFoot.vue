<script setup lang="ts">
interface Props {
  colSpan?: number
  comments?: string
}

const { colSpan, comments } = defineProps<Props>()
</script>

<template>
  <tfoot>
    <tr>
      <td :colSpan="colSpan" v-html="comments"></td>
    </tr>
  </tfoot>
</template>

<style scoped lang="postcss">
tfoot {
  font-family: 'Poppins', 'Noto Sans SC', sans-serif;
  border-style: solid;
  border-top-width: 0.25rem;
  border-bottom-width: 0.5rem;
  border-left-width: 0;
  border-right-width: 0;

  & td {
    padding: 0.5rem;
  }
}
</style>
