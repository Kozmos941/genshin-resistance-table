<script setup lang="ts">
import TCaption from '#/Table/TCaption.vue'
import THead from '#/Table/THead.vue'
import TBody from '#/Table/TBody.vue'
import TFoot from '#/Table/TFoot.vue'
import { ref } from 'vue'
import {
  TABLE_CAPTION,
  TABLE_HEADS,
  SIGN_REPLACE,
  TABLE_WIDTH,
} from '$/config'

const tableRef = ref<HTMLTableElement>()
defineExpose({
  tableRef,
})
</script>

<template>
  <table ref="tableRef">
    <t-caption :title="TABLE_CAPTION" />
    <t-head :ths="TABLE_HEADS" />
    <t-body :ths="TABLE_HEADS" :sign="SIGN_REPLACE" />
    <t-foot :col-span="TABLE_HEADS.length" />
  </table>
</template>

<style scoped lang="postcss">
table {
  width: v-bind('`${TABLE_WIDTH}px`');
  min-width: max-content;
  margin: auto;
  text-align: center;
  border-collapse: separate;
  border-spacing: 0;
  border-color: var(--color-light);
  background-color: var(--color-dark);

  & :deep(.electro) {
    color: var(--color-electro);

    &::selection {
      color: black;
      background: var(--color-electro);
    }
  }

  & :deep(.pyro) {
    color: var(--color-pyro);

    &::selection {
      color: black;
      background: var(--color-pyro);
    }
  }

  & :deep(.hydro) {
    color: var(--color-hydro);

    &::selection {
      color: black;
      background: var(--color-hydro);
    }
  }

  & :deep(.cryo) {
    color: var(--color-cryo);

    &::selection {
      color: black;
      background: var(--color-cryo);
    }
  }

  & :deep(.dendro) {
    color: var(--color-dendro);

    &::selection {
      color: black;
      background: var(--color-dendro);
    }
  }

  & :deep(.anemo) {
    color: var(--color-anemo);

    &::selection {
      color: black;
      background: var(--color-anemo);
    }
  }

  & :deep(.geo) {
    color: var(--color-geo);

    &::selection {
      color: black;
      background: var(--color-geo);
    }
  }

  & :deep(.physical) {
    color: var(--color-physical);

    &::selection {
      color: black;
      background: var(--color-physical);
    }
  }
}
</style>
