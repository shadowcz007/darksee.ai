
const nGram  = require('./nGram');

var text = `英伟达用RTX系列显卡的光线追踪技术，修复了颗粒感满满的登月录像……屏幕上的每个像素都是由实时光线追踪进入相机的路径生成的……`;

var texts = text.split("\n");

texts = Array.from(texts, t => {
    t = t.trim();
    if (t.length > 0) {
        return t;
    };
});

texts = texts.filter(item => item);

text=texts.join("");

let wordsList=nGram(4)(text);

let words={};

Array.from(wordsList,w=>{
    if(!words[w]){
        words[w]=1;
    }else{
        words[w]+=1;
    }
});
console.log(words)
