create database countdown;
use countdown;

create table if not exists letters(
  gameID  int,
  roundNo int,
  letters varchar(9) not null,
  player1word varchar(9) not null,
  player2word varchar(9),
  primary key (gameID, roundNo)
);

create table if not exists numbers(
  gameID int,
  roundNo int,
  number1 int not null,
  number2 int not null,
  number3 int not null,
  number4 int not null,
  number5 int not null,
  number6 int not null,
  number7 int not null,
  targetNumber int not null,
  player1result int not null,
  player2result int not null,
  primary key (gameID, roundNo)
);
