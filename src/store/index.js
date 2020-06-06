import Vue from 'vue'
import Vuex from 'vuex'

import {countObjectProperties} from '@/helpers/index'

Vue.use(Vuex)

const makeAppendChildToParentMutation = ({parent, child}) => {
  return (state, {childId, parentId}) => {
    const resource = state[parent][parentId]

    if (!resource[child]) {
      Vue.set(resource, child, {})
    }

    // append post to a thread
    Vue.set(resource[child], childId, childId)
  }
}

export default new Vuex.Store({
  state: {
    categories: {
      'VXjpr2WHa8Ux4Bnggym8QFLdv5C3': 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
    },
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser (state) {
      // return state.users[state.authId]
      return {}
    },

    userThreadsCount: state => id => countObjectProperties(state.users[id].threads),

    userPostsCount: state => id => countObjectProperties(state.users[id].posts),

    threadRepliesCount: state => id => countObjectProperties(state.threads[id].posts) - 1
  },

  actions: {
    createPost ({commit, state}, post) {
      const postId = 'greatPost' + Math.random()
      post['.key'] = postId
      post.publishedAt = Math.floor(Date.now() / 1000)
      post.userId = state.authId

      commit('setPost', {post, postId})
      commit('appendPostToThread', {parentId: post.threadId, childId: postId})
      commit('appendPostToUser', {parentId: post.userId, childId: postId})
      return Promise.resolve(state.posts[postId])
    },

    createThread ({state, commit, dispatch}, {text, title, forumId}) {
      return new Promise((resolve, reject) => {
        const threadId = 'greatThread' + Math.random()
        const userId = state.authId
        const publishedAt = Math.floor(Date.now() / 1000)

        const thread = {'.key': threadId, title, forumId, publishedAt, userId}
        commit('setThread', {threadId, thread})
        commit('appendThreadToForum', {parentId: forumId, childId: threadId})
        commit('appendThreadToUser', {parentId: userId, childId: threadId})

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
      // Vue.set will create the property if it does not exist already.
      Vue.set(state.threads, threadId, thread)
    },

    appendPostToThread: makeAppendChildToParentMutation({parent: 'threads', child: 'posts'}),

    appendPostToUser: makeAppendChildToParentMutation({parent: 'posts', child: 'users'}),

    appendThreadToForum: makeAppendChildToParentMutation({parent: 'threads', child: 'forums'}),

    appendThreadToUser: makeAppendChildToParentMutation({parent: 'threads', child: 'users'})
  }
})
