// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation, version 2.7.3
var DOMAssistant=function(){var A=function(){};var D=/*@cc_on!@*/false;var C=[];var B={accesskey:"accessKey","class":"className",colspan:"colSpan","for":"htmlFor",maxlength:"maxLength",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",valign:"vAlign",cellspacing:"cellSpacing",cellpadding:"cellPadding"};var E={rules:/\s*(,)\s*/g,selector:/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_\.]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+)|(:\w+[\w\-]*))\))?)*)?(>|\+|~)?/,id:/^#([\w\u00C0-\uFFFF\-\_]+)$/,tag:/^(\w+)/,relation:/(>|\+|~)/,pseudo:/^(:\w+[\w\-]*)$/,pseudos:/:(\w[\w\-]*)(\(([^\)]+)\))?/g,attribs:/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+|"[^"]*"|'[^']*')?\]/g,classes:/\.([\w\u00C0-\uFFFF\-_]+)/g,quoted:/^["'](.*)["']$/,nth:/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/};var F=function(J,I){for(var H=0,G=I.length;H<G;H++){J.push(I[H])}return J};if(D){F=function(J,I){if(I.slice){return J.concat(I)}for(var H=0,G=I.length;H<G;H++){J[J.length]=I[H]}return J}}return{isIE:D,camel:B,allMethods:[],publicMethods:["cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(D){A=Array}A.prototype=[];A.prototype.each=function(I){for(var H=0,G=this.length;H<G;H++){I.call(this[H])}return this};A.prototype.first=function(){return(typeof this[0]!=="undefined")?DOMAssistant.addMethodsToElm(this[0]):null};A.prototype.end=function(){return this.previousSet};this.attach(this)},addMethods:function(G,H){if(typeof this.allMethods[G]==="undefined"){this.allMethods[G]=H;this.addHTMLArrayPrototype(G,H)}},addMethodsToElm:function(H){for(var G in this.allMethods){if(typeof this.allMethods[G]!=="undefined"){this.applyMethod.call(H,G,this.allMethods[G])}}return H},applyMethod:function(H,G){if(typeof this[H]!=="function"){this[H]=G}},attach:function(I){var G=I.publicMethods;if(typeof G==="undefined"){for(var K in I){if(K!=="init"&&typeof I[K]!=="undefined"){this.addMethods(K,I[K])}}}else{if(G.constructor===Array){for(var H=0,J;(J=G[H]);H++){this.addMethods(J,I[J])}}}if(typeof I.init==="function"){I.init()}},addHTMLArrayPrototype:function(G,H){A.prototype[G]=function(){var K=new A();K.previousSet=this;var L;for(var J=0,I=this.length;J<I;J++){L=H.apply(this[J],arguments);if(typeof L!=="undefined"&&L!==null&&L.constructor===Array){K=F(K,L)}else{K.push(L)}}return K}},$:function(){var I=arguments[0];if(arguments.length===1&&(typeof I==="object"||(typeof I==="function"&&typeof I.nodeName!=="undefined"))){return DOMAssistant.$$(I)}var K=new A();for(var H=0,G,J;(G=arguments[H]);H++){if(typeof G==="string"){G=G.replace(/^[^#]*(#)/,"$1");if(E.id.test(G)&&(J=DOMAssistant.$$(G.substr(1),false))){K.push(J)}else{K=F(K,DOMAssistant.cssSelection.call(document,G))}}}return K},$$:function(L,I){var K=(typeof L==="object"||(typeof L==="function"&&typeof L.nodeName!=="undefined"))?L:document.getElementById(L);var J=I||true;if(typeof L==="string"&&K&&K.id!==L){K=null;for(var G=0,H;(H=document.all[G]);G++){if(H.id===L){K=H;break}}}if(K&&J){DOMAssistant.addMethodsToElm(K)}return K},getSequence:function(K){var L,J=2,H=-1,G=-1;var I=E.nth.exec(K);if(!I){return null}if(I[2]){L=(I[2]==="odd")?1:2;G=(L===1)?1:0}else{if(I[3]){L=parseInt(I[3],10);J=0;H=L}else{if(I[4]){J=I[6]?parseInt(I[6],10):1;L=I[7]?parseInt(I[7],10):0;while(L<1){L+=J}G=(L>J)?(L-J)%J:((L===J)?0:L)}else{if(I[8]){J=I[10]?parseInt(I[10],10):1;L=H=parseInt(I[11],10);while(L>J){L-=J}G=(H>J)?(H-J)%J:((H===J)?0:H)}}}}return{start:L,add:J,max:H,modVal:G}},cssByDOM:function(G){var Ai=G.replace(E.rules,"$1").split(",");var Aa=new A();var AQ=[],Af=[];var Ar,S,y,N,X,AU,I,Aq,z,Ab,AA,AE,L,U,H,AR,Al,AO,J,Ah;var g;try{g=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g")}catch(AG){g=/[^\s]+/g}function Ao(e){e=e||AQ;for(var b=0,a=e.length;b<a;b++){e[b].added=null}}function M(){for(var b=0,a=Ar.length;b<a;b++){Ar[b].childElms=null}}function AM(e,a){for(var k=0,n;(n=e[k]);k++){var m=false;for(var b=0,l;(l=a[b]);b++){if(l===n){m=true;break}}if(m){e.splice(k--,1)}}return e}function O(b,a){return D?b[B[a.toLowerCase()]||a]:b.getAttribute(a,2)}function Y(a,b){a=a?a.replace(E.quoted,"$1").replace(/\./g,"\\."):null;switch(b){case"^":return"^"+a;case"$":return a+"$";case"*":return a;case"|":return"(^"+a+"(\\-\\w+)*$)";case"~":return"\\b"+a+"\\b";default:return a?"^"+a+"$":null}}function Aj(a,e){a=a||"*";e=e||document;var b=D&&parseFloat(navigator.appVersion)<6;if(e===document||e.lastModified){return C[a]||(C[a]=b?((a==="*")?document.all:document.all.tags(a)):document.getElementsByTagName(a))}return b?((a==="*")?e.all:e.all.tags(a)):e.getElementsByTagName(a)}function AS(k,Au,e){Ar=[];var i=Au.split("-"),n=[],r=0,At;var j=(At=/\-of\-type$/.test(Au))?"nodeName":"nodeType";function Av(Ax){var Aw=At?Ax.nodeName:1;while((Ax=Ax.previousSibling)&&Ax[j]!==Aw){}return Ax}function m(Ax){var Aw=At?Ax.nodeName:1;while((Ax=Ax.nextSibling)&&Ax[j]!==Aw){}return Ax}switch(i[0]){case"first":while((L=k[r++])){if(!Av(L)){n[n.length]=L}}break;case"last":while((L=k[r++])){if(!m(L)){n[n.length]=L}}break;case"only":var o;while((L=k[r++])){U=L.parentNode;if(U!==o){if(!Av(L)&&!m(L)){n[n.length]=L}o=U}}break;case"nth":if(/^n$/.test(e)){n=k}else{var As=(i[1]==="last")?["lastChild","previousSibling"]:["firstChild","nextSibling"];Ah=DOMAssistant.getSequence.call(this,e);if(Ah){while((L=k[r++])){U=L.parentNode;if(!U.childElms){Al=Ah.start;AO=0;J=U[As[0]];while(J&&(Ah.max<0||Al<=Ah.max)){if(At){if(J.nodeName===L.nodeName){if(++AO===Al){n[n.length]=J;Al+=Ah.add}}}else{if(J.nodeType===1){if(++AO===Al){if(J.nodeName===L.nodeName){n[n.length]=J}Al+=Ah.add}}}J=J[As[1]]}U.childElms=true;Ar[Ar.length]=U}}M()}}break;case"empty":while((L=k[r++])){if(!L.childNodes.length){n[n.length]=L}}break;case"enabled":while((L=k[r++])){if(!L.disabled){n[n.length]=L}}break;case"disabled":while((L=k[r++])){if(L.disabled){n[n.length]=L}}break;case"checked":while((L=k[r++])){if(L.checked){n[n.length]=L}}break;case"contains":e=e.replace(E.quoted,"$1");while((L=k[r++])){if(!L.added){if(L.innerText.indexOf(e)!==-1){L.added=true;n[n.length]=L}}}break;case"target":var b=document.location.hash.slice(1);if(b){while((L=k[r++])){if(O(L,"name")===b||O(L,"id")===b){n[n.length]=L;break}}}break;case"not":if(E.pseudo.test(e)){n=AM(k,AS(k,e.slice(1)))}else{for(var s in E){if(E[s].lastIndex){E[s].lastIndex=0}}e=e.replace(E.id,"[id=$1]");var q=E.tag.exec(e);var l=E.classes.exec(e);var p=E.attribs.exec(e);var a=new RegExp(p?Y(p[3],p[2]):"(^|\\s)"+(q?q[1]:l?l[1]:"")+"(\\s|$)","i");while((H=k[r++])){AR=null;if(q&&!a.test(H.nodeName)){AR=H}else{if(l&&!a.test(H.className)){AR=H}else{if(p){var t=O(H,p[1]);if(!t||!a.test(t)){AR=H}}}}if(AR&&!AR.added){AR.added=true;n[n.length]=AR}}}break;default:while((L=k[r++])){if(O(L,Au)===e){n[n.length]=L}}break}return n}for(var AJ=0;(S=Ai[AJ]);AJ++){if(AJ>0){y=false;for(var AI=0,AK=AJ;AI<AK;AI++){if(Ai[AJ]===Ai[AI]){y=true;break}}if(y){continue}}N=S.match(g);AQ=[this];for(var AF=0,P;(P=N[AF]);AF++){Af=[];if(AF>0&&E.relation.test(P)){if((X=E.relation.exec(P))){if((AU=E.tag.exec(N[AF+1]))){AU=AU[1];I=new RegExp("(^|\\s)"+AU+"(\\s|$)","i")}for(var AD=0,W;(W=AQ[AD]);AD++){switch(X[0]){case">":var Ac=Aj(AU,W);for(var AC=0,AX;(AX=Ac[AC]);AC++){if(AX.parentNode===W){Af[Af.length]=AX}}break;case"+":while((W=W.nextSibling)&&W.nodeType!==1){}if(W){if(!AU||I.test(W.nodeName)){Af[Af.length]=W}}break;case"~":while((W=W.nextSibling)&&!W.added){if(!AU||I.test(W.nodeName)){W.added=true;Af[Af.length]=W}}break}}AQ=Af;Ao();P=N[++AF];if(/^\w+$/.test(P)){continue}AQ.skipTag=true}}var AT=E.selector.exec(P);var Ae={tag:(!AT[1]||AT[3]==="*")?"*":AT[1],id:(AT[3]!=="*")?AT[2]:null,allClasses:AT[4],allAttr:AT[6],allPseudos:AT[11]};if(Ae.id){var AL=document.getElementById(Ae.id.replace(/#/,""));if(AL){Af=[AL]}AQ=Af}else{if(Ae.tag&&!AQ.skipTag){if(AF===0&&!Af.length&&AQ.length===1){AQ=Af=F([],Aj(Ae.tag,AQ[0]))}else{for(var AB=0,Am=AQ.length,AY,AV;AB<Am;AB++){AY=Aj(Ae.tag,AQ[AB]);for(var x=0;(AV=AY[x]);x++){if(!AV.added){AV.added=true;Af[Af.length]=AV}}}AQ=Af;Ao()}}}if(!Af.length){break}AQ.skipTag=false;if(Ae.allClasses){var T=Ae.allClasses.replace(/^\./,"").split(".");Aq=[];for(var w=0,AN=T.length;w<AN;w++){Aq[w]=new RegExp("(^|\\s)"+T[w]+"(\\s|$)")}z=[];for(var v=0,AW;(AE=AQ[v]);v++){AW=AE.className;if(AW&&!AE.added){AR=false;for(var u=0,R=Aq.length;u<R;u++){AR=Aq[u].test(AW);if(!AR){break}}if(AR){AE.added=true;z[z.length]=AE}}}Ao();AQ=Af=z}if(Ae.allAttr){var Ag=Ae.allAttr.match(/\[[^\]]+\]/g);Ab=[];for(var h=0,K=Ag.length,f,An;h<K;h++){E.attribs.lastIndex=0;f=E.attribs.exec(Ag[h]);An=Y(f[3],f[2]||null);Ab[h]=[(An?new RegExp(An):null),f[1]]}AA=[];for(var d=0,AH;(AE=Af[d]);d++){for(var c=0,Ad=Ab.length,AZ;c<Ad;c++){AR=false;AZ=Ab[c][0];AH=O(AE,Ab[c][1]);if(typeof AH==="string"&&AH.length){if(!AZ||typeof AZ==="undefined"||(AZ&&AZ.test(AH))){AR=true}}if(!AR){break}}if(AR){AA[AA.length]=AE}}AQ=Af=AA}if(Ae.allPseudos){var Q=Ae.allPseudos.match(E.pseudos);for(var Z=0,AP=Q.length;Z<AP;Z++){E.pseudos.lastIndex=0;var Ap=E.pseudos.exec(Q[Z]);var V=Ap[1]?Ap[1].toLowerCase():null;var Ak=Ap[3]||null;Af=AS(Af,V,Ak);Ao(Af)}AQ=Af}}Aa=F(Aa,AQ)}return Aa},cssByXpath:function(H){var I={xhtml:"http://www.w3.org/1999/xhtml"};var J=(document.documentElement.namespaceURI===I.xhtml)?"xhtml:":"";var G=function K(L){return I[L]||null};DOMAssistant.cssByXpath=function(g){if(/:checked/.test(g)){return DOMAssistant.cssByDOM.call(this,g)}var T=g.replace(E.rules,"$1").split(",");var S=new A();var n,L,p,d,Q,R,W;var o=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");function f(i,r,k,j){j=j?j.replace(E.quoted,"$1"):j;switch(k){case"^":return"starts-with(@"+r+', "'+j+'")';case"$":return"substring(@"+r+", (string-length(@"+r+") - "+(j.length-1)+"), "+j.length+') = "'+j+'"';case"*":return'contains(concat(" ", @'+r+', " "), "'+j+'")';case"|":return"(@"+r+'="'+j+'" or starts-with(@'+r+', "'+j+'-"))';case"~":return'contains(concat(" ", @'+r+', " "), " '+j+' ")';default:return"@"+r+(j?'="'+j+'"':"")}}function P(i,r,k,j){return"["+f(i,r,k,j)+"]"}function m(j,r,k){j=/\-child$/.test(r)?"*":j;var s="",u=r.split("-");switch(u[0]){case"first":s="not(preceding-sibling::"+j+")";break;case"last":s="not(following-sibling::"+j+")";break;case"only":s="not(preceding-sibling::"+j+" or following-sibling::"+j+")";break;case"nth":if(!/^n$/.test(k)){var i=((u[1]==="last")?"(count(following-sibling::":"(count(preceding-sibling::")+j+") + 1)";if((W=DOMAssistant.getSequence.call(this,k))){s=(W.start===W.max)?i+" = "+W.start:i+" mod "+W.add+" = "+W.modVal+((W.start>1)?" and "+i+" >= "+W.start:"")+((W.max>0)?" and "+i+" <= "+W.max:"")}}break;case"empty":s="count(child::*) = 0 and string-length(text()) = 0";break;case"contains":s='contains(., "'+k.replace(E.quoted,"$1")+'")';break;case"enabled":s="not(@disabled)";break;case"disabled":s="@disabled";break;case"target":var v=document.location.hash.slice(1);s='@name="'+v+'" or @id="'+v+'"';break;case"not":var t=E.pseudo.test(k)?m(j,k.slice(1)):k.replace(E.id,"[id=$1]").replace(E.tag,"self::$1").replace(E.classes,'contains(concat(" ", @class, " "), " $1 ")').replace(E.attribs,f);s="not("+t+")";break;default:s="@"+r+'="'+k+'"';break}return s}for(var h=0;(n=T[h]);h++){if(h>0){L=false;for(var X=0,Y=h;X<Y;X++){if(T[h]===T[X]){L=true;break}}if(L){continue}}p=n.match(o);d=".";for(var e=0,l=p.length;e<l;e++){Q=E.selector.exec(p[e]);R={tag:J+((!Q[1]||Q[3]==="*")?"*":Q[1]),id:(Q[3]!=="*")?Q[2]:null,allClasses:Q[4],allAttr:Q[6],allPseudos:Q[11],tagRelation:Q[23]};if(R.tagRelation){var V={">":"/child::","+":"/following-sibling::*[1]/self::","~":"/following-sibling::"};d+=V[R.tagRelation]||""}else{d+=(e>0&&E.relation.test(p[e-1]))?R.tag:("/descendant::"+R.tag)}if(R.id){d+='[@id = "'+R.id.replace(/^#/,"")+'"]'}if(R.allClasses){d+=R.allClasses.replace(E.classes,'[contains(concat(" ", @class, " "), " $1 ")]')}if(R.allAttr){d+=R.allAttr.replace(E.attribs,P)}if(R.allPseudos){var U=R.allPseudos.match(E.pseudos);for(var c=0,N=U.length;c<N;c++){E.pseudos.lastIndex=0;var O=E.pseudos.exec(U[c]);var q=O[1]?O[1].toLowerCase():null;var M=O[3]||null;var Z=m(R.tag,q,M);if(Z.length){d+="["+Z+"]"}}}}var b=document.evaluate(d,this,G,0,null),a;while((a=b.iterateNext())){S.push(a)}}return S};return DOMAssistant.cssByXpath.call(this,H)},cssSelection:function(H){DOMAssistant.cssSelection=document.evaluate?DOMAssistant.cssByXpath:DOMAssistant.cssByDOM;if(document.querySelectorAll){var G=DOMAssistant.cssSelection;DOMAssistant.cssSelection=function(I){try{var K=new A();return F(K,this.querySelectorAll(I))}catch(J){return G.call(this,I)}}}return DOMAssistant.cssSelection.call(this,H)},cssSelect:function(G){return DOMAssistant.cssSelection.call(this,G)},elmsByClass:function(I,G){var H=(G||"")+"."+I;return DOMAssistant.cssSelection.call(this,H)},elmsByAttribute:function(H,I,G,K){var J=(G||"")+"["+H+((I&&I!=="*")?((K||"")+"="+I+"]"):"]");return DOMAssistant.cssSelection.call(this,J)},elmsByTag:function(G){return DOMAssistant.cssSelection.call(this,G)}}}();DOMAssistant.initCore();DOMAssistant.AJAX=function(){var E=null;var A=0;var C=-1;var D="";var B=function(G,J,I,F){var H=null;if(/POST/i.test(J)){G=G.split("?");H=G[1];G=G[0]}return{url:G,method:J,callback:I,params:H,headers:{},responseType:"text",addToContent:F||false}};return{publicMethods:["ajax","get","post","load"],initRequest:function(){var G=null;if(typeof XMLHttpRequest!=="undefined"){G=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return new XMLHttpRequest()}}else{if(typeof window.ActiveXObject!=="undefined"){var F=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var H=0;H<F.length;H++){try{G=new window.ActiveXObject(F[H]);DOMAssistant.AJAX.initRequest=function(){return new window.ActiveXObject(F[H])};break}catch(I){G=null}}}}return G},ajax:function(F){if(!F.noParse&&F.url&&/\?/.test(F.url)&&F.method&&/POST/i.test(F.method)){var G=F.url.split("?");F.url=G[0];F.params=G[1]+((G[1].length>0&&F.params)?("&"+F.params):"")}return DOMAssistant.AJAX.makeCall.call(this,F)},get:function(H,I,G){var F=B(H,"GET",I,G);return DOMAssistant.AJAX.makeCall.call(this,F)},post:function(G,H){var F=B(G,"POST",H);return DOMAssistant.AJAX.makeCall.call(this,F)},load:function(G,F){DOMAssistant.AJAX.get.call(this,G,DOMAssistant.AJAX.replaceWithAJAXContent,F)},makeCall:function(F){var G=DOMAssistant.AJAX.initRequest();if(G){E=G;var H=function(Q){var K=F.url;var I=F.method||"GET";var R=F.callback;var M=F.params;var L=F.headers;var P=F.responseType||"text";var N=F.addToContent;G.open(I,K,true);G.setRequestHeader("AJAX","true");G.setRequestHeader("X-Requested-With","XMLHttpRequest");if(I==="POST"){var J=M?M.length:0;G.setRequestHeader("Content-type","application/x-www-form-urlencoded");G.setRequestHeader("Content-length",J);if(G.overrideMimeType){G.setRequestHeader("Connection","close")}}for(var O in L){if(typeof O==="string"){G.setRequestHeader(O,L[O])}}if(typeof R==="function"){G.onreadystatechange=function(){if(G.readyState===4){var S=/xml/i.test(P)?G.responseXML:G.responseText;A=4;C=G.status;D=G.statusText;E=null;G=null;R.call(Q,S,N)}}}G.send(M)}(this)}return this},replaceWithAJAXContent:function(J,N){if(N){this.innerHTML+=J}else{var F=this.all||this.getElementsByTagName("*");for(var H=0,L,K;(L=F[H]);H++){K=L.attributes;if(K){for(var G=0,I=K.length,M;G<I;G++){M=K[G].nodeName.toLowerCase();if(typeof L[M]==="function"){L[M]=null}}}}this.innerHTML=J}},getReadyState:function(){return(E&&typeof E.readyState!=="undefined")?E.readyState:A},getStatus:function(){return C},getStatusText:function(){return D}}}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){return{addClass:function(B){var A=this.className;if(!new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i").test(A)){this.className=A+(A.length?" ":"")+B}return this},removeClass:function(A){return DOMAssistant.$(this).replaceClass(A)},replaceClass:function(B,C){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(D,G,F){var E=C?(G+C+F):"";if(/^\s+.*\s+$/.test(D)){E=D.replace(/(\s+).+/,"$1")}return E}).replace(/^\s+|\s+$/g,"");return this},hasClass:function(A){return new RegExp(("(^|\\s)"+A+"(\\s|$)"),"i").test(this.className)},setStyle:function(C,D){if(this.filters&&(typeof C==="string"?/opacity/i.test(C):C.opacity)){this.style.filter="alpha(opacity="+(D||C.opacity||1)*100+")"}if(typeof this.style.cssText!=="undefined"){var A=this.style.cssText;if(typeof C==="object"){for(var B in C){if(typeof B==="string"){A+=";"+B+":"+C[B]}}}else{A+=";"+C+":"+D}this.style.cssText=A}return this},getStyle:function(B){if(this.filters&&/opacity/i.test(B)){var C=this.filters["DXImageTransform.Microsoft.Alpha"]||this.filters.alpha||{};return(C.opacity||100)/100}var A="";if(document.defaultView&&document.defaultView.getComputedStyle){A=document.defaultView.getComputedStyle(this,"").getPropertyValue(B)}else{if(this.currentStyle){A=B.replace(/\-(\w)/g,function(D,E){return E.toUpperCase()});A=this.currentStyle[A]}}return A}}}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){return{prev:function(){var A=this;while((A=A.previousSibling)&&A.nodeType!==1){}return DOMAssistant.$(A)},next:function(){var A=this;while((A=A.nextSibling)&&A.nodeType!==1){}return DOMAssistant.$(A)},create:function(C,B,A,D){var E=DOMAssistant.$(document.createElement(C));if(B){E=E.setAttributes(B)}if(typeof D!=="undefined"){E.addContent(D)}if(A){DOMAssistant.Content.addContent.call(this,E)}return E},setAttributes:function(A){if(DOMAssistant.isIE){var B=function(F,D,E){var C=D.toLowerCase();switch(C){case"name":case"type":return document.createElement(F.outerHTML.replace(new RegExp(C+"=[a-zA-Z]+")," ").replace(">"," "+C+"="+E+">"));case"style":F.style.cssText=E;return F;default:F[DOMAssistant.camel[C]||D]=E;return F}};DOMAssistant.Content.setAttributes=function(C){var G=this;var F=this.parentNode;for(var E in C){if(typeof C[E]==="string"||typeof C[E]==="number"){var D=B(G,E,C[E]);if(F&&/(name|type)/i.test(E)){if(G.innerHTML){D.innerHTML=G.innerHTML}F.replaceChild(D,G)}G=D}}return DOMAssistant.$(G)}}else{DOMAssistant.Content.setAttributes=function(C){for(var D in C){if(/class/i.test(D)){this.className=C[D]}else{this.setAttribute(D,C[D])}}return this}}return DOMAssistant.Content.setAttributes.call(this,A)},addContent:function(B){var A=typeof B;if(A==="string"||A==="number"){this.innerHTML+=B}else{if(A==="object"||(A==="function"&&typeof B.nodeName!=="undefined")){this.appendChild(B)}}return this},replaceContent:function(G){var F=this.all||this.getElementsByTagName("*");for(var E=0,H,A;(H=F[E]);E++){A=H.attributes;if(A){for(var C=0,D=A.length,B;C<D;C++){B=A[C].nodeName.toLowerCase();if(typeof H[B]==="function"){H[B]=null}}}}while(this.hasChildNodes()){this.removeChild(this.firstChild)}return DOMAssistant.$(this).addContent(G)},replace:function(F,A){var E=typeof F;if(E==="string"||E==="number"){var D=this.parentNode;var C=DOMAssistant.$(D).create("div",null,false,F);for(var B=C.childNodes.length-1;B>=0;B--){D.insertBefore(C.childNodes[B],this.nextSibling)}F=this.nextSibling;D.removeChild(this)}else{if(E==="object"||(E==="function"&&typeof F.nodeName!=="undefined")){this.parentNode.replaceChild(F,this)}}return A?F:this},remove:function(){this.parentNode.removeChild(this);return null}}}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var A=1;return{publicMethods:["triggerEvent","addEvent","removeEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble},triggerEvent:function(C,F){if(this.events&&this.events[C]){var E={type:C,target:F||this,currentTarget:this,bubbles:false,cancelable:false,preventDefault:function(){},stopPropagation:function(){},timeStamp:+new Date()};for(var D=0,B=this.events[C].length;D<B;D++){this.events[C][D].call(this,E)}}else{if(this["on"+C]){this["on"+C].call(this,E)}}return this},addEvent:function(C,E){var B=/^DOM/.test(C);if(B){if(this.addEventListener){this.addEventListener(C,E,false)}}else{if(!this.uniqueHandlerId){this.uniqueHandlerId=A++}if(!(E.attachedElements&&E.attachedElements[C+this.uniqueHandlerId])){if(!this.events){this.events={}}if(!this.events[C]){this.events[C]=[];var D=this["on"+C];if(D){this.events[C].push(D)}}this.events[C].push(E);this["on"+C]=DOMAssistant.Events.handleEvent;if(typeof this.window==="object"){this.window["on"+C]=DOMAssistant.Events.handleEvent}if(!E.attachedElements){E.attachedElements={}}E.attachedElements[C+this.uniqueHandlerId]=true}}return this},handleEvent:function(B){var G=B||event;var H=G.target||G.srcElement||document;while(H.nodeType!==1&&H.parentNode){H=H.parentNode}G.eventTarget=H;var C=this.events[G.type].slice(0),F,E;if((F=C.length)){for(var D=0;D<F;D++){if(typeof C[D]==="function"){E=C[D].call(this,G)}}return E}},removeEvent:function(B,E){if(this.events){var C=this.events[B];for(var D=0;D<C.length;D++){if(C[D]===E){delete C[D];C.splice(D,1)}}E.attachedElements[B+this.uniqueHandlerId]=null}return this},preventDefault:function(B){if(B&&B.preventDefault){DOMAssistant.Events.preventDefault=function(C){C.preventDefault()}}else{DOMAssistant.Events.preventDefault=function(C){event.returnValue=false}}return DOMAssistant.Events.preventDefault(B)},cancelBubble:function(B){if(B&&B.stopPropagation){DOMAssistant.Events.cancelBubble=function(C){C.stopPropagation()}}else{DOMAssistant.Events.cancelBubble=function(C){event.cancelBubble=true}}return DOMAssistant.Events.cancelBubble(B)}}}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var DOMLoaded=false;var DOMLoadTimer=null;var functionsToCall=[];var addedStrings={};var errorHandling=null;var execFunctions=function(){for(var i=0,il=functionsToCall.length;i<il;i++){try{functionsToCall[i]()}catch(e){if(errorHandling&&typeof errorHandling==="function"){errorHandling(e)}}}functionsToCall=[]};var DOMHasLoaded=function(){if(DOMLoaded){return }DOMLoaded=true;execFunctions()};
/*@cc_on @if(@_win32||@_win64)if(document.getElementById){document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");document.getElementById("ieScriptLoad").onreadystatechange=function(){if(this.readyState==="complete"){DOMHasLoaded()}}}@end@*/
if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMHasLoaded,false)}if(/KHTML|WebKit|iCab/i.test(navigator.userAgent)){DOMLoadTimer=setInterval(function(){if(/loaded|complete/i.test(document.readyState)){DOMHasLoaded();clearInterval(DOMLoadTimer)}},10)}window.onload=DOMHasLoaded;return{DOMReady:function(){for(var i=0,il=arguments.length,funcRef;i<il;i++){funcRef=arguments[i];if(!funcRef.DOMReady&&!addedStrings[funcRef]){if(typeof funcRef==="string"){addedStrings[funcRef]=true;funcRef=new Function(funcRef)}funcRef.DOMReady=true;functionsToCall.push(funcRef)}}if(DOMLoaded){execFunctions()}},setErrorHandling:function(funcRef){errorHandling=funcRef}}}();DOMAssistant.DOMReady=DOMAssistant.DOMLoad.DOMReady;