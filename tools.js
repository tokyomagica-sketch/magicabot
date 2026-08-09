const pata = require('./pentadata');

//■■　■■　■■　■■　■■　文字列変換機能　■■　■■　■■　■■　■■
exports.ANhalve = function(str){
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) - 0xFEE0);
  });
}
exports.fullkatakanize = function(str){
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
exports.hiraganize = function(str){
  //　カナ　→　ひら
  return str.replace(/[\u30a1-\u30f6]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
};
exports.nemj = function(n){
  const nemj = {'0':'0️⃣','1':'1️⃣','2':'2️⃣','3':'3️⃣','4':'4️⃣',
                '5':'5️⃣','6':'6️⃣','7':'7️⃣','8':'8️⃣','9':'9️⃣','-':'⛔'};
  return String(n).replace(/[0-9]|-/g, function(match){return nemj[match];});
};
exports.ndouble = function(n){
  const nj = ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９'];
  return String(n).replace(/[0-9]/g, function(match){return nj[match];});
};

//■■　■■　■■　■■　■■　配列シャッフル機能　■■　■■　■■　■■　■■
exports.shuffle = function(oldarray){
  const array = oldarray.concat();
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
exports.shufflenum = function(oldarray, num){
  const array = oldarray.concat();
  const newArray = [];
  const n = (oldarray.length<num) ? oldarray.length : num;
  for (let i = 0; i < n; i++) {
    const rand = Math.floor(Math.random() * array.length);
    newArray.push(array[rand]);
    array.splice(rand, 1);
  }
  return newArray;
};

//■■　■■　■■　■■　■■　めんどくさきゃこれでいい日本時刻取得機能　■■　■■　■■　■■　■■
exports.getTodayJp = function(){
  const date = new Date();
  date.setHours(date.getHours() + 9);
  return date;
};

//■■　■■　■■　■■　■■　時刻文字列機能　■■　■■　■■　■■　■■
exports.getDateText = function(dateset){
  const ndate = (dateset) ? dateset : new Date();
  ndate.setHours(ndate.getHours() + 9);
  const y = ndate.getFullYear();
  const m = ndate.getMonth()+1;
  const d = ndate.getDate();
  return y+'/'+m+'/'+d;
};

//■■　■■　■■　■■　■■　朔望時計機能(なにそれ)　■■　■■　■■　■■　■■
exports.getMoon = function(date){
  const startTime = new Date('2022-01-03T03:33:00'); //基準時刻
  const diffTime = date - startTime; //ミリ秒 基準時刻からの経過時間
  const synodic = 2551442889.6; //ミリ秒 月の周期
  const moonnumraw = (diffTime%synodic)/synodic*12; //0～11.9...
  const moonnum = Math.round(moonnumraw)%12; //0～11 経過時間を月の周期で割った余り ÷ 月の周期　で0～0.9...になったものを四捨五入して0～11にします
  console.log('moonnum --- '+moonnum);
  const moonname = (moonnum==0) ? '新月' : (0<moonnum&&moonnum<6) ? '上弦' : (moonnum==6) ? '満月' : (6<moonnum&&moonnum<12) ? '下弦' : 'error' ;
  const emojilist = ['🌑','🌒','🌒','🌓','🌔','🌔','🌕','🌖','🌖','🌗','🌘','🌘'];
  return{moonnumraw:moonnumraw, moonnum:moonnum, moonname:moonname, emoji:emojilist[moonnum]};
};

//■■　■■　■■　■■　■■　オブジェクト比較機能　■■　■■　■■　■■　■■
exports.objEquality = function(a,b){
  const aJSON = JSON.stringify(Object.entries(a).sort());
  const bJSON = JSON.stringify(Object.entries(b).sort());
  console.log('～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～aJSON → '+typeof(aJSON)+'　'+aJSON);
  console.log('～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～bJSON → '+typeof(bJSON)+'　'+bJSON);
  console.log('～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～aJSON == bJSON → '+(aJSON == bJSON));
  return aJSON === bJSON;
};

//■■■■■■■■■■■■■■■■■■■　magisa系　■■■■■■■■■■■■■■■■■■
//■■　■■　■■　■■　■■　作者・カテゴリー名取得機能　■■　■■　■■　■■　■■
exports.convertAlias = function(list, word, nameA, nameB){ //nameBリストの先頭を検索する
  for(let n=0; n < list.length; n++) {
    let larrA = list[n][nameA].split('/');
    let larrB = list[n][nameB].split('/');
    if(larrB.includes(word)) return {index:n, nameA:larrA[0], nameB:larrB[0]};
  };
  return {index:-1, nameA:'', nameB:''};
};

//■■　■■　■■　■■　■■　キャラ取得機能　■■　■■　■■　■■　■■
exports.getCharacter = function(characters, word){
  
  //name・subname・emojiを検索
  const chr = characters.find( c => c.name == word || c.subname == word || c.emoji == word );
  if(chr) return chr;
  
  //nicknameを検索
  const chrarr = characters.filter( c => c.nickname.split(/\/|\s-\s/).includes(exports.hiraganize(word)) ); console.log('呼出：'+chrarr.map(chr=>chr.id));
  if     (chrarr.length == 0) return undefined; //ないですね
  else if(chrarr.length == 1) return chrarr[0]; //いますね
  else if(chrarr.length >= 2) return 'multiple'; //いすぎ
};

//■■　■■　■■　■■　■■　用語取得機能　■■　■■　■■　■■　■■
exports.getTerm = function(terms, word){
  return terms.find( t => t.word == word || t.kana == word || t.variants.split('/').includes(word) );
};

//■■　■■　■■　■■　■■　シンボル変換機能　■■　■■　■■　■■　■■
exports.ReSymbolize = function(symbols, word, list0, list1){
  if(!symbols[list0]||!symbols[list1]){return  word;} //list0かlist1が存在しない場合そのままで返す
  const l = symbols[list0];
  for(let n=0; n < l.length; n++) if(l[n].split('/').includes(word)) return symbols[list1][n];
  return  word; //リスト上に無かったらそのままで返す
};

//■■　■■　■■　■■　■■　絵文字補完機能　■■　■■　■■　■■　■■
exports.emj = function(chr){ return (chr.emoji) ? chr.emoji : '🔳' };

//■■　■■　■■　■■　■■　カスタム絵文字取得機能　■■　■■　■■　■■　■■
exports.ReSymbolizeC = function(client, message, symbols, word, list0, list1){
  const listC = list1 + 'C';
  if(message.guild&&(message.guild.id=='601573562070859800'||message.guild.id=='1306536641372094474')&&symbols[listC]){ //ギルドidがあって、そのうえでジャンクヤードかを確認
    const ename = exports.ReSymbolize(symbols, word, list0, listC);
    return (word == ename||ename.match(/^:.+:$/)) ? ename : client.emojis.find(e => e.name == ename) ;
  }else{ return exports.ReSymbolize(symbols, word, list0, list1); }; //ジャンクヤードじゃなければ普通にやるわね
};

//■■■■■■■■■■■■■■■■■■■　penta系　■■■■■■■■■■■■■■■■■■
//■■　■■　■■　■■　■■　可能性取得機能　■■　■■　■■　■■　■■
exports.checkpossibility = function(inputcards, inputtypes, orand){
  const effects = pata.effects;
  const cards = (Array.isArray(inputcards)) ? inputcards : [inputcards];
  const types = (Array.isArray(inputtypes)) ? inputtypes : [inputtypes];
  const results = cards.map(card=>{
                    const targetfxs = effects.filter(fx=>fx.id==card.id);
                    return (targetfxs.length>0
                            && targetfxs.some(fx=>{
                                 const fxps = fx.f().possibility;
                                 return ( (   orand && orand=='AND' && types.every(type=>fxps.includes(type)) )
                                        ||( (!orand || orand=='OR') && types.some(type=>fxps.includes(type))  ) );
                               })
                           );

                  });
  return (results.length>1) ? results : results[0];
};
//■■　■■　■■　■■　■■　同所属情報取得機能　■■　■■　■■　■■　■■
exports.checkdoor= function(cardA, cardB){
  const cards = [cardA, cardB];
  //let result = false;
  //const doornames = [];
  return  ( (cards.every(c=>c.grade&&c.major) && cardA.grade==cardB.grade && cardA.major==cardB.major)
          ||(cards.every(c=>c.club) && cardA.club.split(' ').some(club => cardB.club.split(' ').some(bclub => bclub==club)))
          ||(cards.every(c=>c.committee) && cardA.committee==cardB.committee)
          ||(cards.every(c=>c.roomid) && cardA.roomid==cardB.roomid) );
};
//■■　■■　■■　■■　■■　縁情報取得機能　■■　■■　■■　■■　■■
exports.checkrelation = function(card, targetcards, characters){ //これを使わないと縁を調べたときイベントカードを対象にできない
  console.log(card.id+' の checkrelation');
  const relationlog = [];
  card.relation.split(' - ').forEach((r,ri)=>{
    if(r){
      r.split('/').forEach(n=>{
        if(n){
          const cr = targetcards.find(cc=>{
                       const targetcard = characters.find(ccc=>ccc.nickname.split(/\/|\s-\s/).includes(n));
                       return (targetcard&&cc.id.includes(targetcard.id));
                     });
          if(cr) relationlog.push({nn:n, ids:[card.id, cr.id], plus:(ri==0), minus:(ri==1)});
        };
      });
    };
  });
  return relationlog;
};
//■■　■■　■■　■■　■■　レアリティ加算機能　■■　■■　■■　■■　■■
exports.rarityadd = function(card, add){ //いちいちマイナスか調べるのめんどくて……
  const rarity = card.rarity + add;
  return (rarity < 0) ? 0 : rarity;
};