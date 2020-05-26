define((function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1420)}({1420:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=d(n(1421)),a=d(n(1422)),o=d(n(1423)),u=d(n(1424)),i=d(n(1425));function d(e){return e&&e.__esModule?e:{default:e}}var l={formatDistance:r.default,formatLong:a.default,formatRelative:o.default,localize:u.default,match:i.default,options:{weekStartsOn:1,firstWeekContainsDate:4}};t.default=l,e.exports=t.default},1421:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){n=n||{};var a,o=r[e];a="object"==typeof o.other?"other":1===t?"one":t>1&&t<5||0===t?"few":"many";var u,i=!0===n.addSuffix,d=n.comparison;u=i&&-1===d?"past":i&&1===d?"future":"regular";return o[a][u].replace("{{count}}",t)};var r={lessThanXSeconds:{one:{regular:"méně než vteřina",past:"před méně než vteřinou",future:"za méně než vteřinu"},few:{regular:"méně než {{count}} vteřiny",past:"před méně než {{count}} vteřinami",future:"za méně než {{count}} vteřiny"},many:{regular:"méně než {{count}} vteřin",past:"před méně než {{count}} vteřinami",future:"za méně než {{count}} vteřin"}},xSeconds:{one:{regular:"vteřina",past:"před vteřinou",future:"za vteřinu"},few:{regular:"{{count}} vteřiny",past:"před {{count}} vteřinami",future:"za {{count}} vteřiny"},many:{regular:"{{count}} vteřin",past:"před {{count}} vteřinami",future:"za {{count}} vteřin"}},halfAMinute:{other:{regular:"půl minuty",past:"před půl minutou",future:"za půl minuty"}},lessThanXMinutes:{one:{regular:"méně než minuta",past:"před méně než minutou",future:"za méně než minutu"},few:{regular:"méně než {{count}} minuty",past:"před méně než {{count}} minutami",future:"za méně než {{count}} minuty"},many:{regular:"méně než {{count}} minut",past:"před méně než {{count}} minutami",future:"za méně než {{count}} minut"}},xMinutes:{one:{regular:"minuta",past:"před minutou",future:"za minutu"},few:{regular:"{{count}} minuty",past:"před {{count}} minutami",future:"za {{count}} minuty"},many:{regular:"{{count}} minut",past:"před {{count}} minutami",future:"za {{count}} minut"}},aboutXHours:{one:{regular:"přibližně hodina",past:"přibližně před hodinou",future:"přibližně za hodinu"},few:{regular:"přibližně {{count}} hodiny",past:"přibližně před {{count}} hodinami",future:"přibližně za {{count}} hodiny"},many:{regular:"přibližně {{count}} hodin",past:"přibližně před {{count}} hodinami",future:"přibližně za {{count}} hodin"}},xHours:{one:{regular:"hodina",past:"před hodinou",future:"za hodinu"},few:{regular:"{{count}} hodiny",past:"před {{count}} hodinami",future:"za {{count}} hodiny"},many:{regular:"{{count}} hodin",past:"před {{count}} hodinami",future:"za {{count}} hodin"}},xDays:{one:{regular:"den",past:"před dnem",future:"za den"},few:{regular:"{{count}} dni",past:"před {{count}} dny",future:"za {{count}} dny"},many:{regular:"{{count}} dní",past:"před {{count}} dny",future:"za {{count}} dní"}},aboutXMonths:{one:{regular:"přibližně měsíc",past:"přibližně před měsícem",future:"přibližně za měsíc"},few:{regular:"přibližně {{count}} měsíce",past:"přibližně před {{count}} měsíci",future:"přibližně za {{count}} měsíce"},many:{regular:"přibližně {{count}} měsíců",past:"přibližně před {{count}} měsíci",future:"přibližně za {{count}} měsíců"}},xMonths:{one:{regular:"měsíc",past:"před měsícem",future:"za měsíc"},few:{regular:"{{count}} měsíce",past:"před {{count}} měsíci",future:"za {{count}} měsíce"},many:{regular:"{{count}} měsíců",past:"před {{count}} měsíci",future:"za {{count}} měsíců"}},aboutXYears:{one:{regular:"přibližně rok",past:"přibližně před rokem",future:"přibližně za rok"},few:{regular:"přibližně {{count}} roky",past:"přibližně před {{count}} roky",future:"přibližně za {{count}} roky"},many:{regular:"přibližně {{count}} roků",past:"přibližně před {{count}} roky",future:"přibližně za {{count}} roků"}},xYears:{one:{regular:"rok",past:"před rokem",future:"za rok"},few:{regular:"{{count}} roky",past:"před {{count}} roky",future:"za {{count}} roky"},many:{regular:"{{count}} roků",past:"před {{count}} roky",future:"za {{count}} roků"}},overXYears:{one:{regular:"více než rok",past:"před více než rokem",future:"za více než rok"},few:{regular:"více než {{count}} roky",past:"před více než {{count}} roky",future:"za více než {{count}} roky"},many:{regular:"více než {{count}} roků",past:"před více než {{count}} roky",future:"za více než {{count}} roků"}},almostXYears:{one:{regular:"skoro rok",past:"skoro před rokem",future:"skoro za rok"},few:{regular:"skoro {{count}} roky",past:"skoro před {{count}} roky",future:"skoro za {{count}} roky"},many:{regular:"skoro {{count}} roků",past:"skoro před {{count}} roky",future:"skoro za {{count}} roků"}}};e.exports=t.default},1422:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,a=(r=n(5))&&r.__esModule?r:{default:r};var o={date:(0,a.default)({formats:{full:"EEEE, d. MMMM yyyy",long:"d. MMMM yyyy",medium:"d.M.yyyy",short:"d.M.yy"},defaultWidth:"full"}),time:(0,a.default)({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:(0,a.default)({formats:{full:"{{date}} 'v' {{time}}",long:"{{date}} 'v' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})};t.default=o,e.exports=t.default},1423:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n,r){var o=a[e];if("function"==typeof o)return o(t,n,r);return o};var r=["neděli","pondělí","úterý","středu","čtvrtek","pátek","sobotu"],a={lastWeek:"'poslední' eeee 've' p",yesterday:"'včera v' p",today:"'dnes v' p",tomorrow:"'zítra v' p",nextWeek:function(e,t,n){var a=e.getUTCDay();return"'v "+r[a]+" o' p"},other:"P"};e.exports=t.default},1424:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,a=(r=n(6))&&r.__esModule?r:{default:r};var o={ordinalNumber:function(e){return Number(e)+"."},era:(0,a.default)({values:{narrow:["př. n. l.","n. l."],abbreviated:["př. n. l.","n. l."],wide:["před naším letopočtem","našeho letopočtu"]},defaultWidth:"wide"}),quarter:(0,a.default)({values:{narrow:["1","2","3","4"],abbreviated:["1. čtvrtletí","2. čtvrtletí","3. čtvrtletí","4. čtvrtletí"],wide:["1. čtvrtletí","2. čtvrtletí","3. čtvrtletí","4. čtvrtletí"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:(0,a.default)({values:{narrow:["L","Ú","B","D","K","Č","Č","S","Z","Ř","L","P"],abbreviated:["led","úno","bře","dub","kvě","čvn","čvc","srp","zář","říj","lis","pro"],wide:["leden","únor","březen","duben","květen","červen","červenec","srpen","září","říjen","listopad","prosinec"]},defaultWidth:"wide",formattingValues:{narrow:["L","Ú","B","D","K","Č","Č","S","Z","Ř","L","P"],abbreviated:["led","úno","bře","dub","kvě","čvn","čvc","srp","zář","říj","lis","pro"],wide:["ledna","února","března","dubna","května","června","července","srpna","září","října","listopadu","prosince"]},defaultFormattingWidth:"wide"}),day:(0,a.default)({values:{narrow:["ne","po","út","st","čt","pá","so"],short:["ne","po","út","st","čt","pá","so"],abbreviated:["ned","pon","úte","stř","čtv","pát","sob"],wide:["neděle","pondělí","úterý","středa","čtvrtek","pátek","sobota"]},defaultWidth:"wide"}),dayPeriod:(0,a.default)({values:{narrow:{am:"odp.",pm:"dop.",midnight:"půlnoc",noon:"poledne",morning:"ráno",afternoon:"odpoledne",evening:"večer",night:"noc"},abbreviated:{am:"odp.",pm:"dop.",midnight:"půlnoc",noon:"poledne",morning:"ráno",afternoon:"odpoledne",evening:"večer",night:"noc"},wide:{am:"odpoledne",pm:"dopoledne",midnight:"půlnoc",noon:"poledne",morning:"ráno",afternoon:"odpoledne",evening:"večer",night:"noc"}},defaultWidth:"wide",formattingValues:{narrow:{am:"odp.",pm:"dop.",midnight:"půlnoc",noon:"poledne",morning:"ráno",afternoon:"odpoledne",evening:"večer",night:"noc"},abbreviated:{am:"odp.",pm:"dop.",midnight:"půlnoc",noon:"poledne",morning:"ráno",afternoon:"odpoledne",evening:"večer",night:"noc"},wide:{am:"odpoledne",pm:"dopoledne",midnight:"půlnoc",noon:"poledne",morning:"ráno",afternoon:"odpoledne",evening:"večer",night:"noc"}},defaultFormattingWidth:"wide"})};t.default=o,e.exports=t.default},1425:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n(8));function a(e){return e&&e.__esModule?e:{default:e}}var o={ordinalNumber:(0,a(n(7)).default)({matchPattern:/^(\d+)\.?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:(0,r.default)({matchPatterns:{narrow:/^(p[řr]ed Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,abbreviated:/^(pe[řr]ed Kr\.|pe[řr]ed n\. l\.|po Kr\.|n\. l\.)/i,wide:/^(p[řr]ed Kristem|pred na[šs][íi]m letopo[čc]tem|po Kristu|na[šs]eho letopo[čc]tu)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^p[řr]/i,/^(po|n)/i]},defaultParseWidth:"any"}),quarter:(0,r.default)({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^[1234]\. [čc]tvrtlet[íi]/i,wide:/^[1234]\. [čc]tvrtlet[íi]/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,r.default)({matchPatterns:{narrow:/^[lúubdkčcszřrlp]/i,abbreviated:/^(led|[úu]no|b[řr]e|dub|kv[ěe]|[čc]vn|[čc]vc|srp|z[áa][řr]|[řr][íi]j|lis|pro)/i,wide:/^(leden|ledna|[úu]nora?|b[řr]ezen|b[řr]ezna|duben|dubna|kv[ěe]ten|kv[ěe]tna|[čc]erven|[čc]ervna|[čc]ervenec|[čc]ervence|srpen|srpna|z[áa][řr][íi]|[řr][íi]jen|[řr][íi]jna|listopada?|prosinec|prosince)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^l/i,/^[úu]/i,/^b/i,/^d/i,/^k/i,/^[čc]/i,/^[čc]/i,/^s/i,/^z/i,/^[řr]/i,/^l/i,/^p/i],any:[/^led/i,/^[úu]n/i,/^brez/i,/^dub/i,/^kvet/i,/^[čc]erv/i,/^[čc]erven/i,/^srp/i,/^z[áa]r/i,/^[řr][íi]j/i,/^list/i,/^pros/i]},defaultParseWidth:"any"}),day:(0,r.default)({matchPatterns:{narrow:/^[npuúsčps]/i,short:/^(ne|po|[úu]t|st|[čc]t|p[áa]|so)/i,abbreviated:/^(ne|po|[úu]t|st|[čc]t|p[áa]|so)/i,wide:/^(ned[ěe]le|pond[ěe]l[íi]|[úu]ter[ýy]|st[řr]eda|[čc]tvrtek|p[áa]tek|sobota)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^n/i,/^p/i,/^[úu]/i,/^s/i,/^[čc]/i,/^p/i,/^s/i],any:[/^ne/i,/^po/i,/^ut/i,/^st/i,/^[čc]t/i,/^p/i,/^so/i]},defaultParseWidth:"any"}),dayPeriod:(0,r.default)({matchPatterns:{narrow:/^((dopoledne|odpoledne)|půlnoc|poledne|(r[áa]no|odpoledne|ve[čc]er|(v )?noci))/i,any:/^((dopoledne|odpoledne)|půlnoc|poledne|(r[áa]no|odpoledne|ve[čc]er|(v )?noci))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^dopoledne/i,pm:/^odpoledne/i,midnight:/^p[ůu]lnoc/i,noon:/^poledne/i,morning:/r[áa]no/i,afternoon:/odpoledne/i,evening:/ve[čc]er/i,night:/noc/i}},defaultParseWidth:"any"})};t.default=o,e.exports=t.default},5:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var n=t||{},r=n.width?String(n.width):e.defaultWidth;return e.formats[r]||e.formats[e.defaultWidth]}},e.exports=t.default},6:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,u=a.width?String(a.width):o;r=e.formattingValues[u]||e.formattingValues[o]}else{var i=e.defaultWidth,d=a.width?String(a.width):e.defaultWidth;r=e.values[d]||e.values[i]}return r[e.argumentCallback?e.argumentCallback(t):t]}},e.exports=t.default},7:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,n){var r=String(t),a=n||{},o=r.match(e.matchPattern);if(!o)return null;var u=o[0],i=r.match(e.parsePattern);if(!i)return null;var d=e.valueCallback?e.valueCallback(i[0]):i[0];return{value:d=a.valueCallback?a.valueCallback(d):d,rest:r.slice(u.length)}}},e.exports=t.default},8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,n){var r=String(t),a=n||{},o=a.width,u=o&&e.matchPatterns[o]||e.matchPatterns[e.defaultMatchWidth],i=r.match(u);if(!i)return null;var d,l=i[0],p=o&&e.parsePatterns[o]||e.parsePatterns[e.defaultParseWidth];return d="[object Array]"===Object.prototype.toString.call(p)?p.findIndex((function(e){return e.test(r)})):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}(p,(function(e){return e.test(r)})),d=e.valueCallback?e.valueCallback(d):d,{value:d=a.valueCallback?a.valueCallback(d):d,rest:r.slice(l.length)}}},e.exports=t.default}})}));