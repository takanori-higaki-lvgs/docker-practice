# Docker課題
- Google Spread Sheet からデータ取得し、Docker上で起動しているDBに保存する。
- GitHubでリポジトリを作成してバージョン管理
- 使用言語はTypeScriptかPHP
- アプリケーション自体もDocker上で動かす
- Google Spreadsheet は個人でデータを入れて用意する。
- 作業端末にインストールしたローカルのDockerにDB とアプリケーションを入れる。
- GitHubは自身のメールアドレスで作成し、自身のアカウントにリポジトリを作成してバージョン管理を実施する。

## 環境構築

```
$ docker-compose up
$ docker-compose exec app bash
```

```
# nest new app
```