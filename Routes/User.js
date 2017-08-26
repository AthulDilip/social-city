var express = require('express')
var router = express.Router()
var User = require('../Models/UserModel')
var mongoose = require('mongoose')

router.put('/', (req, res) => {
    let data = req.body;

    if(data ==null || !data.name || !data.phone) {
        let response = {
            'status': "UA200",
            'message': "Incomplete Data",
            'data': null
        };

        res.json(response);
        return;
    }

    let u = new User({
        'name': data.name,
        'phone': data.phone,
        'locationName': data.locationName,
        'latitude': data.latitude,
        'longitude': data.longitude
    });

    u.save((err, result) => {

        if(err) {
            let response = {
                'status': "UA300",
                'message': "Failed saved",
                'data': null
            };
        
            res.json(response);
            return;
        }


        let response = {
            'status': "UA100",
            'message': "Successfully saved",
            'data': null
        };
    
        res.json(response);
        return;
    });
});

router.get('/single/:userId', (req, res) => {
    let userId = '';
    console.log(req.params.userId);
    try{
        userId = mongoose.Types.ObjectId(req.params.userId);
    }catch(e) {

        let response = {
            'status': "UB200",
            'message': "Invalid UserId",
            'data': null
        };
    
        res.json(response);
        return;
    }

    User.findOne(userId, (err, result) => {
        let response = {
            'status': "UB100",
            'message': "Success",
            'data': result
        };

        res.json(response);
        return;
    })
});

module.exports = router;