import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/Layouts/AppLayout').default,
      redirect: '/home',
      children: [
        {
          name: 'Home',
          path: '/home',
          component: require('@/components/UsersList').default
        },
        {
          name: 'Settings',
          path: '/settings',
          component: require('@/components/SettingsList').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
