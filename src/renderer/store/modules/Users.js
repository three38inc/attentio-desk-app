import Vue from 'vue'
import axios from 'axios'

const state = {
  users: [],
  currentUser: {
          username: "jobith",
          name: "Jobith M Basheer",
          email: "jobith@three38inc.com",
          image: "jobith.jpg",
          profile_picture: "http://206.189.136.1:3002/static/images/jobith.jpg"
        }
}

const mutations = {
  setUsers (state, users) {
    state.users = users
  },
  setUser(state, user){
    state.currentUser = user
  }
}

const getters = {
  getUsers (state) {
    return state.users
  },
  getUser(state){
    return state.currentUser
  }
}

const actions = {
  getUsers ({ commit }) {
    axios.get('http://206.189.136.1:3002/users')
      .then((response) => {
        commit('setUsers', response.data.users)
      })
      .catch((error) => {
        console.log(error);
      })
  },
  setUser({ commit }, user){
    commit('setUser', user)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
