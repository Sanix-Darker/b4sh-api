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
            <small>Copy the generated command and paste it in your terminal !</small>
            
            <kbd style="width: max-content;" class="shadow-sm">
                <span id="co-input">curl -L -s <i></i>/b.sh | bash -s ${this.getThis("id")}</span>
                <input type="text" style="display: none;" id="co-hidden"/>
                <i
                    id="co"
                    data-toggle="tooltip" 
                    data-placement="top"
                    title="Click to copy" 
                    role="button"
                    style="background: white;color: black;"
                    class="shadow-sm p-1 mt-n1 fas fa-copy float-right mr-n3">copy</i>
            </kbd>
            <hr>
            <small>This command will be available and will work as long as the earth is round !</small>
        `;
    }
}
window.customElements.define('w-command', Command);





