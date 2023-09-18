#!/bin/bash

echo "Compiling Softypo's Javascript Code..."
esbuild ../app/javascript/custom/softypo.js --bundle --minify --outfile=../app/website/softypo.min.js
esbuild ../app/javascript/custom/softypo.js --bundle  --outfile=../app/javascript/custom/softypo.dev.js
# esbuild ../app/javascript/custom/peaks.js --bundle --minify --outfile=../app/website/peaks.min.js
# esbuild ../app/javascript/custom/peaks.js --bundle  --outfile=../app/javascript/custom/peaks.dev.js
# esbuild ../app/javascript/custom/onepager.js --bundle --minify --outfile=../app/website/onepager.min.js
# esbuild ../app/javascript/custom/onepager.js --bundle  --outfile=../app/javascript/custom/onepager.dev.js

# echo "Compiling Ext libs Javascript Code..."
# esbuild ../app/javascript/custom/ext_libs.js --bundle --outfile=../app/website/ext_libs.min.js

echo "Compiling PDF Javascript Code..."
# esbuild ../app/node_modules/pdfjs-dist/build/pdf.js  --bundle --outfile=../app/website/pdf.js
cp ../app/node_modules/pdfjs-dist/build/pdf.js ../app/website/
cp ../app/node_modules/pdfjs-dist/build/pdf.js.map ../app/website/

echo "Compiling PDF Worker Javascript Code..."
# esbuild ../app/node_modules/pdfjs-dist/build/pdf.worker.js --bundle --outfile=../app/website/pdf.worker.js
cp ../app/node_modules/pdfjs-dist/build/pdf.worker.js ../app/website/
cp ../app/node_modules/pdfjs-dist/build/pdf.worker.js.map ../app/website/

echo "Compiling Tarballjs Javascript Code..."
esbuild ../app/node_modules/tarballjs/tarball.js --outfile=../app/website/tarball.js
# cp ../app/node_modules/tarballjs/tarball.js ../app/website/

echo "CSS..."
cp ../app/styles.css ../app/website/

echo "Images..."
cp ../app/think-peaks.svg ../app/website/
cp -r ../app/images/ ../app/website/
cp ../app/start.png ../app/website/
