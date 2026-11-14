exports.mainte = async function(client, message){
  const pata = await require('./pentadata');
  PentaResult(message.channel, '', pata.pentaname, '', '🔨整備中', 'すまぬ……！', pata.color, '', '', '')
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★メイン　■■■■■■■■■■■■■■■■■■■■
exports.main = async function(client, message){
  console.log('■■■■■■■■■■penta.js■■■■■■■■■■');
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照
  const pata = await require('./pentadata');
  const tools = await require('./tools'); //ツール用のtools.jsを参照jsを参照
  /*const command = message.content.split(/\s|　|、/) //コマンド配列を作ります
                .map(function(c){ let result = tools.fullkatakanize(c); //半角カナを全角カナに変換
                                      result = tools.ANhalve(result);   //全角英数字を半角英数字に変換
                                      result = tools.hiraganize(result);//全角カナを全角ひらに変換
                                  return result});*/
  const commandorig = message.content.split(/\s|　|、/) //コマンド配列を作ります
                      .map(c=>{ let result = tools.fullkatakanize(c); //半角カナを全角カナに変換
                                    result = tools.ANhalve(result);   //全角英数字を半角英数字に変換
                                return result});
  const command = commandorig.map(c=>tools.hiraganize(c));//全角カナを全角ひらに変換
  command[0] = command[0].replace(/^[!！]([ぺべへ](んた)?|てすぺん)/, '')
  const player = (command[0].match(/^(ふ|f)/i)) ? 0 : 1; //フリー版なら0、プレイヤー登録版なら1
  console.log('■■■'+message.author.username+' player:'+player);
  //■イベント情報
  const event = await getEvent(pata.eventlist); if(event) console.log('■イベント : '+event.name);
  
  let ftype = 'penta'; //function type
  if     (command[0].match(/^が/i))                   ftype = 'gacha';
  //else if(command[0].match(/10$/i))                 ftype = '10pre';
  //else if(command[0].match(/3$/i))                  ftype = '3pre';
  else if(command[0].match(/^ず$/i))                  ftype = 'status';
  else if(command[0].match(/^し/i))                   ftype = 'shop';
  else if(command[0].match(/^え$/i))                  ftype = 'lvex';
  else if(command[0].match(/^よ$/i))                  ftype = 'invite';
  else if(command[0].match(/^べ$/i))                  ftype = 'best';
  else if(command[0].match(/^わ$/i))                  ftype = 'worst';
  else if(command[0].match(/^て$/i))                  ftype = 'theme';
  else if(command[0].match(/^ま$/i))                  ftype = 'myfx';
  else if(command[0].match(/^お$/i))                  ftype = 'favorite';
  else if(command[1]&&command[1].match(/test|てすと/)) ftype = 'pentatest';
  else if(command[0].match(/^こ$/i)){ pentanews(client,pata,message,command); return;}
  else if(command[0].match(/^へ$/i)){ pentahelp(pata,message,command); return;}
  else if(command[0].match(/^配布$/i))                 ftype = 'haifu';
  else if(command[0].match(/^書換$/i))                 ftype = 'kakikae';
  else if(command[0].match(/^い$/i))                  ftype = 'event';
  else if(command[0].match(/^で$/i))                  ftype = 'data';
  
  //■■プレイ
  if(player){ //■■登録版
    const plogch = client.channels.cache.get(pata.playerlog);  //プレイヤーログ保存場所
    const plogs  = await plogch.messages.fetch({ limit:100 });
    const plog   = await plogs.find(m => m.content.includes(message.author.id)); //プレイヤーログメッセージ(読取・書込対象)
    
    if(command[0].match(/削除/)){
      plog.delete();
      PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), 'ユーザーデータを削除しました。', '', pata.color);
      return;};

    if(!plog && ftype!=='gacha'){ //ユーザーなし
      PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), 'ユーザー登録がありません。', 'コマンド「！ぺが」などから初回ガチャを引くとユーザー登録がされます。', pata.color, '', '' );
    }
    else{ //ユーザーあり
      
      const today  = tools.getDateText();
      let ploga  = []; //プレイヤーログ配列(分割データ)
      
      //■ヘッダー投稿
      let title = '';
      let description = '';
      let thumbnailurl = '';
      
      if(!plog && ftype=='gacha'){ //ログがない　かつ　ガチャ
        const playername = (message.member) ? message.member.displayName : message.author.username ;
        title = playername+' さん '+pata.pentaname+'へようこそ！';
        description = 'ユーザー登録・初回ガチャ(10人)を行います。\n'+pata.pentaname+'は「東京魔力科」のキャラクターカードを集めて、ドローした5枚の共通点やパターンを揃えて得点を稼ぐゲームです。\n'
                    + '稼いだ得点は経験値(累計p)及びコイン🪙(c)として獲得でき、貯めるごとにガチャチケット🎫等を得られるようになります。\n'
                    + '───────────────────\n'
                    + '__▼機能の一例__\n'
                    + '⭐ゲームプレイ ... 「！ぺ」\n'
                    + '🎫ガチャ(通常) ... 「！ぺが」\n'
                    + '🧧ガチャ(封筒) ... 「！ぺがす」\n'
                    + '🎟️指名 ... 「！ぺよ　(名前)」\n'
                    + '🏵️ステータス・図鑑 ... 「！ぺず」\n'
                    + '🛍️SHOP ... 「！ぺし」\n'
                    + '❓ヘルプ ... 「！ぺへ」\n'
                    + '───────────────────\n'
                    + 'ガチャ完了後、新規にガチャチケット 🎫×'+pata.ticketNew+'・⭐4以上確定ガチャ封筒🧧×'+pata.envelopeNew+'・指名招待券🎟️×'+pata.inviteNew+' を配布するのでぜひ遊んでみてくださいね！\n'
                    + '他にもその日初めての'+pata.pentaname+'起動時、'+pata.pentaname+'での'+pata.ticketThreshold+'p達成時などにチケットを獲得できます。\n'
                    + '⚠️メッセージが出切るまでに少し時間がかかる場合があります。コマンドを連投せずにお待ちください。';
      }
      else{
        ploga  = await plog.content.split('\n');
        let logitems = ploga[3].split(':');
        
        if(ploga[2] !== today){ //最終日が今日でない場合
          
          //■■■お気に入り系ここから
          let fserifu='';
          const flogch   = client.channels.cache.get(pata.favoritelog);
          const flogs    = await flogch.messages.fetch({ limit:100 });
          const flog     = await flogs.find(fv => fv.content.includes(message.author.id));
          if(flog){
            const favorite = flog.content.split('\n');
            const fid = (!favorite[2]||favorite[2]=='favorite') ? favorite[1] : favorite[2];
            if(fid!=='none'){
              const april = (tools.getDateText().match(/\/4\/1$/));
              const orcards = data.characters.filter(c => c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm');
              const spcards = pata.spcards(orcards);
              //const characters = orcards.concat(spcards.filter(c => !(c.eventid&&c.eventid=='PSEUDO')||c.id.match(/くらまえ/)));
              const characters = orcards.concat(spcards);
              const plogc    = ploga[8].split(/(?<=\d)/).map(c => [c.slice(0,-1), c.slice(-1)]); //プレイヤーログ・キャラクター配列 → [ ['あるとあ', '1'],['だいりお', '2'],['たまえろ', '3'] ] のようなもの
              const allcards = plogc.map(lc => characters.find(c => c.sid == lc[0]));
              
              //セリフ
              const smsgs1 = await client.channels.cache.get(pata.fspserifulogL).messages.fetch({ limit:100 });
              const smsgs2 = await client.channels.cache.get(pata.fserifulogL).messages.fetch({ limit:100 });
              const smsgs  = smsgs1.concat(smsgs2);
              const allsrflines = smsgs.map(message => message.content).join('\n').split('\n');
              let fchr;
              if(fid=='random'){const choices = allcards.filter(c => allsrflines.some(sl=>sl.startsWith(c.name+'＠＠')));
                                fchr = choices[Math.floor(Math.random()*choices.length)]; }
              else              fchr = allcards.find(c => c.id == fid);
              const chrsrflines = allsrflines.filter(line => line.includes(fchr.name+'＠＠') );
              fserifu = ((chrsrflines.length>0) ? tools.emj(fchr)+fchr.name+'\n```「' + chrsrflines[Math.floor(Math.random()*chrsrflines.length)].split('＠＠')[1] + '」```\n' : '');
              
              //サムネ
              const tchids = [];    tchids.unshift(data.DataSet[fchr.genre]['Thumbnail']);
              if(fchr.eventid)      tchids.unshift(pata.sptnlog);
              if(fchr.collected>=5) tchids.unshift(pata.maxtnlog);
              if(fchr.collected==7) tchids.unshift(pata.extratnlog);
              if(april)             tchids.unshift(data.DataSet.april['Thumbnail']);

              let ti = 0; console.log('tchids : '+tchids);
              do{ console.log('ti : '+ti);
                    const tmsgs = await client.channels.cache.get(tchids[ti]).messages.fetch({ limit:100 });
                    const tmsg = await (tchids[ti]==pata.sptnlog||tchids[ti]==pata.maxtnlog||tchids[ti]==pata.extratnlog||(tchids[ti]==data.DataSet.april['Thumbnail']&&fchr.eventid&&fchr.eventid.match(/PSEUDO|SECRET/))) //完全一致の条件
                                 ? tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.split('：')[0]==fchr.name)
                                 : tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(fchr.name.split('(')[0]));
                    if(tmsg) thumbnailurl = tmsg.split('：')[1]; console.log('thumbnailurl : '+thumbnailurl);
                    ti++;
              }while(!thumbnailurl&&ti<tchids.length);console.log('thumbnailurl : '+thumbnailurl);
  
              if(!thumbnailurl) thumbnailurl = data.noimage;
            };
          };
          //■■■お気に入り系ここまで
          
          logitems[0] = Number(logitems[0])+pata.ticketDaily;
          description = fserifu+'ログインボーナス 🎫×'+pata.ticketDaily+' を獲得しました！(残り 🎫×'+logitems[0]+') ';
          
          if(logitems[5]&&logitems[5]!=='0'){ //イベント参加情報がある
            const logevent = logitems[5].split('/');
            if(!event||(event&&event.id!==logevent[0])){ //今イベント時期でないか、今のイベントと違う
              const oldevent = pata.eventlist.find(e=>e.id==logevent[0]);
              
              const splogch = client.channels.cache.get(pata.speciallog);
              const splogs = await splogch.messages.fetch({ limit: 100 });
              const splog = await splogs.find(m => m.content.includes(message.author.id + " "+oldevent.id) );
              
              //if(oldevent.endprocess){oldevent.endprocess({client:client, message:message, data:data});};
              let ps='';
              if(oldevent.endprocess){const endlog = oldevent.endprocess({client:client, message:message, data:data,
                                                                          ploga:ploga, logitems:logitems, splog:splog});
                                         if(endlog&&endlog.ploga)    ploga    = endlog.ploga;
                                         if(endlog&&endlog.logitems) logitems = endlog.logitems;
                                         if(endlog&&endlog.ps)       ps       = endlog.ps; };
              const logeventitems = logevent[1].split(' ');
              const logpoints = ploga[5].split(':');
              const itemtocoin = logeventitems.map((item,index) => Number(item)*oldevent.item[index].over).reduce((a,b)=>a+b);
              logpoints[2] = Number(logpoints[2]) + itemtocoin;
              ploga[5] = logpoints.join(':');
              logitems[5] = 0;
              description += '\n\n'+oldevent.emoji+'【'+oldevent.name+'】は終了しました。'+ps;
              if(itemtocoin) description += '\nイベントアイテムの残りを '+itemtocoin+'c として取得しました。';
              
            }
          };
          
          const newsmessages = await client.channels.cache.get(pata.newslog).messages.fetch({ limit:100 });
          description += '\n\n🆕 最近の更新情報 🆕\n'+newsmessages.first(2).map(m=>m.content).join('\n');
        };
        
        if(event){ //イベント時期である → イベント紹介投稿 か イベント参加情報付与
          if(ploga[2] !== today ||!logitems[5]||logitems[5]=='0'){ //本日の初起動、またはイベント参加情報がない → イベント紹介投稿
            const etitle = event.emoji+'【'+event.name+'】開催中！';
            event.start.split('-').map(n=>n.replace(/^0+/,'')).join('/')
            const edescription = '🗓️期間 : '+ event.start.split('-').map(n=>n.replace(/^0+/,'')).join('/')
                               + ' ～ '   + event.end.split('-').map(n=>n.replace(/^0+/,'')).join('/')
                               + '```'     + event.description+'```ガチャ：「！ぺがい」 詳細：「！ぺい」';
            await PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), etitle, edescription, event.color);
          };
          if(!logitems[5]||logitems[5]=='0'){ //イベント参加情報がない → イベント参加情報付与
            const eventitemArray = new Array(event.item.length).fill(0);
            logitems[5] = event.id+'/'+eventitemArray.join(' ');
            if(event.startprocess) event.startprocess({client:client, message:message, data:data, ploga:ploga});
          }
        };
        
        ploga[2] = today;
        ploga[3] = logitems.join(':');
        await plog.edit(ploga.join('\n'));
      };
      if(description){
        PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), title, description, pata.color, '', '', thumbnailurl);
      };
      
      //■機能分岐
      const inputObject = {client:client, data:data, pata:pata, tools:tools,
                           message:message, command:command, commandorig:commandorig, ftype:ftype, player:player,
                           plogs:plogs, plog:plog, ploga:ploga, event:event};
      if     (ftype=='penta'||ftype=='pentatest'){ //ペンタ
        if(ftype=='pentatest'&&command.length < 3) PentaResult(message.channel, '', '', '', 'コマンドに不足があります。', '', pata.color, message.author.displayAvatarURL(), pata.pentaname);
        else{
          const testcards = (ftype=='pentatest') ? commandorig.slice(2) : [] ;
          penta(client, data, pata, tools, message, commandorig, player, testcards, plogch, plog, ploga, event);
        };
      }
      else if(ftype=='gacha'){
        let special = 0; let hundred = false;
        if(plog && command[0].replace(/^が(ちゃ)?/, '').match(/^す(ぺ(しゃる)?)?$/i)) special = 1;
        if(plog && command[0].replace(/^が(ちゃ)?/, '').match(/^い(べ(んと)?)?/i)) special = 2;
        if(command[0].match(/ひ(ゃく)?$/)) hundred = true;
        if     (special==1&&ploga[3]&&ploga[3].split(':')[1]<1){ //チケットなし
          PentaResult(message.channel, '', '', '', '', '🧧×'+Number(ploga[3].split(':')[1])+' 封筒が不足しています。\nプレイヤーLv上昇(10毎)した際に封筒を獲得できるほか、ショップでコイン🪙(c)を使って封筒を購入できます。', pata.color, message.author.displayAvatarURL(), pata.pentaname, '' );
        }
        else if(special!==1&&ploga[3]&&((!hundred&&ploga[3].split(':')[0]<1)||(hundred&&ploga[3].split(':')[0]<20))){ //チケットなし
          PentaResult(message.channel, '', '', '', '', '🎫×'+Number(ploga[3].split(':')[0])+' チケットが不足しています。\nその日初めての'+pata.pentaname+'起動時、'+pata.pentaname+'での'+pata.ticketThreshold+'p達成時、プレイヤーLv上昇時などにチケットを獲得できるほか、ショップでコイン🪙(c)を使ってチケットを購入できます。', pata.color, message.author.displayAvatarURL(), pata.pentaname, '' );
        }
        else{
          if(special==2&&!event){ special = 0;
            await PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), '', '現在開催されているイベントはありません。通常のガチャを行います。', pata.color);
          };
          pentagacha(client, data, pata, tools, message, command, plogch, plog, ploga, event, special, hundred);
        }; //チケットあり
      } 
      //else if(ftype=='10pre')   pentatenp(   client,data,pata,      message,            plog,ploga);
      //else if(ftype=='3pre')    pentathrp(   client,data,pata,      message,            plog,ploga);
      else if(ftype=='status')           pentazukan(inputObject);
      else if(ftype=='shop')             pentashop(inputObject); 
      else if(ftype.match(/best|worst/)) pentabestworst(inputObject);
      else if(ftype=='theme')            pentatheme(inputObject);
      else if(ftype=='myfx')             pentamyfx(inputObject);
      else if(ftype=='favorite')         pentafavorite(inputObject);
      else if(ftype=='lvex')     pentalvextra(inputObject);
      else if(ftype=='invite')   pentainvite(inputObject);
      else if(ftype=='haifu')    pentahaifu(inputObject);
      else if(ftype=='kakikae')  pentakakikae(inputObject);
      else if(ftype=='event')    pentaevent(inputObject);
      else if(ftype=='data')     pentaabout(inputObject);
    };
  }else{ //■■フリー版
    //ペンタ
    if(ftype=='pentatest'&&command.length < 3) PentaResult(message.channel, '', '', '', 'コマンドに不足があります。', '', pata.color, '', pata.pentaname, '' );
    else{
      //■機能
      const testcards = (ftype=='pentatest') ? commandorig.slice(2) : [] ;
      penta(client, data, pata, tools, message, commandorig, player, testcards);
    };
  };
  return;
}

