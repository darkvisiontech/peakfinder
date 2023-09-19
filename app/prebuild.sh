#!/bin/bash

echo "Compiling Softypo's Javascript Code..."
esbuild ../app/javascript/custom/softypo.js --bundle --minify --outfile=../app/website/softypo.min.js
esbuild ../app/javascript/custom/softypo.js --bundle  --outfile=../app/javascript/custom/softypo.dev.js

echo "Compiling PDF Javascript Code..."
cp ../app/node_modules/pdfjs-dist/build/pdf.js ../app/website/
cp ../app/node_modules/pdfjs-dist/build/pdf.js.map ../app/website/

echo "Compiling PDF Worker Javascript Code..."
cp ../app/node_modules/pdfjs-dist/build/pdf.worker.js ../app/website/
cp ../app/node_modules/pdfjs-dist/build/pdf.worker.js.map ../app/website/

echo "Compiling Tarballjs Javascript Code..."
esbuild ../app/node_modules/tarballjs/tarball.js --outfile=../app/website/tarball.js

echo "CSS..."
cp ../app/styles.css ../app/website/

echo "Images..."
cp ../app/think-peaks.svg ../app/website/
cp -r ../app/images/ ../app/website/
cp ../app/start.png ../app/website/
