import{A as e,B as t,C as n,D as r,E as i,H as a,I as o,J as s,N as c,O as l,P as u,R as d,S as f,T as p,U as m,V as h,W as g,X as _,Z as v,_ as y,a as b,b as x,c as S,d as C,f as w,g as T,l as E,o as D,q as O,r as k,s as A,t as j,u as M,v as N,w as P,x as F,y as I,z as L}from"../chunks/Dr4kgHLz.js";import{t as R}from"../chunks/BHJZKZ5A.js";import"../chunks/xihTtKlq.js";import{Ct as z,Dt as B,Et as V,Ft as H,Mt as U,Nt as W,Pt as G,Tt as ee,a as te,bt as K,dt as ne,ht as q,i as J,jt as re,kt as Y,n as X,r as Z,t as Q,ut as ie,vt as ae,wt as oe,xt as se}from"../chunks/Dd6bM297.js";import{t as ce}from"../chunks/Cr9y4eDN.js";function le(e=Math.random){return e()<.5?2:3}function ue(e){return e===3?`yang`:`yin`}function de(e=Math.random){let t=[le(e),le(e),le(e)],n=t.reduce((e,t)=>e+t,0);return{lines:[ve(n)],sum:n,coins:t}}function fe(e){return ve(e.reduce((e,t)=>e+t,0))}var pe={6:[[2,2,2]],7:[[2,2,3],[2,3,2],[3,2,2]],8:[[2,3,3],[3,2,3],[3,3,2]],9:[[3,3,3]]};function me(e){return e.value===`yin`&&e.kind===`old`?6:e.value===`yang`&&e.kind===`young`?7:e.value===`yin`&&e.kind===`young`?8:9}function he(e,t=Math.random){let n=pe[me(e)];return[...n[Math.floor(t()*n.length)]]}function ge(e,t){let n=t?be(t):Math.random;return e.map(e=>[...he(e,n)])}function _e(e=Math.random){let t=[],n=[];for(let r=0;r<6;r++){let r=de(e);t.push(r.lines[0]),n.push([...r.coins])}return{lines:t,coinRows:n}}function ve(e){switch(e){case 6:return ye(`yin`,`old`);case 7:return ye(`yang`,`young`);case 8:return ye(`yin`,`young`);case 9:return ye(`yang`,`old`);default:throw Error(`Invalid coin sum: ${e}`)}}function ye(e,t){return{value:e,kind:t,changing:t===`old`}}function be(e){let t=xe(e);return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function xe(e){let t=2166136261;for(let n of e)t^=n.charCodeAt(0),t=Math.imul(t,16777619);return t>>>0}var Se=n(`<line x1="11" y1="24" x2="37" y2="24" class="mark svelte-54bt2n"></line>`),Ce=n(`<line x1="11" y1="22" x2="19" y2="22" class="mark svelte-54bt2n"></line><line x1="29" y1="26" x2="37" y2="26" class="mark svelte-54bt2n"></line>`,1),we=f(`<div role="img"><div class="coin-spin-inner svelte-54bt2n"><svg viewBox="0 0 48 48" aria-hidden="true" class="svelte-54bt2n"><circle cx="24" cy="24" r="21" class="ring svelte-54bt2n"></circle><rect x="18.5" y="18.5" width="11" height="11" class="hole svelte-54bt2n" rx="0.5"></rect><!></svg></div></div>`);function Te(e,n){s(n,!0);let r=b(n,`empty`,3,!1),i=b(n,`spinning`,3,!1),a=Y(),o=g(()=>n.value?ue(n.value):null),u=g(()=>r()?a.t(`coins.pending`):l(o)===`yang`?a.t(`coins.yang`):a.t(`coins.yin`));var f=we();let p;var m=d(f),h=d(m),y=t(d(h),2),S=e=>{x(e,Se())},w=e=>{var t=Ce();_(),x(e,t)};N(y,e=>{l(o)===`yang`?e(S):l(o)===`yin`&&e(w,1)}),v(h),v(m),v(f),c(()=>{p=C(f,1,`coin-face svelte-54bt2n`,null,p,{yang:l(o)===`yang`,yin:l(o)===`yin`,empty:r(),spinning:i()}),E(f,`aria-label`,l(u))}),x(e,f),O()}var Ee=f(`<span class="bar svelte-g0r7if"></span>`),De=f(`<span class="bar svelte-g0r7if"></span> <span class="bar svelte-g0r7if"></span>`,1),Oe=f(`<div aria-hidden="true"><!></div>`);function ke(e,t){s(t,!0);let n=b(t,`compact`,3,!1);var r=Oe();let i;var a=d(r),o=e=>{x(e,Ee())},l=e=>{var t=De();_(2),x(e,t)};N(a,e=>{t.line.value===`yang`?e(o):e(l,-1)}),v(r),c(()=>i=C(r,1,`glyph svelte-g0r7if`,null,i,{compact:n(),yang:t.line.value===`yang`,yin:t.line.value===`yin`,changing:t.line.changing})),x(e,r),O()}var Ae=f(`<span class="glyph-placeholder svelte-ygslya" aria-hidden="true"></span>`),je=f(`<div><span> </span> <div class="coins svelte-ygslya"></div> <!></div>`),Me=f(`<div class="coin-grid svelte-ygslya"></div>`);function Ne(e,n){s(n,!0);let r=b(n,`lines`,19,()=>[]),i=b(n,`spinningLine`,3,null),a=b(n,`spinningCoin`,3,null),o=b(n,`revealedLines`,3,6),u=b(n,`activeLine`,3,null),f=Y(),p=[6,5,4,3,2,1];function m(e){return u()!==null&&e===u()?`building`:e<=r().length&&r()[e-1]!==void 0&&e<=o()?`complete`:`pending`}var h=Me();T(h,21,()=>p,y,(e,s)=>{let u=g(()=>n.lineCoins[l(s)-1]),f=g(()=>r()[l(s)-1]),p=g(()=>l(s)<=o()||i()!==null&&l(s)===i());var h=je();let _;var b=d(h);let S;var w=d(b,!0);v(b);var E=t(b,2);T(E,20,()=>[0,1,2],y,(e,t)=>{let n=g(()=>l(u)?.[t]),r=g(()=>i()===l(s)&&a()===t+1);{let t=g(()=>l(n)===void 0),i=g(()=>l(r)&&l(p));Te(e,{get value(){return l(n)},get empty(){return l(t)},get spinning(){return l(i)}})}}),v(E);var D=t(E,2),O=e=>{ke(e,{get line(){return l(f)}})},k=e=>{x(e,Ae())};N(D,e=>{l(f)&&l(s)<=o()?e(O):e(k,-1)}),v(h),c(e=>{_=C(h,1,`coin-row svelte-ygslya`,null,_,{visible:l(p)}),S=C(b,1,`line-label svelte-ygslya`,null,S,e),I(w,l(s))},[()=>({complete:m(l(s))===`complete`,building:m(l(s))===`building`})]),x(e,h)}),v(h),c(e=>E(h,`aria-label`,e),[()=>f.t(`coins.gridLabel`)]),x(e,h),O()}var Pe=[`qian`,`kun`,`zhen`,`xun`,`kan`,`li`,`gen`,`dui`],Fe={kun:{id:`kun`,yangBits:[0,0,0],glyph:`☷`},zhen:{id:`zhen`,yangBits:[1,0,0],glyph:`☳`},xun:{id:`xun`,yangBits:[0,1,1],glyph:`☴`},kan:{id:`kan`,yangBits:[0,1,0],glyph:`☵`},li:{id:`li`,yangBits:[1,0,1],glyph:`☲`},gen:{id:`gen`,yangBits:[0,0,1],glyph:`☶`},dui:{id:`dui`,yangBits:[1,1,0],glyph:`☱`},qian:{id:`qian`,yangBits:[1,1,1],glyph:`☰`}},Ie=Object.fromEntries(Object.values(Fe).map(e=>[e.yangBits.join(``),e.id]));function Le(e){return Fe[e].glyph}function Re(e){return Fe[e].yangBits}function ze(e,t,n){let r=`${e}${t}${n}`,i=Ie[r];if(!i)throw Error(`Invalid trigram line pattern: ${r}`);return i}var Be=[2,24,7,19,15,36,46,12,16,51,40,54,62,55,32,34,8,3,29,60,39,63,48,5,45,17,47,58,31,49,28,43,23,27,4,41,52,22,18,26,35,21,64,38,56,30,50,14,20,42,59,61,53,37,57,9,11,25,6,10,33,13,44,1];function Ve(e){return e.reduce((e,t,n)=>t.value===`yang`?e|1<<n:e,0)}function He(e){return Be[Ve(e)]}function Ue(e){let t=Array.from({length:6},(t,n)=>e>>n&1);return{lower:ze(t[0],t[1],t[2]),upper:ze(t[3],t[4],t[5])}}function We(e,t){let n=Re(e),r=Re(t);return Be[n[0]<<0|n[1]<<1|n[2]<<2|r[0]<<3|r[1]<<4|r[2]<<5]}function Ge(e){for(let t=0;t<64;t++)if(Be[t]===e)return t;throw Error(`Unknown hexagram number: ${e}`)}function Ke(e){return Ue(Ge(e))}function qe(e){return Array.from({length:6},(t,n)=>e>>n&1?`yang`:`yin`)}function Je(e){return Number.isInteger(e)&&e>=1&&e<=64}var Ye=`.䷀.䷁.䷂.䷃.䷄.䷅.䷆.䷇.䷈.䷉.䷊.䷋.䷌.䷍.䷎.䷏.䷐.䷑.䷒.䷓.䷔.䷕.䷖.䷗.䷘.䷙.䷚.䷛.䷜.䷝.䷞.䷟.䷠.䷡.䷢.䷣.䷤.䷥.䷦.䷧.䷨.䷩.䷪.䷫.䷬.䷭.䷮.䷯.䷰.䷱.䷲.䷳.䷴.䷵.䷶.䷷.䷸.䷹.䷺.䷻.䷼.䷽.䷾.䷿`.split(`.`);function Xe(e){return e<1||e>64?``:Ye[e]??``}var Ze=new Map;for(let e=0;e<64;e++){let t=Be[e],{lower:n,upper:r}=Ue(e);Ze.set(t,{number:t,binary:e,lower:n,upper:r,glyph:Xe(t)})}function Qe(e){let t=Ze.get(e);if(!t)throw Error(`Unknown hexagram number: ${e}`);return t}var $e=Object.assign({"../../data/hexagrams/01.json":{number:1,chinese:`乾`,pinyin:`qián`,lower:`qian`,upper:`qian`,locales:{uk:{name:`Творчість`,composition:`Небо над небом.`,reading:{scene:`Рух без зовнішньої межі.

Сила, яка ще не має форми, але вже прагне проявитись.`,dynamics:`Тут немає сумніву чи хитрості.

Є лише імпульс рухатись уперед, пробувати, створювати, входити у світ власною волею.

Ця гексаграма не обіцяє спокою.

Вона про живу присутність і внутрішній вогонь, який не хоче залишатись прихованим.

Але чиста сила легко стає надлишком.

Те, що здатне створювати, здатне й спалювати, якщо не відчуває міри.`,vector:`Не ховатися в аналізі.

Не чекати ідеального моменту.

Рух народжує форму швидше, ніж довге спостереження.`},judgment:`Творче. Первісний успіх; сприятлива стійкість.`,image:`Небо рухається невпинно; так шляхетна людина зміцнює себе без перерви.`},en:{name:`The Creative`,composition:`Heaven over heaven.`,reading:{scene:`Movement without an outer boundary.

Force has not yet taken form, but already presses toward manifestation.`,dynamics:`There is no doubt or cunning here.

There is only the impulse to move forward, to try, to create, to enter the world by one's own will.

This hexagram does not offer rest. It concerns living presence and an inner fire that does not want to remain hidden.

But pure force easily becomes excess. What can create can also burn if it does not sense measure.`,vector:`Do not hide in analysis.

Do not wait for the perfect moment.

Movement gives birth to form faster than long observation.`},judgment:`The Creative. Original success; favorable through constancy.`,image:`Heaven moves without rest; thus the noble person strengthens themself without ceasing.`}}},"../../data/hexagrams/02.json":{number:2,chinese:`坤`,pinyin:`kūn`,lower:`kun`,upper:`kun`,locales:{uk:{name:`Прийняття`,composition:`Земля під відкритим небом.`,reading:{scene:`Тиша, яка не сперечається зі світом.

Місце, здатне прийняти насіння.`,dynamics:`Це не слабкість і не пасивність.

Скоріше здатність не ламати процес власною напругою.

Тут сила проявляється не через натиск, а через витримку і простір.

Те, що росте природно, не потребує постійного примусу.

Але надмірна поступливість теж виснажує.

Той, хто завжди приймає форму інших, поступово втрачає власну.`,vector:`Іноді правильний рух — не штовхати події вперед, а створити умови, в яких вони самі можуть проявитись.`},judgment:`Приймальне. Первісний успіх; сприятлива стійкість кобили.`,image:`Земля тримає всі речі; так шляхетна людина несе світ широкою мірою.`},en:{name:`The Receptive`,composition:`Earth under open sky.`,reading:{scene:`A stillness that does not argue with the world.

A place able to receive seed.`,dynamics:`This is not weakness and not passivity.

It is the ability not to tighten around the process until it breaks.

Here force appears not through pressure, but through endurance and space. What grows naturally does not need constant compulsion.

But excessive yielding also exhausts. The one who always takes the form of others gradually loses their own.`,vector:`Sometimes the right movement is not to push events forward, but to create the conditions in which they can appear by themselves.`},judgment:`The Receptive. Original success; favorable through the constancy of a mare.`,image:`The earth carries all things; thus the noble person bears the world with broad capacity.`}}},"../../data/hexagrams/03.json":{number:3,chinese:`屯`,pinyin:`zhūn`,lower:`zhen`,upper:`kan`,locales:{uk:{name:`Початкова складність`,composition:`Грім під водою.`,reading:{scene:`Рух, який уже народився, але ще не знає власної форми.

Перший хаос нового життя.`,dynamics:`Початок майже ніколи не буває чистим і впорядкованим.

Те, що росте по-справжньому, проходить через плутанину, помилки і нестабільність.

Тут легко захотіти все кинути або, навпаки, почати силою пришвидшувати процес.

Але надмірний контроль робить хаос лише густішим.

У цій гексаграмі важливі не великі перемоги, а здатність не зупинятись через першу невизначеність.`,vector:`Не вимагати від нового життя миттєвої ясності.

Деякий лад спочатку чути тільки як шум.`},judgment:`Початкова складність. Первісний успіх; сприятлива стійкість. Не поспішати з великим рухом.`,image:`Хмари і грім: початкова складність. Так шляхетна людина впорядковує плутанину.`},en:{name:`Difficulty at the Beginning`,composition:`Thunder under water.`,reading:{scene:`Movement has already been born, but does not yet know its own form.

The first disorder of new life.`,dynamics:`A beginning is almost never clean and ordered.

What truly grows passes through confusion, error, and instability.

Here it is easy to abandon the matter, or to start forcing the process to move faster. But excessive control only thickens the disorder.

In this hexagram, the important thing is not a large victory, but the ability not to stop because of the first uncertainty.`,vector:`Do not demand immediate clarity from new life.

Some order is first heard only as noise.`},judgment:`Difficulty at the Beginning. Original success; favorable through constancy. Do not hurry into a great movement.`,image:`Clouds and thunder: difficulty at the beginning. Thus the noble person brings order to confusion.`}}},"../../data/hexagrams/04.json":{number:4,chinese:`蒙`,pinyin:`méng`,lower:`kan`,upper:`gen`,locales:{uk:{name:`Незрілість`,composition:`Гора над водою.`,reading:{scene:`Межа перед глибиною.

Питання, яке ще не готове до остаточної відповіді.`,dynamics:`Тут є цікавість, але ще немає цілісного бачення.

Людина шукає форму, вчиться помічати зв'язки і поступово відрізняти справжнє знання від випадкового шуму.

Незрілість не є проблемою сама по собі.

Проблемою стає впевненість у тому, що все вже зрозуміло.

Ця гексаграма не любить поспішних висновків і жорстких суджень.

Вона про повільне доростання до ясності.`,vector:`Правильне питання іноді важливіше за швидку відповідь.`},judgment:`Незрілість. Не я шукаю юного невігласа; юний невіглас шукає мене. Перше запитання приймається.`,image:`Біля підніжжя гори виходить джерело: незрілість. Так шляхетна людина виховує дію ясністю.`},en:{name:`Youthful Folly`,composition:`Mountain above water.`,reading:{scene:`A boundary before depth.

A question not yet ready for a final answer.`,dynamics:`There is curiosity here, but not yet a whole view.

A person looks for form, learns to notice relations, and gradually separates real knowledge from incidental noise.

Immaturity is not a problem by itself. The problem begins with certainty that everything is already clear.

This hexagram does not favor quick conclusions or hard judgments. It concerns slow ripening toward clarity.`,vector:`The right question is sometimes more important than a quick answer.`},judgment:`Youthful Folly. I do not seek the young fool; the young fool seeks me. The first question is received.`,image:`A spring comes forth at the foot of the mountain: youthful folly. Thus the noble person cultivates action through clarity.`}}},"../../data/hexagrams/05.json":{number:5,chinese:`需`,pinyin:`xū`,lower:`qian`,upper:`kan`,locales:{uk:{name:`Очікування`,composition:`Вода високо в небі.`,reading:{scene:`Дощ ще не впав на землю, але повітря вже насичене ним.

Напруга перед зміною.`,dynamics:`Тут усе ще не готове до прямої дії.

Події накопичуються повільно, і спроба форсувати їх лише створює зайву тривогу.

Очікування в цій гексаграмі — не бездіяльність.

Це здатність залишатись живим і уважним, поки процес дозріває.

Найбільша помилка тут — почати метушитись лише тому, що тиша здається нестерпною.`,vector:`Не кожен рух наближає результат.

Іноді сила проявляється в умінні не розсипати себе раніше часу.`},judgment:`Очікування. Якщо є щирість, буде світло і проходження. Сприятливо перейти велику воду.`,image:`Хмари підіймаються до неба: очікування. Так шляхетна людина їсть, п’є і залишається спокійною.`},en:{name:`Waiting`,composition:`Water high in heaven.`,reading:{scene:`The rain has not yet fallen to earth, but the air is already filled with it.

Tension before change.`,dynamics:`Everything is not yet ready for direct action.

Events gather slowly, and forcing them only creates needless agitation.

Waiting in this hexagram is not inaction. It is the ability to remain alive and attentive while the process ripens.

The main error here is to start rushing only because the quiet feels unbearable.`,vector:`Not every movement brings the result closer.

Sometimes force appears in the ability not to spend oneself too early.`},judgment:`Waiting. If there is sincerity, there is light and passage. It is favorable to cross the great water.`,image:`Clouds rise to heaven: waiting. Thus the noble person eats, drinks, and remains at ease.`}}},"../../data/hexagrams/06.json":{number:6,chinese:`訟`,pinyin:`sòng`,lower:`kan`,upper:`qian`,locales:{uk:{name:`Конфлікт`,composition:`Вода під небом.`,reading:{scene:`Рух унизу не збігається з рухом угорі.

Ситуація входить у форму суперечки.`,dynamics:`Тут є намір і є перешкода, але вони не стоять на одному рівні.

Слова вже не просто називають речі. Вони стають важелями, якими кожен намагається втримати власну позицію.

Конфлікт загострюється там, де рух подають як правоту. Чим сильніше натиск, тим твердішою стає межа.

Ця гексаграма не веде до повної перемоги. Вона показує місце, де краще зупинити розгін до того, як справа стане незворотною.`,vector:`Не тягнути суперечку до кінця лише тому, що вона вже почалась.

Іноді достатньо побачити межу, за якою рух перестає щось вирішувати.`},judgment:`Конфлікт. Є щирість, але є перешкода. Обережність посередині приносить успіх; доведення до кінця приносить втрату.`,image:`Небо і вода рухаються в різні боки: конфлікт. Так шляхетна людина на початку справи розрізняє межі.`},en:{name:`Conflict`,composition:`Water beneath heaven.`,reading:{scene:`The movement below does not match the movement above.

The situation takes the shape of dispute.`,dynamics:`There is intention here, and there is obstruction, but they do not stand on the same level.

Words no longer simply name the matter. They become levers by which each side tries to hold its position.

Conflict sharpens when movement is presented as rightness. The harder the pressure, the harder the boundary becomes.

This hexagram does not lead to total victory. It marks the place where acceleration should stop before the matter becomes irreversible.`,vector:`Do not drag the dispute to its end only because it has already begun.

Sometimes it is enough to see the line beyond which movement stops resolving anything.`},judgment:`Conflict. There is sincerity, but there is obstruction. Caution in the middle brings success; carrying it to the end brings loss.`,image:`Heaven and water move in different directions: conflict. Thus the noble person distinguishes the boundaries at the beginning of the matter.`}}},"../../data/hexagrams/07.json":{number:7,chinese:`師`,pinyin:`shī`,lower:`kan`,upper:`kun`,locales:{uk:{name:`Військо`,composition:`Вода під землею.`,reading:{scene:`Прихована маса збирається під знаком і наказом.

Без строю вона лишається важкою водою в темному ґрунті.`,dynamics:`Тут багато людей або засобів, але самі по собі вони ще не стають військом. Потрібен знак, за яким можна вишикуватись.

Команда має бути ясною: хто веде, що охороняють, де межа руху. Без цього натовп тисне в різні боки.

Коли порядок стає лише примусом, лави тримаються страхом, а не справою. Такий стрій швидко ламається зсередини.

Ця гексаграма показує зібрану масу під відповідальністю проводу. Тут важить не запал, а здатність тримати ряд.`,vector:`Вишикувати розрізнене під одним знаком.

Не віддавати наказ, доки не ясно, що саме має бути збережене або зрушене.`},judgment:`Військо. Потрібна стійкість і зріла людина. Тоді є успіх без помилки.`,image:`У землі є вода: військо. Так шляхетна людина збільшує маси через широту до людей.`},en:{name:`The Army`,composition:`Water under earth.`,reading:{scene:`A hidden mass gathers under a sign and a command.

Without formation it remains heavy water in dark soil.`,dynamics:`There are many people or means here, but by themselves they do not yet become an army. A sign is needed by which they can take rank.

The command must be clear: who leads, what is guarded, where the line of movement lies. Without this, a crowd presses in different directions.

When order becomes only coercion, the ranks are held by fear, not by the matter. Such formation quickly breaks from within.

This hexagram shows a gathered mass under responsible command. What matters is not zeal, but the ability to hold the line.`,vector:`Set what is scattered into rank under one sign.

Do not give the command before it is clear what must be preserved or moved.`},judgment:`The Army. Constancy and a mature person are needed. Then there is success without fault.`,image:`In the earth there is water: the army. Thus the noble person increases the people through breadth toward them.`}}},"../../data/hexagrams/08.json":{number:8,chinese:`比`,pinyin:`bǐ`,lower:`kun`,upper:`kan`,locales:{uk:{name:`Зближення`,composition:`Вода лежить на землі.`,reading:{scene:`Окремі частини шукають спільне місце.

Зв'язок з'являється раніше за форму союзу.`,dynamics:`Тут ідеться не про злиття, а про наближення. Різні елементи перевіряють, чи можуть триматися поруч.

Потрібна вісь збору, але її не створюють вимогою. Вона стає помітною, коли рухи самі сходяться до одного місця.

Запізніле приєднання має інший смак. Той, хто довго вагався, входить уже не в початок, а в наявний порядок.

Ця гексаграма показує зв'язок як факт ситуації. Питання лише в тому, чи є в ньому стійка основа.`,vector:`Дивитися, до чого справді тяжіють речі.

Не називати єдністю те, що тримається лише на страху лишитися осторонь.`},judgment:`Зближення. Сприятливо перевірити початок. Хто приходить пізно, зустрічає втрату.`,image:`На землі є вода: зближення. Так давні володарі встановлювали держави і зближувалися з правителями.`},en:{name:`Holding Together`,composition:`Water lies upon earth.`,reading:{scene:`Separate parts look for a shared place.

Connection appears before the form of alliance.`,dynamics:`This is not fusion, but approach. Different elements test whether they can remain beside one another.

An axis of gathering is needed, but it is not made by demand. It becomes visible when movements gather toward one place by themselves.

Late joining has a different weight. The one who hesitated enters not the beginning, but an order already present.

This hexagram shows connection as a fact of the situation. The question is whether it has a stable base.`,vector:`Look at what things actually gravitate toward.

Do not call it unity when it is held only by fear of being left outside.`},judgment:`Holding Together. It is favorable to examine the beginning. Whoever comes late meets loss.`,image:`On the earth there is water: holding together. Thus the ancient kings established states and drew near to the rulers.`}}},"../../data/hexagrams/09.json":{number:9,chinese:`小畜`,pinyin:`xiǎo xù`,lower:`qian`,upper:`xun`,locales:{uk:{name:`Невеликий вплив`,composition:`Вітер рухається під небом.`,reading:{scene:`Велика сила стримана малим дотиком.

Хмари збираються, але дощ ще не падає.`,dynamics:`Тут немає можливості прямого прориву. Ситуацію тримає тонка дія, майже непомітна, але послідовна.

Мале не перемагає велике. Воно змінює напрям, затримує надлишок і не дає силі розсипатися завчасно.

Небезпека в тому, щоб переплутати стримування з владою. Те, що можна тільки спрямувати, не варто вважати підкореним.

Цей стан живе завдяки дрібній точності. Один грубий рух руйнує те, що трималося на легкому натиску.`,vector:`Працювати малими змінами.

Не вимагати від тонкого впливу результатів, які належать великому перелому.`},judgment:`Мале накопичення. Успіх. Густі хмари, але дощу ще немає з нашого заходу.`,image:`Вітер ходить небом: мале накопичення. Так шляхетна людина очищує зовнішню форму справ.`},en:{name:`Gentle Influence`,composition:`Wind moves beneath heaven.`,reading:{scene:`A great force is restrained by a small touch.

Clouds gather, but rain has not yet fallen.`,dynamics:`A direct breakthrough is not available here. The situation is held by a subtle action, almost invisible, but consistent.

The small does not defeat the great. It changes direction, delays excess, and keeps force from spilling out too early.

The danger is mistaking restraint for command. What can only be guided should not be treated as conquered.

This state lives through small precision. One crude movement breaks what was held by light pressure.`,vector:`Work through small changes.

Do not demand from subtle influence the results that belong to a major break.`},judgment:`The Taming Power of the Small. Success. Dense clouds, but no rain yet from our western field.`,image:`Wind moves across heaven: small accumulation. Thus the noble person refines the outer form of things.`}}},"../../data/hexagrams/10.json":{number:10,chinese:`履`,pinyin:`lǚ`,lower:`dui`,upper:`qian`,locales:{uk:{name:`Хода`,composition:`Озеро під небом.`,reading:{scene:`Легка поверхня стоїть під сильною висотою.

Крок проходить поруч із небезпекою.`,dynamics:`Тут рух можливий, але не вільний від ризику. Ситуація вимагає точного кроку, бо поруч є сила, значно більша за того, хто рухається.

Поступ не залежить від сміливості сам по собі. Важливо, як саме поставлена нога і чи не зачіпає вона те, що не можна дратувати.

Коли легкість стає самовпевненістю, вона швидко опиняється під тиском. Коли обережність стає страхом, рух зникає.

Ця гексаграма показує поведінку на межі. Небезпека реальна, але вона не обов'язково кусає того, хто бачить її форму.`,vector:`Йти точно, без зайвого жесту.

Не робити з ризику драму, але й не вдавати, що його немає.`},judgment:`Хода. Наступити на хвіст тигра; він не кусає. Успіх.`,image:`Небо вгорі, озеро внизу: хода. Так шляхетна людина розрізняє високе і низьке та встановлює місця.`},en:{name:`Treading`,composition:`Lake beneath heaven.`,reading:{scene:`A light surface stands under a strong height.

The step passes close to danger.`,dynamics:`Movement is possible here, but not free of risk. The situation requires an exact step, because a force much larger than the mover is nearby.

Progress does not depend on courage alone. What matters is how the foot is placed, and whether it touches what must not be provoked.

When lightness becomes self-assurance, it quickly comes under pressure. When caution becomes fear, movement disappears.

This hexagram shows conduct at the edge. The danger is real, but it does not necessarily bite the one who sees its shape.`,vector:`Move precisely, without an unnecessary gesture.

Do not dramatize the risk, but do not pretend it is absent.`},judgment:`Treading. Stepping on the tiger’s tail; it does not bite. Success.`,image:`Heaven above, lake below: treading. Thus the noble person distinguishes high and low and sets the places.`}}},"../../data/hexagrams/11.json":{number:11,chinese:`泰`,pinyin:`tài`,lower:`kun`,upper:`qian`,locales:{uk:{name:`Мир`,composition:`Небо під землею.`,reading:{scene:`Високе входить у нижнє, нижнє відкриває простір високому.

Речі на мить сходяться.`,dynamics:`Тут протилежні рухи не розходяться, а проходять один крізь одного. Завдяки цьому з'являється прохід.

Стан сприятливий не тому, що все стало легким. Просто між рівнями є обмін, і застій поки не встигає замкнути форму.

Надлишок зручності робить з цього стану сон. Те, що вільно рухається сьогодні, завтра може знову затвердіти.

Ця гексаграма показує відкриту циркуляцію. Вона цінна саме як жива рівновага, а не як гарантія тривалого миру.`,vector:`Користуватися відкритим проходом, поки він справді відкритий.

Не привласнювати собі стан, який тримається взаємним рухом.`},judgment:`Мир. Мале відходить, велике приходить. Успіх і проходження.`,image:`Небо і земля з’єднуються: мир. Так володар упорядковує шлях неба і землі та підтримує людей.`},en:{name:`Peace`,composition:`Heaven under earth.`,reading:{scene:`The high enters the low; the low opens space for the high.

For a moment, things meet.`,dynamics:`Opposite movements do not separate here; they pass through one another. Because of this, a passage opens.

The state is favorable not because everything has become easy. There is exchange between levels, and stagnation has not yet sealed the form.

Too much ease turns this state into sleep. What moves freely today may harden again tomorrow.

This hexagram shows open circulation. Its value is in living balance, not in a guarantee of lasting peace.`,vector:`Use the open passage while it is truly open.

Do not claim ownership of a state held by mutual movement.`},judgment:`Peace. The small departs, the great arrives. Success and passage.`,image:`Heaven and earth unite: peace. Thus the ruler orders the way of heaven and earth and supports the people.`}}},"../../data/hexagrams/12.json":{number:12,chinese:`否`,pinyin:`pǐ`,lower:`qian`,upper:`kun`,locales:{uk:{name:`Відсутність гармонії`,composition:`Небо відходить угору, земля осідає вниз.`,reading:{scene:`Між рівнями немає проходу.

Форма залишається, але обмін зупинений.`,dynamics:`Тут зовнішній порядок може ще виглядати цілим, але всередині зв'язок уже не працює. Верх і низ розходяться так, що слово не доходить між ними.

Рух не варто витрачати на двері, які зараз не відчиняються. Натиск лише підтверджує закритість.

Застій спокушає удавати нормальність. Тоді порожня форма починає вимагати ще більше сил, ніж жива справа.

Ця гексаграма показує час, коли мале тримається ближче до себе. Великий рух не проходить крізь мертву середину.`,vector:`Не годувати порожній механізм власною присутністю.

Зберігати те, що ще має живий зв'язок.`},judgment:`Застій. Нелюдське не сприяє стійкості шляхетної людини. Велике відходить, мале приходить.`,image:`Небо і земля не з’єднуються: застій. Так шляхетна людина береже свою силу і не служить порожній славі.`},en:{name:`Disconnection`,composition:`Heaven withdraws upward; earth settles downward.`,reading:{scene:`There is no passage between levels.

The form remains, but exchange has stopped.`,dynamics:`The outer order may still look whole, but inside, the connection no longer works. Above and below pull apart so that a word no longer passes between them.

Movement should not be spent on doors that do not open now. Pressure only confirms their closure.

Stagnation tempts one to perform normality. Then an empty form begins to demand more force than a living matter would.

This hexagram shows a time when the small keeps close to itself. A large movement cannot pass through a dead middle.`,vector:`Do not feed an empty mechanism with your presence.

Preserve what still has a living connection.`},judgment:`Stagnation. What is not human does not favor the constancy of the noble person. The great departs, the small arrives.`,image:`Heaven and earth do not unite: stagnation. Thus the noble person preserves their force and does not serve empty rank.`}}},"../../data/hexagrams/13.json":{number:13,chinese:`同人`,pinyin:`tóng rén`,lower:`li`,upper:`qian`,locales:{uk:{name:`Спільнота`,composition:`Вогонь під небом.`,reading:{scene:`Світло видно здалеку, і люди можуть зібратися навколо нього.

Спільність виходить за межі дому.`,dynamics:`Тут зв'язок виникає не з близькості, а з відкритого простору. Різні люди бачать один знак і можуть діяти в одному напрямі.

Потрібна ясність, бо без неї спільнота стає натовпом або приватною змовою. Те, що має бути спільним, не тримається в темряві.

Небезпека в тому, щоб назвати єдністю лише тих, хто зручний. Тоді широке поле стискається до гуртка.

Ця гексаграма показує спільну справу, яка потребує відкритості. Особисте тут не зникає, але не повинно затуляти знак.`,vector:`Виносити справу на світло.

Не будувати спільність на прихованому винятку.`},judgment:`Спільнота з людьми на відкритому полі. Успіх. Сприятливо перейти велику воду.`,image:`Небо разом з вогнем: спільнота. Так шляхетна людина розрізняє роди і впорядковує речі.`},en:{name:`Fellowship`,composition:`Fire under heaven.`,reading:{scene:`The light is visible from afar, and people can gather around it.

Fellowship moves beyond the house.`,dynamics:`Connection arises here not from closeness, but from open space. Different people see one sign and can move in one direction.

Clarity is needed, because without it a fellowship becomes a crowd or a private arrangement. What is meant to be shared does not hold in darkness.

The danger is calling only the convenient ones a unity. Then the wide field shrinks into a circle.

This hexagram shows a common matter that needs openness. The personal does not vanish here, but it must not cover the sign.`,vector:`Bring the matter into the light.

Do not build fellowship on a hidden exception.`},judgment:`Fellowship with people in the open field. Success. It is favorable to cross the great water.`,image:`Heaven together with fire: fellowship. Thus the noble person distinguishes kinds and orders things.`}}},"../../data/hexagrams/14.json":{number:14,chinese:`大有`,pinyin:`dà yǒu`,lower:`qian`,upper:`li`,locales:{uk:{name:`Велике Маючи`,composition:`Вогонь стоїть над небом.`,reading:{scene:`Світло піднімається високо і робить видимим великий обсяг.

Наявне більше, ніж потрібно для малого жесту.`,dynamics:`Тут зібрано багато: майно, вплив або ясність, які вже не можна вважати дрібними. Ситуація має вагу і помітність.

Велике володіння не дорівнює безмежному праву. Чим більше зібрано, тим точнішою має бути міра використання.

Надлишок легко переходить у показ. Тоді світло служить не справі, а блиску навколо власної руки.

Ця гексаграма показує силу, яка може тримати широкий простір. Вона залишається чистою лише там, де не втрачає стриманості.`,vector:`Керувати тим, що вже є.

Не роздувати володіння до демонстрації.`},judgment:`Велике володіння. Первісний успіх.`,image:`Вогонь у небі: велике володіння. Так шляхетна людина стримує зло і підносить добро.`},en:{name:`Great Abundance`,composition:`Fire stands above heaven.`,reading:{scene:`Light rises high and makes a large scope visible.

What is present is more than a small gesture needs.`,dynamics:`Much is gathered here: possession, influence, or clarity that can no longer be treated as minor. The situation has weight and visibility.

Great possession is not unlimited right. The more that is gathered, the more exact the measure of use must be.

Excess easily turns into display. Then light serves not the matter, but the shine around one's own hand.

This hexagram shows a force able to hold a wide space. It remains clean only where it does not lose restraint.`,vector:`Govern what is already present.

Do not inflate possession into demonstration.`},judgment:`Great Possession. Original success.`,image:`Fire in heaven: great possession. Thus the noble person restrains what is harmful and raises what is good.`}}},"../../data/hexagrams/15.json":{number:15,chinese:`謙`,pinyin:`qiān`,lower:`gen`,upper:`kun`,locales:{uk:{name:`Скромність`,composition:`Гора захована в землі.`,reading:{scene:`Високе не виставляє себе назовні.

Форма має вагу, але не потребує показу.`,dynamics:`Тут сила не піднімає себе над іншими. Вона входить у рівень землі й тому не створює зайвого тертя.

Скромність не означає применшення. Це точне розміщення власної ваги там, де вона не перекриває рух цілого.

Фальшива скромність також є виставою. Вона ховає гордість під низьким голосом і все одно вимагає уваги.

Ця гексаграма показує міру. Те, що справді має форму, не потребує постійного піднесення над поверхнею.`,vector:`Зменшити виставлене, не зменшуючи суті.

Дати речам зайняти правильну висоту.`},judgment:`Скромність. Успіх. Шляхетна людина доводить справу до кінця.`,image:`У землі є гора: скромність. Так шляхетна людина зменшує надмірне і додає недостатньому.`},en:{name:`Humility`,composition:`A mountain hidden in earth.`,reading:{scene:`The high does not display itself outwardly.

The form has weight, but does not need show.`,dynamics:`Force does not raise itself above others here. It enters the level of the earth and therefore creates no needless friction.

Humility does not mean self-erasure. It is the exact placement of one's weight where it does not block the movement of the whole.

False humility is also performance. It hides pride under a lowered voice and still demands attention.

This hexagram shows measure. What truly has form does not need constant elevation above the surface.`,vector:`Reduce what is displayed without reducing the substance.

Let things occupy their proper height.`},judgment:`Modesty. Success. The noble person brings the matter to completion.`,image:`Within the earth there is a mountain: modesty. Thus the noble person reduces what is excessive and adds to what is lacking.`}}},"../../data/hexagrams/16.json":{number:16,chinese:`豫`,pinyin:`yù`,lower:`kun`,upper:`zhen`,locales:{uk:{name:`Радість в русі`,composition:`Грім виходить із землі.`,reading:{scene:`Рух піднімається знизу і захоплює простір.

Настрій стає силою дії.`,dynamics:`Тут імпульс уже не прихований. Він проходить крізь людей, ритм, підготовку, спільний жест.

Піднесення потребує напрямку. Без нього воно швидко стає шумом, що витрачає запас раніше за справу.

Найлегше тут переплутати живий рух із самозбудженням. Тоді грім звучить, але не відкриває дороги.

Ця гексаграма показує момент перед дією, коли гурт може стати строєм. Важлива не гучність, а готовність до виходу.`,vector:`Дати руху ритм.

Не підміняти дію настроєм, навіть коли настрій сильний.`},judgment:`Піднесення. Сприятливо поставити помічників і рушити військо.`,image:`Грім виходить із землі: піднесення. Так давні володарі складали музику і вшановували силу.`},en:{name:`Joy in Motion`,composition:`Thunder comes out of earth.`,reading:{scene:`Movement rises from below and takes the space.

Mood becomes a force of action.`,dynamics:`The impulse is no longer hidden. It passes through people, rhythm, preparation, and shared gesture.

Elevation needs direction. Without it, it quickly becomes noise that spends the reserve before the work begins.

It is easy here to confuse living movement with self-excitation. Then thunder sounds, but opens no road.

This hexagram shows the moment before action, when a group can become a formation. What matters is not loudness, but readiness to move out.`,vector:`Give movement a rhythm.

Do not replace action with mood, even when the mood is strong.`},judgment:`Enthusiasm. It is favorable to appoint helpers and set the army in motion.`,image:`Thunder comes out of the earth: enthusiasm. Thus the ancient kings made music and honored force.`}}},"../../data/hexagrams/17.json":{number:17,chinese:`隨`,pinyin:`suí`,lower:`zhen`,upper:`dui`,locales:{uk:{name:`Слідування`,composition:`Грім під озером.`,reading:{scene:`Рух входить у відгук і змінює напрям за тим, що його приймає.

Слідування починається з контакту.`,dynamics:`Тут не перемагає той, хто штовхає першим. Важливіше відчути, за чим ситуація вже рухається.

Слідування не є покорою. Це здатність не тягнути все до власного плану, коли інший напрям уже має силу.

Небезпека в тому, щоб втратити центр і назвати будь-який зовнішній рух знаком. Тоді людина йде не за процесом, а за випадковим шумом.

Ця гексаграма показує рух через налаштування. Правильний крок з'являється після того, як почуто ритм.`,vector:`Йти за тим, що справді веде.

Не плутати відгук із розчиненням у чужому русі.`},judgment:`Слідування. Первісний успіх; сприятлива стійкість. Без помилки.`,image:`Грім у середині озера: слідування. Так шляхетна людина входить у відпочинок, коли день схиляється.`},en:{name:`Following`,composition:`Thunder under lake.`,reading:{scene:`Movement enters response and changes direction according to what receives it.

Following begins with contact.`,dynamics:`The one who pushes first does not prevail here. It matters more to sense what the situation is already moving after.

Following is not submission. It is the ability not to drag everything toward one's own plan when another direction already has force.

The danger is losing the center and treating any external movement as a sign. Then one follows noise, not process.

This hexagram shows movement through attunement. The right step appears after the rhythm has been heard.`,vector:`Follow what actually leads.

Do not confuse response with dissolving into another movement.`},judgment:`Following. Original success; favorable through constancy. No fault.`,image:`Thunder in the middle of the lake: following. Thus the noble person enters rest when the day declines.`}}},"../../data/hexagrams/18.json":{number:18,chinese:`蠱`,pinyin:`gǔ`,lower:`xun`,upper:`gen`,locales:{uk:{name:`Відновлення`,composition:`Вітер під горою.`,reading:{scene:`Повітря не проходить вільно, старе накопичилось у закритому місці.

Потрібна робота з пошкодженим коренем.`,dynamics:`Тут проблема не з'явилась сьогодні. Вона лежала в основі, псувала форму і стала помітною через наслідки.

Ремонт починається не з прикрашання поверхні. Треба торкатися того, що давно не перевіряли або не хотіли відкривати.

Старе легко видає себе за природний порядок. Саме тому розклад може триматися довше, ніж живий рух.

Ця гексаграма показує працю після занедбання. Вона не м'яка, але без неї нове стане на гнилу підлогу.`,vector:`Повернутися до причини, а не до симптомів.

Виносити зіпсоване на повітря без прикрас.`},judgment:`Робота над зіпсованим. Первісний успіх. Сприятливо перейти велику воду. Перед початком три дні, після початку три дні.`,image:`Під горою є вітер: зіпсоване. Так шляхетна людина зрушує людей і відновлює їхню силу.`},en:{name:`Restoration`,composition:`Wind under mountain.`,reading:{scene:`Air cannot pass freely; the old has accumulated in a closed place.

Work is needed at the damaged root.`,dynamics:`The problem did not appear today. It lay in the base, spoiled the form, and became visible through its effects.

Repair does not begin by decorating the surface. It must touch what has long gone unchecked or unopened.

The old easily presents itself as natural order. That is why decay may hold longer than living movement.

This hexagram shows work after neglect. It is not soft, but without it the new will stand on a rotten floor.`,vector:`Return to the cause, not to the symptoms.

Bring the spoiled matter into the air without ornament.`},judgment:`Work on What Has Been Spoiled. Original success. It is favorable to cross the great water. Three days before the beginning, three days after the beginning.`,image:`Under the mountain there is wind: what has been spoiled. Thus the noble person stirs the people and restores their force.`}}},"../../data/hexagrams/19.json":{number:19,chinese:`臨`,pinyin:`lín`,lower:`dui`,upper:`kun`,locales:{uk:{name:`Наближення`,composition:`Озеро над землею.`,reading:{scene:`Наближення приходить широко, без різкого удару.

Велике спускається до малого.`,dynamics:`Тут сила наближається і стає доступною. Вона ще не тисне, але її присутність уже змінює поле.

Наближення потребує пильності, бо зростання має власний строк. Те, що розширюється, не лишається таким назавжди.

Небезпека в самовпевненому розгортанні. Коли приплив здається нескінченним, люди забувають про відплив.

Ця гексаграма показує сприятливий підхід сили. Її треба прийняти в роботу, поки вона ще свіжа й не стала надлишком.`,vector:`Зустріти те, що наближається.

Не спати в часі зростання, бо саме зростання теж має межу.`},judgment:`Наближення. Первісний успіх; сприятлива стійкість. Коли настає восьмий місяць, є втрата.`,image:`Над землею є озеро: наближення. Так шляхетна людина навчає без виснаження і захищає людей без межі.`},en:{name:`Approach`,composition:`Lake over earth.`,reading:{scene:`Approach arrives broadly, without a sharp strike.

The great descends toward the small.`,dynamics:`Force approaches and becomes available here. It does not yet press, but its presence already changes the field.

Approach requires vigilance, because growth has its own term. What expands does not remain so forever.

The danger is self-assured unfolding. When the tide seems endless, people forget the ebb.

This hexagram shows the favorable approach of force. It should be taken into work while still fresh, before it becomes excess.`,vector:`Meet what is approaching.

Do not sleep through a time of growth, because growth itself also has a limit.`},judgment:`Approach. Original success; favorable through constancy. When the eighth month arrives, there is loss.`,image:`Above the earth there is a lake: approach. Thus the noble person teaches without exhaustion and protects the people without limit.`}}},"../../data/hexagrams/20.json":{number:20,chinese:`觀`,pinyin:`guān`,lower:`kun`,upper:`xun`,locales:{uk:{name:`Спостереження`,composition:`Вітер над землею.`,reading:{scene:`Погляд проходить широко і не втручається відразу.

Видиме стає важливішим за швидку дію.`,dynamics:`Тут ситуація розкривається через спостереження. Не все потребує негайного торкання; іноді форма сама починає показувати свої межі.

Висота погляду важлива, але вона не повинна ставати віддаленістю. Надто далекий погляд перестає бачити дрібні рухи.

Є небезпека перетворити спостереження на позу. Тоді людина дивиться, щоб не входити в справу.

Ця гексаграма показує момент огляду. Рух ще не головний; головне, що саме стає видимим з правильного місця.`,vector:`Підняти погляд, але не втратити предмет.

Діяти після того, як форма справді проявилась.`},judgment:`Споглядання. Омивання зроблено, але жертву ще не принесено. Є щирість і піднесений погляд.`,image:`Вітер ходить над землею: споглядання. Так давні володарі оглядали сторони світу і навчали людей.`},en:{name:`Observation`,composition:`Wind over earth.`,reading:{scene:`The gaze moves widely and does not interfere at once.

What is visible becomes more important than quick action.`,dynamics:`The situation opens through observation. Not everything needs immediate contact; sometimes the form begins to show its own edges.

The height of the gaze matters, but it must not become distance. A gaze too far away stops seeing small movements.

There is a danger of turning observation into a pose. Then one looks in order not to enter the matter.

This hexagram shows a moment of viewing. Movement is not yet central; what matters is what becomes visible from the right place.`,vector:`Raise the gaze without losing the object.

Act after the form has actually appeared.`},judgment:`Contemplation. The washing is done, but the offering has not yet been made. There is sincerity and an uplifted gaze.`,image:`Wind moves over the earth: contemplation. Thus the ancient kings viewed the regions and taught the people.`}}},"../../data/hexagrams/21.json":{number:21,chinese:`噬嗑`,pinyin:`shì kè`,lower:`zhen`,upper:`li`,locales:{uk:{name:`Прокушування`,composition:`Грім під вогнем.`,reading:{scene:`Між частинами є тверда перешкода, яку треба прокусити.

Світло показує місце розриву.`,dynamics:`Тут справа не проходить через м'яке обходження. Щось стоїть між частинами і блокує з'єднання.

Потрібна ясна дія: назвати, розрізати, відділити зайве. Без цього напруга лише переходить із місця на місце.

Жорсткість стає помилкою, коли кара важливіша за відновлення ладу. Тоді зуби ламають більше, ніж перешкоду.

Ця гексаграма показує необхідність точного розсічення. Воно не прикрашає ситуацію, але відкриває прохід.`,vector:`Не обтікати те, що застрягло посередині.

Різати тільки там, де справді є вузол.`},judgment:`Прокушування. Успіх. Сприятливо застосувати суд.`,image:`Грім і блискавка: прокушування. Так давні володарі встановлювали закони і ясні покарання.`},en:{name:`Biting Through`,composition:`Thunder under fire.`,reading:{scene:`A hard obstruction stands between the parts and must be bitten through.

Light shows the place of the break.`,dynamics:`The matter cannot pass through gentle avoidance. Something stands between the parts and blocks connection.

A clear action is needed: name, cut, separate what is excess. Without this, tension only moves from place to place.

Hardness becomes error when punishment matters more than restoring order. Then the teeth break more than the obstruction.

This hexagram shows the need for exact severing. It does not beautify the situation, but it opens a passage.`,vector:`Do not flow around what is stuck in the middle.

Cut only where there is truly a knot.`},judgment:`Biting Through. Success. It is favorable to apply judgment.`,image:`Thunder and lightning: biting through. Thus the ancient kings established laws and clear punishments.`}}},"../../data/hexagrams/22.json":{number:22,chinese:`賁`,pinyin:`bì`,lower:`li`,upper:`gen`,locales:{uk:{name:`Краса в простоті`,composition:`Вогонь біля підніжжя гори.`,reading:{scene:`Форма освітлена, але не змінена в самій основі.

Краса торкається поверхні.`,dynamics:`Тут важлива видимість, порядок знаків, зовнішня міра. Річ потребує оформлення, щоб її можна було побачити.

Прикраса має межу. Вона підкреслює форму, але не замінює її внутрішньої ваги.

Небезпека в тому, щоб прийняти блиск за зміст. Тоді поверхня починає керувати тим, що повинна лише показувати.

Ця гексаграма показує доречну красу: небагато світла, достатньо лінії, без спроби зробити зовнішнє головним.`,vector:`Оформити, але не прикривати.

Залишити поверхні рівно стільки значення, скільки вона може нести.`},judgment:`Прикраса. Успіх. Малому сприятливо мати куди йти.`,image:`Вогонь біля підніжжя гори: прикраса. Так шляхетна людина прояснює справи, але не вирішує великих судів лише зовнішнім.`},en:{name:`Beauty in Simplicity`,composition:`Fire at the foot of the mountain.`,reading:{scene:`The form is lit, but not changed at its base.

Beauty touches the surface.`,dynamics:`Visibility, order of signs, and outer measure matter here. A thing needs shaping so it can be seen.

Adornment has a limit. It emphasizes form, but does not replace its inner weight.

The danger is taking shine for substance. Then the surface begins to govern what it should only reveal.

This hexagram shows fitting beauty: a little light, enough line, no attempt to make the outer layer central.`,vector:`Give form, but do not cover.

Leave the surface exactly as much meaning as it can carry.`},judgment:`Grace. Success. It is favorable for the small to have somewhere to go.`,image:`Fire at the foot of the mountain: grace. Thus the noble person clarifies affairs, but does not decide great judgments by appearance alone.`}}},"../../data/hexagrams/23.json":{number:23,chinese:`剝`,pinyin:`bō`,lower:`kun`,upper:`gen`,locales:{uk:{name:`Розщеплення`,composition:`Гора стоїть на землі, але низ підточений.`,reading:{scene:`Форма ще висока, проте основа відходить шар за шаром.

Настає час розпаду.`,dynamics:`Тут не йдеться про раптову катастрофу. Руйнування вже працює знизу, і верх тримається радше звичкою, ніж силою.

Спроба діяти широко лише збільшує втрати. Коли опора кришиться, великий крок робить провал більшим.

Небезпека в запереченні очевидного. Те, що відпадає, не варто приклеювати словами.

Ця гексаграма показує зняття старої форми. Можна берегти ядро, але не всю оболонку.`,vector:`Не будувати на основі, яка вже сходить нанівець.

Дати відпасти тому, що більше не тримає ваги.`},judgment:`Розщеплення. Несприятливо мати куди йти.`,image:`Гора спирається на землю: розщеплення. Так верхні зміцнюють нижніх, щоб зберегти своє місце.`},en:{name:`Splitting Apart`,composition:`A mountain stands on earth, but the base is being stripped away.`,reading:{scene:`The form is still high, yet support leaves layer by layer.

A time of splitting arrives.`,dynamics:`This is not sudden catastrophe. Ruin is already working from below, and the upper part is held more by habit than by force.

Trying to act broadly only increases loss. When the support crumbles, a large step makes the fall larger.

The danger is denying what is plain. What is peeling away should not be glued back with words.

This hexagram shows the removal of an old form. The core may be protected, but not the entire shell.`,vector:`Do not build on a base already coming apart.

Let fall what no longer carries weight.`},judgment:`Splitting Apart. It is not favorable to have somewhere to go.`,image:`The mountain rests on the earth: splitting apart. Thus those above strengthen those below in order to keep their place.`}}},"../../data/hexagrams/24.json":{number:24,chinese:`復`,pinyin:`fù`,lower:`zhen`,upper:`kun`,locales:{uk:{name:`Повернення`,composition:`Грім повертається під землю.`,reading:{scene:`Рух ще малий, майже невидимий, але напрям уже змінився.

Новий цикл входить тихо.`,dynamics:`Тут після спаду з'являється перший поворот. Він не схожий на перемогу; радше на тонкий знак, що життя знову торкнулося кореня.

Повернення не терпить поспіху. Малий рух легко пошкодити, якщо одразу вимагати від нього повної сили.

Небезпека в тому, щоб розігнати початок до старої швидкості. Тоді нове повторить виснаження попереднього циклу.

Ця гексаграма показує момент відновленого напряму. Він простий, але ще потребує чистого простору.`,vector:`Помітити малий поворот.

Не навантажувати перший рух вагою всього майбутнього.`},judgment:`Повернення. Успіх. Вихід і вхід без хвороби; друзі приходять без помилки. На сьомий день повернення.`,image:`Грім усередині землі: повернення. Так давні володарі зачиняли проходи в день сонцестояння.`},en:{name:`Return`,composition:`Thunder returns beneath earth.`,reading:{scene:`The movement is still small, almost invisible, but the direction has already changed.

A new cycle enters quietly.`,dynamics:`After decline, the first turn appears. It does not look like victory, but like a fine sign that life has touched the root again.

Return does not tolerate haste. A small movement is easily damaged if full force is demanded from it at once.

The danger is accelerating the beginning to the old speed. Then the new repeats the exhaustion of the previous cycle.

This hexagram shows a moment of restored direction. It is simple, but still needs clear space.`,vector:`Notice the small turn.

Do not load the first movement with the weight of the whole future.`},judgment:`Return. Success. Going out and coming in without harm; friends arrive without fault. On the seventh day, return.`,image:`Thunder within the earth: return. Thus the ancient kings closed the passes on the day of the solstice.`}}},"../../data/hexagrams/25.json":{number:25,chinese:`無妄`,pinyin:`wú wàng`,lower:`zhen`,upper:`qian`,locales:{uk:{name:`Невтручання`,composition:`Грім під небом.`,reading:{scene:`Рух виникає прямо, без прихованої схеми.

Ситуація не терпить штучного наміру.`,dynamics:`Тут правильним є те, що не сконструйоване заради вигоди. Рух має бути простим і відповідним моменту.

Невинність не означає незнання. Це відсутність зайвого втручання там, де порядок уже має власний хід.

Небезпека в тому, щоб підкласти під чистий рух приватний розрахунок. Тоді випадок швидко стає пасткою.

Ця гексаграма показує дію без надбудови. Те, що не належить ситуації, краще не додавати.`,vector:`Діяти прямо, без підмішаної вигоди.

Не чіпати механізм, який працює саме тому, що його не тягнуть убік.`},judgment:`Без хибного. Первісний успіх; сприятлива стійкість. Якщо дія не правильна, буде біда.`,image:`Під небом рухається грім: без хибного. Так давні володарі узгоджували час і живили всі речі.`},en:{name:`Non-Interference`,composition:`Thunder under heaven.`,reading:{scene:`Movement arises directly, without a hidden scheme.

The situation does not tolerate artificial intention.`,dynamics:`What is correct here is not constructed for advantage. Movement must be simple and matched to the moment.

Innocence does not mean ignorance. It is the absence of needless interference where order already has its own course.

The danger is placing private calculation under a clean movement. Then chance quickly becomes a trap.

This hexagram shows action without an added layer. What does not belong to the situation is better left out.`,vector:`Act directly, without mixed-in gain.

Do not pull aside a mechanism that works because it is not being pulled.`},judgment:`Without Falsehood. Original success; favorable through constancy. If the action is not right, there will be misfortune.`,image:`Under heaven thunder moves: without falsehood. Thus the ancient kings aligned with the seasons and nourished all things.`}}},"../../data/hexagrams/26.json":{number:26,chinese:`大畜`,pinyin:`dà xù`,lower:`qian`,upper:`gen`,locales:{uk:{name:`Велике накопичення`,composition:`Небо всередині гори.`,reading:{scene:`Великий рух замкнений у твердій оболонці.

Запас ще не став виходом.`,dynamics:`Тут ніщо не розсипане. Воно зібране, як зерно в коморі або кінь, якого тримають за вузду.

Межа має зберігати, а не душити. Гора повинна бути посудиною, не кам’яною кришкою.

Небезпека в тому, щоб пишатися повною коморою і нічого не випускати в справу. Так запас старіє без користі.

Ця гексаграма показує підготовлену вагу. Вона ще всередині, але вже здатна витримати великий рух.`,vector:`Тримати запас у міцній посудині.

Не випускати рано, але й не замикати комору заради самої комори.`},judgment:`Велике накопичення. Сприятлива стійкість. Не їсти вдома — щастя. Сприятливо перейти велику воду.`,image:`Небо всередині гори: велике накопичення. Так шляхетна людина знає давні слова і давні вчинки, щоб зміцнити себе.`},en:{name:`Great Accumulation`,composition:`Heaven inside mountain.`,reading:{scene:`A great movement is enclosed in a firm shell.

The reserve has not yet become release.`,dynamics:`Nothing is scattered here. It is gathered like grain in a storehouse, or a horse held by the reins.

The boundary must preserve, not suffocate. The mountain should be a vessel, not a stone lid.

The danger is taking pride in a full storehouse and letting nothing enter the work. Then the reserve grows old without use.

This hexagram shows prepared weight. It is still inside, but already able to bear a large movement.`,vector:`Keep the reserve in a strong vessel.

Do not release too early, but do not lock the storehouse for its own sake.`},judgment:`Great Accumulation. Favorable through constancy. Not eating at home brings good fortune. It is favorable to cross the great water.`,image:`Heaven within the mountain: great accumulation. Thus the noble person knows ancient words and ancient deeds in order to strengthen themself.`}}},"../../data/hexagrams/27.json":{number:27,chinese:`頤`,pinyin:`yí`,lower:`zhen`,upper:`gen`,locales:{uk:{name:`Живлення`,composition:`Грім під горою.`,reading:{scene:`Рот відкривається і закривається, приймаючи те, що підтримує життя.

Живлення має форму вибору.`,dynamics:`Тут важливо, що входить усередину: їжа, слова, впливи, звички. Те, чим живлять форму, поступово стає її будовою.

Потреба не є випадковою. Вона показує, де тіло або справа залежать від підживлення і чим тримають себе.

Небезпека в тому, щоб годувати порожнечу або говорити більше, ніж може витримати зміст. Надлишок теж виснажує.

Ця гексаграма показує обмін через рот. Приймати і вимовляти треба з мірою.`,vector:`Дивитися, чим саме підтримується життя справи.

Не давати входу тому, що потім стане формою.`},judgment:`Живлення. Сприятлива стійкість. Дивись на живлення і на те, чим людина наповнює свій рот.`,image:`Біля підніжжя гори є грім: живлення. Так шляхетна людина обережна в словах і помірна в їжі та питті.`},en:{name:`Nourishment`,composition:`Thunder under mountain.`,reading:{scene:`The mouth opens and closes, receiving what sustains life.

Nourishment takes the form of choice.`,dynamics:`What enters matters here: food, words, influences, habits. What feeds the form gradually becomes its structure.

Need is not accidental. It shows where a body or matter depends on nourishment and by what it keeps itself standing.

The danger is feeding emptiness or speaking more than the content can bear. Excess also exhausts.

This hexagram shows exchange through the mouth. Receiving and speaking both require measure.`,vector:`Look at what exactly sustains the life of the matter.

Do not give entry to what will later become form.`},judgment:`Nourishment. Favorable through constancy. Look at the nourishment and at what a person fills their mouth with.`,image:`At the foot of the mountain there is thunder: nourishment. Thus the noble person is careful in speech and moderate in food and drink.`}}},"../../data/hexagrams/28.json":{number:28,chinese:`大過`,pinyin:`dà guò`,lower:`xun`,upper:`dui`,locales:{uk:{name:`Велика перевага`,composition:`Вітер під озером.`,reading:{scene:`Балка прогинається під надмірною вагою.

Форма ще тримається, але межа вже перевищена.`,dynamics:`Тут велике навантаження лягло на конструкцію, яка не розрахована на таку вагу. Звичний порядок більше не врівноважує ситуацію.

Потрібен не малий ремонт, а перехід через край. Те, що стало надмірним, не можна просто прикрасити або трохи посунути.

Небезпека в тому, щоб чекати, поки прогин сам випрямиться. Надлишок має власну механіку падіння.

Ця гексаграма показує критичну вагу. Рух можливий, але тільки як свідомий перехід, не як продовження старої норми.`,vector:`Визнати перевантаження.

Не вимагати від слабкої балки, щоб вона й далі тримала велике.`},judgment:`Велика перевага. Балка прогинається. Сприятливо мати куди йти. Успіх.`,image:`Озеро підіймається над деревом: велика перевага. Так шляхетна людина стоїть самотньо без страху і відходить від світу без смутку.`},en:{name:`Great Exceeding`,composition:`Wind under lake.`,reading:{scene:`The ridgepole bends under excessive weight.

The form still holds, but the limit has already been exceeded.`,dynamics:`A large load has settled on a structure not made for such weight. The usual order no longer balances the situation.

What is needed is not a small repair, but a crossing of the edge. What has become excessive cannot be decorated or shifted a little.

The danger is waiting for the bend to straighten by itself. Excess has its own mechanics of collapse.

This hexagram shows critical weight. Movement is possible, but only as a deliberate crossing, not as continuation of the old norm.`,vector:`Acknowledge the overload.

Do not ask a weak beam to keep carrying the great.`},judgment:`Great Exceeding. The ridgepole bends. It is favorable to have somewhere to go. Success.`,image:`The lake rises above the tree: great exceeding. Thus the noble person stands alone without fear and withdraws from the world without grief.`}}},"../../data/hexagrams/29.json":{number:29,chinese:`坎`,pinyin:`kǎn`,lower:`kan`,upper:`kan`,locales:{uk:{name:`Повторна вода`,composition:`Вода над водою.`,reading:{scene:`Одна глибина повторює іншу.

Небезпека не одноразова, вона має власний ритм.`,dynamics:`Тут ситуація входить у повторювану пастку: канал вузький, дно невидиме, кожен рух потребує тверезої точності.

Вода не перемагає прірву силою. Вона проходить через неї, тримаючи напрям і не втрачаючи власної природи.

Паніка робить глибину ширшою. Самовпевненість робить її непомітною до першого падіння.

Ця гексаграма показує небезпеку як середовище. Тут важить не героїзм, а здатність не втратити лінію проходу.`,vector:`Тримати курс усередині складного каналу.

Не прикрашати небезпеку, але й не давати їй забрати весь рух.`},judgment:`Повторна вода. Якщо є щирість, серцевина має проходження; дія має цінність.`,image:`Вода тече безперервно і доходить до мети: повторна небезпека. Так шляхетна людина тримає сталість у діях і навчає повторенням.`},en:{name:`Repeated Water`,composition:`Water over water.`,reading:{scene:`One depth repeats another.

Danger is not a single event; it has its own rhythm.`,dynamics:`The situation enters a repeating pit: the channel is narrow, the bottom unseen, every movement requiring sober precision.

Water does not defeat the abyss by force. It passes through it, holding direction and not losing its own nature.

Panic makes the depth wider. Self-assurance makes it invisible until the first fall.

This hexagram shows danger as an environment. What matters is not heroism, but the ability not to lose the line of passage.`,vector:`Hold course inside a difficult channel.

Do not decorate the danger, but do not let it take all movement.`},judgment:`Repeated Water. If there is sincerity, the center has passage; action has value.`,image:`Water flows on without ceasing and reaches its aim: repeated danger. Thus the noble person keeps constancy in action and teaches through repetition.`}}},"../../data/hexagrams/30.json":{number:30,chinese:`離`,pinyin:`lí`,lower:`li`,upper:`li`,locales:{uk:{name:`Зчеплення`,composition:`Вогонь над вогнем.`,reading:{scene:`Світло тримається за те, до чого прикріплене.

Ясність потребує опори.`,dynamics:`Тут видимість посилюється. Речі стають окресленими, але саме світло не існує без пального.

Залежність не є слабкістю, якщо видно, на чому вона тримається. Вогонь має знати, що його живить і що він спалює.

Небезпека в блиску без основи. Тоді ясність стає паланням, яке швидко з'їдає власний матеріал.

Ця гексаграма показує світло, прикріплене до форми. Воно може вести, якщо не забуває про свою залежність.`,vector:`Тримати ясність на реальній опорі.

Не палити більше, ніж потрібно для світла.`},judgment:`Зчеплення. Сприятлива стійкість. Успіх. Догляд за коровою приносить щастя.`,image:`Світло постає двічі: зчеплення. Так велика людина продовжує світло і освітлює чотири сторони.`},en:{name:`The Clinging`,composition:`Fire over fire.`,reading:{scene:`Light holds to what it is attached to.

Clarity needs support.`,dynamics:`Visibility intensifies here. Things become outlined, but light itself does not exist without fuel.

Dependence is not weakness when its support is visible. Fire must know what feeds it and what it burns.

The danger is brilliance without a base. Then clarity becomes a blaze that quickly consumes its own material.

This hexagram shows light attached to form. It can guide if it does not forget its dependence.`,vector:`Keep clarity on a real support.

Do not burn more than the light requires.`},judgment:`The Clinging. Favorable through constancy. Success. Care of the cow brings good fortune.`,image:`Light appears twice: the clinging. Thus the great person continues the light and illuminates the four quarters.`}}},"../../data/hexagrams/31.json":{number:31,chinese:`咸`,pinyin:`xián`,lower:`gen`,upper:`dui`,locales:{uk:{name:`Вплив`,composition:`Гора під озером.`,reading:{scene:`Нерухоме приймає легкий дотик згори.

Відгук проходить без наказу.`,dynamics:`Тут одна річ торкається іншої так, що та не ламається і не відступає, а відповідає власною вагою.

Дотик має силу, поки він точний. Груба рука одразу робить із відгуку тиск.

Небезпека в тому, щоб прийняти перше зворушення за міцний союз. Вода здригнулась, але берег ще не змінився.

Ця гексаграма показує початок взаємного відгуку. Він справжній, але ще тонкий.`,vector:`Дати дотику сказати більше, ніж натиск.

Не будувати остаточну форму з першої хвилі на воді.`},judgment:`Вплив. Успіх. Сприятлива стійкість. Взяти дівчину за дружину — щастя.`,image:`На горі є озеро: вплив. Так шляхетна людина приймає людей через порожнє місце в собі.`},en:{name:`Influence`,composition:`Mountain under lake.`,reading:{scene:`The still receives a light touch from above.

Response passes without command.`,dynamics:`One thing touches another here so that it does not break or withdraw, but answers with its own weight.

Touch has force while it is exact. A rough hand at once turns response into pressure.

The danger is taking the first stirring for a firm union. The water has trembled, but the bank has not yet changed.

This hexagram shows the beginning of mutual response. It is real, but still thin.`,vector:`Let touch say more than pressure.

Do not build a final form from the first wave on the water.`},judgment:`Influence. Success. Favorable through constancy. Taking a maiden as wife brings good fortune.`,image:`On the mountain there is a lake: influence. Thus the noble person receives people through an empty place within.`}}},"../../data/hexagrams/32.json":{number:32,chinese:`恆`,pinyin:`héng`,lower:`xun`,upper:`zhen`,locales:{uk:{name:`Тривала стабільність`,composition:`Вітер під громом.`,reading:{scene:`Рух і проникнення тримають один одного в тривалому ритмі.

Стан живе через сталість.`,dynamics:`Тут важлива не яскрава подія, а здатність не розривати лінію. Постійність створюється повторенням правильного руху.

Тривалість не означає нерухомість. Вона потребує малого оновлення, щоб форма не стала мертвою звичкою.

Небезпека в механічному продовженні. Те, що триває лише за інерцією, поступово втрачає основу.

Ця гексаграма показує стійкий хід. Він тримається там, де напрям не скасовується кожним настроєм.`,vector:`Продовжувати те, що має вісь.

Відрізняти сталість від повторення без життя.`},judgment:`Тривалість. Успіх. Без помилки. Сприятлива стійкість. Сприятливо мати куди йти.`,image:`Грім і вітер: тривалість. Так шляхетна людина стоїть твердо і не змінює напряму.`},en:{name:`Enduring Stability`,composition:`Wind under thunder.`,reading:{scene:`Movement and penetration hold each other in a lasting rhythm.

The state lives through constancy.`,dynamics:`What matters here is not a bright event, but the ability not to break the line. Constancy is made by repeating the right movement.

Duration does not mean immobility. It needs small renewal so the form does not become dead habit.

The danger is mechanical continuation. What lasts only by inertia gradually loses its base.

This hexagram shows a steady course. It holds where direction is not canceled by every mood.`,vector:`Continue what has an axis.

Distinguish constancy from repetition without life.`},judgment:`Duration. Success. No fault. Favorable through constancy. It is favorable to have somewhere to go.`,image:`Thunder and wind: duration. Thus the noble person stands firm and does not change direction.`}}},"../../data/hexagrams/33.json":{number:33,chinese:`遁`,pinyin:`dùn`,lower:`gen`,upper:`qian`,locales:{uk:{name:`Втеча`,composition:`Гора під небом.`,reading:{scene:`Високе відходить, не вступаючи в зайвий бій.

Відступ зберігає форму.`,dynamics:`Тут сила не зникає, а змінює відстань. Пряме зіткнення зараз віддало б більше, ніж могло б здобути.

Відхід потребує точності. Це не втеча від справи, а виведення себе з поля, де перевага вже не на твоєму боці.

Небезпека в гордості, яка лишається на місці тільки заради вигляду. Така стійкість швидко стає здобиччю.

Ця гексаграма показує мудрий відступ як дію. Простір між сторонами стає захистом.`,vector:`Відійти до того, що можна втримати.

Не плутати втрату позиції з втратою суті.`},judgment:`Відступ. Успіх. У малому сприятлива стійкість.`,image:`Під небом є гора: відступ. Так шляхетна людина тримає мале на відстані без гніву.`},en:{name:`Retreat`,composition:`Mountain under heaven.`,reading:{scene:`The high withdraws without entering a needless fight.

Retreat preserves the form.`,dynamics:`Force does not vanish here; it changes distance. Direct collision would now give away more than it could gain.

Withdrawal requires precision. It is not escape from the matter, but removal from a field where advantage is no longer yours.

The danger is pride that stays in place for appearance alone. Such firmness quickly becomes prey.

This hexagram shows wise retreat as action. The space between sides becomes protection.`,vector:`Withdraw to what can be held.

Do not confuse loss of position with loss of substance.`},judgment:`Retreat. Success. In the small, constancy is favorable.`,image:`Under heaven there is a mountain: retreat. Thus the noble person keeps the small at a distance without anger.`}}},"../../data/hexagrams/34.json":{number:34,chinese:`大壯`,pinyin:`dà zhuàng`,lower:`qian`,upper:`zhen`,locales:{uk:{name:`Велика сила`,composition:`Небо під громом.`,reading:{scene:`Великий звук піднімається різко і широко.

Міць уже помітна, але ще потребує межі.`,dynamics:`Тут можливий великий крок. Грім уже не прихований і легко змінює розклад довкола.

Але розмах має право тільки там, де він стоїть на належному місці. Інакше удар повертається в основу.

Небезпека в надмірі. Коли можливо багато, особливо легко перейти межу лише тому, що вона не позначена.

Ця гексаграма показує міць у момент підйому. Її якість визначає не гучність, а те, чи не порушена лінія.`,vector:`Діяти там, де розмах має право.

Не переходити межу тільки тому, що рука може дотягнутися.`},judgment:`Велика сила. Сприятлива стійкість.`,image:`Грім у небі: велика сила. Так шляхетна людина не ступає туди, де немає належного порядку.`},en:{name:`Great Power`,composition:`Heaven under thunder.`,reading:{scene:`A great sound rises sharply and widely.

Might is already visible, but still needs a boundary.`,dynamics:`A large step is possible here. Thunder is no longer hidden and easily changes the arrangement around it.

But scope has right only where it stands in its proper place. Otherwise the strike returns into the base.

The danger is excess. When much is possible, it is especially easy to cross the line simply because it is not marked.

This hexagram shows might at the moment of ascent. Its quality is determined not by loudness, but by whether the line remains unbroken.`,vector:`Act where scope has right.

Do not cross the boundary only because the hand can reach.`},judgment:`Great Power. Favorable through constancy.`,image:`Thunder in heaven: great power. Thus the noble person does not step where there is no proper order.`}}},"../../data/hexagrams/35.json":{number:35,chinese:`晉`,pinyin:`jìn`,lower:`kun`,upper:`li`,locales:{uk:{name:`Просування`,composition:`Сонце виходить над землею.`,reading:{scene:`Те, що було нижче краю, стає видимим.

Просування входить у день.`,dynamics:`Тут справа підіймається з прихованого місця і потрапляє в поле погляду. Її можуть прийняти, назвати, поставити ближче до двору.

Підйом потребує ясного обличчя. Те, що виходить назовні, має показати не блиск, а придатну форму.

Небезпека в гонитві за прийомом. Коли важливо тільки бути побаченим, день швидко стає сценою.

Ця гексаграма показує схід, а не тріумф. Рух добрий, якщо не відривається від землі, з якої вийшов.`,vector:`Виходити на видиме місце з тим, що справді готове.

Не міняти справу на сам факт прийому.`},judgment:`Просування. Могутнього князя вшановують кіньми у великій кількості; за день його приймають тричі.`,image:`Світло виходить над землею: просування. Так шляхетна людина сама робить свою ясність світлою.`},en:{name:`Progress`,composition:`The sun comes out over earth.`,reading:{scene:`What was below the edge becomes visible.

Progress enters the day.`,dynamics:`The matter rises from a hidden place and enters the field of sight. It can be received, named, brought nearer to the court.

Ascent needs a clear face. What comes outward must show not shine, but a usable form.

The danger is chasing reception. When only being seen matters, the day quickly becomes a stage.

This hexagram shows sunrise, not triumph. The movement is good if it does not leave the earth from which it came.`,vector:`Come into visible place with what is actually ready.

Do not trade the matter for the mere fact of being received.`},judgment:`Progress. The powerful prince is honored with many horses; in one day he is received three times.`,image:`Light comes out over the earth: progress. Thus the noble person makes their own clarity bright.`}}},"../../data/hexagrams/36.json":{number:36,chinese:`明夷`,pinyin:`míng yí`,lower:`li`,upper:`kun`,locales:{uk:{name:`Тінь вогню`,composition:`Вогонь захований під землею.`,reading:{scene:`Світло є, але його не можна виставити назовні.

Час вимагає прикриття.`,dynamics:`Тут ясність опинилася в середовищі, яке її пошкоджує. Відкритий прояв тільки збільшив би небезпеку.

Потрібно зберігати внутрішнє світло без показу. Не все правдиве має бути сказане вголос саме зараз.

Небезпека в двох крайностях: згаснути від тиску або викричати світло в місці, де його одразу затопчуть.

Ця гексаграма показує приховану ясність. Вона живе завдяки стриманості, а не завдяки видимій перемозі.`,vector:`Тримати світло під захистом.

Не віддавати ясність середовищу, яке зараз здатне тільки її поранити.`},judgment:`Затемнення світла. У труднощах сприятлива стійкість.`,image:`Світло входить у землю: затемнення світла. Так шляхетна людина перебуває з багатьма, приховуючи світло і залишаючись ясною.`},en:{name:`Shadow of Fire`,composition:`Fire hidden under earth.`,reading:{scene:`There is light, but it cannot be shown outwardly.

The time requires cover.`,dynamics:`Clarity has entered an environment that damages it. Open display would only increase the danger.

The inner light must be kept without exhibition. Not everything true should be said aloud right now.

The danger lies in two extremes: going out under pressure, or shouting the light in a place where it will be trampled.

This hexagram shows hidden clarity. It lives through restraint, not through visible victory.`,vector:`Keep the light under protection.

Do not give clarity to an environment that can only wound it now.`},judgment:`Darkening of the Light. In hardship, constancy is favorable.`,image:`Light enters the earth: darkening of the light. Thus the noble person stays among the many, concealing the light and remaining clear.`}}},"../../data/hexagrams/37.json":{number:37,chinese:`家人`,pinyin:`jiā rén`,lower:`li`,upper:`xun`,locales:{uk:{name:`Родина`,composition:`Вогонь під вітром.`,reading:{scene:`Тепло виходить із дому й розходиться назовні.

Дім тримається тим, що кожен знає своє місце.`,dynamics:`Тут важить те, як у домі ходить слово: хто говорить, хто відповідає, де двері, де вогнище, де місце за столом.

Домашній лад не створюється загальними почуттями. Він тримається повторюваними діями і ясними місцями.

Небезпека в прихованому безладі, який прикривають назвою сім’ї або команди. Тоді тепло стає димом.

Ця гексаграма показує ближнє коло. Якщо біля вогнища плутаються місця, вітер винесе назовні саме цю плутанину.`,vector:`Впорядкувати ближнє.

Не вимагати ясності від дому, де слово не знає свого місця.`},judgment:`Родина. Сприятлива стійкість жінки.`,image:`Вітер виходить із вогню: родина. Так шляхетна людина має зміст у словах і сталість у діях.`},en:{name:`The Family`,composition:`Fire under wind.`,reading:{scene:`Warmth leaves the house and moves outward.

The house is held by each one knowing their place.`,dynamics:`What matters here is how speech moves through the house: who speaks, who answers, where the door is, where the hearth is, where the seat at the table stands.

Domestic order is not made by general feeling. It is held by repeated actions and clear places.

The danger is hidden disorder covered by the name of family or team. Then warmth becomes smoke.

This hexagram shows the near circle. If places are confused by the hearth, the wind will carry that confusion outward.`,vector:`Put the near field in order.

Do not demand clarity from a house where speech does not know its place.`},judgment:`The Family. The constancy of the woman is favorable.`,image:`Wind comes forth from fire: the family. Thus the noble person has substance in words and constancy in actions.`}}},"../../data/hexagrams/38.json":{number:38,chinese:`睽`,pinyin:`kuí`,lower:`dui`,upper:`li`,locales:{uk:{name:`Суперечність`,composition:`Озеро під вогнем.`,reading:{scene:`Дві ясності дивляться в різні боки.

Розходження не зникає від близькості.`,dynamics:`Тут елементи поруч, але їхні напрямки не збігаються. Вони можуть бачити один одного саме через відмінність.

Велика справа зараз важко складається. Малі точні дії можливі, бо не потребують повного злиття позицій.

Небезпека в тому, щоб зробити з різниці ворога або, навпаки, замазати її заради зручного вигляду.

Ця гексаграма показує розходження як реальний стан. Його можна враховувати, але не варто називати єдністю.`,vector:`Працювати з малим і конкретним.

Не вимагати спільної форми там, де напрямки справді різні.`},judgment:`Протилежність. У малих справах щастя.`,image:`Вогонь над озером: протилежність. Так шляхетна людина зберігає відмінність у спільному.`},en:{name:`Contradiction`,composition:`Lake under fire.`,reading:{scene:`Two clarities look in different directions.

Difference does not disappear through closeness.`,dynamics:`The elements are near, but their directions do not match. They can see one another precisely through difference.

A large matter is hard to compose now. Small exact actions are possible because they do not require full fusion of positions.

The danger is making difference into an enemy, or smearing it over for the sake of a convenient appearance.

This hexagram shows divergence as a real state. It can be accounted for, but should not be called unity.`,vector:`Work with the small and concrete.

Do not demand shared form where directions are truly different.`},judgment:`Opposition. In small matters, good fortune.`,image:`Fire above the lake: opposition. Thus the noble person preserves difference within what is shared.`}}},"../../data/hexagrams/39.json":{number:39,chinese:`蹇`,pinyin:`jiǎn`,lower:`gen`,upper:`kan`,locales:{uk:{name:`Перешкода`,composition:`Гора стоїть перед водою.`,reading:{scene:`Шлях упирається в перешкоду і не проходить прямо.

Рух потребує обходу.`,dynamics:`Тут перешкода не уявна. Вона має форму, місце і здатність зупиняти прямий хід.

Сила лоба не допомагає там, де дорога перекрита самою місцевістю. Потрібен інший кут, інший союз або повернення до опори.

Небезпека в застряганні біля стіни. Повторення одного й того ж удару не робить шлях відкритим.

Ця гексаграма показує утруднення як частину карти. Не кожна затримка є поразкою; іноді вона просто показує, де дороги немає.`,vector:`Шукати прохід збоку.

Не витрачати силу на напрям, який уже показав свою закритість.`},judgment:`Перешкода. Сприятливий захід, несприятливий схід. Сприятливо побачити велику людину. Стійкість приносить щастя.`,image:`На горі є вода: перешкода. Так шляхетна людина повертається до себе і вдосконалює силу.`},en:{name:`Obstacle`,composition:`Mountain stands before water.`,reading:{scene:`The road meets an obstruction and does not pass directly.

Movement needs a detour.`,dynamics:`The obstruction is not imagined. It has form, location, and the ability to stop a direct course.

Head-on force does not help where the road is blocked by the terrain itself. Another angle, another alliance, or a return to support is needed.

The danger is getting stuck at the wall. Repeating the same strike does not make the way open.

This hexagram shows difficulty as part of the map. Not every delay is defeat; sometimes it simply shows where there is no road.`,vector:`Look for a passage from the side.

Do not spend force on a direction that has already shown its closure.`},judgment:`Obstruction. The southwest is favorable, the northeast unfavorable. It is favorable to see the great person. Constancy brings good fortune.`,image:`On the mountain there is water: obstruction. Thus the noble person turns back toward themself and refines force.`}}},"../../data/hexagrams/40.json":{number:40,chinese:`解`,pinyin:`xiě`,lower:`kan`,upper:`zhen`,locales:{uk:{name:`Звільнення`,composition:`Вода під громом.`,reading:{scene:`Напруга розряджається, вузол послаблюється.

Те, що було стиснуте, починає розходитися.`,dynamics:`Тут настає звільнення після затримки або страху. Рух повертається, бо тиск уже не тримає все в одному вузлі.

Звільнення потребує швидкого простого кроку. Не варто тягти за собою все, що належало стану скутості.

Небезпека в помсті до минулого вузла або в бажанні одразу охопити все. Обидва рухи знову створюють плутанину.

Ця гексаграма показує момент розв'язання. Краще відпустити зайве і повернутися до прямого ходу.`,vector:`Розпустити вузол і не носити його форму далі.

Після звільнення робити найпростіший потрібний рух.`},judgment:`Звільнення. Сприятливий захід. Якщо більше нема куди йти, повернення приносить щастя. Якщо ще є куди йти, ранній рух приносить щастя.`,image:`Грім і дощ приходять: звільнення. Так шляхетна людина прощає помилки і відпускає провину.`},en:{name:`Release`,composition:`Water under thunder.`,reading:{scene:`Tension discharges; the knot loosens.

What was compressed begins to separate.`,dynamics:`Release arrives after delay or fear. Movement returns because pressure no longer holds everything in one knot.

Release needs a quick simple step. It is not worth carrying along everything that belonged to the constricted state.

The danger is revenge against the old knot, or the wish to seize everything at once. Both movements create confusion again.

This hexagram shows a moment of untying. It is better to let go of the excess and return to a direct course.`,vector:`Loosen the knot and do not carry its shape forward.

After release, make the simplest necessary movement.`},judgment:`Release. The southwest is favorable. If there is nowhere more to go, return brings good fortune. If there is still somewhere to go, early movement brings good fortune.`,image:`Thunder and rain arrive: release. Thus the noble person forgives mistakes and lets fault go.`}}},"../../data/hexagrams/41.json":{number:41,chinese:`損`,pinyin:`sǔn`,lower:`dui`,upper:`gen`,locales:{uk:{name:`Скорочення`,composition:`Озеро під горою.`,reading:{scene:`Верх бере на себе межу, низ віддає частину надлишку.

Зменшення створює простір.`,dynamics:`Тут потрібно прибрати частину, щоб ціле не розтікалося. Втрата може бути роботою форми, а не покаранням.

Зменшення має бути точним. Якщо забрати живе, залишиться суха оболонка; якщо не забрати зайве, справа втратить вагу.

Небезпека в жертві заради самої жертви. Порожнє скорочення лише робить нестачу красивішою.

Ця гексаграма показує економію сили. Менше стає доречним тоді, коли воно повертає речам контур.`,vector:`Відняти зайве, не чіпаючи ядра.

Не називати кожну втрату очищенням.`},judgment:`Зменшення. Якщо є щирість, первісне щастя. Без помилки. Можлива стійкість. Сприятливо мати куди йти.`,image:`Під горою є озеро: зменшення. Так шляхетна людина стримує гнів і обмежує бажання.`},en:{name:`Reduction`,composition:`Lake under mountain.`,reading:{scene:`The upper part takes on boundary; the lower gives up part of its excess.

Decrease creates space.`,dynamics:`Something must be removed so the whole does not spread without shape. Loss can be work of form, not punishment.

Decrease must be exact. If the living part is taken, a dry shell remains; if the excess is not taken, the matter loses weight.

The danger is sacrifice for its own sake. Empty reduction only makes lack look better.

This hexagram shows economy of force. Less becomes fitting when it returns contour to things.`,vector:`Subtract the excess without touching the core.

Do not call every loss purification.`},judgment:`Decrease. If there is sincerity, original good fortune. No fault. Constancy is possible. It is favorable to have somewhere to go.`,image:`Under the mountain there is a lake: decrease. Thus the noble person restrains anger and limits desire.`}}},"../../data/hexagrams/42.json":{number:42,chinese:`益`,pinyin:`yì`,lower:`zhen`,upper:`xun`,locales:{uk:{name:`Збагачення`,composition:`Грім під вітром.`,reading:{scene:`Рух підсилюється проникненням і розходиться далі.

Додавання проходить через дію.`,dynamics:`Тут зростання приходить не як запас у коморі, а як пожвавлення руху. Одне підхоплює інше і збільшує можливість.

Збагачення має сенс, коли воно йде туди, де може працювати. Те, що лише накопичують, швидко стає тягарем.

Небезпека в жадібному додаванні. Більше не завжди означає живіше; іноді воно тільки розмиває форму.

Ця гексаграма показує приріст, який треба пустити в обіг. Справжня користь видно в русі, не в числі.`,vector:`Додати там, де це збільшує живу дію.

Не збирати надлишок заради самого надлишку.`},judgment:`Збільшення. Сприятливо мати куди йти. Сприятливо перейти велику воду.`,image:`Вітер і грім: збільшення. Так шляхетна людина бачить добро і переходить до нього; бачить помилку і виправляє її.`},en:{name:`Enhancement`,composition:`Thunder under wind.`,reading:{scene:`Movement is strengthened by penetration and spreads farther.

Increase passes through action.`,dynamics:`Growth comes here not as a reserve in storage, but as enlivened movement. One thing catches another and increases possibility.

Increase has meaning when it goes where it can work. What is only accumulated quickly becomes weight.

The danger is greedy addition. More does not always mean more alive; sometimes it only blurs the form.

This hexagram shows increase that should enter circulation. Real benefit is visible in movement, not in number.`,vector:`Add where it increases living action.

Do not gather surplus for the sake of surplus.`},judgment:`Increase. It is favorable to have somewhere to go. It is favorable to cross the great water.`,image:`Wind and thunder: increase. Thus the noble person sees good and moves toward it; sees error and corrects it.`}}},"../../data/hexagrams/43.json":{number:43,chinese:`夬`,pinyin:`guài`,lower:`qian`,upper:`dui`,locales:{uk:{name:`Прорив`,composition:`Озеро під небом.`,reading:{scene:`Вода піднялася високо і має бути проголошена.

Напруження доходить до відкритого рішення.`,dynamics:`Тут приховане більше не може лишатися прихованим. Рішення потребує ясного слова і виходу назовні.

Прорив не означає грубої атаки. Його сила в точному оголошенні межі і в тому, що більше не підтримують хибну форму.

Небезпека в люті переможця. Якщо прорив стає помстою, він створює нову кривизну.

Ця гексаграма показує момент рішучого відділення. М'яке замовчування тут уже не тримає ладу.`,vector:`Сказати межу відкрито.

Не робити з прориву зайвого руйнування.`},judgment:`Прорив. Треба проголосити при дворі правителя. Правдивий виклик небезпечний. Не братися за зброю. Сприятливо мати куди йти.`,image:`Озеро підіймається до неба: прорив. Так шляхетна людина роздає багатство вниз і не тримається власної сили.`},en:{name:`Breakthrough`,composition:`Lake under heaven.`,reading:{scene:`Water has risen high and must be declared.

Tension reaches an open decision.`,dynamics:`What is hidden can no longer remain hidden. The decision needs a clear word and a way out into the open.

Breakthrough does not mean crude attack. Its force lies in naming the boundary exactly and no longer supporting the false form.

The danger is the fury of the victor. If breakthrough becomes revenge, it creates a new distortion.

This hexagram shows a moment of decisive separation. Soft silence no longer maintains order here.`,vector:`State the boundary openly.

Do not turn breakthrough into needless destruction.`},judgment:`Breakthrough. It must be declared at the ruler’s court. A truthful call is dangerous. Do not take up arms. It is favorable to have somewhere to go.`,image:`The lake rises to heaven: breakthrough. Thus the noble person distributes wealth downward and does not cling to personal force.`}}},"../../data/hexagrams/44.json":{number:44,chinese:`姤`,pinyin:`gòu`,lower:`xun`,upper:`qian`,locales:{uk:{name:`Зустріч`,composition:`Вітер під небом.`,reading:{scene:`Мале входить раптово і торкається великого.

Зустріч має силу, але не має кореня.`,dynamics:`Тут щось з'являється несподівано і швидко набирає впливу. Воно приваблює саме тим, що не було вписане в план.

Зустріч не варто одразу перетворювати на союз. Раптовий контакт ще не показує, що може витримати тривалість.

Небезпека в зачаруванні. Мале, впущене без межі, здатне змінити весь порядок сильніше, ніж здається.

Ця гексаграма показує контакт з тим, що не можна просто привласнити. Важлива межа входу.`,vector:`Помітити силу раптової появи.

Не давати випадковому гостю право господаря.`},judgment:`Зустріч. Жінка сильна. Не брати таку жінку за дружину.`,image:`Під небом є вітер: зустріч. Так володар оголошує накази в усі сторони.`},en:{name:`Coming to Meet`,composition:`Wind under heaven.`,reading:{scene:`The small enters suddenly and touches the great.

The encounter has force, but no root.`,dynamics:`Something appears unexpectedly and quickly gains influence. It attracts precisely because it was not written into the plan.

The encounter should not be turned into alliance at once. Sudden contact has not yet shown what can endure.

The danger is fascination. The small, admitted without boundary, can alter the whole order more than it seems.

This hexagram shows contact with what cannot simply be possessed. The boundary of entry matters.`,vector:`Notice the force of sudden appearance.

Do not give the accidental guest the right of the host.`},judgment:`Coming to Meet. The woman is strong. Do not take such a woman as wife.`,image:`Under heaven there is wind: coming to meet. Thus the ruler proclaims commands to the four directions.`}}},"../../data/hexagrams/45.json":{number:45,chinese:`萃`,pinyin:`cuì`,lower:`kun`,upper:`dui`,locales:{uk:{name:`Згуртування`,composition:`Земля під озером.`,reading:{scene:`Люди, сили або речі сходяться в одне місце.

Зібрання потребує центру.`,dynamics:`Тут розрізнене прагне стати збором. Сам факт присутності багатьох ще не створює ладу.

Потрібна видима точка, навколо якої можна розмістити сили. Без неї зібрання стає скупченням.

Небезпека в натовпі, що плутає кількість із підставою. Багато голосів не обов'язково дають напрям.

Ця гексаграма показує концентрацію. Вона може бути сильною, якщо має ритуал, межу і відповідального носія центру.`,vector:`Зібрати навколо справжнього центру.

Не вважати скупчення вже готовою спільною формою.`},judgment:`Згуртування. Успіх. Володар наближається до храму. Сприятливо побачити велику людину.`,image:`Озеро над землею: згуртування. Так шляхетна людина готує зброю і остерігається несподіваного.`},en:{name:`Gathering`,composition:`Earth under lake.`,reading:{scene:`People, forces, or things come together in one place.

Gathering needs a center.`,dynamics:`What is scattered seeks to become an assembly. The mere presence of many does not yet create order.

A visible point is needed around which forces can be placed. Without it, gathering becomes accumulation.

The danger is a crowd confusing number with ground. Many voices do not necessarily give direction.

This hexagram shows concentration. It can be strong if it has rite, boundary, and a responsible bearer of the center.`,vector:`Gather around a real center.

Do not treat accumulation as an already finished common form.`},judgment:`Gathering. Success. The ruler approaches the temple. It is favorable to see the great person.`,image:`Lake above earth: gathering. Thus the noble person prepares weapons and guards against the unexpected.`}}},"../../data/hexagrams/46.json":{number:46,chinese:`升`,pinyin:`shēng`,lower:`xun`,upper:`kun`,locales:{uk:{name:`Піднімання`,composition:`Вітер росте крізь землю.`,reading:{scene:`Мале піднімається поступово, без різкого прориву.

Піднесення відбувається сходинка за сходинкою.`,dynamics:`Тут рух угору можливий через наполегливе проникнення. Він не ламає поверхню одним ударом, а проростає крізь неї.

Потрібна послідовність і правильна опора. Підніматися можна там, де є за що вчепитися і куди ставити наступний крок.

Небезпека в нетерпкому стрибку. Те, що росте поступово, легко пошкодити вимогою негайної висоти.

Ця гексаграма показує зростання через малий сталий рух. Його сила в напрямі, не в швидкості.`,vector:`Підніматися через доступні сходинки.

Не знецінювати повільний рух лише тому, що він не схожий на прорив.`},judgment:`Піднімання. Первісний успіх. Сприятливо побачити велику людину. Не сумувати. Рух на південь приносить щастя.`,image:`У землі росте дерево: піднімання. Так шляхетна людина накопичує мале, щоб досягти високого і великого.`},en:{name:`Pushing Upward`,composition:`Wind grows through earth.`,reading:{scene:`The small rises gradually, without a sharp breakthrough.

Ascent happens step by step.`,dynamics:`Upward movement is possible through persistent penetration. It does not break the surface with one blow, but grows through it.

Sequence and proper support are needed. One can rise where there is something to hold and somewhere to place the next step.

The danger is an impatient leap. What grows gradually is easily damaged by the demand for immediate height.

This hexagram shows growth through small steady movement. Its force is in direction, not speed.`,vector:`Rise through the available steps.

Do not dismiss slow movement because it does not look like breakthrough.`},judgment:`Pushing Upward. Original success. It is favorable to see the great person. Do not grieve. Movement south brings good fortune.`,image:`Within the earth a tree grows: pushing upward. Thus the noble person accumulates the small in order to reach the high and great.`}}},"../../data/hexagrams/47.json":{number:47,chinese:`困`,pinyin:`kùn`,lower:`kan`,upper:`dui`,locales:{uk:{name:`Виснаження`,composition:`Вода під озером.`,reading:{scene:`Ресурс іде вниз, поверхня лишається сухою.

Стиснення оголює межу.`,dynamics:`Тут обставини звужують поле. Те, що раніше підтримувало рух, тепер недоступне або виснажене.

У такому стані гучні слова швидко втрачають вагу. Справжнім лишається те, що тримається без зовнішнього підтвердження.

Небезпека в скарзі, яка забирає останню форму дії. Стиснення не стає меншим від шуму навколо нього.

Ця гексаграма показує обмеження як факт. Воно важке, але також відсікає все несправжнє.`,vector:`Тримати ядро в умовах нестачі.

Не витрачати залишок сили на доказ того, що тісно.`},judgment:`Виснаження. Успіх. Стійкість великої людини приносить щастя. Без помилки. Слова не мають довіри.`,image:`В озері немає води: виснаження. Так шляхетна людина віддає життя, щоб здійснити свою волю.`},en:{name:`Oppression`,composition:`Water under lake.`,reading:{scene:`The resource sinks downward; the surface remains dry.

Confinement exposes the limit.`,dynamics:`Circumstances narrow the field. What once supported movement is now unavailable or exhausted.

In such a state, loud words quickly lose weight. What remains real is what holds without outer confirmation.

The danger is complaint that consumes the last form of action. Confinement does not become smaller because of noise around it.

This hexagram shows limitation as fact. It is heavy, but it also cuts away what is not real.`,vector:`Hold the core under conditions of lack.

Do not spend the remaining force proving that the space is tight.`},judgment:`Oppression. Success. The constancy of the great person brings good fortune. No fault. Words are not trusted.`,image:`There is no water in the lake: oppression. Thus the noble person gives life in order to fulfill the will.`}}},"../../data/hexagrams/48.json":{number:48,chinese:`井`,pinyin:`jǐng`,lower:`xun`,upper:`kan`,locales:{uk:{name:`Колодязь`,composition:`Вітер над водою.`,reading:{scene:`Колодязь стоїть на місці, але до нього повертаються знову.

Джерело не належить одному руху.`,dynamics:`Тут ідеться про спільний ресурс, який має бути доступним і доглянутим. Його цінність не в новизні, а в постійній придатності.

Колодязь може бути повний, але користі не буде, якщо відро зламане або підхід занедбаний.

Небезпека в тому, щоб мати джерело й не вміти ним користуватися. Занедбаний доступ робить багатство недосяжним.

Ця гексаграма показує основу живлення спільного життя. Її не треба переносити; її треба підтримувати.`,vector:`Перевірити не тільки джерело, а й спосіб доступу до нього.

Не міняти місце там, де потрібно відновити колодязь.`},judgment:`Колодязь. Місто можна змінити, але колодязь не змінюється. Ні втрати, ні набутку. До нього приходять і від нього відходять.`,image:`Над водою є дерево: колодязь. Так шляхетна людина підтримує людей і заохочує взаємну працю.`},en:{name:`The Well`,composition:`Wind over water.`,reading:{scene:`The well stays in place, yet people return to it again.

The source does not belong to a single movement.`,dynamics:`This concerns a shared resource that must be accessible and tended. Its value is not novelty, but lasting usefulness.

The well may be full, but there is no use if the bucket is broken or the approach neglected.

The danger is having a source and not being able to use it. Neglected access makes wealth unreachable.

This hexagram shows the basis of nourishment for common life. It need not be moved; it must be maintained.`,vector:`Check not only the source, but the way to reach it.

Do not change the place where the well itself needs repair.`},judgment:`The Well. The town may be changed, but the well is not changed. No loss, no gain. People come to it and go from it.`,image:`Above water there is wood: the well. Thus the noble person supports the people and encourages mutual work.`}}},"../../data/hexagrams/49.json":{number:49,chinese:`革`,pinyin:`gé`,lower:`li`,upper:`dui`,locales:{uk:{name:`Зміна шкіри`,composition:`Вогонь під озером.`,reading:{scene:`Дві сили нагрівають одна одну, і стара шкіра більше не прилягає.

Настає час скидання.`,dynamics:`Тут зміна не є прикрасою старого порядку. Настає момент, коли оболонка має відійти.

Потрібен правильний день. Ранній удар дає бунт без форми; запізнення залишає живе в мертвій шкірі.

Небезпека в захваті самим переворотом. Якщо важливий тільки розрив, нова оболонка швидко стає такою ж порожньою.

Ця гексаграма показує зміну мандата. Старе втрачає право тримати тіло, коли вже не відповідає живому.`,vector:`Скидати шкіру тоді, коли вона справді відслужила.

Не називати кожну втому переворотом.`},judgment:`Зміна шкіри. У свій день буде довіра. Первісний успіх; сприятлива стійкість. Каяття зникає.`,image:`В озері є вогонь: зміна. Так шляхетна людина впорядковує календар і робить часи ясними.`},en:{name:`Revolution`,composition:`Fire under lake.`,reading:{scene:`Two forces heat one another, and the old skin no longer fits.

The time of shedding arrives.`,dynamics:`Change here is not decoration of the old order. A moment arrives when the shell must come away.

The right day is needed. An early strike gives revolt without form; delay leaves the living inside dead skin.

The danger is fascination with overturning itself. If only rupture matters, the new shell quickly becomes just as empty.

This hexagram shows a change of mandate. The old loses the right to hold the body when it no longer matches the living.`,vector:`Shed the skin when it has truly served out.

Do not call every fatigue a revolution.`},judgment:`Revolution. On your own day, there will be trust. Original success; favorable through constancy. Regret disappears.`,image:`In the lake there is fire: revolution. Thus the noble person orders the calendar and makes the seasons clear.`}}},"../../data/hexagrams/50.json":{number:50,chinese:`鼎`,pinyin:`dǐng`,lower:`xun`,upper:`li`,locales:{uk:{name:`Казан`,composition:`Вітер під вогнем.`,reading:{scene:`Казан стоїть на вогні, сире переходить у придатне.

Форма служить перетворенню.`,dynamics:`Тут важлива посудина: без неї вогонь тільки спалює, а матеріал не стає їжею.

Перетворення потребує правильного вмісту, тепла і міри. Надто мало вогню не змінює, надто багато руйнує.

Небезпека в недоглянутій формі. Якщо казан тріснув або перекинутий, навіть добрий матеріал пропадає.

Ця гексаграма показує культурну роботу: зібрати, нагріти, довести до стану, в якому річ може живити інших.`,vector:`Дбати про посудину не менше, ніж про вогонь.

Перетворювати матеріал у форму, придатну для спільного вжитку.`},judgment:`Казан. Первісне щастя. Успіх.`,image:`Над деревом є вогонь: казан. Так шляхетна людина встановлює правильне місце і зміцнює долю.`},en:{name:`The Cauldron`,composition:`Wind under fire.`,reading:{scene:`The vessel stands over flame; the raw turns usable.

Form serves transformation.`,dynamics:`The vessel matters here: without it, fire only burns, and the material does not become food.

Transformation needs the right contents, heat, and measure. Too little fire does not change; too much destroys.

The danger is an untended form. If the vessel is cracked or overturned, even good material is lost.

This hexagram shows cultural work: gather, heat, and bring the matter to a state in which it can nourish others.`,vector:`Care for the vessel as much as for the fire.

Transform material into a form fit for common use.`},judgment:`The Cauldron. Original good fortune. Success.`,image:`Above wood there is fire: the cauldron. Thus the noble person sets the proper place and strengthens destiny.`}}},"../../data/hexagrams/51.json":{number:51,chinese:`震`,pinyin:`zhèn`,lower:`zhen`,upper:`zhen`,locales:{uk:{name:`Раптовий спалах`,composition:`Грім над громом.`,reading:{scene:`Удар повторюється, простір здригається.

Раптовість виводить приховане назовні.`,dynamics:`Тут подія приходить як шок. Вона не питає, чи все готове, і різко перевіряє, що справді тримається.

Перший рух може бути переляком. Але після удару видно, де є центр, а де була лише звичка.

Небезпека в тому, щоб жити самим здриганням. Тоді грім не будить, а розриває увагу на шматки.

Ця гексаграма показує силу несподіваного. Вона ламає сон, але не повинна керувати всім після того, як звук минув.`,vector:`Після удару знайти те, що не впало.

Не перетворювати раптовість на постійний спосіб руху.`},judgment:`Грім. Успіх. Грім приходить — вигук страху; після нього сміх. Грім лякає на сто лі, але жертовну ложку і чашу не гублять.`,image:`Грім повторюється: потрясіння. Так шляхетна людина зі страхом упорядковує себе і перевіряє себе.`},en:{name:`Sudden Awakening`,composition:`Thunder over thunder.`,reading:{scene:`The strike repeats; the space shakes.

Suddenness brings the hidden outward.`,dynamics:`The event arrives as shock. It does not ask whether everything is ready, and sharply tests what truly holds.

The first movement may be fright. But after the strike, it is visible where there is a center and where there was only habit.

The danger is living by the tremor itself. Then thunder does not wake; it tears attention into pieces.

This hexagram shows the force of the unexpected. It breaks sleep, but should not govern everything after the sound has passed.`,vector:`After the strike, find what did not fall.

Do not make suddenness into a permanent way of moving.`},judgment:`Shock. Success. Thunder comes: a cry of fear; afterward, laughter. Thunder terrifies for a hundred li, but the sacrificial spoon and cup are not dropped.`,image:`Thunder repeats: shock. Thus the noble person sets themself in order with fear and examines themself.`}}},"../../data/hexagrams/52.json":{number:52,chinese:`艮`,pinyin:`gèn`,lower:`gen`,upper:`gen`,locales:{uk:{name:`Зупинка`,composition:`Гора над горою.`,reading:{scene:`Рух зупинений у власній межі.

Нерухомість стає формою присутності.`,dynamics:`Тут дія полягає в зупинці. Не кожен імпульс має перейти в рух, не кожна думка має тягнути тіло за собою.

Стійкість можлива, коли кожна частина лишається на своєму місці. Спина нерухома, погляд не женеться за двором.

Небезпека в закам'янінні. Зупинка, яка втратила живу міру, стає блоком, а не опорою.

Ця гексаграма показує межу руху. Вона потрібна, щоб не розсипатися на кожен зовнішній поклик.`,vector:`Зупинити те, що не має йти далі.

Не тримати зупинку довше, ніж вона зберігає міру.`},judgment:`Зупинка. Зупинити спину так, що не відчуваєш тіла. Увійти у двір і не бачити людей. Без помилки.`,image:`Гори стоять разом: зупинка. Так шляхетна людина не виходить думками за межі свого місця.`},en:{name:`Keeping Still`,composition:`Mountain over mountain.`,reading:{scene:`Movement is stopped within its own boundary.

Stillness becomes a form of presence.`,dynamics:`Action here consists in stopping. Not every impulse must become movement; not every thought must pull the body along.

Steadiness is possible when each part remains in its place. The back is still; the gaze does not chase the yard.

The danger is petrification. A stop that has lost living measure becomes a block, not support.

This hexagram shows the boundary of movement. It is needed so one does not scatter toward every outer call.`,vector:`Stop what should not go farther.

Do not hold the stop longer than it keeps measure.`},judgment:`Keeping Still. Keeping the back still so the body is not felt. Entering the courtyard and not seeing the people. No fault.`,image:`Mountains stand together: keeping still. Thus the noble person does not let thoughts go beyond their place.`}}},"../../data/hexagrams/53.json":{number:53,chinese:`漸`,pinyin:`jiàn`,lower:`gen`,upper:`xun`,locales:{uk:{name:`Поступове зростання`,composition:`Гора під вітром.`,reading:{scene:`Дерево повільно росте на схилі.

Форма з'являється через тривалий поступ.`,dynamics:`Тут розвиток не терпить стрибка. Він нагадує ріст, де кожен етап має зайняти своє місце.

Поступовість дає міцність. Те, що входить у форму по черзі, краще витримує час.

Небезпека в бажанні мати плід без кореня. Прискорене дозрівання часто дає лише слабку оболонку.

Ця гексаграма показує природну послідовність. Вона повільна не через слабкість, а через потребу в справжньому закріпленні.`,vector:`Рухатися етапами.

Не виривати ріст із часу, який робить його стійким.`},judgment:`Поступ. Дівчину видають заміж. Щастя. Сприятлива стійкість.`,image:`На горі є дерево: поступ. Так шляхетна людина перебуває в гідності і поліпшує звичаї.`},en:{name:`Gradual Growth`,composition:`Mountain under wind.`,reading:{scene:`A tree grows slowly on the slope.

Form appears through long progression.`,dynamics:`Development here does not tolerate a jump. It resembles growth, where each stage must take its place.

Gradual progress gives firmness. What enters form in sequence is better able to withstand time.

The danger is wanting fruit without root. Accelerated ripening often gives only a weak shell.

This hexagram shows natural sequence. It is slow not from weakness, but from the need for real anchoring.`,vector:`Move by stages.

Do not tear growth out of the time that makes it steady.`},judgment:`Gradual Progress. The maiden is given in marriage. Good fortune. Favorable through constancy.`,image:`On the mountain there is a tree: gradual progress. Thus the noble person dwells in dignity and improves customs.`}}},"../../data/hexagrams/54.json":{number:54,chinese:`歸妹`,pinyin:`guī mèi`,lower:`dui`,upper:`zhen`,locales:{uk:{name:`Молодша наречена`,composition:`Озеро під громом.`,reading:{scene:`Молодша входить у дім не як головна.

Зв'язок є, але місце нерівне.`,dynamics:`Тут ситуація містить приєднання без повної влади над умовами. Людина входить у вже наявний порядок.

Можливість існує, але вона обмежена роллю. Варто бачити, де можна діяти, а де структура вже визначила межу.

Небезпека в претензії на місце, якого ситуація не дає. Тоді зв'язок стає джерелом приниження і плутанини.

Ця гексаграма показує нерівний союз. Він може мати користь, якщо не приховувати його справжню будову.`,vector:`Бачити своє місце в наявній формі.

Не вимагати від нерівного входу прав головного входу.`},judgment:`Молодша наречена. Похід приносить нещастя. Ніщо не сприятливе.`,image:`Грім над озером: молодша наречена. Так шляхетна людина через кінець розпізнає те, що минає.`},en:{name:`The Marrying Maiden`,composition:`Lake under thunder.`,reading:{scene:`The younger one enters the house, but not as the principal one.

There is connection, but the place is unequal.`,dynamics:`The situation contains joining without full command of the terms. One enters an order already present.

Possibility exists, but it is limited by role. It is worth seeing where action is possible and where the structure has already set the line.

The danger is claiming a place the situation does not give. Then connection becomes a source of humiliation and confusion.

This hexagram shows an unequal union. It may have use if its real structure is not concealed.`,vector:`See your place in the existing form.

Do not demand from an unequal entry the rights of the main entrance.`},judgment:`The Marrying Maiden. Going forward brings misfortune. Nothing is favorable.`,image:`Thunder over lake: the marrying maiden. Thus the noble person recognizes what passes by looking at the end.`}}},"../../data/hexagrams/55.json":{number:55,chinese:`豐`,pinyin:`fēng`,lower:`li`,upper:`zhen`,locales:{uk:{name:`Розквіт`,composition:`Грім під вогнем.`,reading:{scene:`Світло і рух сходяться у повному розквіті.

Момент великий, але тінь уже стоїть поруч.`,dynamics:`Тут ситуація досягає піку. Багато видно, багато можливо, рух має широку силу.

Повнота не є тривалою власністю. Сонце в зеніті уже починає шлях до схилу, навіть якщо світла ще багато.

Небезпека в сп'янінні розквітом. Коли все велике, легко пропустити початок зменшення.

Ця гексаграма показує максимум прояву. Його треба використовувати ясно, без спроби заморозити полудень.`,vector:`Діяти в час повноти.

Не будувати план так, ніби пік не має другої сторони.`},judgment:`Повнота. Успіх. Володар досягає її. Не сумувати; бути як сонце в полудень.`,image:`Грім і блискавка приходять разом: повнота. Так шляхетна людина вирішує суди і виконує покарання.`},en:{name:`Abundance`,composition:`Thunder under fire.`,reading:{scene:`Light and movement meet in full abundance.

The moment is large, but shadow already stands nearby.`,dynamics:`The situation reaches its peak. Much is visible, much is possible, movement has wide force.

Fullness is not lasting property. The sun at zenith has already begun its way toward decline, even while there is still much light.

The danger is intoxication with abundance. When everything is large, the beginning of decrease is easy to miss.

This hexagram shows maximum manifestation. It should be used clearly, without trying to freeze noon.`,vector:`Act in the time of fullness.

Do not build a plan as if the peak had no other side.`},judgment:`Abundance. Success. The ruler reaches it. Do not grieve; be like the sun at noon.`,image:`Thunder and lightning come together: abundance. Thus the noble person decides judgments and carries out punishments.`}}},"../../data/hexagrams/56.json":{number:56,chinese:`旅`,pinyin:`lǚ`,lower:`gen`,upper:`li`,locales:{uk:{name:`Мандрівник`,composition:`Гора під вогнем.`,reading:{scene:`Полум'я не має дому на схилі, воно проходить далі.

Мандрівник лишається тимчасовим.`,dynamics:`Тут людина або справа перебуває не на своїй землі. Можна рухатися, але не варто поводитися як власник місця.

Тимчасовість вимагає легкого багажу і точних правил. Дрібна обережність тут важливіша за великий намір.

Небезпека в самовільності. На чужій території навіть малий надлишок жесту швидко стає проблемою.

Ця гексаграма показує проходження. Воно може бути ясним, якщо не прив'язуватися до того, що не належить цьому шляху.`,vector:`Йти легко і точно.

Не будувати постійний дім із тимчасового вогню.`},judgment:`Мандрівник. У малому успіх. Стійкість мандрівника приносить щастя.`,image:`На горі є вогонь: мандрівник. Так шляхетна людина ясна й обережна в покараннях і не затягує судів.`},en:{name:`The Wanderer`,composition:`Mountain under fire.`,reading:{scene:`Flame has no home on the slope; it passes on.

The traveler remains temporary.`,dynamics:`A person or matter is not on its own ground here. Movement is possible, but one should not behave as owner of the place.

Temporariness requires light baggage and exact rules. Small caution matters more here than a large intention.

The danger is self-will. On foreign ground, even a small excess of gesture quickly becomes a problem.

This hexagram shows passage. It can be clear if one does not attach to what does not belong to this road.`,vector:`Move lightly and precisely.

Do not build a permanent house out of temporary fire.`},judgment:`The Wanderer. Success in the small. The traveler’s constancy brings good fortune.`,image:`On the mountain there is fire: the wanderer. Thus the noble person is clear and careful in punishments and does not prolong judgments.`}}},"../../data/hexagrams/57.json":{number:57,chinese:`巽`,pinyin:`xùn`,lower:`xun`,upper:`xun`,locales:{uk:{name:`Проникнення`,composition:`Вітер над вітром.`,reading:{scene:`М'який рух повторюється і входить у щілини.

Проникнення діє без удару.`,dynamics:`Тут дія не пряма, а настійна. Вона входить поступово, через дрібні проходи, через повторення і нахил.

М'якість має результат, коли не втрачає напряму. Якщо вона лише пристосовується, її розносить чужими потоками.

Небезпека в безформній поступливості. Те, що всюди просочується, може ніде не мати власної лінії.

Ця гексаграма показує тихий вплив. Він працює там, де різкий рух тільки закрив би двері.`,vector:`Проникати малим і послідовним.

Не розчиняти напрям у бажанні пройти всюди.`},judgment:`Проникне. Малий успіх. Сприятливо мати куди йти. Сприятливо побачити велику людину.`,image:`Вітри йдуть один за одним: проникнення. Так шляхетна людина поширює накази і здійснює справи.`},en:{name:`The Gentle`,composition:`Wind over wind.`,reading:{scene:`A soft movement repeats and enters the cracks.

Penetration works without a blow.`,dynamics:`The action here is not direct, but persistent. It enters gradually, through small openings, through repetition and inclination.

Softness has a result when it does not lose direction. If it only adapts, it is carried by other currents.

The danger is formless compliance. What seeps everywhere may have its own line nowhere.

This hexagram shows quiet influence. It works where a sharp movement would only close the door.`,vector:`Enter through the small and consistent.

Do not dissolve direction in the wish to pass everywhere.`},judgment:`The Gentle. Small success. It is favorable to have somewhere to go. It is favorable to see the great person.`,image:`Winds follow one another: penetration. Thus the noble person spreads commands and carries out affairs.`}}},"../../data/hexagrams/58.json":{number:58,chinese:`兌`,pinyin:`duì`,lower:`dui`,upper:`dui`,locales:{uk:{name:`Радісне озеро`,composition:`Озеро над озером.`,reading:{scene:`Відкритість відгукується відкритості.

Радість має поверхню, через яку люди зближуються.`,dynamics:`Тут легкість виникає через обмін: слово, усмішка, спільний простір, здатність бути поруч без зайвого тиску.

Радість працює, коли вона не приховує порожнечу. Вона має підкріплювати зв'язок, а не замінювати зміст.

Небезпека в приємності за будь-яку ціну. Тоді озеро стає блиском на мілководді.

Ця гексаграма показує відкритий обмін. Він живий, якщо за легкістю не стоїть примус усміхатися.`,vector:`Залишити місце для легкого відгуку.

Не робити приємність головним законом ситуації.`},judgment:`Радісне. Успіх. Сприятлива стійкість.`,image:`Озера з’єднані одне з одним: радісне. Так шляхетна людина навчається з друзями і вправляється разом із ними.`},en:{name:`The Joyous Lake`,composition:`Lake over lake.`,reading:{scene:`Openness answers openness.

Joy has a surface through which people draw near.`,dynamics:`Lightness arises here through exchange: word, smile, shared space, the ability to be near without excess pressure.

Joy works when it does not hide emptiness. It should support connection, not replace substance.

The danger is pleasantness at any price. Then the lake becomes shine over shallow water.

This hexagram shows open exchange. It is alive if there is no compulsion to smile behind the lightness.`,vector:`Leave room for light response.

Do not make pleasantness the chief law of the situation.`},judgment:`The Joyous. Success. Favorable through constancy.`,image:`Lakes joined with one another: the joyous. Thus the noble person learns with friends and practices together with them.`}}},"../../data/hexagrams/59.json":{number:59,chinese:`渙`,pinyin:`huàn`,lower:`kan`,upper:`xun`,locales:{uk:{name:`Розсіювання`,composition:`Вода під вітром.`,reading:{scene:`Те, що було зібране в грудку, розноситься і розм'якшується.

Межі втрачають жорсткість.`,dynamics:`Тут напружене скупчення починає розходитися. Вітер проходить над водою і знімає застиглу форму.

Розсіювання може звільнити заблокований рух. Але воно потребує місця збору, інакше все просто розпливеться.

Небезпека в тому, щоб плутати розпускання вузла з втратою будь-якої форми. Без опори вода не збирається назад.

Ця гексаграма показує розм'якшення твердого. Воно потрібне там, де стиск уже шкодить проходу.`,vector:`Розсіювати затверділе, не втрачаючи місця збору.

Не ламати межі там, де достатньо їх розм'якшити.`},judgment:`Розсіювання. Успіх. Володар наближається до храму. Сприятливо перейти велику воду. Сприятлива стійкість.`,image:`Вітер ходить над водою: розсіювання. Так давні володарі приносили жертви і будували храми.`},en:{name:`Dispersion`,composition:`Water under wind.`,reading:{scene:`What was gathered into a lump is carried apart and softened.

Boundaries lose their hardness.`,dynamics:`A tense concentration begins to disperse. Wind passes over water and removes the frozen shape.

Dispersion can release blocked movement. But it needs a place of gathering; otherwise everything merely spreads out.

The danger is confusing the loosening of a knot with the loss of all form. Without support, water does not gather back.

This hexagram shows the softening of what has hardened. It is needed where compression already harms passage.`,vector:`Disperse what has hardened without losing the place of gathering.

Do not break boundaries where softening them is enough.`},judgment:`Dispersion. Success. The ruler approaches the temple. It is favorable to cross the great water. Favorable through constancy.`,image:`Wind moves over water: dispersion. Thus the ancient kings made offerings and built temples.`}}},"../../data/hexagrams/60.json":{number:60,chinese:`節`,pinyin:`jié`,lower:`dui`,upper:`kan`,locales:{uk:{name:`Обмеження`,composition:`Озеро над водою.`,reading:{scene:`Плин отримує берег і міру.

Обмеження робить рух придатним.`,dynamics:`Тут межа не є ворогом руху. Вона надає воді форму, щоб та не розтікалася без користі.

Добра міра має бути прийнятною. Надто жорстке правило перекриває потік і перетворює лад на гіркоту.

Небезпека в любові до заборони. Коли межа існує тільки заради себе, вона висушує те, що мала берегти.

Ця гексаграма показує необхідність рамки. Вона працює, якщо служить руху, а не замінює його.`,vector:`Поставити межу, яка веде рух.

Не робити з обмеження окрему владу.`},judgment:`Обмеження. Успіх. Гірке обмеження не може бути стійким.`,image:`Над озером є вода: обмеження. Так шляхетна людина встановлює число і міру та розглядає силу і дію.`},en:{name:`Limitation`,composition:`Lake over water.`,reading:{scene:`The current receives a shore and measure.

Limitation makes movement usable.`,dynamics:`The boundary is not an enemy of movement here. It gives water form so it does not spread without use.

Good measure must be bearable. A rule too hard blocks the current and turns order bitter.

The danger is love of prohibition. When the boundary exists only for itself, it dries what it was meant to keep.

This hexagram shows the need for a bank and measure. They work if they serve movement rather than replacing it.`,vector:`Set a boundary that guides movement.

Do not turn limitation into a separate authority.`},judgment:`Limitation. Success. Bitter limitation cannot be constant.`,image:`Above the lake there is water: limitation. Thus the noble person establishes number and measure and examines force and action.`}}},"../../data/hexagrams/61.json":{number:61,chinese:`中孚`,pinyin:`zhōng fú`,lower:`dui`,upper:`xun`,locales:{uk:{name:`Внутрішня правда`,composition:`Озеро над вітром.`,reading:{scene:`У середині лишено порожнину, і звук проходить чисто.

Правда діє без натиску.`,dynamics:`Тут переконливість не кричить. Вона звучить так, як звучить порожня посудина, якщо в неї вдарити правильно.

Порожнина важлива. Якщо все забите наміром, звук глухне і не має де відгукнутися.

Небезпека в красивій щирості, яку беруть як знаряддя впливу. Тоді чистий звук стає маскою.

Ця гексаграма показує відповідність між тим, що всередині, і тим, що виходить назовні. Фальшива стінка одразу змінює тон.`,vector:`Лишити середину придатною для чистого звуку.

Не доводити правду до крику.`},judgment:`Внутрішня правда. Свині й риби — щастя. Сприятливо перейти велику воду. Сприятлива стійкість.`,image:`Над озером є вітер: внутрішня правда. Так шляхетна людина розглядає суди і відкладає смерть.`},en:{name:`Inner Truth`,composition:`Lake over wind.`,reading:{scene:`A hollow is left in the middle, and sound passes cleanly.

Truth acts without pressure.`,dynamics:`Persuasiveness does not shout here. It sounds like an empty vessel when it is struck correctly.

The hollow matters. If everything is packed with intention, the sound dulls and has nowhere to answer.

The danger is beautiful sincerity taken up as a tool of influence. Then the clean sound becomes a mask.

This hexagram shows correspondence between what is inside and what comes outward. A false wall changes the tone at once.`,vector:`Leave the middle fit for a clean sound.

Do not drive truth into shouting.`},judgment:`Inner Truth. Pigs and fishes: good fortune. It is favorable to cross the great water. Favorable through constancy.`,image:`Above the lake there is wind: inner truth. Thus the noble person examines judgments and delays death.`}}},"../../data/hexagrams/62.json":{number:62,chinese:`小過`,pinyin:`xiǎo guò`,lower:`gen`,upper:`zhen`,locales:{uk:{name:`Мале перевищення`,composition:`Гора під громом.`,reading:{scene:`Малий птах летить низько, не беручи висоти.

Час належить дрібній точності.`,dynamics:`Тут велика дія недоречна. Ситуація приймає мале, обережне, близьке до землі.

Перевага в деталях: не піднімати голос, не розширювати жест, не брати більше простору, ніж дозволено.

Небезпека в бажанні довести значність великим рухом. Саме він зараз швидше за все приведе до помилки.

Ця гексаграма показує вагу малого переходу. Низький політ не є поразкою; це відповідність погоді.`,vector:`Робити мале точно.

Не летіти високо там, де правильний шлях проходить близько до землі.`},judgment:`Мале перевищення. Успіх. Сприятлива стійкість. Можна мале, не можна велике. Птах, що летить, лишає голос; не годиться йти вгору, годиться вниз.`,image:`Над горою є грім: мале перевищення. Так шляхетна людина в поведінці переходить до пошани, у втраті — до жалоби, у витратах — до ощадності.`},en:{name:`Small Exceeding`,composition:`Mountain under thunder.`,reading:{scene:`A small bird flies low, not taking height.

The time belongs to small precision.`,dynamics:`A large action is out of place here. The situation accepts the small, careful, close to the ground.

The advantage lies in details: do not raise the voice, do not widen the gesture, do not take more space than allowed.

The danger is wanting to prove significance through large movement. That movement is now most likely to cause error.

This hexagram shows the weight of a small crossing. Low flight is not defeat; it is accordance with the weather.`,vector:`Do the small thing exactly.

Do not fly high where the right way passes close to the ground.`},judgment:`Small Exceeding. Success. Favorable through constancy. The small may be done; the great may not. A flying bird leaves its call; it is not fitting to go upward, fitting to go downward.`,image:`Above the mountain there is thunder: small exceeding. Thus the noble person in conduct goes toward respect, in loss toward mourning, in spending toward thrift.`}}},"../../data/hexagrams/63.json":{number:63,chinese:`既濟`,pinyin:`jì jì`,lower:`li`,upper:`kan`,locales:{uk:{name:`Після завершення`,composition:`Вогонь під водою.`,reading:{scene:`Кожна частина стоїть на своєму місці, і справа здається завершеною.

Порядок уже створений.`,dynamics:`Тут форма зібрана, елементи врівноважені, перехід ніби відбувся. Саме тому потрібна особлива уважність до дрібного.

Після завершення починається інший ризик: те, що зібране, може розійтися від недогляду.

Небезпека в розслабленні після успіху. Завершена річ не перестає потребувати підтримки.

Ця гексаграма показує кінець як початок догляду. Порядок не є мертвим предметом; він тримається точністю після досягнення.`,vector:`Не кидати завершене без нагляду.

Після переходу берегти малі шви форми.`},judgment:`Після завершення. Успіх у малому. Сприятлива стійкість. На початку щастя, наприкінці безлад.`,image:`Вода над вогнем: після завершення. Так шляхетна людина думає про біду і заздалегідь захищається від неї.`},en:{name:`After Completion`,composition:`Fire under water.`,reading:{scene:`Each part stands in its place, and the matter seems complete.

Order has already been made.`,dynamics:`The form is assembled, the elements balanced, the crossing seemingly done. For that very reason, special attention to the small is needed.

After completion another risk begins: what has been assembled may come apart through neglect.

The danger is relaxing after success. A completed thing does not stop needing care.

This hexagram shows the end as the beginning of maintenance. Order is not a dead object; it is held by precision after achievement.`,vector:`Do not leave the completed thing unattended.

After the crossing, keep the small seams of the form.`},judgment:`After Completion. Success in the small. Favorable through constancy. At the beginning good fortune, at the end disorder.`,image:`Water over fire: after completion. Thus the noble person thinks of misfortune and guards against it beforehand.`}}},"../../data/hexagrams/64.json":{number:64,chinese:`未濟`,pinyin:`wèi jì`,lower:`kan`,upper:`li`,locales:{uk:{name:`Перед завершенням`,composition:`Вода під вогнем.`,reading:{scene:`Частини майже на місці, але ще не з'єднані правильно.

Перехід стоїть перед останнім кроком.`,dynamics:`Тут справа ще не завершена. Видно напрям, видно протилежний берег, але порядок поки не став фактом.

Найбільша небезпека приходить наприкінці, коли майже готове здається вже готовим. Один необережний рух мочить хвіст.

Поспіх руйнує саме те, що довго наближалось. Незавершене вимагає більше точності, ніж початок.

Ця гексаграма показує стан перед переходом. Можливість реальна, але вона ще не дорівнює здійсненню.`,vector:`Довести перехід до кінця без останньої самовпевненості.

Не святкувати берег, на який ще не ступили.`},judgment:`Перед завершенням. Успіх. Малий лис майже перейшов, але намочив хвіст. Ніщо не сприятливе.`,image:`Вогонь над водою: перед завершенням. Так шляхетна людина обережно розрізняє речі і ставить їх на місця.`},en:{name:`Before Completion`,composition:`Water under fire.`,reading:{scene:`The parts are almost in place, but not yet joined correctly.

The crossing stands before the final step.`,dynamics:`The matter is not yet complete. The direction is visible, the opposite bank is visible, but order has not become fact.

The greatest danger comes near the end, when almost ready seems already ready. One careless movement wets the tail.

Haste ruins precisely what has long been approaching. The unfinished requires more precision than the beginning.

This hexagram shows the state before crossing. The possibility is real, but it is not yet fulfillment.`,vector:`Bring the crossing to its end without the last self-assurance.

Do not celebrate a bank you have not yet stepped on.`},judgment:`Before Completion. Success. The young fox has almost crossed, but wets its tail. Nothing is favorable.`,image:`Fire over water: before completion. Thus the noble person carefully distinguishes things and sets them in their places.`}}}}),et={};for(let[e,t]of Object.entries($e))e.endsWith(`.json`)&&(et[t.number]=t);function tt(e){let t=et[e];if(!t)throw Error(`Unknown hexagram number: ${e}`);return t}var nt=et;function $(e,t){let n=tt(e),r=Qe(e),i=n.locales[t]??n.locales.uk;return{number:r.number,chinese:n.chinese,pinyin:n.pinyin,upper:r.upper,lower:r.lower,...i}}function rt(e){return Object.values(nt).sort((e,t)=>e.number-t.number).map(t=>$(t.number,e))}var it={en:Object.assign({"../../data/hexagrams_ext/en/01.json":()=>j(()=>import(`../chunks/BHzlnlYv.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/02.json":()=>j(()=>import(`../chunks/Dv_G4kbJ.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/03.json":()=>j(()=>import(`../chunks/DBfuiDQK.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/04.json":()=>j(()=>import(`../chunks/UUu9qiCS.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/05.json":()=>j(()=>import(`../chunks/C7PPCIVa.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/06.json":()=>j(()=>import(`../chunks/BI0mToyF.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/07.json":()=>j(()=>import(`../chunks/Dnq3j7eu.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/08.json":()=>j(()=>import(`../chunks/GIyQuQ7M.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/09.json":()=>j(()=>import(`../chunks/DTocSb57.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/10.json":()=>j(()=>import(`../chunks/Bo4YfPT6.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/11.json":()=>j(()=>import(`../chunks/AxioKYds.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/12.json":()=>j(()=>import(`../chunks/D5D8rOPl.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/13.json":()=>j(()=>import(`../chunks/CzqolG-H.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/14.json":()=>j(()=>import(`../chunks/BnDVhOHp.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/15.json":()=>j(()=>import(`../chunks/CQ8O8bL_.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/16.json":()=>j(()=>import(`../chunks/CyKeGZaM.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/17.json":()=>j(()=>import(`../chunks/IcGpmETZ2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/18.json":()=>j(()=>import(`../chunks/xx3UnuKM2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/19.json":()=>j(()=>import(`../chunks/C_oP6jR92.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/20.json":()=>j(()=>import(`../chunks/BQ_YL-vz2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/21.json":()=>j(()=>import(`../chunks/B3mS-_4F2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/22.json":()=>j(()=>import(`../chunks/DwQqNuNc2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/23.json":()=>j(()=>import(`../chunks/DFaThrY02.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/24.json":()=>j(()=>import(`../chunks/Cd4fcd7o2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/25.json":()=>j(()=>import(`../chunks/BbVkeYLh2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/26.json":()=>j(()=>import(`../chunks/DKCKO38-2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/27.json":()=>j(()=>import(`../chunks/B9FwEUlF2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/28.json":()=>j(()=>import(`../chunks/7kJ4T4lm2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/29.json":()=>j(()=>import(`../chunks/DmmzsGrp2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/30.json":()=>j(()=>import(`../chunks/Drk6W2Ss2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/31.json":()=>j(()=>import(`../chunks/BBDajprx2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/32.json":()=>j(()=>import(`../chunks/C4wf4Fiq2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/33.json":()=>j(()=>import(`../chunks/gn3OZsBy2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/34.json":()=>j(()=>import(`../chunks/D3lh2CGM2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/35.json":()=>j(()=>import(`../chunks/JkvwBP8v2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/36.json":()=>j(()=>import(`../chunks/CmIDuH2o2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/37.json":()=>j(()=>import(`../chunks/Goz605AN2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/38.json":()=>j(()=>import(`../chunks/Cu-xASLs2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/39.json":()=>j(()=>import(`../chunks/W4Z0jFhx2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/40.json":()=>j(()=>import(`../chunks/C0PGaapQ2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/41.json":()=>j(()=>import(`../chunks/TwN75Bfl2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/42.json":()=>j(()=>import(`../chunks/DiA-iTpV2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/43.json":()=>j(()=>import(`../chunks/DiGQ8-Ic.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/44.json":()=>j(()=>import(`../chunks/Bv82pQ0_.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/45.json":()=>j(()=>import(`../chunks/BbBnXpj_.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/46.json":()=>j(()=>import(`../chunks/BvSLF7d_.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/47.json":()=>j(()=>import(`../chunks/C9UgxXnQ.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/48.json":()=>j(()=>import(`../chunks/QwZn6tm6.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/49.json":()=>j(()=>import(`../chunks/CJ5EZv4H.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/50.json":()=>j(()=>import(`../chunks/CsBrZIl4.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/51.json":()=>j(()=>import(`../chunks/DjYIBVpI.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/52.json":()=>j(()=>import(`../chunks/kgGcKcus.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/53.json":()=>j(()=>import(`../chunks/C_7ZiMa0.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/54.json":()=>j(()=>import(`../chunks/DezS6b2a.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/55.json":()=>j(()=>import(`../chunks/DU2meKPM.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/56.json":()=>j(()=>import(`../chunks/B2ngzTvT.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/57.json":()=>j(()=>import(`../chunks/DAROmjuA.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/58.json":()=>j(()=>import(`../chunks/HBsU41yG.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/59.json":()=>j(()=>import(`../chunks/c11faA18.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/60.json":()=>j(()=>import(`../chunks/4eL0V7AT.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/61.json":()=>j(()=>import(`../chunks/C9EuuhyQ.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/62.json":()=>j(()=>import(`../chunks/Basa6JZL.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/63.json":()=>j(()=>import(`../chunks/DFbs94PZ.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/en/64.json":()=>j(()=>import(`../chunks/h0OxS-eR.js`).then(e=>e.default),[],import.meta.url)}),uk:Object.assign({"../../data/hexagrams_ext/uk/01.json":()=>j(()=>import(`../chunks/Cxw7S4M5.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/02.json":()=>j(()=>import(`../chunks/cD7_9aRg.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/03.json":()=>j(()=>import(`../chunks/thBxEVtq.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/04.json":()=>j(()=>import(`../chunks/6j3uvqdC.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/05.json":()=>j(()=>import(`../chunks/BMJbzh5o.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/06.json":()=>j(()=>import(`../chunks/CMrilXpp.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/07.json":()=>j(()=>import(`../chunks/DioRZFrC.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/08.json":()=>j(()=>import(`../chunks/B8aeTwHJ.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/09.json":()=>j(()=>import(`../chunks/CZDQUJI6.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/10.json":()=>j(()=>import(`../chunks/_pnI4yib.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/11.json":()=>j(()=>import(`../chunks/B2uiVHv_.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/12.json":()=>j(()=>import(`../chunks/DvUyTSr6.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/13.json":()=>j(()=>import(`../chunks/wC8PB-pB.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/14.json":()=>j(()=>import(`../chunks/3AL5YCnG.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/15.json":()=>j(()=>import(`../chunks/DYdB7Mmi.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/16.json":()=>j(()=>import(`../chunks/Cfsvja0c.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/17.json":()=>j(()=>import(`../chunks/CpyEe3bG2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/18.json":()=>j(()=>import(`../chunks/DFR3l2nz2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/19.json":()=>j(()=>import(`../chunks/kdcFWJBo2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/20.json":()=>j(()=>import(`../chunks/CLVzytv_2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/21.json":()=>j(()=>import(`../chunks/IThtfKJD2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/22.json":()=>j(()=>import(`../chunks/CVNTXJ-p2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/23.json":()=>j(()=>import(`../chunks/n4Qwt2rg2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/24.json":()=>j(()=>import(`../chunks/8SLnhDp12.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/25.json":()=>j(()=>import(`../chunks/C_A-uqS12.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/26.json":()=>j(()=>import(`../chunks/x3dIlr002.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/27.json":()=>j(()=>import(`../chunks/Bu1nYtNv2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/28.json":()=>j(()=>import(`../chunks/DKda-v9n2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/29.json":()=>j(()=>import(`../chunks/DsQe9XJg2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/30.json":()=>j(()=>import(`../chunks/DXUr_Pqy2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/31.json":()=>j(()=>import(`../chunks/CoBGU2TW2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/32.json":()=>j(()=>import(`../chunks/DxBELlEF2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/33.json":()=>j(()=>import(`../chunks/CPJi51Y02.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/34.json":()=>j(()=>import(`../chunks/oeJ-KDS12.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/35.json":()=>j(()=>import(`../chunks/B9748dD-2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/36.json":()=>j(()=>import(`../chunks/qT83b4lZ2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/37.json":()=>j(()=>import(`../chunks/DtFvq9eR2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/38.json":()=>j(()=>import(`../chunks/Boz_efHj2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/39.json":()=>j(()=>import(`../chunks/BOi3bV0K2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/40.json":()=>j(()=>import(`../chunks/3Nbf9ZR22.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/41.json":()=>j(()=>import(`../chunks/gLVp63oV2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/42.json":()=>j(()=>import(`../chunks/C2177myD2.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/43.json":()=>j(()=>import(`../chunks/DuuodlNx.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/44.json":()=>j(()=>import(`../chunks/Ud-QL4GK.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/45.json":()=>j(()=>import(`../chunks/BsPaxKyk.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/46.json":()=>j(()=>import(`../chunks/CJk70Iuv.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/47.json":()=>j(()=>import(`../chunks/DD81QuLt.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/48.json":()=>j(()=>import(`../chunks/DSHYvz7Y.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/49.json":()=>j(()=>import(`../chunks/CFBPaHCK.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/50.json":()=>j(()=>import(`../chunks/DfYF_7oH.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/51.json":()=>j(()=>import(`../chunks/nfY4ncD-.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/52.json":()=>j(()=>import(`../chunks/0AEa2fzf.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/53.json":()=>j(()=>import(`../chunks/ColFGXE9.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/54.json":()=>j(()=>import(`../chunks/D1LgmyQF.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/55.json":()=>j(()=>import(`../chunks/B2rCitLA.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/56.json":()=>j(()=>import(`../chunks/n3uAzNj9.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/57.json":()=>j(()=>import(`../chunks/BJPDgtjE.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/58.json":()=>j(()=>import(`../chunks/jaFJEr5s.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/59.json":()=>j(()=>import(`../chunks/Ciip-WRx.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/60.json":()=>j(()=>import(`../chunks/CR_7Yywt.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/61.json":()=>j(()=>import(`../chunks/BNPudVqL.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/62.json":()=>j(()=>import(`../chunks/BVx2Ad7B.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/63.json":()=>j(()=>import(`../chunks/CSqbVdhv.js`).then(e=>e.default),[],import.meta.url),"../../data/hexagrams_ext/uk/64.json":()=>j(()=>import(`../chunks/CvBRFR7k.js`).then(e=>e.default),[],import.meta.url)})},at={en:{},uk:{}},ot={en:{},uk:{}};for(let e of[`en`,`uk`])for(let[t,n]of Object.entries(it[e])){let r=t.match(/\/(\d{2})\.json$/);r&&(at[e][Number(r[1])]=n)}async function st(e,t){let n=at[t][e]?t:`uk`,r=at[n][e];return r?(ot[n][e]??=await r(),ot[n][e]):null}function ct(e,t){return!!(at[t][e]??at.uk[e])}var lt=f(`<span><span class="glyph svelte-16fr6kw" aria-hidden="true"> </span></span>`);function ut(e,t){s(t,!0);let n=b(t,`compact`,3,!1),r=g(()=>Xe(t.number));var i=lt();let a;var o=d(i),u=d(o,!0);v(o),v(i),c(()=>{a=C(i,1,`hex-font-icon svelte-16fr6kw`,null,a,{compact:n()}),E(i,`role`,t.label?`img`:void 0),E(i,`aria-label`,t.label),E(i,`aria-hidden`,t.label?void 0:!0),I(u,l(r))}),x(e,i),O()}var dt=f(`<div><button class="coin-pick-btn yin svelte-g7jscb"><svg viewBox="0 0 48 48" aria-hidden="true" class="svelte-g7jscb"><circle cx="24" cy="24" r="21" class="ring svelte-g7jscb"></circle><rect x="18.5" y="18.5" width="11" height="11" rx="0.5" class="hole svelte-g7jscb"></rect><line x1="11" y1="22" x2="19" y2="22" class="mark svelte-g7jscb"></line><line x1="29" y1="26" x2="37" y2="26" class="mark svelte-g7jscb"></line></svg></button> <button class="coin-pick-btn yang svelte-g7jscb"><svg viewBox="0 0 48 48" aria-hidden="true" class="svelte-g7jscb"><circle cx="24" cy="24" r="21" class="ring svelte-g7jscb"></circle><rect x="18.5" y="18.5" width="11" height="11" rx="0.5" class="hole svelte-g7jscb"></rect><line x1="11" y1="24" x2="37" y2="24" class="mark svelte-g7jscb"></line></svg></button></div>`),ft=f(`<button class="primary-btn toss-action svelte-g7jscb"> </button>`),pt=f(`<p class="status svelte-g7jscb"> </p>`),mt=f(`<section><!> <!></section>`);function ht(e,n){s(n,!0);let r=b(n,`immersive`,3,!1),a=Y(),o=g(()=>n.tossMode===`single`?a.t(`flow.tossSingle`):a.t(`flow.tossLine`));var u=mt();let f;var p=d(u);{let e=g(()=>n.step===`reading`?null:n.spinningLine),t=g(()=>n.step===`reading`?null:n.spinningCoin),r=g(()=>n.step===`reading`?6:n.coinGridRevealed),i=g(()=>n.step===`reading`?null:n.activeLine);Ne(p,{get lineCoins(){return n.lineCoins},get lines(){return n.lines},get spinningLine(){return l(e)},get spinningCoin(){return l(t)},get revealedLines(){return l(r)},get activeLine(){return l(i)}})}var m=t(p,2),h=e=>{var r=F(),s=L(r),u=e=>{var r=F(),o=L(r),s=e=>{var r=dt();let o;var s=d(r),l=t(s,2);v(r),c((e,t)=>{o=C(r,1,`coin-picker svelte-g7jscb`,null,o,{"coin-picker--disabled":n.tossing}),s.disabled=n.tossing,E(s,`aria-label`,e),l.disabled=n.tossing,E(l,`aria-label`,t)},[()=>a.t(`coins.yin`),()=>a.t(`coins.yang`)]),i(`click`,s,()=>n.onRealCoin?.(2)),i(`click`,l,()=>n.onRealCoin?.(3)),x(e,r)};N(o,e=>{n.lines.length<6&&e(s)}),x(e,r)},f=e=>{var t=F(),r=L(t),a=e=>{var t=ft(),r=d(t,!0);v(t),c(()=>{t.disabled=n.tossing,I(r,l(o))}),i(`click`,t,function(...e){n.onTossNext?.apply(this,e)}),x(e,t)};N(r,e=>{n.lines.length<6&&e(a)}),x(e,t)},p=e=>{var t=pt(),n=d(t,!0);v(t),c(e=>I(n,e),[()=>a.t(`flow.tossing`)]),x(e,t)};N(s,e=>{n.tossMode===`real`?e(u):n.tossMode===`all`?e(p,-1):e(f,1)}),x(e,r)};N(m,e=>{n.step===`toss`&&e(h)}),v(u),c(()=>f=C(u,1,`step cast-step svelte-g7jscb`,null,f,{"cast-step--immersive":r()})),x(e,u),O()}p([`click`]);function gt(e){return e.coinRows?.length?e.coinRows.map(e=>[...e]):ge(e.lines,e.id)}function _t(e){let t=new Map;for(let n of e)t.set(n.primaryNumber,(t.get(n.primaryNumber)??0)+1);return t}function vt(){return crypto.randomUUID()}function yt(e){let t=new Date(e);return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,`0`)}-${String(t.getDate()).padStart(2,`0`)}`}function bt(e,t){let n=[],r=new Map,i=new Map,a=new Map;for(let o of e){let e=new Date(o.createdAt),s=String(e.getFullYear()),c=`${s}-${e.getMonth()}`,l=yt(o.createdAt),u=r.get(s);u||(u={key:s,label:s,months:[]},r.set(s,u),n.push(u));let d=i.get(c);d||(d={key:c,label:e.toLocaleDateString(t,{month:`long`,year:`numeric`}),days:[]},i.set(c,d),u.months.push(d));let f=a.get(l);f||(f={key:l,label:e.toLocaleDateString(t,{weekday:`long`,day:`numeric`,month:`long`}),entries:[]},a.set(l,f),d.days.push(f)),f.entries.push(o)}return n}function xt(e){return e.split(/\n\s*\n/).map(e=>e.trim()).filter(Boolean)}var St=f(`<p class="svelte-1moqyhz"> </p>`),Ct=f(`<p class="svelte-1moqyhz">&nbsp;</p>`),wt=f(`<div class="help-body svelte-1moqyhz"><!></div>`);function Tt(e,t){s(t,!0);let n=g(()=>xt(t.body));V(e,{get open(){return t.open},get title(){return t.title},get onClose(){return t.onClose},get closeLabel(){return t.closeLabel},children:e=>{var t=wt(),r=d(t),i=e=>{var t=F();T(L(t),17,()=>l(n),y,(e,t)=>{var n=St(),r=d(n,!0);v(n),c(()=>I(r,l(t))),x(e,n)}),x(e,t)},a=e=>{x(e,Ct())};N(r,e=>{l(n).length>0?e(i):e(a,-1)}),v(t),x(e,t)},$$slots:{default:!0}}),O()}function Et(e,t){return new Date(e).toLocaleTimeString(t,{hour:`2-digit`,minute:`2-digit`})}function Dt(e){return e.relatingNumber?`${e.primaryNumber} -> ${e.relatingNumber}`:String(e.primaryNumber)}function Ot(e,t){if(!e.length)return``;let n=bt(e,t),r=``;for(let e of n)for(let n of e.months)for(let e of n.days){r+=`## ${e.label}\n\n`;for(let n of e.entries){let e=Et(n.createdAt,t),i=n.question.trim()||`—`;r+=`${e} ${i}\n`,r+=`${Dt(n)}\n\n`}}return r.trimEnd()}function kt(){let e=new Date,t=e=>String(e).padStart(2,`0`);return`iching-archive-${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}.md`}var At=f(`<div class="export-preview svelte-1f1b3r"><div class="export-actions svelte-1f1b3r"><!> <!></div> <pre class="export-text svelte-1f1b3r"> </pre></div>`),jt=f(`<!> <!>`,1);function Mt(e,n){s(n,!0);let r=Y(),i=g(()=>W(r.locale)),o=m(!1),u=m(``),f=m(``),p=m(!1);function h(){n.onClose(),a(p,!1)}async function y(){if(!n.journal.length)return;let e=Ot(n.journal,l(i)),t=kt();J(`archive_exported`,{entries:n.journal.length}),n.onClose(),!await q({title:t,text:e})&&(a(u,e,!0),a(f,t,!0),a(o,!0),a(p,!1))}function b(){let e=new Blob([l(u)],{type:`text/plain; charset=utf-8`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=l(f),document.body.appendChild(n),n.click(),setTimeout(()=>{URL.revokeObjectURL(t),n.remove()},2e3)}async function S(){try{await ae(l(u)),a(p,!0),setTimeout(()=>a(p,!1),2e3)}catch{}}var C=jt(),w=L(C);{let e=e=>{},t=e=>{{let t=g(()=>n.journal.length===0);H(e,{variant:`primary`,get disabled(){return l(t)},onclick:()=>void y(),children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`journal.exportAction`)]),x(e,n)},$$slots:{default:!0}})}},i=g(()=>r.t(`journal.exportTitle`));V(w,{get open(){return n.open},get title(){return l(i)},titleId:`journal-export-title`,onClose:h,children:e,footer:t,$$slots:{default:!0,footer:!0}})}var T=t(w,2);{let e=e=>{var n=At(),i=d(n),a=d(i);H(a,{variant:`secondary`,onclick:b,children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`journal.exportDownload`)]),x(e,n)},$$slots:{default:!0}}),H(t(a,2),{variant:`secondary`,onclick:()=>void S(),children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>l(p)?r.t(`journal.exportCopied`):r.t(`journal.exportCopy`)]),x(e,n)},$$slots:{default:!0}}),v(i);var o=t(i,2),s=d(o,!0);v(o),v(n),c(()=>I(s,l(u))),x(e,n)},n=g(()=>l(f)||r.t(`journal.exportShare`));B(T,{get open(){return l(o)},get title(){return l(n)},titleId:`journal-export-preview-title`,onClose:()=>a(o,!1),children:e,$$slots:{default:!0}})}x(e,C),O()}var Nt=f(`<p class="journal-archive__empty"> </p>`),Pt=f(`<li><button type="button"><span class="journal-archive__head"><span> </span> <time class="journal-archive__time"> </time></span> <span class="journal-archive__hex"> </span></button></li>`),Ft=f(`<!> <ul class="journal-archive__list"></ul>`,1);function It(e,n){s(n,!0);let r=Y(),o=g(()=>W(r.locale)),f=m(h(new Set)),p=m(!1),y=g(()=>l(f).size),b=g(()=>n.journal.length>0&&l(y)===n.journal.length);function S(){a(f,new Set,!0),a(p,!1),n.onClose()}u(()=>{n.open&&(a(f,new Set,!0),a(p,!1))});function w(e){return new Date(e).toLocaleString(l(o),{day:`numeric`,month:`short`,hour:`2-digit`,minute:`2-digit`})}function D(e){let t=$(e.primaryNumber,r.locale),n=e.relatingNumber?$(e.relatingNumber,r.locale):null;return n?`${t.number} ${t.name} → ${n.number} ${n.name}`:`${t.number} ${t.name}`}function k(e){let t=new Set(l(f));t.has(e)?t.delete(e):t.add(e),a(f,t,!0)}function A(){a(f,l(b)?new Set:new Set(n.journal.map(e=>e.id)),!0)}async function j(){if(!(l(y)===0||l(p))){a(p,!0);try{await n.onDelete([...l(f)]),a(f,new Set,!0)}finally{a(p,!1)}}}{let a=e=>{var a=F(),o=L(a),s=e=>{var t=Nt(),n=d(t,!0);v(t),c(e=>I(n,e),[()=>r.t(`profile.archiveEmpty`)]),x(e,t)},u=e=>{var a=Ft(),o=L(a);H(o,{variant:`text`,fullWidth:!0,get pressed(){return l(b)},class:`journal-archive__select-all`,onclick:A,children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`profile.selectAll`)]),x(e,n)},$$slots:{default:!0}});var s=t(o,2);T(s,21,()=>n.journal,e=>e.id,(e,n)=>{var r=Pt(),a=d(r);let o;var s=d(a),u=d(s);let p;var m=d(u,!0);v(u);var h=t(u,2),g=d(h,!0);v(h),v(s);var _=t(s,2),y=d(_,!0);v(_),v(a),v(r),c((e,t,r,i,s,c)=>{o=C(a,1,`journal-archive__entry`,null,o,e),E(a,`aria-pressed`,t),p=C(u,1,`journal-archive__q`,null,p,r),I(m,i),E(h,`datetime`,l(n).createdAt),I(g,s),I(y,c)},[()=>({active:l(f).has(l(n).id)}),()=>l(f).has(l(n).id),()=>({"journal-archive__q--empty":!l(n).question.trim()}),()=>l(n).question.trim()||`—`,()=>w(l(n).createdAt),()=>D(l(n))]),i(`click`,a,()=>k(l(n).id)),x(e,r)}),v(s),x(e,a)};N(o,e=>{n.journal.length===0?e(s):e(u,-1)}),x(e,a)},o=e=>{{let t=g(()=>l(y)===0||l(p)||n.journal.length===0);H(e,{variant:`danger`,get disabled(){return l(t)},onclick:()=>void j(),children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`profile.deleteSelected`,{count:l(y)})]),x(e,n)},$$slots:{default:!0}})}},s=g(()=>r.t(`profile.archiveTitle`));V(e,{get open(){return n.open},get title(){return l(s)},titleId:`journal-archive-popup`,bodyClass:`journal-archive`,scrollable:!0,onClose:S,children:a,footer:o,$$slots:{default:!0,footer:!0}})}O()}p([`click`]);var Lt=f(`<span class="hex-answer svelte-1kqe4l6"><span class="hex-answer__num svelte-1kqe4l6"> </span> <!> <span class="hex-answer__name svelte-1kqe4l6"> </span></span>`);function Rt(e,n){s(n,!0);var r=Lt(),i=d(r),a=d(i,!0);v(i);var o=t(i,2);ut(o,{get number(){return n.hexagram.number},get label(){return n.hexagram.name},compact:!0});var l=t(o,2),u=d(l,!0);v(l),v(r),c(()=>{I(a,n.hexagram.number),I(u,n.hexagram.name)}),x(e,r),O()}var zt=f(`<span class="entry-arrow svelte-1kq55en" aria-hidden="true">→</span> <!>`,1),Bt=f(`<button type="button"><div class="entry-head svelte-1kq55en"><span> </span> <time class="entry-time svelte-1kq55en"> </time></div> <span class="entry-answer svelte-1kq55en"><!> <!></span></button>`);function Vt(e,n){s(n,!0);let r=b(n,`active`,3,!1),a=Y(),o=g(()=>W(a.locale)),u=g(()=>$(n.entry.primaryNumber,a.locale)),f=g(()=>n.entry.relatingNumber?$(n.entry.relatingNumber,a.locale):null),p=g(()=>new Date(n.entry.createdAt).toLocaleTimeString(l(o),{hour:`2-digit`,minute:`2-digit`}));var m=Bt();let h;var _=d(m),y=d(_);let S;var w=d(y,!0);v(y);var T=t(y,2),D=d(T,!0);v(T),v(_);var k=t(_,2),A=d(k);Rt(A,{get hexagram(){return l(u)}});var j=t(A,2),M=e=>{var n=zt();Rt(t(L(n),2),{get hexagram(){return l(f)}}),x(e,n)};N(j,e=>{l(f)&&e(M)}),v(k),v(m),c((e,t,i)=>{h=C(m,1,`entry-btn svelte-1kq55en`,null,h,{active:r()}),E(m,`aria-label`,e),S=C(y,1,`entry-q svelte-1kq55en`,null,S,t),I(w,i),E(T,`datetime`,n.entry.createdAt),I(D,l(p))},[()=>a.t(`journal.openEntry`),()=>({"entry-q--empty":!n.entry.question.trim()}),()=>n.entry.question.trim()||`—`]),i(`click`,m,()=>n.onSelect(n.entry)),x(e,m),O()}p([`click`]);var Ht=f(`<li class="svelte-ogww31"><!></li>`),Ut=f(`<section class="group-day svelte-ogww31"><h5 class="group-day-label svelte-ogww31"> </h5> <ul class="entries svelte-ogww31"></ul></section>`),Wt=f(`<section class="group-month svelte-ogww31"><h4 class="group-month-label svelte-ogww31"> </h4> <!></section>`),Gt=f(`<section class="group-year svelte-ogww31"><h3 class="group-year-label svelte-ogww31"> </h3> <!></section>`),Kt=f(`<div class="entries-grouped svelte-ogww31"></div>`);function qt(e,n){let r=b(n,`activeCastingId`,3,null);var i=Kt();T(i,21,()=>n.grouped,e=>e.key,(e,i)=>{var a=Gt(),o=d(a),s=d(o,!0);v(o),T(t(o,2),17,()=>l(i).months,e=>e.key,(e,i)=>{var a=Wt(),o=d(a),s=d(o,!0);v(o),T(t(o,2),17,()=>l(i).days,e=>e.key,(e,i)=>{var a=Ut(),o=d(a),s=d(o,!0);v(o);var u=t(o,2);T(u,21,()=>l(i).entries,e=>e.id,(e,t)=>{var i=Ht(),a=d(i);{let e=g(()=>r()===l(t).id);Vt(a,{get entry(){return l(t)},get active(){return l(e)},get onSelect(){return n.onEntrySelect}})}v(i),x(e,i)}),v(u),v(a),c(()=>{E(a,`aria-labelledby`,`journal-day-${l(i).key??``}`),E(o,`id`,`journal-day-${l(i).key??``}`),I(s,l(i).label)}),x(e,a)}),v(a),c(()=>{E(a,`aria-labelledby`,`journal-month-${l(i).key??``}`),E(o,`id`,`journal-month-${l(i).key??``}`),I(s,l(i).label)}),x(e,a)}),v(a),c(()=>{E(a,`aria-labelledby`,`journal-year-${l(i).key??``}`),E(o,`id`,`journal-year-${l(i).key??``}`),I(s,l(i).label)}),x(e,a)}),v(i),x(e,i)}var Jt=f(`<li class="svelte-1w1m5at"><button type="button"><span class="motif-num svelte-1w1m5at"> </span> <!> <span class="motif-name svelte-1w1m5at"> </span> <span class="motif-count svelte-1w1m5at"> </span></button></li>`),Yt=f(`<ul class="motifs-list svelte-1w1m5at"></ul>`),Xt=f(`<div class="motifs svelte-1w1m5at"><!></div>`);function Zt(e,n){s(n,!0);let r=b(n,`activeMotifNumber`,3,null),a=Y();var o=F(),u=L(o),f=e=>{var o=Xt(),s=d(o);{let e=g(()=>a.t(`journal.motifs`));oe(s,{get title(){return l(e)},titleColor:`faint`,children:(e,o)=>{var s=Yt();T(s,21,()=>n.motifs,({hexagram:e,count:t})=>e.number,(e,o)=>{let s=()=>l(o).hexagram,u=()=>l(o).count;var f=Jt(),p=d(f);let m;var h=d(p),g=d(h,!0);v(h);var _=t(h,2);ut(_,{get number(){return s().number},get label(){return s().name},compact:!0});var y=t(_,2),b=d(y,!0);v(y);var S=t(y,2),w=d(S);v(S),v(p),v(f),c(e=>{m=C(p,1,`motif-btn svelte-1w1m5at`,null,m,{active:r()===s().number}),E(p,`aria-label`,e),I(g,s().number),I(b,s().name),I(w,`×${u()??``}`)},[()=>a.t(`journal.openMotif`,{name:s().name})]),i(`click`,p,()=>n.onMotifSelect(s().number)),x(e,f)}),v(s),x(e,s)},$$slots:{default:!0}})}v(o),x(e,o)};N(u,e=>{n.motifs.length>1&&e(f)}),x(e,o),O()}p([`click`]),f(`<p class="paid-body svelte-wqddzm"> </p>`),f(`<!> <!>`,1),f(`<div class="track-form-action svelte-17numxp"><!></div>`);var Qt=f(`<div class="load-more svelte-17numxp" aria-hidden="true"></div>`),$t=f(`<aside class="journal svelte-17numxp"><div class="journal-head svelte-17numxp"><h2 class="svelte-17numxp"> </h2> <div class="journal-head__actions svelte-17numxp"><button type="button" class="journal-action svelte-17numxp"><svg viewBox="0 0 24 24" aria-hidden="true" class="svelte-17numxp"><path d="M12 15V4m0 0L8 8m4-4 4 4"></path><path d="M5 13v6h14v-6"></path></svg></button> <button type="button" class="journal-action svelte-17numxp"><svg viewBox="0 0 24 24" aria-hidden="true" class="svelte-17numxp"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"></path></svg></button> <!></div></div> <!> <!> <!> <!></aside>`),en=f(`<!> <!> <!> <!>`,1);function tn(e,n){s(n,!0);let r=b(n,`activeCastingId`,3,null),o=b(n,`activeMotifNumber`,3,null),f=Y(),p=m(!1),h=m(!1),_=m(!1),y=m(20),S=m(null);function C(){J(`archive_export_opened`),a(h,!0)}function T(){J(`archive_opened`),a(_,!0)}async function D(e){J(`archive_entries_deleted`,{count:e.length}),await X.deleteByIds(e)}let k=g(()=>n.journal.slice(0,l(y))),j=g(()=>bt(l(k),W(f.locale))),M=g(()=>l(y)<n.journal.length),P=g(()=>[..._t(n.journal).entries()].sort((e,t)=>t[1]-e[1]).slice(0,5).map(([e,t])=>({hexagram:$(e,f.locale),count:t})));u(()=>{let e=n.journal.length;l(y)>e?a(y,e,!0):e>0&&l(y)===0&&a(y,Math.min(20,e),!0)});function F(){a(y,Math.min(l(y)+20,n.journal.length),!0)}u(()=>{if(!l(S)||!l(M))return;let e=l(S),t=new IntersectionObserver(e=>{e[0]?.isIntersecting&&F()},{rootMargin:`240px`});return t.observe(e),()=>t.disconnect()});var R=en(),z=L(R),B=e=>{var s=$t(),u=d(s),m=d(u),h=d(m,!0);v(m);var _=t(m,2),y=d(_),b=t(y,2),D=t(b,2);{let e=g(()=>f.t(`journal.helpTitle`));se(D,{get label(){return l(e)},onclick:()=>a(p,!0)})}v(_),v(u);var O=t(u,2);N(O,e=>{});var k=t(O,2);Zt(k,{get motifs(){return l(P)},get activeMotifNumber(){return o()},get onMotifSelect(){return n.onMotifSelect}});var F=t(k,2);qt(F,{get grouped(){return l(j)},get activeCastingId(){return r()},get onEntrySelect(){return n.onEntrySelect}});var L=t(F,2),R=e=>{var t=Qt();A(t,e=>a(S,e),()=>l(S)),x(e,t)};N(L,e=>{l(M)&&e(R)}),v(s),w(s,(e,t)=>te?.(e,t),()=>({event:`journal_panel_viewed`,threshold:.3})),c((e,t,n,r,i)=>{I(h,e),E(y,`aria-label`,t),E(y,`title`,n),E(b,`aria-label`,r),E(b,`title`,i)},[()=>f.t(`journal.title`),()=>f.t(`profile.export`),()=>f.t(`profile.export`),()=>f.t(`profile.clearArchive`),()=>f.t(`profile.clearArchive`)]),i(`click`,y,C),i(`click`,b,T),x(e,s)};N(z,e=>{n.journal.length>0&&e(B)});var V=t(z,2);{let e=g(()=>f.t(`journal.helpTitle`)),t=g(()=>f.t(`journal.helpBody`)),n=g(()=>f.t(`reading.helpClose`));Tt(V,{get open(){return l(p)},get title(){return l(e)},get body(){return l(t)},get closeLabel(){return l(n)},onClose:()=>a(p,!1)})}var H=t(V,2);Mt(H,{get open(){return l(h)},get journal(){return n.journal},onClose:()=>a(h,!1)}),It(t(H,2),{get open(){return l(_)},get journal(){return n.journal},onClose:()=>a(_,!1),onDelete:D}),x(e,R),O()}p([`click`]);var nn=f(`<button type="button"><span class="flag svelte-npjipv" aria-hidden="true"> </span></button>`),rn=f(`<div class="switcher svelte-npjipv" role="group"></div>`);function an(e,t){s(t,!0);let n=Y(),r={uk:{flag:`🇺🇦`,labelKey:`locale.uk`},en:{flag:`🇬🇧`,labelKey:`locale.en`}};function a(e){J(`locale_changed`,{locale:e}),n.setLocale(e)}var o=rn();T(o,21,()=>G,y,(e,t)=>{let o=g(()=>r[l(t)]),s=g(()=>n.t(l(o).labelKey));var u=nn();let f;var p=d(u),m=d(p,!0);v(p),v(u),c(()=>{f=C(u,1,`locale-btn svelte-npjipv`,null,f,{active:n.locale===l(t)}),E(u,`aria-label`,l(s)),E(u,`aria-pressed`,n.locale===l(t)),E(u,`title`,l(s)),I(m,l(o).flag)}),i(`click`,u,()=>a(l(t))),x(e,u)}),v(o),c(e=>{E(o,`aria-label`,e),E(o,`aria-labelledby`,t.labelledBy)},[()=>t.labelledBy?void 0:n.t(`locale.label`)]),x(e,o),O()}p([`click`]);var on=f(`<p class="sync-status svelte-zmcndv"> </p>`),sn=f(`<div class="sync-body svelte-zmcndv"><p class="sync-account svelte-zmcndv"> </p> <!> <a class="sync-privacy svelte-zmcndv" href="https://iching.eggs.gd/privacy" target="_blank" rel="noopener noreferrer"> </a> <!></div>`);function cn(e,n){s(n,!0);let r=Y(),i=g(()=>Z.user?.email??Z.user?.name??``),a=g(()=>{if(!Q.enabled)return null;switch(Q.status){case`syncing`:return r.t(`sync.syncing`);case`error`:return r.t(`sync.error`);default:return Q.lastSyncedAt?r.t(`sync.lastSynced`,{when:o(Q.lastSyncedAt)}):r.t(`sync.blurb`)}});function o(e){let t=Math.round((Date.now()-e)/1e3);if(t<60)return r.t(`sync.justNow`);let n=Math.round(t/60);if(n<60)return r.t(`sync.minutesAgo`,{n});let i=Math.round(n/60);return i<24?r.t(`sync.hoursAgo`,{n:i}):r.t(`sync.daysAgo`,{n:Math.round(i/24)})}async function u(){await Z.signOut(),n.onClose()}{let o=e=>{var n=sn(),o=d(n),s=d(o,!0);v(o);var u=t(o,2),f=e=>{var t=on(),n=d(t,!0);v(t),c(()=>I(n,l(a))),x(e,t)};N(u,e=>{l(a)&&e(f)});var p=t(u,2),m=d(p,!0);v(p);var h=t(p,2),y=e=>{{let t=g(()=>Q.status===`syncing`);H(e,{variant:`primary`,primaryTone:`soft`,fullWidth:!0,get disabled(){return l(t)},onclick:()=>void Q.syncNow(),children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`sync.syncNow`)]),x(e,n)},$$slots:{default:!0}})}};N(h,e=>{Q.enabled&&e(y)}),v(n),c((e,t)=>{I(s,e),I(m,t)},[()=>r.t(`sync.signedInAs`,{account:l(i)}),()=>r.t(`sync.privacy`)]),x(e,n)},s=e=>{H(e,{variant:`danger`,onclick:()=>void u(),children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`sync.signOut`)]),x(e,n)},$$slots:{default:!0}})},f=g(()=>r.t(`sync.title`));V(e,{get open(){return n.open},get title(){return l(f)},titleId:`sync-popup-title`,get onClose(){return n.onClose},children:o,footer:s,$$slots:{default:!0,footer:!0}})}O()}var ln=f(`<button type="button"><svg viewBox="0 0 24 24" aria-hidden="true" class="svelte-19xspq9"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" class="svelte-19xspq9"></path></svg></button> <!>`,1);function un(e,n){s(n,!0);let r=Y(),o=m(!1),u=g(()=>!!Z.user&&Q.status===`idle`&&Q.lastSyncedAt!=null),d=g(()=>!Z.user||Q.status===`off`?`muted`:Q.status===`syncing`?`syncing`:Q.status===`error`?`error`:l(u)?`active`:`muted`),f=g(()=>{if(!Z.user)return r.t(`sync.signIn`);switch(Q.status){case`syncing`:return r.t(`sync.syncing`);case`error`:return r.t(`sync.error`);default:return Q.lastSyncedAt?r.t(`sync.lastSynced`,{when:p(Q.lastSyncedAt)}):r.t(`sync.notSynced`)}});function p(e){let t=Math.round((Date.now()-e)/1e3);if(t<60)return r.t(`sync.justNow`);let n=Math.round(t/60);if(n<60)return r.t(`sync.minutesAgo`,{n});let i=Math.round(n/60);return i<24?r.t(`sync.hoursAgo`,{n:i}):r.t(`sync.daysAgo`,{n:Math.round(i/24)})}function h(){Z.busy||(Z.user?a(o,!0):Z.signIn())}var _=F(),v=L(_),y=e=>{var n=ln(),r=L(n);let s;cn(t(r,2),{get open(){return l(o)},onClose:()=>a(o,!1)}),c(()=>{s=C(r,1,`sync-btn svelte-19xspq9`,null,s,{"sync-btn--muted":l(d)===`muted`,"sync-btn--active":l(d)===`active`,"sync-btn--syncing":l(d)===`syncing`,"sync-btn--error":l(d)===`error`,busy:Z.busy}),r.disabled=Z.busy,E(r,`aria-label`,l(f)),E(r,`title`,l(f)),E(r,`aria-haspopup`,Z.user?`dialog`:void 0)}),i(`click`,r,h),x(e,n)};N(v,e=>{Z.available&&e(y)}),x(e,_),O()}p([`click`]);var dn=f(`<label class="field svelte-94wtrj"><!> <textarea rows="3" class="svelte-94wtrj"></textarea></label>`);function fn(e,n){s(n,!0);let r=Y(),i=m(``),f=g(()=>!!l(i).trim());u(()=>{n.open&&a(i,n.question,!0)});function p(){n.onClose()}function h(){let e=l(i).trim();e&&n.onCast(n.mode,e)}{let s=e=>{var n=dn(),s=d(n);z(s,{children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`flow.questionInputLabel`)]),x(e,n)},$$slots:{default:!0}});var u=t(s,2);o(u),v(n),c(e=>E(u,`placeholder`,e),[()=>r.t(`flow.contextPlaceholder`)]),S(u,()=>l(i),e=>a(i,e)),x(e,n)},u=e=>{{let t=g(()=>!l(f));H(e,{variant:`primary`,get disabled(){return l(t)},onclick:h,children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`flow.castConfirm`)]),x(e,n)},$$slots:{default:!0}})}},m=g(()=>r.t(`flow.contextLabel`)),y=g(()=>r.t(`reading.helpClose`));V(e,{get open(){return n.open},get title(){return l(m)},titleId:`cast-question-popup`,onClose:p,get closeLabel(){return l(y)},children:s,footer:u,$$slots:{default:!0,footer:!0}})}O()}var pn=f(`<!> <span class="trigger-text svelte-i55b03"><span class="trigger-num svelte-i55b03"> </span> <span class="trigger-name svelte-i55b03"> </span></span>`,1),mn=f(`<span class="placeholder svelte-i55b03"> </span>`),hn=f(`<button type="button" class="clear-btn svelte-i55b03">×</button>`),gn=f(`<div class="picker svelte-i55b03"><!> <div class="picker-row svelte-i55b03"><button type="button" class="trigger svelte-i55b03"><!> <!></button> <!></div></div>`);function _n(e,n){s(n,!0);let r=b(n,`value`,3,null),a=Y(),o=g(()=>rt(a.locale)),u=g(()=>r()!==null&&r()!==void 0?l(o).find(e=>e.number===r()):null),f=g(()=>n.placeholder??a.t(`flow.selectHexagram`));function p(e){e.stopPropagation(),n.onClear()}var m=gn(),h=d(m);z(h,{size:`compact`,children:(e,t)=>{_();var r=P();c(()=>I(r,n.label)),x(e,r)},$$slots:{default:!0}});var y=t(h,2),S=d(y),C=d(S),w=e=>{var n=pn(),r=L(n);ut(r,{get number(){return l(u).number},get label(){return l(u).name},compact:!0});var i=t(r,2),a=d(i),o=d(a,!0);v(a);var s=t(a,2),f=d(s,!0);v(s),v(i),c(()=>{I(o,l(u).number),I(f,l(u).name)}),x(e,n)},T=e=>{var t=mn(),n=d(t,!0);v(t),c(()=>I(n,l(f))),x(e,t)};N(C,e=>{l(u)?e(w):e(T,-1)}),ee(t(C,2),{direction:`forward`}),v(S);var D=t(S,2),k=e=>{var t=hn();c(e=>E(t,`aria-label`,e),[()=>a.t(`flow.clearHexagram`)]),i(`click`,t,p),x(e,t)};N(D,e=>{l(u)&&e(k)}),v(y),v(m),i(`click`,S,function(...e){n.onOpen?.apply(this,e)}),x(e,m),O()}p([`click`]);var vn=f(`<div class="preview svelte-1ljsboa"><!> <div class="preview-text svelte-1ljsboa"><span class="preview-num svelte-1ljsboa"> </span> <span class="preview-name svelte-1ljsboa"> </span></div></div>`),yn=f(`<li class="svelte-1ljsboa"><button type="button"><span class="symbol svelte-1ljsboa" aria-hidden="true"> </span> <span class="name svelte-1ljsboa"> </span></button></li>`),bn=f(`<li class="svelte-1ljsboa"><button type="button"><span class="symbol svelte-1ljsboa" aria-hidden="true"> </span> <span class="name svelte-1ljsboa"> </span></button></li>`),xn=f(`<div class="trigram-view svelte-1ljsboa"><!> <div class="rows svelte-1ljsboa"><div class="row svelte-1ljsboa" role="group"><!> <ul class="trigram-list svelte-1ljsboa"></ul></div> <div class="row svelte-1ljsboa" role="group"><!> <ul class="trigram-list svelte-1ljsboa"></ul></div></div></div>`);function Sn(e,n){s(n,!0);let r=b(n,`value`,3,null),o=Y(),f=m(null),p=m(null);u(()=>{if(r()===null||r()===void 0){a(f,null),a(p,null);return}let{lower:e,upper:t}=Ke(r());a(f,e,!0),a(p,t,!0)});let h=g(()=>l(f)&&l(p)?We(l(f),l(p)):null),S=g(()=>l(h)===null?null:$(l(h),o.locale));function w(e){return o.t(`trigrams.${e}`)}function D(e){a(f,e,!0),A()}function k(e){a(p,e,!0),A()}function A(){!l(f)||!l(p)||n.onSelect(We(l(f),l(p)))}var j=xn(),M=d(j),F=e=>{var n=vn(),r=d(n);ut(r,{get number(){return l(S).number},get label(){return l(S).name},compact:!0});var i=t(r,2),a=d(i),o=d(a,!0);v(a);var s=t(a,2),u=d(s,!0);v(s),v(i),v(n),c(()=>{I(o,l(S).number),I(u,l(S).name)}),x(e,n)};N(M,e=>{l(S)&&e(F)});var L=t(M,2),R=d(L),B=d(R);z(B,{size:`row`,children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>o.t(`flow.upperTrigram`)]),x(e,n)},$$slots:{default:!0}});var V=t(B,2);T(V,21,()=>Pe,y,(e,n)=>{var r=yn(),a=d(r);let o;var s=d(a),u=d(s,!0);v(s);var f=t(s,2),m=d(f,!0);v(f),v(a),v(r),c((e,t)=>{o=C(a,1,`trigram-btn svelte-1ljsboa`,null,o,{selected:l(p)===l(n)}),E(a,`aria-pressed`,l(p)===l(n)),I(u,e),I(m,t)},[()=>Le(l(n)),()=>w(l(n))]),i(`click`,a,()=>k(l(n))),x(e,r)}),v(V),v(R);var H=t(R,2),U=d(H);z(U,{size:`row`,children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>o.t(`flow.lowerTrigram`)]),x(e,n)},$$slots:{default:!0}});var W=t(U,2);T(W,21,()=>Pe,y,(e,n)=>{var r=bn(),a=d(r);let o;var s=d(a),u=d(s,!0);v(s);var p=t(s,2),m=d(p,!0);v(p),v(a),v(r),c((e,t)=>{o=C(a,1,`trigram-btn svelte-1ljsboa`,null,o,{selected:l(f)===l(n)}),E(a,`aria-pressed`,l(f)===l(n)),I(u,e),I(m,t)},[()=>Le(l(n)),()=>w(l(n))]),i(`click`,a,()=>D(l(n))),x(e,r)}),v(W),v(H),v(L),v(j),c((e,t)=>{E(R,`aria-label`,e),E(H,`aria-label`,t)},[()=>o.t(`flow.upperTrigram`),()=>o.t(`flow.lowerTrigram`)]),x(e,j),O()}p([`click`]);function Cn(e,t){let n=b(t,`value`,3,null);V(e,{get open(){return t.open},get title(){return t.title},get titleId(){return t.titleId},get onClose(){return t.onClose},size:`wide`,scrollable:!0,bodyClass:`hex-picker-body`,children:e=>{Sn(e,{get value(){return n()},get onSelect(){return t.onSelect}})},$$slots:{default:!0}})}var wn=f(`<p class="error svelte-5q67lo" role="alert"> </p>`),Tn=f(`<form id="prefilled-cast-form" class="form svelte-5q67lo"><label class="field svelte-5q67lo"><!> <textarea rows="3"></textarea></label> <fieldset class="answer-group svelte-5q67lo"><!> <div class="hex-fields svelte-5q67lo"><!> <!></div></fieldset> <!></form>`),En=f(`<!> <!> <!>`,1);function Dn(e,n){s(n,!0);let f=Y(),p=m(null),h=m(null),y=m(null),b=m(null),S=m(!1);function C(){a(b,null),a(y,null),a(p,null),a(h,null),n.onClose()}function w(e){a(y,e,!0),a(b,null)}function T(){a(y,null)}function D(e){l(y)===`primary`?a(p,e,!0):l(y)===`relating`&&a(h,e,!0),T()}async function k(){if(!l(S)){if(!n.question.trim()){a(b,f.t(`flow.manualQuestionRequired`),!0);return}if(l(p)===null||l(p)<1||l(p)>64){a(b,f.t(`flow.manualPrimaryInvalid`),!0);return}a(S,!0),a(b,null);try{if(!await n.onSubmit({question:n.question.trim(),primaryNumber:l(p),relatingNumber:l(h)??void 0})){a(b,f.t(`flow.manualSubmitFailed`),!0);return}C()}finally{a(S,!1)}}}u(()=>{n.open&&(a(b,null),a(y,null))});var A=En(),j=L(A);{let e=e=>{var s=Tn(),u=d(s),m=d(u);z(m,{children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>f.t(`flow.yourQuestion`)]),x(e,n)},$$slots:{default:!0}});var y=t(m,2);o(y),v(u);var S=t(u,2),C=d(S);z(C,{asLegend:!0,children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>f.t(`flow.ichingAnswer`)]),x(e,n)},$$slots:{default:!0}});var T=t(C,2),D=d(T);{let e=g(()=>f.t(`reading.entryHexagramLabel`));_n(D,{get label(){return l(e)},get value(){return l(p)},onOpen:()=>w(`primary`),onClear:()=>a(p,null)})}var O=t(D,2);{let e=g(()=>f.t(`reading.relatingLabel`));_n(O,{get label(){return l(e)},get value(){return l(h)},onOpen:()=>w(`relating`),onClear:()=>a(h,null)})}v(T),v(S);var A=t(S,2),j=e=>{var t=wn(),n=d(t,!0);v(t),c(()=>I(n,l(b))),x(e,t)};N(A,e=>{l(b)&&e(j)}),v(s),c(e=>{M(y,n.question),E(y,`placeholder`,e)},[()=>f.t(`flow.contextPlaceholder`)]),r(`submit`,s,e=>{e.preventDefault(),k()}),i(`input`,y,e=>n.onQuestionInput(e.currentTarget.value)),x(e,s)},s=e=>{H(e,{variant:`primary`,type:`submit`,form:`prefilled-cast-form`,get disabled(){return l(S)},children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>f.t(`flow.manualSubmit`)]),x(e,n)},$$slots:{default:!0}})},u=g(()=>f.t(`flow.formReady`));V(j,{get open(){return n.open},get title(){return l(u)},titleId:`prefilled-cast-popup`,size:`wide`,onClose:C,children:e,footer:s,$$slots:{default:!0,footer:!0}})}var F=t(j,2);{let e=g(()=>l(y)===`primary`),t=g(()=>f.t(`reading.entryHexagramLabel`));Cn(F,{get open(){return l(e)},get title(){return l(t)},titleId:`hex-picker-primary`,get value(){return l(p)},onSelect:D,onClose:T})}var R=t(F,2);{let e=g(()=>l(y)===`relating`),t=g(()=>f.t(`reading.relatingLabel`));Cn(R,{get open(){return l(e)},get title(){return l(t)},titleId:`hex-picker-relating`,get value(){return l(h)},onSelect:D,onClose:T})}x(e,A),O()}p([`input`]);var On=f(`<section class="step question-step svelte-1admqai"><label class="field svelte-1admqai"><div class="group-head svelte-1admqai"><!> <!></div> <textarea rows="3"></textarea></label> <div class="casting svelte-1admqai"><div class="casting-title svelte-1admqai"><!></div> <div class="casting-subsection svelte-1admqai"><div class="group-head svelte-1admqai"><!> <!></div> <div class="casting-options svelte-1admqai"></div></div> <div class="casting-subsection svelte-1admqai"><div class="group-head svelte-1admqai"><!> <!></div> <div class="casting-real-actions svelte-1admqai"><!> <!></div></div></div></section> <!> <!> <!> <!> <!>`,1);function kn(e,n){s(n,!0);let r=Y(),u=[`single`,`line`,`all`],f={single:`flow.castSingle`,line:`flow.castLine`,all:`flow.castFull`},p=m(null),h=m(!1),b=m(!1),S=m(!1),C=m(!1),w=m(null);function D(){l(p)?.focus({preventScroll:!0})}function k(e){J(`cast_started`,{method:e}),n.onStartCast(e)}function j(e){if(n.question.trim()){k(e);return}a(w,e,!0)}function F(){a(w,null)}function R(e,t){n.onQuestionInput(t),a(w,null),k(e)}var B={focusInput:D},V=On(),U=L(V),W=d(U),G=d(W),ee=d(G);z(ee,{children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`flow.contextLabel`)]),x(e,n)},$$slots:{default:!0}});var te=t(ee,2);{let e=g(()=>r.t(`flow.contextHelpTitle`));se(te,{get label(){return l(e)},onclick:()=>a(b,!0)})}v(G);var K=t(G,2);o(K),A(K,e=>a(p,e),()=>l(p)),v(W);var ne=t(W,2),q=d(ne);z(d(q),{children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`flow.castingLabel`)]),x(e,n)},$$slots:{default:!0}}),v(q);var re=t(q,2),X=d(re),Z=d(X);z(Z,{size:`row`,children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`flow.virtualCoinsLabel`)]),x(e,n)},$$slots:{default:!0}});var Q=t(Z,2);{let e=g(()=>r.t(`flow.virtualCoinsHelpTitle`));se(Q,{get label(){return l(e)},onclick:()=>a(S,!0)})}v(X);var ie=t(X,2);T(ie,21,()=>u,y,(e,t)=>{H(e,{variant:`primary`,primaryTone:`soft`,class:`cast-btn`,onclick:()=>j(l(t)),children:(e,n)=>{_();var i=P();c(e=>I(i,e),[()=>r.t(f[l(t)])]),x(e,i)},$$slots:{default:!0}})}),v(ie),v(re);var ae=t(re,2),oe=d(ae),ce=d(oe);z(ce,{size:`row`,children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`flow.realCoinsLabel`)]),x(e,n)},$$slots:{default:!0}});var le=t(ce,2);{let e=g(()=>r.t(`flow.realCoinsHelpTitle`));se(le,{get label(){return l(e)},onclick:()=>a(C,!0)})}v(oe);var ue=t(oe,2),de=d(ue);H(de,{variant:`primary`,primaryTone:`soft`,class:`cast-btn`,onclick:()=>j(`real`),children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`flow.castSingle`)]),x(e,n)},$$slots:{default:!0}}),H(t(de,2),{variant:`primary`,primaryTone:`soft`,class:`cast-btn`,onclick:()=>a(h,!0),children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>r.t(`flow.formReady`)]),x(e,n)},$$slots:{default:!0}}),v(ue),v(ae),v(ne),v(U);var fe=t(U,2),pe=e=>{fn(e,{open:!0,get mode(){return l(w)},get question(){return n.question},onClose:F,onCast:R})};N(fe,e=>{l(w)&&e(pe)});var me=t(fe,2);{let e=g(()=>r.t(`flow.contextHelpTitle`)),t=g(()=>r.t(`flow.contextHelpBody`)),n=g(()=>r.t(`reading.helpClose`));Tt(me,{get open(){return l(b)},get title(){return l(e)},get body(){return l(t)},get closeLabel(){return l(n)},onClose:()=>a(b,!1)})}var he=t(me,2);{let e=g(()=>r.t(`flow.virtualCoinsHelpTitle`)),t=g(()=>r.t(`flow.virtualCoinsHelpBody`)),n=g(()=>r.t(`reading.helpClose`));Tt(he,{get open(){return l(S)},get title(){return l(e)},get body(){return l(t)},get closeLabel(){return l(n)},onClose:()=>a(S,!1)})}var ge=t(he,2);{let e=g(()=>r.t(`flow.realCoinsHelpTitle`)),t=g(()=>r.t(`flow.realCoinsHelpBody`)),n=g(()=>r.t(`reading.helpClose`));Tt(ge,{get open(){return l(C)},get title(){return l(e)},get body(){return l(t)},get closeLabel(){return l(n)},onClose:()=>a(C,!1)})}return Dn(t(ge,2),{get open(){return l(h)},get question(){return n.question},get onQuestionInput(){return n.onQuestionInput},onClose:()=>a(h,!1),get onSubmit(){return n.onManualCast}}),c(e=>{M(K,n.question),E(K,`placeholder`,e)},[()=>r.t(`flow.contextPlaceholder`)]),i(`input`,K,e=>n.onQuestionInput(e.currentTarget.value)),x(e,V),O(B)}p([`input`]);var An=f(`<li><span class="line-num svelte-4blq6k"> </span> <span class="line-text svelte-4blq6k"> </span> <!></li>`),jn=f(`<ol class="line-list svelte-4blq6k"></ol>`),Mn=f(`<!> <!>`,1);function Nn(e,n){s(n,!0);let r=Y(),i=g(()=>new Set(n.changingLines)),o=m(!1);var u=Mn(),f=L(u);{let e=e=>{{let t=g(()=>r.t(`reading.changingLinesHelpTitle`));se(e,{get label(){return l(t)},onclick:()=>a(o,!0)})}},s=g(()=>r.t(`reading.changingLinesTitle`,{lines:n.changingLines.join(`, `)}));oe(f,{get title(){return l(s)},summaryEnd:e,children:(e,a)=>{var o=jn();T(o,21,()=>re,y,(e,a)=>{let o=g(()=>l(i).has(l(a))),s=g(()=>n.lines?.[l(a)-1]);var u=An();let f;var p=d(u),m=d(p,!0);v(p);var h=t(p,2),_=d(h,!0);v(h);var y=t(h,2),b=e=>{ke(e,{get line(){return l(s)},compact:!0})};N(y,e=>{l(s)&&e(b)}),v(u),c(e=>{f=C(u,1,`line-item svelte-4blq6k`,null,f,{active:l(o),inactive:!l(o)}),I(m,l(a)),I(_,e)},[()=>U(l(a),r.locale)]),x(e,u)}),v(o),x(e,o)},$$slots:{summaryEnd:!0,default:!0}})}var p=t(f,2);{let e=g(()=>r.t(`reading.changingLinesHelpTitle`)),t=g(()=>r.t(`reading.changingLinesHelpBody`)),n=g(()=>r.t(`reading.helpClose`));Tt(p,{get open(){return l(o)},get title(){return l(e)},get body(){return l(t)},get closeLabel(){return l(n)},onClose:()=>a(o,!1)})}x(e,u),O()}var Pn=f(`<span class="title-row"><span class="title-num"> </span> <!> <span class="title-name"> </span></span>`),Fn=f(`<span class="layer-mark svelte-sbvn3k" aria-hidden="true">¶</span>`),In=f(`<p class="svelte-sbvn3k"><!> </p>`),Ln=f(`<div class="block svelte-sbvn3k"></div>`),Rn=f(`<span class="layer-mark svelte-sbvn3k" aria-hidden="true">¶</span>`),zn=f(`<p class="svelte-sbvn3k"><!> </p>`),Bn=f(`<div class="block svelte-sbvn3k"></div>`),Vn=f(`<span class="layer-mark svelte-sbvn3k" aria-hidden="true">¶</span>`),Hn=f(`<p class="svelte-sbvn3k"><!> </p>`),Un=f(`<div class="block svelte-sbvn3k"></div>`),Wn=f(`<article class="extended"><!> <!> <!></article>`);function Gn(e,n){s(n,!0);let r=`hex-extended-title`,i=g(()=>xt(n.extended.wilhelm_symbolic)),a=g(()=>xt(n.extended.wilhelm_judgment.comments)),o=g(()=>xt(n.extended.wilhelm_image.comments));B(e,{get open(){return n.open},get title(){return n.hexagram.name},titleId:r,get onClose(){return n.onClose},titleContent:e=>{var r=Pn(),i=d(r),a=d(i,!0);v(i);var o=t(i,2);ut(o,{get number(){return n.hexagram.number},compact:!0});var s=t(o,2),l=d(s,!0);v(s),v(r),c(()=>{I(a,n.hexagram.number),I(l,n.hexagram.name)}),x(e,r)},children:(e,n)=>{var s=Wn();E(s,`aria-labelledby`,r);var u=d(s),f=e=>{var n=Ln();T(n,21,()=>l(i),y,(e,n,r)=>{var i=In(),a=d(i),o=e=>{x(e,Fn())};N(a,e=>{r===0&&e(o)});var s=t(a);v(i),c(()=>I(s,` ${l(n)??``}`)),x(e,i)}),v(n),x(e,n)};N(u,e=>{l(i).length>0&&e(f)});var p=t(u,2),m=e=>{var n=Bn();T(n,21,()=>l(a),y,(e,n,r)=>{var i=zn(),a=d(i),o=e=>{x(e,Rn())};N(a,e=>{r===0&&e(o)});var s=t(a);v(i),c(()=>I(s,` ${l(n)??``}`)),x(e,i)}),v(n),x(e,n)};N(p,e=>{l(a).length>0&&e(m)});var h=t(p,2),g=e=>{var n=Un();T(n,21,()=>l(o),y,(e,n,r)=>{var i=Hn(),a=d(i),o=e=>{x(e,Vn())};N(a,e=>{r===0&&e(o)});var s=t(a);v(i),c(()=>I(s,` ${l(n)??``}`)),x(e,i)}),v(n),x(e,n)};N(h,e=>{l(o).length>0&&e(g)}),v(s),x(e,s)},$$slots:{titleContent:!0,default:!0}}),O()}var Kn=f(`<div class="label-row svelte-w45o6e"><p class="label svelte-w45o6e"> </p> <!></div>`),qn=f(`<p class="svelte-w45o6e"> </p>`),Jn=f(`<blockquote class="classical svelte-w45o6e"></blockquote>`),Yn=f(`<span class="layer-mark svelte-w45o6e" aria-hidden="true">¶</span>`),Xn=f(`<p class="svelte-w45o6e"><!> </p>`),Zn=f(`<div><div class="layer-body svelte-w45o6e"></div></div>`),Qn=f(`<footer class="extended-footer svelte-w45o6e"><!></footer>`),$n=f(`<article class="reading svelte-w45o6e"><!> <header class="header svelte-w45o6e"><span class="number svelte-w45o6e"> </span> <div class="title-block"><div class="title-row svelte-w45o6e"><h2 class="svelte-w45o6e"> </h2> <!></div> <p class="meta svelte-w45o6e"><span class="chinese svelte-w45o6e"> </span> <span class="pinyin"> </span></p> <p class="composition svelte-w45o6e"> </p></div> <!></header> <!> <section class="layers svelte-w45o6e"></section> <!></article> <!> <!>`,1);function er(e,n){s(n,!0);let r=Y(),i=m(!1),o=m(!1),f=m(!1),p=m(null),h=0,_=g(()=>ct(n.hexagram.number,r.locale)),b=g(()=>n.helpTitleKey?r.t(n.helpTitleKey):``),S=g(()=>n.helpBodyKey?r.t(n.helpBodyKey):``),E=g(()=>[n.hexagram.reading.scene,n.hexagram.reading.dynamics,n.hexagram.reading.vector]),D=g(()=>[n.hexagram.judgment,n.hexagram.image].filter(Boolean));u(()=>{n.hexagram.number,r.locale,h++,a(p,null),a(o,!1),a(f,!1)});async function k(){if(!l(_)||l(f))return;if(J(`extended_reading_opened`,{hexagram_number:n.hexagram.number}),l(p)){a(o,!0);return}let e=++h;a(f,!0);let t=await st(n.hexagram.number,r.locale);e===h&&(a(p,t,!0),a(f,!1),t&&a(o,!0))}var A=$n(),j=L(A),M=d(j),P=e=>{var r=Kn(),o=d(r),s=d(o,!0);v(o);var u=t(o,2),f=e=>{se(e,{get label(){return l(b)},onclick:()=>{J(`help_opened`,{key:n.helpTitleKey??``}),a(i,!0)}})};N(u,e=>{n.helpTitleKey&&e(f)}),v(r),c(()=>I(s,n.label)),x(e,r)};N(M,e=>{n.label&&e(P)});var R=t(M,2),z=d(R),B=d(z,!0);v(z);var V=t(z,2),H=d(V),U=d(H),W=d(U,!0);v(U);var G=t(U,2),ee=e=>{se(e,{get label(){return l(b)},onclick:()=>{J(`help_opened`,{key:n.helpTitleKey??``}),a(i,!0)}})};N(G,e=>{!n.label&&n.helpTitleKey&&e(ee)}),v(H);var ne=t(H,2),q=d(ne),re=d(q,!0);v(q);var X=t(q,2),Z=d(X,!0);v(X),v(ne);var Q=t(ne,2),ie=d(Q,!0);v(Q),v(V),ut(t(V,2),{get number(){return n.hexagram.number},get label(){return n.hexagram.name}}),v(R);var ae=t(R,2),oe=e=>{var t=Jn();T(t,21,()=>l(D),y,(e,t)=>{var n=F();T(L(n),17,()=>xt(l(t)),y,(e,t)=>{var n=qn(),r=d(n,!0);v(n),c(()=>I(r,l(t))),x(e,n)}),x(e,n)}),v(t),x(e,t)};N(ae,e=>{l(D).length>0&&e(oe)});var ce=t(ae,2);T(ce,21,()=>l(E),y,(e,n,r)=>{var i=Zn();C(i,1,`layer svelte-w45o6e`,null,{},{vector:r===2});var a=d(i);T(a,21,()=>xt(l(n)),y,(e,n,r)=>{var i=Xn(),a=d(i),o=e=>{x(e,Yn())};N(a,e=>{r===0&&e(o)});var s=t(a);v(i),c(()=>I(s,` ${l(n)??``}`)),x(e,i)}),v(a),v(i),x(e,i)}),v(ce);var le=t(ce,2),ue=e=>{var t=Qn(),n=d(t);{let e=g(()=>r.t(`reading.extendedOpen`));K(n,{get label(){return l(e)},onclick:k})}v(t),x(e,t)};N(le,e=>{l(_)&&e(ue)}),v(j),w(j,(e,t)=>te?.(e,t),()=>({event:`hexagram_viewed`,params:{hexagram_number:n.hexagram.number,hexagram_name:n.hexagram.name},key:n.hexagram.number}));var de=t(j,2),fe=e=>{Gn(e,{get open(){return l(o)},get hexagram(){return n.hexagram},get extended(){return l(p)},onClose:()=>a(o,!1)})};N(de,e=>{l(_)&&l(p)&&e(fe)});var pe=t(de,2),me=e=>{{let t=g(()=>r.t(`reading.helpClose`));Tt(e,{get open(){return l(i)},get title(){return l(b)},get body(){return l(S)},get closeLabel(){return l(t)},onClose:()=>a(i,!1)})}};N(pe,e=>{n.helpTitleKey&&e(me)}),c(()=>{I(B,n.hexagram.number),I(W,n.hexagram.name),I(re,n.hexagram.chinese),I(Z,n.hexagram.pinyin),I(ie,n.hexagram.composition)}),x(e,A),O()}var tr=f(`<div class="question-block svelte-1dt6xdp"><p class="question-echo svelte-1dt6xdp"> </p> <!></div>`),nr=f(`<section class="step reading-step svelte-1dt6xdp"><!> <!> <!> <!> <!> <!></section>`);function rr(e,n){s(n,!0);let r=b(n,`relatingHexagram`,3,null),i=Y(),a=g(()=>n.casting.method===`motif`),o=g(()=>!l(a)&&n.casting.changingLines.length>0);var u=nr(),f=d(u),p=e=>{var r=tr(),a=d(r),o=d(a);v(a),H(t(a,2),{variant:`text`,class:`new-cast-link`,get onclick(){return n.onReset},children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>i.t(`flow.newCastLink`)]),x(e,n)},$$slots:{default:!0}}),v(r),c(()=>I(o,`«${n.casting.question??``}»`)),x(e,r)},m=g(()=>!l(a)&&n.casting.question.trim());N(f,e=>{l(m)&&e(p)});var h=t(f,2);{let e=g(()=>i.t(l(o)?`reading.entryHexagramLabel`:`reading.stateHexagramLabel`)),t=g(()=>l(o)?`reading.primaryHexagramHelpTitle`:`reading.stateHexagramHelpTitle`),r=g(()=>l(o)?`reading.primaryHexagramHelpBody`:`reading.stateHexagramHelpBody`);er(h,{get hexagram(){return n.primaryHexagram},get label(){return l(e)},get helpTitleKey(){return l(t)},get helpBodyKey(){return l(r)}})}var y=t(h,2),S=e=>{Nn(e,{get changingLines(){return n.casting.changingLines},get lines(){return n.casting.lines}})};N(y,e=>{l(o)&&e(S)});var C=t(y,2),w=e=>{{let t=g(()=>i.t(`reading.relatingLabel`));er(e,{get hexagram(){return r()},get label(){return l(t)},helpTitleKey:`reading.relatingHexagramHelpTitle`,helpBodyKey:`reading.relatingHexagramHelpBody`})}};N(C,e=>{r()&&e(w)});var T=t(C,2);N(T,e=>{}),H(t(T,2),{variant:`primary`,primaryTone:`soft`,fullWidth:!0,class:`cast-btn new-cast`,get onclick(){return n.onReset},children:(e,t)=>{_();var n=P();c(e=>I(n,e),[()=>i.t(`flow.newCast`)]),x(e,n)},$$slots:{default:!0}}),v(u),x(e,u),O()}function ir(e){return qe(Ge(e)).map(e=>({value:e,kind:`young`,changing:!1}))}function ar(e,t){let n=ir(e);if(!t||t===e)return n;let r=qe(Ge(t));return n.map((e,t)=>({value:e.value,kind:e.kind,changing:e.value!==r[t]}))}function or(e){return e.map(e=>e.changing?{...e,value:e.value===`yang`?`yin`:`yang`,changing:!1}:e)}function sr(e){return e.map((e,t)=>e.changing?t+1:null).filter(e=>e!==null)}function cr(e){if(sr(e).length!==0)return He(or(e))}function lr(e){return new Promise(t=>setTimeout(t,e))}function ur(e){return[{line:e,coin:1},{line:e,coin:2},{line:e,coin:3}]}function dr(){let e=[];for(let t=1;t<=6;t++)e.push(...ur(t));return e}var fr=class{#e=m(`question`);get step(){return l(this.#e)}set step(e){a(this.#e,e,!0)}#t=m(``);get question(){return l(this.#t)}set question(e){a(this.#t,e,!0)}#n=m(`line`);get tossMode(){return l(this.#n)}set tossMode(e){a(this.#n,e,!0)}#r=m(`uk`);get locale(){return l(this.#r)}set locale(e){a(this.#r,e,!0)}#i=m(h([]));get lines(){return l(this.#i)}set lines(e){a(this.#i,e,!0)}#a=m(0);get revealedLines(){return l(this.#a)}set revealedLines(e){a(this.#a,e,!0)}#o=m(null);get casting(){return l(this.#o)}set casting(e){a(this.#o,e,!0)}#s=m(!1);get tossing(){return l(this.#s)}set tossing(e){a(this.#s,e,!0)}#c=m(h([]));get coinRows(){return l(this.#c)}set coinRows(e){a(this.#c,e,!0)}#l=m(h([]));get currentLineCoins(){return l(this.#l)}set currentLineCoins(e){a(this.#l,e,!0)}#u=m(null);get spinningLine(){return l(this.#u)}set spinningLine(e){a(this.#u,e,!0)}#d=m(null);get spinningCoin(){return l(this.#d)}set spinningCoin(e){a(this.#d,e,!0)}runId=0;get activeLine(){return this.lines.length>=6?null:this.spinningLine===null?this.currentLineCoins.length>0?this.lines.length+1:null:this.spinningLine}get lineCoins(){let e=Array.from({length:6});for(let t=0;t<this.coinRows.length;t++)e[t]=[...this.coinRows[t]];if(this.currentLineCoins.length>0){let t=[void 0,void 0,void 0];for(let e=0;e<this.currentLineCoins.length;e++)t[e]=this.currentLineCoins[e];e[this.coinRows.length]=t}return e}get coinGridRevealed(){return Math.max(this.revealedLines,this.lines.length+ +(this.currentLineCoins.length>0))}setLocale(e){this.locale=e}setQuestion(e){this.question=e}async startCast(e){if(!this.question.trim())return;let t=this.startRun();if(this.tossMode=e,this.clearCurrentCast(),e===`all`){await this.runAllToss(t);return}this.isCurrentRun(t)&&(this.step=`toss`)}async startManualCast(e,t,n){let r=e.trim();if(!r||!Je(t)||n!==void 0&&!Je(n))return!1;this.startRun(),this.clearCurrentCast(),this.question=r;let i=ar(t,n),a=sr(i),o=n!==void 0&&n!==t?n:a.length>0?cr(i):void 0,s={id:vt(),createdAt:new Date().toISOString(),question:r,primaryNumber:t,relatingNumber:o,changingLines:a,lines:i,locale:this.locale,method:`manual`};return this.lines=i,this.revealedLines=6,this.coinRows=gt(s),this.currentLineCoins=[],await X.save(s),J(`casting_completed`,{hexagram_number:t,method:`manual`}),this.casting=s,this.step=`reading`,!0}async tossNext(){this.tossMode===`line`?await this.tossNextLine():this.tossMode===`single`&&await this.tossNextCoin()}reset(){this.runId++,this.step=`question`,this.question=``,this.clearCurrentCast(),this.tossing=!1}viewJournalEntry(e){this.runId++,this.question=e.question,this.lines=e.lines,this.revealedLines=6,this.coinRows=gt(e),this.currentLineCoins=[],this.spinningLine=null,this.spinningCoin=null,this.tossing=!1,this.casting=e,this.step=`reading`}viewHexagram(e){if(!Je(e))return;this.runId++;let t=ir(e);this.casting={id:`motif-${e}`,createdAt:new Date().toISOString(),question:``,primaryNumber:e,changingLines:[],lines:t,locale:this.locale,method:`motif`},this.question=``,this.lines=t,this.revealedLines=6,this.coinRows=gt(this.casting),this.currentLineCoins=[],this.spinningLine=null,this.spinningCoin=null,this.tossing=!1,this.step=`reading`}startRun(){return this.runId++,this.runId}isCurrentRun(e){return e===this.runId}ensureCoinRow(e){for(;this.coinRows.length<e;)this.coinRows=[...this.coinRows,[void 0,void 0,void 0]]}setCoinValue(e,t,n){this.ensureCoinRow(e);let r=[...this.coinRows[e-1]];r[t-1]=n,this.coinRows=this.coinRows.map((t,n)=>n===e-1?r:t)}async spinRevealCoin(e,t,n,r){return!this.isCurrentRun(e)||(this.tossing=!0,this.spinningLine=t,this.spinningCoin=n,await lr(660),!this.isCurrentRun(e))?!1:(await ne(),r(),this.spinningCoin=null,this.isCurrentRun(e))}resolvedCoinRows(){return this.coinRows.map(e=>e)}clearCurrentCast(){this.lines=[],this.revealedLines=0,this.casting=null,this.coinRows=[],this.currentLineCoins=[],this.spinningLine=null,this.spinningCoin=null}async runAllToss(e){this.step=`toss`,this.coinRows=[],this.lines=[],this.revealedLines=0;let{lines:t,coinRows:n}=_e();for(let{line:r,coin:i}of dr()){let a=n[r-1][i-1],o=t[r-1];if(!await this.spinRevealCoin(e,r,i,()=>{this.setCoinValue(r,i,a),i===3&&(this.lines=[...this.lines,o],this.revealedLines=r)}))return}this.tossing=!1,this.spinningLine=null,this.isCurrentRun(e)&&await this.finishCasting(t)}async tossNextLine(){if(this.lines.length>=6||this.tossing)return;let e=this.runId,t=this.lines.length+1,n=de();this.currentLineCoins=[];for(let r=1;r<=3;r++){let i=n.coins[r-1];if(!await this.spinRevealCoin(e,t,r,()=>{this.currentLineCoins=[...this.currentLineCoins,i]}))return}this.tossing=!1,this.spinningLine=null,this.coinRows=[...this.coinRows,[...n.coins]],this.currentLineCoins=[];let r=[...this.lines,n.lines[0]];if(this.lines=r,this.revealedLines=r.length,r.length===6){if(await lr(400),!this.isCurrentRun(e))return;await this.finishCasting(r)}}async tossNextCoin(){await this.tossCoin(le())}async tossRealCoin(e){await this.tossCoin(e)}async tossCoin(e){if(this.lines.length>=6||this.tossing)return;let t=this.runId,n=this.lines.length+1,r=this.currentLineCoins.length+1;if(!await this.spinRevealCoin(t,n,r,()=>{this.currentLineCoins=[...this.currentLineCoins,e]}))return;this.tossing=!1,this.spinningLine=null;let i=this.currentLineCoins;if(i.length<3)return;this.coinRows=[...this.coinRows,i];let a=[...this.lines,fe(i)];if(this.lines=a,this.revealedLines=a.length,this.currentLineCoins=[],a.length===6){if(await lr(400),!this.isCurrentRun(t))return;await this.finishCasting(a)}}async finishCasting(e){await ie();let t=He(e),n=cr(e),r=sr(e),i={id:vt(),createdAt:new Date().toISOString(),question:this.question.trim(),primaryNumber:t,relatingNumber:n,changingLines:r,lines:e,coinRows:this.resolvedCoinRows(),locale:this.locale,method:this.tossMode};await X.save(i),J(`casting_completed`,{hexagram_number:t,method:this.tossMode}),this.casting=i,this.step=`reading`}};function pr(){return new fr}function mr(e){let t=e.get(`q`);return t===null?null:t.trim()||null}var hr=f(`<div><!></div>`),gr=f(`<div><!></div>`),_r=f(`<!> <main><header class="site-header svelte-1uha8ag"><div class="site-header__sync svelte-1uha8ag"><!></div> <div class="site-header__locale svelte-1uha8ag"><!></div> <h1 class="logo svelte-1uha8ag">易經</h1> <p class="tagline svelte-1uha8ag"> </p></header> <!> <!> <!> <!></main>`,1);function vr(n,r){s(r,!0);let i=Y(),o=pr(),f=m(null),p=m(null),h=m(!1),_=m(!1),y=m(!1),b=g(()=>o.casting?$(o.casting.primaryNumber,i.locale):null),S=g(()=>o.casting?.relatingNumber?$(o.casting.relatingNumber,i.locale):null),w={get step(){return o.step},get tossMode(){return o.tossMode},get lineCoins(){return o.lineCoins},get lines(){return o.lines},get spinningLine(){return o.spinningLine},get spinningCoin(){return o.spinningCoin},get revealedLines(){return o.revealedLines},get coinGridRevealed(){return o.coinGridRevealed},get activeLine(){return o.activeLine},get tossing(){return o.tossing},onTossNext:()=>o.tossNext(),onRealCoin:e=>o.tossRealCoin(e)};u(()=>{o.setLocale(i.locale)}),u(()=>{if(o.step===`toss`){a(h,!0),document.documentElement.classList.add(`immersive-cast`);let e=requestAnimationFrame(()=>{requestAnimationFrame(()=>{a(_,!0),a(y,!0)})});return()=>cancelAnimationFrame(e)}if(!l(h))return;a(_,!1),a(y,!1);let e=setTimeout(()=>{a(h,!1),document.documentElement.classList.remove(`immersive-cast`)},1500);return()=>clearTimeout(e)}),u(()=>{let e=o.casting;!e||e.method===`motif`||X.entries.some(t=>t.id===e.id)||o.reset()});function T(){let e=mr(ce.url.searchParams);if(!e)return null;let t=new URL(ce.url);return t.searchParams.delete(`q`),R(`${t.pathname}${t.search}${t.hash}`,ce.state),e}k(()=>{let e=!1;return(async()=>{if(await X.load(),e)return;let t=T();t&&(o.setQuestion(t),J(`cast_started`,{method:`all`}),o.startCast(`all`))})(),()=>{e=!0,document.documentElement.classList.remove(`immersive-cast`)}});async function E(t){J(`journal_entry_opened`,{hexagram_number:t.primaryNumber}),o.viewJournalEntry(t),await e(),l(f)?.scrollIntoView({behavior:`smooth`,block:`start`})}async function j(t){J(`motif_viewed`,{hexagram_number:t}),o.viewHexagram(t),await e(),l(f)?.scrollIntoView({behavior:`smooth`,block:`start`})}async function M(){o.reset(),await e(),l(p)?.focusInput(),window.scrollTo({top:0,left:0,behavior:`smooth`})}async function P(t){return await o.startManualCast(t.question,t.primaryNumber,t.relatingNumber)?(await e(),l(f)?.scrollIntoView({behavior:`smooth`,block:`start`}),!0):!1}var F=_r(),z=L(F),B=e=>{var t=hr();let n;var r=d(t);{let e=g(()=>l(_)?o.step:`toss`);ht(r,D(()=>w,{get step(){return l(e)},immersive:!0}))}v(t),c(()=>n=C(t,1,`cast-overlay svelte-1uha8ag`,null,n,{"cast-overlay--visible":l(_)})),x(e,t)};N(z,e=>{l(h)&&e(B)});var V=t(z,2);let H;var U=d(V),W=d(U);un(d(W),{}),v(W);var G=t(W,2);an(d(G),{}),v(G);var ee=t(G,4),te=d(ee,!0);v(ee),v(U);var K=t(U,2),ne=e=>{A(kn(e,{get question(){return o.question},onQuestionInput:e=>o.setQuestion(e),onStartCast:e=>o.startCast(e),onManualCast:P}),e=>a(p,e,!0),()=>l(p))};N(K,e=>{o.step===`question`&&e(ne)});var q=t(K,2),re=e=>{ht(e,D(()=>w))};N(q,e=>{o.step===`reading`&&o.casting?.method!==`motif`&&e(re)});var Z=t(q,2),Q=e=>{var t=gr();rr(d(t),{get casting(){return o.casting},get primaryHexagram(){return l(b)},get relatingHexagram(){return l(S)},onReset:M}),v(t),A(t,e=>a(f,e),()=>l(f)),x(e,t)};N(Z,e=>{o.step===`reading`&&o.casting&&l(b)&&e(Q)});var ie=t(Z,2);{let e=g(()=>o.step===`reading`&&o.casting?.method!==`motif`?o.casting?.id:null),t=g(()=>o.step===`reading`&&o.casting?.method===`motif`?o.casting.primaryNumber:null);tn(ie,{get journal(){return X.entries},get activeCastingId(){return l(e)},get activeMotifNumber(){return l(t)},onEntrySelect:E,onMotifSelect:j})}v(V),c(e=>{H=C(V,1,`main svelte-1uha8ag`,null,H,{"main--faded":l(y)}),I(te,e)},[()=>i.t(`app.tagline`)]),x(n,F),O()}export{vr as component};