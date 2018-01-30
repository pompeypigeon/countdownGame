var mysql = require('mysql'),
    con = mysql.createConnection({
      host: "",
      user: "up771334",
      password: "",
      database: "countdown"
    });

con.connect(function(err){
  if (err) throw err;
  console.log("connected to db");
})
