select a.nome as usuario, if(max(year(b.data_reproducao) = 2021), 'Usuário ativo', 'Usuário inativo') as condicao_usuario
from SpotifyClone.usuarios as a 
	inner join SpotifyClone.historico as b
		on a.usuario_id = b.usuario_id
group by a.nome order by a.nome;
