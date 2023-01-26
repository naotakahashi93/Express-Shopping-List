process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");


let testitem = { name: "Test", price: 1};

beforeEach(function () {
  items.push(testitem);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `cats`
  items.length = 0;
});

describe("GET /items", () => {
    test("Get all items in the json", async () => {
      const res = await request(app).get("/items");
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual({ items: [testitem] })
    })
  })


describe("POST /items",() =>{
    test("post a new item", async() =>{
        const res = await request(app).post("/items").send({name: "candy", price: 90});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({items: {name: "candy", price: 90}})
    })
})

describe("GET /items/:name", ()=>{
    test("get item by name", async ()=>{
        const res = await request(app).get(`/items/${testitem.name}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ item: testitem })
    })
})

describe("PATCH /items/:name", ()=>{
    test("update item by name", async ()=>{
        const res = await request(app).patch(`/items/${testitem.name}`).send({name: "updated!", price: 10});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({items: {name: "updated!", price: 10}})
    })
})

describe("DELETE /items/:name", () =>{
    test("delete an item", async()=>{
        const res = await request(app).delete(`/items/${testitem.name}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ message: "Deleted" })
    })
})