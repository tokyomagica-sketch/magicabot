const http = require('http');
//const html = require('fs').readFileSync('blocks.html');
const querystring = require('querystring');
const cron = require('node-cron');
const discord = require('discord.js');
const client = new discord.Client();

const PORT = process.env.PORT || 3000;

http.createServer((req, res)=>{
  if (req.method == 'POST'){
    var data = "";
    req.on('data', (chunk)=>{ data += chunk; });
    req.on('end',  ()=>{
      if(!data){ res.end("No post data"); return; }
      var dataObject = querystring.parse(data);
      //console.log("post:" + dataObject.type);
      if(dataObject.type&&dataObject.type == "wake"){
        console.log("Woke up in post");
        res.end('OK');
        return;
      }
      res.end('magicabot Okita Yo!');
    });
  }
  else if (req.method == 'GET'){
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end('magicabot Okita Yo!');
  };
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});


//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■　bot起動時　■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
client.on('ready', message =>{
  console.log('準備完了');
  client.user.setPresence({ game: { name: '東京魔力科' } });
});

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■　messageきたぞ(await使う用)　■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
client.on('message', async message => {
  
//■■■■■■■■■■　bot自身の発言を無視
  if (message.author.id == client.user.id || message.author.bot){return;}
  
  
  if (message.content.match(/^！！！！！再投稿！！！！！/)){
    const maemsgs = await message.channel.fetchMessages({limit:1})
    const maemsg = maemsgs.last();
    message.channel.send(maemsg.content.split('！！！！！再投稿！！！！！\n')[1]);
    maemsg.delete();
    return;
  }
  if (message.content.match(/^！書換くん！/)){
    const command = message.content.split(/\s|\n|　/);
    if(message.author.id=='433264793604980758'&&command.length==3){
      const before = command[1];
      const after  = (command[2].match(/delete|削除/i))?'':command[2];
      console.log('message.content : '+message.content);
      console.log('before : '+before);
      console.log('after : '+after);
      const logs   = await message.channel.fetchMessages({ limit:100 });
      console.log('logs.size : '+logs.size);
      await logs.forEach(log=>{
              console.log('log.content : '+log.content);
              const newcontent = log.content.replace(new RegExp(before,'g'), after);
              console.log('newcontent : '+newcontent);
              log.edit(newcontent).catch(()=>{console.log('error');return;});
            });
      message.delete();
      message.channel.send(before+' → '+after+'\n書き換えました。');
    }
    else{
      message.delete();
      message.channel.send('コマンドに誤りがあるか、管理者による入力が行われていません。');
    };
    return;
  }
  if(message.content.match(/^全部全部おまえのものにしてくれ！$/)&&!message.author.bot){
    await message.delete();
    const messages = await message.channel.fetchMessages({limit:100});
    const contentlist = [];
    await messages.forEach(m => { contentlist.unshift(m.content);
                                  m.delete(); });
    await contentlist.forEach(content => { message.channel.send(content); });
    await message.channel.send('おわったよ～！');
    console.log('再投稿おわったよ～！');
    return;
  };
  //書き換えたうえで全部投稿しなおします　ちょっと挙動怪しいかもしれんので注意すぎる
  if(message.content.match(/^！書換さん！/)&&!message.author.bot){
    const command = message.content.split(/\s|\n|　/);
    if(message.author.id=='433264793604980758'&&command.length==3){
      await message.delete();
      const messages = await message.channel.fetchMessages({limit:100});
      const alllines = messages.map(m=>m.content.replace(new RegExp(command[1],'g'),command[2]))
                       .reverse().join('\n').split('\n').filter(line=>line!=='deleted');
      const nclist = [''];
      let ncindex = 0;
      for(let i=0; i<alllines.length; i++){
        if(nclist[ncindex].length + alllines[i].length > 2000){
          nclist.push(''); ncindex++;
        }
        nclist[ncindex] += (nclist[ncindex].length ? '\n' : '') + alllines[i];
      };
      await nclist.forEach(nc => message.channel.send(nc) );
      await messages.forEach(m => m.delete() );
      await message.channel.send('おわったよ～！');
      console.log('再投稿おわったよ～！');
      return;
    }
    else{
      message.delete();
      message.channel.send('コマンドに誤りがあるか、管理者による入力が行われていません。');
    };
    return;
  };
  
//■■■■■■■■■■　magisa
  if(message.content.match(/^(!|！){1,2}(ま(ぎさ)?|マ(ギサ)?|ﾏ(ｷﾞｻ)?|魔|ma(gisa)?)(\s|　|、)/i)&&!message.author.bot){
    console.log('■■■■■■■■■■　message　■■■■■■■■■■\n▼ from ' + message.author.username + '\n' + message.content);
    const magisa = await require('./magisa'); //magisa.jsを参照
    magisa.main(client, message); //メンテ時はmainをmainteにすればいいよ
    return;
  };
  if(message.content.match(/^!magite/)&&!message.author.bot){
    console.log('■■■■■■■■■■　message　■■■■■■■■■■\n▼ from ' + message.author.username + '\n' + message.content);
    const magisa = await require('./magisa');
    magisa.main(client, message);
    return;
  };
  
//■■■■■■■■■■　penta
  if(message.content.match(/^(!|！)([ぺべへ](んた)?|[ペベヘ](ンタ)?|(ﾍﾟ|ﾍﾞ|ﾍ)(ﾝﾀ)?|pe(nta)?)(ふ(りー)?|フ(リー)?|ﾌ(ﾘｰ)?|f(ree)?)?/i)&&!message.content.match(/！てすぺん/)&&!message.author.bot){ 
    console.log('■■■■■■■■■■　message　■■■■■■■■■■\n▼ from ' + message.author.username + '\n' + message.content);
    const penta = await require('./penta');
    penta.main(client, message);
    return;
  };
  if(message.content.match(/^！てすぺん/)&&!message.author.bot){
    console.log('■■■■■■■■■■　message　■■■■■■■■■■\n▼ from ' + message.author.username + '\n' + message.content);
    const penta = await require('./penta');
    penta.main(client, message);
    return;
  };
  
//■■■■■■■■■■　ほかDM
  if (message.guild === null){
    console.log('■■■■■■■■■■　DM　■■■■■■■■■■\n▼ from '+message.author.username+'\n'+message.content);
    
    if(message.content.match(/の(ひみつ|ヒミツ|秘密)(\s|　)/)&&!message.author.bot){
      const magisa = require('./magisa'); //magisa.jsを参照
      magisa.newhimitsu(client, message);
      return;
    };
    if(message.content.match(/の画像|の四月/)&&!message.author.bot){
      const magisa = require('./magisa'); //magisa.jsを参照
      magisa.setthumbnail(client, message);
      return;
    };
    if(message.content.match(/の(せりふ|セリフ|台詞)(\n|\s|　)+/)&&!message.author.bot){
      const penta = require('./penta'); //penta.jsを参照
      penta.serifu(client, message);
      return;
    };
    if(message.content.match(/の(うそせりふ|嘘(せりふ|セリフ|台詞))(\n|\s|　)+/)&&!message.author.bot){
      const penta = require('./penta'); //penta.jsを参照
      penta.aprilserifu(client, message);
      return;
    };
    if(message.content.match(/の(おきにいり|お気に入り|ろぐいん|ログイン|すてーたす|ステータス)(せりふ|セリフ|台詞)(\n|\s|　)+/)&&!message.author.bot){
      const penta = require('./penta'); //penta.jsを参照
      penta.fserifu(client, message);
      return;
    };
    if(message.content.match(/の(まっくす|マックス|ﾏｯｸｽ|max)/i)&&!message.author.bot){
      const penta = require('./penta'); //penta.jsを参照
      penta.maxthumbnail(client, message, 'MAX');
      return;
    };
    if(message.content.match(/の(えくすとら|エクストラ|ｴｸｽﾄﾗ|extra)/i)&&!message.author.bot){
      const penta = require('./penta'); //penta.jsを参照
      penta.maxthumbnail(client, message, 'EXTRA');
      return;
    };
    if(message.content.match(/の(くいず|クイズ)(\n|\s|　)+/)&&!message.author.bot){
      const penta = require('./penta'); //penta.jsを参照
      penta.quiz(client, message);
      return;
    };
  }

});

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■　時報だぞ　■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

