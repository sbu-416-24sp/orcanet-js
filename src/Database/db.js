import Helpers from './db_utils.js';

/*  ---------------------------------------README---------------------------------------------
    Each table has its own class

    createTable() initializes the table if it doesn't exist

    Depending on usecase, tables will implement insert, delete, and update row
    For insertion and updating, they take in a JSON object in the same format as the API
    
    For deletion, provide the single condition also in JSON format
    The condition must be an equality
    For example { peerID: "123jdjK3i9F3" } resolves to peerID == '123jdjK3i9F3'

    JSON: the API has different types but the DB only use ints and strings
    Parsing needs to be done to get the proper data that GUI requires

    Each class will have a query function which currently only takes in an equality clause
    similar to the example provided for deletion

    Every single function will return true on success or throw an error otherwise
    (query will return the data on success instead)
--------------------------------------------------------------------------------------------- */

// Class for the dark/light mode settings
export class Settings {
    static async createTable() {
        try {
            // check if table is already created so we don't insert more than once
            const c = `SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'settings';`
            let results = await Helpers.run(c);
            if (results.length === 0) {
                let table = 'settings';
                let fields = [];
                fields.push('theme TEXT');
                fields.push('server TEXT');
                await Helpers.createTable(table, fields);

                // We need to initialize settings with a default row
                let json = {
                    theme: 'light',
                    server: 'go'
                };
                await Helpers.insertRow(json, table);
            }
            return true;
        } catch (err) {
            throw err;
        }
    }

    // Because there should only be one row, only allow updates
    static async updateRow(json) {
        try {
            return await Helpers.updateRow(json, 'settings');
        } catch (err) {
            throw err;
        }
    }

    static async query(json) {
        try {
            return await Helpers.query(json, 'settings');
        } catch (err) {
            throw err;
        }
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
            return await Helpers.insertRow(json, 'history');
        } catch (err) {
            throw err;
        }
    }

    static async deleteRow(json) {
        try {
            return await Helpers.deleteRow(json, 'history');
        } catch (err) {
            throw err;
        }
    }

    static async query(json) {
        try {
            return await Helpers.query(json, 'history');
        } catch (err) {
            throw err;
        }
    }
}

// Class for the IN-PROGRESS jobs table
export class Jobs {
    static async createTable() {
        try {
            await Helpers.openDatabase();

            let table = 'jobs';
            let fields = [];
            fields.push('jobID INTEGER PRIMARY KEY');
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

    static async insertRow(json) {
        try {
            // due to jobID's auto increment, I need to do this
            let temp = JSON.parse(json);
            temp['jobID'] = null;
            return await Helpers.insertRow(JSON.stringify(temp), 'jobs');
        } catch (err) {
            throw err;
        }
    }

    static async updateRow(json) {
        try {
            return await Helpers.updateRow(json, 'jobs');
        } catch (err) {
            throw err;
        }
    }

    static async deleteRow(json) {
        try {
            return await Helpers.deleteRow(json, 'jobs');
        } catch (err) {
            throw err;
        }
    }

    static async query(json) {
        try {
            return await Helpers.query(json, 'jobs');
        } catch (err) {
            throw err;
        }
    }
}

// Class for the peer data
export class Peers {
    static async createTable() {
        try {
            await Helpers.closeDatabase();

            let table = 'peers';
            let fields = [];
            // fields.push('ip TEXT');
            // fields.push('region TEXT');
            // fields.push('status TEXT');
            // fields.push('accumulatedMemory TEXT');
            // fields.push('price TEXT');
            // fields.push('reputation TEXT');
            fields.push('location TEXT');
            fields.push('latency TEXT');
            fields.push('peerID TEXT');
            fields.push('connection TEXT');
            fields.push('openStreams TEXT');
            await Helpers.createTable(table, fields);

            await Helpers.closeDatabase();
        } catch (err) {
            throw err;
        }
    }

    static async insertRow(json) {
        try {
            return await Helpers.insertRow(json, 'peers');
        } catch (err) {
            throw err;
        }
    }

    static async updateRow(json) {
        try {
            return await Helpers.updateRow(json, 'peers');
        } catch (err) {
            throw err;
        }
    }

    static async deleteRow(json) {
        try {
            return await Helpers.deleteRow(json, 'peers');
        } catch (err) {
            throw err;
        }
    }

    static async query(json) {
        try {
            return await Helpers.query(json, 'peers');
        } catch (err) {
            throw err;
        }
    }
}

// testing code
async function testing() {
    try {
        await Settings.createTable();
        let json = {};
        let a = await Settings.query(json);
        console.log(a);

        // await Jobs.createTable();
        // let b = {
        //     fileHash: 'test1',
        //     timeQueued: 'test2',
        //     status: 'test3',
        //     accumulatedCost: 1,
        //     projectedCost: 2,
        //     eta: 3,
        //     peer: 'test4'
        // }
        // await Jobs.insertRow(JSON.stringify(b));
        // // let c = {
        // //     fileHash: 'test1'
        // // }
        // // await Jobs.deleteRow(JSON.stringify(c));
        // let d = {
        //     fileHash: 'test1'
        // }
        // let e = await Jobs.query(JSON.stringify(d));
        // console.log(e);
        
        // await Helpers.openDatabase();
        // let a = await Helpers.query('settings', '*', "theme = dark AND saveLocation = new");
        // let a = await Helpers.columnData('settings');
        // console.log(a);
        // await Helpers.closeDatabase();
    } catch (err) {
        console.log(err);
    }
}
// await testing();