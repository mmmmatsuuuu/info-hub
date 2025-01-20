# Node.js の公式イメージを使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# 作業ディレクトリをボリュームとしてバインド
VOLUME /app

# 必要に応じてコマンドを実行
CMD ["sh"]

# # TypeScript有効化、Tailwind CSS追加のNext.jsプロジェクト作成
# RUN npx create-next-app@latest . --typescript --tailwind --eslint --src-dir --import-alias "@/*" --yes
