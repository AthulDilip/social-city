var express = require('express')
var router = express.Router()
let mongoose = require('mongoose')
let Task = require('../Models/TaskModel')
let User = require('../Models/UserModel')
let TaskCompleted = require('../Models/TaskCompletedModel')

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

    let location = { 
        type: "Point", 
        coordinates: [ data.longitude, data.latitude ] 
    }

    let t = new Task({
        'title': data.title,
        'time': data.time,
        'startDate': data.startDate,
        'days': data.days,
        'locationName': data.locationName,
        'loc': location,
        'createdBy': data.createdBy,
        'joinedUsers': [data.createdBy]        
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

router.get('/listByLocation/:start/:limit', (req, res) => {
    let skip = isNaN(parseInt(req.params.start)) ? 0 :parseInt(req.params.start)
    let limit = isNaN(parseInt(req.params.limit)) ? 10 :parseInt(req.params.limit)
    let latitude = req.query.latitude ? (req.query.latitude === '' ? null : req.query.latitude) : null
    let longitude = req.query.longitude ? (req.query.longitude === '' ? null : req.query.longitude) : null

    
    Task.find({loc: { $geoWithin: { $center: [ [ latitude, longitude ], 10 ] }}}, {}, {skip: skip, limit: limit}, (err, records) => {
        if(err) {
            let response = {
                'status': "TC200",
                'message': "Failed",
                'data': null
            };
    
            res.json(response);
            return;
        }else {

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

router.post('/join', (req, res) => {
    let data = req.body;

    if (!data || !data.userId || !data.taskId) {
        let response = {
            'status': "TD200",
            'message': "Invalid input",
            'data': null
        };

        res.json(response);
        return; 
    }

    let taskId = '';
    let userId = '';
    
    try{
        taskId = mongoose.Types.ObjectId(data.taskId);
    }catch(e) {

        let response = {
            'status': "TD200",
            'message': "Invalid input",
            'data': null
        };
    
        res.json(response);
        return;
    }

    Task.findOne(taskId, (err, result) => {

        if(err) {
            let response = {
                'status': "TD200",
                'message': "Invalid input",
                'data': null
            };
        
            res.json(response);
            return;
        }

        let task = result;
        task.joinedUsers.push(data.userId);
        
        task.save((err, result) => {
            if(err) {
                let response = {
                    'status': "TD200",
                    'message': "Invalid input",
                    'data': null
                };
            
                res.json(response);
                return;
            }

            let response = {
                'status': "TD100",
                'message': "Success",
                'data': null
            };
        
            res.json(response);
            return;
        })
    });
});

router.post('/completedTask', (req, res) => {
    let data = req.body;
    //console.log(data);
    if(!data || !data.userId || !data.taskId || !data.completedDate) {
        let response = {
            'status': "TE200",
            'message': "Incomplete input",
            'data': null
        };
    
        res.json(response);
        return;
    }

    TaskCompleted.find({userId: data.userId, taskId: data.taskId}, (err, result) => {
        if(err) {
            let response = {
                'status': "TE200",
                'message': "Invalid Data",
                'data': null
            };
        
            res.json(response);
            return;
        }

        if(result.length <= 0) {
            let tc = new TaskCompleted({
                'taskId': data.taskId,
                'userId': data.userId,
                'completedDates': [data.completedDate]
            });

            tc.save((err, result) => {
                if(err) {
                    console.log(err);
                    let response = {
                        'status': "TE200",
                        'message': "Invalid Data",
                        'data': null
                    };
                
                    res.json(response);
                    return;
                }

                let response = {
                    'status': "TE100",
                    'message': "Success",
                    'data': null
                };
            
                res.json(response);
                return;
            })

        }else {
            if(err) {
                let response = {
                    'status': "TE200",
                    'message': "Invalid Data",
                    'data': null
                };
            
                res.json(response);
                return;
            }

            let tc = result[0];
            tc.completedDate.push(data.completedDate);

            tc.save((err, result) => {
                let response = {
                    'status': "TE100",
                    'message': "Success",
                    'data': null
                };
            
                res.json(response);
                return;
            })
        }
    });

});

router.get('/getAllDetails/:taskId', (req, res) => {
    /*let taskId = req.params.taskId;

    try{
        taskId = mongoose.Types.ObjectId(taskId);
    }catch(e) {

        let response = {
            'status': "TF200",
            'message': "Invalid input",
            'data': null
        };
    
        res.json(response);
        return;
    }

    Task.findOne(taskId, (err, result) => {
        if(err || result.length == 0) {
            let response = {
                'status': "TF200",
                'message': "Invalid input",
                'data': null
            };
        
            res.json(response);
            return;
        }
    });*/
    
});

module.exports = router;