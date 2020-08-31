import { writable, readable, derived, get } from 'svelte/store';
import { tailwindConfig } from '../../const'
import {site} from './index'

const store = writable({
  javascript: '',
  identity : {
    title: '', 
    url: '',
    description: ''
  }
})

store.subscribe(s => {
  if (site) {
    site.savePageSettings(s)
  } 
})

export default {
  save: (settings) => {
    if (typeof settings === 'function') {
      settings = settings(get(store))
      store.set(settings)
    } else if (settings) {
      store.set(settings)
    } else {
      settings = get(store)
    }
  },
  update: store.update,
  set: store.set,
  subscribe: store.subscribe
}


// TODO when saving settings: 
// hydrateAllComponentHTML() // update components with new nav
// await changePageUrl(identity) // change page id in database
// Re-compile styles within components with updated global/page styles