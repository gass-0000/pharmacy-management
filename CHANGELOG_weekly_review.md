# 週次の振り返り背景 実装内容

## 基準ファイル
- `pharmacy_manager_v0.8.0_phase2_staffing.html`
- 画面内バージョン表記は変更していません。

## 修正ファイル
- `index.html`
  - 「閉店後の週次振り返り」画面だけに独立ステージを追加
  - 既存の週次結果UIをステージ下部の独立領域へ配置
  - JavaScript、計算ロジック、ID、ボタン処理は変更なし
- `assets/images/pharmacy/pharmacy-weekly-review-bg.jpeg`
  - 添付画像を再描画・加工せず、JPEGのままバイト単位でコピー

## レイヤー
1. `background-layer` — z-index: 0
2. `back-character-layer` — z-index: 10
3. `foreground-character-layer` — z-index: 30
4. `foreground-object-layer` — z-index: 40

## 表示設定
- `object-fit: contain`
- `object-position: center top`
- 読込前背景色: `#efd8ad`
- `overflow: hidden`
- 元画像と同じ `1330 / 1182` のアスペクト比で表示し、`100vh` には依存しない
- 画像への暗色フィルター、ぼかし、色変更なし

## 検証
- JavaScript SHA-256: 変更前後で一致
- 添付画像 SHA-256: `3ebc5ca9cc5d015072d9a56bbab9fc5a19d0b19dd70a62fc72f0edb70572df4e`（コピー先と一致）
- HTML内画像パスと実ファイル名の一致を確認
