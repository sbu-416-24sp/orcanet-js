import { openDB, closeDB, runCommand } from './db_utils.js';

// Creates the settings table if it doesn't exist
export async function createSettingsTable() {
    try {
        let db = await openDB();

        const command = `
        CREATE TABLE IF NOT EXISTS settings (
            theme TEXT,
            saveLocation TEXT
        );
        `
        await runCommand(db, command.trim());

        await closeDB(db);
    } catch (err) {
        throw err;
    }
}

try {
    await createSettingsTable();
} catch (err) {
    console.log(err);
}