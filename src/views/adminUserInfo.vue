<template>
	<v-container class="board-list">
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
	</v-container>
</template>

<script>
import qs from 'qs';
import { mapGetters } from 'vuex';
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';
import isLogin from '@/components/mixins/isLogin';

export default {
	name: 'adminUserList',
	data() {
		return {};
	},
	mixins: [isLogin],
	computed: {
		...mapGetters(['userList']),
	},
	mounted() {
		this.loadView();
	},
	updated() {},
	methods: {
		// api 호출
		async loadView() {
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
