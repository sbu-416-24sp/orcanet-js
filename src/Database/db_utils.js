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
    let name = 'openDB';
    try {
        let db = await openCall();
        console.log(name, ': Connected to the storage database.');
        return db;
    }
    catch (err) {
        throw new Error(err);
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
async function closeDB(db) {
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
        catch (err) {
            throw new Error(err);
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
async function runDB(db, command) {
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
        catch (err) {
            throw new Error(err);
        }
    }
}

// Given a list of SQL commands, run each in order
export async function runCommands(commands) {
    let db;
    try {
        db = await openDB();
    }
    catch (err) {
        throw new Error(err);
    }

    for (const c in commands) {
        try {
            await runDB(db, c);
        }
        catch (err) {
            throw new Error(err);
        }
    }

    try {
        await closeDB(db);
    }
    catch (err) {
        throw new Error(err);
    }

    return true;
}