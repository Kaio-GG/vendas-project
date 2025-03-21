create database vendasDB;
use vendasDB;



create table tb_usuario(
id_usuario 	int primary key auto_increment,
nm_usuario 	varchar (200),
ds_email   	varchar (200),
ds_senha 	varchar (20)
);


create table tb_produto(
id_produto 	int primary key auto_increment,
id_usuario 	int,
nm_produto	varchar(200),
vl_preco	decimal(2),
vl_gasto	decimal(2),
vl_liquido 	decimal(2),
ds_descricao varchar(200),

foreign key (id_usuario) references tb_usuario(id_usuario)
);

create table tb_venda(
id_venda int primary key auto_increment,
id_usuario int,
ds_desconto decimal(2),
dt_venda	date,
ds_venda    varchar(200),
ds_quantidade	int,
nm_produto	varchar(200),
vl_preco	decimal(2),
vl_gasto	decimal(2),
vl_liquido 	decimal(2),
ds_descricao varchar(200),

foreign key (id_usuario) references tb_usuario(id_usuario)

);
/*drop database vendasDB;