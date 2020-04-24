<template>
    <v-container>
        <h2>{{ title }}</h2>
        <v-simple-table>
            <template v-slot:default>
                <caption>게시판 글 등록하기</caption>
                <colgroup>
                    <col style="width:75px;" />
                    <col />
                    <col style="width:75px;" />
                    <col />
                    <col style="width:75px;" />
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <th>title</th>
                        <td colspan="5">
                            <input type="text" class="input-write" placeholder="제목을 입력해주세요" />
                        </td>
                    </tr>
                    <tr>
                        <th class="va-top">content</th>
                        <td colspan="5" class="pl-4 pt-4 pb-4 pr-0">
                            <div>
                                <textarea
                                    name
                                    id
                                    cols="30"
                                    rows="10"
                                    class="input-write"
                                    placeholder="글을 입력해주세요"
                                ></textarea>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <!-- button area -->
        <div class="text-right">
            <v-btn depressed small color="#6fd400" dark class="mr-1">글쓰기</v-btn>
        </div>
        <!-- //button area -->
    </v-container>
</template>

<script>
import qs from 'qs';
import { mapGetters } from 'vuex';
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';

export default {
    name: 'BoardWrite',
    data() {
        return {
            title: '',
            author: 'test_gg',
            regDate: '2020-04-25 00:00:00',
            updateDate: '2020-04-25 00:00:01',
        };
    },
    computed: {},
    mounted() {
        const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
        this.boardType = query.type;
        this.title = this.boardType === 'notice' ? '공지사항' : '자유게시판';
        console.log('query', query);
        console.log('this.boardType', this.boardType);
        console.log('this.title', this.title);
    },
    methods: {},
};
</script>

<style scoped>
h2 {
    padding-bottom: 20px;
}
table {
    width: 100%;
}
table caption {
    width: 0px;
    height: 0px;
    text-indent: -99999px;
    overflow: hidden;
}
table a {
    display: inline-block;
    width: 100%;
    color: #000;
}
.theme--light.v-data-table .v-data-table__wrapper tbody tr:hover {
    background-color: #fff;
}
.va-top {
    vertical-align: top;
    padding: 16px;
}
.input-write {
    width: 100%;
}
</style>
