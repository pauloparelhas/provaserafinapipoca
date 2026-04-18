@echo off
title === NotebookLM LOGIN - NAO FECHE ESTA JANELA ===
color 1F
cls
echo.
echo  ===================================================
echo   NotebookLM Login - Projeto Serafina
echo  ===================================================
echo.
echo  PASSO 1: Um browser vai abrir automaticamente
echo  PASSO 2: Faca login com sua conta Google
echo  PASSO 3: Espere aparecer a pagina do NotebookLM
echo  PASSO 4: Volte AQUI e pressione ENTER
echo.
echo  IMPORTANTE: Esta janela vai ficar aberta.
echo              Nao feche ate ver "Concluido!" abaixo.
echo.
echo  ===================================================
echo.
notebooklm login
echo.
if %errorlevel% neq 0 (
    echo  [ERRO] Login falhou com codigo %errorlevel%.
    echo  Feche esta janela e tente novamente.
) else (
    echo  [OK] Concluido! Login salvo com sucesso.
    echo  Pode fechar esta janela agora.
)
echo.
echo  ===================================================
echo  Esta janela permanece aberta. Feche manualmente.
echo  ===================================================
cmd /k
