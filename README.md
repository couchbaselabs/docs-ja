Couchbase Server Docs Translation project
============================================

Couchbase Server公式ドキュメントの翻訳プロジェクトです。ドキュメントはPDFにすると500Page近くのボリュームになります。いち早く公式に日本語ドキュメントを公開できるよう、皆さんのお力をお貸しください。

現在の翻訳状況は[previewページ](http://labs.couchbase.com/docs-ja/preview/)にて確認できます。

Contribute方法
==================

## 翻訳に協力

ドキュメントは[DITA](http://ja.wikipedia.org/wiki/Darwin_Information_Typing_Architecture)で記述されています。各トピックが個別のXMLファイル(.dita)です。
翻訳状況の管理と、作業の重複を防ぐために、この翻訳プロジェクトでは各DITAファイルにつきissueを一つずつ作成しています。

例) [Translate ja/learn/admin/CLI/CBstats/cbstats-config.dita](https://github.com/couchbaselabs/docs-ja/issues/43)

issueには[translation wanted](https://github.com/couchbaselabs/docs-ja/labels/translation%20wanted)とhelp wantedのlabelを付けています。未着手のDITAファイルを探すのに利用してください。

jaディレクトリの下にある*.ditaファイルを翻訳し、Pull Requestを送ってください。
WIP (Work In Progress) ブランチをPull Requestする形で運用します。
作業の流れは以下のようになります:

1. couchbaselabs/docs-jaプロジェクトをfork
2. git clone [forkしたプロジェクト]
3. git checkout -b 359
    * issueの番号でブランチを作成します
4. git commit --allow-empty -m 'Work-In-Progress on #359'
5. git push origin 359
    * これで、空コミットが作成されて、Pull Requestできるようになります
6. Pull Requestする
    * この段階でissueにプルリクエストが紐付けられ、作業開始を宣言した状態になります。他の翻訳者の方と作業の重複を防ぐため、翻訳するファイルを決めたら、まずここまで一気にやってしまいましょう
7. 翻訳が終わったら、 以下の作業をしてください
    1. git commit
        * 最後のコミット
    2. git rebase -i master
        * プルリクエスト前にコミットをまとめてください（[参考1](http://www.karakaram.com/git-rebase-i-usage#squash), [参考2](http://www.karakaram.com/git-rebase-i-usage#fixup)）
    3. git push -f origin 359
        * rebase後のpushなので、forced pushしてください
    4. プルリクエストの題名プレフィクスを `[WIP]` から `[WFR]` (Work in Progress -> Waiting for Review) にする
        * 途中経過を共有したい場合はWIPのままpushしてください
8. ijokarumawakがPull Requestをレビューし、問題なければマージします

上記手順 4. のコミットコメントが重要で、[#359](https://github.com/couchbaselabs/docs-ja/issues/359)
のように「プルリクコミットから参照されたよ」と 自動的に記載されるので、
後から見た人が「ああ、これは着手中なんだな」とわかります。

WIPブランチとPull Requestについては、[こちらの記事](http://bouzuya.hatenablog.com/entry/2014/04/02/235959)が分かりやすいです。

ご不明な点はissueのコメントにお願いします。

## レビューに協力

[previewページ](http://labs.couchbase.com/docs-ja/preview/)をご覧いただき、誤字や誤訳を発見した場合はissueを起票してください:
- 該当箇所がわかるようにコメントをお願いします、ファイル: admin/xxx.dita、もしくはpreviewのURL
- 正誤方式が分かりやすいです、例) 誤:パケットを作成し 正:バケットを作成し

翻訳時の注意事項
=================

- 言語指定: DITA XMLファイル内のmap, topic要素には*xml:lang="ja"*を指定してください。

HTML生成方法
============

## 必要なもの

### 必須

- [Java SE](http://www.oracle.com/technetwork/java/javase/downloads/index.html) or [OpenJDK](http://openjdk.java.net/)
- [DITA Open Toolkit](http://www.dita-ot.org/)

### オプション

- [Node.js](http://nodejs.org/) 
    * [ja ディレクトリ配下に変更が入った場合に自動的にビルドする](#ja-ディレクトリ配下に変更が入った場合に自動的にビルドする) 場合に必要

## 生成コマンド

以下のコマンドを実行すると、 `out` ディレクトリにHTMLドキュメントが生成されます。

### Unix/Mac

※ `<JRE>/bin` と `<DITA>/bin` にパスが通っていない場合は、 `bin/env.sh.example` を `bin/env.sh` にコピーした上で、書き換えた上で実行してください。

```
bin/rebuild-docs-out.sh
```

### Windows

※ `<JRE>\bin` と `<DITA>\bin` にパスが通っていない場合は、 `bin\env.ps1.example` を `bin\env.ps1` にコピーした上で、書き換えた上で実行してください。

※ **エクスプローラ上からダブルクリックでも実行できます**

```
bin\rebuild-docs-out.ps1
```

## ja ディレクトリ配下に変更が入った場合に自動的にビルドする

node.js を使って、 ja ディレクトリ配下に変更が入った場合に自動的にビルドすることができます。

1. `cd <リポジトリを clone したディレクトリ>`
2. `npm i watchr iconv-lite http-server`
3. `bin/env.json.example` を `bin\env.json` にコピーし、環境に合わせて書き換える
4. `node bin/watch.json` (Unix/Mac) or `node bin\watch.json` (Windows)

また、別のコンソールを立ち上げて、以下の手順を踏むことで、  [http://localhost:8080/](http://localhost:8080/) でドキュメントを見ることができます。

1. `cd <リポジトリを clone したディレクトリ>`
2. `node_modules/.bin/http-server out` (Unix/Mac) or `node_modules\.bin\http-server out` (Windows)

なお、Tomcat などがローカルで起動していて 8080 がすでに使われている場合、 8081 などで listen します。

実際に listen しているポートは `node_modules/.bin/http-server out` の実行後に出力されるメッセージで確認できます。

```
Starting up http-server, serving out on: http://0.0.0.0:8081
Hit CTRL-C to stop the server
```
