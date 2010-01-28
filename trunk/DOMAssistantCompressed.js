// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation, version 2.8
var DOMAssistant=function(){var j=function(){},o=window,g=o.$,k=o.$$,d=/*@cc_on!@*/false,i=d&&parseFloat(navigator.appVersion)<6,h,c={},q={},a=true,n=Array.prototype.slice,p={accesskey:"accessKey","class":"className",colspan:"colSpan","for":"htmlFor",maxlength:"maxLength",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",valign:"vAlign",cellspacing:"cellSpacing",cellpadding:"cellPadding"},m={rules:/\s*(,)\s*/g,selector:/^(\w+)?(#[\w\u00C0-\uFFFF\-_=\$]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+\s*(\^|\$|\*|\||~)?(=\s*([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[:?#?\w\u00C0-\uFFFF\-_\.]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.\'\"]+\]+)|(:\w+[\w\-]*\(.+\)))\))?)*)?(>|\+|~)?/,selectorSplit:/(?:\[.*\]|\(.*\)|[^\s\+>~\[\(])+|[\+>~]/g,id:/^#([\w\u00C0-\uFFFF\-_=\$]+)$/,tag:/^(\w+)/,relation:/^(>|\+|~)$/,pseudo:/^:(\w[\w\-]*)(\((.+)\))?$/,pseudos:/:(\w[\w\-]*)(\((([^(]+)|([^(]+\([^(]+)\))\))?/g,attribs:/\[(\w+)\s*(\^|\$|\*|\||~)?(=)?\s*([^\[\]]*|"[^\"]*"|'[^\']*')?\](?=$|\[|\:|\s)/g,classes:/\.([\w\u00C0-\uFFFF\-_]+)/g,quoted:/^["'](.*)["']$/,nth:/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/,special:/(:check|:enabl|\bselect)ed\b/},f=function(t,u,r){var s=t.tagName;while((t=t[u+"Sibling"])&&(t.nodeType!==1||(r?t.tagName!==s:t.tagName==="!"))){}return t},b=function(r){return typeof r!=="undefined"},l=function(r){return(l=r[0].compareDocumentPosition?function(s){return s.sort(function(u,t){return 3-(u.compareDocumentPosition(t)&6)})}:d?function(s){return s.sort(function(u,t){return u.sourceIndex-t.sourceIndex})}:function(s){return s.sort(function(w,u){var v=document.createRange(),t=document.createRange();v.setStart(w,0);v.setEnd(w,0);t.setStart(u,0);t.setEnd(u,0);return v.compareBoundaryPoints(Range.START_TO_END,t)})})(r)};var e=function(s,r){s.push.apply(s,n.apply(r));return s};if(d){e=function(t,s){if(s.slice){return t.concat(s)}var r=0,u;while((u=s[r++])){t[t.length]=u}return t}}return{isIE:d,camel:p,def:b,allMethods:[],publicMethods:["prev","next","hasChild","cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],harmonize:function(){o.$=g;o.$$=k;return this},initCore:function(){this.applyMethod.call(o,"$",this.$);this.applyMethod.call(o,"$$",this.$$);o.DOMAssistant=this;if(d){j=Array}j.prototype=[];(function(r){r.each=function(v,u){for(var t=0,s=this.length;t<s;t++){if(v.call(u||this[t],this[t],t,this)===false){break}}return this};r.first=function(){return b(this[0])?DOMAssistant.addMethodsToElm(this[0]):null};r.end=function(){return this.previousSet};r.indexOf=r.indexOf||function(u){for(var t=0,s=this.length;t<s;t++){if(t in this&&this[t]===u){return t}}return -1};r.map=function(w,v){var u=[];for(var t=0,s=this.length;t<s;t++){if(t in this){u[t]=w.call(v||this[t],this[t],t,this)}}return u};r.filter=function(w,v){var u=new j();u.previousSet=this;for(var t=0,s=this.length;t<s;t++){if(t in this&&w.call(v||this[t],this[t],t,this)){u.push(this[t])}}return u};r.every=function(v,u){for(var t=0,s=this.length;t<s;t++){if(t in this&&!v.call(u||this[t],this[t],t,this)){return false}}return true};r.some=function(v,u){for(var t=0,s=this.length;t<s;t++){if(t in this&&v.call(u||this[t],this[t],t,this)){return true}}return false}})(j.prototype);this.attach(this)},addMethods:function(r,s){if(!b(this.allMethods[r])){this.allMethods[r]=s;this.addHTMLArrayPrototype(r,s)}},addMethodsToElm:function(s){for(var r in this.allMethods){if(b(this.allMethods[r])){this.applyMethod.call(s,r,this.allMethods[r])}}return s},applyMethod:function(s,r){if(typeof this[s]!=="function"){this[s]=r}},attach:function(t){var r=t.publicMethods;if(!b(r)){for(var v in t){if(v!=="init"&&b(t[v])){this.addMethods(v,t[v])}}}else{if(r.constructor===Array){for(var s=0,u;(u=r[s]);s++){this.addMethods(u,t[u])}}}if(typeof t.init==="function"){t.init()}},addHTMLArrayPrototype:function(r,s){j.prototype[r]=function(){var v=new j();v.previousSet=this;for(var u=0,t=this.length;u<t;u++){v.push(s.apply(DOMAssistant.$$(this[u]),arguments))}return v}},clearHandlers:function(){var v=this.all||this.getElementsByTagName("*");for(var u=0,w,r;(w=v[u++]);){if(w.uniqueHandlerId&&(r=w.attributes)){for(var s,t=r.length;t--;){s=r[t].nodeName.toLowerCase();if(typeof w[s]==="function"){w[s]=null}}}}},setCache:function(r){a=r},$:function(){var u=arguments[0];if(arguments.length===1&&(typeof u==="object"||(typeof u==="function"&&!!u.nodeName))){return DOMAssistant.$$(u)}var w=!!u?new j():null;for(var s=0,r,v;(r=arguments[s]);s++){if(typeof r==="string"){r=r.replace(/^[^#\(]*(#)/,"$1");if(m.id.test(r)){if((v=DOMAssistant.$$(r.substr(1),false))){w.push(v)}}else{var t=(document.all||document.getElementsByTagName("*")).length;w=(!document.querySelectorAll&&a&&q.rule&&q.rule===r&&q.doc===t)?q.elms:e(w,DOMAssistant.cssSelection.call(document,r));q={rule:r,elms:w,doc:t}}}}return w},$$:function(x,u){var w=(typeof x==="object"||typeof x==="function"&&!!x.nodeName)?x:document.getElementById(x),v=b(u)?u:true,t=function(z){var y=z.id;return typeof y!=="object"?y:z.attributes.id.nodeValue};if(typeof x==="string"&&w&&t(w)!==x){w=null;for(var r=0,s;(s=document.all[r]);r++){if(t(s)===x){w=s;break}}}if(w&&v&&!w.next){DOMAssistant.addMethodsToElm(w)}return w},prev:function(){return DOMAssistant.$$(f(this,"previous"))},next:function(){return DOMAssistant.$$(f(this,"next"))},hasChild:function(r){return this===document||this!==r&&(this.contains?this.contains(r):!!(this.compareDocumentPosition(r)&16))},getSequence:function(v){var w,u=2,s=-1,r=-1,t=m.nth.exec(v.replace(/^0n\+/,"").replace(/^2n$/,"even").replace(/^2n+1$/,"odd"));if(!t){return null}if(t[2]){w=(t[2]==="odd")?1:2;r=(w===1)?1:0}else{if(t[3]){w=s=parseInt(t[3],10);u=0}else{if(t[4]){u=t[6]?parseInt(t[6],10):1;w=t[7]?parseInt(t[7],10):0;while(w<1){w+=u}r=(w>=u)?(w-u)%u:w}else{if(t[8]){u=t[10]?parseInt(t[10],10):1;w=s=parseInt(t[11],10);while(w>u){w-=u}r=(s>=u)?(s-u)%u:s}}}}return{start:w,add:u,max:s,modVal:r}},cssByDOM:function(v){var aT,H,D,M,au,x,ag,A,J,w,ap,aM,y,aH,ar,aA=new j(),aQ=aA.indexOf,ao=[],aF=[],aJ=v.replace(m.rules,"$1").split(","),aE={};function aP(s){s=s||ao;for(var r=s.length;r--;){s[r].added=null;s[r].removeAttribute("added")}}function C(){for(var r=aT.length;r--;){aT[r].childElms=null}}function al(t,r){for(var u=0,aW;(aW=t[u]);u++){var aV=false;for(var s=0,aU;(aU=r[s]);s++){if(aU===aW){aV=true;r.splice(s,1);break}}if(aV){t.splice(u--,1)}}return t}function E(s,r){return(d||m.special.test(r))?s[p[r.toLowerCase()]||r]:s.getAttribute(r,2)}function O(r,s){r=r?r.replace(m.quoted,"$1").replace(/(\.|\[|\])/g,"\\$1"):null;return{"^":"^"+r,"$":r+"$","*":r,"|":"^"+r+"(\\-\\w+)*$","~":"\\b"+r+"\\b"}[s]||(r!==null?"^"+r+"$":r)}function V(r){return(r||this).tagName!=="!"}function R(r,s){return i?(r==="*"?s.all:s.all.tags(r)):s.getElementsByTagName(r)}function aK(r,s){r=r||"*";s=s||document;return(s===document||s.lastModified)?c[r]||(c[r]=R(r,document)):R(r,s)}function aq(aW,be,u){aT=[];var aU=be.split("-"),aZ=[],a4=0,bd=/\-of\-type$/.test(be),a3,aY={first:function(bf){return !f(bf,"previous",bd)},last:function(bf){return !f(bf,"next",bd)},empty:function(bf){return !bf.firstChild},enabled:function(bf){return !bf.disabled&&bf.type!=="hidden"},disabled:function(bf){return bf.disabled},checked:function(bf){return bf.checked},contains:function(bf){return(bf.innerText||bf.textContent||"").indexOf(u.replace(m.quoted,"$1"))>-1},other:function(bf){return E(bf,be)===u}};function t(bf){while((A=aW[a4++])){if(V(A)&&aY[bf](A)){aZ[aZ.length]=A}}return aZ}var ba=aU[0]||null;if(ba&&aY[ba]){return t(ba)}switch(ba){case"only":var a0,aV;while((A=aW[a4++])){J=A.parentNode;var a5=A.nodeName;if(J!==a0||a5!==aV){if(aY.first(A)&&aY.last(A)){aZ[aZ.length]=A}a0=J;aV=a5}}break;case"nth":if(u==="n"){aZ=aW}else{var bc=(aU[1]==="last")?["lastChild","previousSibling"]:["firstChild","nextSibling"];aH=DOMAssistant.getSequence(u);if(aH){while((A=aW[a4++])){J=A.parentNode;J.childElms=J.childElms||{};var a6=A.nodeName;if(!J.childElms[a6]){var a9=0;aM=aH.start;y=J[bc[0]];while(y&&(aH.max<0||aM<=aH.max)){var bb=y.nodeName;if((bd&&bb===a6)||(!bd&&y.nodeType===1&&bb!=="!")){if(++a9===aM){if(bb===a6){aZ[aZ.length]=y}aM+=aH.add}}y=y[bc[1]]}if(ar){h++}J.childElms[a6]=true;aT[aT.length]=J}}C()}}break;case"target":var s=document.location.hash.slice(1);if(s){while((A=aW[a4++])){if(E(A,"name")===s||E(A,"id")===s){aZ[aZ.length]=A;break}}}break;case"not":if((a3=m.pseudo.exec(u))){aZ=al(aW,aq(aW,a3[1]?a3[1].toLowerCase():null,a3[3]||null))}else{for(var a7 in m){if(m[a7].lastIndex){m[a7].lastIndex=0}}u=u.replace(m.id,"[id=$1]");var a2=m.tag.exec(u);var aX=m.classes.exec(u);var a1=m.attribs.exec(u);var r=new RegExp(a1?O(a1[4],a1[2]):"(^|\\s)"+(a2?a2[1]:aX?aX[1]:"")+"(\\s|$)","i");while((w=aW[a4++])){ap=null;if(a2&&!r.test(w.nodeName)||aX&&!r.test(w.className)){ap=w}else{if(a1){var a8=E(w,a1[1]);if(!b(a8)||a8===false||typeof a8==="string"&&!r.test(a8)){ap=w}}}if(ap&&!ap.added){ap.added=true;aZ[aZ.length]=ap}}}break;default:return t("other")}return aZ}function Y(aU,t){var r=0,u=aU,aV;while((aV=t[r++])){if(!u.length||u.indexOf(aV)<0){aU.push(aV)}}return aU}h=-1;for(var aj=0,aI=[];(H=aJ[aj]);aj++){if(!(D=H.match(m.selectorSplit))||aj&&aQ.call(aJ.slice(0,aj),H)>-1){continue}ao=[this];for(var ah=0,F;(F=D[ah]);ah++){aF=[];if(m.relation.test(F)){if((M=m.relation.exec(F))){var am=null,aR=D[ah+1];if((au=m.tag.exec(aR))){au=au[1];x=new RegExp("(^|\\s)"+au+"(\\s|$)","i")}else{if(m.id.test(aR)){am=DOMAssistant.$(aR)||null}}for(var af=0,L;(L=ao[af]);af++){switch(M[0]){case">":var aC=am||aK(au,L);for(var ad=0,ax;(ax=aC[ad]);ad++){if(ax.parentNode===L){aF[aF.length]=ax}}break;case"+":if((L=f(L,"next"))){if((am&&am[0]===L)||(!am&&(!au||x.test(L.nodeName)))){aF[aF.length]=L}}break;case"~":while((L=L.nextSibling)&&!L.added){if((am&&am[0]===L)||(!am&&(!au||x.test(L.nodeName)))){L.added=true;aF[aF.length]=L}}break}}ao=aF;aP();F=D[++ah];if(/^\w+$/.test(F)||m.id.test(F)){continue}ao.skipTag=true}}var at=m.selector.exec(F);aE={tag:(!at[1]||at[3]==="*")?"*":at[1],id:(at[3]!=="*")?at[2]:null,allClasses:at[4],allAttr:at[6],allPseudos:at[11]};ar=(aE.tag==="*");if(aE.id){var N=0,ak=document.getElementById(aE.id.slice(1));if(ak){while(ao[N]&&!DOMAssistant.hasChild.call(ao[N],ak)){N++}aF=(N<ao.length&&(ar||aE.tag===ak.tagName.toLowerCase()))?[ak]:[]}ao=aF}else{if(aE.tag&&!ao.skipTag){if(ah===0&&!aF.length&&ao.length===1){ao=aF=e([],aK(aE.tag,ao[0]))}else{for(var ac=0,aN=ao.length,ay,av;ac<aN;ac++){ay=aK(aE.tag,ao[ac]);for(var Z=0;(av=ay[Z]);Z++){if(!av.added){av.added=true;aF[aF.length]=av}}}ao=aF;aP()}}}if(!aF.length){break}ao.skipTag=false;if(aE.allClasses){var X=0,aa=[],I=aE.allClasses.split(".").slice(1);while((ag=ao[X++])){var ae=true,aw=ag.className;if(aw&&aw.length){aw=aw.split(" ");for(var W=I.length;W--;){if(aw.indexOf(I[W])<0){ae=false;break}}if(ae){aa[aa.length]=ag}}}ao=aF=aa}if(aE.allAttr){var B,S=0,aB=[],ab=[],aG=aE.allAttr.match(m.attribs);for(var U=0,z=aG.length,T,aO;U<z;U++){m.attribs.lastIndex=0;T=m.attribs.exec(aG[U]);aO=O(T[4],T[2]||null);aB[U]=[(aO?new RegExp(aO):null),T[1]]}while((ag=aF[S++])){for(var Q=0,aD=aB.length;Q<aD;Q++){var az=aB[Q][0],ai=E(ag,aB[Q][1]);B=true;if(!az&&ai===true){continue}if((!az&&(!ai||typeof ai!=="string"||!ai.length))||(!!az&&!az.test(ai))){B=false;break}}if(B){ab[ab.length]=ag}}ao=aF=ab}if(aE.allPseudos){var G=aE.allPseudos.match(m.pseudos);for(var P=0,an=G.length;P<an;P++){m.pseudos.lastIndex=0;var aS=m.pseudos.exec(G[P]);var K=aS[1]?aS[1].toLowerCase():null;var aL=aS[3]||null;aF=aq(aF,K,aL);aP(aF)}ao=aF}}aA=((aI.length&&(ar||aQ.call(aI,aE.tag)>=0||aQ.call(aI,"*")>=0))?Y:e)(aA,ao);aI.push(aE.tag);if(d&&ar){aA=aA.filter(V)}}return((aA.length>1&&aJ.length>1)||h>0)?l(aA):aA},cssByXpath:function(s){var t={xhtml:"http://www.w3.org/1999/xhtml"},u=(document.documentElement.namespaceURI===t.xhtml)?"xhtml:":"",r=function v(w){return t[w]||null};DOMAssistant.cssByXpath=function(N){var R,T,J,z,A,E,B=new j(),C=N.replace(m.rules,"$1").split(",");function M(W){var X=W?"[":"",V=W?"]":"";return function(Y,ac,ab,aa,Z){Z=(Z||"").replace(m.quoted,"$1");return X+({"^":"starts-with(@"+ac+', "'+Z+'")',"$":"substring(@"+ac+", (string-length(@"+ac+") - "+(Z.length-1)+"), "+Z.length+') = "'+Z+'"',"*":'contains(concat(" ", @'+ac+', " "), "'+Z+'")',"|":"@"+ac+'="'+Z+'" or starts-with(@'+ac+', "'+Z+'-")',"~":'contains(concat(" ", @'+ac+', " "), " '+Z+' ")'}[ab]||("@"+ac+(aa?'="'+Z+'"':"")))+V}}function P(W,Y,X){W=/\-child$/.test(Y)?"*":W;var aa=Y.split("-"),V=((aa[1]==="last")?"(count(following-sibling::":"(count(preceding-sibling::")+W+") + 1)",Z,ab;switch(aa[0]){case"nth":return(X!=="n"&&(E=DOMAssistant.getSequence(X)))?((E.start===E.max)?V+" = "+E.start:V+" mod "+E.add+" = "+E.modVal+((E.start>1)?" and "+V+" >= "+E.start:"")+((E.max>0)?" and "+V+" <= "+E.max:"")):"";case"not":return"not("+((Z=m.pseudo.exec(X))?P(W,Z[1]?Z[1].toLowerCase():null,Z[3]||null):X.replace(m.id,"[id=$1]").replace(m.tag,"self::$1").replace(m.classes,'contains(concat(" ", @class, " "), " $1 ")').replace(m.attribs,M()))+")";case"first":return"not(preceding-sibling::"+W+")";case"last":return"not(following-sibling::"+W+")";case"only":return"not(preceding-sibling::"+W+" or following-sibling::"+W+")";case"empty":return"count(child::*) = 0 and string-length(text()) = 0";case"contains":return'contains(., "'+X.replace(m.quoted,"$1")+'")';case"enabled":return'not(@disabled) and not(@type="hidden")';case"disabled":return"@disabled";case"target":return'@name="'+(ab=document.location.hash.slice(1))+'" or @id="'+ab+'"';default:return"@"+Y+'="'+X+'"'}}for(var O=0;(R=C[O]);O++){if(!(T=R.match(m.selectorSplit))||O&&B.indexOf.call(C.slice(0,O),R)>-1){continue}J=J?J+" | .":".";for(var L=0,Q=T.length;L<Q;L++){z=m.selector.exec(T[L]);A={tag:u+((!z[1]||z[3]==="*")?"*":z[1]),id:(z[3]!=="*")?z[2]:null,allClasses:z[4],allAttr:z[6],allPseudos:z[11],tagRelation:z[23]};J+=(A.tagRelation?({">":"/","+":"/following-sibling::*[1]/self::","~":"/following-sibling::"}[A.tagRelation]||""):((L>0&&m.relation.test(T[L-1]))?A.tag:("//"+A.tag)))+(A.id||"").replace(m.id,'[@id = "$1"]')+(A.allClasses||"").replace(m.classes,'[contains(concat(" ", @class, " "), " $1 ")]')+(A.allAttr||"").replace(m.attribs,M(true));if(A.allPseudos){var D=A.allPseudos.match(m.pseudos);for(var K=0,x=D.length;K<x;K++){m.pseudos.lastIndex=0;var y=m.pseudos.exec(D[K]),U=y[1]?y[1].toLowerCase():null,w=y[3]||null,G=P(A.tag,U,w);if(G.length){J+="["+G+"]"}}}}}try{var I=document.evaluate(J,this,r,7,null),H,F=0;while((H=I.snapshotItem(F++))){B.push(H)}}catch(S){}return B};return DOMAssistant.cssByXpath.call(this,s)},cssSelection:function(s){if(!s){return null}var r=m.special.test(s);try{if(document.querySelectorAll&&!r){return e(new j(),this.querySelectorAll(s))}}catch(t){}return((document.evaluate&&!r)?DOMAssistant.cssByXpath:DOMAssistant.cssByDOM).call(this,s)},cssSelect:function(r){return DOMAssistant.cssSelection.call(this,r)},elmsByClass:function(t,r){var s=(r||"")+"."+t;return DOMAssistant.cssSelection.call(this,s)},elmsByAttribute:function(s,t,r,v){var u=(r||"")+"["+s+((t&&t!=="*")?((v||"")+"="+t+"]"):"]");return DOMAssistant.cssSelection.call(this,u)},elmsByTag:function(r){return DOMAssistant.cssSelection.call(this,r)}}}();DOMAssistant.initCore();DOMAssistant.Storage=function(){var c=1,a=[],b="_da"+ +new Date();return{retrieve:function(d){if(!DOMAssistant.def(d)){return this[b]||(this[b]=c++)}if(!this[b]||!a[this[b]]){return}return a[this[b]][d]},store:function(f,g){var e=this[b]||(this[b]=c++);a[e]=a[e]||{};if(typeof f==="object"){for(var d in f){if(typeof d==="string"){a[e][d]=f[d]}}}else{a[e][f]=g}return this},unstore:function(e){var d=this[b]||(this[b]=c++);if(a[d]){if(DOMAssistant.def(e)){delete a[d][e]}else{a[d]=null}}return this}}}();DOMAssistant.attach(DOMAssistant.Storage);DOMAssistant.AJAX=function(){var globalXMLHttp=null,readyState=0,status=-1,statusText="",requestPool=[],createAjaxObj=function(url,method,callback,addToContent){var params=null;if(/POST/i.test(method)){url=url.split("?");params=url[1];url=url[0]}return{url:url,method:method,callback:callback,params:params,headers:{},responseType:"text",addToContent:addToContent||false}};return{publicMethods:["ajax","get","post","load"],initRequest:function(){var XMLHttp=null;if(!!window.XMLHttpRequest&&!DOMAssistant.isIE){XMLHttp=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new XMLHttpRequest()}}else{if(!!window.ActiveXObject){var XMLHttpMS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var i=0;i<XMLHttpMS.length;i++){try{XMLHttp=new window.ActiveXObject(XMLHttpMS[i]);DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new window.ActiveXObject(XMLHttpMS[i])};break}catch(e){XMLHttp=null}}}}return XMLHttp},ajax:function(ajaxObj){if(!ajaxObj.noParse&&ajaxObj.url&&/\?/.test(ajaxObj.url)&&ajaxObj.method&&/POST/i.test(ajaxObj.method)){var url=ajaxObj.url.split("?");ajaxObj.url=url[0];ajaxObj.params=url[1]+((url[1].length>0&&ajaxObj.params)?("&"+ajaxObj.params):"")}return DOMAssistant.AJAX.makeCall.call(this,ajaxObj)},get:function(url,callback,addToContent){return DOMAssistant.AJAX.makeCall.call(this,createAjaxObj(url,"GET",callback,addToContent))},post:function(url,callback){return DOMAssistant.AJAX.makeCall.call(this,createAjaxObj(url,"POST",callback))},load:function(url,addToContent){this.get(url,DOMAssistant.AJAX.replaceWithAJAXContent,addToContent)},makeCall:function(ajaxObj){var XMLHttp=DOMAssistant.AJAX.initRequest();if(XMLHttp){globalXMLHttp=XMLHttp;(function(elm){var url=ajaxObj.url,method=ajaxObj.method||"GET",callback=ajaxObj.callback,params=ajaxObj.params,headers=ajaxObj.headers,responseType=ajaxObj.responseType||"text",addToContent=ajaxObj.addToContent,timeout=ajaxObj.timeout||null,ex=ajaxObj.exception,timeoutId=null,done=false;XMLHttp.open(method,url,true);XMLHttp.setRequestHeader("AJAX","true");XMLHttp.setRequestHeader("X-Requested-With","XMLHttpRequest");if(method==="POST"){XMLHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");XMLHttp.setRequestHeader("Content-length",params?params.length:0);if(XMLHttp.overrideMimeType){XMLHttp.setRequestHeader("Connection","close")}}if(responseType==="json"){XMLHttp.setRequestHeader("Accept","application/json, text/javascript, */*")}for(var i in headers){if(typeof i==="string"){XMLHttp.setRequestHeader(i,headers[i])}}if(typeof callback==="function"){XMLHttp.onreadystatechange=function(){try{if(XMLHttp.readyState===4&&!done){window.clearTimeout(timeoutId);done=true;status=XMLHttp.status;statusText=XMLHttp.statusText;readyState=4;if((status||location.protocol!=="file:")&&(status<200||status>=300)){throw new Error(statusText)}var response=/xml/i.test(responseType)?XMLHttp.responseXML:XMLHttp.responseText;if(/json/i.test(responseType)&&!!response){response=(typeof JSON==="object"&&typeof JSON.parse==="function")?JSON.parse(response):eval("("+response+")")}globalXMLHttp=null;XMLHttp.onreadystatechange=function(){};requestPool.push(XMLHttp);callback.call(elm,response,addToContent)}}catch(e){globalXMLHttp=XMLHttp=null;if(typeof ex==="function"){ex.call(elm,e);ex=null}}}}XMLHttp.send(params);if(timeout){timeoutId=window.setTimeout(function(){if(!done){XMLHttp.abort();done=true;if(typeof ex==="function"){readyState=0;status=408;statusText="Request timeout";globalXMLHttp=XMLHttp=null;ex.call(elm,new Error(statusText));ex=null}}},timeout)}})(this)}return this},replaceWithAJAXContent:function(content,add){if(add){this.innerHTML+=content}else{DOMAssistant.clearHandlers.apply(this);this.innerHTML=content}},getReadyState:function(){return(globalXMLHttp&&DOMAssistant.def(globalXMLHttp.readyState))?globalXMLHttp.readyState:readyState},getStatus:function(){return status},getStatusText:function(){return statusText}}}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){var a=DOMAssistant.def,b={display:true};return{addClass:function(d){if(!this.hasClass(d)){var c=this.className;this.className=c+(c.length?" ":"")+d}return this},removeClass:function(c){return this.replaceClass(c)},replaceClass:function(d,e){var c=new RegExp(("(^|\\s)"+d+"(\\s|$)"),"i");this.className=this.className.replace(c,function(f,h,g){return e?(h+e+g):" "}).replace(/^\s+|\s+$/g,"");return this},hasClass:function(c){return(" "+this.className+" ").indexOf(" "+c+" ")>-1},setStyle:function(f,g){var e=this.style;if("filters" in this&&(typeof f==="string"?/opacity/i.test(f):a(f.opacity))){e.zoom=1;e.filter=(e.filter||"").replace(/alpha\([^)]*\)/,"")+"alpha(opacity="+(a(f.opacity)?f.opacity:g)*100+")"}if(a(e.cssText)){var c=e.cssText;if(typeof f==="object"){for(var d in f){if(typeof d==="string"){if(b[d]){e[d]=f[d]}c+=";"+d+":"+f[d]}}}else{if(b[f]){e[f]=g}c+=";"+f+":"+g}e.cssText=c}return this},getStyle:function(c){var e="",d;c=c.toLowerCase();if(document.defaultView&&document.defaultView.getComputedStyle){e=document.defaultView.getComputedStyle(this,"").getPropertyValue(c)}else{if(this.currentStyle){if("filters" in this&&c==="opacity"){e=(d=this.style.filter||this.currentStyle.filter)&&d.indexOf("opacity=")>=0?parseFloat(d.match(/opacity=([^)]*)/)[1])/100:1}else{c=c.replace(/^float$/,"styleFloat").replace(/\-(\w)/g,function(f,g){return g.toUpperCase()});e=this.currentStyle[c]}if(e==="auto"&&/^(width|height)$/.test(c)&&this.currentStyle.display!=="none"){e=this["offset"+c.charAt(0).toUpperCase()+c.substr(1)]+"px"}}}return e}}}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){var a=DOMAssistant.$$;return{init:function(){DOMAssistant.setCache(false)},create:function(d,c,b,e){var f=a(document.createElement(d));if(c){f=f.setAttributes(c)}if(DOMAssistant.def(e)){f.addContent(e)}if(b){this.appendChild(f)}return f},setAttributes:function(b){if(DOMAssistant.isIE){var c=function(g,e,f){var d=e.toLowerCase();switch(d){case"name":case"type":return a(document.createElement(g.outerHTML.replace(new RegExp(d+"=[a-zA-Z]+")," ").replace(">"," "+d+"="+f+">")));case"style":g.style.cssText=f;return g;default:g[DOMAssistant.camel[d]||e]=f;return g}};DOMAssistant.Content.setAttributes=function(d){var h=this;var g=this.parentNode;for(var f in d){if(typeof d[f]==="string"||typeof d[f]==="number"){var e=c(h,f,d[f]);if(g&&/(name|type)/i.test(f)){if(h.innerHTML){e.innerHTML=h.innerHTML}g.replaceChild(e,h)}h=e}}return h}}else{DOMAssistant.Content.setAttributes=function(d){for(var e in d){if(/class/i.test(e)){this.className=d[e]}else{this.setAttribute(e,d[e])}}return this}}return DOMAssistant.Content.setAttributes.call(this,b)},addContent:function(f){var d=typeof f;if(d==="string"||d==="number"){if(!this.firstChild){this.innerHTML=f}else{var c=document.createElement("div");c.innerHTML=f;for(var b=c.childNodes.length-1,e=null;b>=0;b--){e=this.insertBefore(c.childNodes[b],e)}}}else{if(d==="object"||(d==="function"&&!!f.nodeName)){this.appendChild(f)}}return this},replaceContent:function(b){if(!!this.firstChild){DOMAssistant.clearHandlers.apply(this);this.innerHTML=""}return this.addContent(b)},replace:function(g,b){var f=typeof g;if(f==="string"||f==="number"){var e=this.parentNode;var d=DOMAssistant.Content.create.call(e,"div",null,false,g);for(var c=d.childNodes.length;c--;){e.insertBefore(d.childNodes[c],this.nextSibling)}g=this.nextSibling;e.removeChild(this)}else{if(f==="object"||(f==="function"&&!!g.nodeName)){this.parentNode.replaceChild(g,this)}}return b?g:this},remove:function(){this.parentNode.removeChild(this);return null}}}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var e,c="_events",d=!!document.addEventListener,b={focus:true,blur:true},a=function(g){return DOMAssistant.isIE?{focus:"activate",blur:"deactivate"}[g]||g:g},f=function(k,h,j){k=k||window.event||{};var i={event:k,type:h||k.type,bubbles:k.bubbles||true,cancelable:k.cancelable||false,target:j||k.target||k.srcElement,relatedTarget:k.relatedTarget||(k.fromElement===k.target?k.toElement:k.fromElement)||null,altKey:k.altKey||false,ctrlKey:k.ctrlKey||false,shiftKey:k.shiftKey||false,button:k.button||null,timeStamp:+new Date(),preventDefault:function(){if(k.preventDefault){k.preventDefault()}this.returnValue=k.returnValue=false},stopPropagation:function(){if(k.stopPropagation){k.stopPropagation()}this.cancelBubble=k.cancelBubble=true}};i.currentTarget=i.target;if(i.target&&3===i.target.nodeType){i.target=i.target.parentNode}if("number"===typeof k.pageX){i.clientX=i.pageX=k.pageX;i.clientY=i.pageY=k.pageY}else{var l=document.documentElement,g=document.body;i.clientX=k.clientX+(l.scrollLeft||g.scrollLeft)-(l.clientLeft||0);i.clientY=k.clientY+(l.scrollTop||g.scrollTop)-(l.clientTop||0)}if("number"===typeof k.which){i.keyCode=k.keyCode;i.charCode=i.which=k.which}else{if(k.keyCode){i.keyCode=i.charCode=k.keyCode}}return i};return{publicMethods:["triggerEvent","addEvent","removeEvent","relayEvent","unrelayEvent","preventDefault","cancelBubble"],init:function(){DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;e=this.handleEvent},triggerEvent:function(h,o,n){h=a(h);var k=this.retrieve(c),l=n||f(n,h,o||this);l.currentTarget=this;if(k&&k[h]){for(var j=0,g=k[h].length;j<g;j++){if(k[h][j].call(this,l)===false){l.stopPropagation()}}}else{if(typeof this["on"+h]==="function"){this["on"+h].call(this,l)}}var m=DOMAssistant.$$(this.parentNode);if(!l.cancelBubble&&m&&m.nodeType===1){m.triggerEvent(h,o,l)}return this},addEvent:function(g,k,l){var j=(g=a(g))+this.retrieve();if(!(k.attachedElements&&k.attachedElements[j])){var i=this.retrieve(c)||{};if(!i[g]){i[g]=[];var h=this["on"+g];if(h){i[g].push(h);this["on"+g]=null}}if(!i[g].length){if(d){this.addEventListener(g,e,b[g])}else{this["on"+g]=e}}k.relay=l;i[g].push(k);if(typeof this.window==="object"){this.window["on"+g]=e}k.attachedElements=k.attachedElements||{};k.attachedElements[j]=true;this.store(c,i)}return this},handleEvent:function(g){var n=(g&&/^DOM/.test(g.type)&&d)?g:f(g),m=a(n.type),h=this.retrieve(c)[m].slice(0),l,k;if((l=h.length)){for(var j=0;j<l;j++){if(typeof h[j]==="function"){k=h[j].call(this,n)}}if(k===false){n.stopPropagation()}return k}},removeEvent:function(g,n,o){var l=(g=a(g))+this.retrieve(),k=this.retrieve(c);if(k&&k[g]){var h=k[g];for(var m,j=h.length;j--;){m=n||h[j];if(h[j]===m&&(!o&&!m.relay||o&&m.relay)){h.splice(j,1);if(m.attachedElements){m.attachedElements[l]=null}}}if(!k[g].length){if(d){this.removeEventListener(g,e,b[g])}else{this["on"+g]=null}}}else{if(this["on"+g]&&!n&&!o){this["on"+g]=null}}return this},relayEvent:function(h,g,i){return this.addEvent(h,function(n){n=f(n);var m=n.target,j=arguments,k=0,o,l=this.cssSelect(g);while((o=l[k++])){if((o===m||DOMAssistant.hasChild.call(o,m))&&!o.disabled){n.currentTarget=o;return i.apply(o,j)}}},true)},unrelayEvent:function(g){return this.removeEvent(g,null,true)},preventDefault:function(g){if(g.preventDefault){g.preventDefault()}g.returnValue=false},cancelBubble:function(g){if(g.stopPropagation){g.stopPropagation()}g.cancelBubble=true}}}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var g=false,a=null,f=[],b={},c=null,d=function(){for(var j=0,h=f.length;j<h;j++){try{f[j]()}catch(k){if(c&&typeof c==="function"){c(k)}}}f=[]},e=function(){if(g){return}g=true;d()};
/*@cc_on @if(@_win32||@_win64)document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");document.getElementById("ieScriptLoad").onreadystatechange=function(){if(this.readyState==="complete"){e()}}@end@*/
if(document.addEventListener){document.addEventListener("DOMContentLoaded",e,false)}if(/KHTML|WebKit|iCab/i.test(navigator.userAgent)){a=setInterval(function(){if(/loaded|complete/i.test(document.readyState)){e();clearInterval(a)}},10)}window.onload=e;return{DOMReady:function(){for(var j=0,h=arguments.length,k;j<h;j++){k=arguments[j];if(!k.DOMReady&&!b[k]){if(typeof k==="string"){b[k]=true;k=new Function(k)}k.DOMReady=true;f.push(k)}}if(g){d()}},setErrorHandling:function(h){c=h}}}();DOMAssistant.DOMReady=DOMAssistant.DOMLoad.DOMReady;