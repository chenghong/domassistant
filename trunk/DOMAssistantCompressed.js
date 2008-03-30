// Developed by Robert Nyman/DOMAssistant team, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.domassistant.com/documentation, version 2.7
var DOMAssistant=function(){var A=function(){};var B=/*@cc_on!@*/false;function C(I,H){if(B){if(H.slice){return I.concat(H);}for(var G=0,D=H.length;G<D;G++){I[I.length]=H[G];}}else{for(var F=0,E=H.length;F<E;F++){I.push(H[F]);}}return I;}return{allMethods:[],publicMethods:["cssSelect","elmsByClass","elmsByAttribute","elmsByTag"],initCore:function(){this.applyMethod.call(window,"$",this.$);this.applyMethod.call(window,"$$",this.$$);window.DOMAssistant=this;if(B){A=Array;}A.prototype=[];A.prototype.each=function(F){for(var E=0,D=this.length;E<D;E++){F.call(this[E]);}return this;};A.prototype.first=function(){return(typeof this[0]!=="undefined")?DOMAssistant.addMethodsToElm(this[0]):null;};A.prototype.end=function(){return this.previousSet;};this.attach(this);},addMethods:function(D,E){if(typeof this.allMethods[D]==="undefined"){this.allMethods[D]=E;this.addHTMLArrayPrototype(D,E);}},addMethodsToElm:function(E){for(var D in this.allMethods){if(typeof this.allMethods[D]!=="undefined"){this.applyMethod.call(E,D,this.allMethods[D]);}}return E;},applyMethod:function(E,D){if(typeof this[E]!=="function"){this[E]=D;}},attach:function(F){var D=F.publicMethods;if(typeof D==="undefined"){for(var H in F){if(H!=="init"&&typeof F[H]!=="undefined"){this.addMethods(H,F[H]);}}}else{if(D.constructor===Array){for(var E=0,G;(G=D[E]);E++){this.addMethods(G,F[G]);}}}if(typeof F.init==="function"){F.init();}},addHTMLArrayPrototype:function(D,E){A.prototype[D]=function(){var H=new A();H.previousSet=this;var I;for(var G=0,F=this.length;G<F;G++){I=E.apply(this[G],arguments);if(typeof I!=="undefined"&&I!==null&&I.constructor===Array){H=C(H,I);}else{H.push(I);}}return H;};},getSequence:function(I){var J,H=2,E=-1,D=-1;var G=/^((odd|even)|([1-9]\d*)|((([1-9]\d*)?)n((\+|\-)(\d+))?)|(\-(([1-9]\d*)?)n\+(\d+)))$/;var F=G.exec(I);if(!F){return null;}else{if(F[2]){J=(F[2]==="odd")?1:2;D=(J===1)?1:0;}else{if(F[3]){J=parseInt(F[3],10);H=0;E=J;}else{if(F[4]){H=F[6]?parseInt(F[6],10):1;J=F[7]?parseInt(F[8]+F[9],10):0;while(J<1){J+=H;}D=(J>H)?(J-H)%H:((J===H)?0:J);}else{if(F[10]){H=F[12]?parseInt(F[12],10):1;J=E=parseInt(F[13],10);while((J-H)>0){J-=H;}D=(E>H)?(E-H)%H:((E===H)?0:E);}}}}}return{start:J,add:H,max:E,modVal:D};},$:function(){var F=new A();if(document.getElementById){var D=arguments[0];if(typeof D==="string"){D=D.replace(/^[^#]*(#)/,"$1");if(/^#[\w\u00C0-\uFFFF\-\_]+$/.test(D)){var E=DOMAssistant.$$(D.substr(1),false);if(E){F.push(E);}}else{F=DOMAssistant.cssSelection.call(document,D);}}else{if(typeof D==="object"){F=(arguments.length===1)?DOMAssistant.$$(D):C(F,arguments);}}}return F;},$$:function(I,F){var H=(typeof I==="object")?I:document.getElementById(I);var G=F||true;if(typeof I==="string"&&H&&H.id!==I){H=null;for(var D=0,E;(E=document.all[D]);D++){if(E.id===I){H=E;break;}}}if(H&&G){DOMAssistant.addMethodsToElm(H);}return H;},cssSelection:function(E){if(document.evaluate){DOMAssistant.cssSelection=function(Z){var O=Z.replace(/\s*(,)\s*/g,"$1").split(",");var N=new A();var c,I,e,X,L,M;var G=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?(>|\+|~)?/;var d=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");for(var a=0;(c=O[a]);a++){if(a>0){I=false;for(var S=0,T=a;S<T;S++){if(O[a]===O[S]){I=true;break;}}if(I){continue;}}e=c.match(d);X=".";for(var Y=0,b=e.length;Y<b;Y++){L=G.exec(e[Y]);M={tag:(!L[1]||L[3]==="*")?"*":L[1],id:(L[3]!=="*")?L[2]:null,allClasses:L[4],allAttr:L[6],allPseudos:L[10],tagRelation:L[21]};if(M.tagRelation){switch(M.tagRelation){case">":X+="/child::";break;case"+":X+="/following-sibling::*[1]/self::";break;case"~":X+="/following-sibling::";break;}}else{X+=(Y>0&&/(>|\+|~)/.test(e[Y-1]))?M.tag:("/descendant::"+M.tag);}if(M.id){X+="[@id = '"+M.id.replace(/^#/,"")+"']";}if(M.allClasses){X+=M.allClasses.replace(/\.([\w\u00C0-\uFFFF\-_]+)/g,"[contains(concat(' ', @class, ' '), ' $1 ')]");}if(M.allAttr){X+=M.allAttr.replace(/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/g,function(g,k,j,i){var h=g;switch(j){case"^":h="starts-with(@"+k+", '"+i+"')";break;case"$":h="substring(@"+k+", (string-length(@"+k+") - "+(i.length-1)+"), "+i.length+") = '"+i+"'";break;case"*":h="contains(concat(' ', @"+k+", ' '), '"+i+"')";break;case"|":h="(@"+k+"='"+i+"' or starts-with(@"+k+", '"+i+"-'))";break;case"~":h="(@"+k+"='"+i+"' or starts-with(@"+k+", '"+i+" ') or substring(@"+k+", (string-length(@"+k+") - "+(i.length-1)+"), "+i.length+") = ' "+i+"' or contains(concat(' ', @"+k+", ' '), ' "+i+" '))";break;default:h="@"+k+(i?"='"+i+"'":"");}return h;});}if(M.allPseudos){var P=/:(\w[\w\-]*)(\(([^\)]+)\))?/;M.allPseudos=M.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var R=0,U=M.allPseudos.length;R<U;R++){var K=M.allPseudos[R].match(P);var f=K[1]?K[1].toLowerCase():null;var J=K[3]?K[3]:null;switch(f){case"first-child":X+="[count(preceding-sibling::*) = 0]";break;case"first-of-type":X+="[count(preceding-sibling::"+M.tag+") = 0]";break;case"last-child":X+="[count(following-sibling::*) = 0]";break;case"last-of-type":X+="[count(following-sibling::"+M.tag+") = 0]";break;case"only-child":X+="[count(preceding-sibling::*) = 0 and count(following-sibling::*) = 0]";break;case"only-of-type":X+="[count(preceding-sibling::"+M.tag+") = 0 and count(following-sibling::"+M.tag+") = 0]";break;case"nth-of-type":X+="["+J+"]";break;case"empty":X+="[count(child::*) = 0 and string-length(text()) = 0]";break;case"contains":X+="[contains(., '"+J+"')]";break;case"enabled":X+="[not(@disabled)]";break;case"disabled":X+="[@disabled]";break;case"checked":X+="[@checked='checked']";break;case"nth-child":var F="";if(!/^n$/.test(J)){var Q=DOMAssistant.getSequence(J);if(Q){F="[";if(Q.start===Q.max){F+="position() = "+Q.start;}else{F+="(count(./preceding-sibling::*) + 1) mod "+Q.add+" = "+Q.modVal;F+=(Q.start>1)?" and position() >= "+Q.start:"";F+=(Q.max>0)?" and position() <= "+Q.max:"";}F+="]";}}X+=F;break;case"not":J=J.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var H=J.replace(/^(\w+)/,"self::$1");H=H.replace(/^\.([\w\u00C0-\uFFFF\-_]+)/g,"contains(concat(' ', @class, ' '), ' $1 ')");H=H.replace(/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/g,function(g,k,j,i){var h=g;switch(j){case"^":h="starts-with(@"+k+", '"+i+"')";break;case"$":h="substring(@"+k+", (string-length(@"+k+") - "+(i.length-1)+"), "+i.length+") = '"+i+"'";break;case"*":h="contains(concat(' ', @"+k+", ' '), '"+i+"')";break;case"|":h="(@"+k+"='"+i+"' or starts-with(@"+k+", '"+i+"-'))";break;case"~":h="(@"+k+"='"+i+"' or starts-with(@"+k+", '"+i+" ') or substring(@"+k+", (string-length(@"+k+") - "+(i.length-1)+"), "+i.length+") = ' "+i+"' or contains(concat(' ', @"+k+", ' '), ' "+i+" '))";break;default:h="@"+k+(i?"='"+i+"'":"");}return h;});X+="[not("+H+")]";break;default:X+="[@"+f+"='"+J+"']";break;}}}}var W=document.evaluate(X,this,null,0,null),V;while((V=W.iterateNext())){N.push(V);}}return N;};}else{DOMAssistant.cssSelection=function(F){var BL=F.replace(/\s*(,)\s*/g,"$1").split(",");var A7=new A();var Aq=new A();var BI=new A();var BV=new A();var BZ,c,AT,U,AG,Av,BJ,I,AR,Aa,Q,h,As,A6,Z,W,Ay,Ak;var BG=/^(>|\+|~)$/;var f=/^(\w+)?(#[\w\u00C0-\uFFFF\-\_]+|(\*))?((\.[\w\u00C0-\uFFFF\-_]+)*)?((\[\w+(\^|\$|\*|\||~)?(=[\w\u00C0-\uFFFF\s\-\_\.]+)?\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\-?\d*n?((\+|\-)\d+)?|[\w\u00C0-\uFFFF\-_]+|((\w*\.[\w\u00C0-\uFFFF\-_]+)*)?|(\[#?\w+(\^|\$|\*|\||~)?=?[\w\u00C0-\uFFFF\s\-\_\.]+\]+))\))?)*)?/;var AM;try{AM=new RegExp("(?:\\[[^\\[]*\\]|\\(.*\\)|[^\\s\\+>~\\[\\(])+|[\\+>~]","g");}catch(Ad){AM=/[^\s]+/g;}function BT(e){e=e?e:Aq;for(var b=0,a=e.length;b<a;b++){e[b].added=false;}}function T(){for(var b=0,a=BZ.length;b<a;b++){BZ[b].childElms=null;}}function V(b,a){if(B){switch(a){case"id":return b.id;case"for":return b.htmlFor;case"class":return b.className;}}return b.getAttribute(a,2);}for(var Ag=0;(c=BL[Ag]);Ag++){if(Ag>0){AT=false;for(var Af=0,Al=Ag;Af<Al;Af++){if(BL[Ag]===BL[Af]){AT=true;break;}}if(AT){continue;}}U=c.match(AM);Aq=[];Aq.push(this);for(var Ab=0,Y;(Y=U[Ab]);Ab++){var Ai=false;BI=BV=[];if(Ab>0&&BG.test(Y)){AG=BG.exec(Y);if(AG){Ai=true;BJ=U[Ab+1];Av=/^\w+/.exec(BJ);if(Av){I=new RegExp("(^|\\s)"+Av+"(\\s|$)","i");}switch(AG[0]){case">":for(var AZ=0,X=Aq.length,BE;AZ<X;AZ++){BE=Aq[AZ].childNodes;for(var AX=0,A3;(A3=BE[AX]);AX++){if(!Av||I.test(A3.nodeName)){BV.push(A3);}}}break;case"+":for(var AW=0;(AR=Aq[AW]);AW++){while((AR=AR.nextSibling)&&AR.nodeType!==1){}if(AR){if(!Av||I.test(AR.nodeName)){BV.push(AR);}}}break;case"~":for(var AS=0;(AR=Aq[AS]);AS++){while((AR=AR.nextSibling)&&!AR.added){if(!Av||I.test(AR.nodeName)){AR.added=true;BV.push(AR);}}}break;}Aq=BI=BV;BT();Y=U[++Ab];Aq.skipTag=true;}}var Au=f.exec(Y);var BF={tag:(!Au[1]||Au[3]==="*")?"*":Au[1],id:(Au[3]!=="*")?Au[2]:null,allClasses:Au[4],allAttr:Au[6],allPseudos:Au[10]};if(BF.id){var An=document.getElementById(BF.id.replace(/#/,""));if(An){if(Ai){for(var A8=0,R=BV.length;A8<R;A8++){if(BV[A8]===An){BI.push(An);break;}}}else{BI.push(An);}}Aq=BI;}else{if(BF.tag&&!Aq.skipTag){if(!BI.length&&Aq.length===1){BI=C(BI,Aq[0].getElementsByTagName(BF.tag));}else{for(var AQ=0,Ao=Aq.length,A5,Az;AQ<Ao;AQ++){A5=Aq[AQ].getElementsByTagName(BF.tag);for(var AP=0;(Az=A5[AP]);AP++){if(!Az.added){Az.added=true;BI.push(Az);}}}}Aq=BI;BT();}}Aq.skipTag=false;if(BF.allClasses){BF.allClasses=BF.allClasses.replace(/^\./,"").split(".");var BY=[];for(var N=0,A2=BF.allClasses.length;N<A2;N++){BY.push(new RegExp("(^|\\s)"+BF.allClasses[N]+"(\\s|$)"));}var AU=[];for(var AO=0,A1;(Aa=Aq[AO]);AO++){A1=Aa.className;if(A1&&!Aa.added){As=false;for(var AN=0,P=BY.length;AN<P;AN++){As=BY[AN].test(A1);if(!As){break;}}if(As){Aa.added=true;AU.push(Aa);}}}BT();BI=AU;Aq=BI;}if(BF.allAttr){BF.allAttr=BF.allAttr.match(/\[[^\]]+\]/g);var A9=[];var H=/(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?/;for(var BB=0,At=BF.allAttr.length,AL,L,BS,Ar;BB<At;BB++){AL=H.exec(BF.allAttr[BB]);L=AL[3]?AL[3].replace(/\./g,"\\."):null;BS=L?"^"+L+"$":null;Ar=AL[2]||null;if(typeof Ar==="string"){switch(Ar){case"^":BS=("^"+L);break;case"$":BS=(L+"$");break;case"*":BS=(L);break;case"|":BS=("(^"+L+"(\\-\\w+)*$)");break;case"~":BS=("\\b"+L+"\\b");break;}}A9.push([(BS?new RegExp(BS):null),AL[1]]);}var AV=[];for(var AK=0,Ae;(Aa=BI[AK]);AK++){if(!Aa.added){for(var AJ=0,BD=A9.length,A4;AJ<BD;AJ++){As=false;A4=A9[AJ][0];Ae=V(Aa,A9[AJ][1]);if(typeof Ae==="string"&&Ae.length){if(!A4||typeof A4==="undefined"||(A4&&A4.test(Ae))){As=true;}}if(!As){break;}}if(As){Aa.added=true;AV.push(Aa);}}}BT();BI=AV;Aq=BI;}if(BF.allPseudos){var d=/:(\w[\w\-]*)(\(([^\)]+)\))?/;BF.allPseudos=BF.allPseudos.match(/(:\w+[\w\-]*)(\([^\)]+\))?/g);for(var AC=0,BX=BF.allPseudos.length;AC<BX;AC++){var BW=BF.allPseudos[AC].match(d);var x=BW[1]?BW[1].toLowerCase():null;var BO=BW[3]?BW[3]:null;var BC=BI;BI=[];BZ=[];if(x==="not"){BO=BO.replace(/^\[#([\w\u00C0-\uFFFF\-\_]+)\]$/,"[id=$1]");var AA=/^(\w+)/.exec(BO);var Am=/^\.([\w\u00C0-\uFFFF\-_]+)/.exec(BO);var Ah=/\[(\w+)(\^|\$|\*|\||~)?=?([\w\u00C0-\uFFFF\s\-_\.]+)?\]/.exec(BO);var BP=new RegExp("(^|\\s)"+(AA?AA[1]:Am?Am[1]:"")+"(\\s|$)","i");if(Ah){var BN=Ah[3]?Ah[3].replace(/\./g,"\\."):null;var BH="^"+BN+"$";var g=Ah[2];if(typeof g==="string"){switch(g){case"^":BH=("^"+BN);break;case"$":BH=(BN+"$");break;case"*":BH=(BN);break;case"|":BH=("(^"+BN+"(\\-\\w+)*$)");break;case"~":BH=("\\b"+BN+"\\b");break;}}BP=new RegExp(BH,"i");}for(var AI=0,G;(G=BC[AI]);AI++){As=null;if(AA&&!BP.test(G.nodeName)){As=G;}else{if(Am&&!BP.test(G.className)){As=G;}else{if(Ah){var Aj=V(G,Ah[1]);if(!Aj||!BP.test(Aj)){As=G;}}}}if(As&&!As.added){As.added=true;BI.push(As);}}}else{switch(x){case"first-child":for(var AH=0;(Q=BC[AH]);AH++){A6=Q.parentNode.firstChild;while(A6.nodeType!==1&&(A6=A6.nextSibling)){}if(A6===Q){BI.push(Q);}}break;case"last-child":for(var AF=0;(Q=BC[AF]);AF++){Z=Q.parentNode.lastChild;while(Z.nodeType!==1&&(Z=Z.previousSibling)){}if(Z===Q){BI.push(Q);}}break;case"only-child":for(var AE=0,S;(Q=BC[AE]);AE++){h=Q.parentNode;if(h!==S){A6=h.firstChild;Z=h.lastChild;while(A6.nodeType!==1&&(A6=A6.nextSibling)){}while(Z.nodeType!==1&&(Z=Z.previousSibling)){}if(A6===Q&&Z===Q){BI.push(Q);}S=h;}}break;case"nth-child":if(/^n$/.test(BO)){BI=C(BI,BC);}else{var BK=DOMAssistant.getSequence(BO);if(BK){for(var AB=0;(Q=BC[AB]);AB++){h=Q.parentNode;if(!h.childElms){var BR=BK.start,Ap=0;var K=h.firstChild;while(K&&(BK.max<0||BR<=BK.max)){if(K.nodeType===1){if(++Ap===BR){if(!K.added&&K.nodeName===Q.nodeName){K.added=true;BI.push(K);}BR+=BK.add;}}K=K.nextSibling;}h.childElms=true;BZ.push(h);}}BT();T();}}break;case"first-of-type":for(var BA=0;(Q=BC[BA]);BA++){A6=Q.parentNode.getElementsByTagName(Q.nodeName)[0];if(A6===Q){BI.push(Q);}}break;case"last-of-type":for(var Ax=0;(Q=BC[Ax]);Ax++){Z=Q.parentNode.lastChild;while(Z.nodeName!=Q.nodeName){Z=Z.previousSibling;}if(Z===Q){BI.push(Q);}}break;case"only-of-type":for(var Ac=0;(Q=BC[Ac]);Ac++){W=Q.parentNode.getElementsByTagName(Q.nodeName);if(W.length===1){BI.push(Q);}}break;case"nth-of-type":var BM=parseInt(BO,10);for(var AD=0;(Q=BC[AD]);AD++){Ak=[];W=Q.parentNode.childNodes;if(W.length>=BM){for(var BQ=0,J;(BQ!==BM&&(J=W[BQ]));BQ++){if(J.nodeName===Q.nodeName){Ak.push(J);}}Aa=Ak[Ak.length-1];if(Aa&&Aa===Q){BI.push(Q);}}}break;case"empty":for(var BU=0;(Q=BC[BU]);BU++){Ay=Q.parentNode.childNodes;if(!Ay.length){BI.push(Q);}}break;case"enabled":for(var A0=0;(Q=BC[A0]);A0++){if(!Q.disabled){BI.push(Q);}}break;case"disabled":for(var O=0;(Q=BC[O]);O++){if(Q.disabled){BI.push(Q);}}break;case"checked":for(var AY=0;(Q=BC[AY]);AY++){if(Q.checked){BI.push(Q);}}break;case"contains":for(var Aw=0;(Q=BC[Aw]);Aw++){if(!Q.added){if(Q.innerText.indexOf(BO)!==-1){Q.added=true;BI.push(Q);}}}break;default:for(var M=0;(Q=BC[M]);M++){if(Q.getAttribute(x,2)===BO){BI.push(Q);}}break;}}BT(BI);}Aq=BI;}}A7=C(A7,Aq);}return A7;};}if(document.querySelectorAll){var D=DOMAssistant.cssSelection;DOMAssistant.cssSelection=function(F){try{var H=new A();return C(H,this.querySelectorAll(F));}catch(G){return D.call(this,F);}};}return DOMAssistant.cssSelection.call(this,E);},cssSelect:function(D){return DOMAssistant.cssSelection.call(this,D);},elmsByClass:function(F,D){var E=(D?D:"")+"."+F;return DOMAssistant.cssSelection.call(this,E);},elmsByAttribute:function(E,F,D,H){var G=(D?D:"")+"["+E+((F&&F!=="*")?((H?H:"")+"="+F+"]"):"]");return DOMAssistant.cssSelection.call(this,G);},elmsByTag:function(D){return DOMAssistant.cssSelection.call(this,D);}};}();DOMAssistant.initCore();DOMAssistant.AJAX=function(){var E=null;var A=0;var C=-1;var D="";var B=function(G,J,I,F){var H=null;if(/POST/i.test(J)){G=G.split("?");H=G[1];G=G[0];}return{url:G,method:J,callback:I,params:H,headers:{},responseType:"text",addToContent:F||false};};return{publicMethods:["ajax","get","post","load","replaceWithAJAXContent"],initRequest:function(){var G=null;if(typeof XMLHttpRequest!=="undefined"){G=new XMLHttpRequest();DOMAssistant.AJAX.initRequest=function(){return new XMLHttpRequest();};}else{if(typeof window.ActiveXObject!=="undefined"){var F=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];for(var H=0;H<F.length;H++){try{G=new window.ActiveXObject(F[H]);DOMAssistant.AJAX.initRequest=function(){return new window.ActiveXObject(F[H]);};break;}catch(I){G=null;}}}}return G;},ajax:function(F){if(F.url&&/\?/.test(F.url)&&F.method&&/POST/i.test(F.method)){var G=F.url.split("?");F.url=G[0];F.params=G[1]+((G[1].length>0&&F.params)?("&"+F.params):"");}return DOMAssistant.AJAX.makeCall.call(this,F);},get:function(H,I,G){var F=B(H,"GET",I,G);return DOMAssistant.AJAX.makeCall.call(this,F);},post:function(G,H){var F=B(G,"POST",H);return DOMAssistant.AJAX.makeCall.call(this,F);},load:function(G,F){DOMAssistant.AJAX.get.call(this,G,DOMAssistant.AJAX.replaceWithAJAXContent,F);},makeCall:function(F){var G=DOMAssistant.AJAX.initRequest();if(G){E=G;var H=function(Q){var K=F.url;var I=F.method||"GET";var R=F.callback;var M=F.params;var L=F.headers;var P=F.responseType||"text";var N=F.addToContent;G.open(I,K,true);G.setRequestHeader("AJAX","true");G.setRequestHeader("X-Requested-With","XMLHttpRequest");if(I==="POST"){var J=M?M.length:0;G.setRequestHeader("Content-type","application/x-www-form-urlencoded");G.setRequestHeader("Content-length",J);if(G.overrideMimeType){G.setRequestHeader("Connection","close");}}for(var O in L){if(typeof O==="string"){G.setRequestHeader(O,L[O]);}}if(typeof R==="function"){G.onreadystatechange=function(){if(G.readyState===4){var S=(/xml/i.test(P))?G.responseXML:G.responseText;R.call(Q,S,N);A=4;C=G.status;D=G.statusText;E=null;G=null;}};}G.send(M);}(this);}return this;},replaceWithAJAXContent:function(K,L){if(L){this.innerHTML+=K;}else{var J=this.elmsByTag("*");for(var I=0,M,F;(M=J[I]);I++){F=M.attributes;if(F){for(var G=0,H=F.length;G<H;G++){if(typeof M[F[G].name]==="function"){M[F[G].name]=null;}}}}this.innerHTML=K;}},getReadyState:function(){return(E&&typeof E.readyState!=="undefined")?E.readyState:A;},getStatus:function(){return C;},getStatusText:function(){return D;}};}();DOMAssistant.attach(DOMAssistant.AJAX);DOMAssistant.CSS=function(){return{addClass:function(B){var A=this.className;if(!new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i").test(A)){this.className=A+(A.length?" ":"")+B;}return this;},removeClass:function(B){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(C){var D="";if(new RegExp("^\\s+.*\\s+$").test(C)){D=C.replace(/(\s+).+/,"$1");}return D;}).replace(/^\s+|\s+$/g,"");return this;},replaceClass:function(B,C){var A=new RegExp(("(^|\\s)"+B+"(\\s|$)"),"i");this.className=this.className.replace(A,function(D,G,F){var E=G+C+F;if(new RegExp("^\\s+.*\\s+$").test(D)){E=D.replace(/(\s+).+/,"$1");}return E;}).replace(/^\s+|\s+$/g,"");return this;},hasClass:function(A){return new RegExp(("(^|\\s)"+A+"(\\s|$)"),"i").test(this.className);},setStyle:function(C,D){if(typeof this.style.cssText!=="undefined"){var A=this.style.cssText;if(typeof C==="object"){for(var B in C){if(typeof B==="string"){A+=";"+B+":"+C[B];}}}else{A+=";"+C+":"+D;}this.style.cssText=A;}return this;},getStyle:function(B){var A="";if(document.defaultView&&document.defaultView.getComputedStyle){A=document.defaultView.getComputedStyle(this,"").getPropertyValue(B);}else{if(this.currentStyle){A=B.replace(/\-(\w)/g,function(C,D){return D.toUpperCase();});A=this.currentStyle[A];}}return A;}};}();DOMAssistant.attach(DOMAssistant.CSS);DOMAssistant.Content=function(){return{prev:function(){var A=this;while((A=A.previousSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},next:function(){var A=this;while((A=A.nextSibling)&&A.nodeType!==1){}return DOMAssistant.$(A);},create:function(C,B,A,D){var E=DOMAssistant.$(document.createElement(C));if(B){E.setAttributes(B);}if(typeof D!=="undefined"){E.addContent(D);}if(A){DOMAssistant.Content.addContent.call(this,E);}return E;},setAttributes:function(A){for(var B in A){if(/class/i.test(B)){this.className=A[B];}else{this.setAttribute(B,A[B]);}}return this;},addContent:function(A){if(typeof A==="string"){this.innerHTML+=A;}else{if(typeof A==="object"&&A){this.appendChild(A);}}return this;},replaceContent:function(B){for(var E=(this.childNodes.length-1),F,A;E>=0;E--){F=this.childNodes[E];A=F.attributes;if(A){for(var C=0,D=A.length;C<D;C++){if(typeof F[A[C].name]==="function"){F[A[C].name]=null;}}}F.parentNode.removeChild(F);}DOMAssistant.$(this).addContent(B);return this;},remove:function(){this.parentNode.removeChild(this);return null;}};}();DOMAssistant.attach(DOMAssistant.Content);DOMAssistant.Events=function(){var A=1;return{publicMethods:["addEvent","removeEvent","preventDefault","cancelBubble"],init:function(){window.addEvent=this.addEvent;window.removeEvent=this.removeEvent;DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;},addEvent:function(C,E){var B=(/^DOM/.test(C));if(B){if(this.addEventListener){this.addEventListener(C,E,false);}}else{if(!this.uniqueHandlerId){this.uniqueHandlerId=A++;}var F=false;if(E.attachedElements&&E.attachedElements[C+this.uniqueHandlerId]){F=true;}if(!F){if(!this.events){this.events={};}if(!this.events[C]){this.events[C]=[];var D=this["on"+C];if(D){this.events[C].push(D);}}this.events[C].push(E);this["on"+C]=DOMAssistant.Events.handleEvent;if(typeof this.window==="object"){this.window["on"+C]=DOMAssistant.Events.handleEvent;}if(!E.attachedElements){E.attachedElements={};}E.attachedElements[C+this.uniqueHandlerId]=true;}}return this;},handleEvent:function(B){var H=B||event;var I=H.target||H.srcElement||document;while(I.nodeType!==1&&I.parentNode){I=I.parentNode;}H.eventTarget=I;var F=H.type;var C=this.events[F];var G=C.length;var E;for(var D=0;D<G;D++){E=C[D].call(this,H);if(D===(G-1)){return E;}}},removeEvent:function(B,E){if(this.events){var C=this.events[B];for(var D=0;D<C.length;D++){if(C[D]===E){delete C[D];C.splice(D,1);}}E.attachedElements[B+this.uniqueHandlerId]=null;}return this;},preventDefault:function(B){if(B&&B.preventDefault){DOMAssistant.Events.preventDefault=function(C){C.preventDefault();};}else{DOMAssistant.Events.preventDefault=function(C){event.returnValue=false;};}return DOMAssistant.Events.preventDefault(B);},cancelBubble:function(B){if(B&&B.stopPropagation){DOMAssistant.Events.cancelBubble=function(C){C.stopPropagation();};}else{DOMAssistant.Events.cancelBubble=function(C){event.cancelBubble=true;};}return DOMAssistant.Events.cancelBubble(B);}};}();DOMAssistant.attach(DOMAssistant.Events);DOMAssistant.DOMLoad=function(){var DOMLoaded=false;var DOMLoadTimer=null;var functionsToCall=[];var addedStrings={};var errorHandling=null;var execFunctions=function(){for(var i=0,il=functionsToCall.length;i<il;i++){try{functionsToCall[i]();}catch(e){if(errorHandling&&typeof errorHandling==="function"){errorHandling(e);}}}functionsToCall=[];};var DOMHasLoaded=function(){if(DOMLoaded){return ;}DOMLoaded=true;execFunctions();};
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