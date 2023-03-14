import { defineStore } from "pinia";
import { usePiniaStore } from "./pinia";
import { isMobile } from "$/store";

export const useImageStore = defineStore("image", {
  state: () => ({
    name: usePiniaStore().TABLE_CAPTION,
    size: "…",
    scale: isMobile ? 1 : 1.25,
    type: isMobile ? "image/jpeg" : "image/png",
    quality: isMobile ? 0.92 : undefined,
  }),
  getters: {
    fileName: (state) => {
      const ext = state.type.split("/").at(-1);
      return `${state.name}.${ext}`;
    },
  },
});
