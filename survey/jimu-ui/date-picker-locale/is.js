define((function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1523)}({1523:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(r(1524)),a=o(r(1525)),i=o(r(1526)),u=o(r(1527)),d=o(r(1528));function o(e){return e&&e.__esModule?e:{default:e}}var l={formatDistance:n.default,formatLong:a.default,formatRelative:i.default,localize:u.default,match:d.default,options:{weekStartsOn:1,firstWeekContainsDate:4}};t.default=l,e.exports=t.default},1524:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){var a;r=r||{},a="string"==typeof n[e]?n[e]:1===t?n[e].one:n[e].other.replace("{{count}}",t);if(r.addSuffix)return r.comparison>0?"í "+a:a+" síðan";return a};var n={lessThanXSeconds:{one:"minna en 1 sekúnda",other:"minna en {{count}} sekúndur"},xSeconds:{one:"1 sekúnda",other:"{{count}} sekúndur"},halfAMinute:"hálf mínúta",lessThanXMinutes:{one:"minna en 1 mínúta",other:"minna en {{count}} mínútur"},xMinutes:{one:"1 mínúta",other:"{{count}} mínútur"},aboutXHours:{one:"u.þ.b. 1 klukkustund",other:"u.þ.b. {{count}} klukkustundir"},xHours:{one:"1 klukkustund",other:"{{count}} klukkustundir"},xDays:{one:"1 dagur",other:"{{count}} dagar"},aboutXMonths:{one:"u.þ.b. 1 mánuður",other:"u.þ.b. {{count}} mánuðir"},xMonths:{one:"1 mánuður",other:"{{count}} mánuðir"},aboutXYears:{one:"u.þ.b. 1 ár",other:"u.þ.b. {{count}} ár"},xYears:{one:"1 ár",other:"{{count}} ár"},overXYears:{one:"meira en 1 ár",other:"meira en {{count}} ár"},almostXYears:{one:"næstum 1 ár",other:"næstum {{count}} ár"}};e.exports=t.default},1525:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,a=(n=r(5))&&n.__esModule?n:{default:n};var i={date:(0,a.default)({formats:{full:"EEEE, do MMMM y",long:"do MMMM y",medium:"do MMM y",short:"d.MM.y"},defaultWidth:"full"}),time:(0,a.default)({formats:{full:"'kl'. HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},defaultWidth:"full"}),dateTime:(0,a.default)({formats:{full:"{{date}} 'kl.' {{time}}",long:"{{date}} 'kl.' {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"},defaultWidth:"full"})};t.default=i,e.exports=t.default},1526:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,a){return n[e]};var n={lastWeek:"'síðasta' dddd 'kl.' p",yesterday:"'í gær kl.' p",today:"'í dag kl.' p",tomorrow:"'á morgun kl.' p",nextWeek:"dddd 'kl.' p",other:"L"};e.exports=t.default},1527:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,a=(n=r(6))&&n.__esModule?n:{default:n};var i={ordinalNumber:function(e,t){return Number(e)+"."},era:(0,a.default)({values:{narrow:["f.Kr.","e.Kr."],abbreviated:["f.Kr.","e.Kr."],wide:["fyrir Krist","eftir Krist"]},defaultWidth:"wide"}),quarter:(0,a.default)({values:{narrow:["1","2","3","4"],abbreviated:["1F","2F","3F","4F"],wide:["1. fjórðungur","2. fjórðungur","3. fjórðungur","4. fjórðungur"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:(0,a.default)({values:{narrow:["J","F","M","A","M","J","J","Á","S","Ó","N","D"],abbreviated:["jan.","feb.","mars","apríl","maí","júní","júlí","ágúst","sept.","okt.","nóv.","des."],wide:["janúar","febrúar","mars","apríl","maí","júní","júlí","ágúst","september","október","nóvember","desember"]},defaultWidth:"wide"}),day:(0,a.default)({values:{narrow:["S","M","Þ","M","F","F","L"],short:["Su","Má","Þr","Mi","Fi","Fö","La"],abbreviated:["sun.","mán.","þri.","mið.","fim.","fös.","lau"],wide:["sunnudagur","mánudagur","þriðjudagur","miðvikudagur","fimmtudagur","föstudagur","laugardagur"]},defaultWidth:"wide"}),dayPeriod:(0,a.default)({values:{narrow:{am:"f",pm:"e",midnight:"miðnætti",noon:"hádegi",morning:"morgunn",afternoon:"síðdegi",evening:"kvöld",night:"nótt"},abbreviated:{am:"f.h.",pm:"e.h.",midnight:"miðnætti",noon:"hádegi",morning:"morgunn",afternoon:"síðdegi",evening:"kvöld",night:"nótt"},wide:{am:"fyrir hádegi",pm:"eftir hádegi",midnight:"miðnætti",noon:"hádegi",morning:"morgunn",afternoon:"síðdegi",evening:"kvöld",night:"nótt"}},defaultWidth:"wide",formattingValues:{narrow:{am:"f",pm:"e",midnight:"á miðnætti",noon:"á hádegi",morning:"að morgni",afternoon:"síðdegis",evening:"um kvöld",night:"um nótt"},abbreviated:{am:"f.h.",pm:"e.h.",midnight:"á miðnætti",noon:"á hádegi",morning:"að morgni",afternoon:"síðdegis",evening:"um kvöld",night:"um nótt"},wide:{am:"fyrir hádegi",pm:"eftir hádegi",midnight:"á miðnætti",noon:"á hádegi",morning:"að morgni",afternoon:"síðdegis",evening:"um kvöld",night:"um nótt"}},defaultFormattingWidth:"wide"})};t.default=i,e.exports=t.default},1528:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(r(7)),a=i(r(8));function i(e){return e&&e.__esModule?e:{default:e}}var u={ordinalNumber:(0,n.default)({matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:(0,a.default)({matchPatterns:{narrow:/^(f\.Kr\.|e\.Kr\.)/i,abbreviated:/^(f\.Kr\.|e\.Kr\.)/i,wide:/^(fyrir Krist|eftir Krist)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^(f\.Kr\.|e\.Kr\.)/i]},defaultParseWidth:"any"}),quarter:(0,a.default)({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234] fjórðungur/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,a.default)({matchPatterns:{narrow:/^[jfmásónd]/i,abbreviated:/^(jan\.|feb\.|mars\.|apríl\.|maí|júní|júlí|águst|sep\.|oct\.|nov\.|dec\.)/i,wide:/^(januar|februar|mars|apríl|maí|júní|júlí|águst|september|október|nóvember|desember)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^á/i,/^s/i,/^ó/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^maí/i,/^jún/i,/^júl/i,/^áu/i,/^s/i,/^ó/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:(0,a.default)({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|má|þr|mi|fi|fö|la)/i,abbreviated:/^(sun|mán|þri|mið|fim|fös|lau)\.?/i,wide:/^(sunnudagur|mánudagur|þriðjudagur|miðvikudagur|fimmtudagur|föstudagur|laugardagur)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^þ/i,/^m/i,/^f/i,/^f/i,/^l/i],any:[/^su/i,/^má/i,/^þr/i,/^mi/i,/^fi/i,/^fö/i,/^la/i]},defaultParseWidth:"any"}),dayPeriod:(0,a.default)({matchPatterns:{narrow:/^(f|e|síðdegis|(á|að|um) (morgni|kvöld|nótt|miðnætti))/i,any:/^(fyrir hádegi|eftir hádegi|[ef]\.?h\.?|síðdegis|morgunn|(á|að|um) (morgni|kvöld|nótt|miðnætti))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^f/i,pm:/^e/i,midnight:/^mi/i,noon:/^há/i,morning:/morgunn/i,afternoon:/síðdegi/i,evening:/kvöld/i,night:/nótt/i}},defaultParseWidth:"any"})};t.default=u,e.exports=t.default},5:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var r=t||{},n=r.width?String(r.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}},e.exports=t.default},6:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,r){var n,a=r||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,u=a.width?String(a.width):i;n=e.formattingValues[u]||e.formattingValues[i]}else{var d=e.defaultWidth,o=a.width?String(a.width):e.defaultWidth;n=e.values[o]||e.values[d]}return n[e.argumentCallback?e.argumentCallback(t):t]}},e.exports=t.default},7:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,r){var n=String(t),a=r||{},i=n.match(e.matchPattern);if(!i)return null;var u=i[0],d=n.match(e.parsePattern);if(!d)return null;var o=e.valueCallback?e.valueCallback(d[0]):d[0];return{value:o=a.valueCallback?a.valueCallback(o):o,rest:n.slice(u.length)}}},e.exports=t.default},8:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,r){var n=String(t),a=r||{},i=a.width,u=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth],d=n.match(u);if(!d)return null;var o,l=d[0],f=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];return o="[object Array]"===Object.prototype.toString.call(f)?f.findIndex((function(e){return e.test(n)})):function(e,t){for(var r in e)if(e.hasOwnProperty(r)&&t(e[r]))return r}(f,(function(e){return e.test(n)})),o=e.valueCallback?e.valueCallback(o):o,{value:o=a.valueCallback?a.valueCallback(o):o,rest:n.slice(l.length)}}},e.exports=t.default}})}));