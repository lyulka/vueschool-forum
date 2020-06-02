<template>
  <div class="col-full">
      <h1>Welcome to the forum</h1>
    <ForumList
      v-for="" 
      :forums="forums"/>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import ForumList from '@/components/ForumList'
console.log(sourceData)

// This is how you 'declare' and export a component
// which can be registered and reused later.
// Function syntax and object property syntax is interchangeable.

// You can later import this component into another component
// and use it as if it was just a simple HTML component; like React!
export default {
  /*
    We put in a component's
    child component (dependencies) inside
    the components property of the exported component.
  */
  components: {
    ForumList
  },

  data () {
    return {
      categories: Object.values(sourceData.categories),
      forums: Object.values(sourceData.forums),
      posts: sourceData.posts,
      users: sourceData.users
    }
  }
}
</script>