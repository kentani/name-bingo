import firebase from '~/plugins/firebase'

export const state = () => ({
  user: null,
  isLogind: false
})

export const getters = {
  getUser(state) {
    return state.user
  },
  getIsLogind(state) {
    return state.isLogind
  }
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setIsLogind(state, isLogind) {
    state.isLogind = isLogind
  },
}

export const actions = {
  login({ commit }) {
    firebase.auth().signInAnonymously()
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            commit('setIsLogind', true)
          }
        });
      })
      .catch((error) => {
        console.log("errorCode:", error.code)
        console.log("errorMessage:", error.message)
      });
  },
  fetchCurrentUser({ commit }) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        commit('setIsLogind', true)
      }
    });
  }
}
