const app = require('./api/server.js');
const PORT = 4000;

app.server.listen(PORT,() => {
    
    console.log(`server started on port: ${PORT}`);

});
