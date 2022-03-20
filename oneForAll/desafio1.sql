

CREATE DATABASE SpotifyClone;


CREATE TABLE SpotifyClone.planos (
    plano_id INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(50) NOT NULL,
    valor DECIMAL(3,2) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE SpotifyClone.usuarios (
    usuario_id INT PRIMARY KEY AUTO_INCREMENT,
    plano_id INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    idade INT NOT NULL,
    data_assinatura DATE NOT NULL,
    FOREIGN KEY (plano_id) REFERENCES SpotifyClone.planos(plano_id)
)ENGINE=InnoDB;

CREATE TABLE SpotifyClone.artistas (
    artista_id INT PRIMARY KEY AUTO_INCREMENT,
    nome varchar(50) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE SpotifyClone.albuns (
    album_id INT PRIMARY KEY AUTO_INCREMENT,
    artista_id INT NOT NULL,
    nome VARCHAR(50) NOT NULL,
    ano_lancamento INT NOT NULL,
    FOREIGN KEY (artista_id) REFERENCES SpotifyClone.artistas(artista_id)
)ENGINE=InnoDB;

CREATE TABLE SpotifyClone.cancoes (
    cancao_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    duracao_segundos INT NOT NULL,
    album_id INT NOT NULL,
    FOREIGN KEY (album_id) REFERENCES SpotifyClone.albuns(album_id)
)ENGINE = InnoDB;

CREATE TABLE SpotifyClone.historico (
    usuario_id INT NOT NULL,
    cancao_id INT NOT NULL,
    cancoes_reproduzidas VARCHAR(1000),
    data_reproducao DATETIME,
    CONSTRAINT PRIMARY KEY (usuario_id, cancao_id),
    FOREIGN KEY (cancao_id) REFERENCES SpotifyClone.cancoes(cancao_id),
    FOREIGN KEY (usuario_id) REFERENCES SpotifyClone.usuarios(usuario_id)
)ENGINE=InnoDB;

CREATE TABLE SpotifyClone.seguindo (
    usuario_id INT NOT NULL,
    artista_id INT NOT NULL,
    CONSTRAINT PRIMARY KEY (usuario_id, artista_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
    FOREIGN KEY (artista_id) REFERENCES artistas(artista_id)

)ENGINE=InnoDB;


INSERT INTO SpotifyClone.planos (nome, valor) VALUES ('gratuito', 0),
( 'familiar', 7.99), ( 'universitário', 5.99), ( 'pessoal', 6.99);

INSERT INTO SpotifyClone.usuarios (plano_id, nome, idade, data_assinatura) VALUES (1, 'Thati',23, '2019-10-20'),
(2, 'Cintia',35, '2017-12-30'), (3, 'Bill',20, '2019-06-05'), (4, 'Roger',45, '2020-05-13'), (4, 'Norman',58, '2017-02-17'),
(2, 'Patrick',33, '2017-01-06'), (3, 'Vivian',26, '2018-01-05'), (3, 'Carol',19, '2018-02-14'), (2, 'Angelina',42, '2018-04-29'), 
(2, 'Paul',46, '2017-01-17');

INSERT INTO SpotifyClone.artistas (nome) VALUES ('Walter Phoenix'),
('Peter Strong'), ('Lance Day'), ('Freedie Shannon'), ('Tyler Isle'),
('Fog');

INSERT INTO SpotifyClone.albuns (artista_id, nome, ano_lancamento) VALUES 
(1, 'Envious', 1990),
(1, 'Exuberant', 1993),
(2, 'Hallowed Steam', 1995),
(3, 'Incandescent', 1998),
(4, 'Temporary Culture', 2001),
(4, 'Library of liberty', 2003),
(5, 'Chained Down', 2007),
(5, 'Cabinet of fools', 2012),
(5, 'No guarantees',2015),
(6, 'Apparatus', 2015);



INSERT INTO SpotifyClone.cancoes (nome, duracao_segundos, album_id) VALUES 
('Soul For Us',200, 1), ('Reflections Of Magic',163, 1), ('Dance With Her Own',116, 1),
('Troubles Of My Inner Fire', 203, 2), ('Time Fireworks', 152, 2),
('Magic Circus', 105, 3), ('Honey, So Do I', 207, 3), ('Sweetie, Let''s Go Wild', 139, 3),
('She Knows', 244, 3), ('Fantasy For Me', 100, 4), ('Celebration Of More', 146, 4), 
('Rock His Everything', 223, 4), ('Home Forever', 231, 4), ('Diamond Power', 241, 4), ('Let''s Be Silly', 132, 4),
('Thang Of Thunder', 240, 5), ('Words Of Her Life', 185, 5), ('Without My Streets', 176, 5),
('Need Of The Evening', 190, 6), ('History Of My Roses', 222, 6), ('Without My Love', 111, 6), ('Walking And Game', 123, 6), 
('Young And Father', 197, 6), ('Finding My Traditions', 179, 7),('Walking And Man', 229, 7),
('Hard And Time', 135, 7),('Honey, I''m A Lone Wolf', 150, 7),
('She Thinks I Won''t Stay Tonight', 166, 8),('He Heard You''re Bad For Me', 154, 8),('He Hopes We Can''t Stay', 210, 8),
('I Know I Know', 117, 8), ('He''s Walking Away', 159, 9), ('He''s Trouble', 138, 9), ('I Heard I Want To Bo Alone', 120, 9), 
('I Ride Alone', 151, 9), ('Honey', 79, 10), ('You Cheated On Me', 95, 10), ('Wouldn''t It Be Nice', 213, 10), 
('Baby', 136, 10), ('You Make Me Feel So..', 83, 10);





INSERT INTO SpotifyClone.historico (usuario_id, cancao_id, cancoes_reproduzidas, data_reproducao) VALUES
(1, 36, 'Honey',"2019-02-07 20:33:48"),
(1, 25, 'Walking And Man',"2017-01-24 00:31:17"),
(1, 23, 'Young And Father',"2017-10-12 12:35:20"),
(1, 14, 'Diamond Power',"2017-10-12 12:35:20"),
(1, 15, 'Let''s Be Silly',"2018-05-29 14:56:41"),
(2, 34, 'I Heard I Want To Bo Alone',"2020-01-02 07:40:33"),
(2, 24, 'Finding My Traditions',"2020-05-16 06:16:22"),
(2, 21, 'Without My Love',"2020-10-09 12:27:48"),
(2, 39, 'Baby',"2020-09-21 13:14:46"),
(3, 6, 'Magic Circus',"2020-11-13 16:55:13"),
(3, 3, 'Dance With Her Own',"2020-12-05 18:38:30"),
(3, 26, 'Hard And Time',"2020-07-30 10:00:00"),
(4, 2, 'Reflections Of Magic',"2021-08-15 17:10:10"),
(4, 35, 'I Ride Alone',"2021-08-15 17:10:10"),
(4, 27, 'Honey, I''m A Lone Wolf',"2021-01-09 01:44:33"),
(5, 7, 'Honey, So Do I',"2020-07-03 19:33:28"),
(5, 12, 'Rock His Everything',"2017-02-24 21:14:22"),
(5, 14, 'Diamond Power',"2020-08-06 15:23:43"),
(5, 1, 'Soul For Us',"2020-11-10 13:52:27"),
(6, 38, 'Wouldn''t It Be Nice',"2019-02-07 20:33:48"),
(6, 29, 'He Heard You''re Bad For Me',"2017-01-24 00:31:17"),
(6, 30, 'He Hopes We Can''t Stay',"2017-10-12 12:35:20"),
(6, 22, 'Walking And Game',"2018-05-29 14:56:41"),
(7, 5, 'Time Fireworks',"2018-05-09 22:30:49"),
(7, 4, 'Troubles Of My Inner Fire',"2020-07-27 12:52:58"),
(7, 11, 'Celebration Of More',"2018-01-16 18:40:43"),
(8, 39, 'Baby',"2018-03-21 16:56:40"),
(8, 40, 'You Make Me Feel So..',"2020-10-18 13:38:05"),
(8, 32, 'He"s Walking Away',"2019-05-25 08:14:03"),
(8, 33, 'He"s Trouble',"2021-08-15 21:37:09"),
(9, 16, 'Thang Of Thunder',"2021-05-24 17:23:45"),
(9, 17, 'Words Of Her Life',"2018-12-07 22:48:52"),
(9, 8, 'Sweetie, Let''s Go Wild',"2021-03-14 06:14:26"),
(9, 9, 'She Knows',"2020-04-01 03:36:00"),
(10, 20, 'History Of My Roses',"2017-02-06 08:21:34"),
(10, 21, 'Without My Love',"2017-12-04 05:33:43"),
(10, 12, 'Rock His Everything',"2017-07-27 05:24:49"),
(10, 13, 'Home Forever',"2017-12-25 01:03:57");

INSERT INTO SpotifyClone.seguindo (usuario_id, artista_id)  VALUES (1,1), (1,4), (1,3), (2,1), (2,3),
(3,2), (3,1), (4,4), (5,5), (5,6), (6,6), (6,3), (6,1), (7,2), (7,5), (8,1), (8,5), (9,6), (9,4), (9,3), 
(10,2), (10,6);
