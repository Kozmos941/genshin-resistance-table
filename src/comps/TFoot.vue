<script setup>
const props = defineProps({
  colSpan: { type: Number, required: true },
  comment: { type: String, required: true },
});
</script>

<template>
  <tfoot>
    <tr>
      <td :colSpan="props.colSpan" v-html="props.comment">
      </td>
    </tr>
  </tfoot>
</template>

<style scoped>
tfoot {
  font-family: 'Poppins', 'Noto Sans SC', sans-serif;
  border-color: var(--light-color);
  border-style: solid;
  border-top-width: 0.4rem;
  border-bottom-width: 0.8rem;
  border-left-width: 0;
  border-right-width: 0;
}

tr td {
  padding: 0.5em;
}
</style>
