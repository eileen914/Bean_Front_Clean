# Bean - 카페 운영 플랫폼

Figma 디자인을 기반으로 구현된 카페 운영 플랫폼의 프론트엔드 애플리케이션입니다.

## 🚀 시작하기

### 필수 요구사항
- Node.js (v14 이상)
- npm 또는 yarn

### 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm start
```

3. 브라우저에서 `http://localhost:3000`으로 접속

## 📱 페이지 구성

### 1. Default Landing (`/`)
- 메인 랜딩 페이지
- "카페를 운영하는 점주입니다" 버튼 클릭 시 Cafe Landing으로 이동

### 2. Cafe Landing (`/cafe-landing`)
- 카페 운영자 전용 랜딩 페이지
- "로그인" 버튼 클릭 시 Cafe SignIn으로 이동
- "업체 등록하기" 버튼 클릭 시 Cafe Register 1로 이동

### 3. Cafe SignIn (`/cafe-signin`)
- 로그인 페이지
- 이메일/비밀번호 입력 폼
- 소셜 로그인 옵션 (Google, Kakao)
- "회원가입" 버튼으로 Cafe Register 1로 이동

### 4. Cafe Register 1 (`/cafe-register-1`)
- 업체 등록 첫 번째 단계
- 기본 정보 입력 (업체명, 업종, 사업자등록번호, 대표자명, 연락처, 이메일)
- "업체 등록하기" 버튼 클릭 시 Cafe Register 2로 이동

### 5. Cafe Register 2 (`/cafe-register-2`)
- 업체 등록 두 번째 단계
- 상세 정보 입력 (주소, 영업시간, 업체 소개, 온라인 정보, 편의시설)
- "업체 등록 완료하기" 버튼 클릭 시 Cafe Map Creating으로 이동

### 6. Cafe Map Creating (`/cafe-map-creating`)
- 지도 생성 중 로딩 페이지
- 3초 후 자동으로 Cafe Map Created로 이동
- 진행 상황 표시 및 애니메이션

### 7. Cafe Map Created (`/cafe-map-created`)
- 업체 등록 완료 페이지
- 성공 애니메이션 및 축하 메시지
- "대시보드로 이동" 또는 "홈으로 돌아가기" 버튼

## 🎨 디자인 특징

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기에서 최적화
- **모던 UI**: 그라디언트 배경, 그림자 효과, 부드러운 애니메이션
- **사용자 친화적**: 직관적인 네비게이션과 명확한 진행 상황 표시
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원

## 🛠️ 기술 스택

- **React 18**: 최신 React 기능 활용
- **React Router**: 클라이언트 사이드 라우팅
- **CSS3**: Flexbox, Grid, 애니메이션
- **ES6+**: 최신 JavaScript 문법

## 📁 프로젝트 구조

```
src/
├── pages/           # 페이지 컴포넌트
│   ├── DefaultLanding.js
│   ├── CafeLanding.js
│   ├── CafeSignIn.js
│   ├── CafeRegister1.js
│   ├── CafeRegister2.js
│   ├── CafeMapCreating.js
│   └── CafeMapCreated.js
├── App.js           # 메인 앱 컴포넌트
├── index.js         # 진입점
└── index.css        # 전역 스타일
```

## 🎯 주요 기능

- **단계별 등록 프로세스**: 2단계로 나뉜 업체 등록
- **진행 상황 표시**: 현재 단계를 시각적으로 표시
- **폼 검증**: 필수 필드 검증 및 사용자 피드백
- **로딩 애니메이션**: 사용자 경험 향상을 위한 애니메이션
- **성공 피드백**: 등록 완료 시 축하 메시지 및 다음 단계 안내

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build

# 테스트 실행
npm test

# 코드 이젝트 (주의: 되돌릴 수 없음)
npm run eject
```

## 📝 라우팅 흐름

```
Default Landing
    ↓ (카페를 운영하는 점주입니다)
Cafe Landing
    ↓ (로그인)
Cafe SignIn
    ↓ (업체 등록하기)
Cafe Register 1
    ↓ (업체 등록하기)
Cafe Register 2
    ↓ (업체 등록 완료하기)
Cafe Map Creating (3초 대기)
    ↓ (자동 이동)
Cafe Map Created
```

## 🎨 커스터마이징

각 페이지의 스타일은 해당 CSS 파일에서 수정할 수 있습니다:
- `src/pages/DefaultLanding.css`
- `src/pages/CafeLanding.css`
- `src/pages/CafeSignIn.css`
- `src/pages/CafeRegister1.css`
- `src/pages/CafeRegister2.css`
- `src/pages/CafeMapCreating.css`
- `src/pages/CafeMapCreated.css`

## 📞 지원

추가 문의사항이나 기능 요청이 있으시면 언제든지 연락해주세요. 