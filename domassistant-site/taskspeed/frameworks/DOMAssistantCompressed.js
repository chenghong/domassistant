// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation, version 2.8
var DOMAssistant=function(){var h=function(){},d=/*@cc_on!@*/false,g=d&&parseFloat(navigator.appVersion)<6,c={},l={},a=true,k={accesskey:"accessKey","class":"className",colspan:"colSpan","for":"htmlFor",maxlength:"maxLength",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",valign:"vAlign",cellspacing:"cellSpacing",cellpadding:"cellPadding"},j={rules:/\s*(,)\s*/g,selector:/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+\s*(\^|\$|\*|\||~)?(=\s*([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_\.]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.\'\"]+\]+)|(:\w+[\w\-]*))\))?)*)?(>|\+|~)?/,id:/^#([\w\u00C0-\uFFFF\-\_]+)$/,tag:/^(\w+)/,relation:/^(>|\+|~)$/,pseudo:/^:(\w[\w\-]*)(\((.+)\))?$/,pseudos:/:(\w[\w\-]*)(\(([^\)]+)\))?/g,attribs:/\[(\w+)\s*(\^|\$|\*|\||~)?=?\s*([\w\u00C0-\uFFFF\s\-_\.]+|"[^"]*"|'[^']*')?\]/g,classes:/\.([\w\u00C0-\uFFFF\-_]+)/g,quoted:/^["'](.*)["']$/,nth:/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/},f=function(o,p,m){var n=o.tagName;while((o=o[p+"Sibling"])&&(o.nodeType!==1||(m?o.tagName!==n:o.tagName==="!"))){}return o},b=function(m){return typeof m!=="undefined"},i=function(m){return m.sort(m[0].sourceIndex?function(o,n){return o.sourceIndex-n.sourceIndex}:function(o,n){return 3-(o.compareDocumentPosition(n)&6)})};var e=function(n,m){n.push.apply(n,[].slice.apply(m));return n};if(d){e=function(o,n){if(n.slice){return o.concat(n)}var m=0,p;while((p=n[m++])){o[o.length]=p}return o}}return{isIE:d,camel:k,def:b,allMethods:[],publicMethods:["prev","next","hasChild","cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(d){h=Array}h.prototype=[];h.prototype.each=function(o){for(var n=0,m=this.length;n<m;n++){o.call(this[n],n)}return this};h.prototype.first=function(){return b(this[0])?DOMAssistant.addMethodsToElm(this[0]):null};h.prototype.end=function(){return this.previousSet};h.prototype.indexOf=h.prototype.indexOf||function(o){for(var n=0,m=this.length;n<m;n++){if(n in this&&this[n]===o){return n}}return -1};h.prototype.map=function(p){var o=[];for(var n=0,m=this.length;n<m;n++){if(n in this){o[n]=p.call(this[n],n)}}return o};h.prototype.filter=function(p){var o=new h();o.previousSet=this;for(var n=0,m=this.length;n<m;n++){if(n in this&&p.call(this[n],n)){o.push(this[n])}}return o};h.prototype.every=function(o){for(var n=0,m=this.length;n<m;n++){if(n in this&&!o.call(this[n],n)){return false}}return true};h.prototype.some=function(o){for(var n=0,m=this.length;n<m;n++){if(n in this&&o.call(this[n],n)){return true}}return false};this.attach(this)},addMethods:function(m,n){if(!b(this.allMethods[m])){this.allMethods[m]=n;this.addHTMLArrayPrototype(m,n)}},addMethodsToElm:function(n){for(var m in this.allMethods){if(b(this.allMethods[m])){this.applyMethod.call(n,m,this.allMethods[m])}}return n},applyMethod:function(n,m){if(typeof this[n]!=="function"){this[n]=m}},attach:function(o){var m=o.publicMethods;if(!b(m)){for(var q in o){if(q!=="init"&&b(o[q])){this.addMethods(q,o[q])}}}else{if(m.constructor===Array){for(var n=0,p;(p=m[n]);n++){this.addMethods(p,o[p])}}}if(typeof o.init==="function"){o.init()}},addHTMLArrayPrototype:function(m,n){h.prototype[m]=function(){var q=new h();q.previousSet=this;for(var p=0,o=this.length;p<o;p++){q.push(n.apply(this[p],arguments))}return q}},clearHandlers:function(){var r=this.all||this.getElementsByTagName("*");for(var q=0,s,m;(s=r[q++]);){if(s.uniqueHandlerId&&(m=s.attributes)){for(var o=0,p=m.length,n;o<p;o++){n=m[o].nodeName.toLowerCase();if(typeof s[n]==="function"){s[n]=null}}}}},setCache:function(m){a=m},$:function(){var p=arguments[0];if(arguments.length===1&&(typeof p==="object"||(typeof p==="function"&&!!p.nodeName))){return DOMAssistant.$$(p)}var r=new h();for(var n=0,m,q;(m=arguments[n]);n++){if(typeof m==="string"){m=m.replace(/^[^#]*(#)/,"$1");if(j.id.test(m)){if((q=DOMAssistant.$$(m.substr(1),false))){r.push(q)}}else{var o=(document.all||document.getElementsByTagName("*")).length;r=(!document.querySelectorAll&&a&&l.rule&&l.rule===m&&l.doc===o)?l.elms:e(r,DOMAssistant.cssSelection.call(document,m));l={rule:m,elms:r,doc:o}}}}return r},$$:function(r,o){var q=(typeof r==="object"||(typeof r==="function"&&!!r.nodeName))?r:document.getElementById(r);var p=o||true;if(typeof r==="string"&&q&&q.id!==r){q=null;for(var m=0,n;(n=document.all[m]);m++){if(n.id===r){q=n;break}}}if(q&&p){DOMAssistant.addMethodsToElm(q)}return q},prev:function(){return DOMAssistant.$$(f(this,"previous"))},next:function(){return DOMAssistant.$$(f(this,"next"))},hasChild:function(m){return this===document||this!==m&&(this.contains?this.contains(m):!!(this.compareDocumentPosition(m)&16))},getSequence:function(q){var r,p=2,n=-1,m=-1,o=j.nth.exec(q.replace(/^0n\+/,"").replace(/^2n$/,"even").replace(/^2n+1$/,"odd"));if(!o){return null}if(o[2]){r=(o[2]==="odd")?1:2;m=(r===1)?1:0}else{if(o[3]){r=n=parseInt(o[3],10);p=0}else{if(o[4]){p=o[6]?parseInt(o[6],10):1;r=o[7]?parseInt(o[7],10):0;while(r<1){r+=p}m=(r>=p)?(r-p)%p:r}else{if(o[8]){p=o[10]?parseInt(o[10],10):1;r=n=parseInt(o[11],10);while(r>p){r-=p}m=(n>=p)?(n-p)%p:n}}}}return{start:r,add:p,max:n,modVal:m}},cssByDOM:function(p){var aH=p.replace(j.rules,"$1").split(",");var az=new h(),ao=[],aE=[];var T,aQ,G,C,L,at,w,af,z,I,v,ap,aK,x,aG;try{T=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g")}catch(ah){T=/[^\s]+/g}function aN(q){q=q||ao;for(var o=0,m=q.length;o<m;o++){q[o].removeAttribute("added")}}function B(){for(var o=0,m=aQ.length;o<m;o++){aQ[o].childElms=null}}function al(o,m){for(var q=0,t;(t=o[q]);q++){var s=false;for(var n=0,r;(r=m[n]);n++){if(r===t){s=true;m.splice(n,1);break}}if(s){o.splice(q--,1)}}return o}function D(n,m){return d?n[k[m.toLowerCase()]||m]:n.getAttribute(m,2)}function N(m,n){m=m?m.replace(j.quoted,"$1").replace(/\./g,"\\."):null;switch(n){case"^":return"^"+m;case"$":return m+"$";case"*":return m;case"|":return"^"+m+"(\\-\\w+)*$";case"~":return"\\b"+m+"\\b";default:return m?"^"+m+"$":null}}function Q(m,n){return g?((m==="*")?n.all:n.all.tags(m)):n.getElementsByTagName(m)}function aI(m,n){m=m||"*";n=n||document;return(n===document||n.lastModified)?c[m]||(c[m]=Q(m,document)):Q(m,n)}function aq(s,a5,q){aQ=[];var r=a5.split("-"),aR=[],aW=0,a4=/\-of\-type$/.test(a5),aV,u={first:function(a6){return !f(a6,"previous",a4)},last:function(a6){return !f(a6,"next",a4)},empty:function(a6){return !a6.firstChild},enabled:function(a6){return !a6.disabled&&a6.type!=="hidden"},disabled:function(a6){return a6.disabled},checked:function(a6){return a6.checked},contains:function(a6){return(a6.innerText||a6.textContent||"").indexOf(q.replace(j.quoted,"$1"))>-1},other:function(a6){return D(a6,a5)===q}};function o(a6){while((z=s[aW++])){if(u[a6](z)){aR[aR.length]=z}}return aR}var a1=r[0]||null;if(a1&&u[a1]){return o(a1)}switch(a1){case"only":var aS;while((z=s[aW++])){I=z.parentNode;if(I!==aS){if(u.first(z)&&u.last(z)){aR[aR.length]=z}aS=I}}break;case"nth":if(/^n$/.test(q)){aR=s}else{var a3=(r[1]==="last")?["lastChild","previousSibling"]:["firstChild","nextSibling"];aG=DOMAssistant.getSequence(q);if(aG){while((z=s[aW++])){I=z.parentNode;if(!I.childElms){var a0=0,aX=z.nodeName;aK=aG.start;x=I[a3[0]];while(x&&(aG.max<0||aK<=aG.max)){var a2=x.nodeName;if((a4&&a2===aX)||(!a4&&x.nodeType===1&&a2!=="!")){if(++a0===aK){if(a2===aX){aR[aR.length]=x}aK+=aG.add}}x=x[a3[1]]}I.childElms=true;aQ[aQ.length]=I}}B()}}break;case"target":var n=document.location.hash.slice(1);if(n){while((z=s[aW++])){if(D(z,"name")===n||D(z,"id")===n){aR[aR.length]=z;break}}}break;case"not":if((aV=j.pseudo.exec(q))){aR=al(s,aq(s,aV[1]?aV[1].toLowerCase():null,aV[3]||null))}else{for(var aY in j){if(j[aY].lastIndex){j[aY].lastIndex=0}}q=q.replace(j.id,"[id=$1]");var aU=j.tag.exec(q);var t=j.classes.exec(q);var aT=j.attribs.exec(q);var m=new RegExp(aT?N(aT[3],aT[2]):"(^|\\s)"+(aU?aU[1]:t?t[1]:"")+"(\\s|$)","i");while((v=s[aW++])){ap=null;if(aU&&!m.test(v.nodeName)||t&&!m.test(v.className)){ap=v}else{if(aT){var aZ=D(v,aT[1]);if(!aZ||!m.test(aZ)){ap=v}}}if(ap&&!ap.added){ap.added=true;aR[aR.length]=ap}}}break;default:return o("other")}return aR}for(var aj=0;(G=aH[aj]);aj++){if(aj&&aH.slice(0,aj).indexOf(G)>-1){continue}ao=[this];C=G.match(T);for(var ag=0,E;(E=C[ag]);ag++){aE=[];if(ag>0&&j.relation.test(E)){if((L=j.relation.exec(E))){var am=null,aO=C[ag+1];if((at=j.tag.exec(aO))){at=at[1];w=new RegExp("(^|\\s)"+at+"(\\s|$)","i")}else{if(j.id.test(aO)){am=DOMAssistant.$(aO)||null}}for(var ae=0,K;(K=ao[ae]);ae++){switch(L[0]){case">":var aB=am||aI(at,K);for(var ac=0,aw;(aw=aB[ac]);ac++){if(aw.parentNode===K){aE[aE.length]=aw}}break;case"+":if((K=f(K,"next"))){if((am&&am[0]===K)||(!am&&(!at||w.test(K.nodeName)))){aE[aE.length]=K}}break;case"~":while((K=K.nextSibling)&&!K.added){if((am&&am[0]===K)||(!am&&(!at||w.test(K.nodeName)))){K.added=true;aE[aE.length]=K}}break}}ao=aE;aN();E=C[++ag];if(/^\w+$/.test(E)||j.id.test(E)){continue}ao.skipTag=true}}var ar=j.selector.exec(E);var aD={tag:(!ar[1]||ar[3]==="*")?"*":ar[1],id:(ar[3]!=="*")?ar[2]:null,allClasses:ar[4],allAttr:ar[6],allPseudos:ar[11]};if(aD.id){var M=0,ak=document.getElementById(aD.id.replace(/#/,""));if(ak){while(ao[M]&&!DOMAssistant.hasChild.call(ao[M],ak)){M++}aE=M<ao.length?[ak]:[]}ao=aE}else{if(aD.tag&&!ao.skipTag){if(ag===0&&!aE.length&&ao.length===1){ao=aE=e([],aI(aD.tag,ao[0]))}else{for(var ab=0,aL=ao.length,ax,au;ab<aL;ab++){ax=aI(aD.tag,ao[ab]);for(var Y=0;(au=ax[Y]);Y++){if(!au.added){au.added=true;aE[aE.length]=au}}}ao=aE;aN()}}}if(!aE.length){break}ao.skipTag=false;if(aD.allClasses){var X=0,Z=[],H=aD.allClasses.split(".").slice(1);while((af=ao[X++])){var ad=true,av=af.className;if(av&&av.length){av=av.split(" ");for(var V=0,W=H.length;V<W;V++){if(av.indexOf(H[V])<0){ad=false;break}}if(ad){Z[Z.length]=af}}}ao=aE=Z}if(aD.allAttr){var R=0,aA=[],aa=[],aF=aD.allAttr.match(/\[[^\]]+\]/g);for(var U=0,y=aF.length,S,aM;U<y;U++){j.attribs.lastIndex=0;S=j.attribs.exec(aF[U]);aM=N(S[3],S[2]||null);aA[U]=[(aM?new RegExp(aM):null),S[1]]}while((af=aE[R++])){for(var P=0,aC=aA.length;P<aC;P++){var A=true,ay=aA[P][0],ai=D(af,aA[P][1]);if(!ay&&ai===true){continue}if((!ay&&(!ai||typeof ai!=="string"||!ai.length))||(!!ay&&!ay.test(ai))){A=false;break}}if(A){aa[aa.length]=af}}ao=aE=aa}if(aD.allPseudos){var F=aD.allPseudos.match(j.pseudos);for(var O=0,an=F.length;O<an;O++){j.pseudos.lastIndex=0;var aP=j.pseudos.exec(F[O]);var J=aP[1]?aP[1].toLowerCase():null;var aJ=aP[3]||null;aE=aq(aE,J,aJ);aN(aE)}ao=aE}}az=e(az,ao)}return(az.length&&aH.length>1)?i(az):az},cssByXpath:function(n){var o={xhtml:"http://www.w3.org/1999/xhtml"};var p=(document.documentElement.namespaceURI===o.xhtml)?"xhtml:":"";var m=function q(r){return o[r]||null};DOMAssistant.cssByXpath=function(H){if(/:checked/.test(H)){return DOMAssistant.cssByDOM.call(this,H)}var x=H.replace(j.rules,"$1").split(",");var w=new h();var L,N,D,u,v,z;var M=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");function G(P,S,R,Q){Q=(Q||"").replace(j.quoted,"$1");switch(R){case"^":return"[starts-with(@"+S+', "'+Q+'")]';case"$":return"[substring(@"+S+", (string-length(@"+S+") - "+(Q.length-1)+"), "+Q.length+') = "'+Q+'"]';case"*":return'[contains(concat(" ", @'+S+', " "), "'+Q+'")]';case"|":return"[@"+S+'="'+Q+'" or starts-with(@'+S+', "'+Q+'-")]';case"~":return'[contains(concat(" ", @'+S+', " "), " '+Q+' ")]';default:return"[@"+S+(Q.length?'="'+Q+'"':"")+"]"}}function J(X,W,R){X=/\-child$/.test(W)?"*":X;var S="",U=W.split("-"),T;switch(U[0]){case"nth":if(!/^n$/.test(R)){var Q=((U[1]==="last")?"(count(following-sibling::":"(count(preceding-sibling::")+X+") + 1)";if((z=DOMAssistant.getSequence(R))){S=(z.start===z.max)?Q+" = "+z.start:Q+" mod "+z.add+" = "+z.modVal+((z.start>1)?" and "+Q+" >= "+z.start:"")+((z.max>0)?" and "+Q+" <= "+z.max:"")}}break;case"not":var V=(T=j.pseudo.exec(R))?J(X,T[1]?T[1].toLowerCase():null,T[3]||null):R.replace(j.id,"[id=$1]").replace(j.tag,"self::$1").replace(j.classes,'contains(concat(" ", @class, " "), " $1 ")').replace(j.attribs,G);S="not("+V+")";break;case"first":return"not(preceding-sibling::"+X+")";case"last":return"not(following-sibling::"+X+")";case"only":return"not(preceding-sibling::"+X+" or following-sibling::"+X+")";case"empty":return"count(child::*) = 0 and string-length(text()) = 0";case"contains":return'contains(., "'+R.replace(j.quoted,"$1")+'")';case"enabled":return'not(@disabled) and not(@type="hidden")';case"disabled":return"@disabled";case"target":var P=document.location.hash.slice(1);return'@name="'+P+'" or @id="'+P+'"';default:return"@"+W+'="'+R+'"'}return S}for(var I=0;(L=x[I]);I++){if(I&&w.indexOf.call(x.slice(0,I),L)>-1){continue}N=L.match(M);D=D?D+" | .":".";for(var F=0,K=N.length;F<K;F++){u=j.selector.exec(N[F]);v={tag:p+((!u[1]||u[3]==="*")?"*":u[1]),id:(u[3]!=="*")?u[2]:null,allClasses:u[4],allAttr:u[6],allPseudos:u[11],tagRelation:u[23]};D+=(v.tagRelation?({">":"/","+":"/following-sibling::*[1]/self::","~":"/following-sibling::"}[v.tagRelation]||""):((F>0&&j.relation.test(N[F-1]))?v.tag:("//"+v.tag)))+(v.id||"").replace(j.id,'[@id = "$1"]')+(v.allClasses||"").replace(j.classes,'[contains(concat(" ", @class, " "), " $1 ")]')+(v.allAttr||"").replace(j.attribs,G);if(v.allPseudos){var y=v.allPseudos.match(j.pseudos);for(var E=0,s=y.length;E<s;E++){j.pseudos.lastIndex=0;var t=j.pseudos.exec(y[E]),O=t[1]?t[1].toLowerCase():null,r=t[3]||null,A=J(v.tag,O,r);if(A.length){D+="["+A+"]"}}}}}if(D){var C=document.evaluate(D,this,m,0,null),B;while((B=C.iterateNext())){w.push(B)}}return(w.length&&x.length>1)?i(w):w};return DOMAssistant.cssByXpath.call(this,n)},cssSelection:function(n){DOMAssistant.cssSelection=document.evaluate?DOMAssistant.cssByXpath:DOMAssistant.cssByDOM;if(document.querySelectorAll){var m=DOMAssistant.cssSelection;DOMAssistant.cssSelection=function(o){try{return e(new h(),this.querySelectorAll(o))}catch(p){return m.call(this,o)}}}return DOMAssistant.cssSelection.call(this,n)},cssSelect:function(m){return DOMAssistant.cssSelection.call(this,m)},elmsByClass:function(o,m){var n=(m||"")+"."+o;return DOMAssistant.cssSelection.call(this,n)},elmsByAttribute:function(n,o,m,q){var p=(m||"")+"["+n+((o&&o!=="*")?((q||"")+"="+o+"]"):"]");return DOMAssistant.cssSelection.call(this,p)},elmsByTag:function(m){return DOMAssistant.cssSelection.call(this,m)}}}();DOMAssistant.initCore();DOMAssistant.AJAX=function(){var globalXMLHttp=null,readyState=0,status=-1,statusText="",requestPool=[],createAjaxObj=function(url,method,callback,addToContent){var params=null;if(/POST/i.test(method)){url=url.split("?");params=url[1];url=url[0]}return{url:url,method:method,callback:callback,params:params,headers:{},responseType:"text",addToContent:addToContent||false}};return{publicMethods:["ajax","get","post","load"],initRequest:function(){var XMLHttp=null;if(!!window.XMLHttpRequest&&!DOMAssistant.isIE){XMLHttp=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new XMLHttpRequest()}}else{if(!!window.ActiveXObject){var XMLHttpMS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var i=0;i<XMLHttpMS.length;i++){try{XMLHttp=new window.ActiveXObject(XMLHttpMS[i]);DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new window.ActiveXObject(XMLHttpMS[i])};break}catch(e){XMLHttp=null}}}}return XMLHttp},ajax:function(ajaxObj){if(!ajaxObj.noParse&&ajaxObj.url&&/\?/.test(ajaxObj.url)&&ajaxObj.method&&/POST/i.test(ajaxObj.method)){var url=ajaxObj.url.split("?");ajaxObj.url=url[0];ajaxObj.params=url[1]+((url[1].length>0&&ajaxObj.params)?("&"+ajaxObj.params):"")}return DOMAssistant.AJAX.makeCall.call(this,ajaxObj)},get:function(url,callback,addToContent){return DOMAssistant.AJAX.makeCall.call(this,createAjaxObj(url,"GET",callback,addToContent))},post:function(url,callback){return DOMAssistant.AJAX.makeCall.call(this,createAjaxObj(url,"POST",callback))},load:function(url,addToContent){DOMAssistant.AJAX.get.call(this,url,DOMAssistant.AJAX.replaceWithAJAXContent,addToContent)},makeCall:function(ajaxObj){var XMLHttp=DOMAssistant.AJAX.initRequest();if(XMLHttp){globalXMLHttp=XMLHttp;(function(elm){var url=ajaxObj.url,method=ajaxObj.method||"GET",callback=ajaxObj.callback,params=ajaxObj.params,headers=ajaxObj.headers,responseType=ajaxObj.responseType||"text",addToContent=ajaxObj.addToContent,timeout=ajaxObj.timeout||null,ex=ajaxObj.exception,timeoutId=null,done=false;XMLHttp.open(method,url,true);XMLHttp.setRequestHeader("AJAX","true");XMLHttp.setRequestHeader("X-Requested-With","XMLHttpRequest");if(method==="POST"){XMLHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");XMLHttp.setRequestHeader("Content-length",params?params.length:0);if(XMLHttp.overrideMimeType){XMLHttp.setRequestHeader("Connection","close")}}if(responseType==="json"){XMLHttp.setRequestHeader("Accept","application/json, text/javascript, */*")}for(var i in headers){if(typeof i==="string"){XMLHttp.setRequestHeader(i,headers[i])}}if(typeof callback==="function"){XMLHttp.onreadystatechange=function(){try{if(XMLHttp.readyState===4&&!done){window.clearTimeout(timeoutId);done=true;status=XMLHttp.status;statusText=XMLHttp.statusText;readyState=4;if((status||location.protocol!=="file:")&&(status<200||status>=300)){throw new Error(statusText)}var response=/xml/i.test(responseType)?XMLHttp.responseXML:XMLHttp.responseText;if(/json/i.test(responseType)&&!!response){response=(typeof JSON==="object"&&typeof JSON.parse==="function")?JSON.parse(response):eval("("+response+")")}globalXMLHttp=null;XMLHttp.onreadystatechange=function(){};requestPool.push(XMLHttp);callback.call(elm,response,addToContent)}}catch(e){globalXMLHttp=XMLHttp=null;if(typeof ex==="function"){ex.call(elm,e);ex=null}}}}XMLHttp.send(params);if(timeout){timeoutId=window.setTimeout(function(){if(!done){XMLHttp.abort();done=true;if(typeof ex==="function"){readyState=0;status=408;statusText="Request timeout";globalXMLHttp=XMLHttp=null;ex.call(elm,new Error(statusText));ex=null}}},timeout)}})(this)}return this},replaceWithAJAXContent:function(content,add){if(add){this.innerHTML+=content}else{DOMAssistant.clearHandlers.apply(this);this.innerHTML=content}},getReadyState:function(){return(globalXMLHttp&&DOMAssistant.def(globalXMLHttp.readyState))?globalXMLHttp.readyState:readyState},getStatus:function(){return status},getStatusText:function(){return statusText}}}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){var a=DOMAssistant.def;return{addClass:function(c){if(!DOMAssistant.CSS.hasClass.call(this,c)){var b=this.className;this.className=b+(b.length?" ":"")+c}return this},removeClass:function(b){return DOMAssistant.CSS.replaceClass.call(this,b)},replaceClass:function(c,d){var b=new RegExp(("(^|\\s)"+c+"(\\s|$)"),"i");this.className=this.className.replace(b,function(e,g,f){return d?(g+d+f):" "}).replace(/^\s+|\s+$/g,"");return this},hasClass:function(b){return(" "+this.className+" ").indexOf(b)>-1},setStyle:function(e,f){var d=this.style;if("filters" in this&&(typeof e==="string"?/opacity/i.test(e):a(e.opacity))){d.zoom=1;d.filter=(d.filter||"").replace(/alpha\([^)]*\)/,"")+"alpha(opacity="+(a(e.opacity)?e.opacity:f)*100+")"}if(a(d.cssText)){var b=d.cssText;if(typeof e==="object"){for(var c in e){if(typeof c==="string"){b+=";"+c+":"+e[c]}}}else{b+=";"+e+":"+f}d.cssText=b}return this},getStyle:function(b){var d="";b=b.toLowerCase();if(document.defaultView&&document.defaultView.getComputedStyle){d=document.defaultView.getComputedStyle(this,"").getPropertyValue(b)}else{if(this.currentStyle){if("filters" in this&&/^opacity$/.test(b)){var c=this.style.filter;d=c&&c.indexOf("opacity=")>=0?parseFloat(c.match(/opacity=([^)]*)/)[1])/100:1}else{b=b.replace(/^float$/,"styleFloat").replace(/\-(\w)/g,function(e,f){return f.toUpperCase()});d=this.currentStyle[b]}if(d==="auto"&&/^(width|height)$/.test(b)&&this.currentStyle.display!=="none"){d=this["offset"+b.charAt(0).toUpperCase()+b.substr(1)]+"px"}}}return d}}}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){var a=DOMAssistant.$$;return{init:function(){DOMAssistant.setCache(false)},create:function(d,c,b,e){var f=a(document.createElement(d));if(c){f=f.setAttributes(c)}if(DOMAssistant.def(e)){f.addContent(e)}if(b){this.appendChild(f)}return f},setAttributes:function(b){if(DOMAssistant.isIE){var c=function(g,e,f){var d=e.toLowerCase();switch(d){case"name":case"type":return a(document.createElement(g.outerHTML.replace(new RegExp(d+"=[a-zA-Z]+")," ").replace(">"," "+d+"="+f+">")));case"style":g.style.cssText=f;return g;default:g[DOMAssistant.camel[d]||e]=f;return g}};DOMAssistant.Content.setAttributes=function(d){var h=this;var g=this.parentNode;for(var f in d){if(typeof d[f]==="string"||typeof d[f]==="number"){var e=c(h,f,d[f]);if(g&&/(name|type)/i.test(f)){if(h.innerHTML){e.innerHTML=h.innerHTML}g.replaceChild(e,h)}h=e}}return h}}else{DOMAssistant.Content.setAttributes=function(d){for(var e in d){if(/class/i.test(e)){this.className=d[e]}else{this.setAttribute(e,d[e])}}return this}}return DOMAssistant.Content.setAttributes.call(this,b)},addContent:function(f){var d=typeof f;if(d==="string"||d==="number"){if(!this.firstChild){this.innerHTML=f}else{var c=document.createElement("div");c.innerHTML=f;for(var b=c.childNodes.length-1,e=null;b>=0;b--){e=this.insertBefore(c.childNodes[b],e)}}}else{if(d==="object"||(d==="function"&&!!f.nodeName)){this.appendChild(f)}}return this},replaceContent:function(b){if(!!this.firstChild){DOMAssistant.clearHandlers.apply(this);this.innerHTML=""}return DOMAssistant.Content.addContent.call(this,b)},replace:function(g,b){var f=typeof g;if(f==="string"||f==="number"){var e=this.parentNode;var d=DOMAssistant.Content.create.call(e,"div",null,false,g);for(var c=d.childNodes.length-1;c>=0;c--){e.insertBefore(d.childNodes[c],this.nextSibling)}g=this.nextSibling;e.removeChild(this)}else{if(f==="object"||(f==="function"&&!!g.nodeName)){this.parentNode.replaceChild(g,this)}}return b?g:this},remove:function(){this.parentNode.removeChild(this);return null}}}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var e,c=1,d=!!document.addEventListener,b={focus:true,blur:true},a=function(f){return DOMAssistant.isIE?{focus:"focusin",blur:"focusout"}[f]||f:f};return{publicMethods:["triggerEvent","addEvent","removeEvent","relayEvent","unrelayEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;e=this.handleEvent},triggerEvent:function(g,m,l){g=a(g);var j=l||{type:g,target:m||this,currentTarget:this,bubbles:true,cancelable:false,preventDefault:function(){},stopPropagation:function(){this.bubbles=false},timeStamp:+new Date()};if(this.events&&this.events[g]){for(var h=0,f=this.events[g].length;h<f;h++){if(this.events[g][h].call(this,j)===false){j.bubbles=false}}}else{if(typeof this["on"+g]==="function"){this["on"+g].call(this,j)}}var k=this.parentNode;if(j.bubbles&&k&&k.nodeType===1){DOMAssistant.Events.triggerEvent.call(k,g,m,j)}return this},addEvent:function(f,h,i){if(/^DOM/.test(f)&&d){this.addEventListener(f,h,false)}else{f=a(f);this.uniqueHandlerId=this.uniqueHandlerId||c++;if(!(h.attachedElements&&h.attachedElements[f+this.uniqueHandlerId])){this.events=this.events||{};if(!this.events[f]){this.events[f]=[];var g=this["on"+f];if(g){this.events[f].push(g);this["on"+f]=null}if(d){this.addEventListener(f,e,b[f])}else{this["on"+f]=e}}h.relay=i;this.events[f].push(h);h.attachedElements=h.attachedElements||{};h.attachedElements[f+this.uniqueHandlerId]=true}}return this},handleEvent:function(f){var m=f||event,l=a(m.type),n=m.target||m.srcElement||document;while(n.nodeType!==1&&n.parentNode){n=n.parentNode}m.eventTarget=n;var g=this.events[l].slice(0),k,j;if((k=g.length)){for(var h=0;h<k;h++){if(typeof g[h]==="function"){j=g[h].call(this,m)}}if(j===false){DOMAssistant.cancelBubble(m)}return j}},removeEvent:function(f,k,l){f=a(f);if(this.events&&this.events[f]){var g=this.events[f];for(var j,h=g.length-1;h>=0;h--){j=k||g[h];if(g[h]===j&&(!l&&!j.relay||l&&j.relay)){g.splice(h,1);if(j.attachedElements){j.attachedElements[f+this.uniqueHandlerId]=null}}}if(!this.events[f].length){if(d){this.removeEventListener(f,e,b[f])}else{this["on"+f]=null}}}else{if(this["on"+f]&&!k&&!l){this["on"+f]=null}}return this},relayEvent:function(g,f,h){return DOMAssistant.Events.addEvent.call(this,g,function(n){n=n||event;var m=n.target||n.srcElement,j=arguments,k=0,o,l=this.cssSelect(f);while((o=l[k++])){if(o===m||DOMAssistant.hasChild.call(o,m)){return h.apply(o,j)}}},true)},unrelayEvent:function(f){return DOMAssistant.Events.removeEvent.call(this,f,null,true)},preventDefault:function(f){return(DOMAssistant.Events.preventDefault=(f&&f.preventDefault)?function(g){g.preventDefault()}:function(g){event.returnValue=false})(f)},cancelBubble:function(f){return(DOMAssistant.Events.cancelBubble=(f&&f.stopPropagation)?function(g){g.stopPropagation()}:function(g){event.cancelBubble=true})(f)}}}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var g=false,a=null,f=[],b={},c=null,d=function(){for(var j=0,h=f.length;j<h;j++){try{f[j]()}catch(k){if(c&&typeof c==="function"){c(k)}}}f=[]},e=function(){if(g){return}g=true;d()};
/*@cc_on @if(@_win32||@_win64)document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");document.getElementById("ieScriptLoad").onreadystatechange=function(){if(this.readyState==="complete"){e()}}@end@*/
if(document.addEventListener){document.addEventListener("DOMContentLoaded",e,false)}if(/KHTML|WebKit|iCab/i.test(navigator.userAgent)){a=setInterval(function(){if(/loaded|complete/i.test(document.readyState)){e();clearInterval(a)}},10)}window.onload=e;return{DOMReady:function(){for(var j=0,h=arguments.length,k;j<h;j++){k=arguments[j];if(!k.DOMReady&&!b[k]){if(typeof k==="string"){b[k]=true;k=new Function(k)}k.DOMReady=true;f.push(k)}}if(g){d()}},setErrorHandling:function(h){c=h}}}();DOMAssistant.DOMReady=DOMAssistant.DOMLoad.DOMReady;