# duo-repent (듀오 반성해)

지금 쓰는 갤럭시·아이폰 브라우저에서 아이폰 듀오의 단점을 미리 겪어보는 **비공식 시뮬레이션** 웹앱. 한국어 / English.
An **unofficial simulation** that lets you try the iPhone Duo's downsides in the phone browser you already have. Korean / English.

👉 https://tnwldes.github.io/duo-repent/ (영어로 바로 열기: `?lang=en`)

## 무엇을 체험하나
- 접힌 외부 화면(5.4″) / 펼친 내부 화면(7.6″) 비율 재현 — **세로로 들면 접힘, 가로로 돌리면 펼침 자동 전환** + 📖 버튼 수동 전환
- 미대응 앱 검은 바, 캡처 시 검은 바 겹침, 크랙게이트 균열, 오른쪽 몰린 UI, 한 손 엄지 범위
- 측면 Touch ID 잠금, 발열, 나노텍스처, 254g 무게 비교
- **내 스크린샷 불러오기** — 내 폰의 실제 앱 화면에 듀오 화면 조건을 씌워보기 (기기 안에서만 처리, 업로드 없음)
- 듀오 가격으로 살 수 있는 것 비교표 (커피, 그래픽카드, CPU, Claude Pro 등)
- ☰ 메뉴: 체험 12가지 목록 · 화면 효과 켜고 끄기 · 도움말·출처 · 언어

## 웹페이지라서 할 수 없는 것
실제 카톡·유튜브·은행 앱 위에 효과를 겹치거나 조작하기, 폰의 실제 해상도 바꾸기, 다른 앱 화면 실시간 가져오기는 불가능합니다. 아이폰 Safari는 화면 방향 고정·전체화면·진동을 지원하지 않습니다. 홈 화면에 추가(PWA)해도 별도 창일 뿐 다른 앱 위에 뜨지 않습니다.

## 파일 구조
```
index.html              뼈대
css/                    style(기본·인트로·패널) · device(기기·앱) · effects(공통 효과)
locales/ko.js, en.js    번역 사전 — 화면 문구는 전부 여기
js/i18n.js              t(), 언어 감지·저장(localStorage duoLang), ?lang= 지원
js/data.js              앱 목록·기종 무게·가격 데이터
js/state.js             상태 + 설정 저장(localStorage duoPrefs)
js/effects.js           공통 효과 레이어 (검은 바·오른쪽 UI·접힘선·왜곡·뿌연 검은색·크랙·한 손·발열)
js/layout.js            화면 비율·키보드 대응·자동/수동 접힘 전환
js/apps/*.js            체험용 앱 (톡·은행·영상·브라우저·사진·메모·카메라·설정·가격표)
js/screenshot.js        내 스크린샷 불러오기
js/capture.js           📸 캡처 (html2canvas, 첫 캡처 때 지연 로드)
js/experiences.js       체험 목록·하단 안내줄·메뉴 패널
js/app.js               렌더·조작·부팅
vendor/                 html2canvas 1.4.1 (MIT)
manifest.webmanifest, sw.js, icons/   홈 화면 추가(PWA)·오프라인
```
빌드 도구·프레임워크 없음. 일반 `<script>`라서 `index.html`을 파일로 바로 열어도 동작합니다(PWA·오프라인은 https에서만).

## 배포 (GitHub Pages)
1. 이 폴더의 파일·폴더를 저장소 루트에 그대로 올립니다 (기존 `index.html`, `README.md`는 덮어쓰기).
2. Settings → Pages → Branch `main` / `/ (root)`.
3. 파일 목록이 바뀌면 `sw.js`의 `VERSION`을 올려 주세요. (네트워크 우선이라 평소 수정은 바로 반영됩니다.)

## 언어 추가
`locales/en.js`를 복사해 `locales/xx.js`로 번역 → `index.html`에 `<script>` 한 줄 추가 → `js/i18n.js`의 `SUPPORTED`에 `'xx'` 추가 → `sw.js` 목록에 추가.

애플과 무관한 비공식 시뮬레이션입니다. Not affiliated with Apple.
