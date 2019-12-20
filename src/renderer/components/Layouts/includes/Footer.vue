<template>
    <div class="widget-popup__footer">
        <div class="widget-popup__footer-logo"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.widget-popup__footer {
    height: 30px;
    background-color: #fff;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 999;
    box-shadow: 0 -3px 5px rgba(0, 0, 0, .15);
    border-radius: 10px 10px 0px 0px;
}

.widget-popup__footer-logo {
    width: 150px;
    height: 25px;
    background-position: center center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('~@/assets/three38-logo.png');
}
</style>