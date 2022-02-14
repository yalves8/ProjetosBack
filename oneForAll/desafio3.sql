SELECT 
  a.nome AS usuario, 
  COUNT(b.cancao_id) AS qtde_musicas_ouvidas, 
  ROUND(SUM(c.duracao_segundos/60), 2) AS total_minutos
FROM SpotifyClone.usuarios as a
  INNER JOIN SpotifyClone.historico as b
	ON a.usuario_id = b.usuario_id
  INNER JOIN SpotifyClone.cancoes as c
    ON b.cancao_id = c.cancao_id
GROUP BY a.nome ORDER BY a.nome; 
