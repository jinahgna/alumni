/**
 * @description store의 각 action별 action type 관리
 */

const commonActionType = {
	ACTION_BOARD_LIST: 'ACTION_BOARD_LIST', // 게시글 리스트 조회
	ACTION_BOARD_DETAIL: 'ACTION_BOARD_DETAIL', // 게시글 상세 조회
	ACTION_BOARD_COMMENT: 'ACTION_BOARD_COMMENT', // 댓글 조회
	ACTION_BOARD_ADD: 'ACTION_BOARD_ADD', // 게시물 등록
	ACTION_BOARD_UPDATE: 'ACTION_BOARD_UPDATE', // 게시물 수정
	ACTION_BOARD_DELETE: 'ACTION_BOARD_DELETE', // 게시물 삭제
};

export default commonActionType;