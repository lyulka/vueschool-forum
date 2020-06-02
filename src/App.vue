<template>
  <div id="app">
    <div class="container">
      <!-- A functional component that renders the matched component
      for the active route. -->
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style>
@import "assets/css/style.css";
/* If you want to import a stylesheet from a node module
you can target it using the tilde prefix that is provided by
css-loader.  */
</style>
