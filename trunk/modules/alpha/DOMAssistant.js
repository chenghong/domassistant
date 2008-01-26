// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
var DOMAssistant = function () {
	var baseMethodsToAdd = [
		"elmsByClass",
		"elmsByAttribute",
		"elmsByTag",
		"each",
		"end",
		"setPrevious"
	];
	var HTMLArray = function (prevSet) {
		// Constructor
	};
	var isOpera = /Opera/i.test(navigator.userAgent); // Hopefully temporary till Opera fixes the XPath implementation
	return {
		elmDoc : (typeof HTMLDocument === "function" || typeof HTMLDocument === "object")? HTMLDocument.prototype : document,
		elmBase : (typeof HTMLElement === "function" || typeof HTMLElement === "object")? HTMLElement.prototype : document.all,
		init : function () {
			this.applyMethod.call(window, "$", this.$);
			window.DOMAssistant = this;
			if (window.ActiveXObject && document.all) {
				HTMLArray = Array;
			}
			HTMLArray.prototype = [];
			HTMLArray.prototype.DOM = this;
			for (var i=0, il=baseMethodsToAdd.length, current; i<il; i++) {
				current = baseMethodsToAdd[i];
				this.addMethods(current, this[current]);
			}
		},
		
		addMethods : function (name, method) {
			this.elmDoc[name] = method;
			this.elmBase[name] = method;
			this.addHTMLArrayPrototype(name, method);
		},
		
		createHTMLArray : function() {
			return new HTMLArray();
		},
		
		addHTMLArrayPrototype : function (name, method) {
			HTMLArray.prototype[name] = function () {
				alert(this.length);
				for (var i=0, il=this.length; i<il; i++) {
					method.apply(this[i], arguments);
				};
				return this;
			};
		},
	
		applyMethod : function (method, func) {
			if (typeof this[method] !== "function") {
				this[method] = func;
			}
		},
	
		$ : function () {
			var elm = null;
			if (document.getElementById) {
				var arg = arguments[0];
				if (typeof arg === "string" && /[\*>\+#\.\[\s\:]/.test(arg)) {
					elm = DOMAssistant.cssSelection(arg);
				}
				else {
					elm = (arguments.length > 1)? new HTMLArray() : null;
					var current;
					for (var u=0, ul=arguments.length; u<ul; u++) {
						current = arguments[u];
						if (typeof current !== "object") {
							current = document.getElementById(current);
						}
						if (arguments.length > 1) {
							elm.push(current);
						}
						else {
							elm = current;
						}
					}
				}
				//alert(elm.elmsByClass);
			}
			return elm;
	    },
	
		cssSelection : function  (cssRule) {
			if (false && document.evaluate && !isOpera) {
				DOMAssistant.cssSelection = function (cssRule) {
					var cssRules = cssRule.replace(/\s*(,)\s*/, "$1").split(",");
					var elm = new HTMLArray();
					var cssSelectors, xPathExpression, cssSelector, splitRule, nextTag, followingElm;
					for (var i=0, il=cssRules.length; i<il; i++) {						
						cssSelectors = cssRules[i].split(" ");
						xPathExpression = ".";
						for (var j=0, jl=cssSelectors.length; j<jl; j++) {
							cssSelector = /^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d+n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[#?\w+(\^|\$|\*)?=?[\w\-\_]+\]+))\))?)*)?(>|\+|~)?/.exec(cssSelectors[j]);
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
										xPathExpression += "[1 and not(preceding-sibling::*)]";
										break;
									case "first-of-type":
										xPathExpression += "[1]";
										break;
									case "last-child":
										xPathExpression += "[last() and not(following-sibling::*)]";
										break;
									case "last-of-type":
										xPathExpression += "[last()]";
										break;
									case "only-child":
										xPathExpression += "[1 and not(preceding-sibling::*) and not(following-sibling::*)]";
										break;
									case "only-of-type":
										xPathExpression += "[count(preceding-sibling::" + splitRule.tag + ") = 0 and position() = last()]";
										break;		
									case "nth-of-type":
										xPathExpression += "[" + pseudoValue + "]";
										break;
									case "nth-last-of-type":
										xPathExpression += "[last() - " + pseudoValue + "]";
										break;
									case "empty":
										xPathExpression += "[count(child::*) = 0 and string-length(text()) = 0]";
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
										var pseudoSelection = "/child::*[position()";
										if (/^\d+$/.test(pseudoValue)) {
											pseudoSelection += " = " + pseudoValue;
										}
										else if (/^odd|even$/.test(pseudoValue)) {
											pseudoSelection += " mod 2 = " + ((pseudoValue === "odd")? 1 : 0);
										}
										else{
											var pseudoSelector = /^(\d+)n((\+|\-)(\d+))?$/.exec(pseudoValue);
											var nthSelector = parseInt(pseudoSelector[1], 10);
											var nOperatorVal = 0;
											if (pseudoSelector[3] && pseudoSelector[4]) {
												nOperatorVal = parseInt((pseudoSelector[3] + pseudoSelector[4]), 10);
												if (nOperatorVal < 0) {
													nOperatorVal = nthSelector + nOperatorVal;
												}
												pseudoSelection += " = " + nOperatorVal + " or ";
											}
											if (nthSelector < nOperatorVal) {
												var nOperatorDiff = ((nOperatorVal - nthSelector) % 2 === 0)? 0 : 1;
												pseudoSelection += ((pseudoSelector[3])? " position()" : "") + " mod " + nthSelector + " = " + nOperatorDiff + " and position() > " + nOperatorVal;
											}
											else if (nOperatorVal === nthSelector) {
												pseudoSelection += ((pseudoSelector[3])? " position()" : "") + " mod " + nthSelector + " = 0";
											}
											else {
												pseudoSelection += ((pseudoSelector[3])? " position()" : "") + " mod " + nthSelector + " = " + nOperatorVal;
											}
										}
										pseudoSelection += "]";
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
					var cssRules = cssRule.replace(/\s*(,)\s*/, "$1").split(",");
					var elm = new HTMLArray();
					var prevElm = new HTMLArray();
					var matchingElms = new HTMLArray();
					var cssSelectors, childOrSiblingRef, nextTag, nextRegExp, refSeparator, refPrevElm, nextSib, refPrevElmFound;
					function addToMatchingElms (item) {
						var exists = false;
						for (var b=0, bl=matchingElms.length; b<bl; b++) {
							if (matchingElms[b] === item) {
								exists = true;
								break;
							}
						}
						if (!exists) {
							matchingElms.push(item);
						}
					}
					function addToPrevElm (item) {
						var exists = false;
						for (var b=0, bl=prevElm.length; b<bl; b++) {
							if (prevElm[b] === item) {
								exists = true;
								break;
							}
						}
						if (!exists) {
							prevElm.push(item);
						}
					}
					function emptyMatchingElms () {
						for (var c=(matchingElms.length-1); c>=0; c--) {
							matchingElms[c] = null;
						}
						matchingElms = new HTMLArray();
					}
					function emptyPrevElm () {
						for (var c=(prevElm.length-1); c>=0; c--) {
							prevElm[c] = null;
						}
						prevElm = new HTMLArray();
					}
					function emptyPrevElmAndAddMatching () {
						if (prevElm !== matchingElms) {
							emptyPrevElm();
							for (var d=0, dl=matchingElms.length; d<dl; d++) {
								addToPrevElm(matchingElms[d]);
							}
							emptyMatchingElms();
						}
					}
					for (var a=0, al=cssRules.length; a<al; a++) {
						cssSelectors = cssRules[a].split(" ");
						emptyPrevElm();
						prevElm.push(DOMAssistant.$(document));
						for (var i=0, il=cssSelectors.length; i<il; i++) {
							var rule = cssSelectors[i];
							childOrSiblingRef = /^(>|\+|~)$/.exec(rule);
							if (childOrSiblingRef) {
								nextTag = /^\w+/.exec(cssSelectors[i+1]);
								if (nextTag) {
									nextRegExp = new RegExp("(^|\\s)" + nextTag + "(\\s|$)", "i");
									refSeparator = childOrSiblingRef[0];
									for (var j=0, jl=prevElm.length, children; j<jl; j++) {
										refPrevElm = prevElm[j];
										if (/\+/.test(refSeparator)) {
											nextSib = refPrevElm.nextSibling;
											if (nextSib) {
												while(nextSib && nextSib.nodeType !== 1 && nextSib.nextSibling) {
													nextSib = nextSib.nextSibling;
												}
												if (nextRegExp.test(nextSib.nodeName)) {
													addToMatchingElms(nextSib);
												}
											}
										}
										else {
											if (/>/.test(refSeparator)) {
												children = refPrevElm.childNodes;
												refPrevElmFound = true;
											}
											else {
												children = refPrevElm.parentNode.childNodes;
												refPrevElmFound = false;
											}
											for (var k=0, kl=children.length, refChild; k<kl; k++) {
												refChild = children[k];
												if (refChild === refPrevElm) {
													refPrevElmFound = true;
													continue;
												}
												if (refPrevElmFound && refChild.nodeType === 1 && nextRegExp.test(refChild.nodeName)) {
													addToMatchingElms(refChild);
												}
											}
										}	
									}
									emptyPrevElmAndAddMatching();
								}
							}
							else {
								var cssSelector = /^(\w+)?(#[\w\-_]+|\*)?((\.[\w\-_]+)*)?((\[\w+(\^|\$|\*)?=?[\w\-\_]+\]+)*)?(((:\w+[\w\-]*)(\((odd|even|\d+n?((\+|\-)\d+)?|\w+|((\w*\.[\w\-_]+)*)?|(\[#?\w+(\^|\$|\*)?=?[\w\-\_]+\]+))\))?)*)?/.exec(rule);
								var splitRule = {
									tag : (!cssSelector[1] || cssSelector[2] === "*")? "*" : cssSelector[1],
									id : (cssSelector[2] !== "*")?  cssSelector[2] : null,
									allClasses : cssSelector[3],
									allAttr : cssSelector[5],
									pseudoClass : cssSelector[10],
									pseudoValue : cssSelector[12]
								};
								var values = "";
								if (i > 0 && /(>|\+|~)/.test(cssSelectors[i - 1])) {
									emptyMatchingElms();
									matchingElms = prevElm;
								}
								else if (splitRule.tag && !splitRule.id) {
									emptyMatchingElms();
									matchingElms = prevElm.elmsByTag(splitRule.tag);
								}
								if (splitRule.id) {
									var idElm = DOMAssistant.$(splitRule.id.replace(/^#/, ""));
									emptyMatchingElms();
									if (idElm) {
										addToMatchingElms(idElm);
									}
								}
								if (splitRule.allClasses) {
									splitRule.allClasses = splitRule.allClasses.replace(/^\./, "").split(".");
									var classTag = (matchingElms.length > 0)? matchingElms : null;
									for (var n=0, nl=splitRule.allClasses.length, matchingClassElms; n<nl; n++) {
										matchingClassElms = prevElm.elmsByClass(splitRule.allClasses[n], classTag);
										if (matchingClassElms.length === 0) {
											break;
										}
									}
									emptyMatchingElms();
									matchingElms = matchingClassElms;									
								}
								if (splitRule.allAttr) {
									splitRule.allAttr = splitRule.allAttr.replace(/(\])(\[)/, "$1 $2").split(" ");
									var attrElms = (matchingElms.length > 0)? matchingElms : null;
									for (var p=0, pl=splitRule.allAttr.length, matchingAttributeElms, attributeMatch, attribute, attrVal, tag, substrMatchSelector; p<pl; p++) {
										matchingAttributeElms = new HTMLArray();
										attributeMatch = /(\w+)(\^|\$|\*)?=?([\w\-_]+)?/.exec(splitRule.allAttr[p]);
										attribute = attributeMatch[1];
										attrVal = attributeMatch[3] || "*";
										tag = (attrElms)? attrElms : null;
										substrMatchSelector = attributeMatch[2] || null;
										matchingAttributeElms = prevElm.elmsByAttribute(attribute, attrVal, tag, substrMatchSelector);
										if (matchingAttributeElms.length === 0) {
											break;
										}
									}
									emptyMatchingElms();
									matchingElms = matchingAttributeElms;
								}
								if (splitRule.pseudoClass) {
									var pseudoClass = splitRule.pseudoClass;
									var pseudoValue = splitRule.pseudoValue;
									var previousMatch = matchingElms;
									matchingElms = new HTMLArray();
									if (/^:not$/.test(pseudoClass)) {
										pseudoValue = pseudoValue.replace(/^\[#([\w\-\_]+)\]$/, "[id=$1]");
										var notTag = /^(\w+)/.exec(pseudoValue);
										var notClass = /\.([\w\-_]+)/.exec(pseudoValue);
										var notAttr = /\[(\w+)(\^|\$|\*)?=?([\w\-_]+)?\]/.exec(pseudoValue);
										var notRegExp = new RegExp("(^|\\s)" + ((notTag)? notTag[1] : (notClass)? notClass[1] : "") + "(\\s|$)", "i");
										if (notAttr) {
											var notMatchingAttr = ("(^|\\s)" + notAttr[1] + "(\\s|$)");
											var notMatchingAttrVal = notAttr[3];
											var substrNoMatchSelector = notAttr[2];
											if (typeof substrNoMatchSelector === "string") {
												switch (substrNoMatchSelector) {
													case "^":
														notMatchingAttrVal = ("^" + notMatchingAttrVal);
														break;
													case "$":
														notMatchingAttrVal = (notMatchingAttrVal + "$");
														break;
													case "*":
														notMatchingAttrVal = (notMatchingAttrVal);
														break;	
												}
											}
											notRegExp = new RegExp(notMatchingAttrVal, "i");
										}
										for (var r=0, rl=previousMatch.length, notElm, addElm; r<rl; r++) {
											notElm = previousMatch[r];
											addElm = null;
											if (notTag && !notRegExp.test(notElm.nodeName)) {
												addElm = notElm;
											}		
											else if (notClass && !notRegExp.test(notElm.className)) {
												addElm = notElm;
											}
											else if (notAttr) {
												if (!notElm.getAttribute(notAttr[1]) || !notRegExp.test(notElm.getAttribute(notAttr[1]))) {
													addElm = notElm;
												}
											}
											if (addElm) {
												addToMatchingElms(addElm);
											}
										}
									}
									else {
										for (var s=0, sl=previousMatch.length, previous, switchMatch, firstLastOnly, nthOfType, childrenNodes, childNodes, elmType, nthPos; s<sl; s++) {
											previous = previousMatch[s];
											if (/enabled|disabled|checked/.test(pseudoClass)) {
												if ((/enabled/.test(pseudoClass) && !previous.disabled) || (/disabled/.test(pseudoClass) && previous.disabled) || (/checked/.test(pseudoClass) && previous.checked)) {
													addToMatchingElms(previous);
												}
												continue;
											}
											firstLastOnly = /:(first|last|only)-(child|of-type)/.test(pseudoClass);
											nthOfType = /nth-(last-)?of-type/.test(pseudoClass);
											childrenNodes = (firstLastOnly || nthOfType)? previous.parentNode.childNodes : previous.childNodes;
											if (/empty/.test(pseudoClass) && childrenNodes.length === 0) {
												addToMatchingElms(previous);
												continue;
											}
											childNodes = [];
											elmType = new RegExp((("of-type")? ("(^|\\s)" + splitRule.tag + "(\\s|$)") : "."), "i");
											for (var t=0, tl=childrenNodes.length, currentChild; t<tl; t++) {
												currentChild = childrenNodes[t];
												if (currentChild.nodeType === 1 && elmType.test(currentChild.nodeName)) {
													childNodes.push(currentChild);
												}
											}
											if (childNodes.length > 0) {
												if (firstLastOnly) {
													if ((/first-(child|of-type)/.test(pseudoClass) && previous === childNodes[0]) || (/last-(child|of-type)/.test(pseudoClass) && previous === childNodes[childNodes.length - 1]) || (/only-(child|of-type)/.test(pseudoClass) && childNodes.length === 1)) {
														var isRightElm = true;
														if (/(first|last|only)-child/.test(pseudoClass)) {
															var childNode = (/first/.test(pseudoClass))? childNodes[0] : childNodes[childNodes.length - 1];
															var sibling;
															if (/first/.test(pseudoClass)) {
																sibling = childNode.previousSibling;
																while (sibling) {
																	if (sibling.nodeType === 1) {
																		isRightElm = false;
																		break;
																	}
																	sibling = sibling.previousSibling;
																}
															}
															else if (/last/.test(pseudoClass)) {
																sibling = childNode.nextSibling;
																while (sibling) {
																	if (sibling.nodeType === 1) {
																		isRightElm = false;
																		break;
																	}
																	sibling = sibling.nextSibling;
																}
															}
															else {
																sibling = childNode.previousSibling;
																while (sibling) {
																	if (sibling.nodeType === 1) {
																		isRightElm = false;
																		break;
																	}
																	sibling = sibling.previousSibling;
																}
																if (isRightElm) {
																	sibling = childNode.nextSibling;
																	while (sibling) {
																		if (sibling.nodeType === 1) {
																			isRightElm = false;
																			break;
																		}
																		sibling = sibling.nextSibling;
																	}
																}
															}
														}
														if (isRightElm) {
															addToMatchingElms(previous);
														}
													}
													continue;
												}
												if (nthOfType) {
													nthPos = (/last/i.test(pseudoClass))? ((childNodes.length-1) - pseudoValue) : (pseudoValue - 1);
													if (childNodes[nthPos]) {
														addToMatchingElms(childNodes[nthPos]);
													}
												}
												if (/nth-child/.test(pseudoClass)) {
													var pseudoSelector = /^(odd|even)|(\d+)n((\+|\-)(\d+))?$/.exec(pseudoValue);
													if (/^\d+$/.test(pseudoValue)) {
														addToMatchingElms(childNodes[pseudoValue-1]);
													}
													else if (pseudoSelector) {
														var iteratorStart = (pseudoSelector[1] === "even")? 1 : 0;
														var iteratorAdd = 2;
														var nRepeat = parseInt(pseudoSelector[2], 10);
														if (nRepeat > 0) {
															iteratorAdd = nRepeat;
															var nOperatorVal = parseInt((pseudoSelector[4] + pseudoSelector[5]), 10);
															if (nOperatorVal !== 0) {
																iteratorStart = nOperatorVal - 1;
															}
														}
														for (var u=iteratorStart, ul=childNodes.length; u<ul; u=u+iteratorAdd) {
															if (u < 0) {
																continue;
															}
															addToMatchingElms(childNodes[u]);
														}
													}
												}
											}
										}
									}
								}
								emptyPrevElmAndAddMatching();
							}
						}
						for (var v=0, vl=prevElm.length; v<vl; v++) {
							elm.push(prevElm[v]);
						}
					}
					return elm;
				};		
			}
			return DOMAssistant.cssSelection.call(this, cssRule); 
		},
	
		elmsByClass : function (className, tag) {
			if (document.evaluate && !isOpera) {
				DOMAssistant.elmsByClass = function (className, tag) {
					var returnElms = new HTMLArray();
					var xPathNodes = document.evaluate(".//" + ((typeof tag === "string")? tag : "*") + "[contains(concat(' ', @class, ' '), ' " + className + " ')]", this, null, 0, null);
					var node = xPathNodes.iterateNext();
					while(node) {
						returnElms.push(node);
						node = xPathNodes.iterateNext();
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
			if (document.evaluate && !isOpera) {
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
			if (document.evaluate && !isOpera) {
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
		},
		
		each : function (functionCall) {
			functionCall.call(this);
			return this;
		}
	};	
}();
DOMAssistant.init();