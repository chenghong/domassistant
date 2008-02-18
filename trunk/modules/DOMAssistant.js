// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
var DOMAssistant = function () {
	var HTMLArray = function () {
		// Constructor
	};
	var isIE = document.all && !/Opera/i.test(navigator.userAgent);
	return {
		allMethods : [],
		publicMethods : [
			"elmsByClass",
			"elmsByAttribute",
			"elmsByTag"
		],
		initCore : function () {
			this.applyMethod.call(window, "$", this.$);
			this.applyMethod.call(window, "$$", this.$$);
			window.DOMAssistant = this;
			if (isIE) {
				HTMLArray = Array;
			}
			HTMLArray.prototype = [];
			HTMLArray.prototype.each = function (functionCall) {
				for (var i=0, il=this.length; i<il; i++) {
					functionCall.call(this[i]);
				}
				return this;
			};
			HTMLArray.prototype.end = function () {
				return this.previousSet;
			};
			this.attach(this);
		},
		
		addMethods : function (name, method) {
			if (typeof this.allMethods[name] === "undefined") {
				this.allMethods[name] = method;
				this.addHTMLArrayPrototype(name, method);
			}
		},
		
		addMethodsToElm : function (elm) {
			for (var method in this.allMethods) {
				if (typeof this.allMethods[method] !== "undefined") {
					this.applyMethod.call(elm, method, this.allMethods[method]);
				}
			}
		},
		
		applyMethod : function (method, func) {
			if (typeof this[method] !== "function") {
				this[method] = func;
			}
		},
		
		attach : function (plugin) {
			var publicMethods = plugin.publicMethods;
			if (typeof publicMethods === "undefined") {
				var pluginMethod;
				for (var method in plugin) {
					if (method !== "init" && typeof plugin[method] !== "undefined") {
						this.addMethods(method, plugin[method]);
					}
				}
			}
			else if (publicMethods.constructor === Array) {
				for (var i=0, il=publicMethods.length, current; i<il; i++) {
					current = publicMethods[i];
					this.addMethods(current, plugin[current]);
				}
			}
			if (typeof plugin.init === "function") {
				plugin.init();
			}
		},
		
		createHTMLArray : function() {
			return new HTMLArray();
		},
		
		addHTMLArrayPrototype : function (name, method) {
			HTMLArray.prototype[name] = function () {
				var elmsToReturn = new HTMLArray();
				elmsToReturn.previousSet = this;
				var elms;
				for (var i=0, il=this.length; i<il; i++) {
					elms = method.apply(this[i], arguments);
					//alert(elms);
					if (typeof elms !== "undefined" && elms !== null && elms.constructor === Array) {
						for (var j=0, jl=elms.length; j<jl; j++) {
							elmsToReturn.push(elms[j]);
						}
					}
					else {
						elmsToReturn.push(elms);
					}	
				}
				return elmsToReturn;
			};
		},
	
		$ : function () {
			var elm = new HTMLArray();
			if (document.getElementById) {
				var arg = arguments[0];
				if (typeof arg === "string") {
					arg = arg.replace(/^[^#]*(#)/, "$1");
					if (/^#[\w\-\_]+$/.test(arg)) {
						var idMatch = DOMAssistant.$$(arg.substr(1), false);
						if (idMatch) {
							elm.push(idMatch);
						}
					}
					else {
						elm = DOMAssistant.cssSelection(arg);
					}
				}
				else if (typeof arg === "object") {
					if (arguments.length === 1) {
						elm = DOMAssistant.$$(arg);
					}
					else {
						for (var j=0, jl=arguments.length; j<jl; j++) {
							elm.push(arguments[j]);
						}
					}
				}
			}
			return elm;
	    },
	
		$$ : function (id, addMethods) {
			var elm = (typeof id === "object")? id : document.getElementById(id);
			var applyMethods = addMethods || true;
			if (typeof id === "string" && elm && elm.id !== id) {
				elm = null;
				for (var i=0, il=document.all.length, item; i<il; i++) {
					item = document.all[i];
					if (item.id === id) {
						elm = item;
						break;
					}
				}
			}
			if (elm && applyMethods) {
				DOMAssistant.addMethodsToElm(elm);
			}
			return elm;
		},
	
		cssSelection : function  (cssRule) {
			if (document.querySelectorAll) {
				DOMAssistant.cssSelection = function (cssRule) {
					var elm = new HTMLArray();
					var results = document.querySelectorAll(cssRule);
					for (var i=0, il=results.length; i<il; i++) {
						elm.push(results[i]);
					}
					return elm;
				};
			}
			else if (document.evaluate) {
				DOMAssistant.cssSelection = function (cssRule) {
					var cssRules = cssRule.replace(/\s*(,)\s*/g, "$1").split(",");
					var elm = new HTMLArray();
					var currentRule, identical, cssSelectors, xPathExpression, cssSelector, splitRule, nextTag, followingElm;
					var cssSelectorRegExp =  /^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d+n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[#?\w+(\^|\$|\*)?=?[\w\-\_]+\]+))\))?)*)?(>|\+|~)?/;
					for (var i=0, il=cssRules.length; i<il; i++) {
						currentRule = cssRules[i];
						if (i > 0) {
							identical = false;
							for (var x=0, xl=i; x<xl; x++) {
								if (cssRules[i] === cssRules[x]) {
									identical = true;
									break;
								}
							}
							if (identical) {
								continue;
							}
						}
						cssSelectors = currentRule.split(" ");
						xPathExpression = ".";
						for (var j=0, jl=cssSelectors.length; j<jl; j++) {
							cssSelector = cssSelectorRegExp.exec(cssSelectors[j]);
							splitRule = {
								tag : (!cssSelector[1] || cssSelector[2] === "*")? "*" : cssSelector[1],
								id : (cssSelector[2] !== "*")?  cssSelector[2] : null,
								allClasses : cssSelector[3],
								allAttr : cssSelector[5],
								pseudoClass : cssSelector[10],
								pseudoValue : cssSelector[12],
								tagRelation : cssSelector[19]
							};
							if (splitRule.tagRelation) {
								switch (splitRule.tagRelation) {
									case ">":
										xPathExpression += "/child::";
										break;
									case "+":
										xPathExpression += "/following-sibling::*[1]/self::";
										break;
									case "~":
										xPathExpression += "/following-sibling::";
										break;
								}
							}
							else {
								xPathExpression += (j > 0 && /(>|\+|~)/.test(cssSelectors[j-1]))? splitRule.tag : ("//" + splitRule.tag);
							}
							if (splitRule.id) {
								xPathExpression += "[@id = '" + splitRule.id.replace(/^#/, "") + "']";
							}
							if (splitRule.allClasses) {
								xPathExpression += splitRule.allClasses.replace(/\.([\w\-_]+)/g, "[contains(concat(' ', @class, ' '), ' $1 ')]");
							}
							if (splitRule.allAttr) {
								xPathExpression += splitRule.allAttr.replace(/(\w+)(\^|\$|\*)?=?([\w\-_]+)?/g, function (match, p1, p2, p3, p4) {
									var regExpReturn = match;
									switch (p2) {
										case "^":
											regExpReturn = "starts-with(@" + p1 + ", '" + p3 + "')";
											break;
										case "$":
											regExpReturn = "substring(@" + p1 + ", (string-length(@" + p1 + ") - " + (p3.length - 1) + "), 6) = '" + p3 + "'";
											break;
										case "*":
											regExpReturn = "contains(concat(' ', @" + p1 + ", ' '), '" + p3 + "')";
											break;
										default :
											regExpReturn = "@" + p1 + ((p3)? "='" + p3 + "'" : "");
									}
									return regExpReturn;
								});
							}
							if (splitRule.pseudoClass) {
								var pseudoValue = splitRule.pseudoValue;
								switch (splitRule.pseudoClass.replace(/^:/, "")) {
									case "first-child":
										xPathExpression += "[count(preceding-sibling::*) = 0]";
										break;
									case "first-of-type":
										xPathExpression += "[count(preceding-sibling::" + splitRule.tag + ") = 0]";
										break;
									case "last-child":
										xPathExpression += "[count(following-sibling::*) = 0]";
										break;
									case "last-of-type":
										xPathExpression += "[count(following-sibling::" + splitRule.tag + ") = 0]";
										break;
									case "only-child":
										xPathExpression += "[count(preceding-sibling::*) = 0 and count(following-sibling::*) = 0]";
										break;
									case "only-of-type":
										xPathExpression += "[count(preceding-sibling::" + splitRule.tag + ") = 0 and count(following-sibling::" + splitRule.tag + ") = 0]";
										break;		
									case "nth-of-type":
										xPathExpression += "[" + pseudoValue + "]";
										break;
									case "empty":
										xPathExpression += "[count(child::*) = 0 and string-length(text()) = 0]";
										break;
									case "contains":
										xPathExpression += "[contains(., '" + pseudoValue + "')]";
										break;	
									case "enabled":
										xPathExpression += "[not(@disabled)]";
										break;
									case "disabled":
										xPathExpression += "[@disabled]";
										break;
									case "checked":
										xPathExpression += "[@checked='checked']"; // Doesn't work in Opera 9.24
										break;
									case "nth-child":
										var pseudoSelection = "[";
										if (/^\d+$/.test(pseudoValue)) {
											pseudoSelection += "position() = " + pseudoValue;
										}
										else if (/^n$/.test(pseudoValue)) {
											pseudoSelection = "";
										}
										else{
											if (/^odd$/.test(pseudoValue)) {
												pseudoValue = "2n+1";
											}
											else if (/^even$/.test(pseudoValue)) {
												pseudoValue = "2n+0";
											}
											var pseudoSelector = /^(\d+)n((\+|\-)(\d+))?$/.exec(pseudoValue);
											var nthSelector = parseInt(pseudoSelector[1], 10);
											var nOperatorVal = 0;
											if (pseudoSelector[3] && pseudoSelector[4]) {
												nOperatorVal = parseInt((pseudoSelector[3] + pseudoSelector[4]), 10);
												if (nOperatorVal < 0) {
													nOperatorVal = nthSelector + nOperatorVal;
												}
												//pseudoSelection += "position() = " + nOperatorVal + " or ";
											}
											pseudoSelection += "(count(./preceding-sibling::*) + 1)";
											if (nthSelector < nOperatorVal) {
												var nOperatorDiff = ((nOperatorVal - nthSelector) % 2 === 0)? 0 : 1;
												pseudoSelection += " mod " + nthSelector + " = " + nOperatorDiff + " and position() > " + nOperatorVal;
											}
											else if (nOperatorVal === nthSelector) {
												pseudoSelection += " mod " + nthSelector + " = 0";
											}
											else {
												pseudoSelection += " mod " + nthSelector + " = " + nOperatorVal;
											}
										}
										if (!/^n$/.test(pseudoValue)) {
											pseudoSelection += "]";
										}
										xPathExpression += pseudoSelection;
										break;	
									case "not":
										pseudoValue = pseudoValue.replace(/^\[#([\w\-\_]+)\]$/, "[id=$1]");
										var notSelector = pseudoValue.replace(/^(\w+)/, "self::$1");
										notSelector = notSelector.replace(/\.([\w\-_]+)/g, "contains(concat(' ', @class, ' '), ' $1 ')");
										notSelector = notSelector.replace(/\[(\w+)(\^|\$|\*)?=?([\w\-_]+)?\]/g, function (match, p1, p2, p3, p4) {
											var regExpReturn = match;
											switch (p2) {
												case "^":
													regExpReturn = "starts-with(@" + p1 + ", '" + p3 + "')";
													break;
												case "$":
													regExpReturn = "substring(@" + p1 + ", (string-length(@" + p1 + ") - " + (p3.length - 1) + "), 6) = '" + p3 + "'";
													break;
												case "*":
													regExpReturn = "contains(concat(' ', @" + p1 + ", ' '), '" + p3 + "')";
													break;
												default :
													regExpReturn = "@" + p1 + ((p3)? "='" + p3 + "'" : "");
											}
											return regExpReturn;
										});
										xPathExpression += "[not(" + notSelector + ")]";
										break;
								}
							}	
						}
						var xPathNodes = document.evaluate(xPathExpression, document, null, 0, null);
						var node = xPathNodes.iterateNext();
						while(node) {
							elm.push(node);
							node = xPathNodes.iterateNext();
						}
					}
					return elm;
				};
			}
			else {				
				DOMAssistant.cssSelection = function (cssRule) {
					var cssRules = cssRule.replace(/\s*(,)\s*/g, "$1").split(",");
					var elm = new HTMLArray();
					var prevElm = new HTMLArray();
					var matchingElms = new HTMLArray();
					var prevParents, currentRule, identical, cssSelectors, childOrSiblingRef, nextTag, nextRegExp, refSeparator, refPrevElm, nextSib, refPrevElmFound, current, previous, prevParent, addElm, firstChild, lastChild, parentTagsByType, matchingChild, childrenNodes, childNodes;
					var childOrSiblingRefRegExp = /^(>|\+|~)$/;
					var cssSelectorRegExp = /^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d*n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[#?\w+(\^|\$|\*)?=?[\w\-\_]+\]+))\))?)*)?/;
					var matchedObjects;
					function clearAdded() {
						for (var n=0, nl=prevElm.length; n<nl; n++) {
							prevElm[n].added = false;
						}
					}
					function clearChildElms () {
						for (var n=0, nl=prevParents.length; n<nl; n++) {
							prevParents[n].childElms = null;
						}
					}
					function getAttr(elm, attr) {
						if(isIE) {
							switch (attr) {
								case "id":
									return elm.id;
								case "for":
									return elm.htmlFor;
								case "class":
									return elm.className;
							}
						}
						return elm.getAttribute(attr, 2);
					}
					for (var a=0, al=cssRules.length; a<al; a++) {
						currentRule = cssRules[a];
						if (a > 0) {
							identical = false;
							for (var b=0, bl=a; b<bl; b++) {
								if (cssRules[a] === cssRules[b]) {
									identical = true;
									break;
								}
							}
							if (identical) {
								continue;
							}
						}
						cssSelectors = currentRule.split(" ");
						prevElm = [];
						prevElm.push(document);
						
						for (var i=0, il=cssSelectors.length; i<il; i++) {
							var rule = cssSelectors[i];
							matchingElms = [];
							if (i > 0 && childOrSiblingRefRegExp.test(rule)) {
								childOrSiblingRef = childOrSiblingRefRegExp.exec(rule);
								if (childOrSiblingRef) {
									nextTag = /^\w+/.exec(cssSelectors[i+1]);
									if (nextTag) {
										nextRegExp = new RegExp("(^|\\s)" + nextTag + "(\\s|$)", "i");
										refSeparator = childOrSiblingRef[0];
										if (refSeparator === ">") {
											for (var j=0, jl=prevElm.length, children; j<jl; j++) {
												children = prevElm[j].childNodes;
												for (var k=0, kl=children.length; k<kl; k++) {
													if (nextRegExp.test(children[k].nodeName)) {
														matchingElms.push(children[k]);
													}
												}
											}	
										}
										else if (refSeparator === "+") {
											for (var l=0, ll=prevElm.length; l<ll; l++) {
												nextSib = prevElm[l].nextSibling;
												while (nextSib && nextSib.nodeType !== 1) {
													nextSib = nextSib.nextSibling;
												}
												if (nextSib) {
													if (nextRegExp.test(nextSib.nodeName)) {
														matchingElms.push(nextSib);
													}
												}
											}	
										}
										else if (refSeparator === "~") {
											for (var m=0, ml=prevElm.length; m<ml; m++) {
												nextSib = prevElm[m].nextSibling;
												while (nextSib && nextSib.nodeType !== 1) {
													nextSib = nextSib.nextSibling;
												}
												while (nextSib) {
													if (!nextSib.added && nextRegExp.test(nextSib.nodeName)) {
														nextSib.added = true;
														matchingElms.push(nextSib);
													}
													nextSib = nextSib.nextSibling;
												}
											}
											clearAdded();
										}
									}
								}
								prevElm = matchingElms;
								i = i+1;
							}
							else {
								var cssSelector = cssSelectorRegExp.exec(rule);
								var splitRule = {
									tag : (!cssSelector[1] || cssSelector[2] === "*")? "*" : cssSelector[1],
									id : (cssSelector[2] !== "*")?  cssSelector[2] : null,
									allClasses : cssSelector[3],
									allAttr : cssSelector[5],
									pseudoClass : cssSelector[10],
									pseudoValue : cssSelector[12]
								};
								if (splitRule.id) {
									matchingElms.push(document.getElementById(splitRule.id.replace(/#/, "")));
									prevElm = matchingElms;
								}
								else if (splitRule.tag) {
									var tagCollectionMatches;
									for (var n=0, nl=prevElm.length; n<nl; n++) {
										tagCollectionMatches = prevElm[n].getElementsByTagName(splitRule.tag);
										for (var o=0, ol=tagCollectionMatches.length; o<ol; o++) {
											if (!tagCollectionMatches[o].added) {
												tagCollectionMatches[o].added = true;
												matchingElms.push(tagCollectionMatches[o]);
											}
										}
									}
									prevElm = matchingElms;
									clearAdded();
								}
								
								if (splitRule.allClasses) {
									splitRule.allClasses = splitRule.allClasses.replace(/^\./, "").split(".");
									var matchingClassElms = [];
									for (var p=0, pl=matchingElms.length, elmClass; p<pl; p++) {
										current = matchingElms[p];
										if (!current.added) {
											addElm = false;
											elmClass = current.className;
											for (var q=0, ql=splitRule.allClasses.length, classToMatch, classMatch; q<ql; q++) {
												classToMatch = new RegExp("(^|\\s)" + splitRule.allClasses[q].replace(/\./, "") + "(\\s|$)");
												addElm = classToMatch.test(elmClass);
												if (!addElm) {
													break;
												}
											}
										}
										if (addElm) {
											current.added = true;
											matchingClassElms.push(current);
										}
									}
									clearAdded();
									matchingElms = matchingClassElms;
									prevElm = matchingElms;
								}
								if (splitRule.allAttr) {
									splitRule.allAttr = splitRule.allAttr.replace(/(\])(\[)/, "$1 $2").split(" ");
									var matchingAttributeElms = [];
									var attributeMatchRegExp = /(\w+)(\^|\$|\*)?=?([\w\-_]+)?/;
									for (var r=0, rl=matchingElms.length, currentAttr, attributeValue; r<rl; r++) {
										current = matchingElms[r];
										if (!current.added) {
											for (var s=0, sl=splitRule.allAttr.length, attributeMatch, attribute, attrVal, tag, substrMatchSelector; s<sl; s++) {
												addElm = false;
												attributeMatch = attributeMatchRegExp.exec(splitRule.allAttr[s]);
												attributeValue = attributeMatch[3] || null;
												attrVal = (attributeValue)? ("^" + attributeValue + "$") : null;
												substrMatchSelector = attributeMatch[2] || null;
												if (typeof substrMatchSelector === "string") {
													switch (substrMatchSelector) {
														case "^":
															attrVal = ("^" + attributeValue);
															break;
														case "$":
															attrVal = (attributeValue + "$");
															break;
														case "*":
															attrVal = (attributeValue);
															break;	
													}
												}
												var attributeRegExp = (attrVal)? new RegExp(attrVal) : null;
									        	currentAttr = getAttr(current, attributeMatch[1]);
										        if (typeof currentAttr === "string" && currentAttr.length > 0) {
													if (!attributeRegExp || typeof attributeRegExp === "undefined" || (attributeRegExp && attributeRegExp.test(currentAttr))) {
														addElm = true;
										            }
										        }
												if (!addElm) {
													continue;
												} 
											}
											if (addElm) {
												matchingAttributeElms.push(current);
											}
										}
									}
									clearAdded();
									matchingElms = matchingAttributeElms;
									prevElm = matchingElms;
								}
								if (splitRule.pseudoClass) {
									var pseudoClass = splitRule.pseudoClass;
									var pseudoValue = splitRule.pseudoValue;
									var previousMatch = matchingElms;
									matchingElms = [];
									prevParents = [];
									if (/^:not$/.test(pseudoClass)) {
										pseudoValue = pseudoValue.replace(/^\[#([\w\-\_]+)\]$/, "[id=$1]");
										var notTag = /^(\w+)/.exec(pseudoValue);
										var notClass = /\.([\w\-_]+)/.exec(pseudoValue);
										var notAttr = /\[(\w+)(\^|\$|\*)?=?([\w\-_]+)?\]/.exec(pseudoValue);
										var notRegExp = new RegExp("(^|\\s)" + ((notTag)? notTag[1] : (notClass)? notClass[1] : "") + "(\\s|$)", "i");
										if (notAttr) {
											var notAttribute = notAttr[3];
											var notMatchingAttrVal = "^" + notAttr[3] + "$";
											var substrNoMatchSelector = notAttr[2];
											if (typeof substrNoMatchSelector === "string") {
												switch (substrNoMatchSelector) {
													case "^":
														notMatchingAttrVal = ("^" + notAttribute);
														break;
													case "$":
														notMatchingAttrVal = (notAttribute + "$");
														break;
													case "*":
														notMatchingAttrVal = (notAttribute);
														break;	
												}
											}
											notRegExp = new RegExp(notMatchingAttrVal, "i");
										}
										for (var t=0, tl=previousMatch.length, notElm; t<tl; t++) {
											notElm = previousMatch[t];
											addElm = null;
											if (notTag && !notRegExp.test(notElm.nodeName)) {
												addElm = notElm;
											}		
											else if (notClass && !notRegExp.test(notElm.className)) {
												addElm = notElm;
											}
											else if (notAttr) {
												if (!getAttr(notElm, notAttr[1]) || !notRegExp.test(getAttr(notElm, notAttr[1]))) {
													addElm = notElm;
												}
											}
											if (addElm && !addElm.added) {
												addElm.added = true;
												matchingElms.push(addElm);
											}
										}
										prevElm = matchingElms;
									}
									else {
										if (/first-child/.test(pseudoClass)) {
											for (var u=0, ul=previousMatch.length; u<ul; u++) {
												previous = previousMatch[u];
												prevParent = previous.parentNode;
												firstChild = prevParent.firstChild;
												while (firstChild.nodeType !== 1 && firstChild.nextSibling) {
													firstChild = firstChild.nextSibling;
												}
												if (firstChild === previous) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/last-child/.test(pseudoClass)) {
											for (var v=0, vl=previousMatch.length; v<vl; v++) {
												previous = previousMatch[v];
												prevParent = previous.parentNode;
												lastChild = prevParent.lastChild;
												while (lastChild.nodeType !== 1 && lastChild.previousSibling) {
													lastChild = lastChild.previousSibling;
												}
												if (lastChild === previous) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/only-child/.test(pseudoClass)) {
											for (var w=0, wl=previousMatch.length; w<wl; w++) {
												previous = previousMatch[w];
												prevParent = previous.parentNode;
												firstChild = prevParent.firstChild;
												while (firstChild.nodeType !== 1 && firstChild.nextSibling) {
													firstChild = firstChild.nextSibling;
												}
												lastChild = prevParent.lastChild;
												while (lastChild.nodeType !== 1 && lastChild.previousSibling) {
													lastChild = lastChild.previousSibling;
												}
												if (firstChild === previous && lastChild === previous) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/nth-child/.test(pseudoClass)) {
											if (/^\d+$/.test(pseudoValue)) {
												var nthChild = parseInt(pseudoValue, 10);
												for (var x=0, xl=previousMatch.length, childCounter; x<xl; x++) {
													childCounter = 0;
													previous = previousMatch[x];
													prevParent = previous.parentNode;
													matchingChild = prevParent.firstChild;
													if(matchingChild.nodeType === 1) {
														childCounter = childCounter + 1;
													}
													while (childCounter < nthChild && matchingChild.nextSibling) {
														matchingChild = matchingChild.nextSibling;
														if (matchingChild.nodeType === 1) {
															childCounter = childCounter + 1;
														}
													}
														
													if (childCounter === nthChild && matchingChild && !matchingChild.added && (matchingChild.nodeName === previous.nodeName)) {
														matchingChild.added = true;
														matchingElms.push(previous);
													}
												}
												clearAdded();
											}
											else if (/^n$/.test(pseudoValue)) {
												for (var y=0, yl=previousMatch.length; y<yl; y++) {
													matchingElms.push(previousMatch[y]);
												}
											}
											else{
												var pseudoSelector = /^(odd|even)|(\d+)n((\+|\-)(\d+))?$/.exec(pseudoValue);
												var nRepeat = parseInt(pseudoSelector[2], 10);
												var iteratorStart = (pseudoSelector[1] === "even")? 1 : 0;
												var iteratorAdd = 2;
												if (nRepeat > 0) {
													iteratorAdd = nRepeat;
													var nOperatorVal = (pseudoSelector[4])? parseInt((pseudoSelector[4] + pseudoSelector[5]), 10) : 0;
													iteratorStart = nOperatorVal - 1;
												}
												for (var z=0, zl=previousMatch.length; z<zl; z++) {
													previous = previousMatch[z];
													prevParent = previous.parentNode;
													if (!prevParent.childElms) {
														childrenNodes = prevParent.childNodes;
														childNodes = [];
														var childElm = prevParent.firstChild;
														if (childElm.nodeType === 1) {
															childNodes.push(childElm);
														}
														while (childElm && childElm.nextSibling) {
															childElm = childElm.nextSibling;
															if (childElm.nodeType === 1) {
																childNodes.push(childElm);
															}
														}
														prevParent.childElms = childNodes;
														prevParents.push(prevParent);
													}
													else {
														childNodes = prevParent.childElms;
													}
													for (var zz=iteratorStart, zzl=childNodes.length; zz<zzl; zz=zz+iteratorAdd) {
														if (zz < 0) {
															continue;
														}
														current = childNodes[zz];
														if (!current.added && current.nodeName === previous.nodeName) {
															current.added = true;
															matchingElms.push(previous);
														}
													}
												}
												clearAdded();
												clearChildElms();
											}
											prevElm = matchingElms;
										}
										else if (/first-of-type/.test(pseudoClass)) {
											for (var zFirst=0, zFirstL=previousMatch.length; zFirst<zFirstL; zFirst++) {
												previous = previousMatch[zFirst];
												prevParent = previous.parentNode;
												parentTagsByType = prevParent.getElementsByTagName(previous.nodeName);
												firstChild = parentTagsByType[0];
												if (firstChild === previous) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/last-of-type/.test(pseudoClass)) {
											for (var zLast=0, zLastL=previousMatch.length, lastElement; zLast<zLastL; zLast++) {
												previous = previousMatch[zLast];
												if (!previous.added) {
													prevParent = previous.parentNode;
													parentTagsByType = prevParent.getElementsByTagName(previous.nodeName);
													lastChild = parentTagsByType[parentTagsByType.length - 1];
													while (lastChild.parentNode !== prevParent) {
														lastChild = lastChild.parentNode;
													}
													if (lastChild === previous) {
														previous.added = true;
														matchingElms.push(previous);
													}
												}
											}
											clearAdded();
											prevElm = matchingElms;
										}
										else if (/only-of-type/.test(pseudoClass)) {
											for (var zOnly=0, zOnlyL=previousMatch.length; zOnly<zOnlyL; zOnly++) {
												previous = previousMatch[zOnly];
												prevParent = previous.parentNode;
												parentTagsByType = prevParent.getElementsByTagName(previous.nodeName);
												if (parentTagsByType.length === 1) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/nth-of-type/.test(pseudoClass)) {
											var nthIndex = parseInt(pseudoValue, 10);
											for (var zNth=0, zNthL=previousMatch.length; zNth<zNthL; zNth++) {
												previous = previousMatch[zNth];
												prevParent = previous.parentNode;
												childNodes = [];
												parentTagsByType = prevParent.childNodes;
												if (parentTagsByType.length >= nthIndex) {
													for (var zInnerNth=0, zInnerNthL=parentTagsByType.length, childNode; zInnerNth<zInnerNthL; zInnerNth++) {
														if (zInnerNth === nthIndex) {
															break;
														}
														childNode = parentTagsByType[zInnerNth];
														if (childNode.nodeName === previous.nodeName) {
															childNodes.push(childNode);
														}
													}
													current = childNodes[childNodes.length - 1];
													if (current && current === previous) {
														matchingElms.push(previous);
													}
												}
											}
											prevElm = matchingElms;
										}
										else if (/empty/.test(pseudoClass)) {
											for (var zEmpty=0, zEmptyL=previousMatch.length; zEmpty<zEmptyL; zEmpty++) {
												previous = previousMatch[zEmpty];
												prevParent = previous.parentNode;
												childrenNodes = prevParent.childNodes;
												if (childrenNodes.length === 0) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/enabled/.test(pseudoClass)) {
											for (var zEnabled=0, zEnabledL=previousMatch.length; zEnabled<zEnabledL; zEnabled++) {
												previous = previousMatch[zEnabled];
												if (!previous.disabled) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/disabled/.test(pseudoClass)) {
											for (var zDisabled=0, zDisabledL=previousMatch.length; zDisabled<zDisabledL; zDisabled++) {
												previous = previousMatch[zDisabled];
												if (previous.disabled) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/checked/.test(pseudoClass)) {
											for (var zChecked=0, zCheckedL=previousMatch.length; zChecked<zCheckedL; zChecked++) {
												previous = previousMatch[zChecked];
												if (previous.checked) {
													matchingElms.push(previous);
												}
											}
											prevElm = matchingElms;
										}
										else if (/contains/.test(pseudoClass)) {
											for (var zContains=0, zContainsL=previousMatch.length; zContains<zContainsL; zContains++) {
												previous = previousMatch[zContains];
												if (!previous.added) {
													if (new RegExp("(^|\\s)" + pseudoValue + "(\\s|$)").test(previous.innerHTML)) {
														previous.added = true;
														matchingElms.push(previous);
													}
												}
											}
											clearAdded();
											prevElm = matchingElms;
										}
									}
								}
							}
						}
						for (var iPrevElm=0, iPrevElmL=prevElm.length; iPrevElm<iPrevElmL; iPrevElm++) {
							elm.push(prevElm[iPrevElm]);
						}
					}
					return elm;
				};		
			}
			return DOMAssistant.cssSelection.call(this, cssRule); 
		},
	
		elmsByClass : function (className, tag) {
			if (document.evaluate) {
				DOMAssistant.elmsByClass = function (className, tag) {
					var returnElms = new HTMLArray();
					if (this.getElementsByClassName && !tag) {
						var results = this.getElementsByClassName(className);
						for (var i=0, il=results.length; i<il; i++) {
							returnElms.push(results[i]);
						}
					}
					else {
						var xPathNodes = document.evaluate(".//" + ((typeof tag === "string")? tag : "*") + "[contains(concat(' ', @class, ' '), ' " + className + " ')]", this, null, 0, null);
						var node = xPathNodes.iterateNext();
						while(node) {
							returnElms.push(node);
							node = xPathNodes.iterateNext();
						}
					}
					return returnElms;
				};
			}
			else {
				DOMAssistant.elmsByClass = function (className, tag) {
					var returnElms = new HTMLArray();
					var elms;
					if (tag && typeof tag === "object") {
						elms = (tag.constructor === Array)? tag : [tag];
					}
					else {
						elms = this.getElementsByTagName(tag || "*");
					}
					var regExp = new RegExp("(^|\\s)" + className + "(\\s|$)");
					for (var i=0,elm,il=elms.length; i<il; i++) {
						elm = elms[i];		
						if (regExp.test(elm.className)) {
							returnElms.push(elm);
						}
					}
					return returnElms;
				};
			}
			return DOMAssistant.elmsByClass.call(this, className, tag);
		},
	
		elmsByAttribute : function (attr, attrVal, tag, substrMatchSelector) {
			if (document.evaluate) {
				DOMAssistant.elmsByAttribute = function (attr, attrVal, tag, substrMatchSelector) {
					var returnElms = new HTMLArray();
					var attribute = "@" + attr + ((typeof attrVal === "undefined" || attrVal === "*")? "" : " = '" + attrVal + "'");
					if (typeof substrMatchSelector === "string") {
						switch (substrMatchSelector) {
							case "^":
								attribute = "starts-with(@" + attr + ", '" + attrVal + "')";
								break;
							case "$":
								attribute = "substring(@" + attr + ", (string-length(@" + attr + ") - " + (attrVal.length - 1) + "), 6) = '" + attrVal + "'";
								break;
							case "*":
								attribute = "contains(concat(' ', @" + attr + ", ' '), '" + attrVal + "')";
								break;	
						}
					}
					var xPathNodes = document.evaluate(".//" + ((typeof tag === "string")? tag : "*") + "[" + attribute + "]", this, null, 0, null);
					var node = xPathNodes.iterateNext();
					while(node) {
						returnElms.push(node);
						node = xPathNodes.iterateNext();
					}
					return returnElms;
				};
			}
			else {
				DOMAssistant.elmsByAttribute = function (attr, attrVal, tag, substrMatchSelector) {
					var returnElms = new HTMLArray();
					if (window.ActiveXObject && document.all) {
						attr = attr.replace(/class/, "className");
					}
					var attribute = (typeof attrVal === "undefined")? null : ("(^|\\s)" + attrVal + "(\\s|$)");
					if (typeof substrMatchSelector === "string") {
						switch (substrMatchSelector) {
							case "^":
								attribute = ("^" + attrVal);
								break;
							case "$":
								attribute = (attrVal + "$");
								break;
							case "*":
								attribute = (attrVal);
								break;	
						}
					}
					var attributeRegExp = new RegExp(attribute);
					var elms;
					if (tag && typeof tag === "object") {
						elms = (tag.constructor === Array)? tag : [tag];
					}
					else {
						elms = this.getElementsByTagName(tag || "*");
					}
					for (var i=0,il=elms.length,current,currentAttr; i<il; i++) {
				        current = elms[i];
				        currentAttr = current.getAttribute(attr, 2);
				        if (typeof currentAttr === "string" && currentAttr.length > 0) {
							if (!attributeRegExp || typeof attributeRegExp === "undefined" || (attributeRegExp && attributeRegExp.test(currentAttr))) {
								returnElms.push(current);
				            }
				        }
				    }
					return returnElms;
				};
			}
		    return DOMAssistant.elmsByAttribute.call(this, attr, attrVal, tag, substrMatchSelector);
		},
	
		elmsByTag : function (tag) {
			if (document.evaluate) {
				DOMAssistant.elmsByTag = function (tag) {
					var returnElms = new HTMLArray();
					var xPathNodes = document.evaluate(".//" + ((typeof tag === "string")? tag : "*"), this, null, 0, null);
					var node = xPathNodes.iterateNext();
					while(node) {
						returnElms.push(node);
						node = xPathNodes.iterateNext();
					}
					return returnElms;
				};
			}
			else {			
				DOMAssistant.elmsByTag = function (tag) {
					var returnElms = new HTMLArray();
					var elmsWithTag = this.getElementsByTagName(tag);
					for (var i=0, il=elmsWithTag.length; i<il; i++) {
						returnElms.push(elmsWithTag[i]);
					}
					return returnElms;
				};
			}
			return DOMAssistant.elmsByTag.call(this, tag);
		}
	};	
}();
DOMAssistant.initCore();