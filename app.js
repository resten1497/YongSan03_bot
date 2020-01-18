import {getBusTime} from "./src/api";
import xml2js from "xml2js";
import express from 'express';
import bodyParser from 'body-parser';
import {getBusImage, getBusSize} from "./src/util";

var fs = require('fs');
const app = express();
const port = process.env.PORT || 3000

const parser = new xml2js.Parser({
    explicitArray: false
});


app.use(bodyParser.json());

const asyncHandler = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

app.post('/', function (req, res) {

    const responseBody = {
        version: "2.0",
        template: {
            outputs: [
                {
                    simpleImage: {
                        imageUrl: "https://t1.daumcdn.net/friends/prod/category/M001_friends_ryan2.jpg",
                        altText: "hello I'm Ryan"
                    }
                }
            ]
        }
    };
    res.status(200).send(responseBody)

});

const parser2 = (data) => {
    return new Promise((resolve, reject) => {
        parser.parseString(data, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        })
    })
};

app.get('/', asyncHandler(async (req,res)=>{
    let arsId = '03567';
    let data = await getBusTime(arsId);
    const result = await parser2(data);
    let Object = []
    let itemList = result.ServiceResult.msgBody.itemList;
    let arrmsg1 = itemList.arrmsg1;
    let arrmsg2 =itemList.arrmsg2;
    let veh1 = itemList.vehId1;
    let veh2 = itemList.vehId2;
    Object.stNm = itemList.stNm;


    if(arrmsg1 !== "운행종료") {
        if (arrmsg1 !== "곧 도착" ) {
            let split_Minute1 = arrmsg1.split('분')

            let Station_result1 = split_Minute1[1].split('[')[1]
                .slice(0, -1)
                .replace("번째", "정류장")

            Object.description = "이번 버스 : " + getBusSize(veh1).label + " \n " + Station_result1 + ", " + split_Minute1[0] + "분 후 도착\n";

        } else {
            Object.description =  getBusSize(veh1).label + " \n " + arrmsg1 ;
        }

            let split_Minute2 = arrmsg2.split('분')
            let Station_result2 = split_Minute2[1].split('[')[1]
                .slice(0, -1)
                .replace("번째", "정류장")

            console.log(Station_result2 + ", " + split_Minute2[0] + "분 후 도착")
            Object.description += "다음 버스 : " + getBusSize(veh2).label + " \n " + Station_result2 + ", " + split_Minute2[0] + "분 후 도착\n";


            Object.Image = "http://13.125.72.93/img/"+getBusImage(getBusSize(veh1).code, getBusSize(veh2).code);
            console.log(Object)
            // console.log(Object);

    }
    res.send("123")
}))

app.post('/getBusArriveInformation', asyncHandler( async (req, res) => {

    let arsId = req.body.action.params.arsid;
    let data = await getBusTime(arsId);
    let StNm = "";
    const result = await parser2(data);
    let Object = []
    Object.stNm = result.ServiceResult.msgBody.itemList.stNm;
    console.log(result.ServiceResult.msgBody.itemList.arrmsg1)
    console.log(result.ServiceResult.msgBody.itemList.arrmsg2)
    console.log(Object);

    const responseTeplate = {
        "version": "2.0",
        "template": {
            "outputs": [
                {
                    "basicCard": {
                        "title": Object.stNm,
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
                            "13정류장 전,  20분 후 도착",
                        "buttons": [
                            {
                                "action": "message",
                                "label": "다시 조회",
                                "messageText": Object.stNm
                            },
                        ]
                    }
                },ㄷ
            ]
        }
    }
    res.status(200).send(responseTeplate);

}));


app.get('/test', (req, res) => {
        getBusTime("03567").then(response => {
                parser.parseString(response, (err, result) => {
                    console.log(result["ServiceResult"]['msgBody']['itemList']['arrmsg1']);
                });
            }
        )

    }
);

app.get("/img/:name", (req, res) => {
    var filename = './src/assets/Image/' + req.params.name;
    fs.readFile(filename, (err, data) => {
        res.writeHead(200, {"Context-Type": "image/jpg"});//보낼 헤더를 만듬
        res.write(data);   //본문을 만들고
        res.end();  //클라이언트에게 응답을 전송한다
    })
});


app.listen(port, function () {
    console.log(`app is Listening at ${port}`)

});
