跨瀏覽器媒體查詢retina显示
2018-01-04 23:45:12

### 需求

為 DIV 設置背景圖片，並通過媒體查詢在 2X 顯示器下，顯示 2X 圖片，非 Retina 瀏覽器顯示 1X 圖片。
     
     

### 實現效果

<div class="bg-block">
</div>

<style>
.bg-block {
    height: 288px;
    width: 512px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: gray;
    background-clip: content-box;
    margin: 40px auto;
    /* non-retina display */
    background-image: url("assets/images/bg.jpg");
}
/* works in ff/chrome/opera/ie>=9/edage */
@media 
    (-webkit-min-device-pixel-ratio: 2),
    (min-resolution: 192dpi) {
    .bg-block {
        background-image: url("assets/images/bg@2x.jpg");
    }
}
</style>

    

### 代碼

    <div class="bg-block">
    </div>
    <style>
    .bg-block {
        height: 288px;
        width: 512px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-color: gray;
        background-clip: content-box;
        margin: 40px auto;
        /* non-retina display */
        background-image: url("assets/images/bg.jpg");
    }
    /* works in ff/chrome/opera/ie>=9/edage */
    @media 
        (-webkit-min-device-pixel-ratio: 2),
        (min-resolution: 192dpi) {
            .bg-block {
                background-image: url("assets/images/bg@2x.jpg");
            }
        }
    </style>

    
### 相關文獻
1. [towards-retina-web](https://www.smashingmagazine.com/2012/08/towards-retina-web/)
2. [【译】走向Retina Web](http://www.html-js.com/article/The-front-end-of-the-porter)
3. [cross-browser-retinahigh-resolution-media-queries](http://www.brettjankord.com/2012/11/28/cross-browser-retinahigh-resolution-media-queries/)
4. [retina-display-media-query](https://css-tricks.com/snippets/css/retina-display-media-query/)
