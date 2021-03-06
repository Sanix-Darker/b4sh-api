/**
 * The Web component is just the Command
 *
 * author : s@n1x-d4rk3r
 */
class Command extends HTMLElement {

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

    constructor(){
        super();

        this.innerHTML = `
            <kbd class="shadow-sm" style="padding: .4rem!important;">
                <small id="co-input">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </small>
                <input type="text" style="display: none;" id="co-hidden"/>
                <i
                    id="co"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Click to copy"
                    role="button"
                    style="background: white;color: black;"
                    class="shadow-sm p-1 mt-n1 fas fa-copy float-right mr-n1">Copy</i>
            </kbd>
        `;
    }
}

window.customElements.define('w-command', Command);

