#!/bin/bash
kubectl create -f fjbarrena-namespace.yaml
kubectl create -f configmap.yaml -n fjbarrena
kubectl create -f shared-auth-database.yaml -n fjbarrena
kubectl create -f shared-auth-backend.yaml -n fjbarrena
kubectl create -f shared-auth-frontend.yaml -n fjbarrena
