import {expTimeInHMS} from '../utils';
// const utils = require('../utils/')


// testing utils
describe("testing utils", () => {

    it("should return a string with time remaining in session", async () => {
        const expSeconds = 600 
        const timeNow = 300000 //timenow gets divided by 1000 to get milis
        const expString = expTimeInHMS(expSeconds, timeNow);
        //console.log("new product create============\n",JSON.stringify(response.body, null,4))
        expect(expString).toBe("expires in 00:05:00");
    });


})