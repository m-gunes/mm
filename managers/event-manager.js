var express = require('express'),
    dateFormat = require('dateformat'),
    databaseManager = require('./database-manager'),
    mongoose = require('mongoose'),
    moment = require("moment");


var eventCollectionName = "events",
    layoutPageName = "./layout",
    boatColletionName = "boats",
    eventDetailPageName = "./event/eventDetail",
    router = express.Router();

function getEventsViewModel(success, result) {
    this.success = success || '1';
    this.result = result || [];
}

function eventViewModel(boats) {
    this.boats = boats || [];
}


//event/save  kaydet
//event/delete  sıl
//event/list eventler
//event/update 
//event/get  detay
router.post('/kaydet', saveEvent);
router.get('/eventler', getEventsByRange);
router.get('/detay/:id', getEventDetail);
router.get('/sil/:id', deleteEvent);
router.post('/update/', eventUpdate);
router.post('/eventdate', getDate);
router.use('/', getEvents);


function getDate(req, res) {
    var requested = new Date(req.body.date);

    var fromDate = new Date(requested.getFullYear(), requested.getMonth(), requested.getDate());
    var toDate = new Date(requested.getFullYear(), requested.getMonth(), requested.getDate(), 23,59,59);

    var getEvent = databaseManager.getEventModel();
    getEvent.find({"startDate": {
            $gte: fromDate,
            $lt: toDate
        }    
    }, function(err, result){
        res.send(result);
    })
}

function eventUpdate(req, res) {

    var eventModel = databaseManager.getEventModel();
    eventModel.findById(req.body.id, function(err, etkinlik) {

        etkinlik.boatId = req.body.boatId;
        etkinlik.boatName = req.body.boatName;    
        etkinlik.subject = req.body.subject;
        etkinlik.description = req.body.description;
        etkinlik.privateDescription = req.body.privateDescription;
        etkinlik.startDate = new Date(req.body.startDate);
        etkinlik.endDate = new Date(req.body.endDate);
        etkinlik.personCount = req.body.personCount;
        etkinlik.startLocation = req.body.startLocation;
        etkinlik.endLocation = req.body.endLocation;
        etkinlik.fee = req.body.fee;
        etkinlik.sell = req.body.sell;
        etkinlik.mealCharge = req.body.mealCharge;  
        etkinlik.earnestMoney = req.body.earnestMoney;
        etkinlik.moneyType1 = req.body.moneyType1;
        etkinlik.moneyType2 = req.body.moneyType2;
        etkinlik.moneyType3 = req.body.moneyType3;
        etkinlik.moneyType4 = req.body.moneyType4;
        etkinlik.hasDinner = req.body.hasDinner.toUpperCase() === 'EVET';
        etkinlik.hasBreakfast = req.body.hasBreakfast.toUpperCase() === 'EVET';
        etkinlik.hasCocktail = req.body.hasCocktail.toUpperCase() === 'EVET';
        etkinlik.hasConfirm = req.body.hasConfirm.toUpperCase() === 'EVET';

        etkinlik.save(function(err, updatedEtkinlik) {

            res.send("ok");
            // res.render(eventDetailPageName, { model: updatedEtkinlik, user: req.authenticated.user });
        });
    });
}

function deleteEvent(req, res) {
    var eventId = req.params.id;
    var evnts = databaseManager.getEventModel();
    evnts.remove({ "_id": new mongoose.Types.ObjectId(eventId) }, function(err, result) {
        res.redirect("/etkinlik");
    });
};

function getEventDetail(req, res) {

    var eventid = req.params.id;
    var evnts = databaseManager.getEventModel();
    evnts.findOne({ _id: new mongoose.Types.ObjectId(eventid) }, function(err, doc) {

        var boats = databaseManager.getBoatModel();
        boats.find({}).exec(function(err, results) {
            res.render(eventDetailPageName, { model: doc, boats: results, user: req.authenticated.user });
        });
        // boats.findOne({ _id: new mongoose.Types.ObjectId(doc.boatId) }, function(err, boat) {
        //     doc.boatName = boat.name;
        //     res.render(eventDetailPageName, { model: doc, user: req.authenticated.user });
        // });
    });
};


