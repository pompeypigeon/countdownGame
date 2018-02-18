create database cdStats;
use cdStats;
create table Statistic(
  roundID int auto_increment,
  gameID varchar(16) not null,
  lettersChosen varchar(9) not null,
  wordEntered varchar(9) not null,
  valid bit not null,
  primary key(roundID)
) engine=InnoDB;

insert into Statistic (gameID, lettersChosen, wordEntered, valid) values ("1111111111111", "ABCDEFGHI", "fig", 1);
