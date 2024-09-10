#!/usr/bin/env node
import query from "../lib/mysql.js";
import PKTen from "./facade/PKTen.js";

const TimerTick = (cb) => {
    const executeCallback = async () => {
        try {
            const second = await  cb();
            setTimeout(executeCallback, second * 1000);
        } catch (error) {
            console.error("Error in TimerTick callback:", error);
        }
    };
    executeCallback();
};
const nextIssueTime =(draw_time)=>{
    const current = Math.ceil(Date.now() / 1000);
    const drawTime = Math.ceil(Date.parse(draw_time) / 1000);
    const interval =    drawTime - current;
    
    if(interval <= 0) {
       return 3;
    }
   return interval;
};

const ThikPHP = async (data)=>{
     const result =JSON.stringify(data);
     console.table(data);
    //  const command = `php /www/api.bc.test/think Lottery --data='${result}'`;
    //  exec(command,(error,stdout,stderr)=>{
    //     console.log(stdout);
    //  });
 }
const run  = async ()=>{
   const LotteryList  = await query("SELECT * FROM lottery_type WHERE 1");
   LotteryList.forEach( ({id,api_url,name}) => {
          TimerTick(async ()=>{
            const data=  await  PKTen.get(api_url);
            ThikPHP({...data,lottery_type_id:id});  // 转发到thinkPHP
            console.table({
              "期号":data['drawIssue'],
              "下期开奖剩余(秒)":nextIssueTime(data['drawTime']),
              "开奖时间":data['drawTime'],
              "游戏": name
            });
            return nextIssueTime(data['drawTime']);
            
        });
   });
}



run();