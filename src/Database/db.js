import sqlite3 from "sqlite3";

import { openDB, closeDB, openFailMessage, closeFailMessage } from './db_utils.js';

export async function create_table() {
    let db = await openDB();
    if (db === false) return openFailMessage;

    let close = await closeDB(db);
    if (close == false) return closeFailMessage;

    return true;
}

let a = await create_table();
console.log(a);