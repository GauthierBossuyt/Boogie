const { database } = require("../src/database.js");
const ROOM = {
    name: "JOHN DOE's room",
    description: "This is a test room to the test the server.",
    party: true,
    code: "ABC4",
    service: "Apple",
    host: "APPLECODE"
}

beforeAll(async () => {
    let test = await database.doesTableExist("rooms");
    if (test) {
        await database.truncateTable("rooms");
    } else {
        await database.createRoomTable();
    }
});

test("function to test adding a room to the rooms table", async () => {
    expect(await database.addRoom(ROOM)).toBeTruthy();
    expect(await database.addRoom(ROOM)).toBeFalsy();
    expect(await database.addRoom({ ...ROOM, name: "JANE DOE's room" })).toBeFalsy();
    expect(await database.addRoom({ ...ROOM, code: "ZYX0" })).toBeTruthy();
});

test("function to test removing a room from the rooms table", async () => {});

test("function to test getting info from a room", async () => {});

afterAll(async () => {
    await database.truncateTable("rooms");
})