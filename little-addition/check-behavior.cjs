const assert=require('node:assert/strict');const vm=require('node:vm');const fs=require('node:fs');
class Element{constructor(){this.children=[];this.className='';this.attrs={};this.events={};this.style={};this.value='normal';this.classList={toggle:(name,on)=>{let names=this.className.split(' ').filter(x=>x&&x!==name);if(on)names.push(name);this.className=names.join(' ');}};}append(el){this.children.push(el);}replaceChildren(){this.children=[];}setAttribute(k,v){this.attrs[k]=v;}addEventListener(k,fn){this.events[k]=fn;}}
const ids={};const tasks=new Map();let clock=0,id=0;const readings=[];const tools=[];
const document={getElementById:key=>ids[key]||(ids[key]=new Element()),createElement:()=>new Element(),addEventListener(){},modelContext:{registerTool:tool=>tools.push(tool)}};
const context=vm.createContext({document,navigator:{},window:{addEventListener(){},speechSynthesis:{getVoices:()=>[{lang:'zh-CN',name:'Microsoft Kangkang Natural'},{lang:'en-US',name:'Microsoft David Natural'},{lang:'zh-CN',name:'Basic Mandarin'},{lang:'zh-CN',name:'Microsoft Yaoyao',voiceURI:'zh-natural'},{lang:'en-US',name:'Microsoft Zira',voiceURI:'en-natural'}],cancel(){},speak:u=>readings.push(u)},SpeechSynthesisUtterance:class{constructor(text){this.text=text;}}},setTimeout:(fn,ms)=>{tasks.set(++id,{fn,time:clock+ms});return id;},clearTimeout:key=>tasks.delete(key)});
context.SpeechSynthesisUtterance=context.window.SpeechSynthesisUtterance;
vm.runInContext(fs.readFileSync('dist/app.js','utf8'),context);
function advance(ms){const target=clock+ms;while(true){const next=[...tasks].filter(([,t])=>t.time<=target).sort((a,b)=>a[1].time-b[1].time)[0];if(!next)break;clock=next[1].time;tasks.delete(next[0]);next[1].fn();}clock=target;}
function action(code){return vm.runInContext(code,context);}
assert.equal(action('cells.length'),25);assert.equal(ids['progress-text'].textContent,'1 / 25');
action('start()');assert.equal(readings.length,1);readings[0].onend();advance(450);assert.equal(readings.length,2);assert.equal(readings[0].text,readings[1].text);assert.equal(action('index'),0);readings[1].onend();advance(1000);assert.equal(action('index'),1);assert.equal(readings.length,3);
const stale=readings[2];action('select(24)');assert.equal(readings.at(-1).text,'五加五等于十。');stale.onend();assert.equal(action('index'),24);readings.at(-1).onend();advance(450);readings.at(-1).onend();advance(1000);assert.equal(action('index'),0);
action('pause()');const before=readings.length;advance(60000);assert.equal(readings.length,before);assert.equal(action('playing'),false);
assert.equal(readings[0].rate,1.12);assert.equal(readings[0].pitch,1);assert.equal(readings[0].voice.name,'Microsoft Yaoyao');
ids.language.value='en';ids.language.events.change();action('start()');assert.equal(readings.at(-1).text,'one plus one equals two.');assert.equal(readings.at(-1).lang,'en-US');assert.equal(readings.at(-1).voice.name,'Microsoft Zira');
const oldEnglish=readings.at(-1);ids.language.value='zh';ids.language.events.change();assert.equal(readings.at(-1).text,'一加一等于二。');oldEnglish.onend();advance(450);assert.equal(action('index'),0);action('pause()');
const tool=tools[0];assert.equal(tool.execute({a:1,b:2}).answer,3);assert.equal(action('index'),1);assert.throws(()=>tool.execute({a:0,b:2}));assert.equal(action('index'),1);
action('start()');readings.at(-1).onerror({error:'synthesis-failed'});assert.equal(action('playing'),false);assert.match(ids['audio-message'].textContent,/暂时无法/);
action('start()');advance(20000);assert.equal(action('playing'),false);assert.match(ids['audio-message'].textContent,/没有响应/);
const manifest=JSON.parse(fs.readFileSync('dist/manifest.webmanifest'));for(const icon of manifest.icons)assert.ok(fs.existsSync('dist/'+icon.src));for(const equation of action('equations'))assert.ok(equation.a>=1&&equation.a<=5&&equation.b>=1&&equation.b<=5);
console.log('Passed: 25 equations, two readings before advancement, wraparound, stale callback cancellation, pause, speech errors, watchdog, WebMCP inputs, and PWA icons.');
