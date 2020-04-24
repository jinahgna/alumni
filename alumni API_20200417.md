# alumni API
## __test url : 14.37.71.153:3013/__

user
---
사용자 목록 조회
======
type|url|param|desc
|-|-|-|-|
GET|getUserList||사용자 목록 조회|
## return
```
result: [
    {
        "idx": 사용자 고유 키값 int 형태. 게시판 혹은 댓글의 user_idx가 이 값
        "user_id": 로그인 아이디 string 형태
        "user_name": 사용자 이름 string 형태
        "user_gender": 성별 정보. M/F 중 하나 사용,
        "user_address": 주소 정보
        "user_phone": 연락처 정보
        "user_email": 이메일 정보
    },
    {
        ...
    }
]
```
* * *

사용자 상세 조회
======
type|url|param|desc
|-|-|-|-|
GET|getUserInfo|user_idx:int|사용자 상세조회
## return
```
"idx": 사용자 고유 키값 int 형태.
"user_id": 로그인 아이디 string 형태
"user_passwd": 사용자 비밀번호 추후 제거 예정
"user_name": 사용자 이름 string 형태
"user_address": 주소 정보
"user_phone": 연락처 정보
"user_email": 이메일 정보
"user_name": 사용자 이름 string 형태
"user_created": 등록일(가입일) 정보
"user_status": 승인 미승인 상태. 0은 미승인 1은 승인
```
* * *
사용자 추가
======
type|url|param|desc
|-|-|-|-|
POST|addUserInfo|{<br/>"user_id":string,<br/>"user_passwd":string,<br/>"user_name":string,<br/>"user_address":string,<br/>"user_phone":string<br/>"user_email":string<br/>"user_gender":char(1)<br/>"":<br/>}|사용자 추가
## return
```
"fieldCount": ?,
"affectedRows": ?
>>>>>"insertId"<<<<<: 등록된 키값. 딴건 필요없고 이 정보를 보고 정상 등록되었는지 판별 가능 추후 insertId 와 success 정보만 노출하도록 변경 예정
"serverStatus": ?
"warningCount": ?
"message": ?
"protocol41": ?
"changedRows": ?
```
* * *
사용자 수정
======
type|url|param|desc
|-|-|-|-|
POST|updateUserInfo|{<br/>"user_name":string<br/>"user_address":string<br/>"user_email":string<br/>"user_phone":string<br/>"user_idx":int<br/>}|사용자 정보 수정
## return
```
"fieldCount": ?
"affectedRows": ?
"insertId": ?
"serverStatus": ?
"warningCount": ?
>>>>>"message"<<<<<: "(Rows matched: 1  Changed: 1  Warnings: 0"
matched: 조회하여 찾은 데이터 갯수 changed: 변경된 건수. warning: 경고 안내
"protocol41": ?
>>>>>"changedRows"<<<<<: 변경된 row 정보
```
* * *
사용자 삭제
======
type|url|param|desc
|-|-|-|-|
DELETE|deleteUserInfo|user_idx:int|사용자 삭제
board
---
게시물 목록 조회
======
type|url|param|desc
|-|-|-|-|
GET|getBoardList|type: 'free'/'notice'<br/>num: int|게시물 목록 조회<br/> num 은 페이지번호
## return
```
result: {
    boardList: [
        {
            "rownum": 순번 역순으로 노출.(최신이 먼저 노출)
            "idx": 게시판 키값. 수정삭제 혹은 댓글등록 시 board_id로 사용
            "title": 제목 데아터
            "content": 본문 데이터
            "board_type": 게시물 타입. (free/notice)
            "author_id": 작성자 키번호 사용자 정보의 idx 에 해당. int형
            "is_closed": 공개여부 0/1 둘 중 하나의 값으로만 사용됨
            "is_notice": 공지여부 0/1 둘 중 하나의 값으로만 사용됨
            "reg_date": 등록일자
            "update_date": 수정일자
            "author": 작성자 이름
            "comm_cnt": 댓글 갯수,
            "totNum": type별 전체 게시글 갯수
        }.
        {
            ...
        }
    ]
}
```
* * *
게시물 상세 조회
======
type|url|param|desc
|-|-|-|-|
GET|getBoardDetail|board_id: int|게시물 목록 조회
## return
```
"idx": 게시판 키 정보 board_id라는 이름으로 사용됨
"title": 제목
"content": 본문
"board_type": 게시판 타입(notice/free),
"author_id": 작성자 키번호 사용자 정보의 idx 에 해당. int형
"is_closed": 공개여부 0/1 둘 중 하나의 값으로만 사용됨
"is_notice": 공지여부 0/1 둘 중 하나의 값으로만 사용됨
"reg_date": 등록일자
"update_date": 수정일자
"author": 작성자 이름
```
* * *
게시물 추가
======
type|url|param|desc
|-|-|-|-|
POST|addBoard|{<br/>"title": string,<br/>"content": string<br/>"type": string,<br/>is_notice": char(1),<br/>"is_closed": char(1),<br/>"author_id": int<br/>}|string 은 "" 로 감싸주세요
## return
```
"fieldCount": ?,
"affectedRows": ?
>>>>>"insertId"<<<<<: 등록된 키값. 딴건 필요없고 이 정보를 보고 정상 등록되었는지 판별 가능 추후 insertId 와 success 정보만 노출하도록 변경 예정
"serverStatus": ?
"warningCount": ?
"message": ?
"protocol41": ?
"changedRows": ?
```
* * *
게시물 수정
======
type|url|param|desc
|-|-|-|-|
POST|updateBoard|{<br/>"title": string,<br/>"content": string<br/>is_notice": char(1),<br/>"is_closed": char(1),<br/>board_id: int<br/>}|string 은 "" 로 감싸주세요
## return
```
"fieldCount": ?
"affectedRows": ?
"insertId": ?
"serverStatus": ?
"warningCount": ?
>>>>>"message"<<<<<: "(Rows matched: 1  Changed: 1  Warnings: 0"
matched: 조회하여 찾은 데이터 갯수 changed: 변경된 건수. warning: 경고 안내
"protocol41": ?
>>>>>"changedRows"<<<<<: 변경된 row 정보
```
* * *
게시물 삭제
======
type|url|param|desc
|-|-|-|-|
DELETE|deleteBoard|board_id: int|게시물 삭제
comment
---
댓글 목록 조회
======
type|url|param|desc
|-|-|-|-|
GET|getCommentList|board_id: int|게시물의 댓글 목록 조회
## return
```
"result": [
    {
        "idx": 댓글의 키값,
        "content": 댓글 내용,
        "board_id": 게시물 아이디,
        "author_id": 작성자 아이디,
        "reg_date": 등록일,
        "author": 작성자 이름
    },
    {
       ...
    }
]
```
* * *
댓글 추가
======
type|url|param|desc
|-|-|-|-|
POST|addComment|{<br/>"content":string,<br/>"board_id":int,<br/>"author_id":int<br/>}|게시물의 댓글 추가
## return
```
"fieldCount": ?,
"affectedRows": ?
>>>>>"insertId"<<<<<: 등록된 키값. 딴건 필요없고 이 정보를 보고 정상 등록되었는지 판별 가능 추후 insertId 와 success 정보만 노출하도록 변경 예정
"serverStatus": ?
"warningCount": ?
"message": ?
"protocol41": ?
"changedRows": ?
```
* * *
댓글 수정
======
type|url|param|desc
|-|-|-|-|
POST|updateComment|{<br/>"content":string,<br/>"comment_id":int<br/>}|게시물의 댓글 수정
## return
```
"fieldCount": ?
"affectedRows": ?
"insertId": ?
"serverStatus": ?
"warningCount": ?
>>>>>"message"<<<<<: "(Rows matched: 1  Changed: 1  Warnings: 0"
matched: 조회하여 찾은 데이터 갯수 changed: 변경된 건수. warning: 경고 안내
"protocol41": ?
>>>>>"changedRows"<<<<<: 변경된 row 정보
```
* * *
댓글 삭제
======
type|url|param|desc
|-|-|-|-|
DELETE|deleteComment|comment_id: int|게시물의 댓글 삭제

