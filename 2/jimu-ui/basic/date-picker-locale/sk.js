define((function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1795)}({1795:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=l(r(1796)),a=l(r(1797)),o=l(r(1798)),u=l(r(1799)),i=l(r(1800));function l(e){return e&&e.__esModule?e:{default:e}}var d={formatDistance:n.default,formatLong:a.default,formatRelative:o.default,localize:u.default,match:i.default,options:{weekStartsOn:1,firstWeekContainsDate:4}};t.default=d,e.exports=t.default},1796:function(e,t,r){"use strict";function n(e,t,r){var n=function(e,t){return 1===t?e.one:t>=2&&t<=4?e.twoFour:e.other}(e,t);return(n[r]||n).replace("{{count}}",t)}function a(e){var t="";return"almost"===e&&(t="takmer"),"about"===e&&(t="približne"),t.length>0?t+" ":""}function o(e){var t="";return"lessThan"===e&&(t="menej než"),"over"===e&&(t="viac než"),t.length>0?t+" ":""}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){r=r||{};var i=function(e){return["lessThan","about","over","almost"].filter((function(t){return!!e.match(new RegExp("^"+t))}))[0]}(e)||"",l=(s=e.substring(i.length),s.charAt(0).toLowerCase()+s.slice(1)),d=u[l];var s;if(!r.addSuffix)return a(i)+o(i)+n(d,t,"regular");return r.comparison>0?a(i)+"o "+o(i)+n(d,t,"future"):a(i)+"pred "+o(i)+n(d,t,"past")};var u={xSeconds:{one:{regular:"sekunda",past:"sekundou",future:"sekundu"},twoFour:{regular:"{{count}} sekundy",past:"{{count}} sekundami",future:"{{count}} sekundy"},other:{regular:"{{count}} sekúnd",past:"{{count}} sekundami",future:"{{count}} sekúnd"}},halfAMinute:{other:{regular:"pol minúty",past:"pol minútou",future:"pol minúty"}},xMinutes:{one:{regular:"minúta",past:"minútou",future:"minútu"},twoFour:{regular:"{{count}} minúty",past:"{{count}} minútami",future:"{{count}} minúty"},other:{regular:"{{count}} minút",past:"{{count}} minútami",future:"{{count}} minút"}},xHours:{one:{regular:"hodina",past:"hodinou",future:"hodinu"},twoFour:{regular:"{{count}} hodiny",past:"{{count}} hodinami",future:"{{count}} hodiny"},other:{regular:"{{count}} hodín",past:"{{count}} hodinami",future:"{{count}} hodín"}},xDays:{one:{regular:"deň",past:"dňom",future:"deň"},twoFour:{regular:"{{count}} dni",past:"{{count}} dňami",future:"{{count}} dni"},other:{regular:"{{count}} dní",past:"{{count}} dňami",future:"{{count}} dní"}},xMonths:{one:{regular:"mesiac",past:"mesiacom",future:"mesiac"},twoFour:{regular:"{{count}} mesiace",past:"{{count}} mesiacmi",future:"{{count}} mesiace"},other:{regular:"{{count}} mesiacov",past:"{{count}} mesiacmi",future:"{{count}} mesiacov"}},xYears:{one:{regular:"rok",past:"rokom",future:"rok"},twoFour:{regular:"{{count}} roky",past:"{{count}} rokmi",future:"{{count}} roky"},other:{regular:"{{count}} rokov",past:"{{count}} rokmi",future:"{{count}} rokov"}}};e.exports=t.default},1797:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,a=(n=r(5))&&n.__esModule?n:{default:n};var o={date:(0,a.default)({formats:{full:"EEEE d. MMMM y",long:"d. MMMM y",medium:"d. M. y",short:"d. M. y"},defaultWidth:"full"}),time:(0,a.default)({formats:{full:"H:mm:ss zzzz",long:"H:mm:ss z",medium:"H:mm:ss",short:"H:mm"},defaultWidth:"full"}),dateTime:(0,a.default)({formats:{full:"{{date}}, {{time}}",long:"{{date}}, {{time}}",medium:"{{date}}, {{time}}",short:"{{date}} {{time}}"},defaultWidth:"full"})};t.default=o,e.exports=t.default},1798:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,n){var a=i[e];if("function"==typeof a)return a(t,r,n);return a};var n,a=(n=r(67))&&n.__esModule?n:{default:n};var o=["nedeľu","pondelok","utorok","stredu","štvrtok","piatok","sobotu"];function u(e){return 4===e?"'vo' eeee 'o' p":"'v "+o[e]+" o' p"}var i={lastWeek:function(e,t,r){var n=e.getUTCDay();return(0,a.default)(e,t,r)?u(n):function(e){var t=o[e];switch(e){case 0:case 4:case 6:return"'minulú "+t+" o' p";default:return"'minulý' eeee 'o' p"}}(n)},yesterday:"'včera o' p",today:"'dnes o' p",tomorrow:"'zajtra o' p",nextWeek:function(e,t,r){var n=e.getUTCDay();return(0,a.default)(e,t,r)?u(n):function(e){var t=o[e];switch(e){case 0:case 4:case 6:return"'budúcu' "+t+" 'o' p";default:return"'budúci' eeee 'o' p"}}(n)},other:"P"};e.exports=t.default},1799:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,a=(n=r(6))&&n.__esModule?n:{default:n};var o={ordinalNumber:function(e,t){return Number(e)+"."},era:(0,a.default)({values:{narrow:["pred Kr.","po Kr."],abbreviated:["pred Kr.","po Kr."],wide:["pred Kristom","po Kristovi"]}}),quarter:(0,a.default)({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1. štvrťrok","2. štvrťrok","3. štvrťrok","4. štvrťrok"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:(0,a.default)({values:{narrow:["j","f","m","a","m","j","j","a","s","o","n","d"],abbreviated:["jan","feb","mar","apr","máj","jún","júl","aug","sep","okt","nov","dec"],wide:["január","február","marec","apríl","máj","jún","júl","august","september","október","november","december"]},defaultWidth:"wide",formattingValues:{narrow:["j","f","m","a","m","j","j","a","s","o","n","d"],abbreviated:["jan","feb","mar","apr","máj","jún","júl","aug","sep","okt","nov","dec"],wide:["januára","februára","marca","apríla","mája","júna","júla","augusta","septembra","októbra","novembra","decembra"]},defaultFormattingWidth:"wide"}),day:(0,a.default)({values:{narrow:["n","p","u","s","š","p","s"],short:["ne","po","ut","st","št","pi","so"],abbreviated:["ne","po","ut","st","št","pi","so"],wide:["nedeľa","pondelok","utorok","streda","štvrtok","piatok","sobota"]},defaultWidth:"wide"}),dayPeriod:(0,a.default)({values:{narrow:{am:"AM",pm:"PM",midnight:"poln.",noon:"pol.",morning:"ráno",afternoon:"pop.",evening:"več.",night:"noc"},abbreviated:{am:"AM",pm:"PM",midnight:"poln.",noon:"pol.",morning:"ráno",afternoon:"popol.",evening:"večer",night:"noc"},wide:{am:"AM",pm:"PM",midnight:"polnoc",noon:"poludnie",morning:"ráno",afternoon:"popoludnie",evening:"večer",night:"noc"}},defaultWidth:"wide",formattingValues:{narrow:{am:"AM",pm:"PM",midnight:"o poln.",noon:"nap.",morning:"ráno",afternoon:"pop.",evening:"več.",night:"v n."},abbreviated:{am:"AM",pm:"PM",midnight:"o poln.",noon:"napol.",morning:"ráno",afternoon:"popol.",evening:"večer",night:"v noci"},wide:{am:"AM",pm:"PM",midnight:"o polnoci",noon:"napoludnie",morning:"ráno",afternoon:"popoludní",evening:"večer",night:"v noci"}},defaultFormattingWidth:"wide"})};t.default=o,e.exports=t.default},1800:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(r(7)),a=o(r(8));function o(e){return e&&e.__esModule?e:{default:e}}var u={ordinalNumber:(0,n.default)({matchPattern:/^(\d+)\.?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:(0,a.default)({matchPatterns:{narrow:/^(pred Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,abbreviated:/^(pred Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,wide:/^(pred Kristom|pred na[šs][íi]m letopo[čc]tom|po Kristovi|n[áa][šs]ho letopo[čc]tu)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^pr/i,/^(po|n)/i]},defaultParseWidth:"any"}),quarter:(0,a.default)({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234]\. [šs]tvr[ťt]rok/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,a.default)({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|m[áa]j|j[úu]n|j[úu]l|aug|sep|okt|nov|dec)/i,wide:/^(janu[áa]ra?|febru[áa]ra?|(marec|marca)|apr[íi]la?|m[áa]ja?|j[úu]na?|j[úu]la?|augusta?|(september|septembra)|(okt[óo]ber|okt[óo]bra)|(november|novembra)|(december|decembra))/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^m[áa]j/i,/^j[úu]n/i,/^j[úu]l/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:(0,a.default)({matchPatterns:{narrow:/^[npusšp]/i,short:/^(ne|po|ut|st|št|pi|so)/i,abbreviated:/^(ne|po|ut|st|št|pi|so)/i,wide:/^(nede[ľl]a|pondelok|utorok|streda|[šs]tvrtok|piatok|sobota])/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^n/i,/^p/i,/^u/i,/^s/i,/^š/i,/^p/i,/^s/i],any:[/^n/i,/^po/i,/^u/i,/^st/i,/^(št|stv)/i,/^pi/i,/^so/i]},defaultParseWidth:"any"}),dayPeriod:(0,a.default)({matchPatterns:{narrow:/^(am|pm|(o )?poln\.?|(nap\.?|pol\.?)|r[áa]no|pop\.?|ve[čc]\.?|(v n\.?|noc))/i,abbreviated:/^(am|pm|(o )?poln\.?|(napol\.?|pol\.?)|r[áa]no|pop\.?|ve[čc]er|(v )?noci?)/i,any:/^(am|pm|(o )?polnoci?|(na)?poludnie|r[áa]no|popoludn(ie|í|i)|ve[čc]er|(v )?noci?)/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^am/i,pm:/^pm/i,midnight:/poln/i,noon:/^(nap|(na)?pol(\.|u))/i,morning:/^r[áa]no/i,afternoon:/^pop/i,evening:/^ve[čc]/i,night:/^(noc|v n\.)/i}},defaultParseWidth:"any"})};t.default=u,e.exports=t.default},5:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var r=t||{},n=r.width?String(r.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}},e.exports=t.default},6:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,r){var n,a=r||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,u=a.width?String(a.width):o;n=e.formattingValues[u]||e.formattingValues[o]}else{var i=e.defaultWidth,l=a.width?String(a.width):e.defaultWidth;n=e.values[l]||e.values[i]}return n[e.argumentCallback?e.argumentCallback(t):t]}},e.exports=t.default},67:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){if(arguments.length<2)throw new TypeError("2 argument required, but only "+arguments.length+" present");var n=(0,a.default)(e,r),o=(0,a.default)(t,r);return n.getTime()===o.getTime()};var n,a=(n=r(68))&&n.__esModule?n:{default:n};e.exports=t.default},68:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(arguments.length<1)throw new TypeError("1 argument required, but only "+arguments.length+" present");var r=t||{},o=r.locale,u=o&&o.options&&o.options.weekStartsOn,i=null==u?0:(0,n.default)(u),l=null==r.weekStartsOn?i:(0,n.default)(r.weekStartsOn);if(!(l>=0&&l<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var d=(0,a.default)(e),s=d.getUTCDay(),f=(s<l?7:0)+s-l;return d.setUTCDate(d.getUTCDate()-f),d.setUTCHours(0,0,0,0),d};var n=o(r(69)),a=o(r(70));function o(e){return e&&e.__esModule?e:{default:e}}e.exports=t.default},69:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);if(isNaN(t))return t;return t<0?Math.ceil(t):Math.floor(t)},e.exports=t.default},7:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,r){var n=String(t),a=r||{},o=n.match(e.matchPattern);if(!o)return null;var u=o[0],i=n.match(e.parsePattern);if(!i)return null;var l=e.valueCallback?e.valueCallback(i[0]):i[0];return{value:l=a.valueCallback?a.valueCallback(l):l,rest:n.slice(u.length)}}},e.exports=t.default},70:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){if(arguments.length<1)throw new TypeError("1 argument required, but only "+arguments.length+" present");var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))},e.exports=t.default},8:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,r){var n=String(t),a=r||{},o=a.width,u=o&&e.matchPatterns[o]||e.matchPatterns[e.defaultMatchWidth],i=n.match(u);if(!i)return null;var l,d=i[0],s=o&&e.parsePatterns[o]||e.parsePatterns[e.defaultParseWidth];return l="[object Array]"===Object.prototype.toString.call(s)?s.findIndex((function(e){return e.test(n)})):function(e,t){for(var r in e)if(e.hasOwnProperty(r)&&t(e[r]))return r}(s,(function(e){return e.test(n)})),l=e.valueCallback?e.valueCallback(l):l,{value:l=a.valueCallback?a.valueCallback(l):l,rest:n.slice(d.length)}}},e.exports=t.default}})}));