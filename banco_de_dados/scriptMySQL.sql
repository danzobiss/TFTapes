create database tftapes;
use tftapes;

create table usuario(
	idUsuario int primary key auto_increment,
    nmUsuario varchar(45),
    senha varchar (20),
    maiorPont int
);

create table especie(
	idEspecie varchar(2) primary key,
    nmEspecie varchar(45)
);

create table pequenaLenda(
	idPequenaLenda varchar(5) primary key,
    nmPequenaLenda varchar(45),
    descr varchar(150),
    urlImgPequenaLenda varchar(150),
    fkEspecie varchar(2),
    foreign key(fkEspecie) references especie(idEspecie)
);

create table pequenaLendaFavorita(
	fkUsuario int,
    fkPequenaLenda varchar(5),
    foreign key(fkUsuario) references usuario(idUsuario),
    foreign key(fkPequenaLenda) references pequenaLenda(idPequenaLenda)
);

create table classe(
	idClasse varchar(2) primary key,
    nmClasse varchar(45)
);

create table arena(
	idArena varchar(2) primary key,
    nmArena varchar(45),
    urlImgArena varchar(150),
    fkClasse varchar(2),
    foreign key(fkClasse) references classe(idClasse)
);

create table arenaFavorita(
	fkUsuario int,
    fkArena varchar(2),
    foreign key(fkUsuario) references usuario(idUsuario),
    foreign key(fkArena) references arena(idArena)
);