# 勞務報酬計算機

## 功能介紹
輸入 `實領金額` 推導出 `報價金額`。

* `含稅報價(支領金額)` = `最終實領(支領淨額)` + `健保費` + `所得稅`
* `不含稅報價(支領金額)` = `最終實領(支領淨額)`

## 計算公式
* 支領金額 `X`
* 代扣所得稅(10%) `0.1`
    * 最終實領(支領淨額) > 20K
* 健保補充保費(1.91%) `0.0191`
    * 可選擇
* 含稅價 `0.8809X`

### 支領金額 -健保 -所得 = 含稅價
```
X - 0.1X - 0.0191X = 0.8809X
```
倒推公式
```
X/0.8809 - 0.1X/0.8809 - 0.0191X/0.8809 = X
```

## 開發工具
* vue.js
  * 為了雙向綁定資料使用。
* SCSS
* HTML