//■■■■■■■■■■■■■■■■■■■■　★マギカペンタ　■■■■■■■■■■■■■■■■■■■■
async function penta(client, data, pata, tools, message, command, player, testcards, plogch, plog, ploga, event){
  console.log('■■■■■MAGICA-PENTA■■■■■');
  const oldploga = (ploga)?ploga.map(p=>p):[]; //開始時点でのploga
  
  //■■共通準備　計算用
    const test = (0 < testcards.length);
    //■カード
    const orcards    = data.characters.filter(c => c.genre == 'stTm'||c.genre == 'tcTm'||c.genre == 'otTm');
    orcards.forEach(c=>{c.collected=1;c.probadd=0;c.basicadd=0;c.basicmul=0;});
    const spcards    = pata.spcards(orcards);
    const characters = orcards.concat(spcards);
    let plogc      = []; //所持カードログ → [ ['あるとあ', '1'],['だいりお', '2'],['たまえろ', '3'] ] のようなもの
      let ownedcards = []; //所持カード
        let allcards   = []; //所持生徒カード
          let cards      = []; //引いた生徒カード
        let allTcards  = []; //所持教師・関係者カード
          let Tcards     = []; //引いた教師・関係者カード
    //プレイヤーかフリーか
    if(player){ plogc    = ploga[8].split(/(?<=\d)/).map(c => [c.slice(0,-1), c.slice(-1)]);
                ownedcards = plogc.map(lc => { const chr = JSON.parse(JSON.stringify(characters.find(c => c.sid == lc[0])));
                                               chr.collected=Number(lc[1]);
                                               return chr; }); }
    else      { ownedcards = orcards;
                //ownedcards.forEach(c => c.collected = 1);
              };
    //ownedcards.forEach(c => c.probadd = 0); //確率加算
    allcards  = ownedcards.filter(c=>c.genre=='stTm');
    allTcards = ownedcards.filter(c=>c.genre=='tcTm'||c.genre=='otTm');
  
  //■■共通準備　表示用
    //■テーマ
    const tm = (player) ? pata.themes.find(t=>t.id==ploga[7].split('/')[0]) : pata.themes.find(t=>t.id=='df') ;
    let pentaname = (tm.pentaname) ? tm.pentaname : pata.pentaname;
    if(!player) pentaname = pentaname + '【フリー版】';
    let footertxt = '';
  
  //■■共通準備　ログ用
  //const today = tools.getDateText();
  
  
  //■■■■■■■■■■プロフィール機能への分岐■■■■■■■■■■
  if(command[1]&&!test){
    // if(command.length>2) PentaResult(message.channel, '', '', '', '', pentaname+'のカードデータ表示は3節以上のコマンドに対応していません。「'+command[1]+'」での検索を行います。', pata.color);
    const regname = /(先生|せんせい|せんせー|先輩|せんぱい|ぱいせん|部長|ぶちょう|委員長|いいんちょう)$/g ;
    if(command[1].match(regname)) command[1] = command[1].replace(regname, '');
    const chr = await tools.getCharacter(characters, command[1]);
    const playericon = (player) ? message.author.displayAvatarURL() : '' ;
    if(chr == 'multiple') PentaResult(message.channel, '', '', '', '', command[1]+'は複数のキャラに使用されています。表記を変更してお試しください。', pata.color, playericon, pentaname);
    else if(!chr){
      const aObj = tools.convertAlias(data.authors, command[1].split(data.authorunit)[0], 'name', 'alias');
      if(aObj.index > -1){ pentafxlist(characters.filter(c => c['author']==aObj.nameA), aObj.nameA, pata, tools, message);}
      else PentaResult(message.channel, '', '', '', '', command[1]+'はデータにありません。表記を変更してお試しください。', pata.color, playericon, pentaname);
    }
    else pentaprofile(chr, ownedcards, client, data, pata, tools, message, command, player, event);
    return;
  }
  
  
  const loading = await message.channel.send('計算中 そのままお待ちください...');
  
  //■■■■■■■■■■ドロー■■■■■■■■■■
  console.log('■ドロー');
  if(test){const testmax=(tools.hiraganize(command[1]).match(/ま(っくす)?|max/i))?true:false;
           const testex=(tools.hiraganize(command[1]).match(/え(くすとら)?|extra/i))?true:false;
           if(testmax){ allcards.forEach(c=>c.collected=5);
                        allTcards.forEach(c=>c.collected=5); };
           if(testex) { allcards.forEach(c=>c.collected=7);
                        allTcards.forEach(c=>c.collected=7); };
           testcards.forEach((t,i) =>{ if(t=='だみー'||t=='ダミー'){
                                         const dum = JSON.parse(JSON.stringify(pata.additional.find(a=>a.id=='だみー'+i)));
                                         //dum.id+=i;
                                         dum.collected=(testmax)?5:(testex)?7:1;
                                         cards.push(dum);
                                       }
                                       else if(t=='らんだむ'||t=='ランダム'){
                                         const choices = allcards.filter(ac=>cards.every(cc=>cc.id.slice(0,4)!==ac.id.slice(0,4)));
                                         const ran = choices[Math.floor(Math.random()*choices.length)];
                                         //ran.collected=(testmax)?5:(testex)?7:ran.collected;
                                         cards.push(ran);
                                       }
                                       else{
                                         let chr = tools.getCharacter([...allcards, ...allTcards], t); //持ってるカードから
                                         if(chr=='multiple') cards.push(t);
                                         else if(!chr){
                                           chr = tools.getCharacter(characters, t); //持ってないカードから
                                           if(chr=='multiple'||!chr) cards.push(t);
                                           else{ chr = JSON.parse(JSON.stringify(chr));
                                                 chr.collected=(testmax)?5:(testex)?7:1; };
                                         }
                                         else{ chr = JSON.parse(JSON.stringify(chr));};

                                         if(chr.genre=='stTm') cards.push(chr)
                                         else Tcards.push(chr);
                                       }
                                     });
           if(cards.some(tc=>!tc.id)){
             await loading.delete();
             PentaResult(message.channel, '', '', '', '', cards.find(tc=>!tc.id)+'は複数のキャラに使用されているか、データにありませんでした。表記を変更してお試しください。', pata.color, ((player)?message.author.displayAvatarURL():''), pentaname);
             return;
           };
           if(([...new Set(cards.map(c=>c.id.slice(0,4)))].length<cards.length)
             ||(Tcards.length&&[...new Set(Tcards.map(c=>c.id.slice(0,4)))].length<Tcards.length)){
             console.log('・ドロー結果(重複) : '+cards.map(c => c.id)+(Tcards.length?' / '+Tcards.map(c=>c.id):''));
             await loading.delete();
             PentaResult(message.channel, '', '', '', '', 'キャラが重複しています。内容を変更してお試しください。\n※ランダムテストを行っている場合、ランダム節は自身より前の節との重複回避のみが可能であることにご留意ください。', pata.color, ((player)?message.author.displayAvatarURL():''), pentaname);
             return;
           };
          }
  else{ do{cards = tools.shufflenum(allcards, 5);}while([...new Set(cards.map(c=>c.id.slice(0,4)))].length<5); };
  cards = cards.map(c => pata.getnature(c)); //特性
  console.log('・ドロー結果 : '+cards.map(c => c.emoji+c.id).join('/'));
  
  //■■■■■■■■■■計算準備■■■■■■■■■■
  //■■材料
  //■全体用
    let totalP = 0; //総合得点
    let bonusC = 0; //追加獲得コイン
    let bonusT = 0; //追加獲得チケット(得点によらないもの)
    let bonusE = 0; //追加獲得封筒(得点によらないもの)
    let bonusJ = 0; //追加獲得宝珠(得点によらないもの)
    let bonusI = 0; //追加獲得招待券(得点によらないもの)
    let bonusR = 0; //追加獲得リボン(得点によらないもの)
    let ticket = 0; //チケット獲得数
    let jewel  = 0; //宝珠獲得数
    let report = 0; //レポ獲得数
    let ribbon = 0; //リボン獲得数
    let zorome = false;
    let kiriban= false;
    let best = false; let worst = false;
    let ndate = tools.getTodayJp(); //日付取得
    const realDate = tools.getTodayJp(); //時間取得
    let   season   = getSeason(realDate); console.log('・デフォルト季節 : '+season);//デフォルトの季節
    let   gameDate = new Date(realDate.getTime()); //ゲーム用時間
  //■表示に関する項目
    let bestscoremessage = '';//ベストスコア部分のメッセージ
    let resultlist = []; //得点内容リスト
    const teacherhr = tm.teacherhr;
    const resulthr = tm.resulthr;
    let prefields = []; //特殊効果等を格納するリスト
  //■効果影響などのための枠
    let noteacher = false;
    let emjrepeat = 1; //絵文字リピート数：■柳瀬ことり
    let coinmul = 1; //獲得コインにかける数：■豪徳寺招子 ■三善祈依那
    const addepisodes = []; //追加エピソード：■東麻生原品
    const eventitems = event ? Array(event.item.length).fill(0) : [] ; //イベントアイテム追加獲得
    const eventitemsmul = event ? Array(event.item.length).fill(1) : [] ; //イベントアイテム獲得数にかける数
    let trillion = '';
  
    const logheader = '■■■■■' + message.author.id + ' ' + message.author.username;
  //■効果記録
    const klogch = client.channels.cache.get(pata.keeplog);
    let klog = undefined;
    let keepsbefore = [logheader];
    if(player){const klogs  = await klogch.messages.fetch({ limit:100 });
               klog = await klogs.find(m => m.content.includes(message.author.id));
               if(klog){ keepsbefore = klog.content.split('\n'); };
              };
    const keeps = Array.from(keepsbefore); keeps[0] = logheader;
  //■設定記録
    const slogch = client.channels.cache.get(pata.settingslog);
    let slog = undefined;
    let settingsbefore = [logheader, 'none', 'favorite', 'favorite', 'テーマ/df/df', 'My効果/df/df'];
    if(player){const slogs  = await slogch.messages.fetch({ limit:100 });
               slog = await slogs.find(set => set.content.includes(message.author.id));
               
               //ここからふっとんだ 2022.09.21
               
               if(slog) settingsbefore = slog.content.split('\n');
              };
    let settings = [...settingsbefore];
  //■イベント用ログとか
    let splogs = undefined;
    let speciallog = undefined;
    let speciallogcontent = undefined;
    if(player&&event){splogs = await client.channels.cache.get(pata.speciallog).messages.fetch({ limit:100 });
                      speciallog = await splogs.find(m => m.content.includes(message.author.id+' '+event.id));
                     };
    let raidlog = undefined;
    if(player&&!test&&event&&event.raid) raidlog = await splogs.find(m => m.content.includes('RAID '+event.id));
  //■クイズログとか
    let quizlist = undefined;
    if(!test&&player&&event&&event.id=='QUIZ'){
      const qlogs = await client.channels.cache.get(pata.quizlog).messages.fetch({ limit:100 });
      quizlist = qlogs.map(m=>m.content).join('\n').split('\n').map(m=>m.split('＠＠'));
    };
  //■かるたログとか
    let cartalist = undefined;
    if(!test&&player&&event&&event.id=='NEWYEAR'){
      const clogs = await client.channels.cache.get(pata.cartalog).messages.fetch({ limit:100 });
      cartalist = clogs.map(m=>m.content).join('\n').split('\n').map(m=>{const line = m.split('＠＠'); return {head:line[0], text:line[1], ids:line[2].split('・')}});
    };
  //■その他セリフが必要なときは使って
    let omsgs = [];
    if(player&&klog&&( klog.content.includes('キャンプカレー/7')  )){
      omsgs=await client.channels.cache.get(pata.otherserifulog).messages.fetch({ limit:100 });
    };
  //■事後投稿
    let raidMessageObj = undefined;
  
  
  //■■■■■■■■■■イベント前効果■■■■■■■■■■
  if(event&&event.preeffects&&!test){
    console.log('■イベント前効果');
    event.preeffects.forEach(e=>{
      //■■■inputオブジェクト
      const fxinput = {cards:cards, raidlog:raidlog};
      //■■■効果計算
      const o = e.f(fxinput);
      //■■■発動した場合
      if(o){ //処理がされていた場合
        if(o.error){
          console.log('エラー送信 '+o.title);
          client.channels.cache.get(pata.errorlog).send('【ERROR】```'+'\n効果名 : '+o.title+'\n'+o.message+'\n'+cards.map(c=>c.id).join('　')+'```');
          message.channel.send('```ERROR : 【'+o.title+'】\n効果エラーが発生したため、開発者へ情報を送信しました。該当効果を適用せずに続行します。```');
        }else{
          console.log('→ '+o.log.title+'発動');
          //■■諸々
          if(o.log.add) totalP += o.log.add;
          if(o.cards){ cards=o.cards; console.log('カード変更：'+o.cards.map(cc=>cc.emoji+cc.id).join('/')); };
          //■■記録
          o.log.name=event.emoji+'【'+o.log.title+'】'+(o.log.notes?o.log.notes:'');
          o.log.type='eventpre';
          prefields.push(o.log); console.log('o.log → '+o.log.title+' / '+o.log.type);
        };
      };

    });
  };

               
  //■■■■■■■■■■計算前効果(生徒)■■■■■■■■■■
  let docountB = 0; 
  let countB;
  do{
    console.log('docountB : '+docountB);
    let c = cards[docountB];
    let index = docountB;
    countB = 1; 
    const effects = pata.effects.filter(e => e.id==c.id&&e.phase.includes('前'));  
    if(effects&&effects.length&&!c.frozen){ //効果データがあって凍結していない場合
      console.log(c.id+'前effectアリ ×'+effects.length);
      for(let ei=0;ei<effects.length;ei++){
        const e = effects[ei]; console.log('！！！！！！！！！！！！！！！！！！！！！season　'+season);
        //■■■inputオブジェクト
        const fxinput = {message:message, test:test,
                         phase:'before', c:cards[docountB], index:index,
                         cards:cards, allcards:allcards,
                         Tcards:Tcards, allTcards:allTcards, characters:characters,
                         totalP:totalP, prefields:prefields,
                         season:season, realDate:realDate, date:gameDate, keeps:keeps, event:event, favoriteid:settings[1], myfx:((settings[5])?settings[5].split('/')[1]:'df'), tm:tm,
                         pata:pata };
        //■■■効果計算 
        const o = e.f(fxinput);
        //■■■発動した場合
        if(o){ //処理がされていた場合
          if(o.error){
            console.log('エラー送信 '+o.title);
            client.channels.cache.get(pata.errorlog).send('【ERROR】```カード名 : '+characters.find(ac=>ac.id==c.id).name+'\n効果名 : '+o.title+'\n'+o.message+'\n'+cards.map(c=>c.id).join('　')+'```');
            message.channel.send('```ERROR : 【'+o.title+'】\n効果エラーが発生したため、開発者へ情報を送信しました。該当効果を適用せずに続行します。```');
          }else{
            console.log('→ '+o.log.title+'発動');
            //■■トータル
            totalP=(o.log.force!==null) ? o.log.force : Math.floor(totalP * o.log.mul) + o.log.add;
            //■■諸々
            if(o.cards!==null){ cards=o.cards; console.log('・カード変更：'+o.cards.map(cc=>cc.emoji+cc.id).join('/')); };
            if(o.prefields!==null) prefields=o.prefields;
            if(o.count!==1) countB=o.count; //カードを進む数
            if(o.emjadd>0) emjrepeat+=o.emjadd;

            //ここまでふっとんだ 2022.09.21

            bonusC   +=o.coinadd;
            coinmul  *=o.coinmul;
            if(o.season!==null) season=o.season;
            if(o.date!==null) gameDate=o.date;
            if(o.keeptext!==null){const newkeep = o.log.title+'/'+o.keeptext;
                                  const kindex = keeps.findIndex(k=>k.includes(o.log.title));
                                  if(kindex>=0) keeps[kindex] = newkeep;
                                  else keeps.push(newkeep); };
            if(o.noteacher==true) noteacher=true;
            //■■記録
            o.log.name=tools.emj(c)+'【'+o.log.title+'】'+o.log.notes;
            prefields.push(o.log);
            //■■イベントアイテム
            if(event&&event.id==c.eventid&&o.log.fxtype.includes('event')){ eventitems   [o.log.eventitems.index]+=o.log.eventitems.add;
                                                                            eventitemsmul[o.log.eventitems.index]*=o.log.eventitems.mul;};
          };
        };
      };
    }else if(c.frozen) console.log('凍結');
    docountB+=countB;
  }while(docountB<cards.length);
  console.log('・前効果(生徒) totalP : '+totalP);  
  
  //■■■■■■■■■■生徒カード確定■■■■■■■■■■
  console.log('■生徒カード確定 : '+cards.map(c => c.emoji+c.id).join('/'));
  
  //■■■■■■■■■■教師ドロー■■■■■■■■■■
  console.log('■教師ドロー');
  if(allTcards.length>0&&!noteacher){
    const majorlist = [...new Set(cards.map(c=>c.major).filter(major=>major))];
    majorlist.forEach(major => {const mle = cards.filter(c=>c.major==major).length;
                                if(mle>=2){
                                  let tprob = (mle-1)*20; //0 20 40 60 80
                                  let tEnd = false;
                                  do{ const choices = allTcards.filter(t=>t.major==major&&!(Tcards.length>0&&Tcards.some(tt=>tt.id.includes(t.id.slice(0,4)))));
                                      if(choices.length>0 && Math.floor(Math.random()*100)<tprob){
                                        console.log('科目：'+major);
                                        Tcards.push(choices[Math.floor(Math.random()*choices.length)]);
                                        tprob/=4;
                                      }else tEnd=true;
                                  }while(tEnd==false);
                                };
                               });
    const clublist = [...new Set(cards.map(c=>c.club).join(' ').split(' ').filter(club=>club))];
    if(clublist.length>0){clublist.forEach(club => {const mle = cards.filter(c=>c.club.includes(club)).length;
                                                    if(mle>=2){
                                                      let tprob = (mle-1)*20;
                                                      if(data.characters.filter(chr=>chr.genre=='stTm'&&chr.club.includes(club)).map(chr=>chr.id).every(id=>cards.some(c=>c.id.includes(id)))&&tprob<80) tprob=80;
                                                      const choices = allTcards.filter(t=>t.advisor.includes(club+'部')&&!(Tcards.length>0&&Tcards.some(tt=>tt.id.includes(t.id.slice(0,4)))));
                                                      if(choices.length>0 && Math.floor(Math.random()*100)<tprob){
                                                        console.log('部活：'+club);
                                                        Tcards.push(choices[Math.floor(Math.random()*choices.length)]);
                                                      };
                                                    };
                                                   });
    };
    const committeelist = [...new Set(cards.map(c=>c.committee).filter(committee=>committee&&!committee.includes('生徒会')))];
    if(committeelist.length>0){committeelist.forEach(committee => {const mle = cards.filter(c=>c.committee==committee).length;
                                                                   if(mle>=2){
                                                                     let tprob = (mle-1)*20;
                                                                     if(data.characters.filter(chr=>chr.genre=='stTm'&&chr.committee==committee).map(chr=>chr.id).every(id=>cards.some(c=>c.id.includes(id)))&&tprob<80) tprob=80;
                                                                     const choices = allTcards.filter(t=>t.advisor.includes(committee+'委員会')&&!(Tcards.length>0&&Tcards.some(tt=>tt.id.includes(t.id.slice(0,4)))));
                                                                     if(choices.length>0 && Math.floor(Math.random()*100)<tprob){
                                                                       console.log('委員会：'+committee);
                                                                       Tcards.push(choices[Math.floor(Math.random()*choices.length)]);
                                                                     };
                                                                   };
                                                                  });
    };
  };
  if(Tcards.length>0){
    Tcards = Tcards.map(c => pata.getnature(c)); //特性
    console.log('■教師カード確定 : '+Tcards.map(c => c.emoji+c.id).join('/'));
  };
  
  //■■■■■■■■■■計算前効果(教師)■■■■■■■■■■
  if(Tcards.length>0){
    let docountBt = 0; 
    let countBt;
    do{
      console.log('docountBt : '+docountBt);
      let c = Tcards[docountBt];
      let index = docountBt;
      countBt = 1; 
      const effects = pata.effects.filter(e => e.id==c.id&&e.phase.includes('前'));  
      if(effects&&effects.length&&!c.frozen){ //効果データがあって凍結していない場合
        console.log(c.id+'前effectアリ ×'+effects.length);
        for(let ei=0;ei<effects.length;ei++){
          const e = effects[ei];
          //■■■inputオブジェクト
          const fxinput = {test:test,
                           phase:'before', c:c, index:index,
                           cards:cards, allcards:allcards,
                           Tcards:Tcards, allTcards:allTcards, characters:characters,
                           totalP:totalP, prefields:prefields,
                           season:season, realDate:realDate, date:gameDate, keeps:keeps, event:event, favoriteid:settings[1], myfx:((settings[5])?settings[5].split('/')[1]:'df'), tm:tm,
                           pata:pata };
          //■■■効果計算 
          const o = e.f(fxinput);
          //■■■発動した場合
          if(o){ //処理がされていた場合
            if(o.error){
              console.log('エラー送信 '+o.title);
              client.channels.cache.get(pata.errorlog).send('【ERROR】```カード名 : '+characters.find(ac=>ac.id==c.id).name+'\n効果名 : '+o.title+'\n'+o.message+'\n'+cards.map(c=>c.id).join('　')+'```');
              message.channel.send('```ERROR : 【'+o.title+'】\n効果エラーが発生したため、開発者へ情報を送信しました。該当効果を適用せずに続行します。```');
            }else{
              console.log('→ '+o.log.title+'発動');
              //■■トータル
              totalP=(o.log.force!==null) ? o.log.force : Math.floor(totalP * o.log.mul) + o.log.add;
              //■■諸々
              if(o.cards!==null){ cards=o.cards; console.log('カード変更：'+o.cards.map(cc=>cc.emoji+cc.id).join('/')); };
              if(o.Tcards!==null){ Tcards=o.Tcards; console.log('カード変更：'+o.Tcards.map(cc=>cc.emoji+cc.id).join('/')); };
              if(o.prefields!==null) prefields=o.prefields;
              if(o.count!==1) countBt=o.count; //カードを進む数
              bonusC   +=o.coinadd;
              coinmul  *=o.coinmul;
              if(o.season!==null) season=o.season;
              if(o.date!==null) gameDate=o.date;
              if(o.keeptext!==null){const newkeep = o.log.title+'/'+o.keeptext;
                                    const kindex = keeps.findIndex(k=>k.includes(o.log.title));
                                    if(kindex>=0) keeps[kindex] = newkeep;
                                    else keeps.push(newkeep); };
              if(o.noteacher==true) noteacher=true;
              //■■記録
              o.log.name=tools.emj(c)+'【'+o.log.title+'】'+o.log.notes;
              prefields.push(o.log);
              //■■イベントアイテム
              if(event&&event.id==c.eventid&&o.log.fxtype.includes('event')){ eventitems   [o.log.eventitems.index]+=o.log.eventitems.add;
                                                                              eventitemsmul[o.log.eventitems.index]*=o.log.eventitems.mul;};
            };
          };
        };
      }else if(c.frozen) console.log('凍結');
      docountBt+=countBt;
    }while(docountBt<Tcards.length);
    console.log('・前効果(教師) totalP : '+totalP);
  };
  
  
  //■■■■■■■■■■特殊ドロー■■■■■■■■■■
  console.log('■特殊ドロー');
  if(!noteacher){
    pata.drawings.forEach(d=>{
      const choices = allTcards.filter(c=>c.id.includes(d.id));
      if(choices.length>0&&!(Tcards.length>0&&Tcards.some(c=>c.id.slice(0,4)==d.id.slice(0,4)))){
        //■■■inputオブジェクト
        const drinput = {client:client, message:message,
                         cards:cards, allcards:allcards, Tcards:Tcards, allTcards:allTcards, characters:characters,
                         totalP:totalP, prefields:prefields, hour:gameDate.getHours()};
        //■■■効果計算
        const o = d.f(drinput);
        //■■■発動した場合
        if(o){ //処理がされていた場合
          if(o.error){console.log('エラー送信 '+o.title);
                      client.channels.cache.get(pata.errorlog).send('【ERROR】```特殊ドロー名 : '+o.title+'\n'+o.message+'\n'+cards.map(c=>c.id).join('　')+'```');
                      message.channel.send('```ERROR : 【'+o.title+'】\n特殊ドローエラーが発生したため、開発者へ情報を送信しました。該当特殊ドローを適用せずに続行します。```'); return ;};
          console.log('→ '+o.log.title+'発動');
          //■■追加
          const newcard = pata.getnature(choices[Math.floor(Math.random()*choices.length)]);
          if(o.target=='cards') cards.push(newcard);
          if(o.target=='Tcards') Tcards.push(newcard);
          //■■記録
          o.log.name='📥特殊ドロー：'+tools.emj(newcard)+o.log.title;
          prefields.push(o.log);
        }
      }
    });
  }
  else console.log('→noteacher');
  
  //■■■■■■■■■■カードリスト作成■■■■■■■■■■
  cards.forEach(c =>{ let lv = '';
                      if(c.collected!==1){let lvn;
                                          if     (c.collected<=4) lvn = c.collected;
                                          else if(c.collected==5) lvn = 'MAX';
                                          else if(c.collected==6) lvn = 'MAX+1';
                                          else if(c.collected==7) lvn = '💍';
                                          else if(c.collected==8) lvn = '💍+1';
                                          lv = ' [Lv.'+ lvn +']' } ;
                      if(!test&&event&&event.markprocess) lv+=event.markprocess({client:client, message:message, data:data, log:speciallog, allcards:allcards, c:c, id:c.id.slice(0,4), ploga:ploga, oldploga:oldploga, alibi:(c.alibi?true:false)}); 
                      resultlist.push(tools.emj(c).repeat(emjrepeat) + c.name
                                                                     + ((c.nature||c.frozen)?' ':'') + ((c.nature)?c.nature:'') + ((c.frozen)?'🚫':'')
                                                                     + lv); });
  if(Tcards.length>0){
    resultlist.push(teacherhr);
    Tcards.forEach(c =>{let lv = '';
                        if(c.collected!==1){let lvn;
                                            if     (c.collected<=4) lvn = c.collected;
                                            else if(c.collected==5) lvn = 'MAX';
                                            else if(c.collected==6) lvn = 'MAX+1';
                                            else if(c.collected==7) lvn = '💍';
                                            else if(c.collected==8) lvn = '💍+1';
                                            lv = ' [Lv.'+ lvn +']' } ;
                        if(!test&&event&&event.markprocess) lv+=event.markprocess({client:client, message:message, data:data, log:speciallog, allcards:allcards, c:c, id:c.id.slice(0,4), ploga:ploga, oldploga:oldploga, alibi:(c.alibi?true:false)}); 
                        resultlist.push((c.genre=='tcTm'?'🧑‍🏫教師':'関係者')+'：'+tools.emj(c).repeat(emjrepeat) + c.name
                                                                                                               + ((c.nature||c.frozen)?' ':'') + ((c.nature)?c.nature:'') + ((c.frozen)?'🚫':'')
                                                                                                               + lv); });
    
  };
  resultlist.push(resulthr);
  
  //■■■■■■■■■■誕生日判定■■■■■■■■■■
  const m = realDate.getMonth()+1;
  const d = realDate.getDate();
  const bdate = m+'/'+d;
  const uruu = (new Date(realDate.getFullYear(), 2, 0).getDate()===29);
  const bdcards = [...cards, ...Tcards].filter(c => c.birthday == bdate ||(bdate=='3/1'&&!uruu&&c.birthday=='2/29'));
  if(bdcards.length){
    console.log('■誕生日 : '+bdcards.map(c=>tools.emj(c)).join(''));
    const bdcardids = bdcards.map(c=>c.id);
    cards.forEach((c,index)=> {if(bdcardids.some(id=>c.id==id)){const newcard=JSON.parse(JSON.stringify(c));
                                                                newcard.basicadd+=10;
                                                                cards[index]=newcard; }; });
    Tcards.forEach((c,index)=>{if(bdcardids.some(id=>c.id==id)){const newcard=JSON.parse(JSON.stringify(c));
                                                                newcard.basicadd+=10;
                                                                newcard.basicmul+=0.5;
                                                                Tcards[index]=newcard; }; });
    prefields.unshift({type:'birthday', name:bdcards.map(c=>tools.emj(c)).join('')+'【🎂 Happy Birthday! 🎂】', value:' 通常計算による得点がそれぞれ10p増加。'+((bdcards.some(c=>c.genre=='tcTm'||c.advisor!==''))?'\n教師等の場合はグループ乗算の値も0.5増加。':'')});
  };
  
  //■■■■■■■■■■通常計算■■■■■■■■■■
  console.log('■通常計算');
  
  const bco = exports.pentabasiccalc({data:data, pata:pata, tools:tools, spcards:spcards, player:player, tm:tm, test:test, cards:cards, Tcards:Tcards,
                                      totalP:totalP, bonusC:bonusC, emjrepeat:emjrepeat, resultlist:resultlist});
  //参照渡しになっているから totalP bonusC resultlist は勝手に代入されている……？
  totalP = bco.totalP;
  bonusC = bco.bonusC;
  resultlist = bco.resultlist;
  const grouplog = bco.grouplog;
  const relationlog = bco.relationlog;
  let authoriconurl = bco.authoriconurl;//ペンタでアイコン出すテーマ用
  let pentamessage  = bco.pentamessage;//ペンタ部分のメッセージ
  
  //■■■■■■■■■■計算後効果■■■■■■■■■■
  for(let ci = 0; ci < 2 ;ci++){
    console.log(ci?'■後効果(教師)':'■後効果(生徒)');
    const targetcards = (ci) ? Tcards : cards;
    let docountA = 0; 
    let countA;
    if(targetcards.length>0){
      while(docountA<targetcards.length){
        console.log('docountA : '+docountA);
        let c = targetcards[docountA];
        let index = docountA;
        countA = 1; 
        const effects = pata.effects.filter(e => e.id==c.id&&e.phase.includes('後'));  
        if(effects&&effects.length&&!c.frozen){ //効果データがあって凍結していない場合
          console.log(c.id+'後effectアリ ×'+effects.length);
          effects.forEach((e,ei)=>{
            //■■■inputオブジェクト
            const fxinput = {message:message, test:test,
                             phase:'after', c:c, index:index,
                             cards:cards, allcards:allcards,
                             Tcards:Tcards, allTcards:allTcards, characters:characters,
                             pentamessage:pentamessage, totalP:totalP, resultlist:resultlist, grouplog:grouplog, relationlog:relationlog, prefields:prefields,
                             season:season, realDate:realDate, date:gameDate, keeps:keeps, event:event, favoriteid:settings[1], myfx:((settings[5])?settings[5].split('/')[1]:'df')};
            //■■■効果計算
            const o = e.f(fxinput);
            //■■■発動した場合
            if(o){ //処理がされていた場合
              if(o.error){
                console.log('エラー送信 '+o.title);
                client.channels.cache.get(pata.errorlog).send('【ERROR】```カード名 : '+characters.find(ac=>ac.id==c.id).name+'\n効果名 : '+o.title+'\n'+o.message+'\n'+cards.map(c=>c.id).join('　')+'```');
                message.channel.send('```ERROR : 【'+o.title+'】\n効果エラーが発生したため、開発者へ情報を送信しました。該当効果を適用せずに続行します。```');
              }else{
                console.log('→ '+o.log.title+'発動');
                //■■トータル
                totalP=(o.log.force!==null) ? o.log.force : Math.floor(totalP * o.log.mul) + o.log.add;
                //■■諸々
                if(o.cards!==null){ cards=o.cards; console.log('カード変更：'+o.cards.map(cc=>cc.emoji+cc.id).join('/')); };
                if(o.Tcards!==null){ Tcards=o.Tcards; console.log('カード変更：'+o.Tcards.map(cc=>cc.emoji+cc.id).join('/')); };
                if(o.resultlist!==null) resultlist=o.resultlist;
                if(o.prefields!==null) prefields=o.prefields;
                bonusC +=o.coinadd;
                coinmul*=o.coinmul;
                if(o.count!==1) countA=o.count; //カードを進む数
                addepisodes.push(...o.episodeadd);
                if(o.season!==null) season=o.season;
                if(o.date!==null) gameDate=o.date;
                if(o.keeptext!==null){const newkeep = o.log.title+'/'+o.keeptext;
                                      const kindex = keeps.findIndex(k=>k.includes(o.log.title));
                                      if(kindex>=0) keeps[kindex] = newkeep;
                                      else keeps.push(newkeep); };
                //■■記録
                o.log.name=tools.emj(c)+'【'+o.log.title+'】'+o.log.notes;
                prefields.push(o.log); console.log('o.log → '+o.log.title+' / '+o.log.type+' / '+o.log.fxtype);
                //■■イベントアイテム
                if(event&&event.id==c.eventid&&o.log.fxtype.includes('event')){ eventitems   [o.log.eventitems.index]+=o.log.eventitems.add;
                                                                                eventitemsmul[o.log.eventitems.index]*=o.log.eventitems.mul;};
                //■■特殊
                if(o.trillion) trillion=o.trillion;
              };
            };
          });
        }else if(c.frozen) console.log('凍結');
        docountA+=countA;
        if(countA!==1) console.log('　countA : '+countA);
      };
    };
    console.log('・後効果('+(ci?'教師':'生徒')+') totalP : '+totalP);
  };



  
  //■■■■■■■■■■エピソード効果■■■■■■■■■■
  console.log('■エピソード効果');
  
  const eventfxs = (event&&event.effects&&!test) ? event.effects : [];
  
  [...addepisodes, ...pata.episodes, ...eventfxs].forEach(e=>{
    //■■■inputオブジェクト
    const epinput = {test:test, client:client, message:message, splogs:splogs, speciallog:speciallog, raidlog:raidlog, quizlist:quizlist, cartalist:cartalist, omsgs:omsgs,
                     cards:cards, allcards:allcards, Tcards:Tcards, allTcards:allTcards, characters:characters,
                     pentamessage:pentamessage, totalP:totalP,
                     resultlist:resultlist, grouplog:grouplog, relationlog:relationlog, //{ids:[c.id, cr.id], plus:(ri==0), minus:(ri==1)}
                     prefields:prefields,
                     season:season, realDate:realDate, date:gameDate, 
                     ploga:ploga, keeps:keeps, event:event, favoriteid:settings[1], myfx:((settings[5])?settings[5].split('/')[1]:'df'), tm:tm};
    //■■■効果計算
    const o = e.f(epinput);
    //■■■発動した場合
    if(o){ //処理がされていた場合
      if(o.error){console.log('エラー送信 '+o.title);
                  client.channels.cache.get(pata.errorlog).send('【ERROR】```エピソード名 : '+o.title+'\n'+o.message+'\n'+cards.map(c=>c.id).join('　')+'```');
                  message.channel.send('```ERROR : 【'+o.title+'】\nエピソード効果エラーが発生したため、開発者へ情報を送信しました。該当エピソード効果を適用せずに続行します。```'); return ;};
      console.log('→ '+o.log.title+'発動');
      //■■トータル
      totalP=(o.log.force!==null)?o.log.force:Math.floor(totalP * o.log.mul) + o.log.add;
      //■■諸々
      if(o.cards!==null){ cards=o.cards; console.log('カード変更：'+o.cards.map(cc=>cc.emoji+cc.id).join('/')); };
      if(o.Tcards!==null){ Tcards=o.Tcards; console.log('カード変更：'+o.Tcards.map(cc=>cc.emoji+cc.id).join('/')); };
      if(o.resultlist!==null) resultlist=o.resultlist;
      if(o.prefields!==null) prefields=o.prefields;
      bonusC +=o.coinadd;
      coinmul*=o.coinmul;
      bonusT +=o.ticketadd;
      bonusE +=o.envelopeadd;
      bonusJ +=o.jeweladd;
      bonusI +=o.inviteadd;
      bonusR +=o.ribbonadd;
      if(o.keeptext!==null){const newkeep = o.log.title+'/'+o.keeptext;
                            const kindex = keeps.findIndex(k=>k.includes(o.log.title));
                            if(kindex>=0) keeps[kindex] = newkeep;
                            else keeps.push(newkeep); };
      //■■記録
      o.log.name='📖『'+o.log.title+'』'+o.log.notes;
      prefields.push(o.log);
      //■■イベントアイテム
      if(event&&o.log.eptype.includes('event')){ console.log('イベントアイテム取得 index:'+o.log.eventitems.index+' add:'+o.log.eventitems.add+' mul:'+o.log.eventitems.mul);
                                                 eventitems   [o.log.eventitems.index]+=o.log.eventitems.add;
                                                 eventitemsmul[o.log.eventitems.index]*=o.log.eventitems.mul;};
      if(o.speciallogcontent) speciallogcontent = o.speciallogcontent;
      if(o.raidMessageObj) raidMessageObj = o.raidMessageObj;
    }
  });
  console.log('・エピソード効果 totalP : '+totalP);
  
  //■■■■■■■■■■誰もいない判定■■■■■■■■■■
  console.log('■誰もいない');
  if(cards.length==1&&Tcards.length==0){
    totalP=1;
    resultlist.splice(1);
    prefields.push({name:'【ひとりぼっち】強制1p', value:'繋がりが生まれなかった。'});
  }
  else if(cards.length==0&&Tcards.length==0){
    bonusC=5;
    resultlist.splice(0);
    prefields.push({name:'【ぺ、ぺんた……なんちゃって】5c', value:'誰もいない。'});
  };
  console.log('・誰もいない totalP : '+totalP);
  
  console.log('■■■計算結果■■■ : '+totalP);
  console.log('bonusC : '+bonusC+' / bonusT : '+bonusT+' / bonusE : '+bonusE+' / bonusJ : '+bonusJ+' / bonusI : '+bonusI+' / bonusR : '+bonusR);
  
  //■■■■■■■■■■ログ処理■■■■■■■■■■
  if(isNaN(totalP)){  console.log('エラー送信 合計点数値エラー');
                      client.channels.cache.get(pata.errorlog).send('【ERROR】```totalPが数値ではない\n'+cards.map(c=>c.id).join('　')+'```');
                      await loading.delete();
                      message.channel.send('```ERROR\n数値エラーが発生したため、開発者へ情報を送信しました。```');
                      return; };
  if(isNaN(bonusC)){  console.log('エラー送信 コイン数値エラー');
                      client.channels.cache.get(pata.errorlog).send('【ERROR】```bonusCが数値ではない\n'+cards.map(c=>c.id).join('　')+'```');
                      await loading.delete();
                      message.channel.send('```ERROR\n数値エラーが発生したため、開発者へ情報を送信しました。```');
                      return; };
  if(player){
    console.log('■■■ログ処理■■■');
    if(totalP>=pata.jewelThreshold)  jewel +=Math.floor(totalP/pata.jewelThreshold);
    else if(totalP>=pata.ticketThreshold) ticket+=Math.floor(totalP/pata.ticketThreshold);
    else if(totalP<=pata.reportThreshold) report+=Math.floor(totalP/pata.reportThreshold);
    
    if     (totalP>= pata.ribbonThreshold)     ribbon+=Math.floor(totalP/pata.ribbonThreshold);
    else if(totalP<=(pata.ribbonThreshold*-1)) ribbon-=Math.floor(totalP/pata.ribbonThreshold);
    
    console.log('String(totalP) : '+String(totalP));
    if((totalP>=100||totalP<=-100)&&String(totalP).match(/^-?([0-9])\1+$/)){ zorome=true; ticket++; };
    if((totalP>=100||totalP<=-100)&&String(totalP).match(/^-?[0-9]0+$/)){ kiriban=true; ticket++; };
    console.log('■チケット : '+ticket+' 宝珠 : '+jewel+' レポ : '+report+' リボン : '+ribbon);
    ploga[0] = '■■■■■' + message.author.id + ' ' + message.author.username;
    const logpoints  = ploga[5].split(':');
    let   playerlv   = Number(logpoints[1]);
    
    if(!test){ //testのときはやらない処理
      const logitems   = ploga[3].split(':');
      const logbwscore = ploga[4].split('/');
      const logcounter = ploga[6].split(':');
      const grandtotal = Number(logpoints[0]) + totalP;
      if(logbwscore[0]=='なし'||logbwscore[0].split(':')[1] < totalP){console.log('■ベストスコア');
                                                                      best=true;
                                                                      bonusC += pata.coinBestscore;
                                                                      logbwscore[0] = cards.map(cc=>cc.id).join(' ') + ':'+totalP ;
                                                                      ploga[4] = logbwscore.join('/');
                                                                      pentamessage += ' ';
                                                                      bestscoremessage = '🏆'+tm.bestscoremessage+' +'+pata.coinBestscore+'c'; };
      if(0>totalP&&(!logbwscore[1]||logbwscore[1]=='なし'||logbwscore[1].split(':')[1]>totalP)){console.log('■ワーストスコア');
                                                                                                worst=true;
                                                                                                bonusC += pata.coinBestscore;
                                                                                                logbwscore[1] = cards.map(cc=>cc.id).join(' ') + ':'+totalP ;
                                                                                                ploga[4] = logbwscore.join('/');
                                                                                                pentamessage += ' ';
                                                                                                bestscoremessage = '💥'+tm.worstscoremessage+' +'+pata.coinBestscore+'c'; };
      
      if(event){
        console.log('イベントリザルト');
        const logevent = logitems[5].split('/');
        const logeventitems = logevent[1].split(' ');
        const eventresult = [];
        
        let fcard;
        const slogch   = client.channels.cache.get(pata.settingslog);
        const slogs    = await slogch.messages.fetch({ limit:100 });
        const slog     = await slogs.find(set => set.content.includes(message.author.id));
        if(slog){ const settings = slog.content.split('\n');
                  if(settings[1]!=='none') fcard = characters.find(c => c.id == settings[1]); };
        
        await event.filtering(cards, Tcards, fcard).forEach((fcs,index)=>{
          const getnum = (eventitems[index]+fcs.length+fcs.filter(fc=>fc.eventid&&fc.eventid==event.id).length)*eventitemsmul[index];
          if(getnum!==0){
            const eventitemmul = (event.eventitemmul) ? event.eventitemmul({date:realDate}) : 1 ;
            logeventitems[index] = Number(logeventitems[index]) + getnum*eventitemmul;
            eventresult.push('GET! '+event.item[index].name+' ×'+getnum+' '+fcs.map(fc=>tools.emj(fc)).join('')+((eventitemmul>1)?' ×'+eventitemmul+'!!':''));
            console.log('event.item[index].name → '+event.item[index].name
                        +'\nfcs → '+fcs.map(fc=>tools.emj(fc)).join('')
                        +'\nfcs eventid → '+fcs.filter(fc=>fc.eventid&&fc.eventid==event.id).map(fc=>tools.emj(fc)).join('')
                        +'\neventitemsmul[index] → '+eventitemsmul[index]
                        +'\ngetnum → '+getnum
                        +'\neventitemmul → '+eventitemmul);
          }
        });
        
        if(eventresult.length){
          console.log('→イベントリザルトあり');
          logevent[0] = event.id;
          logevent[1] = logeventitems.join(' ');
          logitems[5] = logevent.join('/');
          prefields.push({name:event.emoji+'【今回のイベントボーナス】', value:eventresult.join('\n')+'\n現在所持数：'+logeventitems.map((lei,index)=>event.item[index].emoji+'×'+lei).join(' ')});
        };
        
        if(speciallogcontent) await speciallog.edit(speciallogcontent);
      }
      
      const lvltickets = [0,0,0];
      if(grandtotal>=(playerlv+1)*2000){ console.log('■プレイヤーLv UP!');
                                         playerlv++;
                                         let lvlticketicon = '';
                                         if     (playerlv%50==0){ lvltickets[2]=1; lvlticketicon='🎟️'; }
                                         else if(playerlv%5 ==0){ lvltickets[1]=1; lvlticketicon='🧧'; }
                                         else                   { lvltickets[0]=1; lvlticketicon='🎫'; };
                                         prefields.push({name:'⬆️プレイヤーLv UP! '+lvlticketicon+'×1', value:'[Lv.'+(playerlv-1)+'→'+playerlv+'] 累計ポイントが'+(playerlv*2000)+'pに達しました！'}); };
      logitems[0] = Number(logitems[0]) + lvltickets[0] + ticket + bonusT;
      logitems[1] = Number(logitems[1]) + lvltickets[1] + bonusE;
      logitems[2] = Number(logitems[2]) + jewel + bonusJ;
      logitems[4] = Number(logitems[4]) + lvltickets[2] + bonusI;
      logitems[6] = (logitems[6]?Number(logitems[6]):0) + report;
      logitems[7] = (logitems[7]?Number(logitems[7]):0) + ribbon + bonusR;
      ploga[3] = logitems.join(':');
      logpoints[0] = grandtotal;
      logpoints[1] = playerlv;
      const totalPm = (coinmul==1) ? totalP
                                   : (totalP>0) ? Math.floor(totalP * coinmul)
                                                  : 0 ;
      logpoints[2] = Number(logpoints[2]) + totalPm + bonusC;
      ploga[5] = logpoints.join(':');
      logcounter[1] = Number(logcounter[1])+1;
      ploga[6] = logcounter.join(':');
      
      //■■■■■書込
      loading.edit('書込中 そのままお待ちください...');
      await plog.edit(ploga.join('\n'));
      if(JSON.stringify(keeps)   !==JSON.stringify(keepsbefore))   { if(klog) await klog.edit(keeps.join('\n')); else await klogch.send(keeps.join('\n')); };
      if(JSON.stringify(settings)!==JSON.stringify(settingsbefore)){ if(slog) await slog.edit(settings.join('\n')); else await slogch.send(settings.join('\n')); };
      console.log('■ログ書込完了 : '+ploga.join('\n　'));
    }
    
    const themename = (tm.id=='df')?'':'  '+tm.name ;
    footertxt = '  Lv.'+playerlv+'  '+logpoints[2].toLocaleString()+'c'+themename;
  }
  await loading.delete();
  
  //■■■■■■■■■■メッセージ作成■■■■■■■■■■
  console.log('■■■メッセージ作成■■■');
  const             content = cards.map(c => tools.emj(c)).join('');
  const             tmtotal = tm.batotal(totalP);
  let                 title = tmtotal.before + tools.nemj(totalP)+trillion + '🅿️' + tmtotal.after;
  if(test)            title = 'TEST ' + title;
  if(ribbon||jewel||report||ticket){const temoji = (ribbon ? '🎗️' + (ribbon>1 ? '×'+ribbon : '') + (ribbon&&(jewel||report||ticket) ? '+' : '') : '')
                                                 + (jewel ? '💍' + (jewel>1 ? '×'+jewel :'')
                                                          : report ? '📑' + ((report>1)?'×'+report:'') : '')
                                                 + (((jewel||report)&&ticket)?'+':'')
                                                 + ((ticket)?'🎫'+((ticket>1)?'×'+ticket:'')+((zorome)?'(ゾロ目)':'')+((kiriban)?'(キリ番)':''):'');
                                    title = (test) ? title + ' ('+temoji+')'
                                                   : title + ' '+temoji+'GET! (残' + (ribbon?((jewel||report||ticket)?'🎗️':'')+ploga[3].split(':')[7]:'')
                                                                                   + (jewel?((ribbon||report||ticket)?'💍':'')+ploga[3].split(':')[2]:'')
                                                                                   + (report?((ribbon||jewel||ticket)?'📑':'')+ploga[3].split(':')[6]:'')
                                                                                   + (ticket?((ribbon||jewel||report)?'🎫':'')+ploga[3].split(':')[0]:'') +')'; };
  if(resultlist[resultlist.length-1] == resulthr) resultlist.push('なし');
  let           description = resultlist.join('\n');
  
  if(player&&!test&&event&&event.editprocess) description = event.editprocess({data:data, log:speciallog, description:description, oldploga:oldploga, ploga:ploga }); 
  if(tm.spname) description = description.replace(tm.spname, tm.spnewname());
  const playericon = (player) ? message.author.displayAvatarURL() : '' ;
  const fields = prefields.map(f=>{return {name:f.name, value:(f.description)?f.description:f.value}});
  let imageurl = '';
  
  console.log('■■■メッセージ作成結果■■■ : \n'+[content,pentamessage+bestscoremessage,title,description,fields.map(f=>f.name+' / '+f.value).join('\n'),pentaname+footertxt].join('\n'));
  
  //■■■■■プレイヤー版
  if(player){
    //■■■■■テーマ画像部分
    const sozai = await client.channels.cache.get(pata.sozailog).messages.fetch({ limit:100 });
    const szMsg = sozai.find(s=>s.content.slice(0,2)==tm.id);
    if(szMsg){
      const szImgs = szMsg.content.split('\n').filter(l=>l!==tm.id);
      if     (szImgs.length==1 ) imageurl = szImgs[0];
      else if(szImgs.length>1&&!test){
        if(fields.find(f=>f.name.match(/プレイヤーLv/))) imageurl = szImgs[szImgs.length-1];
        else{
          const pt = ploga[5].split(':')[0]-(ploga[5].split(':')[1]*2000); //累計-(レベル*2000) 
          const decip = Math.floor(pt/(2000/(szImgs.length-1))); //ポイントを(次Lvまでの2000pの、枚数分の1)で割ったときの商
          imageurl = szImgs[decip];
        };
      };
    };
    //■■■■■ベストスコア記録
    if(best){
      const bmsgs = await client.channels.cache.get(pata.bestscorelog).messages.fetch({ limit:100 });
      // const bmsg  = bmsgs.find(m=>m.content.split('\n')[0] == message.author.id);
      // if(bmsg) bmsg.delete();
      const themename = (tm.id=='df')?'':'  '+tm.name ;
      await PentaResult(client.channels.cache.get(pata.bestscorelog), message.author.id+'\n'+content, pentamessage+'🏆再現', authoriconurl, title, description, tm.color, playericon, pentaname+themename+'  再現:'+tools.getDateText(), '', fields, imageurl);
      console.log('■■■ベストスコア記録■■■');
    };
    if(worst){
      const wmsgs = await client.channels.cache.get(pata.worstscorelog).messages.fetch({ limit:100 });
      // const wmsg  = wmsgs.find(m=>m.content.split('\n')[0] == message.author.id);
      // if(wmsg) wmsg.delete();
      const themename = (tm.id=='df')?'':'  '+tm.name ;
      await PentaResult(client.channels.cache.get(pata.worstscorelog), message.author.id+'\n'+content, pentamessage+'💥再現', authoriconurl, title, description, tm.color, playericon, pentaname+themename+'  再現:'+tools.getDateText(), '', fields, imageurl);
      console.log('■■■ワーストスコア記録■■■');
    };
  };
  
  //■■■■■■■■■■投稿■■■■■■■■■■
  await PentaResult(message.channel, content, pentamessage+bestscoremessage, authoriconurl, title, description, tm.color, playericon, pentaname+footertxt, '', fields, imageurl);
  if(player&&Number(ploga[6].split(':')[1])%10000==0) await PentaResult(message.channel, '', 'プレイヤー：'+(message.member?message.member.displayName:message.author.username), playericon, '🎊MAGICA-PENTA プレイ回数'+Number(ploga[6].split(':')[1])+'達成！', 'いっぱい遊んでくれてありがとう！', pata.color, '', pata.pentaname );
  if(raidMessageObj) await message.channel.send(raidMessageObj);
  if(raidMessageObj) await client.channels.cache.get(pata.magicapentach).send(raidMessageObj); //PENTAチャンネルです
  console.log('■■■メッセージ投稿完了■■■');
  
  console.log('▲▲▲'+message.author.username);
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　通常の得点計算部分　■■■■■■■■■■■■■■■■■■■■
exports.pentabasiccalc = function({data, pata, tools, spcards, player, tm, test, cards, Tcards, totalP, bonusC, emjrepeat, resultlist}){
  
  const pentaemoji  = ['✨', '✨', '✨', '✨', '✨', '⭐', '🔯', '🔯', '🔯', '🔯', '🔯', '🔯', '🔯'];
  const pentatitle  = ['', '', 'DI', 'TRI', 'TETRA', 'PENTA', 'HEXA', 'HEPTA', 'OCTA', 'NONA', 'DECA', 'UNDECA', 'DODECA'];
  let pentabonusC   = 0;
  const grouplog = [];
  const relationlog = [];
  let authoriconurl = '';//ペンタでアイコン出すテーマ用
  let pentamessage  = '';//ペンタ部分のメッセージ
  
  //■■1.貫通計算
  const Acalist = ['sex', 'author', 'major', 'grade', 'dorm', 'hometown', 'tag', 'position', 'emoji'];
  const pentalist = [];
  const xhome = /東京|不明/; //揃っても無視する出身地
  const xtag = /[北南]?関東|中部|近畿|[北南]東北|首都圏|山陽|海外|[東西南北]ヨーロッパ|[東西南北]アジア|[東西南北]アフリカ/; //揃っても無視するタグ(重複などのため) 山陽は中国地方と重複するため除外
  const xname = /\?|X|★公共|？寮|未定/; //揃っても無視する記述
  if(cards.length>1){
  Acalist.forEach(Aca => { let Analist = [];
                           if     (Aca=='hometown'){ Analist = [...new Set(cards.map(c => c[Aca].split(/[(]/)[0] ))]
                                                               .filter(Ana => Ana && !Ana.match(xhome)); }
                           else if(Aca=='tag')     { Analist = [...new Set(cards.map(c => c[Aca] ).join('/').split('/'))]
                                                               .filter(Ana => Ana && !Ana.match(xtag)); }
                           else if(Aca=='position'){ Analist = [...new Set(cards.map(c => { let r = c[Aca];
                                                                                            if     (r&&r.includes('部長'))   r = '部長';
                                                                                            else if(r&&r.includes('委員長')) r = '委員長';
                                                                                            else if(r&&r.includes('寮長'))   r = '寮長';
                                                                                            else if(r&&r.includes('首席'))   r = '首席';
                                                                                            return r; })
                                                                           .join('/').split('/')) ]
                                                               .filter(Ana => Ana); }
                           else if(Aca=='emoji')   { Analist = Object.keys(pata.emjlist).filter(k => !pata.emjlistX.includes(k) && cards.some(c => pata.emjlist[k].includes(tools.emj(c)) )); }
                           else                    { Analist = [...new Set(cards.map(c => c[Aca] ))]
                                                               .filter(Ana => Ana && !Ana.match(xname)); };
                           Analist.forEach(Ana => { const Ame   = (Aca=='emoji') ? cards.filter(c => c[Aca] && pata.emjlist[Ana].includes(tools.emj(c)) )
                                                                                 : cards.filter(c => c[Aca] && c[Aca].includes(Ana) );
                                                    const Amele = Ame.length;
                                                    //ジョーカー系の追加
                                                    let Jme=[];
                                                    if(Aca == 'sex')    Jme = cards.filter(c => c.id.match(/^くらまえ嘘?$|うどある/));
                                                    if(Aca == 'author') Jme = cards.filter(c => c.id.match(/あるとあ/));
                                                    const Jmele = (Jme&&Jme.length) ? Jme.length : 0 ;
                                                   
                                                    //出切除外
                                                    const Nme   = (Aca=='emoji') ? cards.filter(c => c[Aca] && pata.emjlist[Ana].includes(tools.emj(c)) && pata.additional.some(ac=>ac.id==c.id) )
                                                                                 : cards.filter(c => c[Aca] && c[Aca].includes(Ana) && pata.additional.some(ac=>ac.id==c.id) );
                                                    const Nmele = Nme.length;
                                                   
                                                    let score = 0;
                                                    let alltitle = '';
                                                   
                                                    if(Amele + Jmele == cards.length){ //PENTA!!
                                                      score = cards.length*10 + cards.map(c=>c.basicadd).reduce((a,b)=>a+b);
                                                      if(player&&!test) pentabonusC += pata.coinPenta;
                                                      pentamessage = pentaemoji[cards.length]+tm.pentamessage[cards.length];
                                                      alltitle = pentatitle[cards.length];
                                                    }
                                                    else if( (Aca=='author'                  &&Amele-Nmele==data.characters.filter(c=>c.genre=='stTm'&&c[Aca]==Ana).length)
                                                           ||(Aca=='hometown'&&Amele-Nmele>=3&&Amele-Nmele==data.characters.filter(c=>c.genre=='stTm'&&c[Aca].split(/[(]/)[0]==Ana).length)
                                                           ||(Aca=='tag'     &&Amele-Nmele>=3&&Amele-Nmele==data.characters.filter(c=>c.genre=='stTm'&&c[Aca].split('/').includes(Ana)).length)
                                                           ||(Aca=='emoji'   &&[...new Set(Ame.map(c=>tools.emj(c)))].length==pata.emjlist[Ana].length) ){ //出切
                                                      score = Amele*10+Ame.map(c=>c.basicadd).reduce((a,b)=>a+b);
                                                      alltitle = '出切';
                                                    };
                                                   
                                                    if(score){
                                                      const col = colcount([...Ame, ...Jme]);
                                                      totalP += score + col.point;
                                                      let AnaPush = Ana;
                                                      if     (Aca == 'grade') AnaPush += '年';
                                                      else if(Aca == 'emoji') AnaPush += '系絵文字';
                                                      resultlist.push(pentaemoji[cards.length]+alltitle+'：'+AnaPush + score + 'p' + col.text);
                                                    };
                                                  });
                         });
  };
  bonusC += pentabonusC;
  if(pentabonusC>0){ pentamessage+=' +'+pentabonusC+'c';
                     if(tm.authoriconurl) authoriconurl = tm.authoriconurl; };
  console.log('・貫通 totalP : '+totalP);
  
  //■■2.グループ計算 G(Group) C(common) ca(category) na(name) me(member) le(Length)
  const Gcalist = ['club', 'committee', 'class', 'roomid'];
  Gcalist.forEach(Gca => { const Gnalist = (Gca == 'class') ? [...new Set(cards.map(c => c.major + c.grade + '年'))].filter(Gna => !Gna.includes('?') && !Gna.match(/^年$/))
                                                            : [...new Set(cards.map(c => (c[Gca]&&c[Gca].includes('生徒会')) ? '生徒会' : c[Gca]).join(' ').split(' '))].filter(Gna => Gna && Gna !== 'unknown');
                           Gnalist.forEach(Gna => {const Gme = (Gca == 'class') ? cards.filter(c => c.major + c.grade + '年' == Gna) 
                                                                                : cards.filter(c => c[Gca].includes(Gna));
                                                   if(Gca!=='roomid'&&Gme.length>=2) Gme.push(...cards.filter(c => c.id.match(/^ぴーぎろ$/)));
                                                   const Gmele = Gme.length;
                                                   if(Gmele>1){
                                                     const GmeP  = Gmele*10 + Gme.map(c=>c.basicadd).reduce((a,b)=>a+b);
                                                     let CtotalP = 0;
                                                     const Cnalist = [];
                                                     const Ccalist = (Gca == 'class') ? ['sex', 'author']
                                                                   : (Gca == 'roomid')? ['sex', 'author', 'grade']
                                                                                      : ['sex', 'author', 'grade', 'major'];
                                                     Ccalist.forEach(Cca =>{[...new Set(Gme.map(c => c[Cca]))].filter(Cna => Cna && !Cna.match(xname))
                                                                              .forEach(Cna => { const Cme = Gme.filter(c => c[Cca] == Cna);
                                                                                                //ジョーカー系の追加
                                                                                                if(Cca=='sex')    Cme.push(...Gme.filter(c => c.id.match(/^くらまえ$|うどある/)));
                                                                                                if(Cca=='author') Cme.push(...Gme.filter(c => c.id.match(/あるとあ/)));
                                                                                                const Cmele = Cme.length;
                                                                                                if(Cmele>1){ CtotalP += (Cmele-1)*10 + Cme.map(c=>c.basicadd).reduce((a,b)=>a+b);
                                                                                                             const CnaPush = (Cca == 'grade') ? Cna + '年' : Cna ;
                                                                                                             Cnalist.push(CnaPush); };
                                                                                              });
                                                                           });
                                                     //教師判定
                                                     const GTme = (Tcards.length>0) ? (Gca=='class')      ? Tcards.filter(c => c.major == Gme[0].major)
                                                                                    : (Gca=='club')       ? Tcards.filter(c => c.advisor.includes(Gna+'部'))
                                                                                    : (Gca=='committee')  ? Tcards.filter(c => c.advisor.includes(Gna))
                                                                                                          : []
                                                                                    : [];
                                                     const GTmele = GTme.length;
                                                     const GTmeP = (GTmele>0) ? (GTmele+1+GTme.map(c=>c.basicmul).reduce((a,b)=>a+b)) : 1 ; //掛ける数です
                                                     
                                                     //グループ名とLv加算を作成
                                                     const Gnatext = (Gca == 'roomid') ? '寮室' : Gna ;
                                                     const col   = colcount(Gme);
                                                     const colT  = (GTmele>0) ? colcount(GTme) : undefined;
                                                     
                                                     //総合得点へ加算する
                                                     let GtotalP = GmeP + CtotalP + col.point;
                                                     if(GTmele>0){ GtotalP = Math.round((GtotalP + colT.point) * GTmeP); };
                                                     totalP += GtotalP;

                                                     //リザルトに追加する
                                                     resultlist.push('🚪' + Gnatext + '：' + Gme.map(c => tools.emj(c).repeat(emjrepeat)).join('') + GmeP + 'p'
                                                                    + ((CtotalP)   ? ' + 共通' + CtotalP + 'p(' + Cnalist.join('/') + ')' : '')  + col.text
                                                                    + ((GTmele>0)  ? '\n　└' + ((Gca=='class')?'教師':'顧問') + GTme.map(c => tools.emj(c).repeat(emjrepeat)).join('') + colT.text + ' ×' + GTmeP + ' (小計：' + GtotalP + 'p)' : '') );
                                                     grouplog.push({name:Gnatext, type:Gca, ids:Gme.map(c=>c.id)});
                                                   }
                                                 });
                              
                         });
  console.log('・グループ '+grouplog.map(gr=>'「'+gr.name+'」('+gr.type+')'+gr.ids.join('・')).join(' ')+' totalP : '+totalP);
  
  //■■3.立場計算
  const poslist = ['部長', '委員長', '寮長', '首席', '生徒会長'];
  poslist.forEach(pos => { const Pme = cards.filter(c => { const ps = c.position.split('/');
                                                           return (ps.length && ps.some(p => p.endsWith(pos)) ) ? true : false ; });
                           if(Pme.length>0){
                             let power = 10;
                             if(pos.match(/寮長|生徒会長/)) power = 15;
                             if(pos == '首席' ) power = 30;
                             let posP = 0;
                             let posPminus = 0;
                             let PmePush;
                             if(pos == '首席' && Pme.some(c=>c.id.match(/^だいりお/))){
                               const PmePlus  = Pme.filter(c=>!c.id.includes('だいりお'));
                               const PmeMinus = Pme.filter(c=>c.id.includes('だいりお'));
                               posP          = PmePlus.length*power + PmePlus.map(c=>c.basicadd).reduce((a,b)=>a+b,0);
                               posPminus     = -5 + PmeMinus.map(c=>c.basicadd).reduce((a,b)=>a+b);
                               const PmePushA = (PmePlus.length)     ?      PmePlus.map(c=>tools.emj(c).repeat(emjrepeat)).join('') + posP      + 'p ' : '';
                               const PmePushB = Pme.filter(c=>c.id.match(/^だいりお/)).map(c=>tools.emj(c).repeat(emjrepeat)).join('') + posPminus + 'p';
                               PmePush = PmePushA + PmePushB;
                             }else{
                               posP = Pme.length*power + Pme.map(c=>c.basicadd).reduce((a,b)=>a+b);
                               PmePush = Pme.map(c => tools.emj(c).repeat(emjrepeat)).join('') + posP + 'p' ;
                             };
                             const col = colcount(Pme);
                             resultlist.push('👤' + pos + '：' + PmePush + col.text);
                             //総合得点へ加算する
                             totalP += posP + posPminus + col.point;
                           };
                         });
  console.log('・立場 totalP : '+totalP);
  
  //■■4.縁計算
  const relationlist = [];
  const cardss = [...cards, ...Tcards];
  cardss.forEach(c => { c.relation.split(' - ')
                       .forEach((r,ri) => { if(r){
                                              r.split('/')
                                              .forEach(n => { if(n){ //「あらん」でチョコアランへの縁もあることにしたいので、「あらん」を持つカードを全てから探してIDを取得、IDが含まれるカードを手札から探す
                                                                const cr = (n=='大れみ'||n=='れみ'&&cardss.some(cc=>cc.name.includes('大レミ')||cc.cm==430)) //雪レミは拾えるけど大レミは切り分け、は直で書くしかないのだ
                                                                         ? cardss.find(cc => cc.nickname.split(/\/|\s-\s/).includes(n))
                                                                         : cardss.find(cc => { const targetcard = data.characters.concat(spcards).find(ccc=>ccc.nickname.split(/\/|\s-\s/).includes(n));
                                                                                              return (targetcard&&cc.id.includes(targetcard.id)) });
                                                                if(cr){
                                                                  const relP = ((ri) ? -10 : 10) + [c, cr].map(c=>c.basicadd).reduce((a,b)=>a+b);
                                                                  totalP += relP;
                                                                  relationlist.push(tools.emj(c).repeat(emjrepeat)+'→'+tools.emj(cr).repeat(emjrepeat)+relP+'p');
                                                                  relationlog.push({nn:n, ids:[c.id, cr.id], plus:(ri==0), minus:(ri==1)});
                                                                };
                                                              };
                                                            });
                                            };
                                          });
                     });
  if(relationlist.length) resultlist.push('🧶縁：'+relationlist.join('　'));
  console.log('・縁 '+relationlog.map(rl=>'「'+rl.nn+'」'+rl.ids.join('→')+((rl.plus)?'plus':(rl.minus)?'minus':'')).join(' ')+' totalP : '+totalP);
  
  return {totalP:totalP, bonusC:bonusC, authoriconurl:authoriconurl, pentamessage:pentamessage, resultlist:resultlist, grouplog:grouplog, relationlog:relationlog};
};

//■■■■■■■■■■■■■■■■■■■■　★ペンタカードプロフィール　■■■■■■■■■■■■■■■■■■■■
async function pentaprofile(cmndchr, ownedcards, client, data, pata, tools, message, command, player, event){
  console.log('■penta.js　プロフィール');
  const ds = data.DataSet[cmndchr.genre];
  let chr = ownedcards.find(c=>c.id==cmndchr.id);
  if(!chr){chr = cmndchr; chr.collected=0;}

  const today = tools.getDateText();
  const april = (today.match(/\/4\/1$/)) ? true : false ;
  
  let title = '';
  let description = '';
  const fields = [];
  
  //■■■■■■■■■■セリフ一覧である場合
  if(command.length>=3&&tools.hiraganize(command[2]).match(/^全?(せりふ|台詞)(一覧)?$/)){
    title = tools.emj(chr)+chr.name+' のすべての登録セリフ';
    const serifudata = [{name:'取得時'+(april?'(__4/1__限定)':''),serifulog:(april&&!chr.eventid) ? pata.aprilserifulog : pata.serifulog   },
                        {name:'ログイン',                     serifulog:(chr.eventid)         ? pata.fspserifulogL  : pata.fserifulogL },
                        {name:'ステータス',                   serifulog:(chr.eventid)         ? pata.fspserifulogS  : pata.fserifulogS },
                        {name:'イベントショップ',              serifulog:pata.eshopserifulog                                            },
                        {name:'裏ショップ',                   serifulog:pata.shopserifulog                                             },
                        {name:'その他',                      serifulog:pata.otherserifulog                                            }];
    for(let i=0; i<serifudata.length; i++){
      const sd = serifudata[i];
      const smsgs = await client.channels.cache.get(sd.serifulog).messages.fetch({ limit:100 });
      const srflines  = smsgs.map(message => message.content).reverse().join('\n').split('\n').filter(line => line.includes(chr.name+'＠＠') );
      if(srflines.length>0) fields.push({name :'💬'+sd.name+(srflines.length>1?' ('+(srflines.length>8?'⚠️':'')+srflines.length+'種)':''),
                                         value:'```'+srflines.map(srfline => '「' + srfline.split('＠＠')[1] + '」' + (sd.name=='その他' ? '('+srfline.split('＠＠')[2]+')' : '') ).join('\n\n')+'```'
                                        });
    };
    description = ((fields.length==0) ? '登録セリフはありません。\n\n' : '')
                + '※ここから登録・削除等を行うことはできません。';
  }
  
  //■■■■■■■■■■通常プロフィールである場合
  else{
    //■■■■■title系の処理
    let level = '';
    if(player){
      if     (chr.collected==0) level = ' [未所持]';
      else if(chr.collected==5) level = ' [Lv.MAX]';
      else if(chr.collected==7) level = ' [Lv.EXTRA💍]';
      else                      level = ' [Lv.'+chr.collected+']';
    };
    title = tools.emj(chr)+chr.name+level;

    //■■■■■description系の処理
    const rarity     = 'レアリティ：'+pata.raritytext(chr);
    const major      = chr.major ? tools.ReSymbolizeC(client, message, data.symbols, chr.major, 'major', 'majoremj') + chr.major + '科' + (chr.genre=='tcTm' ? '教師 ' : '') : '';
    const gradeorage = chr.grade ? chr.grade+'年' : (chr.age ? chr.age : '?') + '歳' ;
    const cm         = (chr.cm) ? chr.cm : '?';
    const subcm      = (chr.subcm) ? ' ('+chr.subcm+'cm)' : '' ;
    const birthday   = (chr.birthday) ? ' ' + chr.birthday + '生' : '';
    let group = '';
    if(chr.club||chr.committee){
      let committee = '';
      if     (chr.committee.includes('生徒会')) committee = chr.committee + ' ';
      else if(chr.committee)                   committee = chr.committee + '委員会 ';
      const club = (chr.club) ? chr.club + '部' : '';
      group = '\n'+ committee + club;
    }
    let ex = '';
    if(chr.genre=='stTm'){
      let dormmate;
      if(chr.dorm == '非寮'){dormmate = ''}
      else if(chr.dorm == '未定'){dormmate = '(寮or非寮)'}
      else{dormmate = ' (同室：'+chr.dormmate+')'};
      ex = '\n'+tools.ReSymbolizeC(client, message, data.symbols, chr.dorm, 'dorm', 'dormemj')+chr.dorm+dormmate
    }else if(chr.advisor||chr.lecture){
      const advisor = (!chr.advisor) ? '' : '\n顧問：'+chr.advisor;
      const lecture = (!chr.lecture) ? '' : '\n授業例：'+chr.lecture;
      ex = advisor + lecture;
    };
    const hometown = (chr.hometown)? '\n出身：'+chr.hometown : '';
    const tag = (chr.tag)? '\nタグ：'+chr.tag : '';
    const position = (chr.position)? '\n立場：'+chr.position : '';
    const relation = (chr.relation!==' - ')? '\n縁：'+chr.relation : '';

    const pfms = await client.channels.cache.get(ds['Profile']).messages.fetch({ limit:100 });
    const pfl = (chr.notion) ? '\n[🔗詳細(Notion)](' +chr.notion + ')' : '';

    description = chr.subname+' ['+chr.author+']\n'
                  +rarity+'\n'
                  +major+gradeorage+' '+chr.sex+' '+cm+'cm'+subcm+birthday
                  +group+ex+hometown+tag+position+relation+pfl;

    //■■■■■fields系の処理
    //セリフ
    const serifulog = (april&&!chr.eventid) ? pata.aprilserifulog : pata.serifulog;
    const smsgs   = await client.channels.cache.get(serifulog).messages.fetch({ limit:100 });
    const srfline = smsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(chr.name+'＠＠') );
    if(srfline) fields.push({ name:'💬取得時のセリフ'+(april?'(__4/1__限定)':''), value:'```「' + srfline.split('＠＠')[1] + '」```' });
    
    //特殊ドロー一覧
    const drawing = pata.drawings.find(d => chr.id.includes(d.id));
    if(drawing){const o = drawing.f();
                fields.push({ name:'📥特殊ドロー：'+o.title,
                              value:o.description+(o.detail?'\n'+o.detail:'') });
    };

    //特性一覧
    const nature = pata.natures.find(n => chr.id.includes(n.id));
    if(nature){const o = nature.f();
               fields.push({ name:tools.emj(chr)+'特性：'+o.title, value:o.description });
    };

    //効果一覧
    const effects = pata.effects.filter(e => e.id == chr.id);
    if(effects&&effects.length){ //効果データがあった場合
      effects.forEach(e=>{
        const o    = e.f();
        fields.push({ name:tools.emj(chr)+e.phase.join('・')+'効果：【'+o.title+'】',
                      value:o.description+(o.detail?'\n'+o.detail:'')+((event&&chr.eventid&&chr.eventid==event.id&&o.eventdescription)?'\n'+o.eventdescription:'') });
      });
    };

    //エピソード効果一覧
    pata.episodes.forEach(epi=>{
      const o = epi.f();
      if(o.member.some(m=>chr.id.includes(m))){
        fields.push({ name:'📖'+'『'+o.title+'』',
                      value:o.type+'：'+o.member.map(m=>tools.emj(data.characters.concat(pata.spcards(data.characters)).find(c=>c.id.includes(m)))).join('')+((o.score)?' '+o.score+'p':'')+(o.detail?'\n'+o.detail:'')+((o.url)?' 🔗':'') });
      }else return;
    });
  };
  
  //■■■■■サムネイルURL取得
  let thumbnailurl = '';
  const tchids = [pata.sptnlog, ds['Thumbnail']];
  if(chr.collected>=5) tchids.unshift(pata.maxtnlog);
  if(chr.collected==7) tchids.unshift(pata.extratnlog);
  if(april) tchids.unshift(data.DataSet.april['Thumbnail']);

  let ti = 0; console.log('tchids : '+tchids);
  do{ console.log('ti : '+ti);
        const tmsgs = await client.channels.cache.get(tchids[ti]).messages.fetch({ limit:100 });
        const tmsg = await (tchids[ti]==pata.sptnlog||tchids[ti]==pata.maxtnlog||tchids[ti]==pata.extratnlog||(tchids[ti]==data.DataSet.april['Thumbnail']&&chr.eventid&&chr.eventid.match(/PSEUDO|SECRET/))) //完全一致の条件
                     ? tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.split('：')[0]==chr.name)
                     : tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(chr.name.split('(')[0]));
        if(tmsg) thumbnailurl = tmsg.split('：')[1]; console.log('thumbnailurl : '+thumbnailurl);
        ti++;
  }while(!thumbnailurl&&ti<tchids.length);console.log('thumbnailurl : '+thumbnailurl);
  
  if(!thumbnailurl) thumbnailurl = data.noimage;
  
  //■■■■■送ります
  PentaResult(message.channel, '', 'カードデータ表示', ((player)?message.author.displayAvatarURL():''),
              title, description, pata.raritycolor(chr), '', pata.pentaname, thumbnailurl, fields);
  
  console.log('▲▲▲'+message.author.username);
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★効果リスト　■■■■■■■■■■■■■■■■■■■■
async function pentafxlist(chrlist, authorname, pata, tools, message){
  console.log('■penta.js　効果リスト');
  
  const allchrlist=[];
  const allchrlistname=[];
  const chrlistN=chrlist.filter(chr=>chr.genre=='stTm'&&!chr.eventid);
  if(chrlistN.length>0){ allchrlist.push(chrlistN); allchrlistname.push('生徒(通常)'); };
  const chrlistS=chrlist.filter(chr=>chr.genre=='stTm'&&chr.eventid&&chr.eventid!=='SECRET'&&!(chr.eventid=='PSEUDO'&&!chr.id.includes('くらまえ')));
  if(chrlistS.length>0){ allchrlist.push(chrlistS); allchrlistname.push('生徒(イベント)'); };
  const chrlistT=chrlist.filter(chr=>chr.genre=='tcTm'||chr.genre=='otTm');
  if(chrlistT.length>0){ allchrlist.push(chrlistT); allchrlistname.push('教師・関係者'); };
  
  allchrlist.forEach((list,index)=>{
    const fields=list.map(chr=>{
      const effects = pata.effects.filter(e => e.id == chr.id);
      const valuelist=[];
      if(effects&&effects.length>0) effects.forEach((e,i)=>valuelist.push('【'+e.f().title+'】('+e.phase.join(', ')+')'));
      else valuelist.push('なし');
      return {name:'__'+tools.emj(chr)+chr.name+'__',
              value:valuelist.join('\n'),
              inline:true};
    });
    const authorname = '効果名リスト';
    const title = '📂'+authorname+((allchrlist.length>1)?tools.nemj(index+1)+allchrlistname[index]:'');
    const limit = 24;
    const listdevided = Math.ceil(fields.length/limit);
    for(let i=0; i<listdevided; i++){
      PentaResult(message.channel, '', authorname, '', title+(1<listdevided ? '('+(i+1)+'/'+listdevided+')' : ''), '', pata.color, '', pata.pentaname, '', fields.slice(i*limit, (i+1)*limit));
    };
  });
  
  console.log('▲▲▲'+message.author.username);
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★ペンタガチャ　■■■■■■■■■■■■■■■■■■■■
async function pentagacha(client, data, pata, tools, message, command, plogch, plog, ploga, event, special, hundred){
  console.log('■■■■■PENTAガチャ■■■■■');
  
  //■■■■■■■■■■準備■■■■■■■■■■
  //■■■■■準備：カード
  const orcards = await data.characters.filter(c => (c.genre == 'stTm'||c.genre == 'tcTm'||c.genre == 'otTm')&&!pata.giftids.includes(c.id));
  const spcards = await pata.spcards(orcards);
  const spcardssc = await spcards.filter(s=>s.eventid=='SECRET'&&!pata.giftids.includes(s.id));
  const characters = await orcards.concat(spcards);
  
  //■■■■■準備：ガチャ設定・タイプ設定
  let info; let infoH; let num; let allcards; let type;
  if(!ploga.length)  { allcards=await orcards.concat(spcardssc);
                       type='初回';    num=10; info=(event&&event.rws)?pata.rarityinfo([], event.rws):pata.rarityinfo();  }
  
  else if(special==1){ allcards=await orcards.concat();
                       type='封筒';    num=1;  info=pata.rarityinfoB(); }
  
  else if(special==2){ allcards=await orcards.concat(spcardssc).concat(spcards.filter(s=>s.eventid==event.id&&!event.giftids.includes(s.id)));
                       const logch = client.channels.cache.get(pata.speciallog);
                       const logs  = await logch.messages.fetch({ limit:100 });
                       const log   = await logs.find(m => m.content.includes(message.author.id+' '+event.id));
                       const Epickup = event.pickup(allcards, log); console.log('Epickup : '+Epickup);
                       type='イベント'; num=5;  info=(event&&event.rws)?pata.rarityinfo(Epickup, event.rws):pata.rarityinfo(Epickup);
                                              infoH=(event&&event.rws)?pata.rarityinfoH(Epickup, event.rws):pata.rarityinfoH(Epickup); }
  
  else               { allcards=await orcards.concat(spcardssc);
                       type='通常';    num=5;  info=(event&&event.rws)?pata.rarityinfo([], event.rws):pata.rarityinfo();
                                              infoH=(event&&event.rws)?pata.rarityinfoH([], event.rws):pata.rarityinfoH();  };
  
  if(hundred&&!type.match(/初回|封筒/)){ type+='百連'; num=97; };
  //■■■■■準備：記録
  const today = tools.getDateText();
  const logitems  = (type!=='初回') ? ploga[3].split(':') : [];
  const logpoints = (type!=='初回') ? ploga[5].split(':') : [];
  const logcounter= (type!=='初回') ? ploga[6].split(':') : [];
  const plogc     = (type!=='初回') ? ploga[8].split(/(?<=\d)/).map(c => [c.slice(0,-1), c.slice(-1)]) : []; //[ ['aあ', '1'],['bだ', '2'],['bた', '3'] 
  
  //■■■■■準備：表示
  const ResultCards = [];
  let over = 0;
  const newlist = [];
  const maxlist = [];
  let resultlist = [];
  const april = (today.match(/\/4\/1$/)) ? true : false ; console.log('APRIL : '+april);
  const hr = '──────────────────'
  const hrbr = '\n'+hr+'\n'
  
  //■■■■■■■■■■ガチャ本体■■■■■■■■■■
  let gotname  = await gacha(info, allcards , num);
  if(type.match(/百連$/)) gotname = await gotname.concat(gacha(infoH, allcards, 3));
  console.log('■■■ガチャ結果■■■ : '+gotname);
  const cards    = gotname.map(n => allcards.find(c => c.id == n));
  if(type!=='初回'){ //引きましたよ～という証拠の用意
    if(type=='封筒')             logitems[1] = Number(logitems[1])-1;
    else if(type.match(/百連$/)) logitems[0] = Number(logitems[0])-20;
    else                         logitems[0] = Number(logitems[0])-1;
    logcounter[0] = (type.match(/百連$/)) ? Number(logcounter[0])+20 : Number(logcounter[0])+1;
  };

  //■■■■■■■■■■処理：引いたキャラごとに■■■■■■■■■■
  for await(let c of cards){
    let count = '';
    
    //■■■■■ 所持枚数確認
    const cindex = await plogc.findIndex(lc => lc[0] == c.sid); //取得キャラログに今回引いたキャラidに一致するものがあるか
    const level = (cindex!==-1) ? Number(plogc[cindex][1]) : 0;
      //■■ A) 存在しない 0+1
      if(level === 0){
        count = ' 🆕';
        await plogc.push([c.sid, '1']);
        if(type.match(/百連$/)) newlist.push(c);
      }
      //■■ B) 存在する n+1
      else if(level < 5){
        const added = level+1; //1足された状態
        count = (added==5) ? ' 🈵' : ' ['+added+'枚目]';
        plogc[cindex][1] = await added;
        if(type.match(/百連$/)&&added==5) maxlist.push(c); }
      //■■ C) 存在するが上限である 5
      else{
        count =  ' [超過]';
        const coinOverfive = pata.coinOverfive*((c.eventid&&c.eventid=='SECRET') ? 500 : (c.rarity==0) ? 10 : c.rarity);
        over += coinOverfive;
        logpoints[2] = Number(Number(logpoints[2]) + coinOverfive); };
    
    //■■■■■ 単カード発言
    if( ResultCards.length<10&&
        ( (!type.match(/百連$/) && ( level===0 || level===4|| (level!==5&&c.eventid) || april ) )
        ||( type.match(/百連$/) && ( level===0 || level===4|| (level!==5&&c.eventid&&c.eventid=='SECRET') ) )
        ||type=='封筒' ) ){
      //■■ 発言作成：文章セリフ欄
      let srfline;
      if(level==0||april){
        const serifulog = (april&&!c.eventid) ? pata.aprilserifulog : pata.serifulog;
        const smsgs = await client.channels.cache.get(serifulog).messages.fetch({ limit:100 });
        srfline = smsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(c.name+'＠＠') );
      }
      const introduction = (srfline) ? '\n```「' + srfline.split('＠＠')[1] + '」```' : '';
      //■■ 発言作成：文章完成
      const description = (c.major ? tools.ReSymbolizeC(client, message, data.symbols, c.major, 'major', 'majoremj') + c.major + '科 / ' : '' )
                        + (c.grade ? tools.ReSymbolizeC(client, message, data.symbols, c.grade, 'grade', 'gradeemj') + c.grade + '年' : (c.genre=='tcTm') ? '🧑‍🏫教師' : '関係者') + ' / '
                        + c.sex + ' / '
                        + '©' + c.author
                        + introduction
                        + (c.notion ? '\n[🔗詳細(Notion)](' +c.notion + ')' : '' );
      
      //■■ 発言作成：サムネイル
      let thumbnailurl = '';
      const tchids = [];           tchids.unshift(data.DataSet[c.genre]['Thumbnail']); //教師やるならここを書き換えようね
      if(c.eventid)                tchids.unshift(pata.sptnlog);
      if(level>=4)                 tchids.unshift(pata.maxtnlog);
      if(level==7)                 tchids.unshift(pata.extratnlog);
      if(april)                    tchids.unshift(data.DataSet.april['Thumbnail']);
      
      let ti = 0;
      do{
        const tmsgs = await client.channels.cache.get(tchids[ti]).messages.fetch({ limit:100 });
        const tmsg = await (tchids[ti]==pata.sptnlog||tchids[ti]==pata.maxtnlog||tchids[ti]==pata.extratnlog||(tchids[ti]==data.DataSet.april['Thumbnail']&&c.eventid&&c.eventid.match(/PSEUDO|SECRET/))) //完全一致の条件
                     ? tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.split('：')[0]==c.name)
                     : tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(c.name.split('(')[0]));
        if(tmsg) thumbnailurl = tmsg.split('：')[1]; console.log('thumbnailurl : '+thumbnailurl);
        ti++;
      }while(!thumbnailurl&&ti<tchids.length);
  
      if(!thumbnailurl) thumbnailurl = data.noimage;
      
      //■■ 発言作成：メッセージ送信
      const color = (c.eventid) ? pata.eventlist.find(e=>e.id == c.eventid).color : pata.colorr[c.rarity];
      //await PentaResult(message.channel, '', 'GET! '+pata.raritytext(c), message.author.displayAvatarURL(), tools.emj(c)+c.name+count, description, color, '', '', thumbnailurl);
      ResultCards.push([message.channel, '', 'GET! '+pata.raritytext(c), message.author.displayAvatarURL(), tools.emj(c)+c.name+count, description, color, '', '', thumbnailurl]);
    };
    
    //■■■■■ 一覧用の文章を作成 ここにある理由は「countを使うから」
    if(!type.match(/百連$/)) await resultlist.push('⭐'+tools.ndouble(c.rarity)+tools.emj(c)+c.name+count); //ふつうの名前の並べ方
  };

  //■■■■■■■■■■処理：コンプリート■■■■■■■■■■
  let infocomplete = '';
  if(type!=='初回'){
    const orcardsSt = orcards.filter(c=>c.genre=='stTm');
    if(logitems[3]==0&&orcardsSt.every(c=>plogc.some(lc=>lc[0]==c.sid))){
      console.log('■コンプリート');
      infocomplete = '🏵️おめでとうございます！ 全ての通常生徒カードを揃えました！\nLv.EXTRA宝珠・指名招待券をプレゼントいたします。\n「！ぺえ (キャラ名)」・「！ぺよ (キャラ名)」からどうぞ！\n💍×1 を獲得しました。\n🎟️×1 を獲得しました。'+hrbr;
      logitems[2] = Number(logitems[2])+1;
      logitems[3] = 1;
      logitems[4] = Number(logitems[4])+1;
    }
    else if(logitems[3]==1&&orcardsSt.every(c=>plogc.some(lc=>lc[0]==c.sid&&Number(lc[1])>=5))){
      console.log('■MAXコンプリート');
      infocomplete = '🏵️🏵️おめでとうございます！ 全ての通常生徒カードのLvがMAXになりました！\nLv.EXTRA宝珠・指名招待券をプレゼントいたします。\n「！ぺえ (キャラ名)」・「！ぺよ (キャラ名)」からどうぞ！\n💍×5 を獲得しました。\n🎟️×5 を獲得しました。'+hrbr;
      logitems[2] = Number(logitems[2])+5;
      logitems[3] = 2;
      logitems[4] = Number(logitems[4])+5;
    }
    else if(logitems[3]==2&&orcardsSt.every(c=>plogc.find(lc=>lc[0]==c.sid&&Number(lc[1])>=7))){
      console.log('■EXTRAコンプリート');
      infocomplete = '🏵️🏵️🏵️おめでとうございます！ 全ての通常生徒カードのLvがEXTRAになりました！\nLv.EXTRA宝珠・指名招待券をプレゼントいたします。\n「！ぺえ (キャラ名)」・「！ぺよ (キャラ名)」からどうぞ！\n💍×10 を獲得しました。\n🎟️×10 を獲得しました。'+hrbr;
      logitems[2] = Number(logitems[2])+10;
      logitems[3] = 3;
      logitems[4] = Number(logitems[4])+10;
    };
  };
  
  //■■■■■■■■■■処理：ログ書込■■■■■■■■■■
  console.log('■■■ログ処理■■■');
  if(type=='初回'){ //初回
    ploga[0] = '■■■■■' + message.author.id + ' ' + message.author.username;
    ploga[1] = today;
    ploga[2] = today;
    ploga[3] = pata.ticketNew + ':' + pata.envelopeNew +':0:0:' + pata.envelopeNew +':0:0:0';
    ploga[4] = 'なし/なし';
    ploga[5] = '0:0:0';
    ploga[6] = '1:0';
    ploga[7] = 'df/df';
    ploga[8] = plogc.map(c => c.join('')).join('');
  }else{ //非初回
    ploga[0] = '■■■■■' + message.author.id + ' ' + message.author.username;
    ploga[3] = logitems.join(':');
    ploga[5] = logpoints.join(':');
    ploga[6] = logcounter.join(':');
    ploga[8] = plogc.map(c => c.join('')).join('');
  };
  //■■■■■ログ書込
  const sent = await message.channel.send('書込中 そのままお待ちください...');
  if(type=='初回') {await plogch.send(ploga.join('\n'));
                   await client.channels.cache.get(pata.settingslog).send([ploga[0],'none','random','random','テーマ/df/df','My効果/df/df'].join('\n'));}
  else             await plog.edit(ploga.join('\n'));
  console.log('■ログ書込完了 : '+ploga.join('\n　'));
  sent.delete();
  
  //■■■■■■■■■■処理：メッセージ作成■■■■■■■■■■
  console.log('■■■メッセージ作成■■■');
  
  const Rcontent = (type.match(/封筒|百連$/)) ? '' : cards.map(c=>tools.emj(c)).join('') ;
  
  
  const RtE = (type=='封筒')?'🧧':'🎫';
  let Rtype = type.replace(/通常/,'');
  if(Rtype) Rtype = '【'+Rtype+'】'; 
  const Rtitle = RtE+'ガチャ'+Rtype+' RESULT';
  const color = (type.match(/^イベント/)) ? event.color : pata.color;
  const fields = (type.match(/^イベント/)) ? [{name:event.emoji+'【'+event.name+'】', value:'```'+event.descriptionG+'```'}] : [];
  
  //■■■■■description作成
  let Rdescription;
  
  //■■リスト
  let infogachalist;
  //百連でなければresultlistには表示用の名前一覧が入っている
  if(type.match(/百連$/)){
    const lists = [,];
    lists[0] = cards.filter(c=>c.eventid);
    lists[1] = []; for(let i=5;i>=0;i--) lists[1]=lists[1].concat(cards.filter(c=>c.rarity==i&&!c.eventid));
    await lists.forEach((lil,index)=>{
      if(lists[0]&&lists[0].length){(!index)?resultlist.push('■special'):resultlist.push(hr+'\n■normal');};
      const cemjs = [];
      const lilN = newlist.filter(n=>lil.find(c=>c==n));
        if(lilN.length) cemjs.push(['🆕','▶️',...lilN.map(c=>tools.emj(c))]);
      const lilM = maxlist.filter(m=>lil.find(c=>c==m));
        if(lilM.length) cemjs.push(['🈵','▶️',...lilM.map(c=>tools.emj(c))]);
      cemjs.push(lil.map(c=>tools.emj(c)));
      const cnum = 10;
      cemjs.forEach((e,index)=>{
        for(let i = 0 ; i < Math.ceil(e.length / cnum) ; i++){
          const line = e.slice(i*cnum, i*cnum+cnum);
          resultlist.push(line.join(''));
        };
        if(index<cemjs.length-1) resultlist.push(hr);
      })
    })
  };
  infogachalist = resultlist.join('\n');
  
  //■■チケット
  let infoticket;
  if     (type=='初回')        infoticket = '🎫×'+pata.ticketNew+' 🧧×'+pata.envelopeNew+' 🎟️×'+pata.inviteNew+' を獲得しました！' ;
  else if(type=='封筒')        infoticket = '🧧×1 を消費しました。';
  else if(type.match(/百連$/)) infoticket = '🎫×20 を消費しました。';
  else                        infoticket = '🎫×1 を消費しました。' ;
  
  //■■超過
  const infoover = (Number(over)) ? '\n5枚を超過したカードを '+ Number(over) +'c として取得しました。' : '' ;
  
  //■■残量
  const envelope = (Number(ploga[3].split(':')[1])) ? ' 🧧×' + ploga[3].split(':')[1] : '';
  const ring     = (Number(ploga[3].split(':')[2])) ? ' 💍×' + ploga[3].split(':')[2] : '';
  const invite   = (Number(ploga[3].split(':')[4])) ? ' 🎟️×' + ploga[3].split(':')[4] : '';
  const infozanryo = '🪙'+Number(ploga[5].split(':')[2]).toLocaleString()+'c 🎫×'+ploga[3].split(':')[0]+envelope+ring+invite;
       
  //■■description完成 
  Rdescription = infogachalist + hrbr + infocomplete + infoticket  + infoover + hrbr + infozanryo;
  
  console.log('■■■メッセージ作成結果■■■ : \n'+[Rcontent,Rtitle,Rdescription,].join('\n'));
  
  //■■■■■■■■■■メッセージ送信■■■■■■■■■■
  await ResultCards.forEach(result=>PentaResult(...result));
  await PentaResult(message.channel, Rcontent, '', '', Rtitle, Rdescription, color, message.author.displayAvatarURL(), pata.pentaname, '', fields);
  console.log('■■■メッセージ投稿完了■■■');
  
  console.log('▲▲▲'+message.author.username);

  return;
};

