//■■■■■■■■■■■■■■■■■■■■　★メインの動作　■■■■■■■■■■■■■■■■■■■■
exports.main = async function(client, message, formcontent){ console.log('magisa.js main');
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照
  const tools= await require('./tools');
  const content = (message) ? message.content : formcontent;
  const command = content.split(/\s|　|、/) //コマンド配列を作ります
                  .map(function(c){ let key = Object.keys(data.paraphrase).filter(k => data.paraphrase[k].includes(c))[0]; //言い換え表現を調べる
                                    let result = (key) ? key : c;    //言い換え表現があった場合は変換
                                    result = fullkatakanize(result); //半角カナを全角カナに変換
                                    result = ANhalve(result);        //全角英数字を半角英数字に変換
                                    if(result !== '？寮'){                                       //「？寮」は以下スルー
                                      result = (result == '?寮') ? result.replace(/\?/g, '？')   //?寮を？寮にする
                                                                 : result.replace(/？/g, '?'); };//？を?にする
                                    return result}); //ついでにハテナを変換
  
  //データセット
  let ds; let al=0;
  if(command[1].match(/^(え(ーてる)?|エ(ーテル)?|e)$/i)){                                                               command.splice(1,1); ds=data.DataSet.stAe;} //生徒・エーテル
  else if(command[1].match(/^(せ(んせい)?|セ(ンセイ)?|先生?|t(eacher)?|教師|顧問)$/i)&&!command[0].match(/^(!|！){2}/)){command.splice(1,1); ds=data.DataSet.tcTm;} //教師・東魔
  else if(command[1].match(/^((東魔)?関係者)$/i)){                                                                    command.splice(1,1); ds=data.DataSet.otTm;} //東魔関係者
  else if(command[1].match(/^(ほ(か)?|ホ(カ)?|(その)?他|そのほか|o(ther)?)$/i)){                                        command.splice(1,1); ds=data.DataSet.chOt;} //その他
  else if(command[1].match(/^(ぜ(ん(ぶ|いん|きゃら))?|ゼン?(ブ|イン|キャラ)?|全(員|体|キャラ)?|all?)$/i)){               command.splice(1,1); ds=data.DataSet.all;}  //すべて
  else if(command[0].match(/^(!|！){2}/)){ds=data.DataSet.all;}
  else{ds=data.DataSet.stTm;} //生徒・東魔
  
  if(command.length==1){sendResult(message.channel, '無効なコマンド'+ds.ex, "", `コマンドが不足しています。表記を変更してお試しください。`, ds.color, '', data.updated, '');return;};
  
  //検索対象データ
  const characters = data.characters;
  const students = (ds.name == 'all') ? characters : data.characters.filter(c => c.genre == ds.name );
  
  let command1h = hiraganize(command[1]); //ひらがな化するとmatchが短く済む場合もある 場合によっては完全一致のために避けるべき
  const gachakey = /^が(ちゃ)?|ら(んだむ)?|くじ|ga(cha)?|ra(ndom)?|kuji/i;
  const odaikey = /しちゅ|状況|場面|おだい|お題|situ|odai/i;
  
  
//■■■■■プロフィール検索
  const regname = /(先生|せんせい|せんせー|先輩|せんぱい|ぱいせん|部長|ぶちょう|委員長|いいんちょう|いいんちょ)$/g ;
  if(command1h.match(regname)) command1h = command1h.replace(regname, '');
  const chr = tools.getCharacter(characters, command1h);
  if(chr){ if(chr=='multiple'){ const sendcommand = ['', 'nickname', command1h];
                                if(command[2]) sendcommand.push(command[2]);
                                dataSearch(client, message, data, tools, characters, sendcommand, ds); }
           else{ profile(client, message, data, tools, command, chr); };
           return;};
//■■■■■用語検索
  const term = tools.getTerm(data.terms, command1h);
  if(term){ dictionary(message, data, tools, characters, term); return; };
  
//■■■■■メンバー検索
  if(command[1].match(/玉ちゃん/))            {tamachan(message, data, students, command, ds); return;}
  if(command[1].match(/^(同室未定|寮室未定|寮未定|ルームメイト未定)$/))
                                              {nodormmate(client, message, data, tools, students, command, ds); return;}
  if(command[1].match(/^全|一覧$|リスト$/)&&!command[1].match(odaikey))
                                              {all(client, message, data, students, command, ds); return;}
  if(command[1].match(/^.+部$|^.+委員会?$/))  {group(client, message, data, tools, students, command, ds); return;}
  if(command[1].match(/^(\d|\?)年生?$/))      {grade(client, message, data, tools, students, command, ds); return;}
  if(command[1].match(/^\d+(cm|センチ)台?$/i)){height(client, message, data, tools, students, command, ds); return;}
  if(command[1].match(/^(0?[1-9]|1[0-2])(月|\/|\.)((0?[1-9]|[1-2][0-9]|3[0-1])日?)?(生まれ)?$/))
                                              {birthday(client, message, data, tools, students, command, ds); return;}
  if(command[1].match(/^.寮$/))               {dorm(client, message, data, tools, students, command, ds); return;}
  if(command[1].match(/^.+(部屋|へや|べや)$/)){room(client, message, data, tools, students, command, ds); return;}
  if(command[1].match(/^.+(科|宮)$/))         {major(client, message, data, tools, characters, command, ds); return;}
  if(command[1].match(/^生徒会$/))            {council(client, message, data, tools, students, command, ds); return;}
  if(command[1].match(/^首席$/))              {top(client, message, data, tools, students, command, ds); return;}
  if(command[1].match(/^寮長$/))              {dormleader(client, message, data, tools, students, command, ds); return;}
  //作者
    const aArr = command1h.split(data.authorunit)[0];
    const aObj = convertAlias(data.authors, aArr, 'name', 'alias'); //nameAはinit, nameBはalias[0]です
    if(aObj.index > -1){command[1] = aObj.nameA; author(client, message, data, tools, students, command, ds); return;}
  
//■■■■■その他機能
  if(command1h.match(gachakey)){gacha(message, data, tools, students, command, ds, odaikey); return;}
  if(command1h.match(odaikey)){odai(message, data, command, ds, true); return;}
  if(command1h.match(/^(えちゃ|絵茶)/)){echaodai(message, data); return;}
  if(command1h.match(/^(ひみつ(がちゃ)?|ひが)$/)){hgacha(client, message, data, tools, characters); return;}
  if(command1h.match(/^(くいず|クイズ)$/)){qgacha(client, message, data, tools, characters, command); return;}
  //汎用データ検索
    const dObj = convertAlias(data.categories, command[1], 'nameen', 'namejp');
    if(dObj.index > -1 || data.categories.find( obj => obj.nameen == command[1] )){
      if(dObj.index > -1) command[1] = dObj.nameA;
      dataSearch(client, message, data, tools, students, command, ds);
      return;
    };
  if(command1h.match(/^(へるぷ|help)$/i)){help(client, message, data, command, ds); return;}
  if(command[1] == 'admin'){admin(client, message, data, command); return;}
  
  //■■無効なコマンド■■
  sendResult(message.channel, '無効なコマンド', "", `${command[1]}はデータにありませんでした。表記を変更してお試しください。`, ds.color, '', data.updated, '');
  
  return;
}; 


//■■■■■■■■■■■■■■■■■■■■　★メンテ時の動作　■■■■■■■■■■■■■■■■■■■■
exports.mainte = async function(client, message){
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照
  message.channel.send({embeds: [{
    description:`メンテ中！ ごめんね！`,
    color: 0x000000,
    footer:{text:data.updated}
  }]});
}


//■■■■■■■■■■■■■■■■■■■■　★DM・時報の動作　■■■■■■■■■■■■■■■■■■■■

//■■　■■　■■　■■　■■　＜ひみつ登録の動作＞　■■　■■　■■　■■　■■
exports.newhimitsu = async function(client, message){ console.log('magisa.js newhimitsu');
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照
  const tools = await require('./tools'); //ツール用のtools.jsを参照
  const characters = data.characters.filter(c => c.genre == 'stTm' || c.genre == 'tcTm' || c.genre == 'otTm');
  const senthmt = message.content.split(/のひみつ |のヒミツ |の秘密 |のひみつ　|のヒミツ　|の秘密　|のひみつ\n+|のヒミツ\n+|の秘密\n+/);
  
  //■■生徒の取得
  let chr;
  let mchr = '';
  if(senthmt[0].match(/^投稿済/)){mchr = '投稿済み'}
  else{
    chr = tools.getCharacter(characters, senthmt[0]);
    if(!chr){message.channel.send(senthmt[0]+'はデータにありませんでした。表記を変更してお試しください。'); return;}
    else if(chr == 'multiple'){message.channel.send(senthmt[0]+'は複数のキャラに使用されています。表記を変更してお試しください。'); return;};
    mchr = tools.emj(chr)+chr.name;
  };
  
  //■■ひみつを確認
  if(senthmt[1].match(/^(確認|一覧)$/)){
    const mid = '＠＠'+message.author.id;
    const msgs1 = await client.channels.cache.get(data.DataSet.stTm['Himitsu']).messages.fetch({ limit:100 }); //発言取得
    const msgs2 = await client.channels.cache.get(data.DataSet.tcTm['Himitsu']).messages.fetch({ limit:100 }); //発言取得
    const msgs = msgs1.concat(msgs2);
    const oldmsgs = (senthmt[0].match(/^投稿済/)) ? msgs.filter(message => message.content.includes(mid) )
                                                : msgs.filter(message => message.content.includes(mid) && message.content.includes(chr.name) );
    const alllines =  oldmsgs.map(message => message.content).reverse().join('\n').split('\n')
                             .sort((a,b)=>{const nameA = a.split('：')[0];
                                           const nameB = b.split('：')[0];
                                           return (nameA<nameB) ? -1 : (nameA>nameB) ? 1 : 0;});
    const lines = (senthmt[0].match(/^投稿済/)) ? alllines.filter(l => l.includes(mid))
                                                  .map(l => tools.emj(characters.find(c=>c.name==l.split('＠＠')[0]))+l.split('＠＠')[0]+'：'+l.split('＠＠')[1].replace('＄＄', ' [画像]：')+' ['+l.split('＠＠')[3]+'回]' )
                                                : alllines.filter(l => l.includes(mid) && l.split('＠＠')[0]==chr.name)
                                                  .map((l,i) => (i+1)+') '+l.split('＠＠')[1].replace('＄＄', ' [画像]：')+' ['+l.split('＠＠')[3]+'回]' );
    if(lines.length==0){(senthmt[0].match(/^投稿済/)) ? message.channel.send(mchr+'のひみつ㊙️はありませんでした。')
                                                      : message.channel.send(mchr+'のひみつ㊙️は存在しないか、あなたによって投稿されていません。'); return;};
    let listmessage = mchr+'のひみつ一覧㊙️(未出'+lines.filter(l=>l.includes('[0回]')).length+'個 / 全'+lines.length+'個)\n'+lines.join('\n')+'\n```個人のひみつ一覧㊙️のすぐあとに「○○のひみつ　削除　(リスト番号)」と入力することで削除が可能です。```';
    while(listmessage.length>2000){message.channel.send(listmessage.slice(0,2000));listmessage = listmessage.slice(2000);}
    message.channel.send(listmessage);
    return;
  };
  
  //■■データセット分岐
  const ds = (senthmt[0].match(/^投稿済/)) ? '' : data.DataSet[chr.genre];
  const logch = (senthmt[0].match(/^投稿済/)) ? '' : client.channels.cache.get(ds['Himitsu']);
  
  //■■ひみつを削除
  if(senthmt[1].match(/^削除/)){//message.channel.send('ひみつ時報㊙️に削除機能は実装されていません。お手数おかけしますが、管理者へお問い合わせください。'); 
    //例外アラート
    if(senthmt[0].match(/^投稿済/)){message.channel.send('削除を行う場合は、個人のひみつ一覧㊙️を呼び出してください。'); return;};
    if(senthmt[1].length<4){message.channel.send('ひみつ一覧㊙️のリスト番号が指定されていません。'); return;};
    const sentmsgs = await message.channel.messages.fetch({limit:2});
    const listmsg = sentmsgs.last();
    if(!listmsg.content.includes(mchr+'のひみつ一覧㊙️')){message.channel.send(mchr+'のひみつ一覧㊙️を直前に表示してください。'); return;};
    
    //まずはリスト発言から指定されたひみつ本文を取得して検索用に組み直す
    const listlines = listmsg.content.split('\n');
    const listline = listlines.find(l => l.split(') ')[0] == ANhalve(senthmt[1].slice(3)));
    const hmttext = listline.split(/\) | \[| \[画像\]：/)[1];
    const keytext = chr.name+'＠＠'+hmttext;
    //ひみつログチャンネルから本文を含む発言を探して削除する
    const hmsgs = await logch.messages.fetch({ limit:100 });
    const hmsg = hmsgs.find(m => m.content.includes(keytext));
    const hlines = hmsg.content.split('\n').filter(l => !l.includes(keytext));
    const newhmsg = (hlines.length == 0) ? 'deleted' : hlines.join('\n');
    hmsg.edit(newhmsg);
    message.channel.send(mchr+'の以下のひみつ㊙️を削除しました。```✖'+hmttext+'```')
    
    return;
  };
  
  //■■入力本文の確認
  if(senthmt[1].length>100){message.channel.send('ひみつの内容は100文字以内でお願いします。(現在'+senthmt[1].length+'文字)'); return;};
  if(senthmt[1].match(/＠＠|＄＄|\) | \[|\n/)){message.channel.send('使用できない記号・改行等が含まれています。修正ののち再投稿をお願いします。'); return;};
  
  //■■入力へ
  const msgs = await logch.messages.fetch({ limit:1 });
  const msg = msgs.first();
  const file = await message.attachments.first();
  const newhmt = chr.name + '＠＠' + senthmt[1] + ( file ? '＄＄'+file.url : '' ) + '＠＠' + message.author.id + '＠＠0＠＠■';
  const newmsg = msg.content + '\n' + newhmt;
  
  if(newmsg.length<=2000){
    msg.edit(newmsg).catch(function(){logch.send(newhmt);});
  }
  else{logch.send(newhmt);}
  message.channel.send(mchr+'のひみつ㊙️を登録しました！')
  
};

