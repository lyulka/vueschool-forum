<template>
    <div class="thread">
        <div>
            <p>
                <!-- Makes creating a link to a named route / component much prettier!  -->
                <!-- the benefit of using a named route instead of a path is that we can change
                the route's path without having to update and refactor our application. -->
                <router-link :to="{name: 'ThreadShow', params: {id: thread['.key']}}">{{thread.title}}</router-link>
            </p>
            <p class="text-faded text-xsmall">
                By <a href="#">{{user.name}}</a>, <AppDate :timestamp="thread.publishedAt"/>.
            </p>
        </div>

        <div class="activity">
            <p class="replies-count">
                {{repliesCount}} replies
            </p>

            <!-- <img class="avatar-medium" src="http://i0.kym-cdn.com/photos/images/facebook/000/010/934/46623-batman_pikachu_super.png" alt=""> -->

            <!-- <div>
                <p class="text-xsmall">
                    <a href="profile.html">Bruce Wayne</a>
                </p>
                <p class="text-xsmall text-faded">2 hours ago</p>
            </div> -->
        </div>
    </div>
</template>

<script>
export default {

  props: {
    thread: {
      required: true,
      type: Object
    }
  },

  // Computed properties are component's
  // functions that performs transformations
  // or calculations. These are reactive.
  // you can use computed properties in the template
  // the same way you use a component's data.
  computed: {
    repliesCount () {
      return this.$store.getters.threadRepliesCount(this.thread['.key'])
    },
    user () {
      return this.$store.state.users[this.thread.userId]
    }
  }
}
</script>