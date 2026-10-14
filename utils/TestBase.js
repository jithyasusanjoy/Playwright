const base = require('@playwright/test')
exports.customTest = base.test.extend({ // custom test is the sub class of test
testDataForOrder:{ // fixture
     username:"standard_user",
     password:"secret_sauce",
     productname:"Sauce Labs Backpack"
}
})
