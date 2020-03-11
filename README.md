## Installation

MySQL
``` MySQL
$ CREATE DATABASE sendmeapp;
$ CREATE USER 'nest'@'localhost' IDENTIFIED BY 'app';
$ GRANT ALL PRIVILEGES ON `borrame`.* TO 'nest'@'localhost';
```

bash 1: back-end
```bash 1: back-end
$ cd api-nest-react
$ cd back
$ npm install
$ npm run start
```

bash 2: front-end
```bash 2: front-end
$ cd api-nest-react
$ cd front
$ npm install
$ npm start
```
