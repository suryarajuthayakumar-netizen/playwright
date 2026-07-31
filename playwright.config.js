const config=({
  testDir:"./tests",
  timeout:40*1000,
  expect:{
    timeout:40*1000,},
  reporter:'html',
  use:{browserName:'chromium',
  headless:false,
  //acceptDownloads:true,
  /*launchOption: {
    slowMo:5000,
  }*/
  },
})
module.exports=config