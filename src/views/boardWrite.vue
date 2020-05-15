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
					<!-- <tr>
                        <th>공지여부</th>
                        <td colspan="2">
                            <v-select item-text="text" item-value="value" v-model="isNotice" :items="selectNotice" />
                        </td>
                        <th>공개여부</th>
                        <td colspan="2">
                            <v-select item-text="text" item-value="value" v-model="isClosed" :items="selectClosed" />
                        </td>
                    </tr>-->
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
			<v-btn depressed small color="#6fd400" dark class="mr-1" @click="writePost">{{ buttonText }}</v-btn>
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
			buttonText: '',
			boardTitle: '',
			boardContent: '',
			isNotice: 1,
			isClosed: 1,
			// selectNotice: [
			//     {
			//         text: '공지',
			//         value: 1,
			//     },
			//     {
			//         text: '기본',
			//         value: 0,
			//     },
			// ],
			// selectClosed: [
			//     {
			//         text: '공개',
			//         value: '1',
			//     },
			//     {
			//         text: '비공개',
			//         value: '0',
			//     },
			// ],
		};
	},
	computed: {
		...mapGetters(['boardViewData']),
	},
	mounted() {
		const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
		this.boardType = query.type;
		this.boardId = query.board_id;
		this.title = this.boardType === 'notice' ? '공지사항' : '자유게시판';
		this.buttonText = this.boardId !== undefined ? '수정하기' : '글쓰기';
		console.log('query', query);
		console.log('this.boardType', this.boardType);
		console.log('this.boardId', this.boardId);
		console.log('this.title', this.title);
		if (this.boardId !== undefined) {
			this.loadView();
			console.log('this.boardViewData', this.boardViewData);
			this.boardTitle = this.boardViewData.title;
			this.boardContent = this.boardViewData.content;
			this.boardType = this.boardViewData.board_type;
			this.isNotice = this.boardViewData.is_notice;
			this.isClosed = this.boardViewData.is_closed;
			this.author_id = this.boardViewData.author_id;
		}
	},
	methods: {
		async writePost() {
			console.log('title', this.boardTitle);
			console.log('content', this.boardContent);
			console.log('type', this.boardType);
			console.log('is notice', this.isNotice);
			console.log('is close', this.isClosed);
			if (this.boardTitle === '') {
				alert('제목을 입력해주세요.');
			} else if (this.boardContent === '') {
				alert('본문을 입력해주세요.');
			}
			const payloadAdd = {
				title: this.boardTitle,
				content: this.boardContent,
				type: this.boardType,
				is_notice: 0,
				is_closed: '0',
				author_id: 23, // 임시
			};
			const payloadUpdate = {
				title: this.boardTitle,
				content: this.boardContent,
				type: this.boardType,
				is_notice: 0,
				is_closed: '0',
				board_id: this.boardId,
			};
			if (this.boardId === undefined) {
				await this.$store.dispatch(commonActionType.ACTION_BOARD_ADD, payloadAdd);
				alert('게시물 등록이 완료되었습니다.');
				this.$router.replace({ path: `/boardList?type=${this.boardType}&num=0` });
			} else {
				await this.$store.dispatch(commonActionType.ACTION_BOARD_UPDATE, payloadUpdate);
				alert('게시물 수정이 완료되었습니다.');
				this.$router.replace({ path: `/boardDetailView?type=${this.boardType}&board_id=${this.boardId}` });
			}
		},
		async loadView() {
			this.url = `/getBoardDetail?type=${this.boardType}&board_id=`;
			const payload = `${this.url}${this.boardId}`;
			await this.$store.dispatch(commonActionType.ACTION_BOARD_DETAIL, payload);
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
