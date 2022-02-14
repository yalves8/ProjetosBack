select a.nome as artista, b.nome as album
from SpotifyClone.artistas as a 
inner join SpotifyClone.albuns as b on b.artista_id = a.artista_id and a.nome = "Walter Phoenix"
group by album;
