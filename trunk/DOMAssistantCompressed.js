// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation, version 2.7
var DOMAssistant=function(){var A=function(){};var C=/*@cc_on!@*/false;var B=[];var D=function(H,G){for(var F=0,E=G.length;F<E;F++){H.push(G[F]);}return H;};if(C){D=function(H,G){if(G.slice){return H.concat(G);}for(var F=0,E=G.length;F<E;F++){H[H.length]=G[F];}return H;};}return{allMethods:[],publicMethods:["cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(C){A=Array;}A.prototype=[];A.prototype.each=function(G){for(var F=0,E=this.length;F<E;F++){G.call(this[F]);}return this;};A.prototype.first=function(){return(typeof this[0]!=="undefined")?DOMAssistant.addMethodsToElm(this[0]):null;};A.prototype.end=function(){return this.previousSet;};this.attach(this);},addMethods:function(E,F){if(typeof this.allMethods[E]==="undefined"){this.allMethods[E]=F;this.addHTMLArrayPrototype(E,F);}},addMethodsToElm:function(F){for(var E in this.allMethods){if(typeof this.allMethods[E]!=="undefined"){this.applyMethod.call(F,E,this.allMethods[E]);}}return F;},applyMethod:function(F,E){if(typeof this[F]!=="function"){this[F]=E;}},attach:function(G){var E=G.publicMethods;if(typeof E==="undefined"){for(var I in G){if(I!=="init"&&typeof G[I]!=="undefined"){this.addMethods(I,G[I]);}}}else{if(E.constructor===Array){for(var F=0,H;(H=E[F]);F++){this.addMethods(H,G[H]);}}}if(typeof G.init==="function"){G.init();}},addHTMLArrayPrototype:function(E,F){A.prototype[E]=function(){var I=new A();I.previousSet=this;var J;for(var H=0,G=this.length;H<G;H++){J=F.apply(this[H],arguments);if(typeof J!=="undefined"&&J!==null&&J.constructor===Array){I=D(I,J);}else{I.push(J);}}return I;};},getSequence:function(J){var K,I=2,F=-1,E=-1;var H=/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n((\+|\-)(\d+))?)|(\-(([1-9]\d*)?)n\+(\d+)))$/;var G=H.exec(J);if(!G){return null;}else{if(G[2]){K=(G[2]==="odd")?1:2;E=(K===1)?1:0;}else{if(G[3]){K=parseInt(G[3],10);I=0;F=K;}else{if(G[4]){I=G[6]?parseInt(G[6],10):1;K=G[7]?parseInt(G[8]+G[9],10):0;while(K<1){K+=I;}E=(K>I)?(K-I)%I:((K===I)?0:K);}else{if(G[10]){I=G[12]?parseInt(G[12],10):1;K=F=parseInt(G[13],10);while(K>I){K-=I;}E=(F>I)?(F-I)%I:((F===I)?0:F);}}}}}return{start:K,add:I,max:F,modVal:E};},$:function(){var G=new A();if(document.getElementById){var E=arguments[0];if(typeof E==="string"){E=E.replace(/^[^#]*(#)/,"$1");if(/^#[\w\u00C0-\uFFFF\-\_]+$/.test(E)){var F=DOMAssistant.$$(E.substr(1),false);if(F){G.push(F);}}else{G=DOMAssistant.cssSelection.call(document,E);}}else{if(typeof E==="object"){G=(arguments.length===1)?DOMAssistant.$$(E):D(G,arguments);}}}return G;},$$:function(J,G){var I=(typeof J==="object")?J:document.getElementById(J);var H=G||true;if(typeof J==="string"&&I&&I.id!==J){I=null;for(var E=0,F;(F=document.all[E]);E++){if(F.id===J){I=F;break;}}}if(I&&H){DOMAssistant.addMethodsToElm(I);}return I;},cssSelection:function(F){if(document.evaluate){DOMAssistant.cssSelection=function(a){var P=a.replace(/\s*(,)\s*/g,"$1").split(",");var N=new A();var d,I,f,X,L,M,R;var G=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?(>|\+|~)?/;var e=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");function Z(h,k,j,i){switch(j){case"^":return"starts-with(@"+k+", '"+i+"')";case"$":return"substring(@"+k+", (string-length(@"+k+") - "+(i.length-1)+"), "+i.length+") = '"+i+"'";case"*":return"contains(concat(' ', @"+k+", ' '), '"+i+"')";case"|":return"(@"+k+"='"+i+"' or starts-with(@"+k+", '"+i+"-'))";case"~":return"(@"+k+"='"+i+"' or starts-with(@"+k+", '"+i+" ') or substring(@"+k+", (string-length(@"+k+") - "+(i.length-1)+"), "+i.length+") = ' "+i+"' or contains(concat(' ', @"+k+", ' '), ' "+i+" '))";default:return"@"+k+(i?"='"+i+"'":"");}}for(var b=0;(d=P[b]);b++){if(b>0){I=false;for(var S=0,T=b;S<T;S++){if(P[b]===P[S]){I=true;break;}}if(I){continue;}}f=d.match(e);X=".";for(var Y=0,c=f.length;Y<c;Y++){L=G.exec(f[Y]);M={tag:(!L[1]||L[3]==="*")?"*":L[1],id:(L[3]!=="*")?L[2]:null,allClasses:L[4],allAttr:L[6],allPseudos:L[10],tagRelation:L[21]};if(M.tagRelation){switch(M.tagRelation){case">":X+="/child::";break;case"+":X+="/following-sibling::*[1]/self::";break;case"~":X+="/following-sibling::";break;}}else{X+=(Y>0&&/(>|\+|~)/.test(f[Y-1]))?M.tag:("/descendant::"+M.tag);}if(M.id){X+="[@id = '"+M.id.replace(/^#/,"")+"']";}if(M.allClasses){X+=M.allClasses.replace(/\.([\w\u00C0-\uFFFF\-_]+)/g,"[contains(concat(' ', @class, ' '), ' $1 ')]");}if(M.allAttr){X+=M.allAttr.replace(/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/g,Z);}if(M.allPseudos){var O=/:(\w[\w\-]*)(\(([^\)]+)\))?/;M.allPseudos=M.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var Q=0,U=M.allPseudos.length;Q<U;Q++){var K=M.allPseudos[Q].match(O);var g=K[1]?K[1].toLowerCase():null;var J=K[3]?K[3]:null;switch(g){case"first-child":X+="[count(preceding-sibling::*) = 0]";break;case"first-of-type":X+="[count(preceding-sibling::"+M.tag+") = 0]";break;case"last-child":X+="[count(following-sibling::*) = 0]";break;case"last-of-type":X+="[count(following-sibling::"+M.tag+") = 0]";break;case"only-child":X+="[count(preceding-sibling::*) = 0 and count(following-sibling::*) = 0]";break;case"only-of-type":X+="[count(preceding-sibling::"+M.tag+") = 0 and count(following-sibling::"+M.tag+") = 0]";break;case"nth-child":if(!/^n$/.test(J)){R=DOMAssistant.getSequence(J);if(R){if(R.start===R.max){X+="[count(preceding-sibling::*) = "+(R.start-1)+"]";}else{X+="[(count(preceding-sibling::*) + 1) mod "+R.add+" = "+R.modVal+((R.start>1)?" and count(preceding-sibling::*) >= "+(R.start-1):"")+((R.max>0)?" and count(preceding-sibling::*) <= "+(R.max-1):"")+"]";}}}break;case"nth-of-type":if(!/^n$/.test(J)){R=DOMAssistant.getSequence(J);if(R){if(R.start===R.max){X+="["+J+"]";}else{X+="[position() mod "+R.add+" = "+R.modVal+((R.start>1)?" and position() >= "+R.start:"")+((R.max>0)?" and position() <= "+R.max:"")+"]";}}}break;case"empty":X+="[count(child::*) = 0 and string-length(text()) = 0]";break;case"contains":X+="[contains(., '"+J+"')]";break;case"enabled":X+="[not(@disabled)]";break;case"disabled":X+="[@disabled]";break;case"checked":X+="[@checked='checked']";break;case"not":J=J.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var H=J.replace(/^(\w+)/,"self::$1");H=H.replace(/^\.([\w\u00C0-\uFFFF\-_]+)/g,"contains(concat(' ', @class, ' '), ' $1 ')");H=H.replace(/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/g,Z);X+="[not("+H+")]";break;default:X+="[@"+g+"='"+J+"']";break;}}}}var W=document.evaluate(X,this,null,0,null),V;while((V=W.iterateNext())){N.push(V);}}return N;};}else{DOMAssistant.cssSelection=function(G){var BL=G.replace(/\s*(,)\s*/g,"$1").split(",");var A7=new A();var Ar=[],BI=[];var BX,c,AU,V,AG,Av,BJ,J,AS,BW,AV,A9,AW,I,Ab,Q,g,As,A6,Z,X,Ay,BQ,Aq,L,BK;var BG=/^(>|\+|~)$/;var f=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?/;var AN;try{AN=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");}catch(Af){AN=/[^\s]+/g;}function BS(e){e=e||Ar;for(var b=0,a=e.length;b<a;b++){e[b].added=null;}}function U(){for(var b=0,a=BX.length;b<a;b++){BX[b].childElms=null;}}function W(b,a){if(C){switch(a){case"id":return b.id;case"for":return b.htmlFor;case"class":return b.className;}}return b.getAttribute(a,2);}function AI(a,b){switch(b){case"^":return"^"+a;case"$":return a+"$";case"*":return a;case"|":return"(^"+a+"(\\-\\w+)*$)";case"~":return"\\b"+a+"\\b";default:return a?"^"+a+"$":null;}}function BN(a,b){b=b||document;return C?((a==="*")?b.all:b.all.tags(a)):b.getElementsByTagName(a);}for(var Ai=0;(c=BL[Ai]);Ai++){if(Ai>0){AU=false;for(var Ah=0,Am=Ai;Ah<Am;Ah++){if(BL[Ai]===BL[Ah]){AU=true;break;}}if(AU){continue;}}V=c.match(AN);Ar=[this];for(var Ac=0,Y;(Y=V[Ac]);Ac++){var Ak=false;BI=[];if(Ac>0&&BG.test(Y)){AG=BG.exec(Y);if(AG){Ak=true;BJ=V[Ac+1];Av=/^\w+/.exec(BJ);if(Av){J=new RegExp("(^|\\s)"+Av+"(\\s|$)","i");}switch(AG[0]){case">":for(var Aa=0,AF,BE;(AF=Ar[Aa]);Aa++){BE=AF.getElementsByTagName(Av||"*");for(var AY=0,A3;(A3=BE[AY]);AY++){if(A3.parentNode===AF){BI[BI.length]=A3;}}}break;case"+":for(var AX=0;(AS=Ar[AX]);AX++){while((AS=AS.nextSibling)&&AS.nodeType!==1){}if(AS){if(!Av||J.test(AS.nodeName)){BI[BI.length]=AS;}}}break;case"~":for(var AT=0;(AS=Ar[AT]);AT++){while((AS=AS.nextSibling)&&!AS.added){if(!Av||J.test(AS.nodeName)){AS.added=true;BI[BI.length]=AS;}}}break;}Ar=BI;BS();Y=V[++Ac];if(/^\w+$/.test(Y)){continue;}Ar.skipTag=true;}}var Au=f.exec(Y);var BF={tag:(!Au[1]||Au[3]==="*")?"*":Au[1],id:(Au[3]!=="*")?Au[2]:null,allClasses:Au[4],allAttr:Au[6],allPseudos:Au[10]};if(BF.id){var Ao=document.getElementById(BF.id.replace(/#/,""));if(Ao){if(Ak){for(var A8=0,S=BI.length;A8<S;A8++){if(BI[A8]===Ao){BI=[Ao];break;}}}else{BI=[Ao];}}Ar=BI;}else{if(BF.tag&&!Ar.skipTag){if(Ac===0&&!BI.length&&Ar.length===1){if(Ar[0]===document||Ar[0].lastModified){if(!B[BF.tag]){B[BF.tag]=BN(BF.tag);}Ar=BI=D([],B[BF.tag]);}else{Ar=BI=D([],BN(BF.tag,Ar[0]));}}else{for(var AR=0,Ap=Ar.length,A5,Az;AR<Ap;AR++){A5=BN(BF.tag,Ar[AR]);for(var AQ=0;(Az=A5[AQ]);AQ++){if(!Az.added){Az.added=true;BI[BI.length]=Az;}}}Ar=BI;BS();}}}if(!BI.length){break;}Ar.skipTag=false;if(BF.allClasses){BF.allClasses=BF.allClasses.replace(/^\./,"").split(".");BW=[];for(var N=0,A2=BF.allClasses.length;N<A2;N++){BW[BW.length]=new RegExp("(^|\\s)"+BF.allClasses[N]+"(\\s|$)");}AV=[];for(var AP=0,A1;(Ab=Ar[AP]);AP++){A1=Ab.className;if(A1&&!Ab.added){As=false;for(var AO=0,P=BW.length;AO<P;AO++){As=BW[AO].test(A1);if(!As){break;}}if(As){Ab.added=true;AV[AV.length]=Ab;}}}BS();Ar=BI=AV;}if(BF.allAttr){BF.allAttr=BF.allAttr.match(/\[[^\]]+\]/g);A9=[];I=/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/;for(var BB=0,At=BF.allAttr.length,AM,K,BR;BB<At;BB++){AM=I.exec(BF.allAttr[BB]);K=AM[3]?AM[3].replace(/\./g,"\\."):null;BR=AI(K,(AM[2]||null));A9[A9.length]=[(BR?new RegExp(BR):null),AM[1]];}AW=[];for(var AL=0,Ag;(Ab=BI[AL]);AL++){for(var AK=0,BD=A9.length,A4;AK<BD;AK++){As=false;A4=A9[AK][0];Ag=W(Ab,A9[AK][1]);if(typeof Ag==="string"&&Ag.length){if(!A4||typeof A4==="undefined"||(A4&&A4.test(Ag))){As=true;}}if(!As){break;}}if(As){AW[AW.length]=Ab;}}Ar=BI=AW;}if(BF.allPseudos){var d=/:(\w[\w\-]*)(\(([^\)]+)\))?/;BF.allPseudos=BF.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var AB=0,BV=BF.allPseudos.length;AB<BV;AB++){var BU=BF.allPseudos[AB].match(d);var h=BU[1]?BU[1].toLowerCase():null;var BO=BU[3]?BU[3]:null;var BC=BI;BI=[];BX=[];if(h==="not"){BO=BO.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var x=/^(\w+)/.exec(BO);var An=/^\.([\w\u00C0-\uFFFF\-_]+)/.exec(BO);var Aj=/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/.exec(BO);var BP=new RegExp("(^|\\s)"+(x?x[1]:An?An[1]:"")+"(\\s|$)","i");if(Aj){var BM=Aj[3]?Aj[3].replace(/\./g,"\\."):null;var BH=AI(BM,Aj[2]);BP=new RegExp(BH,"i");}for(var AJ=0,H;(H=BC[AJ]);AJ++){As=null;if(x&&!BP.test(H.nodeName)){As=H;}else{if(An&&!BP.test(H.className)){As=H;}else{if(Aj){var Al=W(H,Aj[1]);if(!Al||!BP.test(Al)){As=H;}}}}if(As&&!As.added){As.added=true;BI[BI.length]=As;}}}else{switch(h){case"first-child":for(var AH=0,R;(R=Q=BC[AH]);AH++){while((R=R.previousSibling)&&R.nodeType!==1){}if(!R){BI[BI.length]=Q;}}break;case"last-child":for(var AE=0,Ae;(Ae=Q=BC[AE]);AE++){while((Ae=Ae.nextSibling)&&Ae.nodeType!==1){}if(!Ae){BI[BI.length]=Q;}}break;case"only-child":for(var AD=0,T;(Q=BC[AD]);AD++){g=Q.parentNode;if(g!==T){A6=g.firstChild;Z=g.lastChild;while(A6.nodeType!==1&&(A6=A6.nextSibling)){}while(Z.nodeType!==1&&(Z=Z.previousSibling)){}if(A6===Q&&Z===Q){BI[BI.length]=Q;}T=g;}}break;case"nth-child":if(/^n$/.test(BO)){BI=D(BI,BC);}else{BK=DOMAssistant.getSequence(BO);if(BK){for(var AA=0;(Q=BC[AA]);AA++){g=Q.parentNode;if(!g.childElms){BQ=BK.start;Aq=0;L=g.firstChild;while(L&&(BK.max<0||BQ<=BK.max)){if(L.nodeType===1){if(++Aq===BQ){if(L.nodeName===Q.nodeName){BI[BI.length]=L;}BQ+=BK.add;}}L=L.nextSibling;}g.childElms=true;BX[BX.length]=g;}}U();}}break;case"first-of-type":for(var BA=0;(Q=BC[BA]);BA++){A6=Q.parentNode.getElementsByTagName(Q.nodeName)[0];if(A6===Q){BI[BI.length]=Q;}}break;case"last-of-type":for(var Ax=0;(Q=BC[Ax]);Ax++){Z=Q.parentNode.lastChild;while(Z.nodeName!==Q.nodeName){Z=Z.previousSibling;}if(Z===Q){BI[BI.length]=Q;}}break;case"only-of-type":for(var Ad=0;(Q=BC[Ad]);Ad++){X=Q.parentNode.getElementsByTagName(Q.nodeName);if(X.length===1){BI[BI.length]=Q;}}break;case"nth-of-type":if(/^n$/.test(BO)){BI=D(BI,BC);}else{BK=DOMAssistant.getSequence(BO);if(BK){for(var AC=0;(Q=BC[AC]);AC++){g=Q.parentNode;if(!g.childElms){BQ=BK.start;Aq=0;L=g.firstChild;while(L&&(BK.max<0||BQ<=BK.max)){if(L.nodeName===Q.nodeName){if(++Aq===BQ){BI[BI.length]=L;BQ+=BK.add;}}L=L.nextSibling;}g.childElms=true;BX[BX.length]=g;}}U();}}break;case"empty":for(var BT=0;(Q=BC[BT]);BT++){Ay=Q.parentNode.childNodes;if(!Ay.length){BI[BI.length]=Q;}}break;case"enabled":for(var A0=0;(Q=BC[A0]);A0++){if(!Q.disabled){BI[BI.length]=Q;}}break;case"disabled":for(var O=0;(Q=BC[O]);O++){if(Q.disabled){BI[BI.length]=Q;}}break;case"checked":for(var AZ=0;(Q=BC[AZ]);AZ++){if(Q.checked){BI[BI.length]=Q;}}break;case"contains":for(var Aw=0;(Q=BC[Aw]);Aw++){if(!Q.added){if(Q.innerText.indexOf(BO)!==-1){Q.added=true;BI[BI.length]=Q;}}}break;default:for(var M=0;(Q=BC[M]);M++){if(Q.getAttribute(h,2)===BO){BI[BI.length]=Q;}}break;}}BS(BI);}Ar=BI;}}A7=D(A7,Ar);}return A7;};}if(document.querySelectorAll){var E=DOMAssistant.cssSelection;DOMAssistant.cssSelection=function(G){try{var I=new A();return D(I,this.querySelectorAll(G));}catch(H){return E.call(this,G);}};}return DOMAssistant.cssSelection.call(this,F);},cssSelect:function(E){return DOMAssistant.cssSelection.call(this,E);},elmsByClass:function(G,E){var F=(E?E:"")+"."+G;return DOMAssistant.cssSelection.call(this,F);},elmsByAttribute:function(F,G,E,I){var H=(E?E:"")+"["+F+((G&&G!=="*")?((I?I:"")+"="+G+"]"):"]");return DOMAssistant.cssSelection.call(this,H);},elmsByTag:function(E){return DOMAssistant.cssSelection.call(this,E);}};}();DOMAssistant.initCore();DOMAssistant.AJAX=function(){var E=null;var A=0;var C=-1;var D="";var B=function(G,J,I,F){var H=null;if(/POST/i.test(J)){G=G.split("?");H=G[1];G=G[0];}return{url:G,method:J,callback:I,params:H,headers:{},responseType:"text",addToContent:F||false};};return{publicMethods:["ajax","get","post","load","replaceWithAJAXContent"],initRequest:function(){var G=null;if(typeof XMLHttpRequest!=="undefined"){G=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return new XMLHttpRequest();};}else{if(typeof window.ActiveXObject!=="undefined"){var F=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var H=0;H<F.length;H++){try{G=new window.ActiveXObject(F[H]);DOMAssistant.AJAX.initRequest=function(){return new window.ActiveXObject(F[H]);};break;}catch(I){G=null;}}}}return G;},ajax:function(F){if(F.url&&/\?/.test(F.url)&&F.method&&/POST/i.test(F.method)){var G=F.url.split("?");F.url=G[0];F.params=G[1]+((G[1].length>0&&F.params)?("&"+F.params):"");}return DOMAssistant.AJAX.makeCall.call(this,F);},get:function(H,I,G){var F=B(H,"GET",I,G);return DOMAssistant.AJAX.makeCall.call(this,F);},post:function(G,H){var F=B(G,"POST",H);return DOMAssistant.AJAX.makeCall.call(this,F);},load:function(G,F){DOMAssistant.AJAX.get.call(this,G,DOMAssistant.AJAX.replaceWithAJAXContent,F);},makeCall:function(F){var G=DOMAssistant.AJAX.initRequest();if(G){E=G;var H=function(Q){var K=F.url;var I=F.method||"GET";var R=F.callback;var M=F.params;var L=F.headers;var P=F.responseType||"text";var N=F.addToContent;G.open(I,K,true);G.setRequestHeader("AJAX","true");G.setRequestHeader("X-Requested-With","XMLHttpRequest");if(I==="POST"){var J=M?M.length:0;G.setRequestHeader("Content-type","application/x-www-form-urlencoded");G.setRequestHeader("Content-length",J);if(G.overrideMimeType){G.setRequestHeader("Connection","close");}}for(var O in L){if(typeof O==="string"){G.setRequestHeader(O,L[O]);}}if(typeof R==="function"){G.onreadystatechange=function(){if(G.readyState===4){var S=(/xml/i.test(P))?G.responseXML:G.responseText;R.call(Q,S,N);A=4;C=G.status;D=G.statusText;E=null;G=null;}};}G.send(M);}(this);}return this;},replaceWithAJAXContent:function(K,L){if(L){this.innerHTML+=K;}else{var J=this.elmsByTag("*");for(var I=0,M,F;(M=J[I]);I++){F=M.attributes;if(F){for(var G=0,H=F.length;G<H;G++){if(typeof M[F[G].name]==="function"){M[F[G].name]=null;}}}}this.innerHTML=K;}},getReadyState:function(){return(E&&typeof E.readyState!=="undefined")?E.readyState:A;},getStatus:function(){return C;},getStatusText:function(){return D;}};}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){return{addClass:function(B){var A=this.className;if(!new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i").test(A)){this.className=A+(A.length?" ":"")+B;}return this;},removeClass:function(B){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(C){var D="";if(new RegExp("^\\s+.*\\s+$").test(C)){D=C.replace(/(\s+).+/,"$1");}return D;}).replace(/^\s+|\s+$/g,"");return this;},replaceClass:function(B,C){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(D,G,F){var E=G+C+F;if(new RegExp("^\\s+.*\\s+$").test(D)){E=D.replace(/(\s+).+/,"$1");}return E;}).replace(/^\s+|\s+$/g,"");return this;},hasClass:function(A){return new RegExp(("(^|\\s)"+A+"(\\s|$)"),"i").test(this.className);},setStyle:function(C,D){if(typeof this.style.cssText!=="undefined"){var A=this.style.cssText;if(typeof C==="object"){for(var B in C){if(typeof B==="string"){A+=";"+B+":"+C[B];}}}else{A+=";"+C+":"+D;}this.style.cssText=A;}return this;},getStyle:function(B){var A="";if(document.defaultView&&document.defaultView.getComputedStyle){A=document.defaultView.getComputedStyle(this,"").getPropertyValue(B);}else{if(this.currentStyle){A=B.replace(/\-(\w)/g,function(C,D){return D.toUpperCase();});A=this.currentStyle[A];}}return A;}};}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){return{prev:function(){var A=this;while((A=A.previousSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},next:function(){var A=this;while((A=A.nextSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},create:function(C,B,A,D){var E=DOMAssistant.$(document.createElement(C));if(B){E.setAttributes(B);}if(typeof D!=="undefined"){E.addContent(D);}if(A){DOMAssistant.Content.addContent.call(this,E);}return E;},setAttributes:function(A){for(var B in A){if(/class/i.test(B)){this.className=A[B];}else{this.setAttribute(B,A[B]);}}return this;},addContent:function(A){if(typeof A==="string"){this.innerHTML+=A;}else{if(typeof A==="object"&&A){this.appendChild(A);}}return this;},replaceContent:function(B){for(var E=(this.childNodes.length-1),F,A;E>=0;E--){F=this.childNodes[E];A=F.attributes;if(A){for(var C=0,D=A.length;C<D;C++){if(typeof F[A[C].name]==="function"){F[A[C].name]=null;}}}F.parentNode.removeChild(F);}DOMAssistant.$(this).addContent(B);return this;},remove:function(){this.parentNode.removeChild(this);return null;}};}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var A=1;return{publicMethods:["addEvent","removeEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;},addEvent:function(C,E){var B=(/^DOM/.test(C));if(B){if(this.addEventListener){this.addEventListener(C,E,false);}}else{if(!this.uniqueHandlerId){this.uniqueHandlerId=A++;}var F=false;if(E.attachedElements&&E.attachedElements[C+this.uniqueHandlerId]){F=true;}if(!F){if(!this.events){this.events={};}if(!this.events[C]){this.events[C]=[];var D=this["on"+C];if(D){this.events[C].push(D);}}this.events[C].push(E);this["on"+C]=DOMAssistant.Events.handleEvent;if(typeof this.window==="object"){this.window["on"+C]=DOMAssistant.Events.handleEvent;}if(!E.attachedElements){E.attachedElements={};}E.attachedElements[C+this.uniqueHandlerId]=true;}}return this;},handleEvent:function(B){var H=B||event;var I=H.target||H.srcElement||document;while(I.nodeType!==1&&I.parentNode){I=I.parentNode;}H.eventTarget=I;var F=H.type;var C=this.events[F];var G=C.length;var E;for(var D=0;D<G;D++){E=C[D].call(this,H);if(D===(G-1)){return E;}}},removeEvent:function(B,E){if(this.events){var C=this.events[B];for(var D=0;D<C.length;D++){if(C[D]===E){delete C[D];C.splice(D,1);}}E.attachedElements[B+this.uniqueHandlerId]=null;}return this;},preventDefault:function(B){if(B&&B.preventDefault){DOMAssistant.Events.preventDefault=function(C){C.preventDefault();};}else{DOMAssistant.Events.preventDefault=function(C){event.returnValue=false;};}return DOMAssistant.Events.preventDefault(B);},cancelBubble:function(B){if(B&&B.stopPropagation){DOMAssistant.Events.cancelBubble=function(C){C.stopPropagation();};}else{DOMAssistant.Events.cancelBubble=function(C){event.cancelBubble=true;};}return DOMAssistant.Events.cancelBubble(B);}};}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var DOMLoaded=false;var DOMLoadTimer=null;var functionsToCall=[];var addedStrings={};var errorHandling=null;var execFunctions=function(){for(var i=0,il=functionsToCall.length;i<il;i++){try{functionsToCall[i]();}catch(e){if(errorHandling&&typeof errorHandling==="function"){errorHandling(e);}}}functionsToCall=[];};var DOMHasLoaded=function(){if(DOMLoaded){return ;}DOMLoaded=true;execFunctions();};
/*@cc_on
	@if (@_win32 || @_win64)
		if (document.getElementById) {
			document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");
			document.getElementById("ieScriptLoad").onreadystatechange = function() {
				if (this.readyState === "complete") {
					DOMHasLoaded();
				}
			};
		}
	@end @*/
if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMHasLoaded,false);}if(/KHTML|WebKit|iCab/i.test(navigator.userAgent)){DOMLoadTimer=setInterval(function(){if(/loaded|complete/i.test(document.readyState)){DOMHasLoaded();clearInterval(DOMLoadTimer);}},10);}window.onload=DOMHasLoaded;return{DOMReady:function(){for(var i=0,il=arguments.length,funcRef;i<il;i++){funcRef=arguments[i];if(!funcRef.DOMReady&&!addedStrings[funcRef]){if(typeof funcRef==="string"){addedStrings[funcRef]=true;funcRef=new Function(funcRef);}funcRef.DOMReady=true;functionsToCall.push(funcRef);}}if(DOMLoaded){execFunctions();}},setErrorHandling:function(funcRef){errorHandling=funcRef;}};}();DOMAssistant.DOMReady=DOMAssistant.DOMLoad.DOMReady;