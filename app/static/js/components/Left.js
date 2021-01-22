/**
 * The Web component responsible for the left part of the
 * application with filters
 *
 * author : s@n1x-d4rk3r
 */
class Left extends HTMLElement {

    logMe = () => {
        console.log("Clicked !");
    }

    constructor(){
        super();

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          this.logMe();
        });

        this.innerHTML = `
            <div class="form-group">
                <select class="form-control w-100">
                    <option value="" disabled selected>Filter by</option>
                    <option value="most_used">Most Used</option>
                    <option value="low_used">Low Used</option>
                    <option value="mylist">My List</option>
                </select>
                <hr>
                <input type="text" class="form-control" placeholder="Search a b4sh by title here...">
            </div>
            <hr>

            <!-- Web component to list my elements -->
            <w-list-el></w-list-el>

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
