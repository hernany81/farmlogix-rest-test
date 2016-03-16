var supertest = require("supertest");
var should = require("should");
var _ = require("lodash");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8081/farmlogix");

var adminUser = {
    username: 'elimaeda',
    password: 'gascon655'
};

var urlMappings = {
    listCategories: '/api/admin/categories',
    listProducts: '/api/products?max=10&offset=0&sortBy=dateCreated&sortDir=asc',
    listSKUs: '/api/skus?max=10&offset=0&sortBy=product.name&sortDir=asc',
    listRegularOrderGuides: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=REGULAR',
    listTrackingOrderGuides: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=TRACKING',
    listFarmOrderGuides: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=FARM',
    listFarms: '/api/farms?max=10&offset=0&sortBy=createdBy.name&sortDir=desc',
    listDistributors: '/api/distributors?max=10&offset=0&sortBy=distributor.code&sortDir=asc',
    listCustomers: '/api/customers?max=10&offset=0&sortBy=name&sortDir=asc',
    listUsers: '/api/users?max=10&offset=0&sortBy=createdBy.name&sortDir=desc',
    listRegularOrders: '/api/orders?max=10&offset=0&sortBy=order.orderId&sortDir=desc&type=REGULAR',
    listTrackingOrders: '/api/orders?max=10&offset=0&sortBy=order.orderId&sortDir=desc&type=TRACKING',
    listFarmOrders: '/api/orders?max=10&offset=0&sortBy=order.orderId&sortDir=desc&type=FARM',
    listRegularOrderReports: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=REGULAR',
    listTrackingOrderReports: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=TRACKING',
    listFarmOrderReports: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=FARM',
    listOrderNotificationRules: '/api/orderNotificationRules?max=10&offset=0&sortBy=name',
    notificationEmailSignature: '/api/configItems/notification%3Aemail%3Asignature',
    listReportTemplates: '/api/reportTemplates?max=10&offset=0&sortBy=name&sortDir=asc'
};

