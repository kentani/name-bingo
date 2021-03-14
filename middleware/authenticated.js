export default function ({ store, redirect }) {
  if (!store.getters.getLoggedIn) {
    return redirect('/')
  }
}