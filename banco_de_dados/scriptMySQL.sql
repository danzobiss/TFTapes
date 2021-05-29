create database tftapes;
use tftapes;

create table usuario(
	idUsuario int primary key auto_increment,
    nmUsuario varchar(45),
    senha varchar (20),
    maiorPont int
);

create table especie(
	idEspecie int primary key,
    nmEspecie varchar(45)
);

create table pequenaLenda(
	idPequenaLenda int primary key,
    nmPequenaLenda varchar(45),
    descr varchar(150),
    urlImgPequenaLenda varchar(150),
    fkEspecie int,
    foreign key(fkEspecie) references especie(idEspecie)
);

create table pequenaLendaFavorita(
	fkUsuario int,
    fkPequenaLenda int,
    foreign key(fkUsuario) references usuario(idUsuario),
    foreign key(fkPequenaLenda) references pequenaLenda(idPequenaLenda)
);

create table classe(
	idClasse int primary key,
    nmClasse varchar(45)
);

create table arena(
	idArena int primary key,
    nmArena varchar(45),
    urlImgArena varchar(150),
    fkClasse int,
    foreign key(fkClasse) references classe(idClasse)
);

create table arenaFavorita(
	fkUsuario int,
    fkArena int,
    foreign key(fkUsuario) references usuario(idUsuario),
    foreign key(fkArena) references arena(idArena)
);