var testCases = [
    //{
    //    user: {
    //        username: 'elimaeda',
    //        password: 'gascon655'
    //    },
    //    endpoints: [
    //        {name: 'listCategories', access: true},
    //        {name: 'listProducts', access: true},
    //        {name: 'listSKUs', access: true},
    //        {name: 'listRegularOrderGuides', access: true},
    //        {name: 'listTrackingOrderGuides', access: true},
    //        {name: 'listFarmOrderGuides', access: true},
    //        {name: 'listFarms', access: true},
    //        {name: 'listDistributors', access: true},
    //        {name: 'listCustomers', access: true},
    //        {name: 'listUsers', access: true},
    //        {name: 'listRegularOrders', access: true},
    //        {name: 'listTrackingOrders', access: true},
    //        {name: 'listFarmOrders', access: true},
    //        {name: 'listRegularOrderReports', access: true},
    //        {name: 'listTrackingOrderReports', access: true},
    //        {name: 'listFarmOrderReports', access: true},
    //        {name: 'listOrderNotificationRules', access: true},
    //        {name: 'notificationEmailSignature', access: true},
    //        {name: 'listReportTemplates', access: true}
    //    ]
    //}, {
    //    user: {
    //        username: 'hernan@cust',
    //        password: 'password'
    //    },
    //    features: {
    //        admin: false,
    //        canCreateGuides: false,
    //        canGenerateOrderReports: false,
    //        canLockGuideItemPrices: false,
    //        canManageCustomers: false,
    //        canPlaceTrackingOrders: false,
    //        canSetGuideItemSellFormulaAndPrice: false,
    //        canSetGuideResellFormula: false,
    //        canSetGuideSellFormula: false,
    //        canSetOrderItemSellPrice: false
    //    },
    //    endpoints: [
    //        {name: 'listCategories', access: false},
    //        {name: 'listProducts', access: false},
    //        {name: 'listSKUs', access: false},
    //        {name: 'listRegularOrderGuides', access: false},
    //        {name: 'listTrackingOrderGuides', access: false},
    //        {name: 'listFarmOrderGuides', access: false},
    //        {name: 'listFarms', access: false},
    //        {name: 'listDistributors', access: true},
    //        {name: 'listCustomers', access: true},
    //        {name: 'listUsers', access: false},
    //        {name: 'listRegularOrders', access: true},
    //        {name: 'listTrackingOrders', access: true},
    //        {name: 'listFarmOrders', access: true},
    //        {name: 'listRegularOrderReports', access: false},
    //        {name: 'listTrackingOrderReports', access: false},
    //        {name: 'listFarmOrderReports', access: false},
    //        {name: 'listOrderNotificationRules', access: false},
    //        {name: 'notificationEmailSignature', access: false},
    //        {name: 'listReportTemplates', access: false}
    //    ]
    //}, {
    //    user: {
    //        username: 'hernan@cust',
    //        password: 'password'
    //    },
    //    features: {
    //        admin: false,
    //        canCreateGuides: true,
    //        canGenerateOrderReports: true,
    //        canLockGuideItemPrices: true,
    //        canManageCustomers: true,
    //        canPlaceTrackingOrders: true,
    //        canSetGuideItemSellFormulaAndPrice: true,
    //        canSetGuideResellFormula: true,
    //        canSetGuideSellFormula: true,
    //        canSetOrderItemSellPrice: true
    //    },
    //    endpoints: [
    //        {name: 'listCategories', access: false},
    //        {name: 'listProducts', access: false},
    //        {name: 'listSKUs', access: false},
    //        {name: 'listRegularOrderGuides', access: false},
    //        {name: 'listTrackingOrderGuides', access: false},
    //        {name: 'listFarmOrderGuides', access: false},
    //        {name: 'listFarms', access: false},
    //        {name: 'listDistributors', access: true},
    //        {name: 'listCustomers', access: true},
    //        {name: 'listUsers', access: false},
    //        {name: 'listRegularOrders', access: true},
    //        {name: 'listTrackingOrders', access: true},
    //        {name: 'listFarmOrders', access: true},
    //        {name: 'listRegularOrderReports', access: true},
    //        {name: 'listTrackingOrderReports', access: true},
    //        {name: 'listFarmOrderReports', access: true},
    //        {name: 'listOrderNotificationRules', access: false},
    //        {name: 'notificationEmailSignature', access: false},
    //        {name: 'listReportTemplates', access: true}
    //    ]
    //}, {
    //    user: {
    //        username: 'hernan@cust',
    //        password: 'password'
    //    },
    //    features: {
    //        admin: true,
    //        canCreateGuides: false,
    //        canGenerateOrderReports: false,
    //        canLockGuideItemPrices: false,
    //        canManageCustomers: false,
    //        canPlaceTrackingOrders: false,
    //        canSetGuideItemSellFormulaAndPrice: false,
    //        canSetGuideResellFormula: false,
    //        canSetGuideSellFormula: false,
    //        canSetOrderItemSellPrice: false
    //    },
    //    endpoints: [
    //        {name: 'listCategories', access: false},
    //        {name: 'listProducts', access: true},
    //        {name: 'listSKUs', access: true},
    //        {name: 'listRegularOrderGuides', access: true},
    //        {name: 'listTrackingOrderGuides', access: true},
    //        {name: 'listFarmOrderGuides', access: true},
    //        {name: 'listFarms', access: true},
    //        {name: 'listDistributors', access: true},
    //        {name: 'listCustomers', access: true},
    //        {name: 'listUsers', access: false},
    //        {name: 'listRegularOrders', access: true},
    //        {name: 'listTrackingOrders', access: true},
    //        {name: 'listFarmOrders', access: true},
    //        {name: 'listRegularOrderReports', access: false},
    //        {name: 'listTrackingOrderReports', access: false},
    //        {name: 'listFarmOrderReports', access: false},
    //        {name: 'listOrderNotificationRules', access: false},
    //        {name: 'notificationEmailSignature', access: false},
    //        {name: 'listReportTemplates', access: false}
    //    ]
    //}, {
    //    user: {
    //        username: 'hernan@dist',
    //        password: 'password'
    //    },
    //    endpoints: [
    //        {name: 'listCategories', access: false},
    //        {name: 'listProducts', access: true},
    //        {name: 'listSKUs', access: true},
    //        {name: 'listRegularOrderGuides', access: false},
    //        {name: 'listTrackingOrderGuides', access: false},
    //        {name: 'listFarmOrderGuides', access: false},
    //        {name: 'listFarms', access: true},
    //        {name: 'listDistributors', access: true},
    //        {name: 'listCustomers', access: false},
    //        {name: 'listUsers', access: false},
    //        {name: 'listRegularOrders', access: true},
    //        {name: 'listTrackingOrders', access: true},
    //        {name: 'listFarmOrders', access: true},
    //        {name: 'listRegularOrderReports', access: true},
    //        {name: 'listTrackingOrderReports', access: true},
    //        {name: 'listFarmOrderReports', access: true},
    //        {name: 'listOrderNotificationRules', access: false},
    //        {name: 'notificationEmailSignature', access: false},
    //        {name: 'listReportTemplates', access: true}
    //    ]
    //}, {
    //    user: {
    //        username: 'hernan@farm',
    //        password: 'password'
    //    },
    //    features: {
    //        admin: false,
    //        canCreateCustomers: false,
    //        canCreateGuides: false,
    //        canCreateProducts: false,
    //        canCreateSkus: false,
    //        canGenerateOrderReports: false,
    //        canSetGuideItemResellFormulaAndPrice: false,
    //        canSetGuideItemSellFormulaAndPrice: false,
    //        canSetSkuBasePrice: false,
    //        farmHub: false,
    //        managedFarms: []
    //    },
    //    endpoints: [
    //        {name: 'listCategories', access: false},
    //        {name: 'listProducts', access: true},
    //        {name: 'listSKUs', access: false},
    //        {name: 'listRegularOrderGuides', access: true},
    //        {name: 'listTrackingOrderGuides', access: true},
    //        {name: 'listFarmOrderGuides', access: true},
    //        {name: 'listFarms', access: true},
    //        {name: 'listDistributors', access: true},
    //        {name: 'listCustomers', access: true},
    //        {name: 'listUsers', access: false},
    //        {name: 'listRegularOrders', access: true},
    //        {name: 'listTrackingOrders', access: true},
    //        {name: 'listFarmOrders', access: true},
    //        {name: 'listRegularOrderReports', access: false},
    //        {name: 'listTrackingOrderReports', access: false},
    //        {name: 'listFarmOrderReports', access: false},
    //        {name: 'listOrderNotificationRules', access: false},
    //        {name: 'notificationEmailSignature', access: false},
    //        {name: 'listReportTemplates', access: false}
    //    ]
    //}, {
    {
        user: {
            username: 'hernan@farm',
            password: 'password'
        },
        features: {
            admin: false,
            canCreateCustomers: true,
            canCreateGuides: true,
            canCreateProducts: true,
            canCreateSkus: true,
            canGenerateOrderReports: true,
            canSetGuideItemResellFormulaAndPrice: true,
            canSetGuideItemSellFormulaAndPrice: true,
            canSetSkuBasePrice: true,
            farmHub: true,
            managedFarms: []
        },
        endpoints: [
            {name: 'listCategories', access: false},
            {name: 'listProducts', access: true},
            {name: 'listSKUs', access: true},
            {name: 'listRegularOrderGuides', access: true},
            {name: 'listTrackingOrderGuides', access: true},
            {name: 'listFarmOrderGuides', access: true},
            {name: 'listFarms', access: true},
            {name: 'listDistributors', access: true},
            {name: 'listCustomers', access: true},
            {name: 'listUsers', access: false},
            {name: 'listRegularOrders', access: true},
            {name: 'listTrackingOrders', access: true},
            {name: 'listFarmOrders', access: true},
            {name: 'listRegularOrderReports', access: true},
            {name: 'listTrackingOrderReports', access: true},
            {name: 'listFarmOrderReports', access: true},
            {name: 'listOrderNotificationRules', access: false},
            {name: 'notificationEmailSignature', access: false},
            {name: 'listReportTemplates', access: true}
        ]
    }, {
        user: {
            username: 'hernan@farm',
            password: 'password'
        },
        features: {
            admin: true,
            canCreateCustomers: false,
            canCreateGuides: false,
            canCreateProducts: false,
            canCreateSkus: false,
            canGenerateOrderReports: false,
            canSetGuideItemResellFormulaAndPrice: false,
            canSetGuideItemSellFormulaAndPrice: false,
            canSetSkuBasePrice: false,
            farmHub: false,
            managedFarms: []
        },
        endpoints: [
            {name: 'listCategories', access: false},
            {name: 'listProducts', access: true},
            {name: 'listSKUs', access: false},
            {name: 'listRegularOrderGuides', access: true},
            {name: 'listTrackingOrderGuides', access: true},
            {name: 'listFarmOrderGuides', access: true},
            {name: 'listFarms', access: true},
            {name: 'listDistributors', access: true},
            {name: 'listCustomers', access: true},
            {name: 'listUsers', access: false},
            {name: 'listRegularOrders', access: true},
            {name: 'listTrackingOrders', access: true},
            {name: 'listFarmOrders', access: true},
            {name: 'listRegularOrderReports', access: false},
            {name: 'listTrackingOrderReports', access: false},
            {name: 'listFarmOrderReports', access: false},
            {name: 'listOrderNotificationRules', access: false},
            {name: 'notificationEmailSignature', access: false},
            {name: 'listReportTemplates', access: false}
        ]
    }
];

