import sqlite3 from "sqlite3";

import { runCommands } from './db_utils.js';

export async function create_table() {
    const commands = [];
    commands.push("");

    return await runCommands(commands);
}

try {
    let a = await create_table();
    console.log(a);
}
catch (err) {
    console.log(err);
}