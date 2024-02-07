#!/bin/bash

curl localhost:8080/api/products/ -d @data.json -H "Content-Type: application/json"
