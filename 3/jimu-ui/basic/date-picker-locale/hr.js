define((function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1687)}({1687:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=d(n(1688)),a=d(n(1689)),i=d(n(1690)),r=d(n(1691)),u=d(n(1692));function d(e){return e&&e.__esModule?e:{default:e}}var s={formatDistance:o.default,formatLong:a.default,formatRelative:i.default,localize:r.default,match:u.default,options:{weekStartsOn:1,firstWeekContainsDate:1}};t.default=s,e.exports=t.default},1688:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var a;n=n||{},a="string"==typeof o[e]?o[e]:1===t?n.addSuffix?n.comparison>0?o[e].one.withPrepositionIn:o[e].one.withPrepositionAgo:o[e].one.standalone:t%10>1&&t%10<5&&"1"!==String(t).substr(-2,1)?o[e].dual.replace("{{count}}",t):o[e].other.replace("{{count}}",t);if(n.addSuffix)return n.comparison>0?"za "+a:"prije "+a;return a};var o={lessThanXSeconds:{one:{standalone:"manje od 1 sekunde",withPrepositionAgo:"manje od 1 sekunde",withPrepositionIn:"manje od 1 sekundu"},dual:"manje od {{count}} sekunde",other:"manje od {{count}} sekundi"},xSeconds:{one:{standalone:"1 sekunda",withPrepositionAgo:"1 sekunde",withPrepositionIn:"1 sekundu"},dual:"{{count}} sekunde",other:"{{count}} sekundi"},halfAMinute:"pola minute",lessThanXMinutes:{one:{standalone:"manje od 1 minute",withPrepositionAgo:"manje od 1 minute",withPrepositionIn:"manje od 1 minutu"},dual:"manje od {{count}} minute",other:"manje od {{count}} minuta"},xMinutes:{one:{standalone:"1 minuta",withPrepositionAgo:"1 minute",withPrepositionIn:"1 minutu"},dual:"{{count}} minute",other:"{{count}} minuta"},aboutXHours:{one:{standalone:"oko 1 sat",withPrepositionAgo:"oko 1 sat",withPrepositionIn:"oko 1 sat"},dual:"oko {{count}} sata",other:"oko {{count}} sati"},xHours:{one:{standalone:"1 sat",withPrepositionAgo:"1 sat",withPrepositionIn:"1 sat"},dual:"{{count}} sata",other:"{{count}} sati"},xDays:{one:{standalone:"1 dan",withPrepositionAgo:"1 dan",withPrepositionIn:"1 dan"},dual:"{{count}} dana",other:"{{count}} dana"},aboutXMonths:{one:{standalone:"oko 1 mjesec",withPrepositionAgo:"oko 1 mjesec",withPrepositionIn:"oko 1 mjesec"},dual:"oko {{count}} mjeseca",other:"oko {{count}} mjeseci"},xMonths:{one:{standalone:"1 mjesec",withPrepositionAgo:"1 mjesec",withPrepositionIn:"1 mjesec"},dual:"{{count}} mjeseca",other:"{{count}} mjeseci"},aboutXYears:{one:{standalone:"oko 1 godinu",withPrepositionAgo:"oko 1 godinu",withPrepositionIn:"oko 1 godinu"},dual:"oko {{count}} godine",other:"oko {{count}} godina"},xYears:{one:{standalone:"1 godina",withPrepositionAgo:"1 godine",withPrepositionIn:"1 godinu"},dual:"{{count}} godine",other:"{{count}} godina"},overXYears:{one:{standalone:"preko 1 godinu",withPrepositionAgo:"preko 1 godinu",withPrepositionIn:"preko 1 godinu"},dual:"preko {{count}} godine",other:"preko {{count}} godina"},almostXYears:{one:{standalone:"gotovo 1 godinu",withPrepositionAgo:"gotovo 1 godinu",withPrepositionIn:"gotovo 1 godinu"},dual:"gotovo {{count}} godine",other:"gotovo {{count}} godina"}};e.exports=t.default},1689:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,a=(o=n(5))&&o.__esModule?o:{default:o};var i={date:(0,a.default)({formats:{full:"EEEE, d. MMMM y.",long:"d. MMMM y.",medium:"d. MMM y.",short:"dd. MM. y."},defaultWidth:"full"}),time:(0,a.default)({formats:{full:"HH:mm:ss (zzzz)",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},defaultWidth:"full"}),dateTime:(0,a.default)({formats:{full:"{{date}} 'u' {{time}}",long:"{{date}} 'u' {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"},defaultWidth:"full"})};t.default=i,e.exports=t.default},1690:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n,a){var i=o[e];if("function"==typeof i)return i(t);return i};var o={lastWeek:function(e){switch(e.getUTCDay()){case 0:return"'prošlu nedjelju u' p";case 3:return"'prošlu srijedu u' p";case 6:return"'prošlu subotu u' p";default:return"'prošli' EEEE 'u' p"}},yesterday:"'jučer u' p",today:"'danas u' p",tomorrow:"'sutra u' p",nextWeek:function(e){switch(e.getUTCDay()){case 0:return"'iduću nedjelju u' p";case 3:return"'iduću srijedu u' p";case 6:return"'iduću subotu u' p";default:return"'prošli' EEEE 'u' p"}},other:"P"};e.exports=t.default},1691:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,a=(o=n(6))&&o.__esModule?o:{default:o};var i={ordinalNumber:function(e){var t=Number(e);return String(t).concat(".")},era:(0,a.default)({values:{narrow:["pr.n.e.","AD"],abbreviated:["pr. Kr.","po. Kr."],wide:["Prije Krista","Poslije Krista"]},defaultWidth:"wide"}),quarter:(0,a.default)({values:{narrow:["1.","2.","3.","4."],abbreviated:["1. kv.","2. kv.","3. kv.","4. kv."],wide:["1. kvartal","2. kvartal","3. kvartal","4. kvartal"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:(0,a.default)({values:{narrow:["1.","2.","3.","4.","5.","6.","7.","8.","9.","10.","11.","12."],abbreviated:["sij","velj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro"],wide:["siječanj","veljača","ožujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac"]},defaultWidth:"wide",formattingValues:{narrow:["1.","2.","3.","4.","5.","6.","7.","8.","9.","10.","11.","12."],abbreviated:["sij","velj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro"],wide:["siječnja","veljače","ožujka","travnja","svibnja","lipnja","srpnja","kolovoza","rujna","listopada","studenog","prosinca"]},defaultFormattingWidth:"wide"}),day:(0,a.default)({values:{narrow:["N","P","U","S","Č","P","S"],short:["ned","pon","uto","sri","čet","pet","sub"],abbreviated:["ned","pon","uto","sri","čet","pet","sub"],wide:["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"]},defaultWidth:"wide"}),dayPeriod:(0,a.default)({values:{narrow:{am:"AM",pm:"PM",midnight:"ponoć",noon:"podne",morning:"ujutro",afternoon:"popodne",evening:"navečer",night:"noću"},abbreviated:{am:"AM",pm:"PM",midnight:"ponoć",noon:"podne",morning:"ujutro",afternoon:"popodne",evening:"navečer",night:"noću"},wide:{am:"AM",pm:"PM",midnight:"ponoć",noon:"podne",morning:"ujutro",afternoon:"poslije podne",evening:"navečer",night:"noću"}},defaultWidth:"wide",formattingValues:{narrow:{am:"AM",pm:"PM",midnight:"ponoć",noon:"podne",morning:"ujutro",afternoon:"popodne",evening:"navečer",night:"noću"},abbreviated:{am:"AM",pm:"PM",midnight:"ponoć",noon:"podne",morning:"ujutro",afternoon:"popodne",evening:"navečer",night:"noću"},wide:{am:"AM",pm:"PM",midnight:"ponoć",noon:"podne",morning:"ujutro",afternoon:"poslije podne",evening:"navečer",night:"noću"}},defaultFormattingWidth:"wide"})};t.default=i,e.exports=t.default},1692:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(8));function a(e){return e&&e.__esModule?e:{default:e}}var i={ordinalNumber:(0,a(n(7)).default)({matchPattern:/^(\d+)\./i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:(0,o.default)({matchPatterns:{narrow:/^(pr\.n\.e\.|AD)/i,abbreviated:/^(pr\.\s?Kr\.|po\.\s?Kr\.)/i,wide:/^(Prije Krista|prije nove ere|Poslije Krista|nova era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^pr/i,/^(po|nova)/i]},defaultParseWidth:"any"}),quarter:(0,o.default)({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^[1234]\.\s?kv\.?/i,wide:/^[1234]\. kvartal/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:(0,o.default)({matchPatterns:{narrow:/^(10|11|12|[123456789])\./i,abbreviated:/^(sij|velj|(ožu|ozu)|tra|svi|lip|srp|kol|ruj|lis|stu|pro)/i,wide:/^((siječanj|siječnja|sijecanj|sijecnja)|(veljača|veljače|veljaca|veljace)|(ožujak|ožujka|ozujak|ozujka)|(travanj|travnja)|(svibanj|svibnja)|(lipanj|lipnja)|(srpanj|srpnja)|(kolovoz|kolovoza)|(rujan|rujna)|(listopad|listopada)|(studeni|studenog)|(prosinac|prosinca))/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/(10|11|12|[123456789])/i],abbreviated:[/^sij/i,/^velj/i,/^(ožu|ozu)/i,/^tra/i,/^svi/i,/^lip/i,/^srp/i,/^kol/i,/^ruj/i,/^lis/i,/^stu/i,/^pro/i],wide:[/^sij/i,/^velj/i,/^(ožu|ozu)/i,/^tra/i,/^svi/i,/^lip/i,/^srp/i,/^kol/i,/^ruj/i,/^lis/i,/^stu/i,/^pro/i]},defaultParseWidth:"wide"}),day:(0,o.default)({matchPatterns:{narrow:/^[npusčc]/i,short:/^(ned|pon|uto|sri|(čet|cet)|pet|sub)/i,abbreviated:/^(ned|pon|uto|sri|(čet|cet)|pet|sub)/i,wide:/^(nedjelja|ponedjeljak|utorak|srijeda|(četvrtak|cetvrtak)|petak|subota)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:(0,o.default)({matchPatterns:{any:/^(am|pm|ponoc|ponoć|(po)?podne|navecer|navečer|noću|poslije podne|ujutro)/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^pono/i,noon:/^pod/i,morning:/jutro/i,afternoon:/(poslije\s|po)+podne/i,evening:/(navece|naveče)/i,night:/(nocu|noću)/i}},defaultParseWidth:"any"})};t.default=i,e.exports=t.default},5:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t){var n=t||{},o=n.width?String(n.width):e.defaultWidth;return e.formats[o]||e.formats[e.defaultWidth]}},e.exports=t.default},6:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,n){var o,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,r=a.width?String(a.width):i;o=e.formattingValues[r]||e.formattingValues[i]}else{var u=e.defaultWidth,d=a.width?String(a.width):e.defaultWidth;o=e.values[d]||e.values[u]}return o[e.argumentCallback?e.argumentCallback(t):t]}},e.exports=t.default},7:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,n){var o=String(t),a=n||{},i=o.match(e.matchPattern);if(!i)return null;var r=i[0],u=o.match(e.parsePattern);if(!u)return null;var d=e.valueCallback?e.valueCallback(u[0]):u[0];return{value:d=a.valueCallback?a.valueCallback(d):d,rest:o.slice(r.length)}}},e.exports=t.default},8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return function(t,n){var o=String(t),a=n||{},i=a.width,r=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth],u=o.match(r);if(!u)return null;var d,s=u[0],l=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];return d="[object Array]"===Object.prototype.toString.call(l)?l.findIndex((function(e){return e.test(o)})):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}(l,(function(e){return e.test(o)})),d=e.valueCallback?e.valueCallback(d):d,{value:d=a.valueCallback?a.valueCallback(d):d,rest:o.slice(s.length)}}},e.exports=t.default}})}));