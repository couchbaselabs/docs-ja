Couchbase Serverドキュメント翻訳プロジェクト
============================================

Couchbase Server公式ドキュメントの翻訳プロジェクトです。ドキュメントはPDFにすると500Page近くのボリュームになります。いち早く公式に日本語ドキュメントを公開できるよう、皆さんのお力をお貸しください。

現在の翻訳状況は[previewページ](http://labs.couchbase.com/docs-ja/preview/)にて確認できます。

Contribute方法
==================

jaディレクトリの下にある*.ditaファイルを翻訳し、pull requestを送ってください。

翻訳時の注意事項
=================

## 言語指定
DITA XMLファイル内のmap, topic要素には*xml:lang="ja"*を指定してください。

HTML生成方法
============

## 必要なもの

- Java
- [DITA Open Toolkit](http://www.dita-ot.org/)

## 生成コマンド
./bin/rebuild-docs-out.sh

./out ディレクトリにHTMLドキュメントが生成されます。
