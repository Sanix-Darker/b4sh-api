/**
 * The Web component responsible for the list of elements.
 *
 * author : s@n1x-d4rk3r
 */

class ListElements extends HTMLElement {

    logMe(){
        console.log("Clicked !");
    }

    getElements(){
        return [
            {
                "id": "apache2_debian_46487",
                "title": "Apache2 debian",
                "content": "echo 'Test !'",
                "hash": "f1899d142cb91ed98058d1f3",
                "author": "d4rk3r",
                "date": "2020-12-07 16:56:44.931259",
                "used_count": 13,
                "version": "0.0.3",
                "os": "Debian or Ubuntu"
            },
            {
                "id": "Other_stuff_46487",
                "title": "Nyama stuff",
                "content": "echo 'Others !'",
                "hash": "10jdje44tddssskodkendnns",
                "author": "markof",
                "date": "2020-12-07 16:56:44.931259",
                "used_count": 7,
                "version": "0.2.0",
                "os": "Fedora"
            },            {
                "id": "apache2_debian_46487",
                "title": "Apache2 debian",
                "content": "echo 'Test !'",
                "hash": "f1899d142cb91ed98058d1f3",
                "author": "d4rk3r",
                "date": "2020-12-07 16:56:44.931259",
                "used_count": 13,
                "version": "0.0.3",
                "os": "Debian or Ubuntu"
            },
            {
                "id": "Other_stuff_46487",
                "title": "Nyama stuff",
                "content": "echo 'Others !'",
                "hash": "10jdje44tddssskodkendnns",
                "author": "markof",
                "date": "2020-12-07 16:56:44.931259",
                "used_count": 7,
                "version": "0.2.0",
                "os": "Fedora"
            },            {
                "id": "apache2_debian_46487",
                "title": "Apache2 debian",
                "content": "echo 'Test !'",
                "hash": "f1899d142cb91ed98058d1f3",
                "author": "d4rk3r",
                "date": "2020-12-07 16:56:44.931259",
                "used_count": 13,
                "version": "0.0.3",
                "os": "Debian or Ubuntu"
            },            {
                "id": "apache2_debian_46487",
                "title": "Apache2 debian",
                "content": "echo 'Test !'",
                "hash": "f1899d142cb91ed98058d1f3",
                "author": "d4rk3r",
                "date": "2020-12-07 16:56:44.931259",
                "used_count": 13,
                "version": "0.0.3",
                "os": "Debian or Ubuntu"
            },            {
                "id": "apache2_debian_46487",
                "title": "Apache2 debian",
                "content": "echo 'Test !'",
                "hash": "f1899d142cb91ed98058d1f3",
                "author": "d4rk3r",
                "date": "2020-12-07 16:56:44.931259",
                "used_count": 13,
                "version": "0.0.3",
                "os": "Debian or Ubuntu"
            },            {
                "id": "apache2_debian_46487",
                "title": "Apache2 debian",
                "content": "echo 'Test !'",
                "hash": "f1899d142cb91ed98058d1f3",
                "author": "d4rk3r",
                "date": "2020-12-07 16:56:44.931259",
                "used_count": 13,
                "version": "0.0.3",
                "os": "Debian or Ubuntu"
            }
        ]
    }

    constructor(){
        super();

        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
          this.logMe();
        });

        this.innerHTML = `
            <div class="list-group " style="max-height: 2px;overflow: auto;display: block;">
        `;

        this.getElements().forEach((el) => {
            this.innerHTML += `
            <w-el
                id = "${el.id}" title = "${el.title}"
                content = "${el.content}"
                hash = "${el.hash}"
                date = "${el.date}"
                author = "${el.author}"
                used_count = "${el.used_count}" version = "${el.version}"
                os = "${el.os}"></w-el>`
        });
        this.innerHTML += "</div>";
    }
}
window.customElements.define('w-list-el', ListElements);
