/**
 * The Web component responsible for the right part of the
 * application with filters
 *
 * author : s@n1x-d4rk3r
 */
class Right extends HTMLElement {

    constructor(){
        super();

        this.innerHTML = `
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#home">EDITOR</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" id="about-button" href="#about">HELP/ABOUT</a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane container active p-0 pl-3 pt-2" id="home">
                    <div style="text-align: left;" class="col">
                        <b id="b4sh-id"></b>
                    </div>
                    <div style="text-align: right;" class="col">
                        <span class="btn" role="button" style="background: white;display: inline!important;" id="clean_editor">CLEAN</span>
                        <span class="btn btn-secondary" role="button" style="display: inline!important;" id="new_b4sh">NEW B4SH</span>
                    </div>

                    <div id="editor_wrapper" class="app_editor_wrapper">
                        <div class="row">
                            <div class="col-2 p-0" id="list-tags">
                                <!-- A web component for listing tags -->
                                <w-tags tags=""></w-tags>
                                <!-- A web component for listing tags -->
                            </div>
                            <div class="col">
                                <!-- Web component for the Editor (&#13; is for a new line)-->
                                <w-editor content=""></w-editor>
                                <!-- Web component for the Editor (&#13; is for a new line)-->
                                <hr>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-9">
                                <!-- The web component for the compressed command -->
                                <w-command id="command_box" key="hello_world_234dde"></w-command>
                                <!-- The web component for the compressed command -->
                            </div>
                            <div class="col">
                                <button class="btn btn-primary float-right"
                                        title="Edit the content in the editor and hit this button !"
                                        id="gen" disabled onclick="generate()">
                                &#x27F3; GENERATE
                                </button>
                            </div>
                        </div>
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
