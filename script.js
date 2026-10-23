
const vegetables = [
  ["レタス", "冷静な合理主義者", "落ち着いて判断できる", "冷たく見られがち"],
  ["ピーマン", "ツンデレ", "隠れた優しさ", "素直になれない"],
  ["とうがらし", "即断即決の行動派", "決断力", "せっかち"],
  ["なす", "マイペースなインドア派", "独創性", "集団行動が苦手"],
  ["ブロッコリー", "物知りなエリート", "知識力", "説明が長い"],
  ["たまねぎ", "涙もろい寂しがり屋", "共感力", "一人が苦手"],
  ["ねぎ", "気品ある孤高の存在", "自立心", "近寄りがたく見える"],
  ["さつまいも", "優しいお世話係", "気配り", "世話を焼きすぎる"],
  ["かぼちゃ", "頼れる大黒柱", "包容力", "少し頑固"],
  ["にんじん", "熱血リーダー", "統率力", "張り切りすぎる"],
  ["きゅうり", "クールな二枚目", "観察力", "無口すぎる"],
  ["じゃがいも", "堅実な努力家", "継続力", "慎重すぎる"],
  ["トマト", "愛されムードメーカー", "明るさ", "調子に乗りやすい"],
  ["アスパラガス", "天然な不思議ちゃん", "柔軟な発想", "優柔不断"],
  ["だいこん", "おしゃべりな人気者", "社交性", "話しすぎる"],
  ["ゴーヤ", "ストイックな鬼教官", "向上心", "厳しすぎる"]
];

const questions = [
  {
    q: "休日の朝！今日は何をしたい？",
    a: [
      "友達と遊ぶ",
      "家でのんびり",
      "計画的に過ごす",
      "気分で決める"
    ],
    points: [[12,14,5],[3,10,6],[4,11,15],[7,8,1]]
  },
  {
    q: "友達が困っていたら？",
    a: [
      "先頭に立って助ける",
      "話を聞く",
      "解決方法を考える",
      "笑わせる"
    ],
    points: [[9,2,15],[7,8,5],[4,0,11],[12,14,13]]
  },
  {
    q: "みんなで何かを決めるときは？",
    a: [
      "すぐに意見を出す",
      "みんなの気持ちを大切にする",
      "よく調べて決める",
      "周りに合わせる"
    ],
    points: [[9,2,15],[7,5,8],[4,0,11],[13,3,10]]
  },
  {
    q: "褒められたときは？",
    a: [
      "素直に喜ぶ",
      "照れて隠す",
      "もっと頑張る",
      "静かにお礼を言う"
    ],
    points: [[12,14,2],[1,5,13],[11,15,4],[6,10,0]]
  },
  {
    q: "予定が急に変更されたら？",
    a: [
      "すぐ次の予定を決める",
      "周りを気遣う",
      "計画を立て直す",
      "家でのんびりする"
    ],
    points: [[2,9,12],[7,8,5],[11,4,0],[3,13,6]]
  },
  {
    q: "得意そうな役割は？",
    a: [
      "リーダー",
      "サポート役",
      "計画を考える係",
      "盛り上げる係"
    ],
    points: [[9,2,15],[7,8,5],[4,11,0],[12,14,13]]
  },
  {
    q: "言われて嬉しい言葉は？",
    a: [
      "一緒にいると楽しい",
      "優しいね",
      "頼りになるね",
      "自分らしくて素敵"
    ],
    points: [[12,14,5],[7,8,1],[9,4,15],[3,6,10]]
  },
  {
    q: "自分に一番近いのは？",
    a: [
      "熱い行動派",
      "感情豊かなタイプ",
      "コツコツ努力家",
      "自由人"
    ],
    points: [[2,9,1],[5,7,14],[11,4,15],[3,13,6]]
  }
];

let current = 0;
let answers = [];

function showScreen(id) {
  ["start", "quiz", "result"].forEach(name => {
    document.getElementById(name).hidden = name !== id;
  });
}

function startQuiz() {
  current = 0;
  answers = [];
  showScreen("quiz");
  showQuestion();
}

function showQuestion() {
  const item = questions[current];

  document.getElementById("progress").textContent =
    `質問 ${current + 1} / ${questions.length}`;

  document.getElementById("question").textContent = item.q;

  const area = document.getElementById("choices");
  area.replaceChildren();

  item.a.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.onclick = () => choose(index);
    area.appendChild(button);
  });
}

function choose(index) {
  answers[current] = index;
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function goBack() {
  if (current > 0) {
    current--;
    answers = answers.slice(0, current);
    showQuestion();
  } else {
    showScreen("start");
  }
}

function showResult() {
  const scores = Array(vegetables.length).fill(0);

  answers.forEach((answer, questionIndex) => {
    const targets = questions[questionIndex].points[answer];

    targets.forEach((vegetableIndex, rank) => {
      scores[vegetableIndex] += 3 - rank;
    });
  });

  // 同点の場合は野菜リストの先にあるものを採用
  const winner = scores.indexOf(Math.max(...scores));
  const v = vegetables[winner];

  document.getElementById("vegetable").textContent =
    v[0] + "タイプ！";
  document.getElementById("type").textContent = v[1];
  document.getElementById("description").textContent =
    "あなたに近い野菜キャラクターはこちら！";
  document.getElementById("strength").textContent =
    "長所：" + v[2];
  document.getElementById("weakness").textContent =
    "ちょっと苦手：" + v[3];
  document.getElementById("phrase").textContent =
    "全16種類の野菜から診断しました！";

  const image = document.getElementById("character");
  image.src = "images/" + v[0] + ".png";
  image.hidden = false;
  image.onerror = () => { image.hidden = true; };

  showScreen("result");
}
