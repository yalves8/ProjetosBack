select min(a.valor) as faturamento_minimo, 
max(a.valor) as faturamento_maximo,
round(avg(a.valor),2) as faturamento_medio, 
sum(a.valor) as faturamento_total
from SpotifyClone.planos as a 
inner join SpotifyClone.usuarios as b
on a.plano_id = b.plano_id;