//■■■■■■■■■■■■■■■■■■■■　★ステータス・図鑑　■■■■■■■■■■■■■■■■■■■■
async function pentazukan({client, data, pata, tools, message, command, ploga, event}){
  console.log('■penta.js　ステータス・図鑑');
  const april = (tools.getDateText().match(/\/4\/1$/));
  const tm = pata.themes.find(t=>t.id==ploga[7].split('/')[0]) ;
  const orcards = data.characters.filter(c => c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm');
  const spcards = pata.spcards(orcards);
  const characters = (april) ? orcards.concat(spcards)
                             : orcards.concat(spcards.filter(c => !(c.eventid&&c.eventid=='PSEUDO')||c.id.match(/くらまえ/)));
  const plogc = ploga[8].split(/(?<=\d)/).map(c => [c.slice(0,-1), c.slice(-1)]); //[ ['aあ', '1'],['bだ', '2'],['bた', '3'] ]
  const mycards = plogc.map(lc => { const chr = JSON.parse(JSON.stringify(characters.find(c => c.sid == lc[0]))); chr.collected=Number(lc[1]); return chr; });
  const mycards2 = [];
  characters.forEach(c=>{ const mc2 = mycards.find(mc=>mc.id==c.id);
                          if(mc2){mycards2.push(mc2)} });
  
  let chrlist = characters;
  let titlegname = ''
  //条件に応じてフィルタリングして検索対象リストを作る
  if(command[1]){
    let gname = command[1].split(/性|年|年生|部|委員|科/i)[0];
    if     (command[1].match(/部/))           { titlegname='('+gname+'部)';   chrlist = characters.filter(c => c['club'].includes(gname));}
    else if(command[1].match(/委員/))         { titlegname='('+gname+'委員会)';chrlist = characters.filter(c => c['committee'].includes(gname));}
    else if(command[1].match(/年|年生/))       { titlegname='('+gname+'年生)'; chrlist = characters.filter(c => c['grade']==gname);}
    else if(command[1].match(/男|女|\?性|X性/)){ titlegname='('+gname+'性)';   chrlist = characters.filter(c => c['sex']==gname);}
    else if(command[1].match(/寮$/))          { titlegname='('+gname+')';    chrlist = characters.filter(c => c['dorm']==gname);}
    else if(command[1].match(/科/))           { titlegname='('+gname+'科)';   gname = tools.ReSymbolize(data.symbols, gname, 'majork', 'major');
                                                                             chrlist = characters.filter(c => c['major']==gname);}
    else if(command[1].match(/生徒会/))        { titlegname='('+gname+')';    chrlist = characters.filter(c => c['committee'].includes('生徒会'));}
    else if(command[1].match(/首席/))         { titlegname='('+gname+')';     chrlist = characters.filter(c => c['position'].includes('首席'));}
    else if(command[1].match(/寮長/))         { titlegname='('+gname+')';     chrlist = characters.filter(c => c['position'].includes('寮長'));}
    else if(command[1].match(/^[☆★⭐星]/))  { const gnamenum = gname.replace(/[☆★⭐星]/g, '');
                                               titlegname='(⭐'+gnamenum+')';chrlist = characters.filter(c => c['rarity']==gnamenum);}
    else if(command[1].match(/^(lv\.?|れべる)|枚$/i)){ const gnamenum = gname.replace(/lv\.?|れべる|枚/gi, '');
                                               titlegname='(Lv.'+gnamenum+')';chrlist = mycards2.filter(c => c['collected']==gnamenum);}
    else if(command[1].match(/教師|先生/))     { titlegname='(教師)';          chrlist = characters.filter(c => c['belong'].includes('(教師)'));}
    else{const targetevent = pata.eventlist.find(e=>e.id==command[1].toUpperCase()||e.nnprefix.includes(tools.hiraganize(command[1])));
         if(targetevent)                     { titlegname=targetevent.nameTail; chrlist=characters.filter(c=>c.eventid&&c.eventid==targetevent.id); }
         else{
           const aObj = tools.convertAlias(data.authors, command[1].split(data.authorunit)[0], 'name', 'alias'); //nameAはinit, nameBはalias[0]です
           if(aObj.index > -1)               { titlegname='('+aObj.nameA+')';chrlist = characters.filter(c => c['author']==aObj.nameA);};
         };
    };
  };
  
  
  const playername = (message.member) ? message.member.displayName : message.author.username ;

  const logitems   = ploga[3].split(':');
  const eventtext  = (event) ? '\nイベント：'+logitems[5].split('/')[1].split(' ').map((item,index)=>event.item[index].emoji+'×'+item).join(' ') : '';
  
  const logcounter = ploga[6].split(':');
  const logbwscore = ploga[4].split('/');
  const bestscore  = (logbwscore[0] == 'なし')                 ? 'なし' : logbwscore[0].split(':')[0].split(' ').map(i => tools.emj(characters.concat(pata.additional).find(c => c.id == i)) ).join('')+' '+logbwscore[0].split(':')[1]+'p';
  const worstscore = (!logbwscore[1]||logbwscore[1] == 'なし') ? 'なし' : logbwscore[1].split(':')[0].split(' ').map(i => tools.emj(characters.concat(pata.additional).find(c => c.id == i)) ).join('')+' '+logbwscore[1].split(':')[1]+'p';
  
  const envelope = (Number(logitems[1])) ? ' 🧧×' + logitems[1] : '';
  const ring     = (Number(logitems[2])) ? ' 💍×' + logitems[2] : '';
  const complete = (Number(logitems[3])) ? '🏵️'.repeat(Number(logitems[3])) : '';
  const invite   = (Number(logitems[4])) ? ' 🎟️×' + logitems[4] : '';
  const report   = (logitems[6]&&Number(logitems[6])) ? ' 📑×' + logitems[6] : '';
  const ribbon   = (logitems[7]&&Number(logitems[7])) ? ' 🎗️×' + logitems[7] : '';
  const title = playername + ' のステータス' + complete;
  
  //■■■お気に入り系ここから
  let fserifu=''; let favcards=''; let myfx = ''; let thumbnailurl='';
  const slogch   = client.channels.cache.get(pata.settingslog);
  const slogs    = await slogch.messages.fetch({ limit:100 });
  const slog     = await slogs.find(set => set.content.includes(message.author.id));
  if(slog){
    const settings = slog.content.split('\n'); console.log(settings);
    if((settings[3]&&(settings[3]!=='none' || settings[3]=='favorite'&&settings[1]!=='none'))||(!settings[3]&&settings[1]!=='none')){
      const fid = (!settings[3]||settings[3]=='favorite') ? settings[1] : settings[3]; console.log('fid : '+fid);
      
      //セリフ
      const smsgs1 = await client.channels.cache.get(pata.fspserifulogS).messages.fetch({ limit:100 });
      const smsgs2 = await client.channels.cache.get(pata.fserifulogS).messages.fetch({ limit:100 });
      const smsgs  = smsgs1.concat(smsgs2);
      const allsrflines = smsgs.map(message => message.content).join('\n').split('\n');
      let fchr;
      if(fid=='random'){const choices = mycards.filter(c => allsrflines.some(sl=>sl.startsWith(c.name+'＠＠')));
                        fchr = choices[Math.floor(Math.random()*choices.length)]; }
      else              fchr = mycards.find(c => c.id == fid);
      const chrsrflines = allsrflines.filter(line => line.includes(fchr.name+'＠＠') );
      fserifu = ((chrsrflines.length>0) ? tools.emj(fchr)+fchr.name+'\n```「' + chrsrflines[Math.floor(Math.random()*chrsrflines.length)].split('＠＠')[1] + '」```\n' : '');
      
      //サムネ
      const april = (tools.getDateText().match(/\/4\/1$/));
      const tchids = [];    tchids.unshift(data.DataSet[fchr.genre]['Thumbnail']);
      if(fchr.eventid)      tchids.unshift(pata.sptnlog);
      if(fchr.collected>=5) tchids.unshift(pata.maxtnlog);
      if(fchr.collected==7) tchids.unshift(pata.extratnlog);
      if(april)                   tchids.unshift(data.DataSet.april['Thumbnail']);

      let ti = 0; console.log('tchids : '+tchids);
      do{ console.log('ti : '+ti);
            const tmsgs = await client.channels.cache.get(tchids[ti]).messages.fetch({ limit:100 });
            const tmsg = await (tchids[ti]==pata.sptnlog||tchids[ti]==pata.maxtnlog||tchids[ti]==pata.extratnlog||(tchids[ti]==data.DataSet.april['Thumbnail']&&fchr.eventid&&fchr.eventid.match(/PSEUDO|SECRET/))) //完全一致の条件
                         ? tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.split('：')[0]==fchr.name)
                         : tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(fchr.name.split('(')[0]));
            if(tmsg) thumbnailurl = tmsg.split('：')[1]; console.log('thumbnailurl : '+thumbnailurl);
            ti++;
      }while(!thumbnailurl&&ti<tchids.length);console.log('thumbnailurl : '+thumbnailurl);
  
      if(!thumbnailurl) thumbnailurl = data.noimage;
    };
    const fchrname = (settings[1]=='none')     ? ''
                   : tools.emj(characters.find(c => c.id == settings[1]));
    if(fchrname) favcards += '\n💛お気に入り：'+fchrname;

    const lchrname = (!settings[2]||settings[2]=='favorite') ? (!settings[1]||settings[1]=='none') ? '' : '💛共通'
                   : (settings[2]=='random')   ? '🔀'
                   : (settings[2]=='none')     ? ''
                   : tools.emj(characters.find(c => c.id == settings[2]));
    if(lchrname) favcards += '\nログイン💬：'+lchrname;

    const schrname = (!settings[3]||settings[3]=='favorite') ? (!settings[1]||settings[1]=='none') ? '' : '💛共通'
                   : (settings[3]=='random')   ? '🔀'
                   : (settings[3]=='none')     ? ''
                   : tools.emj(characters.find(c => c.id == settings[3]));
    if(schrname) favcards += '\nステータス💬：'+schrname;
    
    if(settings[5]&&settings[5].split('/')[1]!=='df'){
      myfx = '\nMy効果：'+pata.episodes.find(e=>e.myfxid&&e.myfxid==settings[5].split('/')[1]).f().title;
    };
  };
  //■■■お気に入り系ここまで
  
  
  const description = fserifu
                    + '🪙' + Number(ploga[5].split(':')[2]).toLocaleString() + 'c 🎫×' + logitems[0] + envelope + ring + invite + report + ribbon
                    + '\nLv.' + ploga[5].split(':')[1] + ' (累計' + ploga[5].split(':')[0] + 'p)'
                    + '\nテーマ：' + tm.name + myfx
                    + '\nBEST：' + bestscore
                    + '\nWORST：' + worstscore
                    //+ '\n開始：' + ploga[1]
                    //+ '\n最終日：' + ploga[2]
                    + '\nガチャ：' + logcounter[0] + '回'
                    + '\nPENTA：' + logcounter[1] + '回' + favcards + eventtext ;
  PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), title, description, tm.color, '', '', thumbnailurl );

  if(!(command[1]&&command[1].match(/^(すてーたす|ステータス)/))){
    const listname = ['通常','特殊'];
    const chrlistlist = [];
    chrlistlist[0] = chrlist.filter(chr=>!chr.eventid);
    chrlistlist[1] = chrlist.filter(chr=>chr.eventid);

    chrlistlist.forEach((list,li)=>{console.log('li : '+li);
      const newlist = JSON.parse(JSON.stringify(list)); //Lv情報を追加したリストを作ります
      newlist.forEach(c=>{const plogcC = plogc.find(lc => lc[0] == c.sid);
                                c.collected=(plogcC)?plogcC[1]:0}); console.log('newlist : '+newlist.map(c=>c.id).join('・'));
      if(newlist.filter(c=>c.collected>0).length>0){
        const resultlist = [];
        const eventids = (li) ? [...new Set(newlist.filter(c=>c.collected>0).map(chr=>chr.eventid))] : undefined; console.log('eventids : '+eventids);

        const bumbolist  = (li) ? newlist.filter(c=>eventids.includes(c.eventid)) : newlist ;
        const bumbo  = bumbolist.length;
        const bunshi = bumbolist.filter(c=>c.collected>0).length;
        const flower = (bumbolist.every(c=>c.collected==7)) ? '🏵️🏵️🏵️'
                     : (bumbolist.every(c=>c.collected>=5)) ? '🏵️🏵️'
                     : (bumbolist.every(c=>c.collected>0))  ? '🏵️'
                     : '' ;

        let loopcount = 0;
        do{ const nowlist = (li) ? newlist.filter(c=>c.eventid==eventids[loopcount]) : newlist;
            if(li){ const ev = pata.eventlist.find(el=>el.id==eventids[loopcount]);console.log(li+' : '+eventids[loopcount]);
                    const evflower = (nowlist.every(c=>c.collected==7)) ? '🏵️🏵️🏵️'
                                   : (nowlist.every(c=>c.collected>=5)) ? '🏵️🏵️'
                                   : (nowlist.every(c=>c.collected>0))  ? '🏵️'
                                   : '' ;
                    const evtitle = '\n__'+ ev.emoji+ev.shortname + '__' + evflower;
                    resultlist.push(evtitle);};

            const cemjs = nowlist.map(c => {const ce = (c.collected>0) ? tools.emj(c) : '◼️' ;
                                            const cn = (c.collected>1) ? tools.ndouble(c.collected) : '　';
                                            return ce + cn; });
            for(let i=0; i<Math.ceil(cemjs.length/6); i++){ const line = cemjs.slice(i*6, i*6+6);
                                                            resultlist.push(line.join('  ')); };
            loopcount++; }while(li&&loopcount<eventids.length);

        const catalog = resultlist.join('\n');

        if(newlist.some(c=>c.collected>0)) PentaResult(message.channel, '', '', '', playername+'の'+listname[li]+'カード一覧'+titlegname+((li)?'':' '+ bunshi+'/'+bumbo+flower), catalog, tm.color, message.author.displayAvatarURL(), pata.pentaname, '' );
      };
    });
  };

  console.log('▲▲▲'+message.author.username);
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★ショップ　■■■■■■■■■■■■■■■■■■■■
async function pentashop({client, data, pata, tools, message, command, plog, ploga, event}){
  console.log('■■■■■PENTA-SHOP■■■■■');
  
  const sdate = new Date(); await sdate.setHours(sdate.getHours() + 9);
  const dow = sdate.getDay();
  const logitems  = ploga[3].split(':');
  const logpoints = ploga[5].split(':');
  const logevent      = await (event) ? logitems[5].split('/') : null ;
  const logeventitems = await (event) ? logevent[1].split(' ') : null ;
  
  const mode = (command[0].match(/い$/)&&event)                ? 'event'
             : (command[0].match(/か$/))                       ? 'cash'
             : (command[0].match(/う$/)&&message.guild===null&&(logitems[6]&&Number(logitems[6]))) ? 'secret'
             : (command[0].match(/め$/))                       ? 'memorial'
                                                               : 'normal';
  console.log('mode : '+mode);
  
  const shopname = (mode=='memorial') ? '🎗️メモリアルショップ🎗️'
                 : (mode=='event'&&event.shopname) ? event.shopname+'(PENTA-SHOP)'
                 : 'PENTA-SHOP';
  const titleadd = (mode=='event')    ? '(イベント)'
                 : (mode=='cash')     ? '(換金)'
                 : (mode=='secret')   ? '(裏取引)'
                 : (mode=='memorial') ? ''
                                      : ' '+['🔴日','⚪月','🟠火','🟣水','🟢木','🟡金','🔵土'][dow]+'曜';
  const shoplist = await (mode=='event')    ? event.shoplist
                       : (mode=='cash')     ? pata.shoplistCash
                       : (mode=='secret')   ? pata.shoplistSecret
                       : (mode=='memorial') ? pata.shoplistMemorial
                                            : pata.shoplist.filter(item=>!item.dow||item.dow.includes(dow));
  
  const color = (mode=='event')    ? event.color
              : (mode=='secret')   ? pata.colorsecretshop
              : (mode=='memorial') ? pata.colormemorialshop
                                   : pata.color;
  
  if(command.length==1){ //■■■一覧表示
    console.log('■■■表示■■■');
    let thumbnailurl = ''; let shopserifu = '';
    if(mode=='secret'){
      const smsgs = await client.channels.cache.get(pata.shopserifulog).messages.fetch({ limit:100 });
      const srflines = smsgs.map(message => message.content).join('\n').split('\n');
      const srfline = srflines[Math.floor(Math.random()*srflines.length)];
      const chr = data.characters.find(c => c.name == srfline.split('＠＠')[0]);
      shopserifu = tools.emj(chr)+chr.name+'\n```「'+srfline.split('＠＠')[1]+'」```\n';
    }
    else if(mode=='event'){
      const smsgs = await client.channels.cache.get(pata.eshopserifulog).messages.fetch({ limit:100 });
      const srflines = smsgs.map(message => message.content).join('\n').split('\n').filter(l=>l.split('＠＠')[2]==event.id);
      if(srflines.length>0){
        const srfline = srflines[Math.floor(Math.random()*srflines.length)];
        const spcards = await pata.spcards(data.characters);
        const chr = spcards.find(c => c.name == srfline.split('＠＠')[0]);
        shopserifu = tools.emj(chr)+chr.name.split('(')[0]+'\n```「'+srfline.split('＠＠')[1]+'」```\n';
      };
    };
    
    
    const description = ( (mode=='event')    ? shopserifu+'「！ぺしい　(番号 or 商品名 or id)」等の入力で交換できます。'
                        : (mode=='cash')     ? '「！ぺしか　(番号 or 対象名 or id)」等の入力で換金できます。'
                        : (mode=='secret')   ? shopserifu+'「！ぺしう　(番号 or 対象名 or id)」等の入力で取引できます。'
                        : (mode=='memorial') ? '「！ぺしめ　(番号 or 対象名 or id)」等の入力で交換できます！'
                                             : '「！ぺし　(番号 or 商品名 or id)」等の入力で購入できます。\n※毎日商品が入れ替わるため、番号入力にはご注意ください。\n換金は「！ぺしか」'
                                             +((event)?'、イベントは「！ぺしい」':'')+'から。'
                                             +((command[0].match(/う$/)) ? ((message.guild===null)?'\n……「！ぺしう」？ 取引に必要なものをお持ちではないとお見受けしますが……。'
                                                                                                  :'\n……ちなみに、「！ぺしう」というコマンドはありませんよ。') : '')
                                             +((logitems[6]&&Number(logitems[6]))?((message.guild===null)?'\n……マイナス点のレポ📑……。それをお持ちの皆さんはなぜかあちらの方へ行かれます。→「！ぺしう」'
                                                                                                       :'\n……マイナス点のレポ📑？ そんなもので取引をしたがる物好きなんているんでしょうか……。\nいるとすれば、__ほかに誰もいない場所__がお好みかもしれませんね。'):'')
                        )
                      + '\n'
                      + '🪙' + Number(logpoints[2]).toLocaleString() + 'c'
                      + ( mode=='secret'   ? ' 📑×' + logitems[6]
                        : mode=='memorial' ? ' 🎗️×' + logitems[7] 
                        : ' 🎫×' + logitems[0]
                          + ((Number(logitems[1])) ? ' 🧧×' + logitems[1] : '')
                          + ((Number(logitems[2])) ? ' 💍×' + logitems[2] : '')
                          + ((Number(logitems[4])) ? ' 🎟️×' + logitems[4] : '')
                          + ((event) ? ' '+logeventitems.map((item,index)=>event.item[index].emoji+'×'+item).join(' ') : '')
                        )
                      + '\n──────────────────\n'
                      + shoplist.map((item,index)=>{
                          return tools.nemj(index+1)+' '+item.title+' '
                                 + ( (item.itemToLose=='eventitem') ? event.item[item.itemToLoseIndex].emoji+item.numToLose
                                                                    : itememoji(item.itemToLose)+item.numToLose.toLocaleString() )
                                 + ( (item.itemToLose=='coin') ? 'c' : '個' )
                                 + ( (item.itemToGet=='coin') ? '→🪙'+item.numToGet.toLocaleString()+'c' : '' )
                                 + ' 🆔'+item.id+((item.description)?'```'+item.description+'```':'\n');
                        }).join('──────────────────\n');
    PentaResult(message.channel, '', shopname, message.author.displayAvatarURL(), ((mode=='secret')?'😈取引':'🛍️商品')+'一覧'+titleadd, description, color, '', pata.pentaname, thumbnailurl);
  }
  else if(command.length==2){ //■■■購入操作
    if(mode=='normal'&&command[0].match(/う$/)){PentaResult(message.channel, '', shopname, message.author.displayAvatarURL(), ((message.guild===null)?'取引に必要なものをお持ちではないとお見受けしますが……。':'「！ぺしう」というコマンドはありませんよ。'), '', color, '', pata.pentaname);return;};
    
    const logthemes     = ploga[7].split('/');
    const logthemeslist = logthemes[1].split(' ');
    
    const logheader = '■■■■■' + message.author.id + ' ' + message.author.username;
    const slogch = client.channels.cache.get(pata.settingslog);
    let settingsbefore = [logheader, 'none', 'favorite', 'favorite', 'テーマ/df/df', 'My効果/df/df'];
    const slogs = await slogch.messages.fetch({ limit:100 });
    const slog  = await slogs.find(m => m.content.includes(message.author.id));
    if(slog) settingsbefore = slog.content.split('\n');
    const settings = Array.from(settingsbefore); settings[0] = logheader;
    /*
    const klogch = client.channels.cache.get(pata.keeplog);
    let keepsbefore = [logheader];
    const klogs = await klogch.messages.fetch({ limit:100 });
    const klog  = await klogs.find(m => m.content.includes(message.author.id));
    if(klog) keepsbefore = klog.content.split('\n');
    const keeps = Array.from(keepsbefore); keeps[0] = logheader;
    */
    
    //■■■selected item
    let si = '';
    if(command[1].match(/^\d+$/)) si = shoplist.find((item,index)=>index+1==Number(command[1]));
    else si = shoplist.find(item=>item.id==command[1]||item.name==command[1]||item.title==command[1]);
    if(!si){PentaResult(message.channel, '', shopname, message.author.displayAvatarURL(), 'コマンドに誤りがあるか、本日取り扱っておりません。', '', color, '', pata.pentaname);return;};
    
    //■■■不足メッセージ
    if(((si.itemToLose=='coin')     ? Number(logpoints[2])
       :(si.itemToLose=='ticket')   ? Number(logitems[0])
       :(si.itemToLose=='envelope') ? Number(logitems[1])
       :(si.itemToLose=='jewel')    ? Number(logitems[2])
       :(si.itemToLose=='invite')   ? Number(logitems[4])
       :(si.itemToLose=='report')   ? (logitems[6]&&Number(logitems[6]))
       :(si.itemToLose=='ribbon')   ? (logitems[7]&&Number(logitems[7]))
       :(si.itemToLose=='eventitem')? Number(logeventitems[si.itemToLoseIndex])
       :undefined) < si.numToLose){
      PentaResult(message.channel, '', shopname, message.author.displayAvatarURL(), ((si.itemToLose=='coin')?'コイン':'アイテム')+'が不足しています。', '', color, '', pata.pentaname);
      return; };
    
    //■■■■■■■■■■■■■■■■■■■■　獲得　■■■■■■■■■■■■■■■■■■■■
    if     (si.itemToGet=='coin')      { logpoints[2] = Number(logpoints[2]) + si.numToGet; }
    else if(si.itemToGet=='ticket')    { logitems[0] = Number(logitems[0]) + si.numToGet; }
    else if(si.itemToGet=='envelope')  { logitems[1] = Number(logitems[1]) + si.numToGet; }
    else if(si.itemToGet=='jewel')     { logitems[2] = Number(logitems[2]) + si.numToGet; }
    else if(si.itemToGet=='invite')    { logitems[4] = Number(logitems[4]) + si.numToGet; }
    else if(si.itemToGet=='ribbon')    { logitems[7] = Number(logitems[7]) + si.numToGet; }
    else if(si.itemToGet=='theme')     { if(logthemeslist.find(tm=>tm==si.id)){PentaResult(message.channel, '', shopname, message.author.displayAvatarURL(), si.name+' は既に持っています。', '', color, '', pata.pentaname);
                                                                               return;};
                                         logthemeslist.push(si.id); }
    else if(si.itemToGet=='eventitem') { logeventitems[si.itemToGetIndex] = Number(logeventitems[si.itemToGetIndex]) + si.numToGet; }
    else if(si.itemToGet=='card'){
      const today = tools.getDateText();
      const april = (today.match(/\/4\/1$/)) ? true : false ;
      const plogc = ploga[8].split(/(?<=\d)/).map(c => [c.slice(0,-1), c.slice(-1)]); //[ ['aあ', '1'],['bだ', '2'],['bた', '3'] ]
      const orcards = await data.characters.filter(c => c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm');
      const spcards = await pata.spcards(orcards);
      const characters = await orcards.concat(spcards);
      const chr = await characters.find(c=>c.id==si.cardidToGet);
      console.log('■■■交換対象■■■ : '+chr.name);
      
      //■■■■■■■■■■処理■■■■■■■■■■
      let count = '';
      const cindex = await plogc.findIndex(lc => lc[0] == chr.sid); //取得キャラログに今回引いたキャラidに一致するものがあるか
      const level = (cindex!==-1) ? Number(plogc[cindex][1]) : 0;
      if(level==0)      { count = ' 🆕';
                          await plogc.push([chr.sid, '1']); }
      else if(level < 5){ const added = level+1; //1足された状態
                          count = (added==5) ? ' 🈵' : ' ['+added+'枚目]';
                          plogc[cindex][1] = await added; }
      else if(level == 5) count = ' [Lv.MAX]'
      else if(level == 7) count = ' [Lv.EXTRA💍]' ;

      //■■■■■ 単カード発言
      //■■ 発言作成：文章セリフ欄
      let srfline;
      if(level==0||april){
        const serifulog = (april&&!chr.eventid) ? pata.aprilserifulog : pata.serifulog;
        const smsgs = await client.channels.cache.get(serifulog).messages.fetch({ limit:100 });
        srfline = smsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(chr.name+'＠＠') );
      }
      const introduction = (srfline) ? '\n```「' + srfline.split('＠＠')[1] + '」```' : '';
      //■■ 発言作成：文章完成
      const description = (level>=5) ? '※Lvが上限に達しています。 '+((si.itemToLose=='coin')?'コイン':'アイテム')+'は消費されませんでした。\n余剰アイテムはイベント終了後コイン🪙として還元されます。'
                        : (chr.major ? tools.ReSymbolizeC(client, message, data.symbols, chr.major, 'major', 'majoremj') + chr.major + '科 / ' : '' )
                        + (chr.grade ? tools.ReSymbolizeC(client, message, data.symbols, chr.grade, 'grade', 'gradeemj') + chr.grade + '年' : (chr.genre=='tcTm') ? '🧑‍🏫教師' : '関係者') + ' / '
                        + chr.sex + ' / '
                        + '©' + chr.author
                        + introduction;

      //■■ 発言作成：サムネイル
      let thumbnailurl = '';
      const tchids = []; tchids.unshift(data.DataSet[chr.genre]['Thumbnail']); //教師やるならここを書き換えようね
      if(chr.eventid)    tchids.unshift(pata.sptnlog);
      if(level>=4)       tchids.unshift(pata.maxtnlog);
      if(level==7)       tchids.unshift(pata.extratnlog);
      if(april)          tchids.unshift(data.DataSet.april['Thumbnail']);

      let ti = 0;
      do{
        const tmsgs = await client.channels.cache.get(tchids[ti]).messages.fetch({ limit:100 });
        const tmsg = await (tchids[ti]==pata.sptnlog||tchids[ti]==pata.maxtnlog||tchids[ti]==pata.extratnlog||(tchids[ti]==data.DataSet.april['Thumbnail']&&chr.eventid&&chr.eventid.match(/PSEUDO|SECRET/))) //完全一致の条件
                     ? tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.split('：')[0]==chr.name)
                     : tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(chr.name.split('(')[0]));
        if(tmsg) thumbnailurl = tmsg.split('：')[1]; console.log('thumbnailurl : '+thumbnailurl);
        ti++;
      }while(!thumbnailurl&&ti<tchids.length);
  
      if(!thumbnailurl) thumbnailurl = data.noimage;

      //■■ 発言作成：メッセージ送信
      const gettext = (level<5) ? 'GET! '+pata.raritytext(chr) : '交換 失敗' ;
      const ccolor = (level==7) ? pata.colorx : (chr.eventid) ? pata.eventlist.find(e=>e.id == chr.eventid).color : pata.colorr[chr.rarity]; ;
      await PentaResult(message.channel, '', gettext, message.author.displayAvatarURL(), tools.emj(chr)+chr.name+count, description, ccolor, '', '', thumbnailurl);

      //■■■■■■■■■■非超過ゆえ処理■■■■■■■■■■
      if(level<5) ploga[8] = plogc.map(c => c.join('')).join('');
      else return;
    }
    else if(si.itemToGet=='episode')   { if(!settings[5]) settings[5] = 'My効果/df/df';
                                         if(settings[5].split('/')[2].includes(si.id)){PentaResult(message.channel, '', shopname, message.author.displayAvatarURL(), 'この話 '+si.name+' はもう知っていた。', '', color, '', pata.pentaname);
                                                                                       return;}
                                         else settings[5]+=' '+si.id;
                                       };
    
    //■■■■■■■■■■■■■■■■■■■■　消費　■■■■■■■■■■■■■■■■■■■■
    if     (si.itemToLose=='coin')      { logpoints[2] = Number(logpoints[2]) - si.numToLose; }
    else if(si.itemToLose=='ticket')    { logitems[0] = Number(logitems[0]) - si.numToLose; }
    else if(si.itemToLose=='envelope')  { logitems[1] = Number(logitems[1]) - si.numToLose; }
    else if(si.itemToLose=='jewel')     { logitems[2] = Number(logitems[2]) - si.numToLose; }
    else if(si.itemToLose=='invite')    { logitems[4] = Number(logitems[4]) - si.numToLose; }
    else if(si.itemToLose=='report')    { logitems[6] = Number(logitems[6]) - si.numToLose; }
    else if(si.itemToLose=='ribbon')    { logitems[7] = Number(logitems[7]) - si.numToLose; }
    else if(si.itemToLose=='eventitem') { logeventitems[si.itemToLoseIndex] = Number(logeventitems[si.itemToLoseIndex]) - si.numToLose; };
    
    //■■■ログ作成
    console.log('■■■ログ処理■■■');
    if(si.itemToGet=='eventitem'||si.itemToLose=='eventitem'){
      logevent[1] = logeventitems.join(' ');
      logitems[5] = logevent.join('/');
    };
    ploga[3] = logitems.join(':');
    ploga[5] = logpoints.join(':');
    logthemes[1] = logthemeslist.join(' ');
    ploga[7] = logthemes.join('/');

    //■■■ログ書込
    const sent = await message.channel.send('書込中 そのままお待ちください...');
    await plog.edit(ploga.join('\n'));
    if(JSON.stringify(settings) !==JSON.stringify(settingsbefore)){ if(slog) await slog.edit(settings.join('\n')); else await slogch.send(settings.join('\n')); };
    console.log('■ログ書込完了 : '+ploga.join('\n　'));
    sent.delete();

    //■■メッセージ
    const title = (mode=='secret') ? 'あなたは '+((si.itemToGet=='coin') ? '🪙' + si.numToGet.toLocaleString()+'c' : si.title )+' を裏取引で手に入れた……。'
                                   : ((si.itemToGet=='coin') ? '🪙' + si.numToGet.toLocaleString()+'c へ換金' : si.title+' を購入' ) + 'しました！🛍️';
    const description = ((si.descriptionAfter)             ? si.descriptionAfter+(!si.command?'\n':'') : '')
                      + ((si.command)                      ? '```使用コマンド例：' + si.command + '```' : '')
                      + ((si.descriptionAfter||si.command) ?'──────────────────\n':'')
                      //+ ((si.itemToGet=='episode')?'《裏取引効果》として、MAGICA-PENTAのプレイ中条件を満たしたとき発動します。\n':'')
                      + ((si.itemToLose=='coin')     ? '🪙' + si.numToLose.toLocaleString() + 'c'
                        :(si.itemToLose=='eventitem')? event.item[si.itemToLoseIndex].name + si.numToLose+'個'
                        : itememoji(si.itemToLose)+si.numToLose+'個' )
                      + ' を消費しました。\n──────────────────\n'
                      + '🪙' + Number(logpoints[2]).toLocaleString() + 'c '
                      + ((si.itemToGet=='eventitem'||si.itemToLose=='eventitem')
                        ? event.item[si.itemToLoseIndex].emoji + '×' + logeventitems[si.itemToLoseIndex] + ((si.itemToGet=='eventitem')?' ' + event.item[si.itemToGetIndex].emoji + '×' + logeventitems[si.itemToGetIndex]:'')
                        : '🎫×' + logitems[0]
                          + ((Number(logitems[1])||si.itemToLose=='envelope') ? ' 🧧×' + logitems[1] : '')
                          + ((Number(logitems[2])||si.itemToLose=='jewel')    ? ' 💍×' + logitems[2] : '')
                          + ((Number(logitems[4])||si.itemToLose=='invite')   ? ' 🎟️×' + logitems[4] : '')
                          + ((logitems[6]&&Number(logitems[6])||si.itemToLose=='report')   ? ' 📑×' + logitems[6] : '')
                          + ((logitems[7]&&Number(logitems[7])||si.itemToLose=='ribbon')   ? ' 🎗️×' + logitems[7] : '')
                        );
    
    
    PentaResult(message.channel, '', shopname, message.author.displayAvatarURL(), title, description, color, '', pata.pentaname);    
  };
  
  console.log('▲▲▲'+message.author.username);
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★ベスト・ワーストスコア表示　■■■■■■■■■■■■■■■■■■■■
async function pentabestworst({client, pata, message, ftype:BorW}){
  console.log('■■■■■'+BorW.toUpperCase()+'スコア表示■■■■■');
  const msgs = await client.channels.cache.get(pata[BorW+'scorelog']).messages.fetch({ limit:100 });
  const msg = msgs.find(m=>m.content.split('\n')[0] == message.author.id);
  if(msg) {
    const be = msg.embeds[0]; console.log(be);
    const imageurl = (be.image) ? be.image.url : '' ;
    PentaResult(message.channel, msg.content.split('\n')[1], be.author.name, be.author.iconURL, be.title, be.description, be.color, be.footer.iconURL, be.footer.text, '', be.fields, imageurl);
  }
  else PentaResult(message.channel, '', '', '', BorW.toUpperCase()+' SCORE が見つかりません。', '', pata.color, message.author.displayAvatarURL(), pata.pentaname, '' );
  console.log('▲▲▲'+message.author.username);
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★テーマ設定　■■■■■■■■■■■■■■■■■■■■
async function pentatheme({pata, tools, message, command, plog, ploga}){
  console.log('■■■■■テーマ設定■■■■■');
  const playername    = (message.member) ? message.member.displayName : message.author.username ;
  const logthemes     = ploga[7].split('/');
  const nowtheme      = pata.themes.find(t=>t.id==logthemes[0]);
  const logthemeslist = logthemes[1].split(' ');
  const themeslist    = logthemeslist.map(id=>pata.themes.find(t=>t.id==id));
  if(command.length==1){
    const description = '「！ぺて (番号 or テーマ名 or id)」等の入力でテーマを変更できます。';
    const themeslisttxts = logthemeslist.map((id,index)=>{ const num = (nowtheme.id == id) ? '▶️' : tools.nemj(index+1) ;
                                                         return num+' '+themeslist[index].name+' 🆔'+id; });
    PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), '🖼️'+playername+' の所持テーマ一覧', description+'\n'+themeslisttxts.join('\n'), nowtheme.color);
    return;
  }
  else{
    let newtheme;
    if     (Number(command[1])<=themeslist.length)                   newtheme = themeslist[Number(command[1])-1];
    else if(themeslist.find(t=>t.id==command[1]))                    newtheme = themeslist.find(t=>t.id==command[1]);
    else if(themeslist.find(t=>tools.hiraganize(t.name)==command[1]))newtheme = themeslist.find(t=>tools.hiraganize(t.name)==command[1]);
    else{PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), 'コマンドに誤りがあるか、該当テーマを所持していません。', '', nowtheme.color);return;};
    
    logthemes[0] = newtheme.id;
    ploga[7] = logthemes.join('/');
    
    //■■ログ書込
    const sent = await message.channel.send('書込中 そのままお待ちください...');
    await plog.edit(ploga.join('\n'));
    console.log('■ログ書込完了 : '+ploga.join('\n　'));
    sent.delete();
    
    PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), '🖼️テーマを「'+newtheme.name+'」に設定しました。', '', newtheme.color);
  
  console.log('▲▲▲'+message.author.username);
  
    return;
  };
};

