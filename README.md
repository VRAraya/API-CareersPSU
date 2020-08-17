Api-REST

API de tipo REST para el ramo de Computacion Paralela y Distribuida de la UTEM (Trabajo 2); El servicio REST consta de 6 endpoints:

- /token: Endpoint que recibe la información de autenticación de un usuario (rut y contraseña), busca los datos en la Base de datos, y si corresponden, entrega un token firmado para poder utilizar los demás endpoints, que expira a los 15 minutos.
- /careers: Endpoint que entrega la información de todas las carreras almacenadas en la Base de datos
- /users: Endpoint que entrega la información de todos los usuarios almacenados en la Base de datos
- /career/name/:name: Endpoint que recibe un nombre, el cual debe coincidir con el nombre de alguna carrera; En caso de exito, entrega toda la informacion de esa carrera.
- /career/codeid/:codeid: Endpoint que recibe un codigo numero, el cual debe coincidir con el codigo de alguna carrera; En caso de exito, entrega toda la informacion de esa carrera.
- /apply: Endpoint que recibe los puntajes asociados a la PSU de un usuario, y entrega una lista con las 10 carreras donde queda mejor posicionado.

Para la instalacion y correcto funcionamiento, se requiere lo siguiente:

 - Node.js - (v12.12.0)
 - Npm - (6.14.6) 
- MySQL - (v8.0.20)

Se adjuntan los siguientes tutoriales para instalar los paquetes al detalle:

 - [Node.js](https://www.hostinger.es/tutoriales/instalar-node-js-ubuntu/) - (v12.12.0) (sudo apt install nodejs)
 - [Npm](https://www.hostinger.es/tutoriales/instalar-node-js-ubuntu/) - (v6.14.6)(sudo apt install npm)
 - [MySQL](https://www.digitalocean.com/community/tutorials/como-instalar-mysql-en-ubuntu-18-04-es) (v8.0.20)(sudo apt install mysql-server)

Para poder desplegar y consumir este servicio, se deben seguir los siguientes pasos

1) Ya con estos paquetes instalados, se debe copiar los archivos del repositorio en alguna locación del equipo.

2) Luego, habrá que observar hay un archivo .env.example

3) Este muestra un ejemplo de las variables de ambiente que deben ser configuradas para arrancar el servicio.

	    // CONFIG
		//Corresponde al puerto por el cual servidor express estará escuchando
		PORT=
		//Abajo se corresponden los datos de la base de datos que debe crearse en MYSQL, se deja el tutorial aquí para saber como crear una https://oscarabadfolgueira.com/crear-una-base-datos-mysql-desde-consola/
		// MYSQL
		DB_USER=
		DB_PASS=
		DB_HOST=
		DB_NAME=
		//Estos datos se pueden rellenar libremente y corresponden a los dos usuarios que se crearán luego en la tabla Usuarios
		DEFAULT ADMIN USER
		DEFAULT_ADMIN_RUT=
		DEFAULT_ADMIN_PASSWORD=
		DEFAULT_ADMIN_EMAIL=
		// DEFAULT FIRST USER
		DEFAULT_FIRST_RUT=
		DEFAULT_FIRST_PASSWORD=
		DEFAULT_FIRST_EMAIL=
		// Este dato debe rellenarse con una palabra secreta que firmará los JWT Tokens
		//AUTH
		DEFAULT_JWT_SECRET=

Estos datos deben rellenarse según corresponda, y luego debe guardarse un .env en la misma posicion del .env.example

  

4) Una vez hecho esto, pasaremos a construir la base de datos, para esto en la consola de comandos, dentro de la carpeta debe ejecutarse:
  

		1°) npm i //Este comando hará que se instalen las dependencias npm necesarias según el package.json

		2°) npm run setup //Este comando consultará si estas seguro de destruir la base de datos, al colocar Y, se construirán las tablas definidas dentro de la base de datos.

		3°) npm run seed //Este comando hará que se rellenen las tablas con la información de las carreras y los usuarios

5) Posteriormente se aplicarán los siguientes comandos dentro de la dirección de la carpeta /config:

		1°) npm i //Este comando hará que se instalen las dependencias npm necesarias según el package.json

6) Finalmente, se debe elegir si realizará un inicio del servidor en su forma para desarrolladores, o en su forma de producción, para lo primero, se elegirá el siguiente comando:

		1°) npm run start-dev

		//Para lo segundo, se eligirá el siguiente comando:

		2°) npm run start

7) Si se realizan los pasos anteriores con éxito, la consola debiese indicar que el servidor está escuchando en el puerto configurado anteriormente.

Por fin, podremos consumir los endpoints indicados al principio, según las rutas indicadas.

Se agrega una coleccion de tests en Postman
[Coleccion](https://www.getpostman.com/collections/c31d9b05917b7e22d26f)

Autores
- Victor Araya Romero - Desarrollo/Documentación

- Israel Ramirez - Documentación

- Humberto Román- Documentación