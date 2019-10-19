#/bin/bash

python init.py -r -d 
uwsgi app.ini &
python worker.py
