const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { promisify } = require('util');
const { nextTick } = require('process');
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const url = require('url');
const { Console } = require('console');
const { globalAgent } = require('http');
const R = require('ramda');
global.task_type=1;
global.tweet_text="";
var mission_id=1;
global.mission_val=1;
global.max_questions=0;
global.tweet_text="";
global.max_questions=1;
global.Answer="";
global.Correct_text="";
global.Wrong_text="";
global.workerID="";
global.activitystatus="";
global.ans_y="";
global.ans_n="";
global.Mrinal="";
global.sbmtval="Go To Next";
global.sbmtval_efct='false';
global.sbmtlnk="fwd";
global.mission_state="";
global.kk=0;
global.mm=0;
global.k_ans="";
var foot_note="";



 
// make sure messages folder exists


 app = express();

 var publicDir = require('path').join(__dirname,'/');
 app.use(express.static(publicDir)); 
 app.get('/', function(req, res,next) {

    var reqQueryObject = req.query 
    console.log(req.url);
    workerID = req.query.workerId;

    //fs.readFile('practice.JPG', function (err, content) {
       
            //specify the content type in the response will be an image
            //res.writeHead(200,{'Content-type':'image/jpg'});
    
            

    res.write(`
    <!DOCTYPE html>
     <html lang="en">
        <head>
           <title>Tweet</title>
		   
        </head>
    <body>
    <h4>Preview</h4> 
    <a href="/tweetstart/?workerId=`+workerID+`">
    <img alt="Practice" src='practice.JPG' style="width:250px;height:300px;" />
    <img alt="Main" src='main.JPG' style="width:250px;height:300px;" />
    </a>
    <h4>Click on any image to go to Introduction</h4>                                                       
                                                    
    </body>
</html>
`);

//   });
});

   // app.use( function(req, res, next)  {
    app.get('/tweetstart', function(req, res) {



    var reqQueryObject = req.query;
    console.log(req.url);
    workerID = req.query.workerId; // returns "12354411"
    task=parseInt(req.query.task_type);
    
  //2.
  const pg = require('pg');
  const pool = new pg.Pool({
    user: 'dbodoff@persuasion',
  host: 'persuasion.postgres.database.azure.com',
  database: 'postgres',
  password: 'Bozo@2020',
  port: 5432,
})


sql_chk_worker = `select count(*) from (select * from users where worker_id='${workerID}') t;`;
pool.on('error',function(err,client){});    
pool.query(sql_chk_worker,(error, results) => {

    if (Number(results.rows[0].count > 0)) {

        res.write(`
    <!DOCTYPE html>
     <html lang="en">
        <head>
           <title>Tweet</title>
		   
        </head>
    <body>
     
    <h4>You already have been here, you are allowed this task only once</h4>                                                       
                                                    
    </body>
</html>
`);
res.end();


    } else {

    




sql_upd_worker = `insert into users (worker_id,status) values ('${workerID}','STARTED');`;
pool.on('error',function(err,client){});        
pool.query(sql_upd_worker,(error, results) => {
    //console.log(error, res);
//pool.end();
});
console.log(sql_upd_worker);
        sql_find_type =  `select * from blocks where (COALESCE(gen,0) + COALESCE(emot,0) +COALESCE(cog,0) + COALESCE(norm,0)) < 8 ORDER BY block ASC LIMIT 1;`;
        console.log(sql_find_type);

  pool.on('error',function(err,client){
      //console.log(err);
  });
  pool.query(sql_find_type,(error, results) => {
     console.log("results.rows[0].gen "+results.rows[0].gen);
     console.log("results.rows[0].emot "+results.rows[0].emot);
     console.log("results.rows[0].cog "+results.rows[0].cog);
     console.log("results.rows[0].norm "+results.rows[0].norm);
     
     var kk1=2;
     var new_val=0;
     if( Number(results.rows[0].gen) >= Number(kk1) ) {

        if( Number(results.rows[0].emot) >= Number(kk1) ) {
         
            if( Number(results.rows[0].cog) >= Number(kk1) ) {

                sql_upd_usr =  `update users SET (block,task_type)=(${results.rows[0].block},4) where worker_id='${workerID}';`;
                //sql_upd_usr =  `update users SET (block,task_type)=(${results.rows[0].block},4) where worker_id='${workerID}';`;
                console.log(sql_upd_usr);
                pool.on('error',function(err,client){});
                pool.query(sql_upd_usr,(error, results) => {
                    //console.log(error, res);
                    //pool.end();
                });
                dd = results.rows[0].norm + 1;
                block=results.rows[0].block;
                sql_qury = `update blocks SET norm=${dd} where block=${results.rows[0].block};`;
                pool.on('error',function(err,client){});
                pool.query(sql_qury,(error, results) => {
                    //console.log(error, res);
                   // pool.end();
                
                    res.redirect('/home/?workerId='+workerID+'&task_type=4&block='+block);
                });
                console.log(sql_qury);
                
    
            }else {
                sql_upd_usr =  `update users SET (block,task_type)=(${results.rows[0].block},3) where worker_id='${workerID}';`;
                console.log(sql_upd_usr);
                pool.on('error',function(err,client){});
                 pool.query(sql_upd_usr,(error, results) => {
                    //console.log(error, res);
                    //pool.end();
                 });
                dd = results.rows[0].cog + 1;
                block=results.rows[0].block;
                sql_qury = `update blocks SET cog=${dd} where block=${results.rows[0].block};`;
                pool.on('error',function(err,client){});
                pool.query(sql_qury,(error, results) => {
                    //console.log(error, res);
                    //pool.end();
                    
                    res.redirect('/home/?workerId='+workerID+'&task_type=3&block='+block);
                });
                console.log(sql_qury);
                
                }
    
        } else {
            sql_upd_usr =  `update users SET (block,task_type)=(${results.rows[0].block},2) where worker_id='${workerID}';`;
            console.log(sql_upd_usr);
            pool.on('error',function(err,client){}); 
            pool.query(sql_upd_usr,(error, results) => {
                //console.log(error, res);
                //pool.end();
            });
              dd = results.rows[0].emot + 1;
              block=results.rows[0].block;
                sql_qury = `update blocks SET emot=${dd} where block=${results.rows[0].block};`;
                pool.on('error',function(err,client){});
                pool.query(sql_qury,(error, results) => {
                    //console.log(error, res);
                    //pool.end();
                    
                    res.redirect('/home/?workerId='+workerID+'&task_type=2&block='+block);
                });
                console.log(sql_qury);
                
            }


   } else {
        sql_upd_usr =  `update users SET (block,task_type)=(${results.rows[0].block},1) where worker_id='${workerID}';`;
        console.log(sql_upd_usr);
        pool.on('error',function(err,client){});
         pool.query(sql_upd_usr,(error, results) => {
            //console.log(error, res);
            //pool.end();
         });
         dd = results.rows[0].gen + 1;
         block=results.rows[0].block;
         sql_qury = `update blocks SET gen=${dd} where block=${results.rows[0].block};`;
         pool.on('error',function(err,client){});
         pool.query(sql_qury,(error, results) => {
            //console.log(error, res);
            //pool.end();
           
            res.redirect('/home/?workerId='+workerID+'&task_type=1&block='+block);
         });
         console.log(sql_qury);
         
        }
     
     
    
    });  
    //pool.end();
    
    //res.redirect('/home/?workerId='+workerID+'&task_type='+task_type);
}
});
});



    app.get('/home', function(req, res) {

    var reqQueryObject = req.query 
    console.log(req.url);
    workerID = req.query.workerId;
    def=req.query.def;
    exmp=req.query.exmp;
    var clkstatus="";
    val_def="";
    val_task="";
    vtask=req.query.vtask;
    val_example="";
    val_trig="";
    trig=req.query.trig;
    val_cons="";
    cons=req.query.cons;
    val_ask="";
    ask=req.query.ask;
    val_report="";
    report=req.query.report;
    task=parseInt(req.query.task_type);
    block=parseInt(req.query.block);
    mm = req.query.task_type;

  if ((def === "true") && (vtask === "true") && (exmp === "true") && (trig === "true") && (ask === "true") && (cons === "true") && (report === "true")) 
  {
     link_to_main="href='/practice/?task_type="+mm+"&workerId="+workerID+"&missionVal=0&missionId=1&block="+block+"'";
      console.log("link to main task from instruction "+link_to_main);
     btn_message="Continue to Practice";
  } else 
   {
    link_to_main='';
    btn_message="Read All Intstructions to Continue to Practice";
   }

    if( Number(mm) == 2 ) {
        if(def=="true"){
            clkstatus +='&def=true';
        val_def="Persuasion is an attempt to influence someone's beliefs, attitudes, and intentions. Emotional persuasion is Persuasion through the attempt to arouse emotions, for example, Fear, anxiety, shame, guilt, surprise, joy, anger, happiness. Emotional persuasion can also appeal to expected emotions - for example, conveying that if you believe something or perform some action you're intending, you will feel sad\lonely\happy, regret, etc. "
        }
        if(vtask=="true"){
            clkstatus +='&vtask=true';
        val_task="Persuasion is an attempt to influence someone's beliefs, attitudes, and intentions.";
        }
        if(exmp=="true"){
            clkstatus +='&exmp=true';
        val_example="Disgusting. Content creators paying the price of youtube's failures and bad parenting. This cannot stand. The way he speaks about suing creators makes my skin crawl. This is something that affects everyone. The freedom of internet creativity itself is being threatened imo. eugh. https://t.co/7M0fEIX7w8";
        }
        if(trig=="true"){
            clkstatus +='&trig=true';
        val_trig="Some text may contain triggered subjects, bad words, etc. ";
        }
        if(cons=="true"){
            clkstatus +='&cons=true';
        val_cons="There can be various ways in which beliefs, attitudes or intentions can be influenced, e.g. they might be changed, enhanced, reinforced (i.e. same attitude but more certain), strengthened, diminished, etc. Persuasion is not just telling someone something he didnâ€™t know before. It's only an attempt to persuade if it's intended to affect his beliefs, attitudes or intentions. ";
        }
        if(ask=="true"){
            clkstatus +='&ask=true';
        val_ask="1. Do you think this text may persuade someone? Affect someone's beliefs? attitudes? intentions? 2. Beliefs\ attitudes\ intentions toward what? If you can't answer those two questions then the answer is NO. ";
        }
        if(report=="true"){
            clkstatus +='&report=true';
        val_report="If the tweet text that appears on the screen is in line with the definition we've given, click on the 'Yes' button, if it doesn't click on the 'No' button. ";
        }
    }
    if( Number(mm) == 1 ) {
        if(vtask=="true"){
            clkstatus +='&vtask=true';
        val_task="In this HIT you will be presented with 30 tweets in a variety of subjects. Your job is to look through them and mark any ones that you think contains a persuasion attempt. Your job is to look through a series of tweets and mark any ones that are related to persuasion. You will be paid a flat fee of 4$ for your work";
        }
        if(exmp=="true"){
            clkstatus +='&exmp=true';
        val_example="The idea that Medicare For All is impossible is being promoted by corporate special interests but imagine being an ordinary person and buying this. Believing you live in a country that can send people to the moon but not to the doctor";
        }
        if(trig=="true"){
            clkstatus +='&trig=true';
        val_trig="Some text may contain triggered subjects, bad words, etc.";
        }
        if(cons=="true"){
            clkstatus +='&cons=true';
        val_cons="There can be various ways in which beliefs, attitudes or intentions can be influenced, e.g. they might be changed, enhanced, reinforced (i.e. same attitude but more certain), strengthened, diminished, etc. Persuasion is not just telling someone something he didn't know before. It's only an attempt to persuade if it's intended to affect his beliefs, attitudes or intentions.";
        }
        if(ask=="true"){
            clkstatus +='&ask=true';
        val_ask="1. Do you think this text may persuade someone? Affect someone's beliefs? attitudes? intentions? 2. Beliefs\ attitudes\ intentions toward what? If you can't answer those two questions then the answer is NO.";
        }
        if(report=="true"){
            clkstatus +='&report=true';
        val_report="If the tweet text that appears on the screen is in line with the definition we've given, click on the 'Yes' button, if it doesn't click on the 'No' button.";
        }
        if(def=="true"){
            clkstatus +='&def=true';
        val_def="Persuasion is an attempt to influence someone's beliefs, attitudes, and intentions."
        }
    }
    if( Number(mm) == 3 ) {
        if(vtask=="true"){
            clkstatus +='&vtask=true';
        val_task="In this HIT you will be presented with 30 tweets in a variety of subjects. Your job is to look through them and mark any ones that you think contains a persuasion attempt. Your job is to look through a series of tweets and mark any ones that are related to persuasion. You will be paid a flat fee of 4$ for your work ";
        }
        if(exmp=="true"){
            clkstatus +='&exmp=true';
        val_example="I think a lot about Mitski's supposed cause for global warming... about how it's a result of the planet's people wanting too much.</BR> Such a forgiving and yet still culpable narrative, I think as I drive my fuel inefficient vehicle. In this essay I will...";
        }
        if(trig=="true"){
            clkstatus +='&trig=true';
        val_trig="Some text may contain triggered subjects, bad words, etc. ";
        }
        if(cons=="true"){
            clkstatus +='&cons=true';
        val_cons="There can be various ways in which beliefs, attitudes or intentions can be influenced, e.g. they might be changed, enhanced, reinforced (i.e. same attitude but more certain), strengthened, diminished, etc. Persuasion is not just telling someone something he didn't know before. It's only an attempt to persuade if it's intended to affect his beliefs, attitudes or intentions. ";
        }
        if(ask=="true"){
            clkstatus +='&ask=true';
        val_ask="1. Do you think this text may persuade someone? Affect someone's beliefs? attitudes? intentions? 2. Beliefs\ attitudes\ intentions toward what? If you can't answer those two questions then the answer is NO. ";
        }
        if(report=="true"){
            clkstatus +='&report=true';
        val_report="If the tweet text that appears on the screen is in line with the definition we've given, click on the 'Yes' button, if it doesn't click on the 'No' button. ";
        }
        if(def=="true"){
            clkstatus +='&def=true';
        val_def="Persuasion is an attempt to influence someone's beliefs,</BR> attitudes, and intentions. Cognitive persuasion is persuasion by implying a thought by facts, logic, and argument. "
        }
    }
    if( Number(mm) == 4 ) {
        if(vtask=="true"){
            clkstatus +='&vtask=true';
        val_task="In this HIT you will be presented with 30 tweets in a variety of subjects. Your job is to look through them and mark any ones that you think contains a persuasion attempt. Your job is to look through a series of tweets and mark any ones that are related to persuasion. You will be paid a flat fee of 4$ for your work ";
        }
        if(exmp=="true"){
            clkstatus +='&exmp=true';
        val_example="why do you always base success on how well a group does in the US? For a Chinese group that has never even set foot in the US, never mind promoted there, why do you think you're making points? https://t.co/NEyjOZeWr3 ";
        }
        if(trig=="true"){
            clkstatus +='&trig=true';
        val_trig="Some text may contain triggered subjects, bad words, etc. ";
        }
        if(cons=="true"){
            clkstatus +='&cons=true';
        val_cons="There can be various ways in which beliefs, attitudes or intentions can be influenced, e.g. they might be changed, enhanced, reinforced (i.e. same attitude but more certain), strengthened, diminished, etc. Persuasion is not just telling someone something he didn't know before. It's only an attempt to persuade if it's intended to affect his beliefs, attitudes or intentions. ";
        }
        if(ask=="true"){
            clkstatus +='&ask=true';
        val_ask="1. Do you think this text may persuade someone? Affect someoneâ€™s beliefs? attitudes? intentions? 2. Beliefs\ attitudes\ intentions toward what? If you can't answer those two questions then the answer is NO. ";
        }
        if(report=="true"){
            clkstatus +='&report=true';
        val_report="If the tweet text that appears on the screen is in line with the definition we've given, click on the 'Yes' button, if it doesn't click on the 'No' button. ";
        }
        if(def=="true"){
            clkstatus +='&def=true';
        val_def="Persuasion is an attempt to influence someone's beliefs, attitudes, and intentions. Normative persuasion includes a quantitative comparison to a reference group (e.g. men, women, citizens, part of a local community, age groups, our colleagues etc.) for the purpose of implying what is normal or normative "
        }
         
    }

    
    
     res.write(`
     
     <!DOCTYPE html>
     <html lang="en">
        <head>
           <title>Tweet</title>
        </head>
    <body class="prewarmup">
        <script type="text/javascript">
            var htmlClassList = document.documentElement.classList;
            
            var bodyCacheable = true;
            wixBiSession.setCaching(bodyCacheable);
            
            var clientSideRender = false;
        </script>
        <!--body start html embeds start-->
        <!--body start html embeds end-->
        <script id="wix-first-paint">
            if (window.ResizeObserver &&
            (!window.PerformanceObserver || !PerformanceObserver.supportedEntryTypes || PerformanceObserver.supportedEntryTypes.indexOf('paint') === -1)) {
            new ResizeObserver(function (entries, observer) {
            entries.some(function (entry) {
            var contentRect = entry.contentRect;
            if (contentRect.width > 0 && contentRect.height > 0) {
            requestAnimationFrame(function (now) {
            window.wixFirstPaint = now;
            dispatchEvent(new CustomEvent('wixFirstPaint'));
            });
            observer.disconnect();
            return true;
            }
            });
            }).observe(document.body);
            }
        </script>
        <div id="SITE_CONTAINER">
            <style type="text/css" data-styleid="uploadedFonts"></style>
            <div>
                <style type="text/css" data-styleid="theme_fonts">.font_0 {font: normal normal normal 30px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#FFB703;}
                    .font_1 {font: normal normal normal 14px/1.43em 'Open Sans',sans-serif ;color:#12110F;}
                    .font_2 {font: normal normal normal 48px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;}
                    .font_3 {font: normal normal normal 48px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;}
                    .font_4 {font: normal normal normal 72px/1.111em impact,impact-w01-2010,impact-w02-2010,impact-w10-2010,sans-serif ;color:#12110F;}
                    .font_5 {font: normal normal normal 56px/1.161em impact,impact-w01-2010,impact-w02-2010,impact-w10-2010,sans-serif ;color:#12110F;}
                    .font_6 {font: normal normal normal 28px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;}
                    .font_7 {font: normal normal normal 18px/1.4em roboto-bold,roboto,sans-serif ;color:#12110F;}
                    .font_8 {font: normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;color:#FFFFFF;}
                    .font_9 {font: normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;color:#12110F;}
                    .font_10 {font: normal normal normal 14px/1.43em 'Open Sans',sans-serif ;color:#12110F;}
                </style>
                <style type="text/css" data-styleid="theme_colors">.color_0 {color: #FFFFFF;}
                    .backcolor_0 {background-color: #FFFFFF;}
                    .color_1 {color: #FFFFFF;}
                    .backcolor_1 {background-color: #FFFFFF;}
                    .color_2 {color: #000000;}
                    .backcolor_2 {background-color: #000000;}
                    .color_3 {color: #ED1C24;}
                    .backcolor_3 {background-color: #ED1C24;}
                    .color_4 {color: #0088CB;}
                    .backcolor_4 {background-color: #0088CB;}
                    .color_5 {color: #FFCB05;}
                    .backcolor_5 {background-color: #FFCB05;}
                    .color_6 {color: #727272;}
                    .backcolor_6 {background-color: #727272;}
                    .color_7 {color: #B0B0B0;}
                    .backcolor_7 {background-color: #B0B0B0;}
                    .color_8 {color: #FFFFFF;}
                    .backcolor_8 {background-color: #FFFFFF;}
                    .color_9 {color: #727272;}
                    .backcolor_9 {background-color: #727272;}
                    .color_10 {color: #B0B0B0;}
                    .backcolor_10 {background-color: #B0B0B0;}
                    .color_11 {color: #FFFFFF;}
                    .backcolor_11 {background-color: #FFFFFF;}
                    .color_12 {color: #B8B5AE;}
                    .backcolor_12 {background-color: #B8B5AE;}
                    .color_13 {color: #75736D;}
                    .backcolor_13 {background-color: #75736D;}
                    .color_14 {color: #363430;}
                    .backcolor_14 {background-color: #363430;}
                    .color_15 {color: #12110F;}
                    .backcolor_15 {background-color: #12110F;}
                    .color_16 {color: #FFF0CC;}
                    .backcolor_16 {background-color: #FFF0CC;}
                    .color_17 {color: #FFDB81;}
                    .backcolor_17 {background-color: #FFDB81;}
                    .color_18 {color: #FFB703;}
                    .backcolor_18 {background-color: #FFB703;}
                    .color_19 {color: #AA7A02;}
                    .backcolor_19 {background-color: #AA7A02;}
                    .color_20 {color: #553D01;}
                    .backcolor_20 {background-color: #553D01;}
                    .color_21 {color: #D3D4D6;}
                    .backcolor_21 {background-color: #D3D4D6;}
                    .color_22 {color: #A8A9AD;}
                    .backcolor_22 {background-color: #A8A9AD;}
                    .color_23 {color: #7E7F82;}
                    .backcolor_23 {background-color: #7E7F82;}
                    .color_24 {color: #545557;}
                    .backcolor_24 {background-color: #545557;}
                    .color_25 {color: #2A2A2B;}
                    .backcolor_25 {background-color: #2A2A2B;}
                    .color_26 {color: #FFFFFF;}
                    .backcolor_26 {background-color: #FFFFFF;}
                    .color_27 {color: #FFFFFF;}
                    .backcolor_27 {background-color: #FFFFFF;}
                    .color_28 {color: #EBEBEB;}
                    .backcolor_28 {background-color: #EBEBEB;}
                    .color_29 {color: #BEBEBE;}
                    .backcolor_29 {background-color: #BEBEBE;}
                    .color_30 {color: #727272;}
                    .backcolor_30 {background-color: #727272;}
                    .color_31 {color: #FFF1AB;}
                    .backcolor_31 {background-color: #FFF1AB;}
                    .color_32 {color: #FFEA82;}
                    .backcolor_32 {background-color: #FFEA82;}
                    .color_33 {color: #FFD504;}
                    .backcolor_33 {background-color: #FFD504;}
                    .color_34 {color: #AA8E03;}
                    .backcolor_34 {background-color: #AA8E03;}
                    .color_35 {color: #554701;}
                    .backcolor_35 {background-color: #554701;}
                </style>
            </div>
            <div id="CSS_CONTAINER"></div>
            <div data-aid="stylesContainer">
                <style type="text/css" data-styleid="style-k6auwcww">.style-k6auwcww {display:none;}</style>
                <style type="text/css" data-styleid="pc1">.pc1screenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .pc1[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
                    .pc1[data-state~="fixedPosition"].pc1_footer {top:auto;bottom:0;}
                    .pc1bg {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .pc1[data-is-absolute-layout="true"] > .pc1centeredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .pc1[data-is-absolute-layout="true"] > .pc1centeredContent > .pc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                </style>
                <style type="text/css" data-styleid="siteBackground">.siteBackground {width:100%;position:absolute;}
                    .siteBackgroundbgBeforeTransition {position:absolute;top:0;}
                    .siteBackgroundbgAfterTransition {position:absolute;top:0;}
                </style>
                <style type="text/css" data-styleid="style-k7ugjln5">.style-k7ugjln5screenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7ugjln5[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
                    .style-k7ugjln5[data-state~="fixedPosition"].style-k7ugjln5_footer {top:auto;bottom:0;}
                    .style-k7ugjln5_bg {position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.6); background-color:rgba(18, 17, 15, 0.81);border-top:0px solid rgba(18, 17, 15, 1);border-bottom:0px solid rgba(18, 17, 15, 1);background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/bevel_300.png);background-repeat:repeat-x;}
                    .style-k7ugjln5bg {position:absolute;top:0px;right:0;bottom:0px;left:0;}
                    .style-k7ugjln5[data-state~="mobileView"] .style-k7ugjln5bg {left:10px;right:10px;}
                    .style-k7ugjln5[data-is-absolute-layout="true"] > .style-k7ugjln5centeredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7ugjln5[data-is-absolute-layout="true"] > .style-k7ugjln5centeredContent > .style-k7ugjln5inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                </style>
                <style type="text/css" data-styleid="style-k7ugjugc">.style-k7ugjugcscreenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7ugjugc[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
                    .style-k7ugjugc[data-state~="fixedPosition"].style-k7ugjugc_footer {top:auto;bottom:0;}
                    .style-k7ugjugc_bg {position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.6); background-color:rgba(18, 17, 15, 1);border-top:0px solid rgba(18, 17, 15, 1);border-bottom:0px solid rgba(18, 17, 15, 1);background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/bevel_300.png);background-repeat:repeat-x;}
                    .style-k7ugjugcbg {position:absolute;top:0px;right:0;bottom:0px;left:0;}
                    .style-k7ugjugc[data-state~="mobileView"] .style-k7ugjugcbg {left:10px;right:10px;}
                    .style-k7ugjugc[data-is-absolute-layout="true"] > .style-k7ugjugccenteredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7ugjugc[data-is-absolute-layout="true"] > .style-k7ugjugccenteredContent > .style-k7ugjugcinlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                </style>
                <style type="text/css" data-styleid="style-kd8jx4k6">.style-kd8jx4k6bg {border:0px solid rgba(18, 17, 15, 1);background-color:rgba(255, 255, 255, 1);border-radius:0; position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-kd8jx4k6[data-is-absolute-layout="true"] > .style-kd8jx4k6inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                </style>
                <style type="text/css" data-styleid="txtNew">.txtNew {word-wrap:break-word;text-align:start;}
                    .txtNew_override-left * {text-align:left !important;}
                    .txtNew_override-right * {text-align:right !important;}
                    .txtNew_override-center * {text-align:center !important;}
                    .txtNew_override-justify * {text-align:justify !important;}
                    .txtNew > * {pointer-events:auto;}
                    .txtNew li {font-style:inherit;font-weight:inherit;line-height:inherit;letter-spacing:normal;}
                    .txtNew ol,.txtNew ul {padding-left:1.3em;padding-right:0;margin-left:0.5em;margin-right:0;line-height:normal;letter-spacing:normal;}
                    .txtNew ul {list-style-type:disc;}
                    .txtNew ol {list-style-type:decimal;}
                    .txtNew ul ul,.txtNew ol ul {list-style-type:circle;}
                    .txtNew ul ul ul,.txtNew ol ul ul {list-style-type:square;}
                    .txtNew ul ol ul,.txtNew ol ol ul {list-style-type:square;}
                    .txtNew ul[dir="rtl"],.txtNew ol[dir="rtl"] {padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;}
                    .txtNew ul[dir="rtl"] ul,.txtNew ul[dir="rtl"] ol,.txtNew ol[dir="rtl"] ul,.txtNew ol[dir="rtl"] ol {padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;}
                    .txtNew p {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h1 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h2 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h3 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h4 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h5 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h6 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew a {color:inherit;}
                </style>
                <style type="text/css" data-styleid="style-jr9629o5">.style-jr9629o5 {box-sizing:border-box;border-top:1px solid rgba(255, 255, 255, 0.15);height:0;}</style>
                <style type="text/css" data-styleid="style-k7to9w85">.style-k7to9w85itemsContainer {width:calc(100% - 0px);height:calc(100% - 0px);white-space:nowrap;display:inline-block;overflow:visible;position:absolute;}
                    .style-k7to9w85moreContainer {overflow:visible;display:inherit;white-space:nowrap;width:auto;background-color:rgba(18, 17, 15, 1);border-radius:0; }
                    .style-k7to9w85dropWrapper {z-index:99999;display:block;opacity:1;visibility:hidden;position:absolute;margin-top:7px;}
                    .style-k7to9w85 > nav {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7to9w85dropWrapper[data-dropMode="dropUp"] {margin-top:0;margin-bottom:7px;}
                    .style-k7to9w85navContainer_with-validation-indication select:not([data-preview~="focus"]):invalid {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k7to9w85navContainer {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
                    .style-k7to9w85navContainer select {border-radius:0; -webkit-appearance:none;-moz-appearance:none; font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif; background-color:rgba(18, 17, 15, 1);color:#FFFFFF;border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-width:1px;border-left-width:0px;border-right-width:0px;margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;}
                    .style-k7to9w85navContainer select option {text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;}
                    .style-k7to9w85navContainer select.style-k7to9w85navContainer_placeholder-style {color:#12110F;}
                    .style-k7to9w85navContainer select.style-k7to9w85navContainer_extended-placeholder-style {color:#888888;}
                    .style-k7to9w85navContainer select:-moz-focusring {color:transparent;text-shadow:0 0 0 #000;}
                    .style-k7to9w85navContainer select::-ms-expand {display:none;}
                    .style-k7to9w85navContainer select:focus::-ms-value {background:transparent;}
                    .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):hover,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="hover"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(18, 17, 15, 1);}
                    .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):focus,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="focus"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-error="true"],.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="error"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):disabled,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-disabled="true"],.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="disabled"] {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;background-color:rgba(204, 204, 204, 1);}
                    .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):disabled + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-disabled="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="disabled"] + .style-k7to9w85navContainerarrow {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;border:none;}
                    .style-k7to9w85navContainerarrow {position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-left-width:1px;}
                    .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container {width:12px;}
                    .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container svg {height:100%;fill:rgba(184, 181, 174, 1);}
                    .style-k7to9w85navContainer_left-direction {text-align-last:left;}
                    .style-k7to9w85navContainer_left-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-right:0;}
                    .style-k7to9w85navContainer_left-direction .style-k7to9w85navContainerarrow {right:0;border-left-width:1px;}
                    .style-k7to9w85navContainer_right-direction {text-align-last:right;direction:rtl;}
                    .style-k7to9w85navContainer_right-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-left:0;}
                    .style-k7to9w85navContainer_right-direction .style-k7to9w85navContainerarrow {left:0;border-right-width:1px;}
                    .style-k7to9w85navContainer_center-direction {text-align-last:left;text-align-last:center;}
                    .style-k7to9w85navContainer_center-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-right:0;}
                    .style-k7to9w85navContainer_center-direction .style-k7to9w85navContainerarrow {right:0;border-left-width:1px;}
                    .style-k7to9w85navContainer_mobileMenuContainer {border:0;}
                    .style-k7to9w85navContainer_mobileMenuContainer .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container .style-k7to9w85navContainericon {fill:#FFFFFF;}
                    .style-k7to9w85navContainerlabel {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ; color:#12110F;word-break:break-word;display:inline-block;line-height:1;}
                    .style-k7to9w85navContainer_required .style-k7to9w85navContainerlabel::after {content:" *";color:transparent;}
                    .style-k7to9w85navContainer_selector-wrapper {-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;}
                    .style-k7to9w85repeaterButton {height:100%;position:relative;box-sizing:border-box;display:inline-block;cursor:pointer;font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif;}
                    .style-k7to9w85repeaterButton[data-state~="header"] a,.style-k7to9w85repeaterButton[data-state~="header"] div {cursor:default !important;}
                    .style-k7to9w85repeaterButtonlinkElement {display:inline-block;height:100%;width:100%;}
                    .style-k7to9w85repeaterButton_gapper {padding:0 5px;}
                    .style-k7to9w85repeaterButtonlabel {display:inline-block;padding:0 10px;color:#FFFFFF;transition:color 0.4s ease 0s;}
                    .style-k7to9w85repeaterButton[data-state~="drop"] {width:100%;display:block;}
                    .style-k7to9w85repeaterButton[data-state~="drop"] .style-k7to9w85repeaterButtonlabel {padding:0 .5em;}
                    .style-k7to9w85repeaterButton[data-state~="over"] .style-k7to9w85repeaterButtonlabel,.style-k7to9w85repeaterButton[data-preview~="hover"] .style-k7to9w85repeaterButtonlabel {color:#FFD504;transition:color 0.4s ease 0s;}
                    .style-k7to9w85repeaterButton[data-state~="selected"] .style-k7to9w85repeaterButtonlabel,.style-k7to9w85repeaterButton[data-preview~="active"] .style-k7to9w85repeaterButtonlabel {color:#FFD504;transition:color 0.4s ease 0s;}
                </style>
                <style type="text/css" data-styleid="style-k7ns13ap">.style-k7ns13ap_zoomedin {cursor:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_out.png), url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_out.cur), auto;overflow:hidden;display:block;}
                    .style-k7ns13ap_zoomedout {cursor:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_in.png), url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_in.cur), auto;}
                    .style-k7ns13aplink {display:block;overflow:hidden;}
                    .style-k7ns13apimg {overflow:hidden;}
                    .style-k7ns13ap[data-is-responsive=true] .style-k7ns13aplink,.style-k7ns13ap[data-is-responsive=true] .style-k7ns13apimg,.style-k7ns13ap[data-is-responsive=true] wix-image {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7ns13apimgimage {position:static;box-shadow:#000 0 0 0;user-select:none;}
                </style>
                <style type="text/css" data-styleid="lb1">.lb1[data-is-responsive~="false"] .lb1itemsContainer {position:absolute;width:100%;height:100%;white-space:nowrap;}
                    .lb1[data-is-responsive~="false"][data-state~="mobileView"] .lb1itemsContainer {position:absolute;width:100%;height:100%;white-space:normal;}
                    .lb1[data-is-responsive~="true"] {display:table;}
                    .lb1[data-is-responsive~="true"] .lb1itemsContainer {display:-webkit-box;display:-webkit-flex;display:flex;}
                    .lb1itemsContainer > li:last-child {margin:0 !important;}
                    .lb1 a {display:block;height:100%;}
                    .lb1imageItemlink {cursor:pointer;}
                    .lb1imageItemimageimage {position:static;box-shadow:#000 0 0 0;user-select:none;}
                </style>
                <style type="text/css" data-styleid="strc1">.strc1:not([data-mobile-responsive]) > .strc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .strc1[data-mobile-responsive] > .strc1inlineContent {position:relative;}
                    .strc1[data-responsive] {display:-ms-grid;display:grid;justify-content:center;grid-template-columns:100%;grid-template-rows:1fr;-ms-grid-columns:100%;-ms-grid-rows:1fr;}
                    .strc1[data-responsive] > .strc1inlineContent {display:flex;}
                    .strc1[data-responsive] > * {position:relative;grid-row-start:1;grid-column-start:1;grid-row-end:2;grid-column-end:2;-ms-grid-row-span:1;-ms-grid-column-span:1;margin:0 auto;}
                </style>
                <style type="text/css" data-styleid="mc1">.mc1:not([data-mobile-responsive]) .mc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .mc1:not([data-mobile-responsive]) .mc1container {position:relative;height:100%;top:0;}
                </style>
                <style type="text/css" data-styleid="style-k6auwexi1">.style-k6auwexi1 > ul {display:table;width:100%;box-sizing:border-box;}
                    .style-k6auwexi1 li {display:table;width:100%;}
                    .style-k6auwexi1 a span {pointer-events:none;}
                    .style-k6auwexi1_noLink {cursor:default !important;}
                    .style-k6auwexi1_counter {margin:0 10px;opacity:0.6;}
                    .style-k6auwexi1menuContainer {padding:0;margin:0;border:solid 1px rgba(18, 17, 15, 0.2);position:relative; border-radius:0;}
                    .style-k6auwexi1menuContainer .style-k6auwexi1_emptySubMenu {display:none !important;}
                    .style-k6auwexi1_itemHoverArea {box-sizing:content-box;border-bottom:solid 0px rgba(18, 17, 15, 1);}
                    .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item {border-radius:0; border-bottom-left-radius:0;border-bottom-right-radius:0;}
                    .style-k6auwexi1_itemHoverArea:last-child {border-bottom:0 solid transparent;}
                    .style-k6auwexi1_itemHoverArea:last-child > .style-k6auwexi1_item {border-radius:0; border-top-left-radius:0;border-top-right-radius:0;border-bottom:0 solid transparent;}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item {transition:background-color 0.4s ease 0s;}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover .style-k6auwexi1_subMenu {opacity:1;display:block;}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover:not(.style-k6auwexi1_noLink) > .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover:not(.style-k6auwexi1_noLink) > .style-k6auwexi1_item > .style-k6auwexi1_label {color:#363430;}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item > .style-k6auwexi1_label,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item > .style-k6auwexi1_label {color:#FFB703;}
                    .style-k6auwexi1_item {height:100%;padding-left:30px;padding-right:30px;transition:background-color 0.4s ease 0s; margin:0;position:relative;cursor:pointer;list-style:none;background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1_label {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ; color:#12110F;display:inline;white-space:nowrap;overflow:hidden;}
                    .style-k6auwexi1_subMenu {z-index:999;min-width:100%;display:none;opacity:0;transition:all 0.4s ease 0s; position:absolute;border:solid 1px rgba(18, 17, 15, 0.2);border-radius:0; }
                    .style-k6auwexi1_subMenu .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1_subMenu .style-k6auwexi1_label {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;}
                    .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item,.style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child:last-child > .style-k6auwexi1_item {border-radius:0;}
                    .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item {border-bottom-left-radius:0;border-bottom-right-radius:0;}
                    .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:last-child {border-bottom:0 solid transparent;}
                    .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:last-child > .style-k6auwexi1_item {border-radius:0; border-top-left-radius:0;border-top-right-radius:0;border-bottom:0 solid transparent;}
                    .style-k6auwexi1_subMenu:before {background-color:#fff;opacity:0;z-index:999;content:" ";display:block;width:calc(0px + 1px);height:100%;position:absolute;top:0;}
                    .style-k6auwexi1[data-state~="items-align-left"] .style-k6auwexi1_item {text-align:left;}
                    .style-k6auwexi1[data-state~="items-align-center"] .style-k6auwexi1_item {text-align:center;}
                    .style-k6auwexi1[data-state~="items-align-right"] .style-k6auwexi1_item {text-align:right;}
                    .style-k6auwexi1[data-state~="subItems-align-left"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:left;padding-left:30px;padding-right:30px;}
                    .style-k6auwexi1[data-state~="subItems-align-center"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:center;padding-left:30px;padding-right:30px;}
                    .style-k6auwexi1[data-state~="subItems-align-right"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:right;padding-left:30px;padding-right:30px;}
                    .style-k6auwexi1[data-state~="subMenuOpenSide-right"] .style-k6auwexi1_subMenu {left:100%;float:left;margin-left:0px;}
                    .style-k6auwexi1[data-state~="subMenuOpenSide-right"] .style-k6auwexi1_subMenu:before {right:100%;}
                    .style-k6auwexi1[data-state~="subMenuOpenSide-left"] .style-k6auwexi1_subMenu {right:100%;float:right;margin-right:0px;}
                    .style-k6auwexi1[data-state~="subMenuOpenSide-left"] .style-k6auwexi1_subMenu:before {left:100%;}
                    .style-k6auwexi1[data-open-direction~="subMenuOpenDir-down"] .style-k6auwexi1_subMenu {top:calc(-1 * 1px);}
                    .style-k6auwexi1[data-open-direction~="subMenuOpenDir-up"] .style-k6auwexi1_subMenu {bottom:calc(-1 * 1px);}
                    .style-k6auwexi1menuContainer_with-validation-indication select:not([data-preview~="focus"]):invalid {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1menuContainer {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
                    .style-k6auwexi1menuContainer select {border-radius:0; -webkit-appearance:none;-moz-appearance:none; font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ; background-color:rgba(255, 255, 255, 1);color:#12110F;border-width:1px; border-style:solid;border-color:rgba(18, 17, 15, 0.2);margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;}
                    .style-k6auwexi1menuContainer select option {text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;}
                    .style-k6auwexi1menuContainer select.style-k6auwexi1menuContainer_placeholder-style {color:#12110F;}
                    .style-k6auwexi1menuContainer select.style-k6auwexi1menuContainer_extended-placeholder-style {color:#888888;}
                    .style-k6auwexi1menuContainer select:-moz-focusring {color:transparent;text-shadow:0 0 0 #000;}
                    .style-k6auwexi1menuContainer select::-ms-expand {display:none;}
                    .style-k6auwexi1menuContainer select:focus::-ms-value {background:transparent;}
                    .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):hover,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="hover"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):focus,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="focus"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-error="true"],.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="error"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):disabled,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-disabled="true"],.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="disabled"] {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;background-color:rgba(204, 204, 204, 1);}
                    .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):disabled + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-disabled="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="disabled"] + .style-k6auwexi1menuContainerarrow {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;border:none;}
                    .style-k6auwexi1menuContainerarrow {position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;}
                    .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container {width:12px;}
                    .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container svg {height:100%;fill:rgba(184, 181, 174, 1);}
                    .style-k6auwexi1menuContainer_left-direction {text-align-last:left;}
                    .style-k6auwexi1menuContainer_left-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-left:0;}
                    .style-k6auwexi1menuContainer_left-direction .style-k6auwexi1menuContainerarrow {right:0;}
                    .style-k6auwexi1menuContainer_right-direction {text-align-last:right;direction:rtl;}
                    .style-k6auwexi1menuContainer_right-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-right:0;}
                    .style-k6auwexi1menuContainer_right-direction .style-k6auwexi1menuContainerarrow {left:0;}
                    .style-k6auwexi1menuContainer_center-direction {text-align-last:left;text-align-last:center;}
                    .style-k6auwexi1menuContainer_center-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-left:0;}
                    .style-k6auwexi1menuContainer_center-direction .style-k6auwexi1menuContainerarrow {right:0;}
                    .style-k6auwexi1menuContainer_mobileMenuContainer {border:0;}
                    .style-k6auwexi1menuContainer_mobileMenuContainer .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container .style-k6auwexi1menuContainericon {fill:#12110F;}
                    .style-k6auwexi1menuContainerlabel {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ; color:#12110F;word-break:break-word;display:inline-block;line-height:1;}
                    .style-k6auwexi1menuContainer_required .style-k6auwexi1menuContainerlabel::after {content:" *";color:transparent;}
                    .style-k6auwexi1menuContainer_selector-wrapper {-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;}
                </style>
                <style type="text/css" data-styleid="tpaw0">.tpaw0 {overflow:hidden;}
                    .tpaw0 iframe {position:absolute;width:100%;height:100%;overflow:hidden;}
                    .tpaw0 iframe:-webkit-full-screen {min-height:auto !important;}
                    .tpaw0preloaderOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
                    .tpaw0preloaderOverlaycontent {width:100%;height:100%;}
                    .tpaw0unavailableMessageOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
                    .tpaw0unavailableMessageOverlaycontent {width:100%;height:100%;background:rgba(255, 255, 255, 0.9);font-size:0;margin-top:5px;}
                    .tpaw0unavailableMessageOverlaytextContainer {color:#373737;font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;font-size:14px;display:inline-block;vertical-align:middle;width:100%;margin-top:10px;text-align:center;}
                    .tpaw0unavailableMessageOverlayreloadButton {display:inline-block;}
                    .tpaw0unavailableMessageOverlay a {color:#0099FF;text-decoration:underline;cursor:pointer;}
                    .tpaw0unavailableMessageOverlayiconContainer {display:none;}
                    .tpaw0unavailableMessageOverlaydismissButton {display:none;}
                    .tpaw0unavailableMessageOverlaytextTitle {font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;display:none;}
                    .tpaw0unavailableMessageOverlay[data-state~="hideIframe"] .tpaw0unavailableMessageOverlay_buttons {opacity:1;}
                    .tpaw0unavailableMessageOverlay[data-state~="hideOverlay"] {display:none;}
                </style>
                <style type="text/css" data-styleid="style-k6hsf3sb">.style-k6hsf3sb[data-state~="touchRollOver"] .style-k6hsf3sb_opc {opacity:1;}
                    .style-k6hsf3sbemptyDivToFillMatrix {width:1px;height:1px;opacity:0;}
                    .style-k6hsf3sb_opc {transition:opacity 0.3s ease 0s; opacity:0;color:#FFFFFF;}
                    .style-k6hsf3sb:hover[data-state~="notMobile"] .style-k6hsf3sb_opc {opacity:1;}
                    .style-k6hsf3sbitemsContainer {overflow:hidden;height:100% !important;}
                    .style-k6hsf3sbrolloverHolder {box-sizing:border-box !important;font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ; background-color:rgba(117, 115, 109, 0.5);transition:opacity 0s; color:#FFFFFF;opacity:0;padding:10px !important;overflow:hidden;cursor:pointer;}
                    .style-k6hsf3sbrolloverHolder > div {width:100% !important;}
                    .style-k6hsf3sb[data-state~="rollover"] .style-k6hsf3sbrolloverHolder {transition:opacity 0.3s ease 0s; opacity:1;}
                    .style-k6hsf3sbtitle {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:normal normal normal 28px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;}
                    .style-k6hsf3sbdescription {white-space:pre-line;overflow:hidden;max-height:60%;}
                    .style-k6hsf3sblink {overflow:hidden;white-space:nowrap;text-decoration:underline;color:#2F2E2E;position:absolute;bottom:10px;left:10px;right:10px;}
                    .style-k6hsf3sb_buttons {transition:opacity 0.3s ease 0s; opacity:0;position:absolute;left:0;right:0;top:50%;margin-top:-15px;}
                    .style-k6hsf3sb[data-state~="mobile"] .style-k6hsf3sb_buttons {opacity:1;}
                    .style-k6hsf3sb_buttons a {transition:opacity 0.3s ease 0s; opacity:0.6;width:45px;height:65px;background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/arrows_white_new3.png);background-repeat:no-repeat;cursor:pointer;position:absolute;}
                    .style-k6hsf3sb[data-state~="mobile"] .style-k6hsf3sb_buttons a {opacity:1;}
                    .style-k6hsf3sbbuttonPrev {left:20px;background-position:0 0;left:20px;background-position:0 0;}
                    .style-k6hsf3sbbuttonNext {right:20px;background-position:100% 0;right:20px;background-position:100% 0;}
                    .style-k6hsf3sb:hover > .style-k6hsf3sb_buttons {opacity:1;}
                    .style-k6hsf3sb_buttons a:hover {opacity:1;}
                    .style-k6hsf3sb_hlp {position:absolute;color:#FFFFFF;}
                    .style-k6hsf3sb_hlp span {display:block;}
                    .style-k6hsf3sbautoplay {right:35px;bottom:10px;}
                    .style-k6hsf3sbcounter {right:10px;bottom:8px;font-size:13px;}
                    .style-k6hsf3sb[data-state~="noLink"] .style-k6hsf3sblink {display:none;}
                    .style-k6hsf3sb[data-state~="autoplayOff"] .style-k6hsf3sbautoplay > span {border:6px solid transparent;border-left:6px solid #FFFFFF;}
                    .style-k6hsf3sb[data-state~="autoplayOn"] .style-k6hsf3sbautoplay > span {border-left:3px solid #FFFFFF;border-right:3px solid #FFFFFF;margin-right:5px;height:12px;width:1px;}
                    .style-k6hsf3sbimgimage {position:static;box-shadow:#000 0 0 0;user-select:none;}
                </style>
                <style type="text/css" data-styleid="style-k6hsf3t3">.style-k6hsf3t3 button.style-k6hsf3t3link {width:100%;}
                    .style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3labelwrapper {text-align:initial;display:flex;align-items:center;}
                    .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="center"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="center"] .style-k6hsf3t3labelwrapper {justify-content:center;}
                    .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="left"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="left"] .style-k6hsf3t3labelwrapper {justify-content:flex-start;}
                    .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="right"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="right"] .style-k6hsf3t3labelwrapper {justify-content:flex-end;}
                    .style-k6hsf3t3link {border-radius:0; position:absolute;top:0;right:0;bottom:0;left:0;transition:border-color 0.4s ease 0s, background-color 0.4s ease 0s; }
                    .style-k6hsf3t3label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ; transition:color 0.4s ease 0s; color:#FFFFFF;display:inline-block;margin:calc(-1 * 0px) 0px 0;position:relative;white-space:nowrap;}
                    .style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3label {margin:0;}
                    .style-k6hsf3t3[data-disabled="false"] .style-k6hsf3t3link {background-color:rgba(255, 183, 3, 1);border:solid rgba(126, 127, 130, 1) 0px;cursor:pointer !important;}
                    .style-k6hsf3t3[data-disabled="false"]:active[data-state~="mobile"] .style-k6hsf3t3link,.style-k6hsf3t3[data-disabled="false"]:hover[data-state~="desktop"] .style-k6hsf3t3link,.style-k6hsf3t3[data-disabled="false"][data-preview~="hover"] .style-k6hsf3t3link {background-color:rgba(255, 255, 255, 1);border-color:rgba(18, 17, 15, 1);}
                    .style-k6hsf3t3[data-disabled="false"]:active[data-state~="mobile"] .style-k6hsf3t3label,.style-k6hsf3t3[data-disabled="false"]:hover[data-state~="desktop"] .style-k6hsf3t3label,.style-k6hsf3t3[data-disabled="false"][data-preview~="hover"] .style-k6hsf3t3label {color:#12110F;}
                    .style-k6hsf3t3[data-disabled="true"] .style-k6hsf3t3link,.style-k6hsf3t3[data-preview~="disabled"] .style-k6hsf3t3link {background-color:rgba(204, 204, 204, 1);border:solid rgba(18, 17, 15, 1) 0px;}
                    .style-k6hsf3t3[data-disabled="true"] .style-k6hsf3t3label,.style-k6hsf3t3[data-preview~="disabled"] .style-k6hsf3t3label {color:#FFFFFF;}
                </style>
                <style type="text/css" data-styleid="controller1">.controller1 {display:none;}</style>
                <style type="text/css" data-styleid="b1">.b1 button.b1link {width:100%;}
                    .b1[data-state~="shouldUseFlex"] .b1link,.b1[data-state~="shouldUseFlex"] .b1labelwrapper {text-align:initial;display:flex;align-items:center;}
                    .b1[data-state~="shouldUseFlex"][data-state~="center"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="center"] .b1labelwrapper {justify-content:center;}
                    .b1[data-state~="shouldUseFlex"][data-state~="left"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="left"] .b1labelwrapper {justify-content:flex-start;}
                    .b1[data-state~="shouldUseFlex"][data-state~="right"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="right"] .b1labelwrapper {justify-content:flex-end;}
                    .b1link {border-radius:0; position:absolute;top:0;right:0;bottom:0;left:0;transition:border-color 0.4s ease 0s, background-color 0.4s ease 0s; }
                    .b1label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ; transition:color 0.4s ease 0s; color:#FFFFFF;display:inline-block;margin:calc(-1 * 0px) 0px 0;position:relative;white-space:nowrap;}
                    .b1[data-state~="shouldUseFlex"] .b1label {margin:0;}
                    .b1[data-disabled="false"] .b1link {background-color:rgba(18, 17, 15, 1);border:solid rgba(126, 127, 130, 1) 0px;cursor:pointer !important;}
                    .b1[data-disabled="false"]:active[data-state~="mobile"] .b1link,.b1[data-disabled="false"]:hover[data-state~="desktop"] .b1link,.b1[data-disabled="false"][data-preview~="hover"] .b1link {background-color:rgba(255, 183, 3, 1);border-color:rgba(18, 17, 15, 1);}
                    .b1[data-disabled="false"]:active[data-state~="mobile"] .b1label,.b1[data-disabled="false"]:hover[data-state~="desktop"] .b1label,.b1[data-disabled="false"][data-preview~="hover"] .b1label {color:#7E7F82;}
                    .b1[data-disabled="true"] .b1link,.b1[data-preview~="disabled"] .b1link {background-color:rgba(204, 204, 204, 1);border:solid rgba(18, 17, 15, 1) 0px;}
                    .b1[data-disabled="true"] .b1label,.b1[data-preview~="disabled"] .b1label {color:#FFFFFF;}
                </style>
                <style type="text/css" data-styleid="style-kfwzliri">.style-kfwzliribg {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-kfwzliri[data-state~="mobileView"] .style-kfwzliribg {left:10px;right:10px;}
                    .style-kfwzliriinlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                </style>
                <style type="text/css" data-styleid="s_DtaksTPAWidgetSkin">.s_DtaksTPAWidgetSkin {overflow:hidden;}
                    .s_DtaksTPAWidgetSkin iframe {position:absolute;width:100%;height:100%;overflow:hidden;}
                    .s_DtaksTPAWidgetSkin iframe:-webkit-full-screen {min-height:auto !important;}
                    .s_DtaksTPAWidgetSkinpreloaderOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
                    .s_DtaksTPAWidgetSkinpreloaderOverlaycontent {width:100%;height:100%;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlaycontent {width:100%;height:100%;background:rgba(255, 255, 255, 0.9);font-size:0;margin-top:5px;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlaytextContainer {color:#373737;font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;font-size:14px;display:inline-block;vertical-align:middle;width:100%;margin-top:10px;text-align:center;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlayreloadButton {display:inline-block;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlay a {color:#0099FF;text-decoration:underline;cursor:pointer;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlayiconContainer {display:none;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlaydismissButton {display:none;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlaytextTitle {font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;display:none;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlay[data-state~="hideIframe"] .s_DtaksTPAWidgetSkinunavailableMessageOverlay_buttons {opacity:1;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlay[data-state~="hideOverlay"] {display:none;}
                </style>
            </div>
            <div class="noop visual-focus-on" style="position:relative">
                <div id="SCROLL_TO_TOP" tabindex="-1" aria-label="top of page" role="region" style="height:0"></div>
                <div id="FONTS_CONTAINER"></div>
                <div id="SITE_BACKGROUND" style="height:100%;top:0;min-height:calc(100vh - 0px);bottom:;left:;right:;position:" class="siteBackground">
                    <div id="SITE_BACKGROUND_previous_noPrev" data-position="absolute" data-align="" data-fitting="" class="siteBackgroundprevious">
                        <div id="SITE_BACKGROUNDpreviousImage" class="siteBackgroundpreviousImage"></div>
                        <div id="SITE_BACKGROUNDpreviousVideo" class="siteBackgroundpreviousVideo"></div>
                        <div id="SITE_BACKGROUND_previousOverlay_noPrev" class="siteBackgroundpreviousOverlay"></div>
                    </div>
                    <div id="SITE_BACKGROUND_current_j3lou_desktop_bg" style="top:0;height:100%;width:100%;background-color:rgba(255, 183, 3, 1);display:;position:absolute" data-position="absolute" data-align="top_left" data-fitting="legacy_tile" class="siteBackgroundcurrent">
                        <div id="SITE_BACKGROUND_currentImage_j3lou_desktop_bg" style="position:absolute;top:0;height:100%;width:100%" data-type="bgimage" data-height="100%" class="siteBackgroundcurrentImage"></div>
                        <div id="SITE_BACKGROUNDcurrentVideo" class="siteBackgroundcurrentVideo"></div>
                        <div id="SITE_BACKGROUND_currentOverlay_j3lou_desktop_bg" style="position:absolute;top:0;width:100%;height:100%" class="siteBackgroundcurrentOverlay"></div>
                    </div>
                </div>
                <div id="SITE_ROOT" class="SITE_ROOT" style="width:100%;min-width:980px;padding-bottom:0;top:0" aria-hidden="false">
                    <div id="masterPage" class="mesh-layout" data-mesh-layout="grid">
                        <header data-is-absolute-layout="false" data-is-mobile="false" data-state="transition-allowed" data-site-width="980" data-header-top="0" style="position:relative;margin-top:0;left:0;margin-left:0;width:100%;min-width:980px;top:;bottom:;right:;display:none" class="style-k7ugjugc" id="SITE_HEADER">
                            <div style="left:0;width:100%" id="SITE_HEADERscreenWidthBackground" class="style-k7ugjugcscreenWidthBackground">
                                <div class="style-k7ugjugc_bg"></div>
                            </div>
                            <div id="SITE_HEADERcenteredContent" class="style-k7ugjugccenteredContent">
                                <div style="margin-left:calc((100% - 980px) / 2);width:980px" id="SITE_HEADERbg" class="style-k7ugjugcbg"></div>
                                <div id="SITE_HEADERinlineContent" class="style-k7ugjugcinlineContent">
                                    <style id="SITE_HEADER-mesh-styles">
                                        #SITE_HEADERinlineContent {
                                        height: auto;
                                        width: 100%;
                                        position: relative;
                                        }
                                        #SITE_HEADERinlineContent-gridWrapper {
                                        pointer-events: none;
                                        }
                                        #SITE_HEADERinlineContent-gridContainer {
                                        position: static;
                                        display: grid;
                                        height: auto;
                                        width: 100%;
                                        min-height: auto;
                                        grid-template-rows: min-content min-content min-content min-content min-content 1fr;
                                        grid-template-columns: 100%;
                                        }
                                        #comp-j1rq4q3c1 {
                                        position: relative;
                                        margin: 13px 0 7px 0;
                                        left: 0;
                                        grid-area: 2 / 1 / 3 / 2;
                                        justify-self: stretch;
                                        align-self: start;
                                        }
                                        #comp-k557vagj {
                                        position: relative;
                                        margin: 0px 0px -14px calc((100% - 980px) * 0.5);
                                        left: 0px;
                                        grid-area: 1 / 1 / 2 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-j1rq742h {
                                        position: relative;
                                        margin: 0px 0px 23px calc((100% - 980px) * 0.5);
                                        left: 360px;
                                        grid-area: 2 / 1 / 6 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-k7nv6chl {
                                        position: absolute;
                                        top: 124px;
                                        left: 740px;
                                        }
                                        #comp-j1rq4q3b {
                                        position: relative;
                                        margin: 0px 0px 30px calc((100% - 980px) * 0.5);
                                        left: 1190px;
                                        grid-area: 3 / 1 / 4 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-j1rq4q3b1 {
                                        position: relative;
                                        margin: 0px 0px 48px calc((100% - 980px) * 0.5);
                                        left: 1240px;
                                        grid-area: 4 / 1 / 5 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-j1rq4r8a {
                                        position: relative;
                                        margin: 0px 0px 38px calc((100% - 980px) * 0.5);
                                        left: -1px;
                                        grid-area: 6 / 1 / 7 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #SITE_HEADERcenteredContent {
                                        position: relative;
                                        }
                                        #SITE_HEADERinlineContent-gridContainer > * {
                                        pointer-events: auto;
                                        }
                                        #SITE_HEADERinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                        pointer-events: none;
                                        }
                                        #SITE_HEADERinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                        pointer-events: auto;
                                        }
                                    </style>
                                    <div id="SITE_HEADERinlineContent-gridWrapper" data-mesh-internal="true">
                                        <div id="SITE_HEADERinlineContent-gridContainer" data-mesh-internal="true">
                                            <div data-border-width="1px" style="transform-origin:center 0.5px;left:0;margin-left:0;width:100%;min-width:initial;top:;bottom:;right:;height:5px;position:;display:none" class="style-jr9629o5" id="comp-j1rq4q3c1"></div>
                                            <section style="left:0;width:100%;min-width:980px;height:auto;top:;bottom:;right:;position:;display:none;margin-left:0" data-responsive="true" data-is-screen-width="true" data-col-margin="0" data-row-margin="0" class="strc1" id="comp-k557vagj">
                                                <div style="position:absolute;top:0;width:calc(100% - 0px);height:100%;overflow:hidden;pointer-events:auto;min-width:980px;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="strc1balata" id="comp-k557vagjbalata">
                                                    <div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557vagjbalatabgcolor">
                                                        <div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557vagjbalatabgcoloroverlay" class="bgColoroverlay"></div>
                                                    </div>
                                                </div>
                                                <div style="position:relative;width:calc(100% - 0px);min-width:980px" id="comp-k557vagjinlineContent" class="strc1inlineContent">
                                                    <div style="position:relative;width:100%;left:0;flex:325;margin-left:0;min-width:325px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="325" data-is-mesh="true" class="mc1" id="comp-k557vaxc">
                                                        <div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557vaxccontainer">
                                                            <div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557vaxcbalata">
                                                                <div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557vaxcbalatabgcolor">
                                                                    <div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557vaxcbalatabgcoloroverlay" class="bgColoroverlay"></div>
                                                                </div>
                                                            </div>
                                                            <div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557vaxcinlineContentParent">
                                                                <div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557vaxcinlineContent">
                                                                    <style id="comp-k557vaxc-mesh-styles">
                                                                        #comp-k557vaxcinlineContent {
                                                                        height: auto;
                                                                        width: 100%;
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557vaxcinlineContent-gridContainer {
                                                                        position: static;
                                                                        height: auto;
                                                                        width: 100%;
                                                                        min-height: 98px;
                                                                        }
                                                                        #comp-k557vaxccenteredContent {
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557vaxcinlineContent-gridWrapper {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557vaxcinlineContent-gridContainer > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                        #comp-k557vaxcinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557vaxcinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                    </style>
                                                                    <div id="comp-k557vaxcinlineContent-gridContainer" data-mesh-internal="true"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style="position:relative;width:100%;left:0;flex:326;margin-left:0px;min-width:326px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="326" data-is-mesh="true" class="mc1" id="comp-k557wjr8">
                                                        <div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557wjr8container">
                                                            <div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557wjr8balata">
                                                                <div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557wjr8balatabgcolor">
                                                                    <div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557wjr8balatabgcoloroverlay" class="bgColoroverlay"></div>
                                                                </div>
                                                            </div>
                                                            <div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557wjr8inlineContentParent">
                                                                <div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557wjr8inlineContent">
                                                                    <style id="comp-k557wjr8-mesh-styles">
                                                                        #comp-k557wjr8inlineContent {
                                                                        height: auto;
                                                                        width: 100%;
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557wjr8inlineContent-gridContainer {
                                                                        position: static;
                                                                        height: auto;
                                                                        width: 100%;
                                                                        min-height: 98px;
                                                                        }
                                                                        #comp-k557wjr8centeredContent {
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557wjr8inlineContent-gridWrapper {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557wjr8inlineContent-gridContainer > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                        #comp-k557wjr8inlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557wjr8inlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                    </style>
                                                                    <div id="comp-k557wjr8inlineContent-gridContainer" data-mesh-internal="true"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style="position:relative;width:100%;left:0;flex:329;margin-left:0px;min-width:329px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="329" data-is-mesh="true" class="mc1" id="comp-k557wp6h">
                                                        <div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557wp6hcontainer">
                                                            <div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557wp6hbalata">
                                                                <div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557wp6hbalatabgcolor">
                                                                    <div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557wp6hbalatabgcoloroverlay" class="bgColoroverlay"></div>
                                                                </div>
                                                            </div>
                                                            <div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557wp6hinlineContentParent">
                                                                <div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557wp6hinlineContent">
                                                                    <style id="comp-k557wp6h-mesh-styles">
                                                                        #comp-k557wp6hinlineContent {
                                                                        height: auto;
                                                                        width: 100%;
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557wp6hinlineContent-gridContainer {
                                                                        position: static;
                                                                        height: auto;
                                                                        width: 100%;
                                                                        min-height: 98px;
                                                                        }
                                                                        #comp-k557wp6hcenteredContent {
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557wp6hinlineContent-gridWrapper {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557wp6hinlineContent-gridContainer > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                        #comp-k557wp6hinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557wp6hinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                    </style>
                                                                    <div id="comp-k557wp6hinlineContent-gridContainer" data-mesh-internal="true"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div style="top:;bottom:;left:;right:;width:189px;height:128px;position:;display:none" title="" data-is-responsive="false" data-display-mode="fill" data-content-padding-horizontal="0" data-content-padding-vertical="0" data-exact-height="128" class="style-k7ns13ap" id="comp-j1rq742h">
                                              
                                            </div>
                                            <div style="width:;height:;top:;bottom:;left:;right:;position:;display:none" class="controller1" id="comp-k7nv6chl"></div>
                                            <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:204px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-j1rq4q3b">
                                                
                                            </div>
                                            <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:150px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-j1rq4q3b1">
                                                
                                            </div>
                                            <div id="comp-j1rq4r8a" class="hidden-during-prewarmup style-k7to9w85" style="overflow-x:hidden;top:;bottom:;left:;right:;width:980px;height:30px;position:;display:none" data-stretch-buttons-to-menu-width="true" data-same-width-buttons="false" data-num-items="8" data-menuborder-y="0" data-menubtn-border="0" data-ribbon-els="0" data-label-pad="0" data-ribbon-extra="0" data-drophposition="" data-dropalign="left" dir="ltr" data-state="left notMobile">
                                                <nav aria-label="Site" id="comp-j1rq4r8anavContainer" class="style-k7to9w85navContainer">
                                                    <ul style="text-align:left" id="comp-j1rq4r8aitemsContainer" class="style-k7to9w85itemsContainer">
                                                        <li data-direction="ltr" data-listposition="left" data-data-id="dataItem-j1rp5ha3" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a0">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k7tq7ym2" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a1">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-j1rpaj7y" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a2">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k7ud6l51" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a3">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k6sazqs1" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a4">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-jrgep25b" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a5">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-kcmg5nn2" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a6">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="right" data-data-id="dataItem-k6i0cpy8" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a7">
                                                            
                                                        </li>
                                                        <li data-listposition="right" class="style-k7to9w85repeaterButton" data-state="menu idle header notMobile" id="comp-j1rq4r8a__more__">
                                                            
                                                        </li>
                                                    </ul>
                                                    <div id="comp-j1rq4r8amoreButton" class="style-k7to9w85moreButton"></div>
                                                    <div style="visibility:hidden" data-drophposition="" data-dropalign="left" id="comp-j1rq4r8adropWrapper" class="style-k7to9w85dropWrapper">
                                                        <ul style="visibility:hidden" id="comp-j1rq4r8amoreContainer" class="style-k7to9w85moreContainer"></ul>
                                                    </div>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <main tabindex="-1" data-is-mobile="false" data-is-mesh="true" data-site-width="980" style="left:0;margin-left:0;width:100%;min-width:980px;top:0;bottom:;right:;position:" class="pc1" data-state="" id="PAGES_CONTAINER">
                            <div style="left:0" id="PAGES_CONTAINERscreenWidthBackground" class="pc1screenWidthBackground"></div>
                            <div style="position:relative" id="PAGES_CONTAINERcenteredContent" class="pc1centeredContent">
                                <div style="display:none" id="PAGES_CONTAINERbg" class="pc1bg"></div>
                                <div style="position:relative" id="PAGES_CONTAINERinlineContent" class="pc1inlineContent">
                                    <div style="width:100%">
                                        <div data-ismobile="false" data-is-mesh-layout="true" style="height:100%;left:0;position:relative;top:;bottom:;right:" class="style-kfwzliri" id="j3lou">
                                            <div style="margin-left:calc((100% - 980px) / 2);width:980px" id="j3loubg" class="style-kfwzliribg"></div>
                                            <div class="style-kfwzliriinlineContent" id="j3louinlineContent">
                                                <style id="j3lou-mesh-styles">
                                                    #j3louinlineContent {
                                                    height: auto;
                                                    width: 100%;
                                                    position: relative;
                                                    }
                                                    #j3louinlineContent-gridWrapper {
                                                    pointer-events: none;
                                                    }
                                                    #j3louinlineContent-gridContainer {
                                                    position: static;
                                                    display: grid;
                                                    height: auto;
                                                    width: 100%;
                                                    min-height: 500px;
                                                    grid-template-rows: min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content 1fr;
                                                    grid-template-columns: 100%;
                                                    padding-bottom: 0px;
                                                    box-sizing: border-box;
                                                    }
                                                    #comp-kfwzlis9 {
                                                    position: relative;
                                                    margin: 84px 0px 17px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 1 / 1 / 2 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlis72 {
                                                    position: relative;
                                                    margin: 6px 0px -15px calc((100% - 980px) * 0.5);
                                                    left: 30px;
                                                    grid-area: 2 / 1 / 3 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlisa {
                                                    position: relative;
                                                    margin: 0px 0px 10px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 2 / 1 / 3 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlise {
                                                    position: relative;
                                                    margin: 0px 0px 7px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 3 / 1 / 4 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlisr {
                                                    position: relative;
                                                    margin: 0px 0px 12px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 4 / 1 / 5 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlist1 {
                                                    position: relative;
                                                    margin: 0px 0px 15px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 5 / 1 / 6 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlisw {
                                                    position: relative;
                                                    margin: 0px 0px 21px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 6 / 1 / 7 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlisx1 {
                                                    position: relative;
                                                    margin: 0px 0px 18px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 7 / 1 / 8 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlit0 {
                                                    position: relative;
                                                    margin: 0px 0px 11px calc((100% - 980px) * 0.5);
                                                    left: 148px;
                                                    grid-area: 8 / 1 / 9 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlit2 {
                                                    position: relative;
                                                    margin: 0px 0px 28px calc((100% - 980px) * 0.5);
                                                    left: 148px;
                                                    grid-area: 9 / 1 / 10 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlith {
                                                    position: relative;
                                                    margin: 0px 0px 44px calc((100% - 980px) * 0.5);
                                                    left: 148px;
                                                    grid-area: 10 / 1 / 11 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlitn1 {
                                                    position: relative;
                                                    margin: 0px 0px 0 calc((100% - 980px) * 0.5);
                                                    left: 430px;
                                                    grid-area: 11 / 1 / 12 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #j3loucenteredContent {
                                                    position: relative;
                                                    }
                                                    #j3louinlineContent-gridContainer > * {
                                                    pointer-events: auto;
                                                    }
                                                    #j3louinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                                    pointer-events: none;
                                                    }
                                                    #j3louinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                                    pointer-events: auto;
                                                    }
                                                </style>
                                                <div id="j3louinlineContent-gridWrapper" data-mesh-internal="true">
                                                    <div id="j3louinlineContent-gridContainer" data-mesh-internal="true">
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:610px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlis9">
                                                            <h6 class="font_6">Instructions</h6>
                                                            <h6 class="font_8">Please proceed to Practice after reading all the instructions by clicking on all the links</h6>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:42px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlis72">
                                                            
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlisa">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a target="_self"  onclick="href='/home/?task_type='+'`+mm+`'+'&workerId='+'`+workerID+``+clkstatus+`'+'&def=true&block='+'`+block+`'"  ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Definition</span></span></span></span></a>
															<div >
                                                                `+val_def+`
                                                                </div>
                                                                </span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlise">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a target="_self"  onclick="href='/home/?task_type='+'`+mm+`'+'&workerId='+'`+workerID+``+clkstatus+`'+'&vtask=true&block='+'`+block+`'" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">About the t</span></span></span><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">ask</span></span></span></span></a><div >`+val_task+`</div></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlisr">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a target="_self"  onclick="href='/home/?task_type='+'`+mm+`'+'&workerId='+'`+workerID+``+clkstatus+`'+'&exmp=true&block='+'`+block+`'"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Example</span></span></span></span></a><div >`+val_example+`</div></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlist1">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a target="_self"  onclick="href='/home/?task_type='+'`+mm+`'+'&workerId='+'`+workerID+``+clkstatus+`'+'&trig=true&block='+'`+block+`'"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Trigger Alert</span></span></span></span></a><div >`+val_trig+`</div></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlisw">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a target="_self"  onclick="href='/home/?task_type='+'`+mm+`'+'&workerId='+'`+workerID+``+clkstatus+`'+'&cons=true&block='+'`+block+`'"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">What you should consider</span></span></span></span></a>
															<div >`+val_cons+`</div></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlisx1">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a target="_self"  onclick="href='/home/?task_type='+'`+mm+`'+'&workerId='+'`+workerID+``+clkstatus+`'+'&ask=true&block='+'`+block+`'"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">What you need to ask yourself</span></span></span></span></a>
															<div >`+val_ask+`</div></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlit0">
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlit2">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;"></span></span></span></span></a></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlith">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a target="_self"  onclick="href='/home/?task_type='+'`+mm+`'+'&workerId='+'`+workerID+``+clkstatus+`'+'&report=true&block='+'`+block+`'"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">How to report</span></span></span></span></a>
															<div >`+val_report+`</div></span></h2>
                                                        </div>
                                                        <div id="comp-kfwzlitn1" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="270" data-height="38" style="top:;bottom:;left:;right:;width:350px;height:38px;position:" class="b1" data-state="desktop shouldUseFlex center"><a target="_self" onclick="`+link_to_main+`" id="comp-kfwzlitn1link" class="g-transparent-a b1link"><span id="comp-kfwzlitn1label" class="b1label">`+btn_message+`</span></a></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <div id="soapAfterPagesContainer" class="page-without-sosp">
                            <style id="soapAfterPagesContainer-mesh-styles">
                                #soapAfterPagesContainerinlineContent {
                                height: auto;
                                width: 100%;
                                position: relative;
                                }
                                #soapAfterPagesContainerinlineContent-gridWrapper {
                                pointer-events: none;
                                }
                                #soapAfterPagesContainerinlineContent-gridContainer {
                                position: static;
                                display: grid;
                                height: auto;
                                width: 100%;
                                min-height: auto;
                                grid-template-rows: 1fr;
                                grid-template-columns: 100%;
                                padding-bottom: 0px;
                                box-sizing: border-box;
                                }
                                #comp-j1rtn0ml {
                                position: relative;
                                margin: 6px 0 0 0;
                                left: 0;
                                grid-area: 1 / 1 / 2 / 2;
                                justify-self: stretch;
                                align-self: start;
                                }
                                #CONTROLLER_COMP_CUSTOM_ID {
                                position: absolute;
                                top: -288px;
                                left: 20px;
                                }
                                #soapAfterPagesContainercenteredContent {
                                position: relative;
                                }
                                #soapAfterPagesContainerinlineContent-gridContainer > * {
                                pointer-events: auto;
                                }
                                #soapAfterPagesContainerinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                pointer-events: none;
                                }
                                #soapAfterPagesContainerinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                pointer-events: auto;
                                }
                            </style>
                            <div id="soapAfterPagesContainerinlineContent-gridWrapper" data-mesh-internal="true">
                                <div id="soapAfterPagesContainerinlineContent-gridContainer" data-mesh-internal="true">
                                    <div data-border-width="1px" style="transform-origin:center 0.5px;left:0;margin-left:0;width:100%;min-width:initial;top:;bottom:;right:;height:5px;position:;display:none" class="style-jr9629o5" id="comp-j1rtn0ml"></div>
                                    <div style="width:;height:;top:;bottom:;left:;right:;position:;display:none" class="style-k6auwcww" id="CONTROLLER_COMP_CUSTOM_ID"></div>
                                </div>
                            </div>
                        </div>
                        <footer style="bottom:auto;left:0;margin-left:0;width:100%;min-width:980px;top:;right:;position:;display:none" class="style-k7ugjln5_footer style-k7ugjln5" tabindex="-1" data-site-width="980" data-fixedposition="false" data-isrunninginmobile="false" data-is-absolute-layout="false" data-state=" " id="SITE_FOOTER">
                            <div style="left:0;width:100%" id="SITE_FOOTERscreenWidthBackground" class="style-k7ugjln5screenWidthBackground">
                                <div class="style-k7ugjln5_bg"></div>
                            </div>
                            <div style="width:100%" id="SITE_FOOTERcenteredContent" class="style-k7ugjln5centeredContent">
                                <div style="margin-left:calc((100% - 980px) / 2);width:980px" id="SITE_FOOTERbg" class="style-k7ugjln5bg"></div>
                                <div id="SITE_FOOTERinlineContent" class="style-k7ugjln5inlineContent">
                                    <style id="SITE_FOOTER-mesh-styles">
                                        #SITE_FOOTERinlineContent {
                                        height: auto;
                                        width: 100%;
                                        position: relative;
                                        }
                                        #SITE_FOOTERinlineContent-gridWrapper {
                                        pointer-events: none;
                                        }
                                        #SITE_FOOTERinlineContent-gridContainer {
                                        position: static;
                                        display: grid;
                                        height: auto;
                                        width: 100%;
                                        min-height: 423px;
                                        grid-template-rows: min-content min-content min-content min-content min-content 1fr;
                                        grid-template-columns: 100%;
                                        }
                                        #comp-j1rq4r8m {
                                        position: relative;
                                        margin: 60px 0px 25px calc((100% - 980px) * 0.5);
                                        left: -1px;
                                        grid-area: 1 / 1 / 4 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-j9zs014r {
                                        position: relative;
                                        margin: 0px 0px 19px calc((100% - 980px) * 0.5);
                                        left: 0px;
                                        grid-area: 5 / 1 / 6 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-k6huwtfd {
                                        position: relative;
                                        margin: 60px 0px 46px calc((100% - 980px) * 0.5);
                                        left: 650px;
                                        grid-area: 1 / 1 / 2 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-k6hsf3rx {
                                        position: relative;
                                        margin: 0px 0px 40px calc((100% - 980px) * 0.5);
                                        left: 610px;
                                        grid-area: 2 / 1 / 3 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-k6hsf3sr {
                                        position: relative;
                                        margin: 0px 0px -7px calc((100% - 980px) * 0.5);
                                        left: 680px;
                                        grid-area: 4 / 1 / 5 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-jhi0p1w8 {
                                        position: relative;
                                        margin: 0px 0px 10px calc((100% - 980px) * 0.5);
                                        left: 0px;
                                        grid-area: 6 / 1 / 7 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #SITE_FOOTERcenteredContent {
                                        position: relative;
                                        }
                                        #SITE_FOOTERinlineContent-gridContainer > * {
                                        pointer-events: auto;
                                        }
                                        #SITE_FOOTERinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                        pointer-events: none;
                                        }
                                        #SITE_FOOTERinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                        pointer-events: auto;
                                        }
                                    </style>
                                    <div id="SITE_FOOTERinlineContent-gridWrapper" data-mesh-internal="true">
                                        <div id="SITE_FOOTERinlineContent-gridContainer" data-mesh-internal="true">
                                            <div data-packed="false" data-vertical-text="false" style="top:;bottom:;left:;right:;width:253px;height:auto;position:;display:none;min-height:120px;pointer-events:none" data-min-height="120" class="txtNew" id="comp-j1rq4r8m">
                                                <p class="font_8" style="font-size:22px;"><span style="font-size:22px;"><span class="color_18"><span style="text-decoration:underline;"><span style="font-weight:bold;">ADDRESS:</span></span></span></span></p>
                                                <p class="font_8" style="font-size:22px;"><span style="font-size:22px;"><span class="color_18"><span style="text-decoration:underline;"><span style="font-weight:bold;"><span class="wixGuard"></span></span></span></span></span></p>
                                                <p class="font_8">Skyrocket Partnerships Ltd</p>
                                                <p class="font_8">Unit A, Kingsholm Mews,</p>
                                                <p class="font_8">76 Kingsholm Road</p>
                                                <p class="font_8">Gloucester</p>
                                                <p class="font_8">GL1 3BD</p>
                                            </div>
                                            <div data-is-responsive="false" style="width:118px;height:30px;top:;bottom:;left:;right:;position:;display:none" data-hide-prejs="true" class="lb1" id="comp-j9zs014r">
                                                <ul aria-label="Social bar" id="comp-j9zs014ritemsContainer" class="lb1itemsContainer">
                                                    <li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r0image">
                                                        <a href="https://www.facebook.com/skyrocketpartnerships/" target="_blank" data-content="https://www.facebook.com/skyrocketpartnerships/" data-type="external" rel="noopener" id="comp-j9zs014r0imagelink" class="lb1imageItemlink">
                                                            <wix-image style="width:30px;height:30px;position:absolute" data-has-bg-scroll-effect="" data-image-info="{&quot;imageData&quot;:{&quot;type&quot;:&quot;Image&quot;,&quot;id&quot;:&quot;dataItem-j9zs017t1&quot;,&quot;metaData&quot;:{&quot;pageId&quot;:&quot;masterPage&quot;,&quot;isPreset&quot;:false,&quot;schemaVersion&quot;:&quot;1.0&quot;,&quot;isHidden&quot;:false},&quot;title&quot;:&quot;Facebook - White Circle&quot;,&quot;uri&quot;:&quot;e0678ef25486466ba65ef6ad47b559e1.png&quot;,&quot;width&quot;:200,&quot;height&quot;:200,&quot;alt&quot;:&quot;Facebook - White Circle&quot;,&quot;link&quot;:{&quot;type&quot;:&quot;ExternalLink&quot;,&quot;id&quot;:&quot;dataItem-j9zs017u&quot;,&quot;metaData&quot;:{&quot;pageId&quot;:&quot;masterPage&quot;,&quot;isPreset&quot;:false,&quot;schemaVersion&quot;:&quot;1.0&quot;,&quot;isHidden&quot;:false},&quot;url&quot;:&quot;https://www.facebook.com/skyrocketpartnerships/&quot;,&quot;target&quot;:&quot;_blank&quot;},&quot;displayMode&quot;:&quot;fill&quot;},&quot;containerId&quot;:&quot;comp-j9zs014r&quot;,&quot;displayMode&quot;:&quot;fill&quot;}" data-has-ssr-src="" data-is-svg="false" data-is-svg-mask="false" id="comp-j9zs014r0imageimage" class="lb1imageItemimage"><img id="comp-j9zs014r0imageimageimage" alt="Facebook - White Circle" data-type="image" itemProp="image"/></wix-image>
                                                        </a>
                                                    </li>
                                                    <li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r1image">
                                                        <a href="https://twitter.com/SkyrocketUK" target="_blank" data-content="https://twitter.com/SkyrocketUK" data-type="external" rel="noopener" id="comp-j9zs014r1imagelink" class="lb1imageItemlink">
                                                            <wix-image style="width:30px;height:30px;position:absolute" data-has-bg-scroll-effect="" data-image-info="{&quot;imageData&quot;:{&quot;type&quot;:&quot;Image&quot;,&quot;id&quot;:&quot;dataItem-j9zs017v&quot;,&quot;metaData&quot;:{&quot;pageId&quot;:&quot;masterPage&quot;,&quot;isPreset&quot;:false,&quot;schemaVersion&quot;:&quot;1.0&quot;,&quot;isHidden&quot;:false},&quot;title&quot;:&quot;Twitter - White Circle&quot;,&quot;uri&quot;:&quot;c4392d634a0148fda8b7b2b0ad98293b.png&quot;,&quot;width&quot;:200,&quot;height&quot;:200,&quot;alt&quot;:&quot;Twitter - White Circle&quot;,&quot;link&quot;:{&quot;type&quot;:&quot;ExternalLink&quot;,&quot;id&quot;:&quot;dataItem-j9zs017w&quot;,&quot;metaData&quot;:{&quot;pageId&quot;:&quot;masterPage&quot;,&quot;isPreset&quot;:false,&quot;schemaVersion&quot;:&quot;1.0&quot;,&quot;isHidden&quot;:false},&quot;url&quot;:&quot;https://twitter.com/SkyrocketUK&quot;,&quot;target&quot;:&quot;_blank&quot;},&quot;displayMode&quot;:&quot;fill&quot;},&quot;containerId&quot;:&quot;comp-j9zs014r&quot;,&quot;displayMode&quot;:&quot;fill&quot;}" data-has-ssr-src="" data-is-svg="false" data-is-svg-mask="false" id="comp-j9zs014r1imageimage" class="lb1imageItemimage"><img id="comp-j9zs014r1imageimageimage" alt="Twitter - White Circle" data-type="image" itemProp="image"/></wix-image>
                                                        </a>
                                                    </li>
                                                    <li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r2image">
                                                        <a href="https://www.linkedin.com/company/27100983/" target="_blank" data-content="https://www.linkedin.com/company/27100983/" data-type="external" rel="noopener" id="comp-j9zs014r2imagelink" class="lb1imageItemlink">
                                                            <wix-image style="width:30px;height:30px;position:absolute" data-has-bg-scroll-effect="" data-image-info="{&quot;imageData&quot;:{&quot;type&quot;:&quot;Image&quot;,&quot;id&quot;:&quot;dataItem-j9zs017x&quot;,&quot;metaData&quot;:{&quot;pageId&quot;:&quot;masterPage&quot;,&quot;isPreset&quot;:false,&quot;schemaVersion&quot;:&quot;1.0&quot;,&quot;isHidden&quot;:false},&quot;title&quot;:&quot;LinkedIn - White Circle&quot;,&quot;uri&quot;:&quot;f61c7a3b4b4947b28511a25034973383.png&quot;,&quot;width&quot;:200,&quot;height&quot;:200,&quot;alt&quot;:&quot;LinkedIn - White Circle&quot;,&quot;link&quot;:{&quot;type&quot;:&quot;ExternalLink&quot;,&quot;id&quot;:&quot;dataItem-j9zs017x1&quot;,&quot;metaData&quot;:{&quot;pageId&quot;:&quot;masterPage&quot;,&quot;isPreset&quot;:false,&quot;schemaVersion&quot;:&quot;1.0&quot;,&quot;isHidden&quot;:false},&quot;url&quot;:&quot;https://www.linkedin.com/company/27100983/&quot;,&quot;target&quot;:&quot;_blank&quot;},&quot;displayMode&quot;:&quot;fill&quot;},&quot;containerId&quot;:&quot;comp-j9zs014r&quot;,&quot;displayMode&quot;:&quot;fill&quot;}" data-has-ssr-src="" data-is-svg="false" data-is-svg-mask="false" id="comp-j9zs014r2imageimage" class="lb1imageItemimage"><img id="comp-j9zs014r2imageimageimage" alt="LinkedIn - White Circle" data-type="image" itemProp="image"/></wix-image>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div data-packed="false" data-vertical-text="false" style="top:;bottom:;left:;right:;width:219px;height:auto;position:;display:none;min-height:25px;pointer-events:none" data-min-height="25" class="txtNew" id="comp-k6huwtfd">
                                                <p class="font_8" style="font-size:25px;"><span style="font-size:25px;"><span class="color_18"><span style="text-decoration:underline;"><span style="font-weight:bold;">Skyrocket Partners</span></span></span></span></p>
                                            </div>
                                            <div data-height-diff="0" data-width-diff="0" data-num-cols="2" data-max-rows="3" data-margin="15" data-is-mesh="true" style="overflow:hidden;top:;bottom:;left:;right:;width:285px;height:79px;position:;display:none" class="style-k6hsf3sb" data-state="hidePlayButton autoplayOff idle notMobile desktopView touchRollOut" id="comp-k6hsf3rx">
                                                <div data-gallery-id="comp-k6hsf3rx" class="style-k6hsf3sb_show-counter style-k6hsf3sbitemsContainer" style="position:relative;overflow:hidden;width:285px;height:79px" id="comp-k6hsf3rxitemsContainer">
                                                    <div style="transform:none;position:absolute;width:135px;height:79px;left:0;top:0;overflow:hidden;clip:auto" data-has-bg-scroll-effect="" data-style="position:absolute;overflow:hidden;clip:auto" data-gallery-id="comp-k6hsf3rx" data-page-desc="curr" data-query="dataItem-k6hsf5hc4" data-image-index="0" class="style-k6hsf3sbimg" id="comp-k6hsf3rxdataItem-k6hsf5hc4"><img id="comp-k6hsf3rxdataItem-k6hsf5hc4image" alt="" data-type="image" itemProp="image"/></div>
                                                    <div style="transform:none;position:absolute;width:135px;height:79px;left:150px;top:0;overflow:hidden;clip:auto" data-has-bg-scroll-effect="" data-style="position:absolute;overflow:hidden;clip:auto" data-gallery-id="comp-k6hsf3rx" data-page-desc="curr" data-query="dataItem-k6hsf5hc" data-image-index="1" class="style-k6hsf3sbimg" id="comp-k6hsf3rxdataItem-k6hsf5hc"><img id="comp-k6hsf3rxdataItem-k6hsf5hcimage" alt="" data-type="image" itemProp="image"/></div>
                                                </div>
                                                <div style="visibility:hidden;cursor:pointer" data-gallery-id="comp-k6hsf3rx" data-hovered-image-id="" id="comp-k6hsf3rxrolloverHolder" class="style-k6hsf3sbrolloverHolder">
                                                    <h3 data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxtitle" class="style-k6hsf3sbtitle"></h3>
                                                    <p data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxdescription" class="style-k6hsf3sbdescription"></p>
                                                    <a id="comp-k6hsf3rxlink" class="style-k6hsf3sblink"></a><a href="#" style="height:100%;display:block;width:100%;position:absolute;top:0px;left:0px;background-color:#ffffff;filter:alpha(opacity=0);opacity:0;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-drag:none;-webkit-user-drag:none;-moz-user-drag:none;-ms-user-drag:none;user-modify:read-only;-webkit-user-modify:read-only;-moz-user-modify:read-only;-ms-user-modify:read-only"></a>
                                                </div>
                                                <div class="style-k6hsf3sb_buttons"><a data-gallery-id="comp-k6hsf3rx" style="visibility:hidden" id="comp-k6hsf3rxbuttonPrev" class="style-k6hsf3sbbuttonPrev"></a><a data-gallery-id="comp-k6hsf3rx" style="visibility:hidden" id="comp-k6hsf3rxbuttonNext" class="style-k6hsf3sbbuttonNext"></a></div>
                                                <div style="visibility:visible" data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxcounter" class="style-k6hsf3sb_hlp style-k6hsf3sb_opc style-k6hsf3sbcounter">1/1</div>
                                                <div data-gallery-id="comp-k6hsf3rx" style="cursor:pointer;visibility:hidden" id="comp-k6hsf3rxautoplay" class="style-k6hsf3sb_hlp style-k6hsf3sb_opc style-k6hsf3sbautoplay"><span></span></div>
                                                <div id="comp-k6hsf3rxemptyDivToFillMatrix" class="style-k6hsf3sbemptyDivToFillMatrix"></div>
                                            </div>
                                            <div id="comp-k6hsf3sr" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="131" data-height="35" style="top:;bottom:;left:;right:;width:131px;height:35px;position:;display:none" class="style-k6hsf3t3" data-state="desktop shouldUseFlex center"><a href="https://www.skyrocket.org.uk/aboutus" target="_self" id="comp-k6hsf3srlink" class="g-transparent-a style-k6hsf3t3link"><span id="comp-k6hsf3srlabel" class="style-k6hsf3t3label">Find out more</span></a></div>
                                            <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:109px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-jhi0p1w8">
                                                <p class="font_9" style="text-align:center; font-size:14px;"><span style="font-size:14px;"><span class="color_11"><span style="text-decoration:underline;"><a href="https://www.skyrocket.org.uk/privacy-policy" target="_self">privacy policy</a></span></span></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
                <div id="aspectCompsContainer" class="siteAspectsContainer">
                    <div style="position:absolute" id="popoverLayer"></div>
                    <wix-iframe style="top:;bottom:;left:;right:;position:;overflow:hidden;visibility:hidden" data-has-iframe="true" data-src="https://apps.wix.com/members-area/app-worker?cacheKiller=1601929839219&amp;commonConfig=%7B%7BcommonConfig%7D%7D&amp;compId=tpaWorker_9180&amp;consent-policy=%7B%7BconsentPolicy%7D%7D&amp;deviceType=desktop&amp;endpointType=worker&amp;instance=37Ot7cP4bMyyiyHtHdjS8ikE0zMaspcQ2fpX5QpwXGU.eyJpbnN0YW5jZUlkIjoiZWI5OWQ0NWItZThkMS00N2ZmLWE2ZWEtMGNhNDllMDExY2Q2IiwiYXBwRGVmSWQiOiIxNGNlMjhmNy03ZWIwLTM3NDUtMjJmOC0wNzRiMGUyNDAxZmIiLCJtZXRhU2l0ZUlkIjoiZTk4ZGRjM2MtM2E2Yy00Zjk5LTg3YTMtZGQ1M2U5YjdhOWNlIiwic2lnbkRhdGUiOiIyMDIwLTEwLTA1VDIwOjM0OjM5LjM5NloiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjE4YjQ1NTM2LWFiZmYtNGY3Zi1hMjdmLTRhNGY5MGEyYTQ3MSIsImJpVG9rZW4iOiIwMjE0MDg2Ny1kMmJkLTA4NjYtMjE0OS1kMWY3NzdiNmI1MTgiLCJzaXRlT3duZXJJZCI6IjU3NThjNGIzLWVkODYtNDdkYi05Yjc3LWQ4YjZhNjAyZmI3ZiJ9&amp;locale=en&amp;siteRevision=1374&amp;viewMode=site&amp;viewerCompId=tpaWorker_9180" data-is-tpa="true" data-app-definition-id="14ce28f7-7eb0-3745-22f8-074b0e2401fb" id="tpaWorker_9180" class="s_DtaksTPAWidgetSkin">
                        <iframe data-src="https://apps.wix.com/members-area/app-worker?cacheKiller=1601929839219&amp;commonConfig=%7B%7BcommonConfig%7D%7D&amp;compId=tpaWorker_9180&amp;consent-policy=%7B%7BconsentPolicy%7D%7D&amp;deviceType=desktop&amp;endpointType=worker&amp;instance=37Ot7cP4bMyyiyHtHdjS8ikE0zMaspcQ2fpX5QpwXGU.eyJpbnN0YW5jZUlkIjoiZWI5OWQ0NWItZThkMS00N2ZmLWE2ZWEtMGNhNDllMDExY2Q2IiwiYXBwRGVmSWQiOiIxNGNlMjhmNy03ZWIwLTM3NDUtMjJmOC0wNzRiMGUyNDAxZmIiLCJtZXRhU2l0ZUlkIjoiZTk4ZGRjM2MtM2E2Yy00Zjk5LTg3YTMtZGQ1M2U5YjdhOWNlIiwic2lnbkRhdGUiOiIyMDIwLTEwLTA1VDIwOjM0OjM5LjM5NloiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjE4YjQ1NTM2LWFiZmYtNGY3Zi1hMjdmLTRhNGY5MGEyYTQ3MSIsImJpVG9rZW4iOiIwMjE0MDg2Ny1kMmJkLTA4NjYtMjE0OS1kMWY3NzdiNmI1MTgiLCJzaXRlT3duZXJJZCI6IjU3NThjNGIzLWVkODYtNDdkYi05Yjc3LWQ4YjZhNjAyZmI3ZiJ9&amp;locale=en&amp;siteRevision=1374&amp;viewMode=site&amp;viewerCompId=tpaWorker_9180" scrolling="no" frameBorder="0" allow="autoplay; camera; microphone; geolocation;" allowtransparency="true" allowfullscreen="" name="tpaWorker_9180" style="display:none;position:absolute;z-index:" title="Profile Card" aria-label="Profile Card" id="tpaWorker_9180iframe" class="s_DtaksTPAWidgetSkiniframe"></iframe>
                        <div id="tpaWorker_9180overlay" class="s_DtaksTPAWidgetSkinoverlay"></div>
                    </wix-iframe>
                </div>
                <div id="SCROLL_TO_BOTTOM" tabindex="-1" aria-label="bottom of page" role="region" style="height:0"></div>
                <script id="partiallyVisibleBeat">
                    if (window.wixBiSession) {
                    wixBiSession.isUsingMesh = true;
                    if (wixBiSession.sendBeat) {
                    wixBiSession.sendBeat(12, 'Partially visible', '&pid=j3lou');
                    }
                    }
                    if (window.requestCloseWelcomeScreen) {
                    requestCloseWelcomeScreen();
                    }
                </script>
            </div>
            <div class="font-ruler-container" style="overflow:hidden;visibility:hidden;max-height:0;max-width:0;position:absolute">
                <style>.font-ruler-content::after {content:"@#$%%^&*~IAO"}</style>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
            </div>
        </div>
        
       
    </body>
</html> 
     
              `);
              
                    
       //res.end();
               
      //next();
     



   });

   app.get('/home1', function(req, res) {

    var reqQueryObject = req.query 
    console.log(req.url);
    workerID = req.query.workerId; // returns "1235441
    val_def="";
    val_task="";
    val_example="";
    val_trig="";
    val_cons="";
    val_ask="";
    val_report="";
    task=parseInt(req.query.task_type);
    mm = req.query.task_type;


    if( Number(mm) == 2 ) {
        val_def="Persuasion is an attempt to influence someone's beliefs, attitudes, and intentions. Emotional persuasion is Persuasion through the attempt to arouse emotions, for example, Fear, anxiety, shame, guilt, surprise, joy, anger, happiness. Emotional persuasion can also appeal to expected emotions - for example, conveying that if you believe something or perform some action you're intending, you will feel sad\lonely\happy, regret, etc. "
        val_task="Persuasion is an attempt to influence someone's beliefs, attitudes, and intentions.";
        val_example="Disgusting. Content creators paying the price of youtube's failures and bad parenting. This cannot stand. The way he speaks about suing creators makes my skin crawl. This is something that affects everyone. The freedom of internet creativity itself is being threatened imo. eugh. https://t.co/7M0fEIX7w8";
        val_trig="Some text may contain triggered subjects, bad words, etc. ";
        val_cons="There can be various ways in which beliefs, attitudes or intentions can be influenced, e.g. they might be changed, enhanced, reinforced (i.e. same attitude but more certain), strengthened, diminished, etc. Persuasion is not just telling someone something he didnâ€™t know before. It's only an attempt to persuade if it's intended to affect his beliefs, attitudes or intentions. ";
        val_ask="1. Do you think this text may persuade someone? Affect someone's beliefs? attitudes? intentions? 2. Beliefs\ attitudes\ intentions toward what? If you can't answer those two questions then the answer is NO. ";
        val_report="If the tweet text that appears on the screen is in line with the definition we've given, click on the 'Yes' button, if it doesn't click on the 'No' button. ";
    }
    if( Number(mm) == 1 ) {
        val_task="In this HIT you will be presented with 30 tweets in a variety of subjects. Your job is to look through them and mark any ones that you think contains a persuasion attempt. Your job is to look through a series of tweets and mark any ones that are related to persuasion. You will be paid a flat fee of 4$ for your work";
        val_example="The idea that Medicare For All is impossible is being promoted by corporate special interests but imagine being an ordinary person and buying this. Believing you live in a country that can send people to the moon but not to the doctor";
        val_trig="Some text may contain triggered subjects, bad words, etc.";
        val_cons="There can be various ways in which beliefs, attitudes or intentions can be influenced, e.g. they might be changed, enhanced, reinforced (i.e. same attitude but more certain), strengthened, diminished, etc. Persuasion is not just telling someone something he didn't know before. It's only an attempt to persuade if it's intended to affect his beliefs, attitudes or intentions.";
        val_ask="1. Do you think this text may persuade someone? Affect someone's beliefs? attitudes? intentions? 2. Beliefs\ attitudes\ intentions toward what? If you can't answer those two questions then the answer is NO.";
        val_report="If the tweet text that appears on the screen is in line with the definition we've given, click on the 'Yes' button, if it doesn't click on the 'No' button.";
        val_def="Persuasion is an attempt to influence someone's beliefs, attitudes, and intentions."
    }
    if( Number(mm) == 3 ) {
        val_task="In this HIT you will be presented with 30 tweets in a variety of subjects. Your job is to look through them and mark any ones that you think contains a persuasion attempt. Your job is to look through a series of tweets and mark any ones that are related to persuasion. You will be paid a flat fee of 4$ for your work ";
        val_example="I think a lot about Mitski's supposed cause for global warming... about how it's a result of the planet's people wanting too much. Such a forgiving and yet still culpable narrative, I think as I drive my fuel inefficient vehicle. In this essay I will...";
        val_trig="Some text may contain triggered subjects, bad words, etc. ";
        val_cons="There can be various ways in which beliefs, attitudes or intentions can be influenced, e.g. they might be changed, enhanced, reinforced (i.e. same attitude but more certain), strengthened, diminished, etc. Persuasion is not just telling someone something he didn't know before. It's only an attempt to persuade if it's intended to affect his beliefs, attitudes or intentions. ";
        val_ask="1. Do you think this text may persuade someone? Affect someone's beliefs? attitudes? intentions? 2. Beliefs\ attitudes\ intentions toward what? If you can't answer those two questions then the answer is NO. ";
        val_report="If the tweet text that appears on the screen is in line with the definition we've given, click on the 'Yes' button, if it doesn't click on the 'No' button. ";
        val_def="Persuasion is an attempt to influence someone's beliefs, attitudes, and intentions. Cognitive persuasion is persuasion by implying a thought by facts, logic, and argument. "
    }
    if( Number(mm) == 4 ) {
        val_task="In this HIT you will be presented with 30 tweets in a variety of subjects. Your job is to look through them and mark any ones that you think contains a persuasion attempt. Your job is to look through a series of tweets and mark any ones that are related to persuasion. You will be paid a flat fee of 4$ for your work ";
        val_example="why do you always base success on how well a group does in the US? For a Chinese group that has never even set foot in the US, never mind promoted there, why do you think you're making points? https://t.co/NEyjOZeWr3 ";
        val_trig="Some text may contain triggered subjects, bad words, etc. ";
        val_cons="There can be various ways in which beliefs, attitudes or intentions can be influenced, e.g. they might be changed, enhanced, reinforced (i.e. same attitude but more certain), strengthened, diminished, etc. Persuasion is not just telling someone something he didn't know before. It's only an attempt to persuade if it's intended to affect his beliefs, attitudes or intentions. ";
        val_ask="1. Do you think this text may persuade someone? Affect someoneâ€™s beliefs? attitudes? intentions? 2. Beliefs\ attitudes\ intentions toward what? If you can't answer those two questions then the answer is NO. ";
        val_report="If the tweet text that appears on the screen is in line with the definition we've given, click on the 'Yes' button, if it doesn't click on the 'No' button. ";
        val_def="Persuasion is an attempt to influence someone's beliefs, attitudes, and intentions. Normative persuasion includes a quantitative comparison to a reference group (e.g. men, women, citizens, part of a local community, age groups, our colleagues etc.) for the purpose of implying what is normal or normative "
    }

    
    
     res.write(`

     <!DOCTYPE html>
     <html lang="en">
        <head>
           <title>Tweet</title>
		   <style>

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}
</style>
        </head>
    <body class="prewarmup">
        <script type="text/javascript">
            var htmlClassList = document.documentElement.classList;
            
            var bodyCacheable = true;
            wixBiSession.setCaching(bodyCacheable);
            
            var clientSideRender = false;
        </script>
        <!--body start html embeds start-->
        <!--body start html embeds end-->
        <script id="wix-first-paint">
            if (window.ResizeObserver &&
            (!window.PerformanceObserver || !PerformanceObserver.supportedEntryTypes || PerformanceObserver.supportedEntryTypes.indexOf('paint') === -1)) {
            new ResizeObserver(function (entries, observer) {
            entries.some(function (entry) {
            var contentRect = entry.contentRect;
            if (contentRect.width > 0 && contentRect.height > 0) {
            requestAnimationFrame(function (now) {
            window.wixFirstPaint = now;
            dispatchEvent(new CustomEvent('wixFirstPaint'));
            });
            observer.disconnect();
            return true;
            }
            });
            }).observe(document.body);
            }
        </script>
        <div id="SITE_CONTAINER">
            <style type="text/css" data-styleid="uploadedFonts"></style>
            <div>
                <style type="text/css" data-styleid="theme_fonts">.font_0 {font: normal normal normal 30px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#FFB703;}
                    .font_1 {font: normal normal normal 14px/1.43em 'Open Sans',sans-serif ;color:#12110F;}
                    .font_2 {font: normal normal normal 48px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;}
                    .font_3 {font: normal normal normal 48px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;}
                    .font_4 {font: normal normal normal 72px/1.111em impact,impact-w01-2010,impact-w02-2010,impact-w10-2010,sans-serif ;color:#12110F;}
                    .font_5 {font: normal normal normal 56px/1.161em impact,impact-w01-2010,impact-w02-2010,impact-w10-2010,sans-serif ;color:#12110F;}
                    .font_6 {font: normal normal normal 28px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;}
                    .font_7 {font: normal normal normal 18px/1.4em roboto-bold,roboto,sans-serif ;color:#12110F;}
                    .font_8 {font: normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;color:#FFFFFF;}
                    .font_9 {font: normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;color:#12110F;}
                    .font_10 {font: normal normal normal 14px/1.43em 'Open Sans',sans-serif ;color:#12110F;}
                </style>
                <style type="text/css" data-styleid="theme_colors">.color_0 {color: #FFFFFF;}
                    .backcolor_0 {background-color: #FFFFFF;}
                    .color_1 {color: #FFFFFF;}
                    .backcolor_1 {background-color: #FFFFFF;}
                    .color_2 {color: #000000;}
                    .backcolor_2 {background-color: #000000;}
                    .color_3 {color: #ED1C24;}
                    .backcolor_3 {background-color: #ED1C24;}
                    .color_4 {color: #0088CB;}
                    .backcolor_4 {background-color: #0088CB;}
                    .color_5 {color: #FFCB05;}
                    .backcolor_5 {background-color: #FFCB05;}
                    .color_6 {color: #727272;}
                    .backcolor_6 {background-color: #727272;}
                    .color_7 {color: #B0B0B0;}
                    .backcolor_7 {background-color: #B0B0B0;}
                    .color_8 {color: #FFFFFF;}
                    .backcolor_8 {background-color: #FFFFFF;}
                    .color_9 {color: #727272;}
                    .backcolor_9 {background-color: #727272;}
                    .color_10 {color: #B0B0B0;}
                    .backcolor_10 {background-color: #B0B0B0;}
                    .color_11 {color: #FFFFFF;}
                    .backcolor_11 {background-color: #FFFFFF;}
                    .color_12 {color: #B8B5AE;}
                    .backcolor_12 {background-color: #B8B5AE;}
                    .color_13 {color: #75736D;}
                    .backcolor_13 {background-color: #75736D;}
                    .color_14 {color: #363430;}
                    .backcolor_14 {background-color: #363430;}
                    .color_15 {color: #12110F;}
                    .backcolor_15 {background-color: #12110F;}
                    .color_16 {color: #FFF0CC;}
                    .backcolor_16 {background-color: #FFF0CC;}
                    .color_17 {color: #FFDB81;}
                    .backcolor_17 {background-color: #FFDB81;}
                    .color_18 {color: #FFB703;}
                    .backcolor_18 {background-color: #FFB703;}
                    .color_19 {color: #AA7A02;}
                    .backcolor_19 {background-color: #AA7A02;}
                    .color_20 {color: #553D01;}
                    .backcolor_20 {background-color: #553D01;}
                    .color_21 {color: #D3D4D6;}
                    .backcolor_21 {background-color: #D3D4D6;}
                    .color_22 {color: #A8A9AD;}
                    .backcolor_22 {background-color: #A8A9AD;}
                    .color_23 {color: #7E7F82;}
                    .backcolor_23 {background-color: #7E7F82;}
                    .color_24 {color: #545557;}
                    .backcolor_24 {background-color: #545557;}
                    .color_25 {color: #2A2A2B;}
                    .backcolor_25 {background-color: #2A2A2B;}
                    .color_26 {color: #FFFFFF;}
                    .backcolor_26 {background-color: #FFFFFF;}
                    .color_27 {color: #FFFFFF;}
                    .backcolor_27 {background-color: #FFFFFF;}
                    .color_28 {color: #EBEBEB;}
                    .backcolor_28 {background-color: #EBEBEB;}
                    .color_29 {color: #BEBEBE;}
                    .backcolor_29 {background-color: #BEBEBE;}
                    .color_30 {color: #727272;}
                    .backcolor_30 {background-color: #727272;}
                    .color_31 {color: #FFF1AB;}
                    .backcolor_31 {background-color: #FFF1AB;}
                    .color_32 {color: #FFEA82;}
                    .backcolor_32 {background-color: #FFEA82;}
                    .color_33 {color: #FFD504;}
                    .backcolor_33 {background-color: #FFD504;}
                    .color_34 {color: #AA8E03;}
                    .backcolor_34 {background-color: #AA8E03;}
                    .color_35 {color: #554701;}
                    .backcolor_35 {background-color: #554701;}
                </style>
            </div>
            <div id="CSS_CONTAINER"></div>
            <div data-aid="stylesContainer">
                <style type="text/css" data-styleid="style-k6auwcww">.style-k6auwcww {display:none;}</style>
                <style type="text/css" data-styleid="pc1">.pc1screenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .pc1[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
                    .pc1[data-state~="fixedPosition"].pc1_footer {top:auto;bottom:0;}
                    .pc1bg {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .pc1[data-is-absolute-layout="true"] > .pc1centeredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .pc1[data-is-absolute-layout="true"] > .pc1centeredContent > .pc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                </style>
                <style type="text/css" data-styleid="siteBackground">.siteBackground {width:100%;position:absolute;}
                    .siteBackgroundbgBeforeTransition {position:absolute;top:0;}
                    .siteBackgroundbgAfterTransition {position:absolute;top:0;}
                </style>
                <style type="text/css" data-styleid="style-k7ugjln5">.style-k7ugjln5screenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7ugjln5[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
                    .style-k7ugjln5[data-state~="fixedPosition"].style-k7ugjln5_footer {top:auto;bottom:0;}
                    .style-k7ugjln5_bg {position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.6); background-color:rgba(18, 17, 15, 0.81);border-top:0px solid rgba(18, 17, 15, 1);border-bottom:0px solid rgba(18, 17, 15, 1);background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/bevel_300.png);background-repeat:repeat-x;}
                    .style-k7ugjln5bg {position:absolute;top:0px;right:0;bottom:0px;left:0;}
                    .style-k7ugjln5[data-state~="mobileView"] .style-k7ugjln5bg {left:10px;right:10px;}
                    .style-k7ugjln5[data-is-absolute-layout="true"] > .style-k7ugjln5centeredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7ugjln5[data-is-absolute-layout="true"] > .style-k7ugjln5centeredContent > .style-k7ugjln5inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                </style>
                <style type="text/css" data-styleid="style-k7ugjugc">.style-k7ugjugcscreenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7ugjugc[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
                    .style-k7ugjugc[data-state~="fixedPosition"].style-k7ugjugc_footer {top:auto;bottom:0;}
                    .style-k7ugjugc_bg {position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.6); background-color:rgba(18, 17, 15, 1);border-top:0px solid rgba(18, 17, 15, 1);border-bottom:0px solid rgba(18, 17, 15, 1);background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/bevel_300.png);background-repeat:repeat-x;}
                    .style-k7ugjugcbg {position:absolute;top:0px;right:0;bottom:0px;left:0;}
                    .style-k7ugjugc[data-state~="mobileView"] .style-k7ugjugcbg {left:10px;right:10px;}
                    .style-k7ugjugc[data-is-absolute-layout="true"] > .style-k7ugjugccenteredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7ugjugc[data-is-absolute-layout="true"] > .style-k7ugjugccenteredContent > .style-k7ugjugcinlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                </style>
                <style type="text/css" data-styleid="style-kd8jx4k6">.style-kd8jx4k6bg {border:0px solid rgba(18, 17, 15, 1);background-color:rgba(255, 255, 255, 1);border-radius:0; position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-kd8jx4k6[data-is-absolute-layout="true"] > .style-kd8jx4k6inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                </style>
                <style type="text/css" data-styleid="txtNew">.txtNew {word-wrap:break-word;text-align:start;}
                    .txtNew_override-left * {text-align:left !important;}
                    .txtNew_override-right * {text-align:right !important;}
                    .txtNew_override-center * {text-align:center !important;}
                    .txtNew_override-justify * {text-align:justify !important;}
                    .txtNew > * {pointer-events:auto;}
                    .txtNew li {font-style:inherit;font-weight:inherit;line-height:inherit;letter-spacing:normal;}
                    .txtNew ol,.txtNew ul {padding-left:1.3em;padding-right:0;margin-left:0.5em;margin-right:0;line-height:normal;letter-spacing:normal;}
                    .txtNew ul {list-style-type:disc;}
                    .txtNew ol {list-style-type:decimal;}
                    .txtNew ul ul,.txtNew ol ul {list-style-type:circle;}
                    .txtNew ul ul ul,.txtNew ol ul ul {list-style-type:square;}
                    .txtNew ul ol ul,.txtNew ol ol ul {list-style-type:square;}
                    .txtNew ul[dir="rtl"],.txtNew ol[dir="rtl"] {padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;}
                    .txtNew ul[dir="rtl"] ul,.txtNew ul[dir="rtl"] ol,.txtNew ol[dir="rtl"] ul,.txtNew ol[dir="rtl"] ol {padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;}
                    .txtNew p {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h1 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h2 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h3 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h4 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h5 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew h6 {margin:0;line-height:normal;letter-spacing:normal;}
                    .txtNew a {color:inherit;}
                </style>
                <style type="text/css" data-styleid="style-jr9629o5">.style-jr9629o5 {box-sizing:border-box;border-top:1px solid rgba(255, 255, 255, 0.15);height:0;}</style>
                <style type="text/css" data-styleid="style-k7to9w85">.style-k7to9w85itemsContainer {width:calc(100% - 0px);height:calc(100% - 0px);white-space:nowrap;display:inline-block;overflow:visible;position:absolute;}
                    .style-k7to9w85moreContainer {overflow:visible;display:inherit;white-space:nowrap;width:auto;background-color:rgba(18, 17, 15, 1);border-radius:0; }
                    .style-k7to9w85dropWrapper {z-index:99999;display:block;opacity:1;visibility:hidden;position:absolute;margin-top:7px;}
                    .style-k7to9w85 > nav {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7to9w85dropWrapper[data-dropMode="dropUp"] {margin-top:0;margin-bottom:7px;}
                    .style-k7to9w85navContainer_with-validation-indication select:not([data-preview~="focus"]):invalid {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k7to9w85navContainer {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
                    .style-k7to9w85navContainer select {border-radius:0; -webkit-appearance:none;-moz-appearance:none; font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif; background-color:rgba(18, 17, 15, 1);color:#FFFFFF;border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-width:1px;border-left-width:0px;border-right-width:0px;margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;}
                    .style-k7to9w85navContainer select option {text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;}
                    .style-k7to9w85navContainer select.style-k7to9w85navContainer_placeholder-style {color:#12110F;}
                    .style-k7to9w85navContainer select.style-k7to9w85navContainer_extended-placeholder-style {color:#888888;}
                    .style-k7to9w85navContainer select:-moz-focusring {color:transparent;text-shadow:0 0 0 #000;}
                    .style-k7to9w85navContainer select::-ms-expand {display:none;}
                    .style-k7to9w85navContainer select:focus::-ms-value {background:transparent;}
                    .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):hover,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="hover"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(18, 17, 15, 1);}
                    .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):focus,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="focus"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-error="true"],.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="error"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):disabled,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-disabled="true"],.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="disabled"] {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;background-color:rgba(204, 204, 204, 1);}
                    .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):disabled + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-disabled="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="disabled"] + .style-k7to9w85navContainerarrow {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;border:none;}
                    .style-k7to9w85navContainerarrow {position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-left-width:1px;}
                    .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container {width:12px;}
                    .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container svg {height:100%;fill:rgba(184, 181, 174, 1);}
                    .style-k7to9w85navContainer_left-direction {text-align-last:left;}
                    .style-k7to9w85navContainer_left-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-right:0;}
                    .style-k7to9w85navContainer_left-direction .style-k7to9w85navContainerarrow {right:0;border-left-width:1px;}
                    .style-k7to9w85navContainer_right-direction {text-align-last:right;direction:rtl;}
                    .style-k7to9w85navContainer_right-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-left:0;}
                    .style-k7to9w85navContainer_right-direction .style-k7to9w85navContainerarrow {left:0;border-right-width:1px;}
                    .style-k7to9w85navContainer_center-direction {text-align-last:left;text-align-last:center;}
                    .style-k7to9w85navContainer_center-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-right:0;}
                    .style-k7to9w85navContainer_center-direction .style-k7to9w85navContainerarrow {right:0;border-left-width:1px;}
                    .style-k7to9w85navContainer_mobileMenuContainer {border:0;}
                    .style-k7to9w85navContainer_mobileMenuContainer .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container .style-k7to9w85navContainericon {fill:#FFFFFF;}
                    .style-k7to9w85navContainerlabel {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ; color:#12110F;word-break:break-word;display:inline-block;line-height:1;}
                    .style-k7to9w85navContainer_required .style-k7to9w85navContainerlabel::after {content:" *";color:transparent;}
                    .style-k7to9w85navContainer_selector-wrapper {-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;}
                    .style-k7to9w85repeaterButton {height:100%;position:relative;box-sizing:border-box;display:inline-block;cursor:pointer;font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif;}
                    .style-k7to9w85repeaterButton[data-state~="header"] a,.style-k7to9w85repeaterButton[data-state~="header"] div {cursor:default !important;}
                    .style-k7to9w85repeaterButtonlinkElement {display:inline-block;height:100%;width:100%;}
                    .style-k7to9w85repeaterButton_gapper {padding:0 5px;}
                    .style-k7to9w85repeaterButtonlabel {display:inline-block;padding:0 10px;color:#FFFFFF;transition:color 0.4s ease 0s;}
                    .style-k7to9w85repeaterButton[data-state~="drop"] {width:100%;display:block;}
                    .style-k7to9w85repeaterButton[data-state~="drop"] .style-k7to9w85repeaterButtonlabel {padding:0 .5em;}
                    .style-k7to9w85repeaterButton[data-state~="over"] .style-k7to9w85repeaterButtonlabel,.style-k7to9w85repeaterButton[data-preview~="hover"] .style-k7to9w85repeaterButtonlabel {color:#FFD504;transition:color 0.4s ease 0s;}
                    .style-k7to9w85repeaterButton[data-state~="selected"] .style-k7to9w85repeaterButtonlabel,.style-k7to9w85repeaterButton[data-preview~="active"] .style-k7to9w85repeaterButtonlabel {color:#FFD504;transition:color 0.4s ease 0s;}
                </style>
                <style type="text/css" data-styleid="style-k7ns13ap">.style-k7ns13ap_zoomedin {cursor:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_out.png), url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_out.cur), auto;overflow:hidden;display:block;}
                    .style-k7ns13ap_zoomedout {cursor:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_in.png), url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_in.cur), auto;}
                    .style-k7ns13aplink {display:block;overflow:hidden;}
                    .style-k7ns13apimg {overflow:hidden;}
                    .style-k7ns13ap[data-is-responsive=true] .style-k7ns13aplink,.style-k7ns13ap[data-is-responsive=true] .style-k7ns13apimg,.style-k7ns13ap[data-is-responsive=true] wix-image {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-k7ns13apimgimage {position:static;box-shadow:#000 0 0 0;user-select:none;}
                </style>
                <style type="text/css" data-styleid="lb1">.lb1[data-is-responsive~="false"] .lb1itemsContainer {position:absolute;width:100%;height:100%;white-space:nowrap;}
                    .lb1[data-is-responsive~="false"][data-state~="mobileView"] .lb1itemsContainer {position:absolute;width:100%;height:100%;white-space:normal;}
                    .lb1[data-is-responsive~="true"] {display:table;}
                    .lb1[data-is-responsive~="true"] .lb1itemsContainer {display:-webkit-box;display:-webkit-flex;display:flex;}
                    .lb1itemsContainer > li:last-child {margin:0 !important;}
                    .lb1 a {display:block;height:100%;}
                    .lb1imageItemlink {cursor:pointer;}
                    .lb1imageItemimageimage {position:static;box-shadow:#000 0 0 0;user-select:none;}
                </style>
                <style type="text/css" data-styleid="strc1">.strc1:not([data-mobile-responsive]) > .strc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .strc1[data-mobile-responsive] > .strc1inlineContent {position:relative;}
                    .strc1[data-responsive] {display:-ms-grid;display:grid;justify-content:center;grid-template-columns:100%;grid-template-rows:1fr;-ms-grid-columns:100%;-ms-grid-rows:1fr;}
                    .strc1[data-responsive] > .strc1inlineContent {display:flex;}
                    .strc1[data-responsive] > * {position:relative;grid-row-start:1;grid-column-start:1;grid-row-end:2;grid-column-end:2;-ms-grid-row-span:1;-ms-grid-column-span:1;margin:0 auto;}
                </style>
                <style type="text/css" data-styleid="mc1">.mc1:not([data-mobile-responsive]) .mc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .mc1:not([data-mobile-responsive]) .mc1container {position:relative;height:100%;top:0;}
                </style>
                <style type="text/css" data-styleid="style-k6auwexi1">.style-k6auwexi1 > ul {display:table;width:100%;box-sizing:border-box;}
                    .style-k6auwexi1 li {display:table;width:100%;}
                    .style-k6auwexi1 a span {pointer-events:none;}
                    .style-k6auwexi1_noLink {cursor:default !important;}
                    .style-k6auwexi1_counter {margin:0 10px;opacity:0.6;}
                    .style-k6auwexi1menuContainer {padding:0;margin:0;border:solid 1px rgba(18, 17, 15, 0.2);position:relative; border-radius:0;}
                    .style-k6auwexi1menuContainer .style-k6auwexi1_emptySubMenu {display:none !important;}
                    .style-k6auwexi1_itemHoverArea {box-sizing:content-box;border-bottom:solid 0px rgba(18, 17, 15, 1);}
                    .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item {border-radius:0; border-bottom-left-radius:0;border-bottom-right-radius:0;}
                    .style-k6auwexi1_itemHoverArea:last-child {border-bottom:0 solid transparent;}
                    .style-k6auwexi1_itemHoverArea:last-child > .style-k6auwexi1_item {border-radius:0; border-top-left-radius:0;border-top-right-radius:0;border-bottom:0 solid transparent;}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item {transition:background-color 0.4s ease 0s;}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover .style-k6auwexi1_subMenu {opacity:1;display:block;}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover:not(.style-k6auwexi1_noLink) > .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover:not(.style-k6auwexi1_noLink) > .style-k6auwexi1_item > .style-k6auwexi1_label {color:#363430;}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item > .style-k6auwexi1_label,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item > .style-k6auwexi1_label {color:#FFB703;}
                    .style-k6auwexi1_item {height:100%;padding-left:30px;padding-right:30px;transition:background-color 0.4s ease 0s; margin:0;position:relative;cursor:pointer;list-style:none;background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1_label {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ; color:#12110F;display:inline;white-space:nowrap;overflow:hidden;}
                    .style-k6auwexi1_subMenu {z-index:999;min-width:100%;display:none;opacity:0;transition:all 0.4s ease 0s; position:absolute;border:solid 1px rgba(18, 17, 15, 0.2);border-radius:0; }
                    .style-k6auwexi1_subMenu .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1_subMenu .style-k6auwexi1_label {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;}
                    .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item,.style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child:last-child > .style-k6auwexi1_item {border-radius:0;}
                    .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item {border-bottom-left-radius:0;border-bottom-right-radius:0;}
                    .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:last-child {border-bottom:0 solid transparent;}
                    .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:last-child > .style-k6auwexi1_item {border-radius:0; border-top-left-radius:0;border-top-right-radius:0;border-bottom:0 solid transparent;}
                    .style-k6auwexi1_subMenu:before {background-color:#fff;opacity:0;z-index:999;content:" ";display:block;width:calc(0px + 1px);height:100%;position:absolute;top:0;}
                    .style-k6auwexi1[data-state~="items-align-left"] .style-k6auwexi1_item {text-align:left;}
                    .style-k6auwexi1[data-state~="items-align-center"] .style-k6auwexi1_item {text-align:center;}
                    .style-k6auwexi1[data-state~="items-align-right"] .style-k6auwexi1_item {text-align:right;}
                    .style-k6auwexi1[data-state~="subItems-align-left"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:left;padding-left:30px;padding-right:30px;}
                    .style-k6auwexi1[data-state~="subItems-align-center"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:center;padding-left:30px;padding-right:30px;}
                    .style-k6auwexi1[data-state~="subItems-align-right"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:right;padding-left:30px;padding-right:30px;}
                    .style-k6auwexi1[data-state~="subMenuOpenSide-right"] .style-k6auwexi1_subMenu {left:100%;float:left;margin-left:0px;}
                    .style-k6auwexi1[data-state~="subMenuOpenSide-right"] .style-k6auwexi1_subMenu:before {right:100%;}
                    .style-k6auwexi1[data-state~="subMenuOpenSide-left"] .style-k6auwexi1_subMenu {right:100%;float:right;margin-right:0px;}
                    .style-k6auwexi1[data-state~="subMenuOpenSide-left"] .style-k6auwexi1_subMenu:before {left:100%;}
                    .style-k6auwexi1[data-open-direction~="subMenuOpenDir-down"] .style-k6auwexi1_subMenu {top:calc(-1 * 1px);}
                    .style-k6auwexi1[data-open-direction~="subMenuOpenDir-up"] .style-k6auwexi1_subMenu {bottom:calc(-1 * 1px);}
                    .style-k6auwexi1menuContainer_with-validation-indication select:not([data-preview~="focus"]):invalid {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1menuContainer {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
                    .style-k6auwexi1menuContainer select {border-radius:0; -webkit-appearance:none;-moz-appearance:none; font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ; background-color:rgba(255, 255, 255, 1);color:#12110F;border-width:1px; border-style:solid;border-color:rgba(18, 17, 15, 0.2);margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;}
                    .style-k6auwexi1menuContainer select option {text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;}
                    .style-k6auwexi1menuContainer select.style-k6auwexi1menuContainer_placeholder-style {color:#12110F;}
                    .style-k6auwexi1menuContainer select.style-k6auwexi1menuContainer_extended-placeholder-style {color:#888888;}
                    .style-k6auwexi1menuContainer select:-moz-focusring {color:transparent;text-shadow:0 0 0 #000;}
                    .style-k6auwexi1menuContainer select::-ms-expand {display:none;}
                    .style-k6auwexi1menuContainer select:focus::-ms-value {background:transparent;}
                    .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):hover,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="hover"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):focus,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="focus"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-error="true"],.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="error"] {border-width:2px; border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
                    .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):disabled,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-disabled="true"],.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="disabled"] {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;background-color:rgba(204, 204, 204, 1);}
                    .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):disabled + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-disabled="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="disabled"] + .style-k6auwexi1menuContainerarrow {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;border:none;}
                    .style-k6auwexi1menuContainerarrow {position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;}
                    .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container {width:12px;}
                    .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container svg {height:100%;fill:rgba(184, 181, 174, 1);}
                    .style-k6auwexi1menuContainer_left-direction {text-align-last:left;}
                    .style-k6auwexi1menuContainer_left-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-left:0;}
                    .style-k6auwexi1menuContainer_left-direction .style-k6auwexi1menuContainerarrow {right:0;}
                    .style-k6auwexi1menuContainer_right-direction {text-align-last:right;direction:rtl;}
                    .style-k6auwexi1menuContainer_right-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-right:0;}
                    .style-k6auwexi1menuContainer_right-direction .style-k6auwexi1menuContainerarrow {left:0;}
                    .style-k6auwexi1menuContainer_center-direction {text-align-last:left;text-align-last:center;}
                    .style-k6auwexi1menuContainer_center-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-left:0;}
                    .style-k6auwexi1menuContainer_center-direction .style-k6auwexi1menuContainerarrow {right:0;}
                    .style-k6auwexi1menuContainer_mobileMenuContainer {border:0;}
                    .style-k6auwexi1menuContainer_mobileMenuContainer .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container .style-k6auwexi1menuContainericon {fill:#12110F;}
                    .style-k6auwexi1menuContainerlabel {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ; color:#12110F;word-break:break-word;display:inline-block;line-height:1;}
                    .style-k6auwexi1menuContainer_required .style-k6auwexi1menuContainerlabel::after {content:" *";color:transparent;}
                    .style-k6auwexi1menuContainer_selector-wrapper {-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;}
                </style>
                <style type="text/css" data-styleid="tpaw0">.tpaw0 {overflow:hidden;}
                    .tpaw0 iframe {position:absolute;width:100%;height:100%;overflow:hidden;}
                    .tpaw0 iframe:-webkit-full-screen {min-height:auto !important;}
                    .tpaw0preloaderOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
                    .tpaw0preloaderOverlaycontent {width:100%;height:100%;}
                    .tpaw0unavailableMessageOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
                    .tpaw0unavailableMessageOverlaycontent {width:100%;height:100%;background:rgba(255, 255, 255, 0.9);font-size:0;margin-top:5px;}
                    .tpaw0unavailableMessageOverlaytextContainer {color:#373737;font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;font-size:14px;display:inline-block;vertical-align:middle;width:100%;margin-top:10px;text-align:center;}
                    .tpaw0unavailableMessageOverlayreloadButton {display:inline-block;}
                    .tpaw0unavailableMessageOverlay a {color:#0099FF;text-decoration:underline;cursor:pointer;}
                    .tpaw0unavailableMessageOverlayiconContainer {display:none;}
                    .tpaw0unavailableMessageOverlaydismissButton {display:none;}
                    .tpaw0unavailableMessageOverlaytextTitle {font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;display:none;}
                    .tpaw0unavailableMessageOverlay[data-state~="hideIframe"] .tpaw0unavailableMessageOverlay_buttons {opacity:1;}
                    .tpaw0unavailableMessageOverlay[data-state~="hideOverlay"] {display:none;}
                </style>
                <style type="text/css" data-styleid="style-k6hsf3sb">.style-k6hsf3sb[data-state~="touchRollOver"] .style-k6hsf3sb_opc {opacity:1;}
                    .style-k6hsf3sbemptyDivToFillMatrix {width:1px;height:1px;opacity:0;}
                    .style-k6hsf3sb_opc {transition:opacity 0.3s ease 0s; opacity:0;color:#FFFFFF;}
                    .style-k6hsf3sb:hover[data-state~="notMobile"] .style-k6hsf3sb_opc {opacity:1;}
                    .style-k6hsf3sbitemsContainer {overflow:hidden;height:100% !important;}
                    .style-k6hsf3sbrolloverHolder {box-sizing:border-box !important;font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ; background-color:rgba(117, 115, 109, 0.5);transition:opacity 0s; color:#FFFFFF;opacity:0;padding:10px !important;overflow:hidden;cursor:pointer;}
                    .style-k6hsf3sbrolloverHolder > div {width:100% !important;}
                    .style-k6hsf3sb[data-state~="rollover"] .style-k6hsf3sbrolloverHolder {transition:opacity 0.3s ease 0s; opacity:1;}
                    .style-k6hsf3sbtitle {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:normal normal normal 28px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;}
                    .style-k6hsf3sbdescription {white-space:pre-line;overflow:hidden;max-height:60%;}
                    .style-k6hsf3sblink {overflow:hidden;white-space:nowrap;text-decoration:underline;color:#2F2E2E;position:absolute;bottom:10px;left:10px;right:10px;}
                    .style-k6hsf3sb_buttons {transition:opacity 0.3s ease 0s; opacity:0;position:absolute;left:0;right:0;top:50%;margin-top:-15px;}
                    .style-k6hsf3sb[data-state~="mobile"] .style-k6hsf3sb_buttons {opacity:1;}
                    .style-k6hsf3sb_buttons a {transition:opacity 0.3s ease 0s; opacity:0.6;width:45px;height:65px;background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/arrows_white_new3.png);background-repeat:no-repeat;cursor:pointer;position:absolute;}
                    .style-k6hsf3sb[data-state~="mobile"] .style-k6hsf3sb_buttons a {opacity:1;}
                    .style-k6hsf3sbbuttonPrev {left:20px;background-position:0 0;left:20px;background-position:0 0;}
                    .style-k6hsf3sbbuttonNext {right:20px;background-position:100% 0;right:20px;background-position:100% 0;}
                    .style-k6hsf3sb:hover > .style-k6hsf3sb_buttons {opacity:1;}
                    .style-k6hsf3sb_buttons a:hover {opacity:1;}
                    .style-k6hsf3sb_hlp {position:absolute;color:#FFFFFF;}
                    .style-k6hsf3sb_hlp span {display:block;}
                    .style-k6hsf3sbautoplay {right:35px;bottom:10px;}
                    .style-k6hsf3sbcounter {right:10px;bottom:8px;font-size:13px;}
                    .style-k6hsf3sb[data-state~="noLink"] .style-k6hsf3sblink {display:none;}
                    .style-k6hsf3sb[data-state~="autoplayOff"] .style-k6hsf3sbautoplay > span {border:6px solid transparent;border-left:6px solid #FFFFFF;}
                    .style-k6hsf3sb[data-state~="autoplayOn"] .style-k6hsf3sbautoplay > span {border-left:3px solid #FFFFFF;border-right:3px solid #FFFFFF;margin-right:5px;height:12px;width:1px;}
                    .style-k6hsf3sbimgimage {position:static;box-shadow:#000 0 0 0;user-select:none;}
                </style>
                <style type="text/css" data-styleid="style-k6hsf3t3">.style-k6hsf3t3 button.style-k6hsf3t3link {width:100%;}
                    .style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3labelwrapper {text-align:initial;display:flex;align-items:center;}
                    .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="center"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="center"] .style-k6hsf3t3labelwrapper {justify-content:center;}
                    .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="left"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="left"] .style-k6hsf3t3labelwrapper {justify-content:flex-start;}
                    .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="right"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="right"] .style-k6hsf3t3labelwrapper {justify-content:flex-end;}
                    .style-k6hsf3t3link {border-radius:0; position:absolute;top:0;right:0;bottom:0;left:0;transition:border-color 0.4s ease 0s, background-color 0.4s ease 0s; }
                    .style-k6hsf3t3label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ; transition:color 0.4s ease 0s; color:#FFFFFF;display:inline-block;margin:calc(-1 * 0px) 0px 0;position:relative;white-space:nowrap;}
                    .style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3label {margin:0;}
                    .style-k6hsf3t3[data-disabled="false"] .style-k6hsf3t3link {background-color:rgba(255, 183, 3, 1);border:solid rgba(126, 127, 130, 1) 0px;cursor:pointer !important;}
                    .style-k6hsf3t3[data-disabled="false"]:active[data-state~="mobile"] .style-k6hsf3t3link,.style-k6hsf3t3[data-disabled="false"]:hover[data-state~="desktop"] .style-k6hsf3t3link,.style-k6hsf3t3[data-disabled="false"][data-preview~="hover"] .style-k6hsf3t3link {background-color:rgba(255, 255, 255, 1);border-color:rgba(18, 17, 15, 1);}
                    .style-k6hsf3t3[data-disabled="false"]:active[data-state~="mobile"] .style-k6hsf3t3label,.style-k6hsf3t3[data-disabled="false"]:hover[data-state~="desktop"] .style-k6hsf3t3label,.style-k6hsf3t3[data-disabled="false"][data-preview~="hover"] .style-k6hsf3t3label {color:#12110F;}
                    .style-k6hsf3t3[data-disabled="true"] .style-k6hsf3t3link,.style-k6hsf3t3[data-preview~="disabled"] .style-k6hsf3t3link {background-color:rgba(204, 204, 204, 1);border:solid rgba(18, 17, 15, 1) 0px;}
                    .style-k6hsf3t3[data-disabled="true"] .style-k6hsf3t3label,.style-k6hsf3t3[data-preview~="disabled"] .style-k6hsf3t3label {color:#FFFFFF;}
                </style>
                <style type="text/css" data-styleid="controller1">.controller1 {display:none;}</style>
                <style type="text/css" data-styleid="b1">.b1 button.b1link {width:100%;}
                    .b1[data-state~="shouldUseFlex"] .b1link,.b1[data-state~="shouldUseFlex"] .b1labelwrapper {text-align:initial;display:flex;align-items:center;}
                    .b1[data-state~="shouldUseFlex"][data-state~="center"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="center"] .b1labelwrapper {justify-content:center;}
                    .b1[data-state~="shouldUseFlex"][data-state~="left"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="left"] .b1labelwrapper {justify-content:flex-start;}
                    .b1[data-state~="shouldUseFlex"][data-state~="right"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="right"] .b1labelwrapper {justify-content:flex-end;}
                    .b1link {border-radius:0; position:absolute;top:0;right:0;bottom:0;left:0;transition:border-color 0.4s ease 0s, background-color 0.4s ease 0s; }
                    .b1label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ; transition:color 0.4s ease 0s; color:#FFFFFF;display:inline-block;margin:calc(-1 * 0px) 0px 0;position:relative;white-space:nowrap;}
                    .b1[data-state~="shouldUseFlex"] .b1label {margin:0;}
                    .b1[data-disabled="false"] .b1link {background-color:rgba(18, 17, 15, 1);border:solid rgba(126, 127, 130, 1) 0px;cursor:pointer !important;}
                    .b1[data-disabled="false"]:active[data-state~="mobile"] .b1link,.b1[data-disabled="false"]:hover[data-state~="desktop"] .b1link,.b1[data-disabled="false"][data-preview~="hover"] .b1link {background-color:rgba(255, 183, 3, 1);border-color:rgba(18, 17, 15, 1);}
                    .b1[data-disabled="false"]:active[data-state~="mobile"] .b1label,.b1[data-disabled="false"]:hover[data-state~="desktop"] .b1label,.b1[data-disabled="false"][data-preview~="hover"] .b1label {color:#7E7F82;}
                    .b1[data-disabled="true"] .b1link,.b1[data-preview~="disabled"] .b1link {background-color:rgba(204, 204, 204, 1);border:solid rgba(18, 17, 15, 1) 0px;}
                    .b1[data-disabled="true"] .b1label,.b1[data-preview~="disabled"] .b1label {color:#FFFFFF;}
                </style>
                <style type="text/css" data-styleid="style-kfwzliri">.style-kfwzliribg {position:absolute;top:0;right:0;bottom:0;left:0;}
                    .style-kfwzliri[data-state~="mobileView"] .style-kfwzliribg {left:10px;right:10px;}
                    .style-kfwzliriinlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
                </style>
                <style type="text/css" data-styleid="s_DtaksTPAWidgetSkin">.s_DtaksTPAWidgetSkin {overflow:hidden;}
                    .s_DtaksTPAWidgetSkin iframe {position:absolute;width:100%;height:100%;overflow:hidden;}
                    .s_DtaksTPAWidgetSkin iframe:-webkit-full-screen {min-height:auto !important;}
                    .s_DtaksTPAWidgetSkinpreloaderOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
                    .s_DtaksTPAWidgetSkinpreloaderOverlaycontent {width:100%;height:100%;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlaycontent {width:100%;height:100%;background:rgba(255, 255, 255, 0.9);font-size:0;margin-top:5px;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlaytextContainer {color:#373737;font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;font-size:14px;display:inline-block;vertical-align:middle;width:100%;margin-top:10px;text-align:center;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlayreloadButton {display:inline-block;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlay a {color:#0099FF;text-decoration:underline;cursor:pointer;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlayiconContainer {display:none;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlaydismissButton {display:none;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlaytextTitle {font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;display:none;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlay[data-state~="hideIframe"] .s_DtaksTPAWidgetSkinunavailableMessageOverlay_buttons {opacity:1;}
                    .s_DtaksTPAWidgetSkinunavailableMessageOverlay[data-state~="hideOverlay"] {display:none;}
                </style>
            </div>
            <div class="noop visual-focus-on" style="position:relative">
                <div id="SCROLL_TO_TOP" tabindex="-1" aria-label="top of page" role="region" style="height:0"></div>
                <div id="FONTS_CONTAINER"></div>
                <div id="SITE_BACKGROUND" style="height:100%;top:0;min-height:calc(100vh - 0px);bottom:;left:;right:;position:" class="siteBackground">
                    <div id="SITE_BACKGROUND_previous_noPrev" data-position="absolute" data-align="" data-fitting="" class="siteBackgroundprevious">
                        <div id="SITE_BACKGROUNDpreviousImage" class="siteBackgroundpreviousImage"></div>
                        <div id="SITE_BACKGROUNDpreviousVideo" class="siteBackgroundpreviousVideo"></div>
                        <div id="SITE_BACKGROUND_previousOverlay_noPrev" class="siteBackgroundpreviousOverlay"></div>
                    </div>
                    <div id="SITE_BACKGROUND_current_j3lou_desktop_bg" style="top:0;height:100%;width:100%;background-color:rgba(255, 183, 3, 1);display:;position:absolute" data-position="absolute" data-align="top_left" data-fitting="legacy_tile" class="siteBackgroundcurrent">
                        <div id="SITE_BACKGROUND_currentImage_j3lou_desktop_bg" style="position:absolute;top:0;height:100%;width:100%" data-type="bgimage" data-height="100%" class="siteBackgroundcurrentImage"></div>
                        <div id="SITE_BACKGROUNDcurrentVideo" class="siteBackgroundcurrentVideo"></div>
                        <div id="SITE_BACKGROUND_currentOverlay_j3lou_desktop_bg" style="position:absolute;top:0;width:100%;height:100%" class="siteBackgroundcurrentOverlay"></div>
                    </div>
                </div>
                <div id="SITE_ROOT" class="SITE_ROOT" style="width:100%;min-width:980px;padding-bottom:0;top:0" aria-hidden="false">
                    <div id="masterPage" class="mesh-layout" data-mesh-layout="grid">
                        <header data-is-absolute-layout="false" data-is-mobile="false" data-state="transition-allowed" data-site-width="980" data-header-top="0" style="position:relative;margin-top:0;left:0;margin-left:0;width:100%;min-width:980px;top:;bottom:;right:;display:none" class="style-k7ugjugc" id="SITE_HEADER">
                            <div style="left:0;width:100%" id="SITE_HEADERscreenWidthBackground" class="style-k7ugjugcscreenWidthBackground">
                                <div class="style-k7ugjugc_bg"></div>
                            </div>
                            <div id="SITE_HEADERcenteredContent" class="style-k7ugjugccenteredContent">
                                <div style="margin-left:calc((100% - 980px) / 2);width:980px" id="SITE_HEADERbg" class="style-k7ugjugcbg"></div>
                                <div id="SITE_HEADERinlineContent" class="style-k7ugjugcinlineContent">
                                    <style id="SITE_HEADER-mesh-styles">
                                        #SITE_HEADERinlineContent {
                                        height: auto;
                                        width: 100%;
                                        position: relative;
                                        }
                                        #SITE_HEADERinlineContent-gridWrapper {
                                        pointer-events: none;
                                        }
                                        #SITE_HEADERinlineContent-gridContainer {
                                        position: static;
                                        display: grid;
                                        height: auto;
                                        width: 100%;
                                        min-height: auto;
                                        grid-template-rows: min-content min-content min-content min-content min-content 1fr;
                                        grid-template-columns: 100%;
                                        }
                                        #comp-j1rq4q3c1 {
                                        position: relative;
                                        margin: 13px 0 7px 0;
                                        left: 0;
                                        grid-area: 2 / 1 / 3 / 2;
                                        justify-self: stretch;
                                        align-self: start;
                                        }
                                        #comp-k557vagj {
                                        position: relative;
                                        margin: 0px 0px -14px calc((100% - 980px) * 0.5);
                                        left: 0px;
                                        grid-area: 1 / 1 / 2 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-j1rq742h {
                                        position: relative;
                                        margin: 0px 0px 23px calc((100% - 980px) * 0.5);
                                        left: 360px;
                                        grid-area: 2 / 1 / 6 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-k7nv6chl {
                                        position: absolute;
                                        top: 124px;
                                        left: 740px;
                                        }
                                        #comp-j1rq4q3b {
                                        position: relative;
                                        margin: 0px 0px 30px calc((100% - 980px) * 0.5);
                                        left: 1190px;
                                        grid-area: 3 / 1 / 4 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-j1rq4q3b1 {
                                        position: relative;
                                        margin: 0px 0px 48px calc((100% - 980px) * 0.5);
                                        left: 1240px;
                                        grid-area: 4 / 1 / 5 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-j1rq4r8a {
                                        position: relative;
                                        margin: 0px 0px 38px calc((100% - 980px) * 0.5);
                                        left: -1px;
                                        grid-area: 6 / 1 / 7 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #SITE_HEADERcenteredContent {
                                        position: relative;
                                        }
                                        #SITE_HEADERinlineContent-gridContainer > * {
                                        pointer-events: auto;
                                        }
                                        #SITE_HEADERinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                        pointer-events: none;
                                        }
                                        #SITE_HEADERinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                        pointer-events: auto;
                                        }
                                    </style>
                                    <div id="SITE_HEADERinlineContent-gridWrapper" data-mesh-internal="true">
                                        <div id="SITE_HEADERinlineContent-gridContainer" data-mesh-internal="true">
                                            <div data-border-width="1px" style="transform-origin:center 0.5px;left:0;margin-left:0;width:100%;min-width:initial;top:;bottom:;right:;height:5px;position:;display:none" class="style-jr9629o5" id="comp-j1rq4q3c1"></div>
                                            <section style="left:0;width:100%;min-width:980px;height:auto;top:;bottom:;right:;position:;display:none;margin-left:0" data-responsive="true" data-is-screen-width="true" data-col-margin="0" data-row-margin="0" class="strc1" id="comp-k557vagj">
                                                <div style="position:absolute;top:0;width:calc(100% - 0px);height:100%;overflow:hidden;pointer-events:auto;min-width:980px;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="strc1balata" id="comp-k557vagjbalata">
                                                    <div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557vagjbalatabgcolor">
                                                        <div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557vagjbalatabgcoloroverlay" class="bgColoroverlay"></div>
                                                    </div>
                                                </div>
                                                <div style="position:relative;width:calc(100% - 0px);min-width:980px" id="comp-k557vagjinlineContent" class="strc1inlineContent">
                                                    <div style="position:relative;width:100%;left:0;flex:325;margin-left:0;min-width:325px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="325" data-is-mesh="true" class="mc1" id="comp-k557vaxc">
                                                        <div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557vaxccontainer">
                                                            <div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557vaxcbalata">
                                                                <div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557vaxcbalatabgcolor">
                                                                    <div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557vaxcbalatabgcoloroverlay" class="bgColoroverlay"></div>
                                                                </div>
                                                            </div>
                                                            <div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557vaxcinlineContentParent">
                                                                <div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557vaxcinlineContent">
                                                                    <style id="comp-k557vaxc-mesh-styles">
                                                                        #comp-k557vaxcinlineContent {
                                                                        height: auto;
                                                                        width: 100%;
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557vaxcinlineContent-gridContainer {
                                                                        position: static;
                                                                        height: auto;
                                                                        width: 100%;
                                                                        min-height: 98px;
                                                                        }
                                                                        #comp-k557vaxccenteredContent {
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557vaxcinlineContent-gridWrapper {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557vaxcinlineContent-gridContainer > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                        #comp-k557vaxcinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557vaxcinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                    </style>
                                                                    <div id="comp-k557vaxcinlineContent-gridContainer" data-mesh-internal="true"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style="position:relative;width:100%;left:0;flex:326;margin-left:0px;min-width:326px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="326" data-is-mesh="true" class="mc1" id="comp-k557wjr8">
                                                        <div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557wjr8container">
                                                            <div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557wjr8balata">
                                                                <div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557wjr8balatabgcolor">
                                                                    <div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557wjr8balatabgcoloroverlay" class="bgColoroverlay"></div>
                                                                </div>
                                                            </div>
                                                            <div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557wjr8inlineContentParent">
                                                                <div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557wjr8inlineContent">
                                                                    <style id="comp-k557wjr8-mesh-styles">
                                                                        #comp-k557wjr8inlineContent {
                                                                        height: auto;
                                                                        width: 100%;
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557wjr8inlineContent-gridContainer {
                                                                        position: static;
                                                                        height: auto;
                                                                        width: 100%;
                                                                        min-height: 98px;
                                                                        }
                                                                        #comp-k557wjr8centeredContent {
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557wjr8inlineContent-gridWrapper {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557wjr8inlineContent-gridContainer > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                        #comp-k557wjr8inlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557wjr8inlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                    </style>
                                                                    <div id="comp-k557wjr8inlineContent-gridContainer" data-mesh-internal="true"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style="position:relative;width:100%;left:0;flex:329;margin-left:0px;min-width:329px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="329" data-is-mesh="true" class="mc1" id="comp-k557wp6h">
                                                        <div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557wp6hcontainer">
                                                            <div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557wp6hbalata">
                                                                <div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557wp6hbalatabgcolor">
                                                                    <div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557wp6hbalatabgcoloroverlay" class="bgColoroverlay"></div>
                                                                </div>
                                                            </div>
                                                            <div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557wp6hinlineContentParent">
                                                                <div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557wp6hinlineContent">
                                                                    <style id="comp-k557wp6h-mesh-styles">
                                                                        #comp-k557wp6hinlineContent {
                                                                        height: auto;
                                                                        width: 100%;
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557wp6hinlineContent-gridContainer {
                                                                        position: static;
                                                                        height: auto;
                                                                        width: 100%;
                                                                        min-height: 98px;
                                                                        }
                                                                        #comp-k557wp6hcenteredContent {
                                                                        position: relative;
                                                                        }
                                                                        #comp-k557wp6hinlineContent-gridWrapper {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557wp6hinlineContent-gridContainer > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                        #comp-k557wp6hinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                                                        pointer-events: none;
                                                                        }
                                                                        #comp-k557wp6hinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                                                        pointer-events: auto;
                                                                        }
                                                                    </style>
                                                                    <div id="comp-k557wp6hinlineContent-gridContainer" data-mesh-internal="true"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                            <div style="top:;bottom:;left:;right:;width:189px;height:128px;position:;display:none" title="" data-is-responsive="false" data-display-mode="fill" data-content-padding-horizontal="0" data-content-padding-vertical="0" data-exact-height="128" class="style-k7ns13ap" id="comp-j1rq742h">
                                              
                                            </div>
                                            <div style="width:;height:;top:;bottom:;left:;right:;position:;display:none" class="controller1" id="comp-k7nv6chl"></div>
                                            <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:204px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-j1rq4q3b">
                                                
                                            </div>
                                            <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:150px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-j1rq4q3b1">
                                                
                                            </div>
                                            <div id="comp-j1rq4r8a" class="hidden-during-prewarmup style-k7to9w85" style="overflow-x:hidden;top:;bottom:;left:;right:;width:980px;height:30px;position:;display:none" data-stretch-buttons-to-menu-width="true" data-same-width-buttons="false" data-num-items="8" data-menuborder-y="0" data-menubtn-border="0" data-ribbon-els="0" data-label-pad="0" data-ribbon-extra="0" data-drophposition="" data-dropalign="left" dir="ltr" data-state="left notMobile">
                                                <nav aria-label="Site" id="comp-j1rq4r8anavContainer" class="style-k7to9w85navContainer">
                                                    <ul style="text-align:left" id="comp-j1rq4r8aitemsContainer" class="style-k7to9w85itemsContainer">
                                                        <li data-direction="ltr" data-listposition="left" data-data-id="dataItem-j1rp5ha3" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a0">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k7tq7ym2" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a1">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-j1rpaj7y" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a2">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k7ud6l51" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a3">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k6sazqs1" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a4">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-jrgep25b" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a5">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="center" data-data-id="dataItem-kcmg5nn2" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a6">
                                                            
                                                        </li>
                                                        <li data-direction="ltr" data-listposition="right" data-data-id="dataItem-k6i0cpy8" class="style-k7to9w85repeaterButton" data-state="menu idle link notMobile" id="comp-j1rq4r8a7">
                                                            
                                                        </li>
                                                        <li data-listposition="right" class="style-k7to9w85repeaterButton" data-state="menu idle header notMobile" id="comp-j1rq4r8a__more__">
                                                            
                                                        </li>
                                                    </ul>
                                                    <div id="comp-j1rq4r8amoreButton" class="style-k7to9w85moreButton"></div>
                                                    <div style="visibility:hidden" data-drophposition="" data-dropalign="left" id="comp-j1rq4r8adropWrapper" class="style-k7to9w85dropWrapper">
                                                        <ul style="visibility:hidden" id="comp-j1rq4r8amoreContainer" class="style-k7to9w85moreContainer"></ul>
                                                    </div>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <main tabindex="-1" data-is-mobile="false" data-is-mesh="true" data-site-width="980" style="left:0;margin-left:0;width:100%;min-width:980px;top:0;bottom:;right:;position:" class="pc1" data-state="" id="PAGES_CONTAINER">
                            <div style="left:0" id="PAGES_CONTAINERscreenWidthBackground" class="pc1screenWidthBackground"></div>
                            <div style="position:relative" id="PAGES_CONTAINERcenteredContent" class="pc1centeredContent">
                                <div style="display:none" id="PAGES_CONTAINERbg" class="pc1bg"></div>
                                <div style="position:relative" id="PAGES_CONTAINERinlineContent" class="pc1inlineContent">
                                    <div style="width:100%">
                                        <div data-ismobile="false" data-is-mesh-layout="true" style="height:100%;left:0;position:relative;top:;bottom:;right:" class="style-kfwzliri" id="j3lou">
                                            <div style="margin-left:calc((100% - 980px) / 2);width:980px" id="j3loubg" class="style-kfwzliribg"></div>
                                            <div class="style-kfwzliriinlineContent" id="j3louinlineContent">
                                                <style id="j3lou-mesh-styles">
                                                    #j3louinlineContent {
                                                    height: auto;
                                                    width: 100%;
                                                    position: relative;
                                                    }
                                                    #j3louinlineContent-gridWrapper {
                                                    pointer-events: none;
                                                    }
                                                    #j3louinlineContent-gridContainer {
                                                    position: static;
                                                    display: grid;
                                                    height: auto;
                                                    width: 100%;
                                                    min-height: 500px;
                                                    grid-template-rows: min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content 1fr;
                                                    grid-template-columns: 100%;
                                                    padding-bottom: 0px;
                                                    box-sizing: border-box;
                                                    }
                                                    #comp-kfwzlis9 {
                                                    position: relative;
                                                    margin: 84px 0px 17px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 1 / 1 / 2 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlis72 {
                                                    position: relative;
                                                    margin: 6px 0px -15px calc((100% - 980px) * 0.5);
                                                    left: 30px;
                                                    grid-area: 2 / 1 / 3 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlisa {
                                                    position: relative;
                                                    margin: 0px 0px 10px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 2 / 1 / 3 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlise {
                                                    position: relative;
                                                    margin: 0px 0px 7px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 3 / 1 / 4 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlisr {
                                                    position: relative;
                                                    margin: 0px 0px 12px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 4 / 1 / 5 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlist1 {
                                                    position: relative;
                                                    margin: 0px 0px 15px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 5 / 1 / 6 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlisw {
                                                    position: relative;
                                                    margin: 0px 0px 21px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 6 / 1 / 7 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlisx1 {
                                                    position: relative;
                                                    margin: 0px 0px 18px calc((100% - 980px) * 0.5);
                                                    left: 138px;
                                                    grid-area: 7 / 1 / 8 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlit0 {
                                                    position: relative;
                                                    margin: 0px 0px 11px calc((100% - 980px) * 0.5);
                                                    left: 148px;
                                                    grid-area: 8 / 1 / 9 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlit2 {
                                                    position: relative;
                                                    margin: 0px 0px 28px calc((100% - 980px) * 0.5);
                                                    left: 148px;
                                                    grid-area: 9 / 1 / 10 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlith {
                                                    position: relative;
                                                    margin: 0px 0px 44px calc((100% - 980px) * 0.5);
                                                    left: 148px;
                                                    grid-area: 10 / 1 / 11 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #comp-kfwzlitn1 {
                                                    position: relative;
                                                    margin: 0px 0px 0 calc((100% - 980px) * 0.5);
                                                    left: 430px;
                                                    grid-area: 11 / 1 / 12 / 2;
                                                    justify-self: start;
                                                    align-self: start;
                                                    }
                                                    #j3loucenteredContent {
                                                    position: relative;
                                                    }
                                                    #j3louinlineContent-gridContainer > * {
                                                    pointer-events: auto;
                                                    }
                                                    #j3louinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                                    pointer-events: none;
                                                    }
                                                    #j3louinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                                    pointer-events: auto;
                                                    }
                                                </style>
                                                <div id="j3louinlineContent-gridWrapper" data-mesh-internal="true">
                                                    <div id="j3louinlineContent-gridContainer" data-mesh-internal="true">
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:310px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlis9">
                                                            <h6 class="font_6">Instructions</h6>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:42px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlis72">
                                                            
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlisa">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a  class="collapsible"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Definition</span></span></span></span></a>
															<div class="content">
                                                                <p>`+val_def+`</p>
                                                                </div>
                                                                </span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlise">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a class="collapsible"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">About the t</span></span></span><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">ask</span></span></span></span></a><div class="content"><p>`+val_task+`</p></div></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlisr">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a class="collapsible"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Example</span></span></span></span></a><div class="content"><p>`+val_example+`</p></div></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlist1">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a class="collapsible"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Trigger Alert</span></span></span></span></a><div class="content"><p>`+val_trig+`</p></div></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlisw">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a class="collapsible"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">What you should consider</span></span></span></span></a>
															<div class="content"><p>`+val_cons+`</p></div></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlisx1">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a class="collapsible"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">What you need to ask yourself</span></span></span></span></a>
															<div class="content"><p>`+val_ask+`</p></div></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlit0">
                                                            
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlit2">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;"></span></span></span></span></a></span></h2>
                                                        </div>
                                                        <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfwzlith">
                                                            <h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a class="collapsible"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">How to report</span></span></span></span></a>
															<div class="content"><p>`+val_report+`</p></div></span></h2>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        <div id="soapAfterPagesContainer" class="page-without-sosp">
                            <style id="soapAfterPagesContainer-mesh-styles">
                                #soapAfterPagesContainerinlineContent {
                                height: auto;
                                width: 100%;
                                position: relative;
                                }
                                #soapAfterPagesContainerinlineContent-gridWrapper {
                                pointer-events: none;
                                }
                                #soapAfterPagesContainerinlineContent-gridContainer {
                                position: static;
                                display: grid;
                                height: auto;
                                width: 100%;
                                min-height: auto;
                                grid-template-rows: 1fr;
                                grid-template-columns: 100%;
                                padding-bottom: 0px;
                                box-sizing: border-box;
                                }
                                #comp-j1rtn0ml {
                                position: relative;
                                margin: 6px 0 0 0;
                                left: 0;
                                grid-area: 1 / 1 / 2 / 2;
                                justify-self: stretch;
                                align-self: start;
                                }
                                #CONTROLLER_COMP_CUSTOM_ID {
                                position: absolute;
                                top: -288px;
                                left: 20px;
                                }
                                #soapAfterPagesContainercenteredContent {
                                position: relative;
                                }
                                #soapAfterPagesContainerinlineContent-gridContainer > * {
                                pointer-events: auto;
                                }
                                #soapAfterPagesContainerinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                pointer-events: none;
                                }
                                #soapAfterPagesContainerinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                pointer-events: auto;
                                }
                            </style>
                            <div id="soapAfterPagesContainerinlineContent-gridWrapper" data-mesh-internal="true">
                                <div id="soapAfterPagesContainerinlineContent-gridContainer" data-mesh-internal="true">
                                    <div data-border-width="1px" style="transform-origin:center 0.5px;left:0;margin-left:0;width:100%;min-width:initial;top:;bottom:;right:;height:5px;position:;display:none" class="style-jr9629o5" id="comp-j1rtn0ml"></div>
                                    <div style="width:;height:;top:;bottom:;left:;right:;position:;display:none" class="style-k6auwcww" id="CONTROLLER_COMP_CUSTOM_ID"></div>
                                </div>
                            </div>
                        </div>
                        <footer style="bottom:auto;left:0;margin-left:0;width:100%;min-width:980px;top:;right:;position:;display:none" class="style-k7ugjln5_footer style-k7ugjln5" tabindex="-1" data-site-width="980" data-fixedposition="false" data-isrunninginmobile="false" data-is-absolute-layout="false" data-state=" " id="SITE_FOOTER">
                            <div style="left:0;width:100%" id="SITE_FOOTERscreenWidthBackground" class="style-k7ugjln5screenWidthBackground">
                                <div class="style-k7ugjln5_bg"></div>
                            </div>
                            <div style="width:100%" id="SITE_FOOTERcenteredContent" class="style-k7ugjln5centeredContent">
                                <div style="margin-left:calc((100% - 980px) / 2);width:980px" id="SITE_FOOTERbg" class="style-k7ugjln5bg"></div>
                                <div id="SITE_FOOTERinlineContent" class="style-k7ugjln5inlineContent">
                                    <style id="SITE_FOOTER-mesh-styles">
                                        #SITE_FOOTERinlineContent {
                                        height: auto;
                                        width: 100%;
                                        position: relative;
                                        }
                                        #SITE_FOOTERinlineContent-gridWrapper {
                                        pointer-events: none;
                                        }
                                        #SITE_FOOTERinlineContent-gridContainer {
                                        position: static;
                                        display: grid;
                                        height: auto;
                                        width: 100%;
                                        min-height: 423px;
                                        grid-template-rows: min-content min-content min-content min-content min-content 1fr;
                                        grid-template-columns: 100%;
                                        }
                                        #comp-j1rq4r8m {
                                        position: relative;
                                        margin: 60px 0px 25px calc((100% - 980px) * 0.5);
                                        left: -1px;
                                        grid-area: 1 / 1 / 4 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-j9zs014r {
                                        position: relative;
                                        margin: 0px 0px 19px calc((100% - 980px) * 0.5);
                                        left: 0px;
                                        grid-area: 5 / 1 / 6 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-k6huwtfd {
                                        position: relative;
                                        margin: 60px 0px 46px calc((100% - 980px) * 0.5);
                                        left: 650px;
                                        grid-area: 1 / 1 / 2 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-k6hsf3rx {
                                        position: relative;
                                        margin: 0px 0px 40px calc((100% - 980px) * 0.5);
                                        left: 610px;
                                        grid-area: 2 / 1 / 3 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-k6hsf3sr {
                                        position: relative;
                                        margin: 0px 0px -7px calc((100% - 980px) * 0.5);
                                        left: 680px;
                                        grid-area: 4 / 1 / 5 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #comp-jhi0p1w8 {
                                        position: relative;
                                        margin: 0px 0px 10px calc((100% - 980px) * 0.5);
                                        left: 0px;
                                        grid-area: 6 / 1 / 7 / 2;
                                        justify-self: start;
                                        align-self: start;
                                        }
                                        #SITE_FOOTERcenteredContent {
                                        position: relative;
                                        }
                                        #SITE_FOOTERinlineContent-gridContainer > * {
                                        pointer-events: auto;
                                        }
                                        #SITE_FOOTERinlineContent-gridContainer > [id$="-rotated-wrapper"] {
                                        pointer-events: none;
                                        }
                                        #SITE_FOOTERinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
                                        pointer-events: auto;
                                        }
                                    </style>
                                    <div id="SITE_FOOTERinlineContent-gridWrapper" data-mesh-internal="true">
                                        <div id="SITE_FOOTERinlineContent-gridContainer" data-mesh-internal="true">
                                            <div data-is-responsive="false" style="width:118px;height:30px;top:;bottom:;left:;right:;position:;display:none" data-hide-prejs="true" class="lb1" id="comp-j9zs014r">
                                                <ul aria-label="Social bar" id="comp-j9zs014ritemsContainer" class="lb1itemsContainer">
                                                    <li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r0image">
                                                        
                                                    </li>
                                                    <li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r1image">
                                                        
                                                    </li>
                                                    <li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r2image">
                                                        <a href="https://www.linkedin.com/company/27100983/" target="_blank" data-content="https://www.linkedin.com/company/27100983/" data-type="external" rel="noopener" id="comp-j9zs014r2imagelink" class="lb1imageItemlink">
                                                            <wix-image style="width:30px;height:30px;position:absolute" data-has-bg-scroll-effect="" data-image-info="{&quot;imageData&quot;:{&quot;type&quot;:&quot;Image&quot;,&quot;id&quot;:&quot;dataItem-j9zs017x&quot;,&quot;metaData&quot;:{&quot;pageId&quot;:&quot;masterPage&quot;,&quot;isPreset&quot;:false,&quot;schemaVersion&quot;:&quot;1.0&quot;,&quot;isHidden&quot;:false},&quot;title&quot;:&quot;LinkedIn - White Circle&quot;,&quot;uri&quot;:&quot;f61c7a3b4b4947b28511a25034973383.png&quot;,&quot;width&quot;:200,&quot;height&quot;:200,&quot;alt&quot;:&quot;LinkedIn - White Circle&quot;,&quot;link&quot;:{&quot;type&quot;:&quot;ExternalLink&quot;,&quot;id&quot;:&quot;dataItem-j9zs017x1&quot;,&quot;metaData&quot;:{&quot;pageId&quot;:&quot;masterPage&quot;,&quot;isPreset&quot;:false,&quot;schemaVersion&quot;:&quot;1.0&quot;,&quot;isHidden&quot;:false},&quot;url&quot;:&quot;https://www.linkedin.com/company/27100983/&quot;,&quot;target&quot;:&quot;_blank&quot;},&quot;displayMode&quot;:&quot;fill&quot;},&quot;containerId&quot;:&quot;comp-j9zs014r&quot;,&quot;displayMode&quot;:&quot;fill&quot;}" data-has-ssr-src="" data-is-svg="false" data-is-svg-mask="false" id="comp-j9zs014r2imageimage" class="lb1imageItemimage"><img id="comp-j9zs014r2imageimageimage" alt="LinkedIn - White Circle" data-type="image" itemProp="image"/></wix-image>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div data-packed="false" data-vertical-text="false" style="top:;bottom:;left:;right:;width:219px;height:auto;position:;display:none;min-height:25px;pointer-events:none" data-min-height="25" class="txtNew" id="comp-k6huwtfd">
                                                <p class="font_8" style="font-size:25px;"><span style="font-size:25px;"><span class="color_18"><span style="text-decoration:underline;"></span></span></span></p>
                                            </div>
                                            <div data-height-diff="0" data-width-diff="0" data-num-cols="2" data-max-rows="3" data-margin="15" data-is-mesh="true" style="overflow:hidden;top:;bottom:;left:;right:;width:285px;height:79px;position:;display:none" class="style-k6hsf3sb" data-state="hidePlayButton autoplayOff idle notMobile desktopView touchRollOut" id="comp-k6hsf3rx">
                                                <div data-gallery-id="comp-k6hsf3rx" class="style-k6hsf3sb_show-counter style-k6hsf3sbitemsContainer" style="position:relative;overflow:hidden;width:285px;height:79px" id="comp-k6hsf3rxitemsContainer">
                                                    <div style="transform:none;position:absolute;width:135px;height:79px;left:0;top:0;overflow:hidden;clip:auto" data-has-bg-scroll-effect="" data-style="position:absolute;overflow:hidden;clip:auto" data-gallery-id="comp-k6hsf3rx" data-page-desc="curr" data-query="dataItem-k6hsf5hc4" data-image-index="0" class="style-k6hsf3sbimg" id="comp-k6hsf3rxdataItem-k6hsf5hc4"><img id="comp-k6hsf3rxdataItem-k6hsf5hc4image" alt="" data-type="image" itemProp="image"/></div>
                                                    <div style="transform:none;position:absolute;width:135px;height:79px;left:150px;top:0;overflow:hidden;clip:auto" data-has-bg-scroll-effect="" data-style="position:absolute;overflow:hidden;clip:auto" data-gallery-id="comp-k6hsf3rx" data-page-desc="curr" data-query="dataItem-k6hsf5hc" data-image-index="1" class="style-k6hsf3sbimg" id="comp-k6hsf3rxdataItem-k6hsf5hc"><img id="comp-k6hsf3rxdataItem-k6hsf5hcimage" alt="" data-type="image" itemProp="image"/></div>
                                                </div>
                                                <div style="visibility:hidden;cursor:pointer" data-gallery-id="comp-k6hsf3rx" data-hovered-image-id="" id="comp-k6hsf3rxrolloverHolder" class="style-k6hsf3sbrolloverHolder">
                                                    <h3 data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxtitle" class="style-k6hsf3sbtitle"></h3>
                                                    <p data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxdescription" class="style-k6hsf3sbdescription"></p>
                                                    <a id="comp-k6hsf3rxlink" class="style-k6hsf3sblink"></a><a href="#" style="height:100%;display:block;width:100%;position:absolute;top:0px;left:0px;background-color:#ffffff;filter:alpha(opacity=0);opacity:0;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-drag:none;-webkit-user-drag:none;-moz-user-drag:none;-ms-user-drag:none;user-modify:read-only;-webkit-user-modify:read-only;-moz-user-modify:read-only;-ms-user-modify:read-only"></a>
                                                </div>
                                                <div class="style-k6hsf3sb_buttons"><a data-gallery-id="comp-k6hsf3rx" style="visibility:hidden" id="comp-k6hsf3rxbuttonPrev" class="style-k6hsf3sbbuttonPrev"></a><a data-gallery-id="comp-k6hsf3rx" style="visibility:hidden" id="comp-k6hsf3rxbuttonNext" class="style-k6hsf3sbbuttonNext"></a></div>
                                                <div style="visibility:visible" data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxcounter" class="style-k6hsf3sb_hlp style-k6hsf3sb_opc style-k6hsf3sbcounter">1/1</div>
                                                <div data-gallery-id="comp-k6hsf3rx" style="cursor:pointer;visibility:hidden" id="comp-k6hsf3rxautoplay" class="style-k6hsf3sb_hlp style-k6hsf3sb_opc style-k6hsf3sbautoplay"><span></span></div>
                                                <div id="comp-k6hsf3rxemptyDivToFillMatrix" class="style-k6hsf3sbemptyDivToFillMatrix"></div>
                                            </div>
                                            <div id="comp-k6hsf3sr" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="131" data-height="35" style="top:;bottom:;left:;right:;width:131px;height:35px;position:;display:none" class="style-k6hsf3t3" data-state="desktop shouldUseFlex center"><span id="comp-k6hsf3srlabel" class="style-k6hsf3t3label">Find out more</span></a></div>
                                            <div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:109px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-jhi0p1w8">
                                                <p class="font_9" style="text-align:center; font-size:14px;"><span style="font-size:14px;"><span class="color_11"><span style="text-decoration:underline;"></span></span></span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
                <div id="aspectCompsContainer" class="siteAspectsContainer">
                    <div style="position:absolute" id="popoverLayer"></div>
                    <wix-iframe style="top:;bottom:;left:;right:;position:;overflow:hidden;visibility:hidden" data-has-iframe="true" data-src="https://apps.wix.com/members-area/app-worker?cacheKiller=1601929839219&amp;commonConfig=%7B%7BcommonConfig%7D%7D&amp;compId=tpaWorker_9180&amp;consent-policy=%7B%7BconsentPolicy%7D%7D&amp;deviceType=desktop&amp;endpointType=worker&amp;instance=37Ot7cP4bMyyiyHtHdjS8ikE0zMaspcQ2fpX5QpwXGU.eyJpbnN0YW5jZUlkIjoiZWI5OWQ0NWItZThkMS00N2ZmLWE2ZWEtMGNhNDllMDExY2Q2IiwiYXBwRGVmSWQiOiIxNGNlMjhmNy03ZWIwLTM3NDUtMjJmOC0wNzRiMGUyNDAxZmIiLCJtZXRhU2l0ZUlkIjoiZTk4ZGRjM2MtM2E2Yy00Zjk5LTg3YTMtZGQ1M2U5YjdhOWNlIiwic2lnbkRhdGUiOiIyMDIwLTEwLTA1VDIwOjM0OjM5LjM5NloiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjE4YjQ1NTM2LWFiZmYtNGY3Zi1hMjdmLTRhNGY5MGEyYTQ3MSIsImJpVG9rZW4iOiIwMjE0MDg2Ny1kMmJkLTA4NjYtMjE0OS1kMWY3NzdiNmI1MTgiLCJzaXRlT3duZXJJZCI6IjU3NThjNGIzLWVkODYtNDdkYi05Yjc3LWQ4YjZhNjAyZmI3ZiJ9&amp;locale=en&amp;siteRevision=1374&amp;viewMode=site&amp;viewerCompId=tpaWorker_9180" data-is-tpa="true" data-app-definition-id="14ce28f7-7eb0-3745-22f8-074b0e2401fb" id="tpaWorker_9180" class="s_DtaksTPAWidgetSkin">
                        <iframe data-src="https://apps.wix.com/members-area/app-worker?cacheKiller=1601929839219&amp;commonConfig=%7B%7BcommonConfig%7D%7D&amp;compId=tpaWorker_9180&amp;consent-policy=%7B%7BconsentPolicy%7D%7D&amp;deviceType=desktop&amp;endpointType=worker&amp;instance=37Ot7cP4bMyyiyHtHdjS8ikE0zMaspcQ2fpX5QpwXGU.eyJpbnN0YW5jZUlkIjoiZWI5OWQ0NWItZThkMS00N2ZmLWE2ZWEtMGNhNDllMDExY2Q2IiwiYXBwRGVmSWQiOiIxNGNlMjhmNy03ZWIwLTM3NDUtMjJmOC0wNzRiMGUyNDAxZmIiLCJtZXRhU2l0ZUlkIjoiZTk4ZGRjM2MtM2E2Yy00Zjk5LTg3YTMtZGQ1M2U5YjdhOWNlIiwic2lnbkRhdGUiOiIyMDIwLTEwLTA1VDIwOjM0OjM5LjM5NloiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjE4YjQ1NTM2LWFiZmYtNGY3Zi1hMjdmLTRhNGY5MGEyYTQ3MSIsImJpVG9rZW4iOiIwMjE0MDg2Ny1kMmJkLTA4NjYtMjE0OS1kMWY3NzdiNmI1MTgiLCJzaXRlT3duZXJJZCI6IjU3NThjNGIzLWVkODYtNDdkYi05Yjc3LWQ4YjZhNjAyZmI3ZiJ9&amp;locale=en&amp;siteRevision=1374&amp;viewMode=site&amp;viewerCompId=tpaWorker_9180" scrolling="no" frameBorder="0" allow="autoplay; camera; microphone; geolocation;" allowtransparency="true" allowfullscreen="" name="tpaWorker_9180" style="display:none;position:absolute;z-index:" title="Profile Card" aria-label="Profile Card" id="tpaWorker_9180iframe" class="s_DtaksTPAWidgetSkiniframe"></iframe>
                        <div id="tpaWorker_9180overlay" class="s_DtaksTPAWidgetSkinoverlay"></div>
                    </wix-iframe>
                </div>
                <div id="SCROLL_TO_BOTTOM" tabindex="-1" aria-label="bottom of page" role="region" style="height:0"></div>
                <script id="partiallyVisibleBeat">
                    if (window.wixBiSession) {
                    wixBiSession.isUsingMesh = true;
                    if (wixBiSession.sendBeat) {
                    wixBiSession.sendBeat(12, 'Partially visible', '&pid=j3lou');
                    }
                    }
                    if (window.requestCloseWelcomeScreen) {
                    requestCloseWelcomeScreen();
                    }
                </script>
            </div>
            <div class="font-ruler-container" style="overflow:hidden;visibility:hidden;max-height:0;max-width:0;position:absolute">
                <style>.font-ruler-content::after {content:"@#$%%^&*~IAO"}</style>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
                <div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden">
                    <div style="position:relative;white-space:nowrap;font-family:serif">
                        <div style="position:absolute;width:100%;height:100%;overflow:hidden">
                            <div></div>
                        </div>
                        <span class="font-ruler-content"></span>
                    </div>
                </div>
            </div>
        </div>
        
		
       <script>
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
</script>
       
    </body>
</html>
     
     
              `);
              
                    
       //res.end();
               
      //next();
     



   });
        
      
	//code for practice
	app.get('/practice', async function(req, res) {
      var reqQueryObject = req.query // returns object with all parameters
        
        workerID = req.query.workerId // returns "12354411"

        assignmentID = req.query.assignmentId
        activitystatus = req.query.activityStatus
        ans_y=req.query.ans_y;
        ans_n=req.query.ans_n;
        
        
        mission_state=req.query.mission_state
        task=parseInt(req.query.task_type);
        block=parseInt(req.query.block);
        //mission_val=parseInt(req.query.missionVal);
        mission_id=parseInt(req.query.missionId);
        mission_id1=parseInt(req.query.missionId);
        console.log("request URL "+req.url);
       console.log("request params "+mission_id1);
       
       var blockID='1';
      var d = Date()
        var current_hour = d.toString() 
      //2.
      const Pool = require('pg').Pool;
      const pool = new Pool({
        user: 'dbodoff@persuasion',
        host: 'persuasion.postgres.database.azure.com',
        database: 'postgres',
        password: 'Bozo@2020',
        port: 5432,
    })
     
    
    
    
    //find task_type_val
      
      if( mission_state === "fwd") {
       ++mission_id;
       } 
       if( mission_state === "bkd") {
          kk=0;
          --mission_id;
           if ( Number(mission_id) === Number(kk) ) {
            mission_id=1;
           }
          } 
          if( mission_state === "msc") {
            mission_id=mission_id1;
            } 
       //find tweet text
       

       sql_chy3 = `select count(*) from (select distinct question from session where worker_id='${workerID}') t;`;
       console.log(sql_chy3);
       pool.on('error',function(err,client){});
       pool.query(sql_chy3,(error, results) => {
        if (error) {
            console.error("error to check "+error);
        }
       
        console.log(results.rows[0].count);
        mission_val=results.rows[0].count;

       sql_chy = `select * from practice_data where mission_id=${task};`;
       pool.on('error',function(err,client){});
       pool.query(sql_chy,(error, results) => {
        fin_val_drpdwn=Number(results.rows.length);

        if (Number(results.rows.length) <= Number(mission_id))
         {
            mission_id=results.rows.length;
            if (mission_state === "fwd" && Number(mission_val) < Number(results.rows.length)) 
            {
                sql_msc3 = `select distinct (coalesce(question, 0)) as question from session where worker_id='${workerID}' and status='Practice';`;
                console.log(sql_msc3);
               pool.query(sql_msc3,(error3, results3) => {
                    var alert =require('alert');
                    const data = results3.rows;
                    foot_note1="Please answer all the tweets! If there are no tweet number in this alert then you have not answered any tweet yet. Tweets answered are "+R.pluck('question', data); 
                    res.write(`
                    <!DOCTYPE html>
                     <html lang="en">
                        <head>
                           <title>Tweet</title>
                           
                        </head>
                    <body>
                    <a target="_self" onclick=href='?ans_n=NO'+'&ans_y='+'&workerId='+'`+workerID+`'+'&block='+'`+block+`'+'&task_type='+'`+task+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&mission_state=chk'">
                    
                    </a>
                    <h6>`+foot_note1+`</h6>                                                       
                                                                    
                    </body>
                </html>
                `);
                   
                   
                    // alert('Please answer all the tweets correctly! If there are no tweet number in this alert then you have not answered any tweet correctly yet. Correctly answered tweets are '+R.pluck('question', data));
                   /*data.forEach(row => {
                        alert(`question: ${row.question}`);
                    })*/
                    
                 
                
                
                
                });
			}
		}     
                    
        
    
        fin_q=`${mission_id}`;   
        if (Number(mission_val) >= Number(results.rows.length) ) {
            
            res.write(`
<!DOCTYPE html>
         <html lang="en">
               <head>
                    <title>Tweet</title>
                 </head>
         
                     
                         <body class="prewarmup">
                     
         
             
         
         
             
         
             <script type="text/javascript">
                   
                       var htmlClassList = document.documentElement.classList;
                       
                   
         
               
               var bodyCacheable = true;
               wixBiSession.setCaching(bodyCacheable);
         
               var clientSideRender = false;
               
               
               
             </script>
         
             
             
             
             <!--body start html embeds start-->
             
             <!--body start html embeds end-->
             
             
         
             
             <script id="wix-first-paint">
                 if (window.ResizeObserver &&
                     (!window.PerformanceObserver || !PerformanceObserver.supportedEntryTypes || PerformanceObserver.supportedEntryTypes.indexOf('paint') === -1)) {
                     new ResizeObserver(function (entries, observer) {
                         entries.some(function (entry) {
                             var contentRect = entry.contentRect;
                             if (contentRect.width > 0 && contentRect.height > 0) {
                                 requestAnimationFrame(function (now) {
                                     window.wixFirstPaint = now;
                                     dispatchEvent(new CustomEvent('wixFirstPaint'));
                                 });
                                 observer.disconnect();
                                 return true;
                             }
                         });
                     }).observe(document.body);
                 }
             </script>
             
         
         
             <div id="SITE_CONTAINER"><style type="text/css" data-styleid="uploadedFonts"></style>
             <div><style type="text/css" data-styleid="theme_fonts">.font_0 {font: normal normal normal 30px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#FFB703;} 
         .font_1 {font: normal normal normal 14px/1.43em 'Open Sans',sans-serif ;color:#12110F;} 
         .font_2 {font: normal normal normal 48px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;} 
         .font_3 {font: normal normal normal 48px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;} 
         .font_4 {font: normal normal normal 72px/1.111em impact,impact-w01-2010,impact-w02-2010,impact-w10-2010,sans-serif ;color:#12110F;} 
         .font_5 {font: normal normal normal 56px/1.161em impact,impact-w01-2010,impact-w02-2010,impact-w10-2010,sans-serif ;color:#12110F;} 
         .font_6 {font: normal normal normal 28px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;} 
         .font_7 {font: normal normal normal 18px/1.4em roboto-bold,roboto,sans-serif ;color:#12110F;} 
         .font_8 {font: normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;color:#FFFFFF;} 
         .font_9 {font: normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;color:#12110F;} 
         .font_10 {font: normal normal normal 14px/1.43em 'Open Sans',sans-serif ;color:#12110F;} 
         </style><style type="text/css" data-styleid="theme_colors">.color_0 {color: #FFFFFF;}
         .backcolor_0 {background-color: #FFFFFF;}
         .color_1 {color: #FFFFFF;}
         .backcolor_1 {background-color: #FFFFFF;}
         .color_2 {color: #000000;}
         .backcolor_2 {background-color: #000000;}
         .color_3 {color: #ED1C24;}
         .backcolor_3 {background-color: #ED1C24;}
         .color_4 {color: #0088CB;}
         .backcolor_4 {background-color: #0088CB;}
         .color_5 {color: #FFCB05;}
         .backcolor_5 {background-color: #FFCB05;}
         .color_6 {color: #727272;}
         .backcolor_6 {background-color: #727272;}
         .color_7 {color: #B0B0B0;}
         .backcolor_7 {background-color: #B0B0B0;}
         .color_8 {color: #FFFFFF;}
         .backcolor_8 {background-color: #FFFFFF;}
         .color_9 {color: #727272;}
         .backcolor_9 {background-color: #727272;}
         .color_10 {color: #B0B0B0;}
         .backcolor_10 {background-color: #B0B0B0;}
         .color_11 {color: #FFFFFF;}
         .backcolor_11 {background-color: #FFFFFF;}
         .color_12 {color: #B8B5AE;}
         .backcolor_12 {background-color: #B8B5AE;}
         .color_13 {color: #75736D;}
         .backcolor_13 {background-color: #75736D;}
         .color_14 {color: #363430;}
         .backcolor_14 {background-color: #363430;}
         .color_15 {color: #12110F;}
         .backcolor_15 {background-color: #12110F;}
         .color_16 {color: #FFF0CC;}
         .backcolor_16 {background-color: #FFF0CC;}
         .color_17 {color: #FFDB81;}
         .backcolor_17 {background-color: #FFDB81;}
         .color_18 {color: #FFB703;}
         .backcolor_18 {background-color: #FFB703;}
         .color_19 {color: #AA7A02;}
         .backcolor_19 {background-color: #AA7A02;}
         .color_20 {color: #553D01;}
         .backcolor_20 {background-color: #553D01;}
         .color_21 {color: #D3D4D6;}
         .backcolor_21 {background-color: #D3D4D6;}
         .color_22 {color: #A8A9AD;}
         .backcolor_22 {background-color: #A8A9AD;}
         .color_23 {color: #7E7F82;}
         .backcolor_23 {background-color: #7E7F82;}
         .color_24 {color: #545557;}
         .backcolor_24 {background-color: #545557;}
         .color_25 {color: #2A2A2B;}
         .backcolor_25 {background-color: #2A2A2B;}
         .color_26 {color: #FFFFFF;}
         .backcolor_26 {background-color: #FFFFFF;}
         .color_27 {color: #FFFFFF;}
         .backcolor_27 {background-color: #FFFFFF;}
         .color_28 {color: #EBEBEB;}
         .backcolor_28 {background-color: #EBEBEB;}
         .color_29 {color: #BEBEBE;}
         .backcolor_29 {background-color: #BEBEBE;}
         .color_30 {color: #727272;}
         .backcolor_30 {background-color: #727272;}
         .color_31 {color: #FFF1AB;}
         .backcolor_31 {background-color: #FFF1AB;}
         .color_32 {color: #FFEA82;}
         .backcolor_32 {background-color: #FFEA82;}
         .color_33 {color: #FFD504;}
         .backcolor_33 {background-color: #FFD504;}
         .color_34 {color: #AA8E03;}
         .backcolor_34 {background-color: #AA8E03;}
         .color_35 {color: #554701;}
         .backcolor_35 {background-color: #554701;}
         </style></div><div id="CSS_CONTAINER"><style id="masterPage_css">.horizontalmenuitem1808041630__root {
           -archetype: paintBox;
         
           display: block;
           transition: inherit;
         }
         
         .horizontalmenuitem1808041630__root:not([href]) {
           cursor: default !important;
         }
         
         .horizontalmenuitem1808041630__listItem {
           flex-grow: inherit;
         }
         
         .horizontalmenuitem1808041630__container {
           -archetype: box;
           display: flex;
           height: 100%;
         }
         
         .horizontalmenuitem1808041630__label {
           -archetype: text;
           -controller-part-type: LayoutChildDisplayDropdown;
         }
         
         .horizontalmenusubitem329750698__root {
           -archetype: paintBox;
         
           display: block;
         
           transition: inherit;
         }
         
         .horizontalmenusubitem329750698__root:not([href]) {
           cursor: default !important;
         }
         
         .horizontalmenusubitem329750698__listItem {
           flex-grow: inherit;
         
           -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
           page-break-inside: avoid; /* Firefox */
           break-inside: avoid; /* IE 10+ */
         }
         
         .horizontalmenusubitem329750698__container {
           -archetype: box;
           display: flex;
         }
         
         .horizontalmenusubitem329750698__label {
           -archetype: text;
           -controller-part-type: LayoutChildDisplayDropdown;
         }
         
         .horizontalmenusubsubitem676023543__root {
           -archetype: paintBox;
         
           display: block;
         
           transition: inherit;
         }
         
         .horizontalmenusubsubitem676023543__root:not([href]) {
           cursor: default !important;
         }
         
         .horizontalmenusubsubitem676023543__listItem {
           flex-grow: inherit;
         
           -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
           page-break-inside: avoid; /* Firefox */
           break-inside: avoid; /* IE 10+ */
         }
         
         .horizontalmenusubsubitem676023543__container {
           -archetype: box;
           display: flex;
         }
         
         .horizontalmenusubsubitem676023543__label {
           -archetype: text;
           -controller-part-type: LayoutChildDisplayDropdown;
         }
         
         .horizontalmenuscrollbutton2690837022__root {
           -archetype: paddingBox;
         
           display: flex;
           align-items: center;
           justify-content: center;
           cursor: pointer;
           pointer-events: auto;
           overflow: hidden;
         }
         
         .horizontalmenuscrollbutton2690837022__root.horizontalmenuscrollbutton2690837022---side-4-left {
           transform: scaleX(-1);
           -webkit-transform: scaleX(-1);
         }
         
         .horizontalmenuscrollbutton2690837022__root.horizontalmenuscrollbutton2690837022---side-5-right {}
         
         .horizontalmenuscrollbutton2690837022__root.horizontalmenuscrollbutton2690837022--isHidden {
           visibility: hidden;
           pointer-events: none;
         }
         
         .horizontalmenuscrollbutton2690837022__icon {
           -archetype: icon;
           -controller-part-type: LayoutChildDisplayDropdown;
           min-width: 1px;
           max-height: 100%;
           max-width: 100%;
         }
         
         .horizontalmenuscrollbutton2690837022__icon > div,.horizontalmenuscrollbutton2690837022__icon svg {
           width: inherit;
           height: inherit;
         }
         
         .stylablebutton643855516__root {
             -archetype: box;
             /* -st-states: error, disabled; */
             cursor: pointer;
             border: none;
             display: block;
             min-width: 10px;
             min-height: 10px;
             width: 100%;
             height: 100%;
             box-sizing: border-box;
             padding: 0px;
         }
         
         .stylablebutton643855516__root[disabled] {
             pointer-events: none;
         }
         
         .stylablebutton643855516__link {
             -archetype: box;
             text-decoration: none;
             box-sizing: border-box;
             color: black;
         }
         
         .stylablebutton643855516__container {
             display: flex;
             flex-basis: auto;
             justify-content: center;
             flex-direction: row;
             flex-grow: 1;
             align-items: center;
             overflow: hidden;
             height: 100%;
             width: 100%;
             transition: all 0.2s ease, visibility 0s;
         }
         
         .stylablebutton643855516__label {
             -archetype: text;
             -controller-part-type: "LayoutChildDisplayDropdown, LayoutFlexChildSpacing(first)";
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
             min-width: 1.8em;
             max-width: 100%;
             transition: inherit;
         }
         
         .stylablebutton643855516__icon {
             -archetype: icon;
             -controller-part-type: "LayoutChildDisplayDropdown, LayoutFlexChildSpacing(last)";
             min-width: 1px;
             height: 50px;
             transition: inherit;
             flex-shrink: 0;
             position: relative;
         }
         
         .stylablebutton643855516__icon > div,.stylablebutton643855516__icon svg {
             width: inherit;
             height: inherit;
             position: relative;
             top: 0;
             left: 0;
         }
         
         .stylableline2123045772__root {
             -archetype: box;
             box-sizing: border-box;
         }
         .stylableline2123045772__text {
             -archetype: text;
         }
         
         .horizontalmenucolumnslayout852678809__root {
           -archetype: paddingBox;
           box-sizing: border-box;
           transition: inherit;
           overflow: hidden;
         }
         
         .horizontalmenucolumnslayout852678809__root.horizontalmenucolumnslayout852678809--isCollapsed {
           height: 0 !important;
           box-shadow: none !important;
           border-color: transparent !important;
           border-bottom-width: 0 !important;
           border-top-width: 0 !important;
           padding-top: 0 !important;
           padding-bottom: 0 !important;
         }
         
         .horizontalmenucolumnslayout852678809__listWrapper {
           max-width: 100%;
         }
         
         .horizontalmenucolumnslayout852678809__pageWrapper {
           display: flex;
           margin: 0 auto;
           max-width: 100%;
         }
         
         /* columns menu item */
         .horizontalmenucolumnslayout852678809__menuItem {
         }
         
         /* columns submenu item */
         .horizontalmenucolumnslayout852678809__submenuItem {
         }
         
         .horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:first-of-type > span,.horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:first-of-type > a,.horizontalmenucolumnslayout852678809__root > ul > li:first-of-type > span,.horizontalmenucolumnslayout852678809__root > ul > li:first-of-type > a {
           margin-top: unset !important;
         }
         
         .horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:last-of-type > span,.horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:last-of-type > a,.horizontalmenucolumnslayout852678809__root > ul > li:last-of-type > span,.horizontalmenucolumnslayout852678809__root > ul > li:last-of-type > a {
           margin-bottom: unset !important;
         }
         
         .horizontalmenu2645433724__root {
         
           box-sizing: border-box;
         
           transition: inherit;
         }
         
         .horizontalmenu2645433724__container {
           overflow: hidden;
           display: flex;
           height: 100%;
         }
         
         .horizontalmenu2645433724__menu {
           display: flex;
         
           box-sizing: border-box;
         }
         
         .horizontalmenu2645433724__scrollControls {
           position: absolute;
           top: 0;
           right: 0;
           bottom: 0;
           left: 0;
           padding-top: inherit;
           padding-bottom: inherit;
           border: inherit;
           border-color: transparent;
         
           display: flex;
           overflow: hidden;
           justify-content: space-between;
         
           pointer-events: none;
         
           border-radius: inherit;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll .horizontalmenu2645433724__menu > li > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll .horizontalmenu2645433724__menu > li > a {
           margin-top: unset;
           margin-bottom: unset;
           box-sizing: border-box;
           height: 100%;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-4-wrap .horizontalmenu2645433724__menu {
           flex-wrap: wrap;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:first-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:first-of-type > a,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:last-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:last-of-type > a {
           margin-left: unset;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:last-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:last-of-type > a,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:first-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:first-of-type > a {
           margin-right: unset;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll .horizontalmenu2645433724__menu {
           height: unset;
           width: unset;
           margin: unset;
           flex-wrap: nowrap;
           transition: padding-right .1s !important;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll {
           height: 100%;
           display: flex;
           overflow-x: scroll;
           scrollbar-width: none;
           -ms-overflow-style: none;
           -webkit-overflow-scrolling: touch;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll::-webkit-scrollbar {
           display: none;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724--isScrollable .horizontalmenu2645433724__menu {
           padding-right: inherit;
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__root {
           -archetype: paddingBox;
           box-sizing: border-box;
           transition: inherit;
           overflow: hidden;
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__root.horizontalmenucolumnssubmenulayout1903511735--isCollapsed {
           height: 0 !important;
           box-shadow: none !important;
           border-color: transparent !important;
           border-bottom-width: 0 !important;
           border-top-width: 0 !important;
           padding-top: 0 !important;
           padding-bottom: 0 !important;
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__listWrapper {
           width: 100%;
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__pageWrapper {
           display: flex;
           margin: 0 auto;
           max-width: 100%;
         }
         
         /* columns menu item */
         .horizontalmenucolumnssubmenulayout1903511735__menuItem {
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:first-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:first-of-type > a,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:first-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:first-of-type > a {
           margin-top: unset !important;
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:last-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:last-of-type > a,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:last-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:last-of-type > a {
           margin-bottom: unset !important;
         }
         
         /**
          * For focus-ring to be applied inside items BB
          */
         .visual-focus-on .focus-ring:not(.has-custom-focus):focus {
           box-shadow: inset 0 0 0 1px #ffffff, inset 0 0 0 3px #116dff;
         }
         
         .stylablehorizontalmenu4089050981__root {
           height: 100%;
           width: 100%;
           box-sizing: border-box;
         }
         
         .stylablehorizontalmenu4089050981__menu {}
         
         /* root menu item */
         .stylablehorizontalmenu4089050981__menuItem {
         }
         
         .stylablehorizontalmenu4089050981__scrollButton {
         }
         
         /* first level submenu */
         .stylablehorizontalmenu4089050981__columnsLayout {
         }
         
         .stylablehorizontalmenu4089050981__leftAlignmentScrollItem {}
         
         .stylablehorizontalmenu4089050981__rightAlignmentScrollItem {}
         
         .stylablehorizontalmenu4089050981__menuItem .horizontalmenuitem1808041630__label {
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
           transition: inherit;
         }
         
         .stylablehorizontalmenu4089050981__menuItem .horizontalmenuitem1808041630__container {
           align-items: center;
         }
         
         .stylablehorizontalmenu4089050981__columnsLayout .horizontalmenucolumnslayout852678809__menuItem .horizontalmenusubitem329750698__label {
           overflow-wrap: break-word;
           text-overflow: clip;
           white-space: normal;
           overflow: hidden;
         }
         </style><style id="rke15_css">
         /*site css*/
         .style-kf8sqbcc__root{-st-extends: StylableButton;transition: all 0.2s ease, visibility 0s;border-radius: 0px;background: #F7EA73}.style-kf8sqbcc__root:hover{border-bottom: 3px solid rgb(110, 22, 35);padding-bottom: 3px}.style-kf8sqbcc__root[disabled]{background: #E2E2E2}.style-kf8sqbcc__root[disabled] .stylablebutton643855516__label{color: #8F8F8F}.style-kf8sqbcc__root[disabled] .stylablebutton643855516__icon{fill: #8F8F8F}.style-kf8sqbcc__root .stylablebutton643855516__container{transition: inherit}.style-kf8sqbcc__root .stylablebutton643855516__label{transition: inherit;text-transform: uppercase;font-family: futura-lt-w01-book,sans-serif;font-size: 20px;letter-spacing: 0.1em;color: #6E1623}.style-kf8sqbcc__root .stylablebutton643855516__icon{transition: inherit;width: 14px;height: 14px;fill: #6E1623;display: none}</style></div><div data-aid="stylesContainer"><style type="text/css" data-styleid="style-k6auwcww">.style-k6auwcww {display:none;}</style><style type="text/css" data-styleid="pc1">.pc1screenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
         .pc1[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
         .pc1[data-state~="fixedPosition"].pc1_footer {top:auto;bottom:0;}
         .pc1bg {position:absolute;top:0;right:0;bottom:0;left:0;}
         .pc1[data-is-absolute-layout="true"] > .pc1centeredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
         .pc1[data-is-absolute-layout="true"] > .pc1centeredContent > .pc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="siteBackground">.siteBackground {width:100%;position:absolute;}
         .siteBackgroundbgBeforeTransition {position:absolute;top:0;}
         .siteBackgroundbgAfterTransition {position:absolute;top:0;}</style><style type="text/css" data-styleid="style-k7ugjln5">.style-k7ugjln5screenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7ugjln5[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
         .style-k7ugjln5[data-state~="fixedPosition"].style-k7ugjln5_footer {top:auto;bottom:0;}
         .style-k7ugjln5_bg {position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.6);  background-color:rgba(18, 17, 15, 0.81);border-top:0px solid rgba(18, 17, 15, 1);border-bottom:0px solid rgba(18, 17, 15, 1);background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/bevel_300.png);background-repeat:repeat-x;}
         .style-k7ugjln5bg {position:absolute;top:0px;right:0;bottom:0px;left:0;}
         .style-k7ugjln5[data-state~="mobileView"] .style-k7ugjln5bg {left:10px;right:10px;}
         .style-k7ugjln5[data-is-absolute-layout="true"] > .style-k7ugjln5centeredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7ugjln5[data-is-absolute-layout="true"] > .style-k7ugjln5centeredContent > .style-k7ugjln5inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="style-k7ugjugc">.style-k7ugjugcscreenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7ugjugc[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
         .style-k7ugjugc[data-state~="fixedPosition"].style-k7ugjugc_footer {top:auto;bottom:0;}
         .style-k7ugjugc_bg {position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.6);  background-color:rgba(18, 17, 15, 1);border-top:0px solid rgba(18, 17, 15, 1);border-bottom:0px solid rgba(18, 17, 15, 1);background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/bevel_300.png);background-repeat:repeat-x;}
         .style-k7ugjugcbg {position:absolute;top:0px;right:0;bottom:0px;left:0;}
         .style-k7ugjugc[data-state~="mobileView"] .style-k7ugjugcbg {left:10px;right:10px;}
         .style-k7ugjugc[data-is-absolute-layout="true"] > .style-k7ugjugccenteredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7ugjugc[data-is-absolute-layout="true"] > .style-k7ugjugccenteredContent > .style-k7ugjugcinlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="style-kd8jx4k6">.style-kd8jx4k6bg {border:0px solid rgba(18, 17, 15, 1);background-color:rgba(255, 255, 255, 1);border-radius:0;  position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-kd8jx4k6[data-is-absolute-layout="true"] > .style-kd8jx4k6inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="txtNew">.txtNew {word-wrap:break-word;text-align:start;}
         .txtNew_override-left * {text-align:left !important;}
         .txtNew_override-right * {text-align:right !important;}
         .txtNew_override-center * {text-align:center !important;}
         .txtNew_override-justify * {text-align:justify !important;}
         .txtNew > * {pointer-events:auto;}
         .txtNew li {font-style:inherit;font-weight:inherit;line-height:inherit;letter-spacing:normal;}
         .txtNew ol,.txtNew ul {padding-left:1.3em;padding-right:0;margin-left:0.5em;margin-right:0;line-height:normal;letter-spacing:normal;}
         .txtNew ul {list-style-type:disc;}
         .txtNew ol {list-style-type:decimal;}
         .txtNew ul ul,.txtNew ol ul {list-style-type:circle;}
         .txtNew ul ul ul,.txtNew ol ul ul {list-style-type:square;}
         .txtNew ul ol ul,.txtNew ol ol ul {list-style-type:square;}
         .txtNew ul[dir="rtl"],.txtNew ol[dir="rtl"] {padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;}
         .txtNew ul[dir="rtl"] ul,.txtNew ul[dir="rtl"] ol,.txtNew ol[dir="rtl"] ul,.txtNew ol[dir="rtl"] ol {padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;}
         .txtNew p {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h1 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h2 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h3 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h4 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h5 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h6 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew a {color:inherit;}</style><style type="text/css" data-styleid="style-jr9629o5">.style-jr9629o5 {box-sizing:border-box;border-top:1px solid rgba(255, 255, 255, 0.15);height:0;}</style><style type="text/css" data-styleid="style-k7to9w85">.style-k7to9w85itemsContainer {width:calc(100% - 0px);height:calc(100% - 0px);white-space:nowrap;display:inline-block;overflow:visible;position:absolute;}
         .style-k7to9w85moreContainer {overflow:visible;display:inherit;white-space:nowrap;width:auto;background-color:rgba(18, 17, 15, 1);border-radius:0;  }
         .style-k7to9w85dropWrapper {z-index:99999;display:block;opacity:1;visibility:hidden;position:absolute;margin-top:7px;}
         .style-k7to9w85 > nav {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7to9w85dropWrapper[data-dropMode="dropUp"] {margin-top:0;margin-bottom:7px;}
         .style-k7to9w85navContainer_with-validation-indication select:not([data-preview~="focus"]):invalid {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k7to9w85navContainer {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
         .style-k7to9w85navContainer select {border-radius:0;  -webkit-appearance:none;-moz-appearance:none;  font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif;  background-color:rgba(18, 17, 15, 1);color:#FFFFFF;border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-width:1px;border-left-width:0px;border-right-width:0px;margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;}
         .style-k7to9w85navContainer select option {text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;}
         .style-k7to9w85navContainer select.style-k7to9w85navContainer_placeholder-style {color:#12110F;}
         .style-k7to9w85navContainer select.style-k7to9w85navContainer_extended-placeholder-style {color:#888888;}
         .style-k7to9w85navContainer select:-moz-focusring {color:transparent;text-shadow:0 0 0 #000;}
         .style-k7to9w85navContainer select::-ms-expand {display:none;}
         .style-k7to9w85navContainer select:focus::-ms-value {background:transparent;}
         .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):hover,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="hover"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(18, 17, 15, 1);}
         .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):focus,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="focus"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-error="true"],.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="error"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):disabled,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-disabled="true"],.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="disabled"] {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;background-color:rgba(204, 204, 204, 1);}
         .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):disabled + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-disabled="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="disabled"] + .style-k7to9w85navContainerarrow {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;border:none;}
         .style-k7to9w85navContainerarrow {position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-left-width:1px;}
         .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container {width:12px;}
         .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container svg {height:100%;fill:rgba(184, 181, 174, 1);}
         .style-k7to9w85navContainer_left-direction {text-align-last:left;}
         .style-k7to9w85navContainer_left-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-right:0;}
         .style-k7to9w85navContainer_left-direction .style-k7to9w85navContainerarrow {right:0;border-left-width:1px;}
         .style-k7to9w85navContainer_right-direction {text-align-last:right;direction:rtl;}
         .style-k7to9w85navContainer_right-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-left:0;}
         .style-k7to9w85navContainer_right-direction .style-k7to9w85navContainerarrow {left:0;border-right-width:1px;}
         .style-k7to9w85navContainer_center-direction {text-align-last:left;text-align-last:center;}
         .style-k7to9w85navContainer_center-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-right:0;}
         .style-k7to9w85navContainer_center-direction .style-k7to9w85navContainerarrow {right:0;border-left-width:1px;}
         .style-k7to9w85navContainer_mobileMenuContainer {border:0;}
         .style-k7to9w85navContainer_mobileMenuContainer .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container .style-k7to9w85navContainericon {fill:#FFFFFF;}
         .style-k7to9w85navContainerlabel {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  color:#12110F;word-break:break-word;display:inline-block;line-height:1;}
         .style-k7to9w85navContainer_required .style-k7to9w85navContainerlabel::after {content:" *";color:transparent;}
         .style-k7to9w85navContainer_selector-wrapper {-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;}
         .style-k7to9w85repeaterButton {height:100%;position:relative;box-sizing:border-box;display:inline-block;cursor:pointer;font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif;}
         .style-k7to9w85repeaterButton[data-state~="header"] a,.style-k7to9w85repeaterButton[data-state~="header"] div {cursor:default !important;}
         .style-k7to9w85repeaterButtonlinkElement {display:inline-block;height:100%;width:100%;}
         .style-k7to9w85repeaterButton_gapper {padding:0 5px;}
         .style-k7to9w85repeaterButtonlabel {display:inline-block;padding:0 10px;color:#FFFFFF;transition:color 0.4s ease 0s;}
         .style-k7to9w85repeaterButton[data-state~="drop"] {width:100%;display:block;}
         .style-k7to9w85repeaterButton[data-state~="drop"] .style-k7to9w85repeaterButtonlabel {padding:0 .5em;}
         .style-k7to9w85repeaterButton[data-state~="over"] .style-k7to9w85repeaterButtonlabel,.style-k7to9w85repeaterButton[data-preview~="hover"] .style-k7to9w85repeaterButtonlabel {color:#FFD504;transition:color 0.4s ease 0s;}
         .style-k7to9w85repeaterButton[data-state~="selected"] .style-k7to9w85repeaterButtonlabel,.style-k7to9w85repeaterButton[data-preview~="active"] .style-k7to9w85repeaterButtonlabel {color:#FFD504;transition:color 0.4s ease 0s;}</style><style type="text/css" data-styleid="style-k7ns13ap">.style-k7ns13ap_zoomedin {cursor:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_out.png), url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_out.cur), auto;overflow:hidden;display:block;}
         .style-k7ns13ap_zoomedout {cursor:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_in.png), url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_in.cur), auto;}
         .style-k7ns13aplink {display:block;overflow:hidden;}
         .style-k7ns13apimg {overflow:hidden;}
         .style-k7ns13ap[data-is-responsive=true] .style-k7ns13aplink,.style-k7ns13ap[data-is-responsive=true] .style-k7ns13apimg,.style-k7ns13ap[data-is-responsive=true] wix-image {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7ns13apimgimage {position:static;box-shadow:#000 0 0 0;user-select:none;}</style><style type="text/css" data-styleid="lb1">.lb1[data-is-responsive~="false"] .lb1itemsContainer {position:absolute;width:100%;height:100%;white-space:nowrap;}
         .lb1[data-is-responsive~="false"][data-state~="mobileView"] .lb1itemsContainer {position:absolute;width:100%;height:100%;white-space:normal;}
         .lb1[data-is-responsive~="true"] {display:table;}
         .lb1[data-is-responsive~="true"] .lb1itemsContainer {display:-webkit-box;display:-webkit-flex;display:flex;}
         .lb1itemsContainer > li:last-child {margin:0 !important;}
         .lb1 a {display:block;height:100%;}
         .lb1imageItemlink {cursor:pointer;}
         .lb1imageItemimageimage {position:static;box-shadow:#000 0 0 0;user-select:none;}</style><style type="text/css" data-styleid="strc1">.strc1:not([data-mobile-responsive]) > .strc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
         .strc1[data-mobile-responsive] > .strc1inlineContent {position:relative;}
         .strc1[data-responsive] {display:-ms-grid;display:grid;justify-content:center;grid-template-columns:100%;grid-template-rows:1fr;-ms-grid-columns:100%;-ms-grid-rows:1fr;}
         .strc1[data-responsive] > .strc1inlineContent {display:flex;}
         .strc1[data-responsive] > * {position:relative;grid-row-start:1;grid-column-start:1;grid-row-end:2;grid-column-end:2;-ms-grid-row-span:1;-ms-grid-column-span:1;margin:0 auto;}</style><style type="text/css" data-styleid="mc1">.mc1:not([data-mobile-responsive]) .mc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
         .mc1:not([data-mobile-responsive]) .mc1container {position:relative;height:100%;top:0;}</style><style type="text/css" data-styleid="style-k6auwexi1">.style-k6auwexi1 > ul {display:table;width:100%;box-sizing:border-box;}
         .style-k6auwexi1 li {display:table;width:100%;}
         .style-k6auwexi1 a span {pointer-events:none;}
         .style-k6auwexi1_noLink {cursor:default !important;}
         .style-k6auwexi1_counter {margin:0 10px;opacity:0.6;}
         .style-k6auwexi1menuContainer {padding:0;margin:0;border:solid 1px rgba(18, 17, 15, 0.2);position:relative;  border-radius:0;}
         .style-k6auwexi1menuContainer .style-k6auwexi1_emptySubMenu {display:none !important;}
         .style-k6auwexi1_itemHoverArea {box-sizing:content-box;border-bottom:solid 0px rgba(18, 17, 15, 1);}
         .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item {border-radius:0;    border-bottom-left-radius:0;border-bottom-right-radius:0;}
         .style-k6auwexi1_itemHoverArea:last-child {border-bottom:0 solid transparent;}
         .style-k6auwexi1_itemHoverArea:last-child > .style-k6auwexi1_item {border-radius:0;      border-top-left-radius:0;border-top-right-radius:0;border-bottom:0 solid transparent;}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item {transition:background-color 0.4s ease 0s;}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover .style-k6auwexi1_subMenu {opacity:1;display:block;}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover:not(.style-k6auwexi1_noLink) > .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover:not(.style-k6auwexi1_noLink) > .style-k6auwexi1_item > .style-k6auwexi1_label {color:#363430;}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item > .style-k6auwexi1_label,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item > .style-k6auwexi1_label {color:#FFB703;}
         .style-k6auwexi1_item {height:100%;padding-left:30px;padding-right:30px;transition:background-color 0.4s ease 0s;  margin:0;position:relative;cursor:pointer;list-style:none;background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1_label {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  color:#12110F;display:inline;white-space:nowrap;overflow:hidden;}
         .style-k6auwexi1_subMenu {z-index:999;min-width:100%;display:none;opacity:0;transition:all 0.4s ease 0s;  position:absolute;border:solid 1px rgba(18, 17, 15, 0.2);border-radius:0;  }
         .style-k6auwexi1_subMenu .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1_subMenu .style-k6auwexi1_label {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;}
         .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item,.style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child:last-child > .style-k6auwexi1_item {border-radius:0;}
         .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item {border-bottom-left-radius:0;border-bottom-right-radius:0;}
         .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:last-child {border-bottom:0 solid transparent;}
         .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:last-child > .style-k6auwexi1_item {border-radius:0;      border-top-left-radius:0;border-top-right-radius:0;border-bottom:0 solid transparent;}
         .style-k6auwexi1_subMenu:before {background-color:#fff;opacity:0;z-index:999;content:" ";display:block;width:calc(0px + 1px);height:100%;position:absolute;top:0;}
         .style-k6auwexi1[data-state~="items-align-left"] .style-k6auwexi1_item {text-align:left;}
         .style-k6auwexi1[data-state~="items-align-center"] .style-k6auwexi1_item {text-align:center;}
         .style-k6auwexi1[data-state~="items-align-right"] .style-k6auwexi1_item {text-align:right;}
         .style-k6auwexi1[data-state~="subItems-align-left"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:left;padding-left:30px;padding-right:30px;}
         .style-k6auwexi1[data-state~="subItems-align-center"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:center;padding-left:30px;padding-right:30px;}
         .style-k6auwexi1[data-state~="subItems-align-right"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:right;padding-left:30px;padding-right:30px;}
         .style-k6auwexi1[data-state~="subMenuOpenSide-right"] .style-k6auwexi1_subMenu {left:100%;float:left;margin-left:0px;}
         .style-k6auwexi1[data-state~="subMenuOpenSide-right"] .style-k6auwexi1_subMenu:before {right:100%;}
         .style-k6auwexi1[data-state~="subMenuOpenSide-left"] .style-k6auwexi1_subMenu {right:100%;float:right;margin-right:0px;}
         .style-k6auwexi1[data-state~="subMenuOpenSide-left"] .style-k6auwexi1_subMenu:before {left:100%;}
         .style-k6auwexi1[data-open-direction~="subMenuOpenDir-down"] .style-k6auwexi1_subMenu {top:calc(-1 * 1px);}
         .style-k6auwexi1[data-open-direction~="subMenuOpenDir-up"] .style-k6auwexi1_subMenu {bottom:calc(-1 * 1px);}
         .style-k6auwexi1menuContainer_with-validation-indication select:not([data-preview~="focus"]):invalid {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1menuContainer {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
         .style-k6auwexi1menuContainer select {border-radius:0;  -webkit-appearance:none;-moz-appearance:none;  font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  background-color:rgba(255, 255, 255, 1);color:#12110F;border-width:1px;  border-style:solid;border-color:rgba(18, 17, 15, 0.2);margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;}
         .style-k6auwexi1menuContainer select option {text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;}
         .style-k6auwexi1menuContainer select.style-k6auwexi1menuContainer_placeholder-style {color:#12110F;}
         .style-k6auwexi1menuContainer select.style-k6auwexi1menuContainer_extended-placeholder-style {color:#888888;}
         .style-k6auwexi1menuContainer select:-moz-focusring {color:transparent;text-shadow:0 0 0 #000;}
         .style-k6auwexi1menuContainer select::-ms-expand {display:none;}
         .style-k6auwexi1menuContainer select:focus::-ms-value {background:transparent;}
         .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):hover,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="hover"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):focus,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="focus"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-error="true"],.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="error"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):disabled,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-disabled="true"],.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="disabled"] {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;background-color:rgba(204, 204, 204, 1);}
         .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):disabled + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-disabled="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="disabled"] + .style-k6auwexi1menuContainerarrow {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;border:none;}
         .style-k6auwexi1menuContainerarrow {position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;}
         .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container {width:12px;}
         .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container svg {height:100%;fill:rgba(184, 181, 174, 1);}
         .style-k6auwexi1menuContainer_left-direction {text-align-last:left;}
         .style-k6auwexi1menuContainer_left-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-left:0;}
         .style-k6auwexi1menuContainer_left-direction .style-k6auwexi1menuContainerarrow {right:0;}
         .style-k6auwexi1menuContainer_right-direction {text-align-last:right;direction:rtl;}
         .style-k6auwexi1menuContainer_right-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-right:0;}
         .style-k6auwexi1menuContainer_right-direction .style-k6auwexi1menuContainerarrow {left:0;}
         .style-k6auwexi1menuContainer_center-direction {text-align-last:left;text-align-last:center;}
         .style-k6auwexi1menuContainer_center-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-left:0;}
         .style-k6auwexi1menuContainer_center-direction .style-k6auwexi1menuContainerarrow {right:0;}
         .style-k6auwexi1menuContainer_mobileMenuContainer {border:0;}
         .style-k6auwexi1menuContainer_mobileMenuContainer .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container .style-k6auwexi1menuContainericon {fill:#12110F;}
         .style-k6auwexi1menuContainerlabel {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  color:#12110F;word-break:break-word;display:inline-block;line-height:1;}
         .style-k6auwexi1menuContainer_required .style-k6auwexi1menuContainerlabel::after {content:" *";color:transparent;}
         .style-k6auwexi1menuContainer_selector-wrapper {-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;}</style><style type="text/css" data-styleid="tpaw0">.tpaw0 {overflow:hidden;}
         .tpaw0 iframe {position:absolute;width:100%;height:100%;overflow:hidden;}
         .tpaw0 iframe:-webkit-full-screen {min-height:auto !important;}
         .tpaw0preloaderOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
         .tpaw0preloaderOverlaycontent {width:100%;height:100%;}
         .tpaw0unavailableMessageOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
         .tpaw0unavailableMessageOverlaycontent {width:100%;height:100%;background:rgba(255, 255, 255, 0.9);font-size:0;margin-top:5px;}
         .tpaw0unavailableMessageOverlaytextContainer {color:#373737;font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;font-size:14px;display:inline-block;vertical-align:middle;width:100%;margin-top:10px;text-align:center;}
         .tpaw0unavailableMessageOverlayreloadButton {display:inline-block;}
         .tpaw0unavailableMessageOverlay a {color:#0099FF;text-decoration:underline;cursor:pointer;}
         .tpaw0unavailableMessageOverlayiconContainer {display:none;}
         .tpaw0unavailableMessageOverlaydismissButton {display:none;}
         .tpaw0unavailableMessageOverlaytextTitle {font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;display:none;}
         .tpaw0unavailableMessageOverlay[data-state~="hideIframe"] .tpaw0unavailableMessageOverlay_buttons {opacity:1;}
         .tpaw0unavailableMessageOverlay[data-state~="hideOverlay"] {display:none;}</style><style type="text/css" data-styleid="style-k6hsf3sb">.style-k6hsf3sb[data-state~="touchRollOver"] .style-k6hsf3sb_opc {opacity:1;}
         .style-k6hsf3sbemptyDivToFillMatrix {width:1px;height:1px;opacity:0;}
         .style-k6hsf3sb_opc {transition:opacity 0.3s ease 0s;  opacity:0;color:#FFFFFF;}
         .style-k6hsf3sb:hover[data-state~="notMobile"] .style-k6hsf3sb_opc {opacity:1;}
         .style-k6hsf3sbitemsContainer {overflow:hidden;height:100% !important;}
         .style-k6hsf3sbrolloverHolder {box-sizing:border-box !important;font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  background-color:rgba(117, 115, 109, 0.5);transition:opacity 0s;  color:#FFFFFF;opacity:0;padding:10px !important;overflow:hidden;cursor:pointer;}
         .style-k6hsf3sbrolloverHolder > div {width:100% !important;}
         .style-k6hsf3sb[data-state~="rollover"] .style-k6hsf3sbrolloverHolder {transition:opacity 0.3s ease 0s;  opacity:1;}
         .style-k6hsf3sbtitle {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:normal normal normal 28px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;}
         .style-k6hsf3sbdescription {white-space:pre-line;overflow:hidden;max-height:60%;}
         .style-k6hsf3sblink {overflow:hidden;white-space:nowrap;text-decoration:underline;color:#2F2E2E;position:absolute;bottom:10px;left:10px;right:10px;}
         .style-k6hsf3sb_buttons {transition:opacity 0.3s ease 0s;  opacity:0;position:absolute;left:0;right:0;top:50%;margin-top:-15px;}
         .style-k6hsf3sb[data-state~="mobile"] .style-k6hsf3sb_buttons {opacity:1;}
         .style-k6hsf3sb_buttons a {transition:opacity 0.3s ease 0s;  opacity:0.6;width:45px;height:65px;background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/arrows_white_new3.png);background-repeat:no-repeat;cursor:pointer;position:absolute;}
         .style-k6hsf3sb[data-state~="mobile"] .style-k6hsf3sb_buttons a {opacity:1;}
         .style-k6hsf3sbbuttonPrev {left:20px;background-position:0 0;left:20px;background-position:0 0;}
         .style-k6hsf3sbbuttonNext {right:20px;background-position:100% 0;right:20px;background-position:100% 0;}
         .style-k6hsf3sb:hover > .style-k6hsf3sb_buttons {opacity:1;}
         .style-k6hsf3sb_buttons a:hover {opacity:1;}
         .style-k6hsf3sb_hlp {position:absolute;color:#FFFFFF;}
         .style-k6hsf3sb_hlp span {display:block;}
         .style-k6hsf3sbautoplay {right:35px;bottom:10px;}
         .style-k6hsf3sbcounter {right:10px;bottom:8px;font-size:13px;}
         .style-k6hsf3sb[data-state~="noLink"] .style-k6hsf3sblink {display:none;}
         .style-k6hsf3sb[data-state~="autoplayOff"] .style-k6hsf3sbautoplay > span {border:6px solid transparent;border-left:6px solid #FFFFFF;}
         .style-k6hsf3sb[data-state~="autoplayOn"] .style-k6hsf3sbautoplay > span {border-left:3px solid #FFFFFF;border-right:3px solid #FFFFFF;margin-right:5px;height:12px;width:1px;}
         .style-k6hsf3sbimgimage {position:static;box-shadow:#000 0 0 0;user-select:none;}</style><style type="text/css" data-styleid="style-k6hsf3t3">.style-k6hsf3t3 button.style-k6hsf3t3link {width:100%;}
         .style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3labelwrapper {text-align:initial;display:flex;align-items:center;}
         .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="center"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="center"] .style-k6hsf3t3labelwrapper {justify-content:center;}
         .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="left"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="left"] .style-k6hsf3t3labelwrapper {justify-content:flex-start;}
         .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="right"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="right"] .style-k6hsf3t3labelwrapper {justify-content:flex-end;}
         .style-k6hsf3t3link {border-radius:0;  position:absolute;top:0;right:0;bottom:0;left:0;transition:border-color 0.4s ease 0s, background-color 0.4s ease 0s;  }
         .style-k6hsf3t3label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;  transition:color 0.4s ease 0s;  color:#FFFFFF;display:inline-block;margin:calc(-1 * 0px) 0px 0;position:relative;white-space:nowrap;}
         .style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3label {margin:0;}
         .style-k6hsf3t3[data-disabled="false"] .style-k6hsf3t3link {background-color:rgba(255, 183, 3, 1);border:solid rgba(126, 127, 130, 1) 0px;cursor:pointer !important;}
         .style-k6hsf3t3[data-disabled="false"]:active[data-state~="mobile"] .style-k6hsf3t3link,.style-k6hsf3t3[data-disabled="false"]:hover[data-state~="desktop"] .style-k6hsf3t3link,.style-k6hsf3t3[data-disabled="false"][data-preview~="hover"] .style-k6hsf3t3link {background-color:rgba(255, 255, 255, 1);border-color:rgba(18, 17, 15, 1);}
         .style-k6hsf3t3[data-disabled="false"]:active[data-state~="mobile"] .style-k6hsf3t3label,.style-k6hsf3t3[data-disabled="false"]:hover[data-state~="desktop"] .style-k6hsf3t3label,.style-k6hsf3t3[data-disabled="false"][data-preview~="hover"] .style-k6hsf3t3label {color:#12110F;}
         .style-k6hsf3t3[data-disabled="true"] .style-k6hsf3t3link,.style-k6hsf3t3[data-preview~="disabled"] .style-k6hsf3t3link {background-color:rgba(204, 204, 204, 1);border:solid rgba(18, 17, 15, 1) 0px;}
         .style-k6hsf3t3[data-disabled="true"] .style-k6hsf3t3label,.style-k6hsf3t3[data-preview~="disabled"] .style-k6hsf3t3label {color:#FFFFFF;}</style><style type="text/css" data-styleid="controller1">.controller1 {display:none;}</style><style type="text/css" data-styleid="style-kf8s5xvn">.style-kf8s5xvn {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
         .style-kf8s5xvntextarea {  border-radius:0;  font:normal normal normal 14px/1.4em avenir-lt-w01_35-light1475496,sans-serif;  border-width:2px;  -webkit-appearance:none;resize:none;background-color:rgba(255, 255, 255, 1);box-sizing:border-box !important;color:#000000;border-style:solid;border-color:rgba(145, 145, 145, 1);padding:3px;margin:0;padding-top:0.75em;max-width:100%;min-width:100%;overflow-y:auto;-webkit-box-flex:1;-webkit-flex:1;flex:1;}
         .style-kf8s5xvntextarea::-webkit-input-placeholder {color:#7F808A;}
         .style-kf8s5xvntextarea::placeholder {color:#7F808A;}
         .style-kf8s5xvntextarea:hover,.style-kf8s5xvntextarea[data-preview~="hover"] {border-width:2px;    background-color:rgba(242, 250, 249, 1);border-style:solid;border-color:rgba(92, 92, 92, 1);}
         .style-kf8s5xvn_left-direction .style-kf8s5xvntextarea {text-align:left;}
         .style-kf8s5xvn_right-direction .style-kf8s5xvntextarea {text-align:right;direction:rtl;}
         .style-kf8s5xvn_center-direction .style-kf8s5xvntextarea {text-align:center;}
         .style-kf8s5xvn[data-disabled="true"] .style-kf8s5xvntextarea,.style-kf8s5xvn[data-preview~="disabled"] .style-kf8s5xvntextarea {background-color:rgba(255, 255, 255, 1);color:#DBDBDB;border-width:1px;  border-style:solid;border-color:rgba(219, 219, 219, 1);}
         :not(.style-kf8s5xvn_with-validation-indication) .style-kf8s5xvntextarea:focus,:not(.style-kf8s5xvn_with-validation-indication) .style-kf8s5xvntextarea[data-preview~="focus"] {border-width:2px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(0, 0, 0, 1);}
         .style-kf8s5xvn_with-validation-indication .style-kf8s5xvntextarea:invalid {border-width:1px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(255, 64, 64, 1);}
         .style-kf8s5xvn_with-validation-indication .style-kf8s5xvntextarea:not(:invalid):focus,.style-kf8s5xvn_with-validation-indication .style-kf8s5xvntextarea[data-preview~="focus"] {border-width:2px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(0, 0, 0, 1);}
         .style-kf8s5xvn[data-error="true"] .style-kf8s5xvntextarea,.style-kf8s5xvn[data-preview~="error"] .style-kf8s5xvntextarea {border-width:1px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(255, 64, 64, 1);}
         .style-kf8s5xvnlabel {font:normal normal 700 14px/1.4em avenir-lt-w01_35-light1475496,sans-serif;  color:#61615F;word-break:break-word;display:inline-block;line-height:1;}
         .style-kf8s5xvn_required .style-kf8s5xvnlabel::after {content:" *";color:transparent;}</style><style type="text/css" data-styleid="b1">.b1 button.b1link {width:100%;}
         .b1[data-state~="shouldUseFlex"] .b1link,.b1[data-state~="shouldUseFlex"] .b1labelwrapper {text-align:initial;display:flex;align-items:center;}
         .b1[data-state~="shouldUseFlex"][data-state~="center"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="center"] .b1labelwrapper {justify-content:center;}
         .b1[data-state~="shouldUseFlex"][data-state~="left"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="left"] .b1labelwrapper {justify-content:flex-start;}
         .b1[data-state~="shouldUseFlex"][data-state~="right"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="right"] .b1labelwrapper {justify-content:flex-end;}
         .b1link {border-radius:0;  position:absolute;top:0;right:0;bottom:0;left:0;transition:border-color 0.4s ease 0s, background-color 0.4s ease 0s;  }
         .b1label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;  transition:color 0.4s ease 0s;  color:#FFFFFF;display:inline-block;margin:calc(-1 * 0px) 0px 0;position:relative;white-space:nowrap;}
         .b1[data-state~="shouldUseFlex"] .b1label {margin:0;}
         .b1[data-disabled="false"] .b1link {background-color:rgba(18, 17, 15, 1);border:solid rgba(126, 127, 130, 1) 0px;cursor:pointer !important;}
         .b1[data-disabled="false"]:active[data-state~="mobile"] .b1link,.b1[data-disabled="false"]:hover[data-state~="desktop"] .b1link,.b1[data-disabled="false"][data-preview~="hover"] .b1link {background-color:rgba(255, 183, 3, 1);border-color:rgba(18, 17, 15, 1);}
         .b1[data-disabled="false"]:active[data-state~="mobile"] .b1label,.b1[data-disabled="false"]:hover[data-state~="desktop"] .b1label,.b1[data-disabled="false"][data-preview~="hover"] .b1label {color:#7E7F82;}
         .b1[data-disabled="true"] .b1link,.b1[data-preview~="disabled"] .b1link {background-color:rgba(204, 204, 204, 1);border:solid rgba(18, 17, 15, 1) 0px;}
         .b1[data-disabled="true"] .b1label,.b1[data-preview~="disabled"] .b1label {color:#FFFFFF;}</style><style type="text/css" data-styleid="b4">.b4 button.b4link {width:100%;}
         .b4[data-state~="shouldUseFlex"] .b4link,.b4[data-state~="shouldUseFlex"] .b4labelwrapper {text-align:initial;display:flex;align-items:center;}
         .b4[data-state~="shouldUseFlex"][data-state~="center"] .b4link,.b4[data-state~="shouldUseFlex"][data-state~="center"] .b4labelwrapper {justify-content:center;}
         .b4[data-state~="shouldUseFlex"][data-state~="left"] .b4link,.b4[data-state~="shouldUseFlex"][data-state~="left"] .b4labelwrapper {justify-content:flex-start;}
         .b4[data-state~="shouldUseFlex"][data-state~="right"] .b4link,.b4[data-state~="shouldUseFlex"][data-state~="right"] .b4labelwrapper {justify-content:flex-end;}
         .b4[data-disabled="false"] {cursor:pointer;}
         .b4[data-disabled="false"]:active[data-state~="mobile"] .b4label,.b4[data-disabled="false"]:hover[data-state~="desktop"] .b4label,.b4[data-disabled="false"][data-preview~="hover"] .b4label {color:#FFB703;transition:color 0.4s ease 0s;}
         .b4link {position:absolute;top:0;right:0;bottom:0;left:0;}
         .b4label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;  transition:color 0.4s ease 0s;  color:#12110F;white-space:nowrap;display:inline-block;}
         .b4[data-disabled="true"] .b4label,.b4[data-preview~="disabled"] .b4label {color:#FFFFFF;}</style><style type="text/css" data-styleid="style-kf8sbpeg">.style-kf8sbpegbg {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-kf8sbpeg[data-state~="mobileView"] .style-kf8sbpegbg {left:10px;right:10px;}
         .style-kf8sbpeginlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="s_DtaksTPAWidgetSkin">.s_DtaksTPAWidgetSkin {overflow:hidden;}
         .s_DtaksTPAWidgetSkin iframe {position:absolute;width:100%;height:100%;overflow:hidden;}
         .s_DtaksTPAWidgetSkin iframe:-webkit-full-screen {min-height:auto !important;}
         .s_DtaksTPAWidgetSkinpreloaderOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
         .s_DtaksTPAWidgetSkinpreloaderOverlaycontent {width:100%;height:100%;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlaycontent {width:100%;height:100%;background:rgba(255, 255, 255, 0.9);font-size:0;margin-top:5px;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlaytextContainer {color:#373737;font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;font-size:14px;display:inline-block;vertical-align:middle;width:100%;margin-top:10px;text-align:center;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlayreloadButton {display:inline-block;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlay a {color:#0099FF;text-decoration:underline;cursor:pointer;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlayiconContainer {display:none;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlaydismissButton {display:none;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlaytextTitle {font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;display:none;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlay[data-state~="hideIframe"] .s_DtaksTPAWidgetSkinunavailableMessageOverlay_buttons {opacity:1;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlay[data-state~="hideOverlay"] {display:none;}</style><style type="text/css" data-styleid="comp-kf8sqbal-rotated">#comp-kf8sqbal {transform: rotate(270deg)}</style></div><div class="noop visual-focus-on" style="position:relative"><div id="SCROLL_TO_TOP" tabindex="-1" aria-label="top of page" role="region" style="height:0"></div><div id="FONTS_CONTAINER"></div><div id="SITE_BACKGROUND" style="height:100%;top:0;min-height:calc(100vh - 0px);bottom:;left:;right:;position:" class="siteBackground"><div id="SITE_BACKGROUND_previous_noPrev" data-position="absolute" data-align="" data-fitting="" class="siteBackgroundprevious"><div id="SITE_BACKGROUNDpreviousImage" class="siteBackgroundpreviousImage"></div><div id="SITE_BACKGROUNDpreviousVideo" class="siteBackgroundpreviousVideo"></div><div id="SITE_BACKGROUND_previousOverlay_noPrev" class="siteBackgroundpreviousOverlay"></div></div><div id="SITE_BACKGROUND_current_rke15_desktop_bg" style="top:0;height:100%;width:100%;background-color:rgba(255, 183, 3, 1);display:;position:absolute" data-position="absolute" data-align="top_left" data-fitting="legacy_tile" class="siteBackgroundcurrent"><div id="SITE_BACKGROUND_currentImage_rke15_desktop_bg" style="position:absolute;top:0;height:100%;width:100%" data-type="bgimage" data-height="100%" class="siteBackgroundcurrentImage"></div><div id="SITE_BACKGROUNDcurrentVideo" class="siteBackgroundcurrentVideo"></div><div id="SITE_BACKGROUND_currentOverlay_rke15_desktop_bg" style="position:absolute;top:0;width:100%;height:100%" class="siteBackgroundcurrentOverlay"></div></div></div><div id="SITE_ROOT" class="SITE_ROOT" style="width:100%;min-width:980px;padding-bottom:0;top:0" aria-hidden="false"><div id="masterPage" class="mesh-layout" data-mesh-layout="grid"><header data-is-absolute-layout="false" data-is-mobile="false" data-state="transition-allowed" data-site-width="980" data-header-top="0" style="position:relative;margin-top:0;left:0;margin-left:0;width:100%;min-width:980px;top:;bottom:;right:;display:none" class="style-k7ugjugc" id="SITE_HEADER"><div style="left:0;width:100%" id="SITE_HEADERscreenWidthBackground" class="style-k7ugjugcscreenWidthBackground"><div class="style-k7ugjugc_bg"></div></div><div id="SITE_HEADERcenteredContent" class="style-k7ugjugccenteredContent"><div style="margin-left:calc((100% - 980px) / 2);width:980px" id="SITE_HEADERbg" class="style-k7ugjugcbg"></div><div id="SITE_HEADERinlineContent" class="style-k7ugjugcinlineContent"><style id="SITE_HEADER-mesh-styles">
             
         #SITE_HEADERinlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #SITE_HEADERinlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #SITE_HEADERinlineContent-gridContainer {
             position: static;
             display: grid;
             height: auto;
             width: 100%;
             min-height: auto;
             grid-template-rows: min-content min-content min-content min-content min-content 1fr;
             grid-template-columns: 100%;
         }
         
         #comp-j1rq4q3c1 {
             position: relative;
             margin: 13px 0 7px 0;
             left: 0;
             grid-area: 2 / 1 / 3 / 2;
             justify-self: stretch;
             align-self: start;
         }
         
         #comp-k557vagj {
             position: relative;
             margin: 0px 0px -14px calc((100% - 980px) * 0.5);
             left: 0px;
             grid-area: 1 / 1 / 2 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-j1rq742h {
             position: relative;
             margin: 0px 0px 23px calc((100% - 980px) * 0.5);
             left: 360px;
             grid-area: 2 / 1 / 6 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-k7nv6chl {
             position: absolute;
             top: 124px;
             left: 740px;
         }
         
         #comp-j1rq4q3b {
             position: relative;
             margin: 0px 0px 30px calc((100% - 980px) * 0.5);
             left: 1190px;
             grid-area: 3 / 1 / 4 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-j1rq4q3b1 {
             position: relative;
             margin: 0px 0px 48px calc((100% - 980px) * 0.5);
             left: 1240px;
             grid-area: 4 / 1 / 5 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-j1rq4r8a {
             position: relative;
             margin: 0px 0px 38px calc((100% - 980px) * 0.5);
             left: -1px;
             grid-area: 6 / 1 / 7 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #SITE_HEADERcenteredContent {
             position: relative;
         }
         
         #SITE_HEADERinlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #SITE_HEADERinlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #SITE_HEADERinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="SITE_HEADERinlineContent-gridWrapper" data-mesh-internal="true"><div id="SITE_HEADERinlineContent-gridContainer" data-mesh-internal="true"><div data-border-width="1px" style="transform-origin:center 0.5px;left:0;margin-left:0;width:100%;min-width:initial;top:;bottom:;right:;height:5px;position:;display:none" class="style-jr9629o5" id="comp-j1rq4q3c1"></div><section style="left:0;width:100%;min-width:980px;height:auto;top:;bottom:;right:;position:;display:none;margin-left:0" data-responsive="true" data-is-screen-width="true" data-col-margin="0" data-row-margin="0" class="strc1" id="comp-k557vagj"><div style="position:absolute;top:0;width:calc(100% - 0px);height:100%;overflow:hidden;pointer-events:auto;min-width:980px;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="strc1balata" id="comp-k557vagjbalata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557vagjbalatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557vagjbalatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div style="position:relative;width:calc(100% - 0px);min-width:980px" id="comp-k557vagjinlineContent" class="strc1inlineContent"><div style="position:relative;width:100%;left:0;flex:325;margin-left:0;min-width:325px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="325" data-is-mesh="true" class="mc1" id="comp-k557vaxc"><div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557vaxccontainer"><div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557vaxcbalata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557vaxcbalatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557vaxcbalatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557vaxcinlineContentParent"><div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557vaxcinlineContent"><style id="comp-k557vaxc-mesh-styles">
             
         #comp-k557vaxcinlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #comp-k557vaxcinlineContent-gridContainer {
             position: static;
             height: auto;
             width: 100%;
             min-height: 98px;
         }
         
         #comp-k557vaxccenteredContent {
             position: relative;
         }
         
         #comp-k557vaxcinlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #comp-k557vaxcinlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #comp-k557vaxcinlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #comp-k557vaxcinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="comp-k557vaxcinlineContent-gridContainer" data-mesh-internal="true"></div></div></div></div></div><div style="position:relative;width:100%;left:0;flex:326;margin-left:0px;min-width:326px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="326" data-is-mesh="true" class="mc1" id="comp-k557wjr8"><div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557wjr8container"><div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557wjr8balata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557wjr8balatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557wjr8balatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557wjr8inlineContentParent"><div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557wjr8inlineContent"><style id="comp-k557wjr8-mesh-styles">
             
         #comp-k557wjr8inlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #comp-k557wjr8inlineContent-gridContainer {
             position: static;
             height: auto;
             width: 100%;
             min-height: 98px;
         }
         
         #comp-k557wjr8centeredContent {
             position: relative;
         }
         
         #comp-k557wjr8inlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #comp-k557wjr8inlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #comp-k557wjr8inlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #comp-k557wjr8inlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="comp-k557wjr8inlineContent-gridContainer" data-mesh-internal="true"></div></div></div></div></div><div style="position:relative;width:100%;left:0;flex:329;margin-left:0px;min-width:329px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="329" data-is-mesh="true" class="mc1" id="comp-k557wp6h"><div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557wp6hcontainer"><div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557wp6hbalata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557wp6hbalatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557wp6hbalatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557wp6hinlineContentParent"><div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557wp6hinlineContent"><style id="comp-k557wp6h-mesh-styles">
             
         #comp-k557wp6hinlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #comp-k557wp6hinlineContent-gridContainer {
             position: static;
             height: auto;
             width: 100%;
             min-height: 98px;
         }
         
         #comp-k557wp6hcenteredContent {
             position: relative;
         }
         
         #comp-k557wp6hinlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #comp-k557wp6hinlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #comp-k557wp6hinlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #comp-k557wp6hinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="comp-k557wp6hinlineContent-gridContainer" data-mesh-internal="true"></div></div></div></div></div></div></section><div style="top:;bottom:;left:;right:;width:189px;height:128px;position:;display:none" title="" data-is-responsive="false" data-display-mode="fill" data-content-padding-horizontal="0" data-content-padding-vertical="0" data-exact-height="128" class="style-k7ns13ap" id="comp-j1rq742h"></div><div style="width:;height:;top:;bottom:;left:;right:;position:;display:none" class="controller1" id="comp-k7nv6chl"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:204px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-j1rq4q3b"><p class="font_9" style="line-height:1.55em; margin-left:40px;"><span style="font-family:roboto-bold,roboto,sans-serif;"><</a></span></p></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:150px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-j1rq4q3b1"><p class="font_9" style="line-height:1.55em; text-align:center;"><span style="font-family:roboto-bold,roboto,sans-serif;"></span></p></div><div id="comp-j1rq4r8a" class="hidden-during-prewarmup style-k7to9w85" style="overflow-x:hidden;top:;bottom:;left:;right:;width:980px;height:30px;position:;display:none" data-stretch-buttons-to-menu-width="true" data-same-width-buttons="false" data-num-items="8" data-menuborder-y="0" data-menubtn-border="0" data-ribbon-els="0" data-label-pad="0" data-ribbon-extra="0" data-drophposition="" data-dropalign="left" dir="ltr" data-state="left notMobile"><nav aria-label="Site" id="comp-j1rq4r8anavContainer" class="style-k7to9w85navContainer"><ul style="text-align:left" id="comp-j1rq4r8aitemsContainer" class="style-k7to9w85itemsContainer"><li data-direction="ltr" data-listposition="left" data-data-id="dataItem-j1rp5ha3" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a0"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k7tq7ym2" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a1"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-j1rpaj7y" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a2"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k7ud6l51" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a3"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k6sazqs1" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a4"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-jrgep25b" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a5"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-kcmg5nn2" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a6"></li><li data-direction="ltr" data-listposition="right" data-data-id="dataItem-k6i0cpy8" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a7"></li><li data-listposition="right" class="style-k7to9w85repeaterButton" data-state="menu  idle header notMobile" id="comp-j1rq4r8a__more__"></li></ul><div id="comp-j1rq4r8amoreButton" class="style-k7to9w85moreButton"></div><div style="visibility:hidden" data-drophposition="" data-dropalign="left" id="comp-j1rq4r8adropWrapper" class="style-k7to9w85dropWrapper"><ul style="visibility:hidden" id="comp-j1rq4r8amoreContainer" class="style-k7to9w85moreContainer"></ul></div></nav></div></div></div></div></div></header><main tabindex="-1" data-is-mobile="false" data-is-mesh="true" data-site-width="980" style="left:0;margin-left:0;width:100%;min-width:980px;top:0;bottom:;right:;position:" class="pc1" data-state="" id="PAGES_CONTAINER"><div style="left:0" id="PAGES_CONTAINERscreenWidthBackground" class="pc1screenWidthBackground"></div><div style="position:relative" id="PAGES_CONTAINERcenteredContent" class="pc1centeredContent"><div style="display:none" id="PAGES_CONTAINERbg" class="pc1bg"></div><div style="position:relative" id="PAGES_CONTAINERinlineContent" class="pc1inlineContent"><div style="width:100%"><div data-ismobile="false" data-is-mesh-layout="true" style="height:100%;left:0;position:relative;top:;bottom:;right:" class="style-kf8sbpeg" id="rke15"><div style="margin-left:calc((100% - 980px) / 2);width:980px" id="rke15bg" class="style-kf8sbpegbg"></div><div class="style-kf8sbpeginlineContent" id="rke15inlineContent"><style id="rke15-mesh-styles">
             
         #rke15inlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #rke15inlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #rke15inlineContent-gridContainer {
             position: static;
             display: grid;
             height: auto;
             width: 100%;
             min-height: 500px;
             grid-template-rows: min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content 1fr;
             grid-template-columns: 100%;
             padding-bottom: 0px;
             box-sizing: border-box;
         }
         
         #comp-kf8sqbal {
             position: relative;
             left: 380px;
             top: 226px;
         }
         
         #comp-kf8ryq20 {
             position: relative;
             margin: 27px 0px 19px calc((100% - 980px) * 0.5);
             left: 20px;
             grid-area: 1 / 1 / 2 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8rw8tn {
             position: relative;
             margin: 0px 0px -13px calc((100% - 980px) * 0.5);
             left: 30px;
             grid-area: 3 / 1 / 4 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfb3ktl2 {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 450px;
             grid-area: 4 / 1 / 10 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfb3m2tz {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 290px;
             grid-area: 4 / 1 / 11 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfpyrzoh {
             position: relative;
             margin: 2px 0px -15px calc((100% - 980px) * 0.5);
             left: 30px;
             grid-area: 4 / 1 / 7 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tjsl3 {
             position: relative;
             margin: 0px 0px -8px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 2 / 1 / 3 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tp69s {
             position: relative;
             margin: 25px 0px -4px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 3 / 1 / 5 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tkx3g {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 7 / 1 / 8 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8s5xt9 {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 30px;
             grid-area: 14 / 1 / 21 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8sqbal-rotated-wrapper {
             position: static;
             height: 480px;
             width: 0;
             margin: 4px 0px -29px calc((100% - 980px) * 0.5);
             grid-area: 1 / 1 / 24 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tqtc5 {
             position: relative;
             margin: 7px 0px 12px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 14 / 1 / 15 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tred7 {
             position: relative;
             margin: 0px 0px 15px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 15 / 1 / 16 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8ts8az {
             position: relative;
             margin: 0px 0px 21px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 16 / 1 / 17 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tsu8k {
             position: relative;
             margin: 0px 0px 18px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 17 / 1 / 18 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8ttbhv {
             position: relative;
             margin: 0px 0px 11px calc((100% - 980px) * 0.5);
             left: 669px;
             grid-area: 18 / 1 / 19 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8ttcnw {
             position: relative;
             margin: 0px 0px 28px calc((100% - 980px) * 0.5);
             left: 669px;
             grid-area: 19 / 1 / 20 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfyyya {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 310px;
             grid-area: 4 / 1 / 12 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfz7nq {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 330px;
             grid-area: 4 / 1 / 13 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfzeot {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 358px;
             grid-area: 4 / 1 / 14 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfzr63 {
             position: relative;
             margin: 1px 0px -1px calc((100% - 980px) * 0.5);
             left: 419px;
             grid-area: 4 / 1 / 9 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvg3jl5 {
             position: relative;
             margin: 0px 0px -9px calc((100% - 980px) * 0.5);
             left: 399px;
             grid-area: 5 / 1 / 6 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tv20d {
             position: relative;
             margin: 0px 0px 23px calc((100% - 980px) * 0.5);
             left: 660px;
             grid-area: 21 / 1 / 22 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8s6j8x {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 10px;
             grid-area: 22 / 1 / 23 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfxgp6 {
             position: relative;
             margin: 0px 0px 8px calc((100% - 980px) * 0.5);
             left: 40px;
             grid-area: 24 / 1 / 25 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfxk97 {
             position: relative;
             margin: 0px 0px 8px calc((100% - 980px) * 0.5);
             left: 109px;
             grid-area: 24 / 1 / 25 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8sfbtj {
             position: relative;
             margin: 0px 0px 15px calc((100% - 980px) * 0.5);
             left: 430px;
             grid-area: 23 / 1 / 47 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfpx9ii3 {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 109px;
             grid-area: 47 / 1 / 48 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #rke15centeredContent {
             position: relative;
         }
         
         #rke15inlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #rke15inlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #rke15inlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="rke15inlineContent-gridWrapper" data-mesh-internal="true"><div id="rke15inlineContent-gridContainer" data-mesh-internal="true"><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:310px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ryq20"><h6 class="font_6">Practice</h6></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:591px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8rw8tn"><p class="font_8" style="font-size:15px; line-height:1.3em;"><span style="font-weight:bold;"><span style="letter-spacing:0.03em;"><span style="font-family:avenir-lt-w01_35-light1475496,sans-serif;"><span style="font-size:15px;"><span style="color:#000000;">Persuasion is the attempt to influence someone's belief,</span></span></span></span></span></p>
         
         <p class="font_8" style="font-size:15px; line-height:1.3em;"><span style="letter-spacing:0.03em;"><span style="font-family:avenir-lt-w01_35-light1475496,sans-serif;"><span style="font-size:15px;"><span style="color:#000000;"><span style="font-weight:bold;">attitude, and intentions.</span> (example definition, text in parameter file)</span></span></span></span></p></div><div id="comp-kfb3ktl2" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?&workerId='+'`+workerID+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&task_type='+'`+task+`'+'&block='+'`+block+`'+'&mission_state=fwd'+'&ans_n='+'&ans_y='" id="comp-kfb3ktl2link" class="b4link"><span id="comp-kfb3ktl2label" class="b4label"></span></a></div><div id="comp-kfb3m2tz" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?&workerId='+'`+workerID+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&task_type='+'`+task+`'+'&block='+'`+block+`'+'&mission_state=bkd'+'&ans_n='+'&ans_y='" id="comp-kfb3m2tzlink" class="b4link"><span id="comp-kfb3m2tzlabel" class="b4label">&lt;&lt;</span></a></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:42px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfpyrzoh"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:310px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tjsl3"><h6 class="font_6">Introduction</h6></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tp69s"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Definition</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tkx3g"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">About the t</span></span></span><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">ask</span></span></span></span></a></span></h2></div><div class="style-kf8s5xvn_left-direction style-kf8s5xvn" style="top:;bottom:;left:;right:;width:469px;height:210px;position:" data-state="valid" id="comp-kf8s5xt9"><label style="padding-left:0;padding-right:20px;display:none;margin-bottom:14px;text-align:left;direction:ltr" for="comp-kf8s5xt9textarea" id="comp-kf8s5xt9label" class="style-kf8s5xvnlabel"></label><textarea style="padding-left:16px;padding-right:10px" placeholder="" readonly="" class="has-custom-focus style-kf8s5xvntextarea" id="comp-kf8s5xt9textarea">`+tweet_text+`</textarea></div><div id="comp-kf8sqbal-rotated-wrapper" data-mesh-internal="true"><div id="comp-kf8sqbal" style="top:;bottom:;left:;right:;width:480px;height:28px;position:" data-angle="270"><button type="button" aria-label="Introduction" class="stylablebutton643855516__root style-kf8sqbcc__root" style="position:absolute" id="comp-kf8sqbal-inner-button"><div class="stylablebutton643855516__container"><span class="stylablebutton643855516__label">Introduction</span><span class="stylablebutton643855516__icon" aria-hidden="true"><div><svg data-bbox="13.05 2.55 33.878 54.8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
             <g>
                 <path d="M46.5 28.9L20.6 3c-.6-.6-1.6-.6-2.2 0l-4.8 4.8c-.6.6-.6 1.6 0 2.2l19.8 20-19.9 19.9c-.6.6-.6 1.6 0 2.2l4.8 4.8c.6.6 1.6.6 2.2 0l21-21 4.8-4.8c.8-.6.8-1.6.2-2.2z"/>
             </g>
         </svg>
         </div></span></div></button></div></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tqtc5"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Example</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tred7"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Trigger Alert</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ts8az"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">What you should consider</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tsu8k"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">What you need to ask yourself</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ttbhv"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ttcnw"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;"></span></span></span></span></a></span></h2></div><div id="comp-kfvfyyya" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?&workerId='+'`+workerID+`'+'&task_type='+'`+task+`'+'&missionVal='+'`+mission_val+`'+'&block='+'`+block+`'+'&missionId=1'+'&ans_n='+'&ans_y='+'&mission_state=msc'" id="comp-kfvfyyyalink" class="b4link"><span id="comp-kfvfyyyalabel" class="b4label"></span></a></div><div id="comp-kfvfz7nq" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a id="comp-kfvfz7nqlink" class="b4link"><span id="comp-kfvfz7nqlabel" class="b4label"></span></a></div><div id="comp-kfvfzeot" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a id="comp-kfvfzeotlink" class="b4link"><span id="comp-kfvfzeotlabel" class="b4label"></span></a></div><div id="comp-kfvfzr63" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a id="comp-kfvfzr63link" class="b4link"><span id="comp-kfvfzr63label" class="b4label">`+fin_q+`</span></a></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:20px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfvg3jl5"><p class="font_10"><span style="font-weight:bold;"><span style="color:#000000;">ID:</span></span></p></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tv20d"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">How to report</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:330px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8s6j8x"><p class="font_8" style="font-size:15px; line-height:1.3em;"><span style="font-weight:bold;color:#000000;">`+foot_note+`<span style="letter-spacing:0.03em;"><span style="font-family:avenir-lt-w01_35-light1475496,sans-serif;"><span style="font-size:15px;"><span style="color:#000000;"></span></span></span></span></span></p></div><div id="comp-kfvfxgp6" data-align="center" data-disabled="true" data-margin="0" data-should-use-flex="true" data-width="42" data-height="35" style="top:;bottom:;left:;right:;width:42px;height:35px;position:" class="b1" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?ans_y=YES'+'&ans_n='+'&workerId='+'`+workerID+`'+'&task_type='+'`+task+`'+'&block='+'`+block+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&mission_state=chk'" id="comp-kfvfxgp6link" class="g-transparent-a b1link"><span id="comp-kfvfxgp6label" class="b1label">Yes</span></a></div><div id="comp-kfvfxk97" data-align="center" data-disabled="true" data-margin="0" data-should-use-flex="true" data-width="40" data-height="35" style="top:;bottom:;left:;right:;width:40px;height:35px;position:" class="b1" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?ans_n=NO'+'&ans_y='+'&workerId='+'`+workerID+`'+'&task_type='+'`+task+`'+'&missionVal='+'`+mission_val+`'+'&block='+'`+block+`'+'&missionId='+'`+mission_id+`'+'&mission_state=chk'" id="comp-kfvfxk97link" class="g-transparent-a b1link"><span id="comp-kfvfxk97label" class="b1label">No</span></a></div><div id="comp-kf8sfbtj" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="131" data-height="35" style="top:;bottom:;left:;right:;width:161px;height:65px;position:" class="b1" data-state="desktop shouldUseFlex center"><a target="_self" onclick="href='/maintask/?&workerId='+'`+workerID+`'+'&task_type='+'`+task+`'+'&block='+'`+block+`'+'&missionVal=0'+'&missionId=1'+'&mission_state=msc'" id="comp-kf8sfbtjlink" class="g-transparent-a b1link"><span id="comp-kf8sfbtjlabel" class="b1label">Practice Complete. </BR>Proceed to Task</span></a></div><div class="style-kf8s5xvn_left-direction style-kf8s5xvn" style="top:;bottom:;left:;right:;width:330px;height:85px;position:" data-state="valid" id="comp-kfpx9ii3"><label style="padding-left:0;padding-right:20px;display:none;margin-bottom:14px;text-align:left;direction:ltr" for="comp-kfpx9ii3textarea" id="comp-kfpx9ii3label" class="style-kf8s5xvnlabel"></label><textarea style="padding-left:16px;padding-right:10px" placeholder="" class="has-custom-focus style-kf8s5xvntextarea" id="comp-kfpx9ii3textarea">`+Mrinal+`</textarea></div></div></div></div></div></div></div></div></main><div id="soapAfterPagesContainer" class="page-without-sosp"><style id="soapAfterPagesContainer-mesh-styles">
             
         #soapAfterPagesContainerinlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #soapAfterPagesContainerinlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #soapAfterPagesContainerinlineContent-gridContainer {
             position: static;
             display: grid;
             height: auto;
             width: 100%;
             min-height: auto;
             grid-template-rows: 1fr;
             grid-template-columns: 100%;
             padding-bottom: 0px;
             box-sizing: border-box;
         }
         
         #comp-j1rtn0ml {
             position: relative;
             margin: 6px 0 0 0;
             left: 0;
             grid-area: 1 / 1 / 2 / 2;
             justify-self: stretch;
             align-self: start;
         }
         
         #CONTROLLER_COMP_CUSTOM_ID {
             position: absolute;
             top: -288px;
             left: 20px;
         }
         
         #soapAfterPagesContainercenteredContent {
             position: relative;
         }
         
         #soapAfterPagesContainerinlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #soapAfterPagesContainerinlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #soapAfterPagesContainerinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="soapAfterPagesContainerinlineContent-gridWrapper" data-mesh-internal="true"><div id="soapAfterPagesContainerinlineContent-gridContainer" data-mesh-internal="true"><div data-border-width="1px" style="transform-origin:center 0.5px;left:0;margin-left:0;width:100%;min-width:initial;top:;bottom:;right:;height:5px;position:;display:none" class="style-jr9629o5" id="comp-j1rtn0ml"></div><div style="width:;height:;top:;bottom:;left:;right:;position:;display:none" class="style-k6auwcww" id="CONTROLLER_COMP_CUSTOM_ID"></div></div></div></div><footer style="bottom:auto;left:0;margin-left:0;width:100%;min-width:980px;top:;right:;position:;display:none" class="style-k7ugjln5_footer style-k7ugjln5" tabindex="-1" data-site-width="980" data-fixedposition="false" data-isrunninginmobile="false" data-is-absolute-layout="false" data-state=" " id="SITE_FOOTER"><div style="left:0;width:100%" id="SITE_FOOTERscreenWidthBackground" class="style-k7ugjln5screenWidthBackground"><div class="style-k7ugjln5_bg"></div></div><div style="width:100%" id="SITE_FOOTERcenteredContent" class="style-k7ugjln5centeredContent"><div style="margin-left:calc((100% - 980px) / 2);width:980px" id="SITE_FOOTERbg" class="style-k7ugjln5bg"></div><div id="SITE_FOOTERinlineContent" class="style-k7ugjln5inlineContent"><style id="SITE_FOOTER-mesh-styles">
             
         #SITE_FOOTERinlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #SITE_FOOTERinlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #SITE_FOOTERinlineContent-gridContainer {
             position: static;
             display: grid;
             height: auto;
             width: 100%;
             min-height: 423px;
             grid-template-rows: min-content min-content min-content min-content min-content 1fr;
             grid-template-columns: 100%;
         }
         
         #comp-j1rq4r8m {
             position: relative;
             margin: 60px 0px 25px calc((100% - 980px) * 0.5);
             left: -1px;
             grid-area: 1 / 1 / 4 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-j9zs014r {
             position: relative;
             margin: 0px 0px 19px calc((100% - 980px) * 0.5);
             left: 0px;
             grid-area: 5 / 1 / 6 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-k6huwtfd {
             position: relative;
             margin: 60px 0px 46px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 1 / 1 / 2 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-k6hsf3rx {
             position: relative;
             margin: 0px 0px 40px calc((100% - 980px) * 0.5);
             left: 610px;
             grid-area: 2 / 1 / 3 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-k6hsf3sr {
             position: relative;
             margin: 0px 0px -7px calc((100% - 980px) * 0.5);
             left: 680px;
             grid-area: 4 / 1 / 5 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-jhi0p1w8 {
             position: relative;
             margin: 0px 0px 10px calc((100% - 980px) * 0.5);
             left: 0px;
             grid-area: 6 / 1 / 7 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #SITE_FOOTERcenteredContent {
             position: relative;
         }
         
         #SITE_FOOTERinlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #SITE_FOOTERinlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #SITE_FOOTERinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="SITE_FOOTERinlineContent-gridWrapper" data-mesh-internal="true"><div id="SITE_FOOTERinlineContent-gridContainer" data-mesh-internal="true"><div data-packed="false" data-vertical-text="false" style="top:;bottom:;left:;right:;width:253px;height:auto;position:;display:none;min-height:120px;pointer-events:none" data-min-height="120" class="txtNew" id="comp-j1rq4r8m"><p class="font_8" style="font-size:22px;"><span style="font-size:22px;"><span class="color_18"><span style="text-decoration:underline;"><</span></span></span></p>
         
         </div><div data-is-responsive="false" style="width:118px;height:30px;top:;bottom:;left:;right:;position:;display:none" data-hide-prejs="true" class="lb1" id="comp-j9zs014r"><ul aria-label="Social bar" id="comp-j9zs014ritemsContainer" class="lb1itemsContainer"><li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r0image"></li><li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r1image"></li><li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r2image"></li></ul></div><div data-packed="false" data-vertical-text="false" style="top:;bottom:;left:;right:;width:219px;height:auto;position:;display:none;min-height:25px;pointer-events:none" data-min-height="25" class="txtNew" id="comp-k6huwtfd"></div><div data-height-diff="0" data-width-diff="0" data-num-cols="2" data-max-rows="3" data-margin="15" data-is-mesh="true" style="overflow:hidden;top:;bottom:;left:;right:;width:285px;height:79px;position:;display:none" class="style-k6hsf3sb" data-state="hidePlayButton autoplayOff idle notMobile desktopView  touchRollOut" id="comp-k6hsf3rx"><div data-gallery-id="comp-k6hsf3rx" class="style-k6hsf3sb_show-counter style-k6hsf3sbitemsContainer" style="position:relative;overflow:hidden;width:285px;height:79px" id="comp-k6hsf3rxitemsContainer"><div style="transform:none;position:absolute;width:135px;height:79px;left:0;top:0;overflow:hidden;clip:auto" data-has-bg-scroll-effect="" data-style="position:absolute;overflow:hidden;clip:auto" data-gallery-id="comp-k6hsf3rx" data-page-desc="curr" data-query="dataItem-k6hsf5hc4" data-image-index="0" class="style-k6hsf3sbimg" id="comp-k6hsf3rxdataItem-k6hsf5hc4"><img id="comp-k6hsf3rxdataItem-k6hsf5hc4image" alt="" data-type="image" itemProp="image"/></div><div style="transform:none;position:absolute;width:135px;height:79px;left:150px;top:0;overflow:hidden;clip:auto" data-has-bg-scroll-effect="" data-style="position:absolute;overflow:hidden;clip:auto" data-gallery-id="comp-k6hsf3rx" data-page-desc="curr" data-query="dataItem-k6hsf5hc" data-image-index="1" class="style-k6hsf3sbimg" id="comp-k6hsf3rxdataItem-k6hsf5hc"><img id="comp-k6hsf3rxdataItem-k6hsf5hcimage" alt="" data-type="image" itemProp="image"/></div></div><div style="visibility:hidden;cursor:pointer" data-gallery-id="comp-k6hsf3rx" data-hovered-image-id="" id="comp-k6hsf3rxrolloverHolder" class="style-k6hsf3sbrolloverHolder"><h3 data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxtitle" class="style-k6hsf3sbtitle"></h3><p data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxdescription" class="style-k6hsf3sbdescription"></p><a id="comp-k6hsf3rxlink" class="style-k6hsf3sblink"></a><a href="#" style="height:100%;display:block;width:100%;position:absolute;top:0px;left:0px;background-color:#ffffff;filter:alpha(opacity=0);opacity:0;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-drag:none;-webkit-user-drag:none;-moz-user-drag:none;-ms-user-drag:none;user-modify:read-only;-webkit-user-modify:read-only;-moz-user-modify:read-only;-ms-user-modify:read-only"></a></div><div class="style-k6hsf3sb_buttons"><a data-gallery-id="comp-k6hsf3rx" style="visibility:hidden" id="comp-k6hsf3rxbuttonPrev" class="style-k6hsf3sbbuttonPrev"></a><a data-gallery-id="comp-k6hsf3rx" style="visibility:hidden" id="comp-k6hsf3rxbuttonNext" class="style-k6hsf3sbbuttonNext"></a></div><div style="visibility:visible" data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxcounter" class="style-k6hsf3sb_hlp style-k6hsf3sb_opc style-k6hsf3sbcounter">1/1</div><div data-gallery-id="comp-k6hsf3rx" style="cursor:pointer;visibility:hidden" id="comp-k6hsf3rxautoplay" class="style-k6hsf3sb_hlp style-k6hsf3sb_opc style-k6hsf3sbautoplay"><span></span></div><div id="comp-k6hsf3rxemptyDivToFillMatrix" class="style-k6hsf3sbemptyDivToFillMatrix"></div></div><div id="comp-k6hsf3sr" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="131" data-height="35" style="top:;bottom:;left:;right:;width:131px;height:35px;position:;display:none" class="style-k6hsf3t3" data-state="desktop shouldUseFlex center"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:109px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-jhi0p1w8"><p class="font_9" style="text-align:center; font-size:14px;"><span style="font-size:14px;"><span class="color_11"><span style="text-decoration:underline;"></span></span></span></p></div></div></div></div></div></footer></div></div><div id="aspectCompsContainer" class="siteAspectsContainer"><div style="position:absolute" id="popoverLayer"></div><wix-iframe style="top:;bottom:;left:;right:;position:;overflow:hidden;visibility:hidden" data-has-iframe="true" data-src="https://apps.wix.com/members-area/app-worker?cacheKiller=1601836289450&amp;commonConfig=%7B%7BcommonConfig%7D%7D&amp;compId=tpaWorker_9180&amp;consent-policy=%7B%7BconsentPolicy%7D%7D&amp;deviceType=desktop&amp;endpointType=worker&amp;instance=miJuHq7rqXBbBUbn2Zd0ho7e2KzdSOGVyNq5rFvlIEk.eyJpbnN0YW5jZUlkIjoiZWI5OWQ0NWItZThkMS00N2ZmLWE2ZWEtMGNhNDllMDExY2Q2IiwiYXBwRGVmSWQiOiIxNGNlMjhmNy03ZWIwLTM3NDUtMjJmOC0wNzRiMGUyNDAxZmIiLCJtZXRhU2l0ZUlkIjoiZTk4ZGRjM2MtM2E2Yy00Zjk5LTg3YTMtZGQ1M2U5YjdhOWNlIiwic2lnbkRhdGUiOiIyMDIwLTEwLTA0VDE4OjM3OjI0LjU5NVoiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjdmODNiMGIxLTE4NWItNGEzMy1iOWMzLWYwY2E0YzM0YmZkMiIsImJpVG9rZW4iOiIwMjE0MDg2Ny1kMmJkLTA4NjYtMjE0OS1kMWY3NzdiNmI1MTgiLCJzaXRlT3duZXJJZCI6IjU3NThjNGIzLWVkODYtNDdkYi05Yjc3LWQ4YjZhNjAyZmI3ZiJ9&amp;locale=en&amp;siteRevision=1372&amp;viewMode=site&amp;viewerCompId=tpaWorker_9180" data-is-tpa="true" data-app-definition-id="14ce28f7-7eb0-3745-22f8-074b0e2401fb" id="tpaWorker_9180" class="s_DtaksTPAWidgetSkin"><iframe data-src="https://apps.wix.com/members-area/app-worker?cacheKiller=1601836289450&amp;commonConfig=%7B%7BcommonConfig%7D%7D&amp;compId=tpaWorker_9180&amp;consent-policy=%7B%7BconsentPolicy%7D%7D&amp;deviceType=desktop&amp;endpointType=worker&amp;instance=miJuHq7rqXBbBUbn2Zd0ho7e2KzdSOGVyNq5rFvlIEk.eyJpbnN0YW5jZUlkIjoiZWI5OWQ0NWItZThkMS00N2ZmLWE2ZWEtMGNhNDllMDExY2Q2IiwiYXBwRGVmSWQiOiIxNGNlMjhmNy03ZWIwLTM3NDUtMjJmOC0wNzRiMGUyNDAxZmIiLCJtZXRhU2l0ZUlkIjoiZTk4ZGRjM2MtM2E2Yy00Zjk5LTg3YTMtZGQ1M2U5YjdhOWNlIiwic2lnbkRhdGUiOiIyMDIwLTEwLTA0VDE4OjM3OjI0LjU5NVoiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjdmODNiMGIxLTE4NWItNGEzMy1iOWMzLWYwY2E0YzM0YmZkMiIsImJpVG9rZW4iOiIwMjE0MDg2Ny1kMmJkLTA4NjYtMjE0OS1kMWY3NzdiNmI1MTgiLCJzaXRlT3duZXJJZCI6IjU3NThjNGIzLWVkODYtNDdkYi05Yjc3LWQ4YjZhNjAyZmI3ZiJ9&amp;locale=en&amp;siteRevision=1372&amp;viewMode=site&amp;viewerCompId=tpaWorker_9180" scrolling="no" frameBorder="0" allow="autoplay; camera; microphone; geolocation;" allowtransparency="true" allowfullscreen="" name="tpaWorker_9180" style="display:none;position:absolute;z-index:" title="Profile Card" aria-label="Profile Card" id="tpaWorker_9180iframe" class="s_DtaksTPAWidgetSkiniframe"></iframe><div id="tpaWorker_9180overlay" class="s_DtaksTPAWidgetSkinoverlay"></div></wix-iframe></div><div id="SCROLL_TO_BOTTOM" tabindex="-1" aria-label="bottom of page" role="region" style="height:0"></div><script id="partiallyVisibleBeat">
                         if (window.wixBiSession) {
                             wixBiSession.isUsingMesh = true;
                             if (wixBiSession.sendBeat) {
                                 wixBiSession.sendBeat(12, 'Partially visible', '&pid=rke15');
                             }
                         }
                         if (window.requestCloseWelcomeScreen) {
                             requestCloseWelcomeScreen();
                         }
                     </script></div><div class="font-ruler-container" style="overflow:hidden;visibility:hidden;max-height:0;max-width:0;position:absolute"><style>.font-ruler-content::after {content:"@#$%%^&*~IAO"}</style><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div></div></div>
         
         
             
            
             
         
         
             
             
             
             
         
             
                 <!-- No Footer -->
             
         
             
             
             
             
             
             
             
             <!--body end html embeds start-->
             
             <!--body end html embeds end-->
             
             
             
         
             
             
             
             
             
         
             
         
         
         </body>
         </html>
         `);
         

         

         } else {

            yes_val="false";
            no_val="false";
            sql =  `select * from practice_data where question_number = ${mission_id} and mission_id=${task};`;
            console.log(sql);
             pool.on('error',function(err,client){});
    
      pool.query(sql,(error, results) => {
        
         tweet_text=results.rows[0].tweet_text;
         console.log("the tweet text is "+tweet_text)
         //max_questions=results.rowcount;
         //Console.log("max_questions "+max_questions);
         Answer=results.rows[0].answer;
         console.log("Answer "+Answer);
         Correct_text=results.rows[0].correct_text;
         console.log("Correct_text "+Correct_text);
         Wrong_text=results.rows[0].wrong_text;
        console.log("Wrong_text "+Wrong_text);
      console.log("mission id  "+mission_id);
      
         console.log ("ans_n and ans_y "+ans_n+" "+ans_y);

      if ( mission_state === "chk") {

        if ( typeof ans_y === 'undefined' && typeof ans_n === 'undefined' ) {

            foot_note="Does the tweet text answer to the definition?";
            Mrinal=Wrong_text;
            sbmtval="Try Again";
            sbmtval_efct='true';
            sbmtlnk="chk";


        } else {


  
         if ( ans_y.toString() === Answer.toString() ) {
              
             Mrinal=Correct_text;
             foot_note="Does the tweet text answer to the definition?";
             //console.log("I am inside ansy true");
             sbmtval="Go To Next";
             sbmtval_efct='false';
             sbmtlnk="fwd";
             ++mission_val;
             sql_chy1 = `insert into session values ('${workerID}','Practice',${block},${task},${mission_id},'1');`;
             pool.query(sql_chy1,(error, results) => {});
             console.log(sql_chy1);
             yes_val="true";
   
         } 
         
         if ( ans_y.toString() !== Answer.toString() && ans_y.toString() === "YES") {
            foot_note="Does the tweet text answer to the definition?";
            Mrinal=Wrong_text;
            sbmtval="Try Again";
            sbmtval_efct='true';
            sbmtlnk="chk";
            yes_val="true";
            
      
        }
   
         if (ans_n.toString() === Answer.toString()) {
   
             Mrinal=Correct_text;
             foot_note="Does the tweet text answer to the definition?";
             console.log("i am inside ans_n true");
             sbmtval="Go To Next";
             sbmtval_efct='false';
             sbmtlnk="fwd";
             ++mission_val;
             sql_chy1 = `insert into session values ('${workerID}','Practice',${block},${task},${mission_id},'1');`;
             pool.query(sql_chy1,(error, results) => {});
             console.log(sql_chy1);
             no_val="true";
         } 
         if ( ans_n.toString() !== Answer.toString() && ans_n.toString() === "NO"){
            foot_note="Does the tweet text answer to the definition?";
            Mrinal=Wrong_text;
            sbmtval="Try Again";
            sbmtval_efct='true';
            sbmtlnk="chk";
            no_val="true";
            
             
        }
    }
     
        
     } else {
         foot_note="Does the tweet text answer to the definition?";
         Mrinal="";
   
     }
     console.log("Value of Mrinal"+Mrinal);
      console.log("answers"+ans_y+":"+ans_n);
      var number=fin_val_drpdwn;
    var optionList = "";
    for (var x=1; x<=number; x++) {
    optionList += "<option>"+x+"</option>";
    }
         res.write(`
         
         
         <!DOCTYPE html>
         <html lang="en">
               <head>
                    <title>Tweet</title>

                    <script type="text/javascript">
                    function goToNewPage()
                    {
                        var url1 = window.location.href;
                        var idval= document.getElementById('list').value;
                        var urltmp= url1.replace(new RegExp(/&missionId=[0-9]/,"g"),"");
                        var urltmp1= urltmp.replace(new RegExp(/&mission_state=[a-z][a-z][a-z]/,"g"),"");
                        var url=urltmp1.concat('&mission_state=msc','&missionId=',idval);
                        window.location = url;
                    }
                </script>
                 </head>
         
                     
                         <body class="prewarmup">
                     
         
             
         
         
             
         
             <script type="text/javascript">
                   
                       var htmlClassList = document.documentElement.classList;
                       
                   
         
               
               var bodyCacheable = true;
               wixBiSession.setCaching(bodyCacheable);
         
               var clientSideRender = false;
               
               
               
             </script>


         
             
             
             
             <!--body start html embeds start-->
             
             <!--body start html embeds end-->
             
             
         
             
             <script id="wix-first-paint">
                 if (window.ResizeObserver &&
                     (!window.PerformanceObserver || !PerformanceObserver.supportedEntryTypes || PerformanceObserver.supportedEntryTypes.indexOf('paint') === -1)) {
                     new ResizeObserver(function (entries, observer) {
                         entries.some(function (entry) {
                             var contentRect = entry.contentRect;
                             if (contentRect.width > 0 && contentRect.height > 0) {
                                 requestAnimationFrame(function (now) {
                                     window.wixFirstPaint = now;
                                     dispatchEvent(new CustomEvent('wixFirstPaint'));
                                 });
                                 observer.disconnect();
                                 return true;
                             }
                         });
                     }).observe(document.body);
                 }
             </script>
             
         
         
             <div id="SITE_CONTAINER"><style type="text/css" data-styleid="uploadedFonts"></style><div><style type="text/css" data-styleid="theme_fonts">.font_0 {font: normal normal normal 30px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#FFB703;} 
         .font_1 {font: normal normal normal 14px/1.43em 'Open Sans',sans-serif ;color:#12110F;} 
         .font_2 {font: normal normal normal 48px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;} 
         .font_3 {font: normal normal normal 48px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;} 
         .font_4 {font: normal normal normal 72px/1.111em impact,impact-w01-2010,impact-w02-2010,impact-w10-2010,sans-serif ;color:#12110F;} 
         .font_5 {font: normal normal normal 56px/1.161em impact,impact-w01-2010,impact-w02-2010,impact-w10-2010,sans-serif ;color:#12110F;} 
         .font_6 {font: normal normal normal 28px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;} 
         .font_7 {font: normal normal normal 18px/1.4em roboto-bold,roboto,sans-serif ;color:#12110F;} 
         .font_8 {font: normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;color:#FFFFFF;} 
         .font_9 {font: normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;color:#12110F;} 
         .font_10 {font: normal normal normal 14px/1.43em 'Open Sans',sans-serif ;color:#12110F;} 
         </style><style type="text/css" data-styleid="theme_colors">.color_0 {color: #FFFFFF;}
         .backcolor_0 {background-color: #FFFFFF;}
         .color_1 {color: #FFFFFF;}
         .backcolor_1 {background-color: #FFFFFF;}
         .color_2 {color: #000000;}
         .backcolor_2 {background-color: #000000;}
         .color_3 {color: #ED1C24;}
         .backcolor_3 {background-color: #ED1C24;}
         .color_4 {color: #0088CB;}
         .backcolor_4 {background-color: #0088CB;}
         .color_5 {color: #FFCB05;}
         .backcolor_5 {background-color: #FFCB05;}
         .color_6 {color: #727272;}
         .backcolor_6 {background-color: #727272;}
         .color_7 {color: #B0B0B0;}
         .backcolor_7 {background-color: #B0B0B0;}
         .color_8 {color: #FFFFFF;}
         .backcolor_8 {background-color: #FFFFFF;}
         .color_9 {color: #727272;}
         .backcolor_9 {background-color: #727272;}
         .color_10 {color: #B0B0B0;}
         .backcolor_10 {background-color: #B0B0B0;}
         .color_11 {color: #FFFFFF;}
         .backcolor_11 {background-color: #FFFFFF;}
         .color_12 {color: #B8B5AE;}
         .backcolor_12 {background-color: #B8B5AE;}
         .color_13 {color: #75736D;}
         .backcolor_13 {background-color: #75736D;}
         .color_14 {color: #363430;}
         .backcolor_14 {background-color: #363430;}
         .color_15 {color: #12110F;}
         .backcolor_15 {background-color: #12110F;}
         .color_16 {color: #FFF0CC;}
         .backcolor_16 {background-color: #FFF0CC;}
         .color_17 {color: #FFDB81;}
         .backcolor_17 {background-color: #FFDB81;}
         .color_18 {color: #FFB703;}
         .backcolor_18 {background-color: #FFB703;}
         .color_19 {color: #AA7A02;}
         .backcolor_19 {background-color: #AA7A02;}
         .color_20 {color: #553D01;}
         .backcolor_20 {background-color: #553D01;}
         .color_21 {color: #D3D4D6;}
         .backcolor_21 {background-color: #D3D4D6;}
         .color_22 {color: #A8A9AD;}
         .backcolor_22 {background-color: #A8A9AD;}
         .color_23 {color: #7E7F82;}
         .backcolor_23 {background-color: #7E7F82;}
         .color_24 {color: #545557;}
         .backcolor_24 {background-color: #545557;}
         .color_25 {color: #2A2A2B;}
         .backcolor_25 {background-color: #2A2A2B;}
         .color_26 {color: #FFFFFF;}
         .backcolor_26 {background-color: #FFFFFF;}
         .color_27 {color: #FFFFFF;}
         .backcolor_27 {background-color: #FFFFFF;}
         .color_28 {color: #EBEBEB;}
         .backcolor_28 {background-color: #EBEBEB;}
         .color_29 {color: #BEBEBE;}
         .backcolor_29 {background-color: #BEBEBE;}
         .color_30 {color: #727272;}
         .backcolor_30 {background-color: #727272;}
         .color_31 {color: #FFF1AB;}
         .backcolor_31 {background-color: #FFF1AB;}
         .color_32 {color: #FFEA82;}
         .backcolor_32 {background-color: #FFEA82;}
         .color_33 {color: #FFD504;}
         .backcolor_33 {background-color: #FFD504;}
         .color_34 {color: #AA8E03;}
         .backcolor_34 {background-color: #AA8E03;}
         .color_35 {color: #554701;}
         .backcolor_35 {background-color: #554701;}
         </style></div><div id="CSS_CONTAINER"><style id="masterPage_css">.horizontalmenuitem1808041630__root {
           -archetype: paintBox;
         
           display: block;
           transition: inherit;
         }
         
         .horizontalmenuitem1808041630__root:not([href]) {
           cursor: default !important;
         }
         
         .horizontalmenuitem1808041630__listItem {
           flex-grow: inherit;
         }
         
         .horizontalmenuitem1808041630__container {
           -archetype: box;
           display: flex;
           height: 100%;
         }
         
         .horizontalmenuitem1808041630__label {
           -archetype: text;
           -controller-part-type: LayoutChildDisplayDropdown;
         }
         
         .horizontalmenusubitem329750698__root {
           -archetype: paintBox;
         
           display: block;
         
           transition: inherit;
         }
         
         .horizontalmenusubitem329750698__root:not([href]) {
           cursor: default !important;
         }
         
         .horizontalmenusubitem329750698__listItem {
           flex-grow: inherit;
         
           -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
           page-break-inside: avoid; /* Firefox */
           break-inside: avoid; /* IE 10+ */
         }
         
         .horizontalmenusubitem329750698__container {
           -archetype: box;
           display: flex;
         }
         
         .horizontalmenusubitem329750698__label {
           -archetype: text;
           -controller-part-type: LayoutChildDisplayDropdown;
         }
         
         .horizontalmenusubsubitem676023543__root {
           -archetype: paintBox;
         
           display: block;
         
           transition: inherit;
         }
         
         .horizontalmenusubsubitem676023543__root:not([href]) {
           cursor: default !important;
         }
         
         .horizontalmenusubsubitem676023543__listItem {
           flex-grow: inherit;
         
           -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
           page-break-inside: avoid; /* Firefox */
           break-inside: avoid; /* IE 10+ */
         }
         
         .horizontalmenusubsubitem676023543__container {
           -archetype: box;
           display: flex;
         }
         
         .horizontalmenusubsubitem676023543__label {
           -archetype: text;
           -controller-part-type: LayoutChildDisplayDropdown;
         }
         
         .horizontalmenuscrollbutton2690837022__root {
           -archetype: paddingBox;
         
           display: flex;
           align-items: center;
           justify-content: center;
           cursor: pointer;
           pointer-events: auto;
           overflow: hidden;
         }
         
         .horizontalmenuscrollbutton2690837022__root.horizontalmenuscrollbutton2690837022---side-4-left {
           transform: scaleX(-1);
           -webkit-transform: scaleX(-1);
         }
         
         .horizontalmenuscrollbutton2690837022__root.horizontalmenuscrollbutton2690837022---side-5-right {}
         
         .horizontalmenuscrollbutton2690837022__root.horizontalmenuscrollbutton2690837022--isHidden {
           visibility: hidden;
           pointer-events: none;
         }
         
         .horizontalmenuscrollbutton2690837022__icon {
           -archetype: icon;
           -controller-part-type: LayoutChildDisplayDropdown;
           min-width: 1px;
           max-height: 100%;
           max-width: 100%;
         }
         
         .horizontalmenuscrollbutton2690837022__icon > div,.horizontalmenuscrollbutton2690837022__icon svg {
           width: inherit;
           height: inherit;
         }
         
         .stylablebutton643855516__root {
             -archetype: box;
             /* -st-states: error, disabled; */
             cursor: pointer;
             border: none;
             display: block;
             min-width: 10px;
             min-height: 10px;
             width: 100%;
             height: 100%;
             box-sizing: border-box;
             padding: 0px;
         }
         
         .stylablebutton643855516__root[disabled] {
             pointer-events: none;
         }
         
         .stylablebutton643855516__link {
             -archetype: box;
             text-decoration: none;
             box-sizing: border-box;
             color: black;
         }
         
         .stylablebutton643855516__container {
             display: flex;
             flex-basis: auto;
             justify-content: center;
             flex-direction: row;
             flex-grow: 1;
             align-items: center;
             overflow: hidden;
             height: 100%;
             width: 100%;
             transition: all 0.2s ease, visibility 0s;
         }
         
         .stylablebutton643855516__label {
             -archetype: text;
             -controller-part-type: "LayoutChildDisplayDropdown, LayoutFlexChildSpacing(first)";
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
             min-width: 1.8em;
             max-width: 100%;
             transition: inherit;
         }
         
         .stylablebutton643855516__icon {
             -archetype: icon;
             -controller-part-type: "LayoutChildDisplayDropdown, LayoutFlexChildSpacing(last)";
             min-width: 1px;
             height: 50px;
             transition: inherit;
             flex-shrink: 0;
             position: relative;
         }
         
         .stylablebutton643855516__icon > div,.stylablebutton643855516__icon svg {
             width: inherit;
             height: inherit;
             position: relative;
             top: 0;
             left: 0;
         }
         
         .stylableline2123045772__root {
             -archetype: box;
             box-sizing: border-box;
         }
         .stylableline2123045772__text {
             -archetype: text;
         }
         
         .horizontalmenucolumnslayout852678809__root {
           -archetype: paddingBox;
           box-sizing: border-box;
           transition: inherit;
           overflow: hidden;
         }
         
         .horizontalmenucolumnslayout852678809__root.horizontalmenucolumnslayout852678809--isCollapsed {
           height: 0 !important;
           box-shadow: none !important;
           border-color: transparent !important;
           border-bottom-width: 0 !important;
           border-top-width: 0 !important;
           padding-top: 0 !important;
           padding-bottom: 0 !important;
         }
         
         .horizontalmenucolumnslayout852678809__listWrapper {
           max-width: 100%;
         }
         
         .horizontalmenucolumnslayout852678809__pageWrapper {
           display: flex;
           margin: 0 auto;
           max-width: 100%;
         }
         
         /* columns menu item */
         .horizontalmenucolumnslayout852678809__menuItem {
         }
         
         /* columns submenu item */
         .horizontalmenucolumnslayout852678809__submenuItem {
         }
         
         .horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:first-of-type > span,.horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:first-of-type > a,.horizontalmenucolumnslayout852678809__root > ul > li:first-of-type > span,.horizontalmenucolumnslayout852678809__root > ul > li:first-of-type > a {
           margin-top: unset !important;
         }
         
         .horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:last-of-type > span,.horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:last-of-type > a,.horizontalmenucolumnslayout852678809__root > ul > li:last-of-type > span,.horizontalmenucolumnslayout852678809__root > ul > li:last-of-type > a {
           margin-bottom: unset !important;
         }
         
         .horizontalmenu2645433724__root {
         
           box-sizing: border-box;
         
           transition: inherit;
         }
         
         .horizontalmenu2645433724__container {
           overflow: hidden;
           display: flex;
           height: 100%;
         }
         
         .horizontalmenu2645433724__menu {
           display: flex;
         
           box-sizing: border-box;
         }
         
         .horizontalmenu2645433724__scrollControls {
           position: absolute;
           top: 0;
           right: 0;
           bottom: 0;
           left: 0;
           padding-top: inherit;
           padding-bottom: inherit;
           border: inherit;
           border-color: transparent;
         
           display: flex;
           overflow: hidden;
           justify-content: space-between;
         
           pointer-events: none;
         
           border-radius: inherit;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll .horizontalmenu2645433724__menu > li > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll .horizontalmenu2645433724__menu > li > a {
           margin-top: unset;
           margin-bottom: unset;
           box-sizing: border-box;
           height: 100%;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-4-wrap .horizontalmenu2645433724__menu {
           flex-wrap: wrap;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:first-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:first-of-type > a,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:last-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:last-of-type > a {
           margin-left: unset;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:last-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:last-of-type > a,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:first-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:first-of-type > a {
           margin-right: unset;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll .horizontalmenu2645433724__menu {
           height: unset;
           width: unset;
           margin: unset;
           flex-wrap: nowrap;
           transition: padding-right .1s !important;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll {
           height: 100%;
           display: flex;
           overflow-x: scroll;
           scrollbar-width: none;
           -ms-overflow-style: none;
           -webkit-overflow-scrolling: touch;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll::-webkit-scrollbar {
           display: none;
         }
         
         .horizontalmenu2645433724__root.horizontalmenu2645433724--isScrollable .horizontalmenu2645433724__menu {
           padding-right: inherit;
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__root {
           -archetype: paddingBox;
           box-sizing: border-box;
           transition: inherit;
           overflow: hidden;
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__root.horizontalmenucolumnssubmenulayout1903511735--isCollapsed {
           height: 0 !important;
           box-shadow: none !important;
           border-color: transparent !important;
           border-bottom-width: 0 !important;
           border-top-width: 0 !important;
           padding-top: 0 !important;
           padding-bottom: 0 !important;
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__listWrapper {
           width: 100%;
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__pageWrapper {
           display: flex;
           margin: 0 auto;
           max-width: 100%;
         }
         
         /* columns menu item */
         .horizontalmenucolumnssubmenulayout1903511735__menuItem {
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:first-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:first-of-type > a,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:first-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:first-of-type > a {
           margin-top: unset !important;
         }
         
         .horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:last-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:last-of-type > a,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:last-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:last-of-type > a {
           margin-bottom: unset !important;
         }
         
         /**
          * For focus-ring to be applied inside items BB
          */
         .visual-focus-on .focus-ring:not(.has-custom-focus):focus {
           box-shadow: inset 0 0 0 1px #ffffff, inset 0 0 0 3px #116dff;
         }
         
         .stylablehorizontalmenu4089050981__root {
           height: 100%;
           width: 100%;
           box-sizing: border-box;
         }
         
         .stylablehorizontalmenu4089050981__menu {}
         
         /* root menu item */
         .stylablehorizontalmenu4089050981__menuItem {
         }
         
         .stylablehorizontalmenu4089050981__scrollButton {
         }
         
         /* first level submenu */
         .stylablehorizontalmenu4089050981__columnsLayout {
         }
         
         .stylablehorizontalmenu4089050981__leftAlignmentScrollItem {}
         
         .stylablehorizontalmenu4089050981__rightAlignmentScrollItem {}
         
         .stylablehorizontalmenu4089050981__menuItem .horizontalmenuitem1808041630__label {
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
           transition: inherit;
         }
         
         .stylablehorizontalmenu4089050981__menuItem .horizontalmenuitem1808041630__container {
           align-items: center;
         }
         
         .stylablehorizontalmenu4089050981__columnsLayout .horizontalmenucolumnslayout852678809__menuItem .horizontalmenusubitem329750698__label {
           overflow-wrap: break-word;
           text-overflow: clip;
           white-space: normal;
           overflow: hidden;
         }
         </style><style id="rke15_css">
         /*site css*/
         .style-kf8sqbcc__root{-st-extends: StylableButton;transition: all 0.2s ease, visibility 0s;border-radius: 0px;background: #F7EA73}.style-kf8sqbcc__root:hover{border-bottom: 3px solid rgb(110, 22, 35);padding-bottom: 3px}.style-kf8sqbcc__root[disabled]{background: #E2E2E2}.style-kf8sqbcc__root[disabled] .stylablebutton643855516__label{color: #8F8F8F}.style-kf8sqbcc__root[disabled] .stylablebutton643855516__icon{fill: #8F8F8F}.style-kf8sqbcc__root .stylablebutton643855516__container{transition: inherit}.style-kf8sqbcc__root .stylablebutton643855516__label{transition: inherit;text-transform: uppercase;font-family: futura-lt-w01-book,sans-serif;font-size: 20px;letter-spacing: 0.1em;color: #6E1623}.style-kf8sqbcc__root .stylablebutton643855516__icon{transition: inherit;width: 14px;height: 14px;fill: #6E1623;display: none}</style></div><div data-aid="stylesContainer"><style type="text/css" data-styleid="style-k6auwcww">.style-k6auwcww {display:none;}</style><style type="text/css" data-styleid="pc1">.pc1screenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
         .pc1[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
         .pc1[data-state~="fixedPosition"].pc1_footer {top:auto;bottom:0;}
         .pc1bg {position:absolute;top:0;right:0;bottom:0;left:0;}
         .pc1[data-is-absolute-layout="true"] > .pc1centeredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
         .pc1[data-is-absolute-layout="true"] > .pc1centeredContent > .pc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="siteBackground">.siteBackground {width:100%;position:absolute;}
         .siteBackgroundbgBeforeTransition {position:absolute;top:0;}
         .siteBackgroundbgAfterTransition {position:absolute;top:0;}</style><style type="text/css" data-styleid="style-k7ugjln5">.style-k7ugjln5screenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7ugjln5[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
         .style-k7ugjln5[data-state~="fixedPosition"].style-k7ugjln5_footer {top:auto;bottom:0;}
         .style-k7ugjln5_bg {position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.6);  background-color:rgba(18, 17, 15, 0.81);border-top:0px solid rgba(18, 17, 15, 1);border-bottom:0px solid rgba(18, 17, 15, 1);background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/bevel_300.png);background-repeat:repeat-x;}
         .style-k7ugjln5bg {position:absolute;top:0px;right:0;bottom:0px;left:0;}
         .style-k7ugjln5[data-state~="mobileView"] .style-k7ugjln5bg {left:10px;right:10px;}
         .style-k7ugjln5[data-is-absolute-layout="true"] > .style-k7ugjln5centeredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7ugjln5[data-is-absolute-layout="true"] > .style-k7ugjln5centeredContent > .style-k7ugjln5inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="style-k7ugjugc">.style-k7ugjugcscreenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7ugjugc[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
         .style-k7ugjugc[data-state~="fixedPosition"].style-k7ugjugc_footer {top:auto;bottom:0;}
         .style-k7ugjugc_bg {position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.6);  background-color:rgba(18, 17, 15, 1);border-top:0px solid rgba(18, 17, 15, 1);border-bottom:0px solid rgba(18, 17, 15, 1);background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/bevel_300.png);background-repeat:repeat-x;}
         .style-k7ugjugcbg {position:absolute;top:0px;right:0;bottom:0px;left:0;}
         .style-k7ugjugc[data-state~="mobileView"] .style-k7ugjugcbg {left:10px;right:10px;}
         .style-k7ugjugc[data-is-absolute-layout="true"] > .style-k7ugjugccenteredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7ugjugc[data-is-absolute-layout="true"] > .style-k7ugjugccenteredContent > .style-k7ugjugcinlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="style-kd8jx4k6">.style-kd8jx4k6bg {border:0px solid rgba(18, 17, 15, 1);background-color:rgba(255, 255, 255, 1);border-radius:0;  position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-kd8jx4k6[data-is-absolute-layout="true"] > .style-kd8jx4k6inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="txtNew">.txtNew {word-wrap:break-word;text-align:start;}
         .txtNew_override-left * {text-align:left !important;}
         .txtNew_override-right * {text-align:right !important;}
         .txtNew_override-center * {text-align:center !important;}
         .txtNew_override-justify * {text-align:justify !important;}
         .txtNew > * {pointer-events:auto;}
         .txtNew li {font-style:inherit;font-weight:inherit;line-height:inherit;letter-spacing:normal;}
         .txtNew ol,.txtNew ul {padding-left:1.3em;padding-right:0;margin-left:0.5em;margin-right:0;line-height:normal;letter-spacing:normal;}
         .txtNew ul {list-style-type:disc;}
         .txtNew ol {list-style-type:decimal;}
         .txtNew ul ul,.txtNew ol ul {list-style-type:circle;}
         .txtNew ul ul ul,.txtNew ol ul ul {list-style-type:square;}
         .txtNew ul ol ul,.txtNew ol ol ul {list-style-type:square;}
         .txtNew ul[dir="rtl"],.txtNew ol[dir="rtl"] {padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;}
         .txtNew ul[dir="rtl"] ul,.txtNew ul[dir="rtl"] ol,.txtNew ol[dir="rtl"] ul,.txtNew ol[dir="rtl"] ol {padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;}
         .txtNew p {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h1 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h2 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h3 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h4 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h5 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew h6 {margin:0;line-height:normal;letter-spacing:normal;}
         .txtNew a {color:inherit;}</style><style type="text/css" data-styleid="style-jr9629o5">.style-jr9629o5 {box-sizing:border-box;border-top:1px solid rgba(255, 255, 255, 0.15);height:0;}</style><style type="text/css" data-styleid="style-k7to9w85">.style-k7to9w85itemsContainer {width:calc(100% - 0px);height:calc(100% - 0px);white-space:nowrap;display:inline-block;overflow:visible;position:absolute;}
         .style-k7to9w85moreContainer {overflow:visible;display:inherit;white-space:nowrap;width:auto;background-color:rgba(18, 17, 15, 1);border-radius:0;  }
         .style-k7to9w85dropWrapper {z-index:99999;display:block;opacity:1;visibility:hidden;position:absolute;margin-top:7px;}
         .style-k7to9w85 > nav {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7to9w85dropWrapper[data-dropMode="dropUp"] {margin-top:0;margin-bottom:7px;}
         .style-k7to9w85navContainer_with-validation-indication select:not([data-preview~="focus"]):invalid {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k7to9w85navContainer {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
         .style-k7to9w85navContainer select {border-radius:0;  -webkit-appearance:none;-moz-appearance:none;  font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif;  background-color:rgba(18, 17, 15, 1);color:#FFFFFF;border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-width:1px;border-left-width:0px;border-right-width:0px;margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;}
         .style-k7to9w85navContainer select option {text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;}
         .style-k7to9w85navContainer select.style-k7to9w85navContainer_placeholder-style {color:#12110F;}
         .style-k7to9w85navContainer select.style-k7to9w85navContainer_extended-placeholder-style {color:#888888;}
         .style-k7to9w85navContainer select:-moz-focusring {color:transparent;text-shadow:0 0 0 #000;}
         .style-k7to9w85navContainer select::-ms-expand {display:none;}
         .style-k7to9w85navContainer select:focus::-ms-value {background:transparent;}
         .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):hover,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="hover"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(18, 17, 15, 1);}
         .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):focus,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="focus"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-error="true"],.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="error"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):disabled,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-disabled="true"],.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="disabled"] {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;background-color:rgba(204, 204, 204, 1);}
         .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):disabled + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-disabled="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="disabled"] + .style-k7to9w85navContainerarrow {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;border:none;}
         .style-k7to9w85navContainerarrow {position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-left-width:1px;}
         .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container {width:12px;}
         .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container svg {height:100%;fill:rgba(184, 181, 174, 1);}
         .style-k7to9w85navContainer_left-direction {text-align-last:left;}
         .style-k7to9w85navContainer_left-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-right:0;}
         .style-k7to9w85navContainer_left-direction .style-k7to9w85navContainerarrow {right:0;border-left-width:1px;}
         .style-k7to9w85navContainer_right-direction {text-align-last:right;direction:rtl;}
         .style-k7to9w85navContainer_right-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-left:0;}
         .style-k7to9w85navContainer_right-direction .style-k7to9w85navContainerarrow {left:0;border-right-width:1px;}
         .style-k7to9w85navContainer_center-direction {text-align-last:left;text-align-last:center;}
         .style-k7to9w85navContainer_center-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-right:0;}
         .style-k7to9w85navContainer_center-direction .style-k7to9w85navContainerarrow {right:0;border-left-width:1px;}
         .style-k7to9w85navContainer_mobileMenuContainer {border:0;}
         .style-k7to9w85navContainer_mobileMenuContainer .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container .style-k7to9w85navContainericon {fill:#FFFFFF;}
         .style-k7to9w85navContainerlabel {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  color:#12110F;word-break:break-word;display:inline-block;line-height:1;}
         .style-k7to9w85navContainer_required .style-k7to9w85navContainerlabel::after {content:" *";color:transparent;}
         .style-k7to9w85navContainer_selector-wrapper {-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;}
         .style-k7to9w85repeaterButton {height:100%;position:relative;box-sizing:border-box;display:inline-block;cursor:pointer;font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif;}
         .style-k7to9w85repeaterButton[data-state~="header"] a,.style-k7to9w85repeaterButton[data-state~="header"] div {cursor:default !important;}
         .style-k7to9w85repeaterButtonlinkElement {display:inline-block;height:100%;width:100%;}
         .style-k7to9w85repeaterButton_gapper {padding:0 5px;}
         .style-k7to9w85repeaterButtonlabel {display:inline-block;padding:0 10px;color:#FFFFFF;transition:color 0.4s ease 0s;}
         .style-k7to9w85repeaterButton[data-state~="drop"] {width:100%;display:block;}
         .style-k7to9w85repeaterButton[data-state~="drop"] .style-k7to9w85repeaterButtonlabel {padding:0 .5em;}
         .style-k7to9w85repeaterButton[data-state~="over"] .style-k7to9w85repeaterButtonlabel,.style-k7to9w85repeaterButton[data-preview~="hover"] .style-k7to9w85repeaterButtonlabel {color:#FFD504;transition:color 0.4s ease 0s;}
         .style-k7to9w85repeaterButton[data-state~="selected"] .style-k7to9w85repeaterButtonlabel,.style-k7to9w85repeaterButton[data-preview~="active"] .style-k7to9w85repeaterButtonlabel {color:#FFD504;transition:color 0.4s ease 0s;}</style><style type="text/css" data-styleid="style-k7ns13ap">.style-k7ns13ap_zoomedin {cursor:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_out.png), url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_out.cur), auto;overflow:hidden;display:block;}
         .style-k7ns13ap_zoomedout {cursor:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_in.png), url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_in.cur), auto;}
         .style-k7ns13aplink {display:block;overflow:hidden;}
         .style-k7ns13apimg {overflow:hidden;}
         .style-k7ns13ap[data-is-responsive=true] .style-k7ns13aplink,.style-k7ns13ap[data-is-responsive=true] .style-k7ns13apimg,.style-k7ns13ap[data-is-responsive=true] wix-image {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-k7ns13apimgimage {position:static;box-shadow:#000 0 0 0;user-select:none;}</style><style type="text/css" data-styleid="lb1">.lb1[data-is-responsive~="false"] .lb1itemsContainer {position:absolute;width:100%;height:100%;white-space:nowrap;}
         .lb1[data-is-responsive~="false"][data-state~="mobileView"] .lb1itemsContainer {position:absolute;width:100%;height:100%;white-space:normal;}
         .lb1[data-is-responsive~="true"] {display:table;}
         .lb1[data-is-responsive~="true"] .lb1itemsContainer {display:-webkit-box;display:-webkit-flex;display:flex;}
         .lb1itemsContainer > li:last-child {margin:0 !important;}
         .lb1 a {display:block;height:100%;}
         .lb1imageItemlink {cursor:pointer;}
         .lb1imageItemimageimage {position:static;box-shadow:#000 0 0 0;user-select:none;}</style><style type="text/css" data-styleid="strc1">.strc1:not([data-mobile-responsive]) > .strc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
         .strc1[data-mobile-responsive] > .strc1inlineContent {position:relative;}
         .strc1[data-responsive] {display:-ms-grid;display:grid;justify-content:center;grid-template-columns:100%;grid-template-rows:1fr;-ms-grid-columns:100%;-ms-grid-rows:1fr;}
         .strc1[data-responsive] > .strc1inlineContent {display:flex;}
         .strc1[data-responsive] > * {position:relative;grid-row-start:1;grid-column-start:1;grid-row-end:2;grid-column-end:2;-ms-grid-row-span:1;-ms-grid-column-span:1;margin:0 auto;}</style><style type="text/css" data-styleid="mc1">.mc1:not([data-mobile-responsive]) .mc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
         .mc1:not([data-mobile-responsive]) .mc1container {position:relative;height:100%;top:0;}</style><style type="text/css" data-styleid="style-k6auwexi1">.style-k6auwexi1 > ul {display:table;width:100%;box-sizing:border-box;}
         .style-k6auwexi1 li {display:table;width:100%;}
         .style-k6auwexi1 a span {pointer-events:none;}
         .style-k6auwexi1_noLink {cursor:default !important;}
         .style-k6auwexi1_counter {margin:0 10px;opacity:0.6;}
         .style-k6auwexi1menuContainer {padding:0;margin:0;border:solid 1px rgba(18, 17, 15, 0.2);position:relative;  border-radius:0;}
         .style-k6auwexi1menuContainer .style-k6auwexi1_emptySubMenu {display:none !important;}
         .style-k6auwexi1_itemHoverArea {box-sizing:content-box;border-bottom:solid 0px rgba(18, 17, 15, 1);}
         .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item {border-radius:0;    border-bottom-left-radius:0;border-bottom-right-radius:0;}
         .style-k6auwexi1_itemHoverArea:last-child {border-bottom:0 solid transparent;}
         .style-k6auwexi1_itemHoverArea:last-child > .style-k6auwexi1_item {border-radius:0;      border-top-left-radius:0;border-top-right-radius:0;border-bottom:0 solid transparent;}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item {transition:background-color 0.4s ease 0s;}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover .style-k6auwexi1_subMenu {opacity:1;display:block;}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover:not(.style-k6auwexi1_noLink) > .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover:not(.style-k6auwexi1_noLink) > .style-k6auwexi1_item > .style-k6auwexi1_label {color:#363430;}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item > .style-k6auwexi1_label,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item > .style-k6auwexi1_label {color:#FFB703;}
         .style-k6auwexi1_item {height:100%;padding-left:30px;padding-right:30px;transition:background-color 0.4s ease 0s;  margin:0;position:relative;cursor:pointer;list-style:none;background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1_label {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  color:#12110F;display:inline;white-space:nowrap;overflow:hidden;}
         .style-k6auwexi1_subMenu {z-index:999;min-width:100%;display:none;opacity:0;transition:all 0.4s ease 0s;  position:absolute;border:solid 1px rgba(18, 17, 15, 0.2);border-radius:0;  }
         .style-k6auwexi1_subMenu .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1_subMenu .style-k6auwexi1_label {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;}
         .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item,.style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child:last-child > .style-k6auwexi1_item {border-radius:0;}
         .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item {border-bottom-left-radius:0;border-bottom-right-radius:0;}
         .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:last-child {border-bottom:0 solid transparent;}
         .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:last-child > .style-k6auwexi1_item {border-radius:0;      border-top-left-radius:0;border-top-right-radius:0;border-bottom:0 solid transparent;}
         .style-k6auwexi1_subMenu:before {background-color:#fff;opacity:0;z-index:999;content:" ";display:block;width:calc(0px + 1px);height:100%;position:absolute;top:0;}
         .style-k6auwexi1[data-state~="items-align-left"] .style-k6auwexi1_item {text-align:left;}
         .style-k6auwexi1[data-state~="items-align-center"] .style-k6auwexi1_item {text-align:center;}
         .style-k6auwexi1[data-state~="items-align-right"] .style-k6auwexi1_item {text-align:right;}
         .style-k6auwexi1[data-state~="subItems-align-left"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:left;padding-left:30px;padding-right:30px;}
         .style-k6auwexi1[data-state~="subItems-align-center"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:center;padding-left:30px;padding-right:30px;}
         .style-k6auwexi1[data-state~="subItems-align-right"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:right;padding-left:30px;padding-right:30px;}
         .style-k6auwexi1[data-state~="subMenuOpenSide-right"] .style-k6auwexi1_subMenu {left:100%;float:left;margin-left:0px;}
         .style-k6auwexi1[data-state~="subMenuOpenSide-right"] .style-k6auwexi1_subMenu:before {right:100%;}
         .style-k6auwexi1[data-state~="subMenuOpenSide-left"] .style-k6auwexi1_subMenu {right:100%;float:right;margin-right:0px;}
         .style-k6auwexi1[data-state~="subMenuOpenSide-left"] .style-k6auwexi1_subMenu:before {left:100%;}
         .style-k6auwexi1[data-open-direction~="subMenuOpenDir-down"] .style-k6auwexi1_subMenu {top:calc(-1 * 1px);}
         .style-k6auwexi1[data-open-direction~="subMenuOpenDir-up"] .style-k6auwexi1_subMenu {bottom:calc(-1 * 1px);}
         .style-k6auwexi1menuContainer_with-validation-indication select:not([data-preview~="focus"]):invalid {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1menuContainer {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
         .style-k6auwexi1menuContainer select {border-radius:0;  -webkit-appearance:none;-moz-appearance:none;  font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  background-color:rgba(255, 255, 255, 1);color:#12110F;border-width:1px;  border-style:solid;border-color:rgba(18, 17, 15, 0.2);margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;}
         .style-k6auwexi1menuContainer select option {text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;}
         .style-k6auwexi1menuContainer select.style-k6auwexi1menuContainer_placeholder-style {color:#12110F;}
         .style-k6auwexi1menuContainer select.style-k6auwexi1menuContainer_extended-placeholder-style {color:#888888;}
         .style-k6auwexi1menuContainer select:-moz-focusring {color:transparent;text-shadow:0 0 0 #000;}
         .style-k6auwexi1menuContainer select::-ms-expand {display:none;}
         .style-k6auwexi1menuContainer select:focus::-ms-value {background:transparent;}
         .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):hover,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="hover"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):focus,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="focus"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-error="true"],.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="error"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
         .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):disabled,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-disabled="true"],.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="disabled"] {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;background-color:rgba(204, 204, 204, 1);}
         .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):disabled + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-disabled="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="disabled"] + .style-k6auwexi1menuContainerarrow {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;border:none;}
         .style-k6auwexi1menuContainerarrow {position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;}
         .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container {width:12px;}
         .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container svg {height:100%;fill:rgba(184, 181, 174, 1);}
         .style-k6auwexi1menuContainer_left-direction {text-align-last:left;}
         .style-k6auwexi1menuContainer_left-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-left:0;}
         .style-k6auwexi1menuContainer_left-direction .style-k6auwexi1menuContainerarrow {right:0;}
         .style-k6auwexi1menuContainer_right-direction {text-align-last:right;direction:rtl;}
         .style-k6auwexi1menuContainer_right-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-right:0;}
         .style-k6auwexi1menuContainer_right-direction .style-k6auwexi1menuContainerarrow {left:0;}
         .style-k6auwexi1menuContainer_center-direction {text-align-last:left;text-align-last:center;}
         .style-k6auwexi1menuContainer_center-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-left:0;}
         .style-k6auwexi1menuContainer_center-direction .style-k6auwexi1menuContainerarrow {right:0;}
         .style-k6auwexi1menuContainer_mobileMenuContainer {border:0;}
         .style-k6auwexi1menuContainer_mobileMenuContainer .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container .style-k6auwexi1menuContainericon {fill:#12110F;}
         .style-k6auwexi1menuContainerlabel {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  color:#12110F;word-break:break-word;display:inline-block;line-height:1;}
         .style-k6auwexi1menuContainer_required .style-k6auwexi1menuContainerlabel::after {content:" *";color:transparent;}
         .style-k6auwexi1menuContainer_selector-wrapper {-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;}</style><style type="text/css" data-styleid="tpaw0">.tpaw0 {overflow:hidden;}
         .tpaw0 iframe {position:absolute;width:100%;height:100%;overflow:hidden;}
         .tpaw0 iframe:-webkit-full-screen {min-height:auto !important;}
         .tpaw0preloaderOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
         .tpaw0preloaderOverlaycontent {width:100%;height:100%;}
         .tpaw0unavailableMessageOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
         .tpaw0unavailableMessageOverlaycontent {width:100%;height:100%;background:rgba(255, 255, 255, 0.9);font-size:0;margin-top:5px;}
         .tpaw0unavailableMessageOverlaytextContainer {color:#373737;font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;font-size:14px;display:inline-block;vertical-align:middle;width:100%;margin-top:10px;text-align:center;}
         .tpaw0unavailableMessageOverlayreloadButton {display:inline-block;}
         .tpaw0unavailableMessageOverlay a {color:#0099FF;text-decoration:underline;cursor:pointer;}
         .tpaw0unavailableMessageOverlayiconContainer {display:none;}
         .tpaw0unavailableMessageOverlaydismissButton {display:none;}
         .tpaw0unavailableMessageOverlaytextTitle {font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;display:none;}
         .tpaw0unavailableMessageOverlay[data-state~="hideIframe"] .tpaw0unavailableMessageOverlay_buttons {opacity:1;}
         .tpaw0unavailableMessageOverlay[data-state~="hideOverlay"] {display:none;}</style><style type="text/css" data-styleid="style-k6hsf3sb">.style-k6hsf3sb[data-state~="touchRollOver"] .style-k6hsf3sb_opc {opacity:1;}
         .style-k6hsf3sbemptyDivToFillMatrix {width:1px;height:1px;opacity:0;}
         .style-k6hsf3sb_opc {transition:opacity 0.3s ease 0s;  opacity:0;color:#FFFFFF;}
         .style-k6hsf3sb:hover[data-state~="notMobile"] .style-k6hsf3sb_opc {opacity:1;}
         .style-k6hsf3sbitemsContainer {overflow:hidden;height:100% !important;}
         .style-k6hsf3sbrolloverHolder {box-sizing:border-box !important;font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  background-color:rgba(117, 115, 109, 0.5);transition:opacity 0s;  color:#FFFFFF;opacity:0;padding:10px !important;overflow:hidden;cursor:pointer;}
         .style-k6hsf3sbrolloverHolder > div {width:100% !important;}
         .style-k6hsf3sb[data-state~="rollover"] .style-k6hsf3sbrolloverHolder {transition:opacity 0.3s ease 0s;  opacity:1;}
         .style-k6hsf3sbtitle {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:normal normal normal 28px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;}
         .style-k6hsf3sbdescription {white-space:pre-line;overflow:hidden;max-height:60%;}
         .style-k6hsf3sblink {overflow:hidden;white-space:nowrap;text-decoration:underline;color:#2F2E2E;position:absolute;bottom:10px;left:10px;right:10px;}
         .style-k6hsf3sb_buttons {transition:opacity 0.3s ease 0s;  opacity:0;position:absolute;left:0;right:0;top:50%;margin-top:-15px;}
         .style-k6hsf3sb[data-state~="mobile"] .style-k6hsf3sb_buttons {opacity:1;}
         .style-k6hsf3sb_buttons a {transition:opacity 0.3s ease 0s;  opacity:0.6;width:45px;height:65px;background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/arrows_white_new3.png);background-repeat:no-repeat;cursor:pointer;position:absolute;}
         .style-k6hsf3sb[data-state~="mobile"] .style-k6hsf3sb_buttons a {opacity:1;}
         .style-k6hsf3sbbuttonPrev {left:20px;background-position:0 0;left:20px;background-position:0 0;}
         .style-k6hsf3sbbuttonNext {right:20px;background-position:100% 0;right:20px;background-position:100% 0;}
         .style-k6hsf3sb:hover > .style-k6hsf3sb_buttons {opacity:1;}
         .style-k6hsf3sb_buttons a:hover {opacity:1;}
         .style-k6hsf3sb_hlp {position:absolute;color:#FFFFFF;}
         .style-k6hsf3sb_hlp span {display:block;}
         .style-k6hsf3sbautoplay {right:35px;bottom:10px;}
         .style-k6hsf3sbcounter {right:10px;bottom:8px;font-size:13px;}
         .style-k6hsf3sb[data-state~="noLink"] .style-k6hsf3sblink {display:none;}
         .style-k6hsf3sb[data-state~="autoplayOff"] .style-k6hsf3sbautoplay > span {border:6px solid transparent;border-left:6px solid #FFFFFF;}
         .style-k6hsf3sb[data-state~="autoplayOn"] .style-k6hsf3sbautoplay > span {border-left:3px solid #FFFFFF;border-right:3px solid #FFFFFF;margin-right:5px;height:12px;width:1px;}
         .style-k6hsf3sbimgimage {position:static;box-shadow:#000 0 0 0;user-select:none;}</style><style type="text/css" data-styleid="style-k6hsf3t3">.style-k6hsf3t3 button.style-k6hsf3t3link {width:100%;}
         .style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3labelwrapper {text-align:initial;display:flex;align-items:center;}
         .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="center"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="center"] .style-k6hsf3t3labelwrapper {justify-content:center;}
         .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="left"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="left"] .style-k6hsf3t3labelwrapper {justify-content:flex-start;}
         .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="right"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="right"] .style-k6hsf3t3labelwrapper {justify-content:flex-end;}
         .style-k6hsf3t3link {border-radius:0;  position:absolute;top:0;right:0;bottom:0;left:0;transition:border-color 0.4s ease 0s, background-color 0.4s ease 0s;  }
         .style-k6hsf3t3label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;  transition:color 0.4s ease 0s;  color:#FFFFFF;display:inline-block;margin:calc(-1 * 0px) 0px 0;position:relative;white-space:nowrap;}
         .style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3label {margin:0;}
         .style-k6hsf3t3[data-disabled="false"] .style-k6hsf3t3link {background-color:rgba(255, 183, 3, 1);border:solid rgba(126, 127, 130, 1) 0px;cursor:pointer !important;}
         .style-k6hsf3t3[data-disabled="false"]:active[data-state~="mobile"] .style-k6hsf3t3link,.style-k6hsf3t3[data-disabled="false"]:hover[data-state~="desktop"] .style-k6hsf3t3link,.style-k6hsf3t3[data-disabled="false"][data-preview~="hover"] .style-k6hsf3t3link {background-color:rgba(255, 255, 255, 1);border-color:rgba(18, 17, 15, 1);}
         .style-k6hsf3t3[data-disabled="false"]:active[data-state~="mobile"] .style-k6hsf3t3label,.style-k6hsf3t3[data-disabled="false"]:hover[data-state~="desktop"] .style-k6hsf3t3label,.style-k6hsf3t3[data-disabled="false"][data-preview~="hover"] .style-k6hsf3t3label {color:#12110F;}
         .style-k6hsf3t3[data-disabled="true"] .style-k6hsf3t3link,.style-k6hsf3t3[data-preview~="disabled"] .style-k6hsf3t3link {background-color:rgba(204, 204, 204, 1);border:solid rgba(18, 17, 15, 1) 0px;}
         .style-k6hsf3t3[data-disabled="true"] .style-k6hsf3t3label,.style-k6hsf3t3[data-preview~="disabled"] .style-k6hsf3t3label {color:#FFFFFF;}</style><style type="text/css" data-styleid="controller1">.controller1 {display:none;}</style><style type="text/css" data-styleid="style-kf8s5xvn">.style-kf8s5xvn {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
         .style-kf8s5xvntextarea {  border-radius:0;  font:normal normal normal 14px/1.4em avenir-lt-w01_35-light1475496,sans-serif;  border-width:2px;  -webkit-appearance:none;resize:none;background-color:rgba(255, 255, 255, 1);box-sizing:border-box !important;color:#000000;border-style:solid;border-color:rgba(145, 145, 145, 1);padding:3px;margin:0;padding-top:0.75em;max-width:100%;min-width:100%;overflow-y:auto;-webkit-box-flex:1;-webkit-flex:1;flex:1;}
         .style-kf8s5xvntextarea::-webkit-input-placeholder {color:#7F808A;}
         .style-kf8s5xvntextarea::placeholder {color:#7F808A;}
         .style-kf8s5xvntextarea:hover,.style-kf8s5xvntextarea[data-preview~="hover"] {border-width:2px;    background-color:rgba(242, 250, 249, 1);border-style:solid;border-color:rgba(92, 92, 92, 1);}
         .style-kf8s5xvn_left-direction .style-kf8s5xvntextarea {text-align:left;}
         .style-kf8s5xvn_right-direction .style-kf8s5xvntextarea {text-align:right;direction:rtl;}
         .style-kf8s5xvn_center-direction .style-kf8s5xvntextarea {text-align:center;}
         .style-kf8s5xvn[data-disabled="true"] .style-kf8s5xvntextarea,.style-kf8s5xvn[data-preview~="disabled"] .style-kf8s5xvntextarea {background-color:rgba(255, 255, 255, 1);color:#DBDBDB;border-width:1px;  border-style:solid;border-color:rgba(219, 219, 219, 1);}
         :not(.style-kf8s5xvn_with-validation-indication) .style-kf8s5xvntextarea:focus,:not(.style-kf8s5xvn_with-validation-indication) .style-kf8s5xvntextarea[data-preview~="focus"] {border-width:2px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(0, 0, 0, 1);}
         .style-kf8s5xvn_with-validation-indication .style-kf8s5xvntextarea:invalid {border-width:1px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(255, 64, 64, 1);}
         .style-kf8s5xvn_with-validation-indication .style-kf8s5xvntextarea:not(:invalid):focus,.style-kf8s5xvn_with-validation-indication .style-kf8s5xvntextarea[data-preview~="focus"] {border-width:2px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(0, 0, 0, 1);}
         .style-kf8s5xvn[data-error="true"] .style-kf8s5xvntextarea,.style-kf8s5xvn[data-preview~="error"] .style-kf8s5xvntextarea {border-width:1px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(255, 64, 64, 1);}
         .style-kf8s5xvnlabel {font:normal normal 700 14px/1.4em avenir-lt-w01_35-light1475496,sans-serif;  color:#61615F;word-break:break-word;display:inline-block;line-height:1;}
         .style-kf8s5xvn_required .style-kf8s5xvnlabel::after {content:" *";color:transparent;}</style><style type="text/css" data-styleid="b1">.b1 button.b1link {width:100%;}
         .b1[data-state~="shouldUseFlex"] .b1link,.b1[data-state~="shouldUseFlex"] .b1labelwrapper {text-align:initial;display:flex;align-items:center;}
         .b1[data-state~="shouldUseFlex"][data-state~="center"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="center"] .b1labelwrapper {justify-content:center;}
         .b1[data-state~="shouldUseFlex"][data-state~="left"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="left"] .b1labelwrapper {justify-content:flex-start;}
         .b1[data-state~="shouldUseFlex"][data-state~="right"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="right"] .b1labelwrapper {justify-content:flex-end;}
         .b1link {border-radius:0;  position:absolute;top:0;right:0;bottom:0;left:0;transition:border-color 0.4s ease 0s, background-color 0.4s ease 0s;  }
         .b1label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;  transition:color 0.4s ease 0s;  color:#FFFFFF;display:inline-block;margin:calc(-1 * 0px) 0px 0;position:relative;white-space:nowrap;}
         .b1[data-state~="shouldUseFlex"] .b1label {margin:0;}
         .b1[data-disabled="false"] .b1link {background-color:rgba(18, 17, 15, 1);border:solid rgba(126, 127, 130, 1) 0px;cursor:pointer !important;}
         .b1[data-disabled="false"]:active[data-state~="mobile"] .b1link,.b1[data-disabled="false"]:hover[data-state~="desktop"] .b1link,.b1[data-disabled="false"][data-preview~="hover"] .b1link {background-color:rgba(255, 183, 3, 1);border-color:rgba(18, 17, 15, 1);}
         .b1[data-disabled="false"]:active[data-state~="mobile"] .b1label,.b1[data-disabled="false"]:hover[data-state~="desktop"] .b1label,.b1[data-disabled="false"][data-preview~="hover"] .b1label {color:#7E7F82;}
         .b1[data-disabled="true"] .b1link,.b1[data-preview~="disabled"] .b1link {background-color:rgba(204, 204, 204, 1);border:solid rgba(18, 17, 15, 1) 0px;}
         .b1[data-disabled="true"] .b1label,.b1[data-preview~="disabled"] .b1label {color:#FFFFFF;}</style><style type="text/css" data-styleid="b4">.b4 button.b4link {width:100%;}
         .b4[data-state~="shouldUseFlex"] .b4link,.b4[data-state~="shouldUseFlex"] .b4labelwrapper {text-align:initial;display:flex;align-items:center;}
         .b4[data-state~="shouldUseFlex"][data-state~="center"] .b4link,.b4[data-state~="shouldUseFlex"][data-state~="center"] .b4labelwrapper {justify-content:center;}
         .b4[data-state~="shouldUseFlex"][data-state~="left"] .b4link,.b4[data-state~="shouldUseFlex"][data-state~="left"] .b4labelwrapper {justify-content:flex-start;}
         .b4[data-state~="shouldUseFlex"][data-state~="right"] .b4link,.b4[data-state~="shouldUseFlex"][data-state~="right"] .b4labelwrapper {justify-content:flex-end;}
         .b4[data-disabled="false"] {cursor:pointer;}
         .b4[data-disabled="false"]:active[data-state~="mobile"] .b4label,.b4[data-disabled="false"]:hover[data-state~="desktop"] .b4label,.b4[data-disabled="false"][data-preview~="hover"] .b4label {color:#FFB703;transition:color 0.4s ease 0s;}
         .b4link {position:absolute;top:0;right:0;bottom:0;left:0;}
         .b4label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;  transition:color 0.4s ease 0s;  color:#12110F;white-space:nowrap;display:inline-block;}
         .b4[data-disabled="true"] .b4label,.b4[data-preview~="disabled"] .b4label {color:#FFFFFF;}</style><style type="text/css" data-styleid="style-kf8sbpeg">.style-kf8sbpegbg {position:absolute;top:0;right:0;bottom:0;left:0;}
         .style-kf8sbpeg[data-state~="mobileView"] .style-kf8sbpegbg {left:10px;right:10px;}
         .style-kf8sbpeginlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="s_DtaksTPAWidgetSkin">.s_DtaksTPAWidgetSkin {overflow:hidden;}
         .s_DtaksTPAWidgetSkin iframe {position:absolute;width:100%;height:100%;overflow:hidden;}
         .s_DtaksTPAWidgetSkin iframe:-webkit-full-screen {min-height:auto !important;}
         .s_DtaksTPAWidgetSkinpreloaderOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
         .s_DtaksTPAWidgetSkinpreloaderOverlaycontent {width:100%;height:100%;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlaycontent {width:100%;height:100%;background:rgba(255, 255, 255, 0.9);font-size:0;margin-top:5px;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlaytextContainer {color:#373737;font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;font-size:14px;display:inline-block;vertical-align:middle;width:100%;margin-top:10px;text-align:center;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlayreloadButton {display:inline-block;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlay a {color:#0099FF;text-decoration:underline;cursor:pointer;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlayiconContainer {display:none;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlaydismissButton {display:none;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlaytextTitle {font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;display:none;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlay[data-state~="hideIframe"] .s_DtaksTPAWidgetSkinunavailableMessageOverlay_buttons {opacity:1;}
         .s_DtaksTPAWidgetSkinunavailableMessageOverlay[data-state~="hideOverlay"] {display:none;}</style><style type="text/css" data-styleid="comp-kf8sqbal-rotated">#comp-kf8sqbal {transform: rotate(270deg)}</style></div><div class="noop visual-focus-on" style="position:relative"><div id="SCROLL_TO_TOP" tabindex="-1" aria-label="top of page" role="region" style="height:0"></div><div id="FONTS_CONTAINER"></div><div id="SITE_BACKGROUND" style="height:100%;top:0;min-height:calc(100vh - 0px);bottom:;left:;right:;position:" class="siteBackground"><div id="SITE_BACKGROUND_previous_noPrev" data-position="absolute" data-align="" data-fitting="" class="siteBackgroundprevious"><div id="SITE_BACKGROUNDpreviousImage" class="siteBackgroundpreviousImage"></div><div id="SITE_BACKGROUNDpreviousVideo" class="siteBackgroundpreviousVideo"></div><div id="SITE_BACKGROUND_previousOverlay_noPrev" class="siteBackgroundpreviousOverlay"></div></div><div id="SITE_BACKGROUND_current_rke15_desktop_bg" style="top:0;height:100%;width:100%;background-color:rgba(255, 183, 3, 1);display:;position:absolute" data-position="absolute" data-align="top_left" data-fitting="legacy_tile" class="siteBackgroundcurrent"><div id="SITE_BACKGROUND_currentImage_rke15_desktop_bg" style="position:absolute;top:0;height:100%;width:100%" data-type="bgimage" data-height="100%" class="siteBackgroundcurrentImage"></div><div id="SITE_BACKGROUNDcurrentVideo" class="siteBackgroundcurrentVideo"></div><div id="SITE_BACKGROUND_currentOverlay_rke15_desktop_bg" style="position:absolute;top:0;width:100%;height:100%" class="siteBackgroundcurrentOverlay"></div></div></div><div id="SITE_ROOT" class="SITE_ROOT" style="width:100%;min-width:980px;padding-bottom:0;top:0" aria-hidden="false"><div id="masterPage" class="mesh-layout" data-mesh-layout="grid"><header data-is-absolute-layout="false" data-is-mobile="false" data-state="transition-allowed" data-site-width="980" data-header-top="0" style="position:relative;margin-top:0;left:0;margin-left:0;width:100%;min-width:980px;top:;bottom:;right:;display:none" class="style-k7ugjugc" id="SITE_HEADER"><div style="left:0;width:100%" id="SITE_HEADERscreenWidthBackground" class="style-k7ugjugcscreenWidthBackground"><div class="style-k7ugjugc_bg"></div></div><div id="SITE_HEADERcenteredContent" class="style-k7ugjugccenteredContent"><div style="margin-left:calc((100% - 980px) / 2);width:980px" id="SITE_HEADERbg" class="style-k7ugjugcbg"></div><div id="SITE_HEADERinlineContent" class="style-k7ugjugcinlineContent"><style id="SITE_HEADER-mesh-styles">
             
         #SITE_HEADERinlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #SITE_HEADERinlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #SITE_HEADERinlineContent-gridContainer {
             position: static;
             display: grid;
             height: auto;
             width: 100%;
             min-height: auto;
             grid-template-rows: min-content min-content min-content min-content min-content 1fr;
             grid-template-columns: 100%;
         }
         
         #comp-j1rq4q3c1 {
             position: relative;
             margin: 13px 0 7px 0;
             left: 0;
             grid-area: 2 / 1 / 3 / 2;
             justify-self: stretch;
             align-self: start;
         }
         
         #comp-k557vagj {
             position: relative;
             margin: 0px 0px -14px calc((100% - 980px) * 0.5);
             left: 0px;
             grid-area: 1 / 1 / 2 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-j1rq742h {
             position: relative;
             margin: 0px 0px 23px calc((100% - 980px) * 0.5);
             left: 360px;
             grid-area: 2 / 1 / 6 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-k7nv6chl {
             position: absolute;
             top: 124px;
             left: 740px;
         }
         
         #comp-j1rq4q3b {
             position: relative;
             margin: 0px 0px 30px calc((100% - 980px) * 0.5);
             left: 1190px;
             grid-area: 3 / 1 / 4 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-j1rq4q3b1 {
             position: relative;
             margin: 0px 0px 48px calc((100% - 980px) * 0.5);
             left: 1240px;
             grid-area: 4 / 1 / 5 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-j1rq4r8a {
             position: relative;
             margin: 0px 0px 38px calc((100% - 980px) * 0.5);
             left: -1px;
             grid-area: 6 / 1 / 7 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #SITE_HEADERcenteredContent {
             position: relative;
         }
         
         #SITE_HEADERinlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #SITE_HEADERinlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #SITE_HEADERinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="SITE_HEADERinlineContent-gridWrapper" data-mesh-internal="true"><div id="SITE_HEADERinlineContent-gridContainer" data-mesh-internal="true"><div data-border-width="1px" style="transform-origin:center 0.5px;left:0;margin-left:0;width:100%;min-width:initial;top:;bottom:;right:;height:5px;position:;display:none" class="style-jr9629o5" id="comp-j1rq4q3c1"></div><section style="left:0;width:100%;min-width:980px;height:auto;top:;bottom:;right:;position:;display:none;margin-left:0" data-responsive="true" data-is-screen-width="true" data-col-margin="0" data-row-margin="0" class="strc1" id="comp-k557vagj"><div style="position:absolute;top:0;width:calc(100% - 0px);height:100%;overflow:hidden;pointer-events:auto;min-width:980px;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="strc1balata" id="comp-k557vagjbalata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557vagjbalatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557vagjbalatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div style="position:relative;width:calc(100% - 0px);min-width:980px" id="comp-k557vagjinlineContent" class="strc1inlineContent"><div style="position:relative;width:100%;left:0;flex:325;margin-left:0;min-width:325px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="325" data-is-mesh="true" class="mc1" id="comp-k557vaxc"><div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557vaxccontainer"><div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557vaxcbalata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557vaxcbalatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557vaxcbalatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557vaxcinlineContentParent"><div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557vaxcinlineContent"><style id="comp-k557vaxc-mesh-styles">
             
         #comp-k557vaxcinlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #comp-k557vaxcinlineContent-gridContainer {
             position: static;
             height: auto;
             width: 100%;
             min-height: 98px;
         }
         
         #comp-k557vaxccenteredContent {
             position: relative;
         }
         
         #comp-k557vaxcinlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #comp-k557vaxcinlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #comp-k557vaxcinlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #comp-k557vaxcinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="comp-k557vaxcinlineContent-gridContainer" data-mesh-internal="true"></div></div></div></div></div><div style="position:relative;width:100%;left:0;flex:326;margin-left:0px;min-width:326px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="326" data-is-mesh="true" class="mc1" id="comp-k557wjr8"><div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557wjr8container"><div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557wjr8balata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557wjr8balatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557wjr8balatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557wjr8inlineContentParent"><div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557wjr8inlineContent"><style id="comp-k557wjr8-mesh-styles">
             
         #comp-k557wjr8inlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #comp-k557wjr8inlineContent-gridContainer {
             position: static;
             height: auto;
             width: 100%;
             min-height: 98px;
         }
         
         #comp-k557wjr8centeredContent {
             position: relative;
         }
         
         #comp-k557wjr8inlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #comp-k557wjr8inlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #comp-k557wjr8inlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #comp-k557wjr8inlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="comp-k557wjr8inlineContent-gridContainer" data-mesh-internal="true"></div></div></div></div></div><div style="position:relative;width:100%;left:0;flex:329;margin-left:0px;min-width:329px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="329" data-is-mesh="true" class="mc1" id="comp-k557wp6h"><div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557wp6hcontainer"><div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557wp6hbalata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557wp6hbalatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557wp6hbalatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557wp6hinlineContentParent"><div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557wp6hinlineContent"><style id="comp-k557wp6h-mesh-styles">
             
         #comp-k557wp6hinlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #comp-k557wp6hinlineContent-gridContainer {
             position: static;
             height: auto;
             width: 100%;
             min-height: 98px;
         }
         
         #comp-k557wp6hcenteredContent {
             position: relative;
         }
         
         #comp-k557wp6hinlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #comp-k557wp6hinlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #comp-k557wp6hinlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #comp-k557wp6hinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="comp-k557wp6hinlineContent-gridContainer" data-mesh-internal="true"></div></div></div></div></div></div></section><div style="top:;bottom:;left:;right:;width:189px;height:128px;position:;display:none" title="" data-is-responsive="false" data-display-mode="fill" data-content-padding-horizontal="0" data-content-padding-vertical="0" data-exact-height="128" class="style-k7ns13ap" id="comp-j1rq742h"></div><div style="width:;height:;top:;bottom:;left:;right:;position:;display:none" class="controller1" id="comp-k7nv6chl"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:204px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-j1rq4q3b"><p class="font_9" style="line-height:1.55em; margin-left:40px;"><span style="font-family:roboto-bold,roboto,sans-serif;"><</a></span></p></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:150px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-j1rq4q3b1"><p class="font_9" style="line-height:1.55em; text-align:center;"><span style="font-family:roboto-bold,roboto,sans-serif;"></span></p></div><div id="comp-j1rq4r8a" class="hidden-during-prewarmup style-k7to9w85" style="overflow-x:hidden;top:;bottom:;left:;right:;width:980px;height:30px;position:;display:none" data-stretch-buttons-to-menu-width="true" data-same-width-buttons="false" data-num-items="8" data-menuborder-y="0" data-menubtn-border="0" data-ribbon-els="0" data-label-pad="0" data-ribbon-extra="0" data-drophposition="" data-dropalign="left" dir="ltr" data-state="left notMobile"><nav aria-label="Site" id="comp-j1rq4r8anavContainer" class="style-k7to9w85navContainer"><ul style="text-align:left" id="comp-j1rq4r8aitemsContainer" class="style-k7to9w85itemsContainer"><li data-direction="ltr" data-listposition="left" data-data-id="dataItem-j1rp5ha3" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a0"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k7tq7ym2" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a1"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-j1rpaj7y" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a2"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k7ud6l51" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a3"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k6sazqs1" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a4"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-jrgep25b" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a5"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-kcmg5nn2" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a6"></li><li data-direction="ltr" data-listposition="right" data-data-id="dataItem-k6i0cpy8" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a7"></li><li data-listposition="right" class="style-k7to9w85repeaterButton" data-state="menu  idle header notMobile" id="comp-j1rq4r8a__more__"></li></ul><div id="comp-j1rq4r8amoreButton" class="style-k7to9w85moreButton"></div><div style="visibility:hidden" data-drophposition="" data-dropalign="left" id="comp-j1rq4r8adropWrapper" class="style-k7to9w85dropWrapper"><ul style="visibility:hidden" id="comp-j1rq4r8amoreContainer" class="style-k7to9w85moreContainer"></ul></div></nav></div></div></div></div></div></header><main tabindex="-1" data-is-mobile="false" data-is-mesh="true" data-site-width="980" style="left:0;margin-left:0;width:100%;min-width:980px;top:0;bottom:;right:;position:" class="pc1" data-state="" id="PAGES_CONTAINER"><div style="left:0" id="PAGES_CONTAINERscreenWidthBackground" class="pc1screenWidthBackground"></div><div style="position:relative" id="PAGES_CONTAINERcenteredContent" class="pc1centeredContent"><div style="display:none" id="PAGES_CONTAINERbg" class="pc1bg"></div><div style="position:relative" id="PAGES_CONTAINERinlineContent" class="pc1inlineContent"><div style="width:100%"><div data-ismobile="false" data-is-mesh-layout="true" style="height:100%;left:0;position:relative;top:;bottom:;right:" class="style-kf8sbpeg" id="rke15"><div style="margin-left:calc((100% - 980px) / 2);width:980px" id="rke15bg" class="style-kf8sbpegbg"></div><div class="style-kf8sbpeginlineContent" id="rke15inlineContent"><style id="rke15-mesh-styles">
             
         #rke15inlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #rke15inlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #rke15inlineContent-gridContainer {
             position: static;
             display: grid;
             height: auto;
             width: 100%;
             min-height: 500px;
             grid-template-rows: min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content 1fr;
             grid-template-columns: 100%;
             padding-bottom: 0px;
             box-sizing: border-box;
         }
         
         #comp-kf8sqbal {
             position: relative;
             left: 380px;
             top: 226px;
         }
         
         #comp-kf8ryq20 {
             position: relative;
             margin: 27px 0px 0px calc((100% - 980px) * 0.5);
             left: 20px;
             grid-area: 1 / 1 / 2 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8rw8tn {
             position: relative;
             margin: 0px 0px 0px calc((100% - 980px) * 0.5);
             left: 30px;
             grid-area: 2 / 1 / 4 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfb3ktl2 {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 450px;
             grid-area: 4 / 1 / 10 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfb3m2tz {
             position: relative;
             margin: 0px 0px 10 calc((100% - 980px) * 0.5);
             left: 235px;
             grid-area: 4 / 1 / 11 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfpyrzoh {
             position: relative;
             margin: 2px 0px -15px calc((100% - 980px) * 0.5);
             left: 30px;
             grid-area: 4 / 1 / 7 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tjsl3 {
             position: relative;
             margin: 0px 0px -8px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 2 / 1 / 3 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tp69s {
             position: relative;
             margin: 25px 0px -4px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 3 / 1 / 5 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tkx3g {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 7 / 1 / 8 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8s5xt9 {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 30px;
             grid-area: 6 / 1 / 21 / 1;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8sqbal-rotated-wrapper {
             position: static;
             height: 480px;
             width: 0;
             margin: 4px 0px -29px calc((100% - 980px) * 0.5);
             grid-area: 1 / 1 / 24 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tqtc5 {
             position: relative;
             margin: 7px 0px 12px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 14 / 1 / 15 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tred7 {
             position: relative;
             margin: 0px 0px 15px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 15 / 1 / 16 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8ts8az {
             position: relative;
             margin: 0px 0px 21px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 16 / 1 / 17 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8tsu8k {
             position: relative;
             margin: 0px 0px 18px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 17 / 1 / 18 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8ttbhv {
             position: relative;
             margin: 0px 0px 11px calc((100% - 980px) * 0.5);
             left: 669px;
             grid-area: 18 / 1 / 19 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8ttcnw {
             position: relative;
             margin: 0px 0px 28px calc((100% - 980px) * 0.5);
             left: 669px;
             grid-area: 19 / 1 / 20 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfyyya {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 310px;
             grid-area: 4 / 1 / 12 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfz7nq {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 330px;
             grid-area: 4 / 1 / 13 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfzeot {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 358px;
             grid-area: 4 / 1 / 14 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfzr63 {
             position: relative;
             margin: -10px 0px 0px calc((100% - 980px) * 0.5);
             left: 419px;
             grid-area: 4 / 1 / 8 / 1;
             justify-self: start;
             align-self: start;
         }
         
         
         
         #comp-kf8tv20d {
             position: relative;
             margin: 0px 0px 23px calc((100% - 980px) * 0.5);
             left: 660px;
             grid-area: 21 / 1 / 22 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8s6j8x {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 30px;
             grid-area: 19 / 1 / 23 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfxgp6 {
             position: relative;
             margin: 0px 0px 8px calc((100% - 980px) * 0.5);
             left: 40px;
             grid-area: 20 / 1 / 25 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfvfxk97 {
             position: relative;
             margin: 0px 0px 0px calc((100% - 980px) * 0.5);
             left: 109px;
             grid-area: 20 / 1 / 25 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kf8sfbtj {
             position: relative;
             margin: 0px 0px 15px calc((100% - 980px) * 0.5);
             left: 430px;
             grid-area: 19 / 1 / 47 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-kfpx9ii3 {
             position: relative;
             margin: 0px 0px 0 calc((100% - 980px) * 0.5);
             left: 31px;
             grid-area: 23 / 1 / 48 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #rke15centeredContent {
             position: relative;
         }
         
         #rke15inlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #rke15inlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #rke15inlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="rke15inlineContent-gridWrapper" data-mesh-internal="true"><div id="rke15inlineContent-gridContainer" data-mesh-internal="true"><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:310px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ryq20"><h6 class="font_6">Practice</h6></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:591px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8rw8tn"><p class="font_8" style="font-size:15px; line-height:1.3em;"><span style="font-weight:bold;"><span style="letter-spacing:0.03em;"><span style="font-family:avenir-lt-w01_35-light1475496,sans-serif;"><span style="font-size:15px;"><span style="color:#000000;">Persuasion is the attempt to influence someone's belief,attitude, and intentions.</span></span></span></span></span></p>
         
</div><div id="comp-kfb3ktl2" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?&workerId='+'`+workerID+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&block='+'`+block+`'+'&task_type='+'`+task+`'+'&mission_state=fwd'+'&ans_n='+'&ans_y='" id="comp-kfb3ktl2link" class="b4link"><span id="comp-kfb3ktl2label" class="b4label"></span></a></div><div id="comp-kfb3m2tz" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="30" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?&workerId='+'`+workerID+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&block='+'`+block+`'+'&task_type='+'`+task+`'+'&mission_state=bkd'+'&ans_n='+'&ans_y='" id="comp-kfb3m2tzlink" class="b4link"><span id="comp-kfb3m2tzlabel" class="b4label">Tweet ID: `+fin_q+`</span></a></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:42px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfpyrzoh"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:310px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tjsl3"><h6 class="font_6">Introduction</h6></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tp69s"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Definition</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tkx3g"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">About the t</span></span></span><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">ask</span></span></span></span></a></span></h2></div><div class="style-kf8s5xvn_left-direction style-kf8s5xvn" style="top:;bottom:;left:;right:;width:469px;height:210px;position:" data-state="valid" id="comp-kf8s5xt9"><label style="padding-left:0;padding-right:20px;display:none;margin-bottom:14px;text-align:left;direction:ltr" for="comp-kf8s5xt9textarea" id="comp-kf8s5xt9label" class="style-kf8s5xvnlabel"></label><textarea style="padding-left:16px;padding-right:10px" placeholder="" readonly="" class="has-custom-focus style-kf8s5xvntextarea" id="comp-kf8s5xt9textarea">`+tweet_text+`</textarea></div><div id="comp-kf8sqbal-rotated-wrapper" data-mesh-internal="true"><div id="comp-kf8sqbal" style="top:;bottom:;left:;right:;width:480px;height:28px;position:" data-angle="270"><button type="button" aria-label="Introduction" class="stylablebutton643855516__root style-kf8sqbcc__root" style="position:absolute" id="comp-kf8sqbal-inner-button"><div class="stylablebutton643855516__container"><span class="stylablebutton643855516__label">Introduction</span><span class="stylablebutton643855516__icon" aria-hidden="true"><div><svg data-bbox="13.05 2.55 33.878 54.8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
             <g>
                 <path d="M46.5 28.9L20.6 3c-.6-.6-1.6-.6-2.2 0l-4.8 4.8c-.6.6-.6 1.6 0 2.2l19.8 20-19.9 19.9c-.6.6-.6 1.6 0 2.2l4.8 4.8c.6.6 1.6.6 2.2 0l21-21 4.8-4.8c.8-.6.8-1.6.2-2.2z"/>
             </g>
         </svg>
         </div></span></div></button></div></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tqtc5"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Example</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tred7"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Trigger Alert</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ts8az"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">What you should consider</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tsu8k"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">What you need to ask yourself</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ttbhv"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ttcnw"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;"></span></span></span></span></a></span></h2></div><div id="comp-kfvfyyya" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a  id="comp-kfvfyyyalink" class="b4link"><span id="comp-kfvfyyyalabel" class="b4label"></span></a></div><div id="comp-kfvfz7nq" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a id="comp-kfvfz7nqlink" class="b4link"><span id="comp-kfvfz7nqlabel" class="b4label"></span></a></div><div id="comp-kfvfzeot" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:42px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a id="comp-kfvfzeotlink" class="b4link"><span id="comp-kfvfzeotlabel" class="b4label"></span></a></div><div id="comp-kfvfzr63" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a id="comp-kfvfzr63link" class="b4link"><span id="comp-kfvfzr63label" class="b4label"><form>
<select name="list" id="list" accesskey="target">
    <option value='none' selected>Jump to ID</option>
    `+optionList+`
</select>
<input type=button value="Go" onclick="goToNewPage()" />
</form></span></a></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:20px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfvg3jl5"><p class="font_10"><span style="font-weight:bold;"></br></br></br></br></br><span style="color:#000000;"></span></span></p></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tv20d"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">How to report</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:330px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8s6j8x"><p class="font_8" style="font-size:15px; line-height:1.3em;"><span style="font-weight:bold;color:#000000;">`+foot_note+`<span style="letter-spacing:0.03em;"><span style="font-family:avenir-lt-w01_35-light1475496,sans-serif;"><span style="font-size:15px;"><span style="color:#000000;"></span></span></span></span></span></p></div><div id="comp-kfvfxgp6" data-align="center" data-disabled="`+yes_val+`" data-margin="0" data-should-use-flex="true" data-width="42" data-height="35" style="top:;bottom:;left:;right:;width:42px;height:35px;position:" class="b1" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?ans_y=YES'+'&ans_n='+'&workerId='+'`+workerID+`'+'&task_type='+'`+task+`'+'&block='+'`+block+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&mission_state=chk'" id="comp-kfvfxgp6link" class="g-transparent-a b1link"><span id="comp-kfvfxgp6label" class="b1label">Yes</span></a></div><div id="comp-kfvfxk97" data-align="center" data-disabled="`+no_val+`" data-margin="0" data-should-use-flex="true" data-width="40" data-height="35" style="top:;bottom:;left:;right:;width:40px;height:35px;position:" class="b1" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?ans_n=NO'+'&ans_y='+'&workerId='+'`+workerID+`'+'&block='+'`+block+`'+'&task_type='+'`+task+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&mission_state=chk'" id="comp-kfvfxk97link" class="g-transparent-a b1link"><span id="comp-kfvfxk97label" class="b1label">No</span></a></div><div id="comp-kf8sfbtj" data-align="center" data-disabled="`+sbmtval_efct+`" data-margin="0" data-should-use-flex="true" data-width="131" data-height="35" style="top:;bottom:;left:;right:;width:131px;height:35px;position:" class="b1" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?&workerId='+'`+workerID+`'+'&block='+'`+block+`'+'&task_type='+'`+task+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&mission_state='+'`+sbmtlnk+`'" id="comp-kf8sfbtjlink" class="g-transparent-a b1link"><span id="comp-kf8sfbtjlabel" class="b1label">`+sbmtval+`</span></a></div><div class="style-kf8s5xvn_left-direction style-kf8s5xvn" style="top:;bottom:;left:;right:;width:480px;height:185px;position:" data-state="valid" id="comp-kfpx9ii3"><label style="padding-left:0;padding-right:20px;display:none;margin-bottom:14px;text-align:left;direction:ltr" for="comp-kfpx9ii3textarea" id="comp-kfpx9ii3label" class="style-kf8s5xvnlabel"></label><textarea readonly style="padding-left:16px;padding-right:10px" placeholder="" class="has-custom-focus style-kf8s5xvntextarea" id="comp-kfpx9ii3textarea">`+Mrinal+`</textarea></div></div></div></div></div></div></div></div></main><div id="soapAfterPagesContainer" class="page-without-sosp"><style id="soapAfterPagesContainer-mesh-styles">
             
         #soapAfterPagesContainerinlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #soapAfterPagesContainerinlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #soapAfterPagesContainerinlineContent-gridContainer {
             position: static;
             display: grid;
             height: auto;
             width: 100%;
             min-height: auto;
             grid-template-rows: 1fr;
             grid-template-columns: 100%;
             padding-bottom: 0px;
             box-sizing: border-box;
         }
         
         #comp-j1rtn0ml {
             position: relative;
             margin: 6px 0 0 0;
             left: 0;
             grid-area: 1 / 1 / 2 / 2;
             justify-self: stretch;
             align-self: start;
         }
         
         #CONTROLLER_COMP_CUSTOM_ID {
             position: absolute;
             top: -288px;
             left: 20px;
         }
         
         #soapAfterPagesContainercenteredContent {
             position: relative;
         }
         
         #soapAfterPagesContainerinlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #soapAfterPagesContainerinlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #soapAfterPagesContainerinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="soapAfterPagesContainerinlineContent-gridWrapper" data-mesh-internal="true"><div id="soapAfterPagesContainerinlineContent-gridContainer" data-mesh-internal="true"><div data-border-width="1px" style="transform-origin:center 0.5px;left:0;margin-left:0;width:100%;min-width:initial;top:;bottom:;right:;height:5px;position:;display:none" class="style-jr9629o5" id="comp-j1rtn0ml"></div><div style="width:;height:;top:;bottom:;left:;right:;position:;display:none" class="style-k6auwcww" id="CONTROLLER_COMP_CUSTOM_ID"></div></div></div></div><footer style="bottom:auto;left:0;margin-left:0;width:100%;min-width:980px;top:;right:;position:;display:none" class="style-k7ugjln5_footer style-k7ugjln5" tabindex="-1" data-site-width="980" data-fixedposition="false" data-isrunninginmobile="false" data-is-absolute-layout="false" data-state=" " id="SITE_FOOTER"><div style="left:0;width:100%" id="SITE_FOOTERscreenWidthBackground" class="style-k7ugjln5screenWidthBackground"><div class="style-k7ugjln5_bg"></div></div><div style="width:100%" id="SITE_FOOTERcenteredContent" class="style-k7ugjln5centeredContent"><div style="margin-left:calc((100% - 980px) / 2);width:980px" id="SITE_FOOTERbg" class="style-k7ugjln5bg"></div><div id="SITE_FOOTERinlineContent" class="style-k7ugjln5inlineContent"><style id="SITE_FOOTER-mesh-styles">
             
         #SITE_FOOTERinlineContent {
             height: auto;
             width: 100%;
             position: relative;
         }
         
         #SITE_FOOTERinlineContent-gridWrapper {
             pointer-events: none;
         }
         
         #SITE_FOOTERinlineContent-gridContainer {
             position: static;
             display: grid;
             height: auto;
             width: 100%;
             min-height: 423px;
             grid-template-rows: min-content min-content min-content min-content min-content 1fr;
             grid-template-columns: 100%;
         }
         
         #comp-j1rq4r8m {
             position: relative;
             margin: 60px 0px 25px calc((100% - 980px) * 0.5);
             left: -1px;
             grid-area: 1 / 1 / 4 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-j9zs014r {
             position: relative;
             margin: 0px 0px 19px calc((100% - 980px) * 0.5);
             left: 0px;
             grid-area: 5 / 1 / 6 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-k6huwtfd {
             position: relative;
             margin: 60px 0px 46px calc((100% - 980px) * 0.5);
             left: 650px;
             grid-area: 1 / 1 / 2 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-k6hsf3rx {
             position: relative;
             margin: 0px 0px 40px calc((100% - 980px) * 0.5);
             left: 610px;
             grid-area: 2 / 1 / 3 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-k6hsf3sr {
             position: relative;
             margin: 0px 0px -7px calc((100% - 980px) * 0.5);
             left: 680px;
             grid-area: 4 / 1 / 5 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #comp-jhi0p1w8 {
             position: relative;
             margin: 0px 0px 10px calc((100% - 980px) * 0.5);
             left: 0px;
             grid-area: 6 / 1 / 7 / 2;
             justify-self: start;
             align-self: start;
         }
         
         #SITE_FOOTERcenteredContent {
             position: relative;
         }
         
         #SITE_FOOTERinlineContent-gridContainer > * {
             pointer-events: auto;
         }
         
         #SITE_FOOTERinlineContent-gridContainer > [id$="-rotated-wrapper"] {
             pointer-events: none;
         }
         
         #SITE_FOOTERinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
             pointer-events: auto;
         }</style><div id="SITE_FOOTERinlineContent-gridWrapper" data-mesh-internal="true"><div id="SITE_FOOTERinlineContent-gridContainer" data-mesh-internal="true"><div data-packed="false" data-vertical-text="false" style="top:;bottom:;left:;right:;width:253px;height:auto;position:;display:none;min-height:120px;pointer-events:none" data-min-height="120" class="txtNew" id="comp-j1rq4r8m"><p class="font_8" style="font-size:22px;"><span style="font-size:22px;"><span class="color_18"><span style="text-decoration:underline;"><</span></span></span></p>
         
         </div><div data-is-responsive="false" style="width:118px;height:30px;top:;bottom:;left:;right:;position:;display:none" data-hide-prejs="true" class="lb1" id="comp-j9zs014r"><ul aria-label="Social bar" id="comp-j9zs014ritemsContainer" class="lb1itemsContainer"><li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r0image"></li><li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r1image"></li><li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r2image"></li></ul></div><div data-packed="false" data-vertical-text="false" style="top:;bottom:;left:;right:;width:219px;height:auto;position:;display:none;min-height:25px;pointer-events:none" data-min-height="25" class="txtNew" id="comp-k6huwtfd"></div><div data-height-diff="0" data-width-diff="0" data-num-cols="2" data-max-rows="3" data-margin="15" data-is-mesh="true" style="overflow:hidden;top:;bottom:;left:;right:;width:285px;height:79px;position:;display:none" class="style-k6hsf3sb" data-state="hidePlayButton autoplayOff idle notMobile desktopView  touchRollOut" id="comp-k6hsf3rx"><div data-gallery-id="comp-k6hsf3rx" class="style-k6hsf3sb_show-counter style-k6hsf3sbitemsContainer" style="position:relative;overflow:hidden;width:285px;height:79px" id="comp-k6hsf3rxitemsContainer"><div style="transform:none;position:absolute;width:135px;height:79px;left:0;top:0;overflow:hidden;clip:auto" data-has-bg-scroll-effect="" data-style="position:absolute;overflow:hidden;clip:auto" data-gallery-id="comp-k6hsf3rx" data-page-desc="curr" data-query="dataItem-k6hsf5hc4" data-image-index="0" class="style-k6hsf3sbimg" id="comp-k6hsf3rxdataItem-k6hsf5hc4"><img id="comp-k6hsf3rxdataItem-k6hsf5hc4image" alt="" data-type="image" itemProp="image"/></div><div style="transform:none;position:absolute;width:135px;height:79px;left:150px;top:0;overflow:hidden;clip:auto" data-has-bg-scroll-effect="" data-style="position:absolute;overflow:hidden;clip:auto" data-gallery-id="comp-k6hsf3rx" data-page-desc="curr" data-query="dataItem-k6hsf5hc" data-image-index="1" class="style-k6hsf3sbimg" id="comp-k6hsf3rxdataItem-k6hsf5hc"><img id="comp-k6hsf3rxdataItem-k6hsf5hcimage" alt="" data-type="image" itemProp="image"/></div></div><div style="visibility:hidden;cursor:pointer" data-gallery-id="comp-k6hsf3rx" data-hovered-image-id="" id="comp-k6hsf3rxrolloverHolder" class="style-k6hsf3sbrolloverHolder"><h3 data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxtitle" class="style-k6hsf3sbtitle"></h3><p data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxdescription" class="style-k6hsf3sbdescription"></p><a id="comp-k6hsf3rxlink" class="style-k6hsf3sblink"></a><a href="#" style="height:100%;display:block;width:100%;position:absolute;top:0px;left:0px;background-color:#ffffff;filter:alpha(opacity=0);opacity:0;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-drag:none;-webkit-user-drag:none;-moz-user-drag:none;-ms-user-drag:none;user-modify:read-only;-webkit-user-modify:read-only;-moz-user-modify:read-only;-ms-user-modify:read-only"></a></div><div class="style-k6hsf3sb_buttons"><a data-gallery-id="comp-k6hsf3rx" style="visibility:hidden" id="comp-k6hsf3rxbuttonPrev" class="style-k6hsf3sbbuttonPrev"></a><a data-gallery-id="comp-k6hsf3rx" style="visibility:hidden" id="comp-k6hsf3rxbuttonNext" class="style-k6hsf3sbbuttonNext"></a></div><div style="visibility:visible" data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxcounter" class="style-k6hsf3sb_hlp style-k6hsf3sb_opc style-k6hsf3sbcounter">1/1</div><div data-gallery-id="comp-k6hsf3rx" style="cursor:pointer;visibility:hidden" id="comp-k6hsf3rxautoplay" class="style-k6hsf3sb_hlp style-k6hsf3sb_opc style-k6hsf3sbautoplay"><span></span></div><div id="comp-k6hsf3rxemptyDivToFillMatrix" class="style-k6hsf3sbemptyDivToFillMatrix"></div></div><div id="comp-k6hsf3sr" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="131" data-height="35" style="top:;bottom:;left:;right:;width:131px;height:35px;position:;display:none" class="style-k6hsf3t3" data-state="desktop shouldUseFlex center"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:109px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-jhi0p1w8"><p class="font_9" style="text-align:center; font-size:14px;"><span style="font-size:14px;"><span class="color_11"><span style="text-decoration:underline;"></span></span></span></p></div></div></div></div></div></footer></div></div><div id="aspectCompsContainer" class="siteAspectsContainer"><div style="position:absolute" id="popoverLayer"></div><wix-iframe style="top:;bottom:;left:;right:;position:;overflow:hidden;visibility:hidden" data-has-iframe="true" data-src="https://apps.wix.com/members-area/app-worker?cacheKiller=1601836289450&amp;commonConfig=%7B%7BcommonConfig%7D%7D&amp;compId=tpaWorker_9180&amp;consent-policy=%7B%7BconsentPolicy%7D%7D&amp;deviceType=desktop&amp;endpointType=worker&amp;instance=miJuHq7rqXBbBUbn2Zd0ho7e2KzdSOGVyNq5rFvlIEk.eyJpbnN0YW5jZUlkIjoiZWI5OWQ0NWItZThkMS00N2ZmLWE2ZWEtMGNhNDllMDExY2Q2IiwiYXBwRGVmSWQiOiIxNGNlMjhmNy03ZWIwLTM3NDUtMjJmOC0wNzRiMGUyNDAxZmIiLCJtZXRhU2l0ZUlkIjoiZTk4ZGRjM2MtM2E2Yy00Zjk5LTg3YTMtZGQ1M2U5YjdhOWNlIiwic2lnbkRhdGUiOiIyMDIwLTEwLTA0VDE4OjM3OjI0LjU5NVoiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjdmODNiMGIxLTE4NWItNGEzMy1iOWMzLWYwY2E0YzM0YmZkMiIsImJpVG9rZW4iOiIwMjE0MDg2Ny1kMmJkLTA4NjYtMjE0OS1kMWY3NzdiNmI1MTgiLCJzaXRlT3duZXJJZCI6IjU3NThjNGIzLWVkODYtNDdkYi05Yjc3LWQ4YjZhNjAyZmI3ZiJ9&amp;locale=en&amp;siteRevision=1372&amp;viewMode=site&amp;viewerCompId=tpaWorker_9180" data-is-tpa="true" data-app-definition-id="14ce28f7-7eb0-3745-22f8-074b0e2401fb" id="tpaWorker_9180" class="s_DtaksTPAWidgetSkin"><iframe data-src="https://apps.wix.com/members-area/app-worker?cacheKiller=1601836289450&amp;commonConfig=%7B%7BcommonConfig%7D%7D&amp;compId=tpaWorker_9180&amp;consent-policy=%7B%7BconsentPolicy%7D%7D&amp;deviceType=desktop&amp;endpointType=worker&amp;instance=miJuHq7rqXBbBUbn2Zd0ho7e2KzdSOGVyNq5rFvlIEk.eyJpbnN0YW5jZUlkIjoiZWI5OWQ0NWItZThkMS00N2ZmLWE2ZWEtMGNhNDllMDExY2Q2IiwiYXBwRGVmSWQiOiIxNGNlMjhmNy03ZWIwLTM3NDUtMjJmOC0wNzRiMGUyNDAxZmIiLCJtZXRhU2l0ZUlkIjoiZTk4ZGRjM2MtM2E2Yy00Zjk5LTg3YTMtZGQ1M2U5YjdhOWNlIiwic2lnbkRhdGUiOiIyMDIwLTEwLTA0VDE4OjM3OjI0LjU5NVoiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjdmODNiMGIxLTE4NWItNGEzMy1iOWMzLWYwY2E0YzM0YmZkMiIsImJpVG9rZW4iOiIwMjE0MDg2Ny1kMmJkLTA4NjYtMjE0OS1kMWY3NzdiNmI1MTgiLCJzaXRlT3duZXJJZCI6IjU3NThjNGIzLWVkODYtNDdkYi05Yjc3LWQ4YjZhNjAyZmI3ZiJ9&amp;locale=en&amp;siteRevision=1372&amp;viewMode=site&amp;viewerCompId=tpaWorker_9180" scrolling="no" frameBorder="0" allow="autoplay; camera; microphone; geolocation;" allowtransparency="true" allowfullscreen="" name="tpaWorker_9180" style="display:none;position:absolute;z-index:" title="Profile Card" aria-label="Profile Card" id="tpaWorker_9180iframe" class="s_DtaksTPAWidgetSkiniframe"></iframe><div id="tpaWorker_9180overlay" class="s_DtaksTPAWidgetSkinoverlay"></div></wix-iframe></div><div id="SCROLL_TO_BOTTOM" tabindex="-1" aria-label="bottom of page" role="region" style="height:0"></div><script id="partiallyVisibleBeat">
                         if (window.wixBiSession) {
                             wixBiSession.isUsingMesh = true;
                             if (wixBiSession.sendBeat) {
                                 wixBiSession.sendBeat(12, 'Partially visible', '&pid=rke15');
                             }
                         }
                         if (window.requestCloseWelcomeScreen) {
                             requestCloseWelcomeScreen();
                         }
                     </script></div><div class="font-ruler-container" style="overflow:hidden;visibility:hidden;max-height:0;max-width:0;position:absolute"><style>.font-ruler-content::after {content:"@#$%%^&*~IAO"}</style><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div></div></div>
         
         
             
            
             
         
         
             
             
             
             
         
             
                 <!-- No Footer -->
             
         
             
             
             
             
             
             
             
             <!--body end html embeds start-->
             
             <!--body end html embeds end-->
             
             
             
         
             
             
             
             
             
         
             
         
         
         </body>
         </html> 

      

                  `);
         
                        
           //res.end();
                   
          //next();
                        
         });
       }
        });
    });
    
    
    
       });    

       app.get('/maintask', async function(req, res) {
        var reqQueryObject = req.query // returns object with all parameters
          
          workerID = req.query.workerId // returns "12354411"
  
          assignmentID = req.query.assignmentId
          activitystatus = req.query.activityStatus
          ans_y=req.query.ans_y;
          ans_n=req.query.ans_n;
          yes_val="false";
          no_val="false";
          
          mission_state=req.query.mission_state
          task=parseInt(req.query.task_type);
          block=parseInt(req.query.block);
          //mission_val=parseInt(req.query.missionVal);
          mission_id1=parseInt(req.query.missionId);
          console.log("request URL "+req.url);
         console.log("request params "+mission_id1);
         if (typeof mission_id1 !== 'number') {
            mission_id=mission_id1;
          console.log("This is not number "+mission_id1);
              }
         var blockID='1';
        var d = Date()
          var current_hour = d.toString() 
        //2.
        const Pool = require('pg').Pool;
        const pool = new Pool({
            user: 'dbodoff@persuasion',
            host: 'persuasion.postgres.database.azure.com',
            database: 'postgres',
            password: 'Bozo@2020',
            port: 5432,
      })
       
      
      
      
      //find task_type_val
        
        if( mission_state === "fwd") {
         ++mission_id;
         } 
         if( mission_state === "bkd") {
            kk=0;
            --mission_id;
             if ( Number(mission_id) === Number(kk) ) {
              mission_id=1;
             }
            } 
            if( mission_state === "msc") {
              mission_id=mission_id1;
              } 
         //find tweet text
         
  
         sql_chy3 = `select count(*) from (select distinct question from session where worker_id='${workerID}' and status='Main Task') t;`;
         console.log(sql_chy3);
         pool.on('error',function(err,client){});
         pool.query(sql_chy3,(error, results) => {
          if (error) {
              console.error("error to check "+error);
          }
         
          console.log(results.rows[0].count);
          mission_val=results.rows[0].count;
  
         //sql_chy = `select * from tweet where mission_id=${task} and block_id=${block};`;
         sql_chy = `select * from tweet where block_id=${block};`;
         pool.on('error',function(err,client){});
         pool.query(sql_chy,(error, results) => {
            //fin_q=Number(results.rows.length);
            console.log("final number of questions : "+results.rows.length);
            if (Number(results.rows.length) <= Number(mission_id))
            {
               mission_id=results.rows.length;
               if (Number(results.rows.length) == Number(mission_id) && mission_state === "fwd" && Number(mission_val) < Number(results.rows.length)) 
               {
                   sql_msc3 = `select distinct (coalesce(question, 0)) as question from session where worker_id='${workerID}' and status='Main Task';`;
                   console.log(sql_msc3);
                  pool.query(sql_msc3,(error3, results3) => {
                       var alert =require('alert');
                       const data = results3.rows;
                       
                       foot_note1 ="Please answer all the tweets! If there are no tweet number in this alert then you have not answered any tweet yet. Tweets answered are "+R.pluck('question', data);
                       /*data.forEach(row => {
                           alert(`question: ${row.question}`);
                       })*/
                       res.write(`
                    <!DOCTYPE html>
                     <html lang="en">
                        <head>
                           <title>Tweet</title>
                           
                        </head>
                    <body>
                    <a target="_self" onclick="href='?&workerId='+'`+workerID+`'+'&block='+'`+block+`'+'&task_type='+'`+task+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&mission_state='+'`+sbmtlnk+`'">
                    
                    </a>
                    <h6>`+foot_note1+`</h6>                                                       
                                                                    
                    </body>
                </html>
                `);
                    
                   
                   
                   
                   });
               }
           }
           fin_q=`${mission_id}`; 
           
          if (Number(mission_val) >= Number(results.rows.length) ) {
              
              res.write(`
  
  
                  <!DOCTYPE html>
                  <html lang="en">
                      <head>
                              <title>Tweet</title>
                          </head>
                  
                          <body>
                          <h1>Thanks for completion of Tweet</h1>
  
                  </body>
                  </html>
                  
                          `);
                          res.end();
           
  
           
  
           } else {
  
      
              //sql =  `select * from tweet where question_number = ${mission_id} and mission_id=${task} and block_id=${block};`;
              sql =  `select * from tweet where question_number = ${mission_id} and block_id=${block};`;
              console.log(sql);
               pool.on('error',function(err,client){});
      
        pool.query(sql,(error, results) => {
          
           tweet_text=results.rows[0].tweet_text;
           console.log("the tweet text is "+tweet_text)
           //max_questions=results.rowcount;
           //Console.log("max_questions "+max_questions);
           Answer=results.rows[0].answer;
           console.log("Answer "+Answer);
           Correct_text=results.rows[0].correct_text;
           console.log("Correct_text "+Correct_text);
           Wrong_text=results.rows[0].wrong_text;
          console.log("Wrong_text "+Wrong_text);
        console.log("mission id  "+mission_id);
        
           console.log ("ans_n and ans_y "+ans_n+" "+ans_y);
  
        if ( mission_state === "chk") {
  
          if ( typeof ans_y === 'undefined' && typeof ans_n === 'undefined' ) {
  
              foot_note="Does the tweet text answer to the definition?";
              sbmtlnk="chk";
  
  
          } else {
  
  
    
          
               sbmtlnk="fwd";
               if ( ans_n === '' ) {
  
                 k_ans=`${ans_y}`;
                 yes_val="true";
            }

            if (  ans_y === '' ) {
  
                 k_ans=`${ans_n}`;
                 no_val='true';
            }

            var sql_chy1 = `insert into session values ('${workerID}','Main Task',${block},${task},${mission_id},'${k_ans}');` 


               pool.query(sql_chy1,(error, results) => {});
               console.log(sql_chy1);
      
            
           
       
      }
       
          
       } else {
           foot_note="Does the tweet text answer to the definition?";
           Mrinal="";
     
       }
       console.log("Value of Mrinal"+Mrinal);
        console.log("answers"+ans_y+":"+ans_n);
           res.write(`
           
  
           <!DOCTYPE html>
           <html lang="en">
                 <head>
                      <title>Tweet</title>
                   </head>
           
                       
                           <body class="prewarmup">
                       
           
               
           
           
               
           
               <script type="text/javascript">
                     
                         var htmlClassList = document.documentElement.classList;
                         
                     
           
                 
                 var bodyCacheable = true;
                 wixBiSession.setCaching(bodyCacheable);
           
                 var clientSideRender = false;
                 
                 
                 
               </script>
           
               
               
               
               <!--body start html embeds start-->
               
               <!--body start html embeds end-->
               
               
           
               
               <script id="wix-first-paint">
                   if (window.ResizeObserver &&
                       (!window.PerformanceObserver || !PerformanceObserver.supportedEntryTypes || PerformanceObserver.supportedEntryTypes.indexOf('paint') === -1)) {
                       new ResizeObserver(function (entries, observer) {
                           entries.some(function (entry) {
                               var contentRect = entry.contentRect;
                               if (contentRect.width > 0 && contentRect.height > 0) {
                                   requestAnimationFrame(function (now) {
                                       window.wixFirstPaint = now;
                                       dispatchEvent(new CustomEvent('wixFirstPaint'));
                                   });
                                   observer.disconnect();
                                   return true;
                               }
                           });
                       }).observe(document.body);
                   }
               </script>
               
           
           
               <div id="SITE_CONTAINER"><style type="text/css" data-styleid="uploadedFonts"></style><div><style type="text/css" data-styleid="theme_fonts">.font_0 {font: normal normal normal 30px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#FFB703;} 
           .font_1 {font: normal normal normal 14px/1.43em 'Open Sans',sans-serif ;color:#12110F;} 
           .font_2 {font: normal normal normal 48px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;} 
           .font_3 {font: normal normal normal 48px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;} 
           .font_4 {font: normal normal normal 72px/1.111em impact,impact-w01-2010,impact-w02-2010,impact-w10-2010,sans-serif ;color:#12110F;} 
           .font_5 {font: normal normal normal 56px/1.161em impact,impact-w01-2010,impact-w02-2010,impact-w10-2010,sans-serif ;color:#12110F;} 
           .font_6 {font: normal normal normal 28px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;color:#12110F;} 
           .font_7 {font: normal normal normal 18px/1.4em roboto-bold,roboto,sans-serif ;color:#12110F;} 
           .font_8 {font: normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;color:#FFFFFF;} 
           .font_9 {font: normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;color:#12110F;} 
           .font_10 {font: normal normal normal 14px/1.43em 'Open Sans',sans-serif ;color:#12110F;} 
           </style><style type="text/css" data-styleid="theme_colors">.color_0 {color: #FFFFFF;}
           .backcolor_0 {background-color: #FFFFFF;}
           .color_1 {color: #FFFFFF;}
           .backcolor_1 {background-color: #FFFFFF;}
           .color_2 {color: #000000;}
           .backcolor_2 {background-color: #000000;}
           .color_3 {color: #ED1C24;}
           .backcolor_3 {background-color: #ED1C24;}
           .color_4 {color: #0088CB;}
           .backcolor_4 {background-color: #0088CB;}
           .color_5 {color: #FFCB05;}
           .backcolor_5 {background-color: #FFCB05;}
           .color_6 {color: #727272;}
           .backcolor_6 {background-color: #727272;}
           .color_7 {color: #B0B0B0;}
           .backcolor_7 {background-color: #B0B0B0;}
           .color_8 {color: #FFFFFF;}
           .backcolor_8 {background-color: #FFFFFF;}
           .color_9 {color: #727272;}
           .backcolor_9 {background-color: #727272;}
           .color_10 {color: #B0B0B0;}
           .backcolor_10 {background-color: #B0B0B0;}
           .color_11 {color: #FFFFFF;}
           .backcolor_11 {background-color: #FFFFFF;}
           .color_12 {color: #B8B5AE;}
           .backcolor_12 {background-color: #B8B5AE;}
           .color_13 {color: #75736D;}
           .backcolor_13 {background-color: #75736D;}
           .color_14 {color: #363430;}
           .backcolor_14 {background-color: #363430;}
           .color_15 {color: #12110F;}
           .backcolor_15 {background-color: #12110F;}
           .color_16 {color: #FFF0CC;}
           .backcolor_16 {background-color: #FFF0CC;}
           .color_17 {color: #FFDB81;}
           .backcolor_17 {background-color: #FFDB81;}
           .color_18 {color: #FFB703;}
           .backcolor_18 {background-color: #FFB703;}
           .color_19 {color: #AA7A02;}
           .backcolor_19 {background-color: #AA7A02;}
           .color_20 {color: #553D01;}
           .backcolor_20 {background-color: #553D01;}
           .color_21 {color: #D3D4D6;}
           .backcolor_21 {background-color: #D3D4D6;}
           .color_22 {color: #A8A9AD;}
           .backcolor_22 {background-color: #A8A9AD;}
           .color_23 {color: #7E7F82;}
           .backcolor_23 {background-color: #7E7F82;}
           .color_24 {color: #545557;}
           .backcolor_24 {background-color: #545557;}
           .color_25 {color: #2A2A2B;}
           .backcolor_25 {background-color: #2A2A2B;}
           .color_26 {color: #FFFFFF;}
           .backcolor_26 {background-color: #FFFFFF;}
           .color_27 {color: #FFFFFF;}
           .backcolor_27 {background-color: #FFFFFF;}
           .color_28 {color: #EBEBEB;}
           .backcolor_28 {background-color: #EBEBEB;}
           .color_29 {color: #BEBEBE;}
           .backcolor_29 {background-color: #BEBEBE;}
           .color_30 {color: #727272;}
           .backcolor_30 {background-color: #727272;}
           .color_31 {color: #FFF1AB;}
           .backcolor_31 {background-color: #FFF1AB;}
           .color_32 {color: #FFEA82;}
           .backcolor_32 {background-color: #FFEA82;}
           .color_33 {color: #FFD504;}
           .backcolor_33 {background-color: #FFD504;}
           .color_34 {color: #AA8E03;}
           .backcolor_34 {background-color: #AA8E03;}
           .color_35 {color: #554701;}
           .backcolor_35 {background-color: #554701;}
           </style></div><div id="CSS_CONTAINER"><style id="masterPage_css">.horizontalmenuitem1808041630__root {
             -archetype: paintBox;
           
             display: block;
             transition: inherit;
           }
           
           .horizontalmenuitem1808041630__root:not([href]) {
             cursor: default !important;
           }
           
           .horizontalmenuitem1808041630__listItem {
             flex-grow: inherit;
           }
           
           .horizontalmenuitem1808041630__container {
             -archetype: box;
             display: flex;
             height: 100%;
           }
           
           .horizontalmenuitem1808041630__label {
             -archetype: text;
             -controller-part-type: LayoutChildDisplayDropdown;
           }
           
           .horizontalmenusubitem329750698__root {
             -archetype: paintBox;
           
             display: block;
           
             transition: inherit;
           }
           
           .horizontalmenusubitem329750698__root:not([href]) {
             cursor: default !important;
           }
           
           .horizontalmenusubitem329750698__listItem {
             flex-grow: inherit;
           
             -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
             page-break-inside: avoid; /* Firefox */
             break-inside: avoid; /* IE 10+ */
           }
           
           .horizontalmenusubitem329750698__container {
             -archetype: box;
             display: flex;
           }
           
           .horizontalmenusubitem329750698__label {
             -archetype: text;
             -controller-part-type: LayoutChildDisplayDropdown;
           }
           
           .horizontalmenusubsubitem676023543__root {
             -archetype: paintBox;
           
             display: block;
           
             transition: inherit;
           }
           
           .horizontalmenusubsubitem676023543__root:not([href]) {
             cursor: default !important;
           }
           
           .horizontalmenusubsubitem676023543__listItem {
             flex-grow: inherit;
           
             -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
             page-break-inside: avoid; /* Firefox */
             break-inside: avoid; /* IE 10+ */
           }
           
           .horizontalmenusubsubitem676023543__container {
             -archetype: box;
             display: flex;
           }
           
           .horizontalmenusubsubitem676023543__label {
             -archetype: text;
             -controller-part-type: LayoutChildDisplayDropdown;
           }
           
           .horizontalmenuscrollbutton2690837022__root {
             -archetype: paddingBox;
           
             display: flex;
             align-items: center;
             justify-content: center;
             cursor: pointer;
             pointer-events: auto;
             overflow: hidden;
           }
           
           .horizontalmenuscrollbutton2690837022__root.horizontalmenuscrollbutton2690837022---side-4-left {
             transform: scaleX(-1);
             -webkit-transform: scaleX(-1);
           }
           
           .horizontalmenuscrollbutton2690837022__root.horizontalmenuscrollbutton2690837022---side-5-right {}
           
           .horizontalmenuscrollbutton2690837022__root.horizontalmenuscrollbutton2690837022--isHidden {
             visibility: hidden;
             pointer-events: none;
           }
           
           .horizontalmenuscrollbutton2690837022__icon {
             -archetype: icon;
             -controller-part-type: LayoutChildDisplayDropdown;
             min-width: 1px;
             max-height: 100%;
             max-width: 100%;
           }
           
           .horizontalmenuscrollbutton2690837022__icon > div,.horizontalmenuscrollbutton2690837022__icon svg {
             width: inherit;
             height: inherit;
           }
           
           .stylablebutton643855516__root {
               -archetype: box;
               /* -st-states: error, disabled; */
               cursor: pointer;
               border: none;
               display: block;
               min-width: 10px;
               min-height: 10px;
               width: 100%;
               height: 100%;
               box-sizing: border-box;
               padding: 0px;
           }
           
           .stylablebutton643855516__root[disabled] {
               pointer-events: none;
           }
           
           .stylablebutton643855516__link {
               -archetype: box;
               text-decoration: none;
               box-sizing: border-box;
               color: black;
           }
           
           .stylablebutton643855516__container {
               display: flex;
               flex-basis: auto;
               justify-content: center;
               flex-direction: row;
               flex-grow: 1;
               align-items: center;
               overflow: hidden;
               height: 100%;
               width: 100%;
               transition: all 0.2s ease, visibility 0s;
           }
           
           .stylablebutton643855516__label {
               -archetype: text;
               -controller-part-type: "LayoutChildDisplayDropdown, LayoutFlexChildSpacing(first)";
               overflow: hidden;
               text-overflow: ellipsis;
               white-space: nowrap;
               min-width: 1.8em;
               max-width: 100%;
               transition: inherit;
           }
           
           .stylablebutton643855516__icon {
               -archetype: icon;
               -controller-part-type: "LayoutChildDisplayDropdown, LayoutFlexChildSpacing(last)";
               min-width: 1px;
               height: 50px;
               transition: inherit;
               flex-shrink: 0;
               position: relative;
           }
           
           .stylablebutton643855516__icon > div,.stylablebutton643855516__icon svg {
               width: inherit;
               height: inherit;
               position: relative;
               top: 0;
               left: 0;
           }
           
           .stylableline2123045772__root {
               -archetype: box;
               box-sizing: border-box;
           }
           .stylableline2123045772__text {
               -archetype: text;
           }
           
           .horizontalmenucolumnslayout852678809__root {
             -archetype: paddingBox;
             box-sizing: border-box;
             transition: inherit;
             overflow: hidden;
           }
           
           .horizontalmenucolumnslayout852678809__root.horizontalmenucolumnslayout852678809--isCollapsed {
             height: 0 !important;
             box-shadow: none !important;
             border-color: transparent !important;
             border-bottom-width: 0 !important;
             border-top-width: 0 !important;
             padding-top: 0 !important;
             padding-bottom: 0 !important;
           }
           
           .horizontalmenucolumnslayout852678809__listWrapper {
             max-width: 100%;
           }
           
           .horizontalmenucolumnslayout852678809__pageWrapper {
             display: flex;
             margin: 0 auto;
             max-width: 100%;
           }
           
           /* columns menu item */
           .horizontalmenucolumnslayout852678809__menuItem {
           }
           
           /* columns submenu item */
           .horizontalmenucolumnslayout852678809__submenuItem {
           }
           
           .horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:first-of-type > span,.horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:first-of-type > a,.horizontalmenucolumnslayout852678809__root > ul > li:first-of-type > span,.horizontalmenucolumnslayout852678809__root > ul > li:first-of-type > a {
             margin-top: unset !important;
           }
           
           .horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:last-of-type > span,.horizontalmenucolumnslayout852678809__root > .horizontalmenucolumnslayout852678809__pageWrapper > .horizontalmenucolumnslayout852678809__listWrapper > li:last-of-type > a,.horizontalmenucolumnslayout852678809__root > ul > li:last-of-type > span,.horizontalmenucolumnslayout852678809__root > ul > li:last-of-type > a {
             margin-bottom: unset !important;
           }
           
           .horizontalmenu2645433724__root {
           
             box-sizing: border-box;
           
             transition: inherit;
           }
           
           .horizontalmenu2645433724__container {
             overflow: hidden;
             display: flex;
             height: 100%;
           }
           
           .horizontalmenu2645433724__menu {
             display: flex;
           
             box-sizing: border-box;
           }
           
           .horizontalmenu2645433724__scrollControls {
             position: absolute;
             top: 0;
             right: 0;
             bottom: 0;
             left: 0;
             padding-top: inherit;
             padding-bottom: inherit;
             border: inherit;
             border-color: transparent;
           
             display: flex;
             overflow: hidden;
             justify-content: space-between;
           
             pointer-events: none;
           
             border-radius: inherit;
           }
           
           .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll .horizontalmenu2645433724__menu > li > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll .horizontalmenu2645433724__menu > li > a {
             margin-top: unset;
             margin-bottom: unset;
             box-sizing: border-box;
             height: 100%;
           }
           
           .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-4-wrap .horizontalmenu2645433724__menu {
             flex-wrap: wrap;
           }
           
           .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:first-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:first-of-type > a,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:last-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:last-of-type > a {
             margin-left: unset;
           }
           
           .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:last-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-ltr .horizontalmenu2645433724__menu > li:last-of-type > a,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:first-of-type > span,.horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll.horizontalmenu2645433724---direction-3-rtl .horizontalmenu2645433724__menu > li:first-of-type > a {
             margin-right: unset;
           }
           
           .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll .horizontalmenu2645433724__menu {
             height: unset;
             width: unset;
             margin: unset;
             flex-wrap: nowrap;
             transition: padding-right .1s !important;
           }
           
           .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll {
             height: 100%;
             display: flex;
             overflow-x: scroll;
             scrollbar-width: none;
             -ms-overflow-style: none;
             -webkit-overflow-scrolling: touch;
           }
           
           .horizontalmenu2645433724__root.horizontalmenu2645433724---menuMode-6-scroll::-webkit-scrollbar {
             display: none;
           }
           
           .horizontalmenu2645433724__root.horizontalmenu2645433724--isScrollable .horizontalmenu2645433724__menu {
             padding-right: inherit;
           }
           
           .horizontalmenucolumnssubmenulayout1903511735__root {
             -archetype: paddingBox;
             box-sizing: border-box;
             transition: inherit;
             overflow: hidden;
           }
           
           .horizontalmenucolumnssubmenulayout1903511735__root.horizontalmenucolumnssubmenulayout1903511735--isCollapsed {
             height: 0 !important;
             box-shadow: none !important;
             border-color: transparent !important;
             border-bottom-width: 0 !important;
             border-top-width: 0 !important;
             padding-top: 0 !important;
             padding-bottom: 0 !important;
           }
           
           .horizontalmenucolumnssubmenulayout1903511735__listWrapper {
             width: 100%;
           }
           
           .horizontalmenucolumnssubmenulayout1903511735__pageWrapper {
             display: flex;
             margin: 0 auto;
             max-width: 100%;
           }
           
           /* columns menu item */
           .horizontalmenucolumnssubmenulayout1903511735__menuItem {
           }
           
           .horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:first-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:first-of-type > a,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:first-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:first-of-type > a {
             margin-top: unset !important;
           }
           
           .horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:last-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > .horizontalmenucolumnssubmenulayout1903511735__pageWrapper > .horizontalmenucolumnssubmenulayout1903511735__listWrapper > li:last-of-type > a,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:last-of-type > span,.horizontalmenucolumnssubmenulayout1903511735__root > ul > li:last-of-type > a {
             margin-bottom: unset !important;
           }
           
           /**
            * For focus-ring to be applied inside items BB
            */
           .visual-focus-on .focus-ring:not(.has-custom-focus):focus {
             box-shadow: inset 0 0 0 1px #ffffff, inset 0 0 0 3px #116dff;
           }
           
           .stylablehorizontalmenu4089050981__root {
             height: 100%;
             width: 100%;
             box-sizing: border-box;
           }
           
           .stylablehorizontalmenu4089050981__menu {}
           
           /* root menu item */
           .stylablehorizontalmenu4089050981__menuItem {
           }
           
           .stylablehorizontalmenu4089050981__scrollButton {
           }
           
           /* first level submenu */
           .stylablehorizontalmenu4089050981__columnsLayout {
           }
           
           .stylablehorizontalmenu4089050981__leftAlignmentScrollItem {}
           
           .stylablehorizontalmenu4089050981__rightAlignmentScrollItem {}
           
           .stylablehorizontalmenu4089050981__menuItem .horizontalmenuitem1808041630__label {
             overflow: hidden;
             text-overflow: ellipsis;
             white-space: nowrap;
             transition: inherit;
           }
           
           .stylablehorizontalmenu4089050981__menuItem .horizontalmenuitem1808041630__container {
             align-items: center;
           }
           
           .stylablehorizontalmenu4089050981__columnsLayout .horizontalmenucolumnslayout852678809__menuItem .horizontalmenusubitem329750698__label {
             overflow-wrap: break-word;
             text-overflow: clip;
             white-space: normal;
             overflow: hidden;
           }
           </style><style id="rke15_css">
           /*site css*/
           .style-kf8sqbcc__root{-st-extends: StylableButton;transition: all 0.2s ease, visibility 0s;border-radius: 0px;background: #F7EA73}.style-kf8sqbcc__root:hover{border-bottom: 3px solid rgb(110, 22, 35);padding-bottom: 3px}.style-kf8sqbcc__root[disabled]{background: #E2E2E2}.style-kf8sqbcc__root[disabled] .stylablebutton643855516__label{color: #8F8F8F}.style-kf8sqbcc__root[disabled] .stylablebutton643855516__icon{fill: #8F8F8F}.style-kf8sqbcc__root .stylablebutton643855516__container{transition: inherit}.style-kf8sqbcc__root .stylablebutton643855516__label{transition: inherit;text-transform: uppercase;font-family: futura-lt-w01-book,sans-serif;font-size: 20px;letter-spacing: 0.1em;color: #6E1623}.style-kf8sqbcc__root .stylablebutton643855516__icon{transition: inherit;width: 14px;height: 14px;fill: #6E1623;display: none}</style></div><div data-aid="stylesContainer"><style type="text/css" data-styleid="style-k6auwcww">.style-k6auwcww {display:none;}</style><style type="text/css" data-styleid="pc1">.pc1screenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
           .pc1[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
           .pc1[data-state~="fixedPosition"].pc1_footer {top:auto;bottom:0;}
           .pc1bg {position:absolute;top:0;right:0;bottom:0;left:0;}
           .pc1[data-is-absolute-layout="true"] > .pc1centeredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
           .pc1[data-is-absolute-layout="true"] > .pc1centeredContent > .pc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="siteBackground">.siteBackground {width:100%;position:absolute;}
           .siteBackgroundbgBeforeTransition {position:absolute;top:0;}
           .siteBackgroundbgAfterTransition {position:absolute;top:0;}</style><style type="text/css" data-styleid="style-k7ugjln5">.style-k7ugjln5screenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
           .style-k7ugjln5[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
           .style-k7ugjln5[data-state~="fixedPosition"].style-k7ugjln5_footer {top:auto;bottom:0;}
           .style-k7ugjln5_bg {position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.6);  background-color:rgba(18, 17, 15, 0.81);border-top:0px solid rgba(18, 17, 15, 1);border-bottom:0px solid rgba(18, 17, 15, 1);background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/bevel_300.png);background-repeat:repeat-x;}
           .style-k7ugjln5bg {position:absolute;top:0px;right:0;bottom:0px;left:0;}
           .style-k7ugjln5[data-state~="mobileView"] .style-k7ugjln5bg {left:10px;right:10px;}
           .style-k7ugjln5[data-is-absolute-layout="true"] > .style-k7ugjln5centeredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
           .style-k7ugjln5[data-is-absolute-layout="true"] > .style-k7ugjln5centeredContent > .style-k7ugjln5inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="style-k7ugjugc">.style-k7ugjugcscreenWidthBackground {position:absolute;top:0;right:0;bottom:0;left:0;}
           .style-k7ugjugc[data-state~="fixedPosition"] {position:fixed !important;left:auto !important;z-index:50;}
           .style-k7ugjugc[data-state~="fixedPosition"].style-k7ugjugc_footer {top:auto;bottom:0;}
           .style-k7ugjugc_bg {position:absolute;top:0;right:0;bottom:0;left:0;box-shadow:inset 0 1px 1px rgba(255, 255, 255, 0.6), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.6);  background-color:rgba(18, 17, 15, 1);border-top:0px solid rgba(18, 17, 15, 1);border-bottom:0px solid rgba(18, 17, 15, 1);background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/bevel_300.png);background-repeat:repeat-x;}
           .style-k7ugjugcbg {position:absolute;top:0px;right:0;bottom:0px;left:0;}
           .style-k7ugjugc[data-state~="mobileView"] .style-k7ugjugcbg {left:10px;right:10px;}
           .style-k7ugjugc[data-is-absolute-layout="true"] > .style-k7ugjugccenteredContent {position:absolute;top:0;right:0;bottom:0;left:0;}
           .style-k7ugjugc[data-is-absolute-layout="true"] > .style-k7ugjugccenteredContent > .style-k7ugjugcinlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="style-kd8jx4k6">.style-kd8jx4k6bg {border:0px solid rgba(18, 17, 15, 1);background-color:rgba(255, 255, 255, 1);border-radius:0;  position:absolute;top:0;right:0;bottom:0;left:0;}
           .style-kd8jx4k6[data-is-absolute-layout="true"] > .style-kd8jx4k6inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="txtNew">.txtNew {word-wrap:break-word;text-align:start;}
           .txtNew_override-left * {text-align:left !important;}
           .txtNew_override-right * {text-align:right !important;}
           .txtNew_override-center * {text-align:center !important;}
           .txtNew_override-justify * {text-align:justify !important;}
           .txtNew > * {pointer-events:auto;}
           .txtNew li {font-style:inherit;font-weight:inherit;line-height:inherit;letter-spacing:normal;}
           .txtNew ol,.txtNew ul {padding-left:1.3em;padding-right:0;margin-left:0.5em;margin-right:0;line-height:normal;letter-spacing:normal;}
           .txtNew ul {list-style-type:disc;}
           .txtNew ol {list-style-type:decimal;}
           .txtNew ul ul,.txtNew ol ul {list-style-type:circle;}
           .txtNew ul ul ul,.txtNew ol ul ul {list-style-type:square;}
           .txtNew ul ol ul,.txtNew ol ol ul {list-style-type:square;}
           .txtNew ul[dir="rtl"],.txtNew ol[dir="rtl"] {padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;}
           .txtNew ul[dir="rtl"] ul,.txtNew ul[dir="rtl"] ol,.txtNew ol[dir="rtl"] ul,.txtNew ol[dir="rtl"] ol {padding-left:0;padding-right:1.3em;margin-left:0;margin-right:0.5em;}
           .txtNew p {margin:0;line-height:normal;letter-spacing:normal;}
           .txtNew h1 {margin:0;line-height:normal;letter-spacing:normal;}
           .txtNew h2 {margin:0;line-height:normal;letter-spacing:normal;}
           .txtNew h3 {margin:0;line-height:normal;letter-spacing:normal;}
           .txtNew h4 {margin:0;line-height:normal;letter-spacing:normal;}
           .txtNew h5 {margin:0;line-height:normal;letter-spacing:normal;}
           .txtNew h6 {margin:0;line-height:normal;letter-spacing:normal;}
           .txtNew a {color:inherit;}</style><style type="text/css" data-styleid="style-jr9629o5">.style-jr9629o5 {box-sizing:border-box;border-top:1px solid rgba(255, 255, 255, 0.15);height:0;}</style><style type="text/css" data-styleid="style-k7to9w85">.style-k7to9w85itemsContainer {width:calc(100% - 0px);height:calc(100% - 0px);white-space:nowrap;display:inline-block;overflow:visible;position:absolute;}
           .style-k7to9w85moreContainer {overflow:visible;display:inherit;white-space:nowrap;width:auto;background-color:rgba(18, 17, 15, 1);border-radius:0;  }
           .style-k7to9w85dropWrapper {z-index:99999;display:block;opacity:1;visibility:hidden;position:absolute;margin-top:7px;}
           .style-k7to9w85 > nav {position:absolute;top:0;right:0;bottom:0;left:0;}
           .style-k7to9w85dropWrapper[data-dropMode="dropUp"] {margin-top:0;margin-bottom:7px;}
           .style-k7to9w85navContainer_with-validation-indication select:not([data-preview~="focus"]):invalid {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
           .style-k7to9w85navContainer {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
           .style-k7to9w85navContainer select {border-radius:0;  -webkit-appearance:none;-moz-appearance:none;  font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif;  background-color:rgba(18, 17, 15, 1);color:#FFFFFF;border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-width:1px;border-left-width:0px;border-right-width:0px;margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;}
           .style-k7to9w85navContainer select option {text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;}
           .style-k7to9w85navContainer select.style-k7to9w85navContainer_placeholder-style {color:#12110F;}
           .style-k7to9w85navContainer select.style-k7to9w85navContainer_extended-placeholder-style {color:#888888;}
           .style-k7to9w85navContainer select:-moz-focusring {color:transparent;text-shadow:0 0 0 #000;}
           .style-k7to9w85navContainer select::-ms-expand {display:none;}
           .style-k7to9w85navContainer select:focus::-ms-value {background:transparent;}
           .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):hover,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="hover"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(18, 17, 15, 1);}
           .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):focus,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="focus"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
           .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-error="true"],.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="error"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
           .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):disabled,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-disabled="true"],.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="disabled"] {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;background-color:rgba(204, 204, 204, 1);}
           .style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection):disabled + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-disabled="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer select:not(.style-k7to9w85navContainer_mobileCollection)[data-preview~="disabled"] + .style-k7to9w85navContainerarrow {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;border:none;}
           .style-k7to9w85navContainerarrow {position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-style:solid;border-color:rgba(0, 0, 0, 0.2);border-left-width:1px;}
           .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container {width:12px;}
           .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container svg {height:100%;fill:rgba(184, 181, 174, 1);}
           .style-k7to9w85navContainer_left-direction {text-align-last:left;}
           .style-k7to9w85navContainer_left-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_left-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-right:0;}
           .style-k7to9w85navContainer_left-direction .style-k7to9w85navContainerarrow {right:0;border-left-width:1px;}
           .style-k7to9w85navContainer_right-direction {text-align-last:right;direction:rtl;}
           .style-k7to9w85navContainer_right-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_right-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-left:0;}
           .style-k7to9w85navContainer_right-direction .style-k7to9w85navContainerarrow {left:0;border-right-width:1px;}
           .style-k7to9w85navContainer_center-direction {text-align-last:left;text-align-last:center;}
           .style-k7to9w85navContainer_center-direction .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select:hover + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="hover"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select:focus + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="focus"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction[data-preview~="focus"] .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-error="true"] + .style-k7to9w85navContainerarrow,.style-k7to9w85navContainer_center-direction select[data-preview~="error"] + .style-k7to9w85navContainerarrow {border-right:0;}
           .style-k7to9w85navContainer_center-direction .style-k7to9w85navContainerarrow {right:0;border-left-width:1px;}
           .style-k7to9w85navContainer_mobileMenuContainer {border:0;}
           .style-k7to9w85navContainer_mobileMenuContainer .style-k7to9w85navContainerarrow .style-k7to9w85navContainer_svg_container .style-k7to9w85navContainericon {fill:#FFFFFF;}
           .style-k7to9w85navContainerlabel {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  color:#12110F;word-break:break-word;display:inline-block;line-height:1;}
           .style-k7to9w85navContainer_required .style-k7to9w85navContainerlabel::after {content:" *";color:transparent;}
           .style-k7to9w85navContainer_selector-wrapper {-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;}
           .style-k7to9w85repeaterButton {height:100%;position:relative;box-sizing:border-box;display:inline-block;cursor:pointer;font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif;}
           .style-k7to9w85repeaterButton[data-state~="header"] a,.style-k7to9w85repeaterButton[data-state~="header"] div {cursor:default !important;}
           .style-k7to9w85repeaterButtonlinkElement {display:inline-block;height:100%;width:100%;}
           .style-k7to9w85repeaterButton_gapper {padding:0 5px;}
           .style-k7to9w85repeaterButtonlabel {display:inline-block;padding:0 10px;color:#FFFFFF;transition:color 0.4s ease 0s;}
           .style-k7to9w85repeaterButton[data-state~="drop"] {width:100%;display:block;}
           .style-k7to9w85repeaterButton[data-state~="drop"] .style-k7to9w85repeaterButtonlabel {padding:0 .5em;}
           .style-k7to9w85repeaterButton[data-state~="over"] .style-k7to9w85repeaterButtonlabel,.style-k7to9w85repeaterButton[data-preview~="hover"] .style-k7to9w85repeaterButtonlabel {color:#FFD504;transition:color 0.4s ease 0s;}
           .style-k7to9w85repeaterButton[data-state~="selected"] .style-k7to9w85repeaterButtonlabel,.style-k7to9w85repeaterButton[data-preview~="active"] .style-k7to9w85repeaterButtonlabel {color:#FFD504;transition:color 0.4s ease 0s;}</style><style type="text/css" data-styleid="style-k7ns13ap">.style-k7ns13ap_zoomedin {cursor:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_out.png), url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_out.cur), auto;overflow:hidden;display:block;}
           .style-k7ns13ap_zoomedout {cursor:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_in.png), url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/cursor_zoom_in.cur), auto;}
           .style-k7ns13aplink {display:block;overflow:hidden;}
           .style-k7ns13apimg {overflow:hidden;}
           .style-k7ns13ap[data-is-responsive=true] .style-k7ns13aplink,.style-k7ns13ap[data-is-responsive=true] .style-k7ns13apimg,.style-k7ns13ap[data-is-responsive=true] wix-image {position:absolute;top:0;right:0;bottom:0;left:0;}
           .style-k7ns13apimgimage {position:static;box-shadow:#000 0 0 0;user-select:none;}</style><style type="text/css" data-styleid="lb1">.lb1[data-is-responsive~="false"] .lb1itemsContainer {position:absolute;width:100%;height:100%;white-space:nowrap;}
           .lb1[data-is-responsive~="false"][data-state~="mobileView"] .lb1itemsContainer {position:absolute;width:100%;height:100%;white-space:normal;}
           .lb1[data-is-responsive~="true"] {display:table;}
           .lb1[data-is-responsive~="true"] .lb1itemsContainer {display:-webkit-box;display:-webkit-flex;display:flex;}
           .lb1itemsContainer > li:last-child {margin:0 !important;}
           .lb1 a {display:block;height:100%;}
           .lb1imageItemlink {cursor:pointer;}
           .lb1imageItemimageimage {position:static;box-shadow:#000 0 0 0;user-select:none;}</style><style type="text/css" data-styleid="strc1">.strc1:not([data-mobile-responsive]) > .strc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
           .strc1[data-mobile-responsive] > .strc1inlineContent {position:relative;}
           .strc1[data-responsive] {display:-ms-grid;display:grid;justify-content:center;grid-template-columns:100%;grid-template-rows:1fr;-ms-grid-columns:100%;-ms-grid-rows:1fr;}
           .strc1[data-responsive] > .strc1inlineContent {display:flex;}
           .strc1[data-responsive] > * {position:relative;grid-row-start:1;grid-column-start:1;grid-row-end:2;grid-column-end:2;-ms-grid-row-span:1;-ms-grid-column-span:1;margin:0 auto;}</style><style type="text/css" data-styleid="mc1">.mc1:not([data-mobile-responsive]) .mc1inlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}
           .mc1:not([data-mobile-responsive]) .mc1container {position:relative;height:100%;top:0;}</style><style type="text/css" data-styleid="style-k6auwexi1">.style-k6auwexi1 > ul {display:table;width:100%;box-sizing:border-box;}
           .style-k6auwexi1 li {display:table;width:100%;}
           .style-k6auwexi1 a span {pointer-events:none;}
           .style-k6auwexi1_noLink {cursor:default !important;}
           .style-k6auwexi1_counter {margin:0 10px;opacity:0.6;}
           .style-k6auwexi1menuContainer {padding:0;margin:0;border:solid 1px rgba(18, 17, 15, 0.2);position:relative;  border-radius:0;}
           .style-k6auwexi1menuContainer .style-k6auwexi1_emptySubMenu {display:none !important;}
           .style-k6auwexi1_itemHoverArea {box-sizing:content-box;border-bottom:solid 0px rgba(18, 17, 15, 1);}
           .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item {border-radius:0;    border-bottom-left-radius:0;border-bottom-right-radius:0;}
           .style-k6auwexi1_itemHoverArea:last-child {border-bottom:0 solid transparent;}
           .style-k6auwexi1_itemHoverArea:last-child > .style-k6auwexi1_item {border-radius:0;      border-top-left-radius:0;border-top-right-radius:0;border-bottom:0 solid transparent;}
           .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item {transition:background-color 0.4s ease 0s;}
           .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover .style-k6auwexi1_subMenu {opacity:1;display:block;}
           .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover:not(.style-k6auwexi1_noLink) > .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
           .style-k6auwexi1_itemHoverArea.style-k6auwexi1_hover:not(.style-k6auwexi1_noLink) > .style-k6auwexi1_item > .style-k6auwexi1_label {color:#363430;}
           .style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
           .style-k6auwexi1_itemHoverArea.style-k6auwexi1_selected > .style-k6auwexi1_item > .style-k6auwexi1_label,.style-k6auwexi1_itemHoverArea.style-k6auwexi1_selectedContainer > .style-k6auwexi1_item > .style-k6auwexi1_label {color:#FFB703;}
           .style-k6auwexi1_item {height:100%;padding-left:30px;padding-right:30px;transition:background-color 0.4s ease 0s;  margin:0;position:relative;cursor:pointer;list-style:none;background-color:rgba(255, 255, 255, 1);}
           .style-k6auwexi1_label {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  color:#12110F;display:inline;white-space:nowrap;overflow:hidden;}
           .style-k6auwexi1_subMenu {z-index:999;min-width:100%;display:none;opacity:0;transition:all 0.4s ease 0s;  position:absolute;border:solid 1px rgba(18, 17, 15, 0.2);border-radius:0;  }
           .style-k6auwexi1_subMenu .style-k6auwexi1_item {background-color:rgba(255, 255, 255, 1);}
           .style-k6auwexi1_subMenu .style-k6auwexi1_label {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;}
           .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item,.style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child:last-child > .style-k6auwexi1_item {border-radius:0;}
           .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:first-child > .style-k6auwexi1_item {border-bottom-left-radius:0;border-bottom-right-radius:0;}
           .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:last-child {border-bottom:0 solid transparent;}
           .style-k6auwexi1_subMenu > .style-k6auwexi1_itemHoverArea:last-child > .style-k6auwexi1_item {border-radius:0;      border-top-left-radius:0;border-top-right-radius:0;border-bottom:0 solid transparent;}
           .style-k6auwexi1_subMenu:before {background-color:#fff;opacity:0;z-index:999;content:" ";display:block;width:calc(0px + 1px);height:100%;position:absolute;top:0;}
           .style-k6auwexi1[data-state~="items-align-left"] .style-k6auwexi1_item {text-align:left;}
           .style-k6auwexi1[data-state~="items-align-center"] .style-k6auwexi1_item {text-align:center;}
           .style-k6auwexi1[data-state~="items-align-right"] .style-k6auwexi1_item {text-align:right;}
           .style-k6auwexi1[data-state~="subItems-align-left"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:left;padding-left:30px;padding-right:30px;}
           .style-k6auwexi1[data-state~="subItems-align-center"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:center;padding-left:30px;padding-right:30px;}
           .style-k6auwexi1[data-state~="subItems-align-right"] .style-k6auwexi1_subMenu > .style-k6auwexi1_item {text-align:right;padding-left:30px;padding-right:30px;}
           .style-k6auwexi1[data-state~="subMenuOpenSide-right"] .style-k6auwexi1_subMenu {left:100%;float:left;margin-left:0px;}
           .style-k6auwexi1[data-state~="subMenuOpenSide-right"] .style-k6auwexi1_subMenu:before {right:100%;}
           .style-k6auwexi1[data-state~="subMenuOpenSide-left"] .style-k6auwexi1_subMenu {right:100%;float:right;margin-right:0px;}
           .style-k6auwexi1[data-state~="subMenuOpenSide-left"] .style-k6auwexi1_subMenu:before {left:100%;}
           .style-k6auwexi1[data-open-direction~="subMenuOpenDir-down"] .style-k6auwexi1_subMenu {top:calc(-1 * 1px);}
           .style-k6auwexi1[data-open-direction~="subMenuOpenDir-up"] .style-k6auwexi1_subMenu {bottom:calc(-1 * 1px);}
           .style-k6auwexi1menuContainer_with-validation-indication select:not([data-preview~="focus"]):invalid {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
           .style-k6auwexi1menuContainer {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
           .style-k6auwexi1menuContainer select {border-radius:0;  -webkit-appearance:none;-moz-appearance:none;  font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  background-color:rgba(255, 255, 255, 1);color:#12110F;border-width:1px;  border-style:solid;border-color:rgba(18, 17, 15, 0.2);margin:0;padding:0 45px;cursor:pointer;position:relative;max-width:100%;min-width:100%;min-height:10px;height:100%;text-overflow:ellipsis;white-space:nowrap;display:block;}
           .style-k6auwexi1menuContainer select option {text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:#44474D;background-color:#FFFFFF;}
           .style-k6auwexi1menuContainer select.style-k6auwexi1menuContainer_placeholder-style {color:#12110F;}
           .style-k6auwexi1menuContainer select.style-k6auwexi1menuContainer_extended-placeholder-style {color:#888888;}
           .style-k6auwexi1menuContainer select:-moz-focusring {color:transparent;text-shadow:0 0 0 #000;}
           .style-k6auwexi1menuContainer select::-ms-expand {display:none;}
           .style-k6auwexi1menuContainer select:focus::-ms-value {background:transparent;}
           .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):hover,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="hover"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
           .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):focus,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="focus"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
           .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-error="true"],.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="error"] {border-width:2px;  border-style:solid;border-color:rgba(249, 249, 249, 1);background-color:rgba(255, 255, 255, 1);}
           .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):disabled,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-disabled="true"],.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="disabled"] {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;background-color:rgba(204, 204, 204, 1);}
           .style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection):disabled + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-disabled="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer select:not(.style-k6auwexi1menuContainer_mobileCollection)[data-preview~="disabled"] + .style-k6auwexi1menuContainerarrow {border-width:2px;border-color:rgba(204, 204, 204, 1);color:#FFFFFF;border:none;}
           .style-k6auwexi1menuContainerarrow {position:absolute;pointer-events:none;top:0;bottom:0;box-sizing:border-box;padding-left:20px;padding-right:20px;height:inherit;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;}
           .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container {width:12px;}
           .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container svg {height:100%;fill:rgba(184, 181, 174, 1);}
           .style-k6auwexi1menuContainer_left-direction {text-align-last:left;}
           .style-k6auwexi1menuContainer_left-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_left-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-left:0;}
           .style-k6auwexi1menuContainer_left-direction .style-k6auwexi1menuContainerarrow {right:0;}
           .style-k6auwexi1menuContainer_right-direction {text-align-last:right;direction:rtl;}
           .style-k6auwexi1menuContainer_right-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_right-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-right:0;}
           .style-k6auwexi1menuContainer_right-direction .style-k6auwexi1menuContainerarrow {left:0;}
           .style-k6auwexi1menuContainer_center-direction {text-align-last:left;text-align-last:center;}
           .style-k6auwexi1menuContainer_center-direction .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select:hover + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="hover"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select:focus + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="focus"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction[data-preview~="focus"] .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-error="true"] + .style-k6auwexi1menuContainerarrow,.style-k6auwexi1menuContainer_center-direction select[data-preview~="error"] + .style-k6auwexi1menuContainerarrow {border-left:0;}
           .style-k6auwexi1menuContainer_center-direction .style-k6auwexi1menuContainerarrow {right:0;}
           .style-k6auwexi1menuContainer_mobileMenuContainer {border:0;}
           .style-k6auwexi1menuContainer_mobileMenuContainer .style-k6auwexi1menuContainerarrow .style-k6auwexi1menuContainer_svg_container .style-k6auwexi1menuContainericon {fill:#12110F;}
           .style-k6auwexi1menuContainerlabel {font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  color:#12110F;word-break:break-word;display:inline-block;line-height:1;}
           .style-k6auwexi1menuContainer_required .style-k6auwexi1menuContainerlabel::after {content:" *";color:transparent;}
           .style-k6auwexi1menuContainer_selector-wrapper {-webkit-box-flex:1;-webkit-flex:1;flex:1;position:relative;}</style><style type="text/css" data-styleid="tpaw0">.tpaw0 {overflow:hidden;}
           .tpaw0 iframe {position:absolute;width:100%;height:100%;overflow:hidden;}
           .tpaw0 iframe:-webkit-full-screen {min-height:auto !important;}
           .tpaw0preloaderOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
           .tpaw0preloaderOverlaycontent {width:100%;height:100%;}
           .tpaw0unavailableMessageOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
           .tpaw0unavailableMessageOverlaycontent {width:100%;height:100%;background:rgba(255, 255, 255, 0.9);font-size:0;margin-top:5px;}
           .tpaw0unavailableMessageOverlaytextContainer {color:#373737;font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;font-size:14px;display:inline-block;vertical-align:middle;width:100%;margin-top:10px;text-align:center;}
           .tpaw0unavailableMessageOverlayreloadButton {display:inline-block;}
           .tpaw0unavailableMessageOverlay a {color:#0099FF;text-decoration:underline;cursor:pointer;}
           .tpaw0unavailableMessageOverlayiconContainer {display:none;}
           .tpaw0unavailableMessageOverlaydismissButton {display:none;}
           .tpaw0unavailableMessageOverlaytextTitle {font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;display:none;}
           .tpaw0unavailableMessageOverlay[data-state~="hideIframe"] .tpaw0unavailableMessageOverlay_buttons {opacity:1;}
           .tpaw0unavailableMessageOverlay[data-state~="hideOverlay"] {display:none;}</style><style type="text/css" data-styleid="style-k6hsf3sb">.style-k6hsf3sb[data-state~="touchRollOver"] .style-k6hsf3sb_opc {opacity:1;}
           .style-k6hsf3sbemptyDivToFillMatrix {width:1px;height:1px;opacity:0;}
           .style-k6hsf3sb_opc {transition:opacity 0.3s ease 0s;  opacity:0;color:#FFFFFF;}
           .style-k6hsf3sb:hover[data-state~="notMobile"] .style-k6hsf3sb_opc {opacity:1;}
           .style-k6hsf3sbitemsContainer {overflow:hidden;height:100% !important;}
           .style-k6hsf3sbrolloverHolder {box-sizing:border-box !important;font:normal normal normal 20px/1.4em din-next-w01-light,din-next-w02-light,din-next-w10-light,sans-serif ;  background-color:rgba(117, 115, 109, 0.5);transition:opacity 0s;  color:#FFFFFF;opacity:0;padding:10px !important;overflow:hidden;cursor:pointer;}
           .style-k6hsf3sbrolloverHolder > div {width:100% !important;}
           .style-k6hsf3sb[data-state~="rollover"] .style-k6hsf3sbrolloverHolder {transition:opacity 0.3s ease 0s;  opacity:1;}
           .style-k6hsf3sbtitle {overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font:normal normal normal 28px/1.4em dinneuzeitgroteskltw01-_812426,sans-serif ;}
           .style-k6hsf3sbdescription {white-space:pre-line;overflow:hidden;max-height:60%;}
           .style-k6hsf3sblink {overflow:hidden;white-space:nowrap;text-decoration:underline;color:#2F2E2E;position:absolute;bottom:10px;left:10px;right:10px;}
           .style-k6hsf3sb_buttons {transition:opacity 0.3s ease 0s;  opacity:0;position:absolute;left:0;right:0;top:50%;margin-top:-15px;}
           .style-k6hsf3sb[data-state~="mobile"] .style-k6hsf3sb_buttons {opacity:1;}
           .style-k6hsf3sb_buttons a {transition:opacity 0.3s ease 0s;  opacity:0.6;width:45px;height:65px;background-image:url(https://static.parastorage.com/services/skins/2.1229.80/images/wysiwyg/core/themes/base/arrows_white_new3.png);background-repeat:no-repeat;cursor:pointer;position:absolute;}
           .style-k6hsf3sb[data-state~="mobile"] .style-k6hsf3sb_buttons a {opacity:1;}
           .style-k6hsf3sbbuttonPrev {left:20px;background-position:0 0;left:20px;background-position:0 0;}
           .style-k6hsf3sbbuttonNext {right:20px;background-position:100% 0;right:20px;background-position:100% 0;}
           .style-k6hsf3sb:hover > .style-k6hsf3sb_buttons {opacity:1;}
           .style-k6hsf3sb_buttons a:hover {opacity:1;}
           .style-k6hsf3sb_hlp {position:absolute;color:#FFFFFF;}
           .style-k6hsf3sb_hlp span {display:block;}
           .style-k6hsf3sbautoplay {right:35px;bottom:10px;}
           .style-k6hsf3sbcounter {right:10px;bottom:8px;font-size:13px;}
           .style-k6hsf3sb[data-state~="noLink"] .style-k6hsf3sblink {display:none;}
           .style-k6hsf3sb[data-state~="autoplayOff"] .style-k6hsf3sbautoplay > span {border:6px solid transparent;border-left:6px solid #FFFFFF;}
           .style-k6hsf3sb[data-state~="autoplayOn"] .style-k6hsf3sbautoplay > span {border-left:3px solid #FFFFFF;border-right:3px solid #FFFFFF;margin-right:5px;height:12px;width:1px;}
           .style-k6hsf3sbimgimage {position:static;box-shadow:#000 0 0 0;user-select:none;}</style><style type="text/css" data-styleid="style-k6hsf3t3">.style-k6hsf3t3 button.style-k6hsf3t3link {width:100%;}
           .style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3labelwrapper {text-align:initial;display:flex;align-items:center;}
           .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="center"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="center"] .style-k6hsf3t3labelwrapper {justify-content:center;}
           .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="left"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="left"] .style-k6hsf3t3labelwrapper {justify-content:flex-start;}
           .style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="right"] .style-k6hsf3t3link,.style-k6hsf3t3[data-state~="shouldUseFlex"][data-state~="right"] .style-k6hsf3t3labelwrapper {justify-content:flex-end;}
           .style-k6hsf3t3link {border-radius:0;  position:absolute;top:0;right:0;bottom:0;left:0;transition:border-color 0.4s ease 0s, background-color 0.4s ease 0s;  }
           .style-k6hsf3t3label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;  transition:color 0.4s ease 0s;  color:#FFFFFF;display:inline-block;margin:calc(-1 * 0px) 0px 0;position:relative;white-space:nowrap;}
           .style-k6hsf3t3[data-state~="shouldUseFlex"] .style-k6hsf3t3label {margin:0;}
           .style-k6hsf3t3[data-disabled="false"] .style-k6hsf3t3link {background-color:rgba(255, 183, 3, 1);border:solid rgba(126, 127, 130, 1) 0px;cursor:pointer !important;}
           .style-k6hsf3t3[data-disabled="false"]:active[data-state~="mobile"] .style-k6hsf3t3link,.style-k6hsf3t3[data-disabled="false"]:hover[data-state~="desktop"] .style-k6hsf3t3link,.style-k6hsf3t3[data-disabled="false"][data-preview~="hover"] .style-k6hsf3t3link {background-color:rgba(255, 255, 255, 1);border-color:rgba(18, 17, 15, 1);}
           .style-k6hsf3t3[data-disabled="false"]:active[data-state~="mobile"] .style-k6hsf3t3label,.style-k6hsf3t3[data-disabled="false"]:hover[data-state~="desktop"] .style-k6hsf3t3label,.style-k6hsf3t3[data-disabled="false"][data-preview~="hover"] .style-k6hsf3t3label {color:#12110F;}
           .style-k6hsf3t3[data-disabled="true"] .style-k6hsf3t3link,.style-k6hsf3t3[data-preview~="disabled"] .style-k6hsf3t3link {background-color:rgba(204, 204, 204, 1);border:solid rgba(18, 17, 15, 1) 0px;}
           .style-k6hsf3t3[data-disabled="true"] .style-k6hsf3t3label,.style-k6hsf3t3[data-preview~="disabled"] .style-k6hsf3t3label {color:#FFFFFF;}</style><style type="text/css" data-styleid="controller1">.controller1 {display:none;}</style><style type="text/css" data-styleid="style-kf8s5xvn">.style-kf8s5xvn {display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;}
           .style-kf8s5xvntextarea {  border-radius:0;  font:normal normal normal 14px/1.4em avenir-lt-w01_35-light1475496,sans-serif;  border-width:2px;  -webkit-appearance:none;resize:none;background-color:rgba(255, 255, 255, 1);box-sizing:border-box !important;color:#000000;border-style:solid;border-color:rgba(145, 145, 145, 1);padding:3px;margin:0;padding-top:0.75em;max-width:100%;min-width:100%;overflow-y:auto;-webkit-box-flex:1;-webkit-flex:1;flex:1;}
           .style-kf8s5xvntextarea::-webkit-input-placeholder {color:#7F808A;}
           .style-kf8s5xvntextarea::placeholder {color:#7F808A;}
           .style-kf8s5xvntextarea:hover,.style-kf8s5xvntextarea[data-preview~="hover"] {border-width:2px;    background-color:rgba(242, 250, 249, 1);border-style:solid;border-color:rgba(92, 92, 92, 1);}
           .style-kf8s5xvn_left-direction .style-kf8s5xvntextarea {text-align:left;}
           .style-kf8s5xvn_right-direction .style-kf8s5xvntextarea {text-align:right;direction:rtl;}
           .style-kf8s5xvn_center-direction .style-kf8s5xvntextarea {text-align:center;}
           .style-kf8s5xvn[data-disabled="true"] .style-kf8s5xvntextarea,.style-kf8s5xvn[data-preview~="disabled"] .style-kf8s5xvntextarea {background-color:rgba(255, 255, 255, 1);color:#DBDBDB;border-width:1px;  border-style:solid;border-color:rgba(219, 219, 219, 1);}
           :not(.style-kf8s5xvn_with-validation-indication) .style-kf8s5xvntextarea:focus,:not(.style-kf8s5xvn_with-validation-indication) .style-kf8s5xvntextarea[data-preview~="focus"] {border-width:2px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(0, 0, 0, 1);}
           .style-kf8s5xvn_with-validation-indication .style-kf8s5xvntextarea:invalid {border-width:1px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(255, 64, 64, 1);}
           .style-kf8s5xvn_with-validation-indication .style-kf8s5xvntextarea:not(:invalid):focus,.style-kf8s5xvn_with-validation-indication .style-kf8s5xvntextarea[data-preview~="focus"] {border-width:2px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(0, 0, 0, 1);}
           .style-kf8s5xvn[data-error="true"] .style-kf8s5xvntextarea,.style-kf8s5xvn[data-preview~="error"] .style-kf8s5xvntextarea {border-width:1px;  background-color:rgba(255, 255, 255, 1);border-style:solid;border-color:rgba(255, 64, 64, 1);}
           .style-kf8s5xvnlabel {font:normal normal 700 14px/1.4em avenir-lt-w01_35-light1475496,sans-serif;  color:#61615F;word-break:break-word;display:inline-block;line-height:1;}
           .style-kf8s5xvn_required .style-kf8s5xvnlabel::after {content:" *";color:transparent;}</style><style type="text/css" data-styleid="b1">.b1 button.b1link {width:100%;}
           .b1[data-state~="shouldUseFlex"] .b1link,.b1[data-state~="shouldUseFlex"] .b1labelwrapper {text-align:initial;display:flex;align-items:center;}
           .b1[data-state~="shouldUseFlex"][data-state~="center"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="center"] .b1labelwrapper {justify-content:center;}
           .b1[data-state~="shouldUseFlex"][data-state~="left"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="left"] .b1labelwrapper {justify-content:flex-start;}
           .b1[data-state~="shouldUseFlex"][data-state~="right"] .b1link,.b1[data-state~="shouldUseFlex"][data-state~="right"] .b1labelwrapper {justify-content:flex-end;}
           .b1link {border-radius:0;  position:absolute;top:0;right:0;bottom:0;left:0;transition:border-color 0.4s ease 0s, background-color 0.4s ease 0s;  }
           .b1label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;  transition:color 0.4s ease 0s;  color:#FFFFFF;display:inline-block;margin:calc(-1 * 0px) 0px 0;position:relative;white-space:nowrap;}
           .b1[data-state~="shouldUseFlex"] .b1label {margin:0;}
           .b1[data-disabled="false"] .b1link {background-color:rgba(18, 17, 15, 1);border:solid rgba(126, 127, 130, 1) 0px;cursor:pointer !important;}
           .b1[data-disabled="false"]:active[data-state~="mobile"] .b1link,.b1[data-disabled="false"]:hover[data-state~="desktop"] .b1link,.b1[data-disabled="false"][data-preview~="hover"] .b1link {background-color:rgba(255, 183, 3, 1);border-color:rgba(18, 17, 15, 1);}
           .b1[data-disabled="false"]:active[data-state~="mobile"] .b1label,.b1[data-disabled="false"]:hover[data-state~="desktop"] .b1label,.b1[data-disabled="false"][data-preview~="hover"] .b1label {color:#7E7F82;}
           .b1[data-disabled="true"] .b1link,.b1[data-preview~="disabled"] .b1link {background-color:rgba(204, 204, 204, 1);border:solid rgba(18, 17, 15, 1) 0px;}
           .b1[data-disabled="true"] .b1label,.b1[data-preview~="disabled"] .b1label {color:#FFFFFF;}</style><style type="text/css" data-styleid="b4">.b4 button.b4link {width:100%;}
           .b4[data-state~="shouldUseFlex"] .b4link,.b4[data-state~="shouldUseFlex"] .b4labelwrapper {text-align:initial;display:flex;align-items:center;}
           .b4[data-state~="shouldUseFlex"][data-state~="center"] .b4link,.b4[data-state~="shouldUseFlex"][data-state~="center"] .b4labelwrapper {justify-content:center;}
           .b4[data-state~="shouldUseFlex"][data-state~="left"] .b4link,.b4[data-state~="shouldUseFlex"][data-state~="left"] .b4labelwrapper {justify-content:flex-start;}
           .b4[data-state~="shouldUseFlex"][data-state~="right"] .b4link,.b4[data-state~="shouldUseFlex"][data-state~="right"] .b4labelwrapper {justify-content:flex-end;}
           .b4[data-disabled="false"] {cursor:pointer;}
           .b4[data-disabled="false"]:active[data-state~="mobile"] .b4label,.b4[data-disabled="false"]:hover[data-state~="desktop"] .b4label,.b4[data-disabled="false"][data-preview~="hover"] .b4label {color:#FFB703;transition:color 0.4s ease 0s;}
           .b4link {position:absolute;top:0;right:0;bottom:0;left:0;}
           .b4label {font:normal normal normal 16px/1.4em roboto-bold,roboto,sans-serif ;  transition:color 0.4s ease 0s;  color:#12110F;white-space:nowrap;display:inline-block;}
           .b4[data-disabled="true"] .b4label,.b4[data-preview~="disabled"] .b4label {color:#FFFFFF;}</style><style type="text/css" data-styleid="style-kf8sbpeg">.style-kf8sbpegbg {position:absolute;top:0;right:0;bottom:0;left:0;}
           .style-kf8sbpeg[data-state~="mobileView"] .style-kf8sbpegbg {left:10px;right:10px;}
           .style-kf8sbpeginlineContent {position:absolute;top:0;right:0;bottom:0;left:0;}</style><style type="text/css" data-styleid="s_DtaksTPAWidgetSkin">.s_DtaksTPAWidgetSkin {overflow:hidden;}
           .s_DtaksTPAWidgetSkin iframe {position:absolute;width:100%;height:100%;overflow:hidden;}
           .s_DtaksTPAWidgetSkin iframe:-webkit-full-screen {min-height:auto !important;}
           .s_DtaksTPAWidgetSkinpreloaderOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
           .s_DtaksTPAWidgetSkinpreloaderOverlaycontent {width:100%;height:100%;}
           .s_DtaksTPAWidgetSkinunavailableMessageOverlay {position:absolute;top:0;left:0;color:#373737;width:100%;height:100%;}
           .s_DtaksTPAWidgetSkinunavailableMessageOverlaycontent {width:100%;height:100%;background:rgba(255, 255, 255, 0.9);font-size:0;margin-top:5px;}
           .s_DtaksTPAWidgetSkinunavailableMessageOverlaytextContainer {color:#373737;font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;font-size:14px;display:inline-block;vertical-align:middle;width:100%;margin-top:10px;text-align:center;}
           .s_DtaksTPAWidgetSkinunavailableMessageOverlayreloadButton {display:inline-block;}
           .s_DtaksTPAWidgetSkinunavailableMessageOverlay a {color:#0099FF;text-decoration:underline;cursor:pointer;}
           .s_DtaksTPAWidgetSkinunavailableMessageOverlayiconContainer {display:none;}
           .s_DtaksTPAWidgetSkinunavailableMessageOverlaydismissButton {display:none;}
           .s_DtaksTPAWidgetSkinunavailableMessageOverlaytextTitle {font-family:"Helvetica Neue", "HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", Helvetica, Arial, sans-serif;display:none;}
           .s_DtaksTPAWidgetSkinunavailableMessageOverlay[data-state~="hideIframe"] .s_DtaksTPAWidgetSkinunavailableMessageOverlay_buttons {opacity:1;}
           .s_DtaksTPAWidgetSkinunavailableMessageOverlay[data-state~="hideOverlay"] {display:none;}</style><style type="text/css" data-styleid="comp-kf8sqbal-rotated">#comp-kf8sqbal {transform: rotate(270deg)}</style></div><div class="noop visual-focus-on" style="position:relative"><div id="SCROLL_TO_TOP" tabindex="-1" aria-label="top of page" role="region" style="height:0"></div><div id="FONTS_CONTAINER"></div><div id="SITE_BACKGROUND" style="height:100%;top:0;min-height:calc(100vh - 0px);bottom:;left:;right:;position:" class="siteBackground"><div id="SITE_BACKGROUND_previous_noPrev" data-position="absolute" data-align="" data-fitting="" class="siteBackgroundprevious"><div id="SITE_BACKGROUNDpreviousImage" class="siteBackgroundpreviousImage"></div><div id="SITE_BACKGROUNDpreviousVideo" class="siteBackgroundpreviousVideo"></div><div id="SITE_BACKGROUND_previousOverlay_noPrev" class="siteBackgroundpreviousOverlay"></div></div><div id="SITE_BACKGROUND_current_rke15_desktop_bg" style="top:0;height:100%;width:100%;background-color:rgba(255, 183, 3, 1);display:;position:absolute" data-position="absolute" data-align="top_left" data-fitting="legacy_tile" class="siteBackgroundcurrent"><div id="SITE_BACKGROUND_currentImage_rke15_desktop_bg" style="position:absolute;top:0;height:100%;width:100%" data-type="bgimage" data-height="100%" class="siteBackgroundcurrentImage"></div><div id="SITE_BACKGROUNDcurrentVideo" class="siteBackgroundcurrentVideo"></div><div id="SITE_BACKGROUND_currentOverlay_rke15_desktop_bg" style="position:absolute;top:0;width:100%;height:100%" class="siteBackgroundcurrentOverlay"></div></div></div><div id="SITE_ROOT" class="SITE_ROOT" style="width:100%;min-width:980px;padding-bottom:0;top:0" aria-hidden="false"><div id="masterPage" class="mesh-layout" data-mesh-layout="grid"><header data-is-absolute-layout="false" data-is-mobile="false" data-state="transition-allowed" data-site-width="980" data-header-top="0" style="position:relative;margin-top:0;left:0;margin-left:0;width:100%;min-width:980px;top:;bottom:;right:;display:none" class="style-k7ugjugc" id="SITE_HEADER"><div style="left:0;width:100%" id="SITE_HEADERscreenWidthBackground" class="style-k7ugjugcscreenWidthBackground"><div class="style-k7ugjugc_bg"></div></div><div id="SITE_HEADERcenteredContent" class="style-k7ugjugccenteredContent"><div style="margin-left:calc((100% - 980px) / 2);width:980px" id="SITE_HEADERbg" class="style-k7ugjugcbg"></div><div id="SITE_HEADERinlineContent" class="style-k7ugjugcinlineContent"><style id="SITE_HEADER-mesh-styles">
               
           #SITE_HEADERinlineContent {
               height: auto;
               width: 100%;
               position: relative;
           }
           
           #SITE_HEADERinlineContent-gridWrapper {
               pointer-events: none;
           }
           
           #SITE_HEADERinlineContent-gridContainer {
               position: static;
               display: grid;
               height: auto;
               width: 100%;
               min-height: auto;
               grid-template-rows: min-content min-content min-content min-content min-content 1fr;
               grid-template-columns: 100%;
           }
           
           #comp-j1rq4q3c1 {
               position: relative;
               margin: 13px 0 7px 0;
               left: 0;
               grid-area: 2 / 1 / 3 / 2;
               justify-self: stretch;
               align-self: start;
           }
           
           #comp-k557vagj {
               position: relative;
               margin: 0px 0px -14px calc((100% - 980px) * 0.5);
               left: 0px;
               grid-area: 1 / 1 / 2 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-j1rq742h {
               position: relative;
               margin: 0px 0px 23px calc((100% - 980px) * 0.5);
               left: 360px;
               grid-area: 2 / 1 / 6 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-k7nv6chl {
               position: absolute;
               top: 124px;
               left: 740px;
           }
           
           #comp-j1rq4q3b {
               position: relative;
               margin: 0px 0px 30px calc((100% - 980px) * 0.5);
               left: 1190px;
               grid-area: 3 / 1 / 4 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-j1rq4q3b1 {
               position: relative;
               margin: 0px 0px 48px calc((100% - 980px) * 0.5);
               left: 1240px;
               grid-area: 4 / 1 / 5 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-j1rq4r8a {
               position: relative;
               margin: 0px 0px 38px calc((100% - 980px) * 0.5);
               left: -1px;
               grid-area: 6 / 1 / 7 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #SITE_HEADERcenteredContent {
               position: relative;
           }
           
           #SITE_HEADERinlineContent-gridContainer > * {
               pointer-events: auto;
           }
           
           #SITE_HEADERinlineContent-gridContainer > [id$="-rotated-wrapper"] {
               pointer-events: none;
           }
           
           #SITE_HEADERinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
               pointer-events: auto;
           }</style><div id="SITE_HEADERinlineContent-gridWrapper" data-mesh-internal="true"><div id="SITE_HEADERinlineContent-gridContainer" data-mesh-internal="true"><div data-border-width="1px" style="transform-origin:center 0.5px;left:0;margin-left:0;width:100%;min-width:initial;top:;bottom:;right:;height:5px;position:;display:none" class="style-jr9629o5" id="comp-j1rq4q3c1"></div><section style="left:0;width:100%;min-width:980px;height:auto;top:;bottom:;right:;position:;display:none;margin-left:0" data-responsive="true" data-is-screen-width="true" data-col-margin="0" data-row-margin="0" class="strc1" id="comp-k557vagj"><div style="position:absolute;top:0;width:calc(100% - 0px);height:100%;overflow:hidden;pointer-events:auto;min-width:980px;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="strc1balata" id="comp-k557vagjbalata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557vagjbalatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557vagjbalatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div style="position:relative;width:calc(100% - 0px);min-width:980px" id="comp-k557vagjinlineContent" class="strc1inlineContent"><div style="position:relative;width:100%;left:0;flex:325;margin-left:0;min-width:325px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="325" data-is-mesh="true" class="mc1" id="comp-k557vaxc"><div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557vaxccontainer"><div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557vaxcbalata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557vaxcbalatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557vaxcbalatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557vaxcinlineContentParent"><div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557vaxcinlineContent"><style id="comp-k557vaxc-mesh-styles">
               
           #comp-k557vaxcinlineContent {
               height: auto;
               width: 100%;
               position: relative;
           }
           
           #comp-k557vaxcinlineContent-gridContainer {
               position: static;
               height: auto;
               width: 100%;
               min-height: 98px;
           }
           
           #comp-k557vaxccenteredContent {
               position: relative;
           }
           
           #comp-k557vaxcinlineContent-gridWrapper {
               pointer-events: none;
           }
           
           #comp-k557vaxcinlineContent-gridContainer > * {
               pointer-events: auto;
           }
           
           #comp-k557vaxcinlineContent-gridContainer > [id$="-rotated-wrapper"] {
               pointer-events: none;
           }
           
           #comp-k557vaxcinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
               pointer-events: auto;
           }</style><div id="comp-k557vaxcinlineContent-gridContainer" data-mesh-internal="true"></div></div></div></div></div><div style="position:relative;width:100%;left:0;flex:326;margin-left:0px;min-width:326px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="326" data-is-mesh="true" class="mc1" id="comp-k557wjr8"><div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557wjr8container"><div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557wjr8balata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557wjr8balatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557wjr8balatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557wjr8inlineContentParent"><div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557wjr8inlineContent"><style id="comp-k557wjr8-mesh-styles">
               
           #comp-k557wjr8inlineContent {
               height: auto;
               width: 100%;
               position: relative;
           }
           
           #comp-k557wjr8inlineContent-gridContainer {
               position: static;
               height: auto;
               width: 100%;
               min-height: 98px;
           }
           
           #comp-k557wjr8centeredContent {
               position: relative;
           }
           
           #comp-k557wjr8inlineContent-gridWrapper {
               pointer-events: none;
           }
           
           #comp-k557wjr8inlineContent-gridContainer > * {
               pointer-events: auto;
           }
           
           #comp-k557wjr8inlineContent-gridContainer > [id$="-rotated-wrapper"] {
               pointer-events: none;
           }
           
           #comp-k557wjr8inlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
               pointer-events: auto;
           }</style><div id="comp-k557wjr8inlineContent-gridContainer" data-mesh-internal="true"></div></div></div></div></div><div style="position:relative;width:100%;left:0;flex:329;margin-left:0px;min-width:329px;top:0;margin-top:0;margin-bottom:0;height:;display:flex;bottom:;right:" data-content-width="329" data-is-mesh="true" class="mc1" id="comp-k557wp6h"><div class="mc1container" style="position:relative;height:100%;width:100%" id="comp-k557wp6hcontainer"><div style="position:absolute;top:0;width:100%;height:100%;overflow:hidden;pointer-events:auto;left:0;right:0;bottom:0" data-page-id="masterPage" data-enable-video="true" data-bg-effect-name="" data-media-type="" data-use-clip-path="" data-needs-clipping="" data-render-type="bolt" class="mc1balata" id="comp-k557wp6hbalata"><div style="position:absolute;width:100%;height:100%;top:0;background-color:transparent" class="bgColor" id="comp-k557wp6hbalatabgcolor"><div style="width:100%;height:100%;position:absolute;top:0;background-image:;opacity:1" id="comp-k557wp6hbalatabgcoloroverlay" class="bgColoroverlay"></div></div></div><div class="mc1inlineContentParent" style="position:relative;left:0;right:0;top:0;bottom:0" id="comp-k557wp6hinlineContentParent"><div style="width:100%;position:relative;top:0;bottom:0" class="mc1inlineContent" id="comp-k557wp6hinlineContent"><style id="comp-k557wp6h-mesh-styles">
               
           #comp-k557wp6hinlineContent {
               height: auto;
               width: 100%;
               position: relative;
           }
           
           #comp-k557wp6hinlineContent-gridContainer {
               position: static;
               height: auto;
               width: 100%;
               min-height: 98px;
           }
           
           #comp-k557wp6hcenteredContent {
               position: relative;
           }
           
           #comp-k557wp6hinlineContent-gridWrapper {
               pointer-events: none;
           }
           
           #comp-k557wp6hinlineContent-gridContainer > * {
               pointer-events: auto;
           }
           
           #comp-k557wp6hinlineContent-gridContainer > [id$="-rotated-wrapper"] {
               pointer-events: none;
           }
           
           #comp-k557wp6hinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
               pointer-events: auto;
           }</style><div id="comp-k557wp6hinlineContent-gridContainer" data-mesh-internal="true"></div></div></div></div></div></div></section><div style="top:;bottom:;left:;right:;width:189px;height:128px;position:;display:none" title="" data-is-responsive="false" data-display-mode="fill" data-content-padding-horizontal="0" data-content-padding-vertical="0" data-exact-height="128" class="style-k7ns13ap" id="comp-j1rq742h"></div><div style="width:;height:;top:;bottom:;left:;right:;position:;display:none" class="controller1" id="comp-k7nv6chl"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:204px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-j1rq4q3b"><p class="font_9" style="line-height:1.55em; margin-left:40px;"><span style="font-family:roboto-bold,roboto,sans-serif;"><</a></span></p></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:150px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-j1rq4q3b1"><p class="font_9" style="line-height:1.55em; text-align:center;"><span style="font-family:roboto-bold,roboto,sans-serif;"></span></p></div><div id="comp-j1rq4r8a" class="hidden-during-prewarmup style-k7to9w85" style="overflow-x:hidden;top:;bottom:;left:;right:;width:980px;height:30px;position:;display:none" data-stretch-buttons-to-menu-width="true" data-same-width-buttons="false" data-num-items="8" data-menuborder-y="0" data-menubtn-border="0" data-ribbon-els="0" data-label-pad="0" data-ribbon-extra="0" data-drophposition="" data-dropalign="left" dir="ltr" data-state="left notMobile"><nav aria-label="Site" id="comp-j1rq4r8anavContainer" class="style-k7to9w85navContainer"><ul style="text-align:left" id="comp-j1rq4r8aitemsContainer" class="style-k7to9w85itemsContainer"><li data-direction="ltr" data-listposition="left" data-data-id="dataItem-j1rp5ha3" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a0"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k7tq7ym2" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a1"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-j1rpaj7y" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a2"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k7ud6l51" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a3"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-k6sazqs1" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a4"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-jrgep25b" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a5"></li><li data-direction="ltr" data-listposition="center" data-data-id="dataItem-kcmg5nn2" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a6"></li><li data-direction="ltr" data-listposition="right" data-data-id="dataItem-k6i0cpy8" class="style-k7to9w85repeaterButton" data-state="menu  idle link notMobile" id="comp-j1rq4r8a7"></li><li data-listposition="right" class="style-k7to9w85repeaterButton" data-state="menu  idle header notMobile" id="comp-j1rq4r8a__more__"></li></ul><div id="comp-j1rq4r8amoreButton" class="style-k7to9w85moreButton"></div><div style="visibility:hidden" data-drophposition="" data-dropalign="left" id="comp-j1rq4r8adropWrapper" class="style-k7to9w85dropWrapper"><ul style="visibility:hidden" id="comp-j1rq4r8amoreContainer" class="style-k7to9w85moreContainer"></ul></div></nav></div></div></div></div></div></header><main tabindex="-1" data-is-mobile="false" data-is-mesh="true" data-site-width="980" style="left:0;margin-left:0;width:100%;min-width:980px;top:0;bottom:;right:;position:" class="pc1" data-state="" id="PAGES_CONTAINER"><div style="left:0" id="PAGES_CONTAINERscreenWidthBackground" class="pc1screenWidthBackground"></div><div style="position:relative" id="PAGES_CONTAINERcenteredContent" class="pc1centeredContent"><div style="display:none" id="PAGES_CONTAINERbg" class="pc1bg"></div><div style="position:relative" id="PAGES_CONTAINERinlineContent" class="pc1inlineContent"><div style="width:100%"><div data-ismobile="false" data-is-mesh-layout="true" style="height:100%;left:0;position:relative;top:;bottom:;right:" class="style-kf8sbpeg" id="rke15"><div style="margin-left:calc((100% - 980px) / 2);width:980px" id="rke15bg" class="style-kf8sbpegbg"></div><div class="style-kf8sbpeginlineContent" id="rke15inlineContent"><style id="rke15-mesh-styles">
               
           #rke15inlineContent {
               height: auto;
               width: 100%;
               position: relative;
           }
           
           #rke15inlineContent-gridWrapper {
               pointer-events: none;
           }
           
           #rke15inlineContent-gridContainer {
               position: static;
               display: grid;
               height: auto;
               width: 100%;
               min-height: 500px;
               grid-template-rows: min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content min-content 1fr;
               grid-template-columns: 100%;
               padding-bottom: 0px;
               box-sizing: border-box;
           }
           
           #comp-kf8sqbal {
               position: relative;
               left: 380px;
               top: 226px;
           }
           
           #comp-kf8ryq20 {
               position: relative;
               margin: 27px 0px 19px calc((100% - 980px) * 0.5);
               left: 20px;
               grid-area: 1 / 1 / 2 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8rw8tn {
               position: relative;
               margin: 0px 0px -13px calc((100% - 980px) * 0.5);
               left: 30px;
               grid-area: 3 / 1 / 4 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kfb3ktl2 {
               position: relative;
               margin: 0px 0px 0 calc((100% - 980px) * 0.5);
               left: 450px;
               grid-area: 4 / 1 / 10 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kfb3m2tz {
               position: relative;
               margin: 0px 0px 0 calc((100% - 980px) * 0.5);
               left: 290px;
               grid-area: 4 / 1 / 11 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kfpyrzoh {
               position: relative;
               margin: 2px 0px -15px calc((100% - 980px) * 0.5);
               left: 30px;
               grid-area: 4 / 1 / 7 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8tjsl3 {
               position: relative;
               margin: 0px 0px -8px calc((100% - 980px) * 0.5);
               left: 650px;
               grid-area: 2 / 1 / 3 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8tp69s {
               position: relative;
               margin: 25px 0px -4px calc((100% - 980px) * 0.5);
               left: 650px;
               grid-area: 3 / 1 / 5 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8tkx3g {
               position: relative;
               margin: 0px 0px 0 calc((100% - 980px) * 0.5);
               left: 650px;
               grid-area: 7 / 1 / 8 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8s5xt9 {
               position: relative;
               margin: 0px 0px 0 calc((100% - 980px) * 0.5);
               left: 30px;
               grid-area: 14 / 1 / 21 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8sqbal-rotated-wrapper {
               position: static;
               height: 480px;
               width: 0;
               margin: 4px 0px -29px calc((100% - 980px) * 0.5);
               grid-area: 1 / 1 / 24 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8tqtc5 {
               position: relative;
               margin: 7px 0px 12px calc((100% - 980px) * 0.5);
               left: 650px;
               grid-area: 14 / 1 / 15 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8tred7 {
               position: relative;
               margin: 0px 0px 15px calc((100% - 980px) * 0.5);
               left: 650px;
               grid-area: 15 / 1 / 16 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8ts8az {
               position: relative;
               margin: 0px 0px 21px calc((100% - 980px) * 0.5);
               left: 650px;
               grid-area: 16 / 1 / 17 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8tsu8k {
               position: relative;
               margin: 0px 0px 18px calc((100% - 980px) * 0.5);
               left: 650px;
               grid-area: 17 / 1 / 18 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8ttbhv {
               position: relative;
               margin: 0px 0px 11px calc((100% - 980px) * 0.5);
               left: 669px;
               grid-area: 18 / 1 / 19 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8ttcnw {
               position: relative;
               margin: 0px 0px 28px calc((100% - 980px) * 0.5);
               left: 669px;
               grid-area: 19 / 1 / 20 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kfvfyyya {
               position: relative;
               margin: 0px 0px 0 calc((100% - 980px) * 0.5);
               left: 310px;
               grid-area: 4 / 1 / 12 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kfvfz7nq {
               position: relative;
               margin: 0px 0px 0 calc((100% - 980px) * 0.5);
               left: 330px;
               grid-area: 4 / 1 / 13 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kfvfzeot {
               position: relative;
               margin: 0px 0px 0 calc((100% - 980px) * 0.5);
               left: 358px;
               grid-area: 4 / 1 / 14 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kfvfzr63 {
               position: relative;
               margin: 1px 0px -1px calc((100% - 980px) * 0.5);
               left: 419px;
               grid-area: 4 / 1 / 9 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kfvg3jl5 {
               position: relative;
               margin: 0px 0px -9px calc((100% - 980px) * 0.5);
               left: 399px;
               grid-area: 5 / 1 / 6 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8tv20d {
               position: relative;
               margin: 0px 0px 23px calc((100% - 980px) * 0.5);
               left: 660px;
               grid-area: 21 / 1 / 22 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8s6j8x {
               position: relative;
               margin: 0px 0px 0 calc((100% - 980px) * 0.5);
               left: 10px;
               grid-area: 22 / 1 / 23 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kfvfxgp6 {
               position: relative;
               margin: 0px 0px 8px calc((100% - 980px) * 0.5);
               left: 40px;
               grid-area: 24 / 1 / 25 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kfvfxk97 {
               position: relative;
               margin: 0px 0px 8px calc((100% - 980px) * 0.5);
               left: 109px;
               grid-area: 24 / 1 / 25 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kf8sfbtj {
               position: relative;
               margin: 0px 0px 15px calc((100% - 980px) * 0.5);
               left: 430px;
               grid-area: 23 / 1 / 47 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-kfpx9ii3 {
               position: relative;
               margin: 0px 0px 0 calc((100% - 980px) * 0.5);
               left: 109px;
               grid-area: 47 / 1 / 48 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #rke15centeredContent {
               position: relative;
           }
           
           #rke15inlineContent-gridContainer > * {
               pointer-events: auto;
           }
           
           #rke15inlineContent-gridContainer > [id$="-rotated-wrapper"] {
               pointer-events: none;
           }
           
           #rke15inlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
               pointer-events: auto;
           }</style><div id="rke15inlineContent-gridWrapper" data-mesh-internal="true"><div id="rke15inlineContent-gridContainer" data-mesh-internal="true"><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:310px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ryq20"><h6 class="font_6">Main Task</h6></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:591px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8rw8tn"><p class="font_8" style="font-size:15px; line-height:1.3em;"><span style="font-weight:bold;"><span style="letter-spacing:0.03em;"><span style="font-family:avenir-lt-w01_35-light1475496,sans-serif;"><span style="font-size:15px;"><span style="color:#000000;">Persuasion is the attempt to influence someone's belief,</span></span></span></span></span></p>
           
           <p class="font_8" style="font-size:15px; line-height:1.3em;"><span style="letter-spacing:0.03em;"><span style="font-family:avenir-lt-w01_35-light1475496,sans-serif;"><span style="font-size:15px;"><span style="color:#000000;"><span style="font-weight:bold;">attitude, and intentions.</span> (example definition, text in parameter file)</span></span></span></span></p></div><div id="comp-kfb3ktl2" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?&workerId='+'`+workerID+`'+'&missionVal='+'`+mission_val+`'+'&block='+'`+block+`'+'&missionId='+'`+mission_id+`'+'&task_type='+'`+task+`'+'&mission_state=fwd'+'&ans_n='+'&ans_y='" id="comp-kfb3ktl2link" class="b4link"><span id="comp-kfb3ktl2label" class="b4label"></span></a></div><div id="comp-kfb3m2tz" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?&workerId='+'`+workerID+`'+'&missionVal='+'`+mission_val+`'+'&block='+'`+block+`'+'&missionId='+'`+mission_id+`'+'&task_type='+'`+task+`'+'&mission_state=bkd'+'&ans_n='+'&ans_y='" id="comp-kfb3m2tzlink" class="b4link"><span id="comp-kfb3m2tzlabel" class="b4label">&lt;&lt;</span></a></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:42px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfpyrzoh"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:310px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tjsl3"><h6 class="font_6">Introduction</h6></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tp69s"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Definition</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tkx3g"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">About the t</span></span></span><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">ask</span></span></span></span></a></span></h2></div><div class="style-kf8s5xvn_left-direction style-kf8s5xvn" style="top:;bottom:;left:;right:;width:469px;height:210px;position:" data-state="valid" id="comp-kf8s5xt9"><label style="padding-left:0;padding-right:20px;display:none;margin-bottom:14px;text-align:left;direction:ltr" for="comp-kf8s5xt9textarea" id="comp-kf8s5xt9label" class="style-kf8s5xvnlabel"></label><textarea style="padding-left:16px;padding-right:10px" placeholder="" readonly="" class="has-custom-focus style-kf8s5xvntextarea" id="comp-kf8s5xt9textarea">`+tweet_text+`</textarea></div><div id="comp-kf8sqbal-rotated-wrapper" data-mesh-internal="true"><div id="comp-kf8sqbal" style="top:;bottom:;left:;right:;width:480px;height:28px;position:" data-angle="270"><button type="button" aria-label="Introduction" class="stylablebutton643855516__root style-kf8sqbcc__root" style="position:absolute" id="comp-kf8sqbal-inner-button"><div class="stylablebutton643855516__container"><span class="stylablebutton643855516__label">Introduction</span><span class="stylablebutton643855516__icon" aria-hidden="true"><div><svg data-bbox="13.05 2.55 33.878 54.8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
               <g>
                   <path d="M46.5 28.9L20.6 3c-.6-.6-1.6-.6-2.2 0l-4.8 4.8c-.6.6-.6 1.6 0 2.2l19.8 20-19.9 19.9c-.6.6-.6 1.6 0 2.2l4.8 4.8c.6.6 1.6.6 2.2 0l21-21 4.8-4.8c.8-.6.8-1.6.2-2.2z"/>
               </g>
           </svg>
           </div></span></div></button></div></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tqtc5"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Example</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tred7"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">Trigger Alert</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ts8az"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">What you should consider</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tsu8k"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">What you need to ask yourself</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ttbhv"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8ttcnw"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank"><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;"></span></span></span></span></a></span></h2></div><div id="comp-kfvfyyya" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a id="comp-kfvfyyyalink" class="b4link"><span id="comp-kfvfyyyalabel" class="b4label"></span></a></div><div id="comp-kfvfz7nq" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a id="comp-kfvfz7nqlink" class="b4link"><span id="comp-kfvfz7nqlabel" class="b4label"></span></a></div><div id="comp-kfvfzeot" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a  id="comp-kfvfzeotlink" class="b4link"><span id="comp-kfvfzeotlabel" class="b4label"></span></a></div><div id="comp-kfvfzr63" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="42" data-height="40" style="top:;bottom:;left:;right:;width:30px;height:40px;position:" class="b4" data-state="desktop shouldUseFlex center"><a id="comp-kfvfzr63link" class="b4link"><span id="comp-kfvfzr63label" class="b4label">`+fin_q+`</span></a></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:120px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kfvg3jl5"><p class="font_10"><span style="font-weight:bold;"><span style="color:#000000;">ID:</span></span></p></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:259px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8tv20d"><h2 class="font_2" style="font-size:13px;"><span style="font-size:13px;"><a href="" onclick="href='/home1/?task_type='+'`+task+`'" target="_blank" ><span style="font-size:13px;"><span style="font-family:futura-lt-w01-book,sans-serif;"><span style="color:#292929;"><span style="text-decoration:underline;">How to report</span></span></span></span></a></span></h2></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:330px;height:auto;position:;pointer-events:none" class="txtNew" id="comp-kf8s6j8x"><p class="font_8" style="font-size:15px; line-height:1.3em;"><span style="font-weight:bold;color:#000000;">`+foot_note+`<span style="letter-spacing:0.03em;"><span style="font-family:avenir-lt-w01_35-light1475496,sans-serif;"><span style="font-size:15px;"><span style="color:#000000;"></span></span></span></span></span></p></div><div id="comp-kfvfxgp6" data-align="center" data-disabled="`+yes_val+`" data-margin="0" data-should-use-flex="true" data-width="42" data-height="35" style="top:;bottom:;left:;right:;width:42px;height:35px;position:" class="b1" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?ans_y=YES'+'&ans_n='+'&workerId='+'`+workerID+`'+'&task_type='+'`+task+`'+'&block='+'`+block+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&mission_state=chk'" id="comp-kfvfxgp6link" class="g-transparent-a b1link"><span id="comp-kfvfxgp6label" class="b1label">Yes</span></a></div><div id="comp-kfvfxk97" data-align="center" data-disabled="`+no_val+`" data-margin="0" data-should-use-flex="true" data-width="40" data-height="35" style="top:;bottom:;left:;right:;width:40px;height:35px;position:" class="b1" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?ans_n=NO'+'&ans_y='+'&workerId='+'`+workerID+`'+'&block='+'`+block+`'+'&task_type='+'`+task+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&mission_state=chk'" id="comp-kfvfxk97link" class="g-transparent-a b1link"><span id="comp-kfvfxk97label" class="b1label">No</span></a></div><div id="comp-kf8sfbtj" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="131" data-height="35" style="top:;bottom:;left:;right:;width:131px;height:35px;position:" class="b1" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='?&workerId='+'`+workerID+`'+'&block='+'`+block+`'+'&task_type='+'`+task+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&mission_state='+'`+sbmtlnk+`'" id="comp-kf8sfbtjlink" class="g-transparent-a b1link"><span id="comp-kf8sfbtjlabel" class="b1label">`+sbmtval+`</span></a></div><div class="style-kf8s5xvn_right-direction" style="top:;bottom:;left:;right:;width:85px;height:35px;position:" data-state="valid" id="comp-kfpx9ii3"><div id="comp-kgscs5ki" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="131" data-height="35" style="top:;bottom:;left:;right:;width:31px;height:35px;position:" class="b1" data-state="desktop shouldUseFlex center"><a target="_self" href="" onclick="href='/quittask/?&workerId='+'`+workerID+`'+'&block='+'`+block+`'+'&task_type='+'`+task+`'+'&missionVal='+'`+mission_val+`'+'&missionId='+'`+mission_id+`'+'&mission_state='+'`+sbmtlnk+`'" id="comp-kgscs5kilink" class="g-transparent-a b1link"><span id="comp-kgscs5kilabel" class="b1label">Quit Task</span></a></div><label style="padding-left:0;padding-right:20px;display:none;margin-bottom:14px;text-align:left;direction:ltr" for="comp-kfpx9ii3textarea" id="comp-kfpx9ii3label" class="style-kf8s5xvnlabel"></label></div> </div></div></div></div></div></div></div></main><div id="soapAfterPagesContainer" class="page-without-sosp"><style id="soapAfterPagesContainer-mesh-styles">
           #soapAfterPagesContainerinlineContent {
               height: auto;
               width: 100%;
               position: relative;
           }
           
           #soapAfterPagesContainerinlineContent-gridWrapper {
               pointer-events: none;
           }
           
           #soapAfterPagesContainerinlineContent-gridContainer {
               position: static;
               display: grid;
               height: auto;
               width: 100%;
               min-height: auto;
               grid-template-rows: 1fr;
               grid-template-columns: 100%;
               padding-bottom: 0px;
               box-sizing: border-box;
           }
           
           #comp-j1rtn0ml {
               position: relative;
               margin: 6px 0 0 0;
               left: 0;
               grid-area: 1 / 1 / 2 / 2;
               justify-self: stretch;
               align-self: start;
           }
           
           #CONTROLLER_COMP_CUSTOM_ID {
               position: absolute;
               top: -288px;
               left: 20px;
           }
           
           #soapAfterPagesContainercenteredContent {
               position: relative;
           }
           
           #soapAfterPagesContainerinlineContent-gridContainer > * {
               pointer-events: auto;
           }
           
           #soapAfterPagesContainerinlineContent-gridContainer > [id$="-rotated-wrapper"] {
               pointer-events: none;
           }
           
           #soapAfterPagesContainerinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
               pointer-events: auto;
           }</style><div id="soapAfterPagesContainerinlineContent-gridWrapper" data-mesh-internal="true"><div id="soapAfterPagesContainerinlineContent-gridContainer" data-mesh-internal="true"><div data-border-width="1px" style="transform-origin:center 0.5px;left:0;margin-left:0;width:100%;min-width:initial;top:;bottom:;right:;height:5px;position:;display:none" class="style-jr9629o5" id="comp-j1rtn0ml"></div><div style="width:;height:;top:;bottom:;left:;right:;position:;display:none" class="style-k6auwcww" id="CONTROLLER_COMP_CUSTOM_ID"></div></div></div></div><footer style="bottom:auto;left:0;margin-left:0;width:100%;min-width:980px;top:;right:;position:;display:none" class="style-k7ugjln5_footer style-k7ugjln5" tabindex="-1" data-site-width="980" data-fixedposition="false" data-isrunninginmobile="false" data-is-absolute-layout="false" data-state=" " id="SITE_FOOTER"><div style="left:0;width:100%" id="SITE_FOOTERscreenWidthBackground" class="style-k7ugjln5screenWidthBackground"><div class="style-k7ugjln5_bg"></div></div><div style="width:100%" id="SITE_FOOTERcenteredContent" class="style-k7ugjln5centeredContent"><div style="margin-left:calc((100% - 980px) / 2);width:980px" id="SITE_FOOTERbg" class="style-k7ugjln5bg"></div><div id="SITE_FOOTERinlineContent" class="style-k7ugjln5inlineContent"><style id="SITE_FOOTER-mesh-styles">
               
           #SITE_FOOTERinlineContent {
               height: auto;
               width: 100%;
               position: relative;
           }
           
           #SITE_FOOTERinlineContent-gridWrapper {
               pointer-events: none;
           }
           
           #SITE_FOOTERinlineContent-gridContainer {
               position: static;
               display: grid;
               height: auto;
               width: 100%;
               min-height: 423px;
               grid-template-rows: min-content min-content min-content min-content min-content 1fr;
               grid-template-columns: 100%;
           }
           
           #comp-j1rq4r8m {
               position: relative;
               margin: 60px 0px 25px calc((100% - 980px) * 0.5);
               left: -1px;
               grid-area: 1 / 1 / 4 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-j9zs014r {
               position: relative;
               margin: 0px 0px 19px calc((100% - 980px) * 0.5);
               left: 0px;
               grid-area: 5 / 1 / 6 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-k6huwtfd {
               position: relative;
               margin: 60px 0px 46px calc((100% - 980px) * 0.5);
               left: 650px;
               grid-area: 1 / 1 / 2 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-k6hsf3rx {
               position: relative;
               margin: 0px 0px 40px calc((100% - 980px) * 0.5);
               left: 610px;
               grid-area: 2 / 1 / 3 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-k6hsf3sr {
               position: relative;
               margin: 0px 0px -7px calc((100% - 980px) * 0.5);
               left: 680px;
               grid-area: 4 / 1 / 5 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #comp-jhi0p1w8 {
               position: relative;
               margin: 0px 0px 10px calc((100% - 980px) * 0.5);
               left: 0px;
               grid-area: 6 / 1 / 7 / 2;
               justify-self: start;
               align-self: start;
           }
           
           #SITE_FOOTERcenteredContent {
               position: relative;
           }
           
           #SITE_FOOTERinlineContent-gridContainer > * {
               pointer-events: auto;
           }
           
           #SITE_FOOTERinlineContent-gridContainer > [id$="-rotated-wrapper"] {
               pointer-events: none;
           }
           
           #SITE_FOOTERinlineContent-gridContainer > [id$="-rotated-wrapper"] > * {
               pointer-events: auto;
           }</style><div id="SITE_FOOTERinlineContent-gridWrapper" data-mesh-internal="true"><div id="SITE_FOOTERinlineContent-gridContainer" data-mesh-internal="true"><div data-packed="false" data-vertical-text="false" style="top:;bottom:;left:;right:;width:253px;height:auto;position:;display:none;min-height:120px;pointer-events:none" data-min-height="120" class="txtNew" id="comp-j1rq4r8m"><p class="font_8" style="font-size:22px;"><span style="font-size:22px;"><span class="color_18"><span style="text-decoration:underline;"><</span></span></span></p>
           
           </div><div data-is-responsive="false" style="width:118px;height:30px;top:;bottom:;left:;right:;position:;display:none" data-hide-prejs="true" class="lb1" id="comp-j9zs014r"><ul aria-label="Social bar" id="comp-j9zs014ritemsContainer" class="lb1itemsContainer"><li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r0image"></li><li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r1image"></li><li style="width:30px;height:30px;margin-bottom:0;margin-right:14px;display:inline-block" class="lb1imageItem" id="comp-j9zs014r2image"></li></ul></div><div data-packed="false" data-vertical-text="false" style="top:;bottom:;left:;right:;width:219px;height:auto;position:;display:none;min-height:25px;pointer-events:none" data-min-height="25" class="txtNew" id="comp-k6huwtfd"></div><div data-height-diff="0" data-width-diff="0" data-num-cols="2" data-max-rows="3" data-margin="15" data-is-mesh="true" style="overflow:hidden;top:;bottom:;left:;right:;width:285px;height:79px;position:;display:none" class="style-k6hsf3sb" data-state="hidePlayButton autoplayOff idle notMobile desktopView  touchRollOut" id="comp-k6hsf3rx"><div data-gallery-id="comp-k6hsf3rx" class="style-k6hsf3sb_show-counter style-k6hsf3sbitemsContainer" style="position:relative;overflow:hidden;width:285px;height:79px" id="comp-k6hsf3rxitemsContainer"><div style="transform:none;position:absolute;width:135px;height:79px;left:0;top:0;overflow:hidden;clip:auto" data-has-bg-scroll-effect="" data-style="position:absolute;overflow:hidden;clip:auto" data-gallery-id="comp-k6hsf3rx" data-page-desc="curr" data-query="dataItem-k6hsf5hc4" data-image-index="0" class="style-k6hsf3sbimg" id="comp-k6hsf3rxdataItem-k6hsf5hc4"><img id="comp-k6hsf3rxdataItem-k6hsf5hc4image" alt="" data-type="image" itemProp="image"/></div><div style="transform:none;position:absolute;width:135px;height:79px;left:150px;top:0;overflow:hidden;clip:auto" data-has-bg-scroll-effect="" data-style="position:absolute;overflow:hidden;clip:auto" data-gallery-id="comp-k6hsf3rx" data-page-desc="curr" data-query="dataItem-k6hsf5hc" data-image-index="1" class="style-k6hsf3sbimg" id="comp-k6hsf3rxdataItem-k6hsf5hc"><img id="comp-k6hsf3rxdataItem-k6hsf5hcimage" alt="" data-type="image" itemProp="image"/></div></div><div style="visibility:hidden;cursor:pointer" data-gallery-id="comp-k6hsf3rx" data-hovered-image-id="" id="comp-k6hsf3rxrolloverHolder" class="style-k6hsf3sbrolloverHolder"><h3 data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxtitle" class="style-k6hsf3sbtitle"></h3><p data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxdescription" class="style-k6hsf3sbdescription"></p><a id="comp-k6hsf3rxlink" class="style-k6hsf3sblink"></a><a href="#" style="height:100%;display:block;width:100%;position:absolute;top:0px;left:0px;background-color:#ffffff;filter:alpha(opacity=0);opacity:0;user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-drag:none;-webkit-user-drag:none;-moz-user-drag:none;-ms-user-drag:none;user-modify:read-only;-webkit-user-modify:read-only;-moz-user-modify:read-only;-ms-user-modify:read-only"></a></div><div class="style-k6hsf3sb_buttons"><a data-gallery-id="comp-k6hsf3rx" style="visibility:hidden" id="comp-k6hsf3rxbuttonPrev" class="style-k6hsf3sbbuttonPrev"></a><a data-gallery-id="comp-k6hsf3rx" style="visibility:hidden" id="comp-k6hsf3rxbuttonNext" class="style-k6hsf3sbbuttonNext"></a></div><div style="visibility:visible" data-gallery-id="comp-k6hsf3rx" id="comp-k6hsf3rxcounter" class="style-k6hsf3sb_hlp style-k6hsf3sb_opc style-k6hsf3sbcounter">1/1</div><div data-gallery-id="comp-k6hsf3rx" style="cursor:pointer;visibility:hidden" id="comp-k6hsf3rxautoplay" class="style-k6hsf3sb_hlp style-k6hsf3sb_opc style-k6hsf3sbautoplay"><span></span></div><div id="comp-k6hsf3rxemptyDivToFillMatrix" class="style-k6hsf3sbemptyDivToFillMatrix"></div></div><div id="comp-k6hsf3sr" data-align="center" data-disabled="false" data-margin="0" data-should-use-flex="true" data-width="131" data-height="35" style="top:;bottom:;left:;right:;width:131px;height:35px;position:;display:none" class="style-k6hsf3t3" data-state="desktop shouldUseFlex center"></div><div data-packed="true" data-vertical-text="false" style="top:;bottom:;left:;right:;width:109px;height:auto;position:;display:none;pointer-events:none" class="txtNew" id="comp-jhi0p1w8"><p class="font_9" style="text-align:center; font-size:14px;"><span style="font-size:14px;"><span class="color_11"><span style="text-decoration:underline;"></span></span></span></p></div></div></div></div></div></footer></div></div><div id="aspectCompsContainer" class="siteAspectsContainer"><div style="position:absolute" id="popoverLayer"></div><wix-iframe style="top:;bottom:;left:;right:;position:;overflow:hidden;visibility:hidden" data-has-iframe="true" data-src="https://apps.wix.com/members-area/app-worker?cacheKiller=1601836289450&amp;commonConfig=%7B%7BcommonConfig%7D%7D&amp;compId=tpaWorker_9180&amp;consent-policy=%7B%7BconsentPolicy%7D%7D&amp;deviceType=desktop&amp;endpointType=worker&amp;instance=miJuHq7rqXBbBUbn2Zd0ho7e2KzdSOGVyNq5rFvlIEk.eyJpbnN0YW5jZUlkIjoiZWI5OWQ0NWItZThkMS00N2ZmLWE2ZWEtMGNhNDllMDExY2Q2IiwiYXBwRGVmSWQiOiIxNGNlMjhmNy03ZWIwLTM3NDUtMjJmOC0wNzRiMGUyNDAxZmIiLCJtZXRhU2l0ZUlkIjoiZTk4ZGRjM2MtM2E2Yy00Zjk5LTg3YTMtZGQ1M2U5YjdhOWNlIiwic2lnbkRhdGUiOiIyMDIwLTEwLTA0VDE4OjM3OjI0LjU5NVoiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjdmODNiMGIxLTE4NWItNGEzMy1iOWMzLWYwY2E0YzM0YmZkMiIsImJpVG9rZW4iOiIwMjE0MDg2Ny1kMmJkLTA4NjYtMjE0OS1kMWY3NzdiNmI1MTgiLCJzaXRlT3duZXJJZCI6IjU3NThjNGIzLWVkODYtNDdkYi05Yjc3LWQ4YjZhNjAyZmI3ZiJ9&amp;locale=en&amp;siteRevision=1372&amp;viewMode=site&amp;viewerCompId=tpaWorker_9180" data-is-tpa="true" data-app-definition-id="14ce28f7-7eb0-3745-22f8-074b0e2401fb" id="tpaWorker_9180" class="s_DtaksTPAWidgetSkin"><iframe data-src="https://apps.wix.com/members-area/app-worker?cacheKiller=1601836289450&amp;commonConfig=%7B%7BcommonConfig%7D%7D&amp;compId=tpaWorker_9180&amp;consent-policy=%7B%7BconsentPolicy%7D%7D&amp;deviceType=desktop&amp;endpointType=worker&amp;instance=miJuHq7rqXBbBUbn2Zd0ho7e2KzdSOGVyNq5rFvlIEk.eyJpbnN0YW5jZUlkIjoiZWI5OWQ0NWItZThkMS00N2ZmLWE2ZWEtMGNhNDllMDExY2Q2IiwiYXBwRGVmSWQiOiIxNGNlMjhmNy03ZWIwLTM3NDUtMjJmOC0wNzRiMGUyNDAxZmIiLCJtZXRhU2l0ZUlkIjoiZTk4ZGRjM2MtM2E2Yy00Zjk5LTg3YTMtZGQ1M2U5YjdhOWNlIiwic2lnbkRhdGUiOiIyMDIwLTEwLTA0VDE4OjM3OjI0LjU5NVoiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjdmODNiMGIxLTE4NWItNGEzMy1iOWMzLWYwY2E0YzM0YmZkMiIsImJpVG9rZW4iOiIwMjE0MDg2Ny1kMmJkLTA4NjYtMjE0OS1kMWY3NzdiNmI1MTgiLCJzaXRlT3duZXJJZCI6IjU3NThjNGIzLWVkODYtNDdkYi05Yjc3LWQ4YjZhNjAyZmI3ZiJ9&amp;locale=en&amp;siteRevision=1372&amp;viewMode=site&amp;viewerCompId=tpaWorker_9180" scrolling="no" frameBorder="0" allow="autoplay; camera; microphone; geolocation;" allowtransparency="true" allowfullscreen="" name="tpaWorker_9180" style="display:none;position:absolute;z-index:" title="Profile Card" aria-label="Profile Card" id="tpaWorker_9180iframe" class="s_DtaksTPAWidgetSkiniframe"></iframe><div id="tpaWorker_9180overlay" class="s_DtaksTPAWidgetSkinoverlay"></div></wix-iframe></div><div id="SCROLL_TO_BOTTOM" tabindex="-1" aria-label="bottom of page" role="region" style="height:0"></div><script id="partiallyVisibleBeat">
                           if (window.wixBiSession) {
                               wixBiSession.isUsingMesh = true;
                               if (wixBiSession.sendBeat) {
                                   wixBiSession.sendBeat(12, 'Partially visible', '&pid=rke15');
                               }
                           }
                           if (window.requestCloseWelcomeScreen) {
                               requestCloseWelcomeScreen();
                           }
                       </script></div><div class="font-ruler-container" style="overflow:hidden;visibility:hidden;max-height:0;max-width:0;position:absolute"><style>.font-ruler-content::after {content:"@#$%%^&*~IAO"}</style><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div><div style="position:absolute;overflow:hidden;font-size:1200px;left:-2000px;visibility:hidden"><div style="position:relative;white-space:nowrap;font-family:serif"><div style="position:absolute;width:100%;height:100%;overflow:hidden"><div></div></div><span class="font-ruler-content"></span></div></div></div></div>
           
           
               
              
               
           
           
               
               
               
               
           
               
                   <!-- No Footer -->
               
           
               
               
               
               
               
               
               
               <!--body end html embeds start-->
               
               <!--body end html embeds end-->
               
               
               
           
               
               
               
               
               
           
               
           
           
           </body>
           </html>
           
           
           
           
  
  
                    `);
           
                          
             //res.end();
                     
            //next();
                          
           });
         }
          });
      });
      
      
      
         }); 
         
         
         app.get('/quittask', async function(req, res) {
            var reqQueryObject = req.query // returns object with all parameters
              
              workerID = req.query.workerId // returns "12354411"
      
              
              
              
              task=parseInt(req.query.task_type);
              block=parseInt(req.query.task_type);
              
            //2.
            const Pool = require('pg').Pool;
            const pool = new Pool({
                user: 'dbodoff@persuasion',
                host: 'persuasion.postgres.database.azure.com',
                database: 'postgres',
                password: 'Bozo@2020',
                port: 5432,
          })
           
             
             if (Number(task) == 1) {
                 sql_chy = `update blocks set gen = gen - 1 where block=${block};`;
              }
              if (Number(task) == 2) {
                 sql_chy = `update blocks set emot = emot - 1 where block=${block};`;
              }
              if (Number(task) == 3) {
                 sql_chy = `update blocks set cog = cog - 1 where block=${block};`;
              }
              if (Number(task) == 4) {
                 sql_chy = `update blocks set norm = norm - 1 where block=${block};`;
              }
      
             
             pool.on('error',function(err,client){});
             pool.query(sql_chy,(error, results) => {});  
                  
                  res.write(`
      
      
                      <!DOCTYPE html>
                      <html lang="en">
                          <head>
                                  <title>Tweet</title>
                              </head>
                      
                              <body>
                              <h1>You have quit the task</h1>
      
                      </body>
                      </html>
                      
                              `);
                              res.end();
               
    
          
             }); 
	
app.use(express.static('public'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
