select a.nome as artista, b.nome as album, COUNT(c.artista_id) as seguidores
from SpotifyClone.artistas as a 
inner join SpotifyClone.albuns as b on b.artista_id = a.artista_id
inner join SpotifyClone.seguindo as c on c.artista_id = a.artista_id group by artista, album
order by seguidores desc, artista, album;
