
const config=({
  testDir:'./tests',
  workers:2,
  TIMEOUT:40*1000, //wait time to print error message
  expect:
    {
      timeout:40*1000//report failure after 40 sec
    },
  reporter:'html',// report generated after running testcase
    use:{
      browserName:'chromium',
      headless:false,
      screenshot:'on',
      trace:'on',
      video:'on' //To open browser every time running testcase
    }
})
module.exports=config