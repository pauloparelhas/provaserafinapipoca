@echo off
rem Abre a Fabrica de Jogos neste computador (sem internet). Deixe esta janela minimizada.
cd /d "%~dp0.."
start "Fabrica - servidor local" /min python -m http.server 8765 --bind 127.0.0.1
timeout /t 2 /nobreak >nul
start "" msedge "http://127.0.0.1:8765/coding/index.html"
