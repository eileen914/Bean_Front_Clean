# ☕ Bean - 카페 운영 플랫폼

카페 큐레이팅 서비스 **Bean(빈자리)** 의 프론트엔드 저장소입니다.  
React 기반으로 개발되었으며, Django REST API 백엔드와 연동됩니다.  

---

## ✨ 주요 기능

### 👩‍💻 점주측 기능
- 회원가입 및 로그인 (JWT 인증 기반)
- 카페 등록 및 좌석 배치도 자동 생성
- 실시간 좌석 상태 업데이트

### 🙋 유저측 기능
- 지도 기반 카페 탐색
- 챗봇 AI로 자연어 기반 카페 검색
- 실시간 좌석 상태 확인
- 빈 좌석 예약

---

## 🛠️ 기술 스택

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.3.0-CA4245?logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.11.0-5A29E4?logo=axios&logoColor=white)
![react-cookie](https://img.shields.io/badge/react--cookie-8.0.1-FF9800?logo=react&logoColor=white)
![cookies](https://img.shields.io/badge/cookies-0.9.1-795548?logo=npm&logoColor=white)

---

## 🚀 실행 방법

```bash
# 저장소 클론
git clone https://github.com/cho58/bean-frontend.git
cd bean-frontend

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

## 🔗 연동 안내

이 프론트엔드 프로젝트는 백엔드 API 서버 및 모바일 앱과 연동되어 동작합니다.

- **백엔드 저장소 (Django REST API)** → [Bean Backend](https://github.com/ajy121650/beanBack)  
- **모바일 앱 저장소 (React Native / Expo)** → (추가 예정)

> ⚠️ 프론트엔드 실행 시 반드시 백엔드 서버가 실행 중이어야 하며,  
> `.env` 파일의 `VITE_API_URL`을 해당 백엔드 서버 주소로 설정해야 합니다.

## 📁 프로젝트 구조

```
Bean_Front_Clean/
├── public/                      # 정적 파일 (index.html 등)
├── src/
│   ├── apis/                    # API 호출 모듈
│   ├── assets/                  # 이미지, 아이콘 등 정적 자원
│   ├── components/              # 재사용 가능한 UI 컴포넌트
│   │   ├── RatingTag/           # 별점 태그 컴포넌트
│   │   ├── CafeList.*           # 개별 카페 카드 UI
│   │   ├── ChairDetection.*     # 도면 제작을 위한 의자 요소 감지 컴포넌트
│   │   ├── DetailMap.jsx        # 개별 카페 위치 나타내는 지도 컴포넌트
│   │   ├── Kakaomap.jsx         # 검색된 카페 위치 나타내는 지도 컴포넌트
│   │   ├── MenuDropdown.jsx     # Cafe측에서 사용하는 메뉴 드롭다운
│   │   ├── SeatMetaCard.*       # 좌석 정보 기입 컴포넌트
│   │   ├── SeatStartCard.*      # 좌석 점유 설정 컴포넌트
│   │   ├── TableDetection.*     # 도면 제작을 위한 테이블 요소 감지 컴포넌트
│   │   ├── TableMetaCard.jsx    # 테이블 정보 기입 컴포넌트
│   │   ├── TableStatusCard.*    # 의자 점유 상태 나타내는 컴포넌트
│   │   ├── TakenSeat.*          # 점유된 좌석 예약하기 컴포넌트
│   │   ├── UntakenSeat.*        # 비어있는 좌석 예약하기 컴포넌트
│   │   └── UserSearch.*         # 챗봇 초기 검색창 컴포넌트
│   │
│   ├── pages/                   # 주요 라우팅 페이지
│   │   ├── CafeHomeBeanUpdate.* # 빈자리 배치도 만들기 페이지
│   │   ├── CafeLanding.*        # 점주 측 랜딩 페이지
│   │   ├── CafeMapCreated.*     # 도면 제작 완료 페이지
│   │   ├── CafeMapCreating.*    # 도면 제작 중 페이지
│   │   ├── CafeRegister1.*      # 업체 등록 설명 페이지
│   │   ├── CafeRegister2.*      # 회원가입 밎 업체 등록 페이지
│   │   ├── CafeSignIn.*         # 점주 측 로그인 페이지
│   │   ├── CafeTableInfo.*      # 테이블 정보 수정 페이지
│   │   ├── CafeUpload.jsx       # 배치도 업로드 페이지
│   │   ├── DefaultLanding.*     # 랜딩 페이지
│   │   ├── UserAfterSearch.*    # 챗봇 검색 결과 페이지
│   │   ├── UserCafeDetail.*     # 유저측 카페 상세 페이지
│   │   ├── UserHome.*           # 지도 및 챗봇 페이지
│   │   └── UserLanding.*        # 유저측 첫 페이지
│   │
│   ├── utils/                   # 유틸 함수 모음
│   ├── App.js                   # 앱 엔트리 / 라우터 설정
│   ├── index.js                 # React DOM 엔트리
│   └── index.css                # 글로벌 스타일
│
├── package.json                 # 프로젝트 설정 및 의존성
├── package-lock.json
└── README.md
```

## 📝 라우팅 흐름
### 점주측
flowchart TD
    A[Default Landing] -->|카페를 운영하는 점주입니다| B[Cafe Landing]
    B -->|업체 등록하기| C[Cafe Register 1]
    C -->|업체 등록하기| D[Cafe Register 2]
    D -->|업체 등록 완료| E[Cafe SignIn]
    E -->|로그인| F[Cafe Upload]
    F -->|배치도 생성 및 관리| G[Cafe Map Creating / Created]


### 이용자측
flowchart TD
    A[Default Landing] -->|카페를 찾는 이용자입니다| B[User Landing]
    B -->|로그인| C[User Home]
    C -->|Bean AI 검색| D[User After Search]
    D -->|특정 카페 클릭| E[User Cafe Detail]
    E -->|좌석 현황 확인| F[좌석 예약]

## 📄 라이선스

본 프로젝트의 모든 권리는 프로젝트 팀 **조미유양반김** 에게 있습니다.  
무단 복제 및 배포를 금지합니다.
