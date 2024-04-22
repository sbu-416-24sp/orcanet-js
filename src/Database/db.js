import Helpers from './db_utils.js';

// Class for the dark/light mode settings
export class Settings {
    static async createTable() {
        try {
            await Helpers.openDatabase();

            let table = 'settings';
            let fields = [];
            fields.push('theme TEXT');
            fields.push('saveLocation TEXT');
            await Helpers.createTable(table, fields);

            // We need to initialize settings with a default row
            let values = [];
            values.push('light');
            values.push('test');
            await Helpers.insertRow(table, values);

            await Helpers.closeDatabase();
        } catch (err) {
            throw err;
        }
    }

    // Because there should only be one row, only allow updates
    static async updateRow() {
        return;
    }
}

// Class for the COMPLETED JOBS table
export class History {
    static async createTable() {
        try {
            let table = 'history';
            let fields = [];
            fields.push('fileHash TEXT');
            fields.push('timeQueued TEXT');
            fields.push('status TEXT');
            fields.push('accumulatedCost TEXT');
            fields.push('projectedCost TEXT');
            fields.push('eta TEXT');
            fields.push('peer TEXT');

            await createTable(table, fields);
        } catch (err) {
            throw err;
        }
    }

    // We don't update, it's either insert or delete
    static async insertRow() {
        return;
    }

    static async deleteRow() {
        return;
    }
}

// Class for the IN-PROGRESS jobs table
export class Jobs {
    static async createTable() {
        try {
            let table = 'jobs';
            let fields = [];
            fields.push('jobID TEXT');
            fields.push('fileHash TEXT');
            fields.push('timeQueued TEXT');
            fields.push('status TEXT');
            fields.push('accumulatedCost TEXT');
            fields.push('projectedCost TEXT');
            fields.push('eta TEXT');
            fields.push('peer TEXT');

            await createTable(table, fields);
        } catch (err) {
            throw err;
        }
    }

    static async insertRow() {
        return;
    }

    static async updateRow() {
        return;
    }

    static async deleteRow() {
        return;
    }
}

// Class for the peer data
export class Peers {
    static async createTable() {
        try {
            let table = 'peers';
            let fields = [];
            fields.push('ip TEXT');
            fields.push('region TEXT');
            fields.push('status TEXT');
            fields.push('accumulatedMemory TEXT');
            fields.push('price TEXT');
            fields.push('reputation TEXT');
            
            await createTable(table, fields);
        } catch (err) {
            throw err;
        }
    }

    static async insertRow() {
        return;
    }

    static async updateRow() {
        return;
    }

    static async deleteRow() {
        return;
    }
}


try {
    await Settings.createTable();
    // await Helpers.openDatabase();
    // await Helpers.openDatabase();
    // await Helpers.closeDatabase();
    // await Helpers.openDatabase();
    // await Helpers.closeDatabase();
} catch (err) {
    console.log(err);
}