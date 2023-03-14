import { imageForage } from "@/stores/forage";
import { useImageStore } from "@/stores/image";
import { usePiniaStore } from "@/stores/pinia";
import { Download } from "$/classes";

/* Is Mobile */
export const isMobile = navigator.userAgentData?.mobile ?? !!navigator.userAgent.match(/Mobile/i);

if (localStorage.getItem("LastUpdate") !== __LAST_UPDATE__) {
  localStorage.clear();
  sessionStorage.clear();
  imageForage.clear();
  localStorage.setItem("LastUpdate", __LAST_UPDATE__);
}

export async function setImageForage(node: HTMLElement) {
  if (localStorage.getItem("size")) return;
  const image = useImageStore();
  const { scale, type, quality } = image;
  const download = new Download(node, { scale, type, quality });
  Object.entries(download.options).forEach(
    ([key, value]) => imageForage.setItem(key, value));
  const dataURL = await download.dataURL;
  const sizeMB = 3 / 4 * dataURL.length / Math.pow(2, 20);
  image.size = sizeMB.toFixed(2);
  localStorage.setItem("size", image.size);
  imageForage.setItem("dataURL", dataURL);
  imageForage.setItem("length", dataURL.length);
}

export { imageForage, useImageStore, usePiniaStore };
