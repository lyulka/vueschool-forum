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
      return Promise.resolve(state.posts[postId])
    },

    createThread ({state, commit, dispatch}, {text, title, forumId}) {
      return new Promise((resolve, reject) => {
        const threadId = 'greatThread' + Math.random()
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)

        const thread = {'.key': threadId, title, forumId, publishedAt, userId}
        commit('setThread', {threadId, thread})
        commit('appendThreadToForum', {forumId, threadId})
        commit('appendThreadToUser', {userId, threadId})

        dispatch('createPost', {text, threadId})
          .then(post => {
            commit('setThread', {threadId, thread: {...thread, firstPostId: post['.key']}})
          })
        resolve(state.threads[threadId])
      })
    },

    updatePost ({state, commit}, {id, text}) {
      return new Promise((resolve, reject) => {
        const post = state.posts[id]
        commit('setPost', {
          postId: id,
          post: {
            ...post,
            text,
            edited: {
              at: Math.floor(Date.now() / 1000),
              by: state.authId
            }
          }
        })
        resolve(post)
      })
    },

    updateThread ({state, commit}, {id, title, text}) {
      return new Promise((resolve, reject) => {
        const thread = state.threads[id]

        const newThread = {...thread, title}

        commit('setThread', {thread: newThread, threadId: id})

        this.dispatch('updatePost', {id: thread.firstPostId, text})
          .then(() => {
            resolve(newThread)
          })
      })
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

    setThread (state, {thread, threadId}) {
      Vue.set(state.threads, threadId, thread)
    },

    appendPostToThread (state, {postId, threadId}) {
      const thread = state.threads[threadId]

      if (!thread.posts) {
        Vue.set(thread, 'posts', {})
      }

      // append post to a thread
      Vue.set(thread.posts, postId, postId)
    },

    appendPostToUser (state, {postId, userId}) {
      const user = state.users[userId]

      if (!user.posts) {
        Vue.set(user, 'posts', {})
      }

      // append post to a user
      Vue.set(user.posts, postId, postId)
    },

    appendThreadToForum (state, {forumId, threadId}) {
      const forum = state.forums[forumId]

      if (!forum.threads) {
        Vue.set(forum, 'threads', {})
      }

      Vue.set(forum.threads, threadId, threadId)
    },

    appendThreadToUser (state, {userId, threadId}) {
      const user = state.users[userId]

      if (!user.threads) {
        Vue.set(user, 'threads', {})
      }

      Vue.set(user.threads, threadId, threadId)
    }
  }
})
