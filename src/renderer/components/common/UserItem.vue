<template>
    <figure class="member" :data-username="username">
        <img class="profile" :src="profile_picture">
        <figcaption class="name">{{ name }}</figcaption>
    </figure>
</template>

<script>
export default {
    name: 'UserItem',
    props: {
        username: String,
        name: String,
        profile_picture: String
    }
}
</script>

<style>
    figure {
        width: 65px;
        height: 65px;
        display: block;
        margin: 10px;
        margin-bottom: 20px;
        padding: 0;
        box-sizing: content-box;
        color: black;
        cursor: pointer;
        position: relative;
    }

    figure img {
        width: 100%;
        height: auto;
        border-radius: 50%; 
    }

    figure.offline img{
        filter: grayscale(100%)
    } 

    figure img {
        transition: opacity 0.26s ease-out;    
    }
    #select-user:hover img, #select-user:active img,
    #team-members:hover img, #team-members:active img {
        opacity: 0.3;
    }
    #select-user:hover img:hover, #select-user:active img:active,
    #team-members:hover img:hover, #team-members:active img:active {
        opacity: 1;
    }

    figcaption {
        font-size: 0.4rem;
        text-align: center;
    }
</style>