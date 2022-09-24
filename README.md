# Board-BE-Node
초심의 마음으로 Node.js 게시판 구현  

## 프로젝트 소개
이전 회사에서는 백엔드 사용이 전혀 없어서 개인적으로 공부를 했었어야 했는데 안주하는 바람에 많이 잊어버렸다.

그래서 웹 프로그래밍을 처음 할 때 가장 많이 하는 게시판 구현을 통해서 다시 초심 마음으로 배우려고 한다.

마침 Node.js도 처음 사용해 본다.  
개인 공부 및 프로젝트이기 때문에 한 단계, 한 단계씩 목표를 잡고 구현을 해보려고 한다.

프론트 엔드는 react로 구현된 오픈 소스를 사용하여 지금은 백엔드에만 집중하려고 한다.

## 사용 기술(Skill)
<p><img alt ="icon" wide ="60" height="60" src="https://www.svgrepo.com/show/354118/nodejs.svg" />
<img alt ="icon" wide ="60" height="60" src="https://www.svgrepo.com/show/330398/express.svg" />
<img alt= "icon" wide="60" height="60" src ="https://techstack-generator.vercel.app/ts-icon.svg" />
<img alt ="icon" wide ="60" height="60" src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png" />
<img alt= "icon" wide="60" height="60" src ="https://techstack-generator.vercel.app/mysql-icon.svg" />
<img src="https://techstack-generator.vercel.app/jest-icon.svg" alt="icon" width="60" height="60" />
<img src="https://techstack-generator.vercel.app/eslint-icon.svg" alt="icon" width="60" height="60" /><img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="60" height="60" /></p>

## 프로젝트 기능
프로젝트의 기능은 한 단계씩 증가 시키면서 구현을 하려고 한다.

**1차 개발**
* 게시판 - CRUD, 조회수
* 사용자 - 회원가입, 로그인(JWT), 로그아웃

**2차 개발**
* Typescript 변환
* Typeorm 변환
* Validator(class-validator)

**3차 개발**
* 조회수, 댓글 entity 추가
* 동시성 제어 처리(조회수)
* 게시판 - 댓글
* Ordering(정렬 기능)
* Searching(검색 기능)
* Pagination(페이지 기능)

### 👉 [프로젝트 ToDo](https://github.com/whoamixzerone/Board-BE-Node/blob/main/TODO.md)  
### 👉 [기술 Issue](https://github.com/whoamixzerone/Board-BE-Node/wiki)

## 요구사항
### eslint, prettier 코드 스타일 일관성
### 유닛 테스트 작성
### 동시성 제어
### 인증 및 검증
* 토큰 인증
* 게시글 검증
    * 작성한 작성자만 수정,삭제,복구 가능
### 게시판 관리
* 게시글 생성
    * 제목, 내용을 입력하여 생성(with 조회수)
    * 제목, 내용은 필수 입력사항
* 게시글 수정
* 게시글 삭제
    * 삭제된 게시글 복구 가능
* 게시글 복구
* 게시글 상세
    * 상세보기하면 조회수가 1 증가(횟수 제한 없음)
* 게시글 목록
* Ordering
    * 게시글 목록 정렬
    * default: 작성일자, 내림차순
* Searching
    * 키워드 포함한 게시글 조회
* Pagination
    * 페이지 당 게시글 수
    * default: 10건
### 유저 관리
* 회원 가입
    * 이메일을 id로 사용
    * 이메일, 비밀번호, 이름 입력하여 가입
    * 이메일, 비밀번호, 이름 필수 입력사항
* 로그인
    * JWT Token 사용
    * access_token 사용    
* 로그아웃
    * 클라이언트에서 삭제
* 토큰 재발급
    * 만료 시 재발급 요청
### 댓글 관리
* 댓글 생성
    * 내용을 입력하여 생성
    * 내용 필수 입력사항

## Postman API
### 👉 [Postman](https://documenter.getpostman.com/view/21399959/UzBjtoAV)

## API 설계
* 게시판 관리  
![board-post-api](https://user-images.githubusercontent.com/67082984/192097248-f9b6c7f6-7245-4834-8741-51d2bbf1d646.png)

* 유저 관리  
![board-user-api](https://user-images.githubusercontent.com/67082984/187410002-0d5a355b-9e9f-4b0e-bd72-e9bd3bfa00a8.png)

## DB 설계
![simple-board-erd](https://user-images.githubusercontent.com/67082984/192096926-1f138aa9-70e1-440d-bd5a-0ea0d562ba84.png)
