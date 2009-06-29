// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://domassistant.googlecode.com/, documentation: http://www.domassistant.com/documentation, version 2.8
var DOMAssistant=function(){var h=function(){},d=/*@cc_on!@*/false,g=d&&parseFloat(navigator.appVersion)<6,c={},m={},a=true,k=Array.prototype.slice,l={accesskey:"accessKey","class":"className",colspan:"colSpan","for":"htmlFor",maxlength:"maxLength",readonly:"readOnly",rowspan:"rowSpan",tabindex:"tabIndex",valign:"vAlign",cellspacing:"cellSpacing",cellpadding:"cellPadding"},j={rules:/\s*(,)\s*/g,selector:/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+\s*(\^|\$|\*|\||~)?(=\s*([\w\u00C0-\uFFFF\s\-\_\.]+|"[^"]*"|'[^']*'))?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_\.]+|"[^"]*"|'[^']*'|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.\'\"]+\]+)|(:\w+[\w\-]*\(.+\)))\))?)*)?(>|\+|~)?/,selectorSplit:/(?:\[.*\]|\(.*\)|[^\s\+>~\[\(])+|[\+>~]/g,id:/^#([\w\u00C0-\uFFFF\-\_]+)$/,tag:/^(\w+)/,relation:/^(>|\+|~)$/,pseudo:/^:(\w[\w\-]*)(\((.+)\))?$/,pseudos:/:(\w[\w\-]*)(\((.+)\))?/g,attribs:/\[(\w+)\s*(\^|\$|\*|\||~)?(=)?\s*([^\[\]]*|"[^\"]*"|'[^\']*')?\](?=$|\[|\:|\s)/g,classes:/\.([\w\u00C0-\uFFFF\-_]+)/g,quoted:/^["'](.*)["']$/,nth:/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n([\+\-]\d+)?)|(\-(([1-9]\d*)?)n\+(\d+)))$/,special:/(:check|:enabl|\bselect)ed\b/},f=function(p,q,n){var o=p.tagName;while((p=p[q+"Sibling"])&&(p.nodeType!==1||(n?p.tagName!==o:p.tagName==="!"))){}return p},b=function(n){return typeof n!=="undefined"},i=function(n){return(i=n[0].compareDocumentPosition?function(o){return o.sort(function(q,p){return 3-(q.compareDocumentPosition(p)&6)})}:d?function(o){return o.sort(function(q,p){return q.sourceIndex-p.sourceIndex})}:function(o){return o.sort(function(s,q){var r=document.createRange(),p=document.createRange();r.setStart(s,0);r.setEnd(s,0);p.setStart(q,0);p.setEnd(q,0);return r.compareBoundaryPoints(Range.START_TO_END,p)})})(n)};var e=function(o,n){o.push.apply(o,k.apply(n));return o};if(d){e=function(p,o){if(o.slice){return p.concat(o)}var n=0,q;while((q=o[n++])){p[p.length]=q}return p}}return{isIE:d,camel:l,def:b,allMethods:[],publicMethods:["prev","next","hasChild","cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(d){h=Array}h.prototype=[];(function(n){n.each=function(r,q){for(var p=0,o=this.length;p<o;p++){if(r.call(q||this[p],this[p],p,this)===false){break}}return this};n.first=function(){return b(this[0])?DOMAssistant.addMethodsToElm(this[0]):null};n.end=function(){return this.previousSet};n.indexOf=n.indexOf||function(q){for(var p=0,o=this.length;p<o;p++){if(p in this&&this[p]===q){return p}}return -1};n.map=function(s,r){var q=[];for(var p=0,o=this.length;p<o;p++){if(p in this){q[p]=s.call(r||this[p],this[p],p,this)}}return q};n.filter=function(s,r){var q=new h();q.previousSet=this;for(var p=0,o=this.length;p<o;p++){if(p in this&&s.call(r||this[p],this[p],p,this)){q.push(this[p])}}return q};n.every=function(r,q){for(var p=0,o=this.length;p<o;p++){if(p in this&&!r.call(q||this[p],this[p],p,this)){return false}}return true};n.some=function(r,q){for(var p=0,o=this.length;p<o;p++){if(p in this&&r.call(q||this[p],this[p],p,this)){return true}}return false}})(h.prototype);this.attach(this)},addMethods:function(n,o){if(!b(this.allMethods[n])){this.allMethods[n]=o;this.addHTMLArrayPrototype(n,o)}},addMethodsToElm:function(o){for(var n in this.allMethods){if(b(this.allMethods[n])){this.applyMethod.call(o,n,this.allMethods[n])}}return o},applyMethod:function(o,n){if(typeof this[o]!=="function"){this[o]=n}},attach:function(p){var n=p.publicMethods;if(!b(n)){for(var r in p){if(r!=="init"&&b(p[r])){this.addMethods(r,p[r])}}}else{if(n.constructor===Array){for(var o=0,q;(q=n[o]);o++){this.addMethods(q,p[q])}}}if(typeof p.init==="function"){p.init()}},addHTMLArrayPrototype:function(n,o){h.prototype[n]=function(){var r=new h();r.previousSet=this;for(var q=0,p=this.length;q<p;q++){r.push(o.apply(DOMAssistant.$$(this[q]),arguments))}return r}},clearHandlers:function(){var r=this.all||this.getElementsByTagName("*");for(var q=0,s,n;(s=r[q++]);){if(s.uniqueHandlerId&&(n=s.attributes)){for(var o,p=n.length;p--;){o=n[p].nodeName.toLowerCase();if(typeof s[o]==="function"){s[o]=null}}}}},setCache:function(n){a=n},$:function(){var q=arguments[0];if(arguments.length===1&&(typeof q==="object"||(typeof q==="function"&&!!q.nodeName))){return DOMAssistant.$$(q)}var s=!!q?new h():null;for(var o=0,n,r;(n=arguments[o]);o++){if(typeof n==="string"){n=n.replace(/^[^#]*(#)/,"$1");if(j.id.test(n)){if((r=DOMAssistant.$$(n.substr(1),false))){s.push(r)}}else{var p=(document.all||document.getElementsByTagName("*")).length;s=(!document.querySelectorAll&&a&&m.rule&&m.rule===n&&m.doc===p)?m.elms:e(s,DOMAssistant.cssSelection.call(document,n));m={rule:n,elms:s,doc:p}}}}return s},$$:function(t,q){var s=(typeof t==="object"||typeof t==="function"&&!!t.nodeName)?t:document.getElementById(t),r=q||true,p=function(v){var u=v.id;return typeof u!=="object"?u:v.attributes.id.nodeValue};if(typeof t==="string"&&s&&p(s)!==t){s=null;for(var n=0,o;(o=document.all[n]);n++){if(p(o)===t){s=o;break}}}if(s&&r&&!s.next){DOMAssistant.addMethodsToElm(s)}return s},prev:function(){return DOMAssistant.$$(f(this,"previous"))},next:function(){return DOMAssistant.$$(f(this,"next"))},hasChild:function(n){return this===document||this!==n&&(this.contains?this.contains(n):!!(this.compareDocumentPosition(n)&16))},getSequence:function(r){var s,q=2,o=-1,n=-1,p=j.nth.exec(r.replace(/^0n\+/,"").replace(/^2n$/,"even").replace(/^2n+1$/,"odd"));if(!p){return null}if(p[2]){s=(p[2]==="odd")?1:2;n=(s===1)?1:0}else{if(p[3]){s=o=parseInt(p[3],10);q=0}else{if(p[4]){q=p[6]?parseInt(p[6],10):1;s=p[7]?parseInt(p[7],10):0;while(s<1){s+=q}n=(s>=q)?(s-q)%q:s}else{if(p[8]){q=p[10]?parseInt(p[10],10):1;s=o=parseInt(p[11],10);while(s>q){s-=q}n=(o>=q)?(o-q)%q:o}}}}return{start:s,add:q,max:o,modVal:n}},cssByDOM:function(p){var aR,G,C,L,ar,w,af,z,I,v,ao,aK,x,aF,ay=new h(),aO=ay.indexOf,an=[],aD=[],aH=p.replace(j.rules,"$1").split(","),aC={};function aN(q){q=q||an;for(var o=q.length;o--;){q[o].added=null;q[o].removeAttribute("added")}}function B(){for(var o=aR.length;o--;){aR[o].childElms=null}}function ak(q,n){for(var r=0,u;(u=q[r]);r++){var t=false;for(var o=0,s;(s=n[o]);o++){if(s===u){t=true;n.splice(o,1);break}}if(t){q.splice(r--,1)}}return q}function D(o,n){return(d||j.special.test(n))?o[l[n.toLowerCase()]||n]:o.getAttribute(n,2)}function N(n,o){n=n?n.replace(j.quoted,"$1").replace(/(\.|\[|\])/g,"\\$1"):null;return{"^":"^"+n,"$":n+"$","*":n,"|":"^"+n+"(\\-\\w+)*$","~":"\\b"+n+"\\b"}[o]||(n!==null?"^"+n+"$":n)}function Q(n,o){return g?(n==="*"?o.all:o.all.tags(n)):o.getElementsByTagName(n)}function aI(n,o){n=n||"*";o=o||document;return(o===document||o.lastModified)?c[n]||(c[n]=Q(n,document)):Q(n,o)}function ap(t,a7,r){aR=[];var s=a7.split("-"),aT=[],aY=0,a6=/\-of\-type$/.test(a7),aX,aS={first:function(a8){return !f(a8,"previous",a6)},last:function(a8){return !f(a8,"next",a6)},empty:function(a8){return !a8.firstChild},enabled:function(a8){return !a8.disabled&&a8.type!=="hidden"},disabled:function(a8){return a8.disabled},checked:function(a8){return a8.checked},contains:function(a8){return(a8.innerText||a8.textContent||"").indexOf(r.replace(j.quoted,"$1"))>-1},other:function(a8){return D(a8,a7)===r}};function q(a8){while((z=t[aY++])){if(aS[a8](z)){aT[aT.length]=z}}return aT}var a3=s[0]||null;if(a3&&aS[a3]){return q(a3)}switch(a3){case"only":var aU;while((z=t[aY++])){I=z.parentNode;if(I!==aU){if(aS.first(z)&&aS.last(z)){aT[aT.length]=z}aU=I}}break;case"nth":if(/^n$/.test(r)){aT=t}else{var a5=(s[1]==="last")?["lastChild","previousSibling"]:["firstChild","nextSibling"];aF=DOMAssistant.getSequence(r);if(aF){while((z=t[aY++])){I=z.parentNode;if(!I.childElms){var a2=0,aZ=z.nodeName;aK=aF.start;x=I[a5[0]];while(x&&(aF.max<0||aK<=aF.max)){var a4=x.nodeName;if((a6&&a4===aZ)||(!a6&&x.nodeType===1&&a4!=="!")){if(++a2===aK){if(a4===aZ){aT[aT.length]=x}aK+=aF.add}}x=x[a5[1]]}I.childElms=true;aR[aR.length]=I}}B()}}break;case"target":var o=document.location.hash.slice(1);if(o){while((z=t[aY++])){if(D(z,"name")===o||D(z,"id")===o){aT[aT.length]=z;break}}}break;case"not":if((aX=j.pseudo.exec(r))){aT=ak(t,ap(t,aX[1]?aX[1].toLowerCase():null,aX[3]||null))}else{for(var a0 in j){if(j[a0].lastIndex){j[a0].lastIndex=0}}r=r.replace(j.id,"[id=$1]");var aW=j.tag.exec(r);var u=j.classes.exec(r);var aV=j.attribs.exec(r);var n=new RegExp(aV?N(aV[4],aV[2]):"(^|\\s)"+(aW?aW[1]:u?u[1]:"")+"(\\s|$)","i");while((v=t[aY++])){ao=null;if(aW&&!n.test(v.nodeName)||u&&!n.test(v.className)){ao=v}else{if(aV){var a1=D(v,aV[1]);if(!b(a1)||a1===false||typeof a1==="string"&&!n.test(a1)){ao=v}}}if(ao&&!ao.added){ao.added=true;aT[aT.length]=ao}}}break;default:return q("other")}return aT}function X(r,o){var n=0,q=r,t;while((t=o[n++])){if(!q.length||q.indexOf(t)<0){r.push(t)}}return r}function U(){return this.tagName!=="!"}for(var ai=0,aG=[];(G=aH[ai]);ai++){if(!(C=G.match(j.selectorSplit))||ai&&aO.call(aH.slice(0,ai),G)>-1){continue}an=[this];for(var ag=0,E;(E=C[ag]);ag++){aD=[];if(j.relation.test(E)){if((L=j.relation.exec(E))){var al=null,aP=C[ag+1];if((ar=j.tag.exec(aP))){ar=ar[1];w=new RegExp("(^|\\s)"+ar+"(\\s|$)","i")}else{if(j.id.test(aP)){al=DOMAssistant.$(aP)||null}}for(var ae=0,K;(K=an[ae]);ae++){switch(L[0]){case">":var aA=al||aI(ar,K);for(var ac=0,av;(av=aA[ac]);ac++){if(av.parentNode===K){aD[aD.length]=av}}break;case"+":if((K=f(K,"next"))){if((al&&al[0]===K)||(!al&&(!ar||w.test(K.nodeName)))){aD[aD.length]=K}}break;case"~":while((K=K.nextSibling)&&!K.added){if((al&&al[0]===K)||(!al&&(!ar||w.test(K.nodeName)))){K.added=true;aD[aD.length]=K}}break}}an=aD;aN();E=C[++ag];if(/^\w+$/.test(E)||j.id.test(E)){continue}an.skipTag=true}}var aq=j.selector.exec(E);aC={tag:(!aq[1]||aq[3]==="*")?"*":aq[1],id:(aq[3]!=="*")?aq[2]:null,allClasses:aq[4],allAttr:aq[6],allPseudos:aq[11]};if(aC.id){var M=0,aj=document.getElementById(aC.id.slice(1));if(aj){while(an[M]&&!DOMAssistant.hasChild.call(an[M],aj)){M++}aD=(M<an.length&&(aC.tag==="*"||aC.tag===aj.tagName.toLowerCase()))?[aj]:[]}an=aD}else{if(aC.tag&&!an.skipTag){if(ag===0&&!aD.length&&an.length===1){an=aD=e([],aI(aC.tag,an[0]))}else{for(var ab=0,aL=an.length,aw,at;ab<aL;ab++){aw=aI(aC.tag,an[ab]);for(var Y=0;(at=aw[Y]);Y++){if(!at.added){at.added=true;aD[aD.length]=at}}}an=aD;aN()}}}if(!aD.length){break}an.skipTag=false;if(aC.allClasses){var W=0,Z=[],H=aC.allClasses.split(".").slice(1);while((af=an[W++])){var ad=true,au=af.className;if(au&&au.length){au=au.split(" ");for(var V=H.length;V--;){if(au.indexOf(H[V])<0){ad=false;break}}if(ad){Z[Z.length]=af}}}an=aD=Z}if(aC.allAttr){var R=0,az=[],aa=[],aE=aC.allAttr.match(j.attribs);for(var T=0,y=aE.length,S,aM;T<y;T++){j.attribs.lastIndex=0;S=j.attribs.exec(aE[T]);aM=N(S[4],S[2]||null);az[T]=[(aM?new RegExp(aM):null),S[1]]}while((af=aD[R++])){for(var P=0,aB=az.length;P<aB;P++){var A=true,ax=az[P][0],ah=D(af,az[P][1]);if(!ax&&ah===true){continue}if((!ax&&(!ah||typeof ah!=="string"||!ah.length))||(!!ax&&!ax.test(ah))){A=false;break}}if(A){aa[aa.length]=af}}an=aD=aa}if(aC.allPseudos){var F=aC.allPseudos.match(j.pseudos);for(var O=0,am=F.length;O<am;O++){j.pseudos.lastIndex=0;var aQ=j.pseudos.exec(F[O]);var J=aQ[1]?aQ[1].toLowerCase():null;var aJ=aQ[3]||null;aD=ap(aD,J,aJ);aN(aD)}an=aD}}ay=((aG.length&&(aC.tag==="*"||aO.call(aG,aC.tag)>=0||aO.call(aG,"*")>=0))?X:e)(ay,an);aG.push(aC.tag);if(d&&/\*$/.test(G)){ay=ay.filter(U)}}return(ay.length&&aH.length>1)?i(ay):ay},cssByXpath:function(o){var p={xhtml:"http://www.w3.org/1999/xhtml"},q=(document.documentElement.namespaceURI===p.xhtml)?"xhtml:":"",n=function r(s){return p[s]||null};DOMAssistant.cssByXpath=function(J){var N,P,F,v,w,A,x=new h(),y=J.replace(j.rules,"$1").split(",");function I(S){var T=S?"[":"",R=S?"]":"";return function(U,Y,X,W,V){V=(V||"").replace(j.quoted,"$1");return T+({"^":"starts-with(@"+Y+', "'+V+'")',"$":"substring(@"+Y+", (string-length(@"+Y+") - "+(V.length-1)+"), "+V.length+') = "'+V+'"',"*":'contains(concat(" ", @'+Y+', " "), "'+V+'")',"|":"@"+Y+'="'+V+'" or starts-with(@'+Y+', "'+V+'-")',"~":'contains(concat(" ", @'+Y+', " "), " '+V+' ")'}[X]||("@"+Y+(W?'="'+V+'"':"")))+R}}function L(S,U,T){S=/\-child$/.test(U)?"*":S;var W=U.split("-"),R=((W[1]==="last")?"(count(following-sibling::":"(count(preceding-sibling::")+S+") + 1)",V,X;switch(W[0]){case"nth":return(T!=="n"&&(A=DOMAssistant.getSequence(T)))?((A.start===A.max)?R+" = "+A.start:R+" mod "+A.add+" = "+A.modVal+((A.start>1)?" and "+R+" >= "+A.start:"")+((A.max>0)?" and "+R+" <= "+A.max:"")):"";case"not":return"not("+((V=j.pseudo.exec(T))?L(S,V[1]?V[1].toLowerCase():null,V[3]||null):T.replace(j.id,"[id=$1]").replace(j.tag,"self::$1").replace(j.classes,'contains(concat(" ", @class, " "), " $1 ")').replace(j.attribs,I()))+")";case"first":return"not(preceding-sibling::"+S+")";case"last":return"not(following-sibling::"+S+")";case"only":return"not(preceding-sibling::"+S+" or following-sibling::"+S+")";case"empty":return"count(child::*) = 0 and string-length(text()) = 0";case"contains":return'contains(., "'+T.replace(j.quoted,"$1")+'")';case"enabled":return'not(@disabled) and not(@type="hidden")';case"disabled":return"@disabled";case"target":return'@name="'+(X=document.location.hash.slice(1))+'" or @id="'+X+'"';default:return"@"+U+'="'+T+'"'}}for(var K=0;(N=y[K]);K++){if(!(P=N.match(j.selectorSplit))||K&&x.indexOf.call(y.slice(0,K),N)>-1){continue}F=F?F+" | .":".";for(var H=0,M=P.length;H<M;H++){v=j.selector.exec(P[H]);w={tag:q+((!v[1]||v[3]==="*")?"*":v[1]),id:(v[3]!=="*")?v[2]:null,allClasses:v[4],allAttr:v[6],allPseudos:v[11],tagRelation:v[23]};F+=(w.tagRelation?({">":"/","+":"/following-sibling::*[1]/self::","~":"/following-sibling::"}[w.tagRelation]||""):((H>0&&j.relation.test(P[H-1]))?w.tag:("//"+w.tag)))+(w.id||"").replace(j.id,'[@id = "$1"]')+(w.allClasses||"").replace(j.classes,'[contains(concat(" ", @class, " "), " $1 ")]')+(w.allAttr||"").replace(j.attribs,I(true));if(w.allPseudos){var z=w.allPseudos.match(j.pseudos);for(var G=0,t=z.length;G<t;G++){j.pseudos.lastIndex=0;var u=j.pseudos.exec(z[G]),Q=u[1]?u[1].toLowerCase():null,s=u[3]||null,C=L(w.tag,Q,s);if(C.length){F+="["+C+"]"}}}}}try{var E=document.evaluate(F,this,n,7,null),D,B=0;while((D=E.snapshotItem(B++))){x.push(D)}}catch(O){}return x};return DOMAssistant.cssByXpath.call(this,o)},cssSelection:function(o){if(!o){return null}var n=j.special.test(o);try{if(document.querySelectorAll&&!n){return e(new h(),this.querySelectorAll(o))}}catch(p){}return((document.evaluate&&!n)?DOMAssistant.cssByXpath:DOMAssistant.cssByDOM).call(this,o)},cssSelect:function(n){return DOMAssistant.cssSelection.call(this,n)},elmsByClass:function(p,n){var o=(n||"")+"."+p;return DOMAssistant.cssSelection.call(this,o)},elmsByAttribute:function(o,p,n,r){var q=(n||"")+"["+o+((p&&p!=="*")?((r||"")+"="+p+"]"):"]");return DOMAssistant.cssSelection.call(this,q)},elmsByTag:function(n){return DOMAssistant.cssSelection.call(this,n)}}}();DOMAssistant.initCore();DOMAssistant.Storage=function(){var c=1,a=[],b="_da"+ +new Date();return{retrieve:function(d){if(!DOMAssistant.def(d)){return this[b]||(this[b]=c++)}if(!this[b]||!a[this[b]]){return}return a[this[b]][d]},store:function(f,g){var e=this[b]||(this[b]=c++);a[e]=a[e]||{};if(typeof f==="object"){for(var d in f){if(typeof d==="string"){a[e][d]=f[d]}}}else{a[e][f]=g}return this},unstore:function(e){var d=this[b]||(this[b]=c++);if(a[d]){if(DOMAssistant.def(e)){delete a[d][e]}else{a[d]=null}}return this}}}();DOMAssistant.attach(DOMAssistant.Storage);DOMAssistant.AJAX=function(){var globalXMLHttp=null,readyState=0,status=-1,statusText="",requestPool=[],createAjaxObj=function(url,method,callback,addToContent){var params=null;if(/POST/i.test(method)){url=url.split("?");params=url[1];url=url[0]}return{url:url,method:method,callback:callback,params:params,headers:{},responseType:"text",addToContent:addToContent||false}};return{publicMethods:["ajax","get","post","load"],initRequest:function(){var XMLHttp=null;if(!!window.XMLHttpRequest&&!DOMAssistant.isIE){XMLHttp=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new XMLHttpRequest()}}else{if(!!window.ActiveXObject){var XMLHttpMS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var i=0;i<XMLHttpMS.length;i++){try{XMLHttp=new window.ActiveXObject(XMLHttpMS[i]);DOMAssistant.AJAX.initRequest=function(){return requestPool.length?requestPool.pop():new window.ActiveXObject(XMLHttpMS[i])};break}catch(e){XMLHttp=null}}}}return XMLHttp},ajax:function(ajaxObj){if(!ajaxObj.noParse&&ajaxObj.url&&/\?/.test(ajaxObj.url)&&ajaxObj.method&&/POST/i.test(ajaxObj.method)){var url=ajaxObj.url.split("?");ajaxObj.url=url[0];ajaxObj.params=url[1]+((url[1].length>0&&ajaxObj.params)?("&"+ajaxObj.params):"")}return DOMAssistant.AJAX.makeCall.call(this,ajaxObj)},get:function(url,callback,addToContent){return DOMAssistant.AJAX.makeCall.call(this,createAjaxObj(url,"GET",callback,addToContent))},post:function(url,callback){return DOMAssistant.AJAX.makeCall.call(this,createAjaxObj(url,"POST",callback))},load:function(url,addToContent){this.get(url,DOMAssistant.AJAX.replaceWithAJAXContent,addToContent)},makeCall:function(ajaxObj){var XMLHttp=DOMAssistant.AJAX.initRequest();if(XMLHttp){globalXMLHttp=XMLHttp;(function(elm){var url=ajaxObj.url,method=ajaxObj.method||"GET",callback=ajaxObj.callback,params=ajaxObj.params,headers=ajaxObj.headers,responseType=ajaxObj.responseType||"text",addToContent=ajaxObj.addToContent,timeout=ajaxObj.timeout||null,ex=ajaxObj.exception,timeoutId=null,done=false;XMLHttp.open(method,url,true);XMLHttp.setRequestHeader("AJAX","true");XMLHttp.setRequestHeader("X-Requested-With","XMLHttpRequest");if(method==="POST"){XMLHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");XMLHttp.setRequestHeader("Content-length",params?params.length:0);if(XMLHttp.overrideMimeType){XMLHttp.setRequestHeader("Connection","close")}}if(responseType==="json"){XMLHttp.setRequestHeader("Accept","application/json, text/javascript, */*")}for(var i in headers){if(typeof i==="string"){XMLHttp.setRequestHeader(i,headers[i])}}if(typeof callback==="function"){XMLHttp.onreadystatechange=function(){try{if(XMLHttp.readyState===4&&!done){window.clearTimeout(timeoutId);done=true;status=XMLHttp.status;statusText=XMLHttp.statusText;readyState=4;if((status||location.protocol!=="file:")&&(status<200||status>=300)){throw new Error(statusText)}var response=/xml/i.test(responseType)?XMLHttp.responseXML:XMLHttp.responseText;if(/json/i.test(responseType)&&!!response){response=(typeof JSON==="object"&&typeof JSON.parse==="function")?JSON.parse(response):eval("("+response+")")}globalXMLHttp=null;XMLHttp.onreadystatechange=function(){};requestPool.push(XMLHttp);callback.call(elm,response,addToContent)}}catch(e){globalXMLHttp=XMLHttp=null;if(typeof ex==="function"){ex.call(elm,e);ex=null}}}}XMLHttp.send(params);if(timeout){timeoutId=window.setTimeout(function(){if(!done){XMLHttp.abort();done=true;if(typeof ex==="function"){readyState=0;status=408;statusText="Request timeout";globalXMLHttp=XMLHttp=null;ex.call(elm,new Error(statusText));ex=null}}},timeout)}})(this)}return this},replaceWithAJAXContent:function(content,add){if(add){this.innerHTML+=content}else{DOMAssistant.clearHandlers.apply(this);this.innerHTML=content}},getReadyState:function(){return(globalXMLHttp&&DOMAssistant.def(globalXMLHttp.readyState))?globalXMLHttp.readyState:readyState},getStatus:function(){return status},getStatusText:function(){return statusText}}}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){var a=DOMAssistant.def;return{addClass:function(c){if(!this.hasClass(c)){var b=this.className;this.className=b+(b.length?" ":"")+c}return this},removeClass:function(b){return this.replaceClass(b)},replaceClass:function(c,d){var b=new RegExp(("(^|\\s)"+c+"(\\s|$)"),"i");this.className=this.className.replace(b,function(e,g,f){return d?(g+d+f):" "}).replace(/^\s+|\s+$/g,"");return this},hasClass:function(b){return(" "+this.className+" ").indexOf(" "+b+" ")>-1},setStyle:function(e,f){var d=this.style;if("filters" in this&&(typeof e==="string"?/opacity/i.test(e):a(e.opacity))){d.zoom=1;d.filter=(d.filter||"").replace(/alpha\([^)]*\)/,"")+"alpha(opacity="+(a(e.opacity)?e.opacity:f)*100+")"}if(a(d.cssText)){var b=d.cssText;if(typeof e==="object"){for(var c in e){if(typeof c==="string"){b+=";"+c+":"+e[c]}}}else{b+=";"+e+":"+f}d.cssText=b}return this},getStyle:function(b){var d="",c;b=b.toLowerCase();if(document.defaultView&&document.defaultView.getComputedStyle){d=document.defaultView.getComputedStyle(this,"").getPropertyValue(b)}else{if(this.currentStyle){if("filters" in this&&b==="opacity"){d=(c=this.style.filter||this.currentStyle.filter)&&c.indexOf("opacity=")>=0?parseFloat(c.match(/opacity=([^)]*)/)[1])/100:1}else{b=b.replace(/^float$/,"styleFloat").replace(/\-(\w)/g,function(e,f){return f.toUpperCase()});d=this.currentStyle[b]}if(d==="auto"&&/^(width|height)$/.test(b)&&this.currentStyle.display!=="none"){d=this["offset"+b.charAt(0).toUpperCase()+b.substr(1)]+"px"}}}return d}}}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){var a=DOMAssistant.$$;return{init:function(){DOMAssistant.setCache(false)},create:function(d,c,b,e){var f=a(document.createElement(d));if(c){f=f.setAttributes(c)}if(DOMAssistant.def(e)){f.addContent(e)}if(b){this.appendChild(f)}return f},setAttributes:function(b){if(DOMAssistant.isIE){var c=function(g,e,f){var d=e.toLowerCase();switch(d){case"name":case"type":return a(document.createElement(g.outerHTML.replace(new RegExp(d+"=[a-zA-Z]+")," ").replace(">"," "+d+"="+f+">")));case"style":g.style.cssText=f;return g;default:g[DOMAssistant.camel[d]||e]=f;return g}};DOMAssistant.Content.setAttributes=function(d){var h=this;var g=this.parentNode;for(var f in d){if(typeof d[f]==="string"||typeof d[f]==="number"){var e=c(h,f,d[f]);if(g&&/(name|type)/i.test(f)){if(h.innerHTML){e.innerHTML=h.innerHTML}g.replaceChild(e,h)}h=e}}return h}}else{DOMAssistant.Content.setAttributes=function(d){for(var e in d){if(/class/i.test(e)){this.className=d[e]}else{this.setAttribute(e,d[e])}}return this}}return DOMAssistant.Content.setAttributes.call(this,b)},addContent:function(f){var d=typeof f;if(d==="string"||d==="number"){if(!this.firstChild){this.innerHTML=f}else{var c=document.createElement("div");c.innerHTML=f;for(var b=c.childNodes.length-1,e=null;b>=0;b--){e=this.insertBefore(c.childNodes[b],e)}}}else{if(d==="object"||(d==="function"&&!!f.nodeName)){this.appendChild(f)}}return this},replaceContent:function(b){if(!!this.firstChild){DOMAssistant.clearHandlers.apply(this);this.innerHTML=""}return this.addContent(b)},replace:function(g,b){var f=typeof g;if(f==="string"||f==="number"){var e=this.parentNode;var d=DOMAssistant.Content.create.call(e,"div",null,false,g);for(var c=d.childNodes.length;c--;){e.insertBefore(d.childNodes[c],this.nextSibling)}g=this.nextSibling;e.removeChild(this)}else{if(f==="object"||(f==="function"&&!!g.nodeName)){this.parentNode.replaceChild(g,this)}}return b?g:this},remove:function(){this.parentNode.removeChild(this);return null}}}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var e,c="_events",d=!!document.addEventListener,b={focus:true,blur:true},a=function(g){return DOMAssistant.isIE?{focus:"focusin",blur:"focusout"}[g]||g:g},f=function(k,h,j){k=k||window.event||{};var i={event:k,type:h||k.type,bubbles:k.bubbles||true,cancelable:k.cancelable||false,target:j||k.target||k.srcElement,relatedTarget:k.relatedTarget||(k.fromElement===k.target?k.toElement:k.fromElement)||null,altKey:k.altKey||false,ctrlKey:k.ctrlKey||false,shiftKey:k.shiftKey||false,button:k.button||null,timeStamp:+new Date(),preventDefault:function(){if(k.preventDefault){k.preventDefault()}this.returnValue=k.returnValue=false},stopPropagation:function(){if(k.stopPropagation){k.stopPropagation()}this.cancelBubble=k.cancelBubble=true}};i.currentTarget=i.target;if(i.target.nodeType===3){i.target=i.target.parentNode}if("number"===typeof k.pageX){i.clientX=i.pageX=k.pageX;i.clientY=i.pageY=k.pageY}else{var l=document.documentElement,g=document.body;i.clientX=k.clientX+(l.scrollLeft||g.scrollLeft)-(l.clientLeft||0);i.clientY=k.clientY+(l.scrollTop||g.scrollTop)-(l.clientTop||0)}if("number"===typeof k.which){i.keyCode=k.keyCode;i.charCode=i.which=k.which}else{if(k.keyCode){i.keyCode=i.charCode=k.keyCode}}return i};return{publicMethods:["triggerEvent","addEvent","removeEvent","relayEvent","unrelayEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;e=this.handleEvent},triggerEvent:function(h,o,n){h=a(h);var k=this.retrieve(c),l=n||f(n,h,o||this);l.currentTarget=this;if(k&&k[h]){for(var j=0,g=k[h].length;j<g;j++){if(k[h][j].call(this,l)===false){l.stopPropagation()}}}else{if(typeof this["on"+h]==="function"){this["on"+h].call(this,l)}}var m=DOMAssistant.$$(this.parentNode);if(!l.cancelBubble&&m&&m.nodeType===1){m.triggerEvent(h,o,l)}return this},addEvent:function(g,k,l){if(/^DOM/.test(g)&&d){this.addEventListener(g,k,false)}else{var j=(g=a(g))+this.retrieve();if(!(k.attachedElements&&k.attachedElements[j])){var i=this.retrieve(c)||{};if(!i[g]){i[g]=[];var h=this["on"+g];if(h){i[g].push(h);this["on"+g]=null}if(d){this.addEventListener(g,e,b[g])}else{this["on"+g]=e}}k.relay=l;i[g].push(k);k.attachedElements=k.attachedElements||{};k.attachedElements[j]=true;this.store(c,i)}}return this},handleEvent:function(g){var n=f(g),m=a(n.type),h=this.retrieve(c)[m].slice(0),l,k;if((l=h.length)){for(var j=0;j<l;j++){if(typeof h[j]==="function"){k=h[j].call(this,n)}}if(k===false){n.stopPropagation()}return k}},removeEvent:function(g,n,o){var l=(g=a(g))+this.retrieve(),k=this.retrieve(c);if(k&&k[g]){var h=k[g];for(var m,j=h.length;j--;){m=n||h[j];if(h[j]===m&&(!o&&!m.relay||o&&m.relay)){h.splice(j,1);if(m.attachedElements){m.attachedElements[l]=null}}}if(!k[g].length){if(d){this.removeEventListener(g,e,b[g])}else{this["on"+g]=null}}}else{if(this["on"+g]&&!n&&!o){this["on"+g]=null}}return this},relayEvent:function(h,g,i){return this.addEvent(h,function(n){n=f(n);var m=n.target,j=arguments,k=0,o,l=this.cssSelect(g);while((o=l[k++])){if((o===m||DOMAssistant.hasChild.call(o,m))&&!o.disabled){n.currentTarget=o;return i.apply(o,j)}}},true)},unrelayEvent:function(g){return this.removeEvent(g,null,true)},preventDefault:function(g){if(g.preventDefault){g.preventDefault()}g.returnValue=false},cancelBubble:function(g){if(g.stopPropagation){g.stopPropagation()}g.cancelBubble=true}}}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var g=false,a=null,f=[],b={},c=null,d=function(){for(var j=0,h=f.length;j<h;j++){try{f[j]()}catch(k){if(c&&typeof c==="function"){c(k)}}}f=[]},e=function(){if(g){return}g=true;d()};
/*@cc_on @if(@_win32||@_win64)document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");document.getElementById("ieScriptLoad").onreadystatechange=function(){if(this.readyState==="complete"){e()}}@end@*/
if(document.addEventListener){document.addEventListener("DOMContentLoaded",e,false)}if(/KHTML|WebKit|iCab/i.test(navigator.userAgent)){a=setInterval(function(){if(/loaded|complete/i.test(document.readyState)){e();clearInterval(a)}},10)}window.onload=e;return{DOMReady:function(){for(var j=0,h=arguments.length,k;j<h;j++){k=arguments[j];if(!k.DOMReady&&!b[k]){if(typeof k==="string"){b[k]=true;k=new Function(k)}k.DOMReady=true;f.push(k)}}if(g){d()}},setErrorHandling:function(h){c=h}}}();DOMAssistant.DOMReady=DOMAssistant.DOMLoad.DOMReady;