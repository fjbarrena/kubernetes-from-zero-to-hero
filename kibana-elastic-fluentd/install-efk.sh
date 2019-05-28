#!/bin/bash
kubectl create -f logging-namespace.yaml
kubectl create -f elasticsearch.yaml -n logging
kubectl create -f kibana.yaml -n logging
kubectl create -f fluentd-rbac.yaml
kubectl create -f fluentd-daemonset.yaml