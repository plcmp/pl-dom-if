import { PlElement, TemplateInstance } from "polylib";

class PlDomIf extends PlElement {
    static get properties() {
        return {
            if: { type: Boolean, observer: 'ifObserver' }
        }
    }
    constructor() {
        super({ lightDom: true });
    }
    connectedCallback() {
        super.connectedCallback();
        let tplEl = [...this.childNodes].find( n => n.nodeType === document.COMMENT_NODE && n.textContent.startsWith('tpl:'));
        this.sTpl = tplEl?._tpl;
        this._hctx = tplEl?._hctx;
        this.style.display = 'none';
        if (this.if) this.render();
    }
    render() {
        let ti = new TemplateInstance(this.sTpl);
        this._ti = ti;
        ti.attach(null, this, [this,...this._hctx]);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._ti?.detach();
    }
    ifObserver(condition) {
        if (condition) {
            if (!this._ti) this.render();
        } else if(this._ti){
            this._ti.detach();
            this._ti = undefined;
        }
    }
}

customElements.define('pl-dom-if', PlDomIf);