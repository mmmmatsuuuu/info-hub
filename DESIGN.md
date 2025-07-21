# 設計書

## 1. app/lessonページのサイドバー表示・非表示機能

### 目的
学習コンテンツの表示領域を広げるため、ユーザーがサイドバーを任意に表示・非表示できるようにする。

### 実装方針
- **状態管理**: `app/lesson/[lesson_id]/page.tsx` に、サイドバーの開閉状態を管理するstate（例: `isSidebarOpen`）を`useState`を用いて定義します。
- **切り替えボタン**:
  - サイドバーとレッスンコンテンツの間に、表示/非表示を切り替えるためのボタンを配置します。
  - このボタンは、クリックされると `isSidebarOpen` の状態をトグルします。
- **表示/非表示の切り替え**:
  - サイドバーコンポーネント（`components/component/common/Sidebar.tsx`）は、`isSidebarOpen` の状態をpropsとして受け取ります。
  - CSSの `transform` プロパティを使用して、サイドバーの表示・非表示を制御します。
    - **非表示時**: `transform: translateX(-100%);` を適用し、サイドバーを画面左側の領域外へ移動させます。トランジション効果を追加して、スムーズなアニメーションを実現します。
    - **表示時**: `transform: translateX(0);` を適用し、サイドバーを通常の位置に表示します。
- **レイアウト調整**:
  - `isSidebarOpen` の状態に応じて、メインコンテンツ（`LessonContent.tsx`）の左マージンを動的に調整します。
    - サイドバー表示時: `margin-left` をサイドバーの幅と同じ値に設定します。
    - サイドバー非表示時: `margin-left` を `0` に設定します。
  - これにより、サイドバーが非表示になった際にコンテンツが左にスライドし、表示領域が広がります。

### 対象ファイル
- `app/lesson/[lesson_id]/page.tsx`
- `components/component/common/Sidebar.tsx`
- `app/globals.css` (スタイリング用)


## 2. app/lessonページへのPython Playground実装

### 目的
ユーザーがレッスン内容に関連するPythonコードをブラウザ上で直接実行し、学習効果を高める。

### 実装方針
- **Pyodideの導入**:
  - Pyodide（WebAssembly上で動作するPython実行環境）を利用します。
  - `next/script`コンポーネントまたは`useEffect`内で動的にスクリプトをロードし、Pyodideを初期化します。初期化中はローディング表示を行います。

- **Playgroundコンポーネントの作成 (`PythonPlayground.tsx`)**:
  - **コードエディタ**: `@monaco-editor/react` を利用し、シンタックスハイライトやコード補完が機能するエディタを実装します。
  - **UIコンポーネント**: コード実行ボタン、出力表示領域、そして`input()`が呼ばれた際に使用する入力フィールドと送信ボタンを配置します。

- **`input()`の非同期ハンドリング (`registerJsModule`)**:
  1. **JavaScript側に関数を準備**: Playgroundコンポーネント内に、ユーザーに入力を促すUIを表示し、入力された値を解決する`Promise`を返す非同期関数（例: `promptForInput`）を定義します。
  2. **JSモジュールとして登録**: Pyodideの初期化時に `pyodide.registerJsModule()` を使用し、`promptForInput` を含むオブジェクトをPythonから利用可能なモジュール（例: `js_input_module`）として登録します。
  3. **Pythonコードのラップ**: ユーザーがコードを実行する際、システム側で以下の処理を行うPythonコードをユーザーコードの前に挿入します。
      - `js_input_module` をインポートする。
      - Pythonの組み込み`input`関数を、`await js_input_module.promptForInput()` を呼び出す非同期関数で上書きする。
      - ユーザーコード全体を `async def main(): ...` のように非同期関数で囲み、`asyncio.run(main())` で実行する。

- **ユーザーへの提示**:
  - この実装では、Pythonコード内で `input()` を使用する際に `await` が必須となります（例: `name = await input("名前は？")`）。
  - そのため、Playgroundの初期表示コードを `await` を使ったサンプルにし、ユーザーが正しい使い方を理解できるようにします。

- **利点**:
  - この方法は `SharedArrayBuffer` を必要としないため、サーバーの `COOP/COEP` ヘッダー設定が不要です。
  - これにより、YouTube埋め込みなど、他の外部リソースとの競合を回避できます。

### 対象ファイル
- `app/lesson/[lesson_id]/LessonContent.tsx`
- `components/component/common/PythonPlayground.tsx` (新規作成・修正)
- `next.config.ts` (ヘッダー設定は不要)

### 対象ファイル
- `app/lesson/[lesson_id]/LessonContent.tsx`
- `components/component/common/PythonPlayground.tsx` (新規作成)


## 3. localStorageを用いたユーザー利用状況の記録

### 目的
ユーザーの学習活動（動画の視聴、クイズへの挑戦など）を記録・可視化し、学習の進捗を実感できるようにする。また、記録したデータは将来的にマイページなどで一元的に確認できるようにし、機能拡張の基盤とする。

### 実装方針
- **データ構造の設計**:
  - 拡張性を考慮し、`localStorage`には単一のキー（例: `userInfoHubActivity`）で、構造化されたJSONオブジェクトを保存します。
  - これにより、将来的に新しい記録項目（例: 学習時間、完了済みレッスン）を追加するのが容易になります。
  ```json
  {
    "contentActivity": {
      "videos": {
        "contentId_123": { "playCount": 5 },
        "contentId_456": { "playCount": 2 }
      },
      "quizzes": {
        "contentId_789": { "clickCount": 3 }
      }
    }
    // 将来的に他のアクティビティをここに追加
  }
  ```

- **データ管理の一元化 (React Context)**:
  - ユーザーアクティビティを管理するための`UserActivityContext`を新規に作成します。
  - このContextは、アプリケーション全体で利用状況データと、それを更新するための関数（例: `incrementPlayCount(contentId)`, `incrementQuizClick(contentId)`）を提供します。
  - ContextのProviderをルートレイアウト（`app/layout.tsx`）の近くに配置し、アプリ全体からアクセスできるようにします。

- **データの永続化 (`useLocalStorage`フック)**:
  - `UserActivityContext`の内部で、`hooks/useLocalStorage.ts`カスタムフックを使用して、stateを`localStorage`と同期させます。
  - このフックは、`localStorage`がクライアントサイドでのみ利用可能である点を考慮し、`useEffect`内で安全にデータの読み書きを行います。

- **コンポーネントへの適用**:
  - **動画コンポーネント (`components/component/common/Movie.tsx`)**:
    - `UserActivityContext`から再生回数を取得し、動画プレーヤーの近くに表示します。
    - 動画が再生された際に、Contextが提供する`incrementPlayCount(contentId)`を呼び出して回数を更新します。
  - **クイズコンポーネント (`components/component/common/Quiz.tsx`)**:
    - `UserActivityContext`からクリック回数を取得し、リンクの近くに表示します。
    - クイズのリンクがクリックされた際に、`incrementQuizClick(contentId)`を呼び出して回数を更新します。

### 対象ファイル
- `hooks/useLocalStorage.ts` (新規作成)
- `contexts/UserActivityContext.tsx` (新規作成)
- `app/layout.tsx` (Context Providerの配置)
- `components/component/common/Movie.tsx` (利用側)
- `components/component/common/Quiz.tsx` (利用側)
