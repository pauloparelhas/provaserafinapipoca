-- nuvem da família: uma linha por versão guardada; a atual é a de maior salvoEm
CREATE TABLE IF NOT EXISTS estados (
  dono TEXT NOT NULL,          -- SHA-256 da chave da família (a chave nunca é guardada)
  salvoEm INTEGER NOT NULL,
  tamanho INTEGER NOT NULL,
  json TEXT NOT NULL,
  PRIMARY KEY (dono, salvoEm)
);
