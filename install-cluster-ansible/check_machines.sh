#!/bin/bash          
STR="Checking Kubernetes Cluster Machines"
echo $STR    
echo 
echo

machines_ip=( "192.168.16.100" 
              "192.168.16.113" 
              "192.168.16.101"
              "192.168.16.107"
              "192.168.16.105"
              "192.168.16.106"
              "192.168.16.114"
              "192.168.16.115"
              "192.168.16.108"
              "192.168.16.109"
              "192.168.16.110"
              "192.168.16.111" 
              "192.168.16.102"
              "192.168.16.103"
              "192.168.16.112"
              "192.168.16.104" )

for i in "${machines_ip[@]}"
do
   : 
    if ping -c 1 -W 1 $i 2>&1 >/dev/null; then
        tput setaf 2; echo "$i UP"
    else
        tput setaf 1; echo "$i DOWN"
    fi
done

tput sgr0;

