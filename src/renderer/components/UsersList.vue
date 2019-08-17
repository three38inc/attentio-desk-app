<template>
  <div id="team-members">
        <template v-for="(user, index) in users">
            <UserItem :key="index" v-bind="user" v-if="currentUser && user.username != currentUser.username" @click.native="pingUser(user)"></UserItem>
        </template>
  </div>
</template>

<script>
import UserItem from './common/UserItem'
import { mapGetters } from 'vuex'

export default {
    name: 'UsersList',
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
      pingUser(user){
        this.$socket.emit('pingUser', { sender: this.currentUser.username, receiver: user.username })
      }
    }
}
</script>

<style>
    #team-members {
        width:100%;
        height: 100%;
        background-color:white;
        box-sizing:border-box;
        padding: 10px 5px;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:row;
        flex-wrap:wrap;
        align-content:flex-end;
    }
</style>