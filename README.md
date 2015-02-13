Couchbase Server Docs Translation project
============================================

Couchbase Server公式ドキュメントの翻訳プロジェクトです。ドキュメントはPDFにすると500Page近くのボリュームになります。いち早く公式に日本語ドキュメントを公開できるよう、皆さんのお力をお貸しください。

現在の翻訳状況は[previewページ](http://labs.couchbase.com/docs-ja/preview/)にて確認できます。

Contribute方法
==================

ドキュメントは[DITA](http://ja.wikipedia.org/wiki/Darwin_Information_Typing_Architecture)で記述されています。各トピックが個別のXMLファイル(.dita)です。
翻訳状況の管理と、作業の重複を防ぐために、この翻訳プロジェクトでは各DITAファイルにつきissueを一つずつ作成しています。

例) [Translate ja/learn/admin/CLI/CBstats/cbstats-config.dita](https://github.com/couchbaselabs/docs-ja/issues/43)

issueには[translation wanted](https://github.com/couchbaselabs/docs-ja/labels/translation%20wanted)とhelp wantedのlabelを付けています。未着手のDITAファイルを探すのに利用してください。

翻訳作業を開始する際に、issue画面の**assign yourself**をクリックし、翻訳者の紐付けをお願いします。
jaディレクトリの下にある*.ditaファイルを翻訳し、pull requestを送ってください。

ご不明な点はissueのコメントにお願いします。


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
