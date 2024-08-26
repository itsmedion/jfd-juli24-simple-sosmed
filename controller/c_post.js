const m_post    = require('./../model/m_post')
const path      = require('path')
const moment    = require('moment')
moment.locale('id')

module.exports =
{
    index: function(req,res) {
        let dataview ={
            req:req,
            moment: moment,
            message: req.query.msg,
        }
        res.render('post/index',dataview)
    },

    proses_insert :async function(req,res) {
        let caption = (req.body)
        let media1 = req.files.form_media1
        let media2 = req.files.form_media2
        let media3 = req.files.form_media3

        if(caption || (media1 || media2 || media3)) {
            // proses insert ke database
            try {
                let max_size = 1024 * 1024 * 3 //3MB
       
        if(media1.size > max_size) {
            return res.redirect('/posting?msg=Media l melebihi limit 3MB')
        } else if (media2.size > max_size) {
            return res.redirect('/posting?msg=Media 2 melebihi limit 3MB')
        } else if (media3.size > max_size) {
            return res.redirect('/posting?msg=Media 3 melebihi limit 3MB')
        } else {
            // proses insert ke database
            let insert = await m_post.insert(req)
            if (insert.affectedRows > 0) {
                return res.redirect(`/feed?msg=berhasil kirim postingan`)
            }
        }
        } catch(error) {
            console.log(error)
            res.redirect(`/post?msg=${error}`)
        }
    }
        else{
            // kirim pesan error/warning
            // terhadap pengecekan antara caption atau media, salah satunya harus terisi
            let pesan_error = 'Caption atau Media harus terisi salah satu'
            res.redirect(`/post?msg=${pesan_error}`)
        }
    }

}    
