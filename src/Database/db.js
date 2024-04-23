import Helpers from './db_utils.js';

/*  ---------------------------------------README---------------------------------------------
    Each table has its own class

    createTable() initializes the table if it doesn't exist

    Depending on usecase, tables will implement insert, delete, and update row
    For insertion and updating, they take in a JSON object in the same format as the API
    For deletion, provide the single field also in JSON format

    JSON: the API has different types but these functions only use ints and strings
    Parsing needs to be done to get the proper data that GUI requires

    Each class will have a query function which [FIX LATER-------=-------------------]

    Every single function will return true on success or throw an error otherwise
--------------------------------------------------------------------------------------------- */ 

// HELPERS
async function defaultUpdateRow(json, table) {
    try {
        await Helpers.openDatabase();

        let data = await Helpers.jsonToUpdate(json, table);
        await Helpers.updateRows(table, data);

        await Helpers.closeDatabase();
        return true;
    } catch (err) {
        throw err;
    }
}
async function defaultInsertRow(json, table) {
    try {
        await Helpers.openDatabase();

        let values = await Helpers.jsonToInsert(json, table);
        await Helpers.insertRow(table, values);

        await Helpers.closeDatabase();
        return true;
    } catch (err) {
        throw err;
    }
}
async function defaultDeleteRow(json, table) {
    try {
        return true;
    } catch (err) {
        throw err;
    }
}
async function defaultQuery(json, table) {
    try {
        return true;
    } catch (err) {
        throw err;
    }
}

// Class for the dark/light mode settings
export class Settings {
    static async createTable() {
        try {
            await Helpers.openDatabase();

            // check if table is already created so we don't insert more than once
            const c = `SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'settings';`
            let results = await Helpers.run(c);
            if (results.length === 0) {
                let table = 'settings';
                let fields = ['theme TEXT'];
                await Helpers.createTable(table, fields);

                // We need to initialize settings with a default row
                await Helpers.insertRow(table, ["'light'"]);
            }

            await Helpers.closeDatabase();
            return true;
        } catch (err) {
            throw err;
        }
    }

    // Because there should only be one row, only allow updates
    static async updateRow(json) {
        try {
            return await defaultUpdateRow(json, 'settings');
        } catch (err) {
            throw err;
        }
    }

    static async query() {
        return;
    }
}

// Class for the COMPLETED JOBS table
export class History {
    static async createTable() {
        try {
            await Helpers.openDatabase();

            let table = 'history';
            let fields = [];
            fields.push('fileHash TEXT');
            fields.push('timeQueued TEXT');
            fields.push('status TEXT');
            fields.push('accumulatedCost INTEGER');
            fields.push('projectedCost INTEGER');
            fields.push('eta INTEGER');
            fields.push('peer TEXT');
            await Helpers.createTable(table, fields);

            await Helpers.closeDatabase();
            return true;
        } catch (err) {
            throw err;
        }
    }

    // We don't update, it's either insert or delete
    static async insertRow(json) {
        try {
            return await defaultInsertRow(json, 'history');
        } catch (err) {
            throw err;
        }
    }

    static async deleteRow() {
        return;
    }

    static async query() {
        return;
    }
}

// Class for the IN-PROGRESS jobs table
export class Jobs {
    static async createTable() {
        try {
            await Helpers.openDatabase();

            let table = 'jobs';
            let fields = [];
            fields.push('fileHash TEXT');
            fields.push('timeQueued TEXT');
            fields.push('status TEXT');
            fields.push('accumulatedCost INTEGER');
            fields.push('projectedCost INTEGER');
            fields.push('eta INTEGER');
            fields.push('peer TEXT');
            await Helpers.createTable(table, fields);

            await Helpers.closeDatabase();
        } catch (err) {
            throw err;
        }
    }

    static async insertRow() {
        try {
            return await defaultInsertRow(json, 'jobs');
        } catch (err) {
            throw err;
        }
    }

    static async updateRow() {
        try {
            return await defaultUpdateRow(json, 'jobs');
        } catch (err) {
            throw err;
        }
    }

    static async deleteRow() {
        return;
    }

    static async query() {
        return;
    }
}

// Class for the peer data
export class Peers {
    static async createTable() {
        try {
            await Helpers.closeDatabase();

            let table = 'peers';
            let fields = [];
            fields.push('ip TEXT');
            fields.push('region TEXT');
            fields.push('status TEXT');
            fields.push('accumulatedMemory TEXT');
            fields.push('price TEXT');
            fields.push('reputation TEXT');
            await Helpers.createTable(table, fields);

            await Helpers.closeDatabase();
        } catch (err) {
            throw err;
        }
    }

    static async insertRow() {
        try {
            return await defaultInsertRow(json, 'peers');
        } catch (err) {
            throw err;
        }
    }

    static async updateRow() {
        try {
            return await defaultUpdateRow(json, 'peers');
        } catch (err) {
            throw err;
        }
    }

    static async deleteRow() {
        return;
    }

    static async query() {
        return;
    }
}


try {
    await Settings.createTable();
    await Settings.updateRow('{"theme": "dark"}');
    // await Helpers.openDatabase();
    // let a = await Helpers.query('settings', '*', "theme = dark AND saveLocation = new");
    // let a = await Helpers.columnData('settings');
    // console.log(a);
    // await Helpers.closeDatabase();
} catch (err) {
    console.log(err);
}