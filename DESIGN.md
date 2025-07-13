
# DESIGN.md

## 1. プロジェクト概要

授業の教材を共有するサイト

## 2. 技術スタック

- **フレームワーク:** Next.js
- **データベース関連:** Prisma (ORM)
- **認証:** Clerk
- **UI/コンポーネント:** Radix UI, Tailwind CSS, shadcn/ui
- **フォーム:** React Hook Form
- **型チェック:** TypeScript

## 3. データモデル

```mermaid
erDiagram
    User ||--o{ Student : "is"
    User ||--o{ Teacher : "is"
    User ||--o{ QuizResult : "has"
    Student ||--o{ Progress : "has"
    Teacher ||--|{ Subject : "manages"
    Subject ||--o{ Unit : "has"
    Unit ||--o{ Lesson : "has"
    Lesson ||--o{ LessonContent : "has"
    Lesson ||--o{ LessonQuiz : "has"
    Content ||--o{ LessonContent : "is"
    Content ||--o{ Progress : "is"
    Quiz ||--o{ QuizResult : "has"
    Quiz ||--o{ LessonQuiz : "is"

    User {
        String user_id PK
        String clerk_id UK
        UserType type
        String name
        String email UK
        DateTime created_at
        DateTime updated_at
    }

    Student {
        String user_id PK
        Int admission_year
        String school_name
        String student_number
        DateTime created_at
        DateTime updated_at
    }

    Teacher {
        String user_id PK
        String subject_id FK
        String school_name
        DateTime created_at
        DateTime updated_at
    }

    Subject {
        String subject_id PK
        String subject_name
        String description
        Boolean is_public
        DateTime created_at
        DateTime updated_at
    }

    Unit {
        String unit_id PK
        String unit_name
        String subject_id FK
        String description
        Boolean is_public
        DateTime created_at
        DateTime updated_at
    }

    Lesson {
        String lesson_id PK
        String title
        String description
        Boolean is_public
        DateTime created_at
        DateTime updated_at
        String unit_id FK
    }

    Content {
        String content_id PK
        String title
        String description
        ContentType type
        Boolean is_public
        String url
        DateTime created_at
        DateTime updated_at
    }

    LessonContent {
        String lesson_id PK, FK
        String content_id PK, FK
    }

    Progress {
        String student_id PK, FK
        String content_id PK, FK
        Int view_count
    }

    Quiz {
        String quiz_id PK
        String title
        String description
        Boolean is_public
        Json questions
        DateTime created_at
        DateTime updated_at
    }

    Image {
        String image_id PK
        String title
        String image_url
        Json metadata
        DateTime created_at
    }

    QuizResult {
        String quiz_result_id PK
        String user_id FK
        String quiz_id FK
        Int score
        Int point_allocation
        Json answer
        DateTime created_at
        DateTime updated_at
    }

    LessonQuiz {
        String lesson_id PK, FK
        String quiz_id PK, FK
    }
```

## 4. 主要な機能一覧

- **ユーザー管理 (user)**
    - ユーザー登録・編集・削除
- **教材 (subject, unit, lesson)**
    - 教材の作成・編集・削除
    - 単元、レッスンの管理
- **コンテンツ (content)**
    - 動画、クイズなどのコンテンツ登録・管理
- **レッスンコンテンツ (lessonContent)**
    - レッスンとコンテンツの紐付け
- **クイズ (quiz)**
    - クイズの作成・編集・削除
    - クイズの回答、結果の保存
- **進捗管理 (progress)**
    - 生徒のコンテンツ閲覧状況の管理
- **回答 (answering)**
    - クイズへの回答

# 変更点
- ユーザー登録・認証機能の削除
- UIをフレームワークに置き換えて統一
- コードの可読性、保守性の向上
- パフォーマンス向上