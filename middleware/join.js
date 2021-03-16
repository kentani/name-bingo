export default async function ({ store, route, redirect }) {
  if (!store.getters.getLoggedIn) {
    return redirect('/')
  }
  else {
    return await redirect('/rooms/' + route.params.roomId + '/players/' + store.getters.getUserInfo.id + '/bingo-card')
  }
}