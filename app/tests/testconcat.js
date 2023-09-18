function _convertToPNG(imageFile) {
    return new Promise((resolve, reject) => {
        // Check if the file is a PDF
        if (imageFile.type === "application/pdf") {
            let reader = new FileReader();
            reader.onload = function () {
                let pdfData = new Uint8Array(reader.result);

                // Load the PDF using pdf.js
                pdfjsLib.getDocument(pdfData).promise.then(function (pdf) {
                    let numPages = pdf.numPages;
                    let canvasList = [];
                    let tempCanvasWidth = 0;
                    let tempCanvasHeight = 0;

                    // Load each page and create canvases
                    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
                        pdf.getPage(pageNumber).then(function (page) {
                            let viewport = page.getViewport({ scale: 1.0 });
                            let canvas = document.createElement("canvas");
                            canvas.width = viewport.width;
                            canvas.height = viewport.height;
                            canvasList.push(canvas);
                            tempCanvasWidth = Math.max(tempCanvasWidth, canvas.width);
                            tempCanvasHeight += canvas.height;

                            let canvasContext = canvas.getContext("2d");
                            let renderContext = {
                                canvasContext: canvasContext,
                                viewport: viewport
                            };
                            page.render(renderContext).promise.then(function () {
                                // All pages are rendered
                                if (canvasList.length === numPages) {
                                    let stackedCanvas = document.createElement("canvas");
                                    stackedCanvas.width = tempCanvasWidth;
                                    stackedCanvas.height = tempCanvasHeight;
                                    let stackedContext = stackedCanvas.getContext("2d");
                                    let currentY = 0;

                                    // Draw each page on the stacked canvas
                                    canvasList.forEach(function (canvas) {
                                        stackedContext.drawImage(canvas, 0, currentY);
                                        currentY += canvas.height;
                                    });

                                    // Convert stacked canvas to PNG
                                    let imageURL = stackedCanvas.toDataURL('image/png');
                                    let bstr = atob(imageURL.split(',')[1]);
                                    let n = bstr.length;
                                    let u8arr = new Uint8Array(n);
                                    while (n--) {
                                        u8arr[n] = bstr.charCodeAt(n);
                                    }
                                    resolve(new File([u8arr], imageFile.name + ".png", {
                                        type: 'image/png',
                                        encoding: 'utf-8',
                                    }));
                                }
                            });
                        });
                    }
                });
            };
            reader.readAsArrayBuffer(imageFile);
        } else if (imageFile.type.match("image.*")) {
            // Handle image files as before
            // ...
        } else {
            reject();
        }
    });
}