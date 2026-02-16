# /add-caress — CARESSイベントをcaress.htmlに追加

ユーザーが貼り付けたCARESSイベント情報を読み取り、`caress.html` の upcoming または past セクションに詳細なイベントブロックを追加します。同時に `js/gigs-data.js` にも追加します。

## 手順

1. ユーザーのメッセージからイベント情報を読み取る
2. 日付が今日以降 → **upcoming** セクション、過去 → **past** セクションの先頭に挿入
3. フライヤー画像パスが提供された場合、`C:\Claude Code\meweta-site\images\` にコピーする
4. `js/gigs-data.js` にも `isCaress: true` でエントリを追加する（先頭挿入、降順を保つ）
5. git add → commit → push

## 抽出する情報

- イベント名
- 日付・時間（OPEN/START）
- 会場
- LIVE出演者
- DJ出演者
- VJ出演者
- 料金
- チケットリンク（e+、LivePocketなど）
- スタッフ（PA、Flyer、photo、snap、Visualsなど）
- その他（POP UPショップ情報など）

## caress.html の構造

```html
<li class="event-item anim-slide">
  <div class="event-header">
    <span class="event-title">イベント名</span>
    <span class="event-date">2026.03.14 (Sat)&emsp;OPEN 23:00</span>
    <span class="event-venue">会場名</span>
  </div>

  <!-- フライヤーがある場合のみ -->
  <div class="event-flyer">
    <img src="images/[filename]" alt="[イベント名] flyer">
  </div>

  <div class="event-body">

    <div class="event-lineup">
      <div class="event-lineup-floor">
        <!-- フロアが複数ある場合はdivを複数に分ける -->
        <span class="event-floor-label">フロア名</span>  <!-- 複数フロアの場合 -->
        <span class="event-lineup-role">live</span>
        <ul>
          <li>アーティスト名</li>
        </ul>
        <span class="event-lineup-role">DJ</span>
        <ul>
          <li>アーティスト名</li>
        </ul>
        <span class="event-lineup-role">VJ</span>
        <ul>
          <li>アーティスト名</li>
        </ul>
      </div>
    </div>

    <div class="event-info-block">
      <!-- 料金 -->
      <div>
        star discount ¥3,000<br>
        ADV / DOOR ¥3,500 / ¥4,000<br>
        （税込｜オールスタンディング｜ドリンク代別）
      </div>
      <!-- チケットリンク（ある場合） -->
      <div class="event-ticket">
        <a href="URL" target="_blank" rel="noopener">e+</a><br>
        <a href="URL" target="_blank" rel="noopener">LivePocket</a><br>
        <span>一般発売：日時</span>
      </div>
      <!-- スタッフ情報（ある場合） -->
      <div class="event-ticket">
        PA：名前<br>
        Flyer：名前<br>
        photo：名前
      </div>
    </div>

  </div>
</li>
```

## 注意事項

- 情報がない項目（チケット、スタッフなど）は省略する
- 複数フロアある場合は `event-lineup-floor` を複数作成し `event-floor-label` でフロア名を表示
- 降順（新しい順）を保つ