//■■■■■■■■■■■■■■■■■■■■　★My効果設定　■■■■■■■■■■■■■■■■■■■■
async function pentamyfx({client, pata, tools, message, command, plog, ploga}){
  console.log('■■■■■My効果設定■■■■■');
  const playername    = (message.member) ? message.member.displayName : message.author.username ;
  const slogch = client.channels.cache.get(pata.settingslog);
  const slogs = await slogch.messages.fetch({ limit:100 });
  const slog  = await slogs.find(m => m.content.includes(message.author.id));
  const settings = slog.content.split('\n');
  if(!settings[5]) settings[5] = 'My効果/df/df';
  
  const logmyfxs     = settings[5].split('/');
  const nowmyfx      = pata.episodes.find(e=>e.myfxid&&e.myfxid==logmyfxs[1]);
  const logmyfxslist = logmyfxs[2].split(' ');
  const myfxslist    = logmyfxslist.map(id=>pata.episodes.find(e=>e.myfxid&&e.myfxid==id));
  if(command.length==1){
    const description = 'My効果📜は1つだけ設定できる追加エピソード効果です。\n「！ぺま (番号 or 効果名 or id)」等の入力でMy効果を変更できます。';
    const myfxslisttxts = logmyfxslist.map((id,index)=>{ const num = (nowmyfx.myfxid == id) ? '▶️' : tools.nemj(index+1) ;
                                                         return num+' '+myfxslist[index].f().title+' 🆔'+id+((id=='df')?'':'\n'+myfxslist[index].f().description); });
    PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), '📖'+playername+' の所持My効果📜一覧', description+'\n──────────────────\n'+myfxslisttxts.join('\n\n'), pata.color);
    return;
  }
  else{
    let newmyfx;
    if     (Number(command[1])<=myfxslist.length)                        newmyfx = myfxslist[Number(command[1])-1];
    else if(myfxslist.find(t=>t.myfxid==command[1]))                     newmyfx = myfxslist.find(t=>t.myfxid==command[1]);
    else if(myfxslist.find(t=>tools.hiraganize(t.f().title)==command[1]))newmyfx = myfxslist.find(t=>tools.hiraganize(t.f().title)==command[1]);
    else{PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), 'コマンドに誤りがあるか、該当テーマを所持していません。', '', pata.color);return;};
    
    logmyfxs[1] = newmyfx.myfxid;
    settings[5] = logmyfxs.join('/');
    
    //■■ログ書込
    const sent = await message.channel.send('書込中 そのままお待ちください...');
    await slog.edit(settings.join('\n'));
    console.log('■ログ書込完了 : '+settings.join('\n　'));
    sent.delete();
    
    PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), 'My効果を「'+newmyfx.f().title+'」に設定しました。', '', pata.color);
  
  console.log('▲▲▲'+message.author.username);
  
    return;
  };
};

