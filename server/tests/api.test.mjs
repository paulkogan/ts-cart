const request = require("supertest")
const baseURL = "http://localhost:3001"
//import db from '../models/index.cjs'
const db = require("../models/index.ts/index.js")
// import { v4 as uuidv4 } from 'uuid';
const { v4 : uuidv4 } = require('uuid')
const User = db.users;


let test_user_1 = {
    user_uuid: uuidv4(),
    name: "Matt Damon",
    password: "abcd",
    email: "matt@damon.com",
    avatar_url: null
}

let test_user_2 = {
    user_uuid: uuidv4(),
    name: "Tom Hanks",
    password: "abcd",
    email: "tom@hanks.com",
    avatar_url: null
}

let test_user_3 = {
    user_uuid: uuidv4(),
    name: "Paul Kogan",
    password: "abcd",
    email: "paulkog@gmail.com",
    avatar_url: "http://www.image.com/paul_kogan.jpg"
}

let bad_test_user = {
    user_uuid: null,
    name: "Bad Tester",
    password: "abcd",
    email: "bad_email",
    avatar_url: "http://www.image.com/paul_kogan.jpg"
}



describe("GET /products", () => {

    beforeAll(async () => {

    })

    afterAll(async () => {
    })

    it("should return 200", async () => {
    const response = await request(baseURL).get("/products");
    expect(response.statusCode).toBe(200);
    expect(response.body.errors).toBe(null);
    });
    
    it("should return catalog products", async () => {
    const response = await request(baseURL).get("/products");
    expect(response.body.data.length).toBe(3);
    expect(response.body.data[0].price).toBe(100);
    });
});

describe("GET /users", () => {

    beforeAll(async () => {
        await db.sequelize.sync({ force: true })
        User.registerNew(test_user_1)
        User.registerNew(test_user_2)
    })

    afterAll(async () => {
        //await db.sequelize.close()
    })

    it("should return 200 and ALL users", async () => {
        const response = await request(baseURL).get("/users");
        expect(response.statusCode).toBe(200);
        expect(response.body.errors).toBe(null);
        expect(response.body.data.length).toBe(2);
    });
    
    it("should return only the target user", async () => {
    const response = await request(baseURL).get("/users?name=Damon");
    //console.log("RESPONSE ============\n",response.body.data, null,4)
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].email).toBe('matt@damon.com');
    });
});


describe("POST /findUser", () => {

    const find_params = {"email":"matt@damon.com"}
    const not_find_params = {"email":"not@there.com"}

    beforeAll(async () => {

        await db.sequelize.sync({ force: true })
        User.registerNew(test_user_1)
        User.registerNew(test_user_2)
    })
    
    afterAll(async () => {
        //await db.sequelize.close()
    })


    it("should return 200", async () => {
        const response = await request(baseURL).post("/users/find_user").send(find_params);
        //console.log("RESPONSE find user ============\n",response.body)
        expect(response.statusCode).toBe(200);
        expect(response.body.errors).toBe(null);
    });
    
    it("should return found target user", async () => {
        const response = await request(baseURL).post("/users/find_user").send(find_params);
        //console.log("FIND USER RESPONSE ============\n",response.body.data, null,4)
        expect(response.body.data.name).toBe('Matt Damon');
    });

    it("should return 404 if not found", async () => {
        const response = await request(baseURL).post("/users/find_user").send(not_find_params);
        //console.log("NOT FOUND RESPONSE ============\n",response.body, null,4)
        expect(response.statusCode).toBe(404);
        expect(response.body.errors).toContain("Did not find user with");

        });
    

});



describe("POST /register ", () => {

    beforeAll(async () => {
        await db.sequelize.sync({ force: true }) //clear User
        User.registerNew(test_user_3)
    })
 




    it("should properly register a valid new user", async () => {
        const response = await request(baseURL).post('/users/register').send(test_user_2);
        // console.log("REGISTER RESPONSE 200============\n",JSON.stringify(response.body, null,4))
        expect(response.statusCode).toBe(200);
        expect(response.body.errors).toBe(undefined);
        expect(response.body.name).toBe('Tom Hanks');
    });
    

    it("should return 400 if bad registration request", async () => {
        const response = await request(baseURL).post('/users/register').send(bad_test_user);
        // console.log("BAD REGISTER RESPONSE ============\n",JSON.stringify(response.body, null,4))
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain("invalid email");


        });
    
        afterAll( () => {
            db.sequelize.close()
        })
    


});
