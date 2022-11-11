<script lang="ts">
  import { fade } from 'svelte/transition'
  import { RACES, TABLE_HEADS } from '$lib/config'
  import {
    innerHeight,
    innerWidth,
    mainWidth,
    tHeadHeight,
    tCellRace,
  } from '$lib/store'

  /* Random Colors */
  const colors = TABLE_HEADS.filter(({ color }) => color)
    .map(({ color }) => color)
    .sort(() => Math.random() - 0.5)

  /* Sider Visibility  */
  const charLength = RACES.map(({ value }) => value).join('').length + 2
  $: siderVisibility =
    $innerHeight >= charLength * 18 * 0.75 && $innerWidth >= $mainWidth + 16 * 2

  function handleClick(
    event: MouseEvent,
    offset: number,
    map: Map<string, HTMLElement>
  ) {
    if (event.target instanceof HTMLElement) {
      const behavior = 'smooth'
      const div = event.target.closest('div') as HTMLDivElement
      const index = div.dataset.index as string
      switch (index) {
        case 'TOP': {
          window.scrollTo({ top: 0, behavior })
          break
        }
        case 'BOTTOM': {
          const bottom = document.body.scrollHeight - window.innerHeight
          window.scrollTo({ top: bottom, behavior })
          break
        }
        default: {
          const td = map.get(index) as HTMLTableCellElement
          const tdTop = td.getBoundingClientRect().top
          const top = tdTop + window.scrollY - offset
          window.scrollTo({ top, behavior })
          break
        }
      }
    }
  }
</script>

{#if siderVisibility}
  <aside
    transition:fade
    on:keydown
    on:mouseup={event => handleClick(event, $tHeadHeight, tCellRace)}
  >
    <div
      class="top"
      data-index="TOP"
    >
      <span>▲</span>
    </div>
    {#each RACES as race, index}
      <div
        class="anchor"
        data-index={race.key}
        style={'--color-random:' + colors.at(index)}
      >
        <span>{race.value}</span>
      </div>
    {/each}
    <div
      class="bottom"
      data-index="BOTTOM"
    >
      <span>▼</span>
    </div>
  </aside>
{/if}

<style lang="postcss">
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
    font-family: var(--font-sans);
    font-weight: 700;

    & div {
      z-index: var(--zindex-fixed);
      cursor: pointer;
      /* Box */
      margin: 0;
      flex: auto;
      padding: 0 0.125rem;
      /* Flex */
      display: flex;
      align-items: center;
      /* Font */
      font-size: 0.75rem;
      line-height: 0.75rem;
      color: var(--color-dark);
      background-color: var(--color-light);
      /* Border */
      border-width: 2px 0;
      border-style: solid;
      border-color: var(--color-dark2);

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
