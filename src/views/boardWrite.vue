<template>
	<v-container>
		<h2>{{ title }}</h2>
		<v-simple-table>
			<template v-slot:default>
				<caption>
					게시판 글 등록하기
				</caption>
				<colgroup>
					<col style="width:10%;" />
					<col style="width:25%;" />
					<col style="width:10%;" />
					<col style="width:25%;" />
					<col style="width:10%" />
					<col style="width:25%;" />
				</colgroup>
				<tbody>
					<tr>
						<th>title</th>
						<td colspan="5">
							<input type="text" class="input-write" placeholder="제목을 입력해주세요" v-model="boardTitle" />
						</td>
					</tr>
					<tr>
						<th>공지여부</th>
						<td colspan="2">
							<!-- <select name="공지여부" id="" v-model="isNotice">
								<option value="1">공지</option>
								<option value="0">일반</option>
							</select> -->
							<v-select item-text="text" item-value="value" v-model="isNotice" :items="selectNotice" />
						</td>
						<th>공개여부</th>
						<td colspan="2">
							<!-- <select name="공개여부" id="" v-model="isClosed" aria-placeholder="선택">
								<option value="1">공개</option>
								<option value="0">비공개</option>
							</select> -->
							<v-select item-text="text" item-value="value" v-model="isClosed" :items="selectClosed" />
						</td>
					</tr>
					<tr>
						<th class="va-top">content</th>
						<td colspan="5" class="pl-4 pt-4 pb-4 pr-0">
							<div>
								<textarea name id cols="30" rows="10" class="input-write" placeholder="글을 입력해주세요" v-model="boardContent"></textarea>
							</div>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<!-- button area -->
		<div class="text-right">
			<v-btn depressed small color="#6fd400" dark class="mr-1" @click="writePost">글쓰기</v-btn>
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
			boardTitle: '',
			boardContent: '',
			isNotice: 1,
			isClosed: 1,
			selectNotice: [
				{
					text: '공지',
					value: 1,
				},
				{
					text: '기본',
					value: 0,
				},
			],
			selectClosed: [
				{
					text: '공개',
					value: 1,
				},
				{
					text: '비공개',
					value: 0,
				},
			],
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
	methods: {
		async writePost() {
			console.log('title', this.boardTitle);
			console.log('content', this.boardContent);
			console.log('type', this.boardType);
			console.log('is notice', this.isNotice);
			console.log('is close', this.isClosed);
			console.log('auther id', '23');
			if (this.boardTitle === '') {
				alert('제목을 입력해주세요.');
			} else if (this.boardContent === '') {
				alert('본문을 입력해주세요.');
			}
			const payload = {
				title: this.boardTitle,
				content: this.boardContent,
				type: this.boardType,
				is_notice: this.isNotice,
				is_closed: this.isClosed,
				author_id: '23', // 임시
			};
			await this.$store.dispatch(commonActionType.ACTION_BOARD_ADD, payload);
			this.$router.replace({ path: `/boardList?type=${this.boardType}&num=0` });
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
.input-write {
	width: 100%;
}
.v-select > .v-input__control > .v-input__slot {
	width: 100px;
}
</style>
