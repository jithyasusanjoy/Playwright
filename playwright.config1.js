import {devices} from '@playwright/test'
const config=({
  testDir:'./tests',
  workers:2,
  retries:1,
  TIMEOUT:40*1000, //wait time to print error message
  expect:
    {
      timeout:40*1000//report failure after 40 sec
    },
  reporter:'html',// report generated after running testcase
  projects:[
    {
      name:'safari',

      use:{
        browserName:'webkit',
        headless:true,
        screenshot:'on',
        trace:'on',
        video:'retain-on-failure' //To open browser every time running testcase
    }
  },
  {
  name:'chrome',

      use:{
        browserName:'chromium',
        headless:false,
        screenshot:'off',
        trace:'on',
        video:'on' ,
        //viewport:{width:720,height:720}
      //...devices["iPhone 11"],
      ignoreHttpsErrors:true,//ignore SSH errors
      Permissions:['geolocation']
    }
    }
]
})
module.exports=config