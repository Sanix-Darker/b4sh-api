#!/bin/bash

VERSION=0.0.1

exit_b4sh()
{
    echo "[-] Thanks for using b4sh."
    exit 1
}

check_jq()
{
    if ! [ -x "$(command -v jq)" ]; then
        echo '[x] Error: jq is not installed in your system !' >&2
        echo "[x] Please install it manually > https://stedolan.github.io/jq/download/"
        
        echo $"$1" > "${2}.sh"
        echo "[+] ${2}.sh saved locally !"
        echo "[-] However the script ${2}.sh have been saved localy !"

        exit_b4sh
    fi
}


save()
{
    echo "[?] Save this script locally ?"
    echo -n "[-] Choice (y/n): "
    read saveVAR

    if [ $saveVAR == "y" ] || [ $saveVAR == "yes" ] || [ $saveVAR == "Y" ] || [ $saveVAR == "YES" ] 
    then
        echo $"$content" > "${key}.sh"
        echo "[+] ${key}.sh saved locally !"
    fi
}


run()
{
    echo "- - - - - - - - - - - - - - -"
    eval $"$1"
    echo "- - - - - - - - - - - - - - -"
}


execute()
{
    # We run the command
    run $"$content"

    # We try to save it
    save
    # Then we exit
    exit_b4sh
}


check_local_execute()
{
    if [[ -f "${1}.sh" ]]
    then
        echo "[?] Oh, this b4sh exist locally."
        echo -n "[?] Execute it (y/n) :"

        read choi 
        if [ $choi == "y" ] || [ $choi == "yes" ] || [ $choi == "Y" ] || [ $choi == "YES" ] 
        then
            echo "[-] Executing the local version..."

            run "$(cat ${1}.sh)"

            exit_b4sh
        else
            echo "[+] Getting the online version..."
        fi
    fi
}


main()
{
    echo "[+] b4sh v_${VERSION} started..."
    echo "[-] Processing $1..."
    # We check if the script exist locally
    # and propose to execute it
    check_local_execute $1

    # result=$(curl -L -s "b4sh.co/api/b/r/${1}")
    result=$(curl -L -s "http://127.0.0.1:4352/api/b/r/${1}")

    content=$(echo $result | jq -r '.result.content')
    title=$(echo $result | jq -r '.result.title')
    description=$(echo $result | jq -r '.result.title')
    key=$(echo $result | jq -r '.result.key')

    # We check if jq is installed
    # if not we return an error but give the shell script
    check_jq $content $key

    # we get the status-code of the request
    # and check if it's 200
    if [[ $(echo $result | jq -r '.code') -eq 200 ]] 
    then
        execute
    else
        # We print the reason why the request failed
        reason=$(echo $result | jq -r '.reason')
        echo "[x] ${reason}."
    fi
    exit_b4sh
}

# We execute the main method
main $1
