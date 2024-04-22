import { createTable, insertRow, updateRow, deleteRow } from './db_utils.js';

// Class for the dark/light mode settings
export class Settings {
    // Creates the settings table if it doesn't exist with a default row
    static async createTable() {
        let name = 'settings';
        let fields = [];
        fields.push('theme TEXT');
        fields.push('saveLoccation TEXT');
        try {
            await createTable(name, fields);
        } catch (err) {
            throw err;
        }
    }

    static async update() {
        return;
    }
}

// Class for storing COMPLETED JOBS
export class History {
    // Creates the history table if it doesn't exist
    static async createTable() {
        let name = 'history';
        let fields = [];
        fields.push('fileHash TEXT');
        fields.push('timeQueued TEXT');
        fields.push('status TEXT');
        fields.push('accumulatedCost TEXT');
        fields.push('projectedCost TEXT');
        fields.push('eta TEXT');
        fields.push('peer TEXT');
        try {
            await createTable(name, fields);
        } catch (err) {
            throw err;
        }
    }

    static async insert() {
        return;
    }

    static async remove() {
        return;
    }
}

// Class for storing IN-PROGRESS jobs
// Needed functions: INSERT, DELETE, UPDATE
export class Jobs {
    // Creates the jobs table if it doesn't exist
    static async createTable() {
        let name = 'jobs';
        let fields = [];
        fields.push('jobID TEXT');
        fields.push('fileHash TEXT');
        fields.push('timeQueued TEXT');
        fields.push('status TEXT');
        fields.push('accumulatedCost TEXT');
        fields.push('projectedCost TEXT');
        fields.push('eta TEXT');
        fields.push('peer TEXT');
        try {
            await createTable(name, fields);
        } catch (err) {
            throw err;
        }
    }

    static async insert() {
        return;
    }

    static async update() {
        return;
    }

    static async remove() {
        return;
    }
}

// Class for storing peer data
export class Peers {
    // Creates the peers table if it doesn't exist
    static async createTable() {
        let name = 'peers';
        let fields = [];
        fields.push('ip TEXT');
        fields.push('region TEXT');
        fields.push('status TEXT');
        fields.push('accumulatedMemory TEXT');
        fields.push('price TEXT');
        fields.push('reputation TEXT');
        try {
            await createTable(name, fields);
        } catch (err) {
            throw err;
        }
    }

    static async insert() {
        return;
    }

    static async update() {
        return;
    }

    static async remove() {
        return;
    }
}


try {
    await Settings.createTable();
} catch (err) {
    console.log(err);
}