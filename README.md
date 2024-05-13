# 數獨遊戲

這是一款網頁版數獨遊戲，利用 HTML, CSS, Bootstrap, JavaScript 和 Python Flask 進行開發。本遊戲提供自動求解、重置和開始新遊戲等功能，讓玩家能夠解決數獨謎題。

![](https://imgur.com/eJbe96D.png)

**程式語言**：HTML/CSS/Bootstrap/Javascript (前端) & Python Flask (後端)  
**開發時間**：一個月

## 簡介

### 功能介紹

- **隨機生成數獨謎題**：每次開始新遊戲時，系統會隨機生成一個部分預填數字的數獨謎題。
- **求解功能 (Solve Button)**：點擊此按鈕會自動填入數獨板上的正確答案。
- **重置功能 (Reset Button)**：清除所有用戶輸入的數字，只保留原始的系統生成的數字。
- **新遊戲功能 (New Game Button)**：彈出確認對話框，詢問用戶是否確定開始新遊戲。選擇「Yes」將開始一個全新的謎題，「No」則返回當前遊戲。

![](https://imgur.com/xzqtstV.png)

### 偵錯機制

本遊戲具有完善的偵錯機制。若數獨的每行、每列或每九宮格中出現重複數字，相應的格子會變成紅色。修正錯誤後，紅色格子會恢復原來的顏色。

![](https://imgur.com/5Nq3PVZ.png)

### 數獨無解情況

本遊戲有 20% 的機率隨機生成數獨格中的數字，因此有時候生成的題目可能無解。遇到此情況時，會顯示紅色的 **No solution exist!** 提示。

![](https://i.imgur.com/WPjbVDl.png)

### 技術棧

- **HTML**: 架構遊戲的基礎結構。
- **CSS**: 設計遊戲的外觀和風格。
- **Bootstrap**: 增強前端響應式設計。
- **JavaScript**: 處理遊戲邏輯和用戶互動。
- **Python Flask**: 管理後端功能和服務器請求。

## 運行環境設置

要在本地運行這個數獨遊戲，請按照以下步驟操作：

1. 克隆此專案到您的機器：
   ```bash
   git clone [專案Git網址]

2. 進入應用目錄並運行應用：
    ```bash
    cd app
    python app.py
