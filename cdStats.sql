create database cdStats;
use cdStats;
create table Statistic(
  roundID int auto_increment,
  gameID varchar(16) not null,
  lettersChosen varchar(9) not null,
  wordEntered varchar(9) not null,
  validWord varchar(1),
  primary key(roundID)
) engine=InnoDB;
