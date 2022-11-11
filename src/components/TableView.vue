<script setup lang="ts">
import { TABLE_HEADS, SIGN_REPLACE } from '$/config'
import TCaption from '#/Table/TCaption.vue'
import THead from '#/Table/THead.vue'
import TBody from '#/Table/TBody.vue'
import TFoot from '#/Table/TFoot.vue'
import { usePiniaStore } from '$/store'
const pinia = usePiniaStore()
</script>

<template>
  <table :ref="e => (pinia.table = e as HTMLTableElement)">
    <t-caption :title="pinia.TABLE_CAPTION" />
    <t-head :ths="TABLE_HEADS" />
    <t-body :ths="TABLE_HEADS" :sign="SIGN_REPLACE" />
    <t-foot :col-span="TABLE_HEADS.length" />
  </table>
</template>

<style scoped lang="postcss">
table {
  min-width: max-content;
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
