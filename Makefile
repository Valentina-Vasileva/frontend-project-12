start-frontend:
	make -C frontend start
	
start-backend:
	npm start

start:
	make start-backend & make start-frontend

lint-frontend:
	make -C frontend lint

lint-fix-frontend:
	make -C frontend lint-fix

install:
	npm ci	
