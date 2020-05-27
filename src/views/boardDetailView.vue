<template>
    <v-container>
        <h2>{{ this.title }}</h2>
        <v-simple-table>
            <template v-slot:default>
                <caption>
                    게시판 글 상세보기
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
                                <li class="comment" v-for="list in boardCommentData" :key="list.name">
                                    <strong>{{ list.author }}</strong>
                                    <span>{{ list.reg_date }}</span>
                                    <p>{{ list.content }}</p>
                                    <div class="text-right" v-if="list.author_id === authorId">
                                        <v-btn depressed small color="#6fd400" dark class="mr-1" @click="commentModify(list)">수정</v-btn>
                                        <v-btn depressed small color="#ccc" dark @click="commentDelete(list)">삭제</v-btn>
                                    </div>
                                </li>
                            </ul>
                            <!-- //comment list -->
                            <div class="comment-write" v-if="authorId !== undefined">
                                <textarea name id cols="5" rows="3" v-model="commentText"></textarea>
                                <div class="text-right">
                                    <v-btn depressed small color="#6fd400" dark @click="commentWrite(isCommentWrite)">{{ commentBtn }}</v-btn>
                                    <v-btn depressed small color="#6fd400" dark class="ml-1" v-if="isCommentWrite === false" @click="commentRefresh">수정 취소</v-btn>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <!-- button area -->
        <div class="text-right" v-if="boardViewData.author_id === authorId">
            <v-btn depressed small color="#6fd400" dark class="mr-1" @click="modify">수정</v-btn>
            <v-btn depressed small color="#6fd400" dark @click="deleteBoard">삭제</v-btn>
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
            authorId: this.$store.state.common.login.idx,
            title: '',
            boardId: '',
            commentText: '',
            modifyOpen: false,
            isCommentWrite: true,
            commentBtn: '댓글 등록',
            commentId: Number,
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
    },
    methods: {
        async loadView() {
            const payloadDetail = {
                type: this.boardType,
                board_id: this.boardId,
            };
            const payloadComment = {
                board_id: this.boardId,
            };
            await this.$store.dispatch(commonActionType.ACTION_BOARD_DETAIL, payloadDetail);
            await this.$store.dispatch(commonActionType.ACTION_BOARD_COMMENT, payloadComment);
        },
        modify() {
            this.$router.push(`/boardWrite?type=${this.boardType}&board_id=${this.boardId}`);
        },
        async deleteBoard() {
            const payload = `/deleteBoard?board_id=${this.boardId}`;
            const confirmDelete = confirm('게시물을 삭제 하시겠습니까?');
            if (confirmDelete === true) {
                await this.$store.dispatch(commonActionType.ACTION_BOARD_DELETE, payload);
                alert('게시물 삭제가 완료되었습니다.');
                this.$router.replace({ path: `/boardList?type=${this.boardType}&num=0` });
            }
        },
        async commentWrite(isWrite) {
            console.log('isWrite', isWrite);
            if (isWrite === true) {
                const payload = {
                    content: this.commentText,
                    board_id: this.boardId,
                    author_id: this.authorId,
                };
                await this.$store.dispatch(commonActionType.ACTION_COMMENT_ADD, payload);
                alert('댓글 등록이 완료되었습니다.');
                this.loadView();
                this.commentText = '';
            } else {
                const payload = {
                    content: this.commentText,
                    comment_id: this.commentId,
                };
                await this.$store.dispatch(commonActionType.ACTION_COMMENT_UPDATE, payload);
                alert('댓글 수정이 완료되었습니다.');
                this.loadView();
                this.commentRefresh();
            }
        },
        commentModify(index) {
            this.commentText = index.content;
            this.commentId = index.idx;
            this.commentBtn = '댓글 수정';
            this.isCommentWrite = false;
        },
        commentRefresh() {
            this.commentText = '';
            this.commentBtn = '댓글 등록';
            this.isCommentWrite = true;
        },
        async commentDelete(index) {
            const payload = `/deleteComment?comment_id=${index.idx}`;
            const confirmDelete = confirm('댓글을 삭제 하시겠습니까?');
            if (confirmDelete === true) {
                await this.$store.dispatch(commonActionType.ACTION_COMMENT_DELETE, payload);
                alert('댓글 삭제가 완료되었습니다.');
                this.loadView();
            }
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
table th,
table td {
    word-break: break-all;
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
.comment-write {
    list-style: none;
    margin-top: 10px;
    background-color: #fff;
}
.comment-write textarea {
    width: 100%;
    border: 1px solid #ddd;
}
.comment-list li.comment {
    padding: 5px;
    margin-bottom: 5px;
    list-style: none;
    background-color: #eff7e6;
}
.comment-list li.comment:before {
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
