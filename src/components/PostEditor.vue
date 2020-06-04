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
          <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghot">Cancel</button> 
          <button class="btn-blue">{{isUpdate ? 'Update' : 'Submit post'}}</button>
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
      type: Object,
      validator: obj => {
        const keyIsValid = typeof obj['.key'] === 'string'
        const textIsValid = typeof obj.text === 'string'

        const valid = keyIsValid && textIsValid
        if (!textIsValid) {
          console.error('The post prop object must contain the text attributes')
        } else if (!keyIsValid) {
          console.error('the post prop object must contain the key attribute')
        }

        return valid
      }
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

    cancel () {
      this.$emit('cancel')
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