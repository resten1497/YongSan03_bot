const basicCardMessage = (dataObject) => {
    const responseTeplate = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "basicCard": {
                        "title": dataObject.stNm,
                        "thumbnail": {
                            "fixedRatio":true,
                            "height":"720",
                            "width":"630",
                            "imageUrl": "http://13.125.72.93/img/yongsan03_big_big.png"
                        },
                        "description":
                            "이번 버스 :  큰 버스\n" +
                            "6정류장 전,  5분 후 도착.\n" +
                            "다음 버스 :  작은 버스\n" +
                            "13정류장 전,  20분 후 도착.",
                        "buttons": [
                            {
                                "action": "message",
                                "label": "다시 조회",
                                "messageText": dataObject.stNm
                            },
                        ]
                    }
                },
            ]
        }
    }

    return responseTeplate

}
