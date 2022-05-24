const API = require("../src/server.js");
const SUPERTEST = require("supertest");
const { database } = require("../src/database.js");
const REQUEST = SUPERTEST(API);
const ROUTE = "/rooms";
const ROOM = {
    name: "JOHN DOE's room",
    description: "This is a test room to the test the server.",
    party: true,
    service: "Apple",
    host: "APPLECODE",
};

beforeAll(async () => {
    let test = await database.doesTableExist("rooms");
    if (test) {
        await database.truncateTable("rooms");
    } else {
        await database.createRoomTable();
    }
});

test("POST /rooms", async () => {
    let response = await REQUEST.post(ROUTE);
    expect(response.body.ERROR).toBe("Credentials must be given!");
    response = await REQUEST.post(ROUTE).send({ room: ROOM });
    expect(response.status).toBe(200);
    ROOM.code = response.body.room.code;
    console.log(ROOM.code);
    response = await REQUEST.post(ROUTE).send({
        room: { ...ROOM, service: "Youtube" },
    });
    expect(response.status).toBe(404);
});

test("GET /rooms", async () => {
    let response = await REQUEST.get(ROUTE);
    expect(response.status).toBe(400);
    console.log(ROOM.code);
    response = await REQUEST.get(ROUTE).send({ code: ROOM.code });
    expect(response.status).toBe(200);
    response = await REQUEST.get(ROUTE).send({ code: "ABDF" });
    expect(response.status).toBe(404);
});

test("DELETE /rooms", async () => {
    let response = await REQUEST.delete(ROUTE);
    expect(response.status).toBe(400);
    response = await REQUEST.delete(ROUTE).send({ code: ROOM.code });
    expect(response.status).toBe(200);
    response = await REQUEST.delete(ROUTE).send({ code: "ABCD" });
    expect(response.status).toBe(404);
});

afterAll(async () => {
    await database.truncateTable("rooms");
});
