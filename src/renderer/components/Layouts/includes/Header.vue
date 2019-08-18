<template>
    <div class="widget-popup__header">
        <div class="widget-popup__header-logo"></div>
        <div class="widget-popup__header-title">Attentio <small id="version">v0.0.2</small></div>
        <div class="widget-popup__header-btns" id="popup-header-buttons">
            <button class="cir-btn settings" title="Attentio Settings" @click="showSettings"><img src="~@/assets/icon-settings.svg" alt=""></button>
            <button class="cir-btn settings" title="Attentio Quit"  @click="quitApplication"><img src="~@/assets/icon-close.svg" alt=""></button>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
    name: 'Header',
    methods: {
        showSettings(){
            if(this.$route.name == 'Settings')
                this.$router.push('/home')
            else
                this.$router.push('/settings')
        },
        quitApplication(){
            ipcRenderer.send('quit-app');
        }
    }
}
</script>

<style>
.widget-popup__header {
    height: 50px;
    background-color: #fff;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 999;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .25);
    border-radius: 0px 0px 10px 10px;

    -webkit-user-select: none;
    -webkit-app-region: drag;
}

.widget-popup__header-logo {
    width: 40px;
    height: 40px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('~@/assets/icons/attentio128.png');
}

.widget-popup__header-title {
    text-align: center;
    font-size: 1em;
    font-weight: bold;
    margin-left: 20px;
}

.widget-popup__header-title small{
    font-size: 0.75em;
    opacity: 0.5;
}

.widget-popup__header-btns {
    display: flex;
    -webkit-app-region: no-drag;
}

.widget-popup__header-btns .cir-btn {
    padding: 0;
    width: 24px;
    height: 24px;
    margin-right: 16px;
    background-color: rgba(255, 255, 255, 0.13);
    opacity: 0.5;
    border: 0;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s ease opacity, 0.3s ease transform;
    outline: none;
    -webkit-app-region: no-drag;
}

.widget-popup__header-btns .cir-btn img{
    width: 100%;
    height: auto;
    -webkit-app-region: no-drag;
}

.widget-popup__header-btns .cir-btn:hover{
    opacity: 0.9;
    transform: rotate(90deg);
}

.widget-popup__header-btns .cir-btn:last-child {
    margin-right: 0;
}
</style>