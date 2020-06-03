<template>
  <div v-if="thread[id] !== null">
    <div class="col-large push-top">
      <!-- The double moustache syntax allows you to embed javascript expressions
      inside HTML syntax -->
      <h1>{{thread.title}}</h1>
      <p>
        By <a href="#" class="link-unstyled">Robin</a>, <AppDate :timestamp="thread.publishedAt"/>.
      </p>
      <PostList :posts="posts"/>
      <!-- Use the @ Vue directive to respond to events! -->
      <PostEditor
        :threadId="id"
        @save="addPost"
      />
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'
import sourceData from '@/data.json'

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
        return sourceData.posts[postId]
      })

      // alternative way
      // Object.values(sourcedata.posts)
      //   .filter(post => postIds.includes(post['.key']))

      return postArray
    }
  },

  data () {
    return {
      thread: sourceData.threads[this.id],
      newPostText: ''
    }
  },

  methods: {
    addPost ({post}) {
      const postId = post['.key']

      this.$set(sourceData.posts, postId, post)
      this.$set(this.thread.posts, postId, postId)
      this.$set(sourceData.$users[post.userId].posts, postId, postId)
    }
  }
}
</script>