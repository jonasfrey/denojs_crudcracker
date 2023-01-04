-- {"s_msg":"this file was automatically generated","s_by":"f_autogenerate_databases_and_tables.module.js","s_ts_created":"Mon Jan 02 2023 00:34:18 GMT+0100 (Central European Standard Time)","n_ts_created":1672616058363}
USE test_database
CREATE TABLE a_o_user (
    n_id BIGINT  AUTO_INCREMENT,
    s_name VARCHAR(512)  ,
    s_created_ts_lt VARCHAR(512)  ,
    s_modified_ts_lt VARCHAR(512)  ,
    PRIMARY KEY (n_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE a_o_chatroom (
    n_id BIGINT  AUTO_INCREMENT,
    s_name VARCHAR(512)  ,
    s_created_ts_lt VARCHAR(512)  ,
    s_modified_ts_lt VARCHAR(512)  ,
    PRIMARY KEY (n_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE a_o_message (
    n_id BIGINT  AUTO_INCREMENT,
    s_markdown VARCHAR(512)  ,
    s_created_ts_lt VARCHAR(512)  ,
    s_modified_ts_lt VARCHAR(512)  ,
    PRIMARY KEY (n_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE a_o_user_o_message_o_chatroom (
    n_id BIGINT  AUTO_INCREMENT,
    n_o_user_n_id BIGINT NOT NULL ,
    n_o_message_n_id BIGINT NOT NULL ,
    n_o_chatroom_n_id BIGINT NOT NULL ,
    s_created_ts_lt VARCHAR(512)  ,
    s_modified_ts_lt VARCHAR(512)  ,
    PRIMARY KEY (n_id),
        FOREIGN KEY (n_o_user_n_id) REFERENCES a_o_user_o_message_o_chatroom (n_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (n_o_message_n_id) REFERENCES a_o_user_o_message_o_chatroom (n_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (n_o_chatroom_n_id) REFERENCES a_o_user_o_message_o_chatroom (n_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;