/**
 * The Web component of the root app
 *
 * author : s@n1x-d4rk3r
 */
class App extends HTMLElement {

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
            <!-- Web component For my Header -->
            <w-header></w-header>
            <!-- Web component For my Header -->
            
            <div class="container mt-3">
                <div class="row" >
            
                    <div class="col-3">
                        <!-- Web component for the left part of the page -->    
                        <w-left></w-left> 
                        <!-- Web component for the left part of the page -->    
                    </div>
            
                    <div class="col">
                        <!-- Web component for the right part of the page -->    
                        <w-right></w-right> 
                        <!-- Web component for the right part of the page -->    
                    </div>
                </div>
            </div>
        `;
    }
}
window.customElements.define('w-app', App);
