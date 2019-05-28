#!/bin/bash

kubectl delete -f mysql-configmap.yaml
kubectl delete -f mysql-services.yaml
kubectl delete -f mysql-statefulset.yaml