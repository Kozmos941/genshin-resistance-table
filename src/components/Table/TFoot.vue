<script setup lang="ts">
import { ref } from 'vue'
import { loadWebFont } from '$/webfont'

const { colSpan } = defineProps<{
  colSpan?: number
}>()

const trRef = ref<HTMLTableRowElement>()
loadWebFont('Noto Sans SC', trRef)

</script>

<template>
  <tfoot>
    <tr ref="trRef">
      <td :colSpan="colSpan">
        <p>* 来自【空萤酒馆】，初版由巴别塔夜空提供，由 whrily、小明明、羽川raid 完善、修正，最后由 NGA 吾竟南宫遥保持更新。</p>
        <p>* 现版又经更新、重制、并会在 <strong>米游社</strong> 和 <strong>NGA</strong> 一直保持更新。
        </p>
      </td>
    </tr>
  </tfoot>
</template>

<style scoped lang="postcss">
tfoot {
  font-family: var(--font-sans);
}

td {
  padding: 0.5rem;
  border-style: solid;
  border-top-width: 0.25rem;
  border-bottom-width: 0.5rem;
  border-left-width: 0;
  border-right-width: 0;
}
</style>
