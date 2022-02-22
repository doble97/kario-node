drop DATABASE if EXISTS `Kario`;
create database Kario;
use Kario;
create table users(
    id int primary key auto_increment,
    email varchar(40) unique not null, 
    password varchar(120) not null,
    name varchar(60) not null,
    surname varchar(60) not null, 
    created_at date not null
);

create table themes(
    id int primary key auto_increment,
    name varchar(60) not null,
    created_at date not null,
    language_match varchar(2) default "EN",
    fk_user int,
    constraint FK_USERS_THEMES foreign key(fk_user) references users(id) on delete set null
);
 create table words(
    id int primary key auto_increment,
    word_from varchar(60) not null, 
    word_to varchar(60) not null, 
    fk_theme int,
    created_at date not null,   
    constraint FK_THEMES_WORDS foreign key(fk_theme) references themes(id) on delete cascade
);

create table playing_words(
    played_at date not null,
    fk_word int,
    fk_user int,
    fk_theme int,
    is_successful boolean,
    constraint FK_WORDS_PLAYING_WORDS foreign key(fk_word) references words(id),
    constraint FK_USERS_PLAYING_WORDS foreign key(fk_user) references users(id) on delete cascade,
    constraint FK_THEME_PLAYING_WORDS foreign key(fk_theme) references themes(id),
    primary key(fk_word, fk_user)
);

create table logging(
    entered_at date not null,
    fk_user int,
    fk_theme int,
    foreign key(fk_theme) references themes(id),
    foreign key(fk_user) references users(id)
);