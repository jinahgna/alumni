<template>
    <div class="login">
        <v-text-field label="ID" hide-details="auto" color="#6fd400"></v-text-field>
        <v-text-field label="PASSWORD" hide-details="auto" color="#6fd400"></v-text-field>
        <div class="wrap-btn">
            <v-btn x-large color="#6fd400" dark>login</v-btn>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import Board from '@/components/Board.vue';

export default {
    name: 'login',
    components: {
        // Board,
    },
    data() {
        return {};
    },
};
</script>

<style scoped>
.login {
    width: 500px;
    margin: 100px auto;
}
.wrap-btn {
    padding: 20px 0;
    text-align: center;
}
.wrap-btn button {
    width: 100%;
}
</style>
