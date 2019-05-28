#!/bin/bash
kubectl delete -f logging-namespace.yaml
kubectl delete -f elasticsearch.yaml -n logging
kubectl delete -f kibana.yaml -n logging
kubectl delete -f fluentd-rbac.yaml
kubectl delete -f fluentd-daemonset.yaml