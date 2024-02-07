#!/bin/bash

curl -X PUT localhost:8080/api/products/0 -d '{ "title": "Test product updated" }' -H "Content-Type: application/json"
