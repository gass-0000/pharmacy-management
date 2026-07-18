# 初回コミット・GitHub登録・タグ付け手順

`<YOUR_USERNAME>` と `<REPO_NAME>` は実際の値に置き換えてください。
このファイル自体はセットアップ完了後、リポジトリから削除して構いません（一度きりの手順のため）。

## 0. 事前準備

- ローカルに `index.html` / `.gitignore` / `README.md` などを1つのフォルダにまとめておく
- GitHub上に空のリポジトリを作成しておく（README・.gitignore・LICENSEは追加せず「空」で作成するのが安全）
  - `https://github.com/new` から作成、または後述の `gh` CLI でも可

## 1. リポジトリ初期化

```bash
cd /path/to/your/project
git init
git branch -M main
```

## 2. 初回コミット

```bash
git add .
git status   # コミット対象を目視確認（.gitignoreで除外されるべきファイルが混ざっていないか）
git commit -m "chore: v0.6.1 baseline import"
```

## 3. リモートリポジトリと接続

### すでにGitHub上に空リポジトリを作成済みの場合

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
```

### まだ作成していない場合（GitHub CLI `gh` を使う場合の一発コマンド）

```bash
gh repo create <REPO_NAME> --public --source=. --remote=origin --push
```
（`gh` 未インストールの場合は `brew install gh` 等でインストール後、`gh auth login` でログインしてください）

## 4. プッシュ

```bash
git push -u origin main
```

## 5. バージョンタグを打つ

このコミットを「v0.6.1」として明示するため、注釈付きタグ（annotated tag）を作成します。

```bash
git tag -a v0.6.1 -m "v0.6.1: 月次決算会議の表示バグ修正（伊藤のセリフが最終月でも「来月は」のままになる不具合）"
git push origin v0.6.1
```

以降、新しいバージョンを出すたびに同じ要領で繰り返します。

```bash
# 例：次にv0.6.2を出すとき
git add .
git commit -m "fix: ○○の不具合を修正"
git tag -a v0.6.2 -m "v0.6.2: ○○を修正"
git push origin main
git push origin v0.6.2
```

## 6. GitHub Pages を有効化

1. GitHub上のリポジトリページ → **Settings** タブ → 左メニュー **Pages**
2. **Build and deployment** → **Source** を `Deploy from a branch` に設定
3. **Branch** を `main` / `/ (root)` に設定して **Save**
4. 数分待つと、以下のURLで公開されます

```
https://<YOUR_USERNAME>.github.io/<REPO_NAME>/
```

公開直後はCDNキャッシュにより古い内容が見えることがあります。詳しくは `CACHE_STRATEGY.md` を参照してください。

## 7. 動作確認

- 上記URLをブラウザ（できればプライベート/シークレットウィンドウ）で開く
- ハブ画面右上に `v0.6.1` の表示があることを確認する
- 更新履歴パネルに今回の修正内容が反映されていることを確認する

## よくあるトラブル

| 症状 | 原因・対処 |
|---|---|
| `git push` で認証エラー | HTTPSの場合はPersonal Access Token（PATCH権限repo）が必要。SSH鍵登録済みならSSH URLの利用も検討 |
| Pagesが404のまま | Source設定後、反映まで数分かかることがある。Actionsタブでビルド状況を確認 |
| 更新したのに古い画面が出る | `CACHE_STRATEGY.md` の対策（`?v=` クエリ付きURL・ハード再読み込み）を参照 |
