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
        console.log("Clicked !");
    }

    constructor(){
        super();

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          this.logMe();
        });

        this.innerHTML = `
            <label class="form-check-label" style="width: -webkit-fill-available;width: -moz-available;">
                <li role='button' class="list-group-item d-flex justify-content-between align-items-center" style="padding-left: 30px;">
                    <input class="form-check-input" id="${this.getThis("id")}" type="checkbox">
                    <span data-toggle="tooltip" 
                        data-placement="top" 
                        title="${this.getThis("version")} | ${this.getThis("os")}" 
                        class="mt-1">${this.getThis("title")}</span>
                    <span class="badge badge-secondary badge-pill">${this.getThis("used_count")}</span>
                </li>
            </label>
        `;
    }
}
window.customElements.define('w-el', Element);
