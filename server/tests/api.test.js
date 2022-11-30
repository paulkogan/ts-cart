const request = require("supertest")
const baseURL = "http://localhost:3001"


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
