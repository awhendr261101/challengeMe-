// dbconnection
import { createPool } from "mysql2";
import { config } from "dotenv";
config();

const e = process.env;

const dbconnection = createPool(
    {
        host : e.HOSTDB,
        user : e.USERDB,
        password : e.DBPWD,
        database : e.DBNAME,
        multipleStatements : true,
        connectionLimit : 30
    }
)

dbconnection.on('connection', (pool)=>{
    if (!pool) throw new Error("Oops, connection failed please try again later.")
})

dbconnection.on('error', (err)=>{
    console.log('error connecting to database' + err.message)
    process.exit(1)
});

export {
    dbconnection
}
