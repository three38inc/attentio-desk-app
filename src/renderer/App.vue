<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'attentio-desk-app',
    computed: {
      ...mapGetters({
        currentUser: 'getUser'
      })
    },
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
        pingUser: function (data) {
            console.log('got', data)
            if(data.receiver.username == this.currentUser.username){
              let notifyAudio = new Audio('static/audio/notify.mp3');
              notifyAudio.play();
              
              let myNotification = new Notification(`Hey ${data.receiver.name}!`, {
                silent: true,
                body : data.message,
                icon: data.sender.profile_picture,
                requireInteraction: true
              })
            }
        }
    },
  }
</script>

<style>
  /* CSS */
  @import "~bulma/css/bulma.css";

  ::-webkit-scrollbar {
      display: none;
  }
</style>
