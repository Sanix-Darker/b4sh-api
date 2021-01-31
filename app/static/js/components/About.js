/**
 * The Web component is just the Header
 *
 * author : s@n1x-d4rk3r
 */
class About extends HTMLElement {

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
            <h1>About</h1>
                <a href="https://github.com/Sanix-Darker/b4sh-api" target="_blank">b4sh</a> is an OpenSource project,
                created by <a href="https://github.com/sanix-darker" target="_blank">sanix-darker</a> to facilitate
                the compilation of multiple instructions into one line.<br>
                You can search, create, compose bashs commands and use it in your terminal !<br><br>
                For example, instead of running theese commands to install Docker on Ubuntu :
                <kbd style="font-size:12px;">
                    sudo apt-get remove docker docker-engine docker.io containerd runc<br>
                    sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common <br>
                    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -<br>
                    sudo apt-key fingerprint 0EBFCD88<br>
                    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" <br>

                    sudo apt-get update<br>
                    sudo apt-get install docker-ce docker-ce-cli containerd.io<br>
                    sudo docker run hello-world<br>
                </kbd>
                <br>
                You just have to run this in your terminal :
                <kbd>
                    curl -L -s 0.0.0.0/b.sh | bash -s docker_ubuntu_1swdaad
                </kbd>
            <hr>

            <h5>How to contribute</h5>
                <ul>
                    <li>Create an issue where you explain clearly everything.</li>
                    <li>Make a Pull Request.</li>
                    <li>If it's relevant, we're going to merge it. Yeah, it's simple as this !</li>
                </ul>
            <hr>

            <h5>Help Us</h5>
            <a href="https://ko-fi.com/R6R23GJRO" target="_blank">
                <img height="36" style="border:0px;height:36px;" src="https://cdn.ko-fi.com/cdn/kofi5.png?v=2" border="0" alt="Buy Us a Coffee at ko-fi.com" />
            </a>
        `;
    }
}
window.customElements.define('w-about', About);
