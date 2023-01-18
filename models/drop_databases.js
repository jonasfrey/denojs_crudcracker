import {f_drop_databases} from "./f_autogenerate_databases_and_tables.module.js"

await f_drop_databases();

console.log(`${import.meta.url}: done`)