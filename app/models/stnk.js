const mongoose = require('mongoose');

const stnkSchema = new mongoose.Schema({
	nomor_motor : String,
	nama_pemilik : String,
	alamat : String,
	merk : String,
	type : String,
	jenis : String,
	model : String,
	tahun_pembuatan : String,
	warna : String,
	bahan_bakar : String,
	warna_tnkb : String,
	no_bpkb : String
});

const stnk = mongoose.model("stnk", stnkSchema);

module.exports = stnk;