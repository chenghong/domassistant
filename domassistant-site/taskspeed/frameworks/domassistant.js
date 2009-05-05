// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation, version 2.8
var DOMAssistant=function(){var i=function(){},d=/*@cc_on!@*/false,h=d&&parseFloat(navigator.appVersion)<6,c={},m={},a=true,l={accesskey:"accessKey","class":"className",colspan:"colSpan","for":"htmlFor",maxlength:"maxLength",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",valign:"vAlign",cellspacing:"cellSpacing",cellpadding:"cellPadding"},k={rules:/\s*(,)\s*/g,selector:/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+\s*(\^|\$|\*|\||~)?(=\s*([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_\.]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.\'\"]+\]+)|(:\w+[\w\-]*))\))?)*)?(>|\+|~)?/,id:/^#([\w\u00C0-\uFFFF\-\_]+)$/,tag:/^(\w+)/,relation:/^(>|\+|~)$/,pseudo:/^:(\w[\w\-]*)(\((.+)\))?$/,pseudos:/:(\w[\w\-]*)(\(([^\)]+)\))?/g,attribs:/\[(\w+)\s*(\^|\$|\*|\||~)?=?\s*([\w\u00C0-\uFFFF\s\-_\.]+|"[^"]*"|'[^']*')?\]/g,classes:/\.([\w\u00C0-\uFFFF\-_]+)/g,quoted:/^["'](.*)["']$/,nth:/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/},g=function(q,p){if(q.indexOf){return q.indexOf(p)>=0}for(var o=0,n=q.length;o<n;o++){if(q[o]===p){return true}}return false},j=function(p,n){var o=p.parentNode;return n===document||o===n||(o!==document&&j(o,n))},f=function(p,q,n){var o=p.tagName;while((p=p[q+"Sibling"])&&(p.nodeType!==1||(n?p.tagName!==o:p.tagName==="!"))){}return p},b=function(n){return typeof n!=="undefined"};var e=function(o,n){o.push.apply(o,[].slice.apply(n));return o};if(d){e=function(p,o){if(o.slice){return p.concat(o)}var n=0,q;while((q=o[n++])){p[p.length]=q}return p}}return{isIE:d,camel:l,def:b,allMethods:[],publicMethods:["prev","next","cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(d){i=Array}i.prototype=[];i.prototype.each=function(p){for(var o=0,n=this.length;o<n;o++){p.call(this[o],o)}return this};i.prototype.first=function(){return b(this[0])?DOMAssistant.addMethodsToElm(this[0]):null};i.prototype.end=function(){return this.previousSet};i.prototype.indexOf=i.prototype.indexOf||function(p){for(var o=0,n=this.length;o<n;o++){if(o in this&&this[o]===p){return o}}return -1};i.prototype.map=function(q){var p=[];for(var o=0,n=this.length;o<n;o++){if(o in this){p[o]=q.call(this[o],o)}}return p};i.prototype.filter=function(q){var p=new i();p.previousSet=this;for(var o=0,n=this.length;o<n;o++){if(o in this&&q.call(this[o],o)){p.push(this[o])}}return p};i.prototype.every=function(p){for(var o=0,n=this.length;o<n;o++){if(o in this&&!p.call(this[o],o)){return false}}return true};i.prototype.some=function(p){for(var o=0,n=this.length;o<n;o++){if(o in this&&p.call(this[o],o)){return true}}return false};this.attach(this)},addMethods:function(n,o){if(!b(this.allMethods[n])){this.allMethods[n]=o;this.addHTMLArrayPrototype(n,o)}},addMethodsToElm:function(o){for(var n in this.allMethods){if(b(this.allMethods[n])){this.applyMethod.call(o,n,this.allMethods[n])}}return o},applyMethod:function(o,n){if(typeof this[o]!=="function"){this[o]=n}},attach:function(p){var n=p.publicMethods;if(!b(n)){for(var r in p){if(r!=="init"&&b(p[r])){this.addMethods(r,p[r])}}}else{if(n.constructor===Array){for(var o=0,q;(q=n[o]);o++){this.addMethods(q,p[q])}}}if(typeof p.init==="function"){p.init()}},addHTMLArrayPrototype:function(n,o){i.prototype[n]=function(){var r=new i();r.previousSet=this;var s;for(var q=0,p=this.length;q<p;q++){s=o.apply(this[q],arguments);if(!!s&&s.constructor===Array){r=e(r,s)}else{r.push(s)}}return r}},clearHandlers:function(){var s=this.all||this.getElementsByTagName("*");for(var r=0,t,n;(t=s[r++]);){if(t.uniqueHandlerId&&(n=t.attributes)){for(var p=0,q=n.length,o;p<q;p++){o=n[p].nodeName.toLowerCase();if(typeof t[o]==="function"){t[o]=null}}}}},setCache:function(n){a=n},$:function(){var q=arguments[0];if(arguments.length===1&&(typeof q==="object"||(typeof q==="function"&&!!q.nodeName))){return DOMAssistant.$$(q)}var s=new i();for(var o=0,n,r;(n=arguments[o]);o++){if(typeof n==="string"){n=n.replace(/^[^#]*(#)/,"$1");if(k.id.test(n)){if((r=DOMAssistant.$$(n.substr(1),false))){s.push(r)}}else{var p=(document.all||document.getElementsByTagName("*")).length;s=(!document.querySelectorAll&&a&&m.rule&&m.rule===n&&m.doc===p)?m.elms:e(s,DOMAssistant.cssSelection.call(document,n));m={rule:n,elms:s,doc:p}}}}return s},$$:function(s,p){var r=(typeof s==="object"||(typeof s==="function"&&!!s.nodeName))?s:document.getElementById(s);var q=p||true;if(typeof s==="string"&&r&&r.id!==s){r=null;for(var n=0,o;(o=document.all[n]);n++){if(o.id===s){r=o;break}}}if(r&&q){DOMAssistant.addMethodsToElm(r)}return r},prev:function(){return DOMAssistant.$$(f(this,"previous"))},next:function(){return DOMAssistant.$$(f(this,"next"))},getSequence:function(r){var s,q=2,o=-1,n=-1,p=k.nth.exec(r.replace(/^0n\+/,"").replace(/^2n$/,"even").replace(/^2n+1$/,"odd"));if(!p){return null}if(p[2]){s=(p[2]==="odd")?1:2;n=(s===1)?1:0}else{if(p[3]){s=o=parseInt(p[3],10);q=0}else{if(p[4]){q=p[6]?parseInt(p[6],10):1;s=p[7]?parseInt(p[7],10):0;while(s<1){s+=q}n=(s>=q)?(s-q)%q:s}else{if(p[8]){q=p[10]?parseInt(p[10],10):1;s=o=parseInt(p[11],10);while(s>q){s-=q}n=(o>=q)?(o-q)%q:o}}}}return{start:s,add:q,max:o,modVal:n}},cssByDOM:function(p){var aH=p.replace(k.rules,"$1").split(",");var az=new i(),ao=[],aE=[];var T,aQ,G,C,L,at,w,af,z,I,v,ap,aK,x,aG;try{T=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g")}catch(ah){T=/[^\s]+/g}function aN(r){r=r||ao;for(var q=0,o=r.length;q<o;q++){r[q].removeAttribute("added")}}function B(){for(var q=0,o=aQ.length;q<o;q++){aQ[q].childElms=null}}function al(q,n){for(var r=0,u;(u=q[r]);r++){var t=false;for(var o=0,s;(s=n[o]);o++){if(s===u){t=true;n.splice(o,1);break}}if(t){q.splice(r--,1)}}return q}function D(o,n){return d?o[l[n.toLowerCase()]||n]:o.getAttribute(n,2)}function N(n,o){n=n?n.replace(k.quoted,"$1").replace(/\./g,"\\."):null;switch(o){case"^":return"^"+n;case"$":return n+"$";case"*":return n;case"|":return"^"+n+"(\\-\\w+)*$";case"~":return"\\b"+n+"\\b";default:return n?"^"+n+"$":null}}function Q(n,o){return h?((n==="*")?o.all:o.all.tags(n)):o.getElementsByTagName(n)}function aI(n,o){n=n||"*";o=o||document;return(o===document||o.lastModified)?c[n]||(c[n]=Q(n,document)):Q(n,o)}function aq(t,a6,r){aQ=[];var s=a6.split("-"),aS=[],aX=0,a5=/\-of\-type$/.test(a6),aW,aR={first:function(a7){return !f(a7,"previous",a5)},last:function(a7){return !f(a7,"next",a5)},empty:function(a7){return !a7.firstChild},enabled:function(a7){return !a7.disabled&&a7.type!=="hidden"},disabled:function(a7){return a7.disabled},checked:function(a7){return a7.checked},contains:function(a7){return(a7.innerText||a7.textContent||"").indexOf(r.replace(k.quoted,"$1"))>-1},other:function(a7){return D(a7,a6)===r}};function q(a7){while((z=t[aX++])){if(aR[a7](z)){aS[aS.length]=z}}return aS}var a2=s[0]||null;if(a2&&aR[a2]){return q(a2)}switch(a2){case"only":var aT;while((z=t[aX++])){I=z.parentNode;if(I!==aT){if(aR.first(z)&&aR.last(z)){aS[aS.length]=z}aT=I}}break;case"nth":if(/^n$/.test(r)){aS=t}else{var a4=(s[1]==="last")?["lastChild","previousSibling"]:["firstChild","nextSibling"];aG=DOMAssistant.getSequence(r);if(aG){while((z=t[aX++])){I=z.parentNode;if(!I.childElms){var a1=0,aY=z.nodeName;aK=aG.start;x=I[a4[0]];while(x&&(aG.max<0||aK<=aG.max)){var a3=x.nodeName;if((a5&&a3===aY)||(!a5&&x.nodeType===1&&a3!=="!")){if(++a1===aK){if(a3===aY){aS[aS.length]=x}aK+=aG.add}}x=x[a4[1]]}I.childElms=true;aQ[aQ.length]=I}}B()}}break;case"target":var o=document.location.hash.slice(1);if(o){while((z=t[aX++])){if(D(z,"name")===o||D(z,"id")===o){aS[aS.length]=z;break}}}break;case"not":if((aW=k.pseudo.exec(r))){aS=al(t,aq(t,aW[1]?aW[1].toLowerCase():null,aW[3]||null))}else{for(var aZ in k){if(k[aZ].lastIndex){k[aZ].lastIndex=0}}r=r.replace(k.id,"[id=$1]");var aV=k.tag.exec(r);var u=k.classes.exec(r);var aU=k.attribs.exec(r);var n=new RegExp(aU?N(aU[3],aU[2]):"(^|\\s)"+(aV?aV[1]:u?u[1]:"")+"(\\s|$)","i");while((v=t[aX++])){ap=null;if(aV&&!n.test(v.nodeName)||u&&!n.test(v.className)){ap=v}else{if(aU){var a0=D(v,aU[1]);if(!a0||!n.test(a0)){ap=v}}}if(ap&&!ap.added){ap.added=true;aS[aS.length]=ap}}}break;default:return q("other")}return aS}for(var aj=0;(G=aH[aj]);aj++){if(aj&&g(aH.slice(0,aj),G)){continue}ao=[this];C=G.match(T);for(var ag=0,E;(E=C[ag]);ag++){aE=[];if(ag>0&&k.relation.test(E)){if((L=k.relation.exec(E))){var am=null,aO=C[ag+1];if((at=k.tag.exec(aO))){at=at[1];w=new RegExp("(^|\\s)"+at+"(\\s|$)","i")}else{if(k.id.test(aO)){am=DOMAssistant.$(aO)||null}}for(var ae=0,K;(K=ao[ae]);ae++){switch(L[0]){case">":var aB=am||aI(at,K);for(var ac=0,aw;(aw=aB[ac]);ac++){if(aw.parentNode===K){aE[aE.length]=aw}}break;case"+":if((K=f(K,"next"))){if((am&&am[0]===K)||(!am&&(!at||w.test(K.nodeName)))){aE[aE.length]=K}}break;case"~":while((K=K.nextSibling)&&!K.added){if((am&&am[0]===K)||(!am&&(!at||w.test(K.nodeName)))){K.added=true;aE[aE.length]=K}}break}}ao=aE;aN();E=C[++ag];if(/^\w+$/.test(E)||k.id.test(E)){continue}ao.skipTag=true}}var ar=k.selector.exec(E);var aD={tag:(!ar[1]||ar[3]==="*")?"*":ar[1],id:(ar[3]!=="*")?ar[2]:null,allClasses:ar[4],allAttr:ar[6],allPseudos:ar[11]};if(aD.id){var M=0,ak=document.getElementById(aD.id.replace(/#/,""));if(ak){while(ao[M]&&!j(ak,ao[M])){M++}aE=(M<ao.length)?[ak]:[]}ao=aE}else{if(aD.tag&&!ao.skipTag){if(ag===0&&!aE.length&&ao.length===1){ao=aE=e([],aI(aD.tag,ao[0]))}else{for(var ab=0,aL=ao.length,ax,au;ab<aL;ab++){ax=aI(aD.tag,ao[ab]);for(var Y=0;(au=ax[Y]);Y++){if(!au.added){au.added=true;aE[aE.length]=au}}}ao=aE;aN()}}}if(!aE.length){break}ao.skipTag=false;if(aD.allClasses){var X=0,Z=[],H=aD.allClasses.split(".").slice(1);while((af=ao[X++])){var ad=true,av=af.className;if(av&&av.length){av=av.split(" ");for(var V=0,W=H.length;V<W;V++){if(!g(av,H[V])){ad=false;break}}if(ad){Z[Z.length]=af}}}ao=aE=Z}if(aD.allAttr){var R=0,aA=[],aa=[],aF=aD.allAttr.match(/\[[^\]]+\]/g);for(var U=0,y=aF.length,S,aM;U<y;U++){k.attribs.lastIndex=0;S=k.attribs.exec(aF[U]);aM=N(S[3],S[2]||null);aA[U]=[(aM?new RegExp(aM):null),S[1]]}while((af=aE[R++])){for(var P=0,aC=aA.length;P<aC;P++){var A=true,ay=aA[P][0],ai=D(af,aA[P][1]);if(!ay&&ai===true){continue}if((!ay&&(!ai||typeof ai!=="string"||!ai.length))||(!!ay&&!ay.test(ai))){A=false;break}}if(A){aa[aa.length]=af}}ao=aE=aa}if(aD.allPseudos){var F=aD.allPseudos.match(k.pseudos);for(var O=0,an=F.length;O<an;O++){k.pseudos.lastIndex=0;var aP=k.pseudos.exec(F[O]);var J=aP[1]?aP[1].toLowerCase():null;var aJ=aP[3]||null;aE=aq(aE,J,aJ);aN(aE)}ao=aE}}az=e(az,ao)}return az},cssByXpath:function(o){var p={xhtml:"http://www.w3.org/1999/xhtml"};var q=(document.documentElement.namespaceURI===p.xhtml)?"xhtml:":"";var n=function r(s){return p[s]||null};DOMAssistant.cssByXpath=function(J){if(/:checked/.test(J)){return DOMAssistant.cssByDOM.call(this,J)}var z=J.replace(k.rules,"$1").split(",");var y=new i();var N,P,G,w,x,B;var O=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");function I(R,U,T,S){S=S?S.replace(k.quoted,"$1"):S;switch(T){case"^":return"starts-with(@"+U+', "'+S+'")';case"$":return"substring(@"+U+", (string-length(@"+U+") - "+(S.length-1)+"), "+S.length+') = "'+S+'"';case"*":return'contains(concat(" ", @'+U+', " "), "'+S+'")';case"|":return"(@"+U+'="'+S+'" or starts-with(@'+U+', "'+S+'-"))';case"~":return'contains(concat(" ", @'+U+', " "), " '+S+' ")';default:return"@"+U+(S?'="'+S+'"':"")}}function v(R,U,T,S){return"["+I(R,U,T,S)+"]"}function L(Z,Y,T){Z=/\-child$/.test(Y)?"*":Z;var U="",W=Y.split("-"),V;switch(W[0]){case"nth":if(!/^n$/.test(T)){var S=((W[1]==="last")?"(count(following-sibling::":"(count(preceding-sibling::")+Z+") + 1)";if((B=DOMAssistant.getSequence(T))){U=(B.start===B.max)?S+" = "+B.start:S+" mod "+B.add+" = "+B.modVal+((B.start>1)?" and "+S+" >= "+B.start:"")+((B.max>0)?" and "+S+" <= "+B.max:"")}}break;case"not":var X=(V=k.pseudo.exec(T))?L(Z,V[1]?V[1].toLowerCase():null,V[3]||null):T.replace(k.id,"[id=$1]").replace(k.tag,"self::$1").replace(k.classes,'contains(concat(" ", @class, " "), " $1 ")').replace(k.attribs,I);U="not("+X+")";break;case"first":return"not(preceding-sibling::"+Z+")";case"last":return"not(following-sibling::"+Z+")";case"only":return"not(preceding-sibling::"+Z+" or following-sibling::"+Z+")";case"empty":return"count(child::*) = 0 and string-length(text()) = 0";case"contains":return'contains(., "'+T.replace(k.quoted,"$1")+'")';case"enabled":return'not(@disabled) and not(@type="hidden")';case"disabled":return"@disabled";case"target":var R=document.location.hash.slice(1);return'@name="'+R+'" or @id="'+R+'"';default:return"@"+Y+'="'+T+'"'}return U}for(var K=0;(N=z[K]);K++){if(K&&g(z.slice(0,K),N)){continue}P=N.match(O);G=".";for(var H=0,M=P.length;H<M;H++){w=k.selector.exec(P[H]);x={tag:q+((!w[1]||w[3]==="*")?"*":w[1]),id:(w[3]!=="*")?w[2]:null,allClasses:w[4],allAttr:w[6],allPseudos:w[11],tagRelation:w[23]};if(x.tagRelation){G+={">":"/child::","+":"/following-sibling::*[1]/self::","~":"/following-sibling::"}[x.tagRelation]||""}else{G+=(H>0&&k.relation.test(P[H-1]))?x.tag:("/descendant::"+x.tag)}if(x.id){G+='[@id = "'+x.id.replace(/^#/,"")+'"]'}if(x.allClasses){G+=x.allClasses.replace(k.classes,'[contains(concat(" ", @class, " "), " $1 ")]')}if(x.allAttr){G+=x.allAttr.replace(k.attribs,v)}if(x.allPseudos){var A=x.allPseudos.match(k.pseudos);for(var F=0,t=A.length;F<t;F++){k.pseudos.lastIndex=0;var u=k.pseudos.exec(A[F]);var Q=u[1]?u[1].toLowerCase():null;var s=u[3]||null;var C=L(x.tag,Q,s);if(C.length){G+="["+C+"]"}}}}var E=document.evaluate(G,this,n,0,null),D;while((D=E.iterateNext())){y.push(D)}}return y};return DOMAssistant.cssByXpath.call(this,o)},cssSelection:function(o){DOMAssistant.cssSelection=document.evaluate?DOMAssistant.cssByXpath:DOMAssistant.cssByDOM;if(document.querySelectorAll){var n=DOMAssistant.cssSelection;DOMAssistant.cssSelection=function(p){try{return e(new i(),this.querySelectorAll(p))}catch(q){return n.call(this,p)}}}return DOMAssistant.cssSelection.call(this,o)},cssSelect:function(n){return DOMAssistant.cssSelection.call(this,n)},elmsByClass:function(p,n){var o=(n||"")+"."+p;return DOMAssistant.cssSelection.call(this,o)},elmsByAttribute:function(o,p,n,r){var q=(n||"")+"["+o+((p&&p!=="*")?((r||"")+"="+p+"]"):"]");return DOMAssistant.cssSelection.call(this,q)},elmsByTag:function(n){return DOMAssistant.cssSelection.call(this,n)}}}();DOMAssistant.initCore();DOMAssistant.AJAX=function(){var globalXMLHttp=null,readyState=0,status=-1,statusText="",requestPool=[],createAjaxObj=function(url,method,callback,addToContent){var params=null;if(/POST/i.test(method)){url=url.split("?");params=url[1];url=url[0]}return{url:url,method:method,callback:callback,params:params,headers:{},responseType:"text",addToContent:addToContent||false}};return{publicMethods:["ajax","get","post","load"],initRequest:function(){var XMLHttp=null;if(!!window.XMLHttpRequest&&!DOMAssistant.isIE){XMLHttp=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new XMLHttpRequest()}}else{if(!!window.ActiveXObject){var XMLHttpMS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var i=0;i<XMLHttpMS.length;i++){try{XMLHttp=new window.ActiveXObject(XMLHttpMS[i]);DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new window.ActiveXObject(XMLHttpMS[i])};break}catch(e){XMLHttp=null}}}}return XMLHttp},ajax:function(ajaxObj){if(!ajaxObj.noParse&&ajaxObj.url&&/\?/.test(ajaxObj.url)&&ajaxObj.method&&/POST/i.test(ajaxObj.method)){var url=ajaxObj.url.split("?");ajaxObj.url=url[0];ajaxObj.params=url[1]+((url[1].length>0&&ajaxObj.params)?("&"+ajaxObj.params):"")}return DOMAssistant.AJAX.makeCall.call(this,ajaxObj)},get:function(url,callback,addToContent){var ajaxObj=createAjaxObj(url,"GET",callback,addToContent);return DOMAssistant.AJAX.makeCall.call(this,ajaxObj)},post:function(url,callback){var ajaxObj=createAjaxObj(url,"POST",callback);return DOMAssistant.AJAX.makeCall.call(this,ajaxObj)},load:function(url,addToContent){DOMAssistant.AJAX.get.call(this,url,DOMAssistant.AJAX.replaceWithAJAXContent,addToContent)},makeCall:function(ajaxObj){var XMLHttp=DOMAssistant.AJAX.initRequest();if(XMLHttp){globalXMLHttp=XMLHttp;(function(elm){var url=ajaxObj.url,method=ajaxObj.method||"GET",callback=ajaxObj.callback,params=ajaxObj.params,headers=ajaxObj.headers,responseType=ajaxObj.responseType||"text",addToContent=ajaxObj.addToContent,timeout=ajaxObj.timeout||null,ex=ajaxObj.exception,timeoutId=null,done=false;XMLHttp.open(method,url,true);XMLHttp.setRequestHeader("AJAX","true");XMLHttp.setRequestHeader("X-Requested-With","XMLHttpRequest");if(method==="POST"){var contentLength=params?params.length:0;XMLHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");XMLHttp.setRequestHeader("Content-length",contentLength);if(XMLHttp.overrideMimeType){XMLHttp.setRequestHeader("Connection","close")}}if(responseType==="json"){XMLHttp.setRequestHeader("Accept","application/json, text/javascript, */*")}for(var i in headers){if(typeof i==="string"){XMLHttp.setRequestHeader(i,headers[i])}}if(typeof callback==="function"){XMLHttp.onreadystatechange=function(){try{if(XMLHttp.readyState===4&&!done){window.clearTimeout(timeoutId);done=true;status=XMLHttp.status;statusText=XMLHttp.statusText;readyState=4;if((status||location.protocol!=="file:")&&(status<200||status>=300)){throw new Error(statusText)}var response=/xml/i.test(responseType)?XMLHttp.responseXML:XMLHttp.responseText;if(/json/i.test(responseType)&&!!response){response=(typeof JSON==="object"&&typeof JSON.parse==="function")?JSON.parse(response):eval("("+response+")")}globalXMLHttp=null;XMLHttp.onreadystatechange=function(){};requestPool.push(XMLHttp);callback.call(elm,response,addToContent)}}catch(e){globalXMLHttp=XMLHttp=null;if(typeof ex==="function"){ex.call(elm,e);ex=null}}}}XMLHttp.send(params);if(timeout){timeoutId=window.setTimeout(function(){if(!done){XMLHttp.abort();done=true;if(typeof ex==="function"){readyState=0;status=408;statusText="Request timeout";globalXMLHttp=XMLHttp=null;ex.call(elm,new Error(statusText));ex=null}}},timeout)}})(this)}return this},replaceWithAJAXContent:function(content,add){if(add){this.innerHTML+=content}else{DOMAssistant.clearHandlers.apply(this);this.innerHTML=content}},getReadyState:function(){return(globalXMLHttp&&DOMAssistant.def(globalXMLHttp.readyState))?globalXMLHttp.readyState:readyState},getStatus:function(){return status},getStatusText:function(){return statusText}}}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){var a=DOMAssistant.def;return{addClass:function(c){if(!DOMAssistant.CSS.hasClass.call(this,c)){var b=this.className;this.className=b+(b.length?" ":"")+c}return this},removeClass:function(b){return DOMAssistant.CSS.replaceClass.call(this,b)},replaceClass:function(c,d){var b=new RegExp(("(^|\\s)"+c+"(\\s|$)"),"i");this.className=this.className.replace(b,function(e,g,f){return d?(g+d+f):" "}).replace(/^\s+|\s+$/g,"");return this},hasClass:function(b){return new RegExp(("(^|\\s)"+b+"(\\s|$)"),"i").test(this.className)},setStyle:function(d,e){if("filters" in this&&(typeof d==="string"?/opacity/i.test(d):a(d.opacity))){this.style.zoom=1;this.style.filter=(this.style.filter||"").replace(/alpha\([^)]*\)/,"")+"alpha(opacity="+(a(d.opacity)?d.opacity:e)*100+")"}if(a(this.style.cssText)){var b=this.style.cssText;if(typeof d==="object"){for(var c in d){if(typeof c==="string"){b+=";"+c+":"+d[c]}}}else{b+=";"+d+":"+e}this.style.cssText=b}return this},getStyle:function(b){var d="";b=b.toLowerCase();if(document.defaultView&&document.defaultView.getComputedStyle){d=document.defaultView.getComputedStyle(this,"").getPropertyValue(b)}else{if(this.currentStyle){if("filters" in this&&/^opacity$/.test(b)){var c=this.style.filter;d=c&&c.indexOf("opacity=")>=0?parseFloat(c.match(/opacity=([^)]*)/)[1])/100:1}else{b=b.replace(/^float$/,"styleFloat").replace(/\-(\w)/g,function(e,f){return f.toUpperCase()});d=this.currentStyle[b]}if(d==="auto"&&/^(width|height)$/.test(b)&&this.currentStyle.display!=="none"){d=this["offset"+b.charAt(0).toUpperCase()+b.substr(1)]+"px"}}}return d}}}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){var a=DOMAssistant.$$;return{init:function(){DOMAssistant.setCache(false)},create:function(d,c,b,e){var f=a(document.createElement(d));if(c){f=f.setAttributes(c)}if(DOMAssistant.def(e)){f.addContent(e)}if(b){this.appendChild(f)}return f},setAttributes:function(b){if(DOMAssistant.isIE){var c=function(g,e,f){var d=e.toLowerCase();switch(d){case"name":case"type":return a(document.createElement(g.outerHTML.replace(new RegExp(d+"=[a-zA-Z]+")," ").replace(">"," "+d+"="+f+">")));case"style":g.style.cssText=f;return g;default:g[DOMAssistant.camel[d]||e]=f;return g}};DOMAssistant.Content.setAttributes=function(d){var h=this;var g=this.parentNode;for(var f in d){if(typeof d[f]==="string"||typeof d[f]==="number"){var e=c(h,f,d[f]);if(g&&/(name|type)/i.test(f)){if(h.innerHTML){e.innerHTML=h.innerHTML}g.replaceChild(e,h)}h=e}}return h}}else{DOMAssistant.Content.setAttributes=function(d){for(var e in d){if(/class/i.test(e)){this.className=d[e]}else{this.setAttribute(e,d[e])}}return this}}return DOMAssistant.Content.setAttributes.call(this,b)},addContent:function(f){var d=typeof f;if(d==="string"||d==="number"){if(!this.firstChild){this.innerHTML=f}else{var c=document.createElement("div");c.innerHTML=f;for(var b=c.childNodes.length-1,e=null;b>=0;b--){e=this.insertBefore(c.childNodes[b],e)}}}else{if(d==="object"||(d==="function"&&!!f.nodeName)){this.appendChild(f)}}return this},replaceContent:function(b){if(!!this.firstChild){DOMAssistant.clearHandlers.apply(this);this.innerHTML=""}return DOMAssistant.Content.addContent.call(this,b)},replace:function(g,b){var f=typeof g;if(f==="string"||f==="number"){var e=this.parentNode;var d=DOMAssistant.Content.create.call(e,"div",null,false,g);for(var c=d.childNodes.length-1;c>=0;c--){e.insertBefore(d.childNodes[c],this.nextSibling)}g=this.nextSibling;e.removeChild(this)}else{if(f==="object"||(f==="function"&&!!g.nodeName)){this.parentNode.replaceChild(g,this)}}return b?g:this},remove:function(){this.parentNode.removeChild(this);return null}}}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var e,c=1,d=!!document.addEventListener,b={focus:true,blur:true},a=function(f){return DOMAssistant.isIE?{focus:"focusin",blur:"focusout"}[f]||f:f};return{publicMethods:["triggerEvent","addEvent","removeEvent","relayEvent","unrelayEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;e=this.handleEvent},triggerEvent:function(g,m,l){g=a(g);var j=l||{type:g,target:m||this,currentTarget:this,bubbles:true,cancelable:false,preventDefault:function(){},stopPropagation:function(){this.bubbles=false},timeStamp:+new Date()};if(this.events&&this.events[g]){for(var h=0,f=this.events[g].length;h<f;h++){this.events[g][h].call(this,j)}}else{if(typeof this["on"+g]==="function"){this["on"+g].call(this,j)}}var k=this.parentNode;if(j.bubbles&&k&&k.nodeType===1){DOMAssistant.Events.triggerEvent.call(k,g,m,j)}return this},addEvent:function(f,h,i){if(/^DOM/.test(f)&&d){this.addEventListener(f,h,false)}else{f=a(f);this.uniqueHandlerId=this.uniqueHandlerId||c++;if(!(h.attachedElements&&h.attachedElements[f+this.uniqueHandlerId])){this.events=this.events||{};if(!this.events[f]){this.events[f]=[];var g=this["on"+f];if(g){this.events[f].push(g);this["on"+f]=null}if(d){this.addEventListener(f,e,b[f])}else{this["on"+f]=e}}h.relay=i;this.events[f].push(h);h.attachedElements=h.attachedElements||{};h.attachedElements[f+this.uniqueHandlerId]=true}}return this},handleEvent:function(f){var m=f||event,l=a(m.type),n=m.target||m.srcElement||document;while(n.nodeType!==1&&n.parentNode){n=n.parentNode}m.eventTarget=n;var g=this.events[l].slice(0),k,j;if((k=g.length)){for(var h=0;h<k;h++){if(typeof g[h]==="function"){j=g[h].call(this,m)}}return j}},removeEvent:function(f,k,l){f=a(f);if(this.events&&this.events[f]){var g=this.events[f];for(var j,h=g.length-1;h>=0;h--){j=k||g[h];if(g[h]===j&&(!l&&!j.relay||l&&j.relay)){delete g[h];g.splice(h,1);if(j.attachedElements){j.attachedElements[f+this.uniqueHandlerId]=null}}}if(!this.events[f].length){if(d){this.removeEventListener(f,e,b[f])}else{this["on"+f]=null}}}else{if(this["on"+f]&&!k&&!l){this["on"+f]=null}}return this},relayEvent:function(g,f,h){return DOMAssistant.Events.addEvent.call(this,g,function(n){n=n||event;var m=n.target||n.srcElement,j=arguments,k=0,o,l=this.cssSelect(f);while((o=l[k++])){if(o.contains?o.contains(m):!!((o.compareDocumentPosition(m)||16)&16)){return h.apply(o,j)}}},true)},unrelayEvent:function(f){return DOMAssistant.Events.removeEvent.call(this,f,null,true)},preventDefault:function(f){return(DOMAssistant.Events.preventDefault=(f&&f.preventDefault)?function(g){g.preventDefault()}:function(g){event.returnValue=false})(f)},cancelBubble:function(f){return(DOMAssistant.Events.cancelBubble=(f&&f.stopPropagation)?function(g){g.stopPropagation()}:function(g){event.cancelBubble=true})(f)}}}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var DOMLoaded=false,DOMLoadTimer=null,functionsToCall=[],addedStrings={},errorHandling=null,execFunctions=function(){for(var i=0,il=functionsToCall.length;i<il;i++){try{functionsToCall[i]()}catch(e){if(errorHandling&&typeof errorHandling==="function"){errorHandling(e)}}}functionsToCall=[]},DOMHasLoaded=function(){if(DOMLoaded){return}DOMLoaded=true;execFunctions()};
/*@cc_on @if(@_win32||@_win64)if(document.getElementById){document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");document.getElementById("ieScriptLoad").onreadystatechange=function(){if(this.readyState==="complete"){DOMHasLoaded()}}}@end@*/
if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMHasLoaded,false)}if(/KHTML|WebKit|iCab/i.test(navigator.userAgent)){DOMLoadTimer=setInterval(function(){if(/loaded|complete/i.test(document.readyState)){DOMHasLoaded();clearInterval(DOMLoadTimer)}},10)}window.onload=DOMHasLoaded;return{DOMReady:function(){for(var i=0,il=arguments.length,funcRef;i<il;i++){funcRef=arguments[i];if(!funcRef.DOMReady&&!addedStrings[funcRef]){if(typeof funcRef==="string"){addedStrings[funcRef]=true;funcRef=new Function(funcRef)}funcRef.DOMReady=true;functionsToCall.push(funcRef)}}if(DOMLoaded){execFunctions()}},setErrorHandling:function(funcRef){errorHandling=funcRef}}}();DOMAssistant.DOMReady=DOMAssistant.DOMLoad.DOMReady;