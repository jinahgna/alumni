<template>
    <div class="join">
        <v-text-field label="ID" hide-details="auto" color="#6fd400" v-model="userId"></v-text-field>
        <v-text-field label="PASSWORD" hide-details="auto" color="#6fd400" v-model="userPassword"></v-text-field>
        <v-text-field label="NAME" hide-details="auto" color="#6fd400" v-model="userName"></v-text-field>
        <v-text-field label="ADDRESS" hide-details="auto" color="#6fd400" v-model="userAddress"></v-text-field>
        <v-text-field label="PHONE" hide-details="auto" color="#6fd400" v-model="userPhone"></v-text-field>
        <v-text-field label="E-MAIL" hide-details="auto" color="#6fd400" v-model="userEmail"></v-text-field>
        <v-radio-group v-model="userGender">
            <v-radio label="FEMALE" value="F" color="#6fd400"></v-radio>
            <v-radio label="MALE" value="M" color="#6fd400"></v-radio>
        </v-radio-group>
        <div class="wrap-btn">
            <v-btn x-large color="#6fd400" dark @click="userAdd">join</v-btn>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';

export default {
    name: 'join',
    data() {
        return {
            userId: '',
            userPassword: '',
            userName: '',
            userAddress: '',
            userPhone: '',
            userEmail: '',
            userGender: '',
        };
    },
    computed: {
        ...mapGetters(['idCheck']),
    },
    methods: {
        async userAdd() {
            const payload = {
                user_id: this.userId,
                user_passwd: this.userPassword,
                user_name: this.userName,
                user_address: this.userAddress,
                user_phone: this.userPhone,
                user_email: this.userEmail,
                user_gender: this.userGender,
            };
            const idCheckData = {
                user_id: this.userId,
            };
            await this.$store.dispatch(commonActionType.ACTION_ID_CHECK, idCheckData);
            if (this.idCheck === 'true') {
                console.log('회원가입 가능');
                console.log('payload', payload);
            } else {
                alert('중복된 아이디 입니다.');
            }
        },
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
