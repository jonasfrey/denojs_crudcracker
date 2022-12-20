import { f_autogenerate_classes } from "./f_autogenerate_classes.module.js";
import { f_autogenerate_databases_and_tables } from "./f_autogenerate_databases_and_tables.module.js";

await f_autogenerate_classes();
await f_autogenerate_databases_and_tables();

console.log(`${import.meta.url}: done`)