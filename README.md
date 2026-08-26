# 上位コンサルLP（独立トレーナー・施術家向け）

神戸のパーソナルジム経営者・元プロ野球／MLBトレーナーによる、
独立トレーナー・施術家向け上位コンサルの集客ランディングページ。

- 1ページ完結／レスポンシブ（**スマートフォン優先**設計）
- トンマナ：**モノトーン × アクセント1色（レッド）** のスポーツブランド的な方向性
- ビルド不要。`index.html` をブラウザで開けばそのまま表示されます

## ファイル構成

```
index.html              本体（全セクション）
assets/css/style.css    スタイル
assets/js/main.js       スムーズスクロール／追従CTA／フェードイン
assets/img/voice-0*.svg 「受講者の声」写真プレースホルダー
```

## 公開前にやること

### 1. 公式LINEのURLを入れる

すべてのCTAボタンのリンク先は `#LINE_URL` で統一しています。
一括置換してください。

```bash
sed -i 's|#LINE_URL|https://lin.ee/xxxxxxx|g' index.html
```

※ URL未設定（`#LINE_URL`のまま）の間は、押してもページ先頭に飛ばないよう
JS側で抑止しています。差し替え後は通常のリンクとして動作します。

### 2. 「受講者の声」を差し替える

`index.html` の `<section id="voice">` 内、`<article class="voice-card">` が3枠あります。

| 差し替える箇所 | 対象 |
|---|---|
| 写真 | `assets/img/voice-01.svg` 〜 `voice-03.svg` を差し替え（jpg/pngにする場合は `src` も変更） |
| お名前 | `<p class="voice-card__name">` の先頭テキスト |
| 肩書き | `<span class="voice-card__role">` |
| コメント | `<blockquote class="voice-card__comment">`（30〜50字程度が目安） |

写真は正方形（1:1）でトリミングされます。モノクロ表示→ホバーでカラーになります。

## 備考

- お問い合わせフォームは実装していません（LINE登録後、LINE内でアンケートURLを送付する運用のため）
- アクセントカラーは `assets/css/style.css` の `--accent` 1箇所で変更できます
