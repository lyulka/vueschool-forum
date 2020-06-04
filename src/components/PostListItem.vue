<template>
    <div class="post">

      <div class="user-info">
          <a href="#" class="user-name">{{user.name}}</a>

          <a href="#">
              <img class="avatar-large" src="user.avatar" alt="">
          </a>

          <p class="desktop-only text-small">{{userPostsCount}} posts</p>
      </div>

      <div class="post-content">
          <div v-if="!editing">
            {{post.text}}
          </div>
          <div v-else>
            <PostEditor 
              :post="post"
              @save="editing = false"
            />
          </div>
      </div>

      <div class="post-date text-faded">
        <AppDate :timestamp="post.publishedAt"/>
      </div>
  </div>
</template>

<script>
import { countObjectProperties } from '@/helpers/index'
import PostEditor from './PostEditor'

export default {

  components: {
    PostEditor
  },

  data () {
    return {
      editing: true
    }
  },

  props: {
    post: {
      required: true,
      type: Object
    }
  },

  /*
  Using computed properties, we make sure that the user
  will be updated if changes happen within the store.
  */
  computed: {
    user () {
      return this.$store.state.users[this.post.userId]
    },

    userPostsCount () {
      return countObjectProperties(this.user.posts)
    }
  }

}
</script>