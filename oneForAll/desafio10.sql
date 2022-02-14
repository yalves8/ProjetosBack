select a.nome as nome, COUNT(b.cancao_id) as reproducoes
from SpotifyClone.cancoes as a 
inner join SpotifyClone.historico as b on b.cancao_id = a.cancao_id 
inner join SpotifyClone.usuarios as c on b.usuario_id = c.usuario_id 
where c.plano_id = 1 OR c.plano_id = 4
group by a.nome order by a.nome asc;
