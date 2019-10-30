const router = require('express').Router()
let History = require('../../models/history.model')

const page_size = 10

/*
Accepts username and page parameter. Returns history data, total number of history pages and current page.
Page 0 returns the most recent history.
*/
router.route('/').get((req, res) => {
    const page = parseInt(req.query.page)
    //Error 400 for invalid page inputs (non integer or negative value)
    if (!(page >= 0)){
        res.status(400).send({
            "status": "Invalid input",
            "info": "Page must be 0 or greater"
        })
        return
    }

    History.find({"username": req.query.username})
    .then(history => 
        {
            const total_pages = Math.ceil((history.length)/page_size)
            res.json({
                "status": "ok",
                "data" : history.reverse().slice(page*page_size,(page+1)*page_size),
                "pages": total_pages,
                "current_page": page
            })
        })
})

//Adds new watch history.
router.route('/add').post((req, res) => {
    const newHistory = new History({
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        videoUrl: req.body.videoUrl,
        imageUrl: req.body.imageUrl,
    })
    newHistory.save()
    .then(() => res.json({"status": "ok"}))
    .catch((e) => res.status(400).send({"status": "Invalid input", "info": e}))
})

module.exports = router