//■■■■■■■■■■■■■■■■■■■■　★お気に入り設定　■■■■■■■■■■■■■■■■■■■■
async function pentafavorite({client, data, pata, tools, message, command, plog, ploga}){
  console.log('■■■■■お気に入り設定■■■■■');
  const tm = pata.themes.find(t=>t.id==ploga[7].split('/')[0]);
  if(command.length>=2){
    let mode = 'お気に入り';
    if     (command[1].match(/ろぐいん|ログイン/))   {command.splice(1,1); mode = 'ログイン';}
    else if(command[1].match(/すてーたす|ステータス/)){command.splice(1,1); mode = 'ステータス';};
    const index    = (mode=='お気に入り') ? 1
                   : (mode=='ログイン')   ? 2 : 3 ;
    const flogch   = client.channels.cache.get(pata.favoritelog);
    const flogs    = await flogch.messages.fetch({ limit:100 });
    const flog     = await flogs.find(fv => fv.content.includes(message.author.id));
    const favorite = (flog) ? flog.content.split('\n') : ['■■■■■' + message.author.id + ' ' + message.author.username, 'none', 'favorite', 'favorite', 'テーマ/df/df', 'My効果/df/df'];
    let title = '';
    let description = '';
    let thumbnailurl = '';
    
    if(command[1]=='なし'){
      favorite[index] = 'none';
      title = '💛'+mode+'カードを解除しました。';
      description = '';
    }
    else if(mode!=='お気に入り'&&command[1].match(/らんだむ|ランダム/)){
      favorite[index] = 'random';
      title = '💛'+mode+'カードをランダムに設定しました。';
      description = '「なし」を指定すると解除できます。';
    }
    else if(mode!=='お気に入り'&&command[1].match(/初期値|しょきち|お気に入り|おきにいり/)){
      favorite[index] = 'favorite';
      title = '💛'+mode+'カードを初期値(お気に入りと共通)に設定しました。';
      description = '「なし」を指定すると解除できます。';
    }
    else{
      const orcards = data.characters.filter(c => c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm');
      const spcards = pata.spcards(orcards);
      const characters = orcards.concat(spcards);
      const plogc    = ploga[8].split(/(?<=\d)/).map(c => [c.slice(0,-1), c.slice(-1)]); //[ ['aあ', '1'],['bだ', '2'],['bた', '3'] ]
      const allcards = plogc.map(lc => { const chr = JSON.parse(JSON.stringify(characters.find(c => c.sid == lc[0]))); chr.collected=Number(lc[1]); return chr; });

      const regname = /(先生|せんせい|せんせー|先輩|せんぱい|ぱいせん|部長|ぶちょう|委員長|いいんちょう)$/g ;
      if(command[1].match(regname)) command[1] = command[1].replace(regname, '');
      const chr = tools.getCharacter(allcards, command[1]);

      if(!chr||chr == 'multiple'){ PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), '', command[1]+' は所持カードにないか、複数のキャラに使用されています。表記を変更してお試しください。', tm.color); return;};
      
      if(chr.eventid=='PSEUDO'&&!chr.id.match(/^くらまえ/))  PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), tools.emj(chr)+chr.name+' [Lv.'+chr.collected+']', '該当のカードはお気に入りの対象ではありません。', (chr.eventid)?pata.eventlist.find(e=>e.id == chr.eventid).color:pata.colorr[chr.rarity], '', '', thumbnailurl);
      //■■■■■サムネイルURL取得
      const ds = data.DataSet[chr.genre];
      const april = (tools.getDateText().match(/\/4\/1$/));
      const tchids       = [pata.sptnlog, ds['Thumbnail']];
      if(chr.collected>=5) tchids.unshift(pata.maxtnlog);
      if(chr.collected==7) tchids.unshift(pata.extratnlog);
      if(april)            tchids.unshift(data.DataSet.april['Thumbnail']);

      let ti = 0;
      do{
        const tmsgs = await client.channels.cache.get(tchids[ti]).messages.fetch({ limit:100 });
        const tmsg = await (tchids[ti]==pata.sptnlog||tchids[ti]==pata.maxtnlog||tchids[ti]==pata.extratnlog||(tchids[ti]==data.DataSet.april['Thumbnail']&&chr.eventid&&chr.eventid.match(/PSEUDO|SECRET/))) //完全一致の条件
                     ? tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.split('：')[0]==chr.name)
                     : tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(chr.name.split('(')[0]));
        if(tmsg) thumbnailurl = tmsg.split('：')[1]; console.log('thumbnailurl : '+thumbnailurl);
        ti++;
      }while(!thumbnailurl&&ti<tchids.length);
  
      if(!thumbnailurl) thumbnailurl = data.noimage;

      favorite[index] = chr.id;
      title = tools.emj(chr)+chr.name+' を'+mode+'カードに設定しました。';
      description = '「なし」を指定すると解除できます。';
    };
    //■■■■■ログ書込
    const sent = await message.channel.send('書込中 そのままお待ちください...');
    if(flog) await flog.edit(favorite.join('\n')); else await flogch.send(favorite.join('\n'));
    console.log('■ログ書込完了 : '+favorite.join('\n　'));
    sent.delete();

    PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), title, description, tm.color, '', '', thumbnailurl);
  }
  else PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), 'カードを指定してください。', '', tm.color);
  
  console.log('▲▲▲'+message.author.username);
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★Lv.EXTRA設定　■■■■■■■■■■■■■■■■■■■■
async function pentalvextra({client, data, pata, tools, message, commandorig:command, plog, ploga, event}){
  console.log('■■■■■Lv.EXTRA設定■■■■■');
  const logitems = ploga[3].split(':');
  const logevent      = (event) ? logitems[5].split('/') : null ;
  const logeventitems = (event) ? logevent[1].split(' ') : null ;
  const tm = pata.themes.find(t=>t.id==ploga[7].split('/')[0]);
  const eventmode=(event&&event.extraindex!==undefined&&logeventitems[event.extraindex]>0)?true:false;
  if(Number(logitems[2])==0&&(!eventmode||(eventmode&&logeventitems[event.extraindex]==0)))
    { PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), '宝珠💍がありません。', '', tm.color);return; };
    
  if(command[1]){
    const orcards = data.characters.filter(c => c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm');
    const spcards = pata.spcards(orcards);
    const characters = orcards.concat(spcards);
    const plogc    = ploga[8].split(/(?<=\d)/).map(c => [c.slice(0,-1), c.slice(-1)]); //[ ['aあ', '1'],['bだ', '2'],['bた', '3'] ]
    const allcards = plogc.map(lc => { const chr = characters.find(c => c.sid == lc[0]); chr.collected=Number(lc[1]); return chr; });

    const regname = /(先生|せんせい|せんせー|先輩|せんぱい|ぱいせん|部長|ぶちょう|委員長|いいんちょう)$/g ;
    if(command[1].match(regname)) command[1] = command[1].replace(regname, '');
    const chr = tools.getCharacter(allcards, command[1]);
    
    if     (!chr||chr == 'multiple') PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), '', command[1]+' は所持カードにないか、複数のキャラに使用されています。表記を変更してお試しください。', tm.color);
    else{
      if(chr.eventid=='PSEUDO'&&!chr.id.match(/^くらまえ/))  PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), tools.emj(chr)+chr.name+' [Lv.'+chr.collected+']', '該当のカードはLv.EXTRAの対象ではありません。', (chr.eventid)?pata.eventlist.find(e=>e.id == chr.eventid).color:pata.colorr[chr.rarity], '', '', thumbnailurl);
      //■■■■■サムネイルURL取得
      const ds = data.DataSet[chr.genre];
      const today = new Date();
      today.setHours(today.getHours() + 9);
      let thumbnailurl = '';
      const tchids = [pata.sptnlog, ds['Thumbnail']];
      if(chr.collected>=5) tchids.unshift(pata.maxtnlog);
      if(chr.collected>=5) tchids.unshift(pata.extratnlog);
      if((today.getMonth()+1)+'/'+today.getDate() == '4/1') tchids.unshift(data.DataSet.april['Thumbnail']);

      let ti = 0;
      do{
        const tmsgs = await client.channels.cache.get(tchids[ti]).messages.fetch({ limit:100 });
        const tmsg = await (tchids[ti]==pata.sptnlog||tchids[ti]==pata.maxtnlog||tchids[ti]==pata.extratnlog||(tchids[ti]==data.DataSet.april['Thumbnail']&&chr.eventid&&chr.eventid.match(/PSEUDO|SECRET/))) //完全一致の条件
                     ? tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.split('：')[0]==chr.name)
                     : tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(chr.name.split('(')[0]));
        if(tmsg) thumbnailurl = tmsg.split('：')[1]; console.log('thumbnailurl : '+thumbnailurl);
        ti++;
      }while(!thumbnailurl&&ti<tchids.length);
  
      if(!thumbnailurl) thumbnailurl = data.noimage;
      
      if     (chr.collected<5)  PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), tools.emj(chr)+chr.name+' [Lv.'+chr.collected+']', '該当のカードはLv.MAXに達していません。', (chr.eventid)?pata.eventlist.find(e=>e.id == chr.eventid).color:pata.colorr[chr.rarity], '', '', thumbnailurl);
      else if(chr.collected==7) PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), tools.emj(chr)+chr.name+' [Lv.EXTRA💍]', '該当のカードは既にLv.EXTRAです。', pata.raritycolor(chr), '', '', thumbnailurl);
      else{
        //■■ログ作成
        if(!eventmode) logitems[2] = Number(logitems[2])-1;
        else{logeventitems[event.extraindex] = Number(logeventitems[event.extraindex])-1;
             logevent[1] = logeventitems.join(' ');
             logitems[5] = logevent.join('/');};
        ploga[3] = logitems.join(':');
        plogc[plogc.findIndex(lc => lc[0] == chr.sid)][1] = 7;
        ploga[8] = plogc.map(c => c.join('')).join('');
        
        //■■■■■ログ書込
        const sent = await message.channel.send('書込中 そのままお待ちください...');
        await plog.edit(ploga.join('\n'));
        console.log('■ログ書込完了 : '+ploga.join('\n　'));
        sent.delete();

        //■■■■■■■■■■処理：メッセージ作成■■■■■■■■■■
        console.log('■■■メッセージ作成■■■');
        const Rtitle = tools.emj(chr)+chr.name+' [Lv.MAX → EXTRA💍]';
        const Rdescription = chr.name+' のLv上限を突破しました！\n'
                           + '以降該当カードはLv.EXTRAとして表記され、'+pata.pentaname+'ではLv.7として計算されます。\n'
                           + '残り💍×'+logitems[2]
                           + (eventmode?' '+event.item[event.extraindex].emoji+'×'+logeventitems[event.extraindex]:'');
        
        console.log('■■■メッセージ作成結果■■■ : \n'+[Rtitle, Rdescription].join('\n'));

        //■■■■■■■■■■メッセージ送信■■■■■■■■■■
        await PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), Rtitle, Rdescription, pata.colorx, '', '', thumbnailurl);
        console.log('■■■メッセージ投稿完了■■■');
      };
    };
  }
  else PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), 'カードを指定してください。', '', tm.color);
  
  console.log('▲▲▲'+message.author.username);
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★指名招待　■■■■■■■■■■■■■■■■■■■■
async function pentainvite({client, data, pata, tools, message, commandorig:command, plog, ploga, event}){
  console.log('■■■■■指名招待■■■■■');
  
  if(!command[1]||command.length!==2){PentaResult(message.channel, '', '', '', '', 'コマンドが不正です。表記を変更してお試しください。', pata.color, message.author.displayAvatarURL(), pata.pentaname); return;};
  
  //■■■■■■■■■■準備■■■■■■■■■■
  const today = tools.getDateText();
  const april = (today.match(/\/4\/1$/)) ? true : false ;
  const logitems  = ploga[3].split(':');
  const logevent      = (event) ? logitems[5].split('/') : null ;
  const logeventitems = (event) ? logevent[1].split(' ') : null ;
  const logpoints = ploga[5].split(':');
  const plogc     = ploga[8].split(/(?<=\d)/).map(c => [c.slice(0,-1), c.slice(-1)]); //[ ['aあ', '1'],['bだ', '2'],['bた', '3'] ]
  
  const eventmode=(event&&event.inviteindex!==undefined&&logeventitems[event.inviteindex]>0)?true:false;
  if(Number(logitems[4])==0&&(!eventmode||(eventmode&&logeventitems[event.inviteindex]==0)))
    { PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), '指名招待券🎟️がありません。', '', pata.color);return; };
  
  //■■■■■■■■■■指名■■■■■■■■■■
  const orcards = await data.characters.filter(c => (c.genre == 'stTm'||c.genre == 'tcTm'||c.genre=='otTm')&&!pata.giftids.includes(c.id));
  
  const newDate = new Date(); newDate.setHours(newDate.getHours() + 9);
  const y = newDate.getFullYear();
  const m = ('0'+(newDate.getMonth()+1)).slice(-2);
  const d = ('0'+newDate.getDate()).slice(-2);
  const nowDate = new Date(y+'-'+m+'-'+d);
  
  const oldevents=pata.eventlist.filter(e=>{const startDate = new Date(e.start);
                                            return (startDate <= nowDate); }).map(e=>e.id);
  
  const spcards = await pata.spcards(orcards).filter(c=>oldevents.includes(c.eventid)&&(c.eventid!=='PSEUDO'||c.id.match(/^くらまえ/)));
  const characters = await orcards.concat(spcards);
  const regname = /(先生|せんせい|せんせー|先輩|せんぱい|ぱいせん|部長|ぶちょう|委員長|いいんちょう)$/g ;
  if(command[1].match(regname)) command[1] = command[1].replace(regname, '');
  const chr = await tools.getCharacter(characters, command[1]);
  if(!chr||chr == 'multiple'){
    PentaResult(message.channel, '', '', '', '', command[1]+'はデータにないか、複数のキャラに使用されている、または対象カードではありません。表記を変更してお試しください。', pata.color, message.author.displayAvatarURL(), pata.pentaname);
    return;
  }
  console.log('■■■指名対象■■■ : '+chr.name);

  //■■■■■■■■■■処理■■■■■■■■■■
  let count = '';
  const cindex = await plogc.findIndex(lc => lc[0] == chr.sid); //取得キャラログに今回引いたキャラidに一致するものがあるか
  const level = (cindex!==-1) ? Number(plogc[cindex][1]) : 0;
  if(level==0)      { count = ' 🆕';
                      await plogc.push([chr.sid, '1']); }
  else if(level < 5){ const added = level+1; //1足された状態
                      count = (added==5) ? ' 🈵' : ' ['+added+'枚目]';
                      plogc[cindex][1] = await added; }
  else if(level == 5) count = ' [Lv.MAX]'
  else if(level == 7) count = ' [Lv.EXTRA💍]' ;
  
  //■■■■■ 単カード発言
  //■■ 発言作成：文章セリフ欄
  let srfline;
  if(level==0||april){
    const serifulog = (april&&!chr.eventid) ? pata.aprilserifulog : pata.serifulog;
    const smsgs = await client.channels.cache.get(serifulog).messages.fetch({ limit:100 });
    srfline = smsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(chr.name+'＠＠') );
  }
  const introduction = (srfline) ? '\n```「' + srfline.split('＠＠')[1] + '」```' : '';
  //■■ 発言作成：文章完成
  const description = (level>=5) ? '※Lvが上限に達しています。他のカードをご指定ください。'
                    : (chr.major ? tools.ReSymbolizeC(client, message, data.symbols, chr.major, 'major', 'majoremj') + chr.major + '科 / ' : '' )
                    + (chr.grade ? tools.ReSymbolizeC(client, message, data.symbols, chr.grade, 'grade', 'gradeemj') + chr.grade + '年' : (chr.genre=='tcTm') ? '🧑‍🏫教師' : '関係者') + ' / '
                    + chr.sex + ' / '
                    + '©' + chr.author
                    + introduction;

  //■■ 発言作成：サムネイル
  let thumbnailurl = '';
  const tchids = []; tchids.unshift(data.DataSet[chr.genre]['Thumbnail']);
  if(chr.eventid)    tchids.unshift(pata.sptnlog);
  if(level>=4)       tchids.unshift(pata.maxtnlog);
  if(level==7)       tchids.unshift(pata.extratnlog);
  if(april)          tchids.unshift(data.DataSet.april['Thumbnail']);

  let ti = 0;
  do{
        const tmsgs = await client.channels.cache.get(tchids[ti]).messages.fetch({ limit:100 });
        const tmsg = await (tchids[ti]==pata.sptnlog||tchids[ti]==pata.maxtnlog||tchids[ti]==pata.extratnlog||(tchids[ti]==data.DataSet.april['Thumbnail']&&chr.eventid&&chr.eventid.match(/PSEUDO|SECRET/))) //完全一致の条件
                     ? tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.split('：')[0]==chr.name)
                     : tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(chr.name.split('(')[0]));
        if(tmsg) thumbnailurl = tmsg.split('：')[1]; console.log('thumbnailurl : '+thumbnailurl);
        ti++;
  }while(!thumbnailurl&&ti<tchids.length);
  
  if(!thumbnailurl) thumbnailurl = data.noimage;

  //■■ 発言作成：メッセージ送信
  const gettext = (level<5) ? 'GET! '+pata.raritytext(chr) : '指名招待 失敗' ;
  const color = (level==7) ? pata.colorx : (chr.eventid) ? pata.eventlist.find(e=>e.id == chr.eventid).color : pata.colorr[chr.rarity]; ;
  await PentaResult(message.channel, '', gettext, message.author.displayAvatarURL(), tools.emj(chr)+chr.name+count, description, color, '', '', thumbnailurl);
  
  //■■■■■■■■■■非超過ゆえ処理■■■■■■■■■■
  if(level<5){
    //■■■■■■■■■■処理：コンプリート■■■■■■■■■■
    let infocomplete = '';
    const orcardsSt = orcards.filter(c=>c.genre=='stTm');
    if(logitems[3]==0&&orcardsSt.every(c=>plogc.some(lc=>lc[0]==c.sid))){
      console.log('■コンプリート');
      infocomplete = '🏵️おめでとうございます！ 全ての通常生徒カードを揃えました！\nLv.EXTRA宝珠・指名招待券をプレゼントいたします。\n「！ぺえ (キャラ名)」・「！ぺよ (キャラ名)」からどうぞ！\n💍×1 を獲得しました。\n🎟️×1 を獲得しました。\n──────────────────\n';
      logitems[2] = Number(logitems[2])+1;
      logitems[3] = 1;
      logitems[4] = Number(logitems[4])+1;
    }
    else if(logitems[3]==1&&orcardsSt.every(c=>plogc.some(lc=>lc[0]==c.sid&&Number(lc[1])>=5))){
      console.log('■MAXコンプリート');
      infocomplete = '🏵️🏵️おめでとうございます！ 全ての通常生徒カードのLvがMAXになりました！\nLv.EXTRA宝珠・指名招待券をプレゼントいたします。\n「！ぺえ (キャラ名)」・「！ぺよ (キャラ名)」からどうぞ！\n💍×5 を獲得しました。\n🎟️×5 を獲得しました。\n──────────────────\n';
      logitems[2] = Number(logitems[2])+5;
      logitems[3] = 2;
      logitems[4] = Number(logitems[4])+5;
    }
    else if(logitems[3]==2&&orcardsSt.every(c=>plogc.some(lc=>lc[0]==c.sid&&Number(lc[1])>=7))){
      console.log('■EXTRAコンプリート');
      infocomplete = '🏵️🏵️🏵️おめでとうございます！ 全ての通常生徒カードのLvがEXTRAになりました！\nLv.EXTRA宝珠・指名招待券をプレゼントいたします。\n「！ぺえ (キャラ名)」・「！ぺよ (キャラ名)」からどうぞ！\n💍×10 を獲得しました。\n🎟️×10 を獲得しました。\n──────────────────\n';
      logitems[2] = Number(logitems[2])+10;
      logitems[3] = 3;
      logitems[4] = Number(logitems[4])+10;
    };

    //■■■■■■■■■■処理：ログ書込■■■■■■■■■■
    console.log('■■■ログ処理■■■');
    ploga[0]   = '■■■■■' + message.author.id + ' ' + message.author.username;
    if(!eventmode) logitems[4] = Number(logitems[4])-1;
    else{logeventitems[event.inviteindex] = Number(logeventitems[event.inviteindex])-1;
         logevent[1] = logeventitems.join(' ');
         logitems[5] = logevent.join('/');};
    ploga[3]   = logitems.join(':');
    ploga[8]   = plogc.map(c => c.join('')).join('');

    //■■■■■ログ書込
    const sent = await message.channel.send('書込中 そのままお待ちください...');
    await plog.edit(ploga.join('\n'));
    console.log('■ログ書込完了 : '+ploga.join('\n　'));
    sent.delete();

    //■■■■■■■■■■処理：メッセージ作成■■■■■■■■■■
    console.log('■■■メッセージ作成■■■');
    const Rtitle = '🎟️指名招待';
    const Rdescription = '⭐'+tools.ndouble(chr.rarity)+tools.emj(chr)+chr.name+count
                       + '\n──────────────────\n'
                       + infocomplete
                       + (eventmode?event.item[event.inviteindex].emoji:'🎟️')+'×1 を消費しました。'
                       + '\n──────────────────\n'
                       + '残り🎟️×'+logitems[4]
                       + (eventmode?' '+event.item[event.inviteindex].emoji+'×'+logeventitems[event.inviteindex]:'');
    
    console.log('■■■メッセージ作成結果■■■ : \n'+[Rtitle, Rdescription].join('\n'));

    //■■■■■■■■■■メッセージ送信■■■■■■■■■■
    await PentaResult(message.channel, '', '', '', Rtitle, Rdescription, pata.color, message.author.displayAvatarURL(), pata.pentaname);
    console.log('■■■メッセージ投稿完了■■■');
  };
  
  console.log('▲▲▲'+message.author.username);
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★更新情報　■■■■■■■■■■■■■■■■■■■■
async function pentanews(client, pata, message, command){
  console.log('■■■■■更新情報■■■■■');
  const newsmessages = await client.channels.cache.get(pata.newslog).messages.fetch({ limit:100 });
  const num = (command[1]&&command[1].match(/^\d+$/)) ? Number(command[1]) : 10;
  PentaResult(message.channel, '', '', '', '🆕 最近の更新情報'+num+'件 🆕', newsmessages.first(num).map(m=>m.content).join('\n'), pata.color, '', pata.pentaname);
  console.log('▲▲▲'+message.author.username);
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★ヘルプ　■■■■■■■■■■■■■■■■■■■■
async function pentahelp(pata, message, command){
  console.log('■■■■■ヘルプ■■■■■');
  
  let description;
  if(command[1]&&command[1]=='詳細'){
    const help = [{
      title:'⭐'+pata.pentaname+'(プレイ)',
      description:'コマンドはペンタの省略で「！ぺ」。'
                 +'手持ちのマギカキャラのカードを5枚引き、共通点・立場・カード固有の特殊効果などから点数を計算するゲーム。\n'
                 +'得られた点数はそのままコイン及び累計ポイントへ加算され、累計ポイントに応じてプレイヤーLvが上がる。\n'
                 +'その日初めて機能を呼び出したとき、'+pata.ticketThreshold+'p・'+pata.jewelThreshold+'pを超えたとき、3桁以上のゾロ目が出たとき、プレイヤーLvが上がったときなどにボーナス🎫🧧💍🎟️を獲得できる。'
      },{
      title:'🎫ガチャ(通常)',
      description:'コマンドはペンタガチャの省略で「！ぺが」。\n'
                 +'ガチャチケット🎫を1枚消費してマギカキャラのカードを5枚獲得するガチャ。新規カードがあった場合、取り出して先頭に表示する。\n'
                 +'カードのレアリティは⭐0～⭐5に分かれており、それぞれ確率が異なる。\n'
                 +'カードは重複するたびにLvが上がり、5枚で最大(Lv.MAX)となってそれ以降はコインとして還元される。\n'
                 +'通常カードをコンプリートしたとき、通常カードを全てLv.MAX・EXTRAにしたときなどに特殊アイテム類💍🎟️のボーナスを獲得できる。\n'
                 +'「！ぺがひ」でチケット🎫20枚を消費する、⭐1・⭐2以外確定の3枠を持った百連ガチャも可能。レアリティの高い新規カードのみ取り出して表示する。'
      },{
      title:'🧧ガチャ(封筒)',
      description:'コマンドはペンタガチャスペシャルの省略で「！ぺがす」。\n'
                 +'ガチャ封筒🧧を1枚消費して⭐4以上のカードを1枚獲得するガチャ。\n'
                 +'コイン還元・コンプリートボーナスは通常ガチャと共通。'
      },{
      title:'🏵️ステータス・図鑑表示',
      description:'コマンドはペンタ図鑑の省略で「！ぺず」。\n'
                 +'自身のプレイヤー情報や所持アイテム・カードを一覧表示する機能。\n'
                 +'図鑑部分は絵文字と枚数で構成されており、通常は学年順。全て揃っていると🏵️マークが付く。\n'
                 +'「！ぺず」の後に空白を空けて「星3」「四素科」「決闘部」などの条件を追加できる。\n'
                 +'条件に「ステータス」と入力すると図鑑表示を省略できる。'
      },{
      title:'🛍️PENTA-SHOP',
      description:'コマンドはペンタショップの省略で「！ぺし」。\n'
                 +'貯めたコインを使って買い物ができる店。\n'
                 +'「！ぺし」のみで一覧、後に空白を空けて番号や商品名・idを入力することで商品を購入できる。\n'
                 +'番号は商品の入れ替わりに応じて変更される可能性があるため、一覧の確認を推奨。\n'
                 +'アイテムを逆に換金したい場合は「！ぺしか」。'
      },{
      title:'特殊アイテム',
      description:'💍宝珠\n'
                 +'コマンドはペンタエクストラの省略で「！ぺえ　(カード名)」。\n'
                 +'Lv.MAX(5相当)のカードをLv.EXTRA(7相当)へ強化する。\n'
                 +'🎟️指名招待券\n'
                 +'コマンドはペンタよびますの省略で「！ぺよ　(カード名)」。\n'
                 +'指名したカードを獲得する。過去のイベントを含む全てが対象。'
      },/*{
      title:'登録機能',
      description:'DMを利用することで以下のカード情報を登録できます。\n'
                 +'💬初獲得時のセリフ\n'
                 +'→「(カード名)のセリフ　～～～」の形式で投稿\n'
                 +'🖼️Lv.MAXサムネイル\n'
                 +'→「(カード名)のマックス」とつけて画像を投稿\n'
                 +'🖼️Lv.EXTRAサムネイル\n'
                 +'→「(カード名)のエクストラ」とつけて画像を投稿\n'
                 +'💬ログインセリフ\n'
                 +'→「(カード名)のログインセリフ　～～～」の形式で投稿\n'
                 +'💬ステータスセリフ\n'
                 +'→「(カード名)のステータスセリフ　～～～」の形式で投稿\n'
                 + '「確認」「削除」等をコマンドの末尾に追加できます\n'
                 + 'セリフ系は「確認」時名前の代わりに「投稿済みの」を利用できます'
      },*/{
      title:'その他のコマンド',
      description:'「！ぺ　(カード名)」：カード情報確認\n'
                 +'「！ぺ　(カード名)　セリフ」：全登録セリフ一覧\n'
                 +'「！ぺ　(作者名)」：効果名一覧\n'
                 +'「！ぺべ」：ベストスコア再現\n'
                 +'「！ぺわ」：ワーストスコア再現\n'
                 +'「！ぺて」：テーマ一覧・設定\n'
                 +'「！ぺま」：My効果一覧・設定\n'
                 +'「！ぺお　(カード名)」：お気に入りカード\n'
                 +'「！ぺお　(ログイン or ステータス)　(カード名)」：ログイン・ステータスカード(「ランダム」「初期値」も指定可能)\n'
                 +'「！ぺふ」：フリー版PENTA\n'
                 +'「！ぺ　てすと　(キャラ群)」等：点数テスト\n'
                 +'「！ぺ　てすとま　(キャラ群)」等：MAXテスト\n'
                 +'「！ぺ　てすとえ　(キャラ群)」等：EXTRAテスト\n'
                 +'「！ぺこ」：最近の更新情報\n'
                 +'「！ぺへ」：ヘルプ\n'
                 +'「！ぺで」：データ　「絵文字」追加可\n'
                 +'「！ぺ削除」：ユーザー削除'
      },{
      title:'🗓️イベント系',
      description:'「！ぺい」：イベント概要\n'
                 +'「！ぺがい」：イベントガチャ\n'
                 +'「！ぺしい」：イベントショップ\n'
                 +'イベント開催中にのみ得られるアイテムやカード等が存在する。期間中に表示される案内を参照。'
      }
    ];
    description = pata.pentaname+'の機能一覧です。\n各機能はBOTが存在するサーバー、あるいはDMで動作します。\n「！ぺ」で始まる全てのコマンドは代用として「！へ」等を利用できます。\n'
                + help.map(h=>'──────────────────\n'+h.title+'```'+h.description+'```').join('');
  }else{
    description = pata.pentaname+'の簡易的な機能一覧です。\n'
                + '各機能はBOTが存在するサーバー、あるいはDMで動作します。\n'
                + '「！ぺ」で始まる全てのコマンドは代用として「！へ」等を利用できます。\n'
                + 'より詳細な説明は「！ぺへ　詳細」から。\n'
                + '──────────────────\n'
                + '__▼主な機能__\n'
                + '⭐ゲームプレイ ... 「！ぺ」\n'
                + '🎫ガチャ(通常) ... 「！ぺが」\n'
                + '🎫ガチャ(百連) ... 「！ぺがひ」\n'
                + '🧧ガチャ(封筒) ... 「！ぺがす」\n'
                + '🏵️ステータス・図鑑 ... 「！ぺず」\n'
                + '🛍️SHOP ... 「！ぺし」\n'
                + '──────────────────\n'
                + '__▼特殊アイテム__\n'
                + '💍宝珠 ... 「！ぺえ　(名前)」\n'
                + '🎟️指名 ... 「！ぺよ　(名前)」\n'
                + '──────────────────\n'/*
                + '__▼登録機能__(DM利用)\n'
                + '💬台詞 ... 「(名前)のセリフ　～～」\n'
                + '🖼️MAX画像 ... 画像+「(名前)のマックス」\n'
                + '🖼️EXTRA画像 ... 画像+「(名前)のエクストラ」\n'
                + '💬ログイン台詞 ... 「(名前)のログインセリフ　～～」\n'
                + '💬ステータス台詞 ... 「(名前)のステータスセリフ　～～」\n'
                + '「確認」「削除」等に対応\n'
                + 'セリフ系は確認時名前の代わりに「投稿済みの」を利用可能\n'
                + '──────────────────\n'*/
                + '__▼カード確認系__\n'
                + 'カード情報 ... 「！ぺ　(名前)」\n'
                + 'セリフ一覧 ... 「！ぺ　(名前)　セリフ」\n'
                + '効果名一覧 ... 「！ぺ　(作者名)」\n'
                + '🏆ベスト再現 ... 「！ぺべ」\n'
                + '💥ワースト再現 ... 「！ぺわ」\n'
                + '──────────────────\n'
                + '__▼各種設定__\n'
                + '🖼️テーマ設定 ... 「！ぺて」\n'
                + '📜My効果設定 ... 「！ぺま」\n'
                + '💛お気に入りカード ... 「！ぺお　(名前)」\n'
                + '💛ログインカード ... 「！ぺお　ログイン　(名前)」\n'
                + '💛ステータスカード ... 「！ぺお　ステータス　(名前)」\n'
                + '──────────────────\n'
                + '__▼その他__\n'
                + '⭐フリー版プレイ ... 「！ぺふ」\n'
                + '🆕最近の更新情報 ... 「！ぺこ」\n'
                + '❓ヘルプ ... 「！ぺへ」\n'
                + '📊データ ... 「！ぺで」\n'
                + '❌ユーザー削除 ... 「！ぺ削除」\n'
                + '──────────────────\n'
                + '__▼イベント系__\n'
                + '🗓️イベント概要 ... 「！ぺい」\n'
                + '🗓️イベントガチャ ... 「！ぺがい」\n'
                + '🗓️イベントショップ ... 「！ぺしい」';
  };
  console.log(description);
  PentaResult(message.channel, '', '', '', '❓ヘルプ', description, pata.color, '', pata.pentaname);
  
  console.log('▲▲▲'+message.author.username);
  
  return;

};

//■■■■■■■■■■■■■■■■■■■■　★配布　■■■■■■■■■■■■■■■■■■■■
async function pentahaifu({data, pata, message, command, plogs}){
  console.log('■■■配布');
  if(data.adminID==message.author.id&&command.length==3){
    const name  = command[1];
    const value = command[2];
    let lli;  //log 行 index
    let loi=0 //log 単体 index
    
    if(name.match(/^(チケット|封筒|宝珠|招待券)$/)){
      lli = 3;
      if  (name=='チケット') loi=0;
      else if(name=='封筒') loi=1;
      else if(name=='宝珠') loi=2;
      else if(name=='招待券') loi=4;
    }
    else if(name.match(/^コイン$/)){
      lli = 5; loi=2;
    }
    else if(name.match(/^テーマ$/)){
      lli = 7; loi=1;
    };
    
    plogs.forEach(plog=>{
      const ploga  = plog.content.split('\n');
      
      const logline = (lli==3||lli==5) ? ploga[lli].split(':') : ploga[lli].split('/') ;
      logline[loi] = (lli==3||lli==5) ? Number(logline[loi])+Number(value) : logline[loi]+' '+value;
      ploga[lli] = logline.join(':');

      plog.edit(ploga.join('\n'));
    });
    console.log('■■■配布完了');
    
    PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), name+' '+value+' を配布しました！', '全プレイヤーログを書き換えました。', pata.color);
  }
  else PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), '', 'コマンドに誤りがあるか、管理者による入力が行われていません。', pata.color);;
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★書換　■■■■■■■■■■■■■■■■■■■■
async function pentakakikae({data, pata, message, command, plogs}){
  console.log('■■■書換');
  if(data.adminID==message.author.id&&command.length==3){
    const before = command[1];
    const after  = (command[2].match(/delete|削除/i))?'':command[2];
    
    plogs.forEach(plog=>plog.edit(plog.content.replace(new RegExp(before,'g'), after)));
    console.log('■■■書換完了');
    
    PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), before+' → '+after, '全プレイヤーログを書き換えました。', pata.color);
  }
  else PentaResult(message.channel, '', pata.pentaname, message.author.displayAvatarURL(), '', 'コマンドに誤りがあるか、管理者による入力が行われていません。', pata.color);;
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★イベント詳細　■■■■■■■■■■■■■■■■■■■■
async function pentaevent({client, data, pata, tools, message, commandorig:command, plog, ploga, event}){
  console.log('■■■■■イベント詳細■■■■■');
  let atitle = 'イベント詳細'; let title = ''; let description = ''; let color; let raidMessageObj = undefined;
  
  if(!event&&command.length==1){
    color = pata.color;
    description = '現在イベントは開催されていません。';
  }
  else{
    const targetevent = (event&&command.length==1) ? event : (command.length==2) ? pata.eventlist.find(e=>e.id==command[1].toUpperCase()||e.nnprefix.includes(tools.hiraganize(command[1]))) : false;
    if(targetevent){
      title = targetevent.emoji+'【'+targetevent.name+'】';
      color = targetevent.color;
      const eventcards = pata.spcards( data.characters.filter(c => c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm') ).filter(c=>c.eventid==targetevent.id);
      description = '🗓️期間 : '+ targetevent.start.split('-').map(n=>n.replace(/^0+/,'')).join('/')
                  + ' ～ '   + targetevent.end.split('-').map(n=>n.replace(/^0+/,'')).join('/')
                  + '\n```'    + targetevent.description
                  + '```\n__⭐ゲームプレイについて__\n```' + targetevent.descriptionP
                  + '```\n__⭐イベントガチャについて__\n```' + targetevent.descriptionG
                  + '\nコマンド：「！ぺがい」```'
                  + (eventcards.length ? '\n__⭐イベントカード__\n\n'+eventcards.map(c=>tools.emj(c)+c.name).join('\n') : '');
    }
    else if(event&&command.length>=2&&event.specialprocess){
      atitle = 'イベント特殊操作';
      color = event.color;
      const slogs  = await client.channels.cache.get(pata.speciallog).messages.fetch({ limit:100 });
      const slog   = await slogs.find(m => m.content.includes(message.author.id+' '+event.id));
      const rlog   = await slogs.find(m => m.content.includes('RAID '+event.id));
      let quizlist = undefined;
      if(event.id=='QUIZ'){
        const qlogs = await client.channels.cache.get(pata.quizlog).messages.fetch({ limit:100 });
        quizlist = qlogs.map(m=>m.content).join('\n').split('\n').map(m=>m.split('＠＠'));
      };
      const o = await event.specialprocess({client:client, message:message, data:data, pata:pata,
                                            log:slog, logs:slogs, raidlog:rlog, ploga:ploga,
                                            command:command, word:command[1], quizlist:quizlist});
      if(o.atitle) atitle = o.atitle;
      title = o.title;
      description = o.description;
      if((o.numToGet&&o.numToGet>0)||(o.numToLose&&o.numToLose>0)){ //アイテムの変化があった場合
        const logitems  = ploga[3].split(':');
        const logpoints = ploga[5].split(':');
        const logevent      = await logitems[5].split('/');
        const logeventitems = await logevent[1].split(' ');
        let shoji = '';
        
        //まずはGet
        if(o.itemToGet=='eventitem'||(!o.itemToGet&&o.numToGet)){
                                      logeventitems[o.itemToGetIndex] = await Number(logeventitems[o.itemToGetIndex])+o.numToGet; }
        else if(o.itemToGet=='coin'){ logpoints[2] = await Number(logpoints[2])+o.numToGet; shoji+=' 🪙'+logpoints[2].toLocaleString()+'c';}
        else if(o.itemToGet)        { const iindex = (o.itemToGet=='ticket') ? 0
                                                   : (o.itemToGet=='jewel')  ? 2
                                                   : (o.itemToGet=='invite') ? 4 : undefined ;
                                      logitems[iindex] = await Number(logitems[iindex])+o.numToGet;
                                      shoji+=' '+pata.pentaitemlist[iindex].emoji+'×'+logitems[iindex];};
        //つぎにLose
        if(o.itemToLose=='eventitem'||(!o.itemTolose&&o.numToLose)){
                                       logeventitems[o.itemToLoseIndex] = await Number(logeventitems[o.itemToLoseIndex])-o.numToLose; }
        else if(o.itemToLose=='coin'){ logpoints[2] = await Number(logpoints[2])-o.numToLose; shoji+=' 🪙'+logpoints[2].toLocaleString()+'c' }
        else if(o.itemToLose)        { const iindex = (o.itemToLose=='ticket') ? 0
                                                    : (o.itemToLose=='jewel')  ? 2
                                                    : (o.itemToLose=='invite') ? 4 : undefined ;
                                       logitems[iindex] = await Number(logitems[iindex])-o.numToLose;
                                       shoji+=' '+pata.pentaitemlist[iindex].emoji+'×'+logitems[iindex];};
        
        description+='\n現在所持数：'+logeventitems.map((lei,index)=>event.item[index].emoji+'×'+lei).join(' ')+shoji;
        
        //■■■ログ作成
        console.log('■■■ログ処理■■■');
        logevent[1] = logeventitems.join(' ');
        logitems[5] = logevent.join('/');
        ploga[3] = logitems.join(':');
        ploga[5] = logpoints.join(':');

        //■■■ログ書込
        const sent = await message.channel.send('書込中 そのままお待ちください...');
        await plog.edit(ploga.join('\n'));
        if(o.newcontent) await slog.edit(o.newcontent);
        if(o.raidnewcontent) await rlog.edit(o.raidnewcontent);
        console.log('■ログ書込完了 : '+ploga.join('\n　'));
        sent.delete();
      };
      if(o.raidMessageObj) raidMessageObj = o.raidMessageObj;
    }
    else{
      color = pata.color;
      description = '指定されたidに一致するイベントはありません。';
    };
  };
  
  await PentaResult(message.channel, '', atitle, '', title, description, color, '', pata.pentaname);
  if(raidMessageObj) await message.channel.send(raidMessageObj);
  if(raidMessageObj) await client.channels.cache.get(pata.magicapentach).send(raidMessageObj); //PENTAチャンネルです
  
  console.log('▲▲▲'+message.author.username);
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★全体データ　■■■■■■■■■■■■■■■■■■■■
async function pentaabout({client, data, pata, message, command}){
  console.log('■■■■■全体データ■■■■■');
  let title;
  let description;
  const fields = [];
  
  if(command.length==2 && command[1].match(/^絵文字/)){
    title = '絵文字';
    description = '⚠️：PENTA判定なし';
    const listX = pata.emjlistX;
    for(const key in pata.emjlist){
      fields.push({ name : '__■' + key + '__' + ( listX.includes(key) ? '⚠️' : '' ),
                    value: pata.emjlist[key].join('') });
    };
  }
  else{
    //ゲーム
    const plogch = client.channels.cache.get(pata.playerlog);
    const plogs  = await plogch.messages.fetch({ limit:100 });
    const newDate = new Date(); newDate.setHours(newDate.getHours() + 9);
    const y = newDate.getFullYear();
    const m = ('0'+(newDate.getMonth()+1)).slice(-2);
    const d = ('0'+newDate.getDate()).slice(-2);
    const nowDate = new Date(y+'-'+m+'-'+d);
    const oldeventids = pata.eventlist.filter(e=>{const startDate = new Date(e.start);
                                                  return (startDate <= nowDate); }).map(e=>e.id);
    const elapsedDay = Math.floor( ( nowDate - new Date("2022/1/30").getTime() ) / 86400000 );
    const activeplayer = plogs.filter(plog=>Math.floor( ( nowDate - new Date(plog.content.split('\n')[2]).getTime() ) / 86400000 )<=30); 

    const nums = {'0️⃣':'0','1️⃣':'1','2️⃣':'2','3️⃣':'3','4️⃣':'4','5️⃣':'5','6️⃣':'6','7️⃣':'7','8️⃣':'8','9️⃣':'9','⛔':'-'}; 
    const nemj = {'0':'0️⃣','1':'1️⃣','2':'2️⃣','3':'3️⃣','4':'4️⃣','5':'5️⃣','6':'6️⃣','7':'7️⃣','8':'8️⃣','9':'9️⃣','-':'⛔'};
    const bestlogch = client.channels.cache.get(pata.bestscorelog);
    const bestlogs  = await bestlogch.messages.fetch({ limit:100 });
    const bestscores = bestlogs.map(m=>Number(m.embeds[0].title.match(/(0️⃣|1️⃣|2️⃣|3️⃣|4️⃣|5️⃣|6️⃣|7️⃣|8️⃣|9️⃣|⛔)+/)[0].match(/0️⃣|1️⃣|2️⃣|3️⃣|4️⃣|5️⃣|6️⃣|7️⃣|8️⃣|9️⃣|⛔/g)
                                              .map(n=>nums[n]).join('')));
    const bestscore = Math.max(...bestscores);
    const bestlog = bestlogs.find(m=>m.embeds[0].title.includes(String(bestscore).split('').map(n=>nemj[n]).join('')));
    const bestuser = await client.users.fetch(bestlog.content.split("\n")[0]).catch(()=>({username:"???"}));
    const worstlogch = client.channels.cache.get(pata.worstscorelog);
    const worstlogs  = await worstlogch.messages.fetch({ limit:100 });
    const worstscores = worstlogs.map(m=>Number(m.embeds[0].title.match(/(0️⃣|1️⃣|2️⃣|3️⃣|4️⃣|5️⃣|6️⃣|7️⃣|8️⃣|9️⃣|⛔)+/)[0].match(/0️⃣|1️⃣|2️⃣|3️⃣|4️⃣|5️⃣|6️⃣|7️⃣|8️⃣|9️⃣|⛔/g)
                                              .map(n=>nums[n]).join('')));
    const worstscore = Math.min(...worstscores);
    const worstlog = worstlogs.find(m=>m.embeds[0].title.includes(String(worstscore).split('').map(n=>nemj[n]).join('')));
    const worstuser = await client.users.fetch(worstlog.content.split("\n")[0]).catch(()=>({username:"???"}));

    //カード
    const orcards = await data.characters.filter(c => (c.genre == 'stTm'||c.genre == 'tcTm'||c.genre=='otTm')&&!pata.giftids.includes(c.id));
    const spcards = await pata.spcards(orcards);
    const spcardsev = await spcards.filter(s=>oldeventids.includes(s.eventid));
    const spcardssc = await spcards.filter(s=>s.eventid=='SECRET');
    const spcardsX = [...spcardsev,...spcardssc];
    const characters = await orcards.concat(spcards);
    const charactersX = await orcards.concat(spcardsX);
    //効果類
    const episodes = await pata.episodes.filter(ep=>!ep.forevent);
    //登録類
    const serifulogch = client.channels.cache.get(pata.serifulog);
    const serifulogs  = await serifulogch.messages.fetch({ limit:100 });
    const serifulines = serifulogs.map(m=>m.content).join('\n').split('\n');
    const serifulinesN = serifulines.filter(l=>!l.split('＠＠')[0].includes('('));
    const serifulinesS = serifulines.filter(l=>l.split('＠＠')[0].includes('('));

    const loginlogch = client.channels.cache.get(pata.fserifulogL);
    const loginlogs  = await loginlogch.messages.fetch({ limit:100 });
    const loginlines = loginlogs.map(m=>m.content).join('\n').split('\n');
    const logincards = [...new Set(loginlines.map(l=>l.split('＠＠')[0]))];
    const sploginlogch = client.channels.cache.get(pata.fspserifulogL);
    const sploginlogs  = await sploginlogch.messages.fetch({ limit:100 });
    const sploginlines = sploginlogs.map(m=>m.content).join('\n').split('\n');
    const splogincards = [...new Set(sploginlines.map(l=>l.split('＠＠')[0]))];

    const statuslogch = client.channels.cache.get(pata.fserifulogS);
    const statuslogs  = await statuslogch.messages.fetch({ limit:100 });
    const statuslines = statuslogs.map(m=>m.content).join('\n').split('\n');
    const statuscards = [...new Set(statuslines.map(l=>l.split('＠＠')[0]))];
    const spstatuslogch = client.channels.cache.get(pata.fspserifulogS);
    const spstatuslogs  = await spstatuslogch.messages.fetch({ limit:100 });
    const spstatuslines = spstatuslogs.map(m=>m.content).join('\n').split('\n');
    const spstatuscards = [...new Set(spstatuslines.map(l=>l.split('＠＠')[0]))];

    const eshoplogch = client.channels.cache.get(pata.eshopserifulog);
    const eshoplogs  = await eshoplogch.messages.fetch({ limit:100 });
    const eshoplines = eshoplogs.map(m=>m.content).join('\n').split('\n');
    const eshopcards = [...new Set(eshoplines.map(l=>l.split('＠＠')[0]))];

    const shoplogch = client.channels.cache.get(pata.shopserifulog);
    const shoplogs  = await shoplogch.messages.fetch({ limit:100 });
    const shoplines = shoplogs.map(m=>m.content).join('\n').split('\n');
    const shopcards = [...new Set(shoplines.map(l=>l.split('＠＠')[0]))];

    const otherlogch = client.channels.cache.get(pata.otherserifulog);
    const otherlogs  = await otherlogch.messages.fetch({ limit:100 });
    const otherlines = otherlogs.map(m=>m.content).join('\n').split('\n');
    const othercards = [...new Set(otherlines.map(l=>l.split('＠＠')[0]))];

    const quizlogch = client.channels.cache.get(pata.quizlog);
    const quizlogs  = await quizlogch.messages.fetch({ limit:100 });
    const quizlines = quizlogs.map(m=>m.content).join('\n').split('\n');
    
    title = '全体';
    description = '⭐ゲーム\n```'
                + 'サービス開始 : 2022-01-30('+elapsedDay+'日経過)\n'
                + 'プレイヤー : ' + plogs.size + '名 (30日以内'+activeplayer.size+'名)\n'
                + 'テーマ : ' + pata.themes.length + '種\n'
                + 'イベント : ' + oldeventids.length + '回 (現在まで)\n'
                + 'ベストスコア : ' + bestscore + 'p ('+bestuser.username+' による)\n'
                + 'ワーストスコア : ' + worstscore + 'p ('+worstuser.username+' による)\n'
                + '```\n⭐カード\n```'
                + '通常カード : ' + orcards.length + '枚 (生徒' + orcards.filter(c=>c.genre=='stTm').length + '枚, 教師・関係者' + orcards.filter(c=>c.genre!='stTm').length + '枚)\n'
                + '既出イベントカード : ' + spcardsev.length + '枚 (生徒' + spcardsev.filter(c=>c.genre=='stTm').length + '枚, 教師・関係者' + spcardsev.filter(c=>c.genre!='stTm').length + '枚)\n'
                + 'シークレットカード : ' + spcardssc.length + '枚 (生徒' + spcardssc.filter(c=>c.genre=='stTm').length + '枚, 教師・関係者' + spcardssc.filter(c=>c.genre!='stTm').length + '枚)\n'
                + '合計 : ' + (orcards.length + spcardsev.length + spcardssc.length) + '枚\n'
                + '```\n⭐レアリティ\n```'
                + '5 : ' + charactersX.filter(c=>c.rarity==5).length + '枚 (通常' + orcards.filter(c=>c.rarity==5).length + '枚, 特殊' + spcardsX.filter(c=>c.rarity==5).length + '枚)\n'
                + '4 : ' + charactersX.filter(c=>c.rarity==4&&c.genre=='stTm').length + '枚 (通常' + orcards.filter(c=>c.rarity==4&&c.genre=='stTm').length + '枚, 特殊' + spcardsX.filter(c=>c.rarity==4&&c.genre=='stTm').length + '枚)\n'
                + '3 : ' + charactersX.filter(c=>c.rarity==3).length + '枚 (通常' + orcards.filter(c=>c.rarity==3).length + '枚, 特殊' + spcardsX.filter(c=>c.rarity==3).length + '枚)\n'
                + '2 : ' + charactersX.filter(c=>c.rarity==2).length + '枚 (通常' + orcards.filter(c=>c.rarity==2).length + '枚, 特殊' + spcardsX.filter(c=>c.rarity==2).length + '枚)\n'
                + '1 : ' + charactersX.filter(c=>c.rarity==1).length + '枚 (通常' + orcards.filter(c=>c.rarity==1).length + '枚, 特殊' + spcardsX.filter(c=>c.rarity==1).length + '枚)\n'
                + '0 : ' + charactersX.filter(c=>c.rarity==0).length + '枚 (通常' + orcards.filter(c=>c.rarity==0).length + '枚, 特殊' + spcardsX.filter(c=>c.rarity==0).length + '枚)\n'
                + '教師・関係者 : ' + charactersX.filter(c=>c.genre!='stTm').length + '枚 (通常' + orcards.filter(c=>c.genre!='stTm').length + '枚, 特殊' + spcardsX.filter(c=>c.genre!='stTm').length + '枚)\n'
                + '```\n⭐効果類\n```'
                + 'カード特性 : ' + pata.natures.length + '個\n'
                + '特殊ドロー : ' + pata.drawings.length + '個\n'
                + 'カード効果 : ' + pata.effects.length + '個 (前効果' + pata.effects.filter(e=>e.phase.includes('前')).length + '個, 後効果' + pata.effects.filter(e=>e.phase.includes('後')).length + '個)\n'
                + 'エピソード効果 : ' + episodes.length + '個 (My効果' + episodes.filter(ep=>ep.myfxid).length + '個)\n'
                + '```\n⭐登録類\n```'
                + '取得時のセリフ : ' + serifulines.length + '種 (通常' + serifulinesN.length + '種, 特殊'+serifulinesS.length+'種)\n'
                + 'ログインセリフ : ' + (loginlines.length+sploginlines.length) + '種 (通常' + loginlines.length + '種/' + logincards.length + '人, '
                                                                                   +'特殊' + sploginlines.length + '種/' + splogincards.length + '人)\n'
                + 'ステータスセリフ : ' + (statuslines.length+spstatuslines.length) + '種 (通常' + statuslines.length + '種/' + statuscards.length + '人, '
                                                                                       +'特殊' + spstatuslines.length + '種/' + spstatuscards.length + '人)\n'
                + 'イベントショップセリフ : ' + eshoplines.length + '種/'+eshopcards.length+'人\n'
                + '裏ショップセリフ : ' + shoplines.length + '種/'+shopcards.length+'人\n'
                + 'その他セリフ : ' + otherlines.length + '種/'+othercards.length+'人\n'
                + 'クイズ : ' + quizlines.length + '種\n'
                + '```';
  };

  PentaResult(message.channel, '', '', '', '📊MAGICA-PENTAデータ：'+title, description, pata.color, '', pata.pentaname, '', fields);
  
  console.log('▲▲▲'+message.author.username);
};

//■■■■■■■■■■■■■■■■■■■■　★セリフ登録　■■■■■■■■■■■■■■■■■■■■
exports.serifu = async function(client, message){ console.log('■penta.js セリフ登録 ■■■■■ '+message.author.username);
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照jsを参照
  const pata = await require('./pentadata'); //ペンタデータ用のpentadata.jsを参照jsを参照
  const tools = await require('./tools'); //ツール用のtools.jsを参照jsを参照
  const orcards = data.characters.filter(c => c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm');
  const spcards = pata.spcards(orcards);
  const characters = orcards.concat(spcards);
  const sentsrf = message.content.split(/のせりふ +|のセリフ +|の台詞 +|のせりふ　+|のセリフ　+|の台詞　+|のせりふ\n+|のセリフ\n+|の台詞\n+/);

  //■■キャラの取得
  let chr;
  let mchr = '';
  if(sentsrf[0].match(/^投稿済/)){mchr = '投稿済み'}
  else{
    chr = tools.getCharacter(characters, sentsrf[0]);
    if(!chr){message.channel.send(sentsrf[0]+'はデータにありませんでした。表記を変更してお試しください。'); return;}
    else if(chr == 'multiple'){message.channel.send(sentsrf[0]+'は複数のキャラに使用されています。表記を変更してお試しください。'); return;};
    mchr = tools.emj(chr)+chr.name;
  };
                                                 
  //■■発言取得
  const logch = client.channels.cache.get(pata.serifulog);
  const msgs = await logch.messages.fetch({ limit:100 });
  const msg = msgs.first();
  let  msgc = msg.content; console.log('msgc : '+msgc);
  const mid = message.author.id;
  
  //■■セリフを確認
  if(sentsrf[0].match(/^投稿済/)||sentsrf[1].match(/^(確認|一覧)$/)){
    const oldmsgs = (sentsrf[0].match(/^投稿済/)) ? msgs.filter(message => message.content.includes(mid) )
                                                 : msgs.filter(message => message.content.includes(mid) && message.content.includes(chr.name+'＠＠') );
    const alllines =  oldmsgs.map(message => message.content).reverse().join('\n').split('\n');
    const lines = (sentsrf[0].match(/^投稿済/)) ? alllines.filter(l => l.includes(mid))
                                                 .map(l => tools.emj(characters.find(c=>c.name==l.split('＠＠')[0]))+l.split('＠＠')[0]+'```「'+l.split('＠＠')[1]+'」```' )
                                               : alllines.filter(l => l.includes(mid) && l.includes(chr.name+'＠＠'))
                                                 .map(l => '```「'+l.split('＠＠')[1]+'」```' );
    if(lines.length==0){(sentsrf[0].match(/^投稿済/)) ? message.channel.send(mchr+'のセリフ💬はありませんでした。')
                                                     : message.channel.send(mchr+'のセリフ💬は存在しないか、あなたによって投稿されていません。'); return;};
    let listmessage = mchr+'のセリフ💬\n'+lines.join('\n');
    while(listmessage.length>2000){message.channel.send(listmessage.slice(0,2000));listmessage = listmessage.slice(2000);}
    message.channel.send(listmessage);
    return;
  };
  
  //■■入力本文の確認
  if(sentsrf[1].length>100){message.channel.send('セリフは100文字以内でお願いします。(現在'+sentsrf[1].length+'文字)'); return;};

  //■■セリフを削除
  const oldmsg = msgs.find(message => message.content.includes(chr.name+'＠＠') );
  if(oldmsg){
    const oldmsgc = oldmsg.content; console.log('oldmsgc : '+oldmsgc);
    const lines = oldmsgc.split('\n');
    const line = lines.find(line => line.includes(chr.name+'＠＠')&&line.includes(mid));
    if(!line){ message.channel.send(mchr+'のセリフ💬はあなたによって投稿されていないため、上書きに失敗しました。'); return; };
    
    const oldmsgcEditted = oldmsgc.replace(line, 'deleted').replace(/deleted\n|\ndeleted|deleted/, ''); console.log('oldmsgcEditted : '+oldmsgcEditted);
    oldmsg.edit(oldmsgcEditted);
    if(message.content.match(/削除/)){message.channel.send(mchr+'のセリフ💬を削除しました。');return;}
    
    if(msgc == oldmsgc) msgc = oldmsgcEditted; //
  }else if(message.content.match(/削除/)){message.channel.send(mchr+'のセリフ💬はありませんでした。');return;};
  
  //■■入力へ
  const newsrf = chr.name + '＠＠' + sentsrf[1] + '＠＠' + mid + '＠＠■'; console.log('newsrf : '+newsrf);
  const newmsg = msgc + '\n' + newsrf; console.log('newmsg : '+newmsg);
  
  if(newmsg.length<=2000) msg.edit(newmsg).catch( ()=>logch.send(newsrf) )
  else logch.send(newsrf);
  message.channel.send(mchr+'のセリフ💬を登録しました！')
                                                 
  console.log('▲▲▲'+message.author.username);
  
};

//■■■■■■■■■■■■■■■■■■■■　★嘘セリフ登録　■■■■■■■■■■■■■■■■■■■■
exports.aprilserifu = async function(client, message){ console.log('■penta.js 嘘セリフ登録 ■■■■■ '+message.author.username);
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照jsを参照
  const pata = await require('./pentadata'); //ペンタデータ用のpentadata.jsを参照jsを参照
  const tools = await require('./tools'); //ツール用のtools.jsを参照jsを参照
  const orcards = data.characters.filter(c => c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm');
  const spcards = pata.spcards(orcards);
  const characters = orcards.concat(spcards);
  const sentsrf = message.content.split(/のうそせりふ +|の嘘せりふ +|の嘘セリフ +|の嘘台詞 +|のうそせりふ　+|の嘘せりふ　+|の嘘セリフ　+|の嘘台詞　+|のうそせりふ\n+|の嘘せりふ\n+|の嘘セリフ\n+|の嘘台詞\n+/);

  //■■キャラの取得
  let chr;
  let mchr = '';
  if(sentsrf[0].match(/^投稿済/)){mchr = '投稿済み'}
  else{
    chr = tools.getCharacter(characters, sentsrf[0]);
    if(!chr){message.channel.send(sentsrf[0]+'はデータにありませんでした。表記を変更してお試しください。'); return;}
    else if(chr == 'multiple'){message.channel.send(sentsrf[0]+'は複数のキャラに使用されています。表記を変更してお試しください。'); return;};
    mchr = tools.emj(chr)+chr.name;
  };
                                                 
  //■■発言取得
  const logch = client.channels.cache.get(pata.aprilserifulog);
  const msgs = await logch.messages.fetch({ limit:100 });
  const msg = msgs.first();
  let  msgc = msg.content; console.log('msgc : '+msgc);
  const mid = message.author.id;
  
  //■■セリフを確認
  if(sentsrf[0].match(/^投稿済/)||sentsrf[1].match(/^(確認|一覧)$/)){
    const oldmsgs = (sentsrf[0].match(/^投稿済/)) ? msgs.filter(message => message.content.includes(mid) )
                                                 : msgs.filter(message => message.content.includes(mid) && message.content.includes(chr.name+'＠＠') );
    const alllines =  oldmsgs.map(message => message.content).join('\n').split('\n');
    const lines = (sentsrf[0].match(/^投稿済/)) ? alllines.filter(l => l.includes(mid))
                                                 .map(l => tools.emj(characters.find(c=>c.name==l.split('＠＠')[0]))+l.split('＠＠')[0]+'```「'+l.split('＠＠')[1]+'」```' )
                                               : alllines.filter(l => l.includes(mid) && l.includes(chr.name+'＠＠'))
                                                 .map(l => '```「'+l.split('＠＠')[1]+'」```' );
    if(lines.length==0){(sentsrf[0].match(/^投稿済/)) ? message.channel.send(mchr+'の嘘セリフ💬はありませんでした。')
                                                     : message.channel.send(mchr+'の嘘セリフ💬は存在しないか、あなたによって投稿されていません。'); return;};
    let listmessage = mchr+'の嘘セリフ💬\n'+lines.join('\n');
    while(listmessage.length>2000){message.channel.send(listmessage.slice(0,2000));listmessage = listmessage.slice(2000);}
    message.channel.send(listmessage);
    return;
  };
  
  //■■入力本文の確認
  if(sentsrf[1].length>100){message.channel.send('嘘セリフは100文字以内でお願いします。(現在'+sentsrf[1].length+'文字)'); return;};

  //■■セリフを削除
  const oldmsg = msgs.find(message => message.content.includes(chr.name+'＠＠') );
  if(oldmsg){
    const oldmsgc = oldmsg.content; console.log('oldmsgc : '+oldmsgc);
    const lines = oldmsgc.split('\n');
    const line = lines.find(line => line.includes(chr.name+'＠＠')&&line.includes(mid));
    if(!line){ message.channel.send(mchr+'の嘘セリフ💬はあなたによって投稿されていないため、上書きに失敗しました。'); return; };
    
    const oldmsgcEditted = oldmsgc.replace(line, 'deleted').replace(/deleted\n|\ndeleted|deleted/, ''); console.log('oldmsgcEditted : '+oldmsgcEditted);
    oldmsg.edit(oldmsgcEditted);
    if(message.content.match(/削除/)){message.channel.send(mchr+'の嘘セリフ💬を削除しました。');return;}
    
    if(msgc == oldmsgc) msgc = oldmsgcEditted; //
  }else if(message.content.match(/削除/)){message.channel.send(mchr+'の嘘セリフ💬はありませんでした。');return;};
  
  //■■入力へ
  const newsrf = chr.name + '＠＠' + sentsrf[1] + '＠＠' + mid + '＠＠■'; console.log('newsrf : '+newsrf);
  const newmsg = msgc + '\n' + newsrf; console.log('newmsg : '+newmsg);
  
  if(newmsg.length<=2000) msg.edit(newmsg).catch( ()=>logch.send(newsrf) )
  else logch.send(newsrf);
  message.channel.send(mchr+'の嘘セリフ💬を登録しました！')
                                                 
  console.log('▲▲▲'+message.author.username);
  
};

//■■■■■■■■■■■■■■■■■■■■　★お気に入りセリフ登録　■■■■■■■■■■■■■■■■■■■■
exports.fserifu = async function(client, message){ console.log('■penta.js お気に入りセリフ登録 ■■■■■ '+message.author.username);
  if(message.content.match(/の(おきにいり|お気に入り)(せりふ|セリフ|台詞)(\s|　|\n)+/)) {message.channel.send('「お気に入りセリフ」は廃止されました。「ログインセリフ」か「ステータスセリフ」に表記を変更してお試しください。'); return;};
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照jsを参照
  const pata = await require('./pentadata'); //ペンタデータ用のpentadata.jsを参照jsを参照
  const tools = await require('./tools'); //ツール用のtools.jsを参照jsを参照
  const orcards = data.characters.filter(c => c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm');
  const spcards = pata.spcards(orcards);
  const characters = orcards.concat(spcards);
  const sentsrf = message.content.split(/のろぐいんせりふ +|のログインセリフ +|のログイン台詞 +|のろぐいんせりふ　+|のログインセリフ　+|のログイン台詞　+|のろぐいんせりふ\n+|のログインセリフ\n+|のログイン台詞\n+|のすてーたすせりふ +|のステータスセリフ +|のステータス台詞 +|のすてーたすせりふ　+|のステータスセリフ　+|のステータス台詞　+|のすてーたすせりふ\n+|のステータスセリフ\n+|のステータス台詞\n+/);
  const newserifu = sentsrf[1];
  //■■キャラの取得
  let chr;
  let mchr = '';
  if(sentsrf[0].match(/^投稿済/)){mchr = '投稿済み'}
  else{
    chr = tools.getCharacter(characters, sentsrf[0]);
    if(!chr){message.channel.send(sentsrf[0]+'はデータにありませんでした。表記を変更してお試しください。'); return;}
    else if(chr == 'multiple'){message.channel.send(sentsrf[0]+'は複数のキャラに使用されています。表記を変更してお試しください。'); return;};
    mchr = tools.emj(chr)+chr.name;
  };
  
                                                  console.log(message.content);
  let serifutype; let logch; let smsgs;
  if(message.content.match(/の(ろぐいん|ログイン)(せりふ|セリフ|台詞)(　|\s|\n)+/)){
    serifutype = 'ログイン';
    if(sentsrf[0].match(/^投稿済/)){ const smsgs1 = await client.channels.cache.get(pata.fserifulogL).messages.fetch({ limit:100 });
                                    const smsgs2 = await client.channels.cache.get(pata.fspserifulogL).messages.fetch({ limit:100 });
                                          smsgs  = smsgs1.concat(smsgs2); }
    else                          {       logch  = client.channels.cache.get((chr.eventid) ? pata.fspserifulogL : pata.fserifulogL);
                                          smsgs  = await logch.messages.fetch({ limit:100 }); };
  }
  else if(message.content.match(/の(すてーたす|ステータス)(せりふ|セリフ|台詞)(　|\s|\n)+/)){
    serifutype = 'ステータス';
    if(sentsrf[0].match(/^投稿済/)){ const smsgs1 = await client.channels.cache.get(pata.fserifulogS).messages.fetch({ limit:100 });
                                    const smsgs2 = await client.channels.cache.get(pata.fspserifulogS).messages.fetch({ limit:100 });
                                          smsgs  = smsgs1.concat(smsgs2); }
    else                          {       logch  = client.channels.cache.get((chr.eventid) ? pata.fspserifulogS : pata.fserifulogS);
                                          smsgs  = await logch.messages.fetch({ limit:100 }); };
  };
                                                  console.log(serifutype);
                                                  
  //■■セリフを確認
  if(newserifu.match(/^(確認|一覧)$/)){
    const mid = '＠＠'+message.author.id;
    //const msgs = await logch.messages.fetch({ limit:100 }); //発言取得
    const oldmsgs = (sentsrf[0].match(/^投稿済/)) ? smsgs.filter(message => message.content.includes(mid) )
                                                : smsgs.filter(message => message.content.includes(mid) && message.content.includes(chr.name) );
    const alllines =  oldmsgs.map(message => message.content).reverse().join('\n').split('\n')
                             .sort((a,b)=>{const nameA = a.split('：')[0];
                                           const nameB = b.split('：')[0];
                                           return (nameA<nameB) ? -1 : (nameA>nameB) ? 1 : 0;});
    const lines = (sentsrf[0].match(/^投稿済/)) ? alllines.filter(l => l.includes(mid))
                                                  .map(l => tools.emj(characters.find(c=>c.name==l.split('＠＠')[0]))+l.split('＠＠')[0]+'：'+l.split('＠＠')[1] )
                                                : alllines.filter(l => l.includes(mid) && l.includes(chr.name+'＠＠'))
                                                  .map((l,i) => (i+1)+') '+l.split('＠＠')[1] );
    if(lines.length==0){(sentsrf[0].match(/^投稿済/)) ? message.channel.send(mchr+'の'+serifutype+'セリフ💬はありませんでした。')
                                                      : message.channel.send(mchr+'の'+serifutype+'セリフ💬は存在しないか、あなたによって投稿されていません。'); return;};
    let listmessage = mchr+'の'+serifutype+'セリフ一覧💬\n'+lines.join('\n')+'\n```個人の'+serifutype+'セリフ一覧💬のすぐあとに「○○の'+serifutype+'セリフ　削除　(リスト番号)」と入力することで削除が可能です。\n登録個数は1カードにつき最大8～10程度を推奨しています。```';
    while(listmessage.length>2000){message.channel.send(listmessage.slice(0,2000));listmessage = listmessage.slice(2000);}
    message.channel.send(listmessage);
    return;
  };
  
  //■■データセット分岐
  //const ds = (sentsrf[0].match(/^投稿済/)) ? '' : data.DataSet[chr.genre];
  //const logch = (sentsrf[0].match(/^投稿済/)) ? '' : client.channels.cache.get(ds['Himitsu']);
  
  //■■削除
  if(newserifu.match(/^削除(\s|　|\n)/)){
    //例外アラート
    if(sentsrf[0].match(/^投稿済/)){message.channel.send('削除を行う場合は、個人の'+serifutype+'セリフ一覧💬を呼び出してください。'); return;};
    const listnum = tools.ANhalve(newserifu.slice(3));
    if(newserifu.length<4||!listnum.match(/\d+/)){message.channel.send(serifutype+'セリフ一覧💬のリスト番号が指定されていません。'); return;};
    const sentmsgs = await message.channel.messages.fetch({limit:2});
    const listmsg = sentmsgs.last();
    if(!listmsg.content.includes(mchr+'の'+serifutype+'セリフ一覧💬')){message.channel.send(mchr+'の'+serifutype+'セリフ一覧💬を直前に表示してください。'); return;};
    
    //まずはリスト発言から指定されたお気に入りセリフ本文を取得して検索用に組み直す
    const listlines = listmsg.content.split('\n');
    const listline = listlines.find(l => l.split(') ')[0] == tools.ANhalve(newserifu.slice(3)));
    const srftext = listline.replace(/\d+\)\s/, '');
    const keytext = chr.name+'＠＠'+srftext+'＠＠'; console.log('keytext : '+keytext);
    //お気に入りセリフログチャンネルから本文を含む発言を探して削除する
    //const smsgs = await logch.messages.fetch({ limit:100 });
    const smsg = smsgs.find(m => m.content.includes(keytext));
    const slines = smsg.content.split('\n').filter(l => !l.includes(keytext));
    const newsmsg = (slines.length == 0) ? 'deleted' : slines.join('\n');
    smsg.edit(newsmsg);
    message.channel.send(mchr+'の以下の'+serifutype+'セリフ💬を削除しました。```✖'+srftext+'```')
    
    return;
  };
  
  //■■入力本文の確認
  if(newserifu.length>100){message.channel.send(serifutype+'セリフ💬の内容は100文字以内でお願いします。(現在'+newserifu.length+'文字)'); return;}
  
  //■■入力へ
  const msgs = await logch.messages.fetch({ limit:1 });
  const msg = msgs.first();
  const newsrf = chr.name + '＠＠' + newserifu + '＠＠' + message.author.id + '＠＠■';
  const newmsg = msg.content + '\n' + newsrf;
  
  if(newmsg.length<=2000){
    msg.edit(newmsg).catch(function(){logch.send(newsrf);});
  }
  else{logch.send(newsrf);}
  message.channel.send(mchr+'の'+serifutype+'セリフ💬を登録しました！')
  
};

//■■■■■■■■■■■■■■■■■■■■　★MAX-EXTRAサムネ登録　■■■■■■■■■■■■■■■■■■■■
exports.maxthumbnail = async function(client, message, targetname){
  const pata = await require('./pentadata');
  const targetlog = (targetname=='MAX') ? pata.maxtnlog : pata.extratnlog ;
  console.log('■penta.js ' + targetname + 'サムネ登録 ■■■■■ '+message.author.username);
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照jsを参照
  const tools = await require('./tools'); //ツール用のtools.jsを参照jsを参照
  const orcards = data.characters.filter(c => c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm');
  const spcards = pata.spcards(orcards);
  const characters = orcards.concat(spcards);
  const sentname = message.content.split(/の/);
  
  //■■キャラの取得
  const chr = tools.getCharacter(characters, sentname[0]);
  if(!chr){message.channel.send(sentname[0]+'はデータにありませんでした。表記を変更してお試しください。'); return;}
  else if(chr == 'multiple'){message.channel.send(sentname[0]+'は複数のキャラに使用されています。表記を変更してお試しください。'); return;};

  //■■ログの取得
  const logch = client.channels.cache.get(targetlog);
  const msgs = await logch.messages.fetch({ limit:100 });
  const msg = msgs.first();
  let msgc = msg.content;
  
  //■■画像を確認
  const file = message.attachments.first();
  if( (!file||(!file.height && !file.width)) && !(message.content.match(/確認|削除/)) ){ //画像ファイルが無くて、確認や削除もない
    message.channel.send('画像ファイルがありません。'); return;
  };
  
  //■■重複削除
  const oldmsg = msgs.find(message => message.content.includes(chr.name+'：') );
  if(oldmsg){
    const oldmsgc = oldmsg.content;
    const lines = oldmsgc.split('\n');
    const line = lines[lines.findIndex(line => line.includes(chr.name+'：'))];
    if(message.content.match(/確認/)){message.channel.send(line);return;}
    
    const oldmsgcEditted = oldmsgc.replace(line, 'deleted：undefined'); //削除済用の文章を入れておく
    oldmsg.edit(oldmsgcEditted);
    if(message.content.match(/削除/)){message.channel.send(tools.emj(chr)+chr.name+'の' + targetname + '画像👤を削除しました。');return;}
    
    if(msgc == oldmsgc) msgc = oldmsgcEditted; //
  }else if(message.content.match(/確認|削除/)){message.channel.send(tools.emj(chr)+chr.name+'の' + targetname + '画像👤はありませんでした。');return;};
  
  //■■新サムネ
  const newtn = chr.name + '：' + file.url; //名前とURLをつないだもの
  
  //■■入力へ
  const newmsg = msgc + '\n' + newtn; //改行して末尾に追加
  if(newmsg.length<=2000) msg.edit(newmsg).catch(function(){logch.send(newtn);}); //2000文字以内ならメッセージを編集、編集ができない場合はメッセージを新規に投稿
  else logch.send(newtn); //2000文字を超えていたらメッセージを新規に投稿
  message.channel.send(tools.emj(chr)+chr.name+'の' + targetname + '画像👤を登録しました！');
                                                       
  console.log('▲▲▲'+message.author.username);
  
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★クイズ登録　■■■■■■■■■■■■■■■■■■■■
exports.quiz = async function(client, message){ console.log('■penta.js クイズ登録 ■■■■■ '+message.author.username);
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照jsを参照
  const pata = await require('./pentadata'); //ペンタデータ用のpentadata.jsを参照jsを参照
  const tools = await require('./tools'); //ツール用のtools.jsを参照jsを参照
  const characters = data.characters.filter(c => c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm');
  const sentmsg = message.content.split(/のくいず +|のクイズ +|のくいず　+|のクイズ　+|のくいず\n+|のクイズ\n+/);
  let   imageurl = '';
  const file = message.attachments.first();
  if(file&&file.height&&file.width&&!(message.content.match(/確認|削除/))) imageurl = file.url;

  //■■キャラの取得
  let chr;
  let mchr = '';
  if(sentmsg[0].match(/^投稿済/)){mchr = '投稿済み'}
  else{
    chr = tools.getCharacter(characters, sentmsg[0]);
    if(!chr){message.channel.send(sentmsg[0]+'はデータにありませんでした。表記を変更してお試しください。'); return;}
    else if(chr == 'multiple'){message.channel.send(sentmsg[0]+'は複数のキャラに使用されています。表記を変更してお試しください。'); return;};
    mchr = tools.emj(chr)+chr.name;
  };
                                                 
  //■■発言取得
  const logch = client.channels.cache.get(pata.quizlog);
  const msgs = await logch.messages.fetch({ limit:100 });
  const msg = msgs.first();
  let  msgc = msg.content; console.log('msgc : '+msgc);
  const mid = message.author.id;
  
  //■■クイズを確認
  if(sentmsg[0].match(/^投稿済/)||sentmsg[1].match(/^(確認|一覧)$/)){
    const oldmsgs = (sentmsg[0].match(/^投稿済/)) ? msgs.filter(message => message.content.includes(mid) )
                                                 : msgs.filter(message => message.content.includes(mid) && message.content.includes(chr.name+'＠＠') );
    const alllines =  oldmsgs.map(message => message.content).reverse().join('\n').split('\n');
    const lines = (sentmsg[0].match(/^投稿済/)) ? alllines.filter(l => l.includes(mid))
                                                 .map(l => tools.emj(characters.find(c=>c.name==l.split('＠＠')[0]))+l.split('＠＠')[0]+'```'+l.split('＠＠')[1].replace(/(?<=問題|解答|解説|難易度)(【)/g, '\n$1').replace(/(】)(?=問題|解答|解説|難易度)/g, '$1\n').replace(/⏎/g, '\n')+'```'+l.split('＠＠')[2] )
                                               : alllines.filter(l => l.includes(mid) && l.includes(chr.name+'＠＠'))
                                                 .map(l => '```'+l.split('＠＠')[1].replace(/(?<=問題|解答|解説|難易度)(【)/g, '\n$1').replace(/(】)(?=問題|解答|解説|難易度)/g, '$1\n').replace(/⏎/g, '\n')+'```'+l.split('＠＠')[2] );
    if(lines.length==0){(sentmsg[0].match(/^投稿済/)) ? message.channel.send(mchr+'のクイズ🎓はありませんでした。')
                                                     : message.channel.send(mchr+'のクイズ🎓は存在しないか、あなたによって投稿されていません。'); return;};
    let listmessage = mchr+'のクイズ🎓\n'+lines.join('\n');
    while(listmessage.length>2000){message.channel.send(listmessage.slice(0,2000));listmessage = listmessage.slice(2000);}
    message.channel.send(listmessage);
    return;
  };

  //■■クイズを削除
  const oldmsg = msgs.find(message => message.content.includes(chr.name+'＠＠') );
  if(oldmsg){
    const oldmsgc = oldmsg.content; console.log('oldmsgc : '+oldmsgc);
    const lines = oldmsgc.split('\n');
    const line = lines.find(line => line.includes(chr.name+'＠＠')&&line.includes(mid));
    if(!line){ message.channel.send(mchr+'のクイズ🎓はあなたによって投稿されていないため、上書きに失敗しました。'); return; };
    
    const oldmsgcEditted = oldmsgc.replace(line, 'deleted').replace(/deleted\n|\ndeleted|deleted/, ''); console.log('oldmsgcEditted : '+oldmsgcEditted);
    oldmsg.edit(oldmsgcEditted);
    if(message.content.match(/削除/)){message.channel.send(mchr+'のクイズ🎓を削除しました。');return;}
    
    if(msgc == oldmsgc) msgc = oldmsgcEditted; //
  }else if(message.content.match(/削除/)){message.channel.send(mchr+'のクイズ🎓はありませんでした。');return;};
  
  //■■入力本文の確認
  console.log('sentmsg[1] : '+sentmsg[1]);
  if(!sentmsg[1].match(/^問題(\s|　)?【[\s\S]+】(\s|　)?解答(\s|　)?【[ぁ-んー～〜0-9a-zA-Z]+】(\s|　)?解説(\s|　)?【[\s\S]+】(\s|　)?難易度(\s|　)?【[123]】$/)){message.channel.send('クイズ🎓の入力が形式に沿っていません。\n問題【～～】 解答【ひらがなor半角英数字】 解説【～～】 難易度【1～3】の形式になっているか再度ご確認ください。'); return;};
  if(sentmsg[1].length>500){message.channel.send('クイズ🎓の入力文はテンプレートを含め全体で500文字以内になるようお願いします。(現在'+sentmsg[1].length+'文字)'); return;};
  
  //■■入力へ                                  
  const newline = chr.name + '＠＠' + sentmsg[1].replace(/(\s|　)+(?=[【解難】])/g, '').replace(/(【)\n+/g, '$1').replace(/\n/g, '⏎') + '＠＠' + imageurl + '＠＠' + mid; console.log('newline : '+newline);
  const newmsg = msgc + '\n' + newline; console.log('newmsg : '+newmsg);
  
  if(newmsg.length<=2000) msg.edit(newmsg).catch( ()=>logch.send(newline) )
  else logch.send(newline);
  message.channel.send(mchr+'のクイズ🎓を登録しました！'+(imageurl?'\n画像登録時の発言を削除すると画像が表示されなくなる可能性があります。ご注意ください。':''));
                                                 
  console.log('▲▲▲'+message.author.username);
  
};

//■■■■■■■■■■■■■■■■■■■■　★チケットプレゼント　■■■■■■■■■■■■■■■■■■■■
async function pentatenp(client, data, pata, message, plog, ploga){
  console.log('■■■■■10チケット■■■■■');
  const logtickets = ploga[3].split(':');
  logtickets[0] = Number(ploga[3].split(':')[0]) + 10;
  ploga[3] = ploga[3] = logtickets.join(':');
  await plog.edit(ploga.join('\n'));
  console.log('■ログ書込完了 : '+ploga.join('\n　'));
  PentaResult(message.channel, '', pata.pentaname+' 臨時プレゼント', message.author.displayAvatarURL(), '🎫×10 を獲得しました！', '残り 🎫×'+logtickets[0]+' 🧧×'+logtickets[1], pata.color, '', '', '' );
  return;
};
async function pentathrp(client, data, pata, message, plog, ploga){
  console.log('■■■■■3封筒■■■■■');
  const logtickets = ploga[3].split(':');
  logtickets[1] = Number(ploga[3].split(':')[1]) + 3;
  ploga[3] = ploga[3] = logtickets.join(':');
  await plog.edit(ploga.join('\n'));
  console.log('■ログ書込完了 : '+ploga.join('\n　'));
  PentaResult(message.channel, '', pata.pentaname+' 臨時プレゼント', message.author.displayAvatarURL(), '🧧×3 を獲得しました！', '残り 🎫×'+logtickets[0]+' 🧧×'+logtickets[1], pata.color, '', '', '' );
  return;
};

//■■■■■■■■■■■■■■■■■■■■　★便利ツールたち　■■■■■■■■■■■■■■■■■■■■
//■■　■■　■■　■■　■■　embed送信機能　■■　■■　■■　■■　■■
function PentaResult(channel, content, authorname, authoriconurl, title, description, color, footericonurl, footertext, thumbnailurl, fields, imageurl){
  channel.send({content: content || undefined, embeds: [{
    author: {name:authorname,icon_url:(authoriconurl?authoriconurl:undefined)},
    title:title,
    description:description,
    color: color,
    footer:{icon_url:(footericonurl?footericonurl:undefined),
            text:footertext},
    thumbnail: {url: (thumbnailurl?thumbnailurl:undefined)},
    image: {url: (imageurl?imageurl:undefined)},
    fields: fields
  }]});
  console.log('■■■メッセージ投稿■■■');
};
//■■　■■　■■　■■　■■　イベント取得機能　■■　■■　■■　■■　■■
function getEvent(eventlist){
  const newDate = new Date(); newDate.setHours(newDate.getHours() + 9);
  const y = newDate.getFullYear();
  const m = ('0'+(newDate.getMonth()+1)).slice(-2);
  const d = ('0'+newDate.getDate()).slice(-2);
  const nowDate = new Date(y+'-'+m+'-'+d);
  return eventlist.find(e=>{
    const startDate = new Date(e.start);
    const endDate   = new Date(e.end);
    if(startDate <= nowDate && nowDate <= endDate) return true;
  }); 
}
//■■　■■　■■　■■　■■　季節取得機能　■■　■■　■■　■■　■■
function getSeason(DateToday){
  let season = '';
  const y = DateToday.getFullYear();
  const DateSpring = new Date(y, 3-1,  Math.floor(20.8431  +0.242194*(y-1980))-Math.floor((y-1980)/4));
  const DateSummer = new Date(y, 6-1,  Math.floor(21.615972+0.242194*(y-1980))-Math.floor((y-1980)/4));
  const DateAutumn = new Date(y, 9-1,  Math.floor(23.2488  +0.242194*(y-1980))-Math.floor((y-1980)/4));
  const DateWinter = new Date(y, 12-1, Math.floor(21.080556+0.242194*(y-1980))-Math.floor((y-1980)/4));
  if     (DateToday<DateSpring) season = 'winter';
  else if(DateToday<DateSummer) season = 'spring';
  else if(DateToday<DateAutumn) season = 'summer';
  else if(DateToday<DateWinter) season = 'autumn';
  else                          season = 'winter';
  return season;
};

//■■　■■　■■　■■　■■　重ねポイント計算機能　■■　■■　■■　■■　■■
function colcount(member){
 const m   = member.map(c => c.collected).filter(p => p > 1);
 const pnt = (m.length) ? m.reduce((a,b)=>a+b) : 0  ;
 const txt = (pnt) ? ' + Lv'+pnt+'p' : '' ;
 return { point:pnt, text:txt};
};

//■■　■■　■■　■■　■■　ガチャ機能　■■　■■　■■　■■　■■
function gacha(info, allcards, num){
  //レアリティごとにキャラID集・PU情報集をつくる
  const config = [];
  info.weights.forEach(([rarity, prob]) => {
    //該当レアリティと一致するキャラのID集
    const ids = ( (rarity=='SECRET')  ? allcards.filter(c =>  c.eventid&&c.eventid=='SECRET' ) //SECRETのすべて
                : (rarity=='TEACHER') ? allcards.filter(c => !c.eventid&&c.genre=='tcTm' ) //通常教師のすべて
                : (rarity=='OTHER')   ? allcards.filter(c => !c.eventid&&c.genre=='otTm' ) //通常関係者のすべて
                                      : allcards.filter(c =>(!c.eventid||c.eventid!='SECRET')
                                                          && (c.genre=='stTm' || ( (c.genre=='tcTm'||c.genre=='otTm') && c.eventid) )
                                                          &&  c.rarity==rarity )
                ).map(c => c.id);
    //PU情報のうち、IDの示すキャラが該当レアリティと一致するもの
    const pus = info.pickup.filter(p => {const target = allcards.find(c => c.id == p[0]);
                                         return (   ( target.genre == 'stTm' && target.rarity === rarity ) //「★0～5」であるときの「通常生徒カード」「イベント生徒カード」
                                                 || ( (target.genre == 'tcTm'||target.genre == 'otTm') && target.rarity === rarity && target.eventid ) //「★0～5」であるときの「イベント教師・関係者カード」
                                                 || ( target.genre == 'tcTm'&&rarity == 'TEACHER' ) //「TEACHER」であるときの「通常教師カード」
                                                 || ( target.genre == 'otTm'&&rarity == 'OTHER' ) ) } ); //「OTHER」であるときの「通常関係者カード」
                                         //※SECRETのpickupは考えてないよこれ
    config.push({rarity, prob, pus, ids});
  });
  console.log(config);

  //各キャラごとの確率を保持
  const table = [];
  for(const r of config){
    const probxpu = r.prob * r.pus.reduce((a,b)=>a-b[1],1) / (r.ids.length - r.pus.length);
    for(const cid of r.ids){
      const pu = r.pus.find(p => p[0] === cid);
      const prob = (pu) ? r.prob*pu[1] : probxpu; 
      table.push([cid, prob]);
    };
  };

  //決定
  const resultids = [];
  while(resultids.length < num){
    const ran = Math.random();
    let accum = 0;
    for(const [cid, prob] of table){
      accum += prob;
      if(ran < accum){ 
        if(!(num==10&&resultids.includes(cid))) resultids.push(cid);
        break; };
    };
  };

  //出力
  return resultids;
};

//■■　■■　■■　■■　■■　アイテム絵文字機能　■■　■■　■■　■■　■■
function itememoji(name){
  return (name=='coin') ? '🪙'
       : (name=='ticket') ? '🎫'
       : (name=='envelope') ? '🧧'
       : (name=='jewel') ? '💍'
       : (name=='invite') ? '🎟️'
       : (name=='report') ? '📑'
       : (name=='ribbon') ? '🎗️'
       : undefined;
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason);
  process.exit(1);
});
