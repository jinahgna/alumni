const state = {
    boardListData: {}, // 게시글 리스트 조회
    boardViewData: {}, // 게시글 상세 조회
    boardCommentData: {}, // 댓글 조회
    boardAdd: {}, // 게시글 등록
    boardUpdate: {}, // 게시글 수정
    boardDelete: {}, // 게시글 삭제
    commentAdd: {}, // 댓글 등록
    commentUpdate: {}, // 댓글 수정
    commentDelete: {}, // 댓글 삭제
    idCheck: false, // 중복 아이디 체크
    userAdd: {}, // 회원가입
    userList: {}, // 사용자 목록 조회
    updatePermission: {}, // 회원가입 승인
    login: {}, // 로그인
};

export default state;