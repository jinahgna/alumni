<template>
    <div class="join">
        <v-text-field label="NAME" hide-details="auto" color="#6fd400"></v-text-field>
        <v-text-field label="E-MAIL" hide-details="auto" color="#6fd400"></v-text-field>
        <v-text-field label="PHONE" hide-details="auto" color="#6fd400"></v-text-field>
        <v-text-field label="ADDRESS" hide-details="auto" color="#6fd400"></v-text-field>
        <v-radio-group>
            <v-radio label="FEMALE" value="FEMALE" color="#6fd400"></v-radio>
            <v-radio label="MALE" value="MALE" color="#6fd400"></v-radio>
        </v-radio-group>
        <div class="wrap-btn">
            <v-btn x-large color="#6fd400" dark>join</v-btn>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import Board from '@/components/Board.vue' ;

export default {
    name: 'join',
    components: {
        // Board,
    },
};
</script>
<style scoped>
.join {
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
