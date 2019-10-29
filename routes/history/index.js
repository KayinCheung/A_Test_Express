const router = require('express').Router()
let History = require('../../models/history.model')

const page_size = 10

router.route('/').get((req, res) => {
    console.log('get')
    History.find({"username": req.query.username})
    .then(history => 
        {
            const total_pages = Math.ceil((history.length-1)/page_size) - 1
            const page = parseInt(req.query.page)
            console.log(page)
            res.json({
                "data" : history.reverse().slice(page*page_size,(page+1)*page_size),
                "pages": total_pages,
                "current_page": page
            })
        })
})

router.route('/add').post((req, res) => {
    const newHistory = new History({
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        videoUrl: req.body.videoUrl,
        imageUrl: req.body.imageUrl,
    })
    newHistory.save()
    .then(() => res.json({"status": "History Added"}))
    .catch((e) => res.status(400).send({"status": "Invalid inputs", "info": e}))
})

module.exports = router