//■■　■■　■■　■■　■■　＜ひみつ時報の動作＞　■■　■■　■■　■■　■■
exports.himitsu = async function(client, ftrps){ console.log('magisa.js himitsu');
  //■■各データ準備
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照
  const tools = await require('./tools'); //ツール用のtools.jsを参照
  const characters = data.characters.filter(c => c.genre == 'stTm' || c.genre == 'tcTm');
  //const sunday = '【日曜版】';
  
  //■■■■■確率調整■■■■■
  //const PofNEW = (ftrps && ftrps == sunday) ? 100 : 80; //未出の出る確率(%) 【日曜版】:【通常版】
  //const NofOLD = 3; //既出を取り出して比較するときの個数
  
  //■■日時取得
  const today = new Date(); today.setHours(today.getHours() + 9);
  let tm = today.getHours()+':00です！';
  //tm = (ftrps && ftrps == sunday) ? tm + '(日曜：初出'+PofNEW+'%)' : tm + '(初出'+PofNEW+'%)' ;
  
  //■■全ひみつログ取得　→　ひみつデータ集へ変換
  const msgs1 = await client.channels.cache.get(data.DataSet.stTm['Himitsu']).messages.fetch({ limit:100 }); //東魔生徒
  const msgs2 = await client.channels.cache.get(data.DataSet.tcTm['Himitsu']).messages.fetch({ limit:100 }); //東魔教師
  const msgs = await msgs1.concat(msgs2); //各ログをつなげます
  const hmtList = await msgs.map(message => message.content).join('\n').split('\n').map(h => h.split('＠＠')); //ひみつデータ集ができました
  
  //■■ひみつ抽選
  let hmt; //出力されるひみつデータ
  const hmtListNEW = await hmtList.filter(h => h[3] == '0'); //未出だけのひみつデータ集
  //const dice = Math.floor(Math.random()*100); //1d100 ※0～99
  //未出の個数が1以上 かつ 1d100に成功 YES→未出から抽選 NO→既出から抽選
  if(hmtListNEW.length /*&& dice < PofNEW*/){              hmt = shufflenum(hmtListNEW, 1)[0];}                                     //★出力されるひみつ
                                    else{ const hmtListOLD = hmtList.filter(h => h[3] !== '0');                                 //既出だけのひみつデータ集
                                          //const hmtchoices = shufflenum(hmtListOLD, NofOLD);                                    //出力されるひみつ候補
                                          //const   minCount = hmtchoices.map(h => Number(h[3])).reduce((a,b) => Math.min(a,b));　//既出カウント最少を得る
                                          //             hmt = hmtchoices.find(h => h[3] == minCount);                            //★出力されるひみつ

                                                       hmt = shufflenum(hmtListOLD, 1)[0];                              //★出力されるひみつ
                                         };
  
  //■■キャラの取得　→　データセット分岐
  const chr = tools.getCharacter(characters, hmt[0]);
  if(!chr){client.channels.cache.get(data.DataSet.open['HimitsuTarget']).send(hmt[0]+'が存在しません。');exports.himitsu();return;};
  const ds = data.DataSet[chr.genre];
  
  //■■サムネイルURL取得
  const tchid = ((today.getMonth()+1)+'/'+today.getDate() == '4/1') ? data.DataSet.april['Thumbnail'] : ds['Thumbnail'];
  const tmsgs = await client.channels.cache.get(tchid).messages.fetch({ limit:100 });
  const tmsg = tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(chr.name) );
  const thumbnailurl = (tmsg) ? tmsg.split('：')[1] : data.noimage;
  
  //■■既出回数
  const Count = Number(hmt[3])+1;
  const nw = (Count === 1) ? '[new!]' : ''/*'['+Count+'回目]'*/ ;
  
  //■■■■■発言
  //const user = client.users.get(hmt[2]);
  const hmtI = hmt[1].split('＄＄');
  const imageurl = (hmtI.length==2) ? hmtI[1] : undefined;
  const jihoch = await client.channels.cache.get(ds['HimitsuTarget']);
  const jihoch2 = await client.channels.cache.get(data.DataSet.open['HimitsuTarget']);
  sendResult([jihoch, jihoch2], tm, tools.emj(chr)+chr.name+'のひみつ㊙️ '+nw,
             hmtI[0], ds.color, ''/*user.displayAvatarURL()*/, '🧙 マギカサーチ magisa'+ftrps, thumbnailurl, ''/*`by ${user}`*/,  imageurl);

  //■■発言後処理
  const keyhmt = hmt.join('＠＠'); //検索用にひみつを結合
  const editeeMsg = msgs.find(msg=>msg.content.includes(keyhmt)) //今回のひみつが含まれる発言を取得
  const zengo = editeeMsg.content.split(keyhmt); //編集箇所前後を配列として持つ
  hmt[3] = Count; //今回のひみつのカウントを上げます
  const inserthmt = hmt.join('＠＠'); //挿入用にひみつを結合
  const newcontent = zengo.join(inserthmt); //編集箇所前後を挿入用ひみつで結合
  editeeMsg.edit(newcontent); //発言を編集
  
  return;
};

//■■　■■　■■　■■　■■　＜誕生日時報の動作＞　■■　■■　■■　■■　■■
exports.todayis = async function(client){ console.log('magisa.js todayis');
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照
  const tools = await require('./tools'); //ツール用のtools.jsを参照
  const characters = data.characters;
  
  const ndate = new Date();
  ndate.setHours(ndate.getHours() + 9);
  const m = ndate.getMonth()+1;
  const d = ndate.getDate();
  const bdate = m+'/'+d;
  const uruu = (new Date(ndate.getFullYear(), 2, 0).getDate()===29);
  
  const fcharacters = characters.filter(c => c.birthday == bdate ||(bdate=='3/1'&&!uruu&&c.birthday=='2/29'));
  
  for(let i=0;i<fcharacters.length;i++){
    const chr = fcharacters[i];
    const ds = data.DataSet[chr.genre];
    const jihoch = await client.channels.cache.get(ds['HimitsuTarget']); //発言先
    const jihoch2 = await client.channels.cache.get(data.DataSet.open['HimitsuTarget']);
    //サムネイルURL取得
    const logch = client.channels.cache.get(ds['Thumbnail']);
    const tmsgs = await logch.messages.fetch({ limit:100 });
    const tmsg = tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(chr.name) );
    const thumbnailurl = (tmsg) ? tmsg.split('：')[1] : data.noimage;
    sendResult([jihoch, jihoch2], chr.birthday.split('/')[0]+'月'+chr.birthday.split('/')[1]+'日です！', tools.emj(chr)+chr.name, '🎂 Happy Birthday! 🎂', ds.color, '', '🧙 マギカサーチ magisa', thumbnailurl);
  };
  return;
};

//■■　■■　■■　■■　■■　＜サムネ追加の動作＞　■■　■■　■■　■■　■■
exports.setthumbnail = async function(client, message){ console.log('magisa.js setthumbnail');
  const data = await require('./magisadata'); //データベース用のmagisadata.jsを参照
  const tools = await require('./tools'); //ツール用のtools.jsを参照
  const pata = await require('./pentadata'); //ペンタデータ用のpentadata.jsを参照
  const orcards = data.characters;
  const spcards = pata.spcards(orcards);
  const characters = orcards.concat(spcards);
  let imgmsg = '画像';
  const sentname = message.content.split(/の画像|の四月/);
  
  //■■生徒の取得
    
  const chr = tools.getCharacter(characters, sentname[0]);
  if(!chr){message.channel.send(sentname[0]+'はデータにありませんでした。表記を変更してお試しください。'); return;}
  else if(chr == 'multiple'){message.channel.send(sentname[0]+'は複数のキャラに使用されています。表記を変更してお試しください。'); return;};

  let ds;
  let logch;
                                                       
  if(chr.eventid)                        { logch  = client.channels.cache.get(pata.sptnlog); }
  else if(message.content.match(/の四月/)){ imgmsg = '四月';
                                           ds     = data.DataSet['april'];
                                           logch  = client.channels.cache.get(ds['Thumbnail']); }
  else                                   { ds     = data.DataSet[chr.genre];
                                           logch  = client.channels.cache.get(ds['Thumbnail']); };
  
  //■■ログの取得
  const msgs = await logch.messages.fetch({ limit:100 });
  const msg = msgs.first();
  let msgc = msg.content;
  
  //■■画像を確認
  const file = message.attachments.first();
  if( (!file||(!file.height && !file.width)) && !(message.content.match(/確認|削除/)) ){ //画像ファイルが無くて、確認や削除もない
    message.channel.send('画像ファイルがありません。'); return;
  };
  
  //■■重複削除
  const oldmsg = msgs.find(message => message.content.includes(chr.name) );
  if(oldmsg){
    const oldmsgc = oldmsg.content;
    const lines = oldmsgc.split('\n');
    const line = lines[lines.findIndex(line => line.includes(chr.name))];
    if(message.content.match(/確認/)){message.channel.send(line);return;}
    
    const oldmsgcEditted = oldmsgc.replace(line, 'deleted：undefined'); //削除済用の文章を入れておく
    oldmsg.edit(oldmsgcEditted);
    if(message.content.match(/削除/)){message.channel.send(tools.emj(chr)+chr.name+'の'+imgmsg+'👤を削除しました。');return;}
    
    if(msgc == oldmsgc) msgc = oldmsgcEditted; //
  }else if(message.content.match(/確認|削除/)){message.channel.send(tools.emj(chr)+chr.name+'の'+imgmsg+'👤はありませんでした。');return;};
  

  //■■新サムネ
  const newtn = chr.name + '：' + file.url; //名前とURLをつないだもの
  
  //■■入力へ
  const newmsg = msgc + '\n' + newtn; //改行して末尾に追加
  if(newmsg.length<=2000) msg.edit(newmsg).catch(function(){logch.send(newtn);}); //2000文字以内ならメッセージを編集、編集ができない場合はメッセージを新規に投稿
  else logch.send(newtn); //2000文字を超えていたらメッセージを新規に投稿
  message.channel.send(tools.emj(chr)+chr.name+'の'+imgmsg+'👤を登録しました！');
  
  return;
};


