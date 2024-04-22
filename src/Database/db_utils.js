import sqlite3 from "sqlite3";

function openCall() {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database('./storage.db', (err) => {
            if (err) reject(err.message);
            else resolve(db);
        });
    });
}
async function openDB() {
    try {
        let db = await openCall();
        console.log('Connected to the storage database.');
        return db;
    } catch (err) {
        throw new Error(err);
    }
}

function closeCall(db) {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) reject(err.message)
            else resolve();
        });
    });
}
async function closeDB(db) {
    try {
        await closeCall(db);
        console.log('\nClosed connection to the storage database.');
    } catch (err) {
        throw new Error(err);
    }
}

// Run the command without returning anything
function runCall(db, command) {
    return new Promise((resolve, reject) => {
        db.run(command, (err) => {
            if (err) reject(err.message);
            else resolve();
        });
    });
}
// Run the query and returns the FIRST result row
function getCall(db, command) {
    return new Promise((resolve, reject) => {
        db.get(command, (err, row) => {
            if (err) reject(err.message);
            else resolve(row);
        });
    });
}
// Run the query and returns ALL the result rows
function allCall(db, command) {
    return new Promise((resolve, reject) => {
        db.all(command, (err, rows) => {
            if (err) reject(err.message);
            else resolve(rows);
        });
    });
}

async function runCommand(db, command) {
    try {  
        console.log('\nRunning command:\n' + command);
        const type = command.split(' ')[0]; // first word tells us which db method to run

        switch (type) {
            case 'CREATE':
                await runCall(db, command);
                break;
            case 'INSERT':
                await runCall(db, command);
                break;
            case 'UPDATE':
                await runCall(db, command);
                break;
            case 'DELETE':
                await runCall(db, command);
                break;
            default:
                throw new Error("Command type wasn't implemented!");
        }
    } catch (err) {
        throw new Error(err);
    }
}

// Create a table in the DB with name and fields, where field is
// a list of strings where each string is a field
export async function createTable(name, fields) {
    try {
        let db = await openDB();

        let formatted = fields.join(',\n\t');
        let c = `CREATE TABLE IF NOT EXISTS ${name} (\n\t${formatted}\n);`
        await runCommand(db, c);

        await closeDB(db);
    } catch (err) {
        throw err;
    }
}

// abc
export async function insertRow(table, field) {
    try {
        let db = await openDB();

        // do stuff

        await closeDB(db);
    } catch (err) {
        throw err;
    }
}

// abc
export async function updateRow(table, field) {
    try {
        let db = await openDB();

        // do stuff

        await closeDB(db);
    } catch (err) {
        throw err;
    }
}


// abc
export async function deleteRow(table, field) {
    try {
        let db = await openDB();

        // do stuff

        await closeDB(db);
    } catch (err) {
        throw err;
    }
}