const request = require("supertest")
const baseURL = "http://localhost:3001"
//import db from '../models/index.cjs'
// const db = require("../models/index.cjs")
// //import { v4 as uuidv4 } from 'uuid';
const { v4 : uuidv4 } = require('uuid')
// const User = db.users;


describe("GET /products", () => {

    beforeAll(async () => {
    // set up the todo
    //await request(baseURL).post("/todo").send(newTodo);
    })

    afterAll(async () => {
    //await request(baseURL).delete(`/todo/${newTodo.id}`)
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
    // set up the todo
    //await request(baseURL).post("/todo").send(newTodo);
    })

    afterAll(async () => {
    //await request(baseURL).delete(`/todo/${newTodo.id}`)
    })

    it("should return 200", async () => {
    const response = await request(baseURL).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.errors).toBe(null);
    });
    
    it("should return searched user", async () => {
    const response = await request(baseURL).get("/users?name=Kogan");
    //console.log("RESPONSE ============\n",response.body.data, null,4)
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].email).toBe('paulkog@gmail.com');
    });
});

describe("POST /findUser", () => {

    const find_params = {"email":"tom@hanks.com"}

    // let test_user = {
    //     user_uuid: uuidv4(),
    //     name: "Matt Damon",
    //     password: "abcd",
    //     email: "matt@damon.com",
    // }
    // console.log(`New User OBJECT is: ${JSON.stringify(new_user)}`)


    //User.registerNew(new_user)



    beforeAll(async () => {
        //await db.sequelize.sync({ force: true })
        //User.registerNew(test_user)
    })
    
    afterAll(async () => {
        //await db.sequelize.close()
    })


    it("should return 200", async () => {
    const response = await request(baseURL).post("/users/find_user").send(find_params);
    //console.log("RESPONSE ============\n",response.body.data, null,4)
    expect(response.statusCode).toBe(200);
    expect(response.body.errors).toBe(null);
    });
    
    it("should return found target user", async () => {
    const response = await request(baseURL).post("/users/find_user").send(find_params);
    console.log("RESPONSE ============\n",response.body.data, null,4)
    expect(response.body.data.name).toBe('Tom Hanks');
    });
});