const sayHello = require('../src/api/getBusTime').getBusTime;

describe('APi_Test',() => {
    it('getData from API',(done)=>{
        if(getBusTime("03567")){
            done();
        }
    })
})
