<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RACES, TABLE_HEADS } from '$/config'
import { ScrollBehavior } from '$/types'

// Table Head Offset Height
const H = ref(0)
onMounted(() => {
  const thead = document.querySelector('thead') as HTMLTableSectionElement
  H.value = thead.offsetHeight
})

/* Shuffle Colors */
const colors = TABLE_HEADS
  .filter(({ color }) => color)
  .map(({ color }) => color)
  .sort(() => Math.random() - 0.5)

/* clickHandler to scrollTo */
function scrollTo(e: MouseEvent) {
  function scrollIntoViewOffset(element: Element,
    { behavior = 'smooth', offset = 0 }: { behavior?: ScrollBehavior, offset?: number },
  ) {
    const { top: elementTop } = element.getBoundingClientRect()
    const top = elementTop + window.scrollY - offset
    window.scrollTo({ top, behavior })
  }

  const path = (e.composedPath() as HTMLElement[])
  const span = path.filter(e => e.className).at(0) as HTMLElement
  const index = Number(span.dataset.index as string)

  switch (index) {
    case Number.NEGATIVE_INFINITY: {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      break
    }
    case Number.POSITIVE_INFINITY: {
      const bottom = document.body.scrollHeight - window.innerHeight
      window.scrollTo({ top: bottom, behavior: 'smooth' })
      break
    }
    default: {
      const td = document.querySelectorAll('td.race')[index]
      scrollIntoViewOffset(td, { offset: H.value })
      break
    }
  }
}
</script>

<template>
  <aside @click="scrollTo">
    <div class="top" :data-index="Number.NEGATIVE_INFINITY">
      <span>▲</span>
    </div>
    <div v-for="(r,i) in RACES" :key="r" class="anchor" :style="{'color':colors.at(i)}" :data-index="i">
      <span>{{r}}</span>
    </div>
    <div class="bottom" :data-index="Number.POSITIVE_INFINITY">
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
