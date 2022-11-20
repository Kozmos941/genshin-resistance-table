<script setup lang="ts">
import { RACES, TABLE_HEADS } from '$/config'
import { usePiniaStore } from '$/store'
const pinia = usePiniaStore()

/* Shuffle Colors */
const colors = TABLE_HEADS
  .filter(({ color }) => color)
  .map(({ color }) => color)
  .sort(() => Math.random() - 0.5)

function isActive(key: string) {
  if (pinia.tCellRaces.size === 0) return false
  const td = pinia.tCellRaces.get(key) as HTMLTableCellElement
  const { THEAD_HEIGHT, scrollY } = pinia
  const { top, bottom } = td.getBoundingClientRect()
  return Math.floor(top) <= THEAD_HEIGHT && THEAD_HEIGHT < Math.floor(bottom)
}

</script>

<template>
  <aside :ref="(e) => { pinia.aside = e as HTMLElement }">
    <div class="top" data-index="TOP">
      <span>▲</span>
    </div>
    <div v-for="(race, i) in RACES" :key="race.key" class="anchor" :style="'--color-random:' + colors.at(i)"
      :data-index="race.key" :class="isActive(race.key) ? 'active' : null">
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
  background-color: var(--color-dark2);
  height: 100%;
  /* height: 100vh; */
  /* height: v-bind('pinia.innerHeight+"px"'); */
  width: 1rem;
  /* Flex */
  display: flex;
  flex-direction: column;
  /* Font */
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 0.75rem;
  line-height: 0.75rem;
  color: var(--color-dark);

  & div {
    /* Box */
    margin: 0;
    flex: auto;
    padding: 0 0.125rem;
    background-color: var(--color-light);
    /* Flex */
    display: flex;
    align-items: center;
    /* Border */
    border-width: 2px 0;
    border-style: solid;
    border-color: var(--color-dark2);

    &.active,
    &:hover {
      color: var(--color-random);
      background-color: inherit;
    }

    &.top,
    &.bottom {
      color: var(--color-dark);
      background-color: var(--color-light);
    }

    &.top {
      border-top: 0;
    }

    &.bottom {
      border-bottom: 0;
    }
  }

  @media (orientation: portrait) {
    display: none;
  }
}
</style>
