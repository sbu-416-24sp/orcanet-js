import sqlite3 from "sqlite3";

import { openDB, closeDB, openFailMessage, closeFailMessage } from './db_utils.js';

export async function create_table() {
    return new Promise((resolve, reject) => { async () => {
        let db = await openDB();
        if (db === false) reject(openFailMessage);
        console.log("holy");

        let close = await closeDB(db);
        if (close == false) reject(closeFailMessage);
        resolve(true);
    }});
}

console.log("wtf");
let a = await create_table();
console.log(a);
console.log("wtf");