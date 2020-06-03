<template>
  <div id="app">
    <TheNavbar/>
    <div class="container push-top">
      <!-- A functional component that renders the matched component
      for the active route. -->
      <router-view/>
    </div>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'

export default {
  components: {
    TheNavbar
  }
}
</script>

<style>
@import "assets/css/style.css";
/* If you want to import a stylesheet from a node module
you can target it using the tilde prefix that is provided by
css-loader.  */
</style>
