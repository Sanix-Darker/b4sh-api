/**
 * The Web component responsible for the left part of the
 * application with filters
 *
 * author : s@n1x-d4rk3r
 */
class Left extends HTMLElement {

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
            <!-- Web component for filters -->
            <w-filters></w-filters>
            <!-- Web component for filters -->

            <!-- Web component to list my elements -->
            <w-list-el style="max-height: 360px;overflow: auto;display: block;"></w-list-el>
            <!-- Web component to list my elements -->
            <hr>
            <div class="row">
                <div class="col" style="font-size: 10px;">
                    <span class="float-right" >
                        By <a href="https://github.com/sanix-darker" target="_blank">@darker</a>.
                    </span>
                </div>
            </div>
        `;
    }
}
window.customElements.define('w-left', Left);
