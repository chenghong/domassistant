// Developed by Robert Nyman, code/licensing: http://code.google.com/p/domassistant/, documentation: http://www.robertnyman.com/domassistant
/*extern DOMAssistant */
DOMAssistant.Content = function () {
	return {
		prev : function () {
			var prevSib = this.previousSibling;
			while(prevSib && prevSib.nodeType !== 1) {
				prevSib = prevSib.previousSibling;
			}
			return DOMAssistant.$(prevSib);
		},

		next : function () {
			var nextSib = this.nextSibling;
			while(nextSib && nextSib.nodeType !== 1) {
				nextSib = nextSib.nextSibling;
			}
			return DOMAssistant.$(nextSib);
		},

		create : function (name, attr, append, content) {
			var elm = DOMAssistant.$(document.createElement(name));
			if (attr) {
				elm.setAttributes(attr);
			}
			if (typeof content !== "undefined") {
				elm.addContent(content);
			}
			if (append) {
				DOMAssistant.Content.addContent.call(this, elm);
			}
			return elm;
		},

		setAttributes : function (attr) {	
			for (var i in attr) {
				if (/class/i.test(i)) {
					this.className = attr[i];
				}
				else{
					this.setAttribute(i, attr[i]);
				}	
			}
			return this;
		},

		addContent : function (content) {
			if (typeof content === "string") {
				this.innerHTML += content;
			}
			else{
				this.appendChild(content);
			}
			return this;
		},

		replaceContent : function (newContent) {
			for (var i=(this.childNodes.length - 1), child, attr; i>=0; i--) {
				child = this.childNodes[i];
				attr = child.attributes;
				if (attr) {
					for (var j=0, jl=attr.length; j<jl; j++) {
						if (typeof child[attr[j].name] === "function") {
							child[attr[j].name] = null;
						}
					}
				}
		    	child.parentNode.removeChild(child);
		    }
			DOMAssistant.$(this).addContent(newContent);
			return this;
		},

		remove : function () {
			this.parentNode.removeChild(this);
			return null;
		}
	};
}();
DOMAssistant.attach(DOMAssistant.Content);