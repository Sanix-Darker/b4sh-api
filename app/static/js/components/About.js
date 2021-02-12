/**
 * The Web component is just the Header
 *
 * author : s@n1x-d4rk3r
 */
class About extends HTMLElement {

    constructor(){
        super();

        this.innerHTML = `
            <a href="https://github.com/Sanix-Darker/b4sh-api" target="_blank">b4sh</a> is an OpenSource project,
            created by <a href="https://github.com/sanix-darker" target="_blank">sanix-darker</a> to facilitate
            the compilation of multiple instructions into one line, you can search, create, compose multiple instructions/commands and use it in your terminal !<br><br>

            <h5>How it works</h5>
            For example, instead of running a long list of commands to install Docker on Ubuntu like this :
            <kbd style="font-size:12px;">
                #!/bin/bash<br><br>

                # _title_ : docker<br>
                # _state_ : public<br>
                # _version_ : 0.0.1<br>
                # _description_ : To install Docker in ubuntu<br>
                # _os_ : ubuntu<br><br>

                sudo apt-get remove docker docker-engine docker.io containerd runc<br>
                sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common <br>
                curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -<br>
                sudo apt-key fingerprint 0EBFCD88<br>
                sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" <br><br>

                sudo apt-get update<br>
                sudo apt-get install docker-ce docker-ce-cli containerd.io<br>
                sudo docker run hello-world
            </kbd>
            <br>
            You just have to run this in your terminal :
            <kbd>
                <small>curl -L -s https://b4sh.co/b.sh | bash -s docker_ubuntu_xxxx</small>
            </kbd>
            <hr>

            <h5>How to contribute</h5>
                <ul>
                    <li>
                        By coding, jump to the
                         <a href="https://github.com/Sanix-Darker/b4sh-api" target="_blank">&lt;source code/&gt;</a> and create your issue/PR.
                    </li>
                    <li>
                        By encouraging with donations,
                         <a href="https://ko-fi.com/R6R23GJRO" target="_blank">
                            <img height="30" style="border:0px;height:30px;" src="https://cdn.ko-fi.com/cdn/kofi5.png?v=2" border="0" alt="Buy Us a Coffee at ko-fi.com" />
                        </a>.
                    </li>
                </ul>
            <hr>`;
    }
}
window.customElements.define('w-about', About);
