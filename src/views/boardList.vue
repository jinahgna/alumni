<template>
    <v-container class="board-list">
        <h2>{{ this.title }}</h2>
        <v-simple-table>
            <caption>게시판 리스트</caption>
            <colgroup>
                <col style="width:5%" />
                <col style="width:40%" />
                <col style="width:20%" />
                <col width="*" />
                <col width="*" />
            </colgroup>
            <thead>
                <tr>
                    <th class="text-center">No.</th>
                    <th>제목</th>
                    <th class="text-center">작성자</th>
                    <th class="text-center">작성일</th>
                    <th class="text-center">수정일</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(list, index) in boardListData.boardList" :key="index">
                    <td class="text-center">{{ list.rownum }}</td>
                    <td>
                        <a
                            v-on:click="goDetailView(boardType, list.idx)"
                        >{{ list.title }} ({{ list.comm_cnt }})</a>
                    </td>
                    <td class="text-center">{{ list.author }}</td>
                    <td class="text-center">{{ list.reg_date }}</td>
                    <td class="text-center">{{ list.update_date }}</td>
                </tr>
            </tbody>
        </v-simple-table>
        <!-- pagination -->
        <div>
            <div class="paging-area">
                <a v-if="firstFlag === true" href="javascript:;" @click="goPaging('first')">&lt;&lt;</a>
                <a v-if="prevFlag === true" href="javascript:;" @click="goPaging('prev')">&lt;</a>
                <ul>
                    <li
                        v-for="(v, i) in numberArr"
                        v-bind:key="v"
                        v-bind:item="v"
                        v-bind:index="i"
                        style="display:inline-block"
                    >
                        <a
                            v-if="Number(boardNum) !== v - 1"
                            href="javascript:;"
                            @click="goPaging(v)"
                        >{{ v }}</a>
                        <span v-if="Number(boardNum) === v - 1">{{ v }}</span>
                    </li>
                </ul>
                <a v-if="nextFlag === true" href="javascript:;" @click="goPaging('next')">&gt;</a>
                <a v-if="lastFlag === true" href="javascript:;" @click="goPaging('last')">&gt;&gt;</a>
            </div>
        </div>
        <!-- // pagination -->
        <div class="text-right mt-5">
            <v-btn depressed small color="#6fd400" dark @click="write">글쓰기</v-btn>
        </div>
    </v-container>
</template>

<script>
import qs from 'qs';
import { mapGetters } from 'vuex';
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';

export default {
    name: 'boardList',
    data() {
        return {
            title: '',
            boardType: '',
            totalNum: 0,
            boardNum: 0,
            pagingListNum: 0,
            arrPagingNum: [],
            numberArr: [],
            firstFlag: false,
            lastFlag: false,
            prevFlag: false,
            nextFlag: false,
        };
    },
    computed: {
        ...mapGetters(['boardListData']),
    },
    mounted() {
        const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
        this.boardType = query.type;
        this.boardNum = query.num;
        this.title = this.boardType === 'notice' ? '공지사항' : '자유게시판';
        this.loadView();
    },
    updated() {},
    methods: {
        // api 호출
        async loadView() {
            this.url = `/getBoardList?type=${this.boardType}&num=`;
            const payload = `${this.url}${this.boardNum}`;
            await this.$store.dispatch(commonActionType.ACTION_BOARD_LIST, payload);
            // this.boardListData = this.$store.state.common.boardListData.boardList;
            this.totalNum = this.$store.state.common.boardListData.totNum;
            this.pagingListNum = Math.ceil(this.totalNum / 10);
            this.getTotalNum();
        },
        // api 호출 old
        // loadView_old() {
        // 	this.$axios({
        // 		method: 'GET',
        // 		url: `${process.env.VUE_APP_BASE_URL}/getBoardList`,
        // 		params: {
        // 			type: this.boardType,
        // 			num: this.boardNum,
        // 		},
        // 	})
        // 		.then((response) => {
        // 			this.boardListData = response.data.result.boardList;
        // 			this.totalNum = response.data.result.totNum;
        // 			this.pagingListNum = Math.ceil(this.totalNum / 10);
        // 			this.getTotalNum();
        // 			for (let i = 0; i < this.boardListData.length; i += 1) {
        // 				this.boardListData[i].reg_date = this.boardListData[i].reg_date.substring(0, 10);
        // 				this.boardListData[i].update_date = this.boardListData[i].update_date.substring(0, 10);
        // 			}
        // 		})
        // 		.catch((ex) => {
        // 			console.log('ERR!!!!! : ', ex);
        // 		});
        // },
        // pagination setting
        getTotalNum() {
            // 선택된 페이징의 번호가 5 이하일 경우
            if (this.boardNum <= 4) {
                if (this.pagingListNum > 4) {
                    for (let i = 1; i <= 5; i += 1) {
                        this.arrPagingNum.push(i);
                    }
                    this.lastFlag = true;
                    this.nextFlag = true;
                } else {
                    for (let i = 1; i <= this.pagingListNum; i += 1) {
                        this.arrPagingNum.push(i);
                    }
                }
                // 선택된 페이징의 번호가 5 이상일 경우
            } else if (this.boardNum > 4) {
                const startNum = this.boardNum - (this.boardNum % 5) + 1;
                const lastNum = startNum + 4;
                if (lastNum >= this.pagingListNum) {
                    for (let i = startNum; i <= this.pagingListNum; i += 1) {
                        this.arrPagingNum.push(i);
                    }
                    this.firstFlag = true;
                    this.prevFlag = true;
                } else {
                    for (let i = startNum; i <= lastNum; i += 1) {
                        this.arrPagingNum.push(i);
                    }
                    this.firstFlag = true;
                    this.prevFlag = true;
                    this.lastFlag = true;
                    this.nextFlag = true;
                }
            }
            this.numberArr = this.arrPagingNum;
        },
        // pagination click event
        goPaging(v) {
            if (typeof v === 'number') {
                this.boardNum = v - 1;
            } else if (typeof v === 'string') {
                switch (v) {
                    case 'last':
                        this.boardNum = this.pagingListNum - 1;
                        break;
                    case 'first':
                        this.boardNum = 0;
                        break;
                    case 'next':
                        this.boardNum = this.arrPagingNum[this.arrPagingNum.length - 1];
                        break;
                    case 'prev':
                        this.boardNum = this.arrPagingNum[0] - 2;
                        break;
                    default:
                        break;
                }
            }
            this.$router.push(`/boardList?type=${this.boardType}&num=${this.boardNum}`);
        },
        // 게시판 상세
        goDetailView(boardType, idx) {
            this.$router.push(`/boardDetailView?type=${boardType}&board_id=${idx}`);
        },
        write() {
            this.$router.push(`/boardWrite?type=${this.boardType}`);
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
.paging-area {
    width: 100%;
    text-align: center;
    padding: 30px 0 0;
}
.paging-area a {
    display: inline-block;
    text-decoration: none;
    color: #000;
}
.paging-area span {
    color: #6fd400;
    font-weight: 700;
}
.paging-area ul {
    display: inline-block;
    padding: 0;
}
.paging-area > a,
.paging-area ul li {
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    margin: 0 5px;
}
</style>
