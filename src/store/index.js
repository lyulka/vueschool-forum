import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser (state) {
      return state.users[state.authId]
    }
  },

  actions: {
    createPost ({commit, state}, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.publishedAt = Math.floor(Date.now() / 1000)
      post.userId = state.authId

      commit('setPost', {post, postId})
      commit('appendPostToThread', {threadId: post.threadId, postId})
      commit('appendPostToUser', {userId: post.userId, postId})
    },

    updateUser ({commit}, user) {
      commit('setUser', {userId: user['.key'], user: user})
    }
  },

  mutations: {
    setPost (state, {post, postId}) {
      // set post
      Vue.set(state.posts, postId, post)
    },

    setUser (state, {user, userId}) {
      // set post
      Vue.set(state.users, userId, user)
    },

    appendPostToThread (state, {postId, threadId}) {
      const thread = state.threads[threadId]

      // append post to a thread
      Vue.set(thread.posts, postId, postId)
    },

    appendPostToUser (state, {postId, userId}) {
      const user = state.users[userId]

      // append post to a user
      Vue.set(user.posts, postId, postId)
    }
  }
})
