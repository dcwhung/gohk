# GoHK（暫名）

香港懷舊橫向動作 RPG 網頁遊戲。Metal Slug 風格、Q 版、港式幽默、香港小人物。

- 引擎：Phaser 3 + TypeScript + Vite
- 關卡：Tiled（JSON）
- 文字：廣東話書面語，全部放 `src/i18n/zh-HK.json`
- 設計文件：`.proj-docs/design/game-design.md`

## 開發

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # vitest
npm run lint       # eslint + prettier --check
npm run format     # prettier --write
npm run build      # tsc --noEmit + vite build → dist/
npm run preview    # 預覽 dist/
```

## 部署

Push 到 `main` 會觸發 `.github/workflows/deploy.yml`，build 後上 GitHub Pages。
Repo Settings → Pages → Source 要揀 **GitHub Actions**。

`vite.config.ts` 嘅 `GITHUB_PAGES_BASE` 要同 repo 名一致（而家係 `/gohk/`）。

## 目錄

```
src/
├── main.ts          Phaser.Game config（960×540, Scale.FIT）
├── config/          constants / characters / levels（所有 magic number 喺度）
├── scenes/          BootScene / LevelScene（M0 只有呢兩個）
├── i18n/            t('key') + zh-HK.json
├── systems/         （M1+）Era / Inventory / Quest / Save / Input
├── entities/        （M1+）Player / Enemy / Boss / Projectile / Vehicle
└── shaders/         （M2）RetroPipeline
tests/               vitest，只測純邏輯（config / systems / i18n）
public/assets/       sprites / maps / ui / audio / overworld
```

## 規範

- 冇 magic number：數值放 `src/config/constants.ts` 或對應 config
- 函數 ≤ 30 行
- Prettier：tabWidth 4、singleQuote、trailingComma all、printWidth 100
- Commit：Conventional Commits（feat / fix / refactor / chore / docs / test）
