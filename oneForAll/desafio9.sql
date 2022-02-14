select COUNT(a.cancoes_reproduzidas) as quantidade_musicas_no_historico
from SpotifyClone.historico as a 
inner join SpotifyClone.usuarios as b on b.usuario_id = a.usuario_id and b.nome = "Bill";
