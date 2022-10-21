<script setup lang="ts">
import { ref, onBeforeUpdate, onMounted } from 'vue'
import { RACES, THEADS } from '$/config'
// shuffle colors
const colors = THEADS
  .filter(({ color }) => color)
  .map(({ color }) => color)
  .sort(() => Math.random() - 0.5)
// window.scrollY
const { y } = defineProps<{
  y: number
}>()
const scrollBottom = ref<number>(0)
// List of each td.race's scrollY
const tdRaceTop = ref<number[]>([])
// Index of last span.anchor.active
const anchorIndex = ref<number>(0)
// List of span.anchor
const anchorList = ref<HTMLSpanElement[]>([])
// clickHandler to scrollTo 
function scrollTo(e: MouseEvent) {
  const path = (e.composedPath() as HTMLElement[])
  const span = path.filter(e => {
    const list = String(e.className).split(' ')
    return list.includes('anchor')
  })[0]
  // click scrollTo first row of correspond race
  const index = anchorList.value.indexOf(span)
  const scrollY = tdRaceTop.value[index] + 4
  window.scrollTo({ top: scrollY, behavior: 'smooth' })

  if (span.classList.contains('top')) {
    // click top anchor scrollTo Top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else if (span.classList.contains('bottom')) {
    window.scrollTo({ top: scrollBottom.value, behavior: 'smooth' })
  }
}

onMounted(() => {
  scrollBottom.value = document.body.scrollHeight - window.innerHeight
  // THead OffsetHeight
  const thead = document.querySelector('thead') as HTMLTableSectionElement
  // Set tdRaceTop
  document.querySelectorAll('td.race').forEach(tdRace => {
    const { top }: { top: number } = tdRace.getBoundingClientRect()
    console.log(y);
    
    tdRaceTop.value.push(top + y - thead.offsetHeight)
  })
  // Set anchorList
  anchorList.value = Array
    .from(document.querySelectorAll('.anchor'))
    .slice(1, -1) as HTMLSpanElement[]
  // Set Initial span.active
  const asp = sessionStorage.getItem('arp_scroll_position')
  if (asp !== null) {
    const postion = +asp
    window.scrollTo({ top: postion })

    const index = tdRaceTop.value.concat(y).sort((a, b) => a - b).indexOf(y)

    if (index >= tdRaceTop.value.length) {
      anchorIndex.value = tdRaceTop.value.length-1
    }
    else anchorIndex.value = index

  }
  anchorList.value[anchorIndex.value].classList.add('active')
})

onBeforeUpdate(() => {
  function set_active(index: number) {
    const lastIndex = index - 1
    anchorList.value[lastIndex].classList.remove('active')
    anchorList.value[index].classList.add('active')
  }
  const index = anchorIndex.value =
    tdRaceTop.value.concat(y).sort((a, b) => a - b).indexOf(y)
  if (index >= tdRaceTop.value.length) { }
  else if (index <= 0) { }
  else set_active(index - 1)
})
</script>

<template>
  <aside @click="scrollTo">
    <span class="anchor top"><span>▲</span></span>
    <span v-for="(r,i) in RACES" :key="r" class="anchor" :style="{'color':colors.at(i)}">
      <span>{{r}}</span>
    </span>
    <span class="anchor bottom"><span>▼</span></span>
  </aside>
  <div class="top-data">
    <span v-for="num in tdRaceTop" :key="num">{{num.toFixed(2)}}</span>
  </div>
</template>

<style scoped lang="postcss">
div.top-data {
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;

  & span {
    color: white;
    font-size: 1rem;
  }
}

aside {
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
}

.anchor {
  flex: auto;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  cursor: pointer;
  margin: 0.0625rem 0;
  padding: 0 0.125rem;

  &.active,
  &:hover {
    background-color: var(--color-light);

    & span {
      color: var(--color-dark)
    }
  }

  &.top,
  &.bottom {
    color: var(--color-dark);
    background-color: var(--color-light);
  }
}
</style>
