<template>
  <div>
    <form @submit.prevent="save">
        <div class="form-group">
          <textarea name="" 
          id="" 
          cols="30" 
          rows="10" 
          class="form-input"
          v-model="text"
          >
          </textarea>
        </div>
        <div class="form-actions">
          <button class="btn-blue">Submit post</button>
        </div>
      </form>
  </div>
</template>

<script>
export default {
  props: {
    threadId: {
      type: String,
      required: false
    },

    post: {
      type: Object
    }
  },

  data () {
    return {
      text: this.post ? this.post.text : ''
    }
  },

  computed: {
    isUpdate () {
      return !!this.post
    }
  },

  methods: {
    save () {
      this.persist()
        .then(post => {
          this.$emit('save', {post})
        })
    },

    create () {
      const post = {
        text: this.text,
        threadId: this.threadId
      }

      this.text = ''

      /*
      !!! IMPORTANT !!!
      Custom events are very cool and very useful.
      You just emit them and then listen to them using the v-on
      directive.
      */
      this.$emit('save', {post})
      this.$store.dispatch('createPost', post)
    },

    update () {
      const payload = {
        id: this.post['.key'],
        text: this.text
      }

      return this.$store.dispatch('updatePost', payload)
    },

    persist () {
      return this.isUpdate ? this.update() : this.create()
    }
  }
}
</script>