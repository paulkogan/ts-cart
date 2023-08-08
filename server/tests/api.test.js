const request = require("supertest")
const baseURL = "http://localhost:3001"
const {models, sequelize} = require("../dist/src/models/index.js")
const { v4 : uuidv4 } = require('uuid')
const User = models.User;
const Product = models.Product;

let test_user_1 = {
    user_uuid: uuidv4(),
    name: "Matt Damon",
    password: "abcd",
    email: "matt@damon.com",
    avatar_url: null, 
    home_state: "AZ"
}

let test_user_2 = {
    user_uuid: uuidv4(),
    name: "Tom Hanks",
    password: "abcd",
    email: "tom@hanks.com",
    avatar_url: null, 
    home_state: "AZ"
}

let test_user_3 = {
    user_uuid: uuidv4(),
    name: "Paul Kogan",
    password: "abcd",
    email: "paul.kogan@tempus.com",
    avatar_url: "http://www.image.com/paul_kogan.jpg",
    home_state: "NY"
}

let test_user_4 = {
    user_uuid: uuidv4(),
    name: "Daffy Duck",
    password: "abcd",
    email: "daffy@duck.com",
    avatar_url: "http://www.image.com/daffy_duck.jpg",
    home_state: "FL"
}

let bad_test_user = {
    user_uuid: null,
    name: "Bad Tester",
    password: "abcd",
    email: "bad_email",
    avatar_url: "http://www.image.com/paul_kogan.jpg",
    home_state: "CA"
}

let test_product_1 = {
    product_id: uuidv4(),
    name: "Fire Engine D",
    image_url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTzySWCGvNjrCgzv_COpr6MxjEmajgzuQ0TD3MtDBtxrfqXLZ2d3ZVPdawcZi_&usqp=CAc",
    price: 10000,
    inventory: 10,
    description: "Roll to the rescue! Our action-packed fire engine features a ladder that extends to over 2 feet high and rotates a full 360 degrees, "
    +"a retractable fire hose and more. "
}

let test_product_2 = {
    product_id: uuidv4(),
    name: "Solar System Model D",
    image_url: "https://cdn.shopify.com/s/files/1/2689/5080/products/solar-system-mobile-making-kit-hands-on-4m-great-gizmos_907.jpg",
    price: 8000,
    inventory: 10,
    description: "Children build their own glow-in-the-dark solar system mobile with this out-of-this-world kit! Kids just snap the solar system together, paint the models, attach them to the included frame and hang the mobile anywhere for over-the-moon fun! "

}

let test_product_3 = {
    product_id: uuidv4(),
    name: "Glowing Moon Lamp-D",
    image_url: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/713M2QIsPuL._AC_SL1500_.jpg",
    price: 2000,
    inventory: 12,
    description: "The Mind-glowing 3D Moon Lamps come in 3 different sizes, to fit your needs & to bring a dazzling blend of magic & function to your home."
}


let test_product_4 = {
    product_id: uuidv4(),
    name: "F-18-D",
    image_url: "https://m.media-amazon.com/images/I/61IB1hj+ZfL._AC_SL1500_.jpg",
    price: 2000,
    inventory: 12,
    description: "Scale model of the famous navy fighter"
}

let bad_product_4 = {
    product_id: uuidv4(),
    name: "Negative toy",
    image_url: "",
    price: -607,
    inventory: 12,
    description: null
}

let login_request_1 = {
    userid: "tom@hanks.com",
    password: "abcd"
}

let login_request_2 = {
    userid: "matt@damon.com",
    password: "abcd"
}


describe("POST /auth/login", () => {
    beforeAll(async () => {
        // clear DB
        await sequelize.sync({ force: true })
        User.registerNew(test_user_1)
        User.registerNew(test_user_2)

    })
    

    it("should login a user", async () => {
        const response = await request(baseURL).post('/auth/login').send(login_request_2);
        console.log("login response ============\n",JSON.stringify(response.body, null,4))
        expect(response.statusCode).toBe(200);
        expect(response.body.errors).toBe(null);
        expect(response.body.data.name).toBe('Matt Damon');
    });

})

describe("GET /users", () => {

    beforeAll(async () => {
        //await sequelize.sync({ force: true })
        // User.registerNew(test_user_1)
        // User.registerNew(test_user_2)
    })

    afterAll(async () => {
        //await db.sequelize.close()
    })

    it("should return 200 and ALL users", async () => {
        const response = await request(baseURL).get("/users");
        //console.log("USERS LIST  ============\n",JSON.stringify(response.body.data, null,4))
        expect(response.statusCode).toBe(200);
        expect(response.body.errors).toBe(null);
        expect(response.body.data.length).toBe(2);
    });
    
    it("should return only the targeted user", async () => {
    const response = await request(baseURL).get("/users?name=Damon");
    //console.log("find user ============\n",JSON.stringify(response.body.data, null,4))
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].email).toBe('matt@damon.com');
    });
});

