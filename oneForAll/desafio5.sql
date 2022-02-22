select a.nome as cancao, COUNT(b.usuario_id) as reproducoes
from SpotifyClone.cancoes as a 
	inner join SpotifyClone.historico as b
		on a.nome = b.cancoes_reproduzidas
group by a.cancao_id order by reproducoes desc, cancao LIMIT 2;
