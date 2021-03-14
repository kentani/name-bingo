import firebase from '~/plugins/firebase'

const db = firebase.firestore();
const usersRef = db.collection('users');
const roomsRef = db.collection('rooms');

export const state = () => ({
  authUserId: '',
  loggedIn: false,
  userInfo: {},
  room: {}
})

export const getters = {
  getAuthUserId(state) {
    return state.authUserId
  },
  getLoggedIn(state) {
    return state.loggedIn
  },
  getUserInfo(state) {
    return state.userInfo
  },
  getRoom(state) {
    return state.room
  }
}

export const mutations = {
  setAuthUserId(state, authUserId) {
    state.authUserId = authUserId
  },
  loginStatusChange(state, status) {
    state.loggedIn = status
  },
  setUserInfo(state, userInfo) {
    state.userInfo = Object.assign({}, state.userInfo, userInfo)
  },
  setRoom(state, room) {
    state.room = Object.assign({}, state.room, room)
  },
  clearUserInfo(state) {
    state.userInfo = Object.assign({}, state.userInfo, {})
  },
  clearRoom(state) {
    state.room = Object.assign({}, state.room, {})
  },
}

export const actions = {
  login({ commit }, { name }) {
    firebase.auth().signInAnonymously()
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            commit('setAuthUserId', user.uid)
            commit('loginStatusChange', user.uid ? true : false)
          }
          usersRef
            .add({
              name: name,
              authUserId: user.uid,
              createdRoomList: [],
              joinedRoomList: [],
            })
            .then((docRef) => {
              usersRef
                .doc(docRef.id)
                .update({
                  id: docRef.id,
                })
                .then(() => {
                  usersRef
                    .doc(docRef.id)
                    .get()
                    .then(function(doc) {
                      commit('setUserInfo', doc.data())
                    })
                })
            })
        })
      })
      .catch((error) => {
        console.log("errorCode:", error.code)
        console.log("errorMessage:", error.message)
      });
  },
  createUser({ commit }, { name, authUserId }) {
    usersRef
      .add({
        name: name,
        authUserId: authUserId,
      })
      .then((docRef) => {
        usersRef
          .doc(docRef.id)
          .update({
            id: docRef.id,
          })
          .then(() => {
            usersRef
              .doc(docRef.id)
              .get()
              .then(function(doc) {
                commit('setUserInfo', doc.data())
              })
          })
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },
  createRoom({ commit }, { name, user }) {
    roomsRef
      .add({
        name: name,
        createdUser: { id: user.id, name: user.name },
        adminList: [{ id: user.id, name: user.name }],
        joinedUserList: [],
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
                const room = doc.data()
                usersRef
                  .doc(user.id)
                  .update({
                    createdRoomList: firebase.firestore.FieldValue.arrayUnion({
                      id: room.id,
                      name: room.name,
                      to: '/rooms/' + room.id + '/settings',
                    }),
                  })
                  .then(() => {
                    usersRef
                      .doc(user.id)
                      .get()
                      .then(function(doc) {
                        commit('setUserInfo', doc.data())
                      })
                  })
                commit('setRoom', doc.data())
              })
          })
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  },
  joinRoom({ commit }, { user, roomId }) {
    roomsRef
      .doc(roomId)
      .update({
        joinedUserList: firebase.firestore.FieldValue.arrayUnion({
          id: user.id,
          name: user.name,
        }),
      })
      .then(() => {
        roomsRef
          .doc(roomId)
          .get()
          .then(function(doc) {
            const room = doc.data()
            usersRef
              .doc(user.id)
              .update({
                joinedRoomList: firebase.firestore.FieldValue.arrayUnion({
                  id: room.id,
                  name: room.name,
                  to: '/rooms/' + room.id + '/settings',
                }),
              })
              .then(() => {
                usersRef
                  .doc(user.id)
                  .get()
                  .then(function(doc) {
                    commit('setUserInfo', doc.data())
                  })
              })
            commit('setRoom', doc.data())
          })
      })
  },
  onAuth({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setAuthUserId', user.uid)
        commit('loginStatusChange', user.uid ? true : false)
      }
    })
  },
  fetchUserInfo({ commit }, { authUserId }) {
    commit('clearUserInfo')
    usersRef
      .where("authUserId", "==", authUserId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          commit('setUserInfo', doc.data())
        });
      })
  },
  fetchRoom({ commit }, { roomId }) {
    commit('clearRoom')
    roomsRef
      .doc(roomId)
      .get()
      .then(function(doc) {
        commit('setRoom', doc.data())
      })
  },
  clearRoom({ commit }) {
    commit('clearRoom')
  }
}
