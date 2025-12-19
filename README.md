# WorldSun Official Website

為 WorldSun Capital 打造的現代化官方網站專案。本專案採用 React 生態系構建，結合了高效的構建工具、現代化的 UI 庫以及強大的後端服務整合，旨在提供高性能且具備互動性的使用者體驗。

## 🚀 專案簡介

本網站包含企業形象展示、行業洞察報告 (Industry Analysis)、服務介紹以及一個內建的內容管理介面。專案整合了 3D 視覺效果與動態交互設計。

### 主要功能

* **現代化 UI/UX**: 使用 Tailwind CSS 與 Shadcn/ui 構建的響應式設計。
* **動態視覺效果**: 包含視差滾動 (Parallax) 與幾何背景動畫 (Three.js/Canvas)。
* **內容管理系統 (CMS)**:
    * 整合 Ghost CMS 用於發布文章與洞察報告。
    * 自定義的富文本編輯器 (`GhostEditor`, `AdvancedEditor`)。
* **會員與權限系統**:
    * 基於 Supabase 的身份驗證 (Auth)。
    * 後台管理面板 (`AdminPanel`)。
* **資料視覺化**: 整合圖表組件展示本益比 (PE Ratio) 等財經數據。

## 🛠️ 技術棧 (Tech Stack)

**Frontend & Core:**
* [React](https://react.dev/) - UI 框架
* [TypeScript](https://www.typescriptlang.org/) - 靜態型別語言
* [Vite](https://vitejs.dev/) - 極速構建工具

**Styling & UI:**
* [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS 框架
* [Shadcn/ui](https://ui.shadcn.com/) - 基於 Radix UI 的可重用組件庫
* [Lucide React](https://lucide.dev/) - 圖標庫

**Backend & Data:**
* [Supabase](https://supabase.com/) - 後端即服務 (Auth, Database, Realtime)
* [Ghost](https://ghost.org/) - Headless CMS (內容管理)
* [TanStack Query](https://tanstack.com/query/latest) (預期使用) - 伺服器狀態管理

**Package Manager:**
* [Bun](https://bun.sh/) (推薦) 或 Node.js (npm/yarn)

## 🏁 開始使用 (Getting Started)

### 前置需求

請確保您的環境中已安裝以下工具：
* [Node.js](https://nodejs.org/) (v18+)
* [Bun](https://bun.sh/) (本專案包含 `bun.lockb`，建議使用 Bun)

### 安裝依賴

```bash
# 使用 Bun (推薦)
bun install

# 或使用 npm
npm install

```
### 設定環境變數

在專案根目錄建立一個 .env 檔案，並填入以下配置（請替換為您的實際金鑰）：

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Ghost CMS Configuration (如適用)
VITE_GHOST_API_URL=your_ghost_api_url
VITE_GHOST_CONTENT_API_KEY=your_ghost_content_key
```

### 啟動開發伺服器

```bash
# 啟動開發伺服器
bun run dev

# 或使用 npm
npm run dev
```

開啟瀏覽器並訪問 `http://localhost:8080` 查看網站。

## 📂 專案結構 (Project Structure)

```
src/
├── assets/          # 靜態資源 (圖片, LOGO 等)
├── components/      # React 組件
│   ├── animation/   # 動畫相關組件 (Parallax 等)
│   ├── editor/      # 富文本編輯器與 CMS 相關組件
│   ├── layout/      # 全局佈局 (Header, Footer)
│   ├── sections/    # 首頁各區塊 (Hero, About, Services)
│   ├── three/       # Three.js 3D 背景組件
│   └── ui/          # Shadcn UI 基礎組件
├── hooks/           # 自定義 Hooks (useAuth, useAdmin, useToast)
├── integrations/    # 第三方服務整合 (Supabase)
├── lib/             # 工具函數與庫配置 (utils, ghost, stream)
├── pages/           # 路由頁面 (Index, Auth, AdminPanel, IndustryReport)
├── App.tsx          # 應用程式入口與路由配置
└── main.tsx         # React DOM 渲染入口
```
