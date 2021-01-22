#!/bin/bash

VERSION=0.0.1
HOST="http://127.0.0.1:4352"


exit_b4sh()
{
    echo "[-] Thanks for using b4sh."
    exit 1
}

# Ask to see the content before execute it
see_content()
{
    echo "[-] Do you want to see the content ?"
    echo -n "[-] Choice (y/n): "
    read choiX

    if [ $choiX == "y" ] || [ $choiX == "yes" ] || [ $choiX == "Y" ] || [ $choiX == "YES" ]
    then
        $"${1}"
    fi
}


# We check if jq is installed
# if not we return an error but give the shell script
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


# This method just ask
# if yes or no it should save shell script
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


# We check if the script exist locally
# and propose to execute it
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


# THis method will check online
# And get parameters such as title, description...
get_param()
{
    result=$(curl -L -s "${HOST}/api/b/r/${1}")

    content=$(echo $result | jq -r '.result.content')
    title=$(echo $result | jq -r '.result.title')
    description=$(echo $result | jq -r '.result.description')
    key=$(echo $result | jq -r '.result.key')
}


main()
{
    echo "[+] b4sh v_${VERSION} started..."
    if [$1 == ""]
    then
        echo "[x] You need to provide a b4sh-id to proceed..."
        echo "[-] Ex : bash b.sh hello_world1234"
        exit_b4sh
    fi

    echo "[-] Processing $HOST/$1..."

    # We check locally the sh
    check_local_execute $1

    # We get online params
    get_param $1

    # check jq
    check_jq $content $key

    # Proceed depending on status-code
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
