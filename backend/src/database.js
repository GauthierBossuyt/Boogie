const { default: knex } = require("knex");
const pg = require("knex")({
    client: "pg",
    connection: process.env.POSTGRES_CONNECTION
        ? process.env.POSTGRES_CONNECTION
        : "pg://user:@BSMB2022@localhost:5432/Boogie",
    searchPath: ["knex", "public"],
});

class Database {
    constructor() {}

    /**
     * initializes all tables
     */
    async initializeTables() {
        await this.createRoomTable();
    }

    /**
     * Checks if a table exists in the database.
     * @param {string} name of the table.
     * @return {boolean} that indicates if the table exists (TRUE) or doesn't (FALSE).
     */
    async doesTableExist(name) {
        let tableExists = await pg.schema.hasTable(name);
        return tableExists;
    }

    /**
     * Creates the rooms table in the database
     * @returns {boolean} indicating if the database was succesfully made (true) or not (false).
     */
    async createRoomTable() {
        if (!(await this.doesTableExist("rooms"))) {
            await pg.schema.createTable("rooms", (table) => {
                table.increments("TABLE_ID").primary();
                table.string("name");
                table.string("description");
                table.boolean("party");
                table.string("code");
                table.enu("service", ["Spotify", "Apple"]);
                table.string("host");
            });
            return true;
        } else {
            return false;
        }
    }
}

const database = new Database();
module.exports = { database };
