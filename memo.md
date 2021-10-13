# クラス詳細メモ
## Game
- セーブデータに保持しなくても良い値を保持
- セーブデータに保持すべき値をstoreと連携して操作
- ゲーム内の値の変更メソッドを所有

## Data
- DBにある変更されない値を保持

## Event
- シーン中に実行する複雑な処理群

## Manager
- 各クラスへ連携するためのクラス

## Scene
- 画面上の処理を定義するクラス
- 画面毎にある想定

## Sprite
- 描画する情報を保持するクラス
- アニメーションや描画物の移動もこいつ持ち

## Window
- キー入力にて処理が起こるものを扱う際に使用するクラス
- 基本Scene内に置き、このクラス内に描画を持つ
- 簡単な物や描画のみの場合はSceneに置く想定

## Store
- セーブデータ内に保持する値を保持
- Gameと連携して保持している値を随時変更する