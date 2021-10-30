# Make file for b4sh

install:
	virtualenv -p python3 env
	./env/bin/pip install -r requirements.txt
	cp ./example.config.txt config.txt

run:
	./env/bin/python3 -m app.main
