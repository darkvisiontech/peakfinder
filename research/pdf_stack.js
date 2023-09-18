import { readFileSync, createWriteStream } from 'fs';
import { getDocument } from 'pdfjs-dist';
import { createCanvas, Image } from 'canvas';

// Define the page range you want to stack
const startPage = 1;  // Specify the starting page
const endPage = 3;    // Specify the ending page

async function convertPdfToPng(pdfPath, outputPath, startPage, endPage) {
    const pdfData = new Uint8Array(readFileSync(pdfPath));
    const pdf = await getDocument({ data: pdfData });

    let totalHeight = 0;
    const pagePromises = [];

    for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
        const page = await pdf.getPage(pageNum);
        totalHeight += page.getViewport({ scale: 1 }).height;
        pagePromises.push(page);
    }

    const firstPage = pagePromises[0]; // Get the first page for width reference
    const pageWidth = firstPage.getViewport({ scale: 1 }).width;

    const canvas = createCanvas(pageWidth, totalHeight);
    const ctx = canvas.getContext('2d');
    let currentY = 0;

    for (let pageNum = 0; pageNum < pagePromises.length; pageNum++) {
        const page = pagePromises[pageNum];
        const viewport = page.getViewport({ scale: 1 });
        const pageBitmap = await page.render({ canvasContext: ctx, viewport }).promise;
        ctx.drawImage(pageBitmap, 0, currentY);
        currentY += viewport.height;
    }

    // Convert the canvas to a data URL
    const pngDataUrl = canvas.toDataURL('image/png');
    const pngStream = canvas.createPNGStream();
    const pngOutput = createWriteStream(outputPath);
    pngStream.pipe(pngOutput);
}

const inputPdfPath = 'input.pdf';     // Provide your input PDF path
const outputPngPath = 'output.png';   // Provide your output PNG path

convertPdfToPng(inputPdfPath, outputPngPath, startPage, endPage)
    .then(() => {
        console.log('PDF converted to PNG successfully.');
    })
    .catch((error) => {
        console.error('Error converting PDF to PNG:', error);
    });