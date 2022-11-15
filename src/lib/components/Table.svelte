<script lang="ts">
  import type { TDValue } from '$lib/types'
  import { data, rowspan } from '$lib/table.json'
  import { RACES, TABLE_HEADS, SIGN_REPLACE } from '$lib/config'
  import { title, tCellRace } from '$lib/store'

  console.log(import.meta.env)
  /* Table */
  export let table: HTMLTableElement

  /* THead */
  export let offsetHeight: number

  /* TBody */
  const DATA = data.map(item => new Map(Object.entries(item)))
  const ROW_SPAN = new Map<string, number>(Object.entries(rowspan))
  export let tBody: HTMLTableSectionElement | null = null
  const add_class = (v: TDValue) => {
    const c = []
    switch (typeof v) {
      case 'string':
        if (v === 'infinity') c.push('infty')
        break
      case 'number':
        if (v < 0) c.push('minus')
        else if (v >= 75) c.push('gt-75')
        else if (v >= 50) c.push('gt-50')
        else if (v >= 20) c.push('gt-20')
        break
    }
    return c
  }
  const check_data = (v: TDValue) => {
    let t = ''
    switch (typeof v) {
      case 'number':
        t = v + '%'
        break
      case 'string':
        t = v
        SIGN_REPLACE.forEach(({ pattern, replace }) => {
          if (v.match(pattern)) t = t.replace(pattern, replace)
        })
        break
    }
    return t
  }

  /* https://stackoverflow.com/a/58362767/15369811 */
  function TCellRace(node: HTMLTableCellElement) {
    if (node.classList.contains('race')) {
      const [{ key }] = RACES.filter(({ value }) => value === node.innerText)
      node.dataset.key = key
      tCellRace.set(key, node)
    }
  }
</script>

<table bind:this={table}>
  <caption>{$title}</caption>

  <thead bind:offsetHeight>
    <tr>
      {#each TABLE_HEADS as th}
        <th class={th.key}>{th.value}</th>
      {/each}
    </tr>
  </thead>

  <tbody bind:this={tBody}>
    <!-- {#await data then { data, rowspan }}
      {@const DATA = data.map(item => new Map(Object.entries(item)))}
      {@const ROW_SPAN = new Map<string, number>(Object.entries(rowspan))} -->
    {#each DATA as ROW}
      <tr>
        {#each [...ROW] as [key, value]}
          <td
            class="{key} {add_class(value)}"
            rowspan={ROW_SPAN.get(value)}
            use:TCellRace
          >
            {@html check_data(value)}
          </td>
        {/each}
      </tr>
    {/each}
    <!-- {/await} -->
  </tbody>

  <tfoot>
    <tr>
      <td colspan={TABLE_HEADS.length}>
        <p>
          * 来自【空萤酒馆】，初版由巴别塔夜空提供，由 whrily、小明明、羽川raid
          完善、修正，最后由 NGA 吾竟南宫遥保持更新。
        </p>
        <p>
          * 现版又经更新、重制、并会在 <strong>米游社</strong> 和
          <strong>NGA</strong> 一直保持更新。
        </p>
      </td>
    </tr>
  </tfoot>
</table>

<style lang="postcss">
  table {
    min-width: max-content;
    text-align: center;
    border-collapse: separate;
    border-spacing: 0;
    border-color: var(--color-light);
    background-color: var(--color-dark);
    color: var(--color-light);

    & .electro {
      color: var(--color-electro);

      &::selection {
        color: black;
        background: var(--color-electro);
      }
    }

    & .pyro {
      color: var(--color-pyro);

      &::selection {
        color: black;
        background: var(--color-pyro);
      }
    }

    & .hydro {
      color: var(--color-hydro);

      &::selection {
        color: black;
        background: var(--color-hydro);
      }
    }

    & .cryo {
      color: var(--color-cryo);

      &::selection {
        color: black;
        background: var(--color-cryo);
      }
    }

    & .dendro {
      color: var(--color-dendro);

      &::selection {
        color: black;
        background: var(--color-dendro);
      }
    }

    & .anemo {
      color: var(--color-anemo);

      &::selection {
        color: black;
        background: var(--color-anemo);
      }
    }

    & .geo {
      color: var(--color-geo);

      &::selection {
        color: black;
        background: var(--color-geo);
      }
    }

    & .physical {
      color: var(--color-physical);

      &::selection {
        color: black;
        background: var(--color-physical);
      }
    }
  }

  caption {
    /* Box */
    position: relative;
    padding-left: 1.75rem;
    background-color: inherit;
    /* Font */
    font-family: var(--font-serif);
    font-size: 5rem;
    font-weight: 900;
  }

  thead {
    position: sticky;
    top: 0;
    font-family: var(--font-serif);
    font-weight: 900;
    font-size: 2.375rem;
    background-color: var(--color-dark);

    & th {
      padding: 0.375rem 0;
      border-style: solid;
      border-color: var(--color-light);
      border-top-width: var(--border-width-outer);
      border-bottom-width: var(--border-width-inner);
      border-left-width: 0;
      border-right-width: 0;
    }
  }

  tbody {
    font-family: var(--font-sans);
    font-weight: 100;
    font-size: 1.675rem;
    & td {
      padding: 0.1rem;
      border-color: var(--color-light);
      border-style: solid;
      border-top-width: var(--border-width);
      border-bottom-width: var(--border-width);
      border-left-width: 0;
      border-right-width: 0;

      &.race {
        --size: 2rem;
        font-family: var(--font-serif);
        font-weight: 900;
        padding: 0 1.5rem;
        width: var(--size);
        font-size: var(--size);
        line-height: var(--size);
      }

      &.being,
      &.state {
        font-weight: 700;
        font-size: 1.5rem;
      }

      &.minus {
        font-weight: 900;
      }

      &.gt-20 {
        font-weight: 300;
      }

      &.gt-50 {
        font-weight: 500;
      }

      &.gt-75 {
        font-weight: 700;
        font-style: italic;
      }

      &.infty {
        font-weight: 900;
      }
    }
  }

  tfoot {
    font-family: var(--font-sans);
    font-size: 1rem;

    & td {
      padding: 0.5rem;
      border-style: solid;
      border-top-width: var(--border-width-inner);
      border-bottom-width: var(--border-width-outer);
      border-left-width: 0;
      border-right-width: 0;

      & p {
        margin: 0;
      }
    }
  }
</style>
