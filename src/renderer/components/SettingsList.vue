<template>
  <div id="select-user">
    <template v-for="(user, index) in users">
        <UserItem :key="index" v-bind="user" v-if="currentUser && user.username != currentUser.username" @click.native="setUsername(user)"></UserItem>
    </template>
  </div>
</template>

<script>
import UserItem from './common/UserItem'
import { mapGetters } from 'vuex'

export default {
    name: 'SettingsList',
     components:{
        UserItem
    },
    mounted(){
      this.$store.dispatch('getUsers')
    },
    computed: {
      ...mapGetters({
        users: 'getUsers',
        currentUser: 'getUser'
      })
    }, 
    methods:{
        setUsername(user){
            // this.$localStorage.set('currentUser', JSON.stringify(user))
            this.$store.dispatch('setUser', user)
            this.$router.push('/home')
        }
    }
}
</script>

<style>

#select-user {
    width:100%;
    height: 100%;
    background: #fff;
    box-sizing:border-box;
    padding: 10px 5px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:row;
    flex-wrap:wrap;
    align-content:flex-end;
}

#select-user figure{
    animation: wiggle 0.15s ease-in-out 0s infinite;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

@keyframes wiggle {
	0% {transform:rotate(2deg);}
	50% {transform:rotate(-2deg);}
	100% {transform:rotate(2deg);}
}
</style>