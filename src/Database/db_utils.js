import sqlite3 from "sqlite3";

function openCall() {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database('./storage.db', (err) => {
            if (err) reject(err.message);
            else resolve(db);
        });
    });
}
export async function openDB() {
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
export async function closeDB(db) {
    try {
        await closeCall(db);
        console.log('Closed connection to the storage database.');
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

export async function runCommand(db, command) {
    try {  
        console.log('Running command: ', command);
        const type = command.split(' ')[0]; // first word tells us which db method to run

        switch (type) {
            case 'CREATE':
                await runCall(db, command);
                break;
            default:
                throw new Error("Command type wasn't implemented!");
        }
    } catch (err) {
        throw new Error(err);
    }
}