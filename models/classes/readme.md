# mysql important
the max ROW size, not column size, for a table is 65535, so 
when using multiple rows with varchar, the size must be adapted... 
```sql
CREATE TABLE max_size_is_21844(
    s1 VARCHAR(21844) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE max_for_two_cols(
    -- we have to devide 21844 / number_of_columns
    --   (21844/2)-1 = 10921
        s1 VARCHAR(10921),
        s2 VARCHAR(10921) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE max_for_three_cols(
    -- we have to devide 21844 / number_of_columns
    --   (21844/3)-1 = 7280
        s1 VARCHAR(7280),
        s2 VARCHAR(7280),
        s3 VARCHAR(7280)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE this_wont_work(
    -- we have to devide 21844 / number_of_columns
    --   (21844/3)-1 = 7280
        s1 VARCHAR(21844),
        s2 VARCHAR(21844),
        s3 VARCHAR(21844)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE this_should_work(
    -- we have to devide 21844 / number_of_columns
    --   (21844/3)-1 = 7280
        s1 MEDIUMTEXT,
        s2 MEDIUMTEXT,
        s3 MEDIUMTEXT,
        s4 MEDIUMTEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```