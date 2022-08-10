const express = require('express')
const { result } = require('lodash')
const mysql = require("mysql")
const BodyParser = require("body-parser")
const app = express()

app.use(BodyParser.urlencoded({extended:true}))

app.set("view engine", "ejs")
app.set("views", "views")

const db = mysql.createConnection({
    host:"localhost",
    database:"pijarcamp",
    user:"root",
    password: "",
})

db.connect((err) =>{
    if(err) throw err
    
    app.get("/", (req, res) =>{
        const sql = "SELECT * FROM produk"
        db.query(sql, (err, result) =>{
            const user = JSON.parse(JSON.stringify(result))
            res.render("index.ejs",{ users: user, title: "Daftar Barang"})
    })    
 })

 app.post("/tambah", (req, res)=>{
    const insSql = `INSERT INTO produk (nama_Produk, keterangan, harga, jumlah) VALUES (
        '${req.body.nama}',
        '${req.body.keterangan}',
        '${req.body.harga}',
        '${req.body.jumlah}');`
    db.query(insSql, (err, result) => {
      if (err) throw err
      res.redirect("/")
    })
 })

 app.post("/hapus", (req,res)=>{
    const sqlHapus = `DELETE FROM produk WHERE no_Produk = '${req.body.idbarang}';`
    db.query(sqlHapus, (err,result)=>{
        res.redirect("/")
    })
 })

 app.get("/edit/:userId", (req,res)=>{
    const userId = req.params.userId;
    let sqlGet = `SELECT * FROM produk WHERE no_Produk = ${userId}`;
    db.query(sqlGet,(err,result)=>{
        res.render("update.ejs",{ users: result[0], title: "Update Barang"})
    })
 })

 app.post("/update", (req, res)=>{
    const updSQL = `UPDATE produk SET nama_Produk = '${req.body.name}', keterangan = '${req.body.descript}',harga = '${req.body.price}', jumlah= '${req.body.number}' WHERE no_Produk = '${req.body.idproduct}';`   
    db.query(updSQL, (err, result) => {
      if (err) throw err
      res.redirect("/")
    })
 })

})



app.listen(8000, () => {
    console.log("server is ready..")
})