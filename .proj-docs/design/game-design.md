# GoHK — 遊戲設計文件（Game Design Doc）

## 背景

- 2026-10-15 brainstorm session（grill-me 模式）輸出；M0 skeleton 已經起咗。
- 用戶係遊戲開發新手（React / Node 背景），想做 Metal Slug 風格、Q 版、橫向捲軸、香港懷舊 + 港式幽默嘅網頁遊戲。
- 目標：香港玩家會心微笑、有共同回憶。
- 今次 brainstorm 用 grill-me 逐條確認以下決定；呢份 plan 係 Phase 0 嘅輸出，下一步係起 project skeleton + 第一關 prototype。

## 已確認決定（grill-me 記錄）

| #   | 題目       | 決定                                                                                                             | 備註                                           |
| --- | ---------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 1   | 第一里程碑 | 3–5 關短篇遊戲                                                                                                   | 後半段關卡可刪                                 |
| 2   | 戰鬥方式   | 近戰 + 掟嘢                                                                                                      | 具體武器後定                                   |
| 3   | 引擎       | **Phaser 3 + TypeScript + Vite**                                                                                 | Blender 只做美術工具；Steam 日後用 Electron 包 |
| 4   | 關卡間地圖 | 固定視角等角（isometric）2D 插畫，角色 icon 沿路線移動                                                           | 參考圖係浮島地圖風格；唔需要 3D                |
| 5   | 美術風格   | 底層單一平滑 Q 版美術；「食嘢」切換 16-bit 模式用 **shader 濾鏡**（pixelate + 色板量化 + CRT 掃描線 + chiptune） | 方案 A，有成品後再檢討升級到真像素             |
| 6   | 切換意義   | 影響玩法：16-bit 模式見到舊時代嘅嘢（舊樓梯、舊碼頭），平滑模式見到現代設施；每關 2–3 個要切換先過到嘅位         | 「懷舊 vs 現代」主題                           |
| 7   | 美術來源   | AI 生圖做主力 + 自己執圖；角色動畫用切件 + 骨骼（分層 tween），唔逐格畫                                          | 固定 style prompt 保持一致                     |
| 8   | 主角       | 多角色可選（Metal Slug 式）；**架構支援多角色，第一版只完成 1 個**                                               | 角色 = config + 美術，唔使改 code              |
| 9   | 第一角色   | **茶餐廳外賣仔**：步行 / 單車 / 電單車三形態                                                                     | 武器：鐵食物盤（近戰）+ 掟菠蘿包 / 外賣杯      |
| 10  | 主線       | 一單超大外賣，客人不斷改地址；結局揭穿客人身份                                                                   | 每關有天然理由                                 |
| 11  | 關卡次序   | 九龍 → 過海 → 港島 → 大嶼山                                                                                      | 詳見下表                                       |
| 12  | RPG        | 輕量 RPG（HP / 錢 / 食物 buff / 舖頭買賣 / 裝備）+ 任務對話                                                      | 唔做經驗值 / 升級樹                            |
| 13  | 幽默尺度   | 粗口用諗音 / 符號遮掩；品牌改名（諧音）                                                                          | 全年齡，商標風險低                             |
| 14  | 平台       | 電腦鍵盤優先，手機觸控第二；16:9，內部解像度 960×540                                                             | 支援手掣                                       |
| 15  | 語言       | 廣東話書面語為主；文字全放 JSON，架構預留 i18n                                                                   | 中文字型要搵                                   |
| 16  | 時間       | 10–20 小時 / 星期                                                                                                | 第一關約 4 星期                                |
| 17  | 遊戲名     | **未定**，等角色陣容定咗先                                                                                       | 暫用 GoHK                                      |

## 角色陣容（2026-10-15 更新）

