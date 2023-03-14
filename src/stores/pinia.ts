import { ref, computed, onMounted, watchEffect } from "vue";
import { defineStore } from "pinia";
import { debounce } from "lodash";
import { SiderEventDelegation } from "$/classes";

export const usePiniaStore = defineStore("pinia", () => {
  const aside = ref<HTMLElement>();
  const table = ref<HTMLTableElement>();
  const button = ref<HTMLButtonElement>();
  const TABLE_CAPTION = `${document.title} v${__APP_VERSION__}`;
  /* Set tableWidth & Side Event Delegation */
  const tableWidth = ref(0);
  const tCellRaces = new Map<string, HTMLTableCellElement>();
  const THEAD_HEIGHT = computed(() => (
    ((table.value as HTMLTableElement)
      .tHead as HTMLTableSectionElement)
      .offsetHeight as number
  ));
  onMounted(() => {
    new ResizeObserver(([entry]) => {
      const { contentRect: { width } } = entry;
      tableWidth.value = Math.ceil(width);
    }).observe(table.value as HTMLTableElement);

    new SiderEventDelegation(
      aside.value as HTMLElement,
      THEAD_HEIGHT.value, tCellRaces,
    );
  });
  /* Set innerWidth & innerHeight & scrollY*/
  const scrollY = ref(window.scrollY);
  const innerWidth = ref(window.innerWidth);
  const innerHeight = ref(window.innerHeight);
  window.addEventListener("resize", debounce(() => {
    innerWidth.value = window.innerWidth;
    innerHeight.value = window.innerHeight;
  }, 20, { "leading": false, "trailing": true }));
  window.addEventListener("scroll", debounce(() => {
    scrollY.value = Math.floor(window.scrollY);
  }, 200, { "leading": false, "trailing": true }));
  /* Set Side Visibility */
  const sideVisibility = ref(false);
  watchEffect(() => {
    const side = aside.value as HTMLElement;
    const lineHeight = Number(getComputedStyle(side).lineHeight.match(/\d+/g));
    const width = Number(getComputedStyle(side).width.match(/\d+/g));
    const isLandscape = innerWidth.value > innerHeight.value;
    const isEnoughWidth = innerWidth.value > tableWidth.value + width * 2;
    const isEnoughHeight = innerHeight.value > side.innerText.length * (lineHeight + 4);
    sideVisibility.value = isLandscape && isEnoughWidth && isEnoughHeight;
  }, { flush: "post" });
  /* Expose */
  return {
    scrollY, innerWidth, innerHeight, tableWidth,
    aside, sideVisibility, table, button, tCellRaces,
    THEAD_HEIGHT, TABLE_CAPTION,
  };
});
