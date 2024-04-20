import sqlite3 from "sqlite3";

let openFailMessage = "Database couldn't be opened.";
let closeFailMessage = "Database couldn't be closed.";
export { openFailMessage, closeFailMessage };

function openCall() {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.Database('./storage.db', (err) => {
            if (err) reject(err.message);
            else resolve(db);
        });
    });
}
export async function openDB() {
    let name = 'openDB';
    try {
        let db = await openCall();
        console.log(name, ': Connected to the storage database.');
        return db;
    }
    catch (error) {
        console.error(name, ': ', error);
        return false;
    }
}

function closeCall(db) {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) reject(err.message);
            else resolve(true);
        });
    });
}
export async function closeDB(db) {
    let name = 'closeDB';
    if (db === false) {
        console.error(name, ": Database object doesn't exist.");
        return false;
    }
    else {
        try {
            await closeCall(db);
            console.log(name, ': Closed connection to the storage database.');
            return true;
        }
        catch (error) {
            console.error(name, ': ', error);
            return false;
        }
    }
}

function runCall(db, command) {
    return new Promise((resolve, reject) => {
        db.run(command, (err) => {
            if (err) reject(err.message);
            else resolve(true);
        });
    });
}
export async function runDB(db, command) {
    let name = 'runDB';
    if (db === false) {
        console.error(name, ": Database object doesn't exist.");
        return false;
    }
    else {
        try {
            await runCall(db);
            console.log(name, ': Ran command -> .', command);
            return true;
        }
        catch (error) {
            console.error(name, ': ', error);
            return false;
        }
    }
}