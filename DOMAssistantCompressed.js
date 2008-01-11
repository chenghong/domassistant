// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
var DOMAssistant=function(){var B=[];var A=["elmsByClass","elmsByAttribute","elmsByTag","each","end","setPrevious"];var C=function(F){};var E={elmsByClass:function(M,F){var L=new C();L.setPrevious(this);var K;for(var J=0,G=this.length;J<G;J++){K=this.DOM.elmsByClass.call(this[J],M,F);for(var H=0,I=K.length;H<I;H++){L.push(K[H]);}}return L;},elmsByAttribute:function(M,L,O,H){var K=new C();K.setPrevious(this);var F;for(var J=0,N=this.length;J<N;J++){F=this.DOM.elmsByAttribute.call(this[J],M,L,O,H);for(var G=0,I=F.length;G<I;G++){K.push(F[G]);}}return K;},elmsByTag:function(F){var K=new C();K.setPrevious(this);var L;for(var J=0,G=this.length;J<G;J++){L=this.DOM.elmsByTag.call(this[J],F);for(var H=0,I=L.length;H<I;H++){K.push(L[H]);}}return K;},each:function(H){for(var G=0,F=this.length;G<F;G++){H.call(this[G]);}return this;},end:function(){return this.previousSet;},setPrevious:function(F){this.previousSet=F;}};var D=/Opera/i.test(navigator.userAgent);return{init:function(){this.applyMethod.call(window,"$",this.$);window.DOMAssistant=this;if(window.ActiveXObject&&document.all){C=Array;}C.prototype=[];C.prototype.DOM=this;var H;for(var G=0,F=A.length;G<F;G++){H=A[G];B.push([H,this[H]]);C.prototype[H]=E[H];}},createHTMLArray:function(){return new C();},addMethod:function(F){B.push(F);},addHTMLArrayPrototype:function(F,G){C.prototype[F]=G;},applyMethod:function(G,F){if(typeof this[G]!=="function"){this[G]=F;}},addMethods:function(K){if(K){var J=(K.constructor===Array)?K:[K];for(var I=0,F=J.length;I<F;I++){for(var G=0,H=B.length;G<H;G++){this.applyMethod.call(J[I],B[G][0],B[G][1]);}}}},$:function(){var J=null;if(document.getElementById){var F=arguments[0];if(typeof F==="string"&&/[\*>\+#\.\[\s\:]/.test(F)){J=DOMAssistant.cssSelection(F);}else{J=(arguments.length>1)?new C():null;var I;for(var G=0,H=arguments.length;G<H;G++){I=arguments[G];if(typeof I!=="object"){I=document.getElementById(I);}if(arguments.length>1){J.push(I);}else{J=I;}}}DOMAssistant.addMethods(J);}return J;},cssSelection:function(F){if(document.evaluate&&!D){DOMAssistant.cssSelection=function(V){var N=V.replace(/\s*(,)\s*/,"$1").split(",");var L=new C();var b,T,J,K,O,Y;for(var W=0,P=N.length;W<P;W++){b=N[W].split(" ");T=".";for(var U=0,X=b.length;U<X;U++){J=/^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d+n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[#?\w+(\^|\$|\*)?=?[\w\-\_]+\]+))\))?)*)?(>|\+|~)?/.exec(b[U]);K={tag:(!J[1]||J[2]==="*")?"*":J[1],id:(J[2]!=="*")?J[2]:null,allClasses:J[3],allAttr:J[5],pseudoClass:J[10],pseudoValue:J[12],tagRelation:J[19]};if(K.tagRelation){switch(K.tagRelation){case">":T+="/child::";break;case"+":T+="/following-sibling::*[1]/self::";break;case"~":T+="/following-sibling::";break;}}else{T+=(U>0&&/(>|\+|~)/.test(b[U-1]))?K.tag:("//"+K.tag);}if(K.id){T+="[@id = '"+K.id.replace(/^#/,"")+"']";}if(K.allClasses){T+=K.allClasses.replace(/\.([\w\-_]+)/g,"[contains(concat(' ', @class, ' '), ' $1 ')]");}if(K.allAttr){T+=K.allAttr.replace(/(\w+)(\^|\$|\*)?=?([\w\-_]+)?/g,function(c,h,g,f,e){var d=c;switch(g){case"^":d="starts-with(@"+h+", '"+f+"')";break;case"$":d="substring(@"+h+", (string-length(@"+h+") - "+(f.length-1)+"), 6) = '"+f+"'";break;case"*":d="contains(concat(' ', @"+h+", ' '), '"+f+"')";break;default:d="@"+h+((f)?"='"+f+"'":"");}return d;});}if(K.pseudoClass){var I=K.pseudoValue;switch(K.pseudoClass.replace(/^:/,"")){case"first-child":T+="[1 and not(preceding-sibling::*)]";break;case"first-of-type":T+="[1]";break;case"last-child":T+="[last() and not(following-sibling::*)]";break;case"last-of-type":T+="[last()]";break;case"only-child":T+="[1 and not(preceding-sibling::*) and not(following-sibling::*)]";break;case"only-of-type":T+="[count(preceding-sibling::"+K.tag+") = 0 and position() = last()]";break;case"nth-of-type":T+="["+I+"]";break;case"nth-last-of-type":T+="[last() - "+I+"]";break;case"empty":T+="[count(child::*) = 0 and string-length(text()) = 0]";break;case"enabled":T+="[not(@disabled)]";break;case"disabled":T+="[@disabled]";break;case"checked":T+="[@checked='checked']";break;case"nth-child":var G="/child::*[position()";if(/^\d+$/.test(I)){G+=" = "+I;}else{if(/^odd|even$/.test(I)){G+=" mod 2 = "+((I==="odd")?1:0);}else{var a=/^(\d+)n((\+|\-)(\d+))?$/.exec(I);var M=parseInt(a[1],10);var Z=0;if(a[3]&&a[4]){Z=parseInt((a[3]+a[4]),10);if(Z<0){Z=M+Z;}G+=" = "+Z+" or ";}if(M<Z){var Q=((Z-M)%2===0)?0:1;G+=((a[3])?" position()":"")+" mod "+M+" = "+Q+" and position() > "+Z;}else{if(Z===M){G+=((a[3])?" position()":"")+" mod "+M+" = 0";}else{G+=((a[3])?" position()":"")+" mod "+M+" = "+Z;}}}}G+="]";T+=G;break;case"not":I=I.replace(/^\[#([\w\-\_]+)\]$/,"[id=$1]");var H=I.replace(/^(\w+)/,"self::$1");H=H.replace(/\.([\w\-_]+)/g,"contains(concat(' ', @class, ' '), ' $1 ')");H=H.replace(/\[(\w+)(\^|\$|\*)?=?([\w\-_]+)?\]/g,function(c,h,g,f,e){var d=c;switch(g){case"^":d="starts-with(@"+h+", '"+f+"')";break;case"$":d="substring(@"+h+", (string-length(@"+h+") - "+(f.length-1)+"), 6) = '"+f+"'";break;case"*":d="contains(concat(' ', @"+h+", ' '), '"+f+"')";break;default:d="@"+h+((f)?"='"+f+"'":"");}return d;});T+="[not("+H+")]";break;}}}var S=document.evaluate(T,document,null,0,null);var R=S.iterateNext();while(R){L.push(R);R=S.iterateNext();}}return L;};}else{DOMAssistant.cssSelection=function(G){var Al=G.replace(/\s*(,)\s*/,"$1").split(",");var Ad=new C();var AW=new C();var Ak=new C();var T,h,Aa,I,N,AS,AC,Aw;function AF(j){var i=false;for(var a=0,k=Ak.length;a<k;a++){if(Ak[a]===j){i=true;break;}}if(!i){Ak.push(j);}}function Ax(j){var i=false;for(var a=0,k=AW.length;a<k;a++){if(AW[a]===j){i=true;break;}}if(!i){AW.push(j);}}function Aq(){for(var a=(Ak.length-1);a>=0;a--){Ak[a]=null;}Ak=new C();}function AU(){for(var a=(AW.length-1);a>=0;a--){AW[a]=null;}AW=new C();}function y(){if(AW!==Ak){AU();for(var i=0,a=Ak.length;i<a;i++){Ax(Ak[i]);}Aq();}}for(var AL=0,Ac=Al.length;AL<Ac;AL++){T=Al[AL].split(" ");AU();AW.push(DOMAssistant.$(document));for(var AJ=0,o=T.length;AJ<o;AJ++){var W=T[AJ];h=/^(>|\+|~)$/.exec(W);if(h){Aa=/^\w+/.exec(T[AJ+1]);if(Aa){I=new RegExp("(^|\\s)"+Aa+"(\\s|$)","i");N=h[0];for(var AI=0,U=AW.length,Af;AI<U;AI++){AS=AW[AI];if(/\+/.test(N)){AC=AS.nextSibling;if(AC){while(AC&&AC.nodeType!==1&&AC.nextSibling){AC=AC.nextSibling;}if(I.test(AC.nodeName)){AF(AC);}}}else{if(/>/.test(N)){Af=AS.childNodes;Aw=true;}else{Af=AS.parentNode.childNodes;Aw=false;}for(var AG=0,K=Af.length,Am;AG<K;AG++){Am=Af[AG];if(Am===AS){Aw=true;continue;}if(Aw&&Am.nodeType===1&&I.test(Am.nodeName)){AF(Am);}}}}y();}}else{var AZ=/^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d+n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[#?\w+(\^|\$|\*)?=?[\w\-\_]+\]+))\))?)*)?/.exec(W);var Ah={tag:(!AZ[1]||AZ[2]==="*")?"*":AZ[1],id:(AZ[2]!=="*")?AZ[2]:null,allClasses:AZ[3],allAttr:AZ[5],pseudoClass:AZ[10],pseudoValue:AZ[12]};var c="";if(AJ>0&&/(>|\+|~)/.test(T[AJ-1])){Aq();Ak=AW;}else{if(Ah.tag&&!Ah.id){Aq();Ak=AW.elmsByTag(Ah.tag);}}if(Ah.id){var AQ=DOMAssistant.$(Ah.id.replace(/^#/,""));Aq();if(AQ){AF(AQ);}}if(Ah.allClasses){Ah.allClasses=Ah.allClasses.replace(/^\./,"").split(".");var AK=(Ak.length>0)?Ak:null;for(var AB=0,AT=Ah.allClasses.length,AD;AB<AT;AB++){AD=AW.elmsByClass(Ah.allClasses[AB],AK);if(AD.length===0){break;}}Aq();Ak=AD;}if(Ah.allAttr){Ah.allAttr=Ah.allAttr.replace(/(\])(\[)/,"$1 $2").split(" ");var Y=(Ak.length>0)?Ak:null;for(var z=0,X=Ah.allAttr.length,AE,x,f,Ar,L,AX;z<X;z++){AE=new C();x=/(\w+)(\^|\$|\*)?=?([\w\-_]+)?/.exec(Ah.allAttr[z]);f=x[1];Ar=x[3]||"*";L=(Y)?Y:null;AX=x[2]||null;AE=AW.elmsByAttribute(f,Ar,L,AX);if(AE.length===0){break;}}Aq();Ak=AE;}if(Ah.pseudoClass){var d=Ah.pseudoClass;var An=Ah.pseudoValue;var Ae=Ak;Ak=new C();if(/^:not$/.test(d)){An=An.replace(/^\[#([\w\-\_]+)\]$/,"[id=$1]");var e=/^(\w+)/.exec(An);var AO=/\.([\w\-_]+)/.exec(An);var AM=/\[(\w+)(\^|\$|\*)?=?([\w\-_]+)?\]/.exec(An);var Ap=new RegExp("(^|\\s)"+((e)?e[1]:(AO)?AO[1]:"")+"(\\s|$)","i");if(AM){var P=("(^|\\s)"+AM[1]+"(\\s|$)");var Ai=AM[3];var b=AM[2];if(typeof b==="string"){switch(b){case"^":Ai=("^"+Ai);break;case"$":Ai=(Ai+"$");break;case"*":Ai=(Ai);break;}}Ap=new RegExp(Ai,"i");}for(var w=0,As=Ae.length,H,AY;w<As;w++){H=Ae[w];AY=null;if(e&&!Ap.test(H.nodeName)){AY=H;}else{if(AO&&!Ap.test(H.className)){AY=H;}else{if(AM){if(!H.getAttribute(AM[1])||!Ap.test(H.getAttribute(AM[1]))){AY=H;}}}}if(AY){AF(AY);}}}else{for(var q=0,Ag=Ae.length,Q,M,R,Av,Ab,AN,At,Ao;q<Ag;q++){Q=Ae[q];if(/enabled|disabled|checked/.test(d)){if((/enabled/.test(d)&&!Q.disabled)||(/disabled/.test(d)&&Q.disabled)||(/checked/.test(d)&&Q.checked)){AF(Q);}continue;}R=/:(first|last|only)-(child|of-type)/.test(d);Av=/nth-(last-)?of-type/.test(d);Ab=(R||Av)?Q.parentNode.childNodes:Q.childNodes;if(/empty/.test(d)&&Ab.length===0){AF(Q);continue;}AN=[];At=new RegExp((("of-type")?("(^|\\s)"+Ah.tag+"(\\s|$)"):"."),"i");for(var m=0,AV=Ab.length,Au;m<AV;m++){Au=Ab[m];if(Au.nodeType===1&&At.test(Au.nodeName)){AN.push(Au);}}if(AN.length>0){if(R){if((/first-(child|of-type)/.test(d)&&Q===AN[0])||(/last-(child|of-type)/.test(d)&&Q===AN[AN.length-1])||(/only-(child|of-type)/.test(d)&&AN.length===1)){var V=true;if(/(first|last|only)-child/.test(d)){var J=(/first/.test(d))?AN[0]:AN[AN.length-1];var AR;if(/first/.test(d)){AR=J.previousSibling;while(AR){if(AR.nodeType===1){V=false;break;}AR=AR.previousSibling;}}else{if(/last/.test(d)){AR=J.nextSibling;while(AR){if(AR.nodeType===1){V=false;break;}AR=AR.nextSibling;}}else{AR=J.previousSibling;while(AR){if(AR.nodeType===1){V=false;break;}AR=AR.previousSibling;}if(V){AR=J.nextSibling;while(AR){if(AR.nodeType===1){V=false;break;}AR=AR.nextSibling;}}}}}if(V){AF(Q);}}continue;}if(Av){Ao=(/last/i.test(d))?((AN.length-1)-An):(An-1);if(AN[Ao]){AF(AN[Ao]);}}if(/nth-child/.test(d)){var Aj=/^(odd|even)|(\d+)n((\+|\-)(\d+))?$/.exec(An);if(/^\d+$/.test(An)){AF(AN[An-1]);}else{if(Aj){var S=(Aj[1]==="even")?1:0;var AA=2;var AP=parseInt(Aj[2],10);if(AP>0){AA=AP;var O=parseInt((Aj[4]+Aj[5]),10);if(O!==0){S=O-1;}}for(var l=S,AH=AN.length;l<AH;l=l+AA){if(l<0){continue;}AF(AN[l]);}}}}}}}}y();}}for(var g=0,Z=AW.length;g<Z;g++){Ad.push(AW[g]);}}return Ad;};}return DOMAssistant.cssSelection.call(this,F);},elmsByClass:function(G,F){if(document.evaluate&&!D){DOMAssistant.elmsByClass=function(J,H){var I=new C();var L=document.evaluate(".//"+((typeof H==="string")?H:"*")+"[contains(concat(' ', @class, ' '), ' "+J+" ')]",this,null,0,null);var K=L.iterateNext();while(K){I.push(K);K=L.iterateNext();}return I;};}else{DOMAssistant.elmsByClass=function(N,H){var K=new C();var M;if(H&&typeof H==="object"){M=(H.constructor===Array)?H:[H];}else{M=this.getElementsByTagName(H||"*");}var J=new RegExp("(^|\\s)"+N+"(\\s|$)");for(var L=0,O,I=M.length;L<I;L++){O=M[L];if(J.test(O.className)){K.push(O);}}return K;};}return DOMAssistant.elmsByClass.call(this,G,F);},elmsByAttribute:function(G,H,F,I){if(document.evaluate&&!D){DOMAssistant.elmsByAttribute=function(K,L,J,N){var M=new C();var P="@"+K+((typeof L==="undefined"||L==="*")?"":" = '"+L+"'");if(typeof N==="string"){switch(N){case"^":P="starts-with(@"+K+", '"+L+"')";break;case"$":P="substring(@"+K+", (string-length(@"+K+") - "+(L.length-1)+"), 6) = '"+L+"'";break;case"*":P="contains(concat(' ', @"+K+", ' '), '"+L+"')";break;}}var Q=document.evaluate(".//"+((typeof J==="string")?J:"*")+"["+P+"]",this,null,0,null);var O=Q.iterateNext();while(O){M.push(O);O=Q.iterateNext();}return M;};}else{DOMAssistant.elmsByAttribute=function(R,Q,U,M){var J=new C();var K=(typeof Q==="undefined")?null:("(^|\\s)"+Q+"(\\s|$)");if(typeof M==="string"){switch(M){case"^":K=("^"+Q);break;case"$":K=(Q+"$");break;case"*":K=(Q);break;}}var T=new RegExp(K);var L;if(U&&typeof U==="object"){L=(U.constructor===Array)?U:[U];}else{L=this.getElementsByTagName(U||"*");}for(var N=0,S=L.length,P,O;N<S;N++){P=L[N];O=P.getAttribute(R,2);if(typeof O==="string"&&O.length>0){if(!T||typeof T==="undefined"||(T&&T.test(O))){J.push(P);}}}return J;};}return DOMAssistant.elmsByAttribute.call(this,G,H,F,I);},elmsByTag:function(F){if(document.evaluate&&!D){DOMAssistant.elmsByTag=function(G){var H=new C();var J=document.evaluate(".//"+((typeof G==="string")?G:"*"),this,null,0,null);var I=J.iterateNext();while(I){H.push(I);I=J.iterateNext();}return H;};}else{DOMAssistant.elmsByTag=function(G){var I=new C();var K=this.getElementsByTagName(G);for(var J=0,H=K.length;J<H;J++){I.push(K[J]);}return I;};}return DOMAssistant.elmsByTag.call(this,F);},each:function(F){F.call(this);return this;}};}();DOMAssistant.init();DOMAssistant.AJAX=function(){var A=["get","post","load","replaceWithAJAXContent"];var D={get:function(J,L){for(var K=0,I=this.length;K<I;K++){this.AJAX.get.call(this[K],J,L);}return this;},post:function(J,L){for(var K=0,I=this.length;K<I;K++){this.AJAX.post.call(this[K],J,L);}return this;},load:function(J){for(var K=0,I=this.length;K<I;K++){this.AJAX.load.call(this[K],J);}return this;},replaceWithAJAXContent:function(K){for(var J=0,I=this.length;J<I;J++){this.AJAX.replaceWithAJAXContent.call(this[J],K);}return this;}};var C=null;var G=null;var F=null;var H=null;var B=null;var E=false;return{init:function(){DOMAssistant.addHTMLArrayPrototype("AJAX",this);for(var J=0,I=A.length,K;J<I;J++){K=A[J];DOMAssistant.addMethod([K,this[K]]);DOMAssistant.addHTMLArrayPrototype(K,D[K]);}},initRequest:function(){if(!C){if(typeof XMLHttpRequest!=="undefined"){C=new XMLHttpRequest();}else{if(typeof window.ActiveXObject!=="undefined"){try{C=new window.ActiveXObject("Msxml2.XMLHTTP.4.0");}catch(K){try{C=new window.ActiveXObject("MSXML2.XMLHTTP");}catch(J){try{C=new window.ActiveXObject("Microsoft.XMLHTTP");}catch(I){C=null;}}}}}}return C;},get:function(I,J){return DOMAssistant.AJAX.makeCall.call(this,I,J,"GET");},post:function(I,J){return DOMAssistant.AJAX.makeCall.call(this,I,J,"POST");},makeCall:function(K,N,P){if(DOMAssistant.AJAX.initRequest()){G=N;H=this;C.onreadystatechange=function(){};C.abort();var O=K.split("?");var J=O[0];C.open(P,J,true);C.setRequestHeader("AJAX","true");var M=null;if(P==="POST"){var L=O[1];var I=(L)?L.length:0;M=L;C.setRequestHeader("Content-type","application/x-www-form-urlencoded");C.setRequestHeader("Content-length",I);C.setRequestHeader("Connection","close");}C.onreadystatechange=DOMAssistant.AJAX.contentReady;C.send(M);}return this;},getReadyState:function(){return(C&&typeof C.readyState!=="undefined")?C.readyState:null;},getStatus:function(){return C.status;},getStatusText:function(){return C.statusText;},callFunction:function(){var I=C.responseText;if(B){B.replaceWithAJAXContent(I,E);B=null;}else{if(G&&typeof G==="function"&&H){G.call(H,I);F=null;}}},contentReady:function(){var I=DOMAssistant.AJAX;if(I.getReadyState()===4){I.callFunction();}},setLoadElm:function(I){B=I;},setAddToContent:function(I){E=I;},load:function(I,J){DOMAssistant.AJAX.setLoadElm(this);DOMAssistant.AJAX.setAddToContent(J||false);DOMAssistant.AJAX.get(I);},replaceWithAJAXContent:function(M,Q){var I=this.elmsByTag("*");I.push(this);var N;for(var L=0,P=I.length,O;L<P;L++){O=I[L];N=O.attributes;if(N){for(var J=0,K=N.length;J<K;J++){if(typeof O[N[J].name]==="function"){O[N[J].name]=null;}}}}if(Q){this.innerHTML+=M;}else{this.innerHTML=M;}}};}();DOMAssistant.AJAX.init();DOMAssistant.CSS=function(){var A=["addClass","removeClass","replaceClass","hasClass","getStyle"];var B={addClass:function(E){for(var D=0,C=this.length;D<C;D++){this.CSS.addClass.call(this[D],E);}return this;},removeClass:function(E){for(var D=0,C=this.length;D<C;D++){this.CSS.removeClass.call(this[D],E);}return this;},replaceClass:function(E,F){for(var D=0,C=this.length;D<C;D++){this.CSS.replaceClass.call(this[D],E,F);}return this;},hasClass:function(F){var E=[];for(var D=0,C=this.length;D<C;D++){E.push(this.CSS.hasClass.call(this[D],F));}return E;},getStyle:function(F){var D=[];for(var E=0,C=this.length;E<C;E++){D.push(this.CSS.getStyle.call(this[E],F));}return D;}};return{init:function(){DOMAssistant.addHTMLArrayPrototype("CSS",this);for(var D=0,C=A.length,E;D<C;D++){E=A[D];DOMAssistant.addMethod([E,this[E]]);DOMAssistant.addHTMLArrayPrototype(E,B[E]);}},addClass:function(D){var C=this.className;if(!new RegExp(("(^|\\s)"+D+"(\\s|$)"),"i").test(C)){this.className=C+((C.length>0)?" ":"")+D;}return this;},removeClass:function(D){var C=new RegExp(("(^|\\s)"+D+"(\\s|$)"),"i");this.className=this.className.replace(C,function(E){var F="";if(new RegExp("^\\s+.*\\s+$").test(E)){F=E.replace(/(\s+).+/,"$1");}return F;}).replace(/^\s+|\s+$/g,"");return this;},replaceClass:function(D,E){var C=new RegExp(("(^|\\s)"+D+"(\\s|$)"),"i");this.className=this.className.replace(C,function(F,I,H){var G=I+E+H;if(new RegExp("^\\s+.*\\s+$").test(F)){G=F.replace(/(\s+).+/,"$1");}return G;}).replace(/^\s+|\s+$/g,"");return this;},hasClass:function(C){return new RegExp(("(^|\\s)"+C+"(\\s|$)"),"i").test(this.className);},getStyle:function(D){var C="";if(document.defaultView&&document.defaultView.getComputedStyle){C=document.defaultView.getComputedStyle(this,"").getPropertyValue(D);}else{if(this.currentStyle){C=D.replace(/\-(\w)/g,function(E,F){return F.toUpperCase();});C=this.currentStyle[C];}}return C;}};}();DOMAssistant.CSS.init();DOMAssistant.Content=function(){var A=["prev","next","create","setAttributes","addContent","replaceContent","remove"];var B=DOMAssistant.createHTMLArray;var C={prev:function(){var D=B();D.setPrevious(this);var G;for(var F=0,E=this.length;F<E;F++){G=this.Content.prev.call(this[F]);if(G){D.push(G);}}return D;},next:function(){var G=B();G.setPrevious(this);var F;for(var E=0,D=this.length;E<D;E++){F=this.Content.next.call(this[E]);if(F){G.push(F);}}return G;},create:function(H,E,D,J){var G=B();G.setPrevious(this);var K;for(var I=0,F=this.length;I<F;I++){K=this.Content.create.call(this[I],H,E,D,J);if(K){G.push(K);}}return G;},setAttributes:function(D){for(var F=0,E=this.length;F<E;F++){this.Content.setAttributes.call(this[F],D);}return this;},addContent:function(F){for(var E=0,D=this.length;E<D;E++){this.Content.addContent.call(this[E],F);}return this;},replaceContent:function(D){for(var F=0,E=this.length;F<E;F++){this.Content.replaceContent.call(this[F],D);}return this;},remove:function(){for(var E=0,D=this.length;E<D;E++){this.Content.remove.call(this[E]);}return this;}};return{init:function(){DOMAssistant.addHTMLArrayPrototype("Content",this);for(var E=0,D=A.length,F;E<D;E++){F=A[E];DOMAssistant.addMethod([F,this[F]]);DOMAssistant.addHTMLArrayPrototype(F,C[F]);}},prev:function(){var D=this.previousSibling;while(D&&D.nodeType!==1){D=D.previousSibling;}return D;},next:function(){var D=this.nextSibling;while(D&&D.nodeType!==1){D=D.nextSibling;}return D;},create:function(F,E,D,G){var H=DOMAssistant.$(document.createElement(F));if(E){H.setAttributes(E);}if(typeof G!=="undefined"){H.addContent(G);}if(D){DOMAssistant.Content.addContent.call(this,H);}return H;},setAttributes:function(D){for(var E in D){if(/class/i.test(E)){this.className=D[E];}else{this.setAttribute(E,D[E]);}}return this;},addContent:function(D){var E=null;if(typeof D==="string"){E=this.innerHTML+=D;}else{E=this.appendChild(D);}return this;},replaceContent:function(E){for(var H=(this.childNodes.length-1),I,D;H>=0;H--){I=this.childNodes[H];D=I.attributes;if(D){for(var F=0,G=D.length;F<G;F++){if(typeof I[D[F].name]==="function"){I[D[F].name]=null;}}}I.parentNode.removeChild(I);}this.addContent(E);return this;},remove:function(){this.parentNode.removeChild(this);return null;}};}();DOMAssistant.Content.init();DOMAssistant.Events=function(){var A=["addEvent","removeEvent","preventDefault","cancelBubble"];var B={addEvent:function(C,F){for(var E=0,D=this.length;E<D;E++){this.Events.addEvent.call(this[E],C,F);}return this;},removeEvent:function(C,F){for(var E=0,D=this.length;E<D;E++){this.Events.removeEvent.call(this[E],C,F);}return this;},preventDefault:function(C){for(var E=0,D=this.length;E<D;E++){this.Events.preventDefault.call(this[E],C);}return this;},cancelBubble:function(C){for(var E=0,D=this.length;E<D;E++){this.Events.cancelBubble.call(this[E],C);}return this;}};return{init:function(){DOMAssistant.addHTMLArrayPrototype("Events",this);DOMAssistant.preventDefault=this.preventDefault;DOMAssistant.cancelBubble=this.cancelBubble;for(var D=0,C=A.length,E;D<C;D++){E=A[D];DOMAssistant.addMethod([E,this[E]]);DOMAssistant.addHTMLArrayPrototype(E,B[E]);}},addEvent:function(C,D){if(!this.events){this.events={};}if(!this.events[C]){this.events[C]=[];}this.events[C].push(D);this["on"+C]=DOMAssistant.Events.handleEvent;if(typeof this.window==="object"){this.window["on"+C]=DOMAssistant.Events.handleEvent;}return this;},handleEvent:function(C){var I=C||event;var J=I.target||I.srcElement||document;while(J.nodeType!==1&&J.parentNode){J=J.parentNode;}I.eventTarget=J;var G=I.type;var D=this.events[G];var H=D.length;var F;for(var E=0;E<H;E++){F=D[E].call(this,I);if(E===(H-1)){return F;}}},removeEvent:function(C,F){var D=this.events[C];for(var E=0;E<D.length;E++){if(D[E]===F){delete D[E];D.splice(E,1);}}return this;},preventDefault:function(C){if(C&&C.preventDefault){DOMAssistant.Events.preventDefault=function(D){D.preventDefault();};}else{DOMAssistant.Events.preventDefault=function(D){event.returnValue=false;};}return DOMAssistant.Events.preventDefault(C);},cancelBubble:function(C){if(C&&C.stopPropagation){DOMAssistant.Events.cancelBubble=function(D){D.stopPropagation();};}else{DOMAssistant.Events.cancelBubble=function(D){event.cancelBubble=true;};}return DOMAssistant.Events.cancelBubble(C);}};}();DOMAssistant.Events.init();DOMAssistant.DOMLoad=function(){var DOMLoaded=false;var DOMLoadTimer=null;var functionsToCall=[];var execFunctions=function(){if(DOMLoaded){clearInterval(DOMLoadTimer);}for(var i=0,il=functionsToCall.length;i<il;i++){try{functionsToCall[i]();}catch(e){}}};var DOMHasLoaded=function(){if(DOMLoaded){return ;}DOMLoaded=true;execFunctions();};/*@cc_on @*//*@if (@_win32)
		if (document.getElementById) {
			document.write("<script id=\"ieScriptLoad\" defer src=\"//:\"><\/script>");
		    document.getElementById("ieScriptLoad").onreadystatechange = function() {
		        if (this.readyState === "complete") {
		            DOMHasLoaded();
		        }
		    };
		}
	/*@end @*/if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMHasLoaded,false);}if(navigator.userAgent.search(/WebKit/i)!==-1){DOMLoadTimer=setInterval(function(){if(document.readyState.search(/loaded|complete/i)!==-1){var loaded=new DOMHasLoaded();}},10);}window.onload=DOMHasLoaded;return{DOMReady:function(){for(var i=0,il=arguments.length,func,callFunc;i<il;i++){func=arguments[i];callFunc=(typeof func==="function")?func:new Function(func);functionsToCall.push(callFunc);}}};}();DOMAssistant.DOMReady=DOMAssistant.DOMLoad.DOMReady;