//■■■■■■■■■■■■■■■■■■■■　★基礎機能　■■■■■■■■■■■■■■■■■■■■

//■■　■■　■■　■■　■■　＜プロフィール検索＞　■■　■■　■■　■■　■■
async function profile(client, message, data, tools, command, st){ console.log('magisa.js profile');

  const ds = data.DataSet[st.genre];
  let description = '';
  
  //2節だったら
  if(command.length == 2){ //コマンドが2節 → 全プロフィール

    //プロフィールURLを検索
    /*const pfms = await client.channels.cache.get(ds['Profile']).messages.fetch({ limit:100 });
    let pfl = profileUrl(st, pfms);
    if(pfl) pfl='\n\nmore > '+pfl;*/
    let pfl = (st.notion) ? '\n\n[🔗詳細(Notion)]('+st.notion+')' : '' ;

    const age = (st.age)? st.age : '?';
    const cm = (st.cm)? st.cm : '?';
    const subcm = (st.subcm) ? ' ('+st.subcm+'cm)' : '' ;
    const birthday = (!st.birthday) ? '' : ' ' + st.birthday + '生';
    let majorunit = '';
    let gradeorage;
    if(st.grade){gradeorage = st.grade + '年';}
    else if(st.age){gradeorage = ' ' + age + '歳';}
    else{gradeorage = '?歳 '};
    let group = '';
    if(st.club||st.committee){
      let committee = '';
      if(st.committee.includes('生徒会')) committee = st.committee + ' ';
      else if(st.committee) committee = st.committee + '委員会 ';
      const club = (st.club) ? st.club + '部' : '';
      group = '\n'+ committee + club;
    }
    let ex = '';
    if(st.genre=='stTm'){
      majorunit = '科';
      let dormmate;
      if(st.dorm == '非寮'){dormmate = ''}
      else if(st.dorm == '未定'){dormmate = '(寮or非寮)'}
      else{dormmate = ' (同室：'+st.dormmate+')'};
      ex = '\n\n'+ReSymbolizeC(client, message, data.symbols, st.dorm, 'dorm', 'dormemj')+st.dorm+dormmate
    }else if(st.genre=='tcTm'){
      majorunit = '科';
      if(st.advisor||st.lecture){
        const advisor = (!st.advisor)? '' : '\n顧問：'+st.advisor;
        const lecture = (!st.lecture)? '' : '\n授業例：'+st.lecture;
        ex = '\n' + advisor + lecture;
      }
    }else if(st.genre=='stAe'){
      majorunit = '宮';
      if(st.abnormality){
        const abnormality = (!st.abnormality)? '' : '\n異常性：'+st.abnormality;
        ex = '\n'+ abnormality;
      }
    }else if(st.genre=='chOt'){
      ex = '\n\n所属：'+ st.belong;
    };
    const stick = (st.stick)? '\n杖モチーフ：'+st.stick : '';
    const hometown = (st.hometown)? '\n出身：'+st.hometown : '';
    const notes = (st.notes)? '\n備考：'+st.notes : '';
    
    description = st.subname+' ['+st.author+']\n'
                  +ReSymbolizeC(client, message, data.symbols, st.major, 'major', 'majoremj')+st.major+majorunit+gradeorage+' '+st.sex+' '+cm+'cm'+subcm+birthday
                  + group + ex + stick + hometown + notes + pfl
  }
  
  //3節だったら
  else if(command.length == 3 ){
    if(command[2].match(/mini|みに|ミニ/i) ){ //■mini機能
      let gradeorage;
        if(st.grade){gradeorage = ReSymbolizeC(client, message, data.symbols, st.grade, 'grade', 'gradeemj') + st.grade + ' / '}
        else if(st.age){gradeorage = ' / '+st.age+'歳 '}
        else{gradeorage = ' / ?歳 '};
      let height;
        if(!st.cm)         height = '?cm';
        else if(!st.subcm) height = st.cm;
        else               height = st.cm+'('+st.subcm+')';
      let ex = '';
        if(st.genre=='stTm'){
          let group = '';
          if(st.club||st.committee){
            let committee = '';
            if(st.committee.includes('生徒会')) committee = st.committee + ' ';
            else if(st.committee) committee = st.committee + '委員会 ';
            const club = (st.club) ? st.club+'部' : '';
            group = '\n'+ committee + club
          }
          ex = ReSymbolizeC(client, message, data.symbols, st.dorm, 'dorm', 'dormemj') + st.dorm + group;
        }else if(st.genre=='tcTm'){
          ex =  (!st.advisor)? '' : '\n'+st.advisor;
        }else if(st.genre=='stAe'){
        }else if(st.genre=='chOt'){
          ex = '\n'+st.belong;
        };
      
      description = ReSymbolizeC(client, message, data.symbols, st.major, 'major', 'majoremj') + ReSymbolize(data.symbols, st.major, 'major', 'majorinit')
                    + gradeorage + st.sex + ' ' + height + ' ' + ex + ' [' + st.author.slice(0,1) + ']'
      /*
    }else if(command[2].match(/^プ(ロフ(ィール)?)?$|証$|紹(介)?|^しょ|^more$/i) ){ //■紹介文URL機能
      //プロフィールURLを検索
      const pfms = await client.channels.cache.get(ds['Profile']).messages.fetch({ limit:100 });
      let pfl = profileUrl(st, pfms);
      if(!pfl) pfl='未投稿';
      description = '紹介文：'+pfl;*/
    }else if(command[2].match(/^(データ|data)$/i) ){ //■データ一覧機能
      description = Object.entries(st).map(p => { let cnamejp = convertAlias(data.categories, p[0], 'namejp', 'nameen').nameA;
                                                  cnamejp = (cnamejp) ? '('+cnamejp+')' : '';
                                                  return p[0] + cnamejp + ' : ' + p[1];
                                                }).join('\n');
    }else if(command[2].match(/^ひみつ$/i) ){ //■ひみつ一覧機能
      const hatitle = 'プロフィール検索'+ds.ex+' for ㊙️';
      //■■サムネイルURL取得
      const today = tools.getTodayJp();
      const tchid = ((today.getMonth()+1)+'/'+today.getDate() == '4/1') ? data.DataSet.april['Thumbnail'] : ds['Thumbnail'];
      const tmsgs = await client.channels.cache.get(tchid).messages.fetch({ limit:100 });
      const tmsg = tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(st.name) );
      const thumbnailurl = (tmsg) ? tmsg.split('：')[1] : data.noimage;

      //■■発言取得
      const msgs = await client.channels.cache.get(data.DataSet[st.genre]['Himitsu']).messages.fetch({ limit:100 });
      const hmtLine = msgs.map(message => message.content).join('\n').split('\n').filter(h => h.split('＠＠')[0]==st.name);
      if(hmtLine.length==0){
        sendResult(message.channel, hatitle, tools.emj(st)+st.name+'のひみつ㊙️',
                   '【 投稿されているひみつはありません 】', ds.color, '', '🧙 マギカサーチ magisa', thumbnailurl);
      };

      const hmtList = hmtLine.map(h => h.split('＠＠')); //ひみつデータ集ができました
      hmtList.forEach(hmt=>{
        let hdescription = '';
        let imageurl = undefined;
        if(hmt[3]=='0'){
          hdescription = '【__ ⚠️未解放のひみつです __】';
        }
        else{
          const hmtI = hmt[1].split('＄＄');
          hdescription = hmtI[0];
          if(hmtI.length==2) imageurl = hmtI[1];
        };
        sendResult(message.channel, hatitle, tools.emj(st)+st.name+'のひみつ㊙️'/*+' ['+hmt[3]+'回投稿]'*/,
                   hdescription, ds.color, ''/*client.users.get(hmt[2]).displayAvatarURL()*/, '🧙 マギカサーチ magisa', thumbnailurl, '', imageurl);
      });
      return;
    }else{ //コマンドが3節 → 部分プロフィール
      const ct = convertAlias(data.categories, command[2], 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
      let ctvalue = st[ct.nameA];
      if(ct.index > -1 && ctvalue){ //namejp:コマンド2 な項目のIndex番号がありました(0以上)
        if     (ct.nameA == 'cm' && st.subcm)                       {ctvalue = ctvalue + '(' + st.subcm + ')';}
        else if(ct.nameA == 'major'||ct.nameA == 'grade')           {ctvalue = ReSymbolizeC(client, message, data.symbols, ctvalue, ct.nameA, ct.nameA+'emj') + ctvalue;}
        else if(ct.nameA == 'dormmate'&&!ctvalue&&st.dorm == '非寮'){ctvalue = "※非寮"}
        else if(ct.nameA == 'dorm'){
          let l = '';
          if(st.notes.match(/寮長/)){l = '　:star:寮長'};
          ctvalue = ReSymbolizeC(client, message, data.symbols, ctvalue, 'dorm', 'dormemj') + ctvalue + l + '\n同室：'+st.dormmate;
        };
        description = ct.nameB+'：'+ctvalue
      }else{ //namejp:コマンド2 な項目のIndex番号がありませんでした(-1)
        description = `${command[2]}はデータにありませんでした。表記を変更してお試しください。`
      } 
    };
  }else{ //4節だったら
    description = `プロフィール検索のコマンドは3節以下にのみ対応しています。表記を変更してお試しください。`
  };
  
  //サムネイルURL取得
  const today = tools.getTodayJp();
  const tchid = ((today.getMonth()+1)+'/'+today.getDate() == '4/1') ? data.DataSet.april['Thumbnail'] : ds['Thumbnail'];
  const tmsgs = await client.channels.cache.get(tchid).messages.fetch({ limit:100 });
  const tmsg = tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(st.name) );
  const thumbnailurl = (tmsg) ? tmsg.split('：')[1] : data.noimage;
  
  //送ります
  const color = (st.grade) ? ReSymbolize(data.symbols, st.grade, 'grade', 'gradecolor') : ds.color ;
  sendResult(message.channel, 'プロフィール検索'+ds.ex, tools.emj(st)+st.name, description, color, '', data.updated, thumbnailurl);
  return;
};

//■■　■■　■■　■■　■■　＜用語検索＞　■■　■■　■■　■■　■■
async function dictionary(message, data, tools, characters, term){console.log(term);
  const people = (term.person) ? '\n\n────── 関連人物 ──────\n'+term.person.split('/').map(p=>{const chr = tools.getCharacter(characters, p); if(chr&&chr!=='multiple'){return tools.emj(chr)+chr.name}}).join('\n') : '';
  sendResult(message.channel, '用語検索', '📇'+term.word, term.kana+'\n'+term.description+people, 0xbbddff, '', data.termupdated);
};

