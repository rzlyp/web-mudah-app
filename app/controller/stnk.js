const stnk = require('../models/stnk');

function Stnk(){
	this.getPost = function(req, res, next){
		stnk.find({}, (err, document) =>{
			if(err)
				console.log(err);

			res.render('stnk/stnk', {user : req.user, stnk : document});
		});
	}
	this.getAdd = function(req, res, next) {
		res.render('stnk/tambah', {user : req.user});
	}
	this.postAdd = function(req, res, next) {
		
      		const data = {
                        nomor_motor : req.body.nomor_motor,
                        nama_pemilik : req.body.nama_pemilik,
                        alamat : req.body.alamat,
                        merk : req.body.merk,
                        type : req.body.type,
                        jenis : req.body.jenis,
                        model : req.body.model,
                        tahun_pembuatan : req.body.tahun_pembuatan,
                        warna : req.body.warna,
                        bahan_bakar : req.body.bahan_bakar,
                        warna_tnkb : req.body.warna_tnkb,
                        no_bpkb : req.body.no_bpkb
                  };
                  console.log(data);
      		const stnkPost = new stnk(data);
      		stnkPost.save((err)=>{
      			if(err)
      				console.log(err);

      			res.redirect('/dashboard/stnk');
      		});
      }            
		
}

module.exports = new Stnk();