import firebase from '~/plugins/firebase'
import Cookies from 'js-cookie'

const cookieparser = process.server ? require('cookieparser') : undefined
const admin = process.server ? require('~/plugins/firebaseAdmin').default : undefined
const db = firebase.firestore();
const usersRef = db.collection('users');
const roomsRef = db.collection('rooms');
const playersRef = db.collection('players');

// firebase.firestore.FieldValue.arrayUnion
// onSnapshot({ includeMetadataChanges: true }

export const state = () => ({
  authId: '',
  loggedIn: false,
  room: {},
  playerList: [],
  player: {},
  accountInfo: [],
})

export const getters = {
  getAuthId(state) {
    return state.authId
  },
  getLoggedIn(state) {
    return state.loggedIn
  },
  getRoom(state) {
    return state.room
  },
  getPlayerList(state) {
    return state.playerList
  },
  getPlayer(state) {
    return state.player
  },
  getAccountInfo(state) {
    return state.accountInfo
  },
}

export const mutations = {
  setAuthId(state, authId) {
    state.authId = authId
  },
  changeLoginStatus(state, status) {
    state.loggedIn = status
  },
  clearAuth(state) {
    state.authId = ''
    stete.loggedIn = false
  },

  setRoom(state, room) {
    state.room = Object.assign({}, state.room, room)
  },
  clearRoom(state) {
    state.room = Object.assign({}, state.room, {})
  },

  setPlayerList(state, player) {
    state.playerList.push(player)
  },
  clearPlayerList(state) {
    state.playerList = []
  },

  setPlayer(state, player) {
    state.player = Object.assign({}, state.player, player)
  },
  clearPlayer(state) {
    state.player = Object.assign({}, state.player, {})
  },

  setAccountInfo(state, player) {
    state.accountInfo.push(player)
  },
  clearAccountInfo(state) {
    state.accountInfo = []
  },
}

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    if (!req.headers.cookie) return
    try {
      const idToken = await cookieparser.parse(req.headers.cookie).__session
      if (!idToken) return
      await admin.auth().verifyIdToken(idToken).then((decodedToken) => {
        commit('setAuthId', decodedToken.uid)
        commit('changeLoginStatus', decodedToken.uid ? true : false)
      })
      .catch((error) => {
        console.log("invalidToken", error)
      })
    } catch (err) {
      console.log("error", err)
    }
  },

  async onAuth({ commit }) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('setAuthId', user.uid)
        commit('changeLoginStatus', user.uid ? true : false)
      }
    })
  },

  async login({ commit }) {
    firebase.auth().signInAnonymously().then(() => {

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
            Cookies.set('__session', idToken)
            commit('setAuthId', user.uid)
            commit('changeLoginStatus', user.uid ? true : false)
          })
          .catch(function(error) {
          })
        }
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
      console.log("ログアウトしました")
    })
    .catch( (error)=>{
      Cookies.remove('__session');
      console.log(`ログアウト時にエラーが発生しました (${error})`)
    });
  },

  async createRoom({ commit }, { roomName, note, playerName, authId }) {
    roomsRef.add({ name: roomName, note: note }).then((roomRef) => {
      
      roomsRef.doc(roomRef.id).update({ id: roomRef.id }).then(() => {

        const args = {
          authId: authId,
          roomId: roomRef.id,
          name: playerName,
          note: '',
          profile: '',
          isAdmin: true,
          isCreator: true,
          isJoined: false,
          isHit: false,
          isReach: false,
          isBingo: false,
          selectList: [],
        }
  
        playersRef.add(args).then((playerRef) => {
  
          playersRef.doc(playerRef.id).update({ id: playerRef.id }).then(() => {

            roomsRef.doc(roomRef.id).get().then(function(doc) {
              commit('setRoom', doc.data())
            })

            playersRef.doc(playerRef.id).get().then(function(doc) {
              commit('setPlayer', doc.data())
            })
          })
        })
      })
    })
  },

  async joinRoom({ commit }, { roomId, playerName, authId }) {
    const args = {
      authId: authId,
      roomId: roomId,
      name: playerName,
      note: '',
      profile: '',
      isAdmin: false,
      isCreator: false,
      isJoined: true,
      isHit: false,
      isReach: false,
      isBingo: false,
      selectList: [],
    }

    playersRef.add(args).then((playerRef) => {

      playersRef.doc(playerRef.id).update({ id: playerRef.id }).then(() => {

        roomsRef.doc(roomRef.id).get().then(function(doc) {
          commit('setRoom', doc.data())
        })

        playersRef.doc(playerRef.id).get().then(function(doc) {
          commit('setPlayer', doc.data())
        })
      })
    })
  },

  updateRoom({ commit }, { name, note, roomId }) {
    roomsRef.doc(roomId).update({ name: name, note: note }).then(() => {
      roomsRef.doc(roomId).get().then(function(doc) {
        commit('setRoom', doc.data())
      })
    })
  },

  async updateSelectList({ commit }, { list, playerId }) {
    await playersRef.doc(playerId).update({ selectList: list }).then(() => {
      playersRef.doc(playerId).get().then(function(doc) {
        commit('setPlayer', doc.data())
      })
    })
  },

  async updatePlayerInfo({ commit }, { name, note, profile, playerId }) {
    await playersRef.doc(playerId).update({ name: name, note: note, profile: profile }).then(() => {
      playersRef.doc(playerId).get().then(function(doc) {
        commit('setPlayer', doc.data())
      })
    })
  },

  async updatePlayerHit({ commit }, { isHit, playerId }) {
    await playersRef.doc(playerId).update({ isHit: isHit }).then(() => {
      playersRef.doc(playerId).get().then(function(doc) {
        commit('setPlayer', doc.data())
      })
    })
  },

  async fetchRoom({ commit }, { roomId }) {
    await commit('clearRoom')
    await roomsRef.doc(roomId).get().then((doc) => {
      commit('setRoom', doc.data())
    });
  },

  async fetchPlayerList({ commit }, { roomId }) {
    await commit('clearPlayerList')
    await playersRef.where("roomId", "==", roomId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commit('setPlayerList', doc.data())
      });
    })
  },

  async fetchPlayer({ commit }, { roomId, authId }) {
    await commit('clearPlayer')
    await playersRef.where("roomId", "==", roomId).where("authId", "==", authId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commit('setPlayer', doc.data())
      });
    })
  },

  async fetchAccountInfo({ commit }, { authId }) {
    await commit('clearAccountInfo')
    await playersRef.where("authId", "==", authId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commit('setAccountInfo', doc.data())
      });
    })
  }
}
