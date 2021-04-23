// コールバック関数
export function initMap() {
    map1 = new google.maps.Map(document.getElementById('inasa-map'), { // あえてlet, const, varをつけずにグローバル変数にした。
        center: { lat: 34.851887, lng: 137.673219 },
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        gestureHandling: 'greedy' // 地図を指1本で操作できるように。
    });

    // マーカーおよび情報ウィンドウの配列を生成するforループ
    let iconInfo = {
        scaledSize: new google.maps.Size(25, 25),
        labelOrigin: new google.maps.Point(13, 35)
    };
    let count = 0;
    for(let h = 0; h < jsonArray.length; h++) {
        if(jsonArray[h][0]['社会資源の種類'] == 'サロン') {
            iconInfo.url = "./img/pin-icon/saron.png";
        } else if(jsonArray[h][0]['社会資源の種類'] == '介護サービス事業所') {
            iconInfo.url = "./img/pin-icon/kaigo.png";
        } else if(jsonArray[h][0]['社会資源の種類'] == '障害サービス事業所') {
            iconInfo.url = "./img/pin-icon/syougai.png";
        } else if(jsonArray[h][0]['社会資源の種類'] == 'ボランティア') {
            iconInfo.url = "./img/pin-icon/volunteer.png";
        } else if(jsonArray[h][0]['社会資源の種類'] == '喫茶店・カフェ・カラオケ') {
            iconInfo.url = "./img/pin-icon/kissa.png";
        } else if(jsonArray[h][0]['社会資源の種類'] == '商店') {
            iconInfo.url = "./img/pin-icon/syouten.png";
        } else if(jsonArray[h][0]['社会資源の種類'] == '薬局') {
            iconInfo.url = "./img/pin-icon/yakkyoku.png";
        }
        for(let i = 0; i < jsonArray[h].length; i++, count++) {
            markers[count] = new google.maps.Marker({
                position: new google.maps.LatLng(jsonArray[h][i]['緯度'], jsonArray[h][i]['経度']),
                map: map1,
                icon: iconInfo,
                label: {
                    text: jsonArray[h][i]['名称'],
                    fontSize: '10px'
                }
            });
            infoWindows[count] = new google.maps.InfoWindow({
                content: `<b>${jsonArray[h][i]['名称']}</b><p>${jsonArray[h][i]['住所']}</p><a href="./detail.html?id=${jsonArray[h][i]['id']}" style="color: #5341d3">詳細ページ</a>`,
                // disableAutoPan: true
            });
            markerEvent(count);
        }
    }

    let currentInfoWindow;
    // マーカーをクリックしたら情報ウィンドウを表示する関数（既に情報ウィンドウが出ていた場合はそれを消してから新しい情報ウィンドウを表示する）
    function markerEvent(arrayIndex) {
        markers[arrayIndex].addListener('click', function() {
            if(currentInfoWindow) {
                currentInfoWindow.close();
            }
            infoWindows[arrayIndex].open(map1, markers[arrayIndex]);
            currentInfoWindow = infoWindows[arrayIndex];
        });
    }

    document.getElementById('hit-count').textContent = `引佐町には${markers.length}件の社会資源があります！`;
    // google.maps.event.addListener(map1, 'zoom_changed', function() {
    //     if(map1.getZoom() > 14) {
    //         alert('ズームレベルが変更されました');
    //     }
    // });
}