function setupRequest(req, sec_token) {
    req.set('Content-Type', 'application/json').set('Accept', 'application/json');

    if(sec_token) {
        req.set('Authorization', sec_token);
    }

    return req;
}

// UNIT test begin

describe("FarmLogix REST tests", function(){

    var accessToken, adminAccessToken;

    it("Should perform admin success login", function(done){
        // calling login api
        setupRequest(server.post("/api/login"))
            .send(adminUser)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // Should get access token.
                res.body.token_type.should.equal('Bearer');
                res.body.access_token.should.not.be.empty();

                adminAccessToken = res.body.token_type + ' ' + res.body.access_token;

                done();
            });
    });

    testCases.forEach(function(testCase) {

        if(testCase.features) {
            var userId;
            var jsonUser;

            // There are a new set of features to be set

            it('Perform user lookup', function(done) {
                setupRequest(server.get('/api/users?max=10&offset=0&sortBy=createdBy.name&sortDir=desc'), adminAccessToken)
                    .query({name: testCase.user.username})
                    .expect(200)
                    .end(function(err, res) {
                        userId = res.body[0].id;
                        done();
                    });
            });

            it('Load user ' + testCase.user.username, function(done) {
                setupRequest(server.get('/api/users/' + userId), adminAccessToken)
                    .expect(200)
                    .end(function(err, res) {
                        jsonUser = res.body;
                        done();
                    });
            });

            it('Update features for user ' + testCase.user.username, function(done) {
                if(!jsonUser.features) {
                    jsonUser.features = {};
                }
                _.assign(jsonUser.features, testCase.features);
                setupRequest(server.put('/api/users/' + userId), adminAccessToken)
                    .send(jsonUser)
                    .expect(200)
                    .end(done);
            });
        }

        // Should perform success login

        it("Should perform success login for " + testCase.user.username, function(done){
            // calling login api
            setupRequest(server.post("/api/login"))
                .send(testCase.user)
                .end(function(err,res){
                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // Should get access token.
                    res.body.token_type.should.equal('Bearer');
                    res.body.access_token.should.not.be.empty();

                    accessToken = res.body.token_type + ' ' + res.body.access_token;

                    done();
                });
        });

        testCase.endpoints.forEach(function(endpoint) {
            var endpointUrl = urlMappings[endpoint.name];

            it('[' + testCase.user.username + '] Accessing list endpoint ' + endpointUrl, function(done) {
                setupRequest(server.get(endpointUrl), accessToken)
                    .expect("Content-type",/json/)
                    .end(function(err,res) {
                        res.status.should.equal(endpoint.access ? 200 : 403);
                        done();
                    });
            });
        });

        it('[' + testCase.user.username + '] Should perform logout', function(done) {
            setupRequest(server.post('/api/logout'), accessToken)
                .expect(200)
                .end(done);
        });
    });

    it('Should perform admin logout', function(done) {
        setupRequest(server.post('/api/logout'), adminAccessToken)
            .expect(200)
            .end(done);
    });
});