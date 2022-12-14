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

let test_product_1 = {
    product_id: uuidv4(),
    name: "Fire Engine D",
    image_url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTTzySWCGvNjrCgzv_COpr6MxjEmajgzuQ0TD3MtDBtxrfqXLZ2d3ZVPdawcZi_&usqp=CAc",
    price: 100.00,
    description: "Roll to the rescue! Our action-packed fire engine features a ladder that extends to over 2 feet high and rotates a full 360 degrees, "
    +"a retractable fire hose and more. "
}

let test_product_2 = {
    product_id: uuidv4(),
    name: "Solar System Model D",
    image_url: "https://cdn.shopify.com/s/files/1/2689/5080/products/solar-system-mobile-making-kit-hands-on-4m-great-gizmos_907.jpg",
    price: 80.00,
    description: "Children build their own glow-in-the-dark solar system mobile with this out-of-this-world kit! Kids just snap the solar system together, paint the models, attach them to the included frame and hang the mobile anywhere for over-the-moon fun! "

}

let test_product_3 = {
    product_id: uuidv4(),
    name: "Glowing Moon Lamp-D",
    image_url: "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/713M2QIsPuL._AC_SL1500_.jpg",
    price: 20.00,
    description: "The Mind-glowing 3D Moon Lamps come in 3 different sizes, to fit your needs & to bring a dazzling blend of magic & function to your home."
}



describe("GET /products", () => {

    beforeAll(async () => {
        await sequelize.sync({ force: true }) ///clear DB
        Product.createNew(test_product_1)
        Product.createNew(test_product_2)
        Product.createNew(test_product_3)
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
    expect(response.body.data.length).toBeGreaterThan(1);
    expect(response.body.data[0].price).toBe("100.00");
    });
});

describe("GET /users", () => {

    beforeAll(async () => {
        //await sequelize.sync({ force: true })
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

        await sequelize.sync({ force: true })
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
        await sequelize.sync({ force: true }) //clear User
        User.registerNew(test_user_3)
        Product.createNew(test_product_1)
        Product.createNew(test_product_2)
        Product.createNew(test_product_3)
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
            sequelize.close()
        })
    


});