describe("POST /findUser", () => {

    const find_params = {"email":"matt@damon.com"}
    const not_find_params = {"email":"not@there.com"}

    beforeAll(async () => {

        // await sequelize.sync({ force: true })
        // User.registerNew(test_user_1)
        // User.registerNew(test_user_2)
    })
    
    afterAll(async () => {
        //await db.sequelize.close()
    })

    
    it("should return found target user", async () => {
        const response = await request(baseURL).post("/users/find_user").send(find_params);
        //console.log("FIND USER RESPONSE ============\n",response.body.data, null,4)
        expect(response.body.data.name).toBe('Matt Damon');
        expect(response.statusCode).toBe(200);
        expect(response.body.errors).toBe(null);
    });

    it("should return 404 if not found", async () => {
        const response = await request(baseURL).post("/users/find_user").send(not_find_params);
        // console.log("NOT FOUND RESPONSE ============\n",response.body, null,4)
        expect(response.statusCode).toBe(404);
        expect(response.body.errors).toContain("Did not find user with");

        });

});

describe("GET /products", () => {
    beforeAll(async () => {
        await Product.createNew(test_product_1)
        await Product.createNew(test_product_2)
        await Product.createNew(test_product_3)
    })

    afterAll(async () => {
    })

    
    it("should return list of all products in the catalog", async () => {
        const response = await request(baseURL).get("/products");
        // console.log("product list ==========\n"+JSON.stringify(response.body,null,4))
        expect(response.statusCode).toBe(200);
        expect(response.body.errors).toBe(null);
        expect(response.body.data.length).toBe(3);
        expect(response.body.data[0].price).toBe(10000);
    });
});



describe("POST /products/create", () => {


    beforeAll(async () => {
        // // clear DB
        // await sequelize.sync({ force: true })
        // Product.createNew(test_product_1)
        // Product.createNew(test_product_2)
    })
    
    afterAll(async () => {
        //await db.sequelize.close()
    })

    it("should properly add a new product", async () => {
        const response = await request(baseURL).post('/products/create').send(test_product_4);
        // console.log("new product create============\n",JSON.stringify(response.body, null,4))
        expect(response.statusCode).toBe(201);
        expect(response.body.errors).toBe(undefined);
        expect(response.body.data.name).toBe('F-18-D');
        expect(response.body.data.inventory).toBe(12);
    });
    

    it("should return 400 if bad data", async () => {
        const response = await request(baseURL).post('/products/create').send(bad_product_4);
        // console.log("BAD product RESPONSE ============\n",JSON.stringify(response.body, null,4))
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain("price must be >= 0 but is");
    });

    it("should return 400 if duplicate", async () => {
        const response = await request(baseURL).post('/products/create').send(test_product_3);
        //console.log("DUPLICATE product RESPONSE ============\n",JSON.stringify(response.body, null,4))
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain("Duplicate product");
    });


})



describe("POST /users/register ", () => {

    beforeAll(async () => {
        // await sequelize.sync({ force: true }) //clear User
        // User.registerNew(test_user_3)
        // User.registerNew(test_user_4)

    })

    afterAll( () => {
        sequelize.close()
    })

    it("should properly register a valid new user", async () => {
        const response = await request(baseURL).post('/users/register').send(test_user_3);
        // console.log("REGISTER user RESPONSE 200============\n",JSON.stringify(response.body, null,4))
        expect(response.statusCode).toBe(200);
        expect(response.body.errors).toBe(undefined);
        expect(response.body.name).toBe('Paul Kogan');
        expect(response.body.home_state).toBe('NY');
    });
    

    it("should return 400 if invalid user data", async () => {
        const response = await request(baseURL).post('/users/register').send(bad_test_user);
        // console.log("BAD REGISTER RESPONSE ============\n",JSON.stringify(response.body, null,4))
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain("invalid email");
    });
    
    it("should return 500 if duplicate user", async () => {
        const response = await request(baseURL).post('/users/register').send(test_user_3);
        // console.log("DUPLICATE USER RESPONSE ============\n",JSON.stringify(response.body, null,4))
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toContain("Validation error");
    });
    



});
