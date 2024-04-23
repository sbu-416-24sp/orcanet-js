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
                return await allCall(db, command);
            default:
                throw new Error("Command type wasn't implemented!");
        }
    } catch (err) {
        throw new Error(err);
    }
}

// adds two single quotes in front and at the end of a string
// this is the proper format for fields of type TEXT
function textify(string) {
    return `'${string}'`;
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
    static async updateRows(table, data, condition = false) {
        try {
            const formatted = data.join(', ');
            let c = `UPDATE ${table} \nSET ${formatted}`
            if (condition) c += `\nWHERE ${condition}`;
            await runCommand(this.db, c + ';');
        } catch (err) {
            throw err;
        }
    }

    // In table, find the rows that satisfy the condition and delete them
    // Omitting the condition will clear all rows
    static async deleteRows(table, condition = false) {
        try {
            let c = `DELETE from ${table}`
            if (condition) c += `\nWHERE ${condition}`;
            await runCommand(this.db, c + ';');
        } catch (err) {
            throw err;
        }
    }

    // Returns all rows in table that match the optional condition
    // Only include the specified columns
    static async query(table, columns, condition = false) {
        try {
            let c = `SELECT ${columns} \nFROM ${table}`;
            if (condition) c += `\nWHERE ${condition}`;
            return await runCommand(this.db, c + ';');
        } catch (err) {
            throw err;
        }
    }

    // Run a command
    static async run(command) {
        try {
            return await runCommand(this.db, command);
        } catch (err) {
            throw err;
        }
    }

    // Gets the column names of the specific file and returns them in an array
    static async #columnData(table) {
        try {
            let dataTable = "pragma_table_info('" + table + "')";
            let data = await Helpers.query(dataTable, 'name');
            let arr = [];
            for (let column of data) {
                arr.push(column.name);
            }
            return arr;
        } catch (err) {
            throw err;
        }
    }

    // Converts a json object into an array of values for insertion
    static async jsonToInsert(json, table) {
        try {
            let cols = await Helpers.#columnData(table);
            let values = [];
            let dict = JSON.parse(json);

            for (let c of cols) {
                if (dict[c] === null) values.push('NULL');
                else if (typeof dict[c] === "string") values.push(textify(dict[c]));
                else values.push(dict[c]);
            }
            return values;
        } catch (err) {
            throw err;
        }
    }

    // Converts a json object into an array of values for updating
    static async jsonToUpdate(json, table) {
        try {
            let cols = await Helpers.#columnData(table);
            let data = [];
            let dict = JSON.parse(json);

            for (let c of cols) {
                if (typeof dict[c] === "string") data.push(`${c} = ${textify(dict[c])}`);
                else data.push(`${c} = ${dict[c]}`);
            }
            return data;
        } catch (err) {
            throw err;
        }
    }

    // Converts a json object into a single equality condition clause
    static async jsonToCondition(json) {
        try {
            let dict = JSON.parse(json);

            for (let key in dict) { // dict should only have one entry
                if (typeof dict[key] === "string") return `${key} = ${textify(dict[key])}`;
                else return `${key} = ${dict[key]}`;
            }
        } catch (err) {
            throw err;
        }
    }
}