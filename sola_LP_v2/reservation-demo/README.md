# 予約フォーム PoC

体験レッスン仮予約のステップフォーム（店舗・曜日・レッスン選択 → 名前・電話番号 → LINEで予約確認）。

## ファイル構成

- `reservation-demo.html` - エントリページ
- `reservation-demo.css` - スタイル（rv- プレフィックスのみ）
- `reservation-demo.js` - ステップ制御・フォーム処理
- `reservation-data.js` - 店舗・曜日・レッスンデータ（仮）

## LINE oaMessage（必須設定）

`reservation-data.js` の `LINE_OA_BASIC_ID` を、テスト用公式アカウントの**基本ID**（`@` で始まる文字列）に書き換えてください。  
`https://lin.ee/sQ5iTts` で作成したアカウントの ID は、LINE Official Account Manager の「設定」→「基本情報」で確認できます。

## 使い方

- ブラウザで `reservation-demo.html` を開く
- LPから使う場合は `reservation-demo/reservation-demo.html` へのリンクを張る
- 「LPに戻る」は `../index.html` を参照（同階層にLPの index.html がある場合）

## 単体で git 管理する場合

```bash
cd reservation-demo
git init
git add .
git commit -m "Initial: reservation form PoC"
```
