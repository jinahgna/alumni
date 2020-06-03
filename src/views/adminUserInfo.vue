<template>
	<v-container class="board-list" v-if="isLogin">
		<h2>관리자 (사용자 리스트)</h2>
		<v-simple-table>
			<caption>사용자 리스트</caption>
			<colgroup>
				<col />
				<col />
				<col />
				<col />
				<col />
				<col />
				<col />
				<col />
				<col />
				<col />
				<col />
			</colgroup>
			<thead>
				<tr>
					<th class="text-center">No.</th>
					<th class="text-center">고유번호</th>
					<th class="text-center">아이디</th>
					<th class="text-center">이름</th>
					<th class="text-center">성별</th>
					<th class="text-center">주소</th>
					<th class="text-center">연락처</th>
					<th class="text-center">이메일</th>
					<!-- <th class="text-center">가입일</th>
					<th class="text-center">현직장</th>-->
					<th class="text-center">승인여부</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(list, index) in userList" :key="index">
					<td class="text-center">{{ list.rownum }}</td>
					<td class="text-center">{{ list.idx }}</td>
					<td class="text-center">{{ list.user_id }}</td>
					<td class="text-center">{{ list.user_name }}</td>
					<td class="text-center">{{ list.user_gender }}</td>
					<td class="text-center">{{ list.user_address }}</td>
					<td class="text-center">{{ list.user_phone }}</td>
					<td class="text-center">{{ list.email }}</td>
					<!-- <td class="text-center">{{ list.created }}</td>
					<td class="text-center">{{ list.curr_corp }}</td>-->
					<td class="text-center">
						<span v-if="list.user_status === 1">{{ list.user_status }}</span>
						<v-btn
							depressed
							small
							color="#6fd400"
							dark
							class="mr-1"
							v-if="list.user_status === 0"
							@click="updatePermission(list.idx)"
						>회원가입 승인</v-btn>
					</td>
				</tr>
			</tbody>
		</v-simple-table>
		<!-- pagination -->
		<!-- <div>
			<div class="paging-area">
				<a v-if="firstFlag === true" href="javascript:;" @click="goPaging('first')">&lt;&lt;</a>
				<a v-if="prevFlag === true" href="javascript:;" @click="goPaging('prev')">&lt;</a>
				<ul>
					<li v-for="(v, i) in numberArr" v-bind:key="v" v-bind:item="v" v-bind:index="i" style="display:inline-block">
						<a v-if="Number(boardNum) !== v - 1" href="javascript:;" @click="goPaging(v)">{{ v }}</a>
						<span v-if="Number(boardNum) === v - 1">{{ v }}</span>
					</li>
				</ul>
				<a v-if="nextFlag === true" href="javascript:;" @click="goPaging('next')">&gt;</a>
				<a v-if="lastFlag === true" href="javascript:;" @click="goPaging('last')">&gt;&gt;</a>
			</div>
		</div>-->
		<!-- // pagination -->
	</v-container>
</template>

<script>
import qs from 'qs';
import { mapGetters } from 'vuex';
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';

export default {
	name: 'adminUserList',
	data() {
		return {
			isLogin: this.$store.state.common.isLogin,
			// totalNum: 0,
			// boardNum: 0,
			// pagingListNum: 0,
			// arrPagingNum: [],
			// numberArr: [],
			// firstFlag: false,
			// lastFlag: false,
			// prevFlag: false,
			// nextFlag: false,
		};
	},
	computed: {
		...mapGetters(['userList']),
	},
	mounted() {
		// const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
		// this.boardNum = query.num;
		if (this.isLogin === false) {
			alert('로그인 후 이용해주세요.');
			this.$router.push({ path: '/' });
		}
		this.loadView();
	},
	updated() {},
	methods: {
		// api 호출
		async loadView() {
			// const payload = `/adminUserInfo?num=${this.boardNum}`;
			// await this.$store.dispatch(commonActionType.ACTION_USER_LIST, payload);
			// this.totalNum = this.$store.state.common.userList.totNum;
			// this.pagingListNum = Math.ceil(this.totalNum / 10);
			// this.getTotalNum();
			await this.$store.dispatch(commonActionType.ACTION_USER_LIST);
		},
		async updatePermission(idx) {
			const payload = {
				user_idx: idx,
			};
			await this.$store.dispatch(commonActionType.ACTION_UPDATE_PERMISSION, payload);
			alert('사용자 승인이 완료 되었습니다. ');
			this.loadView();
		},
		// pagination setting
		// getTotalNum() {
		// 	// 선택된 페이징의 번호가 5 이하일 경우
		// 	if (this.boardNum <= 4) {
		// 		if (this.pagingListNum > 4) {
		// 			for (let i = 1; i <= 5; i += 1) {
		// 				this.arrPagingNum.push(i);
		// 			}
		// 			this.lastFlag = true;
		// 			this.nextFlag = true;
		// 		} else {
		// 			for (let i = 1; i <= this.pagingListNum; i += 1) {
		// 				this.arrPagingNum.push(i);
		// 			}
		// 		}
		// 		// 선택된 페이징의 번호가 5 이상일 경우
		// 	} else if (this.boardNum > 4) {
		// 		const startNum = this.boardNum - (this.boardNum % 5) + 1;
		// 		const lastNum = startNum + 4;
		// 		if (lastNum >= this.pagingListNum) {
		// 			for (let i = startNum; i <= this.pagingListNum; i += 1) {
		// 				this.arrPagingNum.push(i);
		// 			}
		// 			this.firstFlag = true;
		// 			this.prevFlag = true;
		// 		} else {
		// 			for (let i = startNum; i <= lastNum; i += 1) {
		// 				this.arrPagingNum.push(i);
		// 			}
		// 			this.firstFlag = true;
		// 			this.prevFlag = true;
		// 			this.lastFlag = true;
		// 			this.nextFlag = true;
		// 		}
		// 	}
		// 	this.numberArr = this.arrPagingNum;
		// },
		// pagination click event
		// goPaging(v) {
		// 	if (typeof v === 'number') {
		// 		this.boardNum = v - 1;
		// 	} else if (typeof v === 'string') {
		// 		switch (v) {
		// 			case 'last':
		// 				this.boardNum = this.pagingListNum - 1;
		// 				break;
		// 			case 'first':
		// 				this.boardNum = 0;
		// 				break;
		// 			case 'next':
		// 				this.boardNum = this.arrPagingNum[this.arrPagingNum.length - 1];
		// 				break;
		// 			case 'prev':
		// 				this.boardNum = this.arrPagingNum[0] - 2;
		// 				break;
		// 			default:
		// 				break;
		// 		}
		// 	}
		// 	this.$router.push(`/adminUserInfo?num=${this.boardNum}`);
		// },
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
	overflow: hidden;
	text-overflow: ellipsis;
}
.theme--light.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row),
.theme--light.v-data-table tbody tr:not(:last-child) th:not(.v-data-table__mobile-row) {
	max-width: 300px;
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
