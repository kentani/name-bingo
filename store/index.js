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
  playerListMap: {},
  player: {},
  accountInfo: [],
  roomList: [],
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
  getPlayerListMap(state) {
    return state.playerListMap
  },
  getPlayer(state) {
    return state.player
  },
  getAccountInfo(state) {
    return state.accountInfo
  },
  getRoomList(state) {
    return state.roomList
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

  setPlayerListMap(state, player) {
    state.playerListMap[player.id] = player
  },
  clearPlayerListMap(state) {
    state.player = Object.assign({}, state.player, {})
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

  setRoomList(state, room) {
    state.roomList.push(room)
  },
  clearRoomList(state) {
    state.roomList = []
  },
}

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    if (!req) return
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
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
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
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    })
  },

  async logout({ commit }) {
    firebase.auth().signOut().then(() => {
      Cookies.remove('__session');
      commit('clearAuth')
      console.log("ログアウトしました")
    })
    .catch( (error)=>{
      Cookies.remove('__session');
      // commit('clearAuth')
      console.log(`ログアウト時にエラーが発生しました (${error})`)
    });
  },

  async createRoom({ commit }, { roomName, note, playerName, authId }) {

    const roomArgs = {
      name: roomName,
      note: note,
      adminList: [],
      creatorList: [],
      joinedList: [],
      hitList: [],
      reachList: [],
      bingoList: [],
    }

    roomsRef.add(roomArgs).then((roomRef) => {

      roomsRef.doc(roomRef.id).update({ id: roomRef.id }).then(() => {

        const playerArgs = {
          authId: authId,
          roomId: roomRef.id,
          name: playerName,
          note: '',
          profile: '',
          selectList: [],
        }
  
        playersRef.add(playerArgs).then((playerRef) => {
  
          playersRef.doc(playerRef.id).update({ id: playerRef.id }).then(() => {

            playersRef.doc(playerRef.id).get().then(function(doc) {
              commit('setPlayer', doc.data())
            })

            roomsRef.doc(roomRef.id).update({
              adminList: firebase.firestore.FieldValue.arrayUnion(playerRef.id),
              joinedList: firebase.firestore.FieldValue.arrayUnion(playerRef.id),
            }).then(() => {
              roomsRef.doc(roomRef.id).get().then(function(doc) {
                commit('setRoom', doc.data())
              })
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
      selectList: [],
    }

    playersRef.add(args).then((playerRef) => {
      playersRef.doc(playerRef.id).update({ id: playerRef.id }).then(() => {

        playersRef.doc(playerRef.id).get().then(function(doc) {
          commit('setPlayer', doc.data())
        })

        roomsRef.doc(roomId).update({ joinedList: firebase.firestore.FieldValue.arrayUnion(playerRef.id) }).then(() => {
          roomsRef.doc(roomId).get().then(function(doc) {
            commit('setRoom', doc.data())
          })
        })
      })
    })
  },

  async creatorJoinRoom({ commit }, { roomId, playerId }) {
    await roomsRef.doc(roomId).update({ joinedList: firebase.firestore.FieldValue.arrayUnion(playerId) }).then(() => {
      roomsRef.doc(roomId).get().then(function(doc) {
        commit('setRoom', doc.data())
      })
    })
  },

  async updateRoom({ commit }, { name, note, roomId }) {
    await roomsRef.doc(roomId).update({ name: name, note: note }).then(() => {
      roomsRef.doc(roomId).get().then(function(doc) {
        commit('setRoom', doc.data())
      })
    })
  },

  async addHit({ commit }, { roomId, playerId }) {
    await roomsRef.doc(roomId).update({ hitList: firebase.firestore.FieldValue.arrayUnion(playerId) }).then(() => {
      roomsRef.doc(roomId).get().then(function(doc) {
        commit('setRoom', doc.data())
      })
    })
  },

  async resetHit({ commit }, { roomId }) {
    await roomsRef.doc(roomId).update({ hitList: [], reachList: [], bingoList: [] }).then(() => {
      roomsRef.doc(roomId).get().then(function(doc) {
        commit('setRoom', doc.data())
      })
    })
  },

  async addReach({ commit }, { roomId, reachList }) {
    await roomsRef.doc(roomId).update({ reachList: reachList }).then(() => {
      roomsRef.doc(roomId).get().then(function(doc) {
        commit('setRoom', doc.data())
      })
    })
  },

  async addBingo({ commit }, { roomId, bingoList }) {
    await roomsRef.doc(roomId).update({ bingoList: bingoList }).then(() => {
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

  async fetchRoom({ commit }, { roomId }) {
    await commit('clearRoom')
    await roomsRef.doc(roomId).onSnapshot({ includeMetadataChanges: true }, (doc) => {
      commit('setRoom', doc.data())
    });
  },

  async fetchPlayerListMap({ commit }, { roomId }) {
    await commit('clearPlayerListMap')
    await playersRef.where("roomId", "==", roomId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commit('setPlayerListMap', doc.data())
      });
    })
  },

  async fetchPlayer({ commit }, { roomId, playerId }) {
    await commit('clearPlayer')
    await playersRef.where("roomId", "==", roomId).where("id", "==", playerId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        commit('setPlayer', doc.data())
      });
    })
  },

  async fetchPlayerByAuth({ commit }, { roomId, authId }) {
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
  },

  async fetchRoomList({ commit }) {
    await commit('clearRoomList')
    await roomsRef.doc(roomId).get().then((doc) => {
      commit('setRoomList', doc.data())
    });
  }
}
