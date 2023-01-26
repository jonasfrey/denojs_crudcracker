
class O_db_connection_info{
    constructor(
        n_id, 
        s_hostname, 
        n_port, 
        s_username, 
        s_password, 
    ){
        this.n_id = n_id
        this.s_hostname = s_hostname
        this.n_port = n_port
        this.s_username = s_username
        this.s_password = s_password
    }
}

export {O_db_connection_info}