const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());


/*  start the code of passing promoId.. */
promoRouter.route('/:promoId')
.get((req,res,next) => {
    res.end('Will send details of the promotions: ' + req.params.promoId +' to you!');
})
.post((req, res, next) => {
    res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotionses');
})
.delete((req, res, next) => {
    res.end('Deleting all promotionses');
});

/*  End the code of passing promoId.. */


promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotionses to you!');
})


.post((req, res, next) => {
    res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotionses');
})
.delete((req, res, next) => {
    res.end('Deleting all promotionses');
});


module.exports = promoRouter;