# Chikuwa Teams Mod

# 説明

本プログラムは、`Microsoft Teams` で利用できる `Greasmonkey` 用のMODです。
元々の目的は `チクチク言葉` を `フワフワ言葉` へ変換するのを目的として作成していました。
使うためには、個人でビルドが必要です。

# 利用方法

1. [node.js](https://nodejs.org/ja/download/) をインストールする
2. `package.json` があるディレクトリで `npm install` を入力して実行する
3. `npm run build` を入力して実行する
4. `./build/ChikuwaTeamsMod.js` が `Greasmonkey` 用のMODとなる

# ファイル構成

## トップディレクトリ

| ファイル | 説明 |
| --- | --- |
| `src` | 今回の MOD を作成するためのソースコード |
| `scripts` | ビルド等に使用するソースコード |
| `build` | ビルド後の `Greasmonkey` 用のMODが保存される |
| `tmp` | ビルド中に一時的に使用される |

## ソースコード用のファイルなど

| ファイル | 説明 |
| --- | --- |
| `./src/main/main.js` | メインのソースコード、モジュールの呼び出し元 | 
| `./src/main/header.js` | `Greasmonkey` 用のヘッダー部分 |
| `./src/modules` | 組み込むモジュール(ここにあるファイルが自動的に組み込まれる) |
| `./src/modules/*/install.json` | 組み込みに使用するためのインストール用コード |

## その他

その他、`Node.js` のライブラリをいくつか導入しています。詳細は `./main/package.json` を参照してください。

# ライセンス

GitHub上で公開しているソースコード群は、特別に何か記載していない限り、MITライセンスと致します。ただしコード上にライセンス等記及びフォルダ階層上のライセンスファイルがありましたら、そちらを優先下さい。

## Author ##
- [natade-jp](https://github.com/natade-jp/)
