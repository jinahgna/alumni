<template>
	<v-container class="board-list" v-if="isLogin">
		<h2>{{ this.title }}</h2>
		<v-simple-table>
			<caption>게시판 리스트</caption>
			<colgroup>
				<col style="width:80px" />
				<col />
				<col style="width:100px" />
				<col style="width:120px" />
			</colgroup>
			<thead>
				<tr>
					<th class="text-center">No.</th>
					<th>제목</th>
					<th class="text-center">작성자</th>
					<th class="text-center">작성일</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="this.boardType === 'notice' && this.boardNum === '0'">
					<tr
						v-for="(noticeList, index) in noticeListData"
						:key="index + '_' + index"
						class="notice-list"
					>
						<td class="text-center">{{ noticeList.rownum }}</td>
						<td>
							<a v-on:click="goDetailView(boardType, noticeList.idx)">{{ noticeList.title }}</a>
							<span>({{ noticeList.comm_cnt }})</span>
						</td>
						<td class="text-center">{{ noticeList.author }}</td>
						<td class="text-center">{{ noticeList.reg_date }}</td>
					</tr>
				</template>
				<tr v-for="(list, index) in boardListData.boardList" :key="index">
					<td class="text-center">{{ list.rownum }}</td>
					<td>
						<a v-on:click="goDetailView(boardType, list.idx)">{{ list.title }}</a>
						<span>({{ list.comm_cnt }})</span>
					</td>
					<td class="text-center">{{ list.author }}</td>
					<td class="text-center">{{ list.reg_date }}</td>
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
						<a v-if="Number(boardNum) !== v - 1" href="javascript:;" @click="goPaging(v)">{{ v }}</a>
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
			isLogin: this.$store.state.common.isLogin,
			authorId: this.$store.state.common.login.idx,
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
		...mapGetters(['boardListData', 'noticeListData']),
	},
	mounted() {
		if (this.isLogin === false) {
			alert('로그인 후 이용해주세요.');
			this.$router.push({ path: '/' });
		}
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
			const payload = {
				type: this.boardType,
				num: this.boardNum,
			};
			await this.$store.dispatch(commonActionType.ACTION_NOTICE_LIST);
			await this.$store.dispatch(commonActionType.ACTION_BOARD_LIST, payload);
			this.totalNum = this.$store.state.common.boardListData.totNum;
			this.pagingListNum = Math.ceil(this.totalNum / 10);
			this.getTotalNum();
		},
		// pagination setting
		getTotalNum() {
			// 선택된 페이징의 번호가 5 이하일 경우
			if (this.boardNum <= 4) {
				if (this.pagingListNum > 5) {
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
table th,
table td {
	max-width: 300px;
	/* word-break: break-all; */
}
table caption {
	width: 0px;
	height: 0px;
	text-indent: -99999px;
	overflow: hidden;
}
table a {
	display: inline-block;
	max-width: 90%;
	height: 21px;
	color: #000;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
table span {
	vertical-align: top;
}
.theme--light.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row),
.theme--light.v-data-table tbody tr:not(:last-child) th:not(.v-data-table__mobile-row) {
	max-width: 300px;
}
.notice-list {
	background-color: #f5f9f1;
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
