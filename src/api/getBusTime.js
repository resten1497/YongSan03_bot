const axios = require('axios');
import xml2js from "xml2js";
import {API_CODE} from "./API_CODE"

const getBusTime =  (arsID) =>{
    let result = "";
    let url = 'http://ws.bus.go.kr/api/rest/stationinfo/getStationByUid';
    let queryParams = '?' + encodeURIComponent('ServiceKey') +  API_CODE; /* Service Key*/
            queryParams += '&' + encodeURIComponent('arsId') + '=' + encodeURIComponent(arsID); /* */
            url = url + queryParams;
            return axios.get(url)
                .then(response=>{
                    return response.data
        })
};

export {getBusTime}
