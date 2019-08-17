<template>
  <div>
    
    <Header></Header>

    <CurrentUser v-if="currentUser" :name="currentUser.name" :image="currentUser.profile_picture"></CurrentUser>

    <router-view></router-view>

    <Footer></Footer>
    
  </div>
</template>

<script>
import Header from './includes/Header'
import Footer from './includes/Footer'
import CurrentUser from './includes/CurrentUser'
import { mapGetters } from 'vuex'

export default {
    components: {
        Header,
        Footer,
        CurrentUser
    },
    computed: {
      ...mapGetters({
        currentUser: 'getUser'
      })
    }
}
</script>

<style>

/* Google Font imports */
@import url('https://fonts.googleapis.com/css?family=Major+Mono+Display|Oxygen+Mono&display=swap');
/* font-family: 'Oxygen Mono', monospace; */

/* general styles */

body{
    margin: 0;
    padding: 0;
    width: 350px;
    overflow: hidden;

    text-align: center;
    font-family: 'Oxygen Mono', monospace;
}

</style>