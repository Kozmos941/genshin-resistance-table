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
    <div v-for="(race, i) in RACES" :key="race.key" class="anchor" :style="'--color-random:' + colors.at(i)"
      :data-index="i">
      <span>{{ race.value }}</span>
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
  cursor: pointer;
  /* Box */
  position: fixed;
  left: 0;
  height: 100vh;
  width: 1rem;
  /* Flex */
  display: flex;
  flex-direction: column;
  /* Font */
  font-family: var(--font-sans);
  font-weight: 900;
  background-color: var(--color-dark2);

  & div {
    /* Box */
    margin: 0;
    flex: auto;
    padding: 0 0.125rem;
    /* Flex */
    display: flex;
    align-items: center;
    /* Font */
    font-size: 0.75rem;
    line-height: 1rem;
    color: var(--color-dark);
    background-color: var(--color-light);
    /* Border */
    border-width: 2px 0;
    border-style: solid;
    border-color: var(--color-dark2);

    &.active,
    &:hover {
      color: var(--color-random);
      background-color: var(--color-dark2);
    }

    &.top,
    &.bottom {
      color: var(--color-dark);
      background-color: var(--color-light);
    }
  }
}
</style>
