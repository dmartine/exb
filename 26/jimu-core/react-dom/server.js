System.register(["jimu-core/react"],(function(e){var t;return{setters:[function(e){t=e}],execute:function(){e(function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=230)}({0:function(e,r){e.exports=t},101:function(e,t,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function a(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var r,l,u=a(e),s=1;s<arguments.length;s++){for(var c in r=Object(arguments[s]))o.call(r,c)&&(u[c]=r[c]);if(n){l=n(r);for(var f=0;f<l.length;f++)i.call(r,l[f])&&(u[l[f]]=r[l[f]])}}return u}},230:function(e,t,r){"use strict";e.exports=r(231)},231:function(e,t,r){"use strict";
/** @license React v16.13.1
 * react-dom-server.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(101),o=r(0);function i(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var a="function"==typeof Symbol&&Symbol.for,l=a?Symbol.for("react.portal"):60106,u=a?Symbol.for("react.fragment"):60107,s=a?Symbol.for("react.strict_mode"):60108,c=a?Symbol.for("react.profiler"):60114,f=a?Symbol.for("react.provider"):60109,p=a?Symbol.for("react.context"):60110,h=a?Symbol.for("react.concurrent_mode"):60111,d=a?Symbol.for("react.forward_ref"):60112,y=a?Symbol.for("react.suspense"):60113,m=a?Symbol.for("react.suspense_list"):60120,v=a?Symbol.for("react.memo"):60115,w=a?Symbol.for("react.lazy"):60116,g=a?Symbol.for("react.block"):60121,x=a?Symbol.for("react.fundamental"):60117,b=a?Symbol.for("react.scope"):60119;function k(e){if(null==e)return null;if("function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case u:return"Fragment";case l:return"Portal";case c:return"Profiler";case s:return"StrictMode";case y:return"Suspense";case m:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case p:return"Context.Consumer";case f:return"Context.Provider";case d:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(""!==t?"ForwardRef("+t+")":"ForwardRef");case v:return k(e.type);case g:return k(e.render);case w:if(e=1===e._status?e._result:null)return k(e)}return null}var S=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;S.hasOwnProperty("ReactCurrentDispatcher")||(S.ReactCurrentDispatcher={current:null}),S.hasOwnProperty("ReactCurrentBatchConfig")||(S.ReactCurrentBatchConfig={suspense:null});var E={};function F(e,t){for(var r=0|e._threadCount;r<=t;r++)e[r]=e._currentValue2,e._threadCount=r+1}for(var C=new Uint16Array(16),O=0;15>O;O++)C[O]=O+1;C[15]=0;var _=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,D=Object.prototype.hasOwnProperty,I={},N={};function j(e){return!!D.call(N,e)||!D.call(I,e)&&(_.test(e)?N[e]=!0:(I[e]=!0,!1))}function P(e,t,r,n,o,i){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=n,this.attributeNamespace=o,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=i}var M={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){M[e]=new P(e,0,!1,e,null,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];M[t]=new P(t,1,!1,e[1],null,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){M[e]=new P(e,2,!1,e.toLowerCase(),null,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){M[e]=new P(e,2,!1,e,null,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){M[e]=new P(e,3,!1,e.toLowerCase(),null,!1)})),["checked","multiple","muted","selected"].forEach((function(e){M[e]=new P(e,3,!0,e,null,!1)})),["capture","download"].forEach((function(e){M[e]=new P(e,4,!1,e,null,!1)})),["cols","rows","size","span"].forEach((function(e){M[e]=new P(e,6,!1,e,null,!1)})),["rowSpan","start"].forEach((function(e){M[e]=new P(e,5,!1,e.toLowerCase(),null,!1)}));var z=/[\-:]([a-z])/g;function R(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(z,R);M[t]=new P(t,1,!1,e,null,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(z,R);M[t]=new P(t,1,!1,e,"http://www.w3.org/1999/xlink",!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(z,R);M[t]=new P(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1)})),["tabIndex","crossOrigin"].forEach((function(e){M[e]=new P(e,1,!1,e.toLowerCase(),null,!1)})),M.xlinkHref=new P("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0),["src","href","action","formAction"].forEach((function(e){M[e]=new P(e,1,!1,e.toLowerCase(),null,!0)}));var T=/["'&<>]/;function L(e){if("boolean"==typeof e||"number"==typeof e)return""+e;e=""+e;var t=T.exec(e);if(t){var r,n="",o=0;for(r=t.index;r<e.length;r++){switch(e.charCodeAt(r)){case 34:t="&quot;";break;case 38:t="&amp;";break;case 39:t="&#x27;";break;case 60:t="&lt;";break;case 62:t="&gt;";break;default:continue}o!==r&&(n+=e.substring(o,r)),o=r+1,n+=t}e=o!==r?n+e.substring(o,r):n}return e}function V(e,t){var r,n=M.hasOwnProperty(e)?M[e]:null;return(r="style"!==e)&&(r=null!==n?0===n.type:2<e.length&&("o"===e[0]||"O"===e[0])&&("n"===e[1]||"N"===e[1])),r||function(e,t,r,n){if(null==t||function(e,t,r,n){if(null!==r&&0===r.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!n&&(null!==r?!r.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,r,n))return!0;if(n)return!1;if(null!==r)switch(r.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(e,t,n,!1)?"":null!==n?(e=n.attributeName,3===(r=n.type)||4===r&&!0===t?e+'=""':(n.sanitizeURL&&(t=""+t),e+'="'+L(t)+'"')):j(e)?e+'="'+L(t)+'"':""}var A="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},W=null,U=null,H=null,$=!1,q=!1,B=null,Z=0;function G(){if(null===W)throw Error(i(321));return W}function X(){if(0<Z)throw Error(i(312));return{memoizedState:null,queue:null,next:null}}function Y(){return null===H?null===U?($=!1,U=H=X()):($=!0,H=U):null===H.next?($=!1,H=H.next=X()):($=!0,H=H.next),H}function J(e,t,r,n){for(;q;)q=!1,Z+=1,H=null,r=e(t,n);return U=W=null,Z=0,H=B=null,r}function K(e,t){return"function"==typeof t?t(e):t}function Q(e,t,r){if(W=G(),H=Y(),$){var n=H.queue;if(t=n.dispatch,null!==B&&void 0!==(r=B.get(n))){B.delete(n),n=H.memoizedState;do{n=e(n,r.action),r=r.next}while(null!==r);return H.memoizedState=n,[n,t]}return[H.memoizedState,t]}return e=e===K?"function"==typeof t?t():t:void 0!==r?r(t):t,H.memoizedState=e,e=(e=H.queue={last:null,dispatch:null}).dispatch=ee.bind(null,W,e),[H.memoizedState,e]}function ee(e,t,r){if(!(25>Z))throw Error(i(301));if(e===W)if(q=!0,e={action:r,next:null},null===B&&(B=new Map),void 0===(r=B.get(t)))B.set(t,e);else{for(t=r;null!==t.next;)t=t.next;t.next=e}}function te(){}var re=0,ne={readContext:function(e){var t=re;return F(e,t),e[t]},useContext:function(e){G();var t=re;return F(e,t),e[t]},useMemo:function(e,t){if(W=G(),t=void 0===t?null:t,null!==(H=Y())){var r=H.memoizedState;if(null!==r&&null!==t){e:{var n=r[1];if(null===n)n=!1;else{for(var o=0;o<n.length&&o<t.length;o++)if(!A(t[o],n[o])){n=!1;break e}n=!0}}if(n)return r[0]}}return e=e(),H.memoizedState=[e,t],e},useReducer:Q,useRef:function(e){W=G();var t=(H=Y()).memoizedState;return null===t?(e={current:e},H.memoizedState=e):t},useState:function(e){return Q(K,e)},useLayoutEffect:function(){},useCallback:function(e){return e},useImperativeHandle:te,useEffect:te,useDebugValue:te,useResponder:function(e,t){return{props:t,responder:e}},useDeferredValue:function(e){return G(),e},useTransition:function(){return G(),[function(e){e()},!1]}},oe="http://www.w3.org/1999/xhtml";function ie(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}var ae={area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},le=n({menuitem:!0},ae),ue={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},se=["Webkit","ms","Moz","O"];Object.keys(ue).forEach((function(e){se.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ue[t]=ue[e]}))}));var ce=/([A-Z])/g,fe=/^ms-/,pe=o.Children.toArray,he=S.ReactCurrentDispatcher,de={listing:!0,pre:!0,textarea:!0},ye=/^[a-zA-Z][a-zA-Z:_\.\-\d]*$/,me={},ve={};var we=Object.prototype.hasOwnProperty,ge={children:null,dangerouslySetInnerHTML:null,suppressContentEditableWarning:null,suppressHydrationWarning:null};function xe(e,t){if(void 0===e)throw Error(i(152,k(t)||"Component"))}function be(e,t,r){function a(o,a){var l=a.prototype&&a.prototype.isReactComponent,u=function(e,t,r,n){if(n&&("object"==typeof(n=e.contextType)&&null!==n))return F(n,r),n[r];if(e=e.contextTypes){for(var o in r={},e)r[o]=t[o];t=r}else t=E;return t}(a,t,r,l),s=[],c=!1,f={isMounted:function(){return!1},enqueueForceUpdate:function(){if(null===s)return null},enqueueReplaceState:function(e,t){c=!0,s=[t]},enqueueSetState:function(e,t){if(null===s)return null;s.push(t)}};if(l){if(l=new a(o.props,u,f),"function"==typeof a.getDerivedStateFromProps){var p=a.getDerivedStateFromProps.call(null,o.props,l.state);null!=p&&(l.state=n({},l.state,p))}}else if(W={},l=a(o.props,u,f),null==(l=J(a,o.props,l,u))||null==l.render)return void xe(e=l,a);if(l.props=o.props,l.context=u,l.updater=f,void 0===(f=l.state)&&(l.state=f=null),"function"==typeof l.UNSAFE_componentWillMount||"function"==typeof l.componentWillMount)if("function"==typeof l.componentWillMount&&"function"!=typeof a.getDerivedStateFromProps&&l.componentWillMount(),"function"==typeof l.UNSAFE_componentWillMount&&"function"!=typeof a.getDerivedStateFromProps&&l.UNSAFE_componentWillMount(),s.length){f=s;var h=c;if(s=null,c=!1,h&&1===f.length)l.state=f[0];else{p=h?f[0]:l.state;var d=!0;for(h=h?1:0;h<f.length;h++){var y=f[h];null!=(y="function"==typeof y?y.call(l,p,o.props,u):y)&&(d?(d=!1,p=n({},p,y)):n(p,y))}l.state=p}}else s=null;if(xe(e=l.render(),a),"function"==typeof l.getChildContext&&"object"==typeof(o=a.childContextTypes)){var m=l.getChildContext();for(var v in m)if(!(v in o))throw Error(i(108,k(a)||"Unknown",v))}m&&(t=n({},t,m))}for(;o.isValidElement(e);){var l=e,u=l.type;if("function"!=typeof u)break;a(l,u)}return{child:e,context:t}}var ke=function(){function e(e,t){o.isValidElement(e)?e.type!==u?e=[e]:(e=e.props.children,e=o.isValidElement(e)?[e]:pe(e)):e=pe(e),e={type:null,domNamespace:oe,children:e,childIndex:0,context:E,footer:""};var r=C[0];if(0===r){var n=C,a=2*(r=n.length);if(!(65536>=a))throw Error(i(304));var l=new Uint16Array(a);for(l.set(n),(C=l)[0]=r+1,n=r;n<a-1;n++)C[n]=n+1;C[a-1]=0}else C[0]=C[r];this.threadID=r,this.stack=[e],this.exhausted=!1,this.currentSelectValue=null,this.previousWasTextNode=!1,this.makeStaticMarkup=t,this.suspenseDepth=0,this.contextIndex=-1,this.contextStack=[],this.contextValueStack=[]}var t=e.prototype;return t.destroy=function(){if(!this.exhausted){this.exhausted=!0,this.clearProviders();var e=this.threadID;C[e]=C[0],C[0]=e}},t.pushProvider=function(e){var t=++this.contextIndex,r=e.type._context,n=this.threadID;F(r,n);var o=r[n];this.contextStack[t]=r,this.contextValueStack[t]=o,r[n]=e.props.value},t.popProvider=function(){var e=this.contextIndex,t=this.contextStack[e],r=this.contextValueStack[e];this.contextStack[e]=null,this.contextValueStack[e]=null,this.contextIndex--,t[this.threadID]=r},t.clearProviders=function(){for(var e=this.contextIndex;0<=e;e--)this.contextStack[e][this.threadID]=this.contextValueStack[e]},t.read=function(e){if(this.exhausted)return null;var t=re;re=this.threadID;var r=he.current;he.current=ne;try{for(var n=[""],o=!1;n[0].length<e;){if(0===this.stack.length){this.exhausted=!0;var a=this.threadID;C[a]=C[0],C[0]=a;break}var l=this.stack[this.stack.length-1];if(o||l.childIndex>=l.children.length){var u=l.footer;if(""!==u&&(this.previousWasTextNode=!1),this.stack.pop(),"select"===l.type)this.currentSelectValue=null;else if(null!=l.type&&null!=l.type.type&&l.type.type.$$typeof===f)this.popProvider(l.type);else if(l.type===y){this.suspenseDepth--;var s=n.pop();if(o){o=!1;var c=l.fallbackFrame;if(!c)throw Error(i(303));this.stack.push(c),n[this.suspenseDepth]+="\x3c!--$!--\x3e";continue}n[this.suspenseDepth]+=s}n[this.suspenseDepth]+=u}else{var p=l.children[l.childIndex++],h="";try{h+=this.render(p,l.context,l.domNamespace)}catch(e){if(null!=e&&"function"==typeof e.then)throw Error(i(294));throw e}n.length<=this.suspenseDepth&&n.push(""),n[this.suspenseDepth]+=h}}return n[0]}finally{he.current=r,re=t}},t.render=function(e,t,r){if("string"==typeof e||"number"==typeof e)return""===(r=""+e)?"":this.makeStaticMarkup?L(r):this.previousWasTextNode?"\x3c!-- --\x3e"+L(r):(this.previousWasTextNode=!0,L(r));if(e=(t=be(e,t,this.threadID)).child,t=t.context,null===e||!1===e)return"";if(!o.isValidElement(e)){if(null!=e&&null!=e.$$typeof){if((r=e.$$typeof)===l)throw Error(i(257));throw Error(i(258,r.toString()))}return e=pe(e),this.stack.push({type:null,domNamespace:r,children:e,childIndex:0,context:t,footer:""}),""}var a=e.type;if("string"==typeof a)return this.renderDOM(e,t,r);switch(a){case s:case h:case c:case m:case u:return e=pe(e.props.children),this.stack.push({type:null,domNamespace:r,children:e,childIndex:0,context:t,footer:""}),"";case y:throw Error(i(294))}if("object"==typeof a&&null!==a)switch(a.$$typeof){case d:W={};var g=a.render(e.props,e.ref);return g=J(a.render,e.props,g,e.ref),g=pe(g),this.stack.push({type:null,domNamespace:r,children:g,childIndex:0,context:t,footer:""}),"";case v:return e=[o.createElement(a.type,n({ref:e.ref},e.props))],this.stack.push({type:null,domNamespace:r,children:e,childIndex:0,context:t,footer:""}),"";case f:return r={type:e,domNamespace:r,children:a=pe(e.props.children),childIndex:0,context:t,footer:""},this.pushProvider(e),this.stack.push(r),"";case p:a=e.type,g=e.props;var k=this.threadID;return F(a,k),a=pe(g.children(a[k])),this.stack.push({type:e,domNamespace:r,children:a,childIndex:0,context:t,footer:""}),"";case x:throw Error(i(338));case w:switch(function(e){if(-1===e._status){e._status=0;var t=e._ctor;t=t(),e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}}(a=e.type),a._status){case 1:return e=[o.createElement(a._result,n({ref:e.ref},e.props))],this.stack.push({type:null,domNamespace:r,children:e,childIndex:0,context:t,footer:""}),"";case 2:throw a._result;default:throw Error(i(295))}case b:throw Error(i(343))}throw Error(i(130,null==a?a:typeof a,""))},t.renderDOM=function(e,t,r){var a=e.type.toLowerCase();if(r===oe&&ie(a),!me.hasOwnProperty(a)){if(!ye.test(a))throw Error(i(65,a));me[a]=!0}var l=e.props;if("input"===a)l=n({type:void 0},l,{defaultChecked:void 0,defaultValue:void 0,value:null!=l.value?l.value:l.defaultValue,checked:null!=l.checked?l.checked:l.defaultChecked});else if("textarea"===a){var u=l.value;if(null==u){u=l.defaultValue;var s=l.children;if(null!=s){if(null!=u)throw Error(i(92));if(Array.isArray(s)){if(!(1>=s.length))throw Error(i(93));s=s[0]}u=""+s}null==u&&(u="")}l=n({},l,{value:void 0,children:""+u})}else if("select"===a)this.currentSelectValue=null!=l.value?l.value:l.defaultValue,l=n({},l,{value:void 0});else if("option"===a){s=this.currentSelectValue;var c=function(e){if(null==e)return e;var t="";return o.Children.forEach(e,(function(e){null!=e&&(t+=e)})),t}(l.children);if(null!=s){var f=null!=l.value?l.value+"":c;if(u=!1,Array.isArray(s)){for(var p=0;p<s.length;p++)if(""+s[p]===f){u=!0;break}}else u=""+s===f;l=n({selected:void 0,children:void 0},l,{selected:u,children:c})}}if(u=l){if(le[a]&&(null!=u.children||null!=u.dangerouslySetInnerHTML))throw Error(i(137,a,""));if(null!=u.dangerouslySetInnerHTML){if(null!=u.children)throw Error(i(60));if("object"!=typeof u.dangerouslySetInnerHTML||!("__html"in u.dangerouslySetInnerHTML))throw Error(i(61))}if(null!=u.style&&"object"!=typeof u.style)throw Error(i(62,""))}for(x in u=l,s=this.makeStaticMarkup,c=1===this.stack.length,f="<"+e.type,u)if(we.call(u,x)){var h=u[x];if(null!=h){if("style"===x){p=void 0;var d="",y="";for(p in h)if(h.hasOwnProperty(p)){var m=0===p.indexOf("--"),v=h[p];if(null!=v){if(m)var w=p;else if(w=p,ve.hasOwnProperty(w))w=ve[w];else{var g=w.replace(ce,"-$1").toLowerCase().replace(fe,"-ms-");w=ve[w]=g}d+=y+w+":",y=p,d+=m=null==v||"boolean"==typeof v||""===v?"":m||"number"!=typeof v||0===v||ue.hasOwnProperty(y)&&ue[y]?(""+v).trim():v+"px",y=";"}}h=d||null}p=null;e:if(m=a,v=u,-1===m.indexOf("-"))m="string"==typeof v.is;else switch(m){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":m=!1;break e;default:m=!0}m?ge.hasOwnProperty(x)||(p=j(p=x)&&null!=h?p+'="'+L(h)+'"':""):p=V(x,h),p&&(f+=" "+p)}}s||c&&(f+=' data-reactroot=""');var x=f;u="",ae.hasOwnProperty(a)?x+="/>":(x+=">",u="</"+e.type+">");e:{if(null!=(s=l.dangerouslySetInnerHTML)){if(null!=s.__html){s=s.__html;break e}}else if("string"==typeof(s=l.children)||"number"==typeof s){s=L(s);break e}s=null}return null!=s?(l=[],de.hasOwnProperty(a)&&"\n"===s.charAt(0)&&(x+="\n"),x+=s):l=pe(l.children),e=e.type,r=null==r||"http://www.w3.org/1999/xhtml"===r?ie(e):"http://www.w3.org/2000/svg"===r&&"foreignObject"===e?"http://www.w3.org/1999/xhtml":r,this.stack.push({domNamespace:r,type:a,children:l,childIndex:0,context:t,footer:u}),this.previousWasTextNode=!1,x},e}(),Se={renderToString:function(e){e=new ke(e,!1);try{return e.read(1/0)}finally{e.destroy()}},renderToStaticMarkup:function(e){e=new ke(e,!0);try{return e.read(1/0)}finally{e.destroy()}},renderToNodeStream:function(){throw Error(i(207))},renderToStaticNodeStream:function(){throw Error(i(208))},version:"16.13.1"};e.exports=Se.default||Se}}))}}}));