/**
 * The Web component responsible for the right part of the
 * application with filters
 *
 * author : s@n1x-d4rk3r
 */
class Right extends HTMLElement {

    logMe(){
        // console.log("Clicked !");
    }

    constructor(){
        super();

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          this.logMe();
        });

        this.innerHTML = `
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#home">Edit</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#about">About</a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane container active p-0 pl-3 pt-2" id="home">
                    <h4>
                        <i class="mt-1 fas fa-edit"></i> &#x1F589; Editor
                        <span class="float-right">&#x2BB9;</span>
                    </h4>

                    <div id="editor_wrapper" class="app_editor_wrapper">
                        <div class="row">
                            <div class="col-2 border p-0" style="max-height: 300px; overflow: auto;">
                                <!-- A web component for listing tags -->
                                <w-tags tags="HelloWorld"></w-tags>
                                <!-- A web component for listing tags -->
                            </div>
                            <div class="col">
                                <!-- Web component for the Editor (&#13; is for a new line)-->
                                <w-editor content=""></w-editor>
                                <!-- Web component for the Editor (&#13; is for a new line)-->
                            </div>
                        </div>
                    </div>
                    <div class="pb-5 pt-3">
                        <button class="btn btn-primary float-right" id="gen" onclick="generate()">
                        &#x2387; GENERATE
                        </button>
                    </div>

                    <h4>
                        <i class="mt-1 fas fa-download"></i> &#x21A7; Command
                    </h4>

                    <div class="pb-3">
                        <!-- The web component for the compressed command -->
                        <w-command id="helloworld_12wwe"></w-command>
                        <!-- The web component for the compressed command -->
                    </div>
                </div>
                <div class="tab-pane container fade p-0 pt-1" id="about">
                    <w-about></w-about>
                </div>
            </div>
        `;
    }
}
window.customElements.define('w-right', Right);
