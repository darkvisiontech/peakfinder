#!/bin/bash

cat javascript/*.js > javascript/build/combined.js
cat javascript/core/*.js >> javascript/build/combined.js
cat javascript/core/curve_detection/*.js >> javascript/build/combined.js
cat javascript/core/axes/*.js >> javascript/build/combined.js
cat javascript/widgets/*.js >> javascript/build/combined.js
cat javascript/tools/*.js >> javascript/build/combined.js
cat javascript/services/*.js >> javascript/build/combined.js
cat javascript/controllers/*.js >> javascript/build/combined.js