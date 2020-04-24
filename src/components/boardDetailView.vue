<template>
    <v-container>
        <h2>{{ this.title }}</h2>
        <v-simple-table>
            <template v-slot:default>
                <caption>
                    게시판 글 상세보기/등록하기
                </caption>
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
                        <td colspan="5">{{ boardViewData.title }}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{{ boardViewData.author }}</td>
                        <th>작성일</th>
                        <td>{{ boardViewData.reg_date }}</td>
                        <th>수정일</th>
                        <td>{{ boardViewData.update_date }}</td>
                    </tr>
                    <tr>
                        <th class="va-top">content</th>
                        <td colspan="5" class="pl-4 pt-4 pb-4 pr-0">
                            <div class v-html="boardViewData.content">{{ boardViewData.content }}</div>
                            <!-- comment list -->
                            <ul class="comment-list" v-if="boardCommentData.length !== 0">
                                <li v-for="list in boardCommentData" :key="list.name">
                                    <strong>{{ list.author }}</strong>
                                    <span>{{ list.reg_date }}</span>
                                    <p>{{ list.content }}</p>
                                </li>
                            </ul>
                            <!-- //comment list -->
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <!-- button area -->
        <div class="text-right">
            <v-btn depressed small color="#6fd400" dark class="mr-1">수정</v-btn>
            <v-btn depressed small color="#6fd400" dark>삭제</v-btn>
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
    name: 'BoardDetailView',
    data() {
        return {
            title: '',
            boardId: '',
        };
    },
    computed: {
        ...mapGetters(['boardViewData', 'boardCommentData']),
    },
    mounted() {
        const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
        this.boardId = query.board_id;
        this.boardType = query.type;
        this.title = this.boardType === 'notice' ? '공지사항' : '자유게시판';
        this.loadView();
        // this.$axios({
        // 	method: 'GET',
        // 	url: `${process.env.VUE_APP_BASE_URL}/getBoardDetail`,
        // 	params: {
        // 		board_id: this.boardId,
        // 	},
        // })
        // 	.then((response) => {
        // 		this.boardViewData = response.data.result;
        // 		this.boardViewData.reg_date = this.boardViewData.reg_date.substring(0, 10);
        // 		this.boardViewData.update_date = this.boardViewData.update_date.substring(0, 10);
        // 	})
        // 	.catch((ex) => {
        // 		console.log('ERR!!!!! : ', ex);
        // 	});
        // this.$axios({
        //     method: 'GET',
        //     url: `${process.env.VUE_APP_BASE_URL}/getCommentList`,
        //     params: {
        //         board_id: this.boardId,
        //     },
        // }).then((response) => {
        //     this.boardCommentData = response.data.result;
        //     for (let i = 0; i < this.boardCommentData.length; i += 1) {
        //         this.boardCommentData[i].reg_date = this.boardCommentData[i].reg_date.substring(0, 10);
        //     }
        // });
    },
    methods: {
        async loadView() {
            this.url = `/getBoardDetail?type=${this.boardType}&board_id=`;
            const payload = `${this.url}${this.boardId}`;
            await this.$store.dispatch(commonActionType.ACTION_BOARD_DETAIL, payload);
            await this.$store.dispatch(commonActionType.ACTION_BOARD_COMMENT, this.boardId);
        },
    },
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
.comment-list {
    padding-left: 0;
    padding-top: 20px;
    margin-top: 20px;
    border-top: thin solid rgba(0, 0, 0, 0.12);
}
.comment-list li {
    padding: 5px;
    margin-bottom: 5px;
    list-style: none;
    background-color: #eff7e6;
}
.comment-list li:before {
    content: 'ㄴ';
    display: inline-block;
}
.comment-list li strong {
    padding: 0 8px;
}
.comment-list li span {
    color: #666;
}
.comment-list li p {
    padding-left: 20px;
    margin-bottom: 0;
}
</style>
