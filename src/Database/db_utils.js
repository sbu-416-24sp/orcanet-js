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
        console.log('Connected to the storage database.\n');
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
        console.log('Closed connection to the storage database.\n');
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
        console.log('Running command:\n' + command + '\n');
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
            case 'SELECT':
                await allCall(db, command);
                break;
            default:
                throw new Error("Command type wasn't implemented!");
        }
    } catch (err) {
        throw new Error(err);
    }
}

export default class Helpers {
    // Keep track of the DB
    static async openDatabase() {
        if (this.db === undefined) {
            try {
                this.db = await openDB();
            } catch (err) {
                throw err;
            }
        }
    }

    // Make sure to close the DB
    static async closeDatabase() {
        try {
            await closeDB(this.db);
            this.db = undefined;
        } catch (err) {
            throw err;
        }
    }

    // Get column data so we know which columns are string types (TEXT)
    async typeData() {
        try {
            // do stuff
        } catch (err) {
            throw err;
        }
    }

    // Create a table in the DB with name and fields
    // Fields is a list of strings where each string is a field
    static async createTable(name, fields) {
        try {
            const formatted = fields.join(',\n\t');
            const c = `CREATE TABLE IF NOT EXISTS ${name} (\n\t${formatted}\n);`
            await runCommand(this.db, c);
        } catch (err) {
            throw err;
        }
    }

    // Inserts the data into a row in the table
    // Data is a list of strings in the format: [value1], [value2], etc.
    // values that corresponds to each column in the table
    static async insertRow(table, data) {
        try {
            for (let i in data) { // sqlite requires quotes for text
                if (typeof data[i] === 'string') data[i] = "'" + data[i] + "'";
            }
            const formatted = data.join(', ');
            const c = `INSERT into ${table} \nVALUES ( ${formatted} );`
            await runCommand(this.db, c);
        } catch (err) {
            throw err;
        }
    }

    // In table, find the rows that satisfy the condition and update them
    // Data is a list of strings in the format: [column name] = [value]
    // Column name is basically the fields specified in table creation
    static async updateRows(table, condition, data) {
        try {
            for (let i in data) {
                let value = data[i].split(' ')[2];
                if (typeof data[i] === 'string') data[i] = "'" + data[i] + "'";
            }

            const c = `UPDATE ${table} \nSET ${formatted} \nWHERE ${condition};`
            await runCommand(this.db, c);

            for (let i in data) { // sqlite requires quotes for text
                if (typeof data[i] === 'string') data[i] = "'" + data[i] + "'";
            }
            const formatted = data.join(', ');
        } catch (err) {
            throw err;
        }
    }


    // In table, find the rows that satisfy the condition and delete them
    static async deleteRows(table, condition) {
        try {
            const c = `DELETE from ${table} \nWHERE ${condition};`
            await runCommand(this.db, c);
        } catch (err) {
            throw err;
        }
    }
}