function getEventsByRange(req, res) {

    var calenderEvents = new getEventsViewModel();
    var frm = new Date(parseInt(req.query.from)),
        to = new Date(parseInt(req.query.to));

    frm = new Date(moment(frm).format("YYYY-MM-DDT00:00"));
    to = new Date(moment(to).format("YYYY-MM-DDT00:00"));

    var hasPermission = false;
    for (var i = 0; i < req.authenticated.user.permissions.length; i++) {
        var per = req.authenticated.user.permissions[i];
        if (per.name === "admin") {
            hasPermission = true;
            break;
        }
    }

    if (!hasPermission) {
        if(frm < Date.now()){
            frm = new Date(moment(Date.now()).format("YYYY-MM-DD HH:mm"));
        }
    }

    calenderEvents.success = 0;
    var evnts = databaseManager.getEventModel();

    //mongodb tarihleri UTC olarak sakladığı için.
    frm = new Date(frm.getTime() + new Date().getTimezoneOffset() * 60 * 1000);
    evnts.find({ endDate: { $gte: frm } })
        .sort({ startDate: -1 })
        .exec(function(err, results) {
            results.forEach(function(evnt) {
                var timezoneOffset = -1 * new Date().getTimezoneOffset();
                calenderEvents.result.push({
                    id: evnt._id.toString(),
                    //title: evnt.subject,
                    title: evnt.boatName || evnt.subject,                    
                    url: '/etkinlik/detay/' + evnt._id,
                    class: evnt.hasConfirm ? "event-success" : "event-important",
                    // start: new Date(evnt.startDate.getTime() + evnt.startTime * 60 * 60 * 1000).getTime() - 180 * 60 * 1000,
                    // end: new Date(evnt.startDate.getTime() + evnt.endTime * 60 * 60 * 1000).getTime() - 180 * 60 * 1000
                    start: evnt.startDate.getTime(),
                    end: evnt.endDate.getTime()
                });
            });

            calenderEvents.success = 1;
            res.send(calenderEvents);
        });
}

function getEvents(req, res) {

    var viewmodel = new eventViewModel();
    viewmodel.isadmin = req.authenticated.user.permissions.map(function(item){ return item.name; }).indexOf("admin") > -1;
    var boats = databaseManager.getBoatModel();
    boats.find({}, function(err, boats) {

        viewmodel.boats = boats;
        return res.render(layoutPageName, { model: viewmodel, user: req.authenticated.user });
    });
}





function saveEvent(req, res) {

    var boatArr = req.body.bootType.split(",");
    var eventModel = databaseManager.getEventModel();
    var newEvent = new eventModel();
    newEvent.boatId = boatArr[0];
    newEvent.boatName = boatArr[1];
    newEvent.subject = req.body.eventSubject;
    newEvent.description = req.body.eventDescription;
    newEvent.privateDescription = req.body.secretDescription;    
    newEvent.startDate = new Date(req.body.startDate);
    newEvent.endDate = new Date(req.body.endDate);
    newEvent.personCount = req.body.guestCount;
    newEvent.startLocation = req.body.startLocation;
    newEvent.endLocation = req.body.endLocation;
    newEvent.fee = req.body.payment;
    newEvent.sell = req.body.sale;
    newEvent.mealCharge = req.body.eventMealCharge;
    newEvent.earnestMoney = req.body.earnestMoney;
    newEvent.moneyType1 = req.body.moneyType1;
    newEvent.moneyType2 = req.body.moneyType2;
    newEvent.moneyType3 = req.body.moneyType3;
    newEvent.moneyType4 = req.body.moneyType4;    
    newEvent.hasDinner = req.body.hasMeal === 'on';
    newEvent.hasConfirm = req.body.hasConfirm === 'on';
    newEvent.hasBreakfast = req.body.hasBreakfast === 'on';
    newEvent.hasCocktail = req.body.hasCocktail === 'on';
    newEvent.save(function(err, evnt) {
        res.redirect("/etkinlik");
    });
}

module.exports = router;