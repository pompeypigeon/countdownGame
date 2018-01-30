var mysql = require('mysql'),
    con = mysql.createConnection({
      host: "35.205.177.22",
      user: "up771334",
      password: "fred1997",
      database: "countdown"
    });

con.connect(function(err){
  if (err) throw err;
  console.log("connected to db");
})
