const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cargaDatosDB = require("./controllers/cargaDatosDB.js");

require("./db.js");

const server = express();

server.name = "API";

// midlewere de prueba
server.use((req, res, next) => {
  console.log("Pasa por el 1º midlewere");

  // Cargo datos de API a DB
  cargaDatosDB();

  next();
});

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
/* El primer middleware, bodyParser.urlencoded(), se utiliza para analizar
los datos enviados por el cliente en el cuerpo de una solicitud HTTP.
En este caso, se configura para analizar los datos codificados en formato
URL y para permitir que los datos analizados incluyan objetos anidados.
También se establece un límite de tamaño máximo de 50 MB para los datos analizados.*/
server.use(bodyParser.json({ limit: "50mb" }));
/*El segundo middleware, bodyParser.json(), se utiliza para analizar los datos
enviados por el cliente en el cuerpo de una solicitud HTTP. En este caso, se
configura para analizar los datos en formato JSON y para establecer un límite
de tamaño máximo de 50 MB para los datos analizados.*/
server.use(cookieParser());
/*El tercer middleware, cookieParser(), se utiliza para analizar las cookies
enviadas por el cliente en una solicitud HTTP. */
server.use(morgan("dev"));
/*El cuarto middleware, morgan('dev'), se utiliza para registrar detalles de la
solicitud HTTP en la consola del servidor para fines de depuración. En este caso,
se utiliza la opción 'dev' para registrar los detalles en un formato legible. */
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
/*El último middleware se utiliza para configurar los encabezados de respuesta HTTP
para permitir el acceso a recursos desde un origen diferente al servidor, es decir,
para evitar errores de CORS (Cross-Origin Resource Sharing). Se establece el valor
del encabezado Access-Control-Allow-Origin en 'http://localhost:3000', lo que
significa que solo se permite el acceso desde el origen 'http://localhost:3000'.
Se establece el valor del encabezado Access-Control-Allow-Credentials en 'true', lo
que permite enviar cookies de origen cruzado. Los encabezados
Access-Control-Allow-Headers y Access-Control-Allow-Methods se establecen para
permitir ciertos encabezados y métodos HTTP. El middleware next() se utiliza para
pasar la solicitud al siguiente middleware en la cadena de middleware. */

server.use("/", routes);

/*server.use('/', (req, res) => {
  console.log("Respueta de prueba a solicitud GET, debe tener mensaje de respuesta la página también");
  res.send('Respueta de prueba a solicitud GET, debe tener mensaje de respuesta la consola también');
});*/

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
