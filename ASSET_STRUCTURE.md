# v0.6.2 背景素材

HTMLと `assets` フォルダを同じ階層のまま配置してください。

```text
index.html
assets/
  backgrounds/
    home.png
    weekly-plan.png
    staffing.png
    inventory.png
    policy.png
    consult.png
    weekly-result.png
    monthly.png
    evaluation.png
    notebook.png
    complete.png
    crisis.png
```

背景・UI・文字・ゲームロジックは分離されています。
背景PNGが欠損した場合も、v0.6.2ではCSSフォールバックが表示され、黒一色にはなりません。
