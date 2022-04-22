drop DATABASE if EXISTS `Kario`;
create database Kario;
use Kario;
create table languages(
    id int primary key auto_increment,
    name varchar(40) not null
);
create table users(
    id int primary key auto_increment,
    email varchar(40) unique not null, 
    password varchar(120) not null,
    name varchar(60) not null,
    surname varchar(60) not null, 
    created_at datetime default now()
);

create table preferences(
    fk_user int,
    fk_language int,
    learn_words int not null default 5,
    constraint FK_USER_REFERENCES foreign key(fk_user) references users(id) on delete cascade,
    constraint FK_LANGUAGES_REFERENCES foreign key(fk_language) references languages(id),
    PRIMARY KEY(fk_user,fk_language)
);

create table deck_of_cards(
    id int primary key auto_increment,
    name varchar(60) not null,
    fk_user int,
    fk_language int,
    created_at datetime default now(),
    constraint FK_USERS_DECK_OF_CARDS foreign key(fk_user) references users(id),
    constraint FK_LANGUAGE_DECK_OF_CARDS FOREIGN KEY(fk_language) references languages(id)
);
create table words(
    id int primary key auto_increment,
    word varchar(60) not null,
    translation varchar(60) not null,
    created_at datetime not null default now(),
    fk_deck_of_cards int not null,
    constraint FK_DECK_OF_CARDS_WORDS foreign key(fk_deck_of_cards) references deck_of_cards(id)
);
create table sentences(
    sentence varchar(200) not null,
    translation varchar(200) not null,
    fk_word int,
    fk_user int,
    constraint FK_WORDS_SENTENCES foreign key(fk_word) references words(id),
    constraint FK_USERS_SENTENCES FOREIGN KEY(fk_user) references users(id),
    primary KEY(sentence, fk_word)
);

insert into languages(name) values('English');
insert into languages(name) values('Spanish');
insert into languages(name) values('French');
insert into languages(name) values('German');

CREATE TRIGGER user_preferences_triger AFTER INSERT ON users
FOR EACH ROW
INSERT INTO preferences(fk_user, fk_language) values(new.id, 1);