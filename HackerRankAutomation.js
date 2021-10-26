//node HackerRankAutomation.js --url=https://www.hackerrank.com/ --config=config.json

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
    
    await page.waitForSelector("a[data-attr1='Last']");
    let numpages=await page.$eval("a[data-attr1='Last']",function(atag)
    {
        let np=parseInt(atag.getAttribute('data-page'));
        return np;
    });
    console.log(numpages);


//move through all pages
for(i=0;i<numpages;i++)
{
    await handlePage(browser,page);
    
}

async function handlePage(browser,page)
{

    await page.waitForSelector("a.backbone.block-center");
    let curls=await page.$$eval("a.backbone.block-center",function(atags){
        let urls=[];
        for(let i=0;i<atags.length;i++)
        {
            let url=atags[i].getAttribute("href");
            urls.push(url);
        }
        return urls;
    });

    //now in curls all urls r present,now handle 1 contest through 1 url
   for(let i=0;i<curls.length;i++)
   {
       await handlecontest(browser,page,curls[i]);
   }

    //move to next page
    await page.waitFor(1500);
    await page.waitForSelector("a[data-attr1='Right']");
    await page.click("a[data-attr1='Right']");
}


async function handlecontest(browser,page,curl)
{
    //now open new tab on new tab
    let npage=await browser.newPage();

    await npage.goto(args.url+curl);
    await npage.waitFor(2000);
    //click on moderator
    await npage.waitForSelector("li[data-tab='moderators']");
    await npage.click("li[data-tab='moderators']");
//write moderator name
    await npage.waitForSelector("input#moderator");
    await npage.type("input#moderator",configJSO.moderator,{delay:50});
    //press enter
     await npage.keyboard.press('Enter');
     await npage.waitFor(1000);
    await npage.close();
    await page.waitFor(2000);
}


  
}
run();




