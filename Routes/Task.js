var express = require('express')
var router = express.Router()
let mongoose = require('mongoose')
let Task = require('../Models/TaskModel')

router.put('/', (req, res) => {
    let data = req.body;

    if(data ==null || !data.title || !data.time || !data.startDate || !data.days || !data.locationName
        || !data.latitude || !data.longitude || !data.createdBy
    ) {
        let response = {
            'status': "TA200",
            'message': "Incomplete Data",
            'data': null
        };

        res.json(response);
        return;
    }

    let t = new Task({
        'title': data.title,
        'time': data.time,
        'startDate': data.startDate,
        'days': data.days,
        'locationName': data.locationName,
        'latitude': data.latitude,
        'longitude': data.longitude,
        'createdBy': data.createdBy
    });

    t.save((err, result) => {

        if(err) {
            console.log(err);
            let response = {
                'status': "TA300",
                'message': "Failed to save",
                'data': null
            };
        
            res.json(response);
            return;
        }


        let response = {
            'status': "TA100",
            'message': "Successfully saved",
            'data': null
        };
    
        res.json(response);
        return;
    });
});

router.get('/single/:taskId', (req, res) => {
    let taskId = '';
    console.log(req.params.taskId);
    try{
        taskId = mongoose.Types.ObjectId(req.params.taskId);
    }catch(e) {

        let response = {
            'status': "TB200",
            'message': "Invalid taskId",
            'data': null
        };
    
        res.json(response);
        return;
    }

    Task.findOne(taskId, (err, result) => {
        let response = {
            'status': "TB100",
            'message': "Success",
            'data': result
        };

        res.json(response);
        return;
    })
});

router.get('/list/:start/:limit', (req, res) => {
    let skip = isNaN(parseInt(req.params.start)) ? 0 :parseInt(req.params.start)
    let limit = isNaN(parseInt(req.params.limit)) ? 10 :parseInt(req.params.limit)
    //let search = req.query.search ? (req.query.search === '' ? null : req.query.search) : null

    
    Task.find({}, {}, {skip: skip, limit: limit}, (err, records) => {
        if(err) {
            let response = {
                'status': "TC200",
                'message': "Failed",
                'data': null
            };
    
            res.json(response);
            return;
        }
        else {
            let response = {
                'status': "TC100",
                'message': "Success",
                'data': records
            };
    
            res.json(response);
            return;
        }
    })
})

module.exports = router;