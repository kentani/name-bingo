import firebase from '~/plugins/firebase'

const db = firebase.firestore();
const roomsRef = db.collection('rooms');

export const state = () => ({
  userId: null,
  isLogind: false
})

export const getters = {
  getUserId(state) {
    return state.userId
  },
  getIsLogind(state) {
    return state.isLogind
  }
}

export const mutations = {
  setUserId(state, uid) {
    state.userId = uid
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
            commit('setUserId', user.uid)
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
        commit('setUserId', user.uid)
        commit('setIsLogind', true)
      }
    });
  },
  createRoom({ commit }, { userId, name }) {
    console.log("createRoom", userId, name)
    roomsRef
      .add({
        createdUserId: userId,
        name: name,
      })
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
  },
}
