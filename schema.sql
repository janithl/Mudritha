drop table if exists message;
create table message (
  msg_id integer primary key autoincrement,
  msg_text text not null,
  pub_date integer,
  usr_iden text not null
);