//■■　■■　■■　■■　■■　＜メンバー検索＞　■■　■■　■■　■■　■■
function tamachan(message, data, students, command, ds){
  let title = '';
  let description = '';
  const tamachan = students.filter(student => student.name == '玉恵・ローデンヴァルト');
  const tamachanlist = [];
  let tamoji = tamachan[0].emoji;
  if(message.content.match(/怒/)){tamoji = '😡';};
  let tamachannumber = 3;
  if(command[2]&&command[2]<6){tamachannumber = command[2]};
  for(let i=0;i<tamachannumber;i++){tamachanlist[i] = tamoji+tamachan[0].name;};
  if(command[1].match(/科/)){
    const gemj = data.symbols.gradeemj;
    title = tamoji+command[1]+tamoji
    description = 'ですわ～！☝️😂\n\n'+gemj[3]+gemj[3]+gemj[3]+'　3年生　'+gemj[3]+gemj[3]+gemj[3]+'\n'+tamachanlist.join('\n')+'\n\n'+gemj[2]+gemj[2]+gemj[2]+'　2年生　'+gemj[2]+gemj[2]+gemj[2]+'\n'+tamachanlist.join('\n')+'\n\n'+gemj[1]+gemj[1]+gemj[1]+'　1年生　'+gemj[1]+gemj[1]+gemj[1]+'\n'+tamachanlist.join('\n');
  }else{
    title = command[1];
    description = tamachanlist.join('\n')
  }
  sendResult(message.channel, 'タマチャン検索', title, description, ds.color, '', '😂 タマエサーチ desuwa　updated: 2021.07.22', '');
  return;
};
function nodormmate(client, message, data, tools, students, command, ds){
  const fstudents = students.filter(student => student.dormmate == '未定');
  let count = fstudents.length;
  
  const fnamelist = [];
  for(let i=0;i<fstudents.length;i++){
    const demj = ReSymbolizeC(client, message, data.symbols, fstudents[i].dorm, 'dorm', 'dormemj');
    let tail = '';
    if(demj !== fstudents[i].dorm){tail = '　' + demj;};
    const majorinit = ReSymbolize(data.symbols, fstudents[i].major, 'major', 'majorinit') ;
    fnamelist[i] = tools.emj(fstudents[i])+fstudents[i].name+tail+'　'+majorinit+fstudents[i].grade+'　'+fstudents[i].sex+'　\('+fstudents[i].author.slice(0,1)+'\)';
  };

  sendResult(message.channel, 'メンバー検索'+ds.ex, 'ルームメイト未定'+' ('+count+'人)', fnamelist.join('\n'), ds.color, '', data.updated, '');
  return;
};
function all(client, message, data, students, command, ds){
  let unit = command[1].replace(/全|一覧|リスト/g, '');
  let title = '';
  let description = '';
  
  const ctObj = convertAlias(data.categories, unit, 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
  if(ctObj.index == -1){
    title = '📂全'+unit;
    description = `${unit}はデータにありませんでした。表記を変更してお試しください。`
  }else{
    
    title = '📂全'+ctObj.nameB;
    let count = 0;

    //カテゴリー収集
    let ctvlist = students.map(student => String(student[ctObj.nameA]));
    if(ctvlist.length==0){
      description = `${unit}はデータにありませんでした。表記を変更してお試しください。`
    }else{
      
      //特殊処理：兼部
      if(ctObj.nameA=='club'){
        const ctvlistB = ctvlist.filter(ctv => ctv.match(/\s|　/)); //兼部を見つける
        ctvlist = ctvlist.filter(item => !ctvlistB.includes(item));//兼部情報を元から削除
        for(let i=0;i<ctvlistB.length;i++)ctvlist = ctvlist.concat(ctvlistB[i].split(/\s|　/)); //兼部情報をスペースで分離してリストに追加
      }
      //特殊処理：生徒会
      else if(ctObj.nameA=='committee'){
        const ctvlistC = ctvlist.filter(ctv => ctv.match(/生徒会/)); //生徒会を見つける
        ctvlist = ctvlist.filter(item => !ctvlistC.includes(item));//生徒会情報を元から削除
        ctvlist.push('生徒会'); //生徒会をリストに追加
      };

      ctvlist = Array.from(new Set(ctvlist)); //重複削除
      count = ctvlist.length - ctvlist.filter(ctv => ctv.match(/非寮|？寮|★公共|null/) || !ctv ).length; //なしを無視して項目数を数える
      if     (ctObj.nameA !== 'name') count = count - ctvlist.filter(ctv => ctv.includes('未定')).length; //名前以外では「未定」を除外する
      else if(ctObj.nameA !== 'sex') count = count - ctvlist.filter(ctv => ctv.includes('?')).length; //性別以外では「?」を除外する

      //表示リストを作る
      if(!(command[2]&&command[2].match(/数/))){
        const olist = ['genre', 'belong', 'age', 'sex', 'author', 'major', 'grade', 'dorm', 'committee', 'club', 'advisor', 'hometown', 'rarity'];
        if(olist.includes(ctObj.nameA)){
          ctvlist = ctvlist.map(ctv => {
            const rs      = ReSymbolizeC(client, message, data.symbols, ctv, ctObj.nameA, ctObj.nameA+'emj');
            const nemj    = (ctv == rs) ? '■' : rs; 
            const ctv2    = (ctv) ? ctv : 'なし';
            const stcount = (ctv) ? students.filter(st =>  String(st[ctObj.nameA]).includes(ctv)).length
                                  : students.filter(st => !st[ctObj.nameA]).length ;
            return nemj+ctv2+' ('+stcount+'人)'
          })
          description = ctvlist.join('\n');
        }else{description = '該当項目の一覧は非表示設定になっています。';};
      }
      title = title+' ('+count+')'
    }
  }
  
  sendResult(message.channel, 'メンバー検索'+ds.ex, title, description, ds.color, '', data.updated, '');
  return;
};
function group(client, message, data, tools, students, command, ds){
  let unit;
  if(command[1].match(/部$/)) unit = '部';
  if(command[1].match(/委員会?/)) unit = '委員会';
  
  let groupname = command[1].replace(/部|委員会?/,'');
  let title = '📂'+groupname+unit;
  let count = 0;
  let description = '';
  
  //メンバー収集
  let fstudents;
  
  if(ds.name == 'tcTm'){    title = title + '顧問';
                             fstudents = students.filter(student => student.advisor.includes(command[1]));}
  else {const ctnameen = convertAlias(data.categories, unit, 'nameen', 'namejp').nameA; //nameAはnameen, nameBはnamejp[0]です
                             fstudents = students.filter(student => student[ctnameen].includes(groupname));} 
  count = count+fstudents.length;
  
  if(!(command[2]&&command[2].match(/数/))){
    //追加項目
    let subinfolist = [];
    if(command[2]){
      const ctobj = convertAlias(data.categories, command[2], 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
      if(ctobj.index!==-1){
        title = title+' +'+ctobj.nameB;
        subinfolist = infolist(client, message, data, fstudents, ctobj.nameA);
      };
    };

    //表示リストをつくる
    const fnamelist = [];
    for(let i=0;i<fstudents.length;i++){
      let sub = (subinfolist[i]) ? '　'+subinfolist[i] : '';
      fnamelist[i] = tools.emj(fstudents[i])+fstudents[i].name+sub;
    };
    if(fnamelist.length==0) fnamelist.push('なし');
    description = fnamelist.join('\n');
  }

  sendResult(message.channel, 'メンバー検索'+ds.ex, title+' ('+count+'人)', description, ds.color, '', data.updated, '');
  return;
};
function grade(client, message, data, tools, students, command, ds){
  const gr = command[1].split(/年/)[0];
  if(gr=='5'&&ds.name=='stTm'){ profile(client, message, data, tools, ['', '柳木惣右衛門'], tools.getCharacter(students, '柳木惣右衛門') ); return;}
  const title = '📂'+gr+'年生';
  const fstudents = students.filter(st => st.grade == gr);
  const count = fstudents.length;
  let description = '';
  const fnamelist = [];
  const major = data.symbols.major;
  const majoremj = data.symbols.majoremj;
  const loopi      = (ds.name=='stAe')?10           : 0;
  const looplength = (ds.name=='stAe')?major.length : 9;
  
  if(!(command[2]&&command[2].match(/数/))){ //「数」ではないことを確認
    for(let i=loopi; i < looplength; i++){ 
      let grlist = fstudents.filter(st => st.major == major[i]).map(st =>  tools.emj(st));
      if(grlist.length==0) grlist.push('なし');
      fnamelist.push(majoremj[i]+major[i]+'：'+grlist.join(''));
    };
    if(command[2]) fnamelist.push('🙇学年表示は項目追加に対応していません。')
    description = fnamelist.join('\n')
  };
    
  sendResult(message.channel, 'メンバー検索'+ds.ex, title+' ('+count+'人)', description, ds.color, '', data.updated, '');
  return;
};
function height(client, message, data, tools, students, command, ds){
  const cmarr = command[1].split(/cm|センチ/i);
  const cmcm = Number(cmarr[0])

  const fstudents = [];
  let title = '📂'+cmarr[0]+'cm';
  let count = 0;
  let description = '';
  let subinfolist = [];
  const fnamelist = [];
  
  if(cmarr[1]=='台'){ //台がついて、最後が0で終わる場合
    title = title + '台';
    if(cmarr[0].slice(-1)!=='0'){ fnamelist.push('「台」表示は設定数値が0で終わっている必要があります。')
    }else{
      for(let i=9; i >= 0; i--){ //9876543210
        let j = i+cmcm
        //iをcmかsubcmに持つ生徒をfstudentsのリストに追加していく
        let cmlist = students.filter(student =>  student.cm == j).map(student =>  tools.emj(student));
        count = count+cmlist.length;
        if(cmlist.length==0) cmlist.push('なし');
        let subcmlist = students.filter(student =>  {const ssc = student.subcm.split(/：/); if(ssc[1] == j) return true;});
            subcmlist = subcmlist.map(student =>  tools.emj(student));
        if(subcmlist.length > 0) subcmlist = ' ('+subcmlist.join('')+')'
        fnamelist.push(j+'cm：'+cmlist.join('')+subcmlist);
      };
      if(command[2]) fnamelist.push('🙇「台」表示は項目追加に対応していません。')
    };
  }else{ //台がついていない場合
    for(let i=0;i<students.length;i++){
      if(students[i].cm===cmcm||Number(students[i].subcm.split(/：/)[1])===cmcm){ fstudents.push(students[i]); };
    };
  
    //追加項目
    if(command[2]){
      const ctobj = convertAlias(data.categories, command[2], 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
      if(ctobj.index!==-1){
        title = title+' +'+ctobj.nameB;
        subinfolist = infolist(client, message, data, fstudents, ctobj.nameA);
      };
    };

    //表示リストを作る
    for(let i=0;i<fstudents.length;i++){
      let sub = (subinfolist[i]) ? '　'+subinfolist[i] : '';
      const stsubcm = fstudents[i].subcm.split('：');
      if(Number(stsubcm[1])===cmcm){
        sub = '('+stsubcm[0]+')'+sub;
      }
      fnamelist[i] = tools.emj(fstudents[i])+fstudents[i].name+sub;
    };
    //人数をカウント
    count = count+fnamelist.length;
    if(fnamelist.length==0) fnamelist.push('なし');
    
  };
  
  if(!(command[2]&&command[2].match(/数/))){description = fnamelist.join('\n')};
    
  sendResult(message.channel, 'メンバー検索'+ds.ex, title+' ('+count+'人)', description, ds.color, '', data.updated, '');
  return;
};
function birthday(client, message, data, tools, students, command, ds){
  const bdarr = command[1].split(/月|日|\/|\./);
  const month = Number(bdarr[0]);
  let day = bdarr[1];

  let fstudents = [];
  let title = '📂'+month+'月';
  let count = 0;
  let description = '';
  let subinfolist = [];
  const fnamelist = [];
  let md = 0;
  
  if(command[1].match(/月/)&&!(command[1].match(/日/))){ //月がついて日がつかない場合
    md++;
    fstudents = students.filter(st => st.birthday.indexOf(month+'/')===0).sort((a,b)=>{ const aday = a.birthday.split('/');
                                                                                        const bday = b.birthday.split('/');
                                                                                        return ((Number(aday[1]) < Number(bday[1])) ? -1 : 1 )  });
  }else if(day.match(/\d{1,2}/)){ //月のうしろが数字である場合
  　day = Number(day);
    title = title+day+'日'
    fstudents = students.filter(st => st.birthday === month + '/' + day)
  };
  
  //追加項目
  if(command[2]){
    const ctobj = convertAlias(data.categories, command[2], 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
    if(ctobj.index!==-1){
      title = title+' +'+ctobj.nameB;
      subinfolist = infolist(client, message, data, fstudents, ctobj.nameA);
    };
  };

  //表示リストを作る
  for(let i=0;i<fstudents.length;i++){
    let dayno = '';
    if(md){ const iday = fstudents[i].birthday.split('/');
            dayno = iday[1]+'日：'; };
    let sub = (subinfolist[i]) ? '　'+subinfolist[i] : '';
    fnamelist[i] = dayno+tools.emj(fstudents[i])+fstudents[i].name+sub;
  };
  //人数をカウント
  count = count+fnamelist.length;
  if(fnamelist.length==0) fnamelist.push('なし');
  
  if(!(command[2]&&command[2].match(/数/))){description = fnamelist.join('\n')};
    
  sendResult(message.channel, 'メンバー検索'+ds.ex, title+'生まれ ('+count+'人)', description, ds.color, '', data.updated, '');
  return;
};
function dorm(client, message, data, tools, students, command, ds){
  let groupname = command[1];
  
  const demj = ReSymbolizeC(client, message, data.symbols, groupname, 'dorm', 'dormemj');
  let title ='';
  let count = 0;
  let description = '';
  
  if(demj !== groupname){
    title = demj+groupname;

    const fstudents = students.filter(student => student.dorm == groupname);
    count = count+fstudents.length;
    
    if(!(command[2]&&command[2].match(/数/))){
      let fnamelist = [];

      let ctobj;
      if(command[2]){
        ctobj = convertAlias(data.categories, command[2], 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
        if(ctobj.index!==-1){title = title+' +'+ctobj.nameB;}
      };

      //学年ごと
      for(let i=0;i<4;i++){
        //メンバー収集
        const fstudentsG = fstudents.filter(student => student.grade==i+1).sort((a,b)=>(a.roomid < b.roomid)?-1:1);

        //追加項目
        let subinfolist = [];
        if(command[2]){subinfolist = infolist(client, message, data, fstudentsG, ctobj.nameA);};

        //表示リストをつくる
        fnamelist[i] = [];
        if(fstudentsG.length!==0){
          for(let j=0;j<fstudentsG.length;j++){
            let sub = (subinfolist[j]) ? '　'+subinfolist[j] : '';
            fnamelist[i][j] = tools.emj(fstudentsG[j])+fstudentsG[j].name+sub;
          };
        };
      };

      const gemj = data.symbols.gradeemj;
      description = gemj[3]+gemj[3]+gemj[3]+'　3年生　'+gemj[3]+gemj[3]+gemj[3]+'\n'+fnamelist[2].join('\n') + '\n\n' +
                    gemj[2]+gemj[2]+gemj[2]+'　2年生　'+gemj[2]+gemj[2]+gemj[2]+'\n'+fnamelist[1].join('\n');
      if(fnamelist[0].length>0){description = description + '\n\n' +
                    gemj[1]+gemj[1]+gemj[1]+'　1年生　'+gemj[1]+gemj[1]+gemj[1]+'\n'+fnamelist[0].join('\n')};
    };
  }else{
    description = `${groupname}はデータにありませんでした。表記を変更してお試しください。`;
  };
  
  sendResult(message.channel, 'メンバー検索'+ds.ex, title+' ('+count+'人)', description, ds.color, '', data.updated, '');
  return;
};
function room(client, message, data, tools, students, command, ds){
  let roomstname = command[1].split(/部屋|へや|べや/);
  roomstname = roomstname[0];
  
  let title = '';
  let description = '';
  
  const st = tools.getCharacter(students, roomstname);
  if(st == 'multiple') description = roomstname+'は複数のキャラに使用されています。表記を変更してお試しください。';
  else if(!st || !st.roomid) description = `${command[1]}はデータにありませんでした。表記を変更してお試しください。`;
  else{
    const demj = ReSymbolizeC(client, message, data.symbols, st.dorm, 'dorm', 'dormemj');
    title = demj+'寮部屋';
    const roomid = st.roomid;
  
    //メンバー収集
    const fstudents = students.filter(student => student.roomid.includes(roomid));
  
    if(!(command[2]&&command[2].match(/数/))){
      //追加項目
      let subinfolist = [];
      if(command[2]){
        const ctobj = convertAlias(data.categories, command[2], 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
        if(ctobj.index!==-1){
          title = title+' +'+ctobj.nameB;
          subinfolist = infolist(client, message, data, fstudents, ctobj.nameA);
        };
      };

      //表示リストをつくる
      const fnamelist = [];
      for(let i=0;i<fstudents.length;i++){
        let sub = (subinfolist[i]) ? '　'+subinfolist[i] : '';
        fnamelist[i] = tools.emj(fstudents[i])+fstudents[i].name+sub;
      };
      if(fnamelist.length==0) fnamelist.push('なし');
      description = fnamelist.join('\n');
    }
  };

  sendResult(message.channel, 'メンバー検索'+ds.ex, title, description, ds.color, '', data.updated, '');
  return;
};
function major(client, message, data, tools, characters, command, ds){
  let students = (ds.name == 'all') ? characters : characters.filter( c => c.genre == ds.name );
  let majorunit = '科'; let majorunitk = '科';
  
  if(command[1].match(/宮$/)){
    if(ds.name=='stTm'){ students = characters.filter( c => c.genre == 'stAe');
                         ds=data.DataSet.stAe; };
    majorunit = '宮'; majorunitk = 'きゅう';
  };
  
  const commandZ = command.slice(-1)[0]; //コマンドの末尾です
  let majorname = command[1].split(majorunit)[0];
  majorname = ReSymbolize(data.symbols, majorname, 'majork', 'major');
  
  const memj = ReSymbolizeC(client, message, data.symbols, majorname, 'major', 'majoremj');
  let title ='';
  let count = 0;
  let description = '';
  let g = 0; //学年情報があるかを確認します
  
  if(memj !== majorname){
    const mkana = ReSymbolize(data.symbols, majorname, 'major', 'majork');
    title = memj+majorname+majorunit+'('+mkana+majorunitk+')';

    let fstudents = [];
    if(command[2]&&command[2].match(/^(\d+|\?)/)){ g++; //学年情報がある
      const gradename = command[2].split('年')[0];
      if(majorname=='間法'&&gradename=='5'&&ds.name=='stTm'){ profile(client, message, data, tools, ['', '柳木惣右衛門'], tools.getCharacter(students, '柳木惣右衛門') ); return;}
      title = title + ' ' + gradename + '年';
      fstudents = students.filter(student => student.major == majorname && student.grade == gradename);
    }else fstudents = students.filter(student => student.major == majorname); //学年情報がない
    count = fstudents.length;
    
    if(!(commandZ.match(/数/))){ //最後が「数」でない
      let fnamelist = []; //リスト化する用の一覧
      let ctobj;
      let subinfolist = [];
      
      if(command.length>2+g){ //■追加項目があります
          ctobj = convertAlias(data.categories, commandZ, 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
          if(ctobj.index!==-1){title = title+' +'+ctobj.nameB;}
      };
      
      if(g||!ds.name.includes('st')){ //g = 1 学年情報がある
        //追加項目
        if(command[3]){subinfolist = infolist(client, message, data, fstudents, ctobj.nameA);};
        //表示リストをつくる
        for(let i=0;i<fstudents.length;i++){
          let sub = (subinfolist[i]) ? '　'+subinfolist[i] : '';
          fnamelist[i] = tools.emj(fstudents[i])+fstudents[i].name+sub;
        };
        if(fnamelist.length==0) fnamelist.push('なし');
        description = fnamelist.join('\n');
      }else{ //g = 0 学年情報がない
        //学年ごと
        for(let i=0;i<=3;i++){
          //メンバー収集
          const fstudentsG = (0<i) ? fstudents.filter(student => student.grade==i)
                                   : fstudents.filter(student => student.grade=='?');
          //追加項目
          if(command[2]){subinfolist = infolist(client, message, data, fstudentsG, ctobj.nameA);};
          //表示リストをつくる
          fnamelist[i] = [];
          if(fstudentsG.length!==0){
            for(let j=0;j<fstudentsG.length;j++){
              let sub = (subinfolist[j]) ? '　'+subinfolist[j] : '';
              fnamelist[i][j] = tools.emj(fstudentsG[j])+fstudentsG[j].name+sub;
            };
          };
        };

        const gemj = data.symbols.gradeemj;
        for(let i=0;i<fnamelist.length;i++){
          const gn = 3-i; // i 0123 gn 3210
          const gnd = (gn===0) ? '?' : gn ;
          if(fnamelist[gn].length>0){description = description + '\n\n' +
            gemj[gn]+gemj[gn]+gemj[gn]+'　'+gnd+'年生　'+gemj[gn]+gemj[gn]+gemj[gn]+'\n'+fnamelist[gn].join('\n')};
        };
      };
    };
  }else{
    description = `${majorname+majorunit}はデータにありませんでした。表記を変更してお試しください。`;
  };
  
  sendResult(message.channel, 'メンバー検索'+ds.ex, title+' ('+count+'人)', description, ds.color, '', data.updated, '');
  return;
};
function council(client, message, data, tools, students, command, ds){
  let title = '📂生徒会役員';
  let count = 0;
  let description = '';
  
  const fstudents = students.filter(student => student.committee.includes('生徒会'));
  count = count+fstudents.length;
  
  if(!(command[2]&&command[2].match(/数/))){
    //追加項目
    let subinfolist = [];
    if(command[2]){
      const ctobj = convertAlias(data.categories, command[2], 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
      if(ctobj.index!==-1){
        title = title+' +'+ctobj.nameB;
        subinfolist = infolist(client, message, data, fstudents, ctobj.nameA);
      };
    };
    //表示リストを作る
    const fnamelist = [];
    for(let i=0;i<fstudents.length;i++){
      let post = "";
      if(fstudents[i].committee.match(/生徒会長/)){post = '会長'}
      else{post = fstudents[i].committee.replace('生徒会', '');}
      let sub = (subinfolist[i]) ? '　'+subinfolist[i] : '';
      fnamelist[i] = tools.emj(fstudents[i])+fstudents[i].name+'：'+post+sub;
    };
    description = fnamelist.join('\n');
  };

  sendResult(message.channel, 'メンバー検索'+ds.ex, title+' ('+count+'人)', description, ds.color, '', data.updated, '');
  return;
};
function top(client, message, data, tools, students, command, ds){
  
  let title = '📂首席';
  let count = 0;
  let description = '';
  
  const fstudents = students.filter(student => student.notes.match(/首席/) && student.name !== '大理・オクタヴィウス');
  count = count+fstudents.length;
  
  if(!(command[2]&&command[2].match(/数/))){
    let subinfolist = [];
    if(command[2]){
      const ctobj = convertAlias(data.categories, command[2], 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
      if(ctobj.index!==-1){
        title = title+' +'+ctobj.nameB;
        subinfolist = infolist(client, message, data, fstudents, ctobj.nameA);
      };
    };

    const fnamelist = [];
    for(let i=0;i<fstudents.length;i++){
      const memj = ReSymbolizeC(client, message, data.symbols, fstudents[i].major, 'major', 'majoremj');
      let sub = (subinfolist[i]) ? '　'+subinfolist[i] : '';
      fnamelist[i] = memj+fstudents[i].major+'：'+tools.emj(fstudents[i])+fstudents[i].name+sub;
    };
    if(fnamelist.length==0) fnamelist.push('なし');
    description = fnamelist.join('\n');
  }else{count = count + '+1'};

  sendResult(message.channel, 'メンバー検索'+ds.ex, title+' ('+count+'人)', description, ds.color, '', data.updated, '');
  return;
};
function dormleader(client, message, data, tools, students, command, ds){
  
  let title = '📂寮長';
  let count = 0;
  let description = '';
  
  const fstudents = [undefined, undefined, undefined, undefined];
  for(let i=0;i<students.length;i++){
    if(students[i].notes.match(/寮長/)&&students[i].dorm=='赤寮'){fstudents[0] = students[i]; count++;};
    if(students[i].notes.match(/寮長/)&&students[i].dorm=='黄寮'){fstudents[1] = students[i]; count++;};
    if(students[i].notes.match(/寮長/)&&students[i].dorm=='緑寮'){fstudents[2] = students[i]; count++;};
    if(students[i].notes.match(/寮長/)&&students[i].dorm=='青寮'){fstudents[3] = students[i]; count++;};
  };
  
  if(!(command[2]&&command[2].match(/数/))){
    //追加情報
    let subinfolist = [];
    if(command[2]){
      const ctobj = convertAlias(data.categories, command[2], 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
      if(ctobj.index!==-1){
        title = title+' +'+ctobj.nameB;
        subinfolist = infolist(client, message, data, fstudents, ctobj.nameA);
      };
    };
    //表示リスト
    const fnamelist = [];
    for(let i=0;i<4;i++){
      let dl = '';
      if(fstudents[i]){dl = tools.emj(fstudents[i])+fstudents[i].name}else{dl = 'なし'};
      if(command[2]){dl = dl + '　' + subinfolist[i]};
      fnamelist[i] = data.symbols.dormemj[i]+data.symbols.dorm[i]+'：'+dl;
    };
    description = fnamelist.join('\n')
  };

  sendResult(message.channel, 'メンバー検索'+ds.ex, title+' ('+count+'人)', description, ds.color, '', data.updated, '');
  return;
};
async function author(client, message, data, tools, students, command, ds){
  
  let title = '📂'+command[1];
  let count = 0;
  let description = '';
  const fstudents = students.filter(student => student.author == command[1]);
  count = count+fstudents.length;
    if(command[2]&&command[2].match(/^絵文字(一覧|リスト)$/)){
    message.channel.send(command[1]+'キャラ\n'+fstudents.map(fst=>tools.emj(fst)).join(''));
  }
  else{
    if(!(command[2]&&command[2].match(/数/))){
      //追加情報
      let subinfolist = [];
      /*
      if(command[2]&&command[2].match(/^プ(ロフ(ィール)?)?$|証$|紹(介)?|^しょ|^more$/i) ){
        const pfms = await client.channels.cache.get(ds['Profile']).messages.fetch({ limit:100 });
        title = title+' +紹介文';
        subinfolist = fstudents.map(st => {
          //プロフィールURLを検索
          let pfl = profileUrl(st, pfms);
          return ( (pfl) ? '\n■'+pfl : '■なし');
        });
      }else*/ if(command[2]){
        const ctobj = convertAlias(data.categories, command[2], 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
        if(ctobj.index!==-1){
          title = title+' +'+ctobj.nameB;
          subinfolist = infolist(client, message, data, fstudents, ctobj.nameA);
        };
      };
      //表示リスト
      const fnamelist = [];
      for(let i=0;i<fstudents.length;i++){
        let sub = (subinfolist[i]) ? '　'+subinfolist[i] : '';
        fnamelist[i] = tools.emj(fstudents[i])+((command[2]&&command[command.length-1].match(/^(noname|名無し|名なし|ななし|名前無し|名前なし|なまえなし)$/i))?'':fstudents[i].name)+sub;
      };
      if(fnamelist.length==0) fnamelist.push('なし');
      description = fnamelist.join('\n');
    };

    sendResult(message.channel, 'メンバー検索'+ds.ex, title+' ('+count+'人)', description, ds.color, '', data.updated, '');
  };
  return;
};
function infolist(client, message, data, stlist, ct){
  const list = [];
  for(let i=0; i < stlist.length; i++){
    if(stlist[i] == undefined){list[i] = '';}
    else{
      let item = '　×';
      const xlist = ['name']
      if(!xlist.includes(ct)){
        if(stlist[i][ct]&&stlist[i][ct]!=='null'){
          let itemHead; //アイテムのアイコン部分
            if(ct == 'major'|| ct == 'grade' || ct == 'dorm') itemHead = ReSymbolizeC(client, message, data.symbols, stlist[i][ct], ct, ct+'emj');
            else                                              itemHead = '■';
          let itemTail; //アイテムの内容部分
            if(ct == 'major'||ct == 'author')      itemTail = ReSymbolize(data.symbols, stlist[i][ct], ct, ct+'init');
            else if(ct == 'cm' && stlist[i].subcm) itemTail = stlist[i][ct] + '(' + stlist[i].subcm + ')';
            else                                   itemTail = stlist[i][ct]; 
          item = itemHead + itemTail ;
        }
        else item = '■なし';
      };
      list[i] = item;
    };
  };
  return list;
};

//■■　■■　■■　■■　■■　＜ランダムマギカ！＞　■■　■■　■■　■■　■■
function gacha(message, data, tools, students, command, ds, odaikey){
  
  const commandh = command.map(c => hiraganize(c));
  
  let atitle = 'ランダムマギカ！'+ds.ex;
  let title = '';
  
  let outputnumber = 1; //表示人数
  let stlist = []; //検索対象リスト
  
  for(let i=2;i<command.length;i++){
    if(command[i].match(/^\d+$/)){
      //数値の節があれば人数とみる
      if(command[i]>=0 && command[i]<=10){outputnumber = command[i];}
      else{sendResult(message.channel, atitle, '', '人数には10までの数値を指定してください。', ds.color, '', data.updated, '');return;};
    }else if( command[i] && !(commandh[i].match(odaikey)) ){
      //数値でない節で「お題」以外であれば条件とみる
      let groupname = command[i].split(/性|年|年生|部|委員|cm|センチ|月|科|宮/i);
          groupname = groupname[0];
      let unit = '';
      //条件に応じてフィルタリングして検索対象リストを作る
      if(command[i].match(/部/)){ unit='部'; stlist = stlist.concat(students.filter(student => student['club'].includes(groupname)));} //「含む」
      else if(command[i].match(/委員/)){ unit='委員会'; stlist = stlist.concat(students.filter(student => student['committee'].includes(groupname)));} //「含む」
      else if(command[i].match(/cm|センチ/i)){
        const cmcm = Number(groupname);
        if(command[i].includes('台')){ unit='cm台'; //「cm台」
          if(groupname.slice(-1)!=='0'){sendResult(message.channel, atitle, '📂'+command[i], '「台」表示は設定数値が0で終わっている必要があります。', ds.color, '', data.updated, '');return;};
          stlist = stlist.concat(students.filter(student => student.cm >= cmcm && student.cm < cmcm+10));
        }
        else if(command[i].includes('以上')){ unit='cm以上'; stlist = stlist.concat(students.filter(student => student.cm >= cmcm && student.cm !== null));}
        else if(command[i].includes('以下')){ unit='cm以下'; stlist = stlist.concat(students.filter(student => student.cm <= cmcm && student.cm !== null));}
        else if(command[i].includes('未満')){ unit='cm未満'; stlist = stlist.concat(students.filter(student => student.cm < cmcm && student.cm !== null));}
        else{ unit='cm'; stlist = stlist.concat(students.filter(student => student.cm===cmcm));};
      }
      else if(command[i].match(/^(0?[1-9]|1[0-2])月(生まれ)?/)){
        groupname = Number(groupname);
        unit='月'; stlist = stlist.concat(students.filter(student => {const bdarr = student.birthday.split('/'); return (bdarr[0]==groupname);}));}
      else if(command[i].match(/年|年生/)){unit='年生'; stlist = stlist.concat(students.filter(student => student['grade']==groupname));} //「一致する」
      else if(command[i].match(/男|女|\?性/)){unit='性'; stlist = stlist.concat(students.filter(student => student['sex']==groupname));} //「一致する」
      else if(command[i].match(/寮$/)) stlist = stlist.concat(students.filter(student => student['dorm']==groupname)); //「一致する」
      else if(command[i].match(/科|宮/)){unit = (command[i].match(/宮/))?'宮':'科'; groupname = ReSymbolize(data.symbols, groupname, 'majork', 'major'); stlist = stlist.concat(students.filter(student => student['major']==groupname));} //「一致する」
      else if(command[i].match(/生徒会/)) stlist = stlist.concat(students.filter(student => student['committee'].includes('生徒会'))); //「含む」
      else if(command[i].match(/首席/)) stlist = stlist.concat(students.filter(student => student['notes'].includes('首席'))); //「含む」
      else if(command[i].match(/寮長/)) stlist = stlist.concat(students.filter(student => student['notes'].includes('寮長'))); //「含む」
      else{//作者
        const aHgn = hiraganize(command[i]);
        const aArr = aHgn.split(data.authorunit);
        const aObj = convertAlias(data.authors, aArr[0], 'name', 'alias'); //nameAはinit, nameBはalias[0]です
        if(aObj.index > -1){stlist = stlist.concat(students.filter(student => student['author']==aObj.nameA)); groupname = aObj.nameA}
        else{sendResult(message.channel, atitle, '📂'+command[i], `${command[i]}はデータにありませんでした。表記を変更してお試しください。`, ds.color, '', data.updated, '');return;}
      }
      title = title+'📂'+groupname+unit+' ';
    };
  };
  if(stlist.length==0){ title = '' ; stlist = students; };
  atitle = atitle+' ('+outputnumber+'/'+stlist.length+')';

  //生徒番号を生成
  const stno = [...Array(stlist.length).keys()];
  //ランダムに並び替え
  for(let i = stno.length-1; i>=0; i--){const j = Math.floor(Math.random()*(i+1));[stno[i], stno[j]] = [stno[j], stno[i]];}
  //指定人数分切り出し
  const outputindex = (outputnumber > stlist.length) ? stno : stno.slice(0, outputnumber);
  //番号に該当する生徒を取得
  const outputlist = [];
  for(let i=0;i<outputindex.length;i++){outputlist[i] = tools.emj(stlist[outputindex[i]])+stlist[outputindex[i]].name;};
  if(outputnumber > stlist.length) outputlist.push('⚠️対象人数( '+stlist.length+' )が指定の数( '+outputnumber+' )に対して不足しています。');
  
  //お題が含まれている場合
  if(commandh.join(' ').match(odaikey)){
    atitle = atitle + ' + お題';
    //outputlist.push('【🎦'+data.odai[Math.floor(Math.random()*data.odai.length)]+'】');
    const od = odai(message, data, ['', '', 1], ds, false)[0];
    outputlist.push('【'+od+'】')
  };
  
  //出力
  sendResult(message.channel, atitle, title, outputlist.join('\n'), ds.color, '', data.updated, '');
  return;
};
function odai(message, data, command, ds, saying){
  let atitle = 'ランダムマギカ！'+ds.ex+' for お題';
  let outputnumber = 1;
  console.log('■data.odai■\n'+data.odai);
  let odlist = data.odai;
  console.log('■odlist■\n'+odlist);
  if(message.content.match(/全|一覧|リスト/)){sendResult(message.channel, atitle+' ('+odlist.length+')', '🎦お題一覧', odlist.join('　'), ds.color, '', data.updated, '');return;};
  
  //もし数の指定があれば
  if(command[2]){
    if(command[2]>=1 && command[2]<=10){outputnumber = command[2];}
    else{sendResult(message.channel, atitle, '', '個数には1から10までの数値を指定してください。', ds.color, '', data.updated, '');return;};
  };
  atitle = atitle+' ('+outputnumber+'/'+odlist.length+')';
  
  //ランダムに並び替えて指定人数分切り出し
  for(let i = odlist.length-1; i>=0; i--){const j = Math.floor(Math.random()*(i+1));[odlist[i], odlist[j]] = [odlist[j], odlist[i]];}
  odlist = odlist.slice(0, outputnumber);
  
  odlist = odlist.map(od => '🎦'+od)
  
  if(saying){ sendResult(message.channel, atitle, '', odlist.join('\n'), ds.color, '', data.updated, ''); return; }
  else{return odlist};
}
async function hgacha(client, message, data, tools, characters){

  //■■発言取得
  const msgs1 = await client.channels.cache.get(data.DataSet.stTm['Himitsu']).messages.fetch({ limit:100 }); //東魔生徒
  const msgs2 = await client.channels.cache.get(data.DataSet.tcTm['Himitsu']).messages.fetch({ limit:100 }); //東魔教師
  const msgs = msgs1.concat(msgs2); //各ログをつなげます
  const hmtList = msgs.map(message => message.content).join('\n').split('\n').map(h => h.split('＠＠')) //ひみつデータ集ができました
  const hmtListOLD = hmtList.filter(h => h[3] !== '0'); //既出だけのひみつデータ集
  const hmt = tools.shufflenum(hmtListOLD, 1)[0]; //★出力されるひみつ
  //console.log('all！！！！！！！！！！\n'+hmtList.map((h,index)=>index+'___'+h[0]+h[1].slice(0,10)).join('\n'));
  //console.log('old！！！！！！！！！！\n'+hmtListOLD.map((h,index)=>index+'___'+h[0]+h[1].slice(0,10)).join('\n'));
  //console.log('new！！！！！！！！！！\n'+hmtList.filter(h => h[3] == '0').map((h,index)=>index+'___'+h[0]+h[1].slice(0,10)).join('\n'));
  //■■キャラ取得・データセット分岐
  const chr = characters.find(({name}) => name == hmt[0]); //名前に一致する人を探す
  if(!chr){message.channel.send(hmt[0]+' が見つかりません。'); return;};
  const ds = data.DataSet[chr.genre];
  
  //■■サムネイルURL取得
  const today = new Date(); today.setHours(today.getHours() + 9);
  const tchid = ((today.getMonth()+1)+'/'+today.getDate() == '4/1') ? data.DataSet.april['Thumbnail'] : ds['Thumbnail'];
  const tmsgs = await client.channels.cache.get(tchid).messages.fetch({ limit:100 });
  const tmsg = tmsgs.map(message => message.content).join('\n').split('\n').find(line => line.includes(chr.name) );
  const thumbnailurl = (tmsg) ? tmsg.split('：')[1] : data.noimage;
  
  //■■発言
  const atitle = 'ランダムマギカ！'+ds.ex+' for ㊙️'+' (全'+hmtListOLD.length+'種)';
  const hmtI = hmt[1].split('＄＄');
  const imageurl = (hmtI.length==2) ? hmtI[1] : undefined;
  sendResult(message.channel, atitle, tools.emj(chr)+chr.name+'のひみつ㊙️ ',
             hmtI[0], ds.color, ''/*client.users.get(hmt[2]).displayAvatarURL()*/, '🧙 マギカサーチ magisa', thumbnailurl, '', imageurl);
  return;
};
async function qgacha(client, message, data, tools, characters, command){
  
  //！ま　クイズ
  //！ま　クイズ　キャラ
  //！ま　クイズ　キャラ　こたえ
  if(command.length>4){message.channel.send('コマンドの形式が間違っています。再度ご確認ください。'); return;};
  
  //■■指定キャラがあれば取得
  let chr = false;
  let mode = '出題';
  if(command.length>=3){
    chr = tools.getCharacter(characters, command[2]);
    if(chr=="multiple"){message.channel.send(command[2]+'は複数のキャラに使用されています。表記を変更してお試しください。'); return;};
    if(!chr){message.channel.send(command[2]+'はデータにありませんでした。表記を変更してお試しください。'); return;};
  };
  if(command.length==4){
    if(command[3]=='解説'){
      mode='解説';
    }
    else{
      mode='回答';
      if(!command[3].match(/^[ぁ-んー～〜0-9a-zA-Z]+$/)){message.channel.send('回答が形式に沿っていません。\nひらがなor半角英数字になっているか再度ご確認ください。'); return;};
    }
    
  };
  
  //■■全クイズ取得
  const msgs = await client.channels.cache.get(data.quizlog).messages.fetch({ limit:100 });
  const quizlist = msgs.map(m=>m.content).join('\n').split('\n').map(m=>m.split('＠＠'));
  
  //■■クイズ取得
  const quizline = (chr) ? quizlist.find(ql=>ql[0]==chr.name)
                         : quizlist[Math.floor(Math.random()*quizlist.length)];
  if(!quizline){message.channel.send(chr.name+'のクイズはありませんでした。'); return;};
  
  quizline[1] = quizline[1].replace(/⏎/g, '\n').split(/^問題【|】解答【|】解説【|】難易度【|】$/);
  const quiz = {q:quizline[1][1], a:quizline[1][2], x:quizline[1][3].split('←→'), d:Number(quizline[1][4]), i:quizline[2]};
  
  //■■キャラ取得・データセット分岐
  if(!chr){
    chr = characters.find(({name}) => name == quizline[0]); //名前に一致する人を探す
    if(chr=="multiple"){message.channel.send(command[2]+'は複数のキャラに使用されています。表記を変更してお試しください。'); return;};
    if(!chr){message.channel.send(command[2]+'はデータにありませんでした。表記を変更してお試しください。'); return;};
  };
  const ds = data.DataSet[chr.genre];
  
  //■■発言
  let description = '';
  if(mode=='出題'){
    description = quiz.q;
  }
  else if(mode=='回答'){
    const correct = (quiz.a==command[3]);
    description = (correct?'⭕':'❌') + ' 正解は…… __' + quiz.a + '__\n\n'
                + (!correct&&quiz.x.length>1 ? quiz.x[1] : quiz.x[0]);
  }
  else{
    description = '正解は…… __' + quiz.a + '__\n\n'
                + (quiz.x.length>1 ? '⭕：'+quiz.x[0] + '\n\n❌：'+quiz.x[1] : quiz.x[0]);
  };
  
  message.channel.send({embeds: [{
    author: {name:'ランダムマギカ！ for Q (全'+quizlist.length+'問)'},
    title:tools.emj(chr)+chr.name+'のクイズ'+(mode!=='出題'?'('+mode+')':'')+' ⭐'.repeat(quiz.d),
    description:description,
    color: ds.color,
    footer:{text:(mode=='出題' ? '「！ま　クイズ　名前　(ひらがなor半角英数字)」で回答！ ' : '')+'🧙 マギカサーチ magisa'},
    image: {url: (mode=='出題' ? quiz.i:'')},
  }]});

  return;
};

//■■　■■　■■　■■　■■　＜汎用データ検索＞　■■　■■　■■　■■　■■
function dataSearch(client, message, data, tools, students, command, ds){
  const commandZ = command.slice(-1)[0]; //コマンドの末尾です
  let title = '📄'+command[1];
  let count = 0;
  let description = '';
  const limit = 40;

  if(command.length>2&&command.length<6){

    if(command[1]=='dorm'){command[2] = command[2].replace(/\?/g, '？');}; //寮検索用に?を全角にするよ～
    
    //メンバー収集
    let fstudents;
    if(command[2]=='あり')         {fstudents = students.filter( st => st[command[1]] )
                                    title     = title + 'が入力されている' }
    else if(command[2]=='なし')    {fstudents = students.filter( st => !st[command[1]] || st[command[1]]=='null' )
                                    title     = title + 'が空欄' }
    else if(command[2].match(/^-/)){fstudents = students.filter( st => st[command[1]]&&!st[command[1]].toString().includes(command[2].slice(1)) )
                                    title     = title + ' に「' + command[2].slice(1) + '」が含まれない' }
    else                           {fstudents = students.filter( st => st[command[1]]&&st[command[1]].toString().includes(command[2]) )
                                    title     = title + ' に「' + command[2] + '」が含まれる' };
    
    count = count + fstudents.length;
    title = title + ' ('+count+'人)';
    
    if(!commandZ.match(/数/)){
      if(count > limit){
        description = 'ヒット数が'+limit+'件を超えているため、表示されません。'
      }else{
        //追加項目
        let subinfolist = [];
        if(command[3]){
          const ctobj = convertAlias(data.categories, command[3], 'nameen', 'namejp'); //nameAはnameen, nameBはnamejp[0]です
          if(ctobj.index!==-1){
            title = title+' +'+ctobj.nameB;
            subinfolist = infolist(client, message, data, fstudents, ctobj.nameA);
          };
        };

        //表示リストをつくる
        const fnamelist = [];
        for(let i=0;i<fstudents.length;i++){
          let sub = (subinfolist[i]) ? '　'+subinfolist[i] : '';
          fnamelist[i] = tools.emj(fstudents[i])+fstudents[i].name+sub;
        };
        if(fnamelist.length==0) fnamelist.push('なし');
        description = fnamelist.join('\n');
      }
    };
  }else{
    description = '検索内容を入力してください。'
  };

  sendResult(message.channel, '汎用データ検索'+ds.ex, title, description, ds.color, '', data.updated, '');
  return;
};

//■■　■■　■■　■■　■■　ヘルプ　■■　■■　■■　■■　■■
function help(client, message, data, command, ds){
  //const tch = client.channels.cache.get(data.DataSet.stTm['HimitsuTarget']).name;
  message.channel.send({embeds: [{
    author: {
      name: '🧙 マギカサーチ magisa　ヘルプ',
      icon_url: client.user.displayAvatarURL()
    },
    description:
`「マギカサーチ magisa」は、シェアワールド創作「東京魔力科(トーキョーマギカ)」のための機能群です。
ほとんどのコマンドは「！ま」、「!魔」などに続けて記述することで機能します。(※当ヘルプでは単語どうしを空白・読点・改行で区切って並べることを「続ける」と表記します)
2番目に「エーテル」「先生」「そのほか」「全体」等を入力することで「__ジャンル指定__」が可能です(デフォルトは東魔生徒です)。
「！！ま」のように「！」を2つにすることでジャンル指定が「全体」になります。
${process.env.RENDER_EXTERNAL_URL ? '機能停止時はここにアクセスして少し待つと解決する場合があります。→ ' + process.env.RENDER_EXTERNAL_URL : ''}`,
    color: ds.color,
    footer:{text: data.updated},
    fields: [{ inline: true,
      name: "🟧__プロフィール検索__🟧",
      value:
`キャラ名入力でプロフィールを表示します。(あだ名・絵文字可、ジャンル指定不要)
続けて以下のコマンドに対応しています。
〈項目名〉 / 資料 / ミニ / データ / ひみつ
📥__画像の登録__
MagicaBotへDMで「■■の画像」とコメント付きで画像を投稿すると、サムネイルに登録されます。重複時は古いものを破棄。
「確認」「削除」と続けることで各操作可能。
■■：キャラ名(あだ名も可)`
      },{ inline: true,
      name: "🟧__メンバー検索__🟧",
      value:
`指定内容に該当するキャラを一覧表示します。(ジャンル指定可)
「部」「委員会」「年」「cm(台)」「月or月日(生まれ)」「寮」「部屋」「科or宮(1つ空けて学年)」「生徒会」「首席」「寮長」「ルームメイト未定」及び作者名や一部集団の略称等に対応します。
続けて以下のコマンドに対応しています。
〈項目名〉 / 数
▼作者表示限定
絵文字一覧
🔸__集団一覧__
「全」や「一覧」を項目名に添えると、該当項目の内容一覧と数を表示します。`
      },{ inline: true,
      name: "🟧__ランダムマギカ！__🟧",
      value:
`「ガチャ」「ランダム」「が」などでキャラをランダム表示します。(ジャンル指定可)
続けて以下のコマンドに対応しています。
〈集団名/作者名〉(複数可) / 〈数字〉(個数、12まで) / お題
 🔸__お題ガチャ__
「シチュ」「お題」のみでお題をランダム表示します。数の指定も可能。
 🔸__ひみつ__
「ひみつ」「ひが」などで既出のひみつ時報をランダム表示します。ジャンル指定不可。
 🔸__クイズ__
「クイズ」でクイズをランダム出題します。キャラ名指定可。続けて単語入力で回答、代わりに「解説」で解説表示を行います。`
      },{ inline: true,
      name: "🟧__時報(東魔限定)__🟧",
      value: 
`毎日0時に誕生日のお知らせ、12時にランダムな「ひみつ」を投稿します。
📥__ひみつの登録__
「■■のひみつ　◆◆◆」の形式でMagicaBotへDMを投稿するとひみつとして登録されます。
■■：キャラ名(あだ名も可)
◆◆◆：本文(100文字まで)
また、発言に添付するかたちで画像を1枚だけ登録することができます。
本文部分に「確認」及び「一覧」と入力すると投稿済みの内容を確認できます。
「投稿済みのひみつ　一覧」などで全投稿を確認できます。
削除方法については各確認表示を参照してください。`
      },{ inline: true,
      name: "🟧__その他__🟧",
      value: 
`🔸__汎用データ検索__
項目名に続けてワードを入力すると、該当項目に指定ワードを含むキャラを40人まで一覧表示します。(ジャンル指定可)
ワードには「あり」「なし」も指定できるほか、先頭に「-」を添えることで指定ワードを含まないキャラを表示できます。
続けて以下のコマンドに対応しています。
〈項目名〉 / 数
🔸__用語検索__
入力された単語に一致するものが登録されていれば、用語解説を表示します。
🔸__タマエサーチ__
わかんない。「玉ちゃん」と含まれる発言に反応して玉ちゃんが集まってきます。5人まで人数指定も可能で、「怒」に反応して怒ります。
※「玉ちゃん」だけだとプロフィール検索がされます。`
    }]
  }]});
  return;
};

//■■　■■　■■　■■　■■　MagicalDrawお題出力　■■　■■　■■　■■　■■
async function echaodai(message, data){
  const fs = require('fs');
  const content = data.characters.filter(c => c.genre == 'stTm').map(c => c.nickname.split(' - ')[0]).filter(c => c).join('\n');
  fs.writeFileSync("./magicaodai.txt", content);
  await message.channel.send({embeds: [{title:'MagicalDraw', url: 'https://kuku.lu/p117f6507',  description:'↑こちらからどうぞ！```パスワード : aam144```', color:0xFBE039,
                                       thumbnail: {url: "https://draw.kuku.lu/apple-touch-icon.png"} }] } );
  message.channel.send({ files: ['./magicaodai.txt'] } );
  return;
};

//■■　■■　■■　■■　■■　管理者用　■■　■■　■■　■■　■■
function admin(client, message, data, command){
  if(message.author.id !== data.adminID){message.channel.send('発言者にMagicaBotの管理者権限がありません。'); return;};
  if(command[2] == 'ひみつ時報'){exports.himitsu(client, '【手動版】'); return;};
  if(command[2] == 'ひみつ時報日曜版'){exports.himitsu(client, '【日曜版】'); return;};
  return;
};


//■■■■■■■■■■■■■■■■■■■■　★便利ツールたち　■■■■■■■■■■■■■■■■■■■■

//■■　■■　■■　■■　■■　embed送信機能　■■　■■　■■　■■　■■
function sendResult(channel, authorname, title, description, color, footericonurl, footertext, thumbnailurl, content, imageurl){
  const o = {embeds: [{
    author: {name: authorname},
    title:title,
    description:description,
    color: color,
    footer:{icon_url:(footericonurl?footericonurl:undefined),
            text:footertext},
    thumbnail: {url: (thumbnailurl?thumbnailurl:undefined)},
    image: {url: (imageurl?imageurl:undefined)}
  }]};
  if(Array.isArray(channel)) channel.forEach(ch => ch.send({content: content || undefined, ...o}) );
  else channel.send({content: content || undefined, ...o});
};

//■■　■■　■■　■■　■■　文字列変換機能　■■　■■　■■　■■　■■
function ANhalve(str){
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
  });
}
function fullkatakanize(str){
  //　ｶﾅ　→　カナ
  const KMap = {
    'ｶﾞ':'ガ', 'ｷﾞ':'ギ', 'ｸﾞ':'グ', 'ｹﾞ':'ゲ', 'ｺﾞ':'ゴ', 'ｻﾞ':'ザ', 'ｼﾞ':'ジ', 'ｽﾞ':'ズ', 'ｾﾞ':'ゼ', 'ｿﾞ':'ゾ', 'ﾀﾞ':'ダ', 'ﾁﾞ':'ヂ', 'ﾂﾞ':'ヅ', 'ﾃﾞ':'デ', 'ﾄﾞ':'ド',
    'ﾊﾞ':'バ', 'ﾋﾞ':'ビ', 'ﾌﾞ':'ブ', 'ﾍﾞ':'ベ', 'ﾎﾞ':'ボ', 'ﾊﾟ':'パ', 'ﾋﾟ':'ピ', 'ﾌﾟ':'プ', 'ﾍﾟ':'ペ', 'ﾎﾟ':'ポ', 'ｳﾞ':'ヴ', 'ﾜﾞ':'ヷ', 'ｦﾞ':'ヺ',
    'ｱ':'ア', 'ｲ':'イ', 'ｳ':'ウ', 'ｴ':'エ', 'ｵ':'オ', 'ｶ':'カ', 'ｷ':'キ', 'ｸ':'ク', 'ｹ':'ケ', 'ｺ':'コ', 'ｻ':'サ', 'ｼ':'シ', 'ｽ':'ス', 'ｾ':'セ', 'ｿ':'ソ',
    'ﾀ':'タ', 'ﾁ':'チ', 'ﾂ':'ツ', 'ﾃ':'テ', 'ﾄ':'ト', 'ﾅ':'ナ', 'ﾆ':'ニ', 'ﾇ':'ヌ', 'ﾈ':'ネ', 'ﾉ':'ノ', 'ﾊ':'ハ', 'ﾋ':'ヒ', 'ﾌ':'フ', 'ﾍ':'ヘ', 'ﾎ':'ホ',
    'ﾏ':'マ', 'ﾐ':'ミ', 'ﾑ':'ム', 'ﾒ':'メ', 'ﾓ':'モ', 'ﾔ':'ヤ', 'ﾕ':'ユ', 'ﾖ':'ヨ', 'ﾗ':'ラ', 'ﾘ':'リ', 'ﾙ':'ル', 'ﾚ':'レ', 'ﾛ':'ロ', 'ﾜ':'ワ', 'ｦ':'ヲ', 'ﾝ':'ン',
    'ｧ':'ァ', 'ｨ':'ィ', 'ｩ':'ゥ', 'ｪ':'ェ', 'ｫ':'ォ', 'ｯ':'ッ', 'ｬ':'ャ', 'ｭ':'ュ', 'ｮ':'ョ', '｡':'。', '､':'、', 'ｰ':'ー', '｢':'「', '｣':'」', '･':'・'
  };
  const reg = new RegExp('(' + Object.keys(KMap).join('|') + ')', 'g');
  return str.replace(reg, function (match) {return KMap[match];})
            .replace(/ﾞ/g, '゛').replace(/ﾟ/g, '゜');
};
function hiraganize(str){
  //　カナ　→　ひら
  return str.replace(/[\u30a1-\u30f6]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
};

//■■　■■　■■　■■　■■　配列シャッフル機能　■■　■■　■■　■■　■■
function shuffle([...array]){
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
function shufflenum(array, num){
  const newArray = [];
  for (let i = 0; i < num; i++) {
    const rand = Math.floor(Math.random() * array.length);
    newArray.push(array[rand]);
    array.splice(rand, 1);
  }
  return newArray;
};

//■■　■■　■■　■■　■■　作者・カテゴリー名取得機能　■■　■■　■■　■■　■■
function convertAlias(list, word, nameA, nameB){ //nameBリストの先頭を検索する
  for(let n=0; n < list.length; n++) {
    let larrA = list[n][nameA].split('/');
    let larrB = list[n][nameB].split('/');
    if(larrB.includes(word)) return {index:n, nameA:larrA[0], nameB:larrB[0]};
  };
  return {index:-1, nameA:'', nameB:''};
};

//■■　■■　■■　■■　■■　生徒名index取得機能　■■　■■　■■　■■　■■
function stindexByName(characters, word){
  const n = characters.findIndex(({name}) => name == word); //name項にあるかな
  if(n > -1) return n; //name項にあったのでindexを返す
  //nickname項にあるかな
  for(let nn=0; nn < characters.length; nn++) {
    if(characters[nn].nickname.split(/\/|\s-\s/).includes(hiraganize(word))) return nn; //nickname項にあったのでindexを返す
  };
  return -1; //name項にもnickname項にもなかった
};

//■■　■■　■■　■■　■■　シンボル変換機能　■■　■■　■■　■■　■■
function ReSymbolize(symbols, word, list0, list1){
  if(!symbols[list0]||!symbols[list1]){return  word;} //list0かlist1が存在しない場合そのままで返す
  const l = symbols[list0];
  for(let n=0; n < l.length; n++) if(l[n].split('/').includes(word)) return symbols[list1][n];
  return  word; //リスト上に無かったらそのままで返す
};

/*■■　■■　■■　■■　■■　プロフィールURL取得機能　■■　■■　■■　■■　■■
function profileUrl(chr, pfmessages){
  let pf =  pfmessages.find((message)=>{
              const bgn = message.content.slice(0,40);
              if(bgn.replace(/\s+|　/g, '').includes(chr.name) || bgn.includes(chr.subname) ) return true;
              else if(chr.emoji && bgn.includes(chr.emoji) ) return true;
              const words = bgn.replace(chr.emoji, '').split(/\s|\n|　|\/|・|･|、|,|\.|\*|\|/);
              const hit = words.find(w => chr.nickname.split(/\/|\s-\s/).includes(hiraganize(w)));
              if(hit) return true;
            });
  return (pf) ? pf.url : '';
};*/

//■■　■■　■■　■■　■■　カスタム絵文字取得機能　■■　■■　■■　■■　■■
function ReSymbolizeC(client, message, symbols, word, list0, list1){
  const listC = list1 + 'C';
  if(message.guild&&message.guild.id=='601573562070859800'&&symbols[listC]){ //ギルドidがあって、そのうえでジャンクヤードかを確認
    const ename = ReSymbolize(symbols, word, list0, listC);
    return (word == ename||ename.match(/^:.+:$/)) ? ename : client.emojis.cache.find(e => e.name == ename) ;
  }else{ return ReSymbolize(symbols, word, list0, list1); }; //ジャンクヤードじゃなければ普通にやるわね
};