//0時の誕生日おしらせ！
cron.schedule('0 0 15 * * *', () => {
  const magisa = require('./magisa');
  magisa.todayis(client);
});
/*

//ひみつ時報 通常 12時
cron.schedule('0 0 3 * * 1-6', () => {
  const magisa = require('./magisa');
  magisa.himitsu(client, '');
});

//ひみつ時報 日曜 6時・12時・18時
cron.schedule('0 0 21 * * 6', () => { //土曜21時　→　日曜6時
  const magisa = require('./magisa');
  magisa.himitsu(client, '【日曜版】');
});
cron.schedule('0 0 3,9 * * 7', () => { //日曜3・9時　→　日曜12・18時
  const magisa = require('./magisa');
  magisa.himitsu(client, '【日曜版】');
});

*/

//ひみつ時報 通常 12時
cron.schedule('0 0 3 * * 1-6', () => {
  const magisa = require('./magisa');
  magisa.himitsu(client, '');
});
//ひみつ時報 日曜 12時
cron.schedule('0 0 3 * * 7', () => {
  const magisa = require('./magisa');
  magisa.himitsu(client, '【日曜版】');
});


//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■　以下システムとかいろいろ　■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
if(process.env.DISCORD_BOT_TOKEN == undefined){
 console.log('DISCORD_BOT_TOKENが設定されていません。');
 process.exit(0);
}
client.login( process.env.DISCORD_BOT_TOKEN );