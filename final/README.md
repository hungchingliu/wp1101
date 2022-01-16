# What are you listening to?
## About the project
題目發想主要來自這部影片：
https://www.youtube.com/watch?v=qIzOgjTLcec
影片會讓人不自覺的想要看下去，感覺可以透過一個人聽什麼音樂和穿著打扮來猜測他的個性，
不同地區的人也傾向聽不同的音樂，蠻有趣的。

這個 project 簡單來說可以看到附近的人在聽什麼，同時可以登入 spotify 帳號來分享自己正在聽什麼，可以參考以下 demo 影片 和 demo 網站。

Demo Video Link: what-are-you-listening-to.herokuapp.com

Deploy Link:?


## 安裝與使用

In the project directory `what-are-you-listening-to`, you can run:

### `yarn install`
install dependencies
### `fill in .env from .env.defaults`
### `yarn build`
Compile `./backend` to `lib/` with @babel

Build static react frontend in `lib/build`

### `yarn start`
Start the server. Default port number is 80.
### `yarn clean`
`rm lib/`
### `yarn start_react`
start react frontend

### add fake user
see backend/mongo.js

## 功能

1. 瀏覽器會向你索取位置分享權限，若同意的話地圖將會使用 `navigator.geolocation.getCurrentPosition`定位到你所在的位置，有時會不太準確，若不同意座標將設在台大。

2. 定位到所在地後，app 將會向後端索取你附近的 user 正在用 spotify 聽什麼音樂，顯示在左方卡片和地圖上

3. 若點擊左方卡片或是地圖上的人形，卡片會展開取的 spotify 播放元件，可以播放該 user 正在聆聽的音樂

4. 點擊 loging spotify 將會使用第三方登入 spofify，登入後將會向別的使用者分享正在聽什麼音樂

5. 由於目前 polling 時間大致為 30 秒，所以其他使用者要經過 1~2 分鐘才可以看到更新的結果

5. 測試關係塞了一堆假的使用者到 DB，15天後會消失，目前只提供大台北地區服務


## 專題製作心得
---劉鴻慶---

期末 project 想練習串串看第三方 api，最後選擇的是 google map api 和 spotify api。一開始夢很大本來想串 Google street view，就會有種半 AR 的體驗，但是研究了兩三天沒有結果，期末又快 due 的就放棄了。最後快做完的時候才想到這個服務通常是給手機使用，但時間關係沒做 reponsive，有點可惜。 Deploy 時後端的code 因為使用 babel 開發最後 build 的時候出了一點狀況，弄了一整天，真的不要拖到最後才 deploy。

## 使用與參考之框架/模組/原始碼
前端排版有參考這個教學影片：https://www.youtube.com/watch?v=UKdQjQX1Pko&t=507s
## 使用之第三方套件、框架、程式碼
前端: Reactjs, apollo, axios, materail ui, google-map-react, \<spotify iframe widget\>, graphql


後端: express, mongoose, babel, graphql, spotify-web-api-node


資料庫: MongoDB


## 分工:
R10922047 資工碩一 劉鴻慶 100%

## 課程建議
1. 會想多了解 browser 的運作原理
2. 會想多了解 server 要如何 scale up，容易發生瓶頸的地方和解決方案
3. 感覺 hackthon 可以改成作業的形式


 