| #   | 角色                  | 設定 / 壓力來源                                                            | 形態 / 移動          | 近戰            | 掟嘢                 | 專屬技能                                                                                               | 狀態                    |
| --- | --------------------- | -------------------------------------------------------------------------- | -------------------- | --------------- | -------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------- |
| 1   | 茶餐廳外賣仔          | 一單超大外賣，客人不斷改地址                                               | 步行 / 單車 / 電單車 | 鐵食物盤        | 菠蘿包 / 外賣杯      | 形態切換（上車加速）                                                                                   | 第一版完成              |
| 2   | 男打工仔              | 有開工冇收工；搵唔到嘢做但支出大                                           | 步行 / 搭車          | 公事包          | 文件夾 / 名片        | **炒股**：消耗錢買「股票」，隨機暴升（大量回血 / 錢）或暴跌（扣 HP），風險回報技能                     | config 已預留，美術待做 |
| 3   | 女 OL                 | 同上；兼職做 KOL                                                           | 步行 / 搭車          | 手袋            | 自拍神器 / 高跟鞋    | **KOL**：開直播，畫面出現 like / 心心，吸引敵人注意（嘲諷 taunt）並按 like 數回血；失敗會出 hater 敵人 | config 已預留，美術待做 |
| 4   | 小學雞 / 中學生       | 學習壓力、贏在起跑線、四出上興趣班補習                                     | 步行 / 校巴          | 書包            | 補習筆記 / 水樽      | **補習**：短暫「開竅」加攻擊速度；或召喚「補習天王」海報做盾                                           | config 已預留，美術待做 |
| 5   | 老人家（阿伯 / 阿婆） | 爭關愛座、排隊睇醫生等成日、長者卡兩蚊搭車、執紙皮、公園晨運、同後生講當年 | 步行（慢）/ 兩蚊車   | 拐杖 / 購物車仔 | 保溫壺 / 涼茶 / 紙皮 | **長者優先**：$2 乘車優惠（載具免費）+「關愛座」召喚座位做盾 + 排隊睇醫生（站定回血，但要等）          | config 已預留，美術待做 |

> 譚仔阿姐、紅 Van 司機、澳牛粗口阿哥、的士狗 全部係 **敵人 / boss**，唔係主角。
>
> 五個主角覆蓋：外賣仔（基層打工）、打工仔 / OL（中產職場，一男一女）、學生（下一代）、老人家（上一代），即係「一個香港家庭三代人 + 送外賣嗰個」。老人家嘅天敵：搶關愛座嘅後生、醫院排隊籌號機、電子支付（唔識用）、騙徒電話。

## 關卡草案

| 關  | 地區                  | 形態 / 載具      | Boss                       | 舖頭 / 場景                             | 懷舊切換位例子        |
| --- | --------------------- | ---------------- | -------------------------- | --------------------------------------- | --------------------- |
| 1   | 旺角街市              | 步行             | 譚仔阿姐（譚仔話）         | 士多（扭蛋機 / 閃咭機）、舊式酒樓點心車 | 16-bit 先見到舊樓後梯 |
| 2   | 尖沙咀鐘樓 → 天星小輪 | 單車；小輪過海段 | 澳牛粗口阿哥（光速食完）   | 冰室（西多士 / 菠蘿包）                 | 舊碼頭通道            |
| 3   | 中環 → 電車叮叮       | 電單車；電車段   | 的士狗（唔過海）           | 當舖                                    | 舊電車站              |
| 4   | 山頂纜車 / 獅子山     | 纜車段           | 紅Van 超速司機（夜晚 110） | 雞蛋仔檔                                | 舊纜車                |
| 5   | 青馬大橋 → 大佛       | 巴士             | 最終 boss（客人真身）      | 富豪雪糕車                              | 揭曉                  |

敵人池：大陸旅客行李篋碌腳、推點心車阿嬸、地產經紀、保安、鴿子、譚仔阿姐（譚仔話）、紅 Van 超速司機、澳牛粗口阿哥、的士狗、補習天王、虎媽、老細、hater 網民等。

## 事件 / 梗 素材

近 20 年香港有趣事件、潮語、金句嘅 research 同遊戲化建議，見 [hk-culture-research.md](hk-culture-research.md)。原則：SARS、雷曼、八萬五呢類新聞可以做 random event / boss，但必須幽默化；純政治事件避開。

「譚仔話」「反智轉身」「你個嘢壞咗」呢類已確認做遊戲元素（對白 / 敵人招式 / 道具名）。

## 技術架構（Phaser 3 + TS + Vite）

