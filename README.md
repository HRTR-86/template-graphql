# 概要
・React, Laravel, GraphQLを使った環境の雛形です
・Inertia.jsを利用した環境から移行中です
・Google認証、権限、データ取得・更新などの基本的な機能を実装しています

# 環境構築の手順
## 1. 事前準備
1. 本リポジトリーをcloneする
2. .env.exampleをコピーして.envファイルを作成する

## 2. コンテナのビルドと起動
### Apple Siliconの場合
以下のコマンドを実行する
```
$ docker compose build
$ docker compose up -d
```

### Intelの場合
以下のコマンドを実行する
```
$ docker compose -f docker-compose-for-intel.yml build
$ docker compose -f docker-compose-for-intel.yml up -d
```

## 3. 各種インストール
以下のコマンドを実行する
```
$ docker exec -it template-graphql-web bash
# composer install
# npm install
```

## 4. データベースの初期化
以下のコマンドを実行する
```
# php artisan migrate
# php artisan db:seed --class=ExecuteMstSeeder
```

## 5. 画面へのアクセス
1. `# npm run dev`を実行する
2. `http://localhost:8080` にアクセスする
