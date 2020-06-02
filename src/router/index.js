import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/PageHome'
import ThreadShow from '@/pages/PageThreadShow'
import NotFound from '@/pages/PageNotFound'
import Forum from '@/pages/PageForum'

/*
This is how you would use Vue Router
if it wasn't present in your application
*/
Vue.use(Router)

/*
The routes option is an array of objects,
where each object maps a path to a name and
a component.
*/
export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageHome',
      component: Home
    },
    {
      // Each part of the path separated by a slash
      // is a dynamic segment. A dynamic segment is
      // defined with a colon.
      // By setting the props option to true, Vue router
      // is going to automatically pass in dynamic segments
      // as props with a proper variable name to the component to be rendered.
      /*
      Since the threadshow loads the PageThreadShow component, we're importing all
      of its dependencies in the background. Even though the PageThreadShow component
      does not mount, Vue runs all of the code above the export default statement.
      */
      path: '/thread/:id',
      name: 'ThreadShow',
      component: ThreadShow,
      props: true
    },
    {
      path: '/forum/:id',
      name: 'Forum',
      component: Forum,
      props: true
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
})
