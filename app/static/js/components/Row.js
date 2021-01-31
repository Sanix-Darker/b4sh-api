/**
 * The Web component is for a row in the table of the list
 *
 * author : s@n1x-d4rk3r
 */
class Row extends HTMLElement {

    logMe(){
        // console.log("Clicked !");
    }

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

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          this.logMe();
        });

        this.innerHTML = `
            <tr>
                <td>${this.getThis("title")}</td>
                <td>${this.getThis("description")}</td>
                <td>
                    <div class="row">
                        <div class="col">
                            <i role="button"
                                class="fas fa-copy"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="${this.getThis("command")}" ></i>
                        </div>
                        <div class="col">
                            <i role="button" class="fas fa-eye" data-toggle="modal" data-target="#modal${this.getThis("key")}"></i>

                            <!-- Modal -->
                            <div class="modal fade"
                                id="modal${this.getThis("key")}"
                                tabindex="-1" role="dialog"
                                aria-labelledby="modal${this.getThis("key")}Label"
                                aria-hidden="true" >
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="modal${this.getThis("key")}Label">Modal title</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">${this.getThis("content")}</div>
                                        <div class="modal-footer">
                                            <a type="button"
                                                class="btn btn-primary"
                                                href="${location.hostname + "/" + this.getThis("key")}">Edit</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    }
}
window.customElements.define('w-row', Row);
