//node HackerRankAutomation.js --url=https://www.hackerrank.com/ --config=config.json

//npm init -y
//npm install minimist
//

let puppeteer=require("puppeteer");
let fs=require("fs");
let minimist=require("minimist");
let args=minimist(process.argv);
console.log(args.url);
console.log(args.config);
let configJson=fs.readFileSync(args.config,"utf-8");
let configJSO=JSON.parse(configJson);

//make async fuction to launch browser
async function run(){

    let browser= await puppeteer.launch({
        defaultViewport:null,
        args:[
            '--start-maximized'
        ],
         headless:false
    });

    //now get pages
    let pages=await browser.pages();
    let page=pages[0];
    await page.goto(args.url);

    //write wait for selector before every click coz to load the pagge

    //click for login1
    await page.waitForSelector('a[data-event-action="Login"]');
   await page.click('a[data-event-action="Login"]');

   //click for login2
   await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
   await page.click("a[href='https://www.hackerrank.com/login']");

   //click and type username,pass click login
   await page.waitForSelector("input[name='username']");
   await page.type("input[name='username']",configJSO.user_id),{delay:30};
    await page.type("input[name='password']",configJSO.password),{delay:30};
    //login3 after entering data
    
    await page.waitForSelector('button[data-analytics="LoginPassword"]');
    await page.click("button[data-analytics='LoginPassword']");

    //click compete

    await page.waitForSelector('a[data-analytics="NavBarContests"]');
    await page.click("a[data-analytics='NavBarContests']");

    //click manage contests
    //await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");
    console.log("till administration");

    //find pages
    //await page.waitForSelector("a[data-attr1='last']");
    // let numpages=await page.$eval("a[data-attr1='last']",function(atag)
    // {
    //     let np=parseInt(atag.getAttribute('data-page'));
    //     return np;
    // });
    // console.log(numpages);

//     //click on contest
//     await page.waitForSelector("p.mmT");
//     await page.click("p.mmT");
//     //wait 3 sec to load n pop up go
//    await page.waitFor(3000);
// //click on moderators
//    await page.waitForSelector("li[data-tab='moderators']");
//    await page.click("li[data-tab='moderators']");
//    //write moderator
//    await page.waitForSelector("input#moderator");
//    await page.type("input#moderator",configJSO.moderator,{delay:50});
// //press enter after adding moderator
//    await page.keyboard.press('Enter');
   

//find number of pages total
// await page.waitForSelector("a[data-attr1='last']");
// let nump=await page.$eval("a[data-attr1='last']",function(lastTag)
// {
//     let np=parseInt(getAttribute("data-page"));
//     return np;
// });
// console.log(numpages);
 








   //function to add moderator
//    async function saveModerator(tab,href,moderator)
// {
    
// }
}
run();


