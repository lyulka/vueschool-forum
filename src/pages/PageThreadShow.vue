<template>
  <div v-if="thread[id] !== null">
    <div class="col-large push-top">
      <!-- The double moustache syntax allows you to embed javascript expressions
      inside HTML syntax -->
      <h1>{{thread.title}}
        <router-link
          :to="{name: 'ThreadEdit', id: this.id}"
          class="btn-green btn-small"
          tag="button"
        >
          Edit Thread
        </router-link>
      </h1>
      <p>
        By <a href="#" class="link-unstyled">Robin</a>, <AppDate :timestamp="thread.publishedAt"/>.
      </p>
      <PostList :posts="posts"/>
      <!-- Use the @ Vue directive to respond to events! -->
      <PostEditor
        :threadId="id"
      />
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'

export default {
  /*
  Remember, registering child components is crucial
  in Vue.
  */

  components: {
    PostList,
    PostEditor
  },

  props: {
    id: {
      required: true,
      type: String
    }
  },

  computed: {
    posts () {
      const postIds = Object.values(this.thread.posts)

      const postArray = postIds.map((postId) => {
        return this.$store.state.posts[postId]
      })

      // alternative way
      // Object.values(sourcedata.posts)
      //   .filter(post => postIds.includes(post['.key']))

      return postArray
    },

    thread () {
      return this.$store.state.threads[this.id]
    }
  }
}
</script>