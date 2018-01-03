var mongoose = require('mongoose'),
    appsettings = require('../appsettings');

var dbURI = appsettings.connectionStrings.mongoDev;
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
    mongoose.connect(dbURI);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


var userSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, lowercase: true, trim: true },
    password: String,
    active: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now() }
});

var boatSchema = new mongoose.Schema({
    name: String,
    createdDate: { type: Date, default: Date.now() }
});

var eventSchema = new mongoose.Schema({
    boatId: mongoose.Schema.Types.ObjectId,
    boatName: String,
    subject: String,
    description: String,
    privateDescription: String,
    startDate: Date,
    endDate: Date,
    personCount: Number,
    startLocation: String,
    endLocation: String,
    fee: String,
    hasDinner: Boolean,
    hasBreakfast: Boolean,
    hasCocktail: Boolean,
    hasConfirm: Boolean,
    sell: Number,
    mealCharge: Number,
    earnestMoney: Number,
    moneyType1: String,
    moneyType2: String,
    moneyType3: String,
    moneyType4: String
});

var trackerSchema = new mongoose.Schema({
    ip: String,
    url: String,
    params: { type: mongoose.Schema.Types.Mixed, default: {} },
    body: {},
    query: {},
    statusCode: String,
    statusMessage: String,
    authenticated: {},
    createdDate: { type: Date, default: Date.now() }
});

var userPermissionsSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    permissionID: mongoose.Schema.Types.ObjectId,
    byUser: mongoose.Schema.Types.ObjectId,
    createdDate: { type: Date, default: Date.now() }
});

var permissionsSchema = new mongoose.Schema({
    name: String,
    permissionType: Number,
    createdDate: { type: Date, default: Date.now() }
});

function getUserModel() {
    return mongoose.model('users', userSchema);
}

function getEventModel() {
    return mongoose.model('events', eventSchema);
}

function getBoatModel() {
    return mongoose.model('boats', boatSchema);
}

function getTrackerModel() {
    return mongoose.model('trackers', trackerSchema);
}

function getUserPermissionModel(){
    return mongoose.model('userpermissions',userPermissionsSchema);
}

function getPermissionModel(){
    return mongoose.model('permissions', permissionsSchema);
}

module.exports = {
    getUserModel: getUserModel,
    getEventModel: getEventModel,
    getBoatModel: getBoatModel,
    getTrackerModel: getTrackerModel,
    getUserPermissionModel: getUserPermissionModel,
    getPermissionModel: getPermissionModel
};