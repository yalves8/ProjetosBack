select a.nome as nome_musica,
case 
	when a.nome like '%Streets%' then replace(a.nome,'Streets', 'Code Review')
	when a.nome like '%Her Own%' then replace(a.nome,'Her Own', 'Trybe')
    when a.nome like '%Inner Fire%' then replace(a.nome,'Inner Fire', 'Project')
    when a.nome like '%Silly%' then replace(a.nome,'Silly', 'Nice')
    when a.nome like '%Circus%' then replace(a.nome,'Circus', 'Pull Request')
    else replace(a.nome,a.nome,a.nome)
    end as novo_nome
from SpotifyClone.cancoes as a
 where a.nome like '%Streets%' or
 a.nome like '%Her Own%' or
 a.nome like '%Inner Fire%' or
 a.nome like '%Silly%' or
 a.nome like '%Circus%'
 order by a.nome;
