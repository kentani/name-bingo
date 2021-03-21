export default function ({ store, redirect }) {
  console.log("before")
  if (!store.getters.getLoggedIn) {
    console.log("after")
    return redirect('/')
  }
}