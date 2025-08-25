# Bean - 카페 운영 플랫폼

카페 큐레이팅 서비스 **Bean(빈자리)** 의 프론트엔드 저장소입니다.  
React 기반으로 개발되었으며, Django REST API 백엔드와 연동됩니다.  


## ✨ 주요 기능
---
### 점주측 기능
- 회원가입 및 로그인 (JWT 인증 기반)
- 카페 등록 및 좌석 배치도 자동 생성
- 실시간 좌석 상태 업데이트

### 유저측 기능
- 지도 기반 카페 탐색
- 챗봇 ai로 자연어 기반 카페 탐색
- 실시간 좌석 상태 확인
- 빈 좌석 예약

## 🛠️ 기술 스택

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.3.0-CA4245?logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.11.0-5A29E4?logo=axios&logoColor=white)
![react-cookie](https://img.shields.io/badge/react--cookie-8.0.1-FF9800?logo=react&logoColor=white)
![cookies](https://img.shields.io/badge/cookies-0.9.1-795548?logo=npm&logoColor=white)


## 🚀 실행 방법

```bash
git clone https://github.com/cho58/bean-frontend.git
cd bean-frontend
npm install
npm run dev
```

## 🔗 연동 안내

이 프론트엔드 프로젝트는 백엔드 API 서버 및 모바일 앱과 연동되어 동작합니다.

- **백엔드 저장소 (Django REST API)** → [Bean Backend](https://github.com/ajy121650/beanBack)  

## 📁 프로젝트 구조

```
bean-front-junha/
├── public/                  # 정적 파일 (favicon, index.html 등)
├── src/
│   ├── apis/                # API 호출 모듈
│   ├── assets/              # 이미지, 아이콘 등 정적 자원
│   ├── components/          # 재사용 가능한 UI 컴포넌트
│   │   ├── RatingTag/       # 태그 관련 컴포넌트
│   │   ├── CafeList.*       # 카페 리스트 UI
│   │   ├── ChairDetection.* # 의자 감지 관련
│   │   ├── DetailMap.jsx    # 상세 지도
│   │   ├── FloorplanOverlay.* # 도면 오버레이
│   │   ├── Kakaomap.jsx     # 카카오맵 컴포넌트
│   │   ├── MenuDropdown.jsx # 메뉴 드롭다운
│   │   ├── SeatMetaCard.*   # 좌석정보 수정 카드
│   │   ├── SeatStartCard.*  # 좌석 점유 카드
│   │   ├── TableDetection.* # 테이블 컴포넌트
│   │   ├── TableMetaCard.jsx
│   │   ├── TableStatusCard.* 
│   │   ├── TakenSeat.*      # 점유된 좌석 컴포넌트
│   │   ├── UntakenSeat.*    # 비어있는 좌석 컴포넌트
│   │   └── UserSearch.*     # 유저 검색 컴포넌트
│   │
│   ├── pages/               # 주요 라우팅 페이지
│   │   ├── CafeHomeBeanUpdate.* 
│   │   ├── CafeLanding.*    # 점주측 첫 화면
│   │   ├── CafeMapCreated.* 
│   │   ├── CafeMapCreating.* 
│   │   ├── CafeRegister1.*  # 업체 등록 설명 페이지
│   │   ├── CafeRegister2.*  # 회원가입 밎 업체 등록 페이지
│   │   ├── CafeSignIn.*     # 점주측 로그인 페이지
│   │   ├── CafeTableInfo.* 
│   │   ├── CafeUpload.jsx   # 배치도 업로드 페이지
│   │   ├── DefaultLanding.* # 첫 화면
│   │   ├── UserAfterSearch.*# 챗봇 검색 결과 페이지
│   │   ├── UserCafeDetail.* # 유저측 카페 상세 페이지
│   │   ├── UserHome.*       # 지도 및 챗봇 페이지
│   │   └── UserLanding.*    # 유저측 첫 페이지
│   │
│   ├── utils/               # 유틸 함수 모음
│   ├── App.js               # 앱 엔트리 / 라우터 설정
│   ├── index.js             # React DOM 엔트리
│   └── index.css            # 글로벌 스타일
│
├── package.json             # 프로젝트 설정 및 의존성
├── package-lock.json
└── README.md
```

## 📝 라우팅 흐름
### 점주측
```
Default Landing
    ↓ (카페를 운영하는 점주입니다)
Cafe Landing
    ↓ (업체 등록하기)
Cafe Register 1
    ↓ (업체 등록하기)
Cafe Register 2
    ↓ (업체 등록 완료하기)
Cafe SignIn
    ↓ (로그인)
Cafe Upload
    ↓ (배치도 생성 및 관리)

### 이용자측
```
Default Landing
    ↓ (카페를 찾는 이용입니다)
User Landing
    ↓ (로그인)
User Home
    ↓ (Bean AI 검색)
User after search
    ↓ (특정 카페 클릭)
User Cafe Detail
    ↓ (좌석 현황 확인)

```

