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
    try {
        let db = await openCall();
        console.log('open_db: Connected to the storage database.');
        return db;
    }
    catch (error) {
        console.error('open_db: ', error);
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
    if (db === false) {
        console.error("close_db: Database object doesn't exist.");
        return false;
    }
    else {
        try {
            await closeCall(db);
            console.log('close_db: Closed connection to the storage database.');
            return true;
        }
        catch (error) {
            console.error('close_db: ', error);
            return false;
        }
    }
}