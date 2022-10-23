import localforage from 'localforage'

export const imageForage = localforage.createInstance({
  name: 'image',
})

if (localStorage.getItem('LastUpdate') !== __LAST_UPDATE__) {
  localStorage.clear()
  sessionStorage.clear()
  imageForage.clear()
  localStorage.setItem('LastUpdate', __LAST_UPDATE__)
}