```
gohk/
├── index.html
├── package.json            # phaser, vite, typescript, vitest, eslint, prettier
├── vite.config.ts
├── tsconfig.json
├── public/
│   ├── assets/sprites/     # 角色 / 敵人 PNG（切件）
│   ├── assets/maps/        # Tiled JSON + tileset
│   ├── assets/ui/
│   ├── assets/audio/
│   └── assets/overworld/   # 等角地圖大圖
├── src/
│   ├── main.ts             # Phaser.Game config（960×540, Scale.FIT）
│   ├── config/
│   │   ├── constants.ts    # 所有 magic number（速度、HP、傷害）
│   │   ├── characters.ts   # 角色 config（多角色支援）
│   │   ├── items.ts        # 食物 / 裝備 效果表
│   │   └── levels.ts       # 關卡清單、地圖路線節點
│   ├── scenes/
│   │   ├── BootScene.ts    # preload
│   │   ├── TitleScene.ts
│   │   ├── CharacterSelectScene.ts
│   │   ├── OverworldScene.ts   # 等角地圖，icon 沿路線移動
│   │   ├── LevelScene.ts       # 通用關卡 scene，load Tiled map by key
│   │   ├── ShopScene.ts        # 舖頭 overlay
│   │   ├── DialogueScene.ts    # 對話 overlay（任務）
│   │   └── HudScene.ts         # HP / 錢 / 模式指示
│   ├── entities/
│   │   ├── Player.ts           # 狀態機：idle/run/jump/attack/throw/hurt/dead + 形態切換
│   │   ├── Enemy.ts + enemies/*.ts
│   │   ├── Boss.ts + bosses/*.ts
│   │   ├── Projectile.ts
│   │   └── Vehicle.ts
│   ├── systems/
│   │   ├── EraSystem.ts        # 平滑 ↔ 16-bit 切換（shader pipeline + 關卡 layer 顯示 / 隱藏 + 音樂切換）
│   │   ├── InventorySystem.ts  # 錢、食物、裝備
│   │   ├── QuestSystem.ts
│   │   ├── SaveSystem.ts       # localStorage
│   │   └── InputSystem.ts      # 鍵盤 / 手掣 / 觸控統一
│   ├── shaders/
│   │   └── RetroPipeline.ts    # pixelate + palette quantize + scanline
│   ├── i18n/
│   │   └── zh-HK.json          # 所有對白 / UI 文字
│   └── utils/
└── tests/                      # vitest：systems / config 純邏輯
```

- 關卡用 Tiled 畫兩組 layer：`modern-*` 同 `retro-*`，EraSystem 切換時 toggle visible + collision。
- 角色動畫：切件（頭 / 身 / 手 / 腳）+ Phaser tween 做骨骼感，動畫定義放 config。
- i18n：所有文字經 `t('key')` 取，第一版只有 zh-HK。
- 存檔：localStorage，記錄已過關卡、錢、裝備、已選角色。
- 部署：GitHub Pages（GitHub Actions `vite build` → `gh-pages`）。

## 實施里程碑（10–20 小時 / 星期）

| 里程碑        | 內容                                                                                        | 預計     |
| ------------- | ------------------------------------------------------------------------------------------- | -------- |
| M0 Skeleton   | Vite + Phaser + TS + ESLint/Prettier + vitest + GitHub Pages deploy；一個空 LevelScene 行到 | 1 星期   |
| M1 核心手感   | Player 狀態機（行 / 跳 / 近戰 / 掟）、Arcade physics、一種敵人、HUD、placeholder 美術       | 2 星期   |
| M2 Era 切換   | RetroPipeline shader、EraSystem、Tiled 雙 layer、食物觸發                                   | 1 星期   |
| M3 第一關     | 旺角街市完整關卡、士多舖頭、譚仔阿姐 boss、對話系統、存檔                                   | 3 星期   |
| M4 Overworld  | 等角地圖 scene、路線移動、關卡解鎖                                                          | 1 星期   |
| M5 美術替換   | AI 生圖 pipeline 定 style、外賣仔正式美術、第一關背景                                       | 2 星期   |
| M6 第二、三關 | 尖沙咀 + 小輪、中環 + 電車、兩個 boss、單車 / 電單車形態                                    | 4–5 星期 |
| M7 檢討       | 決定 16-bit 用 shader 定真像素；決定第 4–5 關做唔做；定遊戲名同第二角色                     | —        |

## 未決 / 下次 grill 題目

1. 第一關武器具體數值同掟嘢物理（拋物線 / 直線）
2. 五個主角定咗（外賣仔 / 打工仔 / OL / 學生 / 老人家）→ 定遊戲名
3. 中文像素字型來源（license）
4. AI 生圖工具同 style prompt 定稿
5. 音樂：chiptune 來源（自製 / CC 素材）
6. 載具段落係「自動捲軸射擊」定「平台跳躍上車」

## Verification（M0–M3 完成標準）

- `npm run dev` 開到遊戲，鍵盤可以行 / 跳 / 打 / 掟
- `npm run test` 通過（systems / config 純邏輯 ≥ 80% 覆蓋）
- `npm run lint` clean
- 食到指定食物畫面變 16-bit，舊時代 layer 出現，可以行到新路線
- 第一關由入口打到 boss 完，存檔後 reload 保留進度
- GitHub Pages link 用手機 Safari 開到並可用觸控操作
