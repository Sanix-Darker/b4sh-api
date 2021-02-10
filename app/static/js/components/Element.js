/**
 * The Web component responsible for each element in the list.
 *
 * author : s@n1x-d4rk3r
 */
class Element extends HTMLElement {

    /**
     * Getters and Setters
    */
    getThis(attr){
        if(this.hasAttribute(attr)){
            return this.getAttribute(attr)
        }else{
            console.log(attr + "not available...")
            return ""
        }
    }

    logMe(){
        // console.log("Clicked !");
    }

    limit_print(str, limit){
        return (str.length > limit) ? str.substring(0,limit) + "..." : str;
    }

    constructor(){
        super();

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          this.logMe();
        });

        this.innerHTML = `
            <label class="form-check-label" style="background: 0;width: -webkit-fill-available;width: -moz-available;">
                <li role='button' class="list-group-item d-flex justify-content-between align-items-center" style="padding-left: 30px;background: 0;">
                    <input class="form-check-input" id="${this.getThis("id")}" type="checkbox">
                    <span data-toggle="tooltip"
                        data-placement="top"
                        title="author: ${this.getThis("author")} | version: ${this.getThis("version")} | OS: ${this.getThis("os")}"
                        class="mt-1" style="font-size: 15px;">${this.limit_print(this.getThis("title"), 15)}</span>
                    <span class="badge badge-secondary badge-pill">${this.getThis("used_count")}</span>
                </li>
            </label>
        `;
    }
}
window.customElements.define('w-el', Element);