# 傳媒協作力提升｜學員互動網站

在 GitHub Pages 以 `main` 分支根目錄發佈。學員頁不用登入。課堂答案由獨立後端處理，倉庫只有教學頁、前端程式及公開來源素材。

每次授課，在 [導師控制台](https://news-writing-workshop-1116.ronlam1981.chatgpt.site/classroom/teacher) 建立日期場次、選題、開放收答及派匿名交答券。複製場次連結給學員。控制台按場次查看收件數、抽答、投影及保存經同意的匿名示例。

- `activities.js` 定義練習要求及對照重點
- `classroom.js` 處理導航、現場活動及交答
- `icebreaker.html` 提供澳門政府新聞局四組破冰素材
- `summary-materials.html` 提供濃縮底稿及原文連結
- `reveal.html` 是傳話活動的投影備用頁

若遷移收件後端，更新 `classroom.js` 的 `hostedBase`，並在後端只向正式 GitHub Pages origin 開放學員 API 的跨域請求。導師入口維持在後端的同源網頁。
