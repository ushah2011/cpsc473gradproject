# cpsc473gradproject

Project Description:
This project implements 
1)	Displaying all actors
2)	Starring an Actor
3)	Adding an Actor
Implementations:
1)	MongoDB to save Actors
2)	Uses RESTful web service to return JSON objects from MongoDB
3)	Uses strongly typed and complied TypeScripts language
4)	Uses BootStrap template to create robust application
As this application uses RESTful web server to return JSON objects from MongoDB, it could be easily converted into a Static Web application without the need for separate web service. 
The static content of the application can be hosted on any Cloud service which exposes an HTTP endpoint that users can access to download the static resources. 
Build Instructions:
1)	Download all files from https://github.com/ushah2011/cpsc473gradproject
2)	Install MongoDB
3)	Following commands in the directory:

npm install			- installs dependencies from package.json
npm install –g tsd		- installs Typescript
tsd install			- retrieve .d.ts files
tsc				- Complies app.ts using tsconfig.json
4)	Launch the Node process to serve the app using the following command:

Node app.js
5)	Open your favorite browser and navigating to http://localhost:3000/ to access the app.

