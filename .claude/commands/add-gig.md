# /add-gig — ギグ情報をgigs-data.jsに追加

ユーザーが貼り付けたギグ情報（テキスト）を読み取り、`js/gigs-data.js` の先頭（配列の最初）に新しいエントリを追加してください。

## 手順

1. ユーザーのメッセージからギグ情報を読み取る
2. 以下のフィールドを抽出する：
   - `date`：`YYYY-MM-DD` 形式に変換（例：2026/3/14 → "2026-03-14"）
   - `event`：イベント名
   - `isCaress`：CARESSが主催するイベントの場合は `true`（ほしのおと×CARESS、CARESS ROOM、CARESS→などはtrue。mewetaがゲスト出演するだけの場合はfalse）
   - `venue`：会場名
   - `time`：開場・開演時間（例："OPEN 23:00" または "OPEN 18:00 / START 18:30"）
   - `artists`：出演者リスト。role（"DJ" / "live" / "VJ" / フロア名など）ごとにグループ化し、namesをスラッシュ区切りの文字列で。情報がない場合は省略。

3. `js/gigs-data.js` を読み込み、配列の**先頭**に新エントリを挿入する（降順を保つため）

4. フライヤー画像パスが提供された場合：
   - `C:\Claude Code\meweta-site\images\` にコピーする
   - ファイル名は `[event-slug]-[YYYYMMDD].[ext]` 形式（例：`caress-room-20260212.jpeg`）

5. isCaress が true の場合、`caress.html` の **upcoming または past** セクションにも手書きのイベントブロックを追加する（日付が今日以降ならupcoming、過去ならpast）

6. 変更をgit add → commit → pushする

## gigs-data.js のフォーマット例

```js
{
  date: "2026-03-14",
  event: "イベント名",
  isCaress: true,          // CARESSイベントのみ
  venue: "会場名",
  time: "OPEN 23:00",
  artists: [
    { role: "DJ", names: "A / B / C" },
    { role: "live", names: "D / E" },
    { role: "VJ", names: "F" }
  ]
},
```

## caress.html のイベントブロック例

```html
<li class="event-item anim-slide">
  <div class="event-header">
    <span class="event-title">イベント名</span>
    <span class="event-date">2026.03.14 (Sat)&emsp;OPEN 23:00</span>
    <span class="event-venue">会場名</span>
  </div>

  <div class="event-flyer">
    <img src="images/[filename]" alt="[イベント名] flyer">
  </div>

  <div class="event-body">
    <div class="event-lineup">
      <div class="event-lineup-floor">
        <span class="event-lineup-role">DJ</span>
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      </div>
    </div>
    <div class="event-info-block">
      <div>DOOR ¥2,000（+1D）</div>
    </div>
  </div>
</li>
```

フライヤー画像がない場合は `<div class="event-flyer">` ブロックを省略してください。

## 注意事項

- gigs-data.jsは**降順**（新しいものが先頭）で管理する
- caress.htmlのupcomingは新しい順、pastも新しい順（先頭）に挿入
- コミットメッセージ例：`Add [イベント名] ([日付]) to gigs`
