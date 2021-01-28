/**
 * The Web component is just the Filters
 *
 * author : s@n1x-d4rk3r
 */
class Filters extends HTMLElement {

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
            <div class="form-group">
                <select class="form-control w-100">
                    <option value="" disabled selected>Filter by</option>
                    <option value="most_used">Most Used</option>
                    <option value="low_used">Low Used</option>
                </select>
                <hr>
                <input type="text" class="form-control" placeholder="Search a b4sh by title here...">
            </div>
            <hr>
            <small>
                <label role="button">
                    <input type="checkbox" id="check_all" /> Check All
                </label>
            </small>
            &nbsp;&nbsp;
            <small>
                <label role="button">
                    <input type="checkbox" id="my_list"/> My List
                </label>
            </small>
            &nbsp;&nbsp;
            <small>
                <label role="button">
                    <input type="checkbox" id="my_list"/> Recently used
                </label>
            </small>
            &nbsp;&nbsp;
            <small></small>
                <label role="button">
                    <input type="checkbox" id="my_list"/> Certified
                </label>
            </small>
            &nbsp;&nbsp;
            <span class="badge badge-primary badge-pill"> 123 Commands</span>
        `;
    }
}
window.customElements.define('w-filters', Filters);
