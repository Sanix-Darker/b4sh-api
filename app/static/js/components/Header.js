/**
 * The Web component is just the Header
 *
 * author : s@n1x-d4rk3r
 */
class Header extends HTMLElement {

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
            <nav class="navbar bg-dark navbar-dark">
                <!-- Brand -->
                <div class="container">
                    <a class="navbar-brand" href="#">_b4sh<span style="font-size: 10px;">, The command line manager for humans.</span> </a>
                    <div class="toggle float-right darkk">
                        <input id="switch" class="theme" type="checkbox" name="theme">
                        <label for="switch">Toggle</label>
                        <span id="d-logo"></span>
                </div>
            </nav>
        `;
    }
}
window.customElements.define('w-header', Header);
