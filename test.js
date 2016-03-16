var supertest = require("supertest");
var should = require("should");
var _ = require("lodash");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8081/farmlogix");

var adminUser = {
    username: 'elimaeda',
    password: 'gascon655'
};

var testCases = [
    {
        user: {
            username: 'elimaeda',
            password: 'gascon655'
        },
        endpoints: [
            {
                url: '/api/admin/categories',
                access: true
            }, {
                url: '/api/products?max=10&offset=0&sortBy=dateCreated&sortDir=asc',
                access: true
            }, {
                url: '/api/skus?max=10&offset=0&sortBy=product.name&sortDir=asc',
                access: true
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=REGULAR',
                access: true
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=TRACKING',
                access: true
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=FARM',
                access: true
            }, {
                url: '/api/farms?max=10&offset=0&sortBy=createdBy.name&sortDir=desc',
                access: true
            }, {
                url: '/api/distributors?max=10&offset=0&sortBy=distributor.code&sortDir=asc',
                access: true
            }, {
                url: '/api/customers?max=10&offset=0&sortBy=name&sortDir=asc',
                access: true
            }, {
                url: '/api/users?max=10&offset=0&sortBy=createdBy.name&sortDir=desc',
                access: true
            }, {
                url: '/api/orders?max=10&offset=0&sortBy=order.orderId&sortDir=desc&type=REGULAR',
                access: true
            }, {
                url: '/api/orders?max=10&offset=0&sortBy=order.orderId&sortDir=desc&type=TRACKING',
                access: true
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=REGULAR',
                access: true
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=TRACKING',
                access: true
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=FARM',
                access: true
            }, {
                url: '/api/orderNotificationRules?max=10&offset=0&sortBy=name',
                access: true
            }, {
                url: '/api/configItems/notification%3Aemail%3Asignature',
                access: true
            }, {
                url: '/api/reportTemplates?max=10&offset=0&sortBy=name&sortDir=asc',
                access: true
            }
        ]
    }, {
        user: {
            username: 'hernan@cust',
            password: 'password'
        },
        features: {
            admin: false,
            canCreateGuides: false,
            canGenerateOrderReports: false,
            canLockGuideItemPrices: false,
            canManageCustomers: false,
            canPlaceTrackingOrders: false,
            canSetGuideItemSellFormulaAndPrice: false,
            canSetGuideResellFormula: false,
            canSetGuideSellFormula: false,
            canSetOrderItemSellPrice: false
        },
        endpoints: [
            {
                url: '/api/admin/categories',
                access: false
            }, {
                url: '/api/products?max=10&offset=0&sortBy=dateCreated&sortDir=asc',
                access: false
            }, {
                url: '/api/skus?max=10&offset=0&sortBy=product.name&sortDir=asc',
                access: false
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=REGULAR',
                access: false
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=TRACKING',
                access: false
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=FARM',
                access: false
            }, {
                url: '/api/farms?max=10&offset=0&sortBy=createdBy.name&sortDir=desc',
                access: false
            }, {
                url: '/api/distributors?max=10&offset=0&sortBy=distributor.code&sortDir=asc',
                access: true
            }, {
                url: '/api/customers?max=10&offset=0&sortBy=name&sortDir=asc',
                access: true
            }, {
                url: '/api/users?max=10&offset=0&sortBy=createdBy.name&sortDir=desc',
                access: false
            }, {
                url: '/api/orders?max=10&offset=0&sortBy=order.orderId&sortDir=desc&type=REGULAR',
                access: true
            }, {
                url: '/api/orders?max=10&offset=0&sortBy=order.orderId&sortDir=desc&type=TRACKING',
                access: true
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=REGULAR',
                access: false
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=TRACKING',
                access: false
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=FARM',
                access: false
            }, {
                url: '/api/orderNotificationRules?max=10&offset=0&sortBy=name',
                access: false
            }, {
                url: '/api/configItems/notification%3Aemail%3Asignature',
                access: false
            }, {
                url: '/api/reportTemplates?max=10&offset=0&sortBy=name&sortDir=asc',
                access: false
            }
        ]
    }, {
        user: {
            username: 'hernan@dist',
            password: 'password'
        },
        endpoints: [
            {
                url: '/api/admin/categories',
                access: false
            }, {
                url: '/api/products?max=10&offset=0&sortBy=dateCreated&sortDir=asc',
                access: true
            }, {
                url: '/api/skus?max=10&offset=0&sortBy=product.name&sortDir=asc',
                access: true
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=REGULAR',
                access: false
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=TRACKING',
                access: false
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=FARM',
                access: false
            }, {
                url: '/api/farms?max=10&offset=0&sortBy=createdBy.name&sortDir=desc',
                access: true
            }, {
                url: '/api/distributors?max=10&offset=0&sortBy=distributor.code&sortDir=asc',
                access: true
            }, {
                url: '/api/customers?max=10&offset=0&sortBy=name&sortDir=asc',
                access: false
            }, {
                url: '/api/users?max=10&offset=0&sortBy=createdBy.name&sortDir=desc',
                access: false
            }, {
                url: '/api/orders?max=10&offset=0&sortBy=order.orderId&sortDir=desc&type=REGULAR',
                access: true
            }, {
                url: '/api/orders?max=10&offset=0&sortBy=order.orderId&sortDir=desc&type=TRACKING',
                access: true
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=REGULAR',
                access: true
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=TRACKING',
                access: true
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=FARM',
                access: true
            }, {
                url: '/api/orderNotificationRules?max=10&offset=0&sortBy=name',
                access: false
            }, {
                url: '/api/configItems/notification%3Aemail%3Asignature',
                access: false
            }, {
                url: '/api/reportTemplates?max=10&offset=0&sortBy=name&sortDir=asc',
                access: true
            }
        ]
    }, {
        user: {
            username: 'hernan@farm',
            password: 'password'
        },
        features: {
            admin: false,
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
            {
                url: '/api/admin/categories',
                access: false
            }, {
                url: '/api/products?max=10&offset=0&sortBy=dateCreated&sortDir=asc',
                access: true
            }, {
                url: '/api/skus?max=10&offset=0&sortBy=product.name&sortDir=asc',
                access: false
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=REGULAR',
                access: true
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=TRACKING',
                access: true
            }, {
                url: '/api/orderGuides?max=10&offset=0&sortBy=name&sortDir=asc&type=FARM',
                access: true
            }, {
                url: '/api/farms?max=10&offset=0&sortBy=createdBy.name&sortDir=desc',
                access: true
            }, {
                url: '/api/distributors?max=10&offset=0&sortBy=distributor.code&sortDir=asc',
                access: true
            }, {
                url: '/api/customers?max=10&offset=0&sortBy=name&sortDir=asc',
                access: true
            }, {
                url: '/api/users?max=10&offset=0&sortBy=createdBy.name&sortDir=desc',
                access: false
            }, {
                url: '/api/orders?max=10&offset=0&sortBy=order.orderId&sortDir=desc&type=REGULAR',
                access: true
            }, {
                url: '/api/orders?max=10&offset=0&sortBy=order.orderId&sortDir=desc&type=TRACKING',
                access: true
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=REGULAR',
                access: false
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=TRACKING',
                access: false
            }, {
                url: '/api/orderReports?max=10&monthSelectionMode=true&offset=0&sortBy=order.orderId&sortDir=desc&type=FARM',
                access: false
            }, {
                url: '/api/orderNotificationRules?max=10&offset=0&sortBy=name',
                access: false
            }, {
                url: '/api/configItems/notification%3Aemail%3Asignature',
                access: false
            }, {
                url: '/api/reportTemplates?max=10&offset=0&sortBy=name&sortDir=asc',
                access: false
            }
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
            it('[' + testCase.user.username + '] Accessing list endpoint ' + endpoint.url, function(done) {
                setupRequest(server.get(endpoint.url), accessToken)
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