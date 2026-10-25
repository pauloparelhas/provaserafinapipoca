@echo off
rem Abre a Fabrica de Jogos neste computador (sem internet). Deixe a janela do servidor minimizada.
rem As copias de "Guardar e comecar do zero" ficam em coding\guardados\
cd /d "%~dp0"
start "Fabrica - servidor local" /min python _engenharia\servidor_local.py
timeout /t 2 /nobreak >nul
start "" msedge "http://127.0.0.1:8765/coding/index.html"
