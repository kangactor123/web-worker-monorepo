# @web-worker/Monorepo

<p>Web Worker 예제를 구현한 모노레포 입니다.</p>

## 패키지 소개
### apps/example

<p>Web Worker 예제를 담고 있는 app 입니다.</p>

### server

<p>Web Worker with Socket을 구현하기 위한 Mock서버 입니다.</p>

## Script

```
# 개발 서버를 실행합니다.
pnpm run dev

# 빌드를 실행합니다. 서버는 빌드에서 제외됩니다.
pnpm run build
~
# 빌드 결과물을 실행합니다. 프론트엔드 애플리케이션은 4173번 포트에서 실행됩니다.
pnpm run build:live
```

## Description

- 각 앱/서버의 README에 간단한 설명이 있습니다.
