#!/bin/bash


check_jq()
{
    if ! [ -x "$(command -v jq)" ]; then
        echo '[x] Error: jq is not installed in your system !' >&2
        echo "[x] Please install it manually > https://stedolan.github.io/jq/download/"
        exit 1
    fi
}


save()
{
    echo "[?] Save this script locally ?"
    echo -n "[-] Choice : "
    read saveVAR

    if [ $saveVAR == "y" ] || [ $saveVAR == "yes" ] 
    then
        echo $"$content" > "${title}.sh"
        echo "[+] ${title}.sh saved locally !"
    fi
}


execute()
{
    content=$(echo $result | jq -r '.result.content')
    title=$(echo $result | jq -r '.result.title')

    echo "- - - - - - - - - - - - - - -"
    eval $"$content"
    echo "- - - - - - - - - - - - - - -"
    save
    echo "Thanks for using b4sh."
}


main()
{
    echo "[+] b4sh started..."
    echo "[-] Getting $1..."

    # result=$(curl -L -s "b4sh.co/api/b/r/${1}")
    result=$(curl -L -s "http://127.0.0.1:4352/api/b/r/${1}")

    # We check if jq is installed
    check_jq

    # we get the status-code of the request
    code=$(echo $result | jq -r '.code')

    if [[ $code -eq 200 ]] 
    then
        execute
    else
        # We print the reason why the request failed
        reason=$(echo $result | jq -r '.reason')
        echo "[x] ${reason}."
    fi
    exit 1
}

# We execute the main method
main $1
