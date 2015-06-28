drop table if exists message;
create table message(
	msg_id integer primary key autoincrement,
	msg_text text not null,
	pub_date integer not null,
	ip_addr text not null
);

drop table if exists term;
create table term(
	term_id integer primary key autoincrement,
	term text not null,
	lang text not null,
	doc_freq integer
);

drop table if exists document;
create table document(
	doc_id integer primary key autoincrement,
	doc_title text not null,
	doc_body text not null,
	doc_link text not null,
	doc_image text not null,
	tw_score integer,
	fb_score integer
);

drop table if exists docterm;
create table docterm(
	doc_id integer,
	term_id integer,
	position integer,
	foreign key(doc_id) references document(doc_id),
	foreign key(term_id) references term(term_id)
);