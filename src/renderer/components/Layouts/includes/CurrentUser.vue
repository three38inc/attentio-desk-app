<template>
    <div class="widget-popup__user">
        <div id="user-image" class="widget-popup__user-image" :style="`background-image: url(${image})`"></div>
        <div id="user-name" class="widget-popup__user-title">{{ name }}</div>
    </div>
</template>

<script>
export default {
    name: 'CurrentUser',
    props: {
        name: String,
        image: String
    }
}
</script>

<style>
.widget-popup__user {
    background-color: #fff;
    padding: 25px;
    padding-bottom: 10px;
    margin-top: -10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-size: cover;
    background-repeat: no-repeat;
    background-image: linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%);
    background-image: linear-gradient(-225deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%);
    background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);
    background-image: linear-gradient(to top, #e14fad 0%, #f9d423 100%);
    background-image: linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%);
}

.widget-popup__user-image {
    width: 75px;
    height: 75px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('~@/assets/icons/attentio128.png');
    border-radius: 50%;
    border: solid 1px #fff;
    box-shadow: 0px 3px 10px rgba(0,0,0,0.75);
}

.widget-popup__user-title {
    margin-top: 15px;
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
    text-shadow: 0px 0px 10px rgba(0,0,0,0.75);
}
</style>