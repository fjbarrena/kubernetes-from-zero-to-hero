#!/bin/bash
kubectl delete -f fjbarrena-namespace.yaml
kubectl delete -f configmap.yaml -n fjbarrena
kubectl delete -f shared-auth-database.yaml -n fjbarrena
kubectl delete -f shared-auth-backend.yaml -n fjbarrena
kubectl delete -f shared-auth-frontend.yaml -n fjbarrena
