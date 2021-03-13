import firebase from '~/plugins/firebase'

const db = firebase.firestore();
const roomsRef = db.collection('rooms');

export const state = () => ({
  userId: null,
  isLogind: false,
  room: {}
})

export const getters = {
  getUserId(state) {
    return state.userId
  },
  getIsLogind(state) {
    return state.isLogind
  },
  getRoom(state) {
    return state.room
  }
}

export const mutations = {
  setUserId(state, uid) {
    state.userId = uid
  },
  setIsLogind(state, isLogind) {
    state.isLogind = isLogind
  },
  setRoom(state, room) {
    state.room = Object.assign({}, state.room, room)
  }
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
  createRoom({ commit }, { name, userId }) {
    roomsRef
      .add({
        name: name,
        createdUser: userId,
        administrators: [userId],
      })
      .then((docRef) => {
        roomsRef
          .doc(docRef.id)
          .update({
            id: docRef.id,
          })
          .then(() => {
            roomsRef
              .doc(docRef.id)
              .get()
              .then(function(doc) {
                commit('setRoom', doc.data())
              })
          })
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },
}
