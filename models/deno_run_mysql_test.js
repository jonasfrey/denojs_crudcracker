
const p=Deno.run({
    // "bash", "-c", "ls -la"
    // cmd: [
    //     `bash`,
    //     `-c`,
    //     `mysql --defaults-extra-file=./tmpcnf_from_f_execute_query.cnf -e "DROP DATABASE test_database"`
    // ],
    cmd: [
        `bash`,
        `-c`,
        `less < test.txt`
    ],
    stdout: 'piped',
    stderr: 'piped',
    stdin: 'null' 
});
await p.status();
console.log(new TextDecoder().decode(await p.output()));
console.log(new TextDecoder().decode(await p.stderrOutput()));