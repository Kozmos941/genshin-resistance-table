<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RACES, TABLE_HEADS } from '$/config'
import { SidebarEventDelegation } from '@/scripts/classes'

/* Shuffle Colors */
const colors = TABLE_HEADS
  .filter(({ color }) => color)
  .map(({ color }) => color)
  .sort(() => Math.random() - 0.5)

/* OnMounted */
const asideRef = ref<HTMLElement>()
onMounted(() => {
  const aside = asideRef.value as HTMLElement
  const thead = document.querySelector('thead') as HTMLTableSectionElement
  const tds = document.querySelectorAll('td.race') as NodeListOf<HTMLTableCellElement>
  new SidebarEventDelegation(aside, thead.offsetHeight, tds)
})

</script>

<template>
  <aside ref="asideRef">
    <div class="top" data-index="TOP">
      <span>▲</span>
    </div>
    <div v-for="(r, i) in RACES" :key="r" class="anchor" :style="{ 'color': colors.at(i) }" :data-index="i">
      <span>{{ r }}</span>
    </div>
    <div class="bottom" data-index="BOTTOM">
      <span>▼</span>
    </div>
  </aside>
</template>

<style scoped lang="postcss">
aside {
  z-index: var(--zindex-fixed);
  user-select: none;
  /* Box */
  position: fixed;
  left: 0;
  height: 100vh;
  width: 1rem;
  /* Flex */
  display: flex;
  flex-direction: column;
  /* Font */
  font-family: 'Noto Sans SC';
  font-weight: 700;
  background-color: var(--color-dark2);

  &>div {
    flex: auto;
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    margin: 0 0;
    padding: 0 0.125rem;
    cursor: pointer;
    border-width: 2px 0;
    border-style: solid;
    border-color: var(--color-dark2);

    &.active,
    &:hover {
      background-color: var(--color-light);

      & span {
        color: var(--color-dark)
      }
    }

    &.top,
    &.bottom {
      border-width: 0;
      color: var(--color-dark);
      background-color: var(--color-light);
    }
  }
}
</style>
