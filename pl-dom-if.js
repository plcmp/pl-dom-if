import { PlElement, TemplateInstance, createContext } from "polylib";

class PlDomIf extends PlElement {
    static get properties() {
        return {
            if: { observer: 'ifObserver' }
        }
    }
    constructor() {
        super({ lightDom: true });
    }
    connectedCallback() {
        super.connectedCallback();
        this.style.display = 'none';
        let tpl = this.querySelector('template');
        this.rTpl = tpl.tpl;
        this.oTpl = tpl;
        this._pti = tpl._pti;
        this._hti = tpl._hti;
        this.pctx = tpl._pti?.ctx;
        /* render if condition already true */
        if (this.if) {
            this.render();
        }
    }
    render() {
        let inst = new TemplateInstance(this.rTpl);
        this._ti = inst;
        inst.attach(this, this, this._pti);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._ti.detach();
    }
    ifObserver(condition) {
        if (condition) {
            this.render();
        } else {
            this._ti.detach();
            this._ti = undefined;
        }
    }
}

customElements.define('pl-dom-if', PlDomIf);