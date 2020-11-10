const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const app = express();
const port = 7000;

app.set('view engine','hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var koneksi = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'db_penduduk'
});

koneksi.connect((err) =>{
    if(err) throw err;
    console.log('Koneksi Databases Berhasil Disambung')
});

app.get('/', (req, res) => {
    koneksi.query('SELECT * FROM data_penduduk',(err, hasil) => {
        if(err) throw err;
        res.render('home.hbs', {
            judulHalaman: 'DATA PENDUDUK',
            data: hasil
        });
    });
});

app.post('/tambahbarang', (req, res) =>{
    var nama = req.body.inputnama;
    var alamat = req.body.inputalamat;
    var ttl = req.body.inputttl;
    var golongandarah = req.body.inputgolongandarah;
    var telepon = req.body.inputtelepon;
    koneksi.query('INSERT INTO data_penduduk(nama,alamat,ttl,golongan_darah,telepon) values (?,?,?,?,?)',
    [ nama, alamat, ttl, golongandarah, telepon],
    (err, hasil) =>{
        if(err) throw err;
        res.redirect('/');
    }
    )
})

app.get('/hapus/:NIK',(req, res) =>{
    var nik = req.params.NIK;
    koneksi.query("DELETE from data_penduduk where NIK=?",
     [nik], (err, hasil) =>{
         if(err) throw err;
         res.redirect('/')
     }
    )
})

app.listen(port, () =>{
    console.log(`App berjalan pada port ${port}`);
});