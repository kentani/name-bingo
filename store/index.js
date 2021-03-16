import firebase from '~/plugins/firebase'
import Cookies from 'js-cookie'

const cookieparser = process.server ? require('cookieparser') : undefined
const admin = process.server ? require('~/plugins/firebaseAdmin').default : undefined
const db = firebase.firestore();
const usersRef = db.collection('users');
const roomsRef = db.collection('rooms');

export const state = () => ({
  authUserId: '',
  loggedIn: false,
  userInfo: {},
  room: {},
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
  },
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
  clearAuth(state) {
    state.authUserId = ''
    stete.loggedIn = false
  },
}

export const actions = {
  async login({ commit }, { name }) {
    firebase.auth().signInAnonymously().then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            Cookies.set('__session', idToken)
            commit('setAuthUserId', user.uid)
            commit('loginStatusChange', user.uid ? true : false)
          })
          .catch(function(error) {
          })
        }
        usersRef
          .add({
            name: name,
            authUserId: user.uid,
            createdRoomList: [],
            joinedRoomList: [],
            bingoUserList: [],
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
    })
  },
  async logout({ commit }) {
    firebase.auth().signOut().then(()=>{
      Cookies.remove('__session');
      commit('clearAuth')
      commit('clearUserInfo')
      console.log("ログアウトしました");
    })
    .catch( (error)=>{
      Cookies.remove('__session');
      console.log(`ログアウト時にエラーが発生しました (${error})`);
    });
  },
  async onAuth({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setAuthUserId', user.uid)
        commit('loginStatusChange', user.uid ? true : false)
      }
      else {
      }
    })
  },
  async nuxtServerInit ({ commit }, { req }) {
    if (req.headers.cookie) {
      try {
        const idToken = await cookieparser.parse(req.headers.cookie).__session
        let authId = ''
        await admin.auth().verifyIdToken(idToken).then((decodedToken) => {
          authId = decodedToken
          commit('setAuthUserId', decodedToken.uid)
          commit('loginStatusChange', decodedToken.uid ? true : false)
        })
        .catch((error) => {
          console.log("invalidToken", error)
        })
        await admin.firestore().collection('users').where("authUserId", "==", authId.uid).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            commit('setUserInfo', doc.data())
          })
        })
        .catch((error) => {
          console.log("invalidUserInfo", error)
        })
      } catch (err) {
        console.log("error", err)
      }
    }
  },
  setUser({ commit }, { userId, list }) {
    usersRef
      .doc(userId)
      .update({
        bingoUserList: list,
      })
      .then(() => {
        usersRef
          .doc(userId)
          .get()
          .then(function(doc) {
            commit('setUserInfo', doc.data())
          })
      })
  },
  setUserInfo({ commit }, { userId, name, message, profile }) {
    usersRef
      .doc(userId)
      .update({
        name: name,
        message: message,
        profile: profile,
      })
      .then(() => {
        usersRef
          .doc(userId)
          .get()
          .then(function(doc) {
            commit('setUserInfo', doc.data())
          })
      })
  },
  setUserInfo2({ commit }, { userId, name }) {
    usersRef
      .doc(userId)
      .update({
        name: name,
      })
      .then(() => {
        usersRef
          .doc(userId)
          .get()
          .then(function(doc) {
            commit('setUserInfo', doc.data())
          })
      })
  },
  setRoomInfo({ commit }, { roomId, name, message, profile }) {
    roomsRef
      .doc(roomId)
      .update({
        name: name,
        message: message,
      })
      .then(() => {
        usersRef
          .doc(roomId)
          .get()
          .then(function(doc) {
            commit('setRoom', doc.data())
          })
      })
  },
  createRoom({ commit }, { name, message, user }) {
    roomsRef
      .add({
        name: name,
        message: message,
        createdUser: { id: user.id, name: user.name },
        adminList: [{ id: user.id, name: user.name }],
        joinedUserList: [],
        rouletteList: [],
        resultList: [],
        result: {},
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
                      to: '/rooms/' + room.id + '/admin/settings',
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
        rouletteList: firebase.firestore.FieldValue.arrayUnion({
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
                  to: '/rooms/' + room.id + '/players/' + user.id + '/bingo-card',
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
  updateResult({ commit }, { result, roomId }) {
    roomsRef
      .doc(roomId)
      .update({
        result: result,
      })
      .then(function(doc) {
        roomsRef
          .doc(roomId)
          .get()
          .then(function(doc) {
            commit('setRoom', doc.data())
          })
      })
  },
  updateResultList({ commit }, { result, roomId }) {
    roomsRef
      .doc(roomId)
      .update({
        resultList: firebase.firestore.FieldValue.arrayUnion(result),
      })
      .then(function(doc) {
        roomsRef
          .doc(roomId)
          .get()
          .then(function(doc) {
            commit('setRoom', doc.data())
          })
      })
  },
  resetResultList({ commit }, { roomId }) {
    roomsRef
      .doc(roomId)
      .update({
        result: {},
        resultList: [],
      })
      .then(function(doc) {
        roomsRef
          .doc(roomId)
          .get()
          .then(function(doc) {
            commit('setRoom', doc.data())
          })
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
      .onSnapshot({
        includeMetadataChanges: true
      }, (doc) => {
        commit('setRoom', doc.data())
      });
  },
  clearRoom({ commit }) {
    commit('clearRoom')
  }
}
