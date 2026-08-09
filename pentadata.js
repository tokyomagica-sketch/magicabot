//■■■■■■■■■■■■■■■■■■■■諸々の基礎設定
exports.pentaname = "MAGICA-PENTA";
exports.color = 0x800040;
exports.colorr = [0x504040, 0x8570d0, 0x20c8dc, 0xb9f330, 0xffc800, 0xff0060]; //取得にはraritycolor(c)を使ってね
exports.colorx = 0xf5e2db;
exports.colorsecretshop = 0x984ec0;
exports.colormemorialshop = 0xffa000;
const penta = require("./penta");
const data = require("./magisadata");
const tools = require("./tools"); //ツール用のtools.jsを参照

exports.pentaitemlist = [
  { name: "ticket",   emoji: "🎫" },
  { name: "envelope", emoji: "" },
  { name: "jewel",    emoji: "💍" },
  { name: "",         emoji: "" },
  { name: "invite",   emoji: "🎟️" },
  { name: "event",    emoji: "" },
  { name: "report",   emoji: "" },
  { name: "ribbon",   emoji: "🎗️" },
];

//チャンネルid
exports.newslog = "1036744563651518595";
exports.serifulog = "931006451613311026";
exports.aprilserifulog = "958384871057801246";
exports.maxtnlog = "932966103611760720";
exports.extratnlog = "1035209314811531326";
exports.sptnlog = "933802229142536233";
exports.fserifulogL = "967156153333219379";
exports.fserifulogS = "967156180021575680";
exports.fspserifulogL = "967192112619749376";
exports.fspserifulogS = "967192205661982780";
exports.eshopserifulog = "1015890355633258506";
exports.shopserifulog = "967849597269590076";
exports.otherserifulog = "1016025017986859079";
exports.quizlog = "1022323954062471200";
exports.cartalog = "1056663267646390312";

exports.playerlog = "929777697503187004";
exports.keeplog = "962571570021277736";
exports.favoritelog = "967142566887817296";
exports.settingslog = "967142566887817296";
exports.speciallog = "947181882884374568";
exports.bestscorelog = "933416694267932672";
exports.worstscorelog = "944958594049257493";
exports.sozailog = "933357670675660830";

exports.errorlog = "943962430294351972";

exports.magicapentach = '937432376961814609';

//チケットなど
exports.ticketNew = 3; //新規ユーザー配布
exports.ticketDaily = 2; //ログインボーナス
exports.ticketThreshold = 200; //ペンタボーナス閾値
exports.jewelThreshold = 500; //ペンタボーナス閾値
exports.reportThreshold = -100; //ペンタボーナス閾値
exports.ribbonThreshold = 1000; //ペンタボーナス閾値
//封筒
exports.envelopeNew = 1; //新規ユーザー配布
//指名招待券
exports.inviteNew = 1; //新規ユーザー配布

//コイン
exports.coinPenta = 100; //ペンタボーナス
exports.coinBestscore = 100; //ベストスコアボーナス
exports.coinOverfive = 20; //ガチャ5枚超過ボーナス
exports.coinEventover = 25; //イベントアイテム余剰ボーナス

//レアリティ表記
exports.raritytext = function (c) {
  const stars = c.rarity == 0 ? "0️⃣" : "⭐".repeat(c.rarity);
  let event = "";
  if (c.eventid) {
    const eventemoji =
      c.eventid !== "SECRET"
        ? exports.eventlist.find((e) => e.id == c.eventid).emoji
        : "■";
    event = "　" + eventemoji + c.eventid;
  }
  return stars + event;
};
exports.raritycolor = function (c) {
  if (c.collected == 7) return exports.colorx;
  else if (c.eventid)
    return c.eventid !== "SECRET"
      ? exports.eventlist.find((e) => e.id == c.eventid).color
      : 0xc00080;
  else return exports.colorr[c.rarity];
};

//■■■■■■■■■■■■■■■■■■■■ガチャ確率設定
const rwn = [
/* 改定前
  0.0005,//0
  0.55,  //1
  0.3045,//2
  0.13,  //3
  0.01,  //4
  0.001, //5
  0.003, //teacher
  0.0005,//other
  0.0005,//secret
*/

  0.0004,//0
  0.566,  //1
  0.34,//2
  0.08,  //3
  0.007,  //4
  0.0007, //5
  0.005, //teacher
  0.0005,//other
  0.0004,//secret
];
//pickup: [['ひじかた', 0.07], ['そうまあ', 0.07], ['こんどう', 0.07], ['おきたひ', 0.07], ['ながくら', 0.07], ['みよしき', 0.15], ['ごーすと', 0.15]]
exports.rarityinfo = (pickup, rws) => {
  const pu = pickup ? pickup : [];
  const rw = rws ? rws : rwn;
  return {
    weights: [
      [0, rw[0]],
      [1, rw[1]],
      [2, rw[2]],
      [3, rw[3]],
      [4, rw[4]],
      [5, rw[5]],
      ["TEACHER", rw[6]],
      ["OTHER", rw[7]],
      ["SECRET", rw[8]],
    ],
    pickup: pu,
  };
};
exports.rarityinfoH = (pickup, rws) => {
  const pu = pickup ? pickup : [];
  const rw = rws ? rws : rwn;
  return {
    weights: [
      [0, rw[0]],
      [3, rw[1] + rw[2] + rw[3]],
      [4, rw[4]],
      [5, rw[5]],
      ["TEACHER", rw[6]],
      ["OTHER", rw[7]],
      ["SECRET", rw[8]],
    ],
    pickup: pu,
  };
};
exports.rarityinfoB = (pickup) => {
  const pu = pickup ? pickup : [];
  return {
    weights: [
      [4, 0.7],
      [5, 0.05],
      ["TEACHER", 0.2],
      ["OTHER", 0.05],
    ],
    pickup: pu,
  };
};

//■■■■■■■■■■■■■■■■■■■■ペンタ絵文字辞書
exports.emjlist = {
  ["炎・熱"]:    ["🔥","☀️","🚂","🚬","🕯","🎇"],
  ["水・氷"]:    ["🧊","🏄‍♂️","🌊","❄️","⛄","🌧️","🐬","🐳"],
  ["天体"]:     ["⭐","☀️","🌟","💫","☄️","🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘","🌏"],
  ["天候"]:     ["☀️","🌧️","⚡","❄️","🌪️"],
  ["風"]:       ["🌀","💨","🌪️","🍃","🎈"],
  ["石・宝石"]:  ["🪨","💎","🔮","💍","📿","🪦","🗿"],
  ["植物"]:     ["🌼","☘️","🌱","🍀","🍃","🍅","🍆","🍈","🧅","🍇","🍓","🌸","🌻","🥒","🌹","🪴","🍁","🌵","🌾"],
  ["動物"]:     ["🐾","🐯","🐼","🐉","🐴","🐿️","🐚","🐱","🦐","🦇","🐣","🐛","🦖","🐰","🦌","🦊","🐺","🐸","🐳","🐆","🦜","🐽","🐬","🐘","🦩","🐈‍⬛"],
  ["食物"]:     ["🍅","🍆","🍈","🍬","🍳","🧅","🍇","🍓","🍱","🥒","🍙","🧁","🍰","🍦","🎂","🌾","🍣"],
  ["怪物"]:     ["👹","💀","👺","🐉","🦖","👻"],
  ["人型"]:     ["🥷","🏃","🤹‍♀️","👥","👯","🕵️‍♀️","🏄‍♂️","🦸‍♂️"],
  ["顔"]:       ["🥴","🤡","🤬","😢","🙂","🥺","👶","👹","😛","👦","👺","🗿"],
  ["身体部位"]:  ["🦾","💀","👊","🩸","✊","👁️","👣","👋","👃","👄","👅"],
  ["服飾"]:     ["👑","🧤","⛸️","🥊","🎩","🪖","📿","💍","🎀", "🎗️"],
  ["筆記"]:     ["🪶","🖊️","🖋️","🖌️"],
  ["音"]:       ["💿","📢","🎤","🎧","🎻","🎷","🥁","🎸"],
  ["金属・機械"]:["✂️","🪙","⛓️","🛠️","🔨","🗝️","🪡","🧰","🔪","🧷","📢","📡","🚂","🔭","🎤","🎧","📷","💾","🎮","🏍️","⚖️","🍴","💡","🔦","⚙️"],
  ["丸・玉"]:    ["🔴","🟢","🔵","🟣","⚫","⚪","⛄","🔮","☀️","🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘","🥴","🤡","🤬","😢","🙂","👶","😛","🥺","🍅","🍈","🧅","🚭","⚽","💿","🌏","☯️","🌐","👁","🔍","🔎","🧶","🍳","🎈","💍","🚫","🧿"]
};
  //貫通などを見ない
exports.emjlistX = ['食物','丸・玉'];

//■■■■■■■■■■■■■■■■■■■■テーマ
const tdf = {
  color: exports.color,
  beforetotal: "TOTAL: ",
  aftertotal: "",
  pentamessage: [
    "",
    "",
    " D I ",
    " T R I ",
    " Ⓣ Ⓔ Ⓣ Ⓡ Ⓐ ",
    " 𝑃 𝐸 𝑁 𝑇 𝐴 ‼️ ",
    " 𝙃 𝙀 𝙓 𝘼 ‼️‼️ ",
    " H E P T A ! ! ",
    " O C T A ! ! ",
    " N O N A ! ! ",
    " D E C A ! ! ",
    " U N D E C A ! ? ",
    " D O D E C A ! ? ",
  ],
  bestscoremessage: "YOUR BEST",
  worstscoremessage: "YOUR WORST",
  teacherhr: "─　─　─　─　─　─　─　─　─",
  resulthr: "────── 得点計算 ──────",
};
exports.themes = [
  {
    id: "df",
    name: "デフォルト",
    color: tdf.color,
    batotal: (totalP) => {
      return { before: tdf.beforetotal, after: tdf.aftertotal };
    },
    bestscoremessage: tdf.bestscoremessage,
    worstscoremessage: tdf.worstscoremessage,
    pentamessage: tdf.pentamessage,
    resulthr: tdf.resulthr,
    teacherhr: tdf.teacherhr,
  },
  {
    id: "uq",
    name: "ウルトラ赳",
    color: 0xc2e43a,
    batotal: (totalP) => {
      let a;
      if (totalP <= 0) {
        a = "っス……";
      } else if (totalP >= 500) {
        a = "っスよ‼️ よっしゃッ‼️";
      } else {
        a = "っス‼️";
      }
      return { before: "全部で", after: a };
    },
    bestscoremessage: "ベストっスよ！",
    worstscoremessage: "ワーストっスね……",
    pentamessage: [
      "",
      "",
      "少なッ！？",
      "す、少なくないっスか！？",
      "テトラ！？ なんか少なくないっスか！？",
      "ペンタ！ やった～ッ！",
      "ヘキサ！？ やったやった～ッ！！",
      "ヘプタ！？ 多くないっスか！？",
      "オクタってなんスか！？",
      "ノナってなんスか！？",
      "デカってなんスか！？",
      "ウンデカってなんなんスか！？",
      "ドデカってなんなんスか！？",
    ],
    authoriconurl:
      "https://cdn.discordapp.com/attachments/933354343527243806/933463704379486218/mgsQ.png",
    resulthr: tdf.resulthr,
    teacherhr: tdf.teacherhr,
    spname: "高山赳",
    spnewname: () => {
      const choice = ["高山赳っス！", "あたしだ！ 高山赳！", "タ カ ヤ マ Q"];
      return choice[Math.floor(Math.random() * choice.length)];
    },
  },
  {
    id: "ys",
    name: "溶接ペンタ",
    color: 0xff4500,
    batotal: (totalP) => {
      return { before: "", after: "獲得ッ！" };
    },
    bestscoremessage: "ベスト更新ッ！やったなッ……！！",
    worstscoremessage: "なッ何を眠たいこと……ッ！！",
    pentamessage: [
      "",
      "",
      "ホンマにDIかッ！？",
      "ホンマにTRIかッ！？",
      "TETRAッ！？おもろいやんかッ！",
      "PENTA炸裂ッ！",
      "うおおッ！HEXAが決まったッ！",
      "ああッ！？なんぼやってッ！？",
      "ああッ！？なんぼやってッ！？",
      "ああッ！？なんぼやってッ！？",
      "ああッ！？なんぼやってッ！？",
      "ああッ！？なんぼやってッ！？",
      "ああッ！？なんぼやってッ！？",
    ],
    resulthr: tdf.resulthr,
    teacherhr: tdf.teacherhr,
    spname: "放出雅典",
    spnewname: () => {
      const choice = ["放出雅典やッ！", "ガッテンと呼べッ！"];
      return choice[Math.floor(Math.random() * choice.length)];
    },
    pentaname: "SEYANA-PENTA",
  },
  {
    id: "dw",
    name: "ですわ♪",
    color: 0x000000,
    batotal: (totalP) => {
      let b = "";
      let a = "";
      if (
        (totalP >= 100 || totalP <= -100) &&
        String(totalP).match(/^-?([0-9])\1+$/)
      ) {
        a = "！ ゾロ目ですわ～！";
      } else if (
        (totalP >= 100 || totalP <= -100) &&
        String(totalP).match(/^-?[0-9]0+$/)
      ) {
        b = "ピッタリ";
        a = "ですわ！！";
      } else if (totalP <= -1000) {
        a = "！？なんでですの～！？";
      } else if (totalP <= 0) {
        a = "ですわ……";
      } else if (totalP >= 1000) {
        a = "！やりましたわ～！！";
      } else if (totalP >= 500) {
        a = "ですわよ！？";
      } else if (totalP >= 200) {
        a = "ですわ～！！";
      } else {
        a = "ですわ！";
      }
      return { before: b, after: a };
    },
    bestscoremessage: "ベストスコアですわ～！",
    worstscoremessage: "過去最低点ですわ！？",
    pentamessage: [
      "",
      "",
      "ペンタで……はないですわ！？",
      "ペンタで……はないですわ！？",
      "ペンタで……はないですわ！？",
      "ペンタですわ～！",
      "ペンタで……はないですわ！？",
      "ペンタで……はないですわ！？",
      "ペンタで……はないですわ！？",
      "ペンタで……はないですわ！？",
      "ペンタで……はないですわ！？",
      "ペンタで……はないですわ！？",
      "ペンタで……はないですわ！？",
    ],
    resulthr: tdf.resulthr,
    teacherhr: tdf.teacherhr,
    spname: "玉恵・ローデンヴァルト",
    spnewname: () => "ワタクシですわ！",
    pentaname: "DESUWA-PENTA",
  },
  {
    id: "nk",
    name: "魔法のあしあと",
    color: 0xffcb37,
    batotal: (totalP) => {
      return {
        before: "とーたる：",
        after: totalP >= 500 ? " びっくり……。" : "",
      };
    },
    bestscoremessage: "ベストスコア。記録しておくね。",
    worstscoremessage: "ワーストスコア。そういう日もあるんじゃない？",
    pentamessage: [
      "",
      "",
      "でぃ……？ 聞き慣れないけど……。",
      "とり？ また珍しいものを……。",
      "てとら？ 珍しい。",
      "ぺんた。おめでとう。",
      "へきさ？ 珍しい。",
      "へぷた？ また珍しいものを……。",
      "おくた？ 聞き慣れないけど……。",
      "のな……？ 聞き慣れないけど……。",
      "でか……？ 聞き慣れないけど……。",
      "う、うんでか……って何……！？",
      "ど、どでか……って何……！？",
    ],
    authoriconurl:
      "https://cdn.discordapp.com/attachments/933354343527243806/934964588582162462/nkicon.png",
    resulthr: tdf.resulthr,
    teacherhr: tdf.teacherhr,
    spname: "有栖川千紗",
    spnewname: () => {
      const choice = [
        "有栖川千紗。",
        "有栖川千紗。「ちさ」ね。",
        "有栖川千紗。よろしくね。",
      ];
      return choice[Math.floor(Math.random() * choice.length)];
    },
  },
  {
    id: "mp",
    name: "Megaphone!!",
    color: 0xe00080,
    batotal: (totalP) => {
      return { before: "", after: "ですよ～！！！！！" };
    },
    bestscoremessage: "ベストスコア！！ やったぁ～！！！！！",
    worstscoremessage: "ワーストスコア！？ そんなぁ～！！！！！",
    pentamessage: [
      "",
      "",
      "DIですって！？ 凄いです！！",
      "TRIですって！？ 凄いです！！！",
      "TETRAですって！？ 凄いです！！！！",
      "PENTAです！！ さすがですねぇ！！！！！",
      "HEXAですって！？ 凄いです！！！！！！",
      "HEPTAですって！？ 凄いです！！！！！！！",
      "OCTAですって！？ 凄いです！！！！！！！！",
      "NONAですって！？ 凄いです！！！！！！！！！",
      "DECAですって！？ 凄いです！！！！！！！！！！",
      "UNDECAですって！？ 凄いです！！！！！！！！！！！",
      "DODECAですって！？ 凄いです！！！！！！！！！！！！",
    ],
    resulthr: "💥💥　得点計算ですっ！！！　💥💥",
    teacherhr: "💥　💥　💥　💥　💥　💥　💥",
    spname: "香青椒",
    spnewname: () => {
      const choice = [
        "香青椒ですっ！！！",
        "香青椒！！ コウですよ～！！",
        "私ですっ！ 香青椒ですよ～～！！！",
      ];
      return choice[Math.floor(Math.random() * choice.length)];
    },
  },
  {
    id:"al", name:"我らアラン組", color:0x5020c0,
    batotal:(totalP)=>{
      const list = (totalP<=0)  ? ['/じゃ……', '/でした……', 'あちゃー、/かあ……']
                 : (totalP<200) ? ['合計/じゃ！', '全部で/ですね！', '合計/だって。']
                 : (totalP<500) ? ['合計/じゃ！！うむうむ', '全部で/！いい調子ですねっ！', '合計/だって。やるねえ～']
                                : ['合計/じゃとーっ！？', 'ええーっ！？/ですか！？', '合計/！スクショタイム！'];
      const text = list[Math.floor(Math.random()*list.length)];
      console.log('～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～'+text);
      return{before:text.split('/')[0], after:text.split('/')[1] };
    },
    bestscoremessage:  "最高記録更新じゃ！まだまだ上を目指せよ！",
    worstscoremessage: "下には下がいるもんじゃのう……",
    pentamessage: [
      "", "",
      "DIじゃ！　…んん？DI？",
      "TRIじゃ！　…んん？TRI？",
      "TETRAじゃ！　…んん？TETRA？",
      "よっしゃーっ！！PENTA達成じゃ！！",
      "HEXAじゃー！賑やかじゃのう！",
      "HEPTAじゃー！賑やかじゃのう！",
      "OCTAじゃー！賑やかじゃのう！",
      "NONAじゃー！賑やかじゃのう！",
      "DECAじゃー！賑やかじゃのう！",
      "UNDECAじゃー！賑やかじゃのう！",
      "DODECAじゃー！賑やかじゃのう！",
    ],
    resulthr: tdf.resulthr, 
    teacherhr: tdf.teacherhr,
    pentaname: "MACHINA-PENTA"
  },
];

//■■■■■■■■■■■■■■■■■■■■各ペンタ特殊効果output型

const fxoutput = {
  cards: null, //カード変更を与えたときのやつ
  Tcards: null, //カード変更を与えたときのやつ
  resultlist: null, //リザルト書換があったときのやつ
  prefields: null, //効果書換があったときのやつ
  count: 1, //枚数変動があったときの送り数
  emjadd: 0, //絵文字追加
  coinadd: 0, //コイン加算
  coinmul: 1, //コイン乗算
  episodeadd: [],
  season: null, //季節設定
  date: null, //時間設定
  keeptext: null, //効果記録
  noteacher: false, //教師禁止
  //以下発動ログ(他効果から参照できるリスト、のちにfieldsの材料になる)に記録する部分
  log: {
    title: "", //効果名
    notes: "", //ポイント等の追記
    description: "", //効果説明 イベント時は各々で説明を追加してください
    type: "effect",
    //以下計算結果類
    fxowner: null, //誰の効果？
    fxtype: [], //段階：前'before', 後'after',
    //発動：発動そのものが確率'prob', 結果がランダム'random',
    //得点：強制'force', 加算'add', 乗算'mul',
    //カード：書換'editcard', 入替'changecard', 並替'sortcard', 増枚'addcard', 減枚'delcard', 自分が去る'leaving',
    //ほか：リザルト書換'changeresultlist', 絵文字追加'emjadd',
    //　　：コイン加算'coinadd', コイン乗算'coinmul', エピソード追加'episodeadd',
    //　　：季節設定'changeseason', 時間設定'changedate', キープ'keep',
    //　　：イベント'event', なし'nothing', 特殊'special', カウント操作'changecount'
    force: null, //強制設定
    add: 0, //加算
    mul: 1, //乗算
    special: null, //何か記録しておきたいことがあれば
    eventitems: {
      index: null, //イベントアイテム番号
      add: 0,
      mul: 1,
    }, //イベントアイテム獲得数
  },
};
const epoutput = {
  cards:null,
  Tcards:null,
  resultlist: null, //リザルト書換があったときのやつ
  prefields: null, //効果書換があったときのやつ
  emjadd: 0, //絵文字追加
  coinadd: 0, //コイン加算
  coinmul: 1, //コイン乗算
  ticketadd : 0, //チケット加算
  envelopeadd : 0, //封筒加算
  jeweladd : 0, //宝珠加算
  inviteadd : 0, //招待券加算
  ribbonadd : 0, //リボン加算
  keeptext: null, //効果記録
  //以下発動ログ(他効果から参照できるリスト、のちにfieldsの材料になる)に記録する部分
  log: {
    title: "", //効果名
    notes: "", //ポイント等の追記
    description: "", //効果説明 イベント時は各々で説明を追加してください
    type: "episode",
    //以下計算結果類
    eptype: [], //段階：型'pattern', 部分一致'partial', 他諸々'variety'
    //発動：確率'prob', 結果がランダム'random',
    //得点：強制'force', 加算'add', 乗算'mul',
    //ほか：リザルト書換'changeresultlist',
    //　　：コイン加算'coinadd', コイン乗算'coinmul',
    //　　：イベント'event', なし'nothing'
    force: null, //強制設定
    add: 0, //加算
    mul: 1, //乗算
    eventitems: {
      index: null, //イベントアイテム番号
      add: 0,
      mul: 1,
    }, //イベントアイテム獲得数
  },
};

//■■■■■■■■■■■■■■■■■■■■イベント
exports.eventlist = [
  /*
  {id:'TETE', name:'イベント機能、動く？ 教えてくれ佐藤！', emoji:'🏳️', color:0xe0e0e0,
   description:'テストイベントです。うまく動くのか？ 見せてくれ佐藤！ イベントガチャで佐藤大量発生中！',
   descriptionP:'2年生が出ると白旗を獲得できます！ なんで？',
   descriptionG:'佐藤排出率上昇中！ イミわかんねえよ～っ！',
   start:'2022-01-27', end:'2022-01-27',
   pickup:(characters)=>characters.filter(c=>c.id=='さとうこ').map(c=>[c.id, 0.5]),
   filtering:(cards)=>[cards.filter(c=>c.grade=='2')], //PENTAでアイテム獲得対象となるカードをフィルタリング
   item:['白旗'], itememoji:['🏳️'], itemnum:[100]}, //イベント固有アイテム、交換個数
    
  {id:'TEST', name:'教えてくれ佐藤！', emoji:'🏳️', color:0xe0e0e0,
   description:'テストイベントです。うまく動くのか？ 見せてくれ佐藤！ イベントガチャで佐藤大量発生中！',
   descriptionP:'2年生が出ると白旗を獲得できます！ なんで？',
   descriptionG:'佐藤排出率上昇中！ イミわかんねえよ～っ！',
   start:'2022-01-29', end:'2022-01-29',
   giftids:['さとうこテ', 'ふるつきテ'], //交換用にガチャから除外すべきid
   pickup:(characters)=>characters.filter(c=>c.club=='美術'||c.club=='漫画研究'||(c.eventid&&c.eventid=='TEST'))
                                  .map(c=>[c.id, 0.6/(characters.filter(cc=>cc.rarity==c.rarity&&(cc.club=='美術'||cc.club=='漫画研究'||(cc.eventid&&cc.eventid=='TEST'))).length)]),
   filtering:(cards)=>[cards.filter(c=>c.dorm=='赤寮'), cards.filter(c=>c.dorm=='青寮')], //PENTAでアイテム獲得対象となるカードをフィルタリング
   item:['🏳️⚪白旗(白)','🏳️⚫白旗(黒)'], itememoji:['🏳️⚪','🏳️⚫'], //イベント固有アイテム、交換個数、アイテムおよびイベントの共有絵文字
   shoplist:[
    { id:'testw', name:'て佐藤', title:'🏳️イベント交換(白)', itemindex:0, itemcost:10, type:'event',
      description:'アイテムとカードを交換できる。\n対象：佐藤小麦[テ]'},
    { id:'testb', name:'て古月', title:'🏳️イベント交換(黒)', itemindex:1, itemcost:10, type:'event',
      description:'アイテムとカードを交換できる。\n対象：古月彰ノ介[テ]'},
   ]
  },
  */
  { id: "SECRET", name: "シークレット", shortname: "シークレット", emoji: "㊙️", color: 0xc00080, nnprefix: [], },

  { id: "SNOW", name: "冬だ！ 節分だ！ 赤青対抗・鬼の雪合戦！", shortname: "赤青対抗・鬼の雪合戦！",
    emoji: "⛄", color: 0xffffff,
    idTail: "雪", nameTail: "(雪)", nnprefix: ["雪", "ゆき", "雪合戦"],
    //start: "2023-01-01", end: "2023-01-15", (初回開催)
    start: "2023-02-03", end: "2023-02-12",
    description: "東京に、想像以上に雪が降る！ にわかに沸き立つ東魔生、誰が始めた雪合戦！\n闘争心を掻き立てられた赤寮と青寮の間で、合戦は白い熱を帯びていく──。\n■復刻！(初開催：2022/2/3 ～ 2022/2/12)",
    descriptionP: "赤寮・青寮のカードを引くと、寮ごとの⚪雪玉を獲得することができます。(イベントカードであれば1つ多く獲得)\n赤寮の雪玉を集めることで 阿知須苛烈(雪) 、青寮の雪玉を集めることで 十文字氷柱(雪) をSHOP交換から手に入れることができます。",
    descriptionG: "赤寮・青寮 確率上昇中！ イベント限定カードも！",
    giftids: ["あじすか雪", "じゅつら雪"], //交換用にガチャから除外すべきid
    pickup: (characters, log) => characters.filter(c => c.dorm=="赤寮" || c.dorm=="青寮" || (c.eventid && c.eventid=="SNOW") )
                                           .map(c => [ c.id, 0.6 / characters.filter(cc => cc.rarity == c.rarity && (cc.dorm=="赤寮" || cc.dorm=="青寮" || (cc.eventid && cc.eventid=="SNOW")) ).length ]),
    filtering: (cards, Tcards, fcard) => [
      cards.filter(c => c.dorm=="赤寮"),
      cards.filter(c => c.dorm=="青寮")
    ], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [
      { emoji: "⚪赤", name: "⚪雪玉(赤)", over: 25 },
      { emoji: "⚪青", name: "⚪雪玉(青)", over: 25 },
    ],
    //shopname:'',
    shoplist: [
      { id: "snowr", name: "雪苛烈", title: "⛄カード交換(赤)",
        description: "⚪雪玉(赤)とカードを交換できる。\n対象：🔥阿知須苛烈(雪)",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 100,
        itemToGet: "card", cardidToGet: "あじすか雪" },
      { id: "snowb", name: "雪氷柱", title: "⛄カード交換(青)",
        description: "⚪雪玉(青)とカードを交換できる。\n対象：🧊十文字氷柱(雪)",
        itemToLose: "eventitem", itemToLoseIndex: 1, numToLose: 100,
        itemToGet: "card", cardidToGet: "じゅつら雪" },
    ],
    endprocess:(input) => {
      const resulttext=[];
      /*
      //コンプリート
      const complete = ["あじすか", "はなてん", "しちりが", "れみゅえ",
                        "じゅつら", "うららあ", "たかやま", "めろばた", "きむちゅ"
      ].every(ecard => input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "雪5")
                    || input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "雪7") );
      if(complete){ input.logitems[2] = Number(input.logitems[2])+3;
                    resulttext.push('イベントカード全MAXボーナス 💍×3 を獲得しました！');
                  };
      */
      //結果
      return {logitems:input.logitems,
              ps:""
              +(resulttext.length>0?"\n"+resulttext.join('\n'):"")};
    }
  },

  { id: "CHOCO", name: "魔心込めて 東魔チョコレートコンテスト！", shortname: "チョコレートコンテスト！",
    emoji: "💝", color: 0xb06030,
    idTail: "甘", nameTail: "(チョコ)", nnprefix: ["ちょこ", "ちょここん", "ばれんたいん"],
    start: "2022-02-14", end: "2022-02-26",
    description:
      "バレンタインにかこつけて、ベスト・ショコラティエ決定戦開幕！？\n生徒会からやってきたウキウキの司会者のもと、想いと腕の見せどころがやってきた！",
    descriptionP:
      "調理部、もしくは(チョコ)と付くカードを引くと🍫チョコを獲得することができます。\nチョコを集めることで、宝珠・招待券として機能する期間限定アイテム【💝チョコギフト】をSHOP交換から手に入れることができます。\n💝チョコギフトは賞味期限(イベント期間中)が切れると失効するのでご注意ください。",
    descriptionG: "調理部 確率上昇中！ イベント限定カードも！",
    giftids: [], //交換用にガチャから除外すべきid
    pickup: (characters) =>
      characters
        .filter(
          (c) => c.club.includes("調理") || (c.eventid && c.eventid == "CHOCO")
        )
        .map((c) => [
          c.id,
          0.15 /
            characters.filter(
              (cc) =>
                cc.rarity == c.rarity &&
                (cc.club.includes("調理") ||
                  (cc.eventid && cc.eventid == "CHOCO"))
            ).length,
        ]),
    filtering: (cards) => [
      cards.filter(
        (c) => c.club.includes("調理") || (c.eventid && c.eventid == "CHOCO")
      ),
    ], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [
      { emoji: "🍫", name: "🍫チョコ", over: 25 },
      { emoji: "💝", name: "💝チョコギフト", over: 25 },
    ],
    extraindex: 1,
    inviteindex: 1,
    shoplist: [
      //未修正かどうかわからん
      {
        id: "choco",
        name: "チョコギフト",
        title: "💝チョコギフト",
        itemindex: 0,
        itemgetindex: 1,
        itemcost: 100,
        type: "eventitem",
        description: "《イベント》🍫チョコと交換できる。",
      },
    ],
  },

  { id: "MYSTERY", name: "クラウン・ホームズ ふたば寮事件簿", shortname: "ふたば寮事件簿",
    emoji: "📔", color: 0x587010,
    idTail: "事", nameTail: "(事件簿)", nnprefix: ["事件簿", "じけんぼ", "みすてりー"],
    start: "2022-03-14", end: "2022-03-26",
    description:
      "舞台は緑寮。あの植物園に足跡をつけた命知らずはいったい誰だ？\n寮の安寧を取り戻すべく、ひとりの探偵？ が動き出す！",
    descriptionP:
      "緑寮のカードを引くと【❔証拠品】を獲得することができます。(当イベントカードであれば1つ多く獲得)\n【❔証拠品】を集めると、イベントSHOP：「！ぺしい」にて《クラウン・モリアーティ(事件簿)》、あるいは宝珠として機能する期間限定アイテム【❕真実】と交換できます。\n\nまた、プレイヤーごとに自動的に「指名手配カード」が設定され、プレイ中は「指名手配カード」と共通点(クラス・部活・濁点等を除いた名前の頭文字の行・出身地除くタグ)を持つカードに✅がつくようになります。\n「指名手配カード」がわかったとき「！ぺい　(カード名)」で回答を行うと、【❔証拠品】を50個獲得し「指名手配カード」が再設定されます。",
    descriptionG: "イベント限定カードあり〼",
    giftids: ["くらうん事"], //交換用にガチャから除外すべきid
    pickup: (characters) => [],
    filtering: (cards) => [
      cards.filter(
        (c) => c.dorm == "緑寮" || (c.eventid && c.eventid == "MYSTERY")
      ),
    ], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [
      { emoji: "❔", name: "❔証拠品", over: 20 },
      { emoji: "❕", name: "❕真実", over: 6000 },
    ],
    extraindex: 1,
    shoplist: [
      {
        id: "crann",
        name: "事件簿くらうん",
        title: "📔カード交換",
        description:
          "❔証拠品とカードを交換できる。\n対象：クラウン・モリアーティ(事件簿)",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 150,
        itemToGet: "card",
        cardidToGet: "くらうん事",
      },
      {
        id: "cash",
        name: "換金",
        title: "換金",
        description: "❔証拠品を換金できる。",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 100,
        itemToGet: "coin",
        numToGet: 2000,
      },
      {
        id: "truth",
        name: "真実",
        title: "❕真実",
        description: "❔証拠品と❕真実を交換できる。",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 300,
        itemToGet: "eventitem",
        itemToGetIndex: 1,
        numToGet: 1,
      },
    ],
    startprocess: async (input) => {
      const targets = await input.data.characters
        .filter((c) => c.genre == "stTm")
        .map((c) => c.id);
      const answerId = targets[Math.floor(Math.random() * targets.length)];
      input.client.channels
        .get(exports.speciallog)
        .send(input.message.author.id + " MYSTERY " + answerId);
    },
    markprocess: (input) => {
      const a = input.data.characters.find(
        (cc) => cc.id == input.log.content.split(" ")[2]
      );
      const c = input.c.id.match(/^だみー/)
        ? exports.additional.find((cc) => cc.id == "だみー")
        : input.allcards
            .concat(exports.additional)
            .find((cc) => cc.id == input.c.id);
      const commons = [];
      if (
        a.grade &&
        a.major &&
        c.grade &&
        c.major &&
        a.grade == c.grade &&
        a.major == c.major
      )
        commons.push("クラス"); //クラス
      if (
        a.club &&
        a.club.split(" ").some((club) => c.club.split(" ").includes(club))
      )
        commons.push("部活"); //部活
      const kanas = [
        "あいうえおゔ",
        "かきくけこがぎぐげご",
        "さしすせそざじずぜぞ",
        "たちつてとだぢづでど",
        "なにぬねの",
        "はひふへほばびぶべぼぱぴぷぺぽ",
        "まみむめも",
        "やゆよ",
        "らりるれろ",
        "わ",
      ];
      if (
        a.kana &&
        kanas.findIndex((gyo) => gyo.includes(a.kana.slice(0, 1))) ==
          kanas.findIndex((gyo) => gyo.includes(c.kana.slice(0, 1)))
      )
        commons.push("頭文字の行"); //頭文字の行
      const xtags = [
        "北海道",
        "東北",
        "北東北",
        "南東北",
        "関東",
        "北関東",
        "南関東",
        "首都圏",
        "中部",
        "甲信越",
        "北陸",
        "東海",
        "近畿",
        "関西",
        "中国地方",
        "山陽",
        "山陰",
        "四国",
        "九州",
        "沖縄",
        "海外",
        "ヨーロッパ",
        "東ヨーロッパ",
        "西ヨーロッパ",
        "南ヨーロッパ",
        "北ヨーロッパ",
        "アジア",
        "東アジア",
        "南アジア",
        "アメリカ",
        "アフリカ",
        "北アフリカ",
        "地中海",
      ];
      if (a.tag && c.tag) {
        const atags = a.tag.split(/\/|\s-\s/);
        const ctags = c.tag.split(/\/|\s-\s/);
        if (
          [...atags, ...ctags].filter(
            (t) => !xtags.includes(t) && atags.includes(t) && ctags.includes(t)
          ).length > 0
        )
          commons.push("タグ");
      } //タグ
      return input.alibi && commons.length >= 1
        ? " ✅" + commons.join(", ")
        : commons.length > 1
        ? " ✅＋"
        : commons.length == 1
        ? " ✅"
        : "";
    },
    specialprocess: (input) => {
      let title = "";
      let description = "";
      let numToGet = 0;
      let newcontent = input.log.content;
      const c = tools.getCharacter(input.data.characters, input.word);
      if (c == "multiple")
        description =
          input.word +
          "は複数のキャラに使用されています。表記を変更してお試しください。";
      else if (!c)
        description =
          input.word +
          "はデータにありませんでした。表記を変更してお試しください。";
      else {
        const a = input.data.characters.find(
          (cc) => cc.id == input.log.content.split(" ")[2]
        );
        title = tools.emj(c) + c.name + (a.id == c.id ? "⭕" : "❌");
        description =
          a.id == c.id
            ? "正解！ ❕証拠品 ×50 を獲得しました。\n新しい解答キャラクターが設定されました。"
            : "残念！ 解答キャラクターと一致しませんでした。";
        if (a.id == c.id) {
          const targets = input.data.characters
            .filter((cc) => cc.genre == "stTm" && cc.id !== a.id)
            .map((cc) => cc.id);
          const newcontentarray = input.log.content.split(" ");
          newcontentarray[2] =
            targets[Math.floor(Math.random() * targets.length)];
          newcontent = newcontentarray.join(" ");
          numToGet = 50;
        }
      }
      return {
        title: title,
        description: description,
        itemToGetIndex: 0,
        numToGet: numToGet,
        newcontent: newcontent,
      };
    },
    endprocess: async (input) => {
      const logch = input.client.channels.get(exports.speciallog);
      const logs = await logch.fetchMessages({ limit: 100 });
      const log = await logs.find((m) =>
        m.content.includes(input.message.author.id + " MYSTERY")
      );
      log.delete();
    },
  },

  { id: "PSEUDO", name: "偽者だらけのエイプリル・フーリング", shortname: "エイプリル・フーリング",
    emoji: "🤥", color: 0xffa0ff,
    idTail: "嘘", nameTail: "(嘘)", nnprefix: ["嘘", "うそ", "偽", "にせ", "えいぷりる", "えいぷりるふーる"],
    //start: "2022-04-01", end: "2022-04-01", (初回開催)
    start: "2023-04-01", end: "2023-04-01",
    description:
      "4月1日はうそつきの祭典！ 学園内のそこかしこに現れる視界の乱れ・偽者の影！ もう幻覚だらけでメチャクチャなんですけど、これちゃんと今日中にきれいに終わるんでしょうね！？\n■復刻！(初開催：2022/4/1)",
    descriptionP:
      "身長に4か8が含まれるカードか当イベントカードを引くと【🗿まぼろし】を獲得することができます。(当イベントカードであれば1つ多く獲得)\n【🗿まぼろし】を集めると、イベントSHOP：「！ぺしい」にて《蔵前整(嘘)》と交換できます。\n【注】《蔵前整(嘘)》を除く当イベントカードは4月1日限定実装となり、イベント終了とともに失われます。\n\n" +
      "また、プレイヤーごとに自動的に「幻覚モデル」のカードが設定されます。当イベントカードを除き、プレイ中はカード名のうち「幻覚モデル」のキャラクター名・読み仮名で使われている字が別の字に変わってしまいます。\n「幻覚モデル」がわかったとき「！ぺい　(カード名)」で回答を行うと、【🗿まぼろし】を150個獲得し「幻覚モデル」が再設定されます。",
    descriptionG:
      //"【4月1日限定実装】のカードあり！\n⭐0・⭐5・SECRET確率上昇中！",
      "【4月1日限定実装】のカードあり！",
    giftids: ["くらまえ嘘"], //交換用にガチャから除外すべきid
    pickup: (characters, log) => characters.filter(c => c.eventid && c.eventid == "PSEUDO")
                                           .map(c => [ c.id, 0.1 / characters.filter(cc => cc.rarity == c.rarity && cc.eventid && cc.eventid == "PSEUDO").length]),
    filtering: (cards, Tcards, fcard) => [
      cards.filter(c => (c.cm && String(c.cm).match(/4|8/)) || (c.eventid && c.eventid == "PSEUDO")),
    ], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [{ emoji: "🗿", name: "🗿まぼろし", over: 3 }],
    shoplist: [
      { id: "totono", name: "うそととの", title: "🤥カ交ドー換",
        description: "アテイムーカドと🗿を交で換きる。\n対象：🐚蔵前整(嘘)",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 300,
        itemToGet: "card", cardidToGet: "くらまえ嘘" },
    ],
    startprocess: async (input) => {
      const targets = await input.data.characters.filter(c => c.genre == "stTm").map(c => c.id);
      const answerId = targets[Math.floor(Math.random() * targets.length)];
      input.client.channels.get(exports.speciallog).send(input.message.author.id + " PSEUDO " + answerId);
    },
    editprocess: (input) => {
      const answer = input.data.characters.find(cc => cc.id == input.log.content.split(" ")[2]).kana
                   + input.data.characters.find(cc => cc.id == input.log.content.split(" ")[2]).name.replace("・", "");
      const linelist = input.description.split("\n");
      const linestop = linelist.findIndex((line) => line.includes("得点計算"));
      const linelistnew = linelist.map((line, index) => {
        if (index < linestop && !line.match(/\(嘘\)|ガッテン/)) {
          const mojilist = line.split("");
          const mojistop = mojilist.findIndex((moji) => moji.match(/\s|\[|\(/));
          const mojilistnew = mojilist.map((moji, index) => {
            if ( (mojistop == -1 || index < mojistop) && answer.includes(tools.hiraganize(moji)) ) {
              return String.fromCharCode(moji.charCodeAt() + Math.floor(Math.random() * 3 + 1) * (Math.random() < 0.5 ? 1 : -1));
            }
            else return moji;
          });
          return mojilistnew.join("");
        } else return line;
      });
      return linelistnew.join("\n");
    },
    specialprocess: (input) => {
      let title = "";
      let description = "";
      let numToGet = 0;
      let newcontent = input.log.content;
      const c = tools.getCharacter(input.data.characters, input.word);
      if(c=="multiple") description=input.word+"は複数のキャラに使用されています。表記を変更してお試しください。";
      else if(!c) description=input.word+"はデータにありませんでした。表記を変更してお試しください。";
      else{
        const a = input.data.characters.find(cc => cc.id==input.log.content.split(" ")[2]);
        title = tools.emj(c) + c.name + (a.id == c.id ? "⭕" : "❌");
        description = a.id == c.id ? "正解だ！ では次の幻覚でまた\n\n🗿まぼろし ×150 を獲得しました。\n新しい幻覚モデルが設定されました。"
                                   : "はは。残念、不正解です\n\n幻覚モデルと一致しませんでした。";
        if (a.id == c.id) {
          const targets = input.data.characters.filter(cc => cc.genre == "stTm" && cc.id !== a.id).map(cc => cc.id);
          const newcontentarray = input.log.content.split(" ");
          newcontentarray[2] = targets[Math.floor(Math.random() * targets.length)];
          newcontent = newcontentarray.join(" ");
          numToGet = 150;
        }
      }
      return {
        title: title,
        description: description,
        itemToGetIndex: 0,
        numToGet: numToGet,
        newcontent: newcontent,
      };
    },
    endprocess:(input) => {
      const resulttext=[];
      //コンプリート
      const complete = ["くらまえ", "たつがみ", "ぎんがじ", "たかやま", "はなてん", "おおとり"
      ].every(ecard => input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "嘘5")
                    || input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "嘘7") );
      if(complete){ input.logitems[2] = Number(input.logitems[2])+2;
                    resulttext.push('イベントカード全MAXボーナス 💍×2 を獲得しました！');
                  };
      
      input.ploga[8] = input.ploga[8].replace(/\s(kた|bぎ|rた|iは|vお)嘘\d/g, "");
      
      input.splog.delete();
      //結果
      return {ploga:input.ploga, logitems:input.logitems,
              ps:"\n楽しんでくれましたか？ まあどちらでもいいですけど。"
              +(resulttext.length>0?"\n"+resulttext.join('\n'):"")};
    },
  },

  { id: "SPORTS", name: "走れ！ 東京マギリンピック", shortname: "東京マギリンピック",
    emoji: "🥇", color: 0xccad00,
    idTail: "体", nameTail: "(体育祭)", nnprefix: ["体育祭", "たいいくさい", "すぽーつ", "まぎりんぴっく"],
    description:
      "体育祭だー！！ 魔法学園にも体育祭は、ある！\n今回は一風変わったエキシビション開催？ 赤白両組にて特設された、首席を擁する選抜チームどうしのジャンル無用の勝負が始まる──。",
    descriptionP:
      "「赤組」のカードを引くと【🟥赤組p】、「白組」のカードを引くと【⬜白組p】、魔対科か魔装科のカードを引くと【👟運動p】を獲得することができます。(それぞれ当イベントカードであれば1つ多く獲得)\nそれぞれを集めると、イベントSHOP：「！ぺしい」にて限定カードと交換できます。",
    descriptionG:
      "イベント限定カードあり〼\n所属組カード確率上昇中！ 所属組確認は「！ぺい　組」などから！",
    start: "2022-06-10",
    end: "2022-06-24",
    giftids: ["でぃあな体", "りこおっ体", "すばるす体"], //交換用にガチャから除外すべきid
    pickup: (characters, log) =>
      characters
        .filter((c) => c.eventid && c.eventid == "SPORTS")
        .map((c) =>
          (log.content.includes("赤") && c.tag.includes("赤組")) ||
          (log.content.includes("白") && c.tag.includes("白組"))
            ? [
                c.id,
                0.1 /
                  characters.filter(
                    (cc) =>
                      cc.rarity == c.rarity &&
                      cc.eventid &&
                      cc.eventid == "SPORTS"
                  ).length,
              ]
            : [
                c.id,
                0.01 /
                  characters.filter(
                    (cc) =>
                      cc.rarity == c.rarity &&
                      cc.eventid &&
                      cc.eventid == "SPORTS"
                  ).length,
              ]
        ),
    filtering: (cards, Tcards) => [
      [...cards, ...Tcards].filter(
        (c) => c.tag.includes("赤組") || c.id == "すばるす体"
      ),
      [...cards, ...Tcards].filter(
        (c) => c.tag.includes("白組") || c.id == "すばるす体"
      ),
      [...cards, ...Tcards].filter(
        (c) => c.major == "魔対" || c.major == "魔装"
      ),
    ], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [
      { emoji: "🟥", name: "🟥赤組p", over: 100 },
      { emoji: "⬜", name: "⬜白組p", over: 100 },
      { emoji: "👟", name: "👟運動p", over: 30 },
    ],
    shoplist: [
      {
        id: "diana",
        name: "たいいくさいでぃあな",
        title: "🥇カード交換(赤)",
        description:
          "🟥赤組pとカードを交換できる。\n対象：ディアナ・ミツルギ(体育祭)",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 20,
        itemToGet: "card",
        cardidToGet: "でぃあな体",
      },
      {
        id: "lyco",
        name: "たいいくさいりこ",
        title: "🥇カード交換(白)",
        description:
          "⬜白組pとカードを交換できる。\n対象：リコ・オットー(体育祭)",
        itemToLose: "eventitem",
        itemToLoseIndex: 1,
        numToLose: 20,
        itemToGet: "card",
        cardidToGet: "りこおっ体",
      },
      {
        id: "suisei",
        name: "たいいくさいすいせい",
        title: "🥇カード交換(運)",
        description: "👟運動pとカードを交換できる。\n対象：昴彗星(体育祭)",
        itemToLose: "eventitem",
        itemToLoseIndex: 2,
        numToLose: 150,
        itemToGet: "card",
        cardidToGet: "すばるす体",
      },

      {
        id: "cashr",
        name: "換金",
        title: "換金",
        description: "🟥赤組pを換金できる。",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 50,
        itemToGet: "coin",
        numToGet: 5000,
      },
      {
        id: "cashw",
        name: "換金",
        title: "換金",
        description: "⬜白組pを換金できる。",
        itemToLose: "eventitem",
        itemToLoseIndex: 1,
        numToLose: 50,
        itemToGet: "coin",
        numToGet: 5000,
      },
      {
        id: "cashs",
        name: "換金",
        title: "換金",
        description: "👟運動pを換金できる。",
        itemToLose: "eventitem",
        itemToLoseIndex: 2,
        numToLose: 100,
        itemToGet: "coin",
        numToGet: 3000,
      },
      {
        id: "envs",
        name: "封筒",
        title: "🧧封筒",
        description: "👟運動pと封筒を交換できる。",
        command: "「！ぺがす」",
        itemToLose: "eventitem",
        itemToLoseIndex: 2,
        numToLose: 200,
        itemToGet: "envelope",
        numToGet: 1,
      },
      {
        id: "invs",
        name: "招待券",
        title: "🎟️招待券",
        description: "👟運動pと招待券を交換できる。",
        command: "「！ぺよ (キャラ名)」",
        itemToLose: "eventitem",
        itemToLoseIndex: 2,
        numToLose: 2000,
        itemToGet: "invite",
        numToGet: 1,
      },
    ],
    startprocess: async (input) => {
      const logch = input.client.channels.get(exports.speciallog);
      const logs = await logch.fetchMessages({ limit: 100 });
      const logRnum = logs
        .map((l) => l.content)
        .filter((m) => m.includes("SPORTS 赤")).length;
      const logWnum = logs
        .map((l) => l.content)
        .filter((m) => m.includes("SPORTS 白")).length;

      const team =
        input.message.member &&
        input.message.member.displayName.match(/(赤|白)組?$/)
          ? input.message.member.displayName.match(/赤組?$/)
            ? "赤"
            : "白"
          : logRnum < logWnum
          ? "赤"
          : logRnum > logWnum
          ? "白"
          : Math.random() < 0.5
          ? "赤"
          : "白";
      logch.send(input.message.author.id + " SPORTS " + team);
    },
    specialprocess: (input) => {
      const team = input.log.content.split(" ")[2];
      const teaminfo = {
        ["赤"]: ["🟥赤", "👹🥊🏁", "白"],
        ["白"]: ["⬜白", "🔫☀️🎮🦇", "赤"],
      };
      return {
        title:
          (input.message.member
            ? input.message.member.displayName
            : input.message.author.username) +
          "：" +
          teaminfo[team][0] +
          "組 です！",
        description:
          "確率高：" +
          teaminfo[team][1] +
          "\n確率低：" +
          teaminfo[teaminfo[team][2]][1],
      };
    },
    endlogprocess: (input) => {
      const complete = [
        "でぃあな",
        "おにこう",
        "ぬのしだ",
        "れいちぇ",
        "りこおっ",
        "いちぎん",
        "はちおう",
        "まだらめ",
        "ひびきこ",
        "すばるす",
      ].every(
        (ecard) =>
          input.ploga[8].includes(ecard + "体:5") ||
          input.ploga[8].includes(ecard + "体:7")
      );
      if (complete) input.logitems[2] = Number(input.logitems[2]) + 2;
      return {
        ploga: input.ploga,
        logitems: input.logitems,
        ps:
          "\n「よく走り切った！ しっかり見ていたぞ、お疲れ様！」" +
          (complete
            ? "\nイベントカード全MAXボーナス 💍×2 を獲得しました！"
            : ""),
      };
    },
    endprocess: async (input) => {
      const logch = input.client.channels.get(exports.speciallog);
      const logs = await logch.fetchMessages({ limit: 100 });
      const log = await logs.find((m) =>
        m.content.includes(input.message.author.id + " SPORTS")
      );
      log.delete();
    },
  },

  { id: "DANCE", name: "東京マジカルダンスナイト", shortname: "ダンスナイト",
    emoji: "💃", color: 0xd8c0ff,
    idTail: "踊", nameTail: "(ダンス)", nnprefix: ["だんす"],
    start: "2022-07-18", end: "2022-07-30",
    description:
      "魔法のダンスパーティー開催。いつもと違う、知らなかったあの子/あいつ/あのひとの姿。手を取り合って、特別な夜を楽しもう。",
    descriptionP:
      "お気に入りに設定したカードと共通点(クラス・部活・委員会類・寮室)かプラス縁のあるカード、または当イベントカードを引くと【👞ダンスp】を獲得することができます。(当イベントカードであれば1つ多く獲得)\n18時～22時の「パーティータイム」では獲得できる【👞ダンスp】が通常の2倍になります。\n【👞ダンスp】を集めると、イベントSHOP：「！ぺしい」にて《入賀怜央(ダンス)》、あるいはアイテム類と交換できます。",
    descriptionG:
      "イベント限定カードあり〼\nイベント教師カード確率上昇！\n※イベントガチャは封筒非対応です。",
    giftids: ["いりがれ踊"], //交換用にガチャから除外すべきid
    pickup: (characters, log) =>
      characters
        .filter((c) => c.genre == "tcTm" && c.eventid && c.eventid == "DANCE")
        .map((c) => [
          c.id,
          0.8 /
            characters.filter(
              (cc) =>
                cc.rarity == c.rarity &&
                cc.genre == "tcTm" &&
                cc.eventid &&
                cc.eventid == "DANCE"
            ).length,
        ]),
    filtering: (cards, Tcards, fcard) => [
      [...cards, ...Tcards].filter(
        (c) =>
          (fcard &&
            ((c.major &&
              fcard.major &&
              c.major == fcard.major &&
              ((c.grade && fcard.grade && c.grade == fcard.grade) ||
                c.genre == "tcTm")) ||
              (c.club &&
                fcard.club &&
                c.club
                  .split(" ")
                  .some((club) => fcard.club.split(" ").includes(club))) ||
              (c.committee &&
                fcard.committee &&
                c.committee == fcard.committee) ||
              (c.roomid && fcard.roomid && c.roomid == fcard.roomid) ||
              (c.relation.split(" - ")[0].length > 0 &&
                fcard.nickname.split(/\/|\s-\s/).filter((nn) => nn).length &&
                c.relation
                  .split(" - ")[0]
                  .split("/")
                  .some((rl) =>
                    fcard.nickname.split(/\/|\s-\s/).includes(rl)
                  )) ||
              (fcard.relation.split(" - ")[0].length > 0 &&
                c.nickname.split(/\/|\s-\s/).filter((nn) => nn).length &&
                fcard.relation
                  .split(" - ")[0]
                  .split("/")
                  .some((rl) => c.nickname.split(/\/|\s-\s/).includes(rl))))) ||
          (c.eventid && c.eventid == "DANCE")
      ),
    ], //PENTAでアイテム獲得対象となるカードをフィルタリング
    eventitemmul: (input) => {
      const hours = input.date.getHours();
      return 18 <= hours && hours < 22 ? 2 : 1;
    },
    item: [{ emoji: "👞", name: "👞ダンスp", over: 30 }],
    shoplist: [
      {
        id: "reo",
        name: "だんす入賀",
        title: "💃カード交換",
        description: "👞ダンスpとカードを交換できる。\n対象：入賀怜央(ダンス)",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 70,
        itemToGet: "card",
        cardidToGet: "いりがれ踊",
      },

      {
        id: "cash",
        name: "換金",
        title: "換金",
        description: "👞ダンスpを換金できる。",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 50,
        itemToGet: "coin",
        numToGet: 1500,
      },
      {
        id: "env",
        name: "封筒",
        title: "🧧封筒",
        description: "👞ダンスpと封筒を交換できる。",
        command: "「！ぺがす」",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 200,
        itemToGet: "envelope",
        numToGet: 1,
      },
      {
        id: "inv",
        name: "招待券",
        title: "🎟️招待券",
        description: "👞ダンスpと招待券を交換できる。",
        command: "「！ぺよ (キャラ名)」",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 1000,
        itemToGet: "invite",
        numToGet: 1,
      },
    ],
    endlogprocess: (input) => {
      const complete = [
        "いりがれ",
        "なすしゅ",
        "たまえろ",
        "やなぎき",
        "ありすが",
        "くろえめ",
        "くどうよ",
        "じゅうそ",
        "のたゆめ",
        "あんなか",
        "ふじわら",
      ].every(
        (ecard) =>
          input.ploga[8].includes(ecard + "踊:5") ||
          input.ploga[8].includes(ecard + "踊:7")
      );
      if (complete) input.logitems[2] = Number(input.logitems[2]) + 3;
      return {
        ploga: input.ploga,
        logitems: input.logitems,
        ps:
          "\n「なかなか面白い催しだった。……君も楽しめたようだね」" +
          (complete
            ? "\nイベントカード全MAXボーナス 💍×3 を獲得しました！"
            : ""),
      };
    },
  },

  { id: "BEACH", name: "夏だ！ 海だ！ 黄金のトレジャー・ビーチ", shortname: "黄金のトレジャー・ビーチ",
    emoji: "🏖️", color: 0x00b0ff,
    idTail: "海", nameTail: "(海)", nnprefix: ["海", "うみ", "びーち"],
    start: "2022-08-15", end: "2022-08-31",
    description:
      "海だ～っ！！ 青い水平線、白い波しぶき、そして広がる黄金の砂浜。ここに開催されるは夢の宝探し大作戦！！ 浜辺に隠された魔法の宝箱を探し出し、ちょっといいもの手に入れちゃおう！ もちろんバナナ寮による海の家だってやってます。それでは皆様、ナイスバナナサマー！！",
    descriptionP:
      "黄寮のカード、もしくは当イベントカードを2枚以上引くとイベント限定エピソード📖『🏖️宝探し』が発動し、浜辺からランダムなアイテムを獲得します：【💠シーグラス】【🪵流木】【🍌バナナの皮】【🎁宝箱】\nイベントSHOP「🍌バナナ寮・海の家」：「！ぺしい」では《遠藤嵐歩(海)》、あるいはアイテム類の交換ができるほか、特別価格でアイテムを購入することもできます。\n\nまた、【🎁宝箱】を持っているときに限り、宝箱を開けるための「キーワード」を利用することができます。「キーワード」は主に夏に関連する3～4文字のひらがなで設定されています。\n「キーワード」に含まれる文字がキャラクター名の読みに含まれている場合、「キーワード」の何文字目が含まれているかがカード名の末尾に表示されます。カード名がカナ表記である場合は該当字が塗り潰されます。\n「キーワード」がわかったとき、「！ぺい　(キーワード)」で回答を行うと【🎁宝箱】を開錠してランダムなお宝を獲得することができます：🪙💠🎫🎟️💍",
    descriptionG: "イベント限定カードあり〼",
    giftids: ["えんどう海"], //交換用にガチャから除外すべきid
    pickup: (characters, log) => {},
    filtering: (cards, Tcards, fcard) => [[], [], [], []], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [
      { emoji: "💠", name: "💠シーグラス", over: 120 },
      { emoji: "🪵", name: "🪵流木", over: 80 },
      { emoji: "🍌", name: "🍌バナナの皮", over: 1 },
      { emoji: "🎁", name: "🎁宝箱", over: 30 },
    ],
    shopname: "🍌バナナ寮・海の家",
    shopserifu: () => {
      const serifulist = [
        { id: "えんどう", text: "よう！ちゃんとお宝、持ってきたか？どっさり持ってくれば、褒美にいいもんくれてやるぜ……なんてな！" },
        { id: "えんどう", text: "いらっしゃ～い、安いよ安いよ～。チョコバナナにフローズンバナナ、バナナ焼きそばもあるよ～。　……ん？なんだ最後の？誰か知ってる？" },
        { id: "ぎんがじ", text: "楽しんでるかよ？　激アツの海をよォ！　ま、少しばかり休憩してきなよ、ゆったりローテンポな曲を流しとくからよ" },
        { id: "ぎんがじ", text: "よ～ぉ、なんかいいモン見つけたかよ。掘り出しモン置いてあっからよォ、取引といこうじゃねーの。安くしとくぜ、こっちはよ" },
        { id: "ちょうこ", text: "砂浜、宝物見つけた？ 水飲んだ？ 今年の夏は1回ね、しっかりで楽しみましょ！" },
        { id: "ちょうこ", text: "はいいらっしゃいね！ わたし腕振るってるわ、どんどん食べると好いね！ ジュースも冷えてる～" },
      ];
      return serifulist[Math.floor(Math.random() * serifulist.length)];
    },
    shoplist: [
      {
        id: "rampo",
        name: "海嵐歩",
        title: "🏖️カード交換",
        description: "💠シーグラスとカードを交換できる。\n対象：遠藤嵐歩(海)",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 100,
        itemToGet: "card",
        cardidToGet: "えんどう海",
      },

      {
        id: "cashs",
        name: "シーグラス換金",
        title: "換金",
        description: "💠シーグラスを換金できる。",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 20,
        itemToGet: "coin",
        numToGet: 2400,
      },
      {
        id: "cashw",
        name: "流木換金",
        title: "換金",
        description: "🪵流木を換金できる。",
        itemToLose: "eventitem",
        itemToLoseIndex: 1,
        numToLose: 20,
        itemToGet: "coin",
        numToGet: 1600,
      },

      {
        id: "jwls",
        name: "宝珠交換",
        title: "💍宝珠交換",
        description: "💠シーグラスと宝珠を交換できる。",
        command: "「！ぺえ (キャラ名)」",
        itemToLose: "eventitem",
        itemToLoseIndex: 0,
        numToLose: 100,
        itemToGet: "jewel",
        numToGet: 1,
      },
      {
        id: "jwl",
        name: "宝珠",
        title: "💍宝珠",
        description: "「海の家」特別価格。",
        command: "「！ぺえ (キャラ名)」",
        itemToLose: "coin",
        numToLose: 40000,
        itemToGet: "jewel",
        numToGet: 1,
      },
      {
        id: "env",
        name: "封筒",
        title: "🧧封筒",
        description: "「海の家」特別価格。",
        command: "「！ぺがす」",
        itemToLose: "coin",
        numToLose: 5000,
        itemToGet: "envelope",
        numToGet: 1,
      },
      {
        id: "inv",
        name: "招待券",
        title: "🎟️招待券",
        description: "「海の家」特別価格。",
        command: "「！ぺよ (キャラ名)」",
        itemToLose: "coin",
        numToLose: 80000,
        itemToGet: "invite",
        numToGet: 1,
      },
    ],
    startprocess: async (input) => {
      const keywords = [
        //自然・生物
        "ひざし",
        "ひなた",
        "ひかげ",
        "すなはま",
        "たいよう",
        "さかな",
        "くらげ",
        "ひとで",
        "ほたる",
        "かいがら",
        "きんぎょ",
        "ひまわり",
        "あさがお",
        //飲食
        "そうめん",
        "とまと",
        "きゅうり",
        "すいか",
        "あいす",
        "こおり",
        "わたあめ",
        "やきそば",
        "そーだ",
        "らむね",
        "むぎちゃ",
        //活動・物品等
        "はだし",
        "ひやけ",
        "ひがさ",
        "みずぎ",
        "ぷーる",
        "くろーる",
        "うきわ",
        "ぱらそる",
        "はなび",
        "おぼん",
        "まつり",
        "うちみず",
        "さんだる",
        "ゆかた",
        "うちわ",
        "ふうりん",
      ];
      const keyword = keywords[Math.floor(Math.random() * keywords.length)];
      input.client.channels
        .get(exports.speciallog)
        .send(input.message.author.id + " BEACH " + keyword);
    },
    editprocess: (input) => {
      if (
        Number(input.oldploga[3].split(":")[5].split("/")[1].split(" ")[3]) > 0
      ) {
        //🎁宝箱がある
        const answer = input.log.content.split(" ")[2];
        const linelist = input.description.split("\n");
        const linestop = linelist.findIndex((line) =>
          line.includes("得点計算")
        );
        const linelistnew = linelist.map((line, index) => {
          if (index < linestop && !line.match(/ガッテン/)) {
            const mojilist = line.split("");
            const mojistop = mojilist.findIndex((moji) =>
              moji.match(/\s|\[|\(/)
            );
            const mojilistnew = mojilist.map((moji, index) => {
              if (
                (mojistop == -1 || index < mojistop) &&
                answer.includes(tools.hiraganize(moji))
              ) {
                return "█";
              } else return moji;
            });
            return mojilistnew.join("");
          } else return line;
        });
        return linelistnew.join("\n");
      } else return input.description; //🎁宝箱がない
    },
    markprocess: (input) => {
      if (
        Number(input.oldploga[3].split(":")[5].split("/")[1].split(" ")[3]) > 0
      ) {
        //🎁宝箱がある
        const answer = input.log.content.split(" ")[2];
        const commonsnum = answer
          .split("")
          .filter((moji) => input.c.kana.includes(moji)).length;
        return answer
          .split("")
          .map((moji, index) =>
            input.c.kana.includes(moji) ? tools.nemj(index + 1) : ""
          )
          .join("");
      } else return ""; //🎁宝箱がない
    },
    specialprocess: (input) => {
      const o = { title: "", description: "", newcontent: input.log.content };

      if (
        Number(input.ploga[3].split(":")[5].split("/")[1].split(" ")[3]) < 1
      ) {
        //🎁宝箱がない
        o.title = "🎁宝箱がありません！";
        o.description =
          "📖『🏖️宝探し』などで🎁宝箱を入手すると開錠に挑戦できます。";
      } else {
        //🎁宝箱がある キーワード合致確認
        const answer = input.log.content.split(" ")[2];
        if (answer == input.word) {
          o.title = "🎁開錠成功！⭕";
          o.itemToLoseIndex = 3;
          o.numToLose = 1;
          const giftlist = [
            { title: "🪙コイン", prob: 0.2, itemToGet: "coin", numToGet: 7777 },
            {
              title: "💠シーグラス",
              prob: 0.45,
              itemToGet: "eventitem",
              itemToGetIndex: 0,
              numToGet: 20,
            },
            {
              title: "🎫チケット",
              prob: 0.3,
              itemToGet: "ticket",
              numToGet: 7,
            },
            {
              title: "🎟️指名招待券",
              prob: 0.01,
              itemToGet: "invite",
              numToGet: 1,
            },
            { title: "💍宝珠", prob: 0.04, itemToGet: "jewel", numToGet: 1 },
          ];
          //ランダムガチャ
          let prob = 0;
          let gift;
          const randomnum = Math.random(); //0～0.99...が出る
          for (let i = 0; i < giftlist.length; i++) {
            prob += giftlist[i].prob;
            if (randomnum < prob) {
              gift = giftlist[i];
              break;
            }
          }

          //結果を反映
          o.itemToGet = gift.itemToGet;
          o.numToGet = gift.numToGet;
          if (gift.itemToGet == "eventitem")
            o.itemToGetIndex = gift.itemToGetIndex;
          o.description =
            "🎁宝箱の中から " +
            gift.title +
            "×" +
            gift.numToGet +
            " を入手しました。\n新しいキーワードが設定されました。";
          //新お題設定をここに書いてね
          const keywords = [
            //自然・生物
            "ひざし",
            "ひなた",
            "ひかげ",
            "すなはま",
            "たいよう",
            "さかな",
            "くらげ",
            "ひとで",
            "ほたる",
            "かいがら",
            "きんぎょ",
            "ひまわり",
            "あさがお",
            //飲食
            "そうめん",
            "とまと",
            "きゅうり",
            "すいか",
            "あいす",
            "こおり",
            "わたあめ",
            "やきそば",
            "そーだ",
            "らむね",
            "むぎちゃ",
            //活動・物品等
            "はだし",
            "ひやけ",
            "ひがさ",
            "みずぎ",
            "ぷーる",
            "くろーる",
            "うきわ",
            "ぱらそる",
            "はなび",
            "おぼん",
            "まつり",
            "うちみず",
            "さんだる",
            "ゆかた",
            "うちわ",
            "ふうりん",
          ];
          const newcontentarray = input.log.content.split(" ");
          newcontentarray[2] =
            keywords[Math.floor(Math.random() * keywords.length)];
          o.newcontent = newcontentarray.join(" ");
        } else {
          o.title = "🎁開錠失敗……❌";
          o.description = "残念！ キーワードと一致しませんでした。";
        }
      }
      return o;
    },
    endprocess: async (input) => {
      const logch = input.client.channels.get(exports.speciallog);
      const logs = await logch.fetchMessages({ limit: 100 });
      const log = await logs.find((m) =>
        m.content.includes(input.message.author.id + " BEACH")
      );
      log.delete();
    },
    endlogprocess: (input) => {
      const complete = [
        "えんどう",
        "ちょうこ",
        "ぎんがじ",
        "くろかわ",
        "じーたぶ",
        "ぺぺぽも",
        "とつかち",
        "まるがれ",
        "どうざん",
        "いるまき",
        "いかりや",
      ].every(
        (ecard) =>
          input.ploga[8].includes(ecard + "海:5") ||
          input.ploga[8].includes(ecard + "海:7")
      );
      if (complete) input.logitems[2] = Number(input.logitems[2]) + 3;
      return {
        ploga: input.ploga,
        logitems: input.logitems,
        ps:
          "\n「楽しかったか、お前ら！\nだがな、これで満足するなよ？\n来年は、もっと楽しい夏にするんだぜ！」" +
          (complete
            ? "\nイベントカード全MAXボーナス 💍×3 を獲得しました！"
            : ""),
      };
    },
  },

  { id: "CAMP", name: "山盛りカレーな林間キャンパーズ", shortname: "林間キャンパーズ",
    emoji: "⛺", color: 0x80C040,
    idTail: "山", nameTail: "(山)", nnprefix: ["山", "やま", "きゃんぷ"],
    start: "2022-09-12", end: "2022-09-25",
    description: "山、キャンプ、そして……カレー！　これぞいわゆる林間学校。各々テントを張り終えたら、そこは大自然の宿り。さて、それじゃあみんなで食事の時間だ！　何か困ったら大丈夫、教師陣のベースキャンプへ行ってみよう。",
    descriptionP: "イベント限定エピソード📖『⛺キャンプカレー』で、同科目が2枚揃うごとに科目に対応した具材🥚🥔🌶️🥕🍄🥬🦑🥩を調達できます。\n8回プレイするごとに調達できた具材を使ってカレーを作り、具材に応じた量の【😋満足p】を獲得することができます。\n【😋満足p】を集めると、イベントSHOP「🚩教師陣ベースキャンプ」：「！ぺしい」にて《竜王覚悟(山)》《リチャード・オットー(山)》、あるいはアイテム類と交換できます。",
    descriptionG: "イベント限定カードあり〼",
    giftids: ["りゅうお山", "りちゃー山"], //交換用にガチャから除外すべきid
    pickup: (characters, log) => {},
    filtering: (cards, Tcards, fcard) => [[]], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [{ emoji: "😋", name: "😋満足p", over: 200 }],
    shopname: "🚩教師陣ベースキャンプ",
    shoplist: [
      { id: "kakugo", name: "山覚悟", title: "⛺カード交換",
        description: "😋満足pとカードを交換できる。\n対象：竜王覚悟(山)",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 100,
        itemToGet: "card", cardidToGet: "りゅうお山" },
      { id: "richard", name: "山りちゃーど", title: "⛺カード交換",
        description: "😋満足pとカードを交換できる。\n対象：リチャード・オットー(山)",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 100,
        itemToGet: "card", cardidToGet: "りちゃー山" },
      { id: "jwl", name: "宝珠", title: "💍石探し",
        description: "😋満足pと💍宝珠を交換できる。",
        descriptionAfter: "山で不思議な力を感じる綺麗な石を見つけた。",
        command: "「！ぺえ (キャラ名)」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 100,
        itemToGet: "jewel", numToGet: 1 },
      { id: "inv", name: "招待券", title: "🎟️食事の時間",
        description: "😋満足pと🎟️招待券を交換できる。",
        descriptionAfter: "カレーの時間だ！ あのひとも呼んでこよう。",
        command: "「！ぺよ (キャラ名)」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 300,
        itemToGet: "invite", numToGet: 1 }
    ],
    markprocess: (input) => {
      return (input.c.major) ? ' '+tools.ReSymbolizeC(input.client, input.message, data.symbols, input.c.major, 'major', 'majoremj') : '';
    },
    endlogprocess:(input) => {
      const complete = ["りゅうお", "りちゃー",
                        "うつしみ", "りんあっ", "さなげな", "ふーかか",
                        "さいとう", "あさつき", "ささそう", "のーしゅ"
      ].every(ecard => input.ploga[8].includes(ecard + "山:5")
                    || input.ploga[8].includes(ecard + "山:7") );
      if(complete) input.logitems[2] = Number(input.logitems[2])+3;
      return {ploga:input.ploga, logitems:input.logitems,
              ps:(complete?"\nイベントカード全MAXボーナス 💍×3 を獲得しました！":"")};
    },
  },

  { id: "FESTIVAL", name: "東魔文化祭 出し物スタンプめぐり！", shortname: "文化祭スタンプめぐり",
    emoji: "🎪", color: 0xece106,
    idTail: "祭", nameTail: "(文化祭)", nnprefix: ["文化祭", "ぶんかさい"],
    start: "2022-10-03", end: "2022-10-16",
    description: "あちらもこちらも大わらわ、やってきたるは文化祭！ クラスへ部活へ駆け回り、全てのスタンプコンプせよ！ って、そんなんできる！？ と、とりあえず台紙は受付から！",
    descriptionP: "当イベントカードを引くと無条件で【🎶エンジョイp】を獲得できます。また、イベント限定エピソード📖『🎪スタンプラリー』で、寮室を除いた教室🚪の項目が出るたびに【🎶エンジョイp】を追加獲得できます。\nイベント期間中に初めて出た教室🚪には「🔅スタンプ」が捺され、スタンプが10個集まるごとにイベント終了時の特典が豪華になっていきます。\nまた、イベント期間中に5回出た教室🚪には「💮大スタンプ」が捺され、【🎶エンジョイp】を倍獲得できるようになります。\n「！ぺい　スタンプ」から、現在までに捺されたスタンプを確認することができます。\n【🎶エンジョイp】を集めると、イベントSHOP「🗳️正面玄関・文化祭受付」：「！ぺしい」にて《🎩ウド・アルファルファ(文化祭)》、あるいはアイテム類と交換できます。",
    descriptionG: "イベント限定カードあり〼",
    giftids: ["うどある祭"], //交換用にガチャから除外すべきid
    pickup: (characters, log) => {},
    filtering: (cards, Tcards, fcard) => [[...cards, ...Tcards].filter(c=>c.eventid&&c.eventid=='FESTIVAL')], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [{ emoji: "🎶", name: "🎶エンジョイp", over: 300 }],
    shopname: "🗳️正面玄関・文化祭受付",
    shoplist: [
      { id: "udo", name: "文化祭うど", title: "🎪カード交換",
        description: "🎶エンジョイpとカードを交換できる。\n対象：🎩ウド・アルファルファ(文化祭)",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 50,
        itemToGet: "card", cardidToGet: "うどある祭" },
      { id: "jwl", name: "宝珠", title: "💍アンケート評価",
        description: "🎶エンジョイpと💍宝珠を交換できる。",
        descriptionAfter: "良い文化祭だ！ 高評価をつけておこう。",
        command: "「！ぺえ (キャラ名)」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 50,
        itemToGet: "jewel", numToGet: 1 },
      { id: "tkt", name: "招待券", title: "🎫呼込係",
        description: "🎶エンジョイpと🎫ガチャチケット×100を交換できる。",
        descriptionAfter: "こんな出し物やってま～す！ ぜひお越しください！",
        command: "「！ぺが」 百連「！ぺがひ」\nイベント「！ぺがい」「！ぺがいひ」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 50,
        itemToGet: "ticket", numToGet: 100 },
      { id: "inv", name: "招待券", title: "🎟️待ち合わせ",
        description: "🎶エンジョイpと🎟️招待券を交換できる。",
        descriptionAfter: "あの人と一緒に文化祭を巡ろうかな。",
        command: "「！ぺよ (キャラ名)」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 100,
        itemToGet: "invite", numToGet: 1 }
    ],
    startprocess: async (input) => {
      const text = input.message.author.id + ' FESTIVAL'
                 + '\n'
                 + '生徒会：0/図書：0/美化：0/風紀：0/放送：0/保健：0'
                 + '\n'
                 + 'アーチェリー：0/映画研究：0/園芸：0/演劇：0/軽音楽：0/決闘：0/'
                 + '鉱物研究：0/裁縫：0/サッカー：0/茶道：0/写真：0/新聞：0/'
                 + '吹奏楽：0/調理：0/天文：0/ドロップボール：0/美術：0/文芸：0/'
                 + 'ボランティア：0/魔機工作：0/魔法チャトランガ：0/漫画研究：0/陸上：0/流星：0'
                 + '\n'
                 + '四素3年：0/四素2年：0/間法3年：0/間法2年：0/間法1年：0/'
                 + '魔対3年：0/魔対2年：0/魔対1年：0/魔動3年：0/魔動2年：0/魔動1年：0/'
                 + '魔視3年：0/魔視2年：0/魔視1年：0/魔装3年：0/魔装2年：0/魔装1年：0/'
                 + '魔変3年：0/魔変2年：0/魔変1年：0/魔魂3年：0/魔魂2年：0';
      await input.client.channels.get(exports.speciallog).send(text);
      return;
    },
    specialprocess: (input) => {
      if(input.word=='スタンプ'){
        const stamps = input.log.content.split('\n').slice(1).map(list=>
                         list.split('/').map(group=>
                           group.split('：').map(text=>text.match(/^\d+$/)?Number(text):text)
                         )
                       );
        const stampsnum = stamps.map(list=>list.filter(group=>group[1]>0).length).reduce((a,b)=>a+b);
        
        const results = [];
        const listtitles = ['委員会等', '部活', 'クラス'];
        const aliases = {['生徒会']:'役', ['図書']:'図', ['美化']:'美', ['風紀']:'風', ['放送']:'放', ['保健']:'保',
                         ['アーチェリー']:'ア', ['映画研究']:'映', ['園芸']:'園', ['演劇']:'演', ['軽音楽']:'軽', ['決闘']:'決',
                         ['鉱物研究']:'鉱', ['裁縫']:'裁', ['サッカー']:'サ', ['茶道']:'茶', ['写真']:'写', ['新聞']:'新',
                         ['吹奏楽']:'吹', ['調理']:'調', ['天文']:'天', ['ドロップボール']:'ド', ['美術']:'美', ['文芸']:'文',
                         ['ボランティア']:'ボ', ['魔機工作']:'機', ['魔法チャトランガ']:'チ', ['漫画研究']:'漫', ['陸上']:'陸', ['流星']:'流',
                         ['四素3年']:'四3', ['四素2年']:'四2', ['間法3年']:'間3', ['間法2年']:'間2', ['間法1年']:'間1',
                         ['魔対3年']:'対3', ['魔対2年']:'対2', ['魔対1年']:'対1', ['魔動3年']:'動3', ['魔動2年']:'動2', ['魔動1年']:'動1',
                         ['魔視3年']:'視3', ['魔視2年']:'視2', ['魔視1年']:'視1', ['魔装3年']:'装3', ['魔装2年']:'装2', ['魔装1年']:'装1',
                         ['魔変3年']:'変3', ['魔変2年']:'変2', ['魔変1年']:'変1', ['魔魂3年']:'魂3', ['魔魂2年']:'魂2' };
        stamps.forEach((list,index)=>{
          results.push('\n__▼'+listtitles[index]+'のスタンプ▼__');
          for(let i=0; i<Math.ceil(list.length/6); i++){
            results.push(list.slice(i*6, i*6+6).map(group => aliases[group[0]] + (group[1]==0?'➖':group[1]>=5?'💮':'🔅') ).join(' '));
          }
        });
        return {title:(input.message.member ? input.message.member.displayName : input.message.author.username) + ' のスタンプ帳('+stampsnum+'/52)',
                description:results.join('\n')};
      };
    },
    endprocess:(input) => {
      const resulttext=[];
      //コンプリート
      const complete = ["うどある", "かいぐり", "るーくろ", "わたべゆ",
                        "ひじかた", "そうまあ", "こんどう", "おきたひ", "ながくら",
                        "やなせこ", "ろーれん", "さとうこ", "みしぇる", "つのだか"
      ].every(ecard => input.ploga[8].includes(ecard + "祭:5")
                    || input.ploga[8].includes(ecard + "祭:7") );
      if(complete){ input.logitems[2] = Number(input.logitems[2])+3;
                    resulttext.push('イベントカード全MAXボーナス 💍×3 を獲得しました！');
                  };
      
      //スタンプ
      const stamps = input.splog.content.split('\n').slice(1).map(list=>
                       list.split('/').map(group=>
                         group.split('：').map(text=>text.match(/^\d+$/)?Number(text):text)
                       )
                     );
      const stampsnum = stamps.map(list=>list.filter(group=>group[1]>0).length).reduce((a,b)=>a+b);
      input.splog.delete();
      const rewards = [{num:10, iindex:0, iadd:20, text:'🔅スタンプ10個ボーナス 🎫×20 を獲得しました！'},
                       {num:20, iindex:0, iadd:80, text:'🔅スタンプ20個ボーナス 🎫×80 を獲得しました！'},
                       {num:30, iindex:4, iadd:5, text:'🔅スタンプ30個ボーナス 🎟️×5 を獲得しました！'},
                       {num:40, iindex:2, iadd:5, text:'🔅スタンプ40個ボーナス 💍×5 を獲得しました！'},
                       {num:50, iindex:6, iadd:5, text:'🔅スタンプ50個ボーナス 📑×5 を獲得しました！'},
                       {num:52, iindex:7, iadd:1, text:'🔅スタンプ52個ボーナス 🎗️×1 を獲得しました！'}];
      rewards.forEach(r=>{
        if(r.num<=stampsnum){
          input.logitems[r.iindex] = Number(input.logitems[r.iindex])+r.iadd;
          resulttext.push(r.text);
        }
      });
      
      //結果
      return {logitems:input.logitems,
              ps:"\n「ああ、楽しかった！　この僕も久々に羽目を外して楽しんでしまったよ。君はどうだい？　……その顔を見れば一目瞭然、か！」"
              +(resulttext.length>0?"\n"+resulttext.join('\n'):"")};
    },
  },

  { id: "HALLOWEEN", name: "誰そ彼！？ ジャックと仮装のパンデモニウム", shortname: "仮装のパンデモニウム",
    emoji: "🎃", color: 0xf28712,
    idTail: "菓", nameTail: "(ハロウィン)", nnprefix: ["はろうぃん", "はろうぃーん"],
    start: "2022-10-24", end: "2022-11-06",
    description: "ハロウィンに、仮装の魔物が跋扈する。魔物の手でみんな次々と装いを変えられて、学園はたちまち大騒ぎ！ これは──むしろアイディアの収穫祭だ！？ 特別な生地を織る魔物を打ち倒し、学園生活の平和を取り戻し、ついでに生地もいただいて、衣装デザインの参考にもしちゃおう！",
    descriptionP: "イベント限定エピソード📖『🎃仮装の魔物』によってランダムなカードが強制的に仮装させられ、名前・絵文字・効果名を書き換えられてしまいます。\n仮装させられたカードがわかったとき「！ぺい　(仮装名)　(カード名)」で回答を行うと魔物を退治することができ、【⬜魔法の生地】か【🍪クッキー】を獲得できます。\nまた、当イベントカードか美化委員のカードを引くと先んじて出会っていた魔物の分の【⬜魔法の生地】を譲ってもらえます。\n【⬜魔法の生地】【🍪クッキー】を集めると、イベントSHOP「👗被服室」：「！ぺしい」にて《🪡ウィスタリア・シューメイカー(ハロウィン)》、あるいはアイテム類と交換できます。",
    descriptionG: "イベント限定カードあり〼",
    giftids: ["うぃすた菓"], //交換用にガチャから除外すべきid
    pickup: (characters, log) => {},
    filtering: (cards, Tcards, fcard) => [[...cards, ...Tcards].filter(c=>c.committee=='美化'||(c.eventid&&c.eventid=='HALLOWEEN'))], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [{ emoji: "⬜", name: "⬜魔法の生地", over: 200 },
           { emoji: "🍪", name: "🍪クッキー", over: 500 },
           { emoji: "🎃", name: "🎃ジャックの頭", over: 500 }],
    inviteindex: 2,
    shopname: "👗被服室",
    shoplist: [
      { id: "wistaria", name: "ハロウィンウィスタリア", title: "🎃カード交換",
        description: "⬜魔法の生地とカードを交換できる。\n対象：🪡ウィスタリア・シューメイカー(ハロウィン)",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 180,
        itemToGet: "card", cardidToGet: "うぃすた菓" },
      { id: "jwl", name: "宝珠", title: "💍アクセサリー",
        description: "⬜魔法の生地と💍宝珠を交換できる。",
        descriptionAfter: "良い衣装には装飾品だって欠かせない。",
        command: "「！ぺえ (カード名)」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 200,
        itemToGet: "jewel", numToGet: 1 },
      { id: "jwl2", name: "宝珠", title: "💍アクセサリー",
        description: "🍪クッキーと💍宝珠を交換できる。",
        descriptionAfter: "良い衣装には装飾品だって欠かせない。",
        command: "「！ぺえ (カード名)」",
        itemToLose: "eventitem", itemToLoseIndex: 1, numToLose: 80,
        itemToGet: "jewel", numToGet: 1 },
      /*
      { id: "sc", name: "Spooky-Cookies", title: "🖼️Spooky-Cookies",
        description: "🍪クッキーと🖼️テーマを交換できる。",
        descriptionAfter: "おいしいクッキー、召し上がれ！",
        command: "「！ぺて」",
        itemToLose: "eventitem", itemToLoseIndex: 1, numToLose: 250,
        itemToGet: "theme" },
      { id: "do", name: "着せ替え人形", title: "📜着せ替え人形",
        description: "⬜魔法の生地と📜My効果を交換できる。",
        descriptionAfter: "せっかくの衣装、着てみない？",
        command: "「！ぺま」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 300,
        itemToGet: "episode" },*/
      { id: "jack", name: "ジャックの頭", title: "🎃ジャックの頭",
        description: "⬜魔法の生地と🎃ジャックの頭を交換できる。",
        descriptionAfter: "会いたい人に会える呪文があるとか……。",
        command: "「！ぺよ (カード名)」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 250,
        itemToGet: "eventitem", itemToGetIndex: 2, numToGet: 1, },
      { id: "jack2", name: "ジャックの頭", title: "🎃ジャックの頭",
        description: "🍪クッキーと🎃ジャックの頭を交換できる。",
        descriptionAfter: "会いたい人に会える呪文があるとか……。",
        command: "「！ぺよ (カード名)」",
        itemToLose: "eventitem", itemToLoseIndex: 1, numToLose: 100,
        itemToGet: "eventitem", itemToGetIndex: 2, numToGet: 1, }
    ],
    startprocess: async (input) => {
      const monsters = [{id:'al', emoji:'👽', name:'エイリアン'},{id:'sk', emoji:'🩻', name:'骸骨'},{id:'pi', emoji:'🏴‍☠️', name:'海賊'},{id:'pu', emoji:'🎃', name:'カボチャ'},
                        {id:'ph', emoji:'🎭', name:'怪人'},{id:'sp', emoji:'🕷️', name:'クモ'},{id:'bl', emoji:'🐈‍⬛', name:'黒猫'},{id:'zo', emoji:'🧟', name:'ゾンビ'},
                        {id:'do', emoji:'🪆', name:'人形'},{id:'so', emoji:'💂', name:'兵隊'},{id:'ge', emoji:'🧞', name:'魔人'},{id:'mu', emoji:'⚰️', name:'ミイラ'},
                        {id:'fa', emoji:'🧚', name:'妖精'},{id:'ro', emoji:'🤖', name:'ロボット'}];
      const targetids = [...new Set(input.ploga[8].split(/(?<=\d)/).map(c=>c.slice(0,2)))].map(sid=>input.data.characters.find(chr=>chr.sid&&chr.sid==sid).id);;
      
      const monstersR = tools.shufflenum(monsters, 8);
      const targetidsR = tools.shufflenum(targetids, 8);
      const monsterlist = [];
      for(let i=0; i<8; i++) monsterlist.push(monstersR[i].id+'：'+targetidsR[i]);
      
      const text = input.message.author.id + ' HALLOWEEN' + '\n' + monsterlist.join('\n');
      await input.client.channels.get(exports.speciallog).send(text);
      return;
    },
    specialprocess: (input) => {
      const o = { title: '', description: '', newcontent: input.log.content };
      let sploga = input.log.content.split('\n');
      
      if(input.command.length!==3){ o.description='コマンドが不足しています。'; return o;};
      
      const monsters = [{id:'al', score:15, emoji:'👽', name:'エイリアン', alias:['えいりあん', '宇宙人']},
                        {id:'sk', score:15, emoji:'🩻', name:'骸骨', alias:['骸骨', 'がいこつ']},
                        {id:'pi', score:15, emoji:'🏴‍☠️', name:'海賊', alias:['海賊', 'かいぞく']},
                        {id:'pu', score:30, emoji:'🎃', name:'カボチャ', alias:['かぼちゃ', '南瓜']},
                        {id:'ph', score:15, emoji:'🎭', name:'怪人', alias:['怪人', 'かいじん']},
                        {id:'sp', score:15, emoji:'🕷️', name:'クモ', alias:['くも', '蜘蛛']},
                        {id:'bl', score:15, emoji:'🐈‍⬛', name:'黒猫', alias:['黒猫', 'くろねこ']},
                        {id:'zo', score:15, emoji:'🧟', name:'ゾンビ', alias:['ぞんび']},
                        {id:'do', score:15, emoji:'🪆', name:'人形', alias:['人形', 'にんぎょう']},
                        {id:'so', score:15, emoji:'💂', name:'兵隊', alias:['兵隊', 'へいたい', '兵士', 'へいし']},
                        {id:'ge', score:15, emoji:'🧞', name:'魔人', alias:['魔人', '魔神', 'まじん']},
                        {id:'mu', score:15, emoji:'⚰️', name:'ミイラ', alias:['みいら']},
                        {id:'fa', score:15, emoji:'🧚', name:'妖精', alias:['妖精', 'ようせい']},
                        {id:'ro', score:15, emoji:'🤖', name:'ロボット', alias:['ろぼっと', 'ろぼ']}];
      
      const targetmonster = monsters.find(m=>m.alias.includes(tools.hiraganize(input.command[1].replace(/なぞの|謎の/, ''))));
      if(!targetmonster){ o.description = input.command[1]+' は存在しませんでした。表記が正確であるか確認して再度お試しください。'; return o;};
      const targetline = sploga.find(l=>l.split('：')[0]==targetmonster.id);
      if(!targetline){ o.description = 'なぞの'+targetmonster.name+' は現在出現していないようです。'; return o;};
      const c = tools.getCharacter(input.data.characters, input.command[2]);
      if(c=="multiple"){ o.description=input.command[2]+"は複数のキャラに使用されています。表記を変更してお試しください。"; return o;}
      else if(!c){ o.description=input.command[2]+"はデータにありませんでした。表記を変更してお試しください。イベント名等を付与している場合は外してお試しください。"; return o;};
      
      if(targetline.split('：')[1]==c.id){
        o.title = '⭕ ' + targetmonster.emoji + 'なぞの' + targetmonster.name + ' は ' + tools.emj(c) + c.name + ' だった！';
        const kiji = Math.random()<0.9;
        o.itemToGet = 'eventitem'; o.itemToGetIndex = kiji ? 0 : 1; o.numToGet = targetmonster.score;
        const monsterchoices = monsters.filter(m=>!sploga.some(l=>l.split('：')[0]==m.id));
        const newmonster = monsterchoices[Math.floor(Math.random()*monsterchoices.length)];
        const plogaids = [...new Set(input.ploga[8].split(/(?<=\d)/).map(c=>c.slice(0,2)))].map(sid=>input.data.characters.find(chr=>chr.sid&&chr.sid==sid).id);
        const charachoices = plogaids.filter(id=>!sploga.some(l=>l.split('：')[1]==id));
        const newchara = charachoices[Math.floor(Math.random()*charachoices.length)];
        sploga = sploga.filter(l=>!l.includes(c.id));
        o.description = '仮装させていた魔物の退治に成功！\n'
                      + (kiji ? '⬜魔法の生地' : '🍪クッキー')+' ×'+targetmonster.score+' を獲得しました。\n'
                      + '❗新たに '+newmonster.emoji+'なぞの'+newmonster.name+' が現れたようです。\n\n'
                      + '現在の魔物：'+sploga.slice(1).map(l=>monsters.find(m=>m.id==l.split('：')[0]).emoji).join('')+' ＋'+newmonster.emoji;
        sploga.push(newmonster.id+'：'+newchara);
        o.newcontent = sploga.join('\n');
      }
      else o.title = '❌ ' + targetmonster.emoji + 'なぞの' + targetmonster.name + ' は ' + tools.emj(c) + c.name + ' ではなかった……。';
      
      return o;
    },
    endprocess:(input) => {
      const resulttext=[];
      //コンプリート
      const complete = ["うぃすた", "まちだま", "ゆうじん", "あまみや", "みつばえ",
                        "えびちり", "ふらんち", "ごうとく", "にらいん", "におうぇ",
                        "きのした", "まりあう", "いばらき"
      ].every(ecard => input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "菓5")
                    || input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "菓7") );
      if(complete){ input.logitems[2] = Number(input.logitems[2])+3;
                    resulttext.push('イベントカード全MAXボーナス 💍×3 を獲得しました！');
                  };
      input.splog.delete();
      //結果
      return {logitems:input.logitems,
              ps:"\n🪡「と～～～～っても疲れたわ、正しく目の回るような忙しさだった。でも楽しかったわね。そうでしょ？」"
              +(resulttext.length>0?"\n"+resulttext.join('\n'):"")};
    },
  },

  { id: "QUIZ", name: "クイズの秋！ クラス対抗・東魔王決定戦", shortname: "東魔王決定戦",
    emoji: "🎓", color: 0x0ad8d8,
    idTail: "問", nameTail: "(Q)", nnprefix: ["くいず", "Q"],
    start: "2022-11-21", end: "2022-12-04",
    description: "「学園」、それは学びの園。学問の秋、クイズの秋、そう！ ここに開催されるはクイズ大会だ！ 主催・進行は生徒会、そして待ち受けるは史上最多正解数の「東魔王」！？ さあ、持てる知識の全てをぶつけろ！ 学習意欲を促進するのは良いことだって先生も言ってたぞ！ 多分。",
    descriptionP: "当イベントカードを引く、または後述のイベント限定エピソード📖の発動があると【💡解答p】を獲得することができます。【💡解答p】を集めると、イベントSHOP：「！ぺしい」にて《🖤天獄希(Q)》《🤡ピーター・ジェスター(Q)》あるいはアイテム類と交換できます。\n\n1) 📖『🎓問題！』\nクイズ登録のあるキャラを引くと進行度に応じた確率で発動し、DMにクイズが送信されます。\nDM上で「！ぺい　(キャラ名)　(回答)」で回答を行うと、難易度に応じた数の【💡解答p】を獲得できます。(かなor半角英数字)\n全てのクイズに回答し終えると回答済情報がリセットされ、再挑戦が可能になります。\n「！ぺい　確認」で回答状況を確認できます。\n\n2) 📖『🎓早押しクイズ』\n🚪クラスが出ていると発動し、ランダムな代表者が早押しクイズに挑戦します。学年・レアリティ等の条件に応じた確率で正解し、結果に応じた数の【💡解答p】を獲得できます。",
    descriptionG: "イベント限定カードあり〼",
    giftids: ["てんごく問", "ぴーたー問"], //交換用にガチャから除外すべきid
    pickup: (characters, log) => {},
    filtering: (cards, Tcards, fcard) => [[...cards, ...Tcards].filter(c=>c.eventid&&c.eventid=='QUIZ')], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [{ emoji: "💡", name: "💡解答p", over: 200 }],
    shoplist: [
      { id: "nozomu", name: "クイズ希", title: "🎓カード交換(王)",
        description: "💡解答pとカードを交換できる。\n対象：🖤天獄希(Q)",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 150,
        itemToGet: "card", cardidToGet: "てんごく問" },
      { id: "peter", name: "クイズピーター", title: "🎓カード交換(司会)",
        description: "💡解答pとカードを交換できる。\n対象：🤡ピーター・ジェスター(Q)",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 150,
        itemToGet: "card", cardidToGet: "ぴーたー問" },
      { id: "jwl", name: "宝珠", title: "💍宝珠",
        description: "💡解答pと💍宝珠を交換できる。",
        descriptionAfter: "",
        command: "「！ぺえ (カード名)」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 200,
        itemToGet: "jewel", numToGet: 1 },
      { id: "inv", name: "招待券", title: "🎟️招待券",
        description: "💡解答pと🎟️招待券を交換できる。",
        descriptionAfter: "",
        command: "「！ぺよ (キャラ名)」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 400,
        itemToGet: "invite", numToGet: 1 }
    ],
    startprocess: async (input) => {
      const text = input.message.author.id + ' QUIZ\n回答済み';
      await input.client.channels.get(exports.speciallog).send(text);
      return;
    },
    specialprocess: (input) => { //DMか確認。回答を受け付けて、回答済ログにidを追加するなどして スラッシュ区切りで あと未回答・回答済も確認したいな
      const o = { atitle: '', title: '', description: '', newcontent: input.log.content };
      
      const sploga = input.log.content.split('\n');
      let answeredids = sploga[1].split('/');
      const allsids = input.ploga[8].split(/(?<=\d)/).map(c=>c.slice(0,-1));
      const allcards = input.data.characters.filter(chr=>allsids.includes(chr.sid)); //所有カード
      const allQcards = allcards.filter(chr=>input.quizlist.some(q=>q[0]==chr.name)); //所有カードのうちクイズ持ちのカード
      const allQcardsYet = allQcards.filter(chr=>!answeredids.includes(chr.id)); //所有カードのうちクイズ持ちカードのうち未回答のカード
      
      if(input.command.length==2&&input.command[1].match(/^(確認|回答済み?)$/)){
        o.title = 'クイズの回答状況';
        o.description = '■回答済：'+(answeredids.length-1)+'問\n' + allQcards.filter(chr => answeredids.includes(chr.id)).map(chr=>tools.emj(chr)).join('') + '\n\n'
                      + '■未回答：' + allQcardsYet.length + '問\n'
                      + '■進行度：約'+Math.round(((allQcards.length-allQcardsYet.length)/allQcards.length)*100)+'%'//+' (出題確率 約'+Math.floor(100 - ( 10 * ( Math.ceil( allQcardsYet.length/allQcards.length*10 ) -1 ) * ( allQcards.length/allcards.length ) ))+'%)';
        return o;
      }
      else if(input.command.length==3){
        if(input.message.guild !== null){o.description='回答にはDMをご利用ください。'; return o;};
        if(!input.command[2].match(/^[ぁ-んー～〜0-9a-zA-Z]+$/)){o.description='回答が形式に沿っていません。\nひらがなor半角英数字になっているか再度ご確認ください。'; return o;};
        
        const c = tools.getCharacter(allcards, input.command[1]);
        if(c=="multiple"){ o.description=input.command[1]+"は複数のキャラに使用されています。表記を変更してお試しください。"; return o;}
        else if(!c){ o.description=input.command[1]+"は対象データにありませんでした。表記を変更してお試しください。イベント名等を付与している場合は外してお試しください。"; return o;};
        
        if(answeredids.includes(c.id)){ o.description=tools.emj(c)+c.name+"のクイズは既に回答済みです。"; return o; };
        const quizline = input.quizlist.find(q=>q[0]==c.name);
        if(!quizline){ o.description=tools.emj(c)+c.name+"のクイズはありませんでした。"; return o;};
        quizline[1] = quizline[1].replace(/⏎/g, '\n').split(/^問題【|】解答【|】解説【|】難易度【|】$/);
        const quiz = {a:quizline[1][2], x:quizline[1][3].split('←→'), d:Number(quizline[1][4])};

        const correct = (quiz.a==input.command[2]);
        const last = (allcards.filter(chr=>input.quizlist.some(q=>q[0]==chr.name)).length==answeredids.length);
        o.itemToGet = 'eventitem'; o.itemToGetIndex = 0;
        o.numToGet = !correct  ? quiz.d
                   : quiz.d==1 ? 10
                   : quiz.d==2 ? 20
                               : 50;
        o.atitle = tools.emj(c) + c.name + ' / 難易度：' + '⭐'.repeat(quiz.d);
        o.title = (correct ? '⭕' : '❌') + ' 正解は…… __' + quiz.a + '__';
        o.description = (!correct&&quiz.x.length>1 ? quiz.x[1] : quiz.x[0])
                      + '\n\n難易度' + quiz.d + 'の' + (correct?'正解':'挑戦') + '報酬：💡解答p ×' + o.numToGet + 'を獲得しました。'
                      + (last?'全クイズに回答したため、回答済み情報をリセットします。':'');

        if(last) answeredids = answeredids.slice(0,1)
        else answeredids.push(c.id);
        sploga[1] = answeredids.join('/');

        o.newcontent = sploga.join('\n');

        return o;
      }
      else{
        if(input.command.length!==3){ o.description='コマンドが不足しているか間違っています。'; return o;};
      };
    },
    endprocess:(input) => {
      const resulttext=[];
      //コンプリート
      const complete = ["てんごく", "ぴーたー", "のあまう", "くじょう", "あすかあ",
                        "ようはな", "とどろき", "いなさゆ", "ちゃーり", "ふるつき",
                        "てんろう", "おおとり", "どらこざ"
      ].every(ecard => input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "問5")
                    || input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "問7") );
      if(complete){ input.logitems[2] = Number(input.logitems[2])+3;
                    resulttext.push('イベントカード全MAXボーナス 💍×3 を獲得しました！');
                  };
      input.splog.delete();
      //結果
      return {logitems:input.logitems,
              ps:""
              +(resulttext.length>0?"\n"+resulttext.join('\n'):"")};
    },
  },

  { id: "XMAS", name: "年末大伐採！ デーモン・ツリー・クリスマス", shortname: "ツリー・クリスマス", raid:true,
    emoji: "🎄", color: 0xbe1c4a,
    idTail: "聖", nameTail: "(Xmas)", nnprefix: ["くりすます", "Xmas"],
    start: "2022-12-19", end: "2022-12-30",
    description: "あ、あれは一体！？ クリスマスの学園に聳え立った、4本のツリー……の魔物！？ 聞いたことがありマス、その年の厄が固まった凶悪な魔樹の話を！ 今年1年で培った全てをぶつけて、みんなで悪を祓いましょう！ こんなの、サンタの故郷では常識デース！！",
    descriptionP: "共通の敵となる「🎄魔樹」が設定され、全プレイヤーで討伐・報酬獲得を目指します。\n討伐を完了すると、討伐に参加したプレイヤー全員を対象に報酬【⭐スター】が配布されます。【⭐スター】を集めると、イベントSHOP「🎅魔樹討伐本部サンタ村」：「！ぺしい」にて《⛸ソフィア・エヴェリーナ・ミューリュライネン(Xmas)》《🪴左ユード(Xmas)》あるいはアイテム類と交換できます。\n現在の魔樹の討伐状況、弱点のヒントとなるプロフィールは「！ぺい　確認」から確認できます。\n\n1) ↗️🎄魔樹への攻撃：通常プレイ\n通常プレイ時に📖『🎄伐採レイド！』が必ず発動され、リザルトの合計点、魔樹の弱点となる効果発動のボーナスが計上された「💥攻撃」を魔樹に与えます。\nこのとき、発動者がお気に入りカードである場合は効果発動のボーナスが10倍になります。\n「💥攻撃」を受けた魔樹は「オーナメント🧦➿🍭🔔⭐」を落とすことがあります。\n\n2) ↗️🎄魔樹への攻撃：特殊操作\n持っている「オーナメント🧦➿🍭🔔⭐」は、「！ぺい　(オーナメント名)」で魔樹への「💥攻撃」に使用できます。\n魔樹の弱点となるオーナメント、あるいは【⭐スター】を用いた場合はダメージが5倍になります。\n「💥攻撃」を受けた魔樹は🪙コインを落とします。\n\n3) ⏬🎄魔樹からの攻撃\n生徒カードのドローが完了した時点で、一定確率で魔樹からの「💥攻撃」を受けます。\n「💥攻撃」の内容は魔樹によって異なります。",
    descriptionG: "イベント限定カードあり〼",
    giftids: ["そふぃあ聖", "ひだりゆ聖"], //交換用にガチャから除外すべきid
    pickup: (characters, log) => {},
    filtering: (cards, Tcards, fcard) => [[],[],[],[],[]], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [{ emoji: "🧦", name: "🧦ソックス", over: 200 },
           { emoji: "➿", name: "➿モール", over: 200 },
           { emoji: "🍭", name: "🍭キャンディ", over: 200 },
           { emoji: "🔔", name: "🔔ベル", over: 200 },
           { emoji: "⭐", name: "⭐スター", over: 1000 } ],
    shopname:'🎅魔樹討伐本部サンタ村',
    shoplist: [
      { id: "sofia", name: "クリスマスソフィア", title: "🎓カード交換(大サンタ)",
        description: "⭐スターとカードを交換できる。\n対象：⛸️ソフィア・エヴェリーナ・ミューリュライネン(Xmas)",
        itemToLose: "eventitem", itemToLoseIndex: 4, numToLose: 20,
        itemToGet: "card", cardidToGet: "そふぃあ聖" },
      { id: "jord", name: "クリスマスユード", title: "🎓カード交換(小サンタ)",
        description: "⭐スターとカードを交換できる。\n対象：🪴左ユード(Xmas)",
        itemToLose: "eventitem", itemToLoseIndex: 4, numToLose: 20,
        itemToGet: "card", cardidToGet: "ひだりゆ聖" },
      { id: "jwl", name: "宝珠", title: "💍宝珠",
        description: "⭐スターと💍宝珠を交換できる。",
        descriptionAfter: "キラキラした景色には、特別な力がある……かも。",
        command: "「！ぺえ (カード名)」",
        itemToLose: "eventitem", itemToLoseIndex: 4, numToLose: 20,
        itemToGet: "jewel", numToGet: 1 },
      { id: "inv", name: "招待券", title: "🎟️招待券",
        description: "⭐スターと🎟️招待券を交換できる。",
        descriptionAfter: "せっかくなので、「パーティー」の人員は多いほうがいい！",
        command: "「！ぺよ (キャラ名)」",
        itemToLose: "eventitem", itemToLoseIndex: 4, numToLose: 30,
        itemToGet: "invite", numToGet: 1 }
    ],
    startprocess: async (input) => {
      const text = input.message.author.id + ' XMAS\n0'; //参加：1,3,8,10,23 未受取：80
      await input.client.channels.get(exports.speciallog).send(text);
      return;
    },
    specialprocess: (input) => {
      const o = { atitle: '', title: '', description: '',
                  raidnewcontent: input.raidlog.content };
      
      const raidloga = input.raidlog.content.split('\n');
      const raid = { progress:JSON.parse(raidloga[1]), //{number:0, nokori:2642}
                     members :JSON.parse(raidloga[2]), //{id, damage}の配列
                     trees   :JSON.parse(raidloga[3]), //{index, hp, stars, type, num, name, intro}の配列
                     buds    :JSON.parse(raidloga[4]), //[{index:0, hp:, name:"Ⅰ. わらう樹", intro:""}, {name:"", intro:""}]
                     ex      :JSON.parse(raidloga[5]),
                     sdw     :JSON.parse(raidloga[6]) }; 
      
      if(input.command.length==2){
        const tree = (15<raid.progress.number) ? raid.sdw
                   : (11<raid.progress.number) ? raid.ex[raid.progress.number%4]
                   : (3 <raid.progress.number) ? raid.buds[raid.progress.number%4]
                                               : raid.trees[raid.progress.number%4];
        
        if(input.command[1].match(/^確認$/)){
          o.title = '伐採状況';
          let gauge = '';
          if(raid.progress.number==15){
            const gaugenum = Math.ceil((raid.progress.nokori/tree.hp)*30);
            gauge = Array(30).fill().map((e,index)=>((0<index&&index%10==0)?'`\n`':'')
                                                   +((index<gaugenum)?(20<gaugenum)?'🟪'
                                                                     :(10<gaugenum)?'🟦'
                                                                     :(5<gaugenum)?'🟨'
                                                                     :(2<gaugenum)?'🟧'
                                                                     :(1<gaugenum)?'🟥'
                                                                                  :'⬜'
                                                                     :'⬛')).join('');
          }
          else{
            const gaugenum = Math.ceil((raid.progress.nokori/tree.hp)*10);
            gauge = Array(10).fill().map((e,index)=>(index<gaugenum)?(5<gaugenum)?(tree.type=='sdw')?'🟪':'🟩'
                                                                    :(2<gaugenum)?'🟨'
                                                                                 :'🟥'
                                                                    :'⬛').join('');
          };
          o.description = '現在の敵：🎄'+tree.num+'. '+tree.name+'\n' //ゲージ表示
                        + '`' + gauge + '`\n' //ゲージ表示
                        + 'HP ' + raid.progress.nokori + '/' + tree.hp + '\n'
                        + '```' + tree.intro + '```';
          return o;
        }
        else{
          //入力されたアイテム名からアイテムを選ぶ
          const ornaments = [{index:0, emoji:'🧦', name:'🧦ソックス',  alias:['ソックス','そっくす','靴下','くつした']},
                             {index:1, emoji:'➿', name:'➿モール',    alias:['モール','もーる']},
                             {index:2, emoji:'🍭', name:'🍭キャンディ', alias:['キャンディ','きゃんでぃ','キャンディー','きゃんでぃー','飴','あめ']},
                             {index:3, emoji:'🔔', name:'🔔ベル',      alias:['ベル','べる']},
                             {index:4, emoji:'⭐', name:'⭐スター',      alias:['スター','すたー','星','ほし']}];
          const ornament = ornaments.find(om=>om.alias.includes(input.command[1]));
          if(!ornament){ o.description=input.command[1]+'はオーナメントにありません。'; return o; };
          
          const eventitems = input.ploga[3].split(":")[5].split("/")[1].split(" ").map(n=>Number(n));

          if(eventitems[ornament.index] < 1){
            o.title = ornament.name + 'がありません！';
            o.description = 'オーナメントは通常プレイ中、🎄魔樹を攻撃したときに獲得できることがあります。\n現在所持数：'+ornaments.map(om=>om.emoji+'×'+eventitems[om.index]).join(' ');
            return o;
          };

          //参加者情報取得
          let memberindex = raid.members.findIndex(mem=>mem.id==input.message.author.id);
            //なければ追加
          if(memberindex<0){ memberindex = raid.members.length;
                             raid.members.push({id:input.message.author.id, damage:0}); };
          
          //ダメージ計算
          const critical = (raid.progress.number%4 == ornament.index);
          const attack = (ornament.index==4||critical) ? 500 : 100; //相性がよければ500
          const oldnokori = raid.progress.nokori+0;
          raid.progress.nokori-=attack;
          const win = (raid.progress.nokori<=0);
          const newnokori = win ? 0 : raid.progress.nokori;
            //参加者情報にダメージを
          raid.members[memberindex].damage+=attack;
          
          console.log('oldnokori : '+oldnokori);
          console.log('attack : '+attack);
          console.log('トドメ : '+win);
          console.log('newnokori : '+newnokori);
          
          //討伐判定
          let gauge = '';
          if(raid.progress.number==15){
            const gaugenum = Math.ceil((newnokori/tree.hp)*30);
            gauge = Array(30).fill().map((e,index)=>((0<index&&index%10==0)?'`\n`':'')
                                                   +((index<gaugenum)?(20<gaugenum)?'🟪'
                                                                     :(10<gaugenum)?'🟦'
                                                                     :(5<gaugenum)?'🟨'
                                                                     :(2<gaugenum)?'🟧'
                                                                     :(1<gaugenum)?'🟥'
                                                                                  :'⬜'
                                                                     :'⬛')).join('');
          }
          else{
            const gaugenum = Math.ceil((newnokori/tree.hp)*10);
            gauge = Array(10).fill().map((e,index)=>(index<gaugenum)?(5<gaugenum)?(tree.type=='sdw')?'🟪':'🟩'
                                                                    :(2<gaugenum)?'🟨'
                                                                                 :'🟥'
                                                                    :'⬛').join('');
          };
          
          //アイテム消費・獲得
          o.itemToLoseIndex = ornament.index;
          o.numToLose = 1;
          o.itemToGet = 'coin';
          o.numToGet = Math.floor(tree.hp / (win ? 5 : Math.random()<0.3 ? 25 : 50));
          
          //メッセージ
          o.title = '🎄'+tree.name+' への攻撃！' + ornament.emoji;
          o.description = '💥__'+tools.nemj(attack)+'ダメージ！__' + (ornament.index==4?'(スター)':critical?'(弱点)':'') + '\n'
                        + '`' + gauge + '`\n' //ゲージ表示
                        + 'HP ' + oldnokori+' → '+newnokori + ' / ' + tree.hp + '\n'
                        + (win ? '🎊'+tree.name+'にトドメをさした！🎊\n' : '')
                        + '樹から 🪙'+o.numToGet.toLocaleString()+'c 落ちてきた！'+(win?' (トドメボーナス)':'');
          
          //討伐処理
          
          if(win){
            //ユーザーログ書込　各人への報酬
            const reward = async function(logs, members, tree){
              for(const mem of members){
                const splog = await logs.find(m => m.content.includes(mem.id+' XMAS'));
                const splogcontent = splog.content.split('\n');
                const splogcontentrewards = splogcontent[1].split('/');
                splogcontentrewards[0] = Number(splogcontent[1]) + tree.stars;
                if(tree.type=='ex'&&tree.index==3) splogcontentrewards[1] = 'R';
                splogcontent[1] = splogcontentrewards.join('/');
                splog.edit(splogcontent.join('\n'));
              };
            };
            reward(input.logs, raid.members, tree);
                                
            //新樹を植える
            raid.progress.number++;
            const newtree = (15<raid.progress.number) ? raid.sdw
                          : (11<raid.progress.number) ? raid.ex[raid.progress.number%4]
                          : (3 <raid.progress.number) ? raid.buds[raid.progress.number%4]
                                                      : raid.trees[raid.progress.number%4];
            raid.progress.nokori=newtree.hp;
            const oldmembers = raid.members.concat();
            raid.members=[];
            
            //討伐アナウンスを少し遅れて投稿したいなあ。
            o.raidMessageObj =  {embed: {
                                  author: {name:'イベントレイド'},
                                  title:'🎊 🎄'+tree.num+'. '+tree.name+'を'+(tree.type=='sdw'?'掃除':'討伐')+'した！ 🎊',
                                  description: tree.name + 'は' + ( (tree.type=='sdw') ? 'またひとつ祓われた。'
                                                                  : (tree.type=='ex') ? '轟音とともに倒れていった……！'
                                                                  : (tree.type=='tree') ? '大きな音を立てて倒れていった……！'
                                                                                        : '打ち破られて消えていった……！')
                                             + ((tree.type=='tree'&&tree.index==3) ? '\n🎄🎄すべての魔樹の討伐に成功した！！🎄🎄' : '' )
                                             + ((tree.type=='ex'&&tree.index==3) ? '\n🎄🎄🎄すべての大魔樹の討伐に成功した！！🎄🎄🎄' : '' )
                                             + '\n🎁報酬：⭐×' + tree.stars + ((tree.type=='ex'&&tree.index==3) ? ' 🎗️メモリアルリボン' : '' )
                                             + '\n▼討伐に参加したプレイヤーは、__次にMAGICA-PENTAをプレイした時__に報酬を受け取ることができます。'
                                             + '\n' + oldmembers.map(mem=>'👤`'+input.client.users.get(mem.id).username + '(' + mem.damage + 'p)`').join(' ')
                                             + '\n'
                                             + ((tree.type=='tree'&&tree.index==3) ? '\n切り倒した魔樹の根から新たな芽が生えてきた……？\n' : '' )
                                             + ((tree.type=='bud'&&raid.progress.number==12) ? '\n力を吸収した魔樹が、巨大な姿に化けて蘇った……！！\n' : '' )
                                             + ((tree.type=='ex'&&tree.index==3) ? '\nニガヨモギの跡から、嫌な気配が漂ってくる。\n' : '' )
                                             + '\n__▼ NEXT ENEMY ▼__'
                                             + '\n🎄' + newtree.num + '. ' + newtree.name
                                             + '\n```' + newtree.intro + '```',
                                  color: (tree.type=='sdw'?0x5d00b0:tree.type=='ex'?0xa700b0:0xbe1c4a),
                                  footer:{text:input.pata.pentaname}
                                }};
          }
          
          //レイドログ書込
          raidloga[1] = JSON.stringify(raid.progress);
          raidloga[2] = JSON.stringify(raid.members);

          o.raidnewcontent = raidloga.join('\n');

          return o;
        }
      }
      else{
        if(input.command.length!==3){ o.description='コマンドが不足しているか間違っています。'; return o;};
      };
    },
    endprocess:(input) => {
      const resulttext=[];
      //コンプリート
      const complete = ["そふぃあ", "じゅふぶ", "ねぎかぶ", "らいかか", "いのうえ",
                        "まつなが", "どろしー", "れいもん", "ひだりゆ"
      ].every(ecard => input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "聖5")
                    || input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "聖7") );
      if(complete){ input.logitems[2] = Number(input.logitems[2])+3;
                    resulttext.push('イベントカード全MAXボーナス 💍×3 を獲得しました！');
                  };
      input.splog.delete();
      //結果
      return {logitems:input.logitems,
              ps:""
              +(resulttext.length>0?"\n"+resulttext.join('\n'):"")};
    },
    preeffects:[
      {
        f:(i)=>{
          const outline = {title:'魔樹からの攻撃', description:'生徒ドロー直後、20%の確率で魔樹の攻撃を受ける。'};
          if(i){
            try{
              if(i.raidlog&&Math.random()<0.2){
                const o = {log:{}};
                o.log.title=outline.title;
                
                //■■■■■　レイドログ取得　■■■■■
                const raidloga = i.raidlog.content.split('\n');
                const raid = { progress:JSON.parse(raidloga[1]), //{number:0, nokori:2642}
                               trees   :JSON.parse(raidloga[3]), //{index, hp, stars, type, num, name, intro}の配列
                               buds    :JSON.parse(raidloga[4]), //[{index:0, hp:, name:"Ⅰ. わらう樹", intro:""}, {name:"", intro:""}]
                               ex      :JSON.parse(raidloga[5]),
                               sdw     :JSON.parse(raidloga[6]) };
                if(15<raid.progress.number) return;
                const tree = (15<raid.progress.number) ? raid.sdw
                           : (11<raid.progress.number) ? raid.ex[raid.progress.number%4]
                           : (3 <raid.progress.number) ? raid.buds[raid.progress.number%4]
                                                       : raid.trees[raid.progress.number%4];
                
                o.log.description = outline.description;
                
                if(tree.index==0){
                  o.cards = i.cards;
                  o.cards.forEach((cc,index)=>{
                    const newcard=JSON.parse(JSON.stringify(cc));
                    newcard.rarity = tools.rarityadd(cc,-1);
                    o.cards[index]=newcard;
                  });
                  o.log.description += '\n〔🎄' + tree.name + (tree.type=='ex'?'に魔力を吸収された！':'に嘲笑われた！') + '〕\n全生徒レアリティ1減少';
                }
                else if(tree.index==1){
                  const add = Math.floor(Math.random()*8+3)*(-10);
                  o.log.add = add;
                  o.log.notes = add+'p';
                  o.log.description += '\n〔🎄' + tree.name + (tree.type=='ex'?'の暴走に巻き込まれた！':'に攻撃された！') + '〕\n' + Math.abs(add) + 'p減算';
                }
                else if(tree.index==2){
                  o.cards = i.cards;
                  o.cards.forEach((cc,index)=>{
                    const newcard=JSON.parse(JSON.stringify(cc));
                    newcard.probadd -= 50;
                    newcard.basicadd -= 5;
                    o.cards[index]=newcard;
                  });
                  o.log.description += '\n〔🎄' + tree.name + (tree.type=='ex'?'に魔力を喰われた！':'に魔力を溶かされた！') + '〕\n全生徒確率加算(%)50減算・通常計算5p減算';
                }
                else if(tree.index==3){
                  o.cards = i.cards;
                  const targetindexs = Array(3).fill().map(e=>Math.floor(Math.random()*o.cards.length));
                  o.cards.forEach((cc,index)=>{
                    if(targetindexs.includes(index)){
                      const newcard=JSON.parse(JSON.stringify(cc));
                      newcard.frozen = true;
                      o.cards[index]=newcard;
                    };
                  });
                  o.log.description += '\n〔🎄' + tree.name + (tree.type=='ex'?'の毒に蝕まれた。':'に催眠をかけられた！') + '〕\n生徒1～3枚効果無効🚫';
                };
                return o;
              };
            }
            catch(error){return{error:true, title:outline.title, message:error.message};};
          };
        }
      }
    ],
    effects:[
      {
        raid:true,
        f:(i)=>{
          const outline = {title:'🎄伐採レイド！', type:'イベント'};
          if(i){
            try{
              if(i.raidlog){
                console.log('🎄開始');
                const o=JSON.parse(JSON.stringify(epoutput));
                o.log.title=outline.title;
                
                //■■■■■　報酬確認　■■■■■
                let rewarded = false;
                let rewardtext = '';
                const rewardresults = [];
                const oldcontent = i.speciallog.content.split('\n');
                if(oldcontent[1]!=='0'){
                  console.log('🎄報酬受取');
                  
                  const reward = oldcontent[1].split('/');
                  
                  if(reward[0]!=='0'){
                    o.log.eptype.push('event');
                    o.log.eventitems.index = 4;
                    const iadd = Number(reward[0]);
                    o.log.eventitems.add = iadd;
                    rewardresults.push('⭐×'+iadd);
                    rewarded = true;
                  };
                  if(reward[1]){
                    o.ribbonadd = 1;
                    rewardresults.push('🎗️メモリアルリボン');
                  };
                  rewardtext = '🎁前回の討伐報酬 '+rewardresults.join(' ')+' を受け取った！\n\n';
                  i.speciallog.edit(oldcontent[0]+'\n0');
                }
                
                //■■■■■　レイドログ取得　■■■■■
                const raidloga = i.raidlog.content.split('\n');
                const raid = { progress:JSON.parse(raidloga[1]), //{number:0, nokori:2642}
                               members :JSON.parse(raidloga[2]), //{id, damage}の配列
                               trees   :JSON.parse(raidloga[3]), //{index, hp, stars, type, num, name, intro}の配列
                               buds    :JSON.parse(raidloga[4]), //[{index:0, hp:, name:"Ⅰ. わらう樹", intro:""}, {name:"", intro:""}]
                               ex      :JSON.parse(raidloga[5]),
                               sdw     :JSON.parse(raidloga[6]) };
                const tree = (15<raid.progress.number) ? raid.sdw
                           : (11<raid.progress.number) ? raid.ex[raid.progress.number%4]
                           : (3 <raid.progress.number) ? raid.buds[raid.progress.number%4]
                                                       : raid.trees[raid.progress.number%4];
                console.log('🎄樹情報取得 '+tree.name);
                //参加者情報取得 なければ追加
                let memberindex = raid.members.findIndex(mem=>mem.id==i.message.author.id);
                if(memberindex<0){ memberindex = raid.members.length;
                                   raid.members.push({id:i.message.author.id, damage:0}); };
                
                //■■■■■　ダメージ計算　■■■■■
                const totalPattack = (0<i.totalP) ? i.totalP : 0;
                let attack = totalPattack;

                const weakpointdata = [
                  //わらう(支配力や権勢、学を見せつけられると気が小さくなる。)
                  {club:['園芸','新聞','魔法チャトランガ','文芸'],
                   //major:['四素','魔装'],
                   committee:['美化','生徒会','風紀','図書'],
                   emjlist:['炎・熱'],
                   eventid:['XMAS','MYSTERY','QUIZ'],
                   fxtype:['force'],
                   position:true, genre:'tcTm'},
                  //うごく(より高い運動能力で圧倒できるかもしれない。)
                  {club:['園芸','アーチェリー','決闘','サッカー','ドロップボール','陸上','流星'],
                   //major:['魔対','魔動'],
                   committee:['美化'],
                   emjlist:['炎・熱'],
                   eventid:['XMAS','SNOW','SPORTS','DANCE'],
                   fxtype:['sortcard']},
                  //たべる(うまそうな命のにおいが漂ってくると気が散る。)
                  {club:['園芸','茶道','調理'],
                   //major:['間法','魔変'],
                   committee:['美化'],
                   tag:['生物','神術'],
                   emjlist:['炎・熱','食物','動物'],
                   eventid:['XMAS','CHOCO','BEACH','CAMP','HALLOWEEN'],
                   fxtype:['addcard']},
                  //ねむる(喧騒、もしくは更に強い空想・幻想が弱点。)
                  {club:['園芸','映画研究','漫画研究','美術','演劇','文芸'],
                   //major:['魔視','魔魂'],
                   committee:['美化','放送'],
                   tag:['音楽'],
                   emjlist:['炎・熱','音'],
                   eventid:['XMAS','PSEUDO','DANCE','FESTIVAL','BEACH'],
                   fxtype:['coinadd','coinmul','emjadd','addcard']},
                  
                  {club:['園芸'],
                   committee:['美化'],
                   emjlist:['炎・熱'],
                   eventid:['XMAS']},
                ];
                const weakpoint = (tree.type=='sdw') ? weakpointdata[4] : weakpointdata[raid.progress.number%4];

                const fxresult = [];
                
                console.log('🎄弱点判定');
                if(i.prefields.length){
                  i.prefields.forEach(pf=>{
                    if(pf.type=='effect'&&pf.fxowner){
                      let fxattack = 0;
                      const fxdetail = [];
                      
                      for(const key in weakpoint){
                        if(key=='emjlist'){
                          console.log('▼弱点絵文字確認');
                          console.log('weakpoint[key] : '+weakpoint[key]);
                          console.log('weakpoint[key] : '+weakpoint[key]);
                          weakpoint[key].forEach(emjs=>{
                            console.log('emjs : '+emjs);
                            console.log('exports.emjlist[emjs] : '+exports.emjlist[emjs]);
                            console.log('tools.emj(pf.fxowner) : '+tools.emj(pf.fxowner));
                            if(exports.emjlist[emjs].includes(tools.emj(pf.fxowner))){
                              console.log('あり');
                              fxattack+=20;
                              fxdetail.push(emjs+'系絵文字+20');
                            }
                          });
                        }
                        else if(key=='genre'&&pf.fxowner[key]&&pf.fxowner[key]==weakpoint[key]){
                          console.log('▼弱点ジャンル確認');
                          fxattack+=20;
                          fxdetail.push('教師+20');
                        }
                        else if(key=='club'&&pf.fxowner[key]){
                          console.log('▼弱点部活確認');
                          pf.fxowner[key].split(' ').forEach(club=>{
                            console.log('club : '+club);
                            if(weakpoint[key].includes(club)){
                              console.log('あり');
                              fxattack+=30;
                              fxdetail.push(club+'部+30');
                            };
                          });
                        }
                        else if(key=='committee'&&pf.fxowner[key]){
                          console.log('▼弱点委員会確認');
                          weakpoint[key].forEach(com=>{
                            console.log('com : '+com);
                            if(pf.fxowner[key].includes(com)){
                              console.log('あり');
                              fxattack+=30;
                              const comtext = com.includes('生徒会') ? '生徒会' : com+'委員' ;
                              fxdetail.push(comtext+'+30');
                            };
                          });
                        }
                        else if(key=='position'&&pf.fxowner[key]){
                          console.log('▼弱点立場確認');
                          pf.fxowner[key].split('/').forEach(pos=>{
                            console.log('posあり : '+pos);
                            fxattack+=20;
                            const postext = pos.includes('部長') ? '部長'
                                          : pos.includes('委員長') ? '委員長'
                                          : pos.includes('寮長') ? '寮長'
                                          : pos.includes('首席') ? '首席'
                                          : pos ;
                            fxdetail.push(postext+'+20');
                          });
                        }
                        else if(key=='tag'&&pf.fxowner[key]){
                          console.log('▼弱点タグ確認');
                          pf.fxowner[key].split('/').forEach(tg=>{
                            if(weakpoint[key].includes(tg)){
                              console.log('tagあり : '+tg);
                              fxattack+=30;
                              fxdetail.push(tg+'タグ+30');
                            };
                          });
                        }
                        else if(key=='fxtype'){
                          console.log('▼弱点効果タイプ確認');
                          weakpoint[key].forEach(fxt=>{
                            if(pf.fxtype.includes(fxt)){
                              console.log('効果タイプあり : '+fxt);
                              fxattack+=40;
                              const fxtypename={['force']   : '得点強制設定',
                                                ['sortcard']: 'カード移動',
                                                ['addcard'] : 'カード追加',
                                                ['coinadd'] : 'コイン加算',
                                                ['coinmul'] : 'コイン乗算',
                                                ['emjadd']  : '絵文字追加'}
                              fxdetail.push(fxtypename[fxt]+'効果+40');
                            };
                          });
                        }
                        else if(key=='eventid'&&pf.fxowner[key]){
                          console.log('▼弱点イベント確認');
                          if(weakpoint[key].includes(pf.fxowner[key])){
                            console.log('イベントあり : '+pf.fxowner[key]);
                            if(pf.fxowner[key]=='XMAS'){
                              fxattack+=50;
                              fxdetail.push(pf.fxowner[key]+'カード+50');
                            }
                            else{
                              fxattack+=30;
                              fxdetail.push(pf.fxowner[key]+'カード+30');
                            }
                          };
                        };
                      };
                      
                      
                      if(fxdetail.length){
                        if(pf.fxtype.includes('prob')||pf.fxtype.includes('random')){
                          const randomadd = Math.floor(Math.random()*8-2)*10;
                          if(randomadd>0){
                            fxattack+=randomadd;
                            fxdetail.push('ランダム系効果+'+randomadd);
                          };
                        };
                        if(pf.fxowner.eventid && pf.fxowner.eventid=='XMAS'){
                          fxattack*=3;
                          fxdetail.push('×3 当イベント');
                        };
                        if(pf.fxowner.id.slice(0,4)==i.favoriteid.slice(0,4)){
                          fxattack*=10;
                          fxdetail.push('×10 お気に入り');
                        };
                        attack+=fxattack;
                        fxresult.push('・弱点効果：' + tools.emj(pf.fxowner) + fxattack + ' (' + fxdetail.join(' / ') +')');
                      };
                    };
                  });
                };
                
                //■■■■■　攻撃　■■■■■
                console.log('🎄攻撃：'+attack);
                const oldnokori = raid.progress.nokori+0;
                raid.progress.nokori-=attack;
                const win = (raid.progress.nokori<=0);
                const newnokori = win ? 0 : raid.progress.nokori;
                raid.members[memberindex].damage+=attack;
                console.log('🎄攻撃結果：'+oldnokori+'→'+raid.progress.nokori);

                //討伐判定
                let gauge = '';
                if(raid.progress.number==15){
                  const gaugenum = Math.ceil((newnokori/tree.hp)*30);
                  gauge = Array(30).fill().map((e,index)=>((0<index&&index%10==0)?'`\n`':'')
                                                         +((index<gaugenum)?(20<gaugenum)?'🟪'
                                                                           :(10<gaugenum)?'🟦'
                                                                           :(5<gaugenum)?'🟨'
                                                                           :(2<gaugenum)?'🟧'
                                                                           :(1<gaugenum)?'🟥'
                                                                                        :'⬜'
                                                                           :'⬛')).join('');
                }
                else{
                  const gaugenum = Math.ceil((newnokori/tree.hp)*10);
                  gauge = Array(10).fill().map((e,index)=>(index<gaugenum)?(5<gaugenum)?(tree.type=='sdw')?'🟪':'🟩'
                                                                          :(2<gaugenum)?'🟨'
                                                                                       :'🟥'
                                                                          :'⬛').join('');
                };
                console.log('🎄ゲージ：'+gauge);
                
                //■■■■■　討伐処理　■■■■■
                if(win){
                  console.log('🎄討伐成功');
                  o.coinadd = Math.floor(tree.hp / 5);
                  //ユーザーログ書込　各人への報酬
                  const reward = async function(logs, members, tree){
                    for(const mem of members){
                      const splog = await logs.find(m => m.content.includes(mem.id+' XMAS'));
                      const splogcontent = splog.content.split('\n');
                      const splogcontentrewards = splogcontent[1].split('/');
                      splogcontentrewards[0] = Number(splogcontent[1]) + tree.stars;
                      if(tree.type=='ex'&&tree.index==3) splogcontentrewards[1] = 'R';
                      splogcontent[1] = splogcontentrewards.join('/');
                      splog.edit(splogcontent.join('\n'));
                    };
                  };
                  reward(i.splogs, raid.members, tree);

                  //新樹を植える
                  raid.progress.number++;
                  const newtree = (15<raid.progress.number) ? raid.sdw
                                : (11<raid.progress.number) ? raid.ex[raid.progress.number%4]
                                : (3 <raid.progress.number) ? raid.buds[raid.progress.number%4]
                                                            : raid.trees[raid.progress.number%4];
                  raid.progress.nokori=newtree.hp;
                  const oldmembers = raid.members.concat();
                  raid.members=[];

                  //討伐アナウンスを少し遅れて投稿したいなあ。
                  o.raidMessageObj =  {embed: {
                                        author: {name:'イベントレイド'},
                                        title:'🎊 🎄'+tree.num+'. '+tree.name+'を'+(tree.type=='sdw'?'掃除':'討伐')+'した！ 🎊',
                                        description: tree.name + 'は' + ( (tree.type=='sdw') ? 'またひとつ祓われた。'
                                                                        : (tree.type=='ex') ? '轟音とともに倒れていった……！'
                                                                        : (tree.type=='tree') ? '大きな音を立てて倒れていった……！'
                                                                                              : '打ち破られて消えていった……！')
                                                   + ((tree.type=='tree'&&tree.index==3) ? '\n🎄🎄すべての魔樹の討伐に成功した！！🎄🎄' : '' )
                                                   + ((tree.type=='ex'&&tree.index==3) ? '\n🎄🎄🎄すべての大魔樹の討伐に成功した！！🎄🎄🎄' : '' )
                                                   + '\n🎁報酬：⭐×' + tree.stars + ((tree.type=='ex'&&tree.index==3) ? ' 🎗️メモリアルリボン' : '' )
                                                   + '\n▼討伐に参加したプレイヤーは、__次にMAGICA-PENTAをプレイした時__に報酬を受け取ることができます。'
                                                   + '\n' + oldmembers.map(mem=>'👤`'+i.client.users.get(mem.id).username + '(' + mem.damage + 'p)`').join(' ')
                                                   + '\n'
                                                   + ((tree.type=='tree'&&tree.index==3) ? '\n切り倒した魔樹の根から新たな芽が生えてきた……？\n' : '' )
                                                   + ((tree.type=='bud'&&raid.progress.number==12) ? '\n力を吸収した魔樹が、巨大な姿に化けて蘇った……！！\n' : '' )
                                                   + ((tree.type=='ex'&&tree.index==3) ? '\nニガヨモギの跡から、嫌な気配が漂ってくる。\n' : '' )
                                                   + '\n__▼ NEXT ENEMY ▼__'
                                                   + '\n🎄' + newtree.num + '. ' + newtree.name
                                                   + '\n```' + newtree.intro + '```',
                                        color: (tree.type=='sdw'?0x5d00b0:tree.type=='ex'?0xa700b0:0xbe1c4a),
                                        footer:{text:exports.pentaname}
                                      }};
                }

                //■■■■■　レイドログ書込　■■■■■
                raidloga[1] = JSON.stringify(raid.progress);
                raidloga[2] = JSON.stringify(raid.members);
                const raidnewcontent = raidloga.join('\n');
                
                const editraidlog = async (log, content)=>{
                  console.log('🎄レイドログ書込');
                  await log.edit(content);
                };
                editraidlog(i.raidlog, raidnewcontent);
                
                //■■■■■　オーナメント獲得　■■■■■
                let omtext = '';
                if(!rewarded&&0<attack&&Math.random()<0.15){
                  console.log('🎄オーナメント獲得');
                  const ornaments = [{index:0, prob:0.24, name:'🧦ソックス'},
                                     {index:1, prob:0.24, name:'➿モール'},
                                     {index:2, prob:0.24, name:'🍭キャンディ'},
                                     {index:3, prob:0.24, name:'🔔ベル'},
                                     {index:4, prob:0.04, name:'⭐スター'}];
                  let prob = 0;
                  let ornament;
                  const randomnum = Math.random(); //0～0.99...が出る
                  for (let i = 0; i < ornaments.length; i++) {
                    prob += ornaments[i].prob;
                    if (randomnum < prob) {
                      ornament = ornaments[i];
                      break;
                    }
                  }
                  o.log.eptype.push('event');
                  const iindex = ornament.index;
                  o.log.eventitems.index = iindex;
                  o.log.eventitems.add = 1;
                  omtext = '樹から' + ornament.name + 'が落ちてきた！\n';
                };
                
                //■■■■■　メッセージ作成　■■■■■
                o.log.description = rewardtext
                                  + '💥__' + tools.nemj(attack) + 'ダメージ！__\n'
                                  + '・合計点分：' + totalPattack + (i.totalP<0 ? ' ('+i.totalP+')' : '') + '\n'
                                  + (fxresult.length ? fxresult.join('\n') + '\n' : '')
                                  + omtext
                                  + '\n'
                                  + '現在の敵：🎄' + tree.num + '. ' + tree.name + '\n'
                                  + '`' + gauge + '`\n' //ゲージ表示
                                  + 'HP ' + oldnokori + ' → ' + newnokori + ' / ' + tree.hp + '\n'
                                  + (win ? '🎊'+tree.name+'にトドメをさした！🎊\n樹から 🪙'+o.coinadd.toLocaleString()+'c 落ちてきた！ (トドメボーナス)' : '');
                return o;
              }
              else return;
            }
            catch(error){return{error:true, title:outline.title, message:error.message};};
          }
          else return outline;
        }
      },
    ]
  },

  { id: "NEWYEAR", name: "新春東京まぎかるた 福袋もあるよ！", shortname: "新春東京まぎかるた",
    emoji: "🎍", color: 0xf75c3d,
    idTail: "正", nameTail: "(正月)", nnprefix: ["正月", "しょうがつ"],
    start: "2023-01-01", end: "2023-01-15",
    description: "あけましておめでとうございます！！ さっそく東魔のみんなでお正月遊びといきましょう！ なんとあの生徒会長も遊びに参加してくれるとか。もしかしたら誰か会長にかるたや羽根つきで勝っちゃったりして……なんてね！ ……ん？ なんだか年始早々「活気溢れる」気配が……。",
    descriptionP: "プレイヤーに「📓すごろく帳」が配られ、イベント限定エピソード📖『🎍まぎかるた』で「かるた札」を取ることで📓すごろく帳の📍コマを進めます。📍コマが🛍️福袋マスに止まると【🍊みかん】やその他の景品を獲得することができます。\n【🍊みかん】を集めると、イベントSHOP：「！ぺしい」にて《👑アルト・アダマンタイト(正月)》《🔨大理・オクタヴィウス(正月)》あるいはアイテム類と交換できます。\n📓すごろく帳の進度は「！ぺい　確認」から確認できます。\n\n 📖『🎍まぎかるた』\n通常プレイ時に必ず発動され、さいころで6⃣の目が出たときに「かるた札」を取ることができます。\nさいころの目には、(正月)とつくカードの効果が発動されるごとに、また合計点が300pを超えるごとに1ずつボーナスが加算されます。\n「かるた札」を取ると：\n・📓すごろく帳があがっていない場合\n📍コマを1つ進めます。\n・📓すごろく帳があがっている場合\n🛍️福引きに参加し、当たると景品を獲得できます。",
    descriptionG: "イベント限定カードあり〼",
    giftids: ["あるとあ正", "だいりお正"], //交換用にガチャから除外すべきid
    pickup: (characters, log) => {},
    filtering: (cards, Tcards, fcard) => [[]], //PENTAでアイテム獲得対象となるカードをフィルタリング
    item: [{ emoji: "🍊", name: "🍊みかん", over: 50000 } ],
    //shopname:'',
    shoplist: [
      { id: "alto", name: "正月アルト", title: "🎓カード交換(ダイヤモンド)",
        description: "🍊みかんとカードを交換できる。\n対象：👑アルト・アダマンタイト(正月)",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 1,
        itemToGet: "card", cardidToGet: "あるとあ正" },
      { id: "dairi", name: "正月大理", title: "🎓カード交換(マーブル)",
        description: "🍊みかんとカードを交換できる。\n対象：🔨大理・オクタヴィウス(正月)",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 1,
        itemToGet: "card", cardidToGet: "だいりお正" },
      { id: "jwl", name: "宝珠", title: "💍宝珠",
        description: "🍊みかんと💍宝珠を交換できる。",
        descriptionAfter: "",
        command: "「！ぺえ (カード名)」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 1,
        itemToGet: "jewel", numToGet: 1 },
      { id: "inv", name: "招待券", title: "🎟️招待券",
        description: "🍊みかんと🎟️招待券を交換できる。",
        descriptionAfter: "",
        command: "「！ぺよ (キャラ名)」",
        itemToLose: "eventitem", itemToLoseIndex: 0, numToLose: 2,
        itemToGet: "invite", numToGet: 1 }
    ],
    startprocess: async (input) => {
      const text = input.message.author.id + ' NEWYEAR\n0\n＠';
      await input.client.channels.get(exports.speciallog).send(text);
      return;
    },
    specialprocess: (input) => {
      const o = { atitle: '', title: '', description: ''};
      if(input.command.length==2&&input.command[1]=='確認'){
        const progress = Number(input.log.content.split('\n')[1]);
        o.title='📓'+(input.message.member ? input.message.member.displayName : input.message.author.username)+' のすごろく帳'+(progress==44?'🎊':'📍');
        
        //const takenheads = input.log.content.split('\n')[2].split('');
        const gaugearray = Array(45).fill().map((e,index) => (index<progress)  ? (index%9==8) ? '☑️' : '🔸'
                                                           : (index==progress) ? '📍'
                                                                               : (index%9==8) ? '🛍️' : '🔹' );
        const gaugelines = [];
        for(let i=0;i*9<gaugearray.length;i++){
          gaugelines.push(gaugearray.slice(i*9,i*9+9).join(''));
        };
        o.description=gaugelines.join('\n')+'\n🛍️のマスで景品を獲得できます。';
      }
      else{
        o.description='コマンドが間違っています。';
      };
      return o;
    },
    endprocess:(input) => {
      const resulttext=[];
      //コンプリート
      const complete = ["あるとあ", "だいりお", "やなぎそ", "うんじょ", "ひきふね",
                        "こさのげ", "あいしゃ", "かいそう"
      ].every(ecard => input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "正5")
                    || input.ploga[8].includes(data.characters.find(chr=>chr.id==ecard).sid + "正7") );
      if(complete){ input.logitems[2] = Number(input.logitems[2])+3;
                    resulttext.push('イベントカード全MAXボーナス 💍×3 を獲得しました！');
                  };
      //結果
      return {logitems:input.logitems,
              ps:""
              +(resulttext.length>0?"\n"+resulttext.join('\n'):"")};
    },
    effects:[
      {
        f:(i)=>{
          const outline = {title:'🎍まぎかるた', type:'イベント'};
          if(i){
            try{
              const o=JSON.parse(JSON.stringify(epoutput));
              o.log.title=outline.title;
              o.log.description='';
              
              const bonus = i.prefields.filter(pf=>pf.type=='effect'&&pf.fxowner.eventid&&pf.fxowner.eventid=='NEWYEAR').length + (0<i.totalP?Math.floor(i.totalP/300):0);
              let d = Math.floor(Math.random()*6+1) + bonus;
              if(6<d) d = 6;
              o.log.description+='さいころ：' + tools.nemj(d) + (bonus?' (+'+bonus+')':'') + (d==6?' 成功！':'');
              
              if(d==6){
                const spcontents = i.speciallog.content.split('\n');
                let progress = Number(spcontents[1]);
                let takenheads = spcontents[2].split(''); //プレイヤーの既出かるたを取得
                let cartachoices = i.cartalist.filter(carta=>!takenheads.includes(carta.head)); //かるたリストを取得
                if(cartachoices.length==0){
                  cartachoices = i.cartalist;
                  takenheads = ['＠'];
                };
                const carta = cartachoices[Math.floor(Math.random()*cartachoices.length)];
                takenheads.push(carta.head);
                
                o.log.description+='\n> 【 '+carta.head+' 】'+carta.ids.map(id=>tools.emj(i.characters.find(chr=>chr.id==id))).join('')
                                  +'\n> 　'
                                  +'\n> '+carta.text
                                  +'\n> 　';
                
                if(progress<44){ //コマが進んだ
                  progress++;
                  spcontents[1] = progress;
                  
                  const lineprogress = progress%9;
                  const gauge = Array(9).fill().map((e,index)=>(index<lineprogress)?'🔸':(index==lineprogress)?'📍':(index==8)?'🛍️':'🔹').join('');
                  o.log.description+='\nコマが進んだ！\n'+gauge;
                  
                  if(lineprogress==8){
                    o.log.eventitems.index = 0;
                    o.log.eptype.push('event');
                    let iadd = 0;
                    let notes = '';
                    if     (progress==8) { iadd=1; o.ticketadd=20;  notes=' 🎫×20'; }
                    else if(progress==17){ iadd=1; o.ticketadd=100;  notes=' 🎫×100'; }
                    else if(progress==26){ iadd=3; o.envelopeadd=10; notes=' 🧧×5'; }
                    else if(progress==35){ iadd=3; o.jeweladd=3;     notes=' 💍×3'; }
                    else if(progress==44){ iadd=7; o.inviteadd=3;    notes=' 🎟️×3\n__🎊　あがり！　🎊__'; };
                    o.log.eventitems.add = iadd;
                    o.log.description+='\n🛍️福袋マスに着いた！\n獲得：🍊×'+iadd+notes;
                  };
                }
                else if(Math.random()<0.5){;
                  let notes = '';
                  const items = [0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,3,3,4];
                  const itemnum = items[Math.floor(Math.random()*items.length)];
                  if     (itemnum==0){ notes='🎫×5'; o.ticketadd=5; }
                  else if(itemnum==1){ notes='🎫×10'; o.ticketadd=10; }
                  else if(itemnum==2){ notes='🎫×20'; o.ticketadd=20; }
                  else if(itemnum==3){ notes='💍×1'; o.jeweladd=1; }
                  else if(itemnum==4){ notes='🎟️×1'; o.inviteadd=1; };
                  o.log.description+='\n🛍️福引きは……アタリ！\n獲得：'+notes;
                }
                else{
                  o.log.description+='\n🛍️福引きは……ハズレ！';
                };
                
                spcontents[2] = takenheads.join('');
                o.speciallogcontent = spcontents.join('\n');
              };
              
              return o;
            }
            catch(error){return{error:true, title:outline.title, message:error.message};};
          }
          else return outline;
        }
      },
    ]
  },
];

//■■■■■■■■■■■■■■■■■■■■ペンタ特性

exports.natures = [
  {
    id: "あんなか",
    f: (card) => {
      const outline = {
        title: "メーキャップ",
        description: "50%の確率で若い姿(✨)で現れる。",
      };
      if (card) {
        if (Math.floor(Math.random() * 100) < 50) {
          const newcard = JSON.parse(JSON.stringify(card));
          newcard.nature = "✨";
          newcard.cm = Number(newcard.subcm.split("：")[1]);
          return newcard;
        } else return card;
      } else return outline;
    },
  },
  {
    id: "いなさゆ",
    f: (card) => {
      const outline = {
        title: "出力不安定",
        description:
          "100-(Lv×10)%の確率でレアリティが下がる。\n⭐2 → ⭐0～1 (ランダム)",
      };
      if (card) {
        const newcard = JSON.parse(JSON.stringify(card));
        if (Math.floor(Math.random() * 100) < 100 - card.collected * 10) {
          const patterns = ["⭐0", "⭐1"];
          const rarity = Math.floor(Math.random() * 2);
          newcard.nature = patterns[rarity];
          newcard.rarity = rarity;
          return newcard;
        } else return card;
      } else return outline;
    },
  },
  { id: "いばらき",
    f:card=>{
      const outline = {title:"ヴァンパイア", description:"20～4時(現実時間)であるとき、Lv×2%の確率でレアリティが1上がる(✨)。"};
      if(card){
        const hour = tools.getTodayJp().getHours();
        if((20<=hour||hour>4)&&Math.random()*100<card.collected*2){
          const newcard = JSON.parse(JSON.stringify(card));
          newcard.rarity++;
          newcard.nature='✨';
          return newcard;
        }
        else return card;
      } else return outline;
    },
  },
  {
    id: "おにこう",
    f: (card) => {
      const outline = {
        title: "魔力切れ",
        description: "20%の確率で効果無効🚫になる。",
      };
      if (card) {
        if (Math.floor(Math.random() * 100) < 20) {
          const newcard = JSON.parse(JSON.stringify(card));
          newcard.frozen = true;
          return newcard;
        } else return card;
      } else return outline;
    },
  },
  {
    id: "かりおす",
    f: (card) => {
      const outline = {
        title: "給餌",
        description: "生徒会の顧問情報を持つ。10%の確率で餌の質がよく(🎵)グループ乗算の値を2増加(4倍)、10%の確率で餌をもらえておらず(💢)グループ乗算の値を3減少(-1倍)させる。",
      };
      if (card) {
        const newcard = JSON.parse(JSON.stringify(card));
        newcard.advisor = "生徒会";
        const d = Math.floor(Math.random()*100);
        if(d<10){
          newcard.nature = '🎵';
          newcard.basicmul += 2;
        }
        else if(d<20){
          newcard.nature = '💢';
          newcard.basicmul -= 3;
        };
        return newcard;
      } else return outline;
    },
  },
  { id: "さとうこ不",
    f:card=>{
      const outline = {title:"今日の失敗", description:"レアリティを1つにつき20%の確率で失い(❌)、そのたびに確率加算の値(%)を20減算。"};
      if(card){
        const newcard = JSON.parse(JSON.stringify(card));
        let naturetext='';
        for(let i=0;i<card.rarity;i++){if(Math.floor(Math.random()*100)<20){
                                         newcard.rarity--;
                                         newcard.probadd-=20;
                                         naturetext+='❌'; }; };
        if(newcard.rarity<card.rarity) newcard.nature='⭐'+newcard.rarity+naturetext;
        return newcard;
      } else return outline;
    },
  },
  {
    id: "じゅうそ",
    f: (card) => {
      const outline = {
        title: "ロンパース",
        description: "20%の確率で元の姿(⤴️)のまま現れる。",
      };
      if (card) {
        if (Math.floor(Math.random() * 100) < 20) {
          const newcard = JSON.parse(JSON.stringify(card));
          newcard.nature = "⤴️";
          newcard.cm = Number(newcard.subcm.split("：")[1]);
          newcard.emoji = "👦";
          return newcard;
        } else return card;
      } else return outline;
    },
  },
  {
    id: "すばるす",
    f: (card) => {
      const outline = {
        title: "満月の光",
        description: "満月頃レアリティが5になり、人狼の姿(🌕)で現れる。",
      };
      if (card) {
        const m = tools.getMoon(tools.getTodayJp());
        if (m.moonname == "満月") {
          const newcard = JSON.parse(JSON.stringify(card));
          newcard.nature = "🌕";
          newcard.cm = Number(newcard.subcm.split("：")[1]);
          newcard.rarity = 5;
          return newcard;
        } else return card;
      } else return outline;
    },
  },
  {
    id: "でぃあな",
    f: (card) => {
      const outline = {
        title: "満月の光",
        description: "満月頃レアリティが5になり、人狼の姿(🌕)で現れる。",
      };
      if (card) {
        const m = tools.getMoon(tools.getTodayJp());
        if (m.moonname == "満月") {
          const newcard = JSON.parse(JSON.stringify(card));
          newcard.nature = "🌕";
          newcard.rarity = 5;
          return newcard;
        } else return card;
      } else return outline;
    },
  },
  {
    id: "てんろう",
    f: (card) => {
      const outline = {
        title: "人狼",
        description: "月の満ち欠けに応じて姿が決定される。\n🌑🌒🌓🌔🌕🌖🌗🌘",
      };
      if (card) {
        const newcard = JSON.parse(JSON.stringify(card));
        const m = tools.getMoon(tools.getTodayJp());
        newcard.nature = m.emoji;
        return newcard;
      } else return outline;
    },
  },
  {
    id: "のたゆめ",
    f: (card) => {
      const outline = {
        title: "リバーシ",
        description: "ランダムで人格が決定される。\n◻️：天文部 / ◼️：流星部",
      };
      if (card) {
        const newcard = JSON.parse(JSON.stringify(card));
        const patterns = [
          { nature: "◻️", club: "天文" },
          { nature: "◼️", club: "流星" },
        ];
        const index = Math.floor(Math.random() * 2);
        newcard.nature = patterns[index].nature;
        newcard.club = patterns[index].club;
        return newcard;
      } else return outline;
    },
  },
  {
    id: "はぎおち",
    f: (card) => {
      const outline = {
        title: "引っ込み思案",
        description: "20%の確率でたんぽぽちゃんと代わる(🫥)。",
      };
      if (card) {
        if (Math.random()*100 < 20) {
          const newcard = JSON.parse(JSON.stringify(card));
          newcard.nature = "🫥";
          newcard.name = "たんぽぽちゃん";
          newcard.subname = "たんぽぽちゃん";
          newcard.kana = "たんぽぽちゃん";
          newcard.nickname = "たんぽぽちゃん - "
          newcard.cm = 25;
          return newcard;
        } else return card;
      } else return outline;
    },
  },
];

exports.getnature = function (c) {
  const nature = exports.natures.find((n) => c.id.includes(n.id));
  if (nature) return nature.f(c);
  else return c;
};

//■■■■■■■■■■■■■■■■■■■■ペンタ特殊ドロー

exports.drawings = [
  {id:'なしだき',
    f:(i)=>{
      const outline = {title:'家庭科教師', description:'効果無効🚫の生徒カードがあるとき15%の確率で追加。'};
      if(i){try{
        const condition = i.cards.some(cc=>cc.frozen);
        if( condition && Math.random()*100 < 15 ){
          return { target:'Tcards', log:{title:outline.title, description:outline.description} };
        }else return;
      }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline;
    }
  },
  {id:'はくりん',
    f:(i)=>{
      const outline = {title:'食堂調理員', description:'よく動いたカードがあるとき10%の確率で追加。昼間(8～16時)は確率3倍。'};
      if(i){try{
        const condition = i.prefields.some(pf=>pf.type=='effect'&&pf.fxtype.includes('sortcard'));
        const bonustime = (8<=i.hour&&i.hour<16);
        if( condition && Math.random()*100 < 10*(bonustime?3:1) ){
          return { target:'Tcards', log:{title:outline.title, description:outline.description} };
        }else return;
      }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline;
    }
  },
  {id:'ばんどう',
    f:(i)=>{
      const outline = {title:'養護教諭', description:'レアリティを負傷した生徒カードがあるとき15%の確率で追加。'};
      if(i){try{
        const condition = i.cards.some(cc=>cc.rarity<i.characters.concat(exports.additional).find((ccc) => ccc.id == cc.id).rarity);
        if( condition && Math.random()*100 < 15 ){
          return { target:'Tcards', log:{title:outline.title, description:outline.description} };
        }else return;
      }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline;
    }
  },
  {id:'ひだりゆ',
    f:(i)=>{
      const outline = {title:'用務員', description:'60p以上の損壊を出した効果があるとき10%の確率で追加。夜間(20～4時)は確率3倍。'};
      if(i){try{
        const condition = i.prefields.some(pf=>pf.type=='effect'&&pf.fxtype.includes('add')&&pf.add<=-60);
        const bonustime = (20<=i.hour||i.hour<4);
        if( condition && Math.random()*100 < 10*(bonustime?3:1) ){
          return { target:'Tcards', log:{title:outline.title, description:outline.description} };
        }else return;
      }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline;
    }
  },
  {id:'かりおす',
    f:(i)=>{
      const outline = {title:'鳥', description:'生徒会のカードが2枚以上あるとき10%の確率で追加。マイナス縁がある場合は確率3倍。'};
      if(i){try{
        const condition = (2<=i.cards.filter(cc=>cc.committee.includes('生徒会')).length);
        const cardss = [...i.cards, ...i.Tcards];
        const conbonus = cardss.some(cc=>{const relationlog = tools.checkrelation(cc, cardss, i.characters);
                                          return (relationlog.length&&relationlog.some(rl=>rl.minus));});
        if( condition && Math.random()*100 < 10*(conbonus?3:1) ){
          return { target:'Tcards', log:{title:outline.title, description:outline.description} };
        }else return;
      }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline;
    }
  },
];

//■■■■■■■■■■■■■■■■■■■■ペンタ特殊効果

exports.effects = [
  {
    id: "あいしゃ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ね、言ったでしょ？",
        description:
          "0～5までのランダムな数字を宣言し、ここまでの発動効果数と一致するときここまでの合計点を2倍にする。5は「5以上」として扱う。",
        detail: "",
        possibility:['mulplus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const d = Math.floor(Math.random() * 6);
          const e = i.prefields.filter((pf) => pf.type == "effect").length;
          const cons = [d == (5 < e ? 5 : e)];
          if (cons.every((con) => con)) {
            o.log.description += "\n宣言：「" + d + "！」的中";
            const mul = 2;
            o.log.mul = mul;
            o.log.notes =
              i.totalP + "p × " + mul + " = " + i.totalP * mul + "p";
            o.log.fxtype.push("after", "random", "mul");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "あいしゃ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ちょっぴり未来予知",
        description:
          "Lvが自身以下の生徒カードがあるとき、自身がその生徒カードより前に出ていれば該当カードのLvの伸びしろに応じて加点する。",
        detail:
          "該当カードごとにLvのMAX+1(=6)までの不足分×5pを加算する。自身がLv.EXTRAである場合はEXTRA+1(=8)までの不足分×5pを加算する。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targets = i.cards
            .slice(i.index)
            .filter((cc) => cc.collected <= i.c.collected && cc.id !== i.c.id);
          if (targets.length > 0) {
            const add =
              targets
                .map((cc) => (i.c.collected == 7 ? 8 : 6) - cc.collected)
                .reduce((a, b) => a + b) * 5;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'あいしゃ正', phase:['後'], f:(i)=>
    { const outline ={title:           'ぶっつけ福笑い',
                      description:     '福笑いを行い、ここまでの合計点に1+(顔パーツがずれたマス数÷10)を掛ける。',
                      detail:          '1つもずれていない顔が完成した場合、おもんないため-2を掛ける。\n自身以外に(正月)とつくカードがある場合、枚数分の顔パーツをマス数が1増える別のパーツへ変更する。\n正しい顔は以下の通り。\n> ▪️▪️▪️▪️▪️\n> ▪️👁️▪️👁️▪️\n> ▪️▪️👃▪️▪️\n> ▪️▪️👄▪️▪️\n> ▪️▪️▪️▪️▪️\n各パーツは約70%の確率で正しい位置に配置される。',
                      eventdescription:'《イベント》まぎかるたのさいころの出目を1加算(最大6)。',
                      possibility:['random','mulplus','mulminus']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const partsdata = [{index:0, name:'なし', emoji:'▪️'},
                             {index:1, name:'右目', emoji:'👁️', wrong:'🧿', correct:[1,1], minY:0, maxY:2 },
                             {index:2, name:'左目', emoji:'👁️', wrong:'🧿', correct:[3,1], minY:0, maxY:2 },
                             {index:3, name:'鼻',   emoji:'👃', wrong:'🐽', correct:[2,2], minY:1, maxY:3 },
                             {index:4, name:'口',   emoji:'👄', wrong:'👅', correct:[2,3], minY:2, maxY:4}];
          const parts = partsdata.map(p=>p.emoji);
                    // X 0 1 2 3 4      Y
          const area = [[0,0,0,0,0], // 0
                        [0,0,0,0,0], // 1
                        [0,0,0,0,0], // 2
                        [0,0,0,0,0], // 3
                        [0,0,0,0,0]];// 4
          const zure = [null,0,0,0,0];
          let wrongtext = '';
          
          //パーツ変更
          const targetsnum = [...i.cards, ...i.Tcards].filter(cc=>cc.id!==i.c.id&&cc.eventid&&cc.eventid=='NEWYEAR').length;
          if(0<targetsnum){
            const wrongresults = [];
            const indexes = tools.shufflenum(Array(parts.length-1).fill().map((e,index)=>index+1), targetsnum);
            for(let j=0;j<indexes.length;j++){
              const pindex = indexes[j];
              parts[pindex] = partsdata[pindex].wrong;
              zure[pindex] += 1;
              wrongresults.push( partsdata[pindex].name + partsdata[pindex].emoji + ' → ' + partsdata[pindex].wrong + '(+1)' );
            };
            wrongtext = '\n変更：'+wrongresults.join('　');
          };
          //福笑い
          let eyeLminX = 0;
          for(let k=1; k<parts.length; k++){
            const pd = partsdata[k];
            let x;
            let y;
            do{
              x = (Math.random()<0.68&&eyeLminX<=pd.correct[0]) ? pd.correct[0] : Math.floor(Math.random()*(k==2 ? 5-eyeLminX : 5) ) + (k==2 ? eyeLminX : 0);
              y = (Math.random()<0.68) ? pd.correct[1] : Math.floor(Math.random()*(pd.maxY+1-pd.minY))+pd.minY;
            }
            while(area[y][x]!==0);
            if(k==1) eyeLminX = x;
            area[y][x] = k;
            const xy = [x,y];
            zure[k] += pd.correct.map((e,index)=>Math.abs(e-xy[index])).reduce((a,b)=>a+b);
          };
          //最終結果
          const arearesult = area.map(line=>'> '+line.map(cell=>parts[cell]).join('')).join('\n');
          const allzure = zure.slice(1).reduce((a,b)=>a+b);
          if(allzure==0) o.log.special = 'GOODFACE';
          const mul = (0<allzure) ? 1+(allzure/10) : -2;
          o.log.mul = mul;
          o.log.notes = i.totalP+'p × '+mul+' = '+Math.floor(i.totalP*mul)+'p';
          o.log.fxtype.push('after','mul','random');
          o.log.description+= '\n' + arearesult + (0<allzure ? '' : '\n> - 𝑷𝑬𝑹𝑭𝑬𝑪𝑻 -')
                            + wrongtext
                            + '\nずれ：' + parts.map((p,index)=>p+zure[index]).slice(1).join(' ') + '\n合計：' + allzure + 'マス → ' + mul + '倍' + (0<allzure ? '' : ' (おもんないため)');
          if(i.event&&i.event.id==i.c.eventid) o.log.description+='\n'+outline.eventdescription;
          return o;
        }catch(error){return {error:true, title:outline.title, message:error.message}};
      }
      else return outline;
    }
  },
  {
    id: "あいびー",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "植物第一",
        description:
          "ここまでのリザルト表示・効果説明を見て、自身以外の植物系絵文字が出ていれば全ての植物系絵文字の数×8pの加算を、また常に顔・動物・人型系絵文字×8pの減算を行う。",
        detail: "",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =
            i.resultlist.join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("");
          const plantemoji = exports.emjlist["植物"];
          const animalemoji = [
            ...exports.emjlist["顔"],
            ...exports.emjlist["動物"],
            ...exports.emjlist["人型"],
          ];
          const seedlingnum = (
            targettext.match(new RegExp(i.c.emoji, "g")) || []
          ).length;
          const plantsnum = (
            targettext.match(
              new RegExp(
                plantemoji.filter((emoji) => emoji !== i.c.emoji).join("|"),
                "g"
              )
            ) || []
          ).length;
          const animalsnum = (
            targettext.match(new RegExp(animalemoji.join("|"), "g")) || []
          ).length;
          const cons = [plantsnum > 0 || animalsnum > 0];
          if (cons.every((con) => con)) {
            const plus = plantsnum > 0 ? (seedlingnum + plantsnum) * 8 : 0;
            const minus = animalsnum * -8;
            const notes =
              plus > 0
                ? plus + "p" + (minus < 0 ? " " + minus + "p" : "")
                : minus + "p";
            o.log.add = plus + minus;
            o.log.notes = notes;
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "あいびー事",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "絶対こいつです！！",
        description:
          "1つ次の生徒カードが緑寮のものであるとき、指差して怯ませ効果無効🚫にしたうえで70p加算する。",
        detail: "",
        eventdescription: "《イベント》証拠品を2つ追加獲得する。",
        possibility:['editcard','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.index < i.cards.length - 1 && i.cards[i.index + 1].dorm == "緑寮",
          ];
          if (cons.every((con) => con)) {
            const add = 70;
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(o.cards[i.index + 1]));
            newcard.frozen = true;
            o.cards[i.index + 1] = newcard;
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const inum = 2;
              o.log.eventitems.num = inum;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                inum;
            }
            o.log.add = add;
            o.log.notes = tools.emj(o.cards[i.index + 1]) + add + "p";
            o.log.fxtype.push("before", "add", "editcard", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id: 'あさつき山', phase: ['後'], f: (i) =>
    { const gemsinfo = [{dorm:'青寮', type:'add', num:15, emoji:'🟦', detail:'水晶：対象枚数×15p加算'},
                        {dorm:'赤寮', type:'add', num:20, emoji:'🟥', detail:'ガーネット：対象枚数×20p加算'},
                        {dorm:'緑寮', type:'add', num:20, emoji:'🟩', detail:'翡翠：対象枚数×20p加算'},
                        {dorm:'黄寮', type:'coinadd', num:100, emoji:'🟨', detail:'砂金：対象枚数×100c獲得'}];
      const outline = {title:"ジェムハンティング！",
                       description:"生徒カードが2枚以上揃っている寮に対応した効果を適用する。",
                       detail: gemsinfo.map(gem=>gem.emoji+gem.detail).join('\n'),
                       eventdescription:'《イベント》食材🥬を追加獲得する。',
                       possibility:['addplus','coinadd']};
      if (i) {
        try {
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const addinfo = {add:0, coinadd:0, notes:[]};
          for(let j=0;j<gemsinfo.length;j++){
            const gem = gemsinfo[j];
            const targets = i.cards.filter(cc=>cc.dorm==gem.dorm);
            if(targets.length>=2){
              const num = targets.length*gem.num;
              addinfo[gem.type]+=num;
              addinfo.notes.push(gem.emoji+(gem.type=='add'?num+'p':'🪙'+num+'c'));
              o.log.description+='\n'+gem.emoji+gem.detail+'\n対象：'+targets.map(cc=>tools.emj(cc)).join('');
              o.log.fxtype.push(gem.type);
            };
          };
          if(addinfo.notes.length>0){
            o.log.add=addinfo.add;
            o.log.coinadd=addinfo.coinadd;
            o.log.notes=addinfo.notes.join(' ');
            o.log.fxtype.push('after');
            if(i.event&&i.event.id==i.c.eventid){o.log.special='curry';
                                                 o.log.description+='\n'+outline.eventdescription; };
            return o;
          }else return;
        } catch (error) { return { error: true, title: outline.title, message: error.message }; }
      } else return outline;
    }
  },
  {
    id: "あじすか雪",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "赤寮軍、参る",
        description: "40%の確率で後続の生徒カードを全て赤寮のものにする。",
        detail: "赤寮の生徒カードをじゅうぶんに持っていない場合は発動しない。",
        eventdescription:
          "《イベント》赤寮の生徒カード枚数×Lv個の雪玉を追加獲得する。",
        possibility:['prob','changecard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.index < i.cards.length - 1,
            i.allcards.filter((ac) => ac.dorm == "赤寮").length >=
              i.cards.length,
            Math.floor(Math.random() * 100) < 40 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            for (let j = i.index + 1; j < i.cards.length; j++) {
              const choices = i.allcards.filter(
                (chr) =>
                  chr.dorm == "赤寮" &&
                  !o.cards
                    .slice(0, j)
                    .find((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4))
              );
              const newcard =
                choices[Math.floor(Math.random() * choices.length)];
              o.cards[j] = exports.getnature(newcard);
            }
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              const iadd =
                i.cards.filter((cc) => cc.dorm == "赤寮").length *
                i.c.collected;
              o.log.eventitems.index = iindex;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
            }
            o.log.fxtype.push(
              "before",
              "prob",
              "changecard",
              "random",
              "event"
            );
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "あすかあ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "超古代の化石",
        description:
          "自身以外に「化石」「知識」「仲間」に対応する生徒カードがあったとき、揃い具合に応じて恐竜・翼竜へ変身する。",
        detail:
          "化石(鉱物研究部)・知識(図書委員会)・仲間(ボランティア部)のうち揃ったものが3つでティラノサウルス、2つでトリケラトプス、1つでプテラノドンになり、効果名も「化石」から「顎」「角」「翼」へ変化する。",
        possibility:['editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          let fulfill = 0;
          let fulfilllist = "";
          const ksk = i.cards.filter((cc) => cc.club.includes("鉱物研究"));
          if (ksk.length) {
            fulfill++;
            fulfilllist += "化石：" + ksk.map((cc) => tools.emj(cc)) + "　";
          }
          const csk = i.cards.filter((cc) => cc.committee.includes("図書"));
          if (csk.length) {
            fulfill++;
            fulfilllist += "知識：" + csk.map((cc) => tools.emj(cc)) + "　";
          }
          const nkm = i.cards.filter(
            (cc) => cc.club.includes("ボランティア") && cc.id !== i.c.id
          );
          if (nkm.length) {
            fulfill++;
            fulfilllist += "仲間：" + nkm.map((cc) => tools.emj(cc));
          }
          const cons = [fulfill > 0];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            o.log.description += "\n" + fulfilllist;
            if (fulfill == 1) {
              o.log.title = "超古代の翼";
              const newcard = Object.assign({}, i.c);
              newcard.name = "プテラノドン("+i.c.emoji+"亞紀斗)";
              o.cards[i.index] = newcard;
            }
            if (fulfill == 2) {
              o.log.title = "超古代の角";
              const newcard = Object.assign({}, i.c);
              newcard.name = "トリケラトプス("+i.c.emoji+"亞紀斗)";
              o.cards[i.index] = newcard;
            }
            if (fulfill == 3) {
              o.log.title = "超古代の顎";
              const newcard = Object.assign({}, i.c);
              newcard.name = "ティラノサウルス("+i.c.emoji+"亞紀斗)";
              o.cards[i.index] = newcard;
            }
            o.log.fxtype.push("before", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "あすかあ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "考古学",
        description:
          "自身の姿が変化しているとき、古生物の種類に応じて加点する。",
        detail:
          "ティラノサウルス：200p\nトリケラトプス：生徒Lv合計×5p\nプテラノドン：生徒Lv合計×3p",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.c.name.match(/ティラノサウルス|トリケラトプス|プテラノドン/),
          ];
          if (cons.every((con) => con)) {
            let add = 0;
            if (i.c.name.match(/ティラノサウルス/)) {
              add = 200;
              o.log.description += "\nティラノサウルス：200p";
            }
            if (i.c.name.match(/トリケラトプス/)) {
              add =
                i.cards.map((cc) => cc.collected).reduce((a, b) => a + b) * 5;
              o.log.description += "\nトリケラトプス：生徒Lv合計×5p";
            }
            if (i.c.name.match(/プテラノドン/)) {
              add =
                i.cards.map((cc) => cc.collected).reduce((a, b) => a + b) * 3;
              o.log.description += "\nプテラノドン：生徒Lv合計×3p";
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'あにまあ', phase:['後'], f:(i)=>
    {const outline = {title:           '審判の日',
                      description:     '全生徒カードのかな表記の文字数の合計×1.5pを、前のほうにいる場合加算、後ろのほうにいる場合減算。端にいる場合は加減算する値をさらに1.5倍にする。',
                      detail:          '小数点以下切捨。',
                      possibility:['addplus','addminus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               if(!(i.cards.length%2!==0&&Math.floor(i.cards.length/2)==i.index)){
                 const kanalength = i.cards.map(cc=>cc.kana).join('').length;
                 const front = ( i.index < Math.floor(i.cards.length / 2 ) );
                 const ends  = ( i.index == 0 || i.index == i.cards.length-1 );
                 const add = Math.floor( kanalength * 1.5 * (ends ? 1.5 : 1) ) * (front ? 1 : -1);
                 o.log.add=add; o.log.notes=kanalength+'×1.5'+(ends?'×1.5':'')+' → '+add+'p';
                 o.log.fxtype.push('after','add');
                 return o;
               }else return;
               
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'あまみや', phase:['前'], f:(i)=>
    {const outline = {title:           'トリックドラッグ',
                      description:     '1つ次の生徒カードのレアリティが自身より低いとき該当カードに幻視魔法をかけ、ハイな状態にしてレアリティを1上げる。ただし20%の確率でバッドトリップ状態となり、レアリティが1下がる。',
                      detail:          '確率加算はハイになる方向に働く。レアリティは0未満にはならない。',
                      possibility:['editcard','random']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [(i.index<i.cards.length-1&&i.cards[i.index+1].rarity<i.c.rarity)];
               if(cons.every(con=>con)){o.cards=i.cards;
                                        const newcard=JSON.parse(JSON.stringify(i.cards[i.index+1]));
                                        if(Math.floor(Math.random()*100)<80+i.c.probadd){
                                          newcard.rarity++;
                                          o.log.notes='HIGH';
                                          o.log.description+='\n「イってらっしゃい♪」\n対象：'+tools.emj(newcard)+i.cards[i.index+1].rarity+'→'+newcard.rarity;
                                        }
                                        else{
                                          newcard.rarity = newcard.rarity>0 ? newcard.rarity-1 : 0;
                                          o.log.notes='BAD';
                                          o.log.description+='\n「あ～…ま、がんばって」\n対象：'+tools.emj(newcard)+i.cards[i.index+1].rarity+'→'+newcard.rarity;
                                        };
                                        o.cards[i.index+1]=newcard;
                                        o.log.fxtype.push('before','editcard','random'); return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'あまみや菓', phase:['前'], f:(i)=>
  { const candies = 
             [
               {name:'〔🔴蛍光ピンク〕',detail:'いい匂いになり人が寄ってくる。末尾にランダムな生徒カードを1枚追加する。'},
               {name:'〔🟢蛍光グリーン〕',detail:'キまる。対象カードを効果無効🚫にし、代わりに20p加算。'},
               {name:'〔🔵蛍光ブルー〕',detail:'少し悲しくなる。対象カードの絵文字を🥺に書き換える。'},
               {name:'〔🟣蛍光パープル〕',detail:'なんだかわからないがすごく美味しく感じる。更に1つ後ろの生徒カードに飴を配る。'},
               {name:'〔✨ラメ〕',detail:'キラキラになる。対象カードのレアリティを1上げる。'},
               {name:'〔⚫黒〕',detail:'クソまず。対象カードのレアリティを1下げる。'}
             ]
     const outline = {title:           'ミステリーキャンディ',
                      description:     '1つ後ろの生徒カードに、好みが分かれるケミカルな味の飴を食べさせる。色に応じた追加効果が適用される。',
                      detail:          '25%の確率で飴を吐いてしまい、追加効果は適用されない。確率加算は吐かない方向に働く。\n'
                                       +candies.map(candy=>candy.name+candy.detail).join('\n')+'レアリティは0未満にはならない。',
                      eventdescription:'《イベント》飴を食べていれば魔法の生地を1個追加獲得する。',
                      possibility:['editcard','addplus','random']};
     if(i){
       try{
         if(i.index<i.cards.length-1){
           const o=JSON.parse(JSON.stringify(fxoutput));
           o.cards=i.cards;
           o.log.fxtype.push("before","random");
           o.log.fxowner=i.c;
           o.log.title=outline.title; 
           o.log.description=outline.description+'\n「はい、口開けて～」';
           let vomit = false;
           let isPurple = 0;

           for (let j = i.index + 1; j < i.cards.length; j++) 
           {
             isPurple =0;
             //▼条件           
             if(Math.floor(Math.random() * 100) < 75 + i.c.probadd)
             {
               const candy = candies[Math.floor(Math.random()*candies.length)];
               o.log.description+='\n'+candy.name+candy.detail;
               let newcard; console.log(candy.name);
               switch (candy.name) 
               {
                  case '〔🔴蛍光ピンク〕':  
                    const choices = i.allcards.filter(
                    (chr) => !i.cards.some((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4)));
                    newcard = exports.getnature
                      (
                      choices[Math.floor(Math.random() * choices.length)]
                      );
                    o.cards.push(newcard);             
                    o.log.description += "\n追加：" + tools.emj(newcard);
                    o.log.fxtype.push("addcard");
                  break;
                  case '〔🟢蛍光グリーン〕':
                    newcard = JSON.parse(JSON.stringify(o.cards[j]));
                    newcard.frozen = true;
                    o.cards[j] = newcard;
                    o.log.description += "\n対象：" + tools.emj(newcard);
                    const add = 20;
                    o.log.add = add;
                    o.log.notes = add + "p";
                    o.log.fxtype.push("add", "editcard");
                  break;
                  case '〔🔵蛍光ブルー〕':
                    newcard = JSON.parse(JSON.stringify(o.cards[j]));
                    newcard.emoji = "🥺";
                    o.log.description += "\n対象：" + tools.emj(i.cards[j])+'→'+tools.emj(newcard);  
                    o.cards[j] = newcard;
                    o.log.fxtype.push("editcard");           
                  break;
                  case '〔🟣蛍光パープル〕':
                    isPurple = 1;
                    o.log.description += "\n対象：" + tools.emj(o.cards[j]);
                  break;
                  case '〔✨ラメ〕':
                    newcard = JSON.parse(JSON.stringify(o.cards[j]));
                    newcard.rarity += 1;
                    o.log.description += "\n対象：" + tools.emj(newcard) + i.cards[j].rarity + ' → ' + newcard.rarity;            
                    o.cards[j] = newcard;
                    o.log.fxtype.push("editcard");
                  break;
                  case '〔⚫黒〕':
                    newcard = JSON.parse(JSON.stringify(o.cards[j]));
                    if(newcard.rarity >0)
                    {newcard.rarity -= 1;}  
                    o.log.description += "\n対象：" + tools.emj(newcard) + i.cards[j].rarity + ' → ' + newcard.rarity;         
                    o.cards[j] = newcard;
                    o.log.fxtype.push("editcard");
                  break;
               }
             }
             else
             {
               vomit=true;
               o.log.notes = "ｵｴー！！";  
               o.log.description+='\n〔❌吐〕追加効果なし';
               o.log.fxtype.push("nothing");
             };

             if(isPurple == 0) break;
           }

            //▼イベントアイテム
           if(i.event&&i.event.id==i.c.eventid){
             const iindex=0; o.log.eventitems.index=iindex;
            const iadd=vomit?0:1; o.log.eventitems.add=iadd;
            o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
            o.log.fxtype.push('event');
           };
           return o;  
         }else return;    
       }
       catch(error)
       {
         return {error:true, title:outline.title, message:error.message}
       };
     }
     return outline; 
  }
},
  {
    id: "あらたが",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "漢見せてやるゼ！！！",
        description: "Lv×5%の確率で漢を見せる。男子生徒カードがあるほど加点。",
        detail:
          "50pに加え、他の男子生徒カードの数×10p加算。プロフィールとして「男」を持っているカードに限る。",
        possibility:['prob','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            Math.floor(Math.random() * 100) < 5 * i.c.collected + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            let add =
              50 +
              (
                i.cards.filter(
                  (cc) =>
                    cc.id !== i.c.id && cc.genre == "stTm" && cc.sex == "男"
                ) || []
              ).length *
                10;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "prob", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "あらんあ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "おぬしも来い！",
        description: "50%の確率で末尾に移動し、もう1人連れてくる。",
        detail: "この効果は1度しか発動しない。",
        possibility:['prob','sortcard','addcard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            !i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == outline.title
            ),
            Math.floor(Math.random() * 100) < 50 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards.filter((cc) => cc.id !== i.c.id);
            o.cards.push(i.c);
            o.count--;
            const choices = i.allcards.filter(
              (chr) =>
                !i.cards.some((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4))
            );
            const newcard = exports.getnature(
              choices[Math.floor(Math.random() * choices.length)]
            );
            o.cards.push(newcard);
            o.log.description += "\n追加：" + tools.emj(newcard);
            o.log.fxtype.push("before", "prob", "sortcard", "addcard", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "あらんあ甘",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "アランの小さな魔法",
        description:
          "中央あたりにいるとき、男子及びプラス縁がある生徒カードに友チョコ・義理チョコ・余りチョコのどれかを渡す。",
        detail:
          "偶数枚の場合は中央2枚が発動位置となる。基本的には友チョコ(30p)・義理チョコ(20p)・余りチョコ(10p)からランダムで決定され、プラス縁がある場合は必ず友チョコになる。",
        eventdescription:
          "《イベント》対象カードの枚数分チョコを追加獲得する。",
        possibility:['random','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const rls = i.c.relation.split(" - ")[0].split("/");
          const targetcards = i.cards.filter(
            (cc) =>
              cc.sex == "男" ||
              rls.some((rl) => cc.nickname.split(/\/|\s-\s/).includes(rl))
          );
          const cons = [
            i.index == Math.ceil(i.cards.length * 0.5 - 0.5) ||
              i.index == Math.floor(i.cards.length * 0.5 - 0.5),
            targetcards.length > 0,
          ];
          if (cons.every((con) => con)) {
            let add = 0;
            const chocos = [
              [30, "友"],
              [20, "義理"],
              [20, "義理"],
              [10, "余り"],
              [10, "余り"],
              [10, "余り"],
            ];
            const chocoresult = [];
            targetcards.forEach((t) => {
              const chocoindex = rls.some((rl) =>
                t.nickname.split(/\/|\s-\s/).includes(rl)
              )
                ? 0
                : Math.floor(Math.random() * chocos.length);
              add += chocos[chocoindex][0];
              chocoresult.push(
                tools.emj(t) +
                  chocos[chocoindex][1] +
                  chocos[chocoindex][0] +
                  "p"
              );
            });
            o.log.description += "\n対象：" + chocoresult.join(" ");
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = targetcards.length;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "random", "add", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id:'あらんあ記', phase:['前'], f:(i)=>
    { const outline = {title:           'おぬしも来んか？',
                       description:     '自身のLv×5%の確率で末尾に移動し、あなたを巻き込む。',
                       detail:          'この効果は1度しか発動しない。\nプレイヤーを生徒カードとして追加する。プレイヤーカードは、お気に入りカードに設定している生徒がいればその生徒の科目・学年・寮・レアリティ・Lv情報、情報の元となったカードへの縁を持つ。',
                       possibility:['prob','sortcard','addcard','editcard']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          if(!i.prefields.some(pf=>pf.type=='effect'&&pf.title==outline.title) && Math.random()*100<i.c.collected*5+i.c.probadd){
            o.cards = i.cards.filter(cc=>cc.id!==i.c.id);
            o.cards.push(i.c);
            o.count--;
            const newcard = JSON.parse(JSON.stringify(exports.additional.find(adc=>adc.id=='ぷれいや')));
            const playername = (i.message.member?i.message.member.displayName:i.message.author.username);
            newcard.name = playername;
            const favcard = (i.favoriteid) ? [...i.allcards,...i.allTcards].find(cc=>cc.id==i.favoriteid) : undefined;
            if(favcard){
              const keys = ['major','grade','dorm','rarity','collected'];
              keys.forEach(key=> newcard[key] = favcard[key]);
              newcard.relation = favcard.nickname.split('/')[0] + ' - ';
            };
            o.cards.push(newcard);
            o.log.description+='\n追加：' + tools.emj(newcard) + playername;
            o.log.fxtype.push('before','prob','sortcard','addcard','editcard');
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "ありすが",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "チェシャーの猫",
        description:
          "気まぐれな確率で頭上を飛び越えて、全体を見下ろせる位置へ移動する。飛び越えた生徒カードの枚数×20p加算。",
        detail:
          "時刻の分数の下1桁×11%の確率で発動する。確率加算の影響は受けない。",
        possibility:['addplus','prob','sortcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          console.log(
            "(i.realDate.getMinutes()%10)*11 → " + (i.realDate.getMinutes() % 10) * 11
          );
          const cons = [
            i.index > 0,
            Math.floor(Math.random() * 100) < (i.realDate.getMinutes() % 10) * 11,
          ];
          if (cons.every((con) => con)) {
            const add = i.index * 20;
            o.cards = i.cards;
            o.cards.splice(i.index, 1);
            o.cards.unshift(i.c);
            o.log.description += "\n移動：" + (i.index + 1) + "枚目 → 1枚目";
            o.log.add = add;
            o.log.notes = i.index + "×20 = " + add + "p";
            o.log.fxtype.push("before", "add", "prob", "sortcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ありすが",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "な、なに",
        description:
          "【チェシャーの猫】が発動していて先頭にいないとき、驚いて跳び上がりランダムで±50p加算。",
        detail: "",
        possibility:['addplus','addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.prefields.find((pf) => pf.title == "チェシャーの猫"),
            i.index > 0,
          ];
          if (cons.every((con) => con)) {
            const add = Math.floor(Math.random() * 100) < 50 ? 50 : -50;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ありすが踊",
    phase: ["前"],
    f: (i) => {
      const details = [
        "〔0～6時〕姿を消す。自身へのプラス縁を持つ生徒カードのレアリティ合計×30p加算。",
        "〔6～18時〕なし。",
        "〔18～24時〕自身へのプラス縁を持つ生徒カードであれば必ず、そうでなければ50%の確率で目に留まり1枚につき15p加算。",
      ];
      const outline = {
        title: "零時の鐘",
        description: "時間帯に応じて内容が変化する。",
        detail: details.join("\n") + "確率加算は目に留まる方向に働く。",
        eventdescription:
          "《イベント》この効果による得点から20pごとに1個ずつダンスpを追加獲得する。",
        possibility:['delcard','leaving','addplus','prob']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.date.getHours() < 6 || 18 <= i.date.getHours()];
          if (cons.every((con) => con)) {
            const chisa = i.characters.find((ccc) => ccc.id == "ありすが");
            let add = 0;
            if (i.date.getHours() < 6) {
              o.log.description += "\n" + details[0];
              o.cards = i.cards.filter((cc) => cc.id !== i.c.id);
              o.count--;
              o.log.fxtype.push("delcard","leaving");
              const targets = o.cards.filter((cc) =>
                cc.relation
                  .split(/\s-\s/)[0]
                  .split("/")
                  .some((rl) => chisa.nickname.split(/\/|\s-\s/).includes(rl))
              );
              if (targets.length > 0) {
                add =
                  targets.map((cc) => cc.rarity).reduce((a, b) => a + b) * 30;
                o.log.description +=
                  "\n対象：" + targets.map((cc) => tools.emj(cc)).join("");
                o.log.notes = add + "p";
                o.log.add = add;
                o.log.fxtype.push("add");
              }
            } else {
              const targets = i.cards.filter(
                (cc) =>
                  cc.id !== i.c.id &&
                  (cc.relation
                    .split(/\s-\s/)[0]
                    .split("/")
                    .some((rl) =>
                      chisa.nickname.split(/\/|\s-\s/).includes(rl)
                    ) ||
                    Math.floor(Math.random() * 100) < 50 + i.c.probadd)
              );
              if (targets.length == 0) {
                return;
              }
              o.log.description +=
                "\n" +
                details[2] +
                "\n対象：" +
                targets.map((cc) => tools.emj(cc)).join("");
              add = targets.length * 15;
              o.log.notes = add + "p";
              o.log.add = add;
              o.log.fxtype.push("add","prob");
            }
            o.log.fxtype.push("before");
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(add / 20);
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ありすが人",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "今のって……？",
        description:
          "後方へ歩いていくところを見かけるが、振り返った頃には見失ってしまう。通り過ぎた生徒カードの枚数×20p加算。",
        detail:
          "通常の有栖川千紗に変化し、末尾に移動する。末尾にいる場合、有栖川千紗を持っていない場合は発動しない。",
        possibility:['addplus','changecard','sortcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.allcards.some((cc) => cc.id == "ありすが"),
            i.index < i.cards.length - 1,
          ];
          if (cons.every((con) => con)) {
            const add = (i.cards.length - 1 - i.index) * 20;
            o.log.add = add;
            o.log.notes = i.cards.length - 1 - i.index + "×20 = " + add + "p";
            o.cards = i.cards;
            o.cards.splice(i.index, 1);
            o.cards.push(
              exports.getnature(i.allcards.find((cc) => cc.id == "ありすが"))
            );
            o.log.description +=
              "\n移動：" + (i.index + 1) + "枚目 → " + i.cards.length + "枚目";
            o.count = 0;
            o.log.fxtype.push("before", "add", "changecard", "sortcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ありすが人",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ばれた？",
        description:
          "末尾にいるとき、自身へのプラス縁を持つカードか魔視科・魔変科・魔魂科の教師カードがあれば必ず、クラスメイトのカードがあれば50%の確率で振り返られて正体に気付かれる。気付けたカードの枚数×70p加算。",
        detail: "確率加算は気付く方向に働く。",
        possibility:['prob','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          if (i.index == i.cards.length - 1) {
            const chisa = i.characters.find((ccc) => ccc.id == "ありすが");
            const targets = [...i.cards, ...i.Tcards].filter(
              (cc) =>
                cc.id !== i.c.id &&
                (cc.relation
                  .split(/\s-\s/)[0]
                  .split("/")
                  .some((rl) =>
                    chisa.nickname.split(/\/|\s-\s/).includes(rl)
                  ) ||
                  (cc.genre == "tcTm" && cc.major.match(/魔視|魔変|魔魂/)))
            );
            const halftargets = i.cards.filter(
              (cc) =>
                cc.id !== i.c.id &&
                cc.major == i.c.major &&
                cc.grade == i.c.grade &&
                Math.floor(Math.random() * 100) < 50 + i.c.probadd
            );
            if (halftargets.length > 0) {
              targets.push(...halftargets);
              o.log.fxtype.push("prob");
            }
            if (targets.length > 0) {
              const add = targets.length * 70;
              o.log.description +=
                "\n気付：" + targets.map((t) => tools.emj(t)).join("");
              o.log.add = add;
              o.log.notes = targets.length + "×70 = " + add + "p";
              o.log.fxtype.push("after", "add");
              return o;
            }
          }
          return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "あるとあ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "王の威厳",
        description:
          "ちょうど中央にいるとき、所持している通常生徒カードの枚数+100p加算。",
        detail: "枚数が偶数である場合は判定しない。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            !i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == "あの時をもう一度"
            ),
            i.cards.length % 2 !== 0,
            Math.floor(i.cards.length / 2) == i.index,
          ];
          if (cons.every((con) => con)) {
            let add =
              100 +
              i.allcards.filter((ac) => !ac.eventid && ac.genre == "stTm")
                .length;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'あるとあ正', phase:['前'], f:(i)=>
    { const details = ['〔0～6時〕2枚まで',
                       '〔6～8時〕5枚まで',
                       '〔8～24時〕1枚まで',
                       '〔賀正〕1月であるとき、(正月)とつく全生徒カードの通常計算の得点を10p増加。'];
      const outline ={title:           '初日の出',
                      description:     '先頭にいるとき、時間帯に応じた枚数分後続の生徒カードを(正月)とつくものへ入れ替える。',
                      detail:          details.join('\n')+'\n対象となる生徒カードをじゅうぶんに持っていない場合は発動しない。',
                      eventdescription:'《イベント》まぎかるたのさいころの出目を1加算(最大6)。',
                      possibility:['changecard','editcard']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          if(i.index==0){
            const hour = i.date.getHours();
            const num = (hour<6) ? 2 : (6<=hour&&hour<8) ? 5 : 1;
            o.cards=i.cards;
            if(num<=i.allcards.filter(chr=>chr.genre=='stTm'&&chr.eventid&&chr.eventid=='NEWYEAR'&&!o.cards.some(cc=>cc.id.slice(0, 4)==chr.id.slice(0, 4))).length){
              const Jan = (i.date.getMonth()+1==1);
              const results = [];
              const resultsB = [];
              o.cards.forEach((cc,index)=>{
                if(0<index&&index<=num){
                  const choices = i.allcards.filter(chr=>chr.genre=='stTm'&&chr.eventid&&chr.eventid=='NEWYEAR'&&!o.cards.some(cc=>cc.id.slice(0, 4)==chr.id.slice(0, 4)));
                  const newcard = choices[Math.floor(Math.random()*choices.length)]
                  results.push(tools.emj(newcard));
                  o.cards[index] = exports.getnature(newcard);
                };
              });
              o.log.fxtype.push('changecard');
              o.log.description+='\n'+details[(hour<6)?0:(6<=hour&&hour<8)?1:2]+'\n入替追加：'+results.join('');
              
              if(Jan){
                o.cards.forEach((cc,index)=>{
                  if(cc.eventid&&cc.eventid=='NEWYEAR'){
                    const newcard=JSON.parse(JSON.stringify(cc));
                    newcard.basicadd+=10;
                    resultsB.push(tools.emj(newcard));
                    o.cards[index] = newcard;
                  };
                });
                o.log.fxtype.push('editcard');
                o.log.description+='\n'+details[3]+'\n対象：'+resultsB.join('');
              };
              
              o.log.fxtype.push('before');
              if(i.event&&i.event.id==i.c.eventid) o.log.description+='\n'+outline.eventdescription;
              return o;
            };
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};
      }
      else return outline;
    }
  },
  {
    id: "いかりや",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "マジかよ……",
        description:
          "生徒カードによる得点加算の効果があってマイナス値を出しているとき、後始末をしてこれを打ち消せる分の加点を行う。",
        detail: "得点乗算の効果は対象としない。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetfxs = i.prefields.filter(
            (pf) =>
              pf.type == "effect" &&
              pf.fxowner.genre == "stTm" &&
              pf.fxtype &&
              pf.fxtype.includes("add") &&
              pf.add < 0
          );
          const cons = [targetfxs.length > 0];
          if (cons.every((con) => con)) {
            const add =
              targetfxs.map((pf) => pf.add).reduce((a, b) => a + b) * -1;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'いかりや海', phase:['後'], f:(i)=>
    {const outline = {title:           'セービングキネシス',
                      description:     'ここまでの合計点が0p未満のとき、0p以上になるまで100pを繰り返し加算。',
                      detail:          '',
                      eventdescription:'《イベント》この効果による得点から100pごとに1個ずつシーグラスを追加獲得する。',
                      possibility:['addplus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [(i.totalP<0)];
               if(cons.every(con=>con)){const add=Math.ceil(i.totalP*-1 / 100)*100;
                                        o.log.add=add; o.log.notes=add+'p'; o.log.fxtype.push('after','add');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=Math.floor(add / 100);; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  { id:'いさだれ', phase:['前'], f:(i)=>
    { const outline = {title:           '併走ツーリング',
                       description:     '自身以外の流星部の生徒カードによって得点加算を行う効果が発動されているとき、最も近いカードと同じだけの加算を行う。対象生徒と隣接していない場合は隣へ移動し、対称生徒が場にいない場合は自身もいなくなる。',
                       detail:          'この効果は1度しか発動しない。',
                       possibility:['addplus','addminus','sortcard','delcard','leaving']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const targetfxs = i.prefields.filter(pf=>pf.type=='effect'&&pf.fxowner.id!==i.c.id&&pf.fxowner.club.includes('流星')&&pf.fxtype&&pf.fxtype.includes('add'));
          //▼条件
          if(0<targetfxs.length && !i.prefields.some(pf=>pf.type=='effect'&&pf.title==outline.title)){
            const targetfx = targetfxs[targetfxs.length-1];
            const target = targetfx.fxowner;
            //同値の加算
            const add = targetfx.add; o.log.add=add; o.log.notes=add+'p';
            o.log.fxtype.push('before','add');
            o.log.description += '\n対象：'+tools.emj(target);
            
            //発動者が場にいる
            if(i.cards.some(cc=>cc.id==target.id)){
              const targetIdx = i.cards.findIndex(cc=>cc.id==target.id);
              //非隣接
              if(Math.abs(targetIdx-i.index)!=1){
                o.cards=i.cards.filter(cc=>cc.id!==i.c.id); 
                let insertIdx;
                //自分より前にいる
                if(targetIdx<i.index){
                  insertIdx = targetIdx + 1;
                }
                //自分より後ろにいる
                else{
                  insertIdx = targetIdx - 1;
                  o.count--;
                }
                o.cards.splice(insertIdx, 0, i.c);
                o.log.fxtype.push('sortcard');
                o.log.description += '\n移動：'+(i.index+1)+'枚目 → '+(insertIdx+1)+'枚目';
              }
            }
            //発動者が場にいない
            else{
              o.cards=i.cards.filter(cc=>cc.id!==i.c.id);
              o.count--;
              o.log.fxtype.push('delcard');
            };
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  { id:'いさだれ', phase:['後'], f:(i)=>
    { const outline = {title:           'ギフトラッピング',
                       description:     '自身と同じ学年・所属🚪であるか自身からのプラス縁を持つ生徒カードがあるとき、それぞれへのギフトをリボンでラッピングして贈る。',
                       detail:          'ギフト1つにつきランダムで10～30p加算。',
                       possibility:['addplus','random']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
           
          const targets = i.cards.filter(cc=>{
            if(i.c.id!==cc.id){
              if(i.c.grade==cc.grade || tools.checkdoor(i.c, cc) ) return true;
              else{
                const relationlog = tools.checkrelation(i.c, [cc], i.characters);
                return (relationlog[0]&&relationlog.plus);
              }
            }
            else return false;
          });
          
          //▼条件
          if(0<targets.length){
            const results = [];
            let add = 0;
            targets.forEach(cc=>{
              const oneadd = Math.floor(Math.random()*3+1)*10;
              add+=oneadd;
              results.push(tools.emj(cc)+oneadd+'p');
            });
            
            o.log.add=add; o.log.notes=add+'p';
            o.log.fxtype.push('after','add','random');
            o.log.description += '\n対象：'+results.join(' ');
            
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "いたくら",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "生物学",
        description:
          "動物系絵文字を持つカードによる得点加算の効果があるとき、そのなかで最大の加算をもう一度行う。",
        detail: "マイナス値も対象とする。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetfxs = i.prefields.filter(
            (pf) =>
              pf.type == "effect" &&
              pf.fxowner.emoji &&
              exports.emjlist["動物"].includes(pf.fxowner.emoji) &&
              pf.fxtype.includes("add")
          );
          const cons = [targetfxs.length > 0];
          if (cons.every((con) => con)) {
            const maxadd = Math.max(...targetfxs.map((pf) => pf.add));
            const targetfx = targetfxs.find((pf) => pf.add == maxadd);
            const add = targetfx.add;
            o.log.description +=
              "\n対象：" + tools.emj(targetfx.fxowner) + targetfx.title;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "いちかず",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "守人の本能",
        description:
          "自身より後に動物系絵文字を持つ生徒カードがあるとき、該当カードのLvとレアリティの合計×5p加算。さらに自身より前に顔系絵文字を持つ生徒カードがある場合、加算する点にその枚数+1を掛ける。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const animaltargets = i.cards.filter(
            (cc, index) =>
              index > i.index &&
              cc.emoji &&
              exports.emjlist["動物"].includes(cc.emoji)
          );
          if (animaltargets.length > 0) {
            const animalLRsum = animaltargets
              .map((t) => t.collected + t.rarity)
              .reduce((a, b) => a + b);
            let add = animalLRsum * 5;
            o.log.notes = animalLRsum + "×5";
            o.log.description +=
              "\n動物：" + animaltargets.map((t) => tools.emj(t)).join("");
            const facetargets = i.cards.filter(
              (cc, index) =>
                index < i.index &&
                cc.emoji &&
                exports.emjlist["顔"].includes(cc.emoji)
            );
            if (facetargets.length > 0) {
              add *= facetargets.length + 1;
              o.log.notes += "×" + (facetargets.length + 1);
              o.log.description +=
                "　顔：" + facetargets.map((t) => tools.emj(t)).join("");
            }
            o.log.add = add;
            o.log.notes += " = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "いちかず事",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "話を整理させてくれ",
        description:
          "得点加算を行う効果が2つ以上出ているとき、加算値が最大であるものと最小であるものの平均値を加点する。",
        detail: "小数点以下切捨。",
        eventdescription: "《イベント》証拠品を該当効果数×2個追加獲得する。",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetfxs = i.prefields.filter(
            (pf) =>
              pf.type == "effect" && pf.fxtype && pf.fxtype.includes("add")
          );
          const cons = [targetfxs.length >= 2];
          if (cons.every((con) => con)) {
            const maxadd = Math.max(...targetfxs.map((pf) => pf.add));
            console.log("maxadd：" + maxadd);
            const minadd = Math.min(...targetfxs.map((pf) => pf.add));
            console.log("minadd：" + minadd);
            const add = Math.floor((maxadd + minadd) / 2);
            const maxfx = targetfxs.find((pf) => pf.add == maxadd);
            const minfx = targetfxs.find(
              (pf) => pf.add == minadd && pf.name !== maxfx.name
            );
            o.log.description +=
              "\n判定：最大" +
              tools.emj(maxfx.fxowner) +
              maxadd +
              "p" +
              " 最小" +
              tools.emj(minfx.fxowner) +
              minadd +
              "p";
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = targetfxs.length * 2;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
              o.log.fxtype.push("event");
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "いちぎん",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "クイックドロー",
        description:
          "自身より前に顔・動物系絵文字を持つ生徒カードがあるとき、該当カードのLvとレアリティの合計×自身のLv分を加点する。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetemoji = [
            ...exports.emjlist["顔"],
            ...exports.emjlist["動物"],
          ];
          const targets = i.cards.filter(
            (cc, index) =>
              index < i.index && cc.emoji && targetemoji.includes(cc.emoji)
          );
          const cons = [targets.length > 0];
          if (cons.every((con) => con)) {
            const LRsum = targets
              .map((t) => t.collected + t.rarity)
              .reduce((a, b) => a + b);
            const add = LRsum * i.c.collected;
            o.log.description +=
              "\n標的：" + targets.map((t) => tools.emj(t)).join("");
            o.log.add = add;
            o.log.notes = LRsum + "×" + i.c.collected + " = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "いちぎん体",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "情熱引火",
        description:
          "自身より前にイベント生徒カードがあるとき、該当カードのLv合計×自身のLv分を加点する。対象の中に赤組タグを持つカードがある場合は加算する値を2倍に、その他の(体育祭)とつくカードがある場合は加算する値を1.5倍にする。",
        detail: "小数点以下切捨。",
        eventdescription:
          "《イベント》この効果による得点から30pごとに1個ずつ白組pを追加獲得する。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const targets = i.cards.slice(0, i.index).filter((cc) => cc.eventid && cc.eventid !== "SECRET");
          const cons = [0 < i.index, targets.length > 0];
          if (cons.every((con) => con)) {
            const Lsum = targets.map((cc) => cc.collected).reduce((a, b) => a + b);
            const red = targets.some((cc) => cc.tag.split("/").includes("赤組"));
            const sports = targets.some((cc) => cc.eventid && cc.eventid == "SPORTS");
            const add = Math.floor( Lsum * i.c.collected * (red ? 2 : sports ? 1.5 : 1) );
            o.log.description += "\n対象：" + targets.map((cc) => tools.emj(cc)).join("");
            o.log.add = add;
            o.log.notes = Lsum + "×" + i.c.collected + (red ? "×2 = " : sports ? "×1.5 → " : " = ") + add + "p";
            o.log.fxtype.push("after", "add");
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 1;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(add / 30);
              o.log.eventitems.add = iadd;
              o.log.description += "\n" + outline.eventdescription + (iadd !== 0 ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd : "");
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
{ id:'いっしき', phase:['前'], f:(i)=>
    { const details = ['〔保護色〕存在感を消す。性別・身長・作者・所属🚪・生まれ・タグ・縁 に関する情報が削除され、最も人数の多い寮に加わる。同数の場合はランダム。',
                       '〔目立つ変色〕存在感が増す。通常計算の得点を5p増加。',
                       '寮の重複がない場合、ランダムな追加効果が適用される。\n〔追加効果〕'];
      const adddetails = ['77p加算。',
                          '1～20pの加算を7回行う。',
                          '自身のレアリティを7にする。',
                          '全生徒カードの通常計算の得点を7p増加。',
                          '全生徒カードの確率加算の値(%)を70加算。',
                          '全生徒カードのレアリティ合計×7p加算。',
                          '最終合計点からの獲得コインを7倍にする。',];
      const outline = {title:           '変幻自在',
                       description:     '25%の確率で発動する。場の生徒カードの寮情報に応じて内容が変化する。',
                       detail:          '3枚以上揃っている寮(非寮を含む)があれば〔保護色〕、そうでなければ〔目立つ変色〕が適用される。\n'+details[0]+'\n'+details[1]+details[2]+'\n・'+adddetails.join('\n・'),
                       possibility:['prob','editcard','random','addplus','coinmul']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          //▼条件
          if(Math.random()*100 < 25+i.c.probadd){
            //準備
            o.cards=i.cards;
            const newcard=JSON.parse(JSON.stringify(i.c));
            o.log.fxtype.push('before','prob','editcard');
            
            //寮リスト
            const dorms = [...new Set(i.cards.map(cc=>cc.dorm).filter(d=>/^(赤|黄|緑|青|非)寮$/.test(d)))];
            const targetdorms = dorms.filter(d => 3 <= i.cards.filter(cc=>cc.dorm==d).length);
            
            //A:保護色
            if(0<targetdorms.length){
              const dorminfos = {['赤寮']:'🟥', ['黄寮']:'🟨', ['緑寮']:'🟩', ['青寮']:'🟦', ['非寮']:'⬜'};
              const targetdorm = targetdorms[Math.floor(Math.random()*targetdorms.length)];
              o.log.notes = dorminfos[targetdorm];
              newcard.dorm = targetdorm;
              
              newcard.sex = '';
              newcard.cm = null; newcard.subcm = '';
              newcard.author = '';
              newcard.major = ''; newcard.grade = '';
              newcard.dormmate = ''; newcard.roomid = '';
              newcard.committee = ''; newcard.club = '';
              newcard.birthday = ''; newcard.hometown = '';
              newcard.tag = ''; newcard.relation = '';
              
              o.log.description+='\n'+details[0];
            }
            
            //B:目立つ変色
            else{
              newcard.basicadd+=5;
              o.log.description+='\n'+details[1];
              
              //B+:追加効果
              if(dorms.every(d => i.cards.filter(cc=>cc.dorm==d).length == 1)){
                o.log.fxtype.push('random');
                const dice = Math.floor(Math.random()*7); //0-6
                
                o.log.description+=details[2]+adddetails[dice];
                
                //77p加算
                if(dice == 0){
                  const add = 77; o.log.add=add; o.log.notes=add+'p';
                  o.log.fxtype.push('add');
                }
                //1～20pの加算を7回行う
                else if(dice == 1){
                  const addlist = [];
                  for(let j=0; j<7; j++) addlist.push(Math.floor(Math.random()*20)+1);
                  const add = addlist.reduce((a,b)=>a+b);
                  o.log.add=add; o.log.notes=add+'p';
                  o.log.fxtype.push('add');
                  o.log.description+='\n結果：'+addlist.join('+');
                }
                //自身のレアリティを7にする
                else if(dice == 2){
                  newcard.rarity = 7;
                  o.log.description+='\n結果：'+tools.emj(newcard)+i.c.rarity+'→'+newcard.rarity;
                }
                //全生徒カードの通常計算の得点を7p増加
                //全生徒カードの確率加算の値(%)を70加算
                else if(dice == 3 || dice == 4){
                  i.cards.forEach((cc,index)=>{
                    //対象が自分
                    if(index==i.index){
                      if(dice==3) newcard.basicadd+=7;
                      else newcard.probadd+=70;
                    }
                    //対象が自分以外
                    else{
                      const onenewcard = JSON.parse(JSON.stringify(cc));
                      if(dice==3) onenewcard.basicadd+=7;
                      else onenewcard.probadd+=70;
                      o.cards[index] = onenewcard;
                    };
                  })
                }
                //全生徒カードのレアリティ合計×7p加算
                else if(dice == 5){
                  const allrarity = i.cards.map(cc=>cc.rarity).reduce((a,b)=>a+b);
                  const add = allrarity*7; o.log.add=add;
                  o.log.notes = allrarity + '×7 = ' + add+'p';
                  o.log.fxtype.push('add');
                }
                //最終合計点からの獲得コインを7倍にする
                else if(dice == 6){
                  const coinmul = 7;
                  o.coinmul = coinmul;
                  o.log.notes = '🪙' + coinmul + '倍';
                  o.log.fxtype.push('coinmul');
                };
              };
            };
            
            o.cards[i.index]=newcard;
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "いなさゆ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ドームシールド",
        description:
          "自身以外に決闘部がいるとき自身のレアリティに応じた範囲のシールドを張り、内部の生徒カードの効果による減算、外部の生徒カードの効果による加算をそれぞれ打ち消せる分の加点を行う。",
        detail: "シールドの範囲は自身から数えてレアリティ分の距離。",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.cards.some((cc) => cc.id !== i.c.id && cc.club.includes("決闘")),
          ];
          if (cons.every((con) => con)) {
            const targetsI = i.cards.filter(
              (cc, index) =>
                cc.id !== i.c.id && Math.abs(index - i.index) <= i.c.rarity
            );
            const targetsO = i.cards.filter(
              (cc, index) =>
                cc.id !== i.c.id && Math.abs(index - i.index) > i.c.rarity
            );
            const fxI =
              targetsI.length > 0
                ? i.prefields.filter(
                    (pf) =>
                      pf.type == "effect" &&
                      targetsI.some((t) => t.id == pf.fxowner.id) &&
                      pf.fxtype &&
                      pf.fxtype.includes("add") &&
                      pf.add < 0
                  )
                : [];
            const fxO =
              targetsO.length > 0
                ? i.prefields.filter(
                    (pf) =>
                      pf.type == "effect" &&
                      targetsO.some((t) => t.id == pf.fxowner.id) &&
                      pf.fxtype &&
                      pf.fxtype.includes("add") &&
                      pf.add > 0
                  )
                : [];
            const addI =
              fxI.length > 0
                ? fxI.map((pf) => pf.add).reduce((a, b) => a + b) * -1
                : 0;
            const addO =
              fxO.length > 0
                ? fxO.map((pf) => pf.add).reduce((a, b) => a + b) * -1
                : 0;
            const add = addI + addO;
            if (add == 0) return;
            o.log.description +=
              "\n" +
              (fxI.length > 0
                ? "内部の対象効果：" +
                  fxI.map((pf) => tools.emj(pf.fxowner)).join("")
                : "") +
              (fxI.length > 0 && fxO.length > 0 ? "　" : "") +
              (fxO.length > 0
                ? "外部の対象効果：" +
                  fxO.map((pf) => tools.emj(pf.fxowner)).join("")
                : "");
            o.log.add = add;
            o.log.notes =
              "範囲" +
              i.c.rarity +
              "　" +
              (addI !== 0 && addO !== 0 ? addI + "" + addO + " = " : "") +
              add +
              "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "いなさゆ",
    phase: ["後"],
    f: (i) => {
      const details = [
        {name:'ションベン', num:0, text:'合計値分 減算'},
        {name:'負け', num:100, text:'合計値分 減算'},
        {name:'勝ち', num:198, text:'合計値分 加算'},
        {name:'ピンゾロ', num:199, text:'合計値×5p 加算'},
        {name:'アラシ', num:204, text:'合計値×3p 加算'},
        {name:'シゴロ', num:210, text:'合計値×2p 加算'},
        {name:'ヒフミ', num:216, text:'合計値×2p 減算'}
      ]
      const outline = {
        title:'張った！！！',
        description:'マイナス値を出している得点加算の効果があるとき、それらの合計値をチンチロで取り返す。',
        detail:'0～216の範囲のランダムな値で結果を決定する。\n'+details.map((d,index)=>'〔'+d.name+'(～'+d.num+')〕'+d.text).join('\n'),
        possibility:['random','addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetfxs = i.prefields.filter(pf=>pf.type=="effect"&&pf.fxtype&&pf.fxtype.includes("add")&&pf.add<0);
          if(targetfxs.length) {
            const minussum = targetfxs.map(fx=>fx.add).reduce((a,b)=>a+b);
            const dice = Math.floor(Math.random()*217); //0～216

            let resultindex = 0;
            let result = undefined;
            while(!result&&resultindex<details.length){
              if(dice<=details[resultindex].num) result=details[resultindex];
              resultindex++;
            };

            let add;

            if(result.name=='ションベン'||result.name=='負け'){
              add = minussum;
              o.log.notes = add + 'p';
            }
            else if(result.name=='勝ち'){
              add = minussum * (-1);
              o.log.notes = add + 'p';
            }
            else if(result.name=='ピンゾロ'){
              add = minussum * (-5);
              o.log.notes = (minussum*(-1)) + '×5 = ' + add + 'p';
            }
            else if(result.name=='アラシ'){
              add = minussum * (-3);
              o.log.notes = (minussum*(-1)) + '×3 = ' + add + 'p';
            }
            else if(result.name=='シゴロ'){
              add = minussum * (-2);
              o.log.notes = (minussum*(-1)) + '×2 = ' + add + 'p';
            }
            else if(result.name=='ヒフミ'){
              add = minussum * 2;
              o.log.notes = minussum + '×2 = ' + add + 'p';
            };

            o.log.add = add;
            o.log.description += '\n〔'+result.name+'〕'+result.text;
            o.log.fxtype.push('after', 'random', 'add');

            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'いなさゆ問', phase:['後'], f:(i)=>
    {const outline = {title:           'お手並み拝見',
                      description:     '(自身以外の全生徒カードレアリティ合計/自身のレアリティ)×10%の確率で、自身のレアリティ×30p加算。',
                      detail:          '自身のレアリティが0である場合は発動しない。',
                      eventdescription:'《イベント》自身のレアリティ分解答pを追加獲得する。',
                      possibility:['prob','addplus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               console.log(i.cards.filter(cc=>cc.id!==i.c.id).map(cc=>cc.rarity).reduce((a,b)=>a+b)+'～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～');
               const cons = [(i.c.rarity!==0),
                             (Math.random()*100 < (i.cards.filter(cc=>cc.id!==i.c.id).map(cc=>cc.rarity).reduce((a,b)=>a+b)/i.c.rarity)*10 +i.c.probadd)];
               if(cons.every(con=>con)){const add=i.c.rarity*30; o.log.add=add; o.log.notes=add+'p';
                                        o.log.fxtype.push('after','prob','add');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=i.c.rarity; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "いのうえ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "目指すは頂上",
        description:
          "場で最もレアリティの高い生徒カードが得点加算を行う効果を発動させていたとき、同じだけの加算を行おうと試みる。該当カードのレアリティが高いほど失敗する可能性がある。",
        detail:
          "成功確率は180÷該当カードのレアリティ%。複数該当する場合は先に出ていたカードが優先される。",
        possibility:['addplus','addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const maxrarity = Math.max(...i.cards.map((cc) => cc.rarity));
          const target = i.cards.find((cc) => cc.rarity == maxrarity);
          const fx = i.prefields.find(
            (pf) =>
              pf.type == "effect" &&
              pf.fxowner.id == target.id &&
              pf.fxtype.includes("add")
          );
          const cons = [fx];
          if (cons.every((con) => con)) {
            const d =
              Math.floor(Math.random() * 100) <
              180 / target.rarity + i.c.probadd;
            const add = d ? fx.add : 0;
            o.log.description += "\n対象：" + tools.emj(target) + fx.title;
            o.log.add = add;
            o.log.notes = d ? add + "p" : "失敗";
            o.log.fxtype.push("random", "after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'いのうえ聖', phase:['前'], f:(i)=>
    { const outline = {title:           '青髪のトナカイ',
                       description:     '自身以外に生徒会の生徒カードがあるとき、(Xmas)とつく生徒カードを末尾に追加する。',
                       detail:          '対象となる生徒カードをじゅうぶんに持っていない場合は発動しない。',
                       eventdescription:'《イベント》🧦ソックスを1個追加獲得する。',
                       possibility:['addcard','random']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const choices = i.allcards.filter(chr=>chr.eventid&&chr.eventid=='XMAS'&&!i.cards.some(cc=>cc.id.slice(0,4)==chr.id.slice(0,4)) );
          if(choices.length && i.cards.some(cc=>cc.id!==i.c.id&&cc.committee.includes('生徒会'))){
            o.cards=i.cards;
            const newcard = choices[Math.floor(Math.random() * choices.length)];
            o.cards.push(exports.getnature(newcard));
            o.log.description+='\n追加：'+tools.emj(newcard);
            o.log.fxtype.push('before','addcard','random');
            //▼イベントアイテム
            if(i.event&&i.event.id==i.c.eventid){
             const iindex=0; o.log.eventitems.index=iindex;
             const iadd=1; o.log.eventitems.add=iadd;
             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji:'');
             o.log.fxtype.push('event');
            };
            return o;
          }else return;
        }catch(error){return {error:true, title:outline.title, message:error.message}};
      }
      else return outline;
    }
  },
  {id: "いばらき", phase: ["後"], f: (i) =>
    { const outline = {title: "韻じゃないけど",
                       description: "全カードの名前のかな表記に3回以上登場する文字があったとき、その種類×Lv×3p加算。",
                       detail: "「・」「ー」はカウントの対象に含まない。",
                       possibility:['addplus']};
      if (i) {
        try {
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          let add=0; const charmap={}; let charlist=[];
          [...i.cards,...i.Tcards].map(cc=>cc.kana).join("").replace(/・|ー/g,"").split("")
            .forEach(char=>{if(charmap[char])charmap[char]++;
                            else charmap[char]=1; });
          for(let char in charmap){
            if(charmap[char]>=3) charlist.push(char);
          };
          const cons = [charlist.length>0];
          if(cons.every(con=>con)){const add=charlist.length*i.c.collected*3;
                                   o.log.add=add; o.log.notes=charlist.join(', ')+'('+charlist.length+'種)×'+i.c.collected+'×3 = '+add+"p";
                                   o.log.fxtype.push("after", "add");
                                   return o;
                                  }else return;
        }catch(error){return{error:true,title:outline.title,message:error.message};};}
     else return outline;}
  },
  { id:'いりがれ', phase:['前'], f:(i)=>
    { const outline = {title:           'きらきら星',
                       description:     '1%の確率で歌いながら先頭に移動し、通過したカードの枚数分の⭐をここに並べる。',
                       detail:          '',
                       possibility:['prob','sortcard']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          if(0<i.index&&Math.random()*100<1+i.c.probadd){
            o.cards=i.cards.filter(cc=>cc.id!==i.c.id);
            o.cards.unshift(i.c);
            o.log.description+='\n移動：'+(i.index+1)+'枚目 → 1枚目 '+'⭐'.repeat(i.index);
            o.log.fxtype.push('before','prob','sortcard');
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "いりがれ",
    phase: ["後"],
    f: (i) => {
      const stardetail = [
        "〔⭐0：カノープス〕×全カードLv合計",
        "〔⭐1：リゲル〕×10",
        "〔⭐2：カペラ〕×15",
        "〔⭐3：ベガ〕×20",
        "〔⭐4：アークトゥルス〕×30",
        "〔⭐5：シリウス〕×35",
        "〔⭐6以上：流星群〕×(レアリティ×7)",
      ];
      const outline = {
        title: "天体観測",
        description:
          "ここまでのリザルト表示・効果説明に含まれる天体系絵文字の数に、1番上(1枚目)のカードのレアリティに応じた数を掛けて加点。",
        detail:
          "PENTA、ALLなどの表示上の⭐も対象とする。\n" + stardetail.join("\n"),
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =
            i.pentamessage +
            i.resultlist.join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("");
          const targetemoji = exports.emjlist["天体"];
          const starsnum = (
            targettext.match(new RegExp(targetemoji.join("|"), "g")) || []
          ).length;
          const cons = [starsnum > 0];
          if (cons.every((con) => con)) {
            const topstar = i.cards[0].rarity >= 6 ? 6 : i.cards[0].rarity;
            const starmul = [
              [...i.cards, ...i.Tcards]
                .map((cc) => cc.collected)
                .reduce((a, b) => a + b),
              10,
              15,
              20,
              30,
              35,
              i.cards[0].rarity * 7,
            ][topstar];
            const add = starsnum * starmul;
            o.log.description += "\n" + stardetail[topstar];
            o.log.add = add;
            o.log.notes = starsnum + "×" + starmul + " = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:"いるまき", phase:["前","後"], f:(i)=>
    {const outline = {title:"こんなものじゃないでしょ？",
                      description:"レアリティが元より下げられた生徒カードがあるとき、元に戻るまでレアリティを上げ、増加分の合計×25p加算。判定は前効果・後効果両方のタイミングで行われる。",
                      detail: "",
                      possibility:['editcard','addplus']};
      if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
                o.cards=i.cards;
                const raritylist=[];
                let increase=0;
                i.cards.forEach((cc,index)=>{const original=i.characters.concat(exports.additional).find((ccc) => ccc.id == cc.id);
                                             if(cc.rarity<original.rarity){
                                               const newcard=JSON.parse(JSON.stringify(cc));
                                               newcard.rarity=original.rarity;
                                               o.cards[index]=newcard;
                                               raritylist.push(tools.emj(cc)+cc.rarity+"→"+newcard.rarity);
                                               increase+=newcard.rarity-cc.rarity;
                                             }
                                            });
                const cons=[increase > 0];
                if(cons.every(con=>con)){const add=increase*25;
                                         o.log.description+="\n対象："+raritylist.join(" ");
                                         const phase=i.phase=="before"?"前：":"後：";
                                         i.phase=="before"?o.log.fxtype.push("before"):o.log.fxtype.push("after");
                                         o.log.add=add; o.log.notes=phase+increase+"×25 = "+add+"p"; o.log.fxtype.push("editcard","add");
                                         return o; }else return;
           }catch(error){return{error:true, title:outline.title, message:error.message}}}
     else return outline; },
  },
  { id: "いるまき", phase: ["前"], f: (i) =>
    { const outline = {title: "いいとこ見せてよ！",
                       description:"自身より後ろの生徒カードが持つ、発動条件・内容に確率を含む効果の確率(%)を100加算。",
                       detail:"対象はその時点で引かれている生徒カードに限られ、細かい適用範囲は効果ごとに異なる。確率以外の条件がある効果である場合はそちらも揃っていなければ発動しない。",
                       possibility:['editcard']};
      if (i) {
        try {
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const cons = [i.index < i.cards.length - 1];
          if (cons.every(con=>con)) {
            o.cards = i.cards.map((cc, index) => {
              if (i.index < index) {
                const newcard = JSON.parse(JSON.stringify(cc));
                newcard.probadd += 100;
                return newcard;
              } else return cc;
            });
            o.log.description += "\n対象：" + i.cards.slice(i.index + 1).map(cc => tools.emj(cc)).join("");
            o.log.fxtype.push("before", "editcard");
            return o;
          } else return;
        }catch(error){ return { error: true, title: outline.title, message: error.message };}
      } else return outline;
    },
  },
  {id:'いるまき海', phase:['後'], f:(i)=>
    {const pass = '〔現像〕持っている写真の生徒と同じ所属🚪の生徒カードが出た場合、該当の写真を現像して渡し、撮影時と同じ点を加算する。';
     const get = '〔撮影〕生徒カードによる得点加算の効果があってプラス値を出しているとき、そのなかで値が最大である生徒の写真を撮影し5枚まで保持する。';
     const irma = 'アランがいる場合は強制的に自身が撮影対象となり、10pの写真が記録される。'
     const outline = {title:           'ホットな思い出',
                      description:     '〔撮影〕と〔現像〕の2つのプロセスを持つ。',
                      detail:          get+irma+'\n'+pass+'渡した写真は手持ちから無くなる。渡す対象には本人も含まれる。',
                      eventdescription:'《イベント》撮影・現像それぞれ1回ごとに2個シーグラスを追加獲得する。',
                      possibility:['addplus','keep']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const keeps = i.keeps.find(k=>k.includes(outline.title));
               let   keepinfos = (keeps&&keeps.split('/')[1]!=='なし')
                                 ? keeps.split('/')[1].split('＠＠').map(k=>{return{id:k.split('：')[0], add:Number(k.split('：')[1])}})
                                 : [];
               const alan = i.cards.some(cc => cc.id.match(/^あらんあ/));
               if(alan) o.log.description+='\n'+irma;

               //現像
               const passphotolist = []; //現像した写真情報のテキストになる
               let keepcards = []; //写真を持っているカードのリスト
               let add=0;
               
               if(keepinfos.length>0){ //写真を持っている
                 keepcards = keepinfos.map(info=>i.characters.find(ccc=>ccc.id==info.id));
                 keepcards.forEach(kc=>{const passtargets = i.cards.filter(cc => cc.genre=="stTm"
                                                                              && ((cc.grade==kc.grade&&cc.major==kc.major)
                                                                                 ||(kc.club&&kc.club.split(' ').some(club=>cc.club.split(' ').includes(club)))
                                                                                 ||(kc.roomid&&cc.roomid==kc.roomid)) );
                                        if(passtargets.length>0){const passadd = keepinfos.find(info=>info.id==kc.id).add;
                                                                 passphotolist.push('['+tools.emj(kc)+']→'+passtargets.map(cc=>tools.emj(cc)).join('')+' '+passadd+'p');
                                                                 add+=passadd;
                                                                 keepinfos=keepinfos.filter(info=>info.id!==kc.id); };
                                       });
                 if(passphotolist.length>0){o.log.add=add; o.log.notes=add+'p'; o.log.fxtype.push('add');
                                            o.log.description+='\n'+pass+'\n対象：'+passphotolist.join('\n');
                                           };
               }

               //撮影
               let target; let targetadd=0;
               const targetfxs = i.prefields.filter(pf=>pf.type=='effect'&&pf.fxowner.genre=='stTm'&&pf.fxtype.includes('add')&&pf.add>0);

               if(alan)                   {target=i.c;
                                           targetadd=10; }
               else if(targetfxs.length>0){const maxadd = Math.max(...targetfxs.map((pf) => pf.add));
                                           const targetfx = targetfxs.find((pf) => pf.add == maxadd);
                                           target = targetfx.fxowner;
                                           targetadd = targetfx.add; };
               if(target){o.log.fxtype.push('keep');
                          o.log.description+='\n'+get+(alan?'\n'+irma:'')+'\n対象：'+'['+tools.emj(target)+']'+'('+targetadd+'p)';
                          keepinfos.push({id:target.id.slice(0,4), add:targetadd});
                         };

               //共通
               if(passphotolist.length>0||target){
                 keepinfos = keepinfos.slice(-5);
                 if(keepinfos.length>0){keepcards = keepinfos.map(info=>i.characters.find(ccc=>ccc.id==info.id));
                                        o.log.description+='\n(現在の手持ち：'+keepcards.map(kc=>tools.emj(kc)).join('')+')';
                                        o.keeptext = keepinfos.map(info=>info.id+'：'+info.add).join('＠＠'); }
                 else                  {o.log.description+='\n(現在の手持ち：なし)';
                                        o.keeptext = 'なし'; };
                 o.log.fxtype.push('after');
                 if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                      const iadd=passphotolist.length*2+(target?2:0); o.log.eventitems.add=iadd;
                                                      o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                      o.log.fxtype.push('event');};
                 return o;
               }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "うつしみ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ものまね",
        description:
          "自身以外の決闘部の生徒カードによって得点加算を行う効果が発動されているとき、ものまねを試みて該当効果の加点分×(自身のLv/10)p加算する。ただし20%の確率で加算する点に-1を掛ける。",
        detail:
          "複数ある場合は最も加点の小さいものを対象とする。確率加算の影響は受けない。小数点以下切捨。",
        possibility:['addplus','addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetfxs = i.prefields.filter(
            (pf) =>
              pf.type == "effect" &&
              pf.fxtype.includes("add") &&
              pf.fxowner.club.includes("決闘")
          );
          const cons = [targetfxs.length > 0];
          if (cons.every((con) => con)) {
            const targetfx = targetfxs.find(
              (tfx) => tfx.add == Math.min(...targetfxs.map((pf) => pf.add))
            );
            const minus = Math.floor(Math.random() * 100) < 20;
            const add =
              Math.floor((targetfx.add * i.c.collected) / 10) *
              (minus ? -1 : 1);
            o.log.description +=
              "\n対象：" + tools.emj(targetfx.fxowner) + targetfx.title;
            o.log.add = add;
            o.log.notes =
              targetfx.add +
              "×(" +
              i.c.collected / 10 +
              ")" +
              (minus ? "×(-1)" : "") +
              " → " +
              add +
              "p";
            o.log.fxtype.push("after", "random", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'うつしみ山', phase:['前'], f:(i)=>
    {const outline = {title:           'も、もう無理です～！！',
                      description:     '写身ポイント(xp)を1加算。(100/xp)%の確率でxp×30p加算。ただし失敗した場合、xpを0にしたうえで失踪し、教師カードもドローされない。',
                      detail:          '確率加算は成功する方向に働く。',
                      eventdescription:'《イベント》失踪していない場合に限り、食材🥕を追加獲得する。',
                      possibility:['addplus','delcard','leaving','noteacher','keep','random']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const keeps = i.keeps.find(k => k.includes(outline.title));
               let   xp    = keeps ? Number(keeps.split("/")[1]) : 0; xp++;
               if(Math.floor(Math.random()*100)<(100/xp)+i.c.probadd){
                 o.log.description+='\n現在：'+xp+'xp';
                 const add=xp*30; o.log.add=add; o.log.notes=xp+'×30 = '+add+'p';
                 o.log.fxtype.push('add');
                 if(i.event&&i.event.id==i.c.eventid) o.log.special='curry';
               }
               else{
                 o.log.description+='\n現在：'+xp+'xp → 0xp';
                 o.cards=i.cards.filter(cc=>cc.id!==i.c.id);
                 xp=0; o.count--; o.noteacher=true; o.log.notes='失踪！';
                 o.log.fxtype.push('delcard', 'leaving', 'noteacher'); };
               o.keeptext=xp; o.log.fxtype.push('before','keep','random');
               if(i.event&&i.event.id==i.c.eventid) o.log.description+='\n'+outline.eventdescription;
               return o;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "うどある",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "イリュージョン・タイム",
        description:
          "25%の確率で、隣接した生徒カードと共通点(クラス・委員会等・部活・プラス縁)を持つここにいない所持生徒カードのうちの誰かに変身する。部長・首席の情報は維持される。",
        detail:
          "複数カードと隣接している場合はランダムに選ばれる。Lvを含む全てのステータスが変化し、じゅうぶんなカードを持っていない場合は発動しない。",
        possibility:['prob','editcard','changecard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.cards.length > 1,
            Math.floor(Math.random() * 100) < 25 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            const nexts = i.cards.filter(
              (cc, index) => Math.abs(i.index - index) == 1
            );
            const tar = nexts[Math.floor(Math.random() * nexts.length)];
            const choices = i.allcards.filter(
              (chr) =>
                !i.cards.some(
                  (cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4)
                ) &&
                ((tar.major &&
                  tar.grade &&
                  chr.major == tar.major &&
                  chr.grade == tar.grade) ||
                  (tar.committee && chr.committee == tar.committee) ||
                  (tar.club &&
                    chr.club
                      .split(" ")
                      .some((club) => tar.club.split(" ").includes(club))) ||
                  (chr.relation.split(" - ")[0].length > 0 &&
                    tar.nickname.split(/\/|\s-\s/).filter((nn) => nn).length &&
                    chr.relation
                      .split(" - ")[0]
                      .split("/")
                      .some((rl) =>
                        tar.nickname.split(/\/|\s-\s/).includes(rl)
                      )) ||
                  (tar.relation.split(" - ")[0].length > 0 &&
                    chr.nickname.split(/\/|\s-\s/).filter((nn) => nn).length &&
                    tar.relation
                      .split(" - ")[0]
                      .split("/")
                      .some((rl) =>
                        chr.nickname.split(/\/|\s-\s/).includes(rl)
                      )))
            );
            if (choices.length == 0) return;
            o.cards = i.cards;
            const newcard = exports.getnature(
              JSON.parse(
                JSON.stringify(
                  choices[Math.floor(Math.random() * choices.length)]
                )
              )
            );
            newcard.name += "(" + i.c.emoji + "ウド)";
            newcard.position = i.c.position;
            o.cards[i.index] = newcard;
            o.log.description +=
              "\n隣接：" + tools.emj(tar) + "　変身：" + tools.emj(newcard);
            o.count--;
            o.log.fxtype.push(
              "before",
              "prob",
              "editcard",
              "changecard",
              "random"
            );
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id: "うららあ", phase: ["前"], f: (i) =>
    { const outline = {title: "ともだちの輪",
                       description:"末尾にいるとき、自身のLvに応じた範囲内にいるクラスメイト・自身からのプラス縁のあるカードの通常計算の得点を10p増加させる。",
                       detail: "対象範囲は自身から数えてLv分の距離。",
                       possibility:['editcard']};
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targets = i.cards.filter(
            (cc, index) =>
              Math.abs(index-i.index)<=i.c.collected&&
              cc.id!==i.c.id &&
              ((cc.grade==i.c.grade&&cc.major==i.c.major)||
                i.c.relation.split(" - ")[0].split("/").some(rl=>cc.nickname.split(/\/|\s-\s/).includes(rl)))
          );
          const cons = [i.index==i.cards.length-1, targets.length>0];
          if(cons.every(con=>con)){
            o.cards=i.cards;
            const targetids=targets.map(t=>t.id);
            o.cards.forEach((cc,index)=>{
              if(targetids.some(id=>cc.id==id)){
                const newcard=JSON.parse(JSON.stringify(cc));
                newcard.basicadd+=10;
                o.cards[index]=newcard;
              };
            });
            o.log.description+="\n対象：" + targets.map(t=>tools.emj(t)).join("");
            o.log.fxtype.push("before", "editcard");
            return o;
          }else return;
        }catch(error){return{error:true, title:outline.title, message:error.message};}
      } else return outline;
    },
  },
  {
    id: "うららあ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "や、やっちゃった……？",
        description:
          "40%の確率で魔力が±100p分暴発する。Lvが上がるほどプラスになりやすく、アランがいる場合は必ず発動したうえでプラスになる。",
        detail:
          "アランがいる場合、効果名が【やっちゃいましょう！】に変化する。",
        possibility:['prob','addplus','addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const alan = i.cards.some((cc) => cc.id.match(/^あらんあ/));
          const cons = [
            Math.floor(Math.random() * 100) < 40 + i.c.probadd || alan,
          ];
          if (cons.every((con) => con)) {
            const add =
              Math.floor(Math.random() * 100) < 40 + i.c.collected * 5 || alan
                ? 100
                : -100;
            if (alan) o.log.title = "やっちゃいましょう！";
            else o.log.fxtype.push("random");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "prob", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "うららあ雪",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "けっこう似てませんか？",
        description:
          "青寮の生徒カードと隣接したとき、間に相手を模した雪だるまを作る。",
        detail:
          "該当カードと自身との間に、ジャンル・寮・性別・科目・学年・Lv・レアリティをコピーした生徒カードを配置する。SNOWタグを持ち、身長は200cm。",
        possibility:['addcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cA =
            i.cards[i.index + 1] && i.cards[i.index + 1].dorm == "青寮"
              ? i.cards[i.index + 1]
              : "";
          const cB =
            i.cards[i.index - 1] && i.cards[i.index - 1].dorm == "青寮"
              ? i.cards[i.index - 1]
              : "";
          const cons = [cA || cB];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            if (cA) {
              o.count++;
              const newcA = JSON.parse(
                JSON.stringify(
                  exports.additional.find((adc) => adc.id == "ゆきだる")
                )
              );
              newcA.genre = cA.genre;
              newcA.name = cA.name + newcA.name;
              newcA.sex = cA.sex;
              newcA.major = cA.major;
              newcA.grade = cA.grade;
              newcA.dorm = cA.dorm;
              newcA.rarity = cA.rarity;
              newcA.collected = cA.collected;
              o.cards.splice(i.index + 1, 0, exports.getnature(newcA));
            }
            if (cB) {
              o.count++;
              const newcB = JSON.parse(
                JSON.stringify(
                  exports.additional.find((adc) => adc.id == "ゆきだる")
                )
              );
              newcB.genre = cB.genre;
              newcB.name = cB.name + newcB.name;
              newcB.sex = cB.sex;
              newcB.major = cB.major;
              newcB.grade = cB.grade;
              newcB.dorm = cB.dorm;
              newcB.rarity = cB.rarity;
              newcB.collected = cB.collected;
              o.cards.splice(i.index, 0, exports.getnature(newcB));
            }
            o.log.fxtype.push("before", "addcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "うんじょ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ルーンの紙飛行機",
        description:
          "自身のレアリティを1下げ、前方に紙飛行機を飛ばして通過した全生徒カードのレアリティを1上げる。",
        detail: "レアリティは0未満にはならない。",
        possibility:['editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index > 0];
          if (cons.every((con) => con)) {
            const cs = [];
            o.cards = i.cards.map((cc, index) => {
              if (index <= i.index) {
                const newcard = JSON.parse(JSON.stringify(cc));
                newcard.rarity =
                  index == i.index
                    ? cc.rarity > 0
                      ? cc.rarity - 1
                      : 0
                    : cc.rarity + 1;
                cs.push(tools.emj(cc) + cc.rarity + "→" + newcard.rarity);
                return newcard;
              } else return cc;
            });
            o.log.description += "\n対象：" + cs.join(" ");
            o.log.fxtype.push("before", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "うんじょ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "それで、どう書くの？",
        description:
          "ひらがなではない別表記を持つカードがある場合、その文字数×2p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const nothiracards = [...i.cards, ...i.Tcards].filter(
            (cc) => cc.subname && !cc.subname.match(/^[ぁ-んー・]+$/)
          );
          const cons = [nothiracards.length > 0];
          if (cons.every((con) => con)) {
            const add =
              nothiracards
                .map((cc) => cc.subname.replace(/\s+/g, "").length)
                .reduce((a, b) => a + b) * 2;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'うんじょ正', phase:['前'], f:(i)=>
    { const updraftdetail = '〔上昇気流〕風系絵文字を持つカードがある場合、全員必ず正月気分になる。';
      const outline ={title:           'ルーンの凧',
                      description:     'おめでたい凧をあげて自身以外の全員の正月気分を煽る。カード1枚につき50%の確率で、NEWYEARタグを付与し通常計算の得点を10p増加。',
                      detail:          '確率加算は正月気分を煽る方向に働く。\n'+updraftdetail,
                      eventdescription:'《イベント》まぎかるたのさいころの出目を1加算(最大6)。',
                      possibility:['editcard','random']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const updrafts = [...i.cards, ...i.Tcards].filter(cc=>cc.emoji && exports.emjlist['風'].includes(cc.emoji));
          if(updrafts.length) o.log.description+='\n'+updraftdetail;
          const results = [];
          o.cards=i.cards;
          o.cards.forEach((cc,index)=>{
            if(cc.id!==i.c.id&&(updrafts.length||Math.random()*100<50+i.c.probadd)){
              const newcard=JSON.parse(JSON.stringify(cc));
              if(!newcard.tag.includes('NEWYEAR')) newcard.tag = (cc.tag) ? [...cc.tag.split('/'), 'NEWYEAR'].join('/') : 'NEWYEAR';
              newcard.basicadd+=10;
              o.cards[index]=newcard;
              results.push(tools.emj(newcard));
            };
          });
          if(results.length){
            o.log.description+='\n' + ((updrafts.length)?'風：'+updrafts.map(cc=>tools.emj(cc)).join('')+'　正月気分':'対象') + '：'+results.join('');
            o.log.fxtype.push('before','editcard');
            if(updrafts.length) o.log.fxtype.push('random');
            if(i.event&&i.event.id==i.c.eventid) o.log.description+='\n'+outline.eventdescription;
            return o;
          }else return;
        }catch(error){return {error:true, title:outline.title, message:error.message}};
      }
      else return outline;
    }
  },
  {
    id: "えびちり",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "おめでとー！！！",
        description:
          "PENTA表示があるときは1p、今日が誕生日のカードがあるときは80p、それが自身であるときは100pを加算する。枚数変動によってPENTA表示の表記が変わっている場合も、その表示に従う。",
        detail:
          "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          const comment = "「君がPENTAを達成したら、私がいっぱいお祝いしてあげちゃうよ！　ぱんぱかぱーん！！」";
          o.log.description = comment;
          const bdcards = [...i.cards, ...i.Tcards].filter(
            (cc) =>
              cc.birthday == i.realDate.getMonth() + 1 + "/" + i.realDate.getDate()
          );
          const cons = [i.pentamessage || bdcards.length > 0];
          if (cons.every((con) => con)) {
            let add = 1;
            if (bdcards.length > 0) {
              if (bdcards.some((bc) => bc.id.match(/^えびちり/))) {
                add = 100;
                o.log.description = comment.replace("」", "\nあと、今日は私が誕生日なんだよ！　みんなからのお祝い、嬉しいな！　るんるん！！」");
              } else {
                add = 80;
                o.log.description = comment.replace("」", "\nあと、今日は誕生日の人がいるので、みんなでお祝いしよー！　きらきらー！！」");
              }
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "えびちり",
    phase: ["後"],
    f: (i) => {
      const aru = "縁の数×15p加算。";
      const nai = "リザルト表示内のどこかにランダムで🦐(20p)を1～3個置く。";
      const outline = {
        title: "真世ちゃん！？",
        description:
          "25%の確率で、妹の真世🦐がやってきてやりたい放題やって帰る。",
        detail: "縁があるとき、" + aru + "\n縁がないとき、" + nai,
        possibility:['changeresultlist','random','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [Math.floor(Math.random() * 100) < 25 + i.c.probadd];
          if (cons.every((con) => con)) {
            let add = 0;
            if (i.relationlog.length > 0) {
              add = i.relationlog.length * 15;
              o.log.notes = add + "p";
              o.log.description += "\n縁あり：" + aru;
            } else {
              const d = Math.floor(Math.random() * 3) + 1;
              const jogai = i.resultlist.findIndex((rl) =>
                rl.includes("得点計算")
              );
              o.resultlist = i.resultlist;
              for (let j = 0; j < d; j++) {
                const index = Math.floor(
                  Math.random() * (o.resultlist.length - 1)
                );
                o.resultlist[jogai <= index ? index + 1 : index] += "　🦐20p";
              }
              add = d * 20;
              o.log.notes = "(" + add + "p)";
              o.log.description += "\n縁なし：" + nai;
              o.log.fxtype.push("changeresultlist", "random");
            }
            o.log.add = add;
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'えびちり菓', phase:['前'], f:(i)=>
    {const outline = {title:           'キラキラパーティだよ！',
                      description:     '全生徒カードをお星様で彩り、レアリティを0～5のランダムな数値へ変更する。',
                      detail:          '',
                      eventdescription:'《イベント》レアリティ平均の半分魔法の生地を追加獲得する。',
                      possibility:['editcard','random']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [(true)];
               if(cons.every(con=>con)){o.cards=i.cards;
                                        const cs = [];
                                        o.cards.forEach((cc,index)=>{
                                          const newcard=JSON.parse(JSON.stringify(cc));
                                          newcard.rarity=Math.floor(Math.random()*6);
                                          o.cards[index]=newcard;
                                          cs.push(tools.emj(cc) + cc.rarity + '→' + newcard.rarity);
                                        });
                                        o.log.description += "\n対象：" + cs.join(' ');
                                        o.log.fxtype.push('before','editcard','random');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=Math.floor((o.cards.map(cc=>cc.rarity).reduce((a,b)=>a+b)/o.cards.length)/2); o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'えまこり', phase:['前'], f:(i)=>
    {const outline = {title:           'テラフォーミング',
                      description:     'ちょうど中央にいるとき、先頭と末尾の生徒カードを決闘部のものへ入れ替える。',
                      detail:          '決闘部の生徒カードをじゅうぶんに持っていない場合は発動しない。',
                      possibility:['changecard','random']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [i.cards.length%2!==0,
                             Math.floor(i.cards.length/2)==i.index,
                             i.allcards.filter(ac=>ac.genre=='stTm'&&ac.club.includes('決闘')).length>=5];
               if(cons.every(con=>con)){o.cards=i.cards;
                                        const beforeemjs=[]; const afteremjs=[];
                                        [0, i.cards.length-1].forEach(num=>{
                                          beforeemjs.push(tools.emj(i.cards[num]));
                                          const choices = i.allcards.filter(chr=>chr.genre=='stTm'&&chr.club.includes('決闘')&& !o.cards.some(cc=>cc.id.slice(0, 4)==chr.id.slice(0, 4)));
                                          const newcard = choices[Math.floor(Math.random()*choices.length)];
                                          o.cards[num] = exports.getnature(newcard);
                                          afteremjs.push(tools.emj(newcard));
                                        });
                                        o.log.description += '\n入替追加：'+beforeemjs.join('')+' → '+afteremjs.join('');
                                        o.log.fxtype.push('before','changecard','random'); return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "えりーじ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "こっち見てよ",
        description:
          "自身からのプラス縁があって相手と隣接していないとき、自身に目を向けさせて相手と自身のLv合計×5p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetrls = i.relationlog.filter(
            (rl) =>
              rl.ids[0] == i.c.id &&
              rl.plus &&
              Math.abs(
                i.cards.findIndex((cc) => cc.id == rl.ids[1]) - i.index
              ) > 1
          );
          const cons = [targetrls.length > 0];
          if (cons.every((con) => con)) {
            const targets = targetrls.map((rl) =>
              i.cards.find((cc) => cc.id == rl.ids[1])
            );
            const add = targets
              .map((t) => (t.collected + i.c.collected) * 5)
              .reduce((a, b) => a + b);
            o.log.description +=
              "\n対象：" +
              targets
                .map(
                  (t) => tools.emj(t) + (t.collected + i.c.collected) * 5 + "p"
                )
                .join(" + ");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "えりーじ甘",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "チョコ作りの参考に……",
        description: "(チョコ)とつく生徒カードを必ず次の枠に伴う。",
        detail:
          "生徒カードはランダムで決定される。該当するカードを持っていない場合・末尾にいる場合は発動しない。",
        eventdescription: "《イベント》ランダムでチョコを1個追加獲得する。",
        possibility:['changecard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const choices = i.allcards.filter(
            (chr) =>
              chr.eventid &&
              chr.eventid == "CHOCO" &&
              !i.cards.find((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4))
          );
          const cons = [choices.length > 0, i.index < i.cards.length - 1];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = choices[Math.floor(Math.random() * choices.length)];
            o.cards[i.index + 1] = exports.getnature(newcard);
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(Math.random() * 2);
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
              o.log.fxtype.push("event");
            }
            o.log.fxtype.push("before", "changecard", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "えんどう",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "黄金郷",
        description: "自身以外に黄寮の生徒カードがあるとき、その枚数×25p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const golden = i.cards.filter(
            (cc) => cc.dorm == "黄寮" && cc.id !== i.c.id
          );
          const cons = [golden.length > 0];
          if (cons.every((con) => con)) {
            const add = golden.length * 25;
            o.log.description +=
              "\n対象：" + golden.map((cc) => tools.emj(cc)).join("");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "えんどう",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "アンコール！！",
        description:
          "ここまでの合計点が200p以上かつ自身以外の軽音楽部の生徒カードによる効果発動があるとき、順番の最も早い軽音楽部の生徒カードから順にもう1度行動する。",
        detail: "この効果は1度しか発動しない。",
        possibility:['changecount']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            !i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == outline.title
            ),
            i.totalP >= 200,
            i.prefields.some(
              (pf) =>
                pf.type == "effect" &&
                pf.fxowner.id !== i.c.id &&
                pf.fxowner.club.includes("軽音楽")
            ),
          ];
          if (cons.every((con) => con)) {
            o.count -=
              1 +
              i.index -
              i.cards.findIndex((cc) => cc.club.includes("軽音楽"));
            o.log.description += "\n発動前の合計点：" + i.totalP + "p";
            o.log.fxtype.push("after", "changecount");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id: "えんどう海", phase: ["前"], f: (i) =>
    { const outline = {title: "船長の大号令",
                       description: "40%の確率で後続の生徒カードを全て黄寮のものにする。",
                       detail: "黄寮の生徒カードをじゅうぶんに持っていない場合は発動しない。",
                       eventdescription:"《イベント》黄寮の生徒カード枚数×Lv個のシーグラスを追加獲得する。",
                       possibility:['prob','changecard','random']};
      if (i) {
        try {
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const cons = [(i.index<i.cards.length-1),
                        (i.allcards.filter(ac=>ac.dorm=="黄寮").length>=i.cards.length),
                        (Math.floor(Math.random()*100)<40+i.c.probadd)];
          if (cons.every(con => con)) {
            o.cards = i.cards;
            for (let j=i.index+1; j<i.cards.length; j++) {
              const choices = i.allcards.filter(chr=>chr.dorm=="黄寮" && !o.cards.slice(0, j).find(cc=>cc.id.slice(0, 4)==chr.id.slice(0, 4)));
              const newcard = choices[Math.floor(Math.random()*choices.length)];
              o.cards[j] = exports.getnature(newcard);
            }
            if (i.event&&i.event.id==i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = i.cards.filter(cc => cc.dorm == "黄寮").length*i.c.collected;
              o.log.eventitems.add = iadd;
              o.log.description += "\n" + outline.eventdescription + "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd;
              o.log.fxtype.push("event");
            }
            o.log.fxtype.push("before","prob","changecard","random");
            return o;
          } else return;
        } catch (error) { return { error: true, title: outline.title, message: error.message }; }
      } else return outline;
    },
  },
  {
    id: "おおとり",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "燃えてきました！",
        description:
          "自身以外の生徒レアリティ合計が12以上のとき、それ×自身のLv×2p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const rsum = i.cards
            .filter((cc) => !cc.id.match(/おおとり/))
            .map((cc) => cc.rarity)
            .reduce((a, b) => a + b);
          const cons = [i.cards.length > 1, rsum >= 12];
          if (cons.every((con) => con)) {
            const add = rsum * i.c.collected * 2;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "おきたひ", phase: ["後"], f: (i) => {
      const outline = {
        title: "個人練",
        description: "自身以外の音楽タグを持つ生徒カードの枚数×15p加算。カードに応じた練習ポイント(xp)を記憶し、この効果が5回発動されるごとに練習の成果を発揮して次の曲へ臨む。",
        detail: "xpはREDLISTで25、三善祈依那で30、軽音楽部員で20、それ以外の音楽タグで10貯まる。\n発表時にxpの累計を加算してリセットする。",
        possibility:['addplus','keep']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const targets = i.cards.filter( (cc) => cc.id !== i.c.id && cc.tag.split("/").includes("音楽") );
          const cons = [targets.length > 0];
          if (cons.every((con) => con)) {
            const songlist = [
              "命のしくみ",
              "ECHO-ROCKATION",
              "畜生",
              "ブレーメン",
              "縦横無尽ワイルド行進曲",
              "東京バイオロジー",
              "シンカ！",
              "グレートジャーニー",
            ];
            const add = targets.length * 15;
            const addRp = targets
              .map((t) =>
                !t.club.includes("軽音楽")
                  ? 10
                  : t.id.includes("みよしき")
                  ? 30
                  : [
                      "ひじかた",
                      "そうまあ",
                      "こんどう",
                      "おきたひ",
                      "ながくら",
                    ].some((id) => t.id.includes(id))
                  ? 25
                  : 20
              )
              .reduce((a, b) => a + b);
            const keeps = i.keeps.find((k) => k.includes(outline.title));
            const keeparray = keeps ? keeps.split("/")[1].split("：").map((n) => Number(n))
                                    : [0, 0, Math.floor(Math.random() * songlist.length)];
            keeparray[0] += addRp;
            keeparray[1]++;
            o.log.add = add;
            o.log.notes = add + "p";
            if (keeparray[1] == 5) {
              o.log.description += "\n⭐発表！「" + songlist[keeparray[2]] + "」xp分：" + keeparray[0] + "p加算";
              const add2 = keeparray[0];
              o.log.add += add2;
              o.log.notes += " +" + add2 + "p";
              keeparray[0] = 0;
              keeparray[1] = 0;
              keeparray[2] = Array.from(Array(songlist.length).keys()).filter( (n) => n !== keeparray[2] )[Math.floor(Math.random() * (songlist.length - 1))];
            } else {
              o.log.description += "\n練習中...「" + songlist[keeparray[2]] + "」" + keeparray[0] + "xp(" + keeparray[1] + "回目)";
            }
            o.keeptext = keeparray.join("：");
            o.log.fxtype.push("after", "add", "keep");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "おきたひ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "式神召喚！",
        description:
          "ちょうど中央にいるとき、ここまでのリザルト表示・効果説明に含まれる数字の種類×自身のLv×2p加算。",
        detail: "トータル表示以上の部分は対象としない。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.cards.length % 2 !== 0,
            Math.floor(i.cards.length / 2) == i.index,
          ];
          if (cons.every((con) => con)) {
            const targettext =(
              i.resultlist.join("") +
              i.prefields
                .map(
                  (pf) => pf.name + (pf.description ? pf.description : pf.value)
                )
                .join("")).replace(/<:.+:\d+>/g, '');
            const numberset = [...new Set(targettext.match(/\d/g))].sort();
            const add = numberset.length * i.c.collected * 2;
            o.log.description +=
              "\n判定：" +
              numberset.join(", ") +
              " (" +
              numberset.length +
              "種)";
            o.log.add = add;
            o.log.notes =
              numberset.length + "×" + i.c.collected + "×2 = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'おきたひ祭', phase:['後'], f:(i)=>
    {const outline = {title:           '焔のグリッサンド',
                      description:     '自身以外に音楽タグを持つカードがあるとき、数字の1から7まで順番にここまでのリザルト表示・効果説明に含まれているかの判定を行い、連続して成功した数字の合計×Lv分を加点。',
                      detail:          '',
                      eventdescription:'《イベント》2つ成功するごとに1個ずつエンジョイpを追加獲得する。',
                      possibility:['addplus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [[...i.cards,...i.Tcards].some(cc=>cc.id!==i.c.id&&cc.tag.split('/').includes('音楽'))];
               if(cons.every(con=>con)){ const results=[];
                                         const targettext =(i.resultlist.join('')+i.prefields.map(pf=>pf.name+(pf.description?pf.description:pf.value)).join('')).replace(/<:.+:\d+>/g, '');
                                         for(let j=1; j<=7;j++){if(targettext.includes(j)) results.push(j);
                                                                else break; };
                                         o.log.description+='\n判定：'+(results.length?results.join(', '):'なし');
                                         const add=results.length?results.reduce((a,b)=>a+b)*i.c.collected:0;
                                         o.log.add=add; o.log.notes=(results.length?results.reduce((a,b)=>a+b)+'×'+i.c.collected+' = ':'')+add+'p';
                                         o.log.fxtype.push('after','add');
                                         if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                              const iadd=Math.floor(results.length/2); o.log.eventitems.add=iadd;
                                                                              o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                              o.log.fxtype.push('event');};
                                         return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "おにこう",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "一閃",
        description:
          "自身以外の決闘部がいるとき、末尾に向かって剣技を振るい後続の全生徒カードのレアリティを真っ二つにし(小数点以下切捨)、減少分の合計×20p加算。",
        detail: "",
        possibility:['editcard','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.index < i.cards.length - 1,
            i.cards.some((cc) => cc.id !== i.c.id && cc.club.includes("決闘")),
          ];
          if (cons.every((con) => con)) {
            let decrease = 0;
            const raritylist = [];
            o.cards = i.cards;
            i.cards.forEach((cc, index) => {
              if (index > i.index) {
                const newcard = JSON.parse(JSON.stringify(cc));
                newcard.rarity = Math.floor(newcard.rarity / 2);
                o.cards[index] = newcard;
                raritylist.push(
                  tools.emj(cc) + cc.rarity + "→" + newcard.rarity
                );
                decrease += cc.rarity - newcard.rarity;
              }
            });
            const add = decrease * 20;
            o.log.description += "\n対象：" + raritylist.join(" ");
            o.log.add = add;
            o.log.notes = decrease + "×20 = " + add + "p";
            o.log.fxtype.push("before", "editcard", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "おにこう体",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "鬼の先輩",
        description:
          "後輩を叱咤激励し、心を動かされた数×20p加算、奮起できなかった数×10p減算。",
        detail:
          "心を動かせる確率は自身のレアリティ×20%。確率加算は心を動かせる方向に働く。",
        eventdescription:
          "《イベント》20p獲得(プラスのみ)につき1個ずつ赤組pを追加獲得する。",
        possibility:['addplus','addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targets = i.cards.filter(
            (cc) => cc.grade && Number(cc.grade) < 3
          );
          const cons = [targets.length > 0];
          if (cons.every((con) => con)) {
            const pluslist = [];
            const minuslist = [];
            targets.forEach((t) =>
              Math.floor(Math.random() * 100) < i.c.rarity * 20 + i.c.probadd
                ? pluslist.push(tools.emj(t))
                : minuslist.push(tools.emj(t))
            );
            const add = pluslist.length * 20 - minuslist.length * 10;
            o.log.description +=
              "\n" +
              "⤴️：" +
              (pluslist.length ? pluslist.join("") : "なし") +
              "　⤵️：" +
              (minuslist.length ? minuslist.join("") : "なし");
            o.log.add = add;
            o.log.notes =
              pluslist.length * 20 +
              "-" +
              minuslist.length * 10 +
              " = " +
              add +
              "p";
            o.log.fxtype.push("after", "add", "random");

            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = add > 0 ? Math.floor(add / 20) : 0;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "かいぐり",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ぼくを見ないでほしい",
        description:
          "自身以外の演劇部・自身からのプラス縁がある生徒カードがないとき、50%の確率で名前類・身長・絵文字が笹ヶ谷相次郎のものへ変わる。",
        detail: "",
        possibility:['prob','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const relationlog = tools.checkrelation(i.c, i.cards, i.characters);
          const cons = [
            !i.cards.some(cc => cc.id !== i.c.id && cc.club.split(" ").includes("演劇")),
            !(relationlog.length&&relationlog.filter(rl=>rl.plus).length),
            Math.floor(Math.random() * 100) < 50 + i.c.probadd,
          ];
          if (cons.every(con=>con)) {
            const sojiro = data.characters.find(dc => dc.id == "ささそう");
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            newcard.name = sojiro.name + "(" + i.c.emoji + "カイ)";
            const copy = ["subname", "kana", "nickname", "cm", "emoji"];
            copy.forEach(p => (newcard[p] = sojiro[p]));
            o.cards[i.index] = newcard;
            o.log.fxtype.push("before", "prob", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id:'かいぐり', phase:['前'], f:(i)=>
    { const details = ['〔確率発動〕50%の確率で25p加算',
                       '〔ランダム〕1～50p加算',
                       '〔得点加算(+)or乗算(1以上)〕25p加算',
                       '〔カード追加〕25p加算',
                       '〔得点加算(-)or乗算(1未満)〕20p減算',
                       '〔カード削除〕20p減算'];
      const outline = {title:           '洞察',
                       description:     '1つ次の生徒カードの持つ効果の可能性に応じた条件で加点を行う。',
                       detail:          details.join('\n')+'\n上から順に1つずつ判定される。確率加算の影響は受けない。\n【ぼくを見ないでほしい】が発動している場合は発動しない。',
                       possibility:['addplus','addminus','random']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          if(i.index<i.cards.length-1&&!i.prefields.some(pf=>pf.type=='effect'&&pf.title=='ぼくを見ないでほしい')){
            const target = i.cards[i.index+1];
            o.log.description+='\n対象：'+tools.emj(target);
            let add = 0;
            const addlist = [];
            if(tools.checkpossibility(target, 'prob')){
              o.log.description+='\n'+details[0];
              const oneadd = (Math.random()<0.5 ? 25 : 0);
              add+=oneadd
              addlist.push(oneadd);
              o.log.fxtype.push('random');
            };
            if(tools.checkpossibility(target, 'random')){
              o.log.description+='\n'+details[1];
              const oneadd = Math.floor(Math.random()*50+1);
              add+=oneadd
              addlist.push(oneadd);
              o.log.fxtype.push('random');
            };
            if(tools.checkpossibility(target, ['addplus','mulplus'])){
              o.log.description+='\n'+details[2];
              const oneadd = 25;
              add+=oneadd
              addlist.push(oneadd);
            };
            if(tools.checkpossibility(target, ['addcard'])){
              o.log.description+='\n'+details[3];
              const oneadd = 25;
              add+=oneadd
              addlist.push(oneadd);
            };
            if(tools.checkpossibility(target, ['addminus','muldecimal','mulminus'])){
              o.log.description+='\n'+details[4];
              const oneadd = -20;
              add+=oneadd
              addlist.push('('+oneadd+')');
            };
            if(tools.checkpossibility(target, ['delcard'])){
              o.log.description+='\n'+details[5];
              const oneadd = -20;
              add+=oneadd
              addlist.push('('+oneadd+')');
            };
            if(add!==0){
              o.log.add=add;
              o.log.notes=(1<addlist.length?addlist.join('+')+' = ':'')+add+'p';
              o.log.fxtype.push('before','add');
              return o;
            };
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "かげゆこ龍",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "魁！登り龍伝説",
        description:
          "決闘部の生徒カードがあるとき、喧嘩を売る。1人ごとに相手の学年に応じた確率で勝利し、都度自身と相手のLv合計×10p加算。",
        detail:
          "勝利する確率は(80-学年×20)%。確率加算は勝利する方向に働く。",
        possibility:['random','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targets = i.cards.filter((cc) => cc.club.includes("決闘"));
          const cons = [targets.length > 0];
          if (cons.every((con) => con)) {
            let add = 0;
            const desnotes = [];
            targets.forEach((t) => {
              if (
                Math.floor(Math.random() * 100) <
                80 - Number(t.grade) * 20 + i.c.probadd
              ) {
                const lvsum = (t.collected + i.c.collected) * 10;
                add += lvsum;
                desnotes.push(tools.emj(t) + tools.emj(i.c) + lvsum);
              } else desnotes.push(tools.emj(t) + "❌");
            });
            o.log.description += "\n喧嘩：" + desnotes.join("　");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "random", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "からんと",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "良い顔ですね",
        description:
          "ここまでのリザルト表示・効果説明に含まれる顔系絵文字の数×20p加算。",
        detail: "【ぶっつけ福笑い】のPERFECTも対象とする。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =
            i.resultlist.join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("");
          const targetemoji = exports.emjlist["顔"];
          const targetfxs = i.prefields.filter(pf=>pf.type=='effect'&&pf.special=='GOODFACE');
          const animalsnum = (
            targettext.match(new RegExp(targetemoji.join("|"), "g")) || []
          ).length + targetfxs.length;
          const cons = [animalsnum > 0];
          if (cons.every((con) => con)) {
            const add = animalsnum * 20;
            o.log.add = add;
            o.log.notes = animalsnum + "×20 = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'かりおす', phase:['後'], f:(i)=>
    {const outline = {title:           '大爆笑',
                      description:     'マイナス値を出している得点加算の効果があるとき、大喜びで同じだけの減算を行う。', //学園長がいる場合は大人しく加算へ転じる。
                      detail:          '',
                      possibility:['addminus']};
     if(i){
       try{
         const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
         const targetfxs = i.prefields.filter(pf=>pf.type=="effect"&&pf.fxtype&&pf.fxtype.includes("add")&&pf.add<0);
         if(targetfxs.length){
           const add = targetfxs.map(fx=>fx.add).reduce((a,b)=>a+b);
           o.log.add=add;
           o.log.notes=add+'p';
           o.log.fxtype.push('after','add');
         return o; };
       }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "ぎおんあ甘",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "受け取りなさい！",
        description:
          "自身以外の1年生にチョコを配り、人数×10p加算する。相手へプラス縁がない場合プラス縁を発生させる。",
        detail: "",
        eventdescription:
          "《イベント》自身以外の1年生の人数分チョコを追加獲得する。",
        possibility:['addplus','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const gradeone = i.cards.filter(
            (cc) => cc.id !== i.c.id && cc.grade == 1
          );
          const cons = [gradeone.length > 0];
          if (cons.every((con) => con)) {
            const add = gradeone.length * 10;
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            const newrelation = newcard.relation.split(" - ");
            const newrelationplus = newrelation[0].split("/");
            const rlids = newcard.relation
              .split(" - ")[0]
              .split("/")
              .map(
                (r) =>
                  i.characters.find((ccc) =>
                    ccc.nickname.split(/\/|\s-\s/).includes(r)
                  ).id
              );
            gradeone.forEach((cc) => {
              if (rlids.every((id) => !cc.id.includes(id)))
                newrelationplus.push(cc.nickname.split(/\/|\s-\s/)[0]);
            });
            newrelation[0] = newrelationplus.join("/");
            newcard.relation =
              newrelation[0] + " - " + (newrelation[1] ? newrelation[1] : "");
            o.cards[i.index] = newcard;
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = gradeone.length;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
              o.log.fxtype.push("event");
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "add", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "きのした",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "かわいそう……",
        description: "ここまでの合計点が0p以下であるとき、がんばってくれる。",
        detail: "自身のLv×20pを加算する。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.totalP <= 0];
          if (cons.every((con) => con)) {
            const add = i.c.collected * 20;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "きのした",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ま、まって",
        description:
          "本人の効果によって場から去った生徒がいたとき、残留魔力を辿って先頭へ出て連れ戻し、先頭に追加する。連れ戻した枚数×50p減算。",
        detail: "対象の生徒が既に場にいる場合は発動しない。",
        possibility:['addcard','sortcard','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const targetfxs = i.prefields.filter(pf => pf.type=="effect" && pf.fxtype.includes("leaving") );
          const targets = (0<targetfxs.length)
					    ? targetfxs.map(pf => pf.fxowner).filter(t => t.genre=="stTm" && !i.cards.some(cc => cc.id.includes(t.id.slice(0, 4))))
					    : undefined;
          const cons = [targets && targets.length > 0];
          if (cons.every((con) => con)) {
            o.cards = i.cards.filter((cc) => cc.id !== i.c.id);
            o.cards.unshift(...targets, i.c);
            o.count += targets.length;
            o.log.description +=
              "\n追加：" + targets.map((t) => tools.emj(t)).join("");
            const add = targets.length * -50;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "add", "sortcard", "addcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'きのした菓', phase:['前'], f:(i)=>
    {const outline = {title:           'あ、あれは……？',
                      description:     '自身以外にカード情報の書換を受けた生徒カードがあるとき、該当カードが実は紛れ込んだ魔物であったことが判明する。',
                      detail:          '対象カードが魔物に変わり、本来の効果は発動しない。名前が「-」に変わり、魔物の持つ効果【パニック】によってレアリティ×10p減算。',
                      eventdescription:'《イベント》魔物の枚数分魔法の生地を追加獲得する。',
                      possibility:['editcard','changecard']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               o.cards=i.cards;
               const monsterlist=[];
               // ↓比較対象をcharacters(全カード)ではなくallcards(所有カード)にしないとcollected(レベル)の違いで書換判定を受けてしまうが、
               //allcardsにすると代わりにテスト時に「持っていないカード」が含まれている場合エラーを吐きます。不可避。
               i.cards.forEach((cc,index)=>{if(cc.id!==i.c.id&&!tools.objEquality(cc, i.allcards.concat(exports.additional).find(ccc=>ccc.id==cc.id) )){
                                              const newcard=JSON.parse(JSON.stringify(cc));
                                              newcard.id='ぱにっく';
                                              newcard.name='-';
                                              monsterlist.push(tools.emj(cc));
                                              o.cards[index]=newcard;
                                            }});
               const cons = [(monsterlist.length>0)];
               if(cons.every(con=>con)){o.log.description+='\n魔物：'+monsterlist.join('');
                                        o.log.fxtype.push('before','editcard','changecard');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=monsterlist.length; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'ぱにっく', phase:['前','後'], f:(i)=>
    {const outline = {title:           'パニック',
                      description:     '自身のレアリティ×10p減算。',
                      detail:          '',
                      possibility:['addminus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [(!i.prefields.some(pf=>pf.type=='effect'&&pf.title=='大丈夫、大丈夫だよ'))];
               if(cons.every(con=>con)){const add=i.c.rarity*(-10);
                                        o.log.add=add; o.log.notes=add+'p';
                                        o.log.fxtype.push('before','after','add');
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'きのした菓', phase:['後'], f:(i)=>
    {const outline = {title:           '大丈夫、大丈夫だよ',
                      description:     '【パニック】による減点を打ち消せる分の加点を行う。直前までの合計点が0未満であった場合、さらにもう一度加点を行う。これ以降【パニック】は発動しない。',
                      detail:          '',
                      possibility:['addplus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const targetfxs = i.prefields.filter(pf=>pf.type=='effect'&&pf.title=='パニック');
               const cons = [(targetfxs.length>0)];
               if(cons.every(con=>con)){const oneadd = Math.abs(targetfxs.map(pf=>pf.add).reduce((a,b)=>a+b));
                                        const add = oneadd * (i.totalP<0 ? 2 : 1);
                                        o.log.add=add; o.log.notes=oneadd+'p'+(i.totalP<0 ? ' + '+oneadd+'p' : '');
                                        o.log.fxtype.push('after','add');
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "きむちゅ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ダルバム教",
        description: "月の満ち欠けに応じて🌕30p～🌑-30p加算。",
        detail: "🌕30p 🌔🌖15p\n🌒🌘-15p 🌑-30p",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const m = tools.getMoon(tools.getTodayJp());
          const cons = [!"🌓🌗".includes(m.emoji)];
          if (cons.every((con) => con)) {
            o.log.notes = m.emoji + m.moonname;
            const addlist = [
              ["🌕", 30],
              ["🌔🌖", 15],
              ["🌒🌘", -15],
              ["🌑", -30],
            ];
            const add = addlist.find((al) => al[0].includes(m.emoji))[1];
            o.log.add = add;
            o.log.notes += " " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "きむちゅ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "今日はアタシがアイドル",
        description:
          "ちょうど中央にいるとき、自身と互いに縁が無い生徒カードに自身へのプラス縁を発生させる。",
        detail: "枚数が偶数である場合は判定しない。",
        possibility:['editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const norelation = i.cards.filter(
            (cc) =>
              cc.id !== i.c.id &&
              cc.genre == "stTm" &&
              !cc.relation
                .split(/\/|\s-\s/)
                .find((n) => i.c.nickname.split(/\/|\s-\s/).includes(n)) &&
              !i.c.relation
                .split(/\/|\s-\s/)
                .find((n) => cc.nickname.split(/\/|\s-\s/).includes(n))
          );
          const cons = [
            i.cards.length % 2 !== 0 &&
              Math.floor(i.cards.length / 2) == i.index,
            norelation.length,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            o.cards.forEach((cc, index) => {
              if (cc.id !== i.c.id) {
                const Onewcard = JSON.parse(JSON.stringify(cc));
                const Onewrelation = Onewcard.relation.split(" - ");
                const Onewrelationplus = Onewrelation[0].split("/");
                const Orlids = Onewrelationplus.map((r) => {
                  const t = i.characters.find((ccc) =>
                    ccc.nickname.split(/\/|\s-\s/).includes(r)
                  );
                  return t ? t.id : "none";
                }); //id一覧
                if (!Orlids.some((id) => i.c.id.includes(id))) {
                  Onewrelationplus.push(i.c.nickname.split(/\/|\s-\s/)[0]);
                  console.log("・・・・" + cc.id + "に追加");
                } //相手のプラス縁に追加する
                Onewrelation[0] = Onewrelationplus.join("/");
                Onewcard.relation =
                  Onewrelation[0] +
                  " - " +
                  (Onewrelation[1] ? Onewrelation[1] : "");
                o.cards[index] = Onewcard;
              }
            });
            o.log.fxtype.push("before", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "きむちゅ雪",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "アタシもい～れて",
        description:
          "生徒カードが2枚以上揃っている寮があるとき、そのなかで最も人数の多い寮に加わる。同数の場合はランダム。",
        detail: "寮には緑寮・非寮・未定を含まない。",
        possibility:['editcard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const dlist = [
            ...new Set(
              i.cards
                .map((cc) => cc.dorm)
                .filter(
                  (d) =>
                    !d.match(/緑寮|非寮|？寮|未定/) &&
                    i.cards.filter((cc) => cc.dorm == d).length >= 2
                )
            ),
          ]; //2枚以上ある寮リスト
          const cons = [dlist.length > 0];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            const dnlist = dlist
              .map((d) => i.cards.filter((cc) => cc.dorm == d).length)
              .concat();
            dnlist.sort((a, b) => b - a);
            const maxdorms = dlist.filter(
              (d) => i.cards.filter((cc) => cc.dorm == d).length == dnlist[0]
            );
            if (maxdorms.length > 1) o.log.fxtype.push("random");
            const newdorm =
              maxdorms[Math.floor(Math.random() * maxdorms.length)];
            newcard.dorm = newdorm;
            o.cards[i.index] = newcard;
            o.log.title = "アタシも" + newdorm + "い～れて";
            o.log.fxtype.push("before", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "きむちゅ雪",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "こっちの色もいーでしょ",
        description: "冬であるとき25p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.season == "winter"];
          if (cons.every((con) => con)) {
            const add = 25;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id:'ぎんがじ', phase:['後'], f:(i)=>
    { const details = ['〔2枚：レゲエ〕対象カードのレアリティ合計×自身のLv',
                       '〔3枚：ハウス〕対象カードのレアリティ合計×自身のLv×2',
                       '〔4枚：ダブステップ〕対象カードのレアリティ合計×自身のLv×3',
                       '〔5枚：ユーロビート〕全生徒カードのレアリティ合計×自身のLv×4',
                       '〔6枚以上：ハードコアメタル〕全生徒カードのレアリティ合計×Lv合計'];
      const outline = {title:           '爆上げでいくぞ！',
                       description:     '音楽タグを持つ生徒カードの枚数に応じた加点を行う。',
                       detail:          details.join('\n'),
                       possibility:['addplus']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const targets = i.cards.filter(cc=>cc.tag.split('/').includes('音楽'));
          if(2<=targets.length){
            const dindex = (6<=targets.length) ? 4 : targets.length-2;
            o.log.description+='\n'+details[dindex]+'\n対象：'+targets.map(cc=>tools.emj(cc)).join('');
            const rarities = (dindex<=2) ? targets.map(cc=>cc.rarity).reduce((a,b)=>a+b)
                                         : i.cards.map(cc=>cc.rarity).reduce((a,b)=>a+b);
            const levels = (dindex<=3) ? i.c.collected
                                       : i.cards.map(cc=>cc.collected).reduce((a,b)=>a+b);
            const scale = (dindex<=3) ? dindex+1
                                      : 1;
            const add = rarities * levels * scale;
            o.log.add = add;
            o.log.notes = rarities + '×' + levels + ( scale==1 ? '' : '×' + scale ) + ' = ' + add+'p';
            o.log.fxtype.push('after','add');
          return o; };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  { id: 'ぎんがじ', phase: ['後'], f:(i) =>
    { const outline = {title: 'ギャラクシーポータル',
                       description: 'ここまでのリザルト表示・効果説明に含まれる天体系絵文字の数×20p加算。',
                       detail: '',
                       possibility:['addplus']};
      if(i){
        try{
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const targettext = i.resultlist.join('') + i.prefields.map(pf => pf.name + (pf.description ? pf.description : pf.value)).join('');
          const targetemoji = exports.emjlist['天体'];
          const starsnum = ( targettext.match(new RegExp(targetemoji.join('|'), 'g')) || [] ).length;
          const cons = [starsnum > 0];
          if (cons.every((con) => con)) {
            const add = starsnum * 20;
            o.log.add = add;
            o.log.notes = starsnum + '×20 = ' + add + 'p';
            o.log.fxtype.push('after', 'add');
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'ぎんがじ海', phase:['前'], f:(i)=>
    {const outline = {title:           '真夏のJamboree',
                      description:     '季節を夏に設定する。既に夏である場合、音楽タグを持つ生徒カードの枚数×10p加算。',
                      detail:          '',
                      eventdescription:'《イベント》音楽タグを持つ生徒カードの枚数分シーグラスを追加獲得する。',
                      possibility:['addplus','changeseason']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [(true)];
               if(cons.every(con=>con)){const targets = i.cards.filter(cc=>cc.tag.split("/").includes("音楽"));
                                        if(i.season=='summer'){const add=targets.length*10;
                                                               o.log.add=add; o.log.notes=add+'p';
                                                               o.log.description+='\n対象：'+targets.map(cc=>tools.emj(cc)).join('');
                                                               o.log.fxtype.push('add');}
                                        else                  {o.season='summer';
                                                               o.log.fxtype.push('changeseason');};
                                        o.log.fxtype.push('before');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=targets.length; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'くじょう', phase:['前','後'], f:(i)=>
    {const details = ['〔成功〕いなくなる。',
                      '〔失敗〕末尾に移動し、後始末のために身構える。',
                      '〔後始末〕ここまでのリザルト表示・発動効果(得点加算)にマイナスの値があったとき、これを打ち消せる分の加点を最大でLv×10pまで行う。'];
     const outline = {title:           '事勿れ',
                      description:     '自身以外に得点加算・得点乗算でマイナスの値を出す可能性がある効果を持つ生徒カードがあるとき、その場がいなくなろうと試みる。',
                      detail:          '\n前効果時50%の確率で撤退に成功し、失敗すると後効果時に後始末を行う。確率加算は成功する方向に働く。\n'+details[0]+'\n'+details[1]+'移動は1度しか行われない。\n'+details[2],
                      possibility:['delcard','leaving','sortcard','addplus']};
     if(i){
       try{
         const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
         //前効果、未発動
         if(i.phase=='before' && !i.prefields.some(pf=>pf.type=='effect'&&pf.title.includes(outline.title))){
           const possibilities = tools.checkpossibility(i.cards, ['addminus', 'mulminus']);
           if(possibilities.some((p,index)=>p&&i.cards[index].id!==i.c.id)){
             o.log.fxtype.push('before');
             o.log.description+='\n対象：'+i.cards.filter((cc,index)=>possibilities[index]).map(cc=>tools.emj(cc)).join('');
             o.cards=i.cards.filter(cc=>cc.id!==i.c.id);
             //成功
             if(Math.random()*100<50+i.c.probadd){
               o.log.fxtype.push('delcard','leaving');
               o.log.description+='\n'+details[0];
               o.count--;
             }
             //失敗
             else{
               o.log.fxtype.push('sortcard');
               o.log.description+='\n'+details[1]+'\n移動：'+(i.index+1)+'枚目 → '+(i.cards.length)+'枚目';
               o.cards.push(i.c);
             };
             return o;
           }
           else return;
         }
         //後効果、既発動
         else if(i.phase=='after' && i.prefields.some(pf=>pf.type=='effect'&&pf.title.includes(outline.title))){
           const resultminus = i.resultlist.some(r=>r.match(/-\d+p/));
           const fieldsminus = (i.prefields.length>0 && i.prefields.some(pf=>pf.type=='effect'&&pf.fxtype&&pf.fxtype.includes('add')&&pf.add<0));
           if(resultminus || fieldsminus){
             let add = 0;
             if(resultminus) add += i.resultlist.join('').match(/-\d+p/g).map(m=>Number(m.slice(0, -1))).reduce((a,b)=>a+b)*-1;
             if(fieldsminus) add += i.prefields.filter(pf=>pf.type=='effect'&&pf.fxtype&&pf.fxtype.includes('add')&&pf.add<0).map(pf=>pf.add).reduce((a,b)=>a+b)*-1;
             if(i.c.collected*10<add) add = i.c.collected*10;
             o.log.add = add;
             o.log.notes = add + 'p';
             o.log.fxtype.push('after','add');
             o.log.description=details[2];
             return o;
           };
         }
         else return;
       }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "くどうよ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ポルターガイスト",
        description: "マイナス縁の相手が場にいる生徒カードを場から遠ざける。",
        detail: "",
        possibility:['delcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const bco = penta.pentabasiccalc({data:data,pata:i.pata,tools:tools,spcards:exports.spcards(data.characters.filter(c=>c.genre=="stTm"||c.genre=="tcTm"||c.genre=="otTm")),
                                            tm:i.tm,test:i.test,cards:i.cards,Tcards:i.Tcards,totalP:0,bonusC:0,emjrepeat:1,resultlist:[]});
          const targets = i.cards.filter(cc=>bco.relationlog.some(rl=>rl.ids[0]==cc.id&&rl.minus));
          const cons = [targets.length > 0];
          if(cons.every(con=>con)) {
            const targetids=targets.map(t=>t.id);
            o.cards = i.cards.filter(cc=>!targetids.includes(cc.id));
            o.count -= targetids.filter(id=>i.cards.findIndex(cc=>cc.id==id)<i.index).length;
            o.log.description += "\n削除：" + targets.map(t=>tools.emj(t)).join("");
            o.log.fxtype.push("before", "delcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "くどうよ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "さみしいな……？",
        description:
          "生徒カードの枚数が5枚未満であるとき、5枚になるまで魔魂科または魔動科の生徒を連れてくる。",
        detail:
          "魔魂科または魔動科の生徒カードをじゅうぶんに持っていない場合は発動しない。",
        possibility:['addcard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.cards.length < 5,
            i.allcards.filter(
              (ac) =>
                ac.genre == "stTm" && (ac.major == "魔魂" || ac.major == "魔動")
            ).length >= 5,
          ];
          if (cons.every((con) => con)) {
            o.cards = JSON.parse(JSON.stringify(i.cards));
            for (let j = i.cards.length; j < 5; j++) {
              const choices = i.allcards.filter(
                (chr) =>
                  chr.genre == "stTm" &&
                  (chr.major == "魔魂" || chr.major == "魔動") &&
                  o.cards.every(
                    (cc) => cc.id.slice(0, 4) !== chr.id.slice(0, 4)
                  )
              );
              o.cards[j] = exports.getnature(choices[Math.floor(Math.random() * choices.length)]);
            }
            o.log.description +=
              "\n追加：" +
              o.cards
                .slice(i.cards.length)
                .map((cc) => tools.emj(cc))
                .join("");
            o.log.fxtype.push("before", "addcard", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'くらうん', phase:['前'], f:(i)=>
    {const outline = {title:           '根回し',
                      description:     '自身より後ろに得点加算の効果でマイナス値を出す、あるいはカード削除を行う可能性のある効果を持つ生徒カードがあるとき、該当カードを効果無効🚫にし枚数×20p加算。',
                      detail:          '',
                      possibility:['editcard','addplus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               let activate = false;
               const targetlist = [];
               o.cards=i.cards;
               o.cards.forEach((cc,index)=>{
                 if(i.index<index&&tools.checkpossibility(cc, ['addminus', 'delcard'])){
                   const newcard=JSON.parse(JSON.stringify(cc));
                   newcard.frozen=true;
                   o.cards[index]=newcard;
                   activate=true;
                   targetlist.push(tools.emj(cc));
                 }
               });
               if(activate){
                 const add=targetlist.length*20; o.log.add=add; o.log.notes=targetlist.length+'×20 = '+add+'p';
                 o.log.description+='\n対象：'+targetlist.join('');
                 o.log.fxtype.push('before','editcard','addplus');
                 return o;
               }
               else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "くらうん",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "フィクサー",
        description:
          "ここまでのリザルト表示・発動効果(得点加算)にマイナスの値があったとき、これを打ち消せる分の加点を行う。",
        detail: "得点乗算の効果は対象としない。トータル表示以上の部分は対象としない。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const resultminus = i.resultlist.some((r) => r.match(/-\d+p/));
          const fieldsminus =
            i.prefields.length > 0 &&
            i.prefields.some(
              (pf) =>
                pf.type == "effect" &&
                pf.fxtype &&
                pf.fxtype.includes("add") &&
                pf.add < 0
            );
          const cons = [resultminus || fieldsminus];
          if (cons.every((con) => con)) {
            let add = 0;
            if (resultminus)
              add +=
                i.resultlist
                  .join("")
                  .match(/-\d+p/g)
                  .map((m) => Number(m.slice(0, -1)))
                  .reduce((a, b) => a + b) * -1;
            if (fieldsminus)
              add +=
                i.prefields
                  .filter(
                    (pf) =>
                      pf.type == "effect" &&
                      pf.fxtype &&
                      pf.fxtype.includes("add") &&
                      pf.add < 0
                  )
                  .map((pf) => pf.add)
                  .reduce((a, b) => a + b) * -1;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "くらうん事",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "みんなを大広間に",
        description: "40%の確率で後続の生徒カードを全て緑寮のものにする。",
        detail: "緑寮の生徒カードをじゅうぶんに持っていない場合は発動しない。",
        eventdescription:
          "《イベント》緑寮の生徒カード枚数×Lv個の証拠品を追加獲得する。",
        possibility:['prob','changecard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.index < i.cards.length - 1,
            i.allcards.filter((ac) => ac.dorm == "緑寮").length >=
              i.cards.length,
            Math.floor(Math.random() * 100) < 40 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            for (let j = i.index + 1; j < i.cards.length; j++) {
              const choices = i.allcards.filter(
                (chr) =>
                  chr.dorm == "緑寮" &&
                  !o.cards
                    .slice(0, j)
                    .find((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4))
              );
              const newcard =
                choices[Math.floor(Math.random() * choices.length)];
              o.cards[j] = exports.getnature(newcard);
            }
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd =
                i.cards.filter((cc) => cc.dorm == "緑寮").length *
                i.c.collected;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
              o.log.fxtype.push(
                "event"
              );
            }
            o.log.fxtype.push(
              "before",
              "prob",
              "changecard",
              "random"
            );
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "くらうん事",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "情報整理",
        description: "末尾にいるとき、ここまでの合計点を10の位で四捨五入する。",
        detail: "",
        possibility:['force']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index == i.cards.length - 1];
          if (cons.every((con) => con)) {
            const force = Math.round(i.totalP / 100) * 100;
            o.log.force = force;
            o.log.notes = i.totalP + "p → " + force + "p";
            o.log.fxtype.push("after", "force");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "くらまえ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "クレイジーウェイヴ",
        description:
          "末尾にいるとき幻覚を残して先頭に移動し、通過した空間を掻き乱す。",
        detail:
          "自身以外の全生徒カードの名前を並び替え、全生徒カードの特徴をランダムに材料とする新規生徒カードを末尾に追加して自身を先頭に移動する。別表記・かな表記・作者・ルームメイト・部屋番号・タグ・絵文字は材料としない。\n発動した場合、教師カードはドローされない。",
        possibility:['addcard','editcard','sortcard','random','noteacher']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index == i.cards.length - 1];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            for (let j = 0; j < o.cards.length - 1; j++) {
              const ncard = JSON.parse(JSON.stringify(i.cards[j]));
              const namearray = ncard.name.split("(");
              namearray[0] = tools.shuffle(namearray[0].split("")).join("");
              ncard.name = namearray.join("(");
              o.cards[j] = ncard;
            }
            const newcard = JSON.parse(
              JSON.stringify(
                exports.additional.find((adc) => adc.id == "くれうぇ")
              )
            );
            const xlist = [
              "id",
              "name",
              "subname",
              "kana",
              "author",
              "dormmate",
              "roomid",
              "tag",
              "emoji",
            ];
            for (const property in i.c) {
              newcard[property] = xlist.includes(property)
                ? newcard[property]
                : i.cards[Math.floor(Math.random() * i.cards.length)][property];
            }
            newcard.name = tools
              .shufflenum(
                i.cards
                  .map((cc) => cc.name.split("(")[0])
                  .join("")
                  .split(""),
                Math.floor(
                  i.cards
                    .map((cc) => cc.name.split("(")[0].length)
                    .reduce((a, b) => a + b) / i.cards.length
                )
              )
              .join("");
            o.cards.splice(o.cards.length - 1, 1, newcard);
            o.cards.unshift(i.c);
            o.count++;
            o.noteacher = true;
            o.log.fxtype.push(
              "before",
              "random",
              "sortcard",
              "editcard",
              "addcard",
              "noteacher"
            );
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "くらまえ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "XXXpなわけないだろう",
        description: "10%の確率で強制的にここまでの合計点を10pにする。",
        detail: "【クレイジーウェイヴ】が発動しているときは発動しない。",
        possibility:['force','changeresultlist','changeprefields']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            !i.prefields.find((pf) => pf.title == "クレイジーウェイヴ"),
            Math.floor(Math.random() * 100) < 10 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            const hrindex = i.resultlist.findIndex((r) =>
              r.includes("得点計算")
            );
            o.resultlist = i.resultlist.map((r, i) =>
              i > hrindex ? "~~" + r + "~~" : r
            );
            o.prefields = i.prefields.map((pf) => {
              if (
                pf.type == "birthday" ||
                (pf.type == "effect" &&
                  pf.fxtype.find((ft) =>
                    ft.match(/^(force|add|mul|patternadd)$/)
                  ))
              ) {
                pf.name = "~~" + pf.name + "~~";
                if (pf.description) {
                  pf.description = "~~" + pf.description + "~~";
                }
                if (pf.value) {
                  pf.value = "~~" + pf.value + "~~";
                }
              }
              return pf;
            });
            o.log.title = i.totalP + "pなわけないだろう";
            const force = 10;
            o.log.force = force;
            o.log.notes = "強制" + force + "p";
            o.log.fxtype.push(
              "after",
              "force",
              "changeresultlist",
              "changeprefields"
            );
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "くらまえ元",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "アナザートトノ",
        description: "オリジンから通常の蔵前整に変化し、末尾に移動する。",
        detail:
          "海老千理がいる場合、または蔵前整を持っていない場合は発動しない。",
        possibility:['changecard','sortcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.allcards.some((cc) => cc.id == "くらまえ"),
            !i.cards.some((cc) => cc.id.match(/^えびちり/)),
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            o.cards.splice(i.index, 1);
            o.cards.push(
              exports.getnature(i.allcards.find((cc) => cc.id == "くらまえ"))
            );
            o.count = 0;
            o.log.fxtype.push("before", "changecard", "sortcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "くらまえ嘘",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "Authentication Error (Code: 303)",
        description:
          "33%の確率で、自身と後続の生徒カードが全て整の見せた幻であることが判明する。",
        detail:
          "自身と後続の生徒カードが幻に変わり、本来の効果は発動しない。名前が打ち消されてレアリティ・立場が整のもので上書きされ、通常計算による得点が10p増加する。\nただし、幻の持つ効果によって0～80pの範囲でのランダムな減算が1枚ごとに発生する。\n発動した場合、教師カードはドローされない。",
        eventdescription:
          "《イベント》場にある生徒カードと重複しない(嘘)とつく生徒カードが他にあれば末尾に1枚追加する。",
        possibility:['addcard','prob','changecard','editcard','noteacher']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [Math.floor(Math.random() * 100) < 33 + i.c.probadd];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            for (let j = i.index; j < i.cards.length; j++) {
              const newcard = JSON.parse(JSON.stringify(i.cards[j]));
              newcard.id = "まぼろし";
              newcard.name = "~~" + newcard.name + "~~(幻)";
              newcard.rarity = i.c.rarity;
              newcard.position = i.c.position;
              newcard.basicadd+=10;
              o.cards[j] = newcard;
            }
            if (i.event && i.event.id == i.c.eventid) {
              const choices = i.allcards.filter(
                (chr) =>
                  chr.id !== i.c.id &&
                  chr.eventid &&
                  chr.eventid == "PSEUDO" &&
                  !o.cards.some((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4))
              );
              let pseudo;
              if (choices.length > 0) {
                pseudo = exports.getnature(
                  choices[Math.floor(Math.random() * choices.length)]
                );
                o.cards.push(pseudo);
                o.log.fxtype.push("addcard");
              }
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (choices.length > 0 ? "\n追加：" + tools.emj(pseudo) : "");
              o.log.fxtype.push("event");
            }
            o.noteacher = true;
            o.log.fxtype.push(
              "before",
              "prob",
              "changecard",
              "editcard",
              "noteacher"
            );
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "まぼろし",
    phase: ["後"],
    f: (i) => {
      const comments = [
        "それは失敗しました.",
        "ラブ!",
        "クール.",
        "起こりますか?",
        "今日は私でした, まさに",
        "それは甘美な: 外見が不可能です.",
        "彼の穏やかな空間です",
        "現代的で, スーパーな",
        "私を認識することが私を見ました.",
        "寂しい",
        "場所はありませんが, 神経を怖がらないで.",
        "実のところ, 最終的に, あなたは光を食べました.",
        "洗浄してください.",
        "それは喜びのある物, それはだったか?",
        "見なさい! どのように可笑しいはあります, 正確に",
        "何ひとつの低品質な昼ですか?",
      ];
      const outline = {
        title: "N/A",
        description:
          "```" + comments[Math.floor(Math.random() * comments.length)] + "```",
        detail: "",
        possibility:['addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [true];
          if (cons.every((con) => con)) {
            const add = -1 * Math.floor(Math.random() * 81);
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "random", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "くろえめ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "全部捨てちゃいましょう！",
        description:
          "先頭にいるとき50%の確率で全ての生徒カードの絵文字を捨て、その枚数×20p加算。\n発動した場合、教師カードはドローされない。",
        detail: "",
        possibility:['prob','addplus','editcard','noteacher']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.index == 0,
            i.cards.length > 1,
            Math.floor(Math.random() * 100) < 50 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcardC = JSON.parse(JSON.stringify(i.c));
            newcardC.emoji = "🚮";
            o.cards[i.index] = newcardC;
            for (let j = 1; j < i.cards.length; j++) {
              const newcard = JSON.parse(JSON.stringify(i.cards[j]));
              newcard.emoji = "　";
              o.cards[j] = newcard;
            }
            const add = i.cards.length * 20;
            o.log.add = add;
            o.log.notes = add + "p";
            o.noteacher = true;
            o.log.fxtype.push("before", "prob", "editcard", "add", "noteacher");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id: "くろえめ踊", phase: ["前"], f: (i) =>
    { const outline = {title: "みんなで楽しみましょう！",
                       description: "末尾に近いほど高い確率で後続の生徒カードを全てイベントカードにし、その枚数×25p加算。",
                       detail: "確率は先頭からの位置番号×15%。イベントカードをじゅうぶんに持っていない場合は発動しない。",
                       eventdescription:"《イベント》入れ替えた枚数分ダンスpを追加獲得する。",
                       possibility:['prob','addplus','changecard','random']};
      if (i) {
        try {
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const cons = [(i.index<i.cards.length-1),
                        (i.allcards.filter(ac=>ac.eventid&&ac.eventid!=="SECRET").length>=i.cards.length),
                        (Math.floor(Math.random()*100)<(i.index+1)*15+i.c.probadd)];
          if (cons.every(con => con)) {
            const add = (i.cards.length-1-i.index)*25;
            o.log.add = add;
            o.log.notes = add + "p";
            o.cards = i.cards;
            for (let j=i.index+1; j<i.cards.length; j++) {
              const choices = i.allcards.filter(chr=>chr.eventid&&chr.eventid!=="SECRET"&& !o.cards.slice(0, j).find(cc=>cc.id.slice(0, 4)==chr.id.slice(0, 4)));
              const newcard = choices[Math.floor(Math.random()*choices.length)];
              o.cards[j] = exports.getnature(newcard);
            }
            if (i.event&&i.event.id==i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = i.cards.length-1-i.index;
              o.log.eventitems.add = iadd;
              o.log.description += "\n" + outline.eventdescription + "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd;
              o.log.fxtype.push("event");
            }
            o.log.fxtype.push("before","add","prob","changecard","random");
            return o;
          } else return;
        } catch (error) { return { error: true, title: outline.title, message: error.message }; }
      } else return outline;
    },
  },
  {
    id: "くろかわ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ビートがたりねぇな",
        description:
          "黄寮の生徒カードが3枚以上あったとき、自身も黄寮の生徒カードに変わり音楽タグを持つ。",
        detail: "",
        possibility:['editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.cards.filter((cc) => cc.dorm == "黄寮").length >= 3];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            newcard.dorm = "黄寮";
            newcard.tag = i.c.tag + "/音楽";
            o.cards[i.index] = newcard;
            o.log.fxtype.push("before", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'くろかわ', phase:['前'], f:(i)=>
    {const outline = {title:           'イカサマ',
                      description:     '自身より後ろに、得点加算の効果でマイナス値を出す可能性のある、自身と同じ所属🚪でない、かつ自身からのプラス縁を持たない生徒カードがあるとき、最も近い1枚を自身と同じ所属🚪であるか自身がプラス縁を持つものへすり替える。\n発動した場合、教師カードはドローされない。',
                      detail:          '対象カードを持っていない場合は発動しない。',
                      possibility:['random','changecard','noteacher']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const choices = i.allcards.filter(chr=>chr.genre=='stTm'&&!i.cards.some(cc=>cc.id.slice(0, 4)==chr.id.slice(0, 4))&&(tools.checkdoor(i.c, chr)||tools.checkrelation(i.c, [chr], i.characters).some(rl=>rl.plus)));
               if(choices.length>0){
                 let activate = false;
                 o.cards=i.cards;
                 o.cards.forEach((cc,index)=>{
                   if(i.index<index&&activate==false&&tools.checkpossibility(cc, ['addminus'])&&(!tools.checkdoor(i.c, cc)&&!tools.checkrelation(i.c, [cc], i.characters).some(rl=>rl.plus))){
                     activate = true;
                     const newcard = choices[Math.floor(Math.random()*choices.length)];
                     o.cards[index] = exports.getnature(newcard);
                     o.log.description+='\n入替追加：'+tools.emj(cc)+' → '+tools.emj(newcard);
                   }
                 });
                 if(activate){
                   o.noteacher = true;
                   o.log.fxtype.push('before','random','changecard','noteacher');
                   return o;
                 };
               };
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'くろかわ海', phase:['前'], f:(i)=>
    {const outline = {title:           'Summer Beat Box',
                      description:     '自身以外に音楽タグを持つ生徒カードがあるとき、自身も音楽タグを持ち、全生徒カードのかな表記の文字数分の加点を行い、4文字ごとに追加で1p加算。夏は獲得pが1.5倍になる。',
                      detail:          '小数点以下切捨。',
                      eventdescription:'《イベント》音楽タグを持つ生徒カードの枚数分シーグラスを追加獲得する。',
                      possibility:['addplus','editcard']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const music = i.cards.filter(cc=>cc.id!==i.c.id&&cc.tag.split('/').includes('音楽'));
               const cons = [(music.length>0)];
               if(cons.every(con=>con)){o.cards=i.cards;
                                        const newcard=JSON.parse(JSON.stringify(i.c)); newcard.tag=i.c.tag+'/音楽'; o.cards[i.index]=newcard;
                                        const kana1=i.cards.map(cc=>cc.kana).join('').length;
                                        const kana2=Math.floor(kana1/4);
                                        const summer=(i.season=='summer');
                                        const add=Math.floor((kana1+kana2)*(summer?1.5:1));
                                        o.log.add=add; o.log.notes=kana1+'文字(追加'+kana2+'p)'+(summer?' ×1.5':'')+' → '+add+'p';
                                        o.log.fxtype.push('before','editcard','add');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const targets=o.cards.filter(cc=>cc.tag.split('/').includes('音楽'));
                                                                             const iadd=targets.length; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription
                                                                                               +((iadd!==0)?'\n対象：'+targets.map(cc=>tools.emj(cc)).join('')
                                                                                                           +'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd
                                                                                                           :'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "こうせい",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "○さ～ん！！！！！",
        description:
          "端にいて反対端の生徒カードと共通点かプラス縁があるとき、大声で貫かれた間の生徒カードのレアリティ合計×10p加算。反対端とプラス縁がある場合さらに50p加算。",
        detail:
          "共通点の判定は「出身(中国)・身長・部活・委員会・科目・音楽タグ・寮・学年・性別」の順に行われる。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.cards.length > 2,
            i.index == 0 || i.index == i.cards.length - 1,
          ];
          if (cons.every((con) => con)) {
            const c1 = i.c;
            const c2 = i.index == 0 ? i.cards[i.cards.length - 1] : i.cards[0];
            let desnote;
            let common = false;
            if (c2.hometown.includes("中国")) {
              common = true;
              desnote = "\n共通点：中国";
            }
            if (!common) {
              const ctsA = ["cm", "club", "committee", "major"];
              const ctsAj = ["身長", "部活", "委員会", "科目"];
              for (let j = 0; j < ctsA.length; j++) {
                if (c1[ctsA[j]] == c2[ctsA[j]]) {
                  common = true;
                  desnote = "\n共通点：" + ctsAj[j];
                  break;
                }
              }
            }
            if (!common && c2.tag.split("/").includes("音楽")) {
              common = true;
              desnote = "\n共通点：音楽";
            }
            if (!common) {
              const ctsB = ["dorm", "grade", "sex"];
              const ctsBj = ["寮", "学年", "性別"];
              for (let k = 0; k < ctsB.length; k++) {
                if (c1[ctsB[k]] == c2[ctsB[k]]) {
                  common = true;
                  desnote = "\n共通点：" + ctsBj[k];
                  break;
                }
              }
            }
            let relation = false;
            const relationlog = tools.checkrelation(c1, [c2], i.characters);
            if(relationlog[0]&&relationlog[0].plus){
                relation = true;
                o.log.title += "！！！！！";
            };
            if (common || relation) {
              const baseadd =
                i.cards
                  .slice(1, i.cards.length - 1)
                  .map((cc) => cc.rarity)
                  .reduce((a, b) => a + b) * 10;
              const reladd = relation ? 50 : 0;
              const add = baseadd + reladd;
              o.log.title = o.log.title.replace("○", tools.emj(c2));
              o.log.description += !relation ? desnote : "";
              o.log.add = add;
              o.log.notes =
                baseadd + "p" + (relation ? " +" + reladd + "p" : "");
              o.log.fxtype.push("after", "add");
              return o;
            } else return;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "こうせい甘",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "貰ってくださ～～～い！！",
        description:
          "2年生にチョコを配り、自身を含む2年生の人数×10p加算。相手へプラス縁がない場合プラス縁を発生させ、大理がいる場合は加算する値を10倍にする。ただし、自分もチョコを食べるので__半分しか加算されない__。",
        detail: "",
        eventdescription: "《イベント》2年生の人数分チョコを追加獲得する。",
        possibility:['addplus','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const gradetwo = i.cards.filter((cc) => cc.grade == 2);
          const cons = [gradetwo.length > 0];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            const newrelation = newcard.relation.split(" - ");
            const newrelationplus = newrelation[0].split("/");
            const rlids = newcard.relation
              .split(" - ")[0]
              .split("/")
              .map(
                (r) =>
                  i.characters.find((ccc) =>
                    ccc.nickname.split(/\/|\s-\s/).includes(r)
                  ).id
              );
            gradetwo.forEach((cc) => {
              if (cc.id !== i.c.id && rlids.every((id) => !cc.id.includes(id)))
                newrelationplus.push(cc.nickname.split(/\/|\s-\s/)[0]);
            });
            const add =
              gradetwo.length *
              5 *
              (i.cards.some((cc) => cc.id.match(/^だいりお/)) ? 10 : 1);
            newrelation[0] = newrelationplus.join("/");
            newcard.relation =
              newrelation[0] + " - " + (newrelation[1] ? newrelation[1] : "");
            o.cards[i.index] = newcard;
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = gradetwo.length;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
              o.log.fxtype.push("event");
            }
            o.log.add = add;
            o.log.notes = add * 2 + "÷2=" + add + "p";
            o.log.fxtype.push("before", "add", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ごうとく",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "貯蓄癖",
        description:
          "最終合計点からの獲得コインを無条件でLv倍にする。マイナスの場合はコイン減少を防ぐ。",
        detail:
          "全効果適用後に計算が行われる。「最終合計点からの獲得コイン」以外は対象としない。既に1倍でない場合は重ねて掛け算を行う。小数点以下切捨。",
        possibility:['coinmul']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [true];
          if (cons.every((con) => con)) {
            const coinmul = i.c.collected;
            o.coinmul = coinmul;
            o.log.notes = "🪙" + coinmul + "倍";
            o.log.fxtype.push("after", "coinmul");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ごうとく",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "願いましては",
        description:
          "ここまでの合計点が100p以上であるとき、そろばんをはじいて全ての位の数字を先頭に揃える。",
        detail: "",
        possibility:['force']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.totalP >= 100];
          if (cons.every((con) => con)) {
            const numbers = String(i.totalP).split("");
            const force = Number(numbers[0].repeat(numbers.length));
            o.log.force = force;
            o.log.notes = i.totalP + "p → " + force + "p";
            o.log.fxtype.push("after", "force");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ごうとく猫",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "千客万来",
        description:
          "ここまでのリザルト表示・効果説明に含まれる全ての生徒カード絵文字の数×自身のLv×100c獲得。",
        detail: "",
        possibility:['coinadd']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =
            i.resultlist.join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("");
          const allemjs = [
            ...new Set(
              i.characters
                .filter((chr) => chr.genre == "stTm")
                .map((chr) => chr.emoji)
                .filter((emj) => emj)
            ),
          ];
          const emjsnum = (
            targettext.match(new RegExp(allemjs.join("|"), "g")) || []
          ).length;
          const coinadd = emjsnum * i.c.collected * 100;
          o.coinadd = coinadd;
          o.log.notes = "🪙" + coinadd + "c";
          o.log.fxtype.push("after", "coinadd");
          return o;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ごーすと",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "パワーアンプ",
        description:
          "ここまでに音楽タグを持つ生徒カードによる得点加算の効果があるとき、最後の加算を倍にする(もう一度行う)。",
        detail: "マイナス値も対象とする。",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const mscaddfxs = i.prefields.filter(
            (pf) =>
              pf.type == "effect" &&
              pf.fxowner.genre=='stTm'&&
              pf.fxowner.tag.split("/").includes("音楽") &&
              pf.fxtype &&
              pf.fxtype.includes("add") &&
              pf.add !== 0
          );
          const cons = [mscaddfxs.length > 0];
          if (cons.every((con) => con)) {
            const targetfx = mscaddfxs[mscaddfxs.length - 1];
            const add = targetfx.add;
            o.log.description +=
              "\n対象：" + tools.emj(targetfx.fxowner) + targetfx.title;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ごーすと",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "Lightning",
        description:
          "ここまでのリザルト表示・効果説明に金属・機械系絵文字があるとき、金属間に電撃を走らせてその数×15p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =
            i.resultlist.join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("");
          const targetemoji = exports.emjlist["金属・機械"];
          const metalsnum = (
            targettext.match(new RegExp(targetemoji.join("|"), "g")) || []
          ).length;
          const cons = [metalsnum > 0];
          if (cons.every((con) => con)) {
            const add = metalsnum * 15;
            o.log.add = add;
            o.log.notes = metalsnum + "×15 = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "こさのげ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "困った同居人",
        description:
          "40%の確率で腕が暴走し、Lvに応じた値の加点または減点が生じる。Lvが上がるほどマイナスになる確率が下がる。",
        detail:
          "加減されるpはLvに応じて40pから15ずつ増加し、MAX(5)で100p。マイナスになる確率はLvに応じて75%から15ずつ減少し、MAX(5)で15%。",
        possibility:['prob','random','addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [Math.floor(Math.random() * 100) < 40 + i.c.probadd];
          if (cons.every((con) => con)) {
            const add =
              (25 + i.c.collected * 15) *
              (Math.floor(Math.random() * 100) < 10 + i.c.collected * 15
                ? 1
                : -1);
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "prob", "random", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "こんどう",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "クロススティック",
        description:
          "自身以外に音楽タグを持つカードがあるとき、1枚ごとにカウント順×10pを加算していく。(+10p、+20p、+30p...)",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cmusic = [...i.cards, ...i.Tcards].filter(
            (cc) => cc.id !== i.c.id && cc.tag.split("/").includes("音楽")
          );
          const cons = [cmusic.length > 0];
          if (cons.every((con) => con)) {
            const add = ((cmusic.length * (cmusic.length + 1)) / 2) * 10;
            o.log.description +=
              "\n対象：" + cmusic.map((cc) => tools.emj(cc)).join("");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'こんどう祭', phase:['前'], f:(i)=>
    {const outline = {title:           '静寂のフィルイン',
                      description:     '現在のカードで通常計算を行った場合の得点見込みが80p未満かつここまでの発動効果数が0のとき、自身以外の全生徒カードを(文化祭)とつくか音楽タグを持つものと入れ替え、先頭から順にもう1度行動する。選択されるカードには確率設定がある。',
                      detail:          '2%の確率で軽音楽部のカード、8%の確率で軽音楽部以外の音楽タグを持つカード、90%で上記のものに該当しない(文化祭)とつくカードが選択される。\nこの効果は1度しか発動しない。対象となる生徒カードをじゅうぶんに持っていない場合は発動しない。',
                      eventdescription:'《イベント》エンジョイpを2個追加獲得する。',
                      possibility:['changecard','changecount','random']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const bco = penta.pentabasiccalc({data:data,pata:i.pata,tools:tools,
                                                 spcards:exports.spcards(data.characters.filter(c=>c.genre=="stTm"||c.genre=="tcTm"||c.genre=="otTm")),
                                                 tm:i.tm,test:i.test,cards:i.cards,Tcards:i.Tcards,
                                                 totalP:0,bonusC:0,emjrepeat:1,resultlist:[]});
               const targetsets = [i.allcards.filter(chr=>chr.genre=='stTm'&&chr.club.includes('軽音楽')),
                                   i.allcards.filter(chr=>chr.genre=='stTm'&&!chr.club.includes('軽音楽')&&chr.tag.split('/').includes('音楽')),
                                   i.allcards.filter(chr=>chr.genre=='stTm'&&!chr.club.includes('軽音楽')&&!chr.tag.split('/').includes('音楽')&&(chr.eventid&&chr.eventid=='FESTIVAL'))]
               const cons = [(bco.totalP<80),
                             (i.prefields.filter(pf=>pf.type=='effect').length==0),
                             (targetsets.every(targets=>targets.length>=i.cards.length)),
                             (!i.prefields.some(pf=>pf.type=="effect"&&pf.title==outline.title))];
               if(cons.every(con=>con)){o.cards=i.cards;
                                        const beforeemjs=[]; const afteremjs=[];
                                        o.cards.forEach((cc,index)=>{
                                          if(index!==i.index){
                                            beforeemjs.push(tools.emj(cc));
                                            const dice = Math.random()*100;
                                            const targets = (dice<2)  ? targetsets[0]
                                                          : (dice<10) ? targetsets[1] : targetsets[2];
                                            const choices = targets.filter(chr=>![...o.cards.slice(0,index), i.c].some(cc=>cc.id.slice(0, 4)==chr.id.slice(0, 4)));
                                            const newcard = choices[Math.floor(Math.random()*choices.length)];
                                            o.cards[index] = exports.getnature(newcard);
                                            afteremjs.push(tools.emj(newcard));
                                          };
                                        });
                                        o.log.notes='(見込'+bco.totalP+'p) '; o.count-=(1+i.index);
                                        o.log.description += '\n入替追加：'+beforeemjs.join('')+' → '+afteremjs.join('');
                                        
                                        o.log.fxtype.push('before','changecard','changecount');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=2; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "さいおん",
    phase: ["後"],
    f: (i) => {
      const cookpatterns = [
        [10, "とびきりの", "🍱×10以上：「とびきりの」 先頭から", "max"],
        [8, "豪華な", "🍱×8以上：「豪華な」 3つ前から", 3],
        [5, "うれしい", "🍱×5以上：「うれしい」 2つ前から", 2],
        [3, "ささやかな", "🍱×3以上：「ささやかな」 1つ前から", 1],
      ];
      const outline = {
        title: "おもてなし",
        description:
          "ここまでのリザルト表示・効果説明に含まれる食物系絵文字の数、調理部か茶道部である生徒カードの数の合計に応じた規模のおもてなしを行い、内容に応じた分だけ前のカードから順にもう1度行動する。",
        detail: 'この効果は1度しか発動しない。\n'+[...cookpatterns]
          .reverse()
          .map((cp) => cp[2])
          .join("\n"),
        possibility:['changecount']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =
            i.pentamessage +
            i.resultlist.join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("");
          const foodsnum =
            (
              targettext.match(
                new RegExp(exports.emjlist["食物"].join("|"), "g")
              ) || []
            ).length +
            i.cards.filter(
              (cc) => cc.club.includes("調理") || cc.club.includes("茶道")
            ).length;
          const cons = [
            !i.prefields.some(
              (pf) => pf.type == "effect" && pf.title.includes(outline.title)
            ),
            foodsnum >= 3,
          ];
          if (cons.every((con) => con)) {
            const pattern = cookpatterns.find((cp) => cp[0] <= foodsnum);
            o.log.title = pattern[1] + o.log.title;
            o.log.description += "\n" + pattern[2];
            o.count -=
              (pattern[3] == "max" || i.index - pattern[3] < 0
                ? i.index
                : pattern[3]) + 1;
            o.log.fxtype.push("after", "changecount");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "さいとう",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "フラッシュバック",
        description:
          "音楽タグを持つ生徒カードが2枚以上あるときその枚数×20pを、偶数枚で加算、奇数枚で減算。",
        detail: "",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const mcs = i.cards.filter((cc) =>
            cc.tag.split("/").includes("音楽")
          );
          const cons = [mcs.length >= 2];
          if (cons.every((con) => con)) {
            const add = mcs.length * 20 * (mcs.length % 2 ? -1 : 1);
            o.log.description +=
              "\n対象：" + mcs.map((cc) => tools.emj(cc)).join("");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'さいとう山', phase:['前'], f:(i)=>
    {const outline = {title:           '一期一会',
                      description:     '末尾にいるとき、話し相手として自身と共通点(科目・部活・寮室・タグ)を持たない生徒を1人選んで連れてくる。',
                      detail:          '',
                      eventdescription:'《イベント》食材🦑を追加獲得する。',
                      possibility:['addcard','random']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [i.index==i.cards.length-1];
               if(cons.every(con=>con)){o.cards = i.cards;
                                        const choices = i.allcards.filter(chr=>!i.cards.some(cc=>cc.id.slice(0,4)==chr.id.slice(0,4))
                                                                             &&i.c.major!=chr.major
                                                                             &&!i.c.club.split(' ').some(club=>chr.club.split(' ').includes(club))
                                                                             &&i.c.roomid!=chr.roomid
                                                                             &&!i.c.tag.split('/').some(tag=>chr.tag.split('/').includes(tag))
                                                                         );
                                        const newcard = exports.getnature(choices[Math.floor(Math.random()*choices.length)]);
                                        o.cards.push(newcard);
                                        o.log.description += '\n追加：' + tools.emj(newcard);
                                        o.log.fxtype.push('before', 'addcard', 'random');
                                        if(i.event&&i.event.id==i.c.eventid){o.log.special='curry';
                                                                             o.log.description+='\n'+outline.eventdescription; };
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "ささそう",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "どっから見ても○でしょ！？",
        description:
          "自身以外に魔変科のカードが無いとき、50%の確率でこの場の生徒のうちの誰かに不完全に変身する。",
        detail:
          "確定コピー：名前類\n25%コピー：性別・身長・科目・学年・委員会等・部活・立場・レアリティ・絵文字\n各コピーは確率加算の影響を受けない。",
        possibility:['prob','random','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            ![...i.cards, ...i.Tcards].some(
              (cc) => cc.id !== i.c.id && cc.major == "魔変"
            ),
            Math.floor(Math.random() * 100) < 50 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            const targets = i.cards.filter((cc) => cc.id !== i.c.id);
            const target = targets[Math.floor(Math.random() * targets.length)];
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            const copied = ["名前類"];
            const copy1 = ["subname", "kana", "nickname"]; //確定コピー
            const copy2 = [
              "sex",
              "cm",
              "major",
              "grade",
              "committee",
              "club",
              "position",
              "rarity",
            ]; //確率コピー
            newcard.name = target.name + "(" + i.c.emoji + "相次郎)";
            copy1.forEach((p) => (newcard[p] = target[p]));
            copy2.forEach((p) => {
              if (Math.floor(Math.random() * 100) < 25 && target[p]) {
                newcard[p] = target[p];
                copied.push(
                  tools.convertAlias(data.categories, p, "namejp", "nameen")
                    .nameA
                );
              }
            });
            if (Math.floor(Math.random() * 100) < 20) {
              newcard.emoji = tools.emj(target);
              copied.push("絵文字");
            }
            o.cards[i.index] = newcard;
            o.log.title = o.log.title.replace("○", tools.emj(target));
            o.log.description += "\n成功項目：" + copied.join("・");
            o.log.fxtype.push("before", "prob", "random", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id: "ささそう山", phase: ["前"], f: (i) =>
    { const outline = {title: "夜明けのコーヒー",
                       description:"21～6時である場合は夜を明かし6時にする。自身より前に揃っていた生徒カードと一緒にコーヒーを飲んで効果無効🚫を解除し、確率加算の値(%)を50加算。",
                       detail:"",
                       eventdescription:"《イベント》食材🥩を追加獲得する。",
                       possibility:['changedate','editcard']};
      if (i) {
        try {
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          if(i.date.getHours() < 6 || 21 <= i.date.getHours()){
            o.date=i.date;
            if(21 <= i.date.getHours()) o.date.setDate(i.date.getDate()+1);
            o.date.setHours(6,0,0);
            o.log.notes='(朝6時)';
            o.log.fxtype.push("changedate");
          };
          o.cards = i.cards.map((cc, index) => {
            if (index <= i.index) {
              const newcard = JSON.parse(JSON.stringify(cc));
              newcard.probadd += 50;
              if(newcard.frozen) newcard.frozen = false;
              return newcard;
            } else return cc;
          });
          o.log.description += "\n対象：" + i.cards.slice(0, i.index+1).map(cc => tools.emj(cc)).join("");
          o.log.fxtype.push("before", "editcard");
          if(i.event&&i.event.id==i.c.eventid){o.log.special='curry';
                                               o.log.description+='\n'+outline.eventdescription; };
          return o;
        }catch(error){ return { error: true, title: outline.title, message: error.message };}
      } else return outline;
    }
  },
  {
    id: "さとうこ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ぜって～かます",
        description: "先頭にいるとき、はりきりすぎて少々無茶をかます。",
        detail:
          "-40p・-30p・-20p・-10p・70pの中からランダムで得点の加減を行う。",
        possibility:['addplus','addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index == 0];
          if (cons.every((con) => con)) {
            const pchoice = [-40, -30, -20, -10, 70];
            const add = pchoice[Math.floor(Math.random() * pchoice.length)];
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "random", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "さとうこ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ぁんでだよ～っ！",
        description:
          "かましたあとの合計点が0以下であるとき、ぁんでだよ～っ！ って言う。",
        detail: "",
        possibility:['nothing']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.prefields.find(
              (pf) => pf.type == "effect" && pf.title == "ぜって～かます"
            ),
            i.totalP <= 0,
          ];
          if (cons.every((con) => con)) {
            const add = 0;
            o.cards = i.cards;
            o.log.add = add;
            o.log.notes = "おかしいだろ";
            o.log.fxtype.push("after", "nothing");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'さとうこ祭', phase:['前'], f:(i)=>
    {const outline = {title:           '天才ってこうだろ！',
                      description:     '自身以外にイベントカードがあるときリザルトに勢い良く絵具をぶつけ、全生徒カードの絵文字・名前の文字をランダムで💥に書き換え💥の数×10p加算し、かな表記に「こむぎ」か「ばくはつだ！」を追加する。ただし絵文字を書き換えられた生徒には絵具が撥ね、咄嗟に身を屈めることで身長の数値が30下がり30p減算。',
                      detail:          '💥に書き換えられる確率は、絵文字は30%で確率加算の値を引かれ、名前は1文字につき15%で確率加算の影響を受けない。身長は30cm以下である場合は低下しない。',
                      eventdescription:'《イベント》この効果による得点から20pごとに1個ずつエンジョイpを追加獲得する。',
                      possibility:['addplus','addminus','random','editcard']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [(i.cards.some(cc=>cc.eventid&&cc.eventid!=='SECRET'&&cc.id!==i.c.id))];
               if(cons.every(con=>con)){let plusadd=0; let minusadd=0;
                                        const hane = [];
                                        o.cards=i.cards;
                                        o.cards.forEach((cc,index)=>{
                                          const newcard=JSON.parse(JSON.stringify(cc));
                                          //絵文字
                                          if(newcard.cm&&newcard.cm>30&&Math.floor(Math.random()*100)<30-cc.probadd){
                                            newcard.emoji='💥';
                                            plusadd+=10;
                                            newcard.cm-=30;
                                            hane.push(tools.emj(cc)+cc.cm+'→'+newcard.cm+'cm');
                                            minusadd+=30;
                                          };
                                          //名前
                                          const wholename = newcard.name.split('('); const namearray = wholename[0].split('');
                                          namearray.forEach((n,index)=>{if(Math.floor(Math.random()*100)<15){
                                                                          namearray[index]='💥';
                                                                          plusadd+=10;}; });
                                          wholename[0] = namearray.join(''); newcard.name = wholename.join('(');
                                          //かな表記
                                          newcard.kana += (Math.random()<0.5) ? 'こむぎ' : 'ばくはつだ！';
                                          
                                          o.cards[index]=newcard;
                                        });
                                        const add=plusadd-minusadd;
                                        o.log.add=add; o.log.notes=(plusadd>0&&minusadd>0?plusadd+'-'+minusadd+' = ':'')+add+'p';
                                        if(hane.length>0) o.log.description+='\n被害：'+hane.join('　');
                                        if(plusadd>0||minusadd>0) o.log.fxtype.push('add');
                                        o.log.fxtype.push('before','editcard','random');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=Math.floor(add/20); o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'さとうこ不', phase:['前'], f:(i)=>
    {const success = '成功：今回を含めてのこの効果の発動数の2乗×20p加算。';
     const failure = '失敗：今回を含めての(失敗数×10)p減算し全生徒カードの効果発動の確率加算の値(%)を(失敗数×7)減算したうえ、1つ次へ移動する。';
     const over = '大の字：既に効果発動の確率が0%以下であるか末尾であるため、大の字に伸びて明日に期待する。また何度でもがんばろう！'
     const outline = {title:           '食い下がる',
                      description:     '必ず挑戦し、50%の確率で成功する。',
                      detail:          success+'\n'+failure+'\n'+over+'\nこの効果は何度でも発動するが、末尾での初回発動は発生しない。既に成功していた場合、大の字になっていた場合は発動しない。',
                      possibility:['random','addplus','addminus','sortcard','editcard']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const logfxs=i.prefields.filter(pf=>pf.type=='effect'&&pf.title.includes(outline.title));
               
               if(!logfxs.some(pf=>pf.special=='success'||pf.special=='over')
                 &&(i.index<i.cards.length-1||(i.index==i.cards.length-1&&logfxs.length>0)) ){
                 if(50+i.c.probadd<=0||i.index==i.cards.length-1){ //大の字
                   o.log.title+='……'.repeat(logfxs.length+1);
                   o.log.notes='大の字'; o.log.special='over';
                   o.cards=i.cards;
                   const newcard=JSON.parse(JSON.stringify(i.c));
                   const names = ['こんなんあるかよ～っ', '今日ってなんなんだ～っ', 'おれってなんなんだ～っ', '次はぜって～やる……', 'ぐわ～～～～～っ'];
                   newcard.name = names[Math.floor(Math.random()*names.length)]+'(小麦)(不屈)';
                   o.cards[i.index]=newcard;
                   o.log.description = over;
                   o.log.fxtype.push('editcard');
                 }
                 else{
                   if(logfxs.length>0) o.log.title+='！'.repeat(logfxs.length);
                   let add=0;
                   if(Math.floor(Math.random()*100)<50+i.c.probadd){ //成功
                     o.log.notes='成功'; o.log.special='success';
                     add=((logfxs.length+1)**2)*20; 
                     o.log.description += '\n'+success;
                   }
                   else{ //失敗
                     const failurenum = 1 + logfxs.filter(pf=>pf.special=='failure').length;
                     o.log.notes='失敗'; o.log.special='failure';
                     add=-failurenum*10;
                     o.cards=i.cards.filter(cc=>cc.id!==i.c.id);
                     o.cards.splice(i.index+1, 0, i.c);
                     o.cards.forEach((cc,index)=>{const newcard=JSON.parse(JSON.stringify(cc));
                                                  newcard.probadd-=failurenum*7;
                                                  o.cards[index]=newcard;});
                     o.count--;
                     o.log.description += '\n'+failure+"\n移動：" + (i.index+1) + "枚目 → " + (i.index+2) + "枚目"+'\n確率加算：-'+(failurenum*7)+'%';
                     o.log.fxtype.push('editcard','sortcard');
                   }
                   o.log.add=add; o.log.notes+=' '+add+'p'; 
                   o.log.fxtype.push('random','add');
                 };
                 o.log.fxtype.push('before');
                 return o;
               }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "さなげな",
    phase: ["後"],
    f: (i) => {
      const spring = "春：50%・0～30p";
      const summer = "夏：80%・-50～50p";
      const autumn = "秋：50%・-30～50p";
      const winter = "冬：10%・50～200p";
      const outline = {
        title: "サバイバルハンティング",
        description:
          "一定の確率によって一定範囲からランダムな加点を行う。各値は季節によって変動する。",
        detail:
          spring +
          "\n" +
          summer +
          "\n" +
          autumn +
          "\n" +
          winter +
          "\nただし、22～5時の間は門限破りとして-50p。",
        possibility:['prob','random','addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;

          let per = 0;
          let desnote = "";
          let add = 0;
          if (i.season == "spring") {
            per = 50;
            desnote = spring;
            add = Math.floor(Math.random() * 4) * 10;
          } else if (i.season == "summer") {
            per = 80;
            desnote = summer;
            add = (Math.floor(Math.random() * 11) - 5) * 10;
          } else if (i.season == "autumn") {
            per = 50;
            desnote = autumn;
            add = (Math.floor(Math.random() * 9) - 3) * 10;
          } else if (i.season == "winter") {
            per = 10;
            desnote = winter;
            add = (Math.floor(Math.random() * 16) + 5) * 10;
          }
          const cons = [Math.floor(Math.random() * 100) < per + i.c.probadd];
          if (cons.every((con) => con)) {
            o.log.description += "\n" + desnote;
            const hours = i.date.getHours();
            if (22 <= hours || hours < 5) {
              add = -50;
              o.log.description =
                "~~" + o.log.description + "~~\n「も、門限忘れてました……」";
            } else {
              o.log.fxtype.push("random");
            }
            if (add !== 0) {
              o.log.add = add;
              o.log.notes = add + "p";
              o.log.fxtype.push("after", "prob", "add");
              return o;
            } else return;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "さなげな",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "毒薬は口に甘いのです！",
        description:
          "ここまでの合計点が0未満である場合、Lv×10%の確率で合計点に-1を掛ける。",
        detail: "",
        possibility:['prob','mulminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.totalP < 0,
            Math.floor(Math.random() * 100) < 10 * i.c.collected + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            const mul = -1;
            o.log.mul = mul;
            o.log.notes =
              i.totalP + "p × " + mul + " = " + i.totalP * mul + "p";
            o.log.fxtype.push("after", "prob", "mul");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'さなげな山', phase:['後'], f:(i)=>
    {const details = ['〔6～18時〕猿投ポイント(xp)を1加算。上限は20xp。',
                      '〔18～6時〕猿投ポイント(xp)を全て消費する。発動時のxpが3以上であった場合、xp×30p加算。']
     const outline = {title:           'キャンプ飯ですよ！',
                      description:     '時間帯に応じて内容が変化する。',
                      detail:          details.join('\n'),
                      eventdescription:'《イベント》食材🍄を追加獲得する。',
                      possibility:['keep','addplus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const keeps = i.keeps.find(k => k.includes(outline.title));
               let   xp    = keeps ? Number(keeps.split("/")[1]) : 0;
               const hour  = i.date.getHours();
               if(6<=hour&&hour<18){ if(xp<20) xp++;
                                     o.log.description+='\n'+details[0]+'\n現在：'+xp+'xp'; }
               else                { o.log.description+='\n'+details[1]+'\n現在：'+xp+'xp → 0xp';
                                     if(3<=xp){ const add=xp*30; o.log.add=add; o.log.notes=xp+'×30 = '+add+'p'; o.log.fxtype.push('add'); };
                                     xp=0; };
               o.keeptext=xp; o.log.fxtype.push('after','keep');
               if(i.event&&i.event.id==i.c.eventid){o.log.special='curry';
                                                    o.log.description+='\n'+outline.eventdescription; };
               return o;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  { id:'じーたぶ', phase:['前'], f:(i)=>
    { const outline = {title:           '来やがったな！',
                       description:     '5%の確率で、呼んでもいないのに自身の前にペペが出る。',
                       detail:          'ペペを持っていない場合は発動しない。',
                       possibility:['prob','addcard']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          if(Math.random()*100<5+i.c.probadd && !i.cards.some(cc=>cc.id.match(/^ぺぺぽも/))){
            const choices = i.allcards.filter(cc=>cc.id.match(/^ぺぺぽも/));
            if(choices.length){
              o.cards=i.cards;
              const newcard = exports.getnature(choices[Math.floor(Math.random()*choices.length)]);
              o.cards.splice(i.index, 0, newcard);
              o.count++;
              o.log.description+='\n追加：'+tools.emj(newcard);
              o.log.fxtype.push('before','prob','addcard');
              return o;
            };
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  { id:'じおゔぁ', phase:['後'], f:(i)=>
    { const outline = {title:           'ジオ・タグ',
                       description:     '中央以前にいるとき、先頭の生徒から順に効果による得点加算(＋)をもう一度行う。先頭の生徒と同科目であり、かつ得点加算(＋)を行う効果を発動させている生徒が続いている限り連続的に対象とする。その後、対象枚数分後続の生徒カードの効果判定をスキップする。',
                       detail:          '',
                       possibility:['addplus','changecount']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          //▼条件
          if(0 < i.index && i.index < Math.ceil(i.cards.length/2)){
            let add=0;
			const allresults = [];
			
			for(let j=0;j<i.index;j++){
			  const target = i.cards[j];
			  const targetfxs = i.prefields.filter(pf=>pf.fxowner.id==target.id&&pf.fxtype.includes('add')&&0<pf.add);
			  const targetresults = (0<targetfxs.length) ? targetfxs.map(fx=>fx.add) : [];
			  if(0<targetresults.length){
				add+=targetresults.reduce((a,b)=>a+b);
				allresults.push(tools.emj(target)+targetresults.join('+'));
			  }
			  if(targetresults.length==0||(target.major&&i.cards[j+1].major&&target.major!==i.cards[j+1].major)) break;
			};
			
			if(0<allresults.length){
              o.log.add=add; o.log.notes=add+'p';
			  o.log.description+='\n対象：'+allresults.join(' ');
			  o.count+=allresults.length;
              o.log.fxtype.push('after','add','changecount');
			  return o;
			}
			else return;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "しちりが",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "気まぐれツーリング",
        description:
          "10%の確率でほうきに乗って海に行ってしまうが、リフレッシュしてLv×10p加算。",
        detail: "",
        possibility:['prob','delcard','leaving','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [Math.floor(Math.random() * 100) < 10 + i.c.probadd];
          if (cons.every((con) => con)) {
            const add = 10 * i.c.collected;
            o.cards = i.cards.filter((cc) => !cc.id.match(/しちりが/));
            o.count--;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "prob", "add", "delcard", "leaving");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "しちりが雪",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "スキージャンプ",
        description:
          "先頭にいたとき、末尾までの間に自分より長い名前が無ければ華麗にジャンプして末尾の生徒カードのLv×20p加算。",
        detail: "",
        eventdescription:
          "《イベント》美しく跳べたとき(ランダムで)雪玉を1～3個獲得する。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const longnamei = i.cards.findIndex(
            (cc) => cc.name.split(/\(|\s\/\s/)[0].length > 7
          );
          const cons = [
            i.index == 0,
            longnamei == -1 || longnamei == i.cards.length - 1,
          ];
          if (cons.every((con) => con)) {
            const add = i.cards[i.cards.length - 1].collected * 20;
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const dp = [0, 0, 0, 1, 1, 2, 2, 3];
              const iadd = dp[Math.floor(Math.random() * dp.length)];
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "じゅうそ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "撮影させてくれ～！",
        description:
          "動画の撮影交渉をし、応じてくれたカードの枚数×13p加算。レアリティによってボーナスが加算される。",
        detail:
          "(6-レアリティ)×13%の確率で交渉に応じ、レアリティが6以上か0のときは13÷1.3%固定となる。レアリティボーナスは1・2のときを除きレアリティの2乗とし、上限は30p。レアリティ0のときは上限値に従う。\nこの効果が複数回発動した場合は、まだ交渉に応じていないカードのみを交渉の対象とする。",
        possibility:['addplus','prob']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const logged = i.prefields.find(
            (pf) => pf.type == "effect" && pf.title == outline.title
          );
          const loggedtargetids = logged ? logged.special : [];
          const targets = [...i.cards, ...i.Tcards].filter(
            (cc) => !loggedtargetids.includes(cc.id)
          );
          const cons = [i.cards.length > 1, targets.length > 0];
          if (cons.every((con) => con)) {
            const okc = targets.filter((cc) => {
              if (cc.rarity == 0 || cc.rarity > 5) {
                return Math.floor(Math.random() * 100) < 13 / 1.3 + i.c.probadd;
              } else {
                return (
                  cc.id !== i.c.id &&
                  Math.floor(Math.random() * 100) <
                    (6 - cc.rarity) * 13 + i.c.probadd
                );
              }
            });
            if (okc.length) {
              const rbonus = okc
                .map((cc) =>
                  cc.rarity == 0 || cc.rarity > 5
                    ? 30
                    : cc.rarity > 2
                    ? cc.rarity * cc.rarity
                    : 0
                )
                .reduce((a, b) => a + b);
              const add = okc.length * 13 + rbonus;
              o.log.add = add;
              o.log.notes =
                +okc.length +
                "×13" +
                (rbonus ? "+" + rbonus : "") +
                " = " +
                add +
                "p";
              o.log.description +=
                "\n対象：" +
                okc
                  .map(
                    (cc) =>
                      tools.emj(cc) +
                      (cc.rarity == 1 || cc.rarity == 2
                        ? ""
                        : "(+" +
                          (cc.rarity > 5 || cc.rarity == 0
                            ? 30
                            : cc.rarity * cc.rarity) +
                          "p)")
                  )
                  .join(" ");
              o.log.special = okc.map((cc) => cc.id);
              o.log.fxtype.push("after", "prob", "add");
              return o;
            } else return;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "じゅうそ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "エナジードリンク",
        description:
          "ここまでの合計点が200p未満であるとき、ドリンクを飲んで1つ前のカードから順にもう1度行動する。元の姿であるときは再行動せず50p加算。",
        detail: "この効果は1度しか発動しない。自身が先頭にいる場合は自身からの再行動となる。",
        possibility:['addplus','changecount']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            !i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == outline.title
            ),
            i.totalP < 200,
          ];
          if (cons.every((con) => con)) {
            if (i.c.nature == "⤴️") {
              o.log.fxtype.push("add");
              const add = 50;
              o.log.add = add;
              o.log.notes = add + "p";
            } else {
              o.log.fxtype.push("changecount");
              o.count -= i.index == 0 ? 1 : 2;
            }
            o.log.description += "\n発動前の合計点：" + i.totalP + "p";
            o.log.fxtype.push("after");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "じゅつら",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "門限破りはダメですよ",
        description:
          "22～5時の間、末尾にいて生徒カードが5枚に満たないとき、5枚になるまで青寮の生徒カードを氷漬け(効果無効🚫・Lv.0)にして連れてくる。",
        detail: "青寮の生徒カードをじゅうぶんに持っていない場合は発動しない。",
        possibility:['addcard','editcard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.cards.length < 5,
            i.index == i.cards.length - 1,
            22 <= i.date.getHours() || i.date.getHours() < 5,
            i.allcards.filter((ac) => ac.dorm == "青寮").length >= 5,
          ];
          console.log(cons);
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            for (let j = i.index + 1; j < 5; j++) {
              const choices = i.allcards.filter(
                (chr) =>
                  chr.dorm == "青寮" &&
                  !o.cards
                    .slice(0, j)
                    .find((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4))
              );
              const newcard =
                choices[Math.floor(Math.random() * choices.length)];
              newcard.collected = 0;
              newcard.frozen = true;
              o.cards[j] = exports.getnature(newcard);
            }
            o.log.fxtype.push("before", "addcard", "editcard", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "じゅつら",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ウッカリ冬模様",
        description:
          "40%の確率で季節を冬に設定する。自身のレアリティが4以上、または【門限破りはダメですよ】が発動している場合は必ず発動する。確率加算の影響は受けない。",
        detail: "冬であるときは発動しない。",
        possibility:['prob','changeseason']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.season !== "winter",
            i.c.rarity >= 4 ||
              i.prefields.some((pf) => pf.type=="effect"&&pf.title == "門限破りはダメですよ") ||
              Math.floor(Math.random() * 100) < 40,
          ];
          if (cons.every((con) => con)) {
            o.season = "winter";
            o.log.fxtype.push("before", "prob", "changeseason");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "じゅつら雪",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "青寮軍、行きますよ",
        description: "40%の確率で後続の生徒カードを全て青寮のものにする。",
        detail: "青寮の生徒カードをじゅうぶんに持っていない場合は発動しない。",
        eventdescription:
          "《イベント》青寮の生徒カード枚数×Lv個の雪玉を追加獲得する。",
        possibility:['prob','changecard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.index < i.cards.length - 1,
            i.allcards.filter((ac) => ac.dorm == "青寮").length >=
              i.cards.length,
            Math.floor(Math.random() * 100) < 40 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            for (let j = i.index + 1; j < i.cards.length; j++) {
              const choices = i.allcards.filter(
                (chr) =>
                  chr.dorm == "青寮" &&
                  !o.cards
                    .slice(0, j)
                    .find((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4))
              );
              const newcard =
                choices[Math.floor(Math.random() * choices.length)];
              o.cards[j] = exports.getnature(newcard);
            }
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 1;
              o.log.eventitems.index = iindex;
              const iadd =
                i.cards.filter((cc) => cc.dorm == "青寮").length *
                i.c.collected;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
            }
            o.log.fxtype.push(
              "before",
              "prob",
              "changecard",
              "random",
              "event"
            );
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id:'じゅとう', phase:['後'], f:(i)=>
    { const outline = {title:           '鈍',
                       description:     'ここまでのリザルト表示・効果説明に含まれる怪物系絵文字の数×4p加算。絵文字の数が6に達した場合、加算する値をさらに6倍にする。',
                       detail:          '',
                       possibility:['addplus']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const targettext = i.resultlist.join('') + i.prefields.map(pf => pf.name + (pf.description ? pf.description : pf.value)).join('');
          const targetemoji = exports.emjlist['怪物'];
          const monsnum = (targettext.match(new RegExp(targetemoji.join('|'),'g')) || []).length;
          //▼条件
          if(0 < monsnum){
            const maji = (6 <= monsnum);
            const add = monsnum * 4 * (maji ? 6 : 1);
            o.log.add = add;
            o.log.notes = monsnum + '×4' + (maji ? '×6' : '') + ' = ' + add+'p';
            o.log.fxtype.push('after','add');
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "じゅふぶ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "すり足",
        description:
          "自身より2つ以上前に決闘部か魔対科出身の生徒カードがあるとき、そのうちの最も近いカードのすぐ後ろへ移動し、そのカードのLvとレアリティの合計×追い越したカード枚数×自身のLv分を加点する。",
        detail: "",
        possibility:['sortcard','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetinfo = [];
          i.cards.forEach((cc, index) => {
            if (
              index <= i.index - 2 &&
              (cc.club.includes("決闘") ||
                cc.major == "魔対" ||
                cc.notes.includes("魔対から転科"))
            )
              targetinfo.push({ c: cc, index: index });
          });
          if (targetinfo.length > 0) {
            const t = targetinfo[targetinfo.length - 1];
            const targets = i.cards.slice(t.index + 1, i.index);
            const add =
              (t.c.collected + t.c.rarity) * targets.length * i.c.collected;
            o.cards = i.cards;
            o.cards.splice(i.index, 1);
            o.cards.splice(t.index + 1, 0, i.c);
            o.log.description +=
              "\n追越：" + targets.map((t) => tools.emj(t)).join("");
            o.log.add = add;
            o.log.notes =
              t.c.collected +
              t.c.rarity +
              "×" +
              targets.length +
              "×" +
              i.c.collected +
              " = " +
              add +
              "p";
            o.log.fxtype.push("before", "sortcard", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "じゅふぶ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "激昂",
        description:
          "得点加算・乗算を行う効果がマイナス値を出しているとき、該当効果数に応じた確率で季節を冬に設定しランダムで±100p加算。Lvが高いほど発動確率低下・プラス確率上昇。確率加算の影響は受けない。",
        detail:
          "発動確率は(80-Lv×10)×(マイナスの得点加算・乗算の効果の数)。プラスになる確率はLv×15。",
        possibility:['prob','random','addplus','addminus','changeseason']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const minusfxnum = i.prefields.filter(
            (pf) =>
              pf.type == "effect" &&
              pf.fxtype &&
              ((pf.fxtype.includes("add") && pf.add < 0) ||
                (pf.fxtype.includes("mul") && pf.mul < 0))
          ).length;
          const cons = [
            Math.floor(Math.random() * 100) <
              (80 - i.c.collected * 10) * minusfxnum,
          ];
          if (cons.every((con) => con)) {
            const add =
              Math.floor(Math.random() * 100) < i.c.collected * 15 ? 100 : -100;
            o.season = "winter";
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "prob", "random", "add", "changeseason");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'じゅふぶ聖', phase:['後'], f:(i)=>
    {const details = ['〔18～1時〕雪を降らせ、ホワイトクリスマスを演出する。全カードから作れる男女の組数×20p、プラス縁の数×10pを加算。',
                      '〔1～18時〕最後までごねて士気を下げる。(Xmas)とつくカードの枚数×50p減算。'];
     const outline = {title:           'なんで俺が',
                      description:     '季節が冬であるとき、時間帯に応じた加減点を行う。',
                      detail:          details.join('\n')+'\n12月は加減算する値が1.5倍になる。',
                      eventdescription:'《イベント》➿モールを1個追加獲得する。',
                      possibility:['addplus','addminus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               if(i.season=='winter'){
                 const Hour = i.date.getHours();
                 let add=0; let notes = '';
                 if(18<=Hour||Hour<1){
                   o.log.description += '\n' + details[0];
                   const male    = [...i.cards,...i.Tcards].filter(cc=>cc.sex=='男');
                   const female  = [...i.cards,...i.Tcards].filter(cc=>cc.sex=='女');
                   const pairs   = Math.min(male.length, female.length);
                   const plusrel = i.relationlog.filter(rl=>rl.plus).length;
                   add = pairs*20 + plusrel*10;
                   notes = (pairs          ? '組'+pairs  +'×20' : '')
                         + (pairs&&plusrel ? ' + ' : '')
                         + (plusrel        ? '縁'+plusrel+'×10' : '');
                 }
                 else{
                   o.log.description += '\n' + details[1];
                   const xmas = [...i.cards,...i.Tcards].filter(cc => cc.eventid && cc.eventid=='XMAS').length;
                   add = xmas*(-50);
                   notes = xmas + '×(-50)';
                 }
                 if(add!==0){
                   const Dec = (i.date.getMonth()+1 == 12);
                   if(Dec){ 
                     add *= 1.5;
                     o.log.description += '\n12月は加減算する値が1.5倍になる。'
                   };
                   o.log.add = add;
                   o.log.notes = (Dec ? '('+notes+')×1.5' : notes) + ' = ' + add +'p';
                   o.log.fxtype.push('after','add');
                  //▼イベントアイテム
                    if(i.event&&i.event.id==i.c.eventid){
                      const iindex=1; o.log.eventitems.index=iindex;
                      const iadd=1; o.log.eventitems.add=iadd;
                      o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji:'');
                      o.log.fxtype.push('event');
                    };
                   return o;
                 }

               };
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "しゅりあ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "私だって男子みたいに",
        description: "自身以外の生徒カードが全員男子の場合、男子として扱う。",
        detail: "プロフィールとして「男」を持っているカードに限る。",
        possibility:['editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.cards.filter((cc) => cc.id !== i.c.id && cc.sex == "男").length ==
              i.cards.length - 1,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            newcard.sex = "男";
            o.cards[i.index] = newcard;
            o.log.fxtype.push("before", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'しゅりあ', phase:['前'], f:(i)=>
    {const outline = {title:           '私にお任せ！',
                      description:     '自身より前にまだ効果を発動させていない生徒カードがあるとき、該当カードを先頭から順に末尾へ移動させ全カードの確率加算の値(%)を50加算、自身の通常計算の得点を5p減少。',
                      detail:          '',
                      possibility:['sortcard','editcard','changecount']};
     if(i){
       try{
         const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
         const fxs = i.prefields.filter(pf=>pf.type=='effect');
         const fxownerids = (fxs.length) ? fxs.map(fx=>fx.fxowner.id) : [];
         const targets = i.cards.filter((cc,index)=>index<i.index&&!fxownerids.includes(cc.id));
         if(targets.length){
           const targetids = targets.map(cc=>cc.id);
           const targetindexesBefore = targetids.map(id=>i.cards.findIndex(cc=>cc.id==id)+1);
           o.cards=i.cards.filter(cc=>!targetids.includes(cc.id));
           o.cards.push(...targets);
           const targetindexesAfter = targetids.map(id=>o.cards.findIndex(cc=>cc.id==id)+1);
           o.count-=targets.length;
           o.log.description+='\n移動：'+targets.map(cc=>tools.emj(cc)).join('')+targetindexesBefore.join(', ')+'枚目 → '+targetindexesAfter.join(', ')+'枚目';
           o.cards.forEach((cc,index)=>{
             const newcard=JSON.parse(JSON.stringify(cc));
             newcard.probadd+=50;
             if(cc.id==i.c.id) newcard.basicadd-=5;
             o.cards[index]=newcard;
           });
           o.log.fxtype.push('before','sortcard','editcard','changecount');
         return o; };
       }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  { id:'じるべり', phase:['後'], f:(i)=>
    { const outline = {title:           'かわいい、ね',
                       description:     '得点乗算(－)・加算(－)の効果を発動させた生徒がいるとき最も近い1人を対象とし、乗算(－)であれば合計点に-1を掛け、加算(－)であれば減算分×2p加算し対象生徒のレアリティを2、隣接していた場合は5減少させる。',
                       detail:          '最も近い生徒が2人いる場合は順番の早いものが優先される。乗算(－)効果は1つまで、加算(－)効果は全てを対象とする。レアリティは0未満にはならない。',
                       possibility:['mulminus', 'addplus', 'editcard']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
		  const targetfxs = i.prefields.filter(pf=>pf.type=='effect'&&pf.fxowner.genre=='stTm'&&(!pf.fxowner.id.includes(i.c.id.slice(0,4)))&&pf.fxtype&&((pf.fxtype.includes('add')&&pf.add<0)||(pf.fxtype.includes('mul')&&pf.mul<0)));
		  const targetids = (0<targetfxs.length) ? [...new Set(targetfxs.map(fx=>fx.fxowner.id).filter(id=>i.cards.some(cc=>cc.id==id)))] : [];
          if(0<targetids.length){
			const targetIdxdiffs = targetids.map(id=>Math.abs(i.index-i.cards.findIndex(cc=>cc.id==id)));
			const minIdxdiff = Math.min(...targetIdxdiffs);
			const target = i.cards.find((cc,index)=>Math.abs(i.index-index)==minIdxdiff);
			const targetidx = i.cards.findIndex(cc=>cc.id==target.id);
			
			const allnotes = [];
			
			const targetfxmul = targetfxs.filter(fx=>fx.fxowner.id==target.id&&fx.fxtype.includes('mul')&&fx.mul<0);
			if(0<targetfxmul.length){
			  allnotes.push(i.totalP+'p × (-1)');
			  o.log.mul = -1;
              o.log.fxtype.push('mul');
			};
			
			const targetfxadd = targetfxs.filter(fx=>fx.fxowner.id==target.id&&fx.fxtype.includes('add')&&fx.add<0);
			if(0<targetfxadd.length){
			  const add = targetfxadd.map(fx=>fx.add).reduce((a,b)=>a+b) * (-2);
			  o.log.add = add;
			  allnotes.push(add+'p');
              o.log.fxtype.push('add');
			};
			
			if(0<allnotes.length){
			  o.cards = i.cards;
			  const newcard = JSON.parse(JSON.stringify(target));
			  newcard.rarity = tools.rarityadd(newcard, (minIdxdiff==1 ? -5 : -2));
			  o.cards[targetidx] = newcard;
			  o.log.notes = allnotes.join(' + ');
			  o.log.description += '\n対象：'+tools.emj(target)+target.rarity+'→'+newcard.rarity;
              o.log.fxtype.push('after','editcard');
			  return o;
			};
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  { id:'すばるす', phase:['前'], f:(i)=>
    { const outline = {title:           '箒星の尾',
                       description:     '天体系絵文字を持つか流星部である生徒カードどうしが隣接しているとき、最も長く連なっている数×自身のレアリティ×7p加算。対象が末尾にかかっていた場合、計算前に条件に合う生徒カードを1枚末尾に追加する。',
                       detail:          '',
                       possibility:['addcard','addplus']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          let bestlist = [];
          let templist = [];
          i.cards.forEach(cc=>{
            if(cc.club.includes('流星')||exports.emjlist['天体'].includes(tools.emj(cc))){
              templist.push(cc);
              if(bestlist.length<=templist.length) bestlist = templist;
            }
            else templist = [];
          });
          if(2<=bestlist.length){
            if(bestlist[bestlist.length-1].id==i.cards[i.cards.length-1].id){
              const choices = i.allcards.filter(chr=>chr.genre=='stTm'&&!i.cards.some(cc=>cc.id.slice(0, 4)==chr.id.slice(0, 4))
                                                    &&(chr.club.includes('流星')||exports.emjlist['天体'].includes(tools.emj(chr))));
              if(choices.length){
                o.cards=i.cards;
                const newcard = choices[Math.floor(Math.random()*choices.length)];
                o.cards.push(exports.getnature(newcard));
                bestlist.push(newcard);
                o.log.description+='\n追加：'+tools.emj(newcard);
                o.log.fxtype.push('addcard');
              };
            };
            const add = bestlist.length*i.c.rarity*7;
            o.log.add = add;
            o.log.notes = bestlist.length + '×' + i.c.rarity + '×7 = ' + add + 'p';
            o.log.description+='\n連続：'+bestlist.map(cc=>tools.emj(cc)).join('');
            o.log.fxtype.push('before','add');
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  { id:'すばるす', phase:['前'], f:(i)=>
    { const outline = {title:           '内緒だぞ……',
                       description:     '魔装科か流星部による所属得点🚪が発生する見込みがないとき、なんらかで一服しにどこかへ消えてしまいレアリティ×15p加算。',
                       detail:          '【箒星の尾】が発動している場合は発動しない。',
                       possibility:['delcard','leaving','addplus']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          if(!i.prefields.some(pf=>pf.type=='effect'&&pf.title=='箒星の尾')){
            const bco = penta.pentabasiccalc({data:data,pata:i.pata,tools:tools,spcards:exports.spcards(data.characters.filter(c=>c.genre=="stTm"||c.genre=="tcTm"||c.genre=="otTm")),
                                              tm:i.tm,test:i.test,cards:i.cards,Tcards:i.Tcards,totalP:0,bonusC:0,emjrepeat:1,resultlist:[]});
            if(!bco.grouplog.some(gr=>gr.name.includes('魔装')||gr.name.includes('流星'))){
              o.Tcards=i.Tcards.filter(cc=>cc.id!==i.c.id);
              o.count--;
              const add=i.c.rarity*15;
              o.log.add=add;
              o.log.notes=i.c.rarity+'×15 = '+add+'p';
              o.log.fxtype.push('before','delcard','leaving','add');
              return o;
            }
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "そうまあ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "これが切り札だ！",
        description:
          "前のほうにいるときメンコを叩きつけ、表が出た場合は自身と同じ所属🚪の生徒カードを1枚ドローしてターンエンド。裏が出た場合は何も起こらない。",
        detail:
          "このカードが前半(中央を除く)に位置していたときに発動する。生徒カードはランダムで決定され、該当するカードを持っていない場合は発動しない。確率加算の影響は受けない。",
        possibility:['prob','random','addcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const choices = i.allcards.filter(
            (chr) =>
              chr.genre == "stTm" &&
              ((chr.grade == i.c.grade && chr.major == i.c.major) ||
                chr.club.includes("軽音楽") ||
                chr.roomid == i.c.roomid) &&
              !i.cards.find((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4))
          );
          const cons = [
            i.index < Math.floor(i.cards.length / 2),
            choices.length > 0,
          ];
          if (cons.every((con) => con)) {
            const menko = Math.random() < 0.5;
            if (menko) {
              o.cards = i.cards;
              const newcard = exports.getnature(
                choices[Math.floor(Math.random() * choices.length)]
              );
              o.cards.push(newcard);
              o.log.description += "\n追加：" + tools.emj(newcard);
              o.log.fxtype.push("addcard");
            }
            o.log.notes = menko ? "表(成功)" : "裏(失敗)";
            o.log.fxtype.push("before", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "そふぃあ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "氷の楔",
        description:
          "決闘部の生徒カードが複数あったとき、そのうち順番の最も早いカードと最も遅いカードに挟まれた生徒カードのLv合計×レアリティ合計を加点する。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const iStart = i.cards.findIndex((cc) => cc.club.includes("決闘"));
          const iEnd =
            i.cards.length -
            1 -
            i.cards
              .slice()
              .reverse()
              .findIndex((cc) => cc.club.includes("決闘"));
          const cons = [Math.abs(iStart - iEnd) > 1];
          if (cons.every((con) => con)) {
            const targets = i.cards.filter(
              (cc, iThis) => iStart < iThis && iThis < iEnd
            );
            const sumlv = targets
              .map((t) => t.collected)
              .reduce((a, b) => a + b);
            const sumrr = targets.map((t) => t.rarity).reduce((a, b) => a + b);
            const add = sumlv * sumrr;
            o.log.add = add;
            o.log.notes = sumlv + " × " + sumrr + " = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'そふぃあ聖', phase:['後'], f:(i)=>
    { const details = [ '〔準備〕隣接した生徒を記憶し、プレゼントの準備を始める。', //7日を超過すると再設定される。
                        '〔プレゼント〕記憶している生徒が出たとき、準備していたプレゼントを渡し(経過日数+1)×25p加算。' ];
      const outline = {title:           'HYVÄÄ JOULUA!',
                       description:     '〔準備〕と〔プレゼント〕の2つのプロセスを持つ。',
                       detail:          details[0]+'\nカードとして所有していないものは対象としない。\n'+details[1]+'\nプレゼント準備状態である間、準備からの経過日数が7を超えないかぎり新たな準備は行われない。\n効果名の読みは「ヒュヴァー・ヨウルア(メリー・クリスマス)」。',
                       eventdescription:'《イベント》ランダムなオーナメントを5個追加獲得する。',
                       possibility:['addplus','keep']};
      if(i){
        try{
          if(1<i.cards.length){
            const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
            const keeps = i.keeps.find(k=>k.includes(outline.title));
            let   keepinfos = (keeps&&keeps.split('/')[1]!=='なし') ? keeps.split('/')[1].split('＠＠') : ['なし'];
            let active = false;
            let reset = false;
            const todaytext = tools.getDateText().replace(/\//g, '-');
            const today = new Date(todaytext);
            
            if(keepinfos.length==2){ //プレゼントあり　「あいうえ あいうえ＠＠2022-12-24」
              const oldday = new Date(keepinfos[1]);
              const elapsed = (today - oldday) / 86400000;
              if(7<elapsed) reset = true; //7日を超えていたら再設定
              else{     
                const keepids = keepinfos[0].split(' ');
                const targets = i.cards.filter(cc=>keepids.includes(cc.id.slice(0,4)));
                if(targets.length){ //対象カードがそこにある
                  const add = (elapsed+1)*25;
                  o.log.add = add;
                  o.log.notes = '('+elapsed+'+1)×25 = '+add;
                  o.log.fxtype.push('add');
                  o.log.description+='\n'+details[1]+'\n対象：'+targets.map(cc=>tools.emj(cc)).join('')+' '+elapsed+'日経過';
                  active = true;
                  keepinfos = ['なし'];
                };
              };
            };
            if(reset||keepinfos.length==1){ //プレゼントなし、もしくは再設定
              const targets = i.cards.filter((cc,index)=>Math.abs(index-i.index)==1&&i.characters.some(chr=>chr.id==cc.id.slice(0,4)));
              if(reset) o.log.notes = '再設定';
              o.log.description+='\n'+details[0]+'\n対象：'+targets.map(cc=>tools.emj(cc)).join('')+'　✍️記憶';
              active = true;
              keepinfos = [targets.map(cc=>cc.id.slice(0,4)).join(' '), todaytext];
            };
            
            if(active){
              o.keeptext=keepinfos.join('＠＠');
              o.log.fxtype.push('after','keep');
              //▼イベントアイテム
              if(i.event&&i.event.id==i.c.eventid){const iindex=Math.floor(Math.random()*5); o.log.eventitems.index=iindex;
                                                   const iadd=5; o.log.eventitems.add=iadd;
                                                   o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji + ' ×' + iadd:'');
                                                   o.log.fxtype.push('event');};
              return o;
            }
            else return;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "だいりお",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ここが突き当たり",
        description:
          "末尾に近いほど高い確率で後続のカードを突き放す。発動した場合、教師カードはドローされない。",
        detail: "確率は自身より前の生徒カード枚数×8+1%(1・9・17・25...)。",
        possibility:['prob','delcard','noteacher']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            !i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == "あの時をもう一度"
            ),
            i.index < i.cards.length - 1,
            Math.floor(Math.random() * 100) < i.index * 8 + 1 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards.slice(0, i.index + 1);
            o.noteacher = true;
            o.log.fxtype.push("before", "prob", "delcard", "noteacher");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "だいりお",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "カレイドスコープ",
        description:
          "ちょうど中央にいて、全生徒カードのレアリティ合計が7以下、かつここまでの発動効果数が0のとき、全てを覆い隠すほどの巨大なポータルを展開し力場をめちゃくちゃにする。\n" +
          "全生徒カードのLvを0に設定し、全生徒カードのLv減少分合計×自身のLv減少分×2p加算。\n発動した場合、教師カードはドローされない。 ",
        detail: "",
        possibility:['addplus','editcard','noteacher']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.cards.length % 2 !== 0,
            Math.floor(i.cards.length / 2) == i.index,
            i.cards.map((cc) => cc.rarity).reduce((a, b) => a + b) <= 7,
            i.prefields.filter((pf) => pf.type == "effect").length == 0,
          ];
          if (cons.every((con) => con)) {
            const add =
              i.cards.map((cc) => cc.collected).reduce((a, b) => a + b) *
              i.c.collected *
              2;
            o.cards = i.cards.map((cc) => {
              const newcard = JSON.parse(JSON.stringify(cc));
              newcard.collected = 0;
              return newcard;
            });
            o.noteacher = true;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "add", "editcard", "noteacher");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'だいりお正', phase:['前'], f:(i)=>
    { const details = ['〔⭕勝！〕相手のレアリティを全て消費してその消費分×25p加算し、相手の絵文字を✖️へ変更する。',
                       '〔❌敗〕相手のレアリティ×25p減算し、自身の絵文字を✖️へ変更する。'];
      const outline ={title:           '墨を塗ってやる',
                      description:     '自身以外で最もレアリティの高い生徒カード1枚を相手に羽根つき勝負を挑む。',
                      detail:          '敗北する確率は相手のレアリティ×10%。確率加算は勝利する方向に働く。最大のレアリティが0である場合は発動しない。\n'+details.join('\n'),
                      eventdescription:'《イベント》まぎかるたのさいころの出目を1加算(最大6)。',
                      possibility:['addplus','addminus','editcard','random']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const targets = i.cards.filter(cc=>cc.id!==i.c.id&&0<cc.rarity);
          if(targets.length){
            const maxrarity = Math.max(...targets.map(cc=>cc.rarity));
            const target = i.cards.find(cc=>cc.id!==i.c.id&&cc.rarity==maxrarity);
            const win = (Math.random()*100 < (10-target.rarity)*10+i.c.probadd);
            o.cards=i.cards;
            if(win){
              const targetindex = i.cards.findIndex(cc=>cc.id==target.id);
              const newcard=JSON.parse(JSON.stringify(target));
              newcard.rarity=0;
              newcard.emoji='✖️';
              o.cards[targetindex]=newcard;
              const add=target.rarity*25;
              o.log.add=add;
              o.log.notes=target.rarity+'×25 = '+add+'p';
              o.log.description+='\n'+details[0]+'\n対象：'+tools.emj(target)+target.rarity+'→0';
            }
            else{
              const newcard=JSON.parse(JSON.stringify(i.c));
              newcard.emoji='✖️';
              o.cards[i.index]=newcard;
              const add=target.rarity*(-25);
              o.log.add=add;
              o.log.notes=target.rarity+'×(-25) = '+add+'p';
              o.log.description+='\n'+details[1]+'\n対象：'+tools.emj(target);
            };
            o.log.fxtype.push('before','editcard','add','random');
            if(i.event&&i.event.id==i.c.eventid) o.log.description+='\n'+outline.eventdescription;
            return o;
          }else return;
        }catch(error){return {error:true, title:outline.title, message:error.message}};
      }
      else return outline;
    }
  },
  { id:'たかやま', phase:['前'], f:(i)=>
    { const outline = {title:           'お～～～いッ！！',
                       description:     '自身と同じ所属🚪であるか自身からのプラス縁を持つ生徒カードがあってかつ1枚もそれらと隣接していないとき、大声で呼びかける。対象枚数×50p加算するが、真隣で叫ばれた生徒カードは効果無効🚫になる。',
                       detail:          '',
                       possibility:['addplus','editcard']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          //const targets = i.cards.filter((cc,index)=>1<Math.abs(index-i.index)&&(tools.checkdoor(i.c, cc)||tools.checkrelation(i.c, [cc], i.characters).some(rl=>rl.plus)));
          let targets = [];
          for(let j=0; j<i.cards.length; j++){
            if(j!==i.index){
              if(tools.checkdoor(i.c, i.cards[j])||tools.checkrelation(i.c, [i.cards[j]], i.characters).some(rl=>rl.plus)){
                if(1<Math.abs(j-i.index)) targets.push(i.cards[j]);
                else{
                  targets=[];
                  break;
                };
              };
            };
          };
          if(targets.length>0){
            o.cards=i.cards;
            const results = [];
            o.cards.forEach((cc,index)=>{
              if(Math.abs(index-i.index)==1){
                const newcard=JSON.parse(JSON.stringify(cc));
                newcard.frozen=true;
                o.cards[index]=newcard;
                results.push(tools.emj(newcard));
              };
            });
            const add=targets.length*50;
            o.log.add=add;
            o.log.notes=add+'p';
            o.log.description+='\n対象：'+targets.map(cc=>tools.emj(cc)).join('')+'\n被害：'+results.join('');
            o.log.fxtype.push('before','add','editcard');
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "たかやま",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "オーバーヘッド熱光線",
        description:
          "自身より上(前)に出た生徒カードのLv合計×自身のLv分を加点する。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index > 0];
          if (cons.every((con) => con)) {
            const add =
              i.cards
                .slice(0, i.index)
                .map((cc) => cc.collected)
                .reduce((a, b) => a + b) * i.c.collected;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "たかやま雪",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "オーバーヘッド冷凍光線",
        description: "自身より上(前)に出た青寮の生徒カードの枚数×30p加算。",
        detail: "",
        eventdescription:
          "《イベント》光線に掠められた生徒カードの数×2個の雪玉を追加獲得する。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const bcards = i.cards
            .slice(0, i.index)
            .filter((cc) => cc.dorm == "青寮");
          const cons = [bcards.length > 0];
          if (cons.every((con) => con)) {
            const add = bcards.length * 30;
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 1;
              const iadd = bcards.length * 2;
              o.log.eventitems.index = iindex;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "たつがみ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "龍の舞",
        description:
          "自身の前後方向に自身よりレアリティの高い生徒カードが連続するかぎりそれらを対象に加え、対象のレアリティ合計×10p加算。自身以外に首席がいる場合、計算前に自身のレアリティを1下げる。",
        detail: "レアリティは0未満にはならない。",
        possibility:['addplus','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          let self = i.c;
          if (
            i.cards.some(
              (cc) => cc.id !== i.c.id && cc.position.includes("首席")
            )
          ) {
            self = JSON.parse(JSON.stringify(i.c));
            self.rarity = self.rarity > 0 ? self.rarity - 1 : 0;
            o.cards = i.cards;
            o.cards[i.index] = self;
            o.log.fxtype.push("editcard");
            o.log.description +=
              "\n準備：" + tools.emj(self) + i.c.rarity + "→" + self.rarity;
          }
          const targets = [];
          let checkindexB = i.index - 1;
          let higherB = true;
          while (higherB && checkindexB >= 0)
            if (self.rarity < i.cards[checkindexB].rarity) {
              targets.unshift(i.cards[checkindexB]);
              checkindexB--;
            } else higherB = false;
          let checkindexA = i.index + 1;
          let higherA = true;
          while (higherA && checkindexA < i.cards.length)
            if (self.rarity < i.cards[checkindexA].rarity) {
              targets.push(i.cards[checkindexA]);
              checkindexA++;
            } else higherA = false;

          if (targets.length > 0) {
            const add =
              targets.map((t) => t.rarity).reduce((a, b) => a + b) * 10;
            o.log.description +=
              "\n対象：" + targets.map((t) => tools.emj(t)).join("");
            o.log.add = add;
            o.log.notes =
              "(" +
              targets.map((t) => t.rarity).join("+") +
              ")×10 = " +
              add +
              "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "たつがみ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "筆が乗るなぁ！",
        description:
          "自身を含まない縁があるとき、エピソード📖『2人の花園』を1つ生成する。",
        detail:
          "対象となる縁はランダム。自身からのマイナス縁があるカードは対象から除外される。",
        possibility:['episodeadd']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const minusids = i.c.relation
            .split(" - ")[1]
            .split("/")
            .map(
              (r) =>
                i.characters.find((ccc) =>
                  ccc.nickname.split(/\/|\s-\s/).includes(r)
                ).id
            );
          const targetrelations = i.relationlog.filter(
            (rl) =>
              !rl.ids.includes(i.c.id) &&
              rl.ids.every((id) => minusids.every((mi) => !id.includes(mi)))
          );
          const cons = [targetrelations.length > 0];
          if (cons.every((con) => con)) {
            const targetrelation =
              targetrelations[
                Math.floor(Math.random() * targetrelations.length)
              ];
            const ep = {
              f: (j) => {
                const member = targetrelation.ids.map((id) => id.slice(0, 4));
                const outline = {
                  title: "2人の花園",
                  type: "型",
                  member: member,
                  score: 30,
                };
                try {
                  const cons = [
                    member.every((c) =>
                      j.cards.some((cc) => cc.id.slice(0, 4) == c)
                    ),
                  ];
                  if (cons.every((con) => con)) {
                    const o = JSON.parse(JSON.stringify(epoutput));
                    o.log.title = outline.title;
                    o.log.notes = "著：🐉";
                    o.log.description =
                      outline.type +
                      "：" +
                      outline.member
                        .map((id) =>
                          tools.emj(j.cards.find((cc) => cc.id.includes(id)))
                        )
                        .join("") +
                      " " +
                      outline.score +
                      "p";
                    o.log.add = outline.score;
                    o.log.eptype.push("pattern");
                    return o;
                  } else return;
                } catch (error) {
                  return {
                    error: true,
                    title: outline.title,
                    message: error.message,
                  };
                }
              },
            };
            o.episodeadd.push(ep);
            o.log.fxtype.push("after", "episodeadd");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "たつがみ甘",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "コンテスト、開催です！",
        description:
          "自身以外に(チョコ)とつく生徒カードが2枚以上あるとき、その枚数×50p加算。",
        detail: "",
        eventdescription: "《イベント》チョコの最終獲得数を倍にする。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetcardsnum = i.cards.filter(
            (cc) => cc.eventid && cc.eventid == "CHOCO"
          ).length;
          const cons = [targetcardsnum >= 3];
          if (cons.every((con) => con)) {
            const add = (targetcardsnum - 1) * 50;
            if (i.event && i.event.id == i.c.eventid) {
              o.log.eventitems.index = 0;
              o.log.eventitems.mul = 2;
              o.log.description += "\n" + outline.eventdescription;
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "たまえろ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "あの時をもう一度",
        description:
          "(Lv-4)×10%の確率で、アルト・大理がいない場合は後続に揃え(上書)、それぞれに立場情報の削除・効果無効🚫・レアリティ3への設定・互いへのプラス縁の設定を行い、100p加算する。",
        detail: "アルト・大理を所持していない場合は発動しない。",
        possibility:['prob','addplus','editcard','changecard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.allcards.some((ac) => ac.id.match(/^だいりお/)),
            i.allcards.some((ac) => ac.id.match(/^あるとあ/)),
            Math.floor(Math.random() * 100) <
              (i.c.collected - 4) * 10 + i.c.probadd,
            i.index <
              i.cards.length -
                (2 -
                  i.cards.filter((cc) => cc.id.match(/^だいりお|^あるとあ/))
                    .length) -
                i.cards
                  .slice(i.index + 1)
                  .filter((cc) => cc.id.match(/^だいりお|^あるとあ/)).length,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            let numcount = 1;
            if (
              !o.cards.slice(0, i.index).some((cc) => cc.id.match(/^だいりお/))
            ) {
              o.cards[i.index + numcount] = exports.getnature(
                i.allcards.find((ac) => ac.id.match(/^だいりお/))
              );
              numcount++;
            }
            if (
              !o.cards.slice(0, i.index).some((cc) => cc.id.match(/^あるとあ/))
            ) {
              o.cards[i.index + numcount] = exports.getnature(
                i.allcards.find((ac) => ac.id.match(/^あるとあ/))
              );
              numcount++;
            }
            if (numcount > 1) o.log.fxtype.push("changecard");
            o.cards = o.cards.map((cc) => {
              if (cc.id.match(/^だいりお|^あるとあ/)) {
                const newcard = JSON.parse(JSON.stringify(cc));
                newcard.position = "";
                newcard.frozen = true;
                newcard.rarity = 3;
                if (!newcard.relation.includes("たまえ"))
                  newcard.relation = "たまえ/" + newcard.relation;
                if (
                  !newcard.relation.includes("あると") &&
                  cc.id.match(/^だいりお/)
                )
                  newcard.relation = "あると/" + newcard.relation;
                if (
                  !newcard.relation.includes("だいり") &&
                  cc.id.match(/^あるとあ/)
                )
                  newcard.relation = "だいり/" + newcard.relation;
                return newcard;
              } else return cc;
            });
            const add = 100;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "prob", "editcard", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "たまえろ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "いや全然関係ねえ～！！ ですわ！！",
        description:
          "ここまでで自身以外による加点がないとき、100点のツッコミを入れる。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          console.log(
            i.prefields
              .map((pf) => pf.type + "★" + pf.fxtype + "★" + pf.add)
              .join("\n") + "だああああああああああああああああああああああ"
          );
          const afterhr = i.resultlist.slice(
            i.resultlist.findIndex((r) => r.includes("得点計算")) + 1
          );
          const cons = [
            afterhr.length == 2,
            afterhr.every((r) => r.match(/委員長：🥴+\d+p/)),
            !i.prefields.some(
              (pf) =>
                pf.type == "effect" &&
                pf.fxtype &&
                pf.fxtype.includes("add") &&
                pf.add > 0
            ),
          ];
          if (cons.every((con) => con)) {
            const add = 100;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "たまえろ踊",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "お受けいたしますわ！",
        description: "0%の確率で150p加算。",
        detail: "",
        eventdescription: "《イベント》ダンスpを5個追加獲得する。",
        possibility:['prob','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [Math.floor(Math.random() * 100) < 0 + i.c.probadd];
          if (cons.every((con) => con)) {
            const add = 150;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "prob", "add");
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = 5;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'ちこりー', phase:['後'], f:(i)=>
    {const outline = {title:           'いい風吹いてる！',
                      description:     '風系絵文字を持つ生徒カードと隣接したとき、その枚数×50p加算。',
                      detail:          '',
                      possibility:['addplus']};
     if(i){
       try{
         const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
         const targets = i.cards.filter((cc,index)=>Math.abs(index-i.index)==1&&cc.emoji&&exports.emjlist['風'].includes(tools.emj(cc)));
         if(targets.length){
           const add=targets.length*50;
           o.log.add=add;
           o.log.notes=targets.length+'×50 = '+add+'p';
           o.log.fxtype.push('after','add');
           o.log.description+='\n対象：'+targets.map(cc=>tools.emj(cc));
         return o; };
       }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "ちこりー事",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "曖昧な証言",
        description:
          "当時の記憶を頼りに10～50p加算するが、やっぱり違った気がするので÷1～5する。さらに30%の確率でやっぱりこうかなって思ったので×1～3する。",
        detail:
          "それぞれ数値はランダムで決定され、確率加算の影響を受けない。小数点以下切捨。",
        eventdescription:
          "《イベント》この効果による得点から20pごとに1個ずつ証拠品を追加獲得する。",
        possibility:['addplus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [true];
          if (cons.every((con) => con)) {
            const add1 = Math.floor(Math.random() * 5 + 1) * 10;
            const add2 = Math.floor(Math.random() * 5 + 1);
            const add3 =
              Math.floor(Math.random() * 100) < 30
                ? Math.floor(Math.random() * 3 + 1)
                : null;
            const add = Math.floor((add1 / add2) * (add3 ? add3 : 1));
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(add / 20);
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
            }
            o.log.add = add;
            o.log.notes =
              add1 + "÷" + add2 + (add3 ? "×" + add3 : "") + " → " + add + "p";
            o.log.fxtype.push("after", "add", "random", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ちゃーり",
    phase: ["前", "後"],
    f: (i) => {
      const outline = {
        title: "スキップポータル",
        description:
          "前効果・後効果それぞれで20%の確率で後続の生徒カードの効果判定を全てスキップし、スキップした人数×40p加算。",
        detail: "",
        possibility:['prob','addplus','changecount']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.index < i.cards.length - 1,
            Math.floor(Math.random() * 100) < 20 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            const add = i.cards.slice(i.index + 1).length * 40;
            o.count = 100;
            const phase = i.phase == "before" ? "前：" : "後：";
            i.phase == "before"
              ? o.log.fxtype.push("before")
              : o.log.fxtype.push("after");
            o.log.add = add;
            o.log.notes = phase + add + "p";
            o.log.fxtype.push("prob", "add", "changecount");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ちゃーり",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "マシニングポータル",
        description:
          "ここまでのリザルト表示・効果説明に含まれる金属・機械系絵文字の数が5以上であるとき、その数×間法科出身の生徒カード・間法科教師カードのレアリティ合計分を加点する。",
        detail:
          "元間法科のカードを含む。【スキップポータル】(後)が発動している場合は発動しない。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =
            i.resultlist.join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("");
          const targetemoji = exports.emjlist["金属・機械"];
          const metalsnum = (
            targettext.match(new RegExp(targetemoji.join("|"), "g")) || []
          ).length;
          const cons = [
            metalsnum >= 5,
            !i.prefields.some(
              (pf) =>
                pf.title == "スキップポータル" &&
                pf.fxtype &&
                pf.fxtype.includes("after")
            ),
          ];
          if (cons.every((con) => con)) {
            const portals = [...i.cards, ...i.Tcards].filter(
              (cc) => cc.major == "間法" || cc.notes.includes("間法から転科")
            );
            const rarities = portals
              .map((cc) => cc.rarity)
              .reduce((a, b) => a + b);
            const add = metalsnum * rarities;
            if (portals.length > 1)
              o.log.description +=
                "\n間法科(出身)：" +
                portals.map((cc) => tools.emj(cc)).join("");
            o.log.add = add;
            o.log.notes = metalsnum + "×" + rarities + " = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'ちゃーり問', phase:['前'], f:(i)=>
    {const outline = {title:           'クイズシミュレーター',
                      description:     '全生徒カードに対してクイズ出題を試みる。それぞれレアリティ×20%の確率で正解しレアリティ1上昇、不正解であれば1低下。',
                      detail:          'レアリティは0未満にはならない。',
                      eventdescription:'《イベント》正解数2ごとに解答pを追加獲得する。',
                      possibility:['random','editcard']};
     if(i){try{ const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
                o.cards=i.cards;
                const results = []; let correctnum = 0;
                o.cards.forEach((cc,index)=>{
                  const correct = (Math.random()*100 < cc.rarity*20);
                  const newcard = JSON.parse(JSON.stringify(cc));
                  newcard.rarity = tools.rarityadd(newcard, (correct ? 1 : -1));
                  o.cards[index] = newcard;
                  if(correct) correctnum++;
                  results.push(tools.emj(cc)+(correct?'⭕':'❌')+cc.rarity+'→'+newcard.rarity);
                });
                o.log.description+='\n結果：'+results.join(' ');
                o.log.fxtype.push('before','random','editcard');
                //▼イベントアイテム
                if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                     const iadd=Math.floor(correctnum/2); o.log.eventitems.add=iadd;
                                                     o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                     o.log.fxtype.push('event');};
                return o;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'ちょうこ海', phase:['後'], f:(i)=>
    {const normal = '〔通常〕30%の確率で全カードのLvとレアリティの合計pの焼きそばを振る舞う。';
     const mala = '〔🟧麻辣〕50%の確率で、夏であれば必ず発動し、全カードのレアリティからランダムに選ばれた辛さの焼きそばを振る舞う。(120÷辛さ)%の確率で完食に成功し、レアリティ上昇・代謝促進・脂肪燃焼・食欲増進・得点加算(辛さ×30p)等の効果が現れ、万病に効く。';
     const outline = {title:           '刺激的なあなたのそば',
                      description:     '条件に応じて内容が変化する。効果説明のいずれも自身を対象としない。',
                      detail:          '季節が夏である、Lvまたはレアリティが元より上げられたカードがある、炎・熱系絵文字を持つカードがある、のいずれか2つに該当するとき〔🟧麻辣〕モードに変化する。\n'+normal+'\n'+mala+'レアリティが0である場合は1として計算する。レアリティを持つカードが自身しかない場合は発動しない。小数点以下切捨。',
                      eventdescription:'《イベント》この効果による得点から30pごとにシーグラスを追加獲得する。',
                      possibility:['prob','addplus','random','editcard']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cards = [...i.cards, ...i.Tcards].filter(cc=>cc.id!==i.c.id); if(cards.filter(cc=>cc.rarity).length<1){return;};
               const targets = cards.filter(cc=>cc.rarity>i.characters.concat(exports.additional).find(ccc=>ccc.id==cc.id).rarity);
               const fires = cards.filter(cc=>cc.emoji&&exports.emjlist["炎・熱"].includes(cc.emoji));
               const mode = (targets.length>0||fires.length>0) ? 'mala' : 'normal' ;
               const cons = [(mode=='mala'&&(i.season=='summer'||Math.floor(Math.random()*100)<50+i.c.probadd)||mode=='normal'&&Math.floor(Math.random()*100)<30+i.c.probadd)];
               if(cons.every(con=>con)){let add=0;
                                        if(mode=='normal'){
                                          o.log.description+='\n'+normal;
                                          add=cards.map(cc=>cc.collected+cc.rarity).reduce((a,b)=>a+b);
                                          o.log.add=add; o.log.notes=add+'p'; o.log.fxtype.push('add');
                                        }
                                        else if(mode=='mala'){
                                          o.log.description+='\n'+mala;
                                          let hot = cards.filter(cc=>cc.rarity).map(cc=>cc.rarity)[Math.floor(Math.random()*cards.length)]; if(hot==0||!hot) hot=1;
                                          const percent = Math.floor(140/hot);
                                          o.log.notes=hot+'辛';
                                          if(Math.floor(Math.random()*100)<percent+i.c.probadd){add=hot*30; o.log.add=add; o.log.notes+='完食 '+hot+'×30 = '+add+'p';
                                                                                                const raritylist = [];
                                                                                                o.cards=i.cards.map(cc=>{if(cc.id!==i.c.id){
                                                                                                                           const newcard=JSON.parse(JSON.stringify(cc));
                                                                                                                           newcard.rarity=cc.rarity+1;
                                                                                                                           raritylist.push(tools.emj(cc) + cc.rarity + '→' + newcard.rarity);
                                                                                                                           return newcard;
                                                                                                                         }else return cc;
                                                                                                                        });
                                                                                                const comments=['いっぱい汗かいて、いっぱい健康ね！',
                                                                                                                '麻辣の道は見えた？',
                                                                                                                'おいしく食べた、これ至上よ',
                                                                                                                'よく食べて、よく生きましょ！',
                                                                                                                'ここからここまで、気血の巡り、わかるね？'];
                                                                                                o.log.description+='\n完食 「'+comments[Math.floor(Math.random()*comments.length)]+'」\n対象：'+raritylist.join(' ');
                                                                                                o.log.fxtype.push('add', 'editcard'); }
                                          else{o.log.notes+='失敗';
                                               const comments=['多かった？ わたしが食べて安心！',
                                                               '思い通りじゃない、これも人生ね',
                                                               '自分を理解する一歩にしましょ',
                                                               '失敗は行動あったところにあるね'];
                                               o.log.description+='\n失敗 「'+comments[Math.floor(Math.random()*comments.length)]+'」';
                                               o.log.fxtype.push('nothing');};
                                          o.log.fxtype.push('random');
                                        }
                                        o.log.fxtype.push('after', 'prob');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=Math.floor(add / 30); o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'つちみか', phase:['前'], f:(i)=>
    {const outline = {title:           'いづなのささやき',
                      description:     '30%の確率でマイナス縁を向けられた生徒カードを場から遠ざける。ここまでに該当カードによる得点加算の効果があった場合は詳細を囁き同じだけの加算を行う。',
                      detail:          '',
                      possibility:['prob','delcard','addplus','addminus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const relationlog = [];
               i.cards.forEach(cc=>{
                 const rls = tools.checkrelation(cc, [...i.cards,...i.Tcards], i.characters);
                 if(rls.length) relationlog.push(...rls);
               });
               const targets = i.cards.filter(cc=>relationlog.some(rl=>rl.ids[1]==cc.id&&rl.minus));
               const cons = [(targets.length>0),
                             (Math.floor(Math.random()*100)<30+i.c.probadd)];
               if(cons.every(con=>con)){console.log('OK');
                                        const targetids=targets.map(t=>t.id);
                                        o.cards=i.cards.filter(cc=>!targetids.includes(cc.id));
                                        o.count-=targetids.filter(id=>i.cards.findIndex(cc=>cc.id==id)<i.index).length;
                                        o.log.fxtype.push('before','delcard','prob');
                                        o.log.description+='\n削除：'+targets.map(t=>tools.emj(t)).join('');
                                        
                                        const targetfxs=i.prefields.filter(pf=>pf.type=='effect'&&targetids.includes(pf.fxowner.id)&&pf.fxtype.includes('add'));
                                        if(targetfxs.length>0){const add=targetfxs.map(pf=>pf.add).reduce((a,b)=>a+b);
                                                               o.log.add=add; o.log.notes=add+'p'; o.log.fxtype.push('add');
                                                               o.log.description+='\n囁き：'+targetfxs.map(pf=>tools.emj(pf.fxowner)
                                                                                                              +(targetfxs.length>0?'('+pf.add+'p)':pf.title)).join(' ');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'つちみか', phase:['後'], f:(i)=>
    {const outline = {title:           'サックス・ソロ',
                      description:     'ここまでの発動効果数が0であるとき、(5-全カードレアリティ平均)×自身のLv×5p加算。',
                      detail:          '小数点以下切捨。加算値はマイナスになりうる。',
                      possibility:['addplus','addminus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               //▼条件
               const cons = [(!i.prefields.some(pf=>pf.type=='effect'))];
               if(cons.every(con=>con)){const cards = [...i.cards, ...i.Tcards];
                                        const rarityaverage = cards.map(cc=>cc.rarity).reduce((a,b)=>a+b) / cards.length;
                                        const add = Math.floor((5-rarityaverage)*i.c.collected*5);
                                        o.log.add=add;
                                        o.log.notes='(5-'+(Number.isInteger(rarityaverage)?rarityaverage:'約'+Math.floor(rarityaverage*10)/10)+')×'+i.c.collected+'×5 → '+add+'p';
                                        //▼タイプ
                                        o.log.fxtype.push('after','add');
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'つちみか事', phase:['前'], f:(i)=>
    {const outline = {title:           'こんな部屋いられない',
                      description:     'マイナス値を出している得点加算の効果がある、あるいは現在のカードで通常計算を行った場合の得点見込みが50p以下であるとき50%の確率で部屋を出ていく。さらに50%の確率で事が悪く運び100p減算。',
                      detail:          '減算については確率加算の影響を受けない。',
                      eventdescription:'《イベント》証拠品を2つ追加獲得する。',
                      possibility:['prob','addminus','random','delcard','leaving']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const fieldsminus=i.prefields.length>0&&i.prefields.some(pf=>pf.type=="effect"&&pf.fxtype&&pf.fxtype.includes("add")&&pf.add<0);
               const bco = penta.pentabasiccalc({data:data,pata:i.pata,tools:tools,
                                                 spcards:exports.spcards(data.characters.filter(c=>c.genre=="stTm"||c.genre=="tcTm"||c.genre=="otTm")),
                                                 tm:i.tm,test:i.test,cards:i.cards,Tcards:i.Tcards,
                                                 totalP:0,bonusC:0,emjrepeat:1,resultlist:[]});
               const cons = [(fieldsminus||bco.totalP<=50),
                             (Math.floor(Math.random()*100)<50+i.c.probadd)];
               if(cons.every(con=>con)){o.cards=i.cards.filter(cc=>cc.id!==i.c.id); o.count--;
                                        o.log.notes='(見込'+bco.totalP+'p) ';
                                        o.log.fxtype.push("before","delcard","leaving","prob","random");
                                        if(Math.floor(Math.random()*100)<50){
                                          const add=-100; o.log.add=add; o.log.notes+=add+'p'; o.log.fxtype.push('add');
                                        }
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=2; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'つちみか事', phase:['後'], f:(i)=>
    {const outline = {title:           '足取りの証明',
                      description:     'ここまでのリザルト表示・効果説明に含まれる自身の絵文字の数が2以上であるとき、アリバイを証明しその数×Lv×3p加算。ただし、絵文字が書き換えられている場合は疑われ減算。',
                      detail:          '',
                      eventdescription:'《イベント》自身の絵文字の数2個につき1個証拠品を追加獲得する。',
                      possibility:['addplus','addminus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const targettext = i.resultlist.join('') + i.prefields.map(pf => pf.name + (pf.description ? pf.description : pf.value)).join('');
               const targetemoji = tools.emj(i.c);
               const emjnum = (targetemoji!=='　') ? (targettext.match(new RegExp(targetemoji, "g")) || []).length : 0;
               //▼条件
               const cons = [(emjnum>=2)];
               if(cons.every(con=>con)){const sus = (targetemoji !== tools.emj(i.characters.find(cc=>cc.id=='つちみか')));
                                        const add=emjnum*i.c.collected*3*(sus?-1:1);
                                        o.log.add=add; o.log.notes=emjnum+'×'+i.c.collected+'×3'+(sus?'×(-1)':'')+' = '+add+'p';
                                        o.log.fxtype.push('after','add');
                                        //▼イベントアイテム
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=Math.floor(emjnum/2); o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'つのだか', phase:['後'], f:(i)=>
    {const fin = '〔完成〕前回着想を得た作品が出来上がり、記憶された枚数×50p加算。';
     const idea = '〔着想〕自身以外に美術部の生徒カードがあるとき、楽しくお話をしてインスピレーションを受け作品のアイディアを思い付く。対象枚数を記憶する。';
     const outline = {title:           'それ、いいかも',
                      description:     '〔着想〕と〔完成〕の2つのプロセスを持つ。',
                      detail:          idea+'\n'+fin,
                      possibility:['addplus','keep']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const keeps = i.keeps.find(k=>k.includes(outline.title));
               let   keepids = (keeps&&keeps.split('/')[1]!=='なし') ? keeps.split('/')[1].split('＠＠') : [];
               let active = false;
               //完成
               if(keepids.length>0){
                 active = true;
                 const keepcards = keepids.map(id=>i.characters.concat(exports.additional).find(ccc=>ccc.id==id));
                 const add = keepids.length*50;
                 o.log.add=add; o.log.notes=keepids.length+'×50 = '+add+'p'; o.log.fxtype.push('add');
                 o.log.description+='\n'+fin+'\n着想元：'+keepcards.map(cc=>tools.emj(cc)).join('');
                 keepids = [];
               };
               //着想
               const targets = i.cards.filter(cc=>cc.id!==i.c.id&&cc.club.includes('美術'));
               if(targets.length>0){
                 active = true;
                 keepids = targets.map(cc=>cc.id.slice(0,4));
                 o.log.description+='\n'+idea+'\n対象：'+targets.map(cc=>tools.emj(cc)).join('');
               };
               //共通
               if(active){
                 o.keeptext=(keepids.length>0)?keepids.join('＠＠'):'なし';
                 o.log.fxtype.push('after','keep');
                 return o;
               }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id: "つのだか", phase: ["後"], f:(i)=>
    {const outline = {title: "あ…ごめん。",
                      description: "隣接した生徒カードの身長が自身より高いとき、角が刺さる。刺さった人数×15p減算。",
                      detail: "",
                      possibility:['addminus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const targets = i.cards.filter((cc, index)=>Math.abs(index-i.index)==1&&cc.cm&&Number(cc.cm)>Number(i.c.cm));
               const cons = [targets.length > 0];
               if(cons.every(con=>con)){const add = targets.length*(-15);
                                        o.log.description+="\n対象："+targets.map(t=>tools.emj(t)+"(+"+(t.cm-i.c.cm)+"cm)").join(" ");
                                        o.log.add=add; o.log.notes=add+"p"; o.log.fxtype.push("after", "add");
                                        return o;
                                       }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'つのだか祭', phase:['前'], f:(i)=>
    {const horns = [{cm:10, name:'牛'},
                    {cm:20, name:'羊'},
                    {cm:30, name:'ヤギ'},
                    {cm:40, name:'鹿'},
                    {cm:50, name:'インパラ'}];
     const outline = {title:           'これ、似合うと思う。',
                      description:     '隣接する生徒カードにランダムな付け角をつけ、身長の値を増やしたうえで(対象の身長-自身の身長)p加算。',
                      detail:          '加算する値は0以下になりうる。対象が身長情報を持たない場合は発動しない。\n'+horns.map(h=>'〔'+h.name+'〕 +'+h.cm+'cm').join('\n'),
                      eventdescription:'《イベント》加算値が20以上になった枚数分エンジョイpを追加獲得する。',
                      possibility:['addplus','addminus','random','editcard']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [(i.cards.length>=2),
                             ((i.cards[i.index-1]&&i.cards[i.index-1].cm)||(i.cards[i.index+1]&&i.cards[i.index+1].cm))];
               if(cons.every(con=>con)){let add=0; const cs=[]; let iadd=0;
                                        o.cards=i.cards;
                                        o.cards.forEach((cc,index)=>{
                                          if(Math.abs(index-i.index)==1 && cc.cm){
                                            const newcard=JSON.parse(JSON.stringify(cc));
                                            const horn=horns[Math.floor(Math.random()*horns.length)];
                                            newcard.cm+=horn.cm;
                                            const oneadd = newcard.cm-i.c.cm; add+=oneadd;
                                            if(oneadd>=20) iadd++;
                                            cs.push(tools.emj(cc)+cc.cm+'+'+horn.cm+'cm('+horn.name+') → '+oneadd+'p');
                                            o.cards[index]=newcard;
                                          };
                                        });
                                        o.log.description+='\n対象：'+cs.join('　');
                                        o.log.add=add; o.log.notes=add+'p'; o.log.fxtype.push('before','editcard','random','add');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "つわぶき",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "自分陰キャなんで……",
        description:
          "端にいると50pの加算、端から最も遠い位置にいると距離に応じた点の減算が行われる。",
        detail:
          "生徒カードが3枚以上出ている必要があり、偶数枚の場合は中央2枚が減点の発動位置となる。減点時は効果名が【自分陰キャなんですけど！？】に変化し、減算される点数は端からの距離が伸びるにつれ50pずつ増加する。",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const add =
            i.index == 0 || i.index == i.cards.length - 1
              ? 50
              : i.index == Math.ceil(i.cards.length * 0.5 - 0.5) ||
                i.index == Math.floor(i.cards.length * 0.5 - 0.5)
              ? (i.cards.length < 5
                  ? 1
                  : Math.floor((i.cards.length + 1) / 2) - 2) * -50
              : 0;
          const cons = [i.cards.length >= 3, add !== 0];
          if (cons.every((con) => con)) {
            if (add < 0) o.log.title = "自分陰キャなんですけど！？";
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "でぃあな",
    phase: ["前"],
    f: (i) => {
      const fullmoon = "〔🌕〕自身以外の全カードのレアリティ合計×20p加算。";
      const newmoon =
        "〔🌑〕隣接する生徒カードのレアリティを半減し(小数点以下切捨)、減少分の合計×20p加算。";
      const othermoon =
        "〔通常〕隣接する生徒カードから順にレアリティを1減らし、減少分の合計×20p加算。満月が近いほど適用範囲が拡大する。";
      const outline = {
        title: "月の鏡",
        description: "月の満ち欠けに応じて内容が変化する。",
        detail:
          fullmoon +
          "\n" +
          newmoon +
          "\n" +
          othermoon +
          "\nレアリティは0未満にはならない。",
        possibility:['addplus','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const m = tools.getMoon(tools.getTodayJp());
          let add;
          o.log.notes = m.emoji + m.moonname;
          if (m.emoji == "🌕") {
            const rarities = i.cards
              .filter((cc) => cc.id !== i.c.id)
              .concat(i.Tcards)
              .map((cc) => cc.rarity)
              .reduce((a, b) => a + b);
            add = rarities * 20;
            o.log.notes += " " + rarities + "×20 = " + add + "p";
            o.log.description += "\n" + fullmoon;
          } else {
            const tofullmoon = Math.abs(m.moonnum - 6);
            const range = tofullmoon > 3 ? 1 : tofullmoon == 3 ? 2 : 3;
            let decrease = 0;
            const raritylist = [];
            o.cards = i.cards;
            i.cards.forEach((cc, index) => {
              if (
                0 < Math.abs(i.index - index) &&
                Math.abs(i.index - index) <= range
              ) {
                const newcard = JSON.parse(JSON.stringify(cc));
                newcard.rarity =
                  m.emoji == "🌑"
                    ? Math.floor(cc.rarity / 2)
                    : cc.rarity > 0
                    ? cc.rarity - 1
                    : 0;
                o.cards[index] = newcard;
                raritylist.push(
                  tools.emj(cc) + cc.rarity + "→" + newcard.rarity
                );
                decrease += cc.rarity - newcard.rarity;
              }
            });
            add = decrease * 20;
            o.log.notes += " " + decrease + "×20 = " + add + "p";
            o.log.description +=
              "\n" +
              (m.emoji == "🌑" ? newmoon : othermoon) +
              "\n対象：" +
              raritylist.join(" ");
            o.log.fxtype.push("editcard");
          }
          o.log.add = add;
          o.log.fxtype.push("before", "add");
          return o;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "でぃあな",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ちしゃさ～ん",
        description: "千紗がいる場合、距離に応じて得点を加減する。",
        detail:
          "隣を距離1とした場合、1から順に100p・50p・0p・-100pの得点の加減が行われる。枚数が増えている場合、距離に応じて100pずつマイナスの候補が増える。",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const chisa = i.cards.findIndex((cc) => cc.id.match(/^ありすが/));
          const cons = [chisa !== -1];
          if (cons.every((con) => con)) {
            const d = Math.abs(i.index - chisa) - 1;
            const dp = [100, 50, 0, -100, -200, -300];
            const add = dp[d];
            const nt = ["💗", "❤️", "……", "……💔", "……💔💔", "……💔💔💔"];
            o.log.title += nt[d];
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'てんごく', phase:['前'], f:(i)=>
    {const outline = {title:           '肝胆相照',
                      description:     'マイナス縁の相手が場にいる生徒カードがあるとき、該当カードがプラス縁を持つ生徒カードを連れてくる。',
                      detail:          '対象となる生徒カードがない場合は発動しない。',
                      possibility:['addcard','random']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const bco = penta.pentabasiccalc({data:data,pata:i.pata,tools:tools,spcards:exports.spcards(data.characters.filter(c=>c.genre=="stTm"||c.genre=="tcTm"||c.genre=="otTm")),
                                                 tm:i.tm,test:i.test,cards:i.cards,Tcards:i.Tcards,totalP:0,bonusC:0,emjrepeat:1,resultlist:[]});
               const targets = i.cards.filter(cc=>bco.relationlog.some(rl=>rl.ids[0]==cc.id&&rl.minus)&&cc.relation.split(' - ')[0].length>0); //マイナス縁の相手がいるカード
               if(targets.length>0){
                 o.cards = i.cards;
                 let added = false;
                 targets.forEach(target=>{
                   const choices = i.allcards.filter(chr=>{ if(chr.genre=='stTm'&&!o.cards.some(cc=>cc.id.slice(0, 4)==chr.id.slice(0, 4))){
                                                              const relationlog = tools.checkrelation(target, [chr], i.characters);
                                                              if(relationlog[0]&&relationlog[0].plus) return true;
                                                            };
                                                          });
                   if(choices.length>0){
                     const newcard = exports.getnature(choices[Math.floor(Math.random()*choices.length)]);
                     o.cards.push(newcard);
                     o.log.description += '\n対象：' + tools.emj(target) + '　追加：' + tools.emj(newcard);
                     added = true;
                   };
                 });
                 if(added){
                   o.log.fxtype.push('before','addcard','random');
                   return o;
                 };
               };
               return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "てんろう",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "朔望",
        description:
          "自身の姿に応じて🌑30p～🌕-30p加算。ただし満月が近いと帰ってしまう可能性がある。",
        detail:
          "🌑30p 🌒🌘15p\n🌔🌖-15p 🌕-30p\nいなくなる確率は🌓0%～🌕90%～🌗0%の間でなだらかに変化する。\n確率加算は🌔🌕🌖の範囲に限っていなくなる方向に働く。",
        possibility:['addplus','addminus','random','delcard','leaving']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          console.log(i.c.nature);
          if (!"🌓🌗".includes(i.c.nature)) {
            const m = tools.getMoon(tools.getTodayJp());
            o.log.notes = m.emoji + m.moonname;
            if (
              "🌔🌕🌖".includes(i.c.nature) &&
              Math.floor(Math.random() * 100) <
                90 - Math.abs(6 - m.moonnum) * 30 + i.c.probadd
            ) {
              o.cards = i.cards.filter((c) => !c.id.match(/てんろう/));
              o.count--;
              o.log.notes += "(帰)";
              o.log.fxtype.push("before", "random", "delcard", "leaving");
            } else {
              const addlist = [
                ["🌑", 30],
                ["🌒🌘", 15],
                ["🌔🌖", -15],
                ["🌕", -30],
              ];
              const add = addlist.find((al) => al[0].includes(i.c.nature))[1];
              o.log.add = add;
              o.log.notes += " " + add + "p";
              o.log.fxtype.push("before", "add");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "どうざん",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "堂山流・御山粧",
        description:
          "50%の確率でランダムなお山の動物🐾に変身する。変身した動物によってレアリティ・身長が変化する。",
        detail:
          "タヌキ：⭐2 + 2　40cm\nイノシシ：⭐2 + 4　100cm\nツキノワグマ：⭐2 + 6　180cm\n以上3種が3:2:1の比率で選ばれる。\n春は確率が70%になり、変身後のレアリティ×10pを加算する。冬はやる気が出ないので変身しない。\n効果名の読みは「おやまめかし」。",
        possibility:['prob','random','editcard','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const springadd = i.season == "spring" ? 20 : 0;
          const cons = [
            Math.floor(Math.random() * 100) < 50 + springadd + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            if (i.season == "winter") {
              o.log.description =
                "50%の確率でランダムなお山の動物🐾に変身する。\nでも、冬はやる気が出ないので、しませんでした。";
              o.log.fxtype.push("nothing");
            } else {
              o.cards = i.cards;
              const dp = [0, 0, 0, 1, 1, 2];
              const aindex = dp[Math.floor(Math.random() * dp.length)];
              const animals = [
                [4, "タヌキ", 40],
                [6, "イノシシ", 100],
                [8, "ツキノワグマ", 180],
              ];
              o.log.description +=
                "\n" + animals[aindex][1] + "：⭐" + animals[aindex][0];
              const newcard = JSON.parse(JSON.stringify(i.c));
              newcard.name = animals[aindex][1] + "(" + i.c.emoji + "舞花)";
              newcard.rarity = animals[aindex][0];
              newcard.emoji = "🐾";
              newcard.cm = animals[aindex][2];
              o.cards[i.index] = newcard;
              o.log.fxtype.push("editcard", "prob", "random");
              if (i.season == "spring") {
                const add = newcard.rarity * 10;
                o.log.description =
                  "春は元気なので70%の確率でランダムなお山の動物🐾に変身する。変身した動物によってレアリティ・身長が変化し、春ボーナスでレアリティ×10pを加算する。";
                o.log.add = add;
                o.log.notes = add + "p";
                o.log.fxtype.push("add");
              }
            }
            o.log.fxtype.push("before");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "どうざん",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "突撃インタビュー！",
        description:
          "得点計算に含まれる1つの教室🚪へ突撃インタビューを敢行する。楽しく話せたときほど得点が高い。",
        detail:
          "ランダムで40～80p加算。該当行に自身と特定項目(学年・科目)が共通している生徒カードがある場合、項目ごとにそれぞれ80pに達するまで追加で10pずつ加算される。",
        possibility:['addplus','random','changeresultlist']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const doorindex = i.resultlist.findIndex((r) => r.includes("🚪"));
          const cons = [doorindex > -1];
          if (cons.every((con) => con)) {
            let add = Math.floor(Math.random() * 5 + 4) * 10;
            const gradeemjlist = i.characters
              .filter((cc) => cc.genre == "stTm" && cc.grade == i.c.grade)
              .map((cc) => cc.emoji)
              .filter((emj) => emj);
            const majoremjlist = i.characters
              .filter((cc) => cc.genre == "stTm" && cc.major == i.c.major)
              .map((cc) => cc.emoji)
              .filter((emj) => emj);
            if (
              add < 80 &&
              gradeemjlist.some((emj) => i.resultlist[doorindex].includes(emj))
            ) {
              add += 10;
            }
            if (
              add < 80 &&
              majoremjlist.some((emj) => i.resultlist[doorindex].includes(emj))
            ) {
              add += 10;
            }
            o.resultlist = i.resultlist;
            o.resultlist[doorindex] =
              o.resultlist[doorindex] + "　" + tools.emj(i.c) + add + "p";
            o.log.add = add;
            o.log.notes = "(" + add + "p)";
            o.log.fxtype.push("after", "random", "add", "changeresultlist");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id:'とおあけ', phase:['前'], f:(i)=>
    { const outline = {title:           'では、これにて',
                       description:     '密かに機織を進め、機織ポイント(xp)を1加算してxp×20p加算。xpが5に達すると布が完成し、次の布に移る。ただし20%の確率で見つかってしまい、xp×20p減算しxpをリセットして飛び去る。',
                       detail:          '確率加算は見つからない方向に働く。',
                       possibility:['addplus','addminus','delcard','leaving','keep','random']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const keeps = i.keeps.find(k => k.includes(outline.title));
          let   xp    = keeps ? Number(keeps.split("/")[1]) : 0;
          if(xp>=5) xp=0;
          xp++;
          if(Math.random()*100<20-i.c.probadd){ //みつかる
            const add=xp*-20;
            o.log.add=add;
            o.log.notes=xp+'×(-20) = '+add+'p 飛去！';
            o.log.description+='\n現在：'+xp+'xp → 0xp';
            xp=0;
            o.cards=i.cards.filter(cc=>cc.id!==i.c.id);
            o.count--;
            o.log.fxtype.push('delcard','leaving');
          }
          else{ //みつからない
            const add=xp*20;
            o.log.add=add;
            o.log.notes=xp+'×20 = '+add+'p'+(xp>=5?' 完成！':'');
            o.log.description+='\n現在：'+xp+'xp'+(xp>=5?' → 0xp':'');
            if(xp>=5) xp=0;
          };
          o.keeptext=xp;
          o.log.fxtype.push('before','keep','random','add');
          return o;
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline;
    }
  },
  {
    id: "とつかち",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "限界執筆",
        description:
          "ドローされるたびに漫画を描き進め、工程に応じた点数を加算または減算する。「構想」時のカードを着想元として記憶し、「脱稿」までに着想元カードが出た枚数×10pを「脱稿」時に加算し自身のレアリティを使い果たす。",
        detail:
          "工程と点数は以下の通り。加算か減算かはランダム。\n0️⃣構想 0p　1️⃣プロット 10p　2️⃣ネーム 20p　3️⃣下書き 30p　4️⃣ペン入れ 40p　5️⃣ベタ塗り 50p　6️⃣トーン貼り 60p　7️⃣仕上げ 70p　8️⃣脱稿 記憶枚数×10p\n着想元カードと同キャラクターであればカウントされる。",
        possibility:['random','addplus','addminus','editcard','keep']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const keeps = i.keeps.find((k) => k.includes(outline.title));
          const keeparray = keeps
            ? keeps.split("/")[1].split("：")
            : [0, "", 0];
          let processnum = Number(keeparray[0]);
          const ids =
            processnum == 0
              ? i.cards.map((cc) => cc.id.slice(0, 4))
              : keeparray[1].split(" ");
          let cardcountnum = Number(keeparray[2]);
          const process = [
            "構想",
            "プロット",
            "ネーム",
            "下書き",
            "ペン入れ",
            "ベタ塗り",
            "トーン貼り",
            "仕上げ",
            "脱稿",
          ];
          let add = 0;
          o.log.description +=
            "\n着想元：" +
            ids
              .map((id) =>
                tools.emj(
                  i.characters
                    .concat(exports.additional)
                    .find((cc) => cc.id == id)
                )
              )
              .join("");
          if (processnum == 0) {
            o.log.description += "　✍️記憶";
          } else {
            cardcountnum += i.cards.filter((cc) =>
              ids.some((id) => cc.id.includes(id))
            ).length;
            o.log.description +=
              (processnum < 8 ? "現在" : "最終") + cardcountnum + "枚";
            if (processnum < 8) {
              add = processnum * (Math.random() < 0.5 ? 10 : -10);
              o.log.fxtype.push("random");
            } else {
              add = cardcountnum * 10;
              cardcountnum = 0;
              o.log.description += ' 脱稿！\n燃尽：' + tools.emj(i.c) + i.c.rarity + '→0';
              o.cards = i.cards;
              const newcard = JSON.parse(JSON.stringify(i.c));
              newcard.rarity = 0;
              o.cards[i.index] = newcard;
              o.log.fxtype.push("editcard");
            }
          }
          o.log.add = add;
          o.log.notes =
            process[processnum] + "(" + processnum + "/8工程) " + add + "p";
          processnum++;
          o.keeptext = [processnum % 9, ids.join(" "), cardcountnum].join("：");
          o.log.fxtype.push("after", "add", "keep");
          return o;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id:'とどろき', phase:['前','後'], f:(i)=>
    { const details = ['〔チャージ〕先頭にいるとき、魔力を溜める。レアリティを1上げ、末尾に移動する。',
                       '〔パンチ〕ここまでの全効果の発動者の、効果発動時点でのレアリティの合計×自身のレアリティ×4p加算。'];
      const outline = {title:           'スチームパンチ',
                       description:     '前効果〔チャージ〕と後効果〔パンチ〕で連続した処理を行う。',
                       detail:          'この効果はプロセスごとにそれぞれ1度しか発動しない。\n'+details[0]+'レアリティは0未満にはならない。\n'+details[1],
                       possibility:['editcard','sortcard','addplus']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title;
          
          if(i.phase=='before' && i.index==0 && !i.prefields.some(pf=>pf.type=='effect'&&pf.title==outline.title)){
            o.cards=i.cards.filter(cc=>cc.id!==i.c.id);
            const newcard = JSON.parse(JSON.stringify(i.c));
            newcard.rarity = tools.rarityadd(newcard, 1);
            o.cards.push(newcard);
            o.log.notes = '前';
            o.log.description = details[0]+'\n対象：'+tools.emj(i.c)+i.c.rarity+'→'+newcard.rarity;
            o.log.fxtype.push('before','editcard','sortcard');
            o.log.special = 'チャージ';
            o.count--;
            return o;
          }
          else if(i.phase=='after' &&  i.prefields.some(pf=>pf.type=='effect'&&pf.title==outline.title&&pf.special=='チャージ')
                                   && !i.prefields.some(pf=>pf.type=='effect'&&pf.title==outline.title&&pf.special=='パンチ') ){
            const targetlist = i.prefields.filter(pf=>pf.type=='effect'&&pf.fxowner.rarity!==null).map(pf=>[tools.emj(pf.fxowner), pf.fxowner.rarity]);
            const rarities = targetlist.map(l=>l[1]).reduce((a,b)=>a+b);
            const add = rarities*i.c.rarity*4;
            o.log.add = add;
            o.log.notes = '後：'+rarities+'×'+i.c.rarity+'×4 = '+add+'p';
            o.log.description = details[1]+'\n対象：'+targetlist.map(l=>l[0]+l[1]).join(' ');
            o.log.fxtype.push('after','add');
            o.log.special = 'パンチ';
            return o;
          }
          else return;
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "とどろき",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "出発進行！",
        description:
          "50%の確率で魔力を推進力に変換し、自身を起点として先頭に到るまでの生徒カードのLvに徐々に大きくなる値をかけて加点していく。末尾に近いと出力調整に失敗してマイナスになる可能性が高い。",
        detail:
          "かける数は3から始まり、前へ進むごとに1ずつ増えていく。失敗する確率は末尾から順に60%・30%・0%であり、確率加算の影響を受けない。引佐紫が出ている場合は確定で成功する。\n【スチームパンチ】が発動している場合は発動しない。",
        possibility:['prob','random','addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [Math.floor(Math.random() * 100) < 50 + i.c.probadd,
                        !i.prefields.some(pf=>pf.type=="effect"&&pf.title=="スチームパンチ")];
          if (cons.every((con) => con)) {
            let add = 0;
            let lvlist = [];
            for (let j = 0; j <= i.index; j++) {
              const nowcard = i.cards[i.index - j];
              add += nowcard.collected * (3 + j);
              lvlist.unshift(tools.emj(nowcard) + "×" + (3 + j));
            }
            const inasa = i.cards.some((cc) => cc.id.match(/^いなさゆ/));
            if (
              !inasa &&
              Math.floor(Math.random() * 100) <
                (i.index - (i.cards.length - 3)) * 30
            )
              add *= -1;
            o.log.description +=
              (inasa ? "\n🎲「それじゃあぶっ放すか、轟君！」 → 確定成功" : "") +
              "\n計算：" +
              lvlist.join(" ");
            o.log.add = add;
            o.log.notes = (add < 0 ? "失敗 " : "") + add + "p";
            o.log.fxtype.push("after", "prob", "random", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'とどろき問', phase:['後'], f:(i)=>
    {const outline = {title:           '力押し',
                      description:     '自身以外に(Q)とつく生徒カードがあるとき、回答ボタンを押す。対象カードが自身より前になかった場合は押し勝って後ろの対象枚数×50p加算、あった場合は押し負けて前の枚数×30p減算。ただし、20%の確率でボタンを押した時点で破壊してしまい100p減算。',
                      detail:          '確率加算の影響は受けない。',
                      eventdescription:'《イベント》対象カードの枚数分解答pを追加獲得する。',
                      possibility:['addplus', 'addminus']};
     if(i){
       try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
         if(i.cards.some(cc=>cc.id!==i.c.id&&cc.eventid&&cc.eventid=='QUIZ')){
           let add = 0;
           let targets = [];
           if(Math.random()*100<20){
             add = -100;
             o.log.notes = 'あっ！💥 ' + add+'p';
           }
           else{
             const first = i.cards.find((cc,index)=>index<i.index&&cc.eventid&&cc.eventid=='QUIZ');
             if(first){ //先に押した人がいる
               targets = i.cards.filter((cc,index)=>index<i.index&&cc.eventid&&cc.eventid=='QUIZ');
               add = targets.length*(-30);
               o.log.notes = '勝者：'+tools.emj(first)+' '+add+'p';;
             }
             else{
               targets = i.cards.filter((cc,index)=>i.index<index&&cc.eventid&&cc.eventid=='QUIZ');
               add = targets.length*50;
               o.log.notes = '勝者：'+tools.emj(i.c)+' '+add+'p';;
             };
             o.log.description+='\n対象：'+targets.map(cc=>tools.emj(cc)).join('');
           };
           o.log.add=add;
           o.log.fxtype.push('after','add');
           //▼イベントアイテム
           if(i.event&&i.event.id==i.c.eventid){
             const iindex=0; o.log.eventitems.index=iindex;
             const iadd=targets.length; o.log.eventitems.add=iadd;
             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
             o.log.fxtype.push('event');
           };
         return o; };
       }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "どらこざ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "実力考査",
        description:
          "ここまでの合計点が全生徒カードレアリティ合計×20pで決定される赤点を下回っているとき、一度強制的に全てを没収する。\nその後、元の合計点を生徒カードの数だけ分割して1人ずつ試験を行い、合格した生徒は分割された点を倍にして(マイナスだった場合は倍にせずプラスにして)取り戻すことができる。",
        detail:
          "合格確率は学年と立場に依存する。\n首席：(Lv×1)+90%\n3年生：(Lv×2)+75%\n2年生：(Lv×3)+60%\n1年生：(Lv×4)+45%",
        possibility:['random','force']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const akaten =
            i.cards.map((cc) => cc.rarity).reduce((a, b) => a + b) * 20;
          const cons = [i.totalP < akaten];
          if (cons.every((con) => con)) {
            let force = 0;
            const solopoint =
              Math.floor(i.totalP / i.cards.length) * (i.totalP < 0 ? -1 : 2);
            const testresults = [];

            i.cards.forEach((cc) => {
              const passprob = cc.position.includes("首席")
                ? cc.collected * 1 + 90
                : cc.grade == 3
                ? cc.collected * 2 + 75
                : cc.grade == 2
                ? cc.collected * 3 + 60
                : cc.collected * 4 + 45;
              const pass = Math.floor(Math.random() * 100) < passprob;
              force += pass ? solopoint : 0;
              testresults.push(
                tools.emj(cc) + (pass ? "⭕" + solopoint + "p" : "❌0p")
              );
            });
            o.log.description +=
              "\n赤点：" +
              akaten +
              "p (発動前の合計点：" +
              i.totalP +
              "p)\n結果：" +
              testresults.join("　");
            o.log.force = force;
            o.log.notes = "強制" + force + "p";
            o.log.fxtype.push("after", "force", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'どろしー聖', phase:['前'], f:(i)=>
    {const outline = {title:           'カエルパーティー',
                      description:     '生徒をひとり追加で呼び、対象カードのLv×10p加算。対象カードが(Xmas)とつくか調理部である場合は加算する値を倍にする。',
                      detail:          'じゅうぶんなカードを持っていない場合は発動しない。',
                      eventdescription:'《イベント》➿モールを1個追加獲得する。',
                      possibility:['random','addcard','addplus']};
     if(i){
       try{
         const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
         const choices = i.allcards.filter(chr=>chr.genre=='stTm'&&!i.cards.some(cc=>cc.id.slice(0,4)==chr.id.slice(0,4)))
         if(0<choices.length){
           o.cards=i.cards;
           const newcard = exports.getnature(choices[Math.floor(Math.random()*choices.length)]);
           o.cards.push(newcard);
           const twice = ((newcard.eventid&&newcard.eventid=='XMAS')||newcard.club.includes('調理'));
           const add=newcard.collected*10*(twice?2:1);
           o.log.add=add;
           o.log.notes=newcard.collected+'×10'+(twice?'×2':'')+' = '+add+'p';
           o.log.description+='\n追加：'+tools.emj(newcard);
           //▼タイプ
           o.log.fxtype.push('before','random','addcard','add');
           //▼イベントアイテム
           if(i.event&&i.event.id==i.c.eventid){const iindex=1; o.log.eventitems.index=iindex;
                                                const iadd=1; o.log.eventitems.add=iadd;
                                                o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji:'');
                                                o.log.fxtype.push('event');};
           return o;
         };
       }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "ながくら",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "夜戸出",
        description:
          "自身以外に音楽タグを持つ生徒カードがないとき、夜間(21～3時)は必ず、夜間でなければ80%の確率でいなくなる。夜間である場合ランダムで±50p加算。",
        detail: "確率加算はいなくなる方向に働く。",
        possibility:['prob','random','addplus','addminus','delcard','leaving']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const ms = i.cards.filter(
            (cc) => cc.id !== i.c.id && cc.tag.split("/").includes("音楽")
          );
          const night = 21 <= i.date.getHours() || i.date.getHours() < 3;
          const cons = [
            ms.length == 0,
            night || Math.floor(Math.random() * 100) < 80 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards.filter((cc) => cc.id !== i.c.id);
            o.count--;
            o.log.fxtype.push("before", "delcard", "leaving");
            if (night) {
              const plus = Math.random() < 0.5;
              const add = plus ? 50 : -50;
              o.log.add = add;
              o.log.notes = (plus ? "" : "喧嘩 ") + add + "p";
              o.log.fxtype.push("add", "random");
            } else o.log.fxtype.push("prob");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ながくら",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "cresc.",
        description:
          "自身を含む場の全カードから音楽タグ・音楽系部活情報を全て集め、(その数-4)×50p加算。",
        detail: "",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const mtag = i.cards
            .filter((cc) => cc.tag.split("/").includes("音楽"))
            .map((cc) => "音楽");
          const mclub = i.cards
            .filter((cc) => cc.club.match(/軽音楽|吹奏楽/))
            .map((cc) =>
              cc.club.match(/軽音楽/)
                ? "軽音楽部"
                : cc.club.match(/吹奏楽/)
                ? "吹奏楽部"
                : ""
            );
          const musicinfo = [...mtag, ...mclub];
          const add = (musicinfo.length - 4) * 50;
          o.log.add = add;
          o.log.notes = "(" + musicinfo.length + "-4)×50 = " + add + "p";
          o.log.description += "\n判定：" + musicinfo.join("・");
          o.log.fxtype.push("after", "add");
          return o;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'なかつか', phase:['後'], f:(i)=>
    {const outline = {title:           'その気持ち、わかります',
                      description:     '1つ前の生徒カードが得点加算の効果を発動させているとき、対象が動物系絵文字を持つものである場合は該当効果の加算値分、そうでない場合はその半分を加算。',
                      detail:          'マイナス値も対象とする。小数点以下切捨。',
                      possibility:['addplus', 'addminus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               if(0<i.index) {const targetfx = i.prefields.find(pf=>pf.type=='effect'&&pf.fxowner.id==i.cards[i.index-1].id&&pf.fxtype.includes('add')&&pf.add!==0);
                              if(targetfx){
                                const animal = exports.emjlist["動物"].includes(tools.emj(i.cards[i.index-1]));
                                const add = Math.floor( targetfx.add * (animal ? 1 : 0.5) );
                                o.log.add=add;
                                o.log.notes=(animal?'':targetfx.add+'×0.5 → ') + add + 'p';
                                o.log.fxtype.push('after','add');
                                return o;
                              }else return;
                             }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id: "なすしゅ", phase: ["後"], f:(i)=>
    {const outline = {title: "親切な先輩",
                      description: "隣接した下級生の面倒を見る。自身がレアリティで上回っている場合はその差×20p、対象カードの得点加算・乗算を行う効果がマイナス値を出している場合は1人につき50p加算。",
                      detail: "",
                      possibility:['addplus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const targets = i.cards.filter((cc, index)=>Math.abs(index-i.index)==1&&Number(cc.grade)<Number(i.c.grade));
               const cons = [targets.length > 0];
               if(cons.every(con=>con)){let add = 0;
                                        const raritylist = [];
                                        targets.forEach(t=>{const rarityP = i.c.rarity-t.rarity>0 ? (i.c.rarity-t.rarity)*20 : 0;
                                                            const effectP = i.prefields.some(pf=>pf.type=="effect"&&pf.fxowner.id==t.id&&pf.fxtype
                                                                                                 &&( (pf.fxtype.includes("add")&&pf.add<0)
                                                                                                   ||(pf.fxtype.includes("mul")&&pf.mul<0)))
                                                                            ?50:0;
                                                            add+=rarityP+effectP;
                                                            if(rarityP+effectP>0)raritylist.push(tools.emj(t)+(rarityP>0 ? "差" + rarityP : "")
                                                                                                             +(rarityP>0 && effectP>0 ? "+" : "")
                                                                                                             +(effectP>0 ? "効果" + effectP : "")
                                                                                                             +"p");
                                                           });
                                        if(add>0){o.log.description+="\n対象："+raritylist.join(" ");
                                                  o.log.add=add; o.log.notes=add+"p"; o.log.fxtype.push("after", "add");
                                                  return o; } else return;
                                       }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "なすしゅ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "あと1歩及ばない",
        description: "2番目にいるとき30p減算。",
        detail: "【親切な先輩】が発動している場合は発動しない。",
        possibility:['addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.index == 1,
            !i.prefields.some((pf) => pf.type=="effect"&&pf.title == "親切な先輩"),
          ];
          if (cons.every((con) => con)) {
            const add = -30;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "なすしゅ踊",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "てんてこ舞い",
        description:
          "先頭にいるとき末尾へ、末尾にいるとき先頭へ忙しく走り回る。通り越したカード枚数×10p加算。カード情報の書換を受けた場合は発動しない。",
        detail: "この効果は何度でも発動する。",
        eventdescription:
          "《イベント》通り越したカード2枚につき1個ダンスpを追加獲得する。",
        possibility:['addplus','sortcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const original = i.allcards.find((ccc) => ccc.id == i.c.id);
          const originalkeys = Object.keys(original);
          const cons = [
            originalkeys.every((key) => original[key] == i.c[key]),
            i.index == 0 || i.index == i.cards.length - 1,
          ];
          if (cons.every((con) => con)) {
            const add = (i.cards.length - 1) * 10;
            o.cards = i.cards;
            if (i.index == 0) {
              o.cards.shift();
              o.cards.push(i.c);
            } else {
              o.cards.pop();
              o.cards.unshift(i.c);
            }
            o.log.description +=
              "\n移動：" +
              (i.index == 0
                ? "1枚目 → " + i.cards.length + "枚目"
                : i.cards.length + "枚目 → 1枚目");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "add", "sortcard");
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor((i.cards.length - 1) / 2);
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id:'なるはれ', phase:['後'], f:(i)=>
    { const outline = {title:           'ここがモアナ！',
                       description:     '自身の絵文字以外の水・氷系絵文字があるとき、ここまでのリザルト表示・効果説明に含まれる水・氷系絵文字の数×20p加算。',
                       detail:          '',
                       possibility:['addplus']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const targettext = i.resultlist.join('') + i.prefields.map(pf => pf.name + (pf.description ? pf.description : pf.value)).join('');
          if(exports.emjlist['水・氷'].filter(e => e!==tools.emj(i.c)).some(e => targettext.includes(e))){
            const targetemoji = exports.emjlist['水・氷'];
            const watersnum = (targettext.match(new RegExp(targetemoji.join('|'),'g')) || []).length;
            //▼条件
            if(0 < watersnum){
              const add = watersnum * 20;
              o.log.add = add;
              o.log.notes = watersnum + '×20 = ' + add+'p';
              o.log.fxtype.push('after','add');
              return o;
            };
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "におうぇ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ここにいます",
        description:
          "場の魔力に応じた確率で姿が見えなくなってしまう。ただし自身以外のカードのレアリティ平均が2を超えている場合、存在に気付いてもらえて40p加算。",
        detail:
          "自身以外のカードのLvとレアリティの合計+(自身のLv×10)%の確率で姿が見えなくならずに済む。確率加算は「見えるようになる」方向に働く。" +
          "姿が見えているとき、稀に動き回ってアピールして都度20p加算。移動先で順番が回ってくる限りこの効果は何度でも発動する。\n1回目の移動は確率加算の影響を受けず15%の確率で始まり、2回目以降は必ず発動する。\n姿が見えなくなるかどうかの判定は最初の1度しか行われない。",
        possibility:['prob','random','delcard','leaving','sortcard','addplus']
      };
      const title2 = [
        "ここにいますよっ！",
        "ここにいます！",
        "ここにいま～す！",
        "ここにいますっ！",
        "ここにいますよ～！",
      ][Math.floor(Math.random() * 5)];
      const description2 =
        "姿が見えているとき、稀に動き回ってアピールして都度30p加算。移動先で順番が回ってくる限りこの効果は何度でも発動する。";
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          o.log.fxtype.push("before");
          const invisible =
            i.cards.length == 1 ||
            Math.floor(Math.random() * 100) <
              100 -
                ([...i.cards, ...i.Tcards]
                  .filter((cc) => !cc.id.match(/におうぇ/))
                  .map((cc) => cc.rarity + cc.collected)
                  .reduce((a, b) => a + b) +
                  i.c.collected * 10 +
                  i.c.probadd);
          if (
            (!invisible && Math.floor(Math.random() * 100) < 15) ||
            i.prefields.some(
              (pf) =>
                pf.type == "effect" &&
                pf.fxowner.id == i.c.id &&
                pf.title.includes("！")
            )
          ) {
            o.cards = i.cards.filter((cc) => !cc.id.match(/^におうぇ/));
            const indexlist = Array.from(Array(i.cards.length).keys()).filter(
              (n) => n !== i.index
            );
            const insertindex =
              indexlist[Math.floor(Math.random() * indexlist.length)];
            o.cards.splice(insertindex, 0, i.c);
            if (i.index < insertindex) o.count--;
            o.log.title = title2;
            o.log.description =
              description2 +
              "\n移動：" +
              (i.index + 1) +
              "枚目 → " +
              (insertindex + 1) +
              "枚目";
            const add = 30;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("add", "random", "sortcard");
            return o;
          } else if (invisible) {
            o.cards = i.cards.filter((cc) => !cc.id.match(/^におうぇ/));
            o.count--;
            o.log.fxtype.push("delcard","leaving");
            if (
              o.cards.length > 0 &&
              [...o.cards, ...i.Tcards]
                .map((cc) => cc.rarity)
                .reduce((a, b) => a + b) /
                [...o.cards, ...i.Tcards].length >
                2
            ) {
              const add = 40;
              o.log.add = add;
              o.log.notes = add + "p";
              o.log.fxtype.push("add", "prob");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "におうぇ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "もぐもぐ食育タイム",
        description:
          "ここまでのリザルト表示・効果説明に含まれる食物系絵文字の数、食べ物・食事・調理・空腹に関する名前を持つ効果の数、調理部であるか(チョコ)とつく生徒カードの数の合計×15p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =
            i.pentamessage +
            i.resultlist.join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("");
          const targetfx = [
            "アランの小さな魔法",
            "チョコ作りの参考に……",
            "受け取りなさい！",
            "貰ってくださ～～～い！！",
            "サバイバルハンティング",
            "みんな食べり～！",
            "ショートニング",
            "ホイップ",
            "シャトー・ド・ショコラ",
            "焼肉屋の娘",
            "腹ペコジャイアント",
            "雪も積もればモンブラン",
            "おもてなし",
            "もぐもぐ食育タイム",
            "刺激的なあなたのそば",
            "キャンプ飯ですよ！",
            "夜明けのコーヒー",
            "ナイスバナナ！",
            "ミステリーキャンディ",
            "これが大人のクリスマス"
          ];
          const foodsA = (
            targettext.match(
              new RegExp(exports.emjlist["食物"].join("|"), "g")
            ) || []
          ).length;
          const foodsB = i.prefields.filter(
            (pf) =>
              pf.type == "effect" && targetfx.some((t) => pf.title.includes(t))
          ).length;
          const foodsC = i.cards.filter(
            (cc) =>
              cc.club.includes("調理") || (cc.eventid && cc.eventid == "CHOCO")
          ).length;
          if (foodsA + foodsB + foodsC > 0) {
            const add = (foodsA + foodsB + foodsC) * 15;
            o.log.description +=
              "\n判定：" +
              (foodsA ? "絵文字×" + foodsA + "　" : "") +
              (foodsB ? "効果×" + foodsB + "　" : "") +
              (foodsC ? "生徒×" + foodsC : "");
            o.log.add = add;
            o.log.notes = foodsA + foodsB + foodsC + "×15 = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "にらいん",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "長男気質",
        description: "1年生がいる場合、その枚数×25p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const gradeonenum = i.cards.filter((cc) => cc.grade == 1).length;
          const cons = [gradeonenum > 0];
          if (cons.every((con) => con)) {
            const add = gradeonenum * 25;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ぬのしだ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "日課のロードワーク",
        description:
          "活動し始めるのが最も早かったとき、走り込んでLvを1上げる。⬆️",
        detail: "先頭にいたとき、この場限りでLvが上がる。",
        possibility:['editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index == 0];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            newcard.collected += 1;
            newcard.name += "⬆️";
            o.cards[i.index] = newcard;
            o.log.fxtype.push("before", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ぬのしだ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "乾坤一擲",
        description:
          "ここまでに他の生徒カードによる効果発動がなく全生徒カードのレアリティ合計が6以下のとき、自身のLvを全て削ってLv×15p加算。⬇️",
        detail: "",
        possibility:['addplus','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.prefields.filter(
              (pf) => pf.type == "effect" && pf.fxowner.id !== i.c.id
            ).length == 0,
            i.cards.map((cc) => cc.rarity).reduce((a, b) => a + b) <= 6,
          ];
          if (cons.every((con) => con)) {
            const add = i.c.collected * 15;
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            newcard.collected = 0;
            newcard.name = newcard.name.replace("⬆️", "") + "⬇️";
            o.cards[i.index] = newcard;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "editcard", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ぬのしだ体",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "闘争心",
        description:
          "末尾以外の位置にいて(体育祭)とつくカードが自身以外にないとき、末尾の生徒カードを白組タグを持つものと入れ替える。",
        detail:
          "白組タグを持つカードを持っていない場合、また生徒カードが2枚以上出ていない場合は発動しない。",
        possibility:['changecard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const choices = i.allcards.filter(
            (chr) =>
              chr.genre == "stTm" &&
              chr.tag.split("/").includes("白組") &&
              !i.cards
                .slice(0, i.cards.length - 1)
                .some((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4))
          );
          const cons = [
            i.index < i.cards.length - 1,
            ![...i.cards, ...i.Tcards].some(
              (cc) => cc.id !== i.c.id && cc.eventid && cc.eventid == "SPORTS"
            ),
            i.cards.length >= 2,
            choices.length > 0,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = exports.getnature(
              choices[Math.floor(Math.random() * choices.length)]
            );
            o.cards.splice(o.cards.length - 1, 1, newcard);
            o.log.description += "\n入替追加：" + tools.emj(newcard);
            o.log.fxtype.push("before", "changecard", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ぬのしだ体",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "赤手空拳",
        description:
          "(体育祭)とつくカードの枚数×30%の判定を15回行い、成功するごとに10p獲得する。",
        detail: "確率加算の影響は受けない。",
        eventdescription:
          "《イベント》30p獲得につき1個ずつ赤組pを追加獲得する。",
        possibility:['random','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetsnum = [...i.cards, ...i.Tcards].filter(
            (cc) => cc.eventid && cc.eventid == "SPORTS"
          ).length;
          const hits = [...Array(15)].map((hit) =>
            Math.floor(Math.random() * 100) < targetsnum * 30 ? true : false
          );
          const hitsnum = hits.filter((hit) => hit).length;
          const cons = [hitsnum > 0];
          if (cons.every((con) => con)) {
            const hitsresult = [];
            let truenum = 1;
            hits.forEach((hit) => {
              hitsresult.push(
                hit
                  ? "💥" +
                      truenum +
                      (truenum == 1 ? "HIT" : "HITS") +
                      "!" // "! [+10p]"
                  : "❌MISS!"
              );
              if (hit) truenum++;
            });
            o.log.description += "\n" + hitsresult.join("　");
            const add = hitsnum * 10;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "random", "add");
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(add / 30);
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ねぎかぶ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "いきものがかり",
        description:
          "ここまでのリザルト表示・効果説明に含まれる動物系絵文字の数×20p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =
            i.resultlist.join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("");
          const targetemoji = exports.emjlist["動物"];
          const animalsnum = (
            targettext.match(new RegExp(targetemoji.join("|"), "g")) || []
          ).length;
          const cons = [animalsnum > 0];
          if (cons.every((con) => con)) {
            const add = animalsnum * 20;
            o.log.add = add;
            o.log.notes = animalsnum + "×20 = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "のーしゅ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "コルニヴィーシェ",
        description:
          "20%の確率で後続の生徒カードを全て金属・機械系絵文字を持つもので鎖繋ぎにし、後続の生徒カードの枚数×25p加算。自身より前にクラスメイトがいる場合必ず発動する。",
        detail:
          '対象となる生徒カードをじゅうぶんに持っていない場合は発動しない。効果名は"корневище(地下茎)"より。',
        possibility:['prob','random','changecard','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const metalcards = i.allcards.filter(
            (ac) => ac.emoji && exports.emjlist["金属・機械"].includes(ac.emoji)
          );
          const cons = [
            i.index < i.cards.length - 1,
            metalcards.length >= i.cards.length,
            Math.floor(Math.random() * 100) < 20 + i.c.probadd ||
              i.cards
                .slice(0, i.index)
                .some((cc) => cc.grade == i.c.grade && cc.major == i.c.major),
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            for (let j = i.index + 1; j < i.cards.length; j++) {
              const choices = metalcards.filter((mc) =>
                o.cards
                  .slice(0, j)
                  .every((cc) => cc.id.slice(0, 4) !== mc.id.slice(0, 4))
              );
              const newcard =
                choices[Math.floor(Math.random() * choices.length)];
              o.cards[j] = exports.getnature(newcard);
            }
            const add = (i.cards.length - i.index - 1) * 25;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "prob", "random", "changecard", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'のーしゅ山', phase:['後'], f:(i)=>
    {const outline = {title:           'ストラタ',
                      description:     '「得点計算」と書かれた行より上に含まれる「・」の数が「ー」の数より多いとき、その差×30p加算。',
                      detail:          '',
                      eventdescription:'《イベント》食材🥔を追加獲得する。',
                      possibility:['addplus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const hrindex = i.resultlist.findIndex(r => r.includes('得点計算'));
               const targettext = i.resultlist.slice(0,hrindex).join('');
               const stones = (targettext.match(/・/g)||[]).length;
               const walls  = (targettext.match(/ー/g)||[]).length;
               const cons = [stones-walls>0];
               if(cons.every(con=>con)){const add=(stones-walls)*30;
                                        o.log.add=add; o.log.notes='('+stones+'-'+walls+')×30 = '+add+'p';
                                        o.log.fxtype.push('after','add');
                                        if(i.event&&i.event.id==i.c.eventid){o.log.special='curry';
                                                                             o.log.description+='\n'+outline.eventdescription; };
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "のたゆめ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "俺とゆめ",
        description:
          "自身以外の天文部・流星部のうち多いほうに合わせて人格が切り替わる。",
        detail: "どちらもいない場合・人数が等しい場合は何も起こらない。",
        possibility:['editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cardsT = i.cards.filter(
            (cc) => cc.id !== i.c.id && cc.club.includes("天文")
          ).length;
          const cardsR = i.cards.filter(
            (cc) => cc.id !== i.c.id && cc.club.includes("流星")
          ).length;
          const cons = [cardsT !== cardsR];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            if (cardsT > cardsR) {
              newcard.nature = "◻️";
              newcard.club = "天文";
            } else {
              newcard.nature = "◼️";
              newcard.club = "流星";
            }
            o.cards[i.index] = newcard;
            o.log.fxtype.push("before", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "はぎおち",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "たんぽぽちゃんにおまかせ！",
        description:
          "20×(生徒カード枚数/自身のLv)%の確率でたんぽぽちゃんの陰に隠れてしまい、先生としての責務が十分に果たせずここまでの合計点を1.5で割る。その代わり、お詫びの印にたんぽぽちゃんが頑張ってくれるので自身のLv×25p加算。",
        detail: "たんぽぽちゃん状態(🫥)である場合は必ず発動する。",
        possibility:['prob','muldecimal','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c; o.log.title = outline.title;
          o.log.description = (i.c.nature=="🫥") ? "〔🫥必ず発動〕\nたんぽぽちゃんの陰に隠れてしまい、先生としての責務が十分に果たせずここまでの合計点を1.5で割る。その代わり、お詫びの印にたんぽぽちゃんが頑張ってくれるので自身のLv×25p加算。"
                                                 : outline.description;
          const percent = Math.round(20 * (i.cards.length / i.c.collected));
          if (i.c.nature=="🫥"||Math.floor(Math.random()*100) < percent + i.c.probadd) {
            const mul = 2 / 3;
            const add = i.c.collected * 25;
            //o.log.description += "\n確率：20×(" + i.cards.length + "/" + i.c.collected + ") = (約)" + percent + "%";
            o.log.mul = mul;
            o.log.add = add;
            o.log.notes =
              i.totalP +
              "p ÷1.5 +" +
              add +
              " → " +
              (Math.floor(i.totalP * mul) + add) +
              "p";
            o.log.fxtype.push("after", "prob", "mul", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "はちおう",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "私も行く！",
        description:
          "ここまでにカード移動を行う効果が発動していて得点加算を行っているとき、自分もついていって同じ値の加算を行って戻ってくる。",
        detail: "",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetfxs = i.prefields.filter(
            (pf) =>
              pf.type == "effect" &&
              pf.fxtype &&
              pf.fxtype.includes("sortcard") &&
              pf.fxtype.includes("add")
          );
          const cons = [targetfxs.length > 0];
          if (cons.every((con) => con)) {
            o.log.description +=
              "\n対象：" +
              targetfxs
                .map((pf) => tools.emj(pf.fxowner) + pf.title)
                .join("・");
            const add = targetfxs.map((fx) => fx.add).reduce((a, b) => a + b);
            o.log.add = add;
            o.log.notes = targetfxs.map((fx) => fx.add + "p").join(" + ");
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "はちおう",
    phase: ["後"],
    f: (i) => {
      const s1 = ["「↪️逆に凄くない！？」", "0未満のとき-1を掛ける。"];
      const s2 = [
        "「➡️あとちょっとだけがんばろー！」",
        "100から200の間のとき生徒Lv合計×2p加算。",
      ];
      const s3 = [
        "「⏩まだまだいけちゃうかも！？」",
        "400から500の間のとき生徒Lv合計×4p加算。",
      ];
      const s4 = ["「🪙みんなおつかれさまー！」", "どれでもないとき100c獲得。"];
      const outline = {
        title: "ポジティブシンキング",
        description:
          "25%の確率で、ここまでの合計点に応じて前向きな鼓舞を行う。",
        detail: [...s1, ...s2, ...s3, ...s4].join("\n"),
        possibility:['prob','mulminus','addplus','coinadd']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [Math.floor(Math.random() * 100) < 25 + i.c.probadd];
          if (cons.every((con) => con)) {
            let desnote = "";
            if (i.totalP < 0) {
              const mul = -1;
              o.log.notes =
                i.totalP + "p × " + mul + " = " + i.totalP * mul + "p";
              o.log.mul = mul;
              o.log.fxtype.push("mul");
              desnote = s1[0] + "\n" + s1[1];
            } else if (100 < i.totalP && i.totalP < 200) {
              const add =
                i.cards.map((cc) => cc.collected).reduce((a, b) => a + b) * 2;
              o.log.notes = add + "p";
              o.log.add = add;
              o.log.fxtype.push("add");
              desnote = s2[0] + "\n生徒Lv合計×2 → " + add + "p";
            } else if (400 < i.totalP && i.totalP < 500) {
              const add =
                i.cards.map((cc) => cc.collected).reduce((a, b) => a + b) * 4;
              o.log.notes = add + "p";
              o.log.add = add;
              o.log.fxtype.push("add");
              desnote = s3[0] + "\n生徒Lv合計×4 → " + add + "p";
            } else {
              const coinadd = 100;
              o.coinadd = coinadd;
              o.log.fxtype.push("coinadd");
              desnote = s4[0] + "\n+" + coinadd + "c獲得";
            }
            const add = 0;
            o.log.description += "\n" + desnote;
            o.log.fxtype.push("after", "prob");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "はちおう体",
    phase: ["前"],
    f: (i) => {
      const details = {
        ["先頭"]: [
          "「走り高跳び！行くよー！」",
          "〔先頭〕末尾の生徒カードの身長÷5p加算。小数点以下切捨。",
        ],
        ["中央"]: [
          "「玉入れ！がんばろーね！」",
          "〔ちょうど中央〕全カードのレアリティ合計×3p加算。",
        ],
        ["末尾"]: [
          "「徒競走！負けないぞー！」",
          "〔末尾〕先頭に移動し、追い越した生徒カードのLv合計×2p加算。",
        ],
      };
      const outline = {
        title: "目指せ！一等賞",
        description: "自身の位置に応じて内容が変化する。",
        detail:
          details["先頭"][1] +
          "対象が身長情報を持たない場合は発動しない。\n" +
          details["中央"][1] +
          "\n" +
          details["末尾"][1],
        eventdescription:
          "《イベント》この効果による得点から20pごとに1個ずつ白組pを追加獲得する。",
        possibility:['addplus','sortcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const pos = ( i.index==0 && i.cards[i.cards.length-1].cm )
              ? "先頭"
              : i.cards.length % 2 !== 0 &&
                Math.floor(i.cards.length / 2) == i.index
              ? "中央"
              : i.index == i.cards.length - 1
              ? "末尾"
              : undefined;
          if (pos) {
            o.log.description += "\n" + details[pos].join("\n");
            let add;
            if (pos == "先頭") {
              const target = i.cards[i.cards.length - 1];
              add = Math.floor(target.cm / 5);
              o.log.notes = tools.emj(target) + target.cm + "÷5 → " + add + "p";
            } else if (pos == "中央") {
              const rarities = [...i.cards, ...i.Tcards]
                .map((cc) => cc.rarity)
                .reduce((a, b) => a + b);
              add = rarities * 3;
              o.log.notes = rarities + "×3 = " + add + "p";
            } else if (pos == "末尾") {
              const lvs = i.cards
                .slice(0, -1)
                .map((cc) => cc.collected)
                .reduce((a, b) => a + b);
              add = lvs * 2;
              o.log.notes = lvs + "×2 = " + add + "p";
              o.log.fxtype.push("sortcard");
              o.cards = i.cards;
              o.cards.pop();
              o.cards.unshift(i.c);
            }
            o.log.add = add;
            o.log.fxtype.push("before", "add");
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 1;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(add / 20);
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "はなてん雪",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "雪玉カタパルト",
        description:
          "得点計算の各行に一定確率で20p分の雪玉⚪を着弾させる。Lvに応じて命中率が上昇する。",
        detail: "命中率は20+(Lv×10)%となる。",
        eventdescription: "《イベント》着弾したぶんの雪玉を獲得する。",
        possibility:['prob','addplus','changeresultlist']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const hrindex = i.resultlist.findIndex((r) => r.includes("得点計算"));
          let snowball = 0;
          o.resultlist = i.resultlist.map((r, index) => {
            if (
              hrindex < index &&
              Math.floor(Math.random() * 100) <
                20 + i.c.collected * 10 + i.c.probadd
            ) {
              snowball++;
              return r + "　⚪20p";
            } else {
              return r;
            }
          });
          const cons = [snowball > 0];
          if (cons.every((con) => con)) {
            const add = snowball * 20;
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = snowball;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
            }
            o.log.add = add;
            o.log.notes = "(" + add + "p)";
            o.log.fxtype.push(
              "after",
              "prob",
              "add",
              "event",
              "changeresultlist"
            );
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ぴーたー",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ギロチンハット",
        description:
          "末尾にいるとき、寮室を除いたどんな教室🚪にも現れる新規生徒カードを先頭に追加する。",
        detail:
          "新規生徒カードは性別・学年・寮・タグ・絵文字・レアリティ・Lvの情報を持っているほか、名前の先頭文字のみを有し、ピーター自身への縁を持っている。",
        possibility:['editcard','addcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index == i.cards.length - 1];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            newcard.name = i.c.name.replace("ピ", "");
            newcard.subname = "eter Jester";
            newcard.kana = "ーたーじぇすたー";
            o.cards[i.index] = newcard;
            const phead = JSON.parse(
              JSON.stringify(
                exports.additional.find((adc) => adc.id == "ぴーぎろ")
              )
            );
            phead.tag = i.c.tag;
            phead.rarity = i.c.rarity;
            phead.collected = i.c.collected;
            o.cards.unshift(phead);
            o.count++;
            o.log.fxtype.push("before", "editcard", "addcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ひがしあ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "土下座の品格",
        description:
          "ここまでの合計点が0未満である場合、不手際の責任を背負い、美しい土下座で一か八か許しを請う。新聞部が揃うほど許される望みがやや増す。",
        detail:
          "新聞部の枚数×10%の確率で+100p、だめだった場合-100p。顧問がいる場合なんとか+100pにしてくれる。",
        possibility:['addplus','addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.totalP < 0];
          if (cons.every((con) => con)) {
            const add =
              Math.floor(Math.random() * 100) <
                10 * i.cards.filter((cc) => cc.club.includes("新聞")).length ||
              i.Tcards.some((cc) => cc.id.match(/^いかりや/))
                ? 100
                : -100;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ひがしあ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ストーリーテラー",
        description: "50%の確率で、今いるメンバーでのエピソード📖を思い付く。",
        detail:
          "今ある全生徒カードからランダムで10～70pのエピソードを生成する。タイトルはランダム生成される。",
        possibility:['prob','random','episodeadd']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [Math.floor(Math.random() * 100) < 50 + i.c.probadd];
          if (cons.every((con) => con)) {
            const keiyoushi = ['おためしの','体験版','ジェネリック','見習い','ベテラン','赤い','青い','白い','黒い','黄色い','緑の','紫の','オレンジ色の','黄金の','大きい','小さい','新しい','フレッシュな','さわやかな','すてきな','古い','古の','悪い','熱い','冷たい','ホット','アイス','冷凍','真夏の','真冬の','難しい','簡単な','高い','低い','安い','おもしろい','おいしい','忙しい','楽しい','便利な','醜い','美しい','ビューティフル','元気な','有名な','遠い','甘い','辛い','辛辣な','激辛','苦い','重い','軽い','速い','遅い','広い','狭い','あでやかな','たいせつな','賢い','臆病な','かわいい','可憐な','最高の','最低の','最強の','最弱の','強い','弱い','世界一の','痛い','調子の良い','調子の悪い','体に良い','都合の悪い','奇妙な','えらい','うるさい','静かな','おかしな','間違った','正しい','汚い','うれしい','かなしい','恥ずかしい','硬い','やわらかい','珍しい','ありふれた','寂しい','にぎやかな','優しい','厳しい','細い','太い','濃い','厚い','薄い','ひどい','ヤバい','えげつない','ろくでもない','不思議な','真の','生まれたての','年老いた','偽りの','鋭い','危険な','安全な','許しがたい','丸い','四角い','三角形の','ゆるい','きつい','かっこいい','エッチな','鍛え抜かれた','長い','短い','大きな大きな','小さな小さな','気分の良い','目に見えない','驚きの','うかつな','きらびやかな','くたびれた','くびれた','いじわる','有名な','私の','ぼくの','This is ','キング・オブ・','メイド・イン・','ドラゴン＆','インターネット','セクシー','アイ・ラブ・','アイ・アム・','ゆけ！ ','目指せ！ ','がんばれ！ ','愛の','愛しの','夢にまで見た','夢の','ドリーム','ウルトラ','さらば','帰ってきた','星降る夜の','眠れぬ夜の','夜更かし','早朝','すばらしき','恐ろしき','禁断の','呪われた','死んだ','消えた','祝福の','10億の','山の','海の','季節外れの','ある日の','胸が締め付けられる','Mr. ','Mrs. ','Dr. ','THE ','ザ・','これぞ本場の','元祖','劇場版','古代','東京','魔法少女','モンスター','はちみつ','サイレント','ミニスカ','インターネット','デス','シャイニング','暴れ','暴れん坊','スーパー','スペース','バーチャル','宇宙','四次元','仮面ライダー','ニンテンドー・','偽','夢は','奥様は','俺以外は','ふたりは','どこまでいっても','突然の','今日も']
            const meishi = ['物語','朝','夜','日','ある日','1週間','お正月','バレンタイン','夏休み','夏祭り','ハロウィン','クリスマス','パーティー','人','人々','人類','子','子どもたち','男','男たち','女','女たち','少年','少女','おじいさん','おばあさん','お父さん','お母さん','お兄さん','お姉さん','弟','妹','ペアレント','ご両親','家族','一族','わたし','ぼく','俺','あいつ','あなた','きみ','あの子','幼馴染','ともだち','恋人','お隣さん','先輩','後輩','仕事','ミッション','大統領','社長','魔女','海賊','忍者','騎士','門番','侍','将軍','アイドル','魔法少女','ヒーロー','ケーキ屋さん','運転手','先生','ハンター','警察官','歌手','絵描き','王','キング','女王','クイーン','王子','プリンス','姫','プリンセス','村','町','街','都市','地方','島','国','惑星','星','山','雪山','雪景色','海','空','川','城','遺跡','文明','東京','神社','会社','教室','家','部屋','トイレ','お風呂','コンビニ','スーパー','乗り物','車','自転車','電車','新幹線','飛行機','船','ドリンク','水','お茶','お酒','コーラ','コーヒー','スープ','食べ物','プリン','ヨーグルト','りんご','バナナ','みかん','キウイ','いきもの','犬','ねこ','ねずみ','ゾウ','キリン','トラ','オオカミ','ライオン','カラス','魚','鳥','カブトムシ','クモ','ドラゴン','ヘビ','カエル','おばけ','サンタさん','宇宙人','神さま','天使','悪魔','鬼','太郎','桃太郎','金太郎','浦島太郎','お人形','電灯','花','雪','雨','音','光','テレビ','スマホ','電話','パソコン','ドア','ゲーム','漫画','Tシャツ','帽子','ズボン','靴','メガネ','薬','ナイフ','剣','拳銃','スプーン','ごはん','遊び','影','どんぐり','本','かばん','ペン','カメラ','むしめがね','スイッチ','ボタン','ポケット','計画','死刑','嫁入り','観察日記','拳法','世界に転生した件']
            const eptitle = keiyoushi[Math.floor(Math.random() * keiyoushi.length)]
                            + meishi[Math.floor(Math.random() * meishi.length)];
            const ep = {
              f: (j) => {
                const member = i.cards.map((cc) => cc.id.slice(0, 4));
                const outline = {
                  title: eptitle,
                  type: "型",
                  member: member,
                  score: (Math.floor(Math.random() * 7) + 1) * 10,
                };
                try {
                  const cons = [
                    member.every((c) =>
                      j.cards.some((cc) => cc.id.slice(0, 4) == c)
                    ),
                  ];
                  if (cons.every((con) => con)) {
                    const o = JSON.parse(JSON.stringify(epoutput));
                    o.log.title = outline.title;
                    o.log.notes = "著：🔖";
                    o.log.description =
                      outline.type +
                      "：" +
                      outline.member
                        .map((id) =>
                          tools.emj(j.cards.find((cc) => cc.id.includes(id)))
                        )
                        .join("") +
                      " " +
                      outline.score +
                      "p";
                    o.log.add = outline.score;
                    o.log.eptype.push("pattern");
                    return o;
                  } else return;
                } catch (error) {
                  return {
                    error: true,
                    title: outline.title,
                    message: error.message,
                  };
                }
              },
            };
            o.episodeadd.push(ep);
            o.log.fxtype.push("after", "prob", "random", "episodeadd");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ひがしあ事",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "完璧なアリバイです",
        description:
          "完璧なアリバイを披露し30p加算。しかし、50%の確率で肝心のアリバイがあやふやになり減算に転じる。",
        detail: "確率加算の影響は受けない。",
        eventdescription:
          "《イベント》アリバイの披露に成功したとき、証拠品を1つ追加獲得し、指名手配カードとの共通点を正確に表示する。",
        possibility:['addplus','addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [true];
          if (cons.every((con) => con)) {
            const alibi = Math.floor(Math.random() * 100) < 50;
            const add = alibi ? 30 : -30;
            if (i.event && i.event.id == i.c.eventid) {
              o.log.description += "\n" + outline.eventdescription;
              if (alibi) {
                const iindex = 0;
                o.log.eventitems.index = iindex;
                const inum = 1;
                o.log.eventitems.num = inum;
                o.cards = i.cards;
                const newcard = JSON.parse(JSON.stringify(i.c));
                newcard.alibi = true;
                o.cards[i.index] = newcard;
                o.log.description +=
                  "\n獲得：" + i.event.item[iindex].emoji + " ×" + inum;
              }
            }
            o.log.add = add;
            o.log.notes = (alibi ? "" : "……？ ") + add + "p";
            o.log.fxtype.push("before", "add", "random", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ひじかた",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "舞台袖",
        description:
          "自身より前に軽音楽部の生徒カードがあれば自身のLv×5%、そうでなければ自身のLv×2%の確率で後続に音楽タグを持つ生徒カードを集めてライブに臨む。",
        detail:
          "音楽タグを持つ生徒カードをじゅうぶんに持っていない場合は発動しない。",
        possibility:['prob','changecard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const keion = i.cards.some(
            (cc, index) => index < i.index && cc.club.includes("軽音楽")
          );
          const cons = [
            i.index < i.cards.length - 1,
            i.allcards.filter((ac) => ac.tag.split("/").includes("音楽"))
              .length >= i.cards.length,
            Math.floor(Math.random() * 100) <
              i.c.collected * (keion ? 5 : 2) + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            for (let j = i.index + 1; j < i.cards.length; j++) {
              const choices = i.allcards.filter(
                (chr) =>
                  chr.tag.split("/").includes("音楽") &&
                  !o.cards
                    .slice(0, j)
                    .find((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4))
              );
              const newcard =
                choices[Math.floor(Math.random() * choices.length)];
              o.cards[j] = exports.getnature(newcard);
            }
            o.log.fxtype.push("before", "prob", "changecard", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ひじかた",
    phase: ["前"],
    f: (i) => {
      const songlist = [
        ["命のしくみ", "畜生"],
        ["シンカ！", "グレートジャーニー"],
        ["ECHO-ROCKATION", "東京バイオロジー"],
        ["ブレーメン", "縦横無尽ワイルド行進曲"],
      ];
      const details = [
        "〔2人〕追加効果なし",
        "〔3人〕全生徒レアリティ1上昇・555c獲得",
        "〔4人〕全生徒レアリティ1上昇・獲得コイン5倍",
        "〔5人〕全生徒レアリティ2上昇・獲得コイン5倍",
      ];
      const outline = {
        title: "SETLIST",
        description:
          "REDLISTのメンバーが自身以外にいるとき、メンバーの通常計算による得点を10p増加させる。メンバーの人数に応じて曲を決定し、それに応じた追加効果を適用する。",
        detail: details.join("\n"),
        possibility:['editcard', 'coinadd', 'coinmul']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const redlistids = ["ひじかた","そうまあ","こんどう","おきたひ","ながくら"];
          const redlist = i.cards.filter(cc=>redlistids.some(id=>cc.id.includes(id)));
          const cons = [redlist.length > 1];
          if (cons.every(con=>con)) {
            const kuji = Math.floor(Math.random() * 2);
            o.log.description+="\n〔"+redlist.length+"人"+redlist.map(cc=>tools.emj(cc)).join("")+"〕「"+songlist[redlist.length-2][kuji]+"」\n"+details[redlist.length-2].split("〕")[1];
            const redlistids = redlist.map(cc=>cc.id);
            o.cards = i.cards;
            i.cards.forEach((cc, index)=>{
              const newcard=JSON.parse(JSON.stringify(cc));
              if(redlist.length>=3) newcard.rarity+=(redlist.length==5)?2:1;
              if(redlistids.some(id=>cc.id.includes(id))) newcard.basicadd+=10;
              o.cards[index] = newcard;
            });
            if (redlist.length == 3) {
              const coinadd = 555;
              o.coinadd = coinadd;
              o.log.notes = "🪙" + coinadd + "c";
              o.log.fxtype.push("coinadd");
            } else if (redlist.length >= 4) {
              const coinmul = 5;
              o.coinmul = coinmul;
              o.log.notes = "🪙" + coinmul + "倍";
              o.log.fxtype.push("coinmul");
            };
            o.log.fxtype.push("before", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'ひじかた祭', phase:['前'], f:(i)=>
    {const refraindetail = '〔リフレイン〕全生徒カードの通常計算による得点を5p増加させる。';
     const outline = {title:           '咆哮のクライマックス',
                      description:     '中央に近ければ近いほど高い確率で、全生徒カードの通常計算による得点を5p増加させる。末尾にいる場合は1度だけリフレインする。',
                      detail:          '確率はちょうど中央を50%として1つ離れるごとに20%ずつ下がっていき、5%で低下が止まる。偶数枚である場合は中央2枚が40%となる。確率加算は低下が止まった後に適用される。',
                      eventdescription:'《イベント》エンジョイpを2個追加獲得する。',
                      possibility:['prob','editcard','changecount']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const refrain = i.prefields.some(pf=>pf.type=="effect"&&pf.title==outline.title&&pf.special=='refrain');
               const cindex = i.cards.length/2-0.5;
               const prob = Math.abs(i.index-cindex)*20;
               const cons = [(refrain||Math.floor(Math.random()*100)<50-(prob>=5?prob:5)+i.c.probadd)];
               if(cons.every(con=>con)){o.cards=i.cards;
                                        o.cards.forEach((cc,index)=>{
                                          const newcard=JSON.parse(JSON.stringify(cc));
                                          newcard.basicadd+=5;
                                          o.cards[index]=newcard;
                                        });
                                        if(refrain) o.log.description=refraindetail;
                                        else if(i.index==i.cards.length-1){
                                          o.log.special='refrain';
                                          o.count--;
                                          o.log.fxtype.push('changecount');
                                        }
                                        else o.log.fxtype.push('prob');
                                        o.log.fxtype.push('before','editcard');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=2; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "びぜんお",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "舌根濡れ濡れ大車輪",
        description:
          "先頭にいるとき、生徒カードの名前の文字数の分だけ加点する。Lvに応じて文字数への掛け算の値が上がる。",
        detail:
          "Lvが上がるごとに1倍から0.5ずつ倍率が上昇し、Lv.MAX(5)時点で3倍になる。小数点以下切捨。括弧部分などは数えない。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index == 0];
          if (cons.every((con) => con)) {
            const l = i.cards
              .map((cc) => cc.name.split("(")[0])
              .join("")
              .replace(/＿/g, "").length;
            const add = Math.floor(l * (0.5 + 0.5 * i.c.collected));
            o.log.add = add;
            o.log.notes = l + "文字 " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "びぜんお",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "なんでそうなった？",
        description:
          "末尾にいるときオーメン算を行い、結果を点数として加算する。",
        detail:
          "生徒・教師双方を計算対象とし、オイラー数×(((sin(身長合計(rad))×年齢合計)の絶対値の平方根-レアリティ合計)の絶対値の2乗+(自身の先頭からの位置番号-2)×(66-かな起こしフルネーム文字数合計))÷円周率×cos(学年合計×66(rad))+魔法のオーメン定数(6)pを加算する。小数点以下切捨。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index == i.cards.length - 1];
          if (cons.every((con) => con)) {
            const heights = [...i.cards, ...i.Tcards]
              .filter((cc) => cc.cm)
              .map((cc) => cc.cm)
              .reduce((a, b) => a + b);
            const ages = [...i.cards, ...i.Tcards]
              .filter((cc) => cc.age)
              .map((cc) => cc.age)
              .reduce((a, b) => a + b);
            const rarities = [...i.cards, ...i.Tcards]
              .map((cc) => cc.rarity)
              .reduce((a, b) => a + b);
            const kanas = [...i.cards, ...i.Tcards]
              .map((cc) => cc.kana.length)
              .reduce((a, b) => a + b);
            const grades = [...i.cards, ...i.Tcards]
              .filter((cc) => cc.grade.match(/\d/))
              .map((cc) => Number(cc.grade))
              .reduce((a, b) => a + b);
            const add = Math.floor(
              ((Math.E *
                (Math.abs(
                  Math.sqrt(Math.abs(Math.sin(heights) * ages)) - rarities
                ) **
                  2 +
                  (i.index - 2) * (66 - kanas))) /
                Math.PI) *
                Math.cos(grades * 66) +
                6
            );
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "びぜんお事",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "コイツ！ コイツコイツ！",
        description:
          "自身以外に(事件簿)とつく生徒カードがあるとき、66%の確率で生徒カードが6枚になるまで未出の緑寮の生徒カードをあることないこと言いながら連れてくる。",
        detail: "緑寮の生徒カードをじゅうぶんに持っていない場合は発動しない。",
        eventdescription: "《イベント》証拠品をランダムで-3～6個追加獲得する。",
        possibility:['prob','addcard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.cards.length < 6,
            i.allcards.filter((ac) => ac.dorm == "緑寮").length >= 6,
            i.cards.some(
              (cc) => cc.id !== i.c.id && cc.eventid && cc.eventid == "MYSTERY"
            ),
            Math.floor(Math.random() * 100) < 66 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = JSON.parse(JSON.stringify(i.cards));
            for (let j = i.cards.length; j < 6; j++) {
              const choices = i.allcards.filter(
                (chr) =>
                  chr.dorm == "緑寮" &&
                  o.cards.every(
                    (cc) => cc.id.slice(0, 4) !== chr.id.slice(0, 4)
                  )
              );
              const newcard =
                choices[Math.floor(Math.random() * choices.length)];
              o.cards[j] = exports.getnature(newcard);
            }
            o.log.description +=
              "\n追加：" +
              o.cards
                .slice(i.cards.length)
                .map((cc) => tools.emj(cc))
                .join("");
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(Math.random() * 10) - 3;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
            }
            o.log.fxtype.push("before", "prob", "addcard", "random", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'ひだりゆ聖', phase:['前'], f:(i)=>
    {const outline = {title:           '大きなくつした',
                      description:     '20～4時であるとき、ランダムな生徒カードの1つ下にプレゼントを置き、対象生徒にプラス作用を与える。',
                      detail:          'プラス作用は〔確率加算(%)50加算〕〔レアリティ3上昇〕〔通常計算10p加算〕からランダムで決定される。\nプレゼントは寮室情報・XMASタグ・対象生徒へのプラス縁を持つ。',
                      eventdescription:'《イベント》🧦ソックスを1個追加獲得する。',
                      possibility:['editcard','addcard','random']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const Hour = i.date.getHours();
          if((20<=Hour||Hour<4)&&i.cards.length){
            o.cards = i.cards;
            const targetindex = Math.floor(Math.random()*i.cards.length);
            const newcard = JSON.parse(JSON.stringify(i.cards[targetindex]));
            o.log.description+='\n対象：'+tools.emj(newcard);
            
            const d = Math.floor(Math.random()*3);
            if      (d==0){ newcard.probadd+=50; o.log.description+='〔確率加算(%)50加算〕'; }
            else if (d==1){ newcard.rarity+=3; o.log.description+='〔レアリティ3上昇〕'; }
            else if (d==2){ newcard.basicadd+=10; o.log.description+='〔通常計算10p加算〕'; }
            
            const present = JSON.parse(JSON.stringify(exports.additional.find(adc=>adc.id=='ぷれぜん')));
            present.roomid = newcard.roomid;
            present.relation = newcard.nickname.split('/')[0] + ' - ';
            
            o.cards[targetindex] = newcard;
            o.cards.splice(targetindex+1, 0, present);
            
            o.log.fxtype.push('before','editcard','addcard','random');
            //▼イベントアイテム
            if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                 const iadd=1; o.log.eventitems.add=iadd;
                                                 o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji:'');
                                                 o.log.fxtype.push('event');};
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  { id:'ひびきこ', phase:['前'], f:(i)=>
    { const outline = {title:           '反響定位',
                       description:     '生徒カードの枚数が5未満であるとき、自身以外の生徒カードの確率加算の値(%)を(3-自身からの距離)×30加算。',
                       detail:          '',
                       possibility:['editcard']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          //▼条件
          if(i.cards.length<5){
            o.cards=i.cards;
            const results = [];
            o.cards.forEach((cc,index)=>{
              if(index!==i.index&&Math.abs(index-i.index)<3){
                const newcard=JSON.parse(JSON.stringify(cc));
                const probadd = (3-Math.abs(index-i.index))*30;
                newcard.probadd+=probadd;
                o.cards[index]=newcard;
                results.push(tools.emj(newcard)+probadd);
              };
            });
            o.log.description+='\n対象：'+results.join(' ');
            o.log.fxtype.push('before','editcard');
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "ひびきこ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "擦り傷低空飛行",
        description:
          "ここまでの合計点が50p以下のとき、1000÷全生徒カードのレアリティの合計分を加点する。",
        detail: "小数点以下切捨。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.totalP <= 50];
          if (cons.every((con) => con)) {
            const allrarity = i.cards
              .map((cc) => cc.rarity)
              .reduce((a, b) => a + b);
            const add = Math.floor((1000 / allrarity) | 0);
            o.log.add = add;
            o.log.notes = "1000÷" + allrarity + " → " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ひびきこ体",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "間隙を駆ける",
        description:
          "ここまでの合計点の最初の数字と最後の数字の差が1以下であるとき、間を走り抜けて(10-挟まれた数字)×10p加算。挟まれた数字が無い場合は0とする。",
        detail:
          "1桁であるとき、または挟まれた数字が10以上であるときは発動しない。",
        eventdescription:
          "《イベント》40p獲得につき1個ずつ白組pを追加獲得する。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const num = String(Math.abs(i.totalP));
          const centernum =
            num.length >= 3
              ? Number(num.slice(1, -1)) //3桁以上のときは間を
              : num.length == 2
              ? 0
              : undefined; //2桁のときは0を　1桁のときは死を
          const cons = [
            Math.abs(Number(num.slice(0, 1)) - Number(num.slice(-1))) <= 1,
            centernum < 10,
          ];
          if (cons.every((con) => con)) {
            const add = (10 - centernum) * 10;
            o.log.add = add;
            o.log.notes = "(10-" + centernum + ")×10 = " + add + "p";
            o.log.description += "\n発動前の合計点：" + i.totalP + "p";
            o.log.fxtype.push("after", "add");
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 1;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(add / 40);
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id:'ひらがあ', phase:['前'], f:(i)=>
    { const cons  = [{id:'EN', num:0, des:'端にいるとき'},
			               {id:'CL', num:1, des:'自身と同じ部活に所属する生徒がいるとき'},
			               {id:'DY', num:2, des:'6～18時であるとき'},
			               {id:'ZE', num:3, des:'ここまでの発動効果数が0のとき'},
			               {id:'PR', num:4, des:'50%の確率で'}];
      const conc  = {id:'CH', num:9, des:'少し歩いたあと'};
      const rfxs  = [{id:'4N', num:0, interest:true,  des:'関心事に関係するカード枚数×40p加算'},
					           {id:'3R', num:1, interest:true,  des:'関心事に関係するカードのレアリティを1～3上げる'},
					           {id:'1M', num:2, interest:true,  des:'関心事について考え込みながら1つ後ろへ歩いていってしまう'}, //末尾へ。既に末尾である場合は消えてしまう 5→×
				             {id:'0L', num:3, interest:false, des:'関心事を問わず±(Lv×10)pの範囲でランダムに加算する'}];
      const interests = [{id:'M', name:'major', jp:'科目', value:''},
                         {id:'C', name:'club', jp:'部活動', value:''},
                         {id:'E', name:'emoji', jp:'絵文字', value:''},
                         {id:'T', name:'tag', jp:'タグ', value:''}];
      const outline = {title:           '新効果', //新効果(型番：EN2R-T)
                       description:     '効果内容がランダムに決定される。',
                       detail:          '条件'+cons.length+'+1種、内容'+rfxs.length+'種、関心事'+interests.length+'種の組み合わせで内容が生成される。',
                       possibility:['addplus','addminus','editcard','sortcard','delcard','leaving','random','prob']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; //o.log.description=outline.description;
          //■枠設置
          let titlenumber = '';
          let interest = undefined;
          let comment = ''; //セリフ
		      const commenttails = ['の気分っす','が気になるっす……','に興味あるっす','が面白いんすよ！','っすよ！ 絶対！','じゃないっすか？ 実際','っすよ～～！！'];
          let fxdescription = ''; //説明
          let targetdes = ''; //対象とか編集とか移動とかさ
          let activate = false; //発動したんか！？
			
          //■前回検知
          const pres = i.prefields.filter(pf=>pf.type=='effect'&&pf.title.includes(outline.title)&&pf.special).reverse();
          const pre = (0<pres.length) ? pres[0] : undefined;
          
          //■効果文
          const con = (pre&&pre.title.includes('1M')) ? conc : cons[Math.floor(Math.random()*cons.length)];
          const rfx = rfxs[Math.floor(Math.random()*rfxs.length)];
		      fxdescription = '〔'+con.des+'〕、〔'+rfx.des+'〕。'; console.log('説明：'+fxdescription);
          
          //■関心事
          if(pre){ //関心事生成済ならそれを取得してセリフは空欄
            interest = interests.find(itr=>itr.name==pre.special.split('/')[0]);
            interest.value = pre.special.split('/')[1]; console.log('関心取得：'+interest.name+'、'+interest.value);
          }
		      else if(rfx.interest){ //新規に関心事生成・セリフ作成
			      interest = interests[Math.floor(Math.random()*interests.length)];
            if(interest.name=='emoji'){
              const listnames = Object.keys(exports.emjlist);
              let listname = '';
              let listOK = false;
              do{
                listname = listnames.splice(Math.floor(Math.random()*listnames.length), 1)[0];
                if(i.cards.some(cc=>cc.emoji&&exports.emjlist[listname].includes(cc.emoji))) listOK = true;
              }
              while(!listOK&&0<listnames.length);
              interest.value = listname;
            }
            else{
              const separator = (interest.name=='club') ? ' ' : '/' ;
              const valuelist = i.cards.map(cc=>cc[interest.name]).filter(cc=>cc).join(separator).split(separator);
              interest.value = valuelist[Math.floor(Math.random()*valuelist.length)];
            };
            const valuefooter = (interest.name=='major') ? '科'
                              : (interest.name=='club')  ? '部'
                              : (interest.name=='emoji') ? '系絵文字'
                              : '';
            comment = '「今は__'+interest.value+valuefooter+'__'+commenttails[Math.floor(Math.random()*commenttails.length)]+'」\n';  console.log('関心生成：'+interest.name+'、'+interest.value);
          };
          
          //■適用
          const newcons = [(con.num==0&&(i.index==0||i.index==i.cards.length-1)),
                           (con.num==1&&i.cards.some(cc=>cc.id!==i.c.id&&cc.club&&cc.club.split(' ').some(club=>i.c.club.includes(club)))),
                           (con.num==2&&(6<=i.date.getHours()&&i.date.getHours()<18)),
                           (con.num==3&&(!i.prefields.some(pf=>pf.type=='effect'))),
                           (con.num==4&&Math.random()*100<50+i.c.probadd),
                           (con.num==9)];
          if(newcons.some(newcon=>newcon)){
            if(rfx.num==0){
              const targets = i.cards.filter(cc=>(interest.name=='major')?(cc.major==interest.value)
                                                :(interest.name=='club') ?(cc.club.split(' ').includes(interest.value))
                                                :(interest.name=='emoji')?(exports.emjlist[interest.value].includes(tools.emj(cc)))
                                                :(interest.name=='tag')  ?(cc.tag.split('/').includes(interest.value)):false);
              if(0<targets.length){
                activate = true;
                const add=targets.length*40; o.log.add=add; o.log.notes=targets.length+'×40 = '+add+'p';
                targetdes='\n対象：'+targets.map(t=>tools.emj(t)).join('');
                o.log.fxtype.push('add');
              };
            }
            else if(rfx.num==1){
              o.cards=i.cards;
              const allresults = [];
              i.cards.forEach((cc,index)=>{
                if( (interest.name=='major'&&cc.major==interest.value)
                  ||(interest.name=='club'&&cc.club.split(' ').includes(interest.value))
                  ||(interest.name=='emoji'&&exports.emjlist[interest.value].includes(tools.emj(cc)))
                  ||(interest.name=='tag'&&cc.tag.split('/').includes(interest.value)) ){
                  const newcard = JSON.parse(JSON.stringify(cc));
                  newcard.rarity = tools.rarityadd(newcard,Math.floor(Math.random()*3)+1);
                  o.cards[index]=newcard;
                  allresults.push(tools.emj(newcard)+cc.rarity+'→'+newcard.rarity);
                }
              })
              if(0<allresults.length){
                activate = true;
                targetdes = '\n対象：'+allresults.join('　');
                o.log.fxtype.push('editcard');
              };
            }
            else if(rfx.num==2){
              o.cards=i.cards.filter(cc=>cc.id!==i.c.id);
              o.count--;
              activate = true;
              targetdes='\n移動：'+(i.index+1)+'枚目 → ';
              if(i.index<i.cards.length-1){
                o.cards.splice(i.index+1,0,i.c);
                targetdes+=(i.index+2)+'枚目';
                o.log.fxtype.push('sortcard');
              }
              else{
                o.log.notes='(去)';
                targetdes+='？';
                o.log.fxtype.push('delcard','leaving');
              };
            }
            else if(rfx.num==3){
              const add=Math.floor(Math.random()*(i.c.collected*20+1))-(i.c.collected*10);
              activate = true;
              o.log.add=add; o.log.notes=add+'p';
              o.log.fxtype.push('add');
            };
          };

          //■結果記録
          if(activate){
            o.log.title = outline.title + '(型番：' + con.id + rfx.id + '-' + (interest ? interest.id : 'N') + ')';
            o.log.description = comment + fxdescription + targetdes;
            if(interest) o.log.special = interest.name + '/' + interest.value;
            o.log.fxtype.push('before','random');
            if(con.num==4) o.log.fxtype.push('prob');
            return o;
          }
          else return;
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  { id:'ふじわら', phase:['前'], f:(i)=>
    { const outline = {title:           '共鳴',
                       description:     '本人の効果によって場から去った生徒がいたときその生徒を連れ戻し、クラスメイトとともに末尾に追加する。',
                       detail:          '対象の生徒が既に場にいる場合や、出せるクラスメイトを持っていない場合は発動しない。',
                       possibility:['addcard','random']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const targetfxs = i.prefields.filter(pf => pf.type=='effect' && pf.fxtype.includes('leaving') );
          const targets = (0<targetfxs.length)
					    ? targetfxs.map(pf => pf.fxowner).filter(t => t.genre=='stTm' && t.grade && t.major && !i.cards.some(cc => cc.id.includes(t.id.slice(0, 4))))
					    : undefined;
          //▼条件
          if(targets && 0<targets.length){
			o.cards = i.cards;
			const allresults = [];
			
			targets.forEach(target=>{
			  const choices = i.allcards.filter(ac => ac.genre=='stTm' && ac.grade && ac.major
												  	  && ac.grade==target.grade && ac.major==target.major
												  	  && !i.cards.some(cc=>cc.id.includes(ac.id.slice(0,4))));
			  if(0<choices.length){
				o.cards.push(target);
				const classmate = exports.getnature(choices[Math.floor(Math.random() * choices.length)]);
				o.cards.push(classmate);
				allresults.push(tools.emj(target)+tools.emj(classmate));
			  }
			});
			
			if(0<allresults.length){
			  o.log.description+='\n追加：'+allresults.join(' ');
              o.log.fxtype.push('before','addcard','random');
			  return o;
			}
			else return;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "ふらんち",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "となりの花",
        description:
          "Lvが自身以上である生徒カードと隣接したとき50%の確率で、自身のレアリティを1下げ、隣接カードのレアリティを2上げる。",
        detail: "レアリティは0未満にはならない。",
        possibility:['prob','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cB = i.cards[i.index - 1];
          const cA = i.cards[i.index + 1];
          const cons = [
            (cB && cB.collected >= i.c.collected) ||
              (cA && cA.collected >= i.c.collected),
            Math.floor(Math.random() * 100) < 50 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            let cs = [];
            o.cards = i.cards.map((cc, index) => {
              if (
                Math.abs(index - i.index) <= 1 &&
                cc.collected >= i.c.collected
              ) {
                const newcard = JSON.parse(JSON.stringify(cc));
                newcard.rarity =
                  index == i.index
                    ? cc.rarity > 0
                      ? cc.rarity - 1
                      : 0
                    : cc.rarity + 2;
                cs.push(tools.emj(cc) + cc.rarity + "→" + newcard.rarity);
                return newcard;
              } else return cc;
            });
            o.log.description += "\n対象：" + cs.join(" ");
            o.log.fxtype.push("before", "prob", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id:'ふらんち', phase:['前'], f:(i)=>
    { const outline = {title:           '連れて行ってあげる',
                       description:     '先頭にいて自身以外の流星部の生徒カードがあるときその枚数をXとし、後続の全生徒カードに対して1人ずつ飛び方を教えようと試みる。成功するとレアリティをX上げるが、X×15%の確率で失敗しいなくなってしまう。',
                       detail:          '確率加算はいなくならない方向に働く。',
                       possibility:['random','editcard','delcard']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const targets = i.cards.filter(cc=>cc.id!==i.c.id&&cc.club.includes('流星'));
          if(i.index==0&&targets.length){
            o.cards = [];
            const results = [];
            i.cards.forEach((cc,index)=>{
              if(index==0){
                o.cards.push(cc);
              }
              else if(Math.random()*100<targets.length*15-i.c.probadd){ //いなくなる
                results.push(tools.emj(cc)+'❌');
              }
              else{
                const newcard=JSON.parse(JSON.stringify(cc));
                newcard.rarity=tools.rarityadd(newcard, targets.length);
                o.cards.push(newcard);
                results.push(tools.emj(cc)+cc.rarity+'→'+newcard.rarity);
              };
            });
            o.log.description+='\n流星：'+targets.map(cc=>tools.emj(cc)).join('')+'\n対象：'+results.join('　');
            o.log.fxtype.push('before','random');
            if(o.cards.length<i.cards.length) o.log.fxtype.push('delcard');
            if(1<o.cards.length) o.log.fxtype.push('editcard');
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "ふるつき",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "面白いものを見た",
        description:
          "確率発動の効果が発動した数×40p加算し、該当効果を最新3件まで記憶する。発動数が0である場合、記憶した効果の持ち主がその場にいればその効果数×80p加算。",
        detail: "",
        possibility:['prob','addplus','keep']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const probfxs = i.prefields.filter(
            (pf) => pf.type == "effect" && pf.fxtype.includes("prob")
          );
          //const keeps = (i.keeps.length) ? i.keeps.find(k=>k.includes(outline.title)) : undefined;
          const keeps = i.keeps.find((k) => k.includes(outline.title));
          const keepfxs = keeps
            ? keeps
                .split("/")[1]
                .split("＠＠")
                .map((k) => {
                  return { id: k.split("：")[0], title: k.split("：")[1] };
                })
            : [];
          if (probfxs.length > 0) {
            const add = probfxs.length * 40;
            o.keeptext = [
              ...new Set(
                keepfxs
                  .map((k) => k.id + "：" + k.title)
                  .concat(probfxs.map((pf) => pf.fxowner.id + "：" + pf.title))
              ),
            ]
              .slice(-3)
              .join("＠＠");
            o.log.description +=
              "\n対象・記憶：" +
              probfxs.map((pf) => tools.emj(pf.fxowner) + pf.title).join("・");
            o.log.add = add;
            o.log.notes = probfxs.length + "×40 = " + add + "p";
            o.log.fxtype.push("after", "add", "keep");
            return o;
          } else if (keepfxs.length > 0) {
            const targets = keepfxs.filter((k) =>
              i.cards.some((cc) => cc.id == k.id)
            );
            if (targets.length > 0) {
              const add = targets.length * 80;
              o.log.description +=
                "\n想起：" +
                targets
                  .map(
                    (k) =>
                      tools.emj(i.characters.find((cc) => cc.id == k.id)) +
                      k.title
                  )
                  .join("・");
              o.log.add = add;
              o.log.notes = targets.length + "×80 = " + add + "p";
              o.log.fxtype.push("after", "add");
              return o;
            } else return;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id:"ぺぺぽも",
    phase:["後"],
    f:(i)=>{
      const outline={
        title: "esplosione!",
        description:"炎・熱系絵文字を持つカードがあるとき、爆発を起こし50p加算、10%の確率で大爆発となり100p加算。水・氷系絵文字を持つカードがあるとき、湿気て不発となり50p減算。",
        detail:"どちらもあるとき、効果は発動しない。大爆発は確率加算の影響を受けない。ジータがいる場合問答無用で大爆発する。",
        possibility:['addplus','addminus','random']
      };
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const zita = i.cards.some(cc=>cc.id.match(/^じーたぶ/));
          const fire = [...i.cards, ...i.Tcards].some(cc=>cc.emoji&&exports.emjlist["炎・熱"].includes(cc.emoji));
          const water = [...i.cards, ...i.Tcards].some(cc=>cc.emoji&&exports.emjlist["水・氷"].includes(cc.emoji));
          const cons = [zita || fire !== water];
          if (cons.every((con) => con)) {
            const add =zita?100
                      :water?-50
                      :Math.floor(Math.random()*100)<10?100:50;
            if(zita) o.log.description="ジータがいるとき問答無用で大爆発し100p加算。";
            o.log.add=add;
            o.log.notes=(zita?'大爆発 ':water?'不発 ':'') + add + "p";
            o.log.fxtype.push("after", "add", "random");
            return o;
          } else return;
        }catch(error){return { error: true, title: outline.title, message: error.message };}
      } else return outline;
    },
  },
  {
    id: "まだらめ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "付き合ってられるか",
        description:
          "自身からのプラス縁がある生徒カードがないとき、10%の確率でゲームのイベントがあるため帰る。",
        detail: "",
        possibility:['prob','delcard','leaving']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const relationlog = tools.checkrelation(i.c, i.cards, i.characters);
          const cons = [
            !(relationlog.length&&relationlog.filter(rl=>rl.plus).length),
            Math.floor(Math.random() * 100) < 10 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards.filter((cc) => cc.id !== i.c.id);
            o.count--;
            o.log.fxtype.push("before", "prob", "delcard", "leaving");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id: 'まだらめ', phase: ['前'], f:(i) =>
    { const tagdetail = '現在のカードで通常計算を行った場合の得点見込みが50p以下である場合、さらに全生徒カードに効率厨タグを付与する。'
      const outline = {title: '効率厨',
                       description: 'Lv×2%の確率で、省エネルギーで高い効率を目指す。全生徒カードを効果無効🚫にし、通常計算の得点を10p増加させる。',
                       detail: tagdetail+'\nまた、この効果が発動した場合、教師カードはドローされない。',
                       possibility:['prob', 'editcard', 'noteacher']};
      if(i){
        try{
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const exists = i.cards.some(cc=>cc.id.match(/^まだらめ/));
          if(exists && Math.floor(Math.random() * 100) < i.c.collected*2 + i.c.probadd){
            const bco = penta.pentabasiccalc({data:data,pata:i.pata,tools:tools,
                                              spcards:exports.spcards(data.characters.filter(c=>c.genre=='stTm'||c.genre=='tcTm'||c.genre=='otTm')),
                                              tm:i.tm,test:i.test,cards:i.cards,Tcards:i.Tcards,
                                              totalP:0,bonusC:0,emjrepeat:1,resultlist:[]});
            const bcoless = (bco.totalP<=50);
            if(bcoless) o.log.description += '\n'+tagdetail;
            o.cards = i.cards.map(cc=>{
              const newcard = JSON.parse(JSON.stringify(cc));
              newcard.frozen = true;
              newcard.basicadd += 10;
              if(bcoless && !newcard.tag.includes('効率厨')){
                const tags = newcard.tag.split('/');
                tags.push('効率厨');
                newcard.tag = tags.join('/');
              };
              return newcard;
            });
            o.noteacher = true;
            o.log.fxtype.push('before', 'prob', 'editcard', 'noteacher');
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "まだらめ体",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ま、やればできるけどね",
        description:
          "1%の確率で300p減算。魔装科のカードがある場合、減算する確率は倍になるが0.1%の確率で加算に転じる。自身が含まれるプラス縁がある場合、減算は行わず1%の確率で加算を行う。",
        detail: "確率加算は減算時のみ適用され、倍化は適用後に行われる。",
        eventdescription:
          "《イベント》白組pを、減算だった場合-10個、加算だった場合10個追加獲得。",
        possibility:['prob','addplus','addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const prob = 1 + i.c.probadd;
          const enchant = [...i.cards, ...i.Tcards].some(
            (cc) => cc.id!==i.c.id&&cc.major == "魔装"
          );
          const plusrel = i.relationlog.some(
            (rl) => rl.ids.includes(i.c.id) && rl.plus
          );
          const calctype = plusrel
            ? Math.floor(Math.random() * 100) < 1
              ? "加算"
              : undefined
            : enchant
            ? Math.floor(Math.random() * 100) < prob * 2
              ? "減算"
              : Math.floor(Math.random() * 1000) < 1
              ? "加算"
              : undefined
            : Math.floor(Math.random() * 100) < prob
            ? "減算"
            : undefined;
          if(enchant) o.log.fxtype.push("random");
          if (calctype) {
            const add = calctype == "加算" ? 300 : -300;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add", "prob");
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 1;
              o.log.eventitems.index = iindex;
              const iadd = calctype == "加算" ? 10 : -10;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "まちだま",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "まち針",
        description:
          "現在のカードで通常計算を行った場合の得点見込みが50p以下であるとき、仮留めとして全ての生徒カードと相互にプラス縁を発生させる。",
        detail: "",
        possibility:['editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const bco = penta.pentabasiccalc({
            data: data,
            pata: i.pata,
            tools: tools,
            spcards: exports.spcards(
              data.characters.filter(
                (c) => c.genre == "stTm" || c.genre == "tcTm" || c.genre == "otTm"
              )
            ),
            tm: i.tm,
            test:i.test,
            cards: i.cards,
            Tcards: i.Tcards,
            totalP: 0,
            bonusC: 0,
            emjrepeat: 1,
            resultlist: [],
          });
          const cons = [bco.totalP <= 50];
          if (cons.every((con) => con)) { console.log('OK');
            o.cards = i.cards;
            o.Tcards = i.Tcards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            const newrelation = newcard.relation.split(" - ");
            const newrelationplus = newrelation[0].split("/");
            const rlids = newcard.relation
              .split(" - ")[0]
              .split("/")
              .map(
                (r) =>
                  i.characters.find((ccc) =>
                    ccc.nickname.split(/\/|\s-\s/).includes(r)
                  ).id
              ); //id一覧
                                          console.log('OK2');
            o.cards.forEach((cc, index) => {
              if (cc.id !== i.c.id) {
                console.log("・・・" + cc.id);
                if (!rlids.some((id) => cc.id.includes(id))) {
                  newrelationplus.push(cc.nickname.split(/\/|\s-\s/)[0]);
                  console.log("・・・・マチに追加");
                } //マチのプラス縁に追加する
                const Onewcard = JSON.parse(JSON.stringify(cc));
                const Onewrelation = Onewcard.relation.split(" - ");
                const Onewrelationplus = Onewrelation[0].split("/");
                const Orlids = Onewcard.relation
                  .split(" - ")[0]
                  .split("/")
                  .map((r) => {
                    const t = i.characters.find((ccc) =>
                      ccc.nickname.split(/\/|\s-\s/).includes(r)
                    );
                    return t ? t.id : "none";
                  }); //id一覧
                if (!Orlids.some((id) => i.c.id.includes(id))) {
                  Onewrelationplus.push(i.c.nickname.split(/\/|\s-\s/)[0]);
                  console.log("・・・・" + cc.id + "に追加");
                } //相手のプラス縁に追加する
                Onewrelation[0] = Onewrelationplus.join("/");
                Onewcard.relation =
                  Onewrelation[0] +
                  " - " +
                  (Onewrelation[1] ? Onewrelation[1] : "");
                o.cards[index] = Onewcard;
              }
            });

            newrelation[0] = newrelationplus.join("/");
            newcard.relation =
              newrelation[0] + " - " + (newrelation[1] ? newrelation[1] : "");
            o.cards[i.index] = newcard;
            o.log.notes = "(見込" + bco.totalP + "p)";
            o.log.fxtype.push("before", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'まつなが', phase:['前'], f:(i)=>
    { const details = [ '〔予告〕場の全生徒カードのクラスを記憶し、試験の予告を行う。',
                        '〔実施〕記憶しているクラスの生徒が出たとき試験を実施する。(8-レアリティ)×10%の確率で合格し、レアリティを2上げる。' ];
      const outline = {title:           '定期試験',
                       description:     '〔予告〕と〔実施〕の2つのプロセスを持つ。',
                       detail:          details.join('\n')+'\n大理は確率計算ではレアリティを5上げて扱う。カードとして所有していないものは試験の対象としない。\n試験が実施されるたびに記憶したクラスはリセットされ、実施されないかぎり新たな予告は行われない。',
                       possibility:['editcard','random','keep']};
      if(i){
        try{
          if(i.cards.length){
            const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
            const keeps = i.keeps.find(k=>k.includes(outline.title));
            let   keepclasses = (keeps&&keeps.split('/')[1]!=='なし') ? keeps.split('/')[1].split(' ') : [];
            let active = false;
            
            if(keepclasses.length==0){ //予告
              const classes = [...new Set(i.cards.filter(cc=>cc.major&&cc.grade).map(cc=>cc.major+cc.grade+'年'))];
              o.log.description+='\n'+details[0]+'\n記憶：'+classes.map(cl=>'🚪'+cl).join(' ');
              o.keeptext=classes.join(' ');
              active = true;
            }
            else{ //実施
              const results = [];
              const targetids = []; //合格者リスト
              keepclasses.forEach(cl=>{
                //クラスの生徒がいるか見る
                const targets = i.cards.filter(cc=>cc.major&&cc.grade&&cc.major+cc.grade+'年'==cl&&i.characters.some(chr=>chr.id==cc.id.slice(0,4)));
                if(targets.length){
                  //いる
                  const classresults = [];
                  targets.forEach(cc=>{
                    //ひとりずつ試験を行う
                    const prob = ( 8 - (cc.id.includes('だいりお') ? cc.rarity+5 : cc.rarity ) ) * 10;
                    if(Math.random()*100<prob){
                      targetids.push(cc.id);
                      classresults.push(tools.emj(cc)+'⭕'+cc.rarity+'→'+(cc.rarity+2));
                    }
                    else classresults.push(tools.emj(cc)+'❌');
                  });
                  results.push(cl+'：'+classresults.join(' '));
                };
              });
              if(results.length){
                o.cards=i.cards;
                i.cards.forEach((cc,index)=>{
                  if(targetids.includes(cc.id)){
                    const newcard=JSON.parse(JSON.stringify(cc));
                    newcard.rarity=tools.rarityadd(cc,2);
                    o.cards[index]=newcard;
                  };
                });
                o.log.description+='\n'+details[1]+'\n'+results.join('\n');
                o.keeptext='なし';
                active = true;
                if(targetids.length) o.log.fxtype.push('editcard');
                o.log.fxtype.push('random');
              };
            };
            if(active){
              o.log.fxtype.push('before','keep');
              return o;
            }else return;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};
      }
      else return outline;
    }
  },
  {id:'まつなが聖', phase:['前'], f:(i)=>
    {const outline = {title:           'これが大人のクリスマス',
                      description:     'Lv×2個のスイーツを用意し、ランダムな数だけみんなで食べる。全カードの通常計算による得点をスイーツを食べた数×3p増加させるが、 食べた数が半分を超えると気持ち悪くなって5p減少へ転じる。',
                      detail:          '教師カードのグループ乗算の値は対象としない。',
                      eventdescription:'《イベント》🍭キャンディを1個追加獲得する。',
                      possibility:['random','editcard']};
     if(i){
       try{
         const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
         const cakes = ['🧁','🍰','🍦','🎂'];
         const cakenum = i.c.collected*2;
         const eaten = Math.floor(Math.random()*cakenum+1);
         const over = (cakenum/2 < eaten);
         const increase = over ? -5 : eaten*3;
         o.log.description += '\n'+Array(cakenum).fill().map((e,index)=>(index<eaten)?(cakenum/2-1<index)?'🤢':'✨':cakes[Math.floor(Math.random()*cakes.length)]).join('');
         o.log.notes = cakenum+'個中'+eaten+'個 → '+Math.abs(increase)+'p'+(over?'減少':'増加');
         o.cards=i.cards;
         o.Tcards=i.Tcards;
         [o.cards, o.Tcards].forEach(cards=>{
           cards.forEach((cc,index)=>{
             const newcard=JSON.parse(JSON.stringify(cc));
             newcard.basicadd+=increase;
             cards[index]=newcard;
           });
         });
         o.log.fxtype.push('before','random','editcard');
         if(i.event&&i.event.id==i.c.eventid){
           const iindex=2; o.log.eventitems.index=iindex;
           const iadd=1; o.log.eventitems.add=iadd;
           o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji:'');
           o.log.fxtype.push('event');
         };
         return o;
       }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "まりあう",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "血道魔術",
        description:
          "全カードの名前をひらがなで書き起こした際の「ち」の個数×20p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const chi = (
            [...i.cards, ...i.Tcards]
              .map((cc) => cc.kana)
              .join("")
              .match(/ち/g) || []
          ).length;
          const cons = [chi > 0];
          if (cons.every((con) => con)) {
            const add = chi * 20;
            o.log.add = add;
            o.log.notes = "ち×" + chi + " → " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id:'まりあう菓', phase:['前'], f:(i)=>
    { const outline = {title:           '出血大サービス',
                       description:     '怪物系絵文字を持つカードがあるとき、その枚数×自身のレアリティ×25p加算し、レアリティを使い果たす。',
                       detail:          '',
                       eventdescription:'《イベント》怪物系絵文字を持つカードの枚数分魔法の生地を追加獲得する。',
                       possibility:['addplus','editcard']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const targets = [...i.cards, ...i.Tcards].filter(cc=>cc.emoji&&exports.emjlist['怪物'].includes(cc.emoji));
          if(targets.length && 0<i.c.rarity){
            const add = targets.length*i.c.rarity*25;
            o.log.add = add;
            o.log.notes = targets.length+'×'+i.c.rarity+'×25 = '+add+'p';
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            newcard.rarity = 0;
            o.cards[i.index] = newcard;
            o.log.description+='\n対象：'+targets.map(cc=>tools.emj(cc)).join('');
            o.log.fxtype.push('before','add','editcard');
            //▼イベントアイテム
            if(i.event&&i.event.id==i.c.eventid){
              const iindex=0; o.log.eventitems.index=iindex;
              const iadd=targets.length; o.log.eventitems.add=iadd;
              o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
              o.log.fxtype.push('event');
            };
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  { id:'まるがれ', phase:['後'], f:(i)=>
    { const outline = {title:           '秘密主義',
                       description:     'ここまでのリザルト表示・効果説明に含まれる自身の絵文字の数が4以上であるとき、その数×Lv×3p減算。',
                       detail:          '',
                       possibility:['addminus']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const targettext = i.resultlist.join('') + i.prefields.map(pf => pf.name + (pf.description ? pf.description : pf.value)).join('');
          const targetemoji = tools.emj(i.c);
          const emjnum = (targetemoji!=='　') ? (targettext.match(new RegExp(targetemoji, "g")) || []).length : 0;
          if(4<=emjnum){
            const add=(-1)*emjnum*i.c.collected*3;
            o.log.add=add;
            o.log.notes='-'+emjnum+'×'+i.c.collected+'×3 = '+add+'p';
            o.log.fxtype.push('after','add');
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "まるがれ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "本日のスクープ！",
        description:
          "レアリティが3以上の生徒カードがあるとき、本当か嘘かわからないような記事📖を書く。",
        detail:
          "レアリティ×10p(舞花がいない場合20%の確率でマイナス)のエピソードを生成する。自身は対象とせず、確率加算の影響は受けない。",
        possibility:['random','episodeadd']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetcards = i.cards.filter(
            (cc) =>
              cc.id !== i.c.id &&
              cc.rarity >= 3 &&
              !exports.additional.some((a) => a.id == cc.id)
          );
          const cons = [targetcards.length > 0];
          if (cons.every((con) => con)) {
            o.log.description +=
              "\n対象：" + targetcards.map((t) => tools.emj(t)).join("");
            const title1 =
              "衝撃発言 /暴露！ /危険な/電撃！ /汚れた/疑惑のスクープ /告発！ /大魔王/最悪の/素敵な素敵な/ついに捉えた！？ /希望溢れる/忘れるな！ /THE・/偽・/右肩上がり？ ///".split(
                "/"
              );
            const title2 =
              "神話、止まらない/特集 本人をよく知る人物に直撃！/の素顔/の憂鬱/の帰り道/の後ろ暗い過去/の恐るべき事実/の秘密/の逆襲/を許すな！/の怪人脈/の黒い噂/、禁断の愛？/の裏切り/に気を付けろ！/の過ち5選/の不協和音/の陰謀に迫る/の赤っ恥エピソード3選/に近付いてはいけない/徹底解剖/、一刀両断/、小さな奇跡/、迷子を助ける？/、迷子になる/、驚きの点数/はふたりいる！？/のほんとうの評価とは/の功績/の知られざる優しさ/という人///".split(
                "/"
              );
            targetcards.forEach((t) => {
              const ep = {
                f: (j) => {
                  const member = [t.id];
                  const outline = {
                    title:
                      "東魔新聞(" +
                      (i.realDate.getMonth() + 1) +
                      "月" +
                      i.realDate.getDate() +
                      "日発行)",
                    type: "型",
                    member: member,
                    score:
                      t.rarity *
                      (i.cards.some((cc) => cc.id.match(/^どうざん/)) ||
                      Math.random() < 0.8
                        ? 10
                        : -10),
                    description:
                      title1[Math.floor(Math.random() * title1.length)] +
                      data.characters.find((dc) => dc.id == t.id.slice(0, 4))
                        .name +
                      title2[Math.floor(Math.random() * title2.length)],
                  };
                  try {
                    const cons = [
                      member.every((c) => j.cards.some((cc) => cc.id == c)),
                    ];
                    if (cons.every((con) => con)) {
                      const o = JSON.parse(JSON.stringify(epoutput));
                      o.log.title = outline.title;
                      o.log.notes = "(🖊️)";
                      o.log.description =
                        "```" +
                        outline.description +
                        "```" +
                        outline.type +
                        "：" +
                        outline.member
                          .map((id) =>
                            tools.emj(j.cards.find((cc) => cc.id.includes(id)))
                          )
                          .join("") +
                        " " +
                        outline.score +
                        "p";
                      o.log.add = outline.score;
                      o.log.eptype.push("pattern");
                      return o;
                    } else return;
                  } catch (error) {
                    return {
                      error: true,
                      title: outline.title,
                      message: error.message,
                    };
                  }
                },
              };
              o.episodeadd.push(ep);
            });
            o.log.fxtype.push("after", "random", "episodeadd");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "みしぇる",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "Popnreal",
        description:
          "イベント生徒カードがあるとき20%の確率で発動し、イベント生徒カードの絵文字を全て🎈に変えてその数×15p加算し姿を消す。2～4時は必ず発動する。\n発動した場合、教師カードはドローされない。",
        detail: "",
        possibility:['prob','editcard','delcard','leaving','addplus','noteacher']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.cards.filter((cc) => cc.eventid && cc.eventid !== "SECRET")
              .length > 0,
            (2 <= i.date.getHours() && i.date.getHours() < 4) ||
              Math.floor(Math.random() * 100) < 20 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            let add = 0;
            o.cards = i.cards.filter((cc) => cc.id !== i.c.id);
            for (let j = 0; j < o.cards.length; j++) {
              if (o.cards[j].eventid && o.cards[j].eventid !== "SECRET") {
                const newcard = JSON.parse(JSON.stringify(o.cards[j]));
                newcard.emoji = "🎈";
                o.cards[j] = newcard;
                add += 15;
              }
            }
            o.noteacher = true;
            o.count--;
            o.log.add = add;
            o.log.notes =
              (2 <= i.date.getHours() && i.date.getHours() < 4
                ? "2-4時 "
                : "") +
              add +
              "p";
            o.log.fxtype.push(
              "before",
              "prob",
              "editcard",
              "delcard",
              "leaving",
              "add",
              "noteacher"
            );
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'みしぇる祭', phase:['前'], f:(i)=>
    {const outline = {title:           '星空の小旅行',
                      description:     '6～18時であるとき、12時間時を進める。',
                      detail:          '',
                      possibility:['changedate']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [(6<=i.date.getHours()&&i.date.getHours()<18)];
               if(cons.every(con=>con)){o.date=i.date; o.date.setHours(i.date.getHours()+12);
                                        o.log.fxtype.push('before','changedate'); return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'みしぇる祭', phase:['前'], f:(i)=>
    {const tgdetail = 'エピソード📖『😈告げ口』がMy効果に設定されている場合この効果は失敗するが、代わりに口止め料として100p加算してくれる。'
     const outline = {title:           'ストリート流フェスティバル！',
                      description:     '2～4時であるとき姿を消し、全生徒カードにFESTIVALタグを付与したうえで絵文字をランダムなものに変える。',
                      detail:          tgdetail,
                      eventdescription:'《イベント》エンジョイpを2個追加獲得する。',
                      possibility:['delcard','leaving','editcard','addplus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [(2<=i.date.getHours()&&i.date.getHours()<4)];
               if(cons.every(con=>con)){if(i.myfx=='tg'){
                                          o.log.description+='\n'+tgdetail;
                                          const add=100; o.log.add=add; o.log.fxtype.push('add');
                                          o.log.notes='口止め料'+add+'p';
                                        }
                                        else{
                                          o.cards=i.cards.filter(cc=>cc.id!==i.c.id);
                                          o.count--;
                                          const emojis = i.characters.filter(chr => !chr.eventid && chr.emoji && ![...i.cards,...i.Tcards].some(cc=>cc.id.slice(0,4)==chr.id)).map(chr => chr.emoji);
                                          o.cards.forEach((cc,index)=>{
                                            const newcard=JSON.parse(JSON.stringify(cc));
                                            if(!newcard.tag.includes('FESTIVAL')){
                                              const tags=newcard.tag.split('/');
                                              tags.push('FESTIVAL');
                                              newcard.tag=tags.join('/');
                                            };
                                            newcard.emoji=emojis[Math.floor(Math.random()*emojis.length)];
                                            o.cards[index]=newcard;
                                          });
                                          o.log.fxtype.push('delcard','leaving','editcard');
                                        };
                                        o.log.fxtype.push('before');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=2; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "みつきゆ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "実験といきましょうか",
        description:
          "現在のカードで通常計算を行った場合の得点見込みが50p以下であるとき、後続の生徒カードを1度だけ全て引き直し相乗効果を期待する。",
        detail: "",
        possibility:['changecard','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const bco = penta.pentabasiccalc({
            data: data,
            pata: i.pata,
            tools: tools,
            spcards: exports.spcards(
              data.characters.filter(
                (c) => c.genre == "stTm" || c.genre == "tcTm" || c.genre == "otTm"
              )
            ),
            tm: i.tm,
            test:i.test,
            cards: i.cards,
            Tcards: i.Tcards,
            totalP: 0,
            bonusC: 0,
            emjrepeat: 1,
            resultlist: [],
          });
          const cons = [i.index < i.cards.length - 1, bco.totalP <= 50];
          if (cons.every((con) => con)) {
            o.cards = JSON.parse(JSON.stringify(i.cards));
            for (let j = i.index + 1; j < i.cards.length; j++) {
              const choices = i.allcards.filter(
                (chr) =>
                  i.cards[j].id.slice(0, 4) !== chr.id.slice(0, 4) &&
                  o.cards
                    .slice(0, j)
                    .every((cc) => cc.id.slice(0, 4) !== chr.id.slice(0, 4))
              );
              const newcard =
                choices[Math.floor(Math.random() * choices.length)];
              o.cards[j] = exports.getnature(newcard);
            }
            o.log.description +=
              "\n入替：" +
              i.cards
                .slice(i.index + 1)
                .map((cc) => tools.emj(cc))
                .join("") +
              " → " +
              o.cards
                .slice(i.index + 1)
                .map((cc) => tools.emj(cc))
                .join("");
            o.log.notes = "(見込" + bco.totalP + "p)";
            o.log.fxtype.push("before", "changecard", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "みつきゆ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "あー！！！ 毒がー！！！",
        description: "10%の確率でここまでの合計点に-1を掛ける。",
        detail: "合計点が負のときには正になる。",
        possibility:['prob','mulminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [Math.floor(Math.random() * 100) < 10 + i.c.probadd];
          if (cons.every((con) => con)) {
            const mul = -1;
            o.log.mul = mul;
            o.log.notes =
              i.totalP + "p × " + mul + " = " + i.totalP * mul + "p";
            o.log.fxtype.push("after", "prob", "mul");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "みつばえ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "かわいくしてあげる！",
        description:
          "自身以外の「女性」と一部のカードを勝手にかわいくしてレアリティを1上げる。かわいくなったぶん×15p加算。",
        detail: "プロフィールとして「女」を持っているカードに加え、次のカードが対象に含まれる。🦩🍐",
        possibility:['editcard','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const spidlist = ["あんとに","なしだき"];
          const cons = [
            [...i.cards, ...i.Tcards].some(
              cc => cc.id !== i.c.id && ( cc.sex == "女" || spidlist.some(id=>cc.id.includes(id)) )
            ),
          ];
          if (cons.every((con) => con)) {
            const targetcardsets = [];
            let targetsnum = 0;
            const raritylist = [];
            if (i.cards.length > 0) {
              o.cards = i.cards;
              targetcardsets.push("cards");
            }
            if (i.Tcards.length > 0) {
              o.Tcards = i.Tcards;
              targetcardsets.push("Tcards");
            }
            targetcardsets.forEach((cards) => {
              i[cards].forEach((cc, index) => {
                if (cc.id !== i.c.id && ( cc.sex == "女" || spidlist.some(id=>cc.id.includes(id)) ) ) {
                  const newcard = JSON.parse(JSON.stringify(cc));
                  newcard.rarity++;
                  o[cards][index] = newcard;
                  targetsnum++;
                  raritylist.push(
                    tools.emj(cc) + cc.rarity + "→" + newcard.rarity
                  );
                }
              });
            });
            const add = targetsnum * 15;
            o.log.description += "\n対象：" + raritylist.join(" ");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "editcard", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "みよしき",
    phase: ["前"],
    f: (i) => {
      const o0 =
        "「⭐お星さまに願いを！」\n全ての生徒カードが持つ、発動条件・内容に確率を含む効果の確率(%)を15加算。";
      const o1 =
        "「🪙お財布ハッピ～」\n最終合計点からの獲得コインを2倍にする。コインのマイナスは発生しない。";
      const o2 = "「🌼シンプルにラッキー！」\n20p～30pをランダムで加算する。";
      const o3 = "「✂️悪縁ぷつん」\nマイナス縁を消す。";
      const outline = {
        title: "おまじない",
        description: "50%の確率でささやかなおまじないを1つかける。",
        detail: o0 + "\n" + o1 + "\n" + o2 + "\n" + o3,
        possibility:['prob','random','editcard','coinmul','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [Math.floor(Math.random() * 100) < 50 + i.c.probadd];
          if (cons.every((con) => con)) {
            const dice = Math.floor(Math.random() * 4);
            if (dice == 0) {
              o.log.description += "\n" + o0;
              o.log.fxtype.push("editcard");
              o.cards = i.cards.map((cc) => {
                const newcard = JSON.parse(JSON.stringify(cc));
                newcard.probadd += 15;
                return newcard;
              });
            } else if (dice == 1) {
              o.log.description += "\n" + o1;
              o.log.fxtype.push("coinmul");
              o.coinmul = 2;
            } else if (dice == 2) {
              o.log.description += "\n" + o2;
              o.log.fxtype.push("add");
              const add = Math.floor(Math.random() * 11) + 20;
              o.log.add = add;
              o.log.notes = add + "p";
            } else if (dice == 3) {
              o.log.description += "\n" + o3;
              o.log.fxtype.push("editcard");
              o.cards = i.cards.map((cc) => {
                const newcard = JSON.parse(JSON.stringify(cc));
                newcard.relation = cc.relation.split(" - ")[0] + " - ";
                return newcard;
              });
            }
            o.log.fxtype.push("before", "prob", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "みよしき",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ラブレター",
        description:
          "全カードのかな表記に「あ・い」が込められた数が1を超えたとき個数×8p加算。自身からのプラス縁が1つでもあれば2.5倍。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const ai = (
            [...i.cards, ...i.Tcards]
              .map((cc) => cc.kana)
              .join("")
              .match(/あ|い|ぁ|ぃ/g) || []
          ).length;
          const cons = [ai > 1];
          if (cons.every((con) => con)) {
            const add =
              ai *
              8 *
              (i.resultlist.find(
                (r) =>
                  r.includes("縁") &&
                  r
                    .split(/：|　/)
                    .find(
                      (en) => en.includes(i.c.emoji + "→") && !en.includes("-")
                    )
              )
                ? 2.5
                : 1);
            o.log.add = add;
            o.log.notes = "あ・い×" + ai + " → " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "みよしき甘",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "みんな食べり～！",
        description:
          "自身以外の3年生にチョコを配り、人数×7p加算。相手へプラス縁がない場合プラス縁を発生させ、元々プラス縁のある相手が含まれていた場合は加算する値を3倍にする。",
        detail: "",
        eventdescription:
          "《イベント》自身以外の3年生の人数分チョコを追加獲得する。",
        possibility:['editcard','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const gradethree = i.cards.filter(
            (cc) => cc.id !== i.c.id && cc.grade == 3
          );
          const cons = [gradethree.length > 0];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            const newrelation = newcard.relation.split(" - ");
            const newrelationplus = newrelation[0].split("/");
            const rlids = newcard.relation
              .split(" - ")[0]
              .split("/")
              .map(
                (r) =>
                  i.characters.find((ccc) =>
                    ccc.nickname.split(/\/|\s-\s/).includes(r)
                  ).id
              );
            let addmul = 1;
            gradethree.forEach((cc) => {
              if (rlids.some((id) => cc.id.includes(id))) addmul = 3;
              else newrelationplus.push(cc.nickname.split(/\/|\s-\s/)[0]);
            });
            const add = gradethree.length * 7 * addmul;
            newrelation[0] = newrelationplus.join("/");
            newcard.relation =
              newrelation[0] + " - " + (newrelation[1] ? newrelation[1] : "");
            o.cards[i.index] = newcard;
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = gradethree.length;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "add", "editcard", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "むかひあ",
    phase: ["後"],
    f: (i) => {
      const seasons = [
        { name: "spring", start: 18, end: 6, detail: "春：18～6時" },
        { name: "summer", start: 19, end: 5, detail: "夏：19～5時" },
        { name: "autumn", start: 18, end: 6, detail: "秋：18～6時" },
        { name: "winter", start: 17, end: 7, detail: "冬：17～7時" },
      ];
      const outline = {
        title: "照らします！",
        description:
          "日が沈んでいそうな時間であるとき辺りを照らし、50%の確率で全カードレアリティ合計×5p加算。夏は必ず発動する。",
        detail: seasons.map((s) => s.detail).join("\n"),
        possibility:['prob','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const season = seasons.find((s) => s.name == i.season);
          const cons = [
            season.start <= i.date.getHours() || i.date.getHours() < season.end,
            Math.floor(Math.random() * 100) < 50 + i.c.probadd ||
              i.season == "summer",
          ];
          if (cons.every((con) => con)) {
            const add =
              [...i.cards, ...i.Tcards]
                .map((cc) => cc.rarity)
                .reduce((a, b) => a + b) * 5;
            o.log.description += "\n" + season.detail;
            o.log.add = add;
            o.log.notes = add + "p";
            if (season !== "summer") o.log.fxtype.push("prob");
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "むかひあ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "任せてください！",
        description:
          "1つ後ろの生徒に対して大口を叩き、対象のレアリティ×10pを加算または減算する。ここまでの合計点に応じてプラスになる確率が上昇する。",
        detail:
          "プラスになる確率は(ここまでの合計点/2)%。確率加算はプラス方向に働く。",
        possibility:['addplus','addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index < i.cards.length - 1];
          if (cons.every((con) => con)) {
            const target = i.cards[i.index + 1];
            const success =
              Math.floor(Math.random() * 100) < i.totalP / 2 + i.c.probadd;
            const add = target.rarity * (success ? 10 : -10);
            o.log.add = add;
            o.log.notes = tools.emj(target) + add + "p";
            o.log.description =
              "「" +
              (success
                ? "え！？　ほ、ほら！　やれましたよ！！"
                : "ああ……やっぱり私はひっくり返ったカブトムシ並みに何もできない女……") +
              "」\n" +
              o.log.description;
            o.log.fxtype.push("after", "random", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "むらさき",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "利き音",
        description:
          "ここまでに音楽タグを持つカードが発動した効果があるとき、最新3件まで記憶する。元々記憶していた効果が発動していた場合、その効果数×120p加算。",
        detail: "",
        possibility:['addplus','keep']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const musicfxs = i.prefields.filter(
            (pf) =>
              pf.type == "effect" && pf.fxowner.tag.split("/").includes("音楽")
          );
          const keeps = i.keeps.find((k) => k.includes(outline.title));
          const keepfxs = keeps
            ? keeps
                .split("/")[1]
                .split("＠＠")
                .map((k) => {
                  return { id: k.split("：")[0], title: k.split("：")[1] };
                })
            : [];
          if (musicfxs.length > 0) {
            const targetfxs = i.prefields.filter(
              (pf) =>
                pf.type == "effect" && keepfxs.some((k) => k.title == pf.title)
            );
            if (targetfxs.length > 0) {
              const add = targetfxs.length * 120;
              o.log.description +=
                "\n想起：" +
                targetfxs
                  .map((pf) => tools.emj(pf.fxowner) + pf.title)
                  .join("・");
              o.log.add = add;
              o.log.notes = targetfxs.length + "×120 = " + add + "p";
              o.log.fxtype.push("add");
            }
            const newmusicfxs = [
              ...new Set(
                musicfxs.map((fx) => fx.fxowner.id + "：" + fx.title).reverse()
              ),
            ];
            o.log.description +=
              "\n記憶：" +
              newmusicfxs
                .map(
                  (fx) =>
                    tools.emj(
                      i.prefields.find(
                        (pf) => pf.type == "effect" && pf.fxowner.id == fx.split("：")[0]
                      ).fxowner
                    ) + fx.split("：")[1]
                )
                .join("・");
            o.keeptext = [
              ...new Set(
                newmusicfxs.concat(keepfxs.map((k) => k.id + "：" + k.title))
              ),
            ]
              .slice(0, 3)
              .join("＠＠");
            o.log.fxtype.push("after", "keep");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "むらさき",
    phase: ["後"],
    f: (i) => {
      const details = [
        "〔前方〕プラス値を出している得点加算の効果があるとき、それらの合計値×(自身のLv/10)p加算。",
        "〔後方〕マイナス値を出している得点加算の効果があるとき、それらの合計の絶対値×(自身のLv/5)p加算。",
      ];
      const outline = {
        title: "てるてる坊主",
        description: "自身の位置に応じて効果名と内容が変化する。",
        detail:
          "以下それぞれ中央を除く。小数点以下切捨。\n" +
          details.join("\n") +
          "効果名が【あめあめ坊主】に変化する。\n夏は獲得pが1.5倍になる。\n【利き音】による得点加算があった場合は発動しない。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const front = i.index < Math.floor(i.cards.length / 2);
          const back = i.index >= i.cards.length / 2;
          const targetfxs = front
            ? i.prefields.filter(
                (pf) =>
                  pf.type == "effect" &&
                  pf.fxtype &&
                  pf.fxtype.includes("add") &&
                  pf.add > 0
              )
            : back
            ? i.prefields.filter(
                (pf) =>
                  pf.type == "effect" &&
                  pf.fxtype &&
                  pf.fxtype.includes("add") &&
                  pf.add < 0
              )
            : [];
          const cons = [
            !i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == "利き音" && pf.add > 0
            ),
            targetfxs.length > 0,
          ];
          if (cons.every((con) => con)) {
            const fxsaddsum = Math.abs(
              targetfxs.map((pf) => pf.add).reduce((a, b) => a + b)
            );
            const add = Math.floor(
              ((fxsaddsum * i.c.collected) / (front ? 10 : 5)) *
                (i.season == "summer" ? 1.5 : 1)
            );
            o.log.add = add;
            o.log.notes =
              fxsaddsum +
              "×(" +
              i.c.collected +
              "/" +
              (front ? 10 : 5) +
              ")" +
              (i.season == "summer" ? "×1.5" : "") +
              " → " +
              add +
              "p";
            o.log.description +=
              "\n" +
              details[front ? 0 : 1] +
              (i.season == "summer" ? "\n夏は獲得pが1.5倍になる。" : "");
            if (back) o.log.title = "あめあめ坊主";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "めろばた",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "エナジードレイン",
        description:
          "50%の確率で自身のレアリティが1不足し、隣接したカードから1ずつレアリティを吸収する。",
        detail:
          "レアリティが0のカードから吸収することはできない。確率加算は発動しない方向に働く。",
        possibility:['prob','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [Math.floor(Math.random() * 100) < 50 - i.c.probadd];
          if (cons.every((con) => con)) {
            let cs = [];
            let getrarity = 0;
            o.cards = i.cards.map((cc, index) => {
              if (Math.abs(index - i.index) == 1) {
                const newcard = JSON.parse(JSON.stringify(cc));
                if (cc.rarity > 0) {
                  newcard.rarity--;
                  getrarity++;
                }
                cs.push(tools.emj(cc) + cc.rarity + "→" + newcard.rarity);
                return newcard;
              } else return cc;
            });
            const newcardself = JSON.parse(JSON.stringify(i.c));
            newcardself.rarity = i.c.rarity - 1 + getrarity;
            o.cards[i.index] = newcardself;
            cs.unshift(tools.emj(i.c) + i.c.rarity + "→" + (i.c.rarity - 1));
            if (getrarity > 0)
              cs.push(
                tools.emj(i.c) + (i.c.rarity - 1) + "→" + newcardself.rarity
              );
            o.log.description += "\n対象：" + cs.join(" ");
            o.log.fxtype.push("before", "prob", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "めろばた",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "あの2人って……！",
        description: "自身を含まない全ての縁の数×15p加算。",
        detail: "効果によって書き加えられた一部の縁は対象としない。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const rlnum = i.relationlog.filter(
            (rl) => !rl.ids.includes(i.c.id)
          ).length;
          const cons = [rlnum > 0];
          if (cons.every((con) => con)) {
            const add = rlnum * 15;
            //const resultindex=i.resultlist.findIndex(r=>r.includes('縁'));
            //i.resultlist[resultindex] = i.resultlist[resultindex].split('：').map((r,i)=>(i)?r.split(/\s|　/).map(rr=>(rr.match(/🍈|✨|⚪/))?rr:rr+'💕' ).join('　'):r).join('：');
            o.log.add = add;
            o.log.notes = rlnum + "×15 = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "めろばた雪",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "雪うさぎできたよ！",
        description: "雪うさぎの出来に応じた加点がされる。",
        detail:
          "成功(+40p)となる確率は半々で、成功のうち1/3の確率で大成功(+80p)となる。自身が含まれる縁があった場合、必ず成功以上の結果になる。",
        eventdescription:
          "《イベント》雪うさぎの出来に応じて0～4個の雪玉を獲得する。",
        possibility:['addplus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [true];
          if (cons.every((con) => con)) {
            const com = [
              "うーん、しっぱい……",
              "いいかんじ……！",
              "じょうずにできたよ……！",
            ];
            const res = ["失敗", "成功", "大成功"];
            const usais = i.resultlist.find(
              (r) => r.includes("縁") && r.includes("🍈")
            )
              ? [1, 1, 2]
              : [0, 0, 0, 1, 1, 2];
            const usai = usais[Math.floor(Math.random() * usais.length)];
            const add = usai * 40;
            o.log.description = "「" + com[usai] + "」\n" + o.log.description;
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 1;
              o.log.eventitems.index = iindex;
              const iadd = usai * 2;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
            }
            o.log.add = add;
            o.log.notes = res[usai] + " " + add + "p";
            o.log.fxtype.push("after", "random", "add", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id:'やなぎき', phase:['前'], f:(i)=>
    { const outline = {title:           '兄ちゃんも一緒だ！',
                       description:     '末尾にいるとき、20%の確率で惣右衛門を連れてくる。',
                       detail:          '惣右衛門を持っていない場合は発動しない。',
                       possibility:['prob','addcard']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          if(i.index==i.cards.length-1 && Math.random()*100<20+i.c.probadd && !i.cards.some(cc=>cc.id.match(/^やなぎそ/))){
            const choices = i.allcards.filter(cc=>cc.id.match(/^やなぎそ/));
            if(choices.length){
              o.cards=i.cards;
              const newcard = exports.getnature(choices[Math.floor(Math.random()*choices.length)]);
              o.cards.push(newcard);
              o.log.description+='\n追加：'+tools.emj(newcard);
              o.log.fxtype.push('before','prob','addcard');
              return o;
            };
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  { id:'やなぎき', phase:['後'], f:(i)=>
    { const outline = {title:           'ファイアシュート',
                       description:     'ここまでのリザルト表示・効果説明に含まれる炎・熱系絵文字の数だけシュートを試み、1回につきLv×5%の確率で30p加算。',
                       detail:          '',
                       possibility:['prob','addplus']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const targettext = i.resultlist.join('') + i.prefields.map(pf => pf.name + (pf.description ? pf.description : pf.value)).join('');
          const targetemoji = exports.emjlist['炎・熱'];
          const firesnum = ( targettext.match(new RegExp(targetemoji.join('|'), 'g')) || [] ).length;
          console.log('firesnum : '+firesnum);
          if(0<firesnum){
            const results = [];
            let successnum = 0;
            for(let j=0; j<firesnum; j++){
              const success = Math.floor((Math.random() * 100) < i.c.collected * 5 + i.c.probadd);
              if(success){
                results.push('💥');
                successnum++;
              }
              else results.push('❌');
            };
            if(0<successnum){
              o.log.description += '\n結果：' + results.join('');
              const add = successnum * 30;
              o.log.add = add;
              o.log.notes = add + 'p';
              o.log.fxtype.push('after', 'prob', 'add');
              return o;
            }
            else return;
          }
          else return;
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "やなぎき踊",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "エスコート",
        description:
          "隣接した生徒カードが持つ、発動条件・内容に確率を含む効果の確率(%)を50加算。",
        detail: "細かい適用範囲は効果ごとに異なる。",
        eventdescription: "《イベント》ダンスpをランダムで0～1個追加獲得する。",
        possibility:['editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [true];
          if (cons.every((con) => con)) {
            o.cards = i.cards.map((cc, index) => {
              if (Math.abs(i.index - index) == 1) {
                const newcard = JSON.parse(JSON.stringify(cc));
                newcard.probadd += 50;
                return newcard;
              } else return cc;
            });
            o.log.description +=
              "\n対象：" +
              i.cards
                .filter((cc, index) => Math.abs(i.index - index) == 1)
                .map((cc) => tools.emj(cc))
                .join("");
            o.log.fxtype.push("before", "editcard");

            const newcard = JSON.parse(JSON.stringify(i.c));
            o.cards[i.index] = newcard;
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(Math.random() * 2);
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "やなぎそ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "保健委員長なので！",
        description: "ここまでの合計点が0p未満のとき、0を掛ける。",
        detail: "",
        possibility:['mulzero']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.totalP < 0];
          if (cons.every((con) => con)) {
            const mul = 0;
            o.log.mul = mul;
            o.log.notes =
              i.totalP + "p × " + mul + " = " + i.totalP * mul + "p";
            o.log.fxtype.push("after", "mul");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'やなぎそ正', phase:['後'], f:(i)=>
    { const outline ={title:           '保健委員長のお年玉',
                      description:     '保健委員長から1000～5000cのお年玉を渡される。',
                      detail:          '',
                      eventdescription:'《イベント》まぎかるたのさいころの出目を1加算(最大6)。',
                      possibility:['coinadd','random']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title;
          o.log.description='「'+(i.message.member?i.message.member.displayName:i.message.author.username)+'君っ！　これは僕からのお年玉だ！　保健委員長としてのね！　受け取ってくれたまえ！」';
          const coinadd = Math.floor(Math.random()*5+1)*1000;
          o.coinadd = coinadd;
          o.log.notes = '🪙'+coinadd+'c';
          o.log.fxtype.push('after','coinadd','random');
          if(i.event&&i.event.id==i.c.eventid) o.log.description+='\n'+outline.eventdescription;
          return o;
        }catch(error){return {error:true, title:outline.title, message:error.message}};
      }
      else return outline;
    }
  },
  {
    id: "やなせこ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ノートのすみっこ",
        description:
          "後ろのほうの席に座っていたとき、リザルト表示内の全てのキャラクター絵文字を隣に1つ描き足してしまう。",
        detail:
          "このカードが後半(中央を除く)に位置していたときに発動する。効果説明は対象としない。",
        possibility:['emjadd']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index >= i.cards.length / 2];
          if (cons.every((con) => con)) {
            o.emjadd = 1;
            o.log.fxtype.push("before", "emjadd");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "やなせこ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "空想ペインター",
        description:
          "前のほうにいるとき、今ここにいないカードの持つ絵文字をランダムでLv×4個ここに描く。",
        detail: "このカードが前半(中央を除く)に位置していたときに発動する。",
        possibility:['nothing','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index < Math.floor(i.cards.length / 2)];
          if (cons.every((con) => con)) {
            const emojis = [];
            const targets = i.characters
              .filter(
                (chr) =>
                  !chr.eventid &&
                  [...i.cards, ...i.Tcards].every(
                    (cc) => !cc.id.includes(chr.id)
                  ) &&
                  chr.emoji
              )
              .map((chr) => chr.emoji);
            for (let j = 0; j < i.c.collected * 4; j++)
              emojis.push(targets[Math.floor(Math.random() * targets.length)]);
            o.log.description += "\n" + emojis.join("");
            o.log.notes = i.c.collected + "×4 = " + i.c.collected * 4 + "個";
            o.log.fxtype.push("after", "random", "nothing");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'やなせこ祭', phase:['前'], f:(i)=>
    {const outline = {title:           'ウェルカムアーチ',
                      description:     '先頭にいるとき、自身以外に美術部かFESTIVALタグを持つ生徒カードがあれば必ず、そうでなければ20%の確率で全生徒カードの通常計算の得点を10p増加させる。',
                      detail:          '',
                      eventdescription:'《イベント》必ず発動する場合は2個、そうでなければ1個エンジョイpを追加獲得する。',
                      possibility:['prob','editcard']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const targetbool = i.cards.some(cc=>cc.id!==i.c.id&&(cc.club.includes('美術')||cc.tag.split('/').includes('FESTIVAL')));
               const cons = [(i.index==0),
                             (targetbool||(Math.floor(Math.random()*100)<20+i.c.probadd))];
               if(cons.every(con=>con)){o.cards=i.cards;
                                        o.cards.forEach((cc,index)=>{
                                          const newcard=JSON.parse(JSON.stringify(cc));
                                          newcard.basicadd+=10;
                                          o.cards[index]=newcard;
                                        });
                                        o.log.fxtype.push('before','prob','editcard');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=targetbool?2:1; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'やなせこ祭', phase:['前'], f:(i)=>
    {const outline = {title:           'うごく背景幕',
                      description:     '自身より前に出ている演劇部・軽音楽部の生徒カードの通常計算の得点を10p増加させる。',
                      detail:          '',
                      eventdescription:'《イベント》対象枚数分エンジョイpを追加獲得する。',
                      possibility:['editcard']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [(i.index>0),
                             (i.cards.some((cc,index)=>index<i.index&&(cc.club.includes('演劇')||cc.club.includes('軽音楽'))))];
               if(cons.every(con=>con)){o.cards=i.cards;
                                        const targets=[];
                                        o.cards.forEach((cc,index)=>{
                                          if(index<i.index&&(cc.club.includes('演劇')||cc.club.includes('軽音楽'))){
                                            const newcard=JSON.parse(JSON.stringify(cc));
                                            newcard.basicadd+=10;
                                            o.cards[index]=newcard;
                                            targets.push(tools.emj(newcard));
                                          };
                                        });
                                        o.log.description+='\n対象：'+targets.join('');
                                        o.log.fxtype.push('before','editcard');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=targets.length; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  { id:'やまだあ', phase:['前'], f:(i)=>
    { const outline = {title:           'ホイップ',
                       description:     'レアリティが元より下げられた生徒カードがあるとき全体にマッサージを行い、全生徒カードのレアリティを1上げる。',
                       detail:          '',
                       possibility:['editcard']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          //▼条件
          const tsubo = i.cards.some(cc => { const original=i.characters.concat(exports.additional).find(ccc => ccc.id == cc.id);
                                             return (cc.rarity < original.rarity) });
          if(tsubo){
            o.cards = i.cards;
            const results = [];
            i.cards.forEach((cc,index)=>{
              const newcard = JSON.parse(JSON.stringify(cc));
              newcard.rarity = tools.rarityadd(newcard, 1);
              o.cards[index] = newcard;
              results.push(tools.emj(cc) + cc.rarity + '→' + newcard.rarity);
            });
            o.log.fxtype.push('before','editcard');
            o.log.description += '\n対象：' + results.join(' ');
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
      else return outline; }
  },
  {
    id: "やまだあ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ショートニング",
        description:
          "3番目以降にいるとき先頭の生徒カードの背後まで迫り、横を通り過ぎた生徒カードのレアリティ合計×15÷先頭カードのレアリティ分を加算。",
        detail:
          "小数点以下切捨。先頭カードのレアリティが0である場合は1として計算する。",
        possibility:['sortcard','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index >= 2];
          if (cons.every((con) => con)) {
            const tA = i.cards[0];
            const tB = i.cards.slice(1, i.index);
            const tArarity = tA.rarity == 0 ? 1 : tA.rarity;
            const tBrarity = tB.map((t) => t.rarity).reduce((a, b) => a + b);
            const add = Math.floor((tBrarity * 15) / tArarity);
            o.log.description +=
              "\n先頭：" +
              tools.emj(tA) +
              "　通過：" +
              tB.map((t) => tools.emj(t)).join("");
            o.cards = i.cards;
            o.cards.splice(i.index, 1);
            o.cards.splice(1, 0, i.c);
            o.log.add = add;
            o.log.notes =
              tBrarity +
              "×15÷" +
              tArarity +
              (tA.rarity == 0 ? "※" : "") +
              " → " +
              add +
              "p";
            o.log.fxtype.push("before", "sortcard", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "やまだあ甘",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "シャトー・ド・ショコラ",
        description:
          "25%の確率、調理部か(チョコ)とつく生徒カードが他にあれば100%の確率で発動し、場のチョコ度に応じた規模のチョコの城を築く。",
        detail:
          "調理部か(チョコ)とつく生徒カードの枚数と発動効果数×15p加算。このカード・この効果も対象とする。",
        eventdescription:
          "《イベント》この効果による得点から10pごとに1個ずつチョコを追加獲得する。",
        possibility:['prob','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetsnum = i.cards.filter(
            (cc) =>
              cc.club.includes("調理") || (cc.eventid && cc.eventid == "CHOCO")
          ).length;
          const cons = [
            Math.floor(Math.random() * 100) <
              25 + i.c.probadd + (targetsnum - 1) * 100,
          ];
          if (cons.every((con) => con)) {
            const add =
              (targetsnum +
                i.prefields.filter(
                  (pf) =>
                    pf.type == "effect" &&
                    (pf.fxowner.club.includes("調理") ||
                      (pf.fxowner.eventid && pf.fxowner.eventid == "CHOCO"))
                ).length +
                1) *
              15;
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(add / 10);
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "prob", "add", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ようはな",
    phase: ["前", "後"],
    f: (i) => {
      const descriptionbefore =
        "〔前効果〕自身より前に決闘部の生徒カードが1枚だけあるとき、該当カードと試合を行う。攻撃を受け、試合相手のレアリティ×50p減算。";
      const descriptionafter =
        "〔後効果〕合計点が1以上であるとき、カウンターとして試合相手のレアリティ×70p加算。";
      const outline = {
        title: "一騎討ち",
        description:
          "〔前効果〕と〔後効果〕で連続した処理を行う。\n" +
          descriptionbefore +
          "\n" +
          descriptionafter,
        detail: "",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.fxtype.push("add");
          if (i.phase == "before") {
            o.log.description = descriptionbefore;
            const targets = i.cards.filter(
              (cc, index) =>
                cc.id !== i.c.id && index < i.index && cc.club.includes("決闘")
            );
            if (targets.length == 1) {
              const target = targets[0];
              const add = target.rarity * -50;
              o.log.description +=
                "\n相手：" + i.characters.find((cc) => cc.id == target.id).name;
              o.log.add = add;
              o.log.notes = "前：" + tools.emj(target) + add + "p";
              o.log.fxtype.push("before");
              return o;
            }
          }
          if (i.phase == "after") {
            o.log.description = descriptionafter;
            const targetfx = i.prefields.find(
              (pf) => pf.title == outline.title
            );
            const target = targetfx
              ? i.cards.find(
                  (cc) =>
                    cc.id ==
                    i.characters.find(
                      (ccc) =>
                        ccc.name == targetfx.description.split("相手：")[1]
                    ).id
                )
              : undefined;
            if (target && 1 <= i.totalP) {
              const add = target.rarity * 70;
              o.log.description +=
                "\n相手：" +
                i.characters.find((cc) => cc.id == target.id).name +
                " (発動前の合計点：" +
                i.totalP +
                "p)";
              o.log.add = add;
              o.log.notes = "後：" + tools.emj(target) + add + "p";
              o.log.fxtype.push("after");
              return o;
            }
          }
          return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  { id: "ようはな", phase: ["後"], f: (i) =>
    { const outline = {title:"楊式五行",
                       description:"全生徒カードの持つ寮情報(非寮を含む)が3種類以上出ているとき、種類数×自身のLv×4p加算。",
                       detail: "",
                       possibility:['addplus']};
      if (i) {
        try {
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const dorms = [...new Set(i.cards.map(c => c.dorm))].filter(d => d && !d.match(/未定|？/));
          const cons = [dorms.length >= 3];
          if (cons.every(con => con)) {
            const add = dorms.length * 4 * i.c.collected;
            o.log.description += "\n対象："+dorms.map(d=>d.slice(0, 1)+i.cards.filter(cc=>cc.dorm==d).map(cc=>tools.emj(cc)).join("")).join(" ");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) { return { error: true, title: outline.title, message: error.message }; }
      } else return outline;
    }
  },
  {
    id: "らいかか", phase: ["後"],
    f: (i) => {
      const outline = { title: "カミラ",
                        description: "ライカが左(先)、フーカが右(後)の構図で並んだときに25pずつ加算。逆であったときは100pずつ減算。",
                        detail: "対象となる「フーカ」にはイベントカードは含まれない。",
                        possibility:['addplus','addminus'] };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const raika = i.index;
          const fuka = i.cards.findIndex(cc => cc.id == "ふーかか");
          if(fuka!==-1 && Math.abs(raika-fuka)==1){
            const add = raika + 1 == fuka ? 25 : -100;
            o.log.description = raika+1 == fuka ? "ライカとフーカが正しい位置関係で隣り合った場合、"
                                                : "ライカとフーカが誤った位置関係で隣り合った場合、";
            o.log.add = add; o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        }catch(error){ return{error:true, title:outline.title, message:error.message }; }
      } else return outline;
    },
  },
  {
    id: "ふーかか",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "ランドルト",
        description:
          "ライカが左(先)、フーカが右(後)の構図で並んだときに25pずつ加算。逆であったときは100pずつ減算。",
        detail: "",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const fuka = i.index;
          const raika = i.cards.findIndex((cc) => cc.id.match(/^らいかか/));
          const cons = [raika !== -1, Math.abs(raika - fuka) == 1];
          if (cons.every((con) => con)) {
            const add = raika + 1 == fuka ? 25 : -100;
            o.log.description =
              raika + 1 == fuka
                ? "2人分で合わせて50p加算。"
                : "2人分で合わせて200p減算。";
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "らいかか",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "今はまだ",
        description:
          "フーカがいないとき、自身より後ろにあるフーカと共通点(身長誤差±2cm・誕生月・レアリティ)を1つ以上持つ生徒カードの数×25p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targets = i.cards.filter(
            (cc, index) =>
              index > i.index &&
              ((cc.cm && i.c.cm - 2 <= cc.cm && cc.cm <= i.c.cm + 2) ||
                (cc.birthday &&
                  cc.birthday.split("/")[0] == i.c.birthday.split("/")[0]) ||
                cc.rarity == i.c.rarity)
          );
          const cons = [
            !i.cards.some((cc) => cc.id.match(/^ふーかか/)),
            i.index < i.cards.length - 1,
            targets.length > 0,
          ];
          if (cons.every((con) => con)) {
            const add = targets.length * 25;
            o.log.description +=
              "\n対象：" + targets.map((cc) => tools.emj(cc)).join("");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ふーかか",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "私の明日",
        description:
          "ライカがいないとき、自身より前にある自身と共通点(科・年・部・委)を1つも持たない生徒カードの数×25p加算。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targets = i.cards.filter(
            (cc, index) =>
              index < i.index &&
              cc.major !== i.c.major &&
              cc.grade !== i.c.grade &&
              cc.club &&
              !cc.club.includes(i.c.club) &&
              cc.committee &&
              cc.committee !== i.c.committee
          );
          const cons = [
            !i.cards.some((cc) => cc.id.match(/^らいかか/)),
            i.index > 0,
            targets.length > 0,
          ];
          if (cons.every((con) => con)) {
            const add = targets.length * 25;
            o.log.description +=
              "\n対象：" + targets.map((cc) => tools.emj(cc)).join("");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'らいかか聖', phase:['後'], f:(i)=>
    {const outline = {title:           '燭火が映る',
                      description:     'ここまでのリザルト表示・効果説明に含まれる2で割り切れない数字の数を12で割った余り×12p加算。',
                      detail:          'トータル表示以上の部分は対象としない。',
                      eventdescription:'《イベント》🍭キャンディを1個追加獲得する。',
                      possibility:['addplus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const targettext =(i.resultlist.join('')+i.prefields.map(pf=>pf.name + (pf.description ? pf.description : pf.value)).join('')).replace(/<:.+:\d+>/g, '');
               const nums = (targettext.match(/[13579]/g)||[]).length;
               const add = (nums%12)*12;
               if(add!==0) {o.log.add=add;
                            o.log.notes=(nums%12)+(nums%12==nums?'':'('+nums+'個)')+'×12 = '+add+'p';
                            o.log.fxtype.push('after','add');
                            if(i.event&&i.event.id==i.c.eventid){
                              const iindex=2; o.log.eventitems.index=iindex;
                              const iadd=1; o.log.eventitems.add=iadd;
                              o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji:'');
                              o.log.fxtype.push('event');
                            };
                            return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "らいかか聖", phase: ["後"],
    f: (i) => {
      const outline = { title: "カミラ",
                        description: "ライカが左(先)、フーカが右(後)の構図で並んだときに25pずつ加算。逆であったときは100pずつ減算。",
                        detail: "対象となる「フーカ」にはイベントカードは含まれない。",
                        possibility:['addplus','addminus'] };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner = i.c; o.log.title = outline.title; o.log.description = outline.description;
          const raika = i.index;
          const fuka = i.cards.findIndex(cc => cc.id == "ふーかか");
          if(fuka!==-1 && Math.abs(raika-fuka)==1){
            const add = raika + 1 == fuka ? 25 : -100;
            o.log.description = raika+1 == fuka ? "ライカとフーカが正しい位置関係で隣り合った場合、"
                                                : "ライカとフーカが誤った位置関係で隣り合った場合、";
            o.log.add = add; o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        }catch(error){ return{error:true, title:outline.title, message:error.message }; }
      } else return outline;
    },
  },
  {id:'ふーかか山', phase:['後'], f:(i)=>
    {const outline = {title:           '篝火に視る',
                      description:     'ライカがいないとき、ここまでのリザルト表示・効果説明に含まれる0以外の2で割り切れる数字の数×Lv分を加算。',
                      detail:          'トータル表示以上の部分は対象としない。',
                      eventdescription:'《イベント》食材🥚を追加獲得する。',
                      possibility:['addplus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const targettext =(i.resultlist.join('')+i.prefields.map(pf=>pf.name + (pf.description ? pf.description : pf.value)).join('')).replace(/<:.+:\d+>/g, '');
               const nums = targettext.match(/[2468]/g);
               const cons = [nums&&nums.length>0,
                             !i.cards.some(cc=>cc.id.match(/^らいかか/))];
               if(cons.every(con=>con)){const add=nums.length*i.c.collected;
                                        o.log.add=add; o.log.notes=nums.length+'×'+i.c.collected+' = '+add+'p';
                                        o.log.fxtype.push('after','add');
                                        if(i.event&&i.event.id==i.c.eventid){o.log.special='curry';
                                                                             o.log.description+='\n'+outline.eventdescription; };
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "りこおっ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "オットー式分身術",
        description:
          "(生徒カード枚数+1)面ダイスを振り続け、5以上が出る限り自身のLv×6pを加点し続ける。",
        detail: "上限は20回。確率加算の影響は受けない。",
        possibility:['addplus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          let add = 0;
          const dicemax = i.cards.length + 1;
          const unit = i.c.collected * 6;
          const nums = [];
          for (let j = 0; j < 20; j++) {
            const d = Math.floor(Math.random() * dicemax) + 1;
            console.log("リコd : " + d);
            if (d >= 5) {
              add += unit;
              j == 19 ? nums.push(d + "(20回)") : nums.push(d);
            } else {
              nums.push("~~" + d + "~~(STOP)");
              break;
            }
          }
          const cons = [add > 0];
          if (cons.every((con) => con)) {
            o.log.description += "\n出目：" + nums.join(", ");
            o.log.add = add;
            o.log.notes = unit + " × " + add / unit + " = " + add + "p";
            o.log.fxtype.push("after", "random", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "りこおっ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "取ってきた！！",
        description:
          "末尾にいてここまでの合計点が正の2桁であるとき、急いで100の位を探してきて得点板にはめてくれる。",
        detail:
          "基本的には2️⃣を、3%の確率で5️⃣を拾ってくる。確率加算の影響は受けない。",
        possibility:['addplus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.index == i.cards.length - 1,
            i.totalP >= 10 && i.totalP <= 99,
          ];
          if (cons.every((con) => con)) {
            let add = 0;
            let nemj = "";
            if (Math.floor(Math.random() * 100) < 3) {
              add = 500;
              nemj = "5️⃣";
            } else {
              add = 200;
              nemj = "2️⃣";
            }
            o.log.add = add;
            o.log.notes = nemj + i.c.emoji + " " + add + "p";
            o.log.fxtype.push("after", "random", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "りちゃー",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "オットー式硬化術",
        description:
          "全身の筋肉をカッチカチに強化してみんなのテンションを上げ、ここまでのリザルト表示・発動効果(得点加算)にマイナスの値があったときなかったことにする。ナイスバルク。",
        detail: "得点乗算の効果は対象としない。トータル表示以上の部分は対象としない。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const resultminus = i.resultlist.some((r) => r.match(/-\d+p/));
          const fieldsminus =
            i.prefields.length > 0 &&
            i.prefields.some(
              (pf) =>
                pf.type == "effect" &&
                pf.fxtype &&
                pf.fxtype.includes("add") &&
                pf.add < 0
            );
          const cons = [resultminus || fieldsminus];
          if (cons.every((con) => con)) {
            let add = 0;
            if (resultminus)
              add +=
                i.resultlist
                  .join("")
                  .match(/-\d+p/g)
                  .map((m) => Number(m.slice(0, -1)))
                  .reduce((a, b) => a + b) * -1;
            if (fieldsminus)
              add +=
                i.prefields
                  .filter(
                    (pf) =>
                      pf.type == "effect" &&
                      pf.fxtype &&
                      pf.fxtype.includes("add") &&
                      pf.add < 0
                  )
                  .map((pf) => pf.add)
                  .reduce((a, b) => a + b) * -1;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'りゅうお山', phase:['前'], f:(i)=>
    {const outline = {title:           '戦場の歩き方',
                      description:     '(山)とつく生徒カードがあるとき、生き抜き方を指南する。対象カードのレアリティを(5-レアリティ)×8%の確率で1下げてしまうが、その後対象カードのレアリティ合計×30p加算。',
                      detail:          'レアリティは0未満にはならない。',
                      possibility:['editcard','addplus','random']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const targets = i.cards.filter(cc=>cc.eventid&&cc.eventid=='CAMP');
               const cons = [(targets.length>0)];
               if(cons.every(con=>con)){o.cards=i.cards;
                                        const cs=[];
                                        o.cards.forEach((cc,index)=>{
                                          if(cc.eventid&&cc.eventid=='CAMP'&&Math.floor(Math.random()*100)<(5-cc.rarity)*8){
                                            const newcard=JSON.parse(JSON.stringify(cc));
                                            if(cc.rarity>0){newcard.rarity--;
                                                            cs.push(tools.emj(cc)+'(⤵️)');
                                                           　o.log.fxtype.push('editcard');}
                                            else{           newcard.rarity=0;
                                                            cs.push(tools.emj(cc)); };
                                            o.cards[index]=newcard;
                                          }
                                          else if(cc.eventid&&cc.eventid=='CAMP'){
                                            cs.push(tools.emj(cc));
                                          };
                                        });
                                        o.log.description+='\n対象：'+cs.join('');
                                        const rarities=o.cards.filter(cc=>cc.eventid&&cc.eventid=='CAMP').map(cc=>cc.rarity).reduce((a,b)=>a+b);
                                        const add=rarities*30;
                                        o.log.add=add; o.log.notes=rarities+'×30 = '+add+'p'; o.log.fxtype.push('before','add','random'); return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "りんあっ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "焼肉屋の娘",
        description:
          "ここまでのリザルト表示・効果説明に含まれる動物系・植物系絵文字を全て🥢に変換し、その数×Lv分の加点を行う。さらに風系絵文字がある場合は1.5倍、水・氷系絵文字がある場合は0.5倍される。小数点以下切捨。",
        detail: "",
        possibility:['editcard','addplus','changeresultlist','changeprefields']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =
            i.resultlist.join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("");
          const RegAniPla = new RegExp(
            [...exports.emjlist["動物"], ...exports.emjlist["植物"]].join("|"),
            "g"
          );
          const aniplanum = (targettext.match(RegAniPla) || []).length;
          const cons = [aniplanum > 0];
          if (cons.every((con) => con)) {
            const firwin = targettext.match(
              new RegExp(
                [...exports.emjlist["炎・熱"], ...exports.emjlist["風"]].join(
                  "|"
                ),
                "g"
              )
            );
            const wat = targettext.match(
              new RegExp(exports.emjlist["水・氷"].join("|"), "g")
            );
            const add = Math.floor(
              aniplanum * i.c.collected * (firwin ? 1.5 : 1) * (wat ? 0.5 : 1)
            );
            o.resultlist = i.resultlist.map((rl) =>
              rl.replace(RegAniPla, "🥢")
            );
            o.prefields = i.prefields.map((pf) => {
              pf.name = pf.name.replace(RegAniPla, "🥢");
              if (pf.description)
                pf.description = pf.description.replace(RegAniPla, "🥢");
              else pf.value = pf.value.replace(RegAniPla, "🥢");
              return pf;
            });
            o.cards = i.cards;
            for (let j = 0; j < i.cards.length; j++) {
              const newcard = JSON.parse(JSON.stringify(i.cards[j]));
              if (newcard.emoji)
                newcard.emoji = newcard.emoji.replace(RegAniPla, "🥢");
              o.cards[j] = newcard;
            }
            o.Tcards = i.Tcards;
            for (let j = 0; j < i.Tcards.length; j++) {
              const newcard = JSON.parse(JSON.stringify(i.Tcards[j]));
              if (newcard.emoji)
                newcard.emoji = newcard.emoji.replace(RegAniPla, "🥢");
              o.Tcards[j] = newcard;
            }
            o.log.add = add;
            o.log.notes =
              aniplanum +
              "×" +
              i.c.collected +
              (firwin || wat
                ? "×" + (firwin ? 1.5 : 1) * (wat ? 0.5 : 1) + " → "
                : " = ") +
              add +
              "p";
            o.log.fxtype.push(
              "after",
              "changeresultlist",
              "changeprefields",
              "editcard",
              "add"
            );
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "るこえる",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "何もしてないのに壊れた！",
        description:
          "金属・機械系絵文字を持つ生徒カードと隣接したとき、該当カードを効果無効🚫にしたうえでレアリティ合計×15pをランダムで加算または減算する。Lvが上がるほど加算になりやすい。",
        detail: "加算になる確率は(35+Lv×5)%。確率加算の影響は受けない。",
        possibility:['editcard','addplus','addminus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetemoji = exports.emjlist["金属・機械"];
          const cons = [
            i.cards.some(
              (cc, index) =>
                Math.abs(index - i.index) == 1 &&
                cc.emoji &&
                targetemoji.includes(cc.emoji)
            ),
          ];
          if (cons.every((con) => con)) {
            let rarities = 0;
            o.cards = i.cards;
            const targetemojilist = [];
            i.cards.forEach((cc, index) => {
              if (
                Math.abs(index - i.index) == 1 &&
                cc.emoji &&
                targetemoji.includes(cc.emoji)
              ) {
                const newcard = JSON.parse(JSON.stringify(cc));
                newcard.frozen = true;
                o.cards[index] = newcard;
                rarities += cc.rarity;
                targetemojilist.push(tools.emj(cc));
              }
            });
            const addmul =
              Math.floor(Math.random() * 100) < 35 + i.c.collected * 5
                ? 15
                : -15;
            const add = rarities * addmul;
            o.log.description += "\n対象：" + targetemojilist.join("");
            o.log.add = add;
            o.log.notes =
              rarities +
              "×" +
              (addmul > 0 ? addmul : "(" + addmul + ")") +
              " = " +
              add +
              "p";
            o.log.fxtype.push("before", "editcard", "add", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "れいちぇ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "デッドヒート",
        description:
          "自身より前に流星部の生徒カードがあるとき先頭に移動し、追い越した流星部の生徒カードのLvとレアリティの合計×自身のLv分を加点する。",
        detail: "",
        possibility:['sortcard','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targets = i.cards
            .slice(0, i.index)
            .filter((cc) => cc.club.includes("流星") && cc.id !== i.c.id);
          const cons = [targets.length > 0];
          if (cons.every((con) => con)) {
            const add =
              targets
                .map((cc) => cc.collected + cc.rarity)
                .reduce((a, b) => a + b) * i.c.collected;
            o.cards = i.cards;
            o.cards.unshift(...o.cards.splice(i.index, 1));
            o.log.description +=
              "\n対象：" + targets.map((t) => tools.emj(t)).join("") + '\n移動：'+(i.index+1)+'枚目 → 1枚目';
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "sortcard", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "れいちぇ体",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "スカイハイ",
        description:
          "自身の1つ前の生徒カードを100-(対象のレアリティ×10)%の確率で飛び越え、都度30p加算。判定に失敗するまで挑戦し続ける。",
        detail: "確率加算は飛び越える方向に働く。",
        eventdescription:
          "《イベント》1人飛び越えるごとに1個ずつ赤組pを追加獲得する。",
        possibility:['sortcard','addplus','random']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index > 0];
          if (cons.every((con) => con)) {
            let add = 0;
            o.cards = i.cards;
            const targets = i.cards.slice(0, i.index).reverse();
            let successnum = targets.length;
            const successlist = [];
            for (let j = 0; j < targets.length; j++) {
              if (
                Math.floor(Math.random() * 100) <
                100 - targets[j].rarity * 10 + i.c.probadd
              ) {
                add += 30;
                successlist.push(tools.emj(targets[j]) + "30p");
              } else {
                successnum = j;
                successlist.push(tools.emj(targets[j]) + "❌");
                break;
              }
            }
            o.log.description += "\n飛越：" + successlist.join("　");
            if (successnum > 0) {
              o.cards.splice(i.index, 1);
              o.cards.splice(i.index - successnum, 0, i.c);
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "random", "sortcard", "add");

            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(add / 30);
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                (iadd !== 0
                  ? "\n獲得：" + i.event.item[iindex].emoji + " ×" + iadd
                  : "");
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "れいもん",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "残留思念",
        description:
          "カード枚数を減らす効果が発動しているとき、場に残った魂の痕跡を読み解いて魔物化を防ぎ該当効果数×現在の生徒カード枚数×20pを加算する。",
        detail: "",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targetfxs = i.prefields.filter(
            (pf) => pf.type == "effect" && pf.fxtype.includes("delcard")
          );
          const cons = [targetfxs.length > 0];
          if (cons.every((con) => con)) {
            const add = targetfxs.length * i.cards.length * 20;
            o.log.add = add;
            o.log.notes =
              targetfxs.length + "×" + i.cards.length + "×20 = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'れいもん聖', phase:['後'], f:(i)=>
    {const outline = {title:           '揺り椅子',
                      description:     '20～4時であるとき暖炉の前で語らい、場の魂の数×10p加算。0時に近ければ近いほど暖炉の前に集まる魂の数がなぜか増えていく。',
                      detail:          '全カード枚数に加え、時間に応じて魂の数を追加する。\n20・3時台：0\n21・2時台：1\n22・1時台：2\n23・0時台：3\n冬は更に魂の数がランダムで0～3増える。',
                      eventdescription:'《イベント》🔔ベルを1個追加獲得する。',
                      possibility:['addplus']};
      if(i){
        try{
          const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
          const Hour = i.date.getHours();
          if(20<=Hour||Hour<4){
            const winter = (i.season=='winter');
            if(winter) o.log.description+='冬は更に魂の数がランダムで0～3増える。';
            const souls = [...i.cards, ...i.Tcards].length + (20<=Hour ? Hour-20 : 3-Hour) + (winter ? Math.floor(Math.random()*4) : 0);
            const add = souls*10;
            o.log.add=add; o.log.notes=souls+'×10 = '+add+'p';
            o.log.fxtype.push('after','add');
            //▼イベントアイテム
            if(i.event&&i.event.id==i.c.eventid){const iindex=3; o.log.eventitems.index=iindex;
                                                 const iadd=1; o.log.eventitems.add=iadd;
                                                 o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji:'');
                                                 o.log.fxtype.push('event');};
            return o;
          };
        }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {
    id: "れみゅえ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ガリバーレスキュー",
        description:
          "先頭にいたとき身長430cmの「大レミ」、末尾にいたとき身長43cmの「小レミ」に25%の確率で変身する。レアリティが1上下するほか、縁などの一部ステータスも変化する。",
        detail:
          "大レミは義、小レミは隼人との縁を追加で持ち、それぞれ身長系のタグが書き換えられる。レアリティは0未満にはならない。",
        possibility:['prob','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.index == 0 || i.index == i.cards.length - 1,
            Math.floor(Math.random() * 100) < 25 + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            let size = "";
            if (i.index == 0) {
              newcard.name = i.c.name + "(大レミ)";
              newcard.nickname = i.c.nickname.replace("/れみ/", "/大れみ/");
              size = "大！";
              newcard.cm = 430;
              newcard.rarity = i.c.rarity + 1;
              newcard.relation = "よし/" + i.c.relation;
              newcard.tag = i.c.tag.replace("150cm以下", "180cm以上");
            }
            if (i.index == i.cards.length - 1) {
              newcard.name = i.c.name + "(小レミ)";
              newcard.nickname = i.c.nickname.replace("/れみ/", "/小れみ/");
              size = "小！";
              newcard.cm = 43;
              newcard.rarity = i.c.rarity > 0 ? i.c.rarity - 1 : 0;
              newcard.relation = "ほんはや/" + i.c.relation;
            }
            o.cards[i.index] = newcard;
            o.log.notes = size;
            o.log.fxtype.push("before", "prob", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "れみゅえ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "腹ペコジャイアント",
        description: "全生徒カードの身長の合計が850cm以上のとき80p加算。",
        detail:
          "「小レミ」になっていた場合、効果名が【腹ペコドワーフ】、効果内容が「全生徒カードの身長の合計が650cm以下のとき80p加算。」に変化する。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cmsum = i.cards.filter((cc) => cc.cm).map((cc) => cc.cm).reduce((a, b) => a + b);
          const cons = [false];
          if (i.c.name.includes("(小レミ)") && cmsum <= 650) {
            cons[0] = true;
            o.log.title = "腹ペコドワーフ";
            o.log.description =
              "全生徒カードの身長の合計が650cm以下のとき80p加算。";
          } else if (cmsum >= 850) {
            cons[0] = true;
          }
          if (cons.every((con) => con)) {
            const add = 80;
            o.log.description +=
              "\n合計：" +
              i.cards.filter((cc) => cc.cm).map((cc) => cc.cm).join("+") +
              " = " +
              cmsum +
              "cm";
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "れみゅえ雪",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "雪も積もればモンブラン",
        description:
          "赤寮の人手があるとき、ここまでのリザルト表示・効果説明に含まれる「丸」「玉」ととれる表記を雪としてかき集め、巨大な雪像となってその数×Lv分を加点。",
        detail: "トータル表示以上の部分は対象としない。",
        possibility:['addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =(
            i.resultlist.join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("")).replace(/<:.+:\d+>/g, '');
          const balls = targettext.match(
            /🔴|🟢|🔵|🟣|⚫|⚪|⛄|🔮|☀️|🌑|🌒|🌓|🌔|🌕|🌖|🌗|🌘|🥴|🤡|🤬|😢|🙂|👶|😛|🥺|🍅|🍈|🧅|🚭|⚽|💿|🌏|☯️|🌐|👁|🔍|🔎|🧶|🍳|🎈|💍|🚫|🧿|0|8|o|O|Q|%|。|パ|ピ|プ|ペ|ポ|ぱ|ぴ|ぷ|ぺ|ぽ|まる|マル|丸|たま|タマ|玉|球|赳|ボール|雪だるま/g
          );
          const cons = [
            i.cards.find((cc) => cc.id !== i.c.id && cc.dorm == "赤寮"),
            balls && balls.length > 0,
          ];
          if (cons.every((con) => con)) {
            const add = balls.length * i.c.collected;
            o.log.description += "\n対象：" + balls.join("/");
            o.log.add = add;
            o.log.notes =
              balls.length + "×" + i.c.collected + " = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ろーれん",
    phase: ["後"],
    f: (i) => {
      const books = [
        {
          name: "絵本",
          detail: "カード絵文字の数×5p",
          add: (cards, targettext, allemjs) => {
            return (
              (targettext.match(new RegExp(allemjs.join("|"), "g")) || [])
                .length * 5
            );
          },
        },
        {
          name: "漫画",
          detail: "生徒カード枚数×10p",
          add: (cards, targettext, allemjs) => {
            return cards.length * 10;
          },
        },
        {
          name: "詩集",
          detail: "生徒カードLv合計×2p",
          add: (cards, targettext, allemjs) => {
            return cards.map((cc) => cc.collected).reduce((a, b) => a + b) * 2;
          },
        },
        {
          name: "小説",
          detail: "合計文字数÷4p",
          add: (cards, targettext, allemjs) => {
            return Math.floor(targettext.length / 4);
          },
        },
        {
          name: "魔術書",
          detail: "生徒カードレアリティ合計×7p",
          add: (cards, targettext, allemjs) => {
            return cards.map((cc) => cc.rarity).reduce((a, b) => a + b) * 7;
          },
        },
      ];
      const outline = {
        title: "図書館",
        description:
          "ここまでのリザルト表示・効果説明の合計文字数が300以下のとき、ランダムな蔵書📖を貸し出す。図書委員がいる場合はさらに人数分冊数を追加する。",
        detail:
          "合計文字数にはトータル表示以上の部分・「得点計算」と書かれた行は含まない。小数点以下切捨。\n" +
          books.map((b) => b.name + "：" + b.detail).join("\n"),
        possibility:['random','episodeadd']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const targettext =
            i.resultlist.filter((rl) => !rl.includes("得点計算")).join("") +
            i.prefields
              .map(
                (pf) => pf.name + (pf.description ? pf.description : pf.value)
              )
              .join("");
          const cons = [targettext.length <= 300];
          if (cons.every((con) => con)) {
            const allemjs = [
              ...new Set(
                i.characters
                  .filter((chr) => chr.genre == "stTm")
                  .map((chr) => chr.emoji)
                  .filter((emj) => emj)
              ),
            ];
            const tosho = i.cards.filter(
              (cc) => cc.committee && cc.committee == "図書"
            );
            o.log.description +=
              (tosho.length == 0
                ? ""
                : "\n図書：" + tosho.map((t) => tools.emj(t)).join("")) +
              "\n文字数：" +
              targettext.length +
              "文字";
            for (let ii = 0; ii < 1 + tosho.length; ii++) {
              const ep = {
                f: (j) => {
                  const book = books[Math.floor(Math.random() * books.length)];
                  const title = "蔵書：" + book.name;
                  const targettextB =
                    j.resultlist
                      .filter((rl) => !rl.includes("得点計算"))
                      .join("") +
                    j.prefields
                      .map(
                        (pf) =>
                          pf.name + (pf.description ? pf.description : pf.value)
                      )
                      .join("");
                  try {
                    const oo = JSON.parse(JSON.stringify(epoutput));
                    oo.log.title = title;
                    const add = book.add(j.cards, targettextB, allemjs);
                    oo.log.description = "特殊：" + book.detail;
                    oo.log.add = add;
                    oo.log.notes = "(📚) " + add + "p";
                    oo.log.eptype.push("other", "add");
                    return oo;
                  } catch (error) {
                    return {
                      error: true,
                      title: outline.title,
                      message: error.message,
                    };
                  }
                },
              };
              o.episodeadd.push(ep);
            }
            o.log.fxtype.push("after", "random", "episodeadd");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "わたべゆ",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "マジカルフォーゼ！！！",
        description:
          "Lv×10%の確率で白鳥舞になり、通常計算による得点を10p増加させる。",
        detail:
          "既に通常計算による得点が増加していた場合、重ねて増加させることはできない。",
        possibility:['prob','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            Math.floor(Math.random() * 100) < 10 * i.c.collected + i.c.probadd,
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            const newcard = JSON.parse(JSON.stringify(i.c));
            newcard.name = "白鳥舞(渡辺雪)";
            newcard.basicadd+=10;
            o.cards[i.index] = newcard;
            o.log.fxtype.push("before", "prob", "editcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "わたべゆ",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "相容れぬ陽の空気",
        description: "自身が含まれないプラス縁の数×10p減算。",
        detail:
          "【マジカルフォーゼ！！！】が発動していた場合、効果名が【歓迎せし陽の空気】、効果内容が「自身が含まれないプラス縁の数×10p加算。」に変化する。効果によって書き加えられた一部の縁は対象としない。",
        possibility:['addplus','addminus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const rlwomenum = i.relationlog.filter(
            (rl) => !rl.ids.includes(i.c.id) && rl.plus
          ).length;
          const cons = [rlwomenum > 0];
          if (cons.every((con) => con)) {
            let mai = false;
            if (
              i.prefields.some(
                (pf) =>
                  pf.type == "effect" && pf.title == "マジカルフォーゼ！！！"
              )
            ) {
              mai = true;
              o.log.title = "歓迎せし陽の空気";
              o.log.description = "自身が含まれないプラス縁の数×10p加算。";
            }
            const add = rlwomenum * 10 * (mai ? 1 : -1);
            o.log.add = add;
            o.log.notes =
              rlwomenum + " × " + (mai ? "10" : "-10") + " = " + add + "p";
            o.log.fxtype.push("after", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {id:'わたべゆ祭', phase:['前'], f:(i)=>
    {const outline = {title:           '私こそが主役',
                      description:     '自身以外に黄寮の生徒カードがなく、かつ演劇部かFESTIVALタグを持つ生徒カードがあるとき、自身以外のランダムな生徒カードと同じ教室🚪へ所属を変更し、その教室内で役に徹する。演劇部への所属は維持される。先頭にいる場合、通常計算による得点を10p増加させる。',
                      detail:          '寮室は対象としない。この効果はLvがMAXかEXTRAでないと発動しない。',
                      possibility:['editcard','random']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const cons = [(i.c.collected>=5),
                             (i.cards.length>=2),
                             (!i.cards.some(cc=>cc.id!==i.c.id&&cc.dorm=='黄寮')),
                             (i.cards.some(cc=>cc.id!==i.c.id&&(cc.club.includes('演劇')||cc.tag.split('/').includes('FESTIVAL'))))];
               if(cons.every(con=>con)){o.cards=i.cards; const newcard=JSON.parse(JSON.stringify(i.c));
                                        const target = i.cards.filter(cc=>cc.id!==i.c.id)[Math.floor(Math.random()*(i.cards.length-1))];
                                        const choices = [{id:'class', name:'クラス'}];
                                        if(target.committee) choices.push({id:'committee', name:'委員会等'});
                                        if(target.club)      choices.push({id:'club', name:'部活'});
                                        const choice = choices[Math.floor(Math.random()*choices.length)];
                                        if(choice.id=='class')          ['major','grade'].forEach(ctgr=>newcard[ctgr]=target[ctgr]);
                                        else if(choice.id=='committee') newcard.committee = target.committee;
                                        else if(choice.id=='club'){     const clubs = target.club.split(' ');
                                                                        newcard.club = [...new Set([...newcard.club.split(' '), clubs[Math.floor(Math.random()*clubs.length)]])].join(' '); };
                                        o.log.description+='\n対象：'+tools.emj(target)+choice.name;
                                        if(i.index==0){ newcard.basicadd+=10;
                                                        o.log.notes='先頭'; };
                                        o.cards[i.index]=newcard;
                                        o.log.fxtype.push('before','editcard','random');
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },
  {id:'わたべゆ祭', phase:['後'], f:(i)=>
    {const magicaldetail = 'エピソード📖『😈マジカルバナナ』が発動する状態である場合、必ず加算となる。';
     const outline = {title:           'ナイスバナナ！',
                      description:     '自身以外に黄寮の生徒カードがあるとき、それ以外のカードに対し「ナイスバナナ！」と声をかけながらバナナジュースを配り、配った人数×50p加算。ただし対象が3人を超えるとテンパって半分の減算になる。',
                      detail:          '減算時は効果名が【ナイスバナナ……？】に変化する。\n'+magicaldetail,
                      eventdescription:'《イベント》テンパらずにジュースを配れた分だけエンジョイpを追加獲得する。',
                      possibility:['addplus','addminus']};
     if(i){try{const o=JSON.parse(JSON.stringify(fxoutput)); o.log.fxowner=i.c; o.log.title=outline.title; o.log.description=outline.description;
               const yellow=i.cards.filter(cc=>cc.dorm=='黄寮'&&cc.id!==i.c.id);
               const notyellow=[...i.cards, ...i.Tcards].filter(cc=>cc.dorm!=='黄寮'&&cc.id!==i.c.id);
               const cons = [(yellow.length>0),
                             (notyellow.length>0)];
               if(cons.every(con=>con)){const magical = (i.myfx=='bn'&&i.cards.filter(cc=>cc.dorm=='黄寮').length>=3);
                                        if(magical) o.log.description+='\n'+magicaldetail;
                                        const temparu = (notyellow.length>3&&!magical);
                                        if(temparu) o.log.title='ナイスバナナ……？';
                                        const add=notyellow.length*(temparu?-25:50);
                                        o.log.description+='\n対象：'+notyellow.map(cc=>tools.emj(cc)).join('');
                                        o.log.add=add; o.log.notes=notyellow.length+'×50'+(temparu?'×(-0.5)':'')+' = '+add+'p';
                                        o.log.fxtype.push('after','add');
                                        if(i.event&&i.event.id==i.c.eventid){const iindex=0; o.log.eventitems.index=iindex;
                                                                             const iadd=temparu?0:notyellow.length; o.log.eventitems.add=iadd;
                                                                             o.log.description+='\n'+outline.eventdescription+((iadd!==0)?'\n獲得：'+i.event.item[iindex].emoji+' ×'+iadd:'');
                                                                             o.log.fxtype.push('event');};
                                        return o; }else return;
           }catch(error){return {error:true, title:outline.title, message:error.message}};}
     else return outline; }
  },

  {
    id: "きむちゅ舞",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "来てくれるでしょー？",
        description:
          "自身以外に魔変科1年生か音楽タグを持つ生徒カードがないとき、後続の生徒カードを全て魔変科1年生か音楽タグを持つものにする。先頭だった場合、全生徒カードに音楽タグを付与する。",
        detail: "",
        possibility:['changecard','random','editcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [
            i.index < i.cards.length - 1,
            !i.cards.some(
              (cc) =>
                cc.id !== i.c.id &&
                ((cc.major == i.c.major && cc.grade == i.c.grade) ||
                  cc.tag.split("/").includes("音楽"))
            ),
          ];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            for (let j = i.index + 1; j < i.cards.length; j++) {
              const choices = i.allcards.filter(
                (chr) =>
                  !o.cards
                    .slice(0, j)
                    .some((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4)) &&
                  ((chr.major == i.c.major && chr.grade == i.c.grade) ||
                    chr.tag.split("/").includes("音楽"))
              );
              const newcard =
                choices[Math.floor(Math.random() * choices.length)];
              o.cards[j] = exports.getnature(newcard);
            }
            for (let j = 0; j < i.cards.length; j++) {
              let newcard;
              if (j >= i.index + 1) {
                const choices = i.allcards.filter(
                  (chr) =>
                    !o.cards
                      .slice(0, j)
                      .some((cc) => cc.id.slice(0, 4) == chr.id.slice(0, 4)) &&
                    ((chr.major == i.c.major && chr.grade == i.c.grade) ||
                      chr.tag.split("/").includes("音楽"))
                );
                newcard = JSON.parse(
                  JSON.stringify(
                    choices[Math.floor(Math.random() * choices.length)]
                  )
                );
              } else {
                newcard = JSON.parse(JSON.stringify(i.cards[j]));
              }
              if (i.index == 0) {
                const oldtags = newcard.tag.split("/");
                if (!oldtags.includes("音楽")) {
                  oldtags.push("音楽");
                  newcard.tag = oldtags.join("/");
                }
              }
              o.cards[j] = newcard;
            }
            if (i.index == 0) o.log.fxtype.push("editcard");
            o.log.fxtype.push("before", "changecard", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "きむちゅ舞",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "今日はアタシだけを見てて",
        description:
          "ここまでの合計点が200pを超えているとき、全て打ち消して自身以外の生徒カード枚数×100p加算し、後続の生徒カードの効果判定を全てスキップする。",
        detail: "",
        possibility:['force','changecount']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.totalP > 200];
          if (cons.every((con) => con)) {
            const force = i.cards.filter((cc) => cc.id !== i.c.id).length * 100;
            o.count = 100;
            o.log.force = force;
            o.log.notes = "強制" + force + "p";
            o.log.fxtype.push("after", "force", "changecount");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },

  
  
  
  
  
  
  
  
  
  {
    id: "おおとり嘘",
    phase: ["後"],
    f: (i) => {
      const zeronum = Math.random() < 0.2 ? 50 : 10;
      const outline = {
        title: "ト" + "リ".repeat(zeronum / 2) + "オン",
        description:
          "合計点の表示に0️⃣をめちゃめちゃ増やす。合計点そのものに変化はない。",
        detail: "",
        eventdescription: "《イベント》何が何でもアイテムを200個追加獲得する。",
        possibility:['special']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [true];
          if (cons.every((con) => con)) {
            o.trillion = "0️⃣".repeat(zeronum);
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = 200;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
              o.log.fxtype.push("event");
            }
            o.log.fxtype.push("after", "special");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "ぎんがじ嘘",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "爆上げでいくぜ！？",
        description:
          "おぞましい音楽を爆音で流し、自分以外の全員がいなくなってしまう。でも自分は爆ノリでイケているので1000p加算。",
        detail: "",
        eventdescription: "《イベント》ノリノリでアイテムを200個追加獲得する。",
        possibility:['delcard','addplus']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [true];
          if (cons.every((con) => con)) {
            const add = 1000;
            o.cards = i.cards.filter((cc) => cc.id == i.c.id);
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = 200;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
              o.log.fxtype.push("event");
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.fxtype.push("before", "delcard", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "たかやま嘘",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "オーバーーーーーーー！！！",
        description:
          "全生徒カードの絵文字・名前・所属・立場・効果を吹っ飛ばす。",
        detail: "発動した場合、教師カードはドローされない。",
        eventdescription: "《イベント》勢いでアイテムを200個追加獲得する。",
        possibility:['editcard','noteacher']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [true];
          if (cons.every((con) => con)) {
            o.cards = i.cards.map((cc) => {
              const newcard = JSON.parse(JSON.stringify(cc));
              newcard.name = "💥".repeat(newcard.name.length);
              newcard.emoji = "💥";
              newcard.frozen = true;
              newcard.grade = "";
              newcard.major = "";
              newcard.committee = "";
              newcard.club = "";
              newcard.dorm = "";
              newcard.dormmate = "";
              newcard.roomid = "";
              newcard.position = "";
              return newcard;
            });
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = 200;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
              o.log.fxtype.push("event");
            }
            o.noteacher = true;
            o.log.fxtype.push("before", "editcard", "noteacher");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "たつがみ嘘",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "ここで決まり！",
        description: "最後尾に移動する。",
        detail: "",
        possibility:['sortcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.index < i.cards.length - 1];
          if (cons.every((con) => con)) {
            o.cards = i.cards.filter((cc) => cc.id !== i.c.id);
            o.cards.push(i.c);
            o.log.fxtype.push("before", "sortcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "たつがみ嘘",
    phase: ["後"],
    f: (i) => {
      const outline = {
        title: "XXXpで決まり！",
        description:
          "ここまでの得点計算を全て打ち消し、合計点を強制的に0～100のランダムな数値へ設定する。",
        detail: "得点は1p刻みで設定される。",
        eventdescription: "《イベント》問答無用でアイテムを200個追加獲得する。",
        possibility:['random','force','changeresultlist','changeprefields']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [true];
          if (cons.every((con) => con)) {
            const hrindex = i.resultlist.findIndex((r) => r.includes("─────"));
            o.resultlist = i.resultlist.map((r, i) =>
              i > hrindex ? "~~" + r.replace("~~", "") + "~~" : r
            );
            o.prefields = i.prefields.map((pf) => {
              if (
                pf.type == "birthday" ||
                (pf.type == "effect" &&
                  pf.fxtype.some((ft) =>
                    ft.match(/^(force|add|mul|patternadd)$/)
                  ))
              ) {
                pf.name = "~~" + pf.name.replace("~~", "") + "~~";
                if (pf.description) {
                  pf.description =
                    "~~" + pf.description.replace("~~", "") + "~~";
                }
                if (pf.value) {
                  pf.value = "~~" + pf.value.replace("~~", "") + "~~";
                }
              }
              return pf;
            });
            const force = Math.floor(Math.random() * 101);
            o.log.title = force + "pで決まり！";
            o.log.force = force;
            o.log.notes = i.totalP + "p → 強制" + force + "p";
            o.log.fxtype.push(
              "after",
              "random",
              "force",
              "changeresultlist",
              "changeprefields"
            );
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = 200;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
              o.log.fxtype.push("event");
            }
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    id: "はなてん嘘",
    phase: ["前"],
    f: (i) => {
      const outline = {
        title: "5人合わせてガッテンジャー！",
        description: "取り急ぎ5人集合する。",
        detail:
          "後ろに誰がいようと関係なく上書きする。既に生徒カードが増加している場合、遠慮くらいはできる。",
        eventdescription:
          "《イベント》力を合わせてアイテムを200個追加獲得する。",
        possibility:['changecard','addcard']
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(fxoutput));
          o.log.fxowner = i.c;
          o.log.title = outline.title;
          o.log.description = outline.description;
          const cons = [i.cards.length < 6];
          if (cons.every((con) => con)) {
            o.cards = i.cards;
            for (let j = 0; j < 5; j++) {
              o.cards[j + i.index] = JSON.parse(
                JSON.stringify(
                  exports.additional.find((cc) => cc.id == "てんじゃ" + j)
                )
              );
            }
            if (i.event && i.event.id == i.c.eventid) {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = 200;
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
              o.log.fxtype.push("event");
            }
            o.log.fxtype.push("before", "changecard", "addcard");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
];

//■■■■■■■■■■■■■■■■■■■■エピソード効果

const epscore = (n) => Math.floor(62.5 * 2 ** (n - 1)); //3枚以上のデフォルト型計算 1:62 2:125 3:250 4:500 5:1000
const epscoreB = (n) => Math.floor(50 * 2 ** (n - 1)); //3枚以上のデフォルト型計算 1:50 2:100 3:200 4:400 5:800

exports.episodes = [
  {
    f: (i) => {
      const member = ["あらんあ", "うららあ"];
      const outline = {
        title: "物語のはじまり",
        type: "要員",
        member: member,
        score: 100,
        description:
          "それを聞いた彼女は、「やっと見つけた」とでも言いたげな顔をして、にっと笑った。\n「おぬし、わしの仲間にならんか？」",
        url: "https://www.evernote.com/shard/s586/sh/56386d44-e43f-ed41-64a4-0d8050dd8094/7ea0a8648b2d328ebacfc36e43f74f77",
        detail: "【おぬしも来い！】順隣接 ウドを除く",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            !i.cards.some(
              (cc) => cc.id.includes("うららあ") && cc.position.includes("首席")
            ),
            i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == "おぬしも来い！"
            ),
            i.cards.findIndex((cc) => cc.id.includes("あらんあ")) + 1 ==
              i.cards.findIndex((cc) => cc.id.includes("うららあ")),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              "```" +
              outline.description +
              "```" +
              outline.url +
              "\n判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "【おぬしも来い！】順隣接";
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("checkfx", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  //■■■■■■■■■■ 型・一般 ■■■■■■■■■■
  {
    f: (i) => {
      const member = ["あらんあ", "いるまき", "うららあ"];
      const outline = {
        title: "ア・イ・ウ",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["さいおん", "とおあけ", "れみゅえ"];
      const outline = {
        title: "赤寮深夜食堂",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["あるとあ", "だいりお", "たまえろ"];
      const outline = {
        title: "あの日の3人",
        type: "型",
        member: member,
        score: 100,
        description:
          "3人はただそれとなく、あの日のことを話していただけだった。\nあの日と比べると、下校後の教室は静かだったが、それでもこの光景はまさしく、あの時のままだった。",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const anotoki = i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == "あの時をもう一度"
            );
            o.log.description =
              (anotoki ? "```" + outline.description + "```" : "") +
              "型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              (anotoki ? "　＋【あの時をもう一度】" : "");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["かげゆこ", "あらたが", "びぜんお"];
      const outline = {
        title: "オラオラトリオ",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["ぴーたー", "だいりお", "こうせい"];
      const outline = {
        title: "解釈違いです！！",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["いちぎん", "じゅふぶ", "ぬのしだ"];
      const outline = {
        title: "決闘部信号機",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["あすかあ", "みよしき", "ごーすと"];
      const outline = {
        title: "恋のゆくえ",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["はなてん", "とどろき", "りんあっ"];
      const outline = {
        title: "ここ暑くない？",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
        detail: "ソフィアがいると喜んでさらに250p加算",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            if (i.cards.some((cc) => cc.id.match(/^そふぃあ/))) {
              outline.member.push("そふぃあ");
              outline.score += 250;
              outline.description += "```「まるでサウナデース！」```";
            }
            o.log.description =
              outline.description +
              "型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["あらんあ", "ぴーたー", "あいしゃ", "えりーじ"];
      const outline = {
        title: "さよならジェスター",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["れみゅえ", "みよしき", "あすかあ"];
      const outline = {
        title: "師匠！",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
        detail: "大レミの場合は減算",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const giant = i.cards.some(
              (cc) => cc.name.includes("大レミ") || cc.cm == 430
            );
            const add = outline.score * (giant ? -1 : 1);
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              (giant ? "大レミ" : "");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["えんどう", "みよしき", "ごーすと"];
      const outline = {
        title: "方舟",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["あらんあ", "うららあ", "たかやま", "やまだあ"];
      const outline = {
        title: "バンドじゃ！",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["うんじょ", "たつがみ", "まりあう", "めろばた"];
      const outline = {
        title: "ぶんぷら！",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["とつかち", "やなせこ", "めろばた", "ふるつき"];
      const outline = {
        title: "ベタ塗りヘルプ",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["えんどう", "みよしき", "あすかあ"];
      const outline = {
        title: "放課後振り向け会議",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["ひびきこ" ,"しちりが", "れいちぇ"];
      const outline = {
        title: "流星部陸海空",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["あじすか", "えんどう", "くらうん", "じゅつら"];
      const outline = {
        title: "寮長会議",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = [
        "ひじかた",
        "そうまあ",
        "こんどう",
        "おきたひ",
        "ながくら",
      ];
      const outline = {
        title: "REDLIST",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["じゅつら雪", "めろばた雪", "うららあ雪", "たかやま雪"];
      const outline = {
        title: "⛄青寮チーム",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((id) => i.cards.some((cc) => cc.id == id)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) => tools.emj(i.cards.find((cc) => cc.id == id)))
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["あじすか雪", "れみゅえ雪", "はなてん雪", "しちりが雪"];
      const outline = {
        title: "⛄赤寮チーム",
        type: "型",
        member: member,
        score: epscore(member.length),
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((id) => i.cards.some((cc) => cc.id == id)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n型：" +
              outline.member
                .map((id) => tools.emj(i.cards.find((cc) => cc.id == id)))
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },

  //■■■■■■■■■■ 型・スコア指定 ■■■■■■■■■■
  {
    f: (i) => {
      const member = [
        "しちりが",
        "はちおう",
        "くじょう",
        "じゅうそ",
        "じゅつら",
        "じゅとう",
        "じゅふぶ",
        "いちかず",
        "いちぎん",
        "いっしき"
      ];
      const bmember = ["しちりが", "はちおう", "くじょう"];
      const outline = {
        title: "ストレートフラッシュ",
        type: "特殊型",
        member: member,
        score: epscoreB(5),
        description: "",
        detail: "姓に含まれる数 7・8・9・10・1 各1枚",
      };
      if (i) {
        try {
          const targets = i.cards.filter((c) =>
            bmember.includes(c.id.slice(0, 4))
          );
          const ten = i.cards.find((c) =>
            c.id.slice(0, 4).match(/^(じゅうそ|じゅつら|じゅとう|じゅふぶ)/)
          );
          if (ten) targets.push(ten);
          const one = i.cards.find((c) =>
            c.id.slice(0, 4).match(/^(いちかず|いちぎん|いっしき)/)
          );
          if (one) targets.push(one);
          if (targets.length == 5) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              outline.description +
              "\n特殊型：" +
              targets.map((t) => tools.emj(t)).join("") +
              outline.detail;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["くらまえ元", "えびちり"];
      const outline = {
        title: "だって友達だもん",
        type: "型",
        member: member,
        score: 100,
        description:
          "「なんでそんなに優しくするの……！？」\nギュッと握り締められた整の手を、千理は両手で優しく包んだ。",
      };
      if (i) {
        try {
          const cons = [
            i.cards.some((cc) => cc.id.slice(0, 4) == "えびちり"),
            i.cards.some((cc) => cc.id == "くらまえ元"),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "型：" +
              outline.member
                .map((id) => tools.emj(i.characters.find((cc) => cc.id == id)))
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["あらんあ", "ぴーたー", "まるがれ"];
      const outline = {
        title: "タブー",
        type: "型",
        member: member,
        score: -100,
        description: "",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "型：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("");
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("pattern", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },

  //■■■■■■■■■■ 部分一致 ■■■■■■■■■■
  {
    f: (i) => {
      const member = [
        "そうまあ",
        "たかやま",
        "かしおよ",
        "ほんごう",
        "わたべゆ",
      ];
      const outline = {
        title: "おもちゃ売り場にて",
        type: "部分一致",
        member: member,
        score: null,
        description: "",
        detail: "3人以上　200・400・800p",
      };
      if (i) {
        try {
          const matchnum = member.filter((c) =>
            i.cards.some((cc) => cc.id.slice(0, 4) == c)
          ).length;
          const cons = [matchnum >= 3];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const add = epscoreB(matchnum);
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              outline.type +
              "：" +
              outline.member
                .map((id) => tools.emj(i.characters.find((cc) => cc.id == id)))
                .join("") +
              " " +
              matchnum +
              "人";
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.eptype.push("partial", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["みつきゆ", "じゅうそ", "ふるつき", "くろかわ"];
      const outline = {
        title: "東魔最恐裏メディア",
        type: "部分一致",
        member: member,
        score: null,
        description: "",
        detail: "3人以上　250・500p",
      };
      if (i) {
        try {
          const matchnum = member.filter((c) =>
            i.cards.some((cc) => cc.id.slice(0, 4) == c)
          ).length;
          const cons = [matchnum >= 3];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const add = epscore(matchnum);
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              outline.type +
              "：" +
              outline.member
                .map((id) => tools.emj(i.characters.find((cc) => cc.id == id)))
                .join("") +
              " " +
              matchnum +
              "人";
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.eptype.push("partial", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = [
        "ぎんがじ",
        "いばらき",
        "みしぇる",
        "くろかわ",
        "つわぶき",
      ];
      const outline = {
        title: "マギカスクール・ヒップホップ",
        type: "部分一致",
        member: member,
        score: null,
        description: "",
        detail: "3人以上　250・500・1000p",
      };
      if (i) {
        try {
          const matchnum = member.filter((c) =>
            i.cards.some((cc) => cc.id.slice(0, 4) == c)
          ).length;
          const cons = [matchnum >= 3];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const add = epscore(matchnum);
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              outline.type +
              "：" +
              outline.member
                .map((id) => tools.emj(i.characters.find((cc) => cc.id == id)))
                .join("") +
              " " +
              matchnum +
              "人";
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.eptype.push("partial", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["えびちり", "たまえろ"];
      const outline = {
        title: "巻き込まれ事故",
        type: "部分一致",
        member: member,
        score: null,
        description: "",
        detail:
          "得点加算を行う効果がマイナス値を出しているとき、50%の確率で10～70p減算する。2人揃っている場合は減算の最大値が100pになる。",
      };
      if (i) {
        try {
          const matchnum = member.filter((c) =>
            i.cards.some((cc) => cc.id.slice(0, 4) == c)
          ).length;
          const cons = [
            matchnum >= 1,
            i.prefields.some(
              (pf) =>
                pf.type == "effect" && pf.fxtype.includes("add") && pf.add < 0
            ),
            Math.floor(Math.random() * 100) < 50,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const add =
              Math.floor(Math.random() * (4 + 3 * matchnum) + 1) * -10;
            o.log.description =
              "```" +
              (i.cards.some((cc) => cc.id.match(/^えびちり/))
                ? "「あれれ～～～～～～！？」"
                : "") +
              (i.cards.some((cc) => cc.id.match(/^たまえろ/))
                ? "\n「なんでですの～～～！？」"
                : "") +
              "```" +
              outline.type +
              "：" +
              outline.member
                .map((id) => tools.emj(i.characters.find((cc) => cc.id == id)))
                .join("") +
              " " +
              matchnum +
              "人 減算効果 ランダム";
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.eptype.push("checkfx", "prob", "random", "partial", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },

  //■■■■■■■■■■ 効果検知 ■■■■■■■■■■
  {
    f: (i) => {
      const member = ["なすしゅ", "いりがれ"];
      const outline = {
        title: "あなたにだけは負けたくない",
        type: "要員",
        member: member,
        score: 40,
        description: "",
        detail: "【あと1歩及ばない】",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == "あと1歩及ばない"
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "【あと1歩及ばない】";
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("checkfx", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["えりーじ", "ながくら"];
      const outline = {
        title: "ぐるぐる包帯巻き",
        type: "要員",
        member: member,
        score: 100,
        description: "",
        detail: "【夜戸出】喧嘩",
      };
      if (i) {
        try {
          const cons = [
            i.cards.some((cc) => cc.id.slice(0, 4) == "えりーじ"),
            i.prefields.some(
              (pf) =>
                pf.type == "effect" &&
                pf.title == "夜戸出" &&
                pf.notes.includes("喧嘩")
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.characters.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              outline.detail;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("checkfx", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["えびちり", "ひびきこ"];
      const outline = {
        title: "宣戦布告",
        type: "要員",
        member: member,
        score: 50,
        description:
          "真世は、皐太朗とすれ違いざま、目も合わさないまま言い放つ。\n「次は、レースで会いましょうね。ででーん」",
        detail: "【真世ちゃん！？】",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == "真世ちゃん！？"
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              "```" +
              outline.description +
              "```判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "🦐";
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("checkfx", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["あるとあ", "だいりお"];
      const outline = {
        title: "虹色の亀裂",
        type: "要員",
        member: member,
        score: 100,
        description:
          "七色に拡散した魔力は、しかし突如稲妻が宙を貫くと空間ごと破片になって砕け散った。\n「──全部全部まかり通ると思ってんじゃねえぞ、王様。ここが、この俺が、お前の行き止まりなんだよ」\n虹を殺した亀裂の始点で、ぼろぼろの手が鎚を握っていた。",
        detail: "【ここが突き当たり】",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == "ここが突き当たり"
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              "```" +
              outline.description +
              "```判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              outline.detail;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("checkfx", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["めろばた", "たつがみ"];
      const outline = {
        title: "秘密の推しカプ密会",
        type: "要員",
        member: member,
        score: 50,
        description: "",
        detail: "【あの2人って……！】【筆が乗るなぁ！】",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == "あの2人って……！"
            ),
            i.prefields.some(
              (pf) => pf.type == "effect" && pf.title == "筆が乗るなぁ！"
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "【あの2人って……！】【筆が乗るなぁ！】";
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("checkfx", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["いのうえ", "びぜんお"];
      const outline = {
        title: "みんなが迷惑してるの！",
        type: "要員",
        member: member,
        score: null,
        description:
          "「だからなんの計算式なのよ！意味わかんないんだけど！大体いつもいつも……」\n「井上さん、もうオーメンいないよ」",
        detail: "【なんでそうなった？】マイナス値分+1p",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            i.prefields.some(
              (pf) =>
                pf.type == "effect" &&
                pf.title == "なんでそうなった？" &&
                pf.add < 0
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              "```" +
              outline.description +
              "```判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              outline.detail;
            const add =
              i.prefields.find(
                (pf) => pf.type == "effect" && pf.title == "なんでそうなった？"
              ).add *
                -1 +
              1;
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.eptype.push("checkfx", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },

  //■■■■■■■■■■ ほか ■■■■■■■■■■
  {
    f: (i) => {
      const member = ["きむちゅ舞"];
      const outline = {
        title: "思い出のワンマンライブ",
        type: "要員",
        member: member,
        score: 100,
        description:
          "「今日は来てくれてありがとね。\nお礼にチェキ撮ってあげよーか？ へへ、記念にとっといて。」",
        detail: "ALL魔変科1年生or音楽タグ",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id == c)),
            i.cards.every(
              (cc) =>
                (cc.major == "魔変" && cc.grade == 1) ||
                cc.tag.split("/").includes("音楽")
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) => tools.emj(i.cards.find((cc) => cc.id == id)))
                .join("") +
              "(アイドル) " +
              outline.detail;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("other", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["えんどう"];
      const outline = {
        title: "彼女ほし～",
        type: "要員",
        member: member,
        score: 50,
        description: "",
        detail: "他全て女子生徒",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            i.cards.every((c) => c.id.includes("えんどう") || c.sex == "女"),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              outline.detail;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("other", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["あいしゃ", "えりーじ"];
      const description = [
        "「つまんなさそうな子」\nそれが、アイシャにとっての、彼女の第一印象だった。",
        "だが、通り過ぎたアイシャの視界の端で、一瞬、彼女の手が動いて、手を振ろうとしていたような気がした。\nしかし、人に押され歩いていくアイシャには、それをもう一度確認することは出来なかった。",
        "先ほど最初の授業を終えたアイシャは、ふと思い立って、この水晶を荷物の中から引っ張り出した。\n「肩慣らしには、ちょうどいいかもね」",
        "アイシャが東魔に入って、はじめて占う相手。\n「つまんなさそうな子」\nそれが、アイシャにとっての彼女の第一印象。\nしかし、アイシャにとっては、そういう相手こそ、驚く顔を見てやりたくなってしまうのだ。",
      ];
      const url = [
        "https://www.evernote.com/shard/s586/sh/b3259f41-0af6-695b-c883-35f5ee98384f/99bc5283016c25492d74d5db41e5b8c8",
        "https://www.evernote.com/shard/s586/sh/d58efaeb-5476-abe0-8b63-8a74ec203661/d879cb1ef7a6355764572607e2207acb",
        "https://www.evernote.com/shard/s586/sh/ed7249d9-c95e-c8de-88f3-b77e2eb413b3/31ec51d61ba96530ae333377554f12c9",
        "https://www.evernote.com/shard/s586/sh/7a4620b2-3c6f-a43c-8a48-5f286673203d/34a5c4bebe1c9558d3d1eb9d53bb5e2f",
      ];
      const outline = {
        title: "君に決めた",
        type: "要員",
        member: member,
        score: null,
        url: true,
        detail: "非隣接 発動回数に応じて30・40・50・60p",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            Math.abs(
              member
                .map((c) => i.cards.findIndex((cc) => cc.id.includes(c)))
                .reduce((a, b) => a - b)
            ) > 1,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const keep = i.keeps.find((k) => k.includes(outline.title));
            const keepnumber = keep ? Number(keep.split("/")[1]) : 0;
            const add = 30 + keepnumber * 10;
            o.log.description =
              "```" +
              description[keepnumber] +
              "```" +
              url[keepnumber] +
              "\n判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "非隣接";
            o.log.add = add;
            o.log.notes =
              (keepnumber < 3 ? "(" + (keepnumber + 1) + "/3) " : "") +
              add +
              "p";
            o.keeptext = keepnumber < 3 ? keepnumber + 1 : keepnumber;
            o.log.eptype.push("other", "add", "keep");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["いちぎん", "りんあっ"];
      const outline = {
        title: "今日の火加減は……",
        type: "要員",
        member: member,
        score: null,
        description: "",
        detail:
          "10%：ⒼⓄⓀⒾⒼⒺⓃ 50p\n40%：GOOD 25p\n40%：BAD -25p\n7%：H E L L -50p\n3%：𝐻𝐸𝐿𝐿𝐹𝐼𝑅𝐸 -100p",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            let kigennotes;
            const kigen = {
              ["ⒼⓄⓀⒾⒼⒺⓃ"]: [10, 50],
              ["GOOD"]: [40, 25],
              ["BAD"]: [40, -25],
              ["H E L L"]: [7, -50],
              ["𝐻𝐸𝐿𝐿𝐹𝐼𝑅𝐸"]: [3, -100],
            };
            const d = Math.floor(Math.random() * 100);
            let rate = 0;
            for (const prop of Object.keys(kigen)) {
              rate += kigen[prop][0];
              if (d < rate) {
                outline.score = kigen[prop][1];
                kigennotes = prop;
                break;
              }
            }
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              " " +
              kigennotes;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("other", "random", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["えんどう", "ちょうこ", "ぎんがじ"];
      const outline = {
        title: "黄寮パーティ",
        type: "要員",
        member: member,
        score: 250,
        description: "",
        detail: "ALL黄寮",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            i.cards.every((cc) => cc.dorm == "黄寮"),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "ALL黄寮";
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("other", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["いなさゆ"];
      const outline = {
        title: "作戦会議",
        type: "要員",
        member: member,
        score: 100,
        description: "",
        detail: "ALL決闘部",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            i.cards.every((cc) => cc.club.includes("決闘")),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "ALL決闘部";
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("other", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["さとうこ"];
      const outline = {
        title: "体験入部、全ぶっぱ！",
        type: "要員",
        member: member,
        score: null,
        description: "",
        detail: "部長1人 -50・-40・-30・+70pからランダム ＋💾加算確定",
      };
      if (i) {
        try {
          const target = i.cards.find((cc) => cc.position.includes("部長"));
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            target,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const furutsuki = i.cards.some((cc) => cc.id.match(/^ふるつき/));
            const score = furutsuki ? [70] : [-50, -40, -30, 70];
            const description =
                target.position.includes("アーチェリー部長")
              ? undefined
              : target.position.includes("映画研究部長")
              ? "「あ～～……全問不正解。やる気があるのは立派なことだけどよ、うちは映画研究部だからな。悪いな、帰った帰った」\n「いやクイズ部じゃないだろ～～～っ！？」"
              : target.position.includes("園芸部長")
              ? "「いま……雑草と？」\n「い、言ってないんで！ ぜ～んぜん言ってないんで！！ あ～ほんといい水、いい土、いい光……」"
              : target.position.includes("演劇部長")
              ? "「ハイッ、ワン・トゥ！ ワン・トゥ！ テンポ遅れてるよ～」\n「もしかしてこれダンス部とかなんじゃないか！？ うわっ、あっ、うわ～っ」"
              : target.position.includes("軽音楽部長")
              ? undefined
              : target.position.includes("決闘部長")
              ? "「ふむなるほど。つまり……体験入部か？ ……良いだろう。りこ殿！」\n「えっ！？ あっ、え首席とおれで試合を！？ いやっちょっ待っ……だあ～～～っやってやるよ～～～っ！！」"
              : target.position.includes("鉱物研究部長")
              ? "「ここが鉱研か！ たのもっぐわ～～～っ！！」\n「……えっ、ま、まだ俺何もしてないんだけど！？ 大丈夫！？」\n「ぶ、部員圧怖心折帰鉱研何……」"
              : target.position.includes("裁縫部長")
              ? undefined
              : target.position.includes("サッカー部長")
              ? "「何事もチャレンジは良いことだぞ！ それじゃあ始めようか！」\n「よっしゃ！ おらっ！！ いっっって」"
              : target.position.includes("茶道部長")
              ? "「えっと……これは……これでいいのか？ う……うあ～～～正座が厳しい！ 負けるな負けるな負けるな」\n「あらあら～、元気があってよろしいですね～。でも、点てるときは静かにおねがいしますね～」"
              : target.position.includes("写真部長")
              ? "「えっこれどこが何？ シャッターんとこ押せればいいってだけじゃないのか……」\n「いいよ～小麦ちゃん！ 順調だよ～」\n「……いやおれ撮ってないで教えてくれよ！！」"
              : target.position.includes("新聞部長")
              ? '「全然なっていませんね……見てください、これが本物の"土下座"です」\n「土下座部ならおれもいけるかも……って違うだろ！！」'
              : target.position.includes("調理部長")
              ? "「……まさかこんなわかりやすく失敗することある！？」\n「うん、火の扱いには繊細さが求められるね。この黒さをただの黒さと見ないで、この奥に自分自身のありかたを見るのがたいせつよ、小麦！ わたしの炒飯食べな」"
              : target.position.includes("天文部長")
              ? "「今は特に何もできることは無いよ。星が見たければ時間帯を考えて、もう一度計画を立て直した方がいい」\n「な、なるほど～また来ます～(うちの首席じゃん……)」"
              : target.position.includes("ドロップボール部長")
              ? "「いてっ！！ 部長さんこれ100%自分のケツにボールブチ当たんだけどそういう競技で合ってる？」\n「どうやったらそんなことになりますの～～～！？」"
              : target.position.includes("美術部長")
              ? "「いやおれ今も美術部……」\n「ようこそ～！ え～っと、佐藤さん？ って絵描いてた人～？ 初めてでも大丈夫だからね」\n「あ、あれ？ 記憶ない感じっすか？ 部長？」"
              : target.position.includes("文芸部長")
              ? "「さて原稿の調子はど……佐藤さんいい字書くねッこの直線的で単純化された筆画で形成される字形、直情的で素朴なエネ」\n「うわっ何何何おまえッ！ っていうか文芸部なんだから内容の話しろよ！」"
              : target.position.includes("ボランティア部長")
              ? "「ゴミ拾いはボランティアの基本だぞ、佐藤くん！ 順調だな！」\n「はあ～こうやってきれいな街が作られるんすね～……(手ごたえないな……)」"
              : target.position.includes("魔機工作部長")
              ? "「なんだこれ、どう使うんだ？ うわっ、これ取れていいやつ？ まあいいか、よ～し……」\n「あ、あ、ああもう！ 終わり！ もう十分だろ！？ 帰ってくれよお～！」"
              : target.position.includes("魔法チャトランガ部長")
              ? "「……えっそん……え？ もうだめだ～～～！！ おれにはなんもわかんね～～～！！」\n「うーん、でも挑戦は素敵なことだよ佐藤さん！ また来てね」"
              : target.position.includes("漫画研究部長")
              ? "「漫研！ ここならいけるっ！ 体験入部だ～～～～～っ」\n「古月くん……？ な、なんなんですかこの人は……？」"
                + (furutsuki ? "\n「部長危ない！ そいつは超面白人間です。部長では吹き飛ばされてしまう！」\n「超面白人間！？」" : "")
              : target.position.includes("陸上部長")
              ? undefined
              : target.position.includes("流星部長")
              ? "「ぜえ……ぜえ……も、もうだめだ……」\n「さて、じゃあウォーミングアップはこのくらいにして、さっそく頑張ってみようか！」\n「えっ？」"
              : undefined;
            const add = score[Math.floor(Math.random() * score.length)];
            o.log.description =
              (description ? "```" + description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "部長(" +
              tools.emj(target) +
              ") ランダム" +
              (furutsuki ? " 💾加算確定" : "");
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.eptype.push("other", "add", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["あらんあ"];
      const outline = {
        title: "たのもー！",
        type: "要員",
        member: member,
        score: null,
        description: "",
        detail: "首席1人 ±50p (👑+30p 🔨-30p)",
      };
      if (i) {
        try {
          const target = i.cards.find((cc) => cc.position.includes("首席"));
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            target,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const description =
                target.position.includes("四素科首席")
              ? "「今暇か？バドミントンしない？」\n「アラン、ちょうどよかった！書類仕事で肩が凝ってきたところだったんだ。すぐに行くから、少し待っててくれないかな？」\n「おっ、さすが生徒会長。満点の返事じゃな！うむうむ」"
              : target.position.includes("間法科首席")
              ? "「アルトから聞いたぞ、おぬしが間法科の首席じゃな？」\n「……あ？」"
              : target.position.includes("魔対科首席")
              ? "「よう、アラン。今日はどんな手品を見せてくれるんだ？」\n「フフフ……そんな余裕ぶったイケメン顔をしていられるのも今のうちじゃ、ディアナ！同室のネコチャンの前で吠え面かかせてくれるわ！」\n「…へえ？」\n「ひえっ」"
              : target.position.includes("魔動科首席")
              ? "「たのもーー！！イルマは……っておわー！？」\n「あ、アランだ。よっす～」\n「！！かんさろ降く早でいなてめ眺とっーぼ！っーらこ」\n「……本当におもしろいね、君」"
              : target.position.includes("魔視科首席")
              ? "「行くぞウララ！」\n「全くしょうがないですねえ先輩はこのスーパー脚長つよつよ後輩の蛇口ぶっ壊れ魔法ビッグウェーブで綺麗さっぱり洗い流してあげますよ」\n「誰！？」"
              : target.position.includes("魔装科首席")
              ? "「決めたぞイルマ！今日の相手はリコ・オットーじゃ！」\n「えっほんとー！？やったー！！」\n「まだ呼んでない！！部室で待っとれ！！」\n「え～？待ちきれないから一緒に行こっ！」\n「え？ちょっ………ｵﾜｰｯ」"
              : target.position.includes("魔変科首席")
              ? "「アラン君じゃないか！来てくれたんだね！！✨」\n「よう、ウ\n「先輩、今日は何をしますか！？」\n「あの、\n「にらめっこかい？ジェスチャー対決？」\n「\n「なんだって相手になってやる！さあかかって来い！」\n「話を聞けーーーっ！！」"
              : target.position.includes("魔魂科首席")
              ? "「きさまーーっ！わしの肝が小さいと言ったか！？」\n「えっ言ってないけど」\n「見ておれ！わしが廃病院とかに1人で行ってもへいちゃらなところを見せてくれるわ！！」\n「いや、やめておいたほうが…あーあ……」"
              : undefined;
            const add =
              (Math.random() < 0.5 ? 50 : -50) +
              (target.id.match(/^あるとあ/)
                ? 30
                : target.id.match(/^だいりお/)
                ? -30
                : 0);
            o.log.description =
              (description ? "```" + description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "首席(" +
              tools.emj(target) +
              ") ランダム";
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.eptype.push("other", "add", "random");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["おにこう", "いちぎん"];
      const outline = {
        title: "早撃ち勝負",
        type: "要員",
        member: member,
        score: 50,
        description: "",
        detail: "【一閃】【クイックドロー】衝突",
      };
      if (i) {
        try {
          const kikuna = i.prefields.find(
            (pf) => pf.type == "effect" && pf.title == "一閃"
          );
          const ginta = i.prefields.find(
            (pf) => pf.type == "effect" && pf.title == "クイックドロー"
          );
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            kikuna,
            ginta,
            i.cards.findIndex((cc) => cc.id.includes("おにこう")) <
              i.cards.findIndex((cc) => cc.id.includes("いちぎん")),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.notes =
              kikuna.add > ginta.add
                ? "勝者" +
                  tools.emj(i.cards.find((cc) => cc.id.includes("おにこう")))
                : kikuna.add < ginta.add
                ? "勝者" +
                  tools.emj(i.cards.find((cc) => cc.id.includes("いちぎん")))
                : "引分";
            o.log.description =
              "```" +
              (kikuna.add > ginta.add
                ? "「今は拙者には届かぬ──が、貴殿には期待している。仲間と共に研鑽を重ね強くなれ、一条銀弾よ」"
                : kikuna.add < ginta.add
                ? "「たった一発、やっとあんたに届いたぜ……鬼首部長！！」"
                : "「引き分けぇ！？ 納得いかねーよ！ もっかい！ 部長もっかい！！」\n「し、しかしだな……」") +
              "```判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "【一閃】【クイックドロー】衝突";
            o.log.add = outline.score;
            o.log.notes += " " + outline.score + "p";
            o.log.eptype.push("checkfx", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {f:(i)=>{const member = ["きのした", "れいもん"];
           const outline = {title:"祓ってあげましょう", type:"要員", member:member, score:50,
                            description: "「あれは購買名物「スペシャルカツパン」が目の前で売り切れてしまったときの哀しみや怨み、無念が集まって生まれた魔物です……さあ、必ずや祓ってあげましょう……！」\n「はい……っ」",
                            detail: "【かわいそう……】合計点200p未満", };
           if(i){try{const cons = [member.every(c=>[...i.cards,...i.Tcards].some(cc=>cc.id.slice(0,4)==c)),
                                   i.prefields.some(pf=>pf.type=="effect"&&pf.title=="かわいそう……"),
                                   i.totalP<200];
                     if(cons.every(con=>con)){const o=JSON.parse(JSON.stringify(epoutput)); o.log.title=outline.title;
                                              o.log.description="```"+(i.totalP+outline.score<200?'「あれは惜しくもチケット獲得を逃してしまった人の哀しみや怨み、無念が集まって生まれた魔物です……さあ、必ずや祓ってあげましょう……！」\n「はい……っ」'
                                                                                                 :outline.description)
                                              +"```判定："+outline.member.map(id=>tools.emj([...i.cards,...i.Tcards].find(cc=>cc.id.slice(0,4)==id))).join("")+outline.detail;
                                              o.log.add=outline.score; o.log.notes=outline.score+"p"; o.log.eptype.push("add");
                                              return o;}else return;}
                 catch(error){return{error:true,title:outline.title,message:error.message};};
           }else return outline; },
  },
  {
    f: (i) => {
      const member = ["いばらき", "やまだあ"];
      const outline = {
        title: "販売行為は禁止です",
        type: "要員",
        member: member,
        score: -50,
        description:
          "「オレは音楽を諦めない。この戦いを目に焼き付けておけよ！」\nルカはこちらを指差し、不敵な笑みを浮かべながら引きずられていった。",
        detail: "50% 石蕗がいるとさらにランダムで±20p加算",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            Math.floor(Math.random() * 100) < 50,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            if (i.cards.some((cc) => cc.id.match(/^つわぶき/))) {
              outline.member.push("つわぶき");
              outline.score += Math.floor(Math.random() * 2) ? 20 : -20;
              o.log.eptype.push("random");
            }
            o.log.description =
              "```" +
              outline.description +
              "```判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "50%";
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("other", "prob", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["こうせい", "だいりお"];
      const outline = {
        title: "1人は寂しいじゃないですか！",
        type: "要員",
        member: member,
        score: 50,
        description: "",
        detail: "他に大理の縁なし",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            !i.relationlog.some(
              (rl) =>
                rl.ids.some((id) => id.match(/^だいりお/)) &&
                !rl.ids.some((id) => id.match(/^こうせい/))
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "他に大理の縁なし";
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("other", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["さなげな", "いばらき"];
      const outline = {
        title: "魔物の晩餐",
        type: "要員",
        member: member,
        score: null,
        description:
          "「魔物を摂食……なるほど！ であればこう煮るのは……」\n「魔物を調理……なるほど？ だったらこの魔物なら……」\n「「いただきまーす」」",
        detail: "22-5時 教師・赤寮長不在 レアリティ合計×9p",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            22 <= i.date.getHours() || i.date.getHours() < 5,
            !i.cards.some((cc) => cc.position.includes("赤寮長")),
            i.Tcards.length == 0,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const rarities = i.cards
              .map((cc) => cc.rarity)
              .reduce((a, b) => a + b);
            const add = rarities * 9;
            o.log.description =
              "```" +
              outline.description +
              "```判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "22-5時 教師・赤寮長不在 生徒カードレアリティ合計×9p";
            o.log.add = add;
            o.log.notes = rarities + "×9 = " + add + "p";
            o.log.eptype.push("other", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["かげゆこ", "くどうよ"];
      const outline = {
        title: "ゆっちゃん前日譚",
        type: "要員",
        member: member,
        score: 50,
        description:
          "「ぜひ『ゆっち』と呼んでほしいですわ」\n「じゃ、じゃあ……よろしくね、ゆっち」\n「！」",
        detail: "隣接",
      };
      if (i) {
        try {
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            Math.abs(
              member
                .map((c) => i.cards.findIndex((cc) => cc.id.includes(c)))
                .reduce((a, b) => a - b)
            ) == 1,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "隣接";
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("other", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["きむちゅ雪", "めろばた雪"];
      const outline = {
        title: "⛄ありがとうの印に",
        type: "要員",
        member: member,
        score: 50,
        description:
          "「ね、ねえ、見て……！ 雪で、ウサギさんを作ったよ……！」\n「え、凄いですねー。これ、アタシに？」\n「う、うん……ありがとうの、印に」",
        url: "https://www4.hp-ez.com/hp/magica-penta-event/february/8",
        detail: "【雪うさぎできたよ！】成功",
      };
      if (i) {
        try {
          const cons = [
            member.every((id) => i.cards.some((cc) => cc.id == id)),
            i.prefields.some(
              (pf) =>
                pf.type == "effect" &&
                pf.title == "雪うさぎできたよ！" &&
                pf.add > 0
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              "```" +
              outline.description +
              "```" +
              outline.url +
              "\n判定：" +
              outline.member
                .map((id) => tools.emj(i.cards.find((cc) => cc.id == id)))
                .join("") +
              outline.detail;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("checkfx", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["しちりが雪", "れみゅえ雪"];
      const outline = {
        title: "⛄協力してくれないだろうか",
        type: "要員",
        member: member,
        score: 70,
        description:
          "「どうか……七里ヶ浜くんも、僕達に協力してくれないだろうか。このとおりだ！」\nレミュエラはマウイに対し、頭を下げた。",
        url: "https://www4.hp-ez.com/hp/magica-penta-event/february/6",
        detail: "順序通り 距離不問",
      };
      if (i) {
        try {
          const cons = [
            member.every((id) => i.cards.some((cc) => cc.id == id)),
            Math.abs(
              i.cards.findIndex((cc) => cc.id == "しちりが雪") <
                i.cards.findIndex((cc) => cc.id == "れみゅえ雪")
            ) == 1,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              "```" +
              outline.description +
              "```" +
              outline.url +
              "\n判定：" +
              outline.member
                .map((id) => tools.emj(i.cards.find((cc) => cc.id == id)))
                .join("") +
              outline.detail;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("other", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["あじすか雪", "じゅつら雪"];
      const outline = {
        title: "⛄最後の対決",
        type: "要員",
        member: member,
        score: 70,
        description:
          "「結局こうなるか、十文字！ この一投で決めるぞ！」\n「ふふ……今日こそ勝たせてもらいますね、苛烈さん！」",
        url: "https://www4.hp-ez.com/hp/magica-penta-event/february/8",
        detail: "他に赤寮・青寮なし",
      };
      if (i) {
        try {
          const cons = [
            member.every((id) => i.cards.some((cc) => cc.id == id)),
            !i.cards.some(
              (cc) => !cc.id.match(/^あじすか/) && cc.dorm == "赤寮"
            ),
            !i.cards.some(
              (cc) => !cc.id.match(/^じゅつら/) && cc.dorm == "青寮"
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              "```" +
              outline.description +
              "```" +
              outline.url +
              "\n判定：" +
              outline.member
                .map((id) => tools.emj(i.cards.find((cc) => cc.id == id)))
                .join("") +
              outline.detail;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("other", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["じゅつら雪", "めろばた雪"];
      const outline = {
        title: "⛄自分の良い所",
        type: "要員",
        member: member,
        score: 70,
        description:
          "「メロさんには、メロさんが気付いてない良い所が、きっと他にもたくさんあります。\n大丈夫、メロさんはいつも努力していることを知っています。きっと、見つかると思いますよ」",
        url: "https://www4.hp-ez.com/hp/magica-penta-event/february/4",
        detail: "【雪うさぎできたよ！】失敗",
      };
      if (i) {
        try {
          const cons = [
            member.every((id) => i.cards.some((cc) => cc.id == id)),
            i.prefields.some(
              (pf) =>
                pf.type == "effect" &&
                pf.title == "雪うさぎできたよ！" &&
                pf.add == 0
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              "```" +
              outline.description +
              "```" +
              outline.url +
              "\n判定：" +
              outline.member
                .map((id) => tools.emj(i.cards.find((cc) => cc.id == id)))
                .join("") +
              outline.detail;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("checkfx", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["めろばた雪", "うららあ雪"];
      const outline = {
        title: "⛄バンジカイケツ",
        type: "要員",
        member: member,
        score: 50,
        description:
          "「たしか、メロ先輩って魔力が食事の代わりなんですよね？ だったらウララちゃんの魔力、食べちゃえばいいんですよ～」",
        url: "https://www4.hp-ez.com/hp/magica-penta-event/february/5",
        detail: "隣接",
      };
      if (i) {
        try {
          const cons = [
            member.every((id) => i.cards.some((cc) => cc.id == id)),
            Math.abs(
              i.cards.findIndex((cc) => cc.id == "めろばた雪") -
                i.cards.findIndex((cc) => cc.id == "うららあ雪")
            ) == 1,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              "```" +
              outline.description +
              "```" +
              outline.url +
              "\n判定：" +
              outline.member
                .map((id) => tools.emj(i.cards.find((cc) => cc.id == id)))
                .join("") +
              outline.detail;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("other", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["はなてん雪", "しちりが雪"];
      const outline = {
        title: "⛄友情パワー",
        type: "要員",
        member: member,
        score: 50,
        description:
          "「なあガッテン！ 一緒に雪合戦しよーぜ！ 俺とオマエならぜって～負けねえし、ぜって～……楽しいからさ！」",
        url: "https://www4.hp-ez.com/hp/magica-penta-event/february/7",
        detail: "各効果発動",
      };
      if (i) {
        try {
          const cons = [
            member.every((id) => i.cards.some((cc) => cc.id == id)),
            i.prefields.some(
              (pf) => pf.type == "effect" && pf.fxowner.id == "はなてん雪"
            ),
            i.prefields.some(
              (pf) => pf.type == "effect" && pf.fxowner.id == "しちりが雪"
            ),
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            o.log.description =
              "```" +
              outline.description +
              "```" +
              outline.url +
              "\n判定：" +
              outline.member
                .map((id) => tools.emj(i.cards.find((cc) => cc.id == id)))
                .join("") +
              outline.detail;
            o.log.add = outline.score;
            o.log.notes = outline.score + "p";
            o.log.eptype.push("checkfx", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    f: (i) => {
      const member = ["つちみか事", "びぜんお事"];
      const outline = {
        title: "📔こいつは怪しいと思ってた！",
        type: "要員",
        member: member,
        score: null,
        description: "",
        detail:
          "50%の確率で、あるいは隣接しているとき口論が白熱しランダムで30～70p加算する。",
        eventdescription:
          "《イベント》この効果による得点から15pごとに1個ずつ証拠品を追加獲得する。",
      };
      if (i) {
        try {
          const cons = [
            member.every((id) => i.cards.some((cc) => cc.id == id)),
            Math.floor(Math.random() * 100) < 50 ||
              Math.abs(
                i.cards.findIndex((cc) => cc.id == "つちみか事") -
                  i.cards.findIndex((cc) => cc.id == "びぜんお事")
              ) == 1,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const add = Math.floor(Math.random() * 5 + 3) * 10;
            o.log.description =
              (outline.description ? "```" + outline.description + "```" : "") +
              "判定：" +
              outline.member
                .map((id) => tools.emj(i.cards.find((cc) => cc.id == id)))
                .join("") +
              "50%か隣接 ランダム";
            if (i.event && i.event.id == "MYSTERY") {
              const iindex = 0;
              o.log.eventitems.index = iindex;
              const iadd = Math.floor(add / 15);
              o.log.eventitems.add = iadd;
              o.log.description +=
                "\n" +
                outline.eventdescription +
                "\n獲得：" +
                i.event.item[iindex].emoji +
                " ×" +
                iadd;
            }
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.eptype.push("other", "prob", "random", "add", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {forevent:true,
    f: (i) => {
      const outline = {
        title: "🏖️宝探し",
        type: "イベント",
        member: [],
        description:
          "《イベント》黄寮か海カードが2枚以上出ているとき、浜辺でランダムなアイテムを獲得する。",
      };
      if (i) {
        try {
          const targets = [...i.cards, ...i.Tcards].filter(
            (cc) => cc.dorm == "黄寮" || (cc.eventid && cc.eventid == "BEACH")
          );
          const cons = [i.event && i.event.id == "BEACH", targets.length >= 2];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const itemlist = [
              { name: "💠シーグラス", prob: 0.5, iindex: 0, iadd: targets.length * 2 },
              { name: "🪵流木", prob: 0.15, iindex: 1, iadd: targets.length * 2 },
              { name: "🍌バナナの皮", prob: 0.15, iindex: 2, iadd: targets.length * 2 },
              { name: "🎁宝箱", prob: 0.2, iindex: 3, iadd: 1 },
            ];
            let prob = 0;
            let item;
            const randomnum = Math.random(); //0～0.99...が出る
            for (let i = 0; i < itemlist.length; i++) {
              prob += itemlist[i].prob;
              if (randomnum < prob) {
                item = itemlist[i];
                break;
              }
            }
            const iindex = item.iindex;
            o.log.eventitems.index = iindex;
            const iadd = item.iadd;
            o.log.eventitems.add = iadd;
            o.log.description =
              outline.description +
              "\n判定：" +
              targets.map((cc) => tools.emj(cc)).join("") +
              "\n__✨お宝を発見した！__\n獲得：" +
              item.name +
              " ×" +
              iadd;
            o.log.eptype.push("other", "random", "event");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    myfxid: "df",
    f:(i)=>{const outline = {title:"📜なし", type:"", member:[], description: ""};
      if(i){try{return;}catch(error){return{error: true, title: outline.title, message: error.message};}}
      else return outline;
    },
  },
  {
    myfxid: "tg",
    f: (i) => {
      const outline = {
        title: "😈告げ口",
        type: "裏",
        member: [],
        description:
          "教師が出ていないとき、マイナス値を出している得点加算・乗算効果の数×50p加算する代わりにその倍獲得コインを減らす。",
      };
      if (i) {
        try {
          const minusfxs = i.prefields.filter(
            (pf) =>
              pf.type == "effect" &&
              pf.fxtype &&
              ((pf.fxtype.includes("add") && pf.add < 0) ||
                (pf.fxtype.includes("mul") && pf.mul < 0))
          );
          const cons = [
            i.myfx == "tg",
            minusfxs.length > 0,
            i.Tcards.length == 0,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const add = minusfxs.length * 50;
            const coinadd = add * -2;
            o.log.description = outline.description + "\n《裏取引効果》";
            o.log.add = add;
            o.coinadd = coinadd;
            o.log.notes = add + "p 🪙" + coinadd + "c";
            o.log.eptype.push("myfx", "add", "coinadd");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    myfxid: "bn",
    f: (i) => {
      const outline = {
        title: "😈マジカルバナナ",
        type: "裏",
        member: [],
        description:
          "黄寮カードが3枚以上出ているとき、バナナの魔物に足を滑らされてみんなでその場で0.5～2回転する。\n(回転数+1)×50pを、ぴったりで加算、そうでなければ減算。",
      };
      if (i) {
        try {
          const targets = i.cards.filter((cc) => cc.dorm == "黄寮");
          const takara = i.prefields.find(pf=>pf.type=='episode'&&pf.title=='🏖️宝探し')
          const cons = [i.myfx == "bn", targets.length >= 3];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput)); o.log.title = outline.title;
            
            const bananagetting = (i.event&&i.event.id=='BEACH'&&takara&&takara.eventitems.index=='2');
            const bananaholding = (i.event&&i.event.id=='BEACH'&&Number(i.ploga[3].split(":")[5].split("/")[1].split(" ")[2]) >= 30);
            
            const turn = bananagetting ? 1 : Math.floor(Math.random() * 4 + 1) / 2;
            const add = (turn + 1) * 50 * ((bananaholding||Number.isInteger(turn)) ? 1 : -1);
            o.log.description = outline.description
                              + ((bananagetting||bananaholding) ? '\n《イベント》' : '' )
                              + ((bananagetting&&!bananaholding) ? '📖『🏖️宝探し』で🍌バナナの皮を獲得していた場合、必ずぴったり1回転する。':'')
                              + ((bananaholding) ? '🍌バナナの皮を30個以上持っている場合、必ず加算になり、📖『🏖️宝探し』で獲得したアイテムの最終獲得数を倍にする。':'')
                              + "\n結果：" + (Number.isInteger(turn) ? "ぴったり"+turn+"回転！" : Math.floor(turn)+"回転半……。") + "\n《裏取引効果》";
            o.log.add = add;
            o.log.notes = add + "p" + ((!Number.isInteger(turn)&&bananaholding)?'🍌':'');
            o.log.eptype.push("myfx", "add", "random");
            
            if(bananaholding){
              o.log.eptype.push('event');
              o.log.eventitems.index=takara.eventitems.index;
              o.log.eventitems.mul=2;
            };
            
            return o;
          } else return;
        } catch (error) { return { error: true, title: outline.title, message: error.message }; }
      } else return outline;
    },
  },
  {
    myfxid: "sg",
    f: (i) => {
      const outline = {
        title: "😈奨学金制度",
        type: "裏",
        member: [],
        description:
          "ここまでの合計点が200p未満のとき500c獲得するが、「貸与額」が10000cに達するたびに返済モードに切り替わり、My効果・合計点に関わらず10回まで50p・500cを失い続ける。終了後貸与モードに戻る。",
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(epoutput));
          o.log.title = outline.title;
          o.log.description = outline.description + "\n《裏取引効果》";
          o.log.eptype.push("myfx", "coinadd", "keep");
          const keep = i.keeps.find((k) => k.includes(outline.title));
          if (keep && keep.split("/")[1].startsWith("返済")) {
            o.log.eptype.push("add");
            const keeptexts = keep.split("/")[1].split("：");
            const add = -50;
            const coinadd = -500;
            keeptexts[1] = Number(keeptexts[1]) + 1;
            o.log.add = add;
            o.coinadd = coinadd;
            o.log.notes = add + "p 🪙" + coinadd + "c";
            o.log.description += "返済(" + keeptexts[1] + "/10回)";
            o.keeptext = keeptexts[1] == 10 ? "貸与：0" : keeptexts.join("：");
            return o;
          } else if (
            i.myfx == "sg" &&
            (!keep || (keep && keep.split("/")[1].startsWith("貸与"))) &&
            i.totalP < 200
          ) {
            const keeptexts = keep
              ? keep.split("/")[1].split("：")
              : ["貸与", 0];
            const coinadd = 500;
            keeptexts[1] = Number(keeptexts[1]) + coinadd;
            o.coinadd = coinadd;
            o.log.notes = "🪙" + coinadd + "c";
            o.log.description += "貸与(" + keeptexts[1] + "c)";
            o.keeptext =
              keeptexts[1] >= 10000 ? "返済：0" : keeptexts.join("：");
            return o;
          }
          return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {
    myfxid: "cd",
    f: (i) => {
      const outline = {
        title: "😈禁断のCDショップ", type: "裏", member: [],
        description:
          "ここまでの合計点が500pを超えていてかつ音楽タグを持つカードがあるとき、現在の合計点の半分を減算し、さらにその半分を記憶。次回以降、新規に記憶が行われないかぎり記憶した点を連続で3回まで加算。加減算の値は小数点以下切捨。",
      };
      if (i) {
        try {
          const o = JSON.parse(JSON.stringify(epoutput)); o.log.title = outline.title; o.log.description = outline.description + '\n《裏取引効果》';
          o.log.eptype.push("myfx", "add", "keep");
          let add = 0;
          const keep = i.keeps.find((k) => k.includes(outline.title));
          
          const cons = [(i.myfx == 'cd'),
                        (500<i.totalP),
                        ([...i.cards, ...i.Tcards].some(cc=>cc.tag.split('/').includes('音楽'))) ];
          if(cons.every(con=>con)){
            add = Math.floor(i.totalP/2)*(-1);
            const storing = Math.floor(i.totalP/4);
            o.log.description += '記憶：' + storing + 'p';
            o.keeptext = storing + '：3';
          }
          else if(keep){
            const keeptexts = keep.split('/')[1].split('：').map(n=>Number(n));
            if(0<keeptexts[1]){
              add = keeptexts[0];
              keeptexts[1]--;
              o.log.description += '残り' + keeptexts[1] + '回' + (keeptexts[1]==0 ? '(終了)' : '');
              o.keeptext = keeptexts.join('：');
            };
          };
          if(add!==0){
            o.log.add = add;
            o.log.notes = add + 'p';
            return o;
          };
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },

  {
    f: (i) => {
      const member = ["ふるつき"];
      const outline = {
        title: "良い話をありがとう",
        type: "要員",
        member: member,
        score: null,
        description: "「興味深い、記録しておこう」",
        detail: "エピソード効果が出ていると古月が喜んでその数×50pを加算する。",
      };
      if (i) {
        try {
          const episodes = i.prefields.filter((pf) => pf.type == "episode");
          const cons = [
            member.every((c) => i.cards.some((cc) => cc.id.slice(0, 4) == c)),
            episodes.length > 0,
          ];
          if (cons.every((con) => con)) {
            const o = JSON.parse(JSON.stringify(epoutput));
            o.log.title = outline.title;
            const add = episodes.length * 50;
            o.log.description =
              "```" +
              outline.description +
              "```判定：" +
              outline.member
                .map((id) =>
                  tools.emj(i.cards.find((cc) => cc.id.slice(0, 4) == id))
                )
                .join("") +
              "📖".repeat(episodes.length);
            o.log.add = add;
            o.log.notes = add + "p";
            o.log.eptype.push("other", "add");
            return o;
          } else return;
        } catch (error) {
          return { error: true, title: outline.title, message: error.message };
        }
      } else return outline;
    },
  },
  {forevent:true,
   f:(i)=>{
           const outline = {title:'⛺キャンプカレー', type:'イベント', member:[],
                            description:'《イベント》場のカードの科目・効果等に応じて具材を集め、8回プレイするごとにカレーを作る。具材総数に応じたイベントアイテムを獲得する。',};
           if(i){try{if(i.event&&i.event.id=='CAMP'){
                       //準備
                       const o=JSON.parse(JSON.stringify(epoutput)); o.log.title=outline.title;
                       const guzailist = [{id:0, emoji:'🌶️', major:'魔対', cardid:'りんあっ山', name:['スパイシー', 'スーパースパイシー', '赤の極激辛']},
                                          {id:1, emoji:'🥚', major:'四素', cardid:'ふーかか山', name:['エッグ', 'マイルドエッグ', 'とろ～りまろやかたまごの']},
                                          {id:2, emoji:'🥔', major:'間法', cardid:'のーしゅ山', name:['ポテト', 'ごろごろポテト', 'ごろごろホクホクじゃがいも']},
                                          {id:3, emoji:'🥕', major:'魔動', cardid:'うつしみ山', name:['にんじん', 'どっさりにんじん', 'どっさりあざやかにんじん']},
                                          {id:4, emoji:'🍄', major:'魔視', cardid:'さなげな山', name:['きのこ', 'きのこたっぷり', 'きのこの旨味たっぷり']},
                                          {id:5, emoji:'🥬', major:'魔装', cardid:'あさつき山', name:['ベジタブル', '超ベジタブル', '超本格サグ']},
                                          {id:6, emoji:'🦑', major:'魔変', cardid:'さいとう山', name:['シーフード', '贅沢シーフード', '海の恵みの贅沢シーフード']},
                                          {id:7, emoji:'🥩', major:'魔魂', cardid:'ささそう山', name:['ビーフ', 'ドカ盛りビーフ', '欧風豪快ビーフ']}];
                       const guzaiget = [0,0,0,0,0,0,0,0];
                       const guzaireason = ['','','','','','','',''];
                       const baikalist = [{id:0, emoji:'🪖', cardid:'りゅうお山', name:['南極', '永久凍土マンモス']},
                                          {id:1, emoji:'👋', cardid:'りちゃー山', name:['パワフル', '仕上がってるよ！ ']},];
                       const baikaget = [0,0];
                       //キープチェック 0：0,0,0,0,0,0,0,0：0,0 カウントアップも同時に
                       const keeps = i.keeps.find(k=>k.includes(outline.title));
                       const newinfos = {count:0, guzai:[0,0,0,0,0,0,0,0], baika:[0,0]};
                       let   infos = (keeps) ? {count:Number(keeps.split('/')[1].split('：')[0]),
                                                guzai:       keeps.split('/')[1].split('：')[1].split(',').map(n=>Number(n)),
                                                baika:       keeps.split('/')[1].split('：')[2].split(',').map(n=>Number(n))}
                                             : newinfos;
                       infos.count++; o.log.notes='('+infos.count+'/8回)';

                       //科目具材チェック
                       const cards = [...i.cards, ...i.Tcards];
                       const majors = cards.filter(c=>c.major).map(c=>c.major);
                       const majorlist = [...new Set(majors)];
                       majorlist.forEach(major=>{if(majors.filter(m=>m==major).length>=2){ //具材獲得
                                                   const guzai = guzailist.find(g=>g.major==major);
                                                   guzaiget[guzai.id]+=Math.floor(majors.filter(m=>m==major).length/2);
                                                   guzaireason[guzai.id]+='m';
                                                 }});
                       //効果具材チェック
                       const guzaifxs = i.prefields.filter(pf=>pf.type=='effect'&&pf.special=='curry'&&pf.fxowner.genre=='stTm');
                       if(guzaifxs.length>0){guzaifxs.forEach(fx=>{const guzai = guzailist.find(g=>g.cardid==fx.fxowner.id);
                                                                   guzaiget[guzai.id]++;
                                                                   guzaireason[guzai.id]+='f'; }); };
                       //教師チェック
                       if(i.Tcards.length>0){i.Tcards.forEach(tc=>{const baika = baikalist.find(b=>b.cardid==tc.id);
                                                                   if(baika) baikaget[baika.id]++; }) };


                       //具材集計
                       infos.guzai = infos.guzai.map((g,index)=>g+guzaiget[index]);
                       infos.baika = infos.baika.map((b,index)=>b+baikaget[index]);
                       o.log.description= ([...guzaiget, ...baikaget].every(g=>g==0) ? '具材調達なし'
                                           : '具材調達！：'
                                           +[...guzaiget.map((g,index)=>(g==0)?'':guzailist[index].emoji+'×'+g+'('
                                                         +(guzaireason[index].includes('m') ? tools.ReSymbolizeC(i.client, i.message, data.symbols, guzailist[index].major, 'major', 'majoremj') : '')
                                                         +(guzaireason[index].includes('f') ? tools.emj(guzaifxs.find(fx=>fx.fxowner.id==guzailist[index].cardid).fxowner) : '')
                                                         +')'),
                                            (baikaget.every(b=>b==0) ? '' : '😋'+(2**baikaget.reduce((a,b)=>a+b))+'倍('+baikaget.map((b,index)=>b==0?'':baikalist[index].emoji).join('')+')')
                                            ].filter(g=>g).join(' ')
                                          )
                                          + '\n現在の具材：'+(infos.guzai.every(g=>g==0) ? 'なし' : infos.guzai.map((g,index)=>guzailist[index].emoji.repeat(g)).join(''))
                                                          +(infos.baika.every(b=>b==0)?'':' + 😋'+(2**infos.baika.reduce((a,b)=>a+b))+'倍');

                       if(infos.count>=8){ //8回目
                         const failure = ['ざんねん', 'うっかり', 'ボンビー', '肩透かし', '珍妙', 'いまいち', '手違い', '出来損ない', '極限節約', 'ある意味ヘルシー', '……たぶん', '道半ば', 'ギリ', 'ミニマリストの', 'お祈り'];
                         const guzaisum = infos.guzai.reduce((a,b)=>a+b);
                         const success = guzaisum>=7;
                         const baikasum = success ? 2**infos.baika.reduce((a,b)=>a+b) : 1;
                         const currypoint = infos.guzai.map((g,index)=>g*(['🥚','🥩'].includes(guzailist[index].emoji) ? 2 : 1)*(g>=4&&success?2:1)).reduce((a,b)=>a+b);
                         //イベントアイテム獲得
                         const iindex = 0; o.log.eventitems.index = iindex;
                         const iadd = currypoint*baikasum; o.log.eventitems.add = iadd;
                         //各キャラセリフ
                         const srflines = i.omsgs.map(message => message.content).join('\n').split('\n').filter(l=>l.split('＠＠')[2]=='カレー'+(success?'成功':'失敗'));
                         const srfline = srflines[Math.floor(Math.random()*srflines.length)];
                         const serifu = tools.emj(i.characters.find(chr=>chr.name==srfline.split('＠＠')[0]))+'「'+srfline.split('＠＠')[1]+'」';
                         //カレー名決定
                         let curryname = '';
                         if(success){ //まずは教師
                                      curryname += infos.baika.map((b,index) => b==1 ? baikalist[index].name[0]
                                                                              : b>=2 ? baikalist[index].name[1] : '').join('');
                                      //つぎに具材
                                      if(infos.guzai.every(g=>g<=1)) curryname += 'よくばりミックス';
                                      else{ infos.guzai.forEach((g,index)=>{
                                              if(g>=2) curryname += (g==2) ? guzailist[index].name[0]
                                                                  : (g==3) ? guzailist[index].name[1]
                                                                           : guzailist[index].name[2];
                                            }); }; }
                         else       { curryname = failure[Math.floor(Math.random()*failure.length)] };
                         //リザルト作成
                         o.log.description+='\n👉__🍛カレー作りタイム！__\n完成！ '+curryname+'カレー'
                                           +(!success?'': guzaisum<=7  ? '(小盛)'
                                                        : guzaisum>=12 ? '(超大盛)'
                                                        : guzaisum>=10 ? '(大盛)' : '')
                                           +'( 😋'+iadd+' )'+(success?'！':'？')+'\n'
                                           +serifu;
                         o.log.eptype.push('event');
                         infos = newinfos;
                       };

                       o.keeptext = infos.count +'：'+ infos.guzai.join(',') +'：'+ infos.baika.join(','); o.log.eptype.push('keep');
                       return o;
                     }else return;}
                 catch(error){return{error:true, title:outline.title, message:error.message};};}
           else return outline; }
  },
  {forevent:true,
   f:(i)=>{
           const outline = {title:'🎪スタンプラリー', type:'イベント', member:[],
                            description:'《イベント》寮室を除いた教室🚪の分イベントアイテムを獲得する。'};
           if(i){try{if(i.event&&i.event.id=='FESTIVAL'){
                       const doorlines = i.resultlist.filter(r=>r.includes('🚪')&&!r.includes('寮室'));

                       if(doorlines.length>0){
                         const o=JSON.parse(JSON.stringify(epoutput)); o.log.title=outline.title;
                         o.log.description='今回まわった教室は……';
                         const stamps = i.speciallog.content.split('\n').slice(1).map(list=>
                                          list.split('/').map(group=>
                                            group.split('：').map(text=>text.match(/^\d+$/)?Number(text):text)
                                          )
                                        ); //[ [['名前',0], ['名前',5]], [['名前',0], ['名前',5]], [['名前',0], ['名前',5]] ];
                         const stampsnumBefore = stamps.map(list=>list.filter(group=>group[1]>0).length).reduce((a,b)=>a+b); 
                         let iadd = 0;
                         const doors = doorlines.map(l=>l.split('：')[0].replace('🚪','')); //🚪の名前リストです
                         doors.forEach(door=>{ //🚪の1個ずつに何かします
                           let doortext = false;
                           for(let j=0; j<stamps.length; j++){ //スタンプリストの項目1つ1つに何かします
                             const tarlist = stamps[j];
                             for(let k=0; k<tarlist.length; k++){ //グループの1つ1つに何かします
                               const targroup = tarlist[k];
                               if(targroup[0]==door){ //🚪と一致するグループを発見しました
                                 doortext = (targroup[1]==0) ? '🚪'+door+' 🎶 🔅スタンプGET!'
                                          : (targroup[1]==4) ? '🚪'+door+' 🎶 💮大スタンプGET!'
                                          : (targroup[1]>=5) ? '🚪'+door+' 🎶🎶 💮'
                                                             : '🚪'+door+' 🎶 🔅('+(targroup[1]+1)+'/5回)';
                                 iadd += (targroup[1]>=5) ? 2 : 1 ;
                                 stamps[j][k][1] = (stamps[j][k][1]<5) ? stamps[j][k][1]+1 : 5 ;
                                 break;
                               };
                             };
                             if(doortext) break;
                           };
                           o.log.description+='\n'+doortext;
                         });
                         const stampsnum = stamps.map(list=>list.filter(group=>group[1]>0).length).reduce((a,b)=>a+b);
                         const borderinfo = [{num:10, comment:'Nice！　文化祭は始まったばかりだ！'},
                                             {num:20, comment:'Good！　まだまだ見所はたくさんあるよ、行っておいで！'},
                                             {num:30, comment:'Great！　流石だね、君ならやれるって信じてたよ！'},
                                             {num:40, comment:'Fantastic！　素晴らしい！　……でも、君のことだ。もう少し集められるだろう？　ほら、本気を見せてごらん！'},
                                             {num:50, comment:'Amazing！　……驚いた！　本当にこんなに巡ってくるなんて！'},
                                             {num:52, comment:'Incredible！　ちょっと待ってくれ、君本当に全部巡ったのかい？　……凄いね、凄すぎるよ！'}];
                         const borders = borderinfo.filter(b=>stampsnumBefore<b.num&&b.num<=stampsnum);
                         if(borders.length>0) borders.forEach(b=>{ o.log.description+='\n__🔅スタンプ'+b.num+'個達成！__\n🎩「'+b.comment+'」'; });
                         const iindex = 0; o.log.eventitems.index = iindex;
                         o.log.eventitems.add = iadd;
                         o.log.eptype.push('event');
                         const newcontent = i.speciallog.content.split('\n')[0]+'\n'
                                          + stamps.map(list=>list.map(group=>group.join('：')).join('/')).join('\n');
                         i.speciallog.edit(newcontent);
                         return o;
                       }else return;
                     }else return;}
                 catch(error){return{error:true, title:outline.title, message:error.message};};}
           else return outline; }
  },
  {forevent:true,
   f:(i)=>{
           const outline = {title:'🎃仮装の魔物', type:'イベント', member:[],
                            description:'',};
           if(i){try{if(i.event&&i.event.id=='HALLOWEEN'){
                       const o=JSON.parse(JSON.stringify(epoutput)); o.log.title=outline.title;
                       const monsters = [{id:'al', emoji:'👽', name:'エイリアン'},{id:'sk', emoji:'🩻', name:'骸骨'},{id:'pi', emoji:'🏴‍☠️', name:'海賊'},{id:'pu', emoji:'🎃', name:'カボチャ'},
                                         {id:'ph', emoji:'🎭', name:'怪人'},{id:'sp', emoji:'🕷️', name:'クモ'},{id:'bl', emoji:'🐈‍⬛', name:'黒猫'},{id:'zo', emoji:'🧟', name:'ゾンビ'},
                                         {id:'do', emoji:'🪆', name:'人形'},{id:'so', emoji:'💂', name:'兵隊'},{id:'ge', emoji:'🧞', name:'魔人'},{id:'mu', emoji:'⚰️', name:'ミイラ'},
                                         {id:'fa', emoji:'🧚', name:'妖精'},{id:'ro', emoji:'🤖', name:'ロボット'}];
                       const sploga = i.speciallog.content.split('\n').slice(1);
                       const exists = [];
                       o.cards = i.cards; o.resultlist = i.resultlist; o.prefields = i.prefields;
                       sploga.forEach(l=>{
                         const monster = monsters.find(m=>m.id==l.split('：')[0]);
                         const chara   = i.characters.find(cc=>cc.id==l.split('：')[1]);
                         const cons = [[...i.cards,...i.Tcards].some(cc=>cc.id.includes(chara.id)),
                                       [chara.name, chara.emoji].some(t=>(i.prefields.length>0 && i.prefields.map(pf => pf.name + (pf.description?pf.description:'') + (pf.value?pf.value:'') ).join('').includes(t) )
                                                                       ||o.resultlist.includes(t) )]
                         if(cons.some(con=>con)){ console.log(chara.emoji+chara.name +' → '+ monster.emoji+monster.name);
                           exists.push(monster);
                           o.resultlist = o.resultlist.map(rl=>rl.replace(new RegExp('\\('+chara.emoji+'.+?\\)','g'), '('+monster.emoji+'？？？)')
                                                                 .replace(new RegExp(chara.name,'g'), 'なぞの'+monster.name)
                                                                 .replace(new RegExp(chara.emoji,'g'), monster.emoji));
                           if(o.prefields.length>0){
                             o.prefields = o.prefields.map(pf=>{pf.name = (pf.fxowner&&pf.fxowner.id.includes(chara.id)) ? monster.emoji+'【？？？】'+pf.notes : pf.name.replace(new RegExp(chara.name,'g'), 'なぞの'+monster.name).replace(new RegExp(chara.emoji,'g'), monster.emoji);
                                                                if(pf.description){ pf.description = pf.description.replace(new RegExp(chara.name,'g'), 'なぞの'+monster.name).replace(new RegExp(chara.emoji,'g'), monster.emoji); };
                                                                if(pf.value){ pf.value = pf.value.replace(new RegExp(chara.name,'g'), 'なぞの'+monster.name).replace(new RegExp(chara.emoji,'g'), monster.emoji); };
                                                                return pf; });
                           };
                         };
                         const targetcard = i.cards.find(cc=>cc.id.slice(0,4)==chara.id);
                         o.cards = o.cards.map(cc=>{if(cc.emoji&&cc.emoji==chara.emoji){const newcard = JSON.parse(JSON.stringify(cc));
                                                                                   newcard.emoji = monster.emoji;
                                                                                   return newcard; }
                                                    else{return cc;} });
                         if(o.Tcards) {o.Tcards=o.Tcards.map(cc=>{if(cc.emoji&&cc.emoji==chara.emoji){const newcard = JSON.parse(JSON.stringify(cc));
                                                                                                 newcard.emoji = monster.emoji;
                                                                                                 return newcard; }
                                                                  else{return cc;} }); };
                       });
                       if(exists.length>0){
                         o.log.description=exists.map(x=>x.emoji+'なぞの'+x.name).join('・')+' の正体がわかったら「！ぺい '+exists[0].name+' (キャラ名)」等の形式で回答！';
                         o.log.eptype.push('changeresultlist', 'changeprefields');
                         return o;
                       };
                     }else return;}
                 catch(error){return{error:true, title:outline.title, message:error.message};};}
           else return outline; }
  },
  {forevent:true,
   f:(i)=>{
           const outline = {title:'🎓早押しクイズ', type:'イベント', member:[], description:''};
           if(i){try{if(i.event&&i.event.id=='QUIZ'&&i.grouplog.length&&i.grouplog.some(gr=>gr.type=='class')){
             console.log(outline.title+'でてんね！！！！！！！！！！～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～');
                       const o=JSON.parse(JSON.stringify(epoutput)); o.log.title=outline.title;
                       const targetgroups = i.grouplog.filter(gr=>gr.type=='class');
                       if(i.Tcards.length>1) targetgroups.push({name:'教師', ids:i.Tcards.map(cc=>cc.id)})
                       const targetgroup = targetgroups[Math.floor(Math.random()*targetgroups.length)];
                       const targetid = targetgroup.ids[Math.floor(Math.random()*targetgroup.ids.length)];
                       const target = [...i.cards, ...i.Tcards].find(cc=>cc.id==targetid);
                       const correct = ( targetgroup.name=='教師' || Math.floor(Math.random()*100) < 45 + target.grade*10
                                                                                                       + (target.id.includes('だいりお')?4:target.rarity)*5
                                                                                                       + (target.id.includes('問')?15:0) );
                       const iindex=0; o.log.eventitems.index=iindex;
                       const iadd=(targetgroup.name=='教師')?30:correct?2:1; o.log.eventitems.add = iadd;
                       
                       o.log.description = (targetgroup.name=='教師' ? '⚠️教師チーム参戦！⚠️' : '早かったのは……'+targetgroup.name+'チーム！')
                                         + '\n' + tools.emj(target)+'の回答は…… ' + (correct ? '⭕正解！' : '❌不正解……') + '\n獲得：💡解答p ×'+iadd;
                       
                       o.log.eptype.push('event');
                       return o;
                     };
                     return;}
                 catch(error){return{error:true, title:outline.title, message:error.message};};}
           else return outline; }
  },
  {forevent:true,
   f:(i)=>{
           const outline = {title:'🎓問題！', type:'イベント', member:[], description:''};
           if(i){try{if(i.event&&i.event.id=='QUIZ'&&i.quizlist.length){
                       const o=JSON.parse(JSON.stringify(epoutput)); o.log.title=outline.title;
                       //1.問題が存在するキャラidリストを取得
                       const quizids = i.quizlist.map(q=>tools.getCharacter(i.characters,q[0]).id);
                       //2.回答済のログを取得
                       const answeredids = i.speciallog.content.split('\n')[1].split('/');
                       //3.場の未回答のカードを取得
                       const targets = []; const nottargets = [];
                       [...i.cards, ...i.Tcards].forEach(cc=>{
                         if(quizids.includes(cc.id.slice(0,4))){
                           if(!answeredids.includes(cc.id.slice(0,4))){
                             targets.push(cc); console.log(cc.id.slice(0,4)+'：クイズあり 未出');
                           }
                           else{
                             nottargets.push(cc); console.log(cc.id.slice(0,4)+'：クイズあり 既出');
                           };
                         }
                         else console.log(cc.id.slice(0,4)+'：クイズなし');
                       });
                       //4.出題を確率で決定　問題を決定　問題を送信し、効果の発動を記録
                       if(targets.length>0){
                         //全所有カード(イベント抜き)
                         const a = [...i.allcards, ...i.allTcards].filter(cc=>!cc.eventid);
                         //全所有カード：クイズ持ち
                         const q = a.filter(chr=>quizids.includes(chr.id));
                         //全所有カード：クイズ持ち：全未出
                         const y = q.filter(chr=>!answeredids.includes(chr.id));

                         const prob = 100 - ( 10 * ( Math.ceil( y.length/q.length*10 ) -1 ) * ( q.length/a.length ) );
                         console.log('★出題確率：'+prob+'%\n計算\n：100 - ( 10 × A × B )\nA = ' + (Math.ceil( y.length/q.length*10 )-1) + ' = ( 所持未出'+y.length+' / 所持問有'+q.length+' ) × 10 の切上 -1\nB = '+( q.length/a.length )+' = ( 所持問有'+q.length+' / 所持'+a.length+' )\n100 - ( 10 × '+(Math.ceil( y.length/q.length*10 )-1)+' × '+(q.length/a.length)+' )');
                         if(Math.random()*100 < prob){
                           const targetid = targets[Math.floor(Math.random()*targets.length)].id.slice(0,4); console.log('★targetid：'+targetid);
                           const target = i.characters.find(chr=>chr.id==targetid);
                           const quizline = i.quizlist.find(q=>q[0]==target.name);
                           quizline[1] = quizline[1].replace(/⏎/g, '\n').split(/^問題【|】解答【|】解説【|】難易度【|】$/)
                           const quiz = {q:quizline[1][1], d:Number(quizline[1][4]), i:quizline[2]};
                           i.message.author.send('',{embed:{
                             author: {name:tools.emj(target)+target.name+' / 難易度：'+'⭐'.repeat(quiz.d)},
                             title:'🎓問題！',
                             description:quiz.q, //問題文
                             color: i.event.color,
                             footer:{text:'「！ぺい　名前　(ひらがなor半角英数字)」で回答！'},
                             image: {url: quiz.i},
                           }});

                           o.log.description = tools.emj(target)+target.name+'の問題をDMへ送信しました。\n'
                                             + '(未回答：' + targets.map(m=>tools.emj(m)).join('')
                                             + (nottargets.length>0 ? ' 回答済：' + nottargets.map(m=>tools.emj(m)).join('') : '')
                                             + ')';
                           o.log.eptype.push('sendmessage');
                           return o;
                         };
                       };
                     };
                     return;}
                 catch(error){return{error:true, title:outline.title, message:error.message};};}
           else return outline; }
  },
];

//■■■■■■■■■■■■■■■■■■■■ショップリスト
exports.shoplist = [
  {
    id: "tkt5",
    name: "ちけっと5",
    title: "🎫×5",
    description: "チケット5枚組。",
    command: "「！ぺが」",
    dow: [1, 2, 3, 4, 5, 6],
    itemToLose: "coin",
    numToLose: 1500,
    itemToGet: "ticket",
    numToGet: 5,
  },
  {
    id: "tkt20",
    name: "ちけっと20",
    title: "🎫×20 +2",
    description: "チケット20+2枚組。\n百連が1回引けるお得なセット。",
    command: "「！ぺが」 百連「！ぺがひ」",
    dow: [1, 2, 3, 4, 5, 6],
    itemToLose: "coin",
    numToLose: 6000,
    itemToGet: "ticket",
    numToGet: 22,
  },
  {
    id: "env",
    name: "封筒",
    title: "🧧封筒",
    description: "⭐4以上確定ガチャ封筒。",
    command: "「！ぺがす」",
    dow: [1, 2, 3, 4, 5, 6],
    itemToLose: "coin",
    numToLose: 10000,
    itemToGet: "envelope",
    numToGet: 1,
  },

  {
    id: "tkt5",
    name: "ちけっと5",
    title: "🎫×5",
    description: "チケット5枚組。🔴3割引中",
    command: "「！ぺが」",
    dow: [0],
    itemToLose: "coin",
    numToLose: 1050,
    itemToGet: "ticket",
    numToGet: 5,
  },
  {
    id: "tkt20",
    name: "ちけっと20",
    title: "🎫×20 +2",
    description: "チケット20+2枚組。🔴3割引中",
    command: "「！ぺが」 百連「！ぺがひ」",
    dow: [0],
    itemToLose: "coin",
    numToLose: 4200,
    itemToGet: "ticket",
    numToGet: 22,
  },
  {
    id: "tkt100",
    name: "ちけっと100",
    title: "🎫×100 +10",
    description: "チケット100+10枚組。🔴日曜限定",
    command: "「！ぺが」 百連「！ぺがひ」",
    dow: [0],
    itemToLose: "coin",
    numToLose: 21000,
    itemToGet: "ticket",
    numToGet: 110,
  },
  {
    id: "env",
    name: "封筒",
    title: "🧧封筒",
    description: "⭐4以上確定ガチャ封筒。🔴3割引中",
    command: "「！ぺがす」",
    dow: [0],
    itemToLose: "coin",
    numToLose: 7000,
    itemToGet: "envelope",
    numToGet: 1,
  },

  {
    id: "jwl",
    name: "宝珠",
    title: "💍宝珠",
    description: "Lv.MAXからEXTRAにする特別な宝珠。",
    command: "「！ぺえ (キャラ名)」",
    itemToLose: "coin",
    numToLose: 70000,
    itemToGet: "jewel",
    numToGet: 1,
  },
  {
    id: "inv",
    name: "招待券",
    title: "🎟️招待券",
    description: "指名カードをお迎えできる招待券。",
    command: "「！ぺよ (キャラ名)」",
    itemToLose: "coin",
    numToLose: 150000,
    itemToGet: "invite",
    numToGet: 1,
  },

  {
    id: "uq",
    name: "うるとら赳",
    title: "🖼️ウルトラ赳",
    description: "PENTAで使える、光線的なテーマ。",
    command: "「！ぺて」",
    dow: [0,5,6],
    itemToLose: "coin",
    numToLose: 500,
    itemToGet: "theme",
  },
  {
    id: "ys",
    name: "溶接ぺんた",
    title: "🖼️溶接ペンタ",
    description: "PENTAで使える、焦熱のテーマ。",
    command: "「！ぺて」",
    dow: [0,1,2,3],
    itemToLose: "coin",
    numToLose: 500,
    itemToGet: "theme",
  },
  {
    id: "dw",
    name: "ですわ♪",
    title: "🖼️ですわ♪",
    description: "PENTAで使える、しとやかなテーマ。",
    command: "「！ぺて」",
    dow: [3,4,5],
    itemToLose: "coin",
    numToLose: 500,
    itemToGet: "theme",
  },
  {
    id: "nk",
    name: "魔法のあしあと",
    title: "🖼️魔法のあしあと",
    description: "PENTAで使える、てこてことしたテーマ。",
    command: "「！ぺて」",
    dow: [0,1,2,6],
    itemToLose: "coin",
    numToLose: 1000,
    itemToGet: "theme",
  },
  {
    id: "mp",
    name: "Megaphone!!",
    title: "🖼️Megaphone!!",
    description: "PENTAで使える、勢い余ったテーマ。",
    command: "「！ぺて」",
    dow: [4,5,6],
    itemToLose: "coin",
    numToLose: 500,
    itemToGet: "theme",
  },
  {
    id: "al",
    name: "我らあらん組",
    title: "🖼️我らアラン組",
    description: "PENTAで使える、にぎやかなテーマ。",
    command: "「！ぺて」",
    dow: [1,2,3,4],
    itemToLose: "coin",
    numToLose: 1000,
    itemToGet: "theme",
  },
];

exports.shoplistCash = [
  {
    id: "env",
    name: "封筒",
    title: "換金",
    itemToLose: "envelope",
    numToLose: 1,
    itemToGet: "coin",
    numToGet: 5000,
  },
  {
    id: "env10",
    name: "封筒10",
    title: "換金",
    itemToLose: "envelope",
    numToLose: 10,
    itemToGet: "coin",
    numToGet: 50000,
  },
  {
    id: "jwl",
    name: "宝珠",
    title: "換金",
    itemToLose: "jewel",
    numToLose: 1,
    itemToGet: "coin",
    numToGet: 35000,
  },
  {
    id: "jwl10",
    name: "宝珠10",
    title: "換金",
    itemToLose: "jewel",
    numToLose: 10,
    itemToGet: "coin",
    numToGet: 350000,
  },
  {
    id: "inv",
    name: "招待券",
    title: "換金",
    itemToLose: "invite",
    numToLose: 1,
    itemToGet: "coin",
    numToGet: 75000,
  },
  {
    id: "inv10",
    name: "招待券10",
    title: "換金",
    itemToLose: "invite",
    numToLose: 10,
    itemToGet: "coin",
    numToGet: 750000,
  },
];

exports.shoplistSecret = [
  {
    id: "tg",
    name: "告げ口",
    title: "📖『😈告げ口』",
    description: exports.episodes.find((e) => e.myfxid && e.myfxid == "tg").f()
      .description,
    command: "「！ぺま」",
    itemToLose: "report",
    numToLose: 1,
    itemToGet: "episode",
  },
  {
    id: "bn",
    name: "まじかるばなな",
    title: "📖『😈マジカルバナナ』",
    description: exports.episodes.find((e) => e.myfxid && e.myfxid == "bn").f()
      .description,
    command: "「！ぺま」",
    itemToLose: "report",
    numToLose: 1,
    itemToGet: "episode",
  },
  {
    id: "sg",
    name: "奨学金制度",
    title: "📖『😈奨学金制度』",
    description: exports.episodes.find((e) => e.myfxid && e.myfxid == "sg").f()
      .description,
    command: "「！ぺま」",
    itemToLose: "report",
    numToLose: 2,
    itemToGet: "episode",
  },
  {
    id: "cd",
    name: "禁断のCDショップ",
    title: "📖『😈禁断のCDショップ』",
    description: exports.episodes.find((e) => e.myfxid && e.myfxid == "cd").f()
      .description,
    command: "「！ぺま」",
    itemToLose: "report",
    numToLose: 2,
    itemToGet: "episode",
  },
  {
    id: "card",
    name: "不屈のかーど",
    title: "不屈のカード",
    description: "対象：???",
    itemToLose: "report",
    numToLose: 4,
    itemToGet: "card",
    cardidToGet: "さとうこ不",
  },
  {
    id: "cash",
    name: "換金",
    title: "🪙換金",
    itemToLose: "report",
    numToLose: 1,
    itemToGet: "coin",
    numToGet: 70000,
  },
  {
    id: "cash10",
    name: "換金10",
    title: "🪙換金",
    itemToLose: "report",
    numToLose: 10,
    itemToGet: "coin",
    numToGet: 700000,
  },
];

exports.shoplistMemorial = [
  {
    id: "alan",
    name: "めもりあるあらん",
    title: "メモリアルアラン",
    description: "対象：🌀アラン・アル・マキナ(メモリアル)",
    itemToLose : "ribbon",
    numToLose : 1,
    itemToGet: "card",
    cardidToGet: "あらんあ記"
  },
  {
    id: "ribbon",
    name: "めもりあるりぼん",
    title: "メモリアルリボン",
    itemToLose : "coin",
    numToLose : 5555555,
    itemToGet: "ribbon",
    numToGet: 1
  },
];

//■■■■■■■■■■■■■■■■■■■■ペンタ特殊カード
exports.giftids=['さとうこ不','あらんあ記', 'まきむく', 'でじゃゔ', 'あにまあ', 'かぐらち'];
exports.spcards = function (chrs) {
  const list = [
    { eventid: "SNOW", originalid: "あじすか" },
    { eventid: "SNOW", originalid: "はなてん", relation: "かれつ/" + chrs.find((c) => c.id == "はなてん").relation.replace("かれつ/", "") },
    { eventid: "SNOW", originalid: "しちりが", tagTail: "/帽子" },
    { eventid: "SNOW", originalid: "れみゅえ" },
    { eventid: "SNOW", originalid: "じゅつら", tagTail: "/帽子" },
    { eventid: "SNOW", originalid: "うららあ" },
    { eventid: "SNOW", originalid: "たかやま" },
    { eventid: "SNOW", originalid: "めろばた", tagTail: "/帽子" },
    { eventid: "SNOW", originalid: "きむちゅ" },

    { eventid: "CHOCO", originalid: "あらんあ", tagTail: "/眼鏡", tagDelete: "/帽子" },
    { eventid: "CHOCO", originalid: "たつがみ", relationHead: "ちょこあらん/ちょこちんじゃお/ちょこきーな/ちょこあいり/ちょこえりー/ちょこやまだ/" },
    { eventid: "CHOCO", originalid: "こうせい" },
    { eventid: "CHOCO", originalid: "みよしき" },
    { eventid: "CHOCO", originalid: "ぎおんあ" },
    { eventid: "CHOCO", originalid: "えりーじ" },
    { eventid: "CHOCO", originalid: "やまだあ" },

    { eventid: "MYSTERY", originalid: "くらうん" },
    { eventid: "MYSTERY", originalid: "ひがしあ" },
    { eventid: "MYSTERY", originalid: "あいびー" },
    { eventid: "MYSTERY", originalid: "ちこりー" },
    { eventid: "MYSTERY", originalid: "いちかず" },
    { eventid: "MYSTERY", originalid: "つちみか" },
    { eventid: "MYSTERY", originalid: "びぜんお" },

    { eventid: "PSEUDO", originalid: "くらまえ", tagDelete: "/帽子" },
    { eventid: "PSEUDO", originalid: "たつがみ" },
    { eventid: "PSEUDO", originalid: "ぎんがじ" },
    { eventid: "PSEUDO", originalid: "たかやま" },
    { eventid: "PSEUDO", originalid: "はなてん", relation: "" },
    { eventid: "PSEUDO", originalid: "おおとり" },

    { eventid: "SPORTS", originalid: "でぃあな", tagTail: "/赤組", relationHead: "体育祭きくな/体育祭いかづち/体育祭れいちぇる/" },
    { eventid: "SPORTS", originalid: "おにこう", tagTail: "/赤組", relationHead: "体育祭でぃあな/体育祭いかづち/体育祭れいちぇる/" },
    { eventid: "SPORTS", originalid: "ぬのしだ", tagTail: "/赤組", relationHead: "体育祭でぃあな/体育祭きくな/体育祭れいちぇる/" },
    { eventid: "SPORTS", originalid: "れいちぇ", tagTail: "/赤組", relationHead: "体育祭でぃあな/体育祭きくな/体育祭いかづち/" },
    { eventid: "SPORTS", originalid: "りこおっ", tagTail: "/白組", relationHead: "体育祭ぎんた/体育祭まーさ/体育祭ねじれ/体育祭こうたろう/" },
    { eventid: "SPORTS", originalid: "いちぎん", tagTail: "/白組", relationHead: "体育祭りこ/体育祭まーさ/体育祭ねじれ/体育祭こうたろう/" },
    { eventid: "SPORTS", originalid: "はちおう", tagTail: "/白組", relationHead: "体育祭りこ/体育祭ぎんた/体育祭ねじれ/体育祭こうたろう/" },
    { eventid: "SPORTS", originalid: "まだらめ", tagTail: "/白組", relationHead: "体育祭りこ/体育祭ぎんた/体育祭まーさ/体育祭こうたろう/" },
    { eventid: "SPORTS", originalid: "ひびきこ", tagTail: "/白組", relationHead: "体育祭りこ/体育祭ぎんた/体育祭まーさ/体育祭ねじれ/" },
    { eventid: "SPORTS", originalid: "すばるす", relationHead: "体育祭でぃあな/体育祭きくな/体育祭いかづち/体育祭れいちぇる/体育祭りこ/体育祭ぎんた/体育祭まーさ/体育祭ねじれ/体育祭こうたろう/" },

    { eventid: "DANCE", originalid: "いりがれ", tagTail: "/音楽" },
    { eventid: "DANCE", originalid: "なすしゅ", tagTail: "/音楽" },
    { eventid: "DANCE", originalid: "たまえろ", tagTail: "/音楽" },
    { eventid: "DANCE", originalid: "やなぎき", tagTail: "/音楽" },
    { eventid: "DANCE", originalid: "ありすが", tagTail: "/音楽" },
    { eventid: "DANCE", originalid: "くろえめ", tagTail: "/音楽" },
    { eventid: "DANCE", originalid: "くどうよ", tagTail: "/音楽" },
    { eventid: "DANCE", originalid: "じゅうそ", tagTail: "/音楽" },
    { eventid: "DANCE", originalid: "のたゆめ", tagTail: "/音楽", tagDelete: "帽子/" },
    { eventid: "DANCE", originalid: "あんなか", tagTail: "/音楽" },
    { eventid: "DANCE", originalid: "ふじわら", tagTail: "/音楽" },

    { eventid: "BEACH", originalid: "えんどう" },
    { eventid: "BEACH", originalid: "ちょうこ" },
    { eventid: "BEACH", originalid: "ぎんがじ" },
    { eventid: "BEACH", originalid: "くろかわ" },
    { eventid: "BEACH", originalid: "じーたぶ" },
    { eventid: "BEACH", originalid: "ぺぺぽも" },
    { eventid: "BEACH", originalid: "とつかち", tagDelete: "/帽子" },
    { eventid: "BEACH", originalid: "まるがれ" },
    { eventid: "BEACH", originalid: "どうざん" },
    { eventid: "BEACH", originalid: "いるまき" },
    { eventid: "BEACH", originalid: "いかりや" },

    { eventid: "CAMP", originalid: "うつしみ" },
    { eventid: "CAMP", originalid: "りんあっ" },
    { eventid: "CAMP", originalid: "さなげな" },
    { eventid: "CAMP", originalid: "ふーかか" },
    { eventid: "CAMP", originalid: "さいとう" },
    { eventid: "CAMP", originalid: "あさつき" },
    { eventid: "CAMP", originalid: "ささそう" },
    { eventid: "CAMP", originalid: "のーしゅ" },
    { eventid: "CAMP", originalid: "りゅうお" },
    { eventid: "CAMP", originalid: "りちゃー" },

    { eventid: "FESTIVAL", originalid: "うどある" },
    { eventid: "FESTIVAL", originalid: "るーくろ" },
    { eventid: "FESTIVAL", originalid: "かいぐり" },
    { eventid: "FESTIVAL", originalid: "わたべゆ" },
    { eventid: "FESTIVAL", originalid: "ひじかた" },
    { eventid: "FESTIVAL", originalid: "そうまあ" },
    { eventid: "FESTIVAL", originalid: "こんどう" },
    { eventid: "FESTIVAL", originalid: "おきたひ" },
    { eventid: "FESTIVAL", originalid: "ながくら" },
    { eventid: "FESTIVAL", originalid: "やなせこ" },
    { eventid: "FESTIVAL", originalid: "ろーれん" },
    { eventid: "FESTIVAL", originalid: "さとうこ" },
    { eventid: "FESTIVAL", originalid: "みしぇる" },
    { eventid: "FESTIVAL", originalid: "つのだか" },

    { eventid: "HALLOWEEN", originalid: "うぃすた" },
    { eventid: "HALLOWEEN", originalid: "まちだま" },
    { eventid: "HALLOWEEN", originalid: "ゆうじん" },
    { eventid: "HALLOWEEN", originalid: "あまみや" },
    { eventid: "HALLOWEEN", originalid: "みつばえ" },
    { eventid: "HALLOWEEN", originalid: "えびちり" },
    { eventid: "HALLOWEEN", originalid: "ふらんち" },
    { eventid: "HALLOWEEN", originalid: "ごうとく" },
    { eventid: "HALLOWEEN", originalid: "にらいん" },
    { eventid: "HALLOWEEN", originalid: "におうぇ" },
    { eventid: "HALLOWEEN", originalid: "きのした" },
    { eventid: "HALLOWEEN", originalid: "まりあう" },
    { eventid: "HALLOWEEN", originalid: "いばらき" },

    { eventid: "QUIZ", originalid: "てんごく" },
    { eventid: "QUIZ", originalid: "ぴーたー" },
    { eventid: "QUIZ", originalid: "のあまう" },
    { eventid: "QUIZ", originalid: "くじょう" },
    { eventid: "QUIZ", originalid: "あすかあ" },
    { eventid: "QUIZ", originalid: "ようはな" },
    { eventid: "QUIZ", originalid: "とどろき" },
    { eventid: "QUIZ", originalid: "いなさゆ" },
    { eventid: "QUIZ", originalid: "ちゃーり" },
    { eventid: "QUIZ", originalid: "ふるつき" },
    { eventid: "QUIZ", originalid: "てんろう" },
    { eventid: "QUIZ", originalid: "おおとり" },
    { eventid: "QUIZ", originalid: "どらこざ" },

    { eventid: "XMAS", originalid: "そふぃあ", tagTail: "/帽子" },
    { eventid: "XMAS", originalid: "ねぎかぶ" },
    { eventid: "XMAS", originalid: "いのうえ" },
    { eventid: "XMAS", originalid: "じゅふぶ", tagTail: "/帽子", tagDelete: "/和風" },
    { eventid: "XMAS", originalid: "らいかか" },
    { eventid: "XMAS", originalid: "まつなが" },
    { eventid: "XMAS", originalid: "どろしー" },
    { eventid: "XMAS", originalid: "れいもん" },
    { eventid: "XMAS", originalid: "ひだりゆ" },

    { eventid: "NEWYEAR", originalid: "あるとあ" },
    { eventid: "NEWYEAR", originalid: "だいりお" },
    { eventid: "NEWYEAR", originalid: "やなぎそ" },
    { eventid: "NEWYEAR", originalid: "うんじょ" },
    { eventid: "NEWYEAR", originalid: "ひきふね" },
    { eventid: "NEWYEAR", originalid: "こさのげ" },
    { eventid: "NEWYEAR", originalid: "あいしゃ" },
    { eventid: "NEWYEAR", originalid: "かいそう" },

    { eventid: "SECRET", originalid: "ありすが", idTail: "人", nameTail: "(ヒト)", tagDelete: "/生物/150cm以下", nnprefix: ["人","ひと"], cm: 166, subcm: "猫：27" },
    { eventid: "SECRET", originalid: "くらまえ", idTail: "元", nameTail: "(オリジン)", tagDelete: "/180cm以上", nnprefix: ["元", "もと", "おりじん"], sex: "女", cm: 148, subcm:"", relationHead: "えびちり/" },
    { eventid: "SECRET", originalid: "ごうとく", idTail: "猫", nameTail: "(ねこ)", tagTail: "/180cm以上", nnprefix: ["猫", "ねこ"], cm: 250, subcm: "人：153" },
    { eventid: "SECRET", originalid: "きむちゅ", idTail: "舞", nameTail: "(アイドル)", nnprefix: ["あいどる"] },
    { eventid: "SECRET", originalid: "かげゆこ", idTail: "龍", nameTail: "(登り龍)", tagDelete: "/音楽/眼鏡", nnprefix: ["登り龍", "登り竜", "のぼりりゅう", "龍", "竜", "りゅう"] },
    { eventid: "SECRET", originalid: "さとうこ", idTail: "不", nameTail: "(不屈)", nnprefix: ["不屈", "ふくつ"] },
    { eventid: "SECRET", originalid: "あらんあ", idTail: "記", nameTail: "(メモリアル)", nnprefix: ["めもりある"] }
  ];
  const relist = list.map((i) => {
    const chr = { ...chrs.find((c) => c.id == i.originalid) };
    Object.keys(i).forEach((key) => {
      if     (key.match(/Head$/))      {const tarkey = key.replace("Head", "");
                                        chr[tarkey] = i[key] + chr[tarkey]; }
      else if(key.match(/Tail$/))      {const tarkey = key.replace("Tail", "");
                                        chr[tarkey] = chr[tarkey] + i[key]; }
      else if(key.match(/Delete$/))    {const tarkey = key.replace("Delete", "");
                                        chr[tarkey] = chr[tarkey].replace(i[key], ""); }
      else if(!key.match(/^nnprefixs/)){chr[key] = i[key]; }
    });
    let nnprefix = [];
    if (i.eventid == "SECRET") {
      nnprefix = i.nnprefix;
      chr.sid += i.idTail;
    } else {
      const ev = exports.eventlist.find((e) => e.id == i.eventid);
      chr.id += ev.idTail;
      chr.sid += ev.idTail;
      chr.name += ev.nameTail;
      nnprefix = ev.nnprefix;
    }

    const nns = [];
    nnprefix.forEach(prefix=>nns.push(...chr.nickname.split(/\/|\s-\s/).filter(nn=>nn).map(nn=>prefix+nn)));
    chr.nickname = nns.join("/");
    chr.tag += "/" + i.eventid;
    return chr;
  });
  return relist;
};

exports.additional = [
  {id: "だみー0", genre: "stTm", belong: "", name: "＿＿＿＿", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "", tag: "", position: "", relation: " - ", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "だみー1", genre: "stTm", belong: "", name: "＿＿＿＿", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "", tag: "", position: "", relation: " - ", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "だみー2", genre: "stTm", belong: "", name: "＿＿＿＿", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "", tag: "", position: "", relation: " - ", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "だみー3", genre: "stTm", belong: "", name: "＿＿＿＿", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "", tag: "", position: "", relation: " - ", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "だみー4", genre: "stTm", belong: "", name: "＿＿＿＿", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "", tag: "", position: "", relation: " - ", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "だみー5", genre: "stTm", belong: "", name: "＿＿＿＿", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "", tag: "", position: "", relation: " - ", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "だみー6", genre: "stTm", belong: "", name: "＿＿＿＿", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "", tag: "", position: "", relation: " - ", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "だみー7", genre: "stTm", belong: "", name: "＿＿＿＿", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "", tag: "", position: "", relation: " - ", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "だみー8", genre: "stTm", belong: "", name: "＿＿＿＿", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "", tag: "", position: "", relation: " - ", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "だみー9", genre: "stTm", belong: "", name: "＿＿＿＿", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "", tag: "", position: "", relation: " - ", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "くれうぇ", genre: "stTm", belong: "", name: "", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "🗿", tag: "", position: "", relation: "", rarity:null, collected: 1,probadd:0, basicadd:0},
  {id: "ぱにっく", genre: "stTm", belong: "", name: "", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "🎃", tag: "HALLOWEEN", position: "", relation: "", rarity:null, collected: 1,probadd:0, basicadd:0},
  {id: "ぴーぎろ", genre: "stTm", belong: "", name: "ピ", subname: "P", kana: "ぴ", nickname: "", age: 17, sex: "男", cm: null, subcm: "", author: "", major: "", grade: "2", dorm: "緑寮", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "🤡", tag: "", position: "", relation: "ぴーたー - ", rarity: 3, collected:1,probadd:0, basicadd:0},
  {id: "ぷれいや", genre: "stTm", belong: "", name: "プレイヤー", subname: "ぷれいやー", kana: "ぷれいやー", nickname: "ぷれいやー", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "👤", tag: "", position: "", relation: "", rarity:null, collected: 1,probadd:0, basicadd:0},
  {id: "ぷれぜん", genre: "stTm", belong: "", name: "プレゼント", subname: "ぷれぜんと", kana: "ぷれぜんと", nickname: "ぷれぜんと", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "🎁", tag: "XMAS", position: "", relation: "", rarity:null, collected: 1,probadd:0, basicadd:0},
  {id: "まぼろし", genre: "stTm", belong: "", name: "", subname: "", kana: "", nickname: "", age: null, sex: "", cm: null, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "🗿", tag: "PSEUDO", position: "", relation: "", rarity:null, collected: 1,probadd:0, basicadd:0},
  {id: "ゆきだる", genre: "stTm", belong: "", name: "(っぽい雪だるま)", subname: "", kana: "", nickname: "", age: null, sex: "", cm: 200, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "⛄", tag: "SNOW", position: "", relation: " - ", rarity: 1, collected:1,probadd:0, basicadd:0/*, eventid: "SNOW"*/},
  {id: "てんじゃ0", genre: "stTm", belong: "", name: "ガッテンキッド！", subname: "", kana: "", nickname: "", age: null, sex: "", cm: 140, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "1️⃣", tag: "マスク/PSEUDO", position: "", relation: "", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "てんじゃ1", genre: "stTm", belong: "", name: "ガッテンリボン！", subname: "", kana: "", nickname: "", age: null, sex: "", cm: 120, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "2️⃣", tag: "マスク/PSEUDO", position: "", relation: "", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "てんじゃ2", genre: "stTm", belong: "", name: "ガッテンエリート！", subname: "", kana: "", nickname: "", age: null, sex: "", cm: 170, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "3️⃣", tag: "マスク/PSEUDO", position: "", relation: "", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "てんじゃ3", genre: "stTm", belong: "", name: "ガッテンバード！", subname: "", kana: "", nickname: "", age: null, sex: "", cm: 80, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "4️⃣", tag: "マスク/PSEUDO", position: "", relation: "", rarity: 1, collected: 1,probadd:0, basicadd:0},
  {id: "てんじゃ4", genre: "stTm", belong: "", name: "ガッテンビー！", subname: "", kana: "", nickname: "", age: null, sex: "", cm: 20, subcm: "", author: "", major: "", grade: "", dorm: "", dormmate: "", roomid: "", committee: "", club: "", abnormality: "", advisor: "", lecture: "", birthday: "", hometown: "", stick: "", notes: "", emoji: "5️⃣", tag: "マスク/PSEUDO", position: "", relation: "", rarity: 1, collected: 1,probadd:0, basicadd:0},
];
