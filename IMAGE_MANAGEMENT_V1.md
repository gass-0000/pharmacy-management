# 画像管理システム v1.0

`index.html` に埋め込まれていた Base64 画像を、`assets/images/` 配下の外部 PNG へ移行しました。

## 今後の画像差し替え

同じパス・同じファイル名で PNG を上書きしてコミットすると、HTMLを編集せずに画像を更新できます。

主な差し替え先：

- 月次決算会議：`assets/images/meeting/monthly-closing-meeting.png`
- ホーム画面：`assets/images/home/pharmacy-home-map.png`
- 施設ストリップ：`assets/images/home/facility-strip.png`
- 田中プロフィール：`assets/images/staff/tanaka/tanaka_profile.png`
- 佐藤プロフィール：`assets/images/staff/sato/sato_profile.png`
- 鈴木プロフィール：`assets/images/staff/suzuki/suzuki_profile.png`
- 伊藤プロフィール：`assets/images/staff/ito/ito_profile.png`
- 渡辺プロフィール：`assets/images/staff/watanabe/watanabe_profile.png`

## 注意

- ファイル名と保存場所を変えると表示されません。
- GitHub Pagesで更新が見えない場合は、Safariのキャッシュを削除するか、URL末尾に `?v=2` を付けて確認してください。
- ゲームロジック、計算式、セーブデータ処理は変更していません。
