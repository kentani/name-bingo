import firebase from '@/plugins/firebase'

export default ({ store }) => {
  if (process.client) {
    store.dispatch('onAuth')
  }
}