// Peak finder script.

import { gsd } from 'ml-gsd';
import { v4 as generateID } from '@lukeed/uuid';
window.generateID = generateID

var softypo = softypo || {};

// Peak finder main function
softypo.peakfinder = (function () {

    function run_peaks() {
        // common parametters
        var peakalgo = document.getElementById('peak-algo').value;
        var minPeakDistance = parseFloat(document.getElementById('min-peak-distance').value);
        var maxCriteria = document.getElementById('criteria').value == 'valleys' ? false : true;
        var peakson = document.getElementById('peaks-on').value;

        // Local Maxima parameters
        var minPeakHeight = parseFloat(document.getElementById('min-peak-height').value);

        // Savitzky-Golay filter parametters
        var minMaxRatio = parseFloat(document.getElementById('minMaxRatio').value);
        var windowSize = parseInt(document.getElementById('win-size').value); // Must be an odd number
        var degree = parseInt(document.getElementById('degree').value);     // Polynomial degree
        var realTopDetection = document.getElementById('top').value == 'no' ? false : true;
        var smooth = document.getElementById('smooth').value == 'no' ? false : true;

        // data
        var pixeldataset = wpd.tree.getActiveDataset();
        wpd.plotDataProvider.setDataSource(pixeldataset);
        window.bckdts = window.peaksflag != pixeldataset.id ? Object.assign({}, wpd.plotDataProvider.getData()) : window.bckdts;
        window.peaksflag = pixeldataset.id;
        var rawdataset = window.bckdts.rawData.slice(0);
        rawdataset = dropdupsort(rawdataset, peakson);
        if (peakson == 'X') {
            var ref = rawdataset.map(x => x[1]);
            var sig = rawdataset.map(x => x[0]);
        }
        else {
            var ref = rawdataset.map(x => x[0]);
            var sig = rawdataset.map(x => x[1]);
        }
        // console.log('peaks_filtered 1:', { x: ref, y: sig });

        if (peakalgo == 'Local Maxima') {
            var peaks = maxCriteria == true ? findPeaks(ref, sig, minPeakHeight) : findValleys(ref, sig, minPeakHeight);
        }
        else if (peakalgo == 'Savitzky-Golay') {
            var peaks = gsd({ x: ref, y: sig }, {
                minMaxRatio: minMaxRatio, // Threshold to determine if a given peak should be considered as a noise
                realTopDetection: realTopDetection, // Correction of the x and y coordinates using a quadratic optimizations
                maxCriteria: maxCriteria, // Are we looking for maxima or minima
                smoothY: smooth, // should we smooth the spectra and return smoothed peaks ? Default false.
                sgOptions: { windowSize: windowSize, polynomial: degree }, // Savitzky-Golay smoothing parameters for first and second derivative calculation
            });
        }

        // console.log('peaks_filtered 1:', peaks);

        peaks = distancefilter(peaks, minPeakDistance);
        // console.log('peaks_filtered 2:', peaks);

        if (peakson == 'X') { x = peaks.map(({ y }) => y); y = peaks.map(({ x }) => x); }
        else { x = peaks.map(({ x }) => x); y = peaks.map(({ y }) => y); }

        pixeldataset.clearAll();
        for (i = 0; i < peaks.length; i++) {
            addDataPoint(x[i], y[i]);
        }
        pixeldataset.peaksOn = peakson;

        // The following two lines are simply to update the GUI:
        wpd.graphicsWidget.forceHandlerRepaint();
        wpd.dataPointCounter.setCount(peaks.length);
    }

    function findPeaks(x, y, minPeakHeight) {
        if (!Array.isArray(y) || y.length === 0) {
            return [];
        }

        const filteredArr = [];
        const lastindex = y.length - 1

        for (let i = 1; i < lastindex; i++) {
            if (
                y[i] > y[i - 1] &&         // Check if higher than left neighbor
                y[i] >= y[i + 1] &&         // Check if higher than right neighbor
                y[i] >= minPeakHeight          // Check against minimum peak height
            ) {
                // Identify the peak's left and right boundaries
                let leftIndex = i;
                while (leftIndex > 0 && y[leftIndex - 1] <= y[leftIndex]) {
                    leftIndex--;
                }

                let rightIndex = i;
                while (rightIndex < lastindex && y[rightIndex + 1] <= y[rightIndex]) {
                    rightIndex++;
                }

                // Calculate peak width
                const peakWidth = Math.max(x[rightIndex], x[leftIndex]) - Math.min(x[rightIndex], x[leftIndex])

                // push values to return
                filteredArr.push({ index: i, x: x[i], y: y[i], width: peakWidth });

            }
        }
        return filteredArr;
    }

    function findValleys(x, y, minPeakHeight) {
        if (!Array.isArray(y) || y.length === 0) {
            return [];
        }

        const filteredArr = [];
        const lastindex = y.length - 1

        for (let i = 1; i < lastindex; i++) {
            if (
                y[i] < y[i - 1] &&         // Check if higher than left neighbor
                y[i] <= y[i + 1] &&         // Check if higher than right neighbor
                y[i] <= minPeakHeight          // Check against minimum peak height
            ) {
                // Identify the peak's left and right boundaries
                let leftIndex = i;
                while (leftIndex < 0 && y[leftIndex - 1] >= y[leftIndex]) {
                    leftIndex--;
                }

                let rightIndex = i;
                while (rightIndex < lastindex && y[rightIndex + 1] >= y[rightIndex]) {
                    rightIndex++;
                }

                // Calculate peak width
                const peakWidth = Math.max(x[rightIndex], x[leftIndex]) - Math.min(x[rightIndex], x[leftIndex])

                // push values to return
                filteredArr.push({ index: i, x: x[i], y: y[i], width: peakWidth });

            }
        }
        return filteredArr;
    }

    function distancefilter(inputArray, minPeakDistance) {
        if (!Array.isArray(inputArray) || inputArray.length === 0) {
            return [];
        }

        const filteredArr = [inputArray[0]]; // The first element is always included

        for (let i = 1; i < inputArray.length; i++) {
            const currentX = inputArray[i].x;
            const prevX = filteredArr[filteredArr.length - 1].x;
            // Check if the x-spacing is greater than or equal to minPeakDistance
            if (currentX - prevX >= minPeakDistance) {
                filteredArr.push(inputArray[i]);
            }
        }

        return filteredArr;
    }

    function addDataPoint(x, y) {
        // This method adds a single point to the curent dataset
        let dataset = wpd.tree.getActiveDataset();
        let axes = wpd.appData.getPlotData().getAxesForDataset(dataset);
        let dataPx = axes.dataToPixel(x, y);
        dataset.addPixel(dataPx.x, dataPx.y);
    }

    function dropdupsort(arr, key) {
        const seen = new Set();
        const result = [];

        for (const item of arr) {
            const value = key === 'Y' ? item[0] : item[1];

            if (!seen.has(value)) {
                result.push(item);
                seen.add(value);
            }
        }

        // Sort the result array based on the specified key
        result.sort((a, b) => (key === 'Y' ? a[0] - b[0] : a[1] - b[1]));

        return result;
    }

    return {
        run_peaks: run_peaks
    };

})();

softypo.listeners = (function () {

    function w_updateSliderLabel(value) {
        // console.log('2', wpd.tree.getActiveDataset()._dataPoints)
        const w_slider = document.getElementById("win-slider");
        const w_sliderLabel = document.getElementById("win-size");
        if (value) {
            w_slider.value = value;
            w_sliderLabel.value = value;
        }
        else {
            // Get max range based on data lenght
            const dlenght = wpd.tree.getActiveDataset()._dataPoints.length > 1 ? wpd.tree.getActiveDataset()._dataPoints.length : 200;
            const maxrange = dlenght < 10000 ? 625 : dlenght > 10000 ? parseInt(dlenght / 16) : dlenght > 1000 ? parseInt(dlenght / 4) : dlenght > 100 ? parseInt(dlenght / 2) : parseInt(dlenght - 1);
            const step = dlenght > 1000 ? 4 : 2;

            w_slider.min = 5;
            w_slider.max = maxrange; // Adjust max value as needed
            w_slider.step = step;  // Use step of 2 to select only odd numbers

        }
    }

    function w_updateSliderFromInput() {
        const w_sliderLabel = document.getElementById("win-size");
        let w_newvalue = parseInt(w_sliderLabel.value);

        // Ensure the new value is an odd number between 5 and 50
        if (isNaN(w_newvalue) || w_newvalue < 5) {
            w_newvalue = 5;
            // } else if (w_newvalue > 49) {
            //     w_newvalue = 49;
        } else if (w_newvalue % 2 === 0) {
            w_newvalue--;
        }

        const w_slider = document.getElementById("win-slider");
        w_slider.value = w_newvalue;
        w_sliderLabel.value = w_newvalue;
    }

    function w_initSlider() {
        const w_slider = document.getElementById("win-slider");
        const w_sliderLabel = document.getElementById("win-size");

        w_slider.min = 5;
        w_slider.max = 200; // Adjust max value as needed
        w_slider.step = 2;  // Use step of 2 to select only odd numbers

        w_slider.addEventListener("input", () => {
            softypo.listeners.w_updateSliderLabel(w_slider.value);
        });

        w_sliderLabel.addEventListener("input", () => {
            softypo.listeners.w_updateSliderFromInput();
        });
        softypo.listeners.w_updateSliderLabel(w_slider.value);
    }

    function d_updateSliderLabel(value) {
        const d_slider = document.getElementById("deg-slider");
        d_slider.value = value;

        const d_sliderLabel = document.getElementById("degree");
        d_sliderLabel.value = value;
    }

    function d_updateSliderFromInput() {
        const d_sliderLabel = document.getElementById("degree");
        let d_newvalue = parseInt(d_sliderLabel.value);

        // Ensure the new value is an odd number between 5 and 100
        if (isNaN(d_newvalue) || d_newvalue < 2) {
            d_newvalue = 2;
        } else if (d_newvalue > 5) {
            d_newvalue = 5;
        }

        const d_slider = document.getElementById("deg-slider");
        d_slider.value = d_newvalue;
        d_sliderLabel.value = d_newvalue;
    }

    function d_initSlider() {
        const d_slider = document.getElementById("deg-slider");
        const d_sliderLabel = document.getElementById("degree");

        d_slider.min = 2;
        d_slider.max = 5; // Adjust max value as needed
        d_slider.step = 1;  // Use step of 1 to select only odd numbers

        d_slider.addEventListener("input", () => {
            softypo.listeners.d_updateSliderLabel(d_slider.value);
        });

        d_sliderLabel.addEventListener("input", () => {
            softypo.listeners.d_updateSliderFromInput();
        });

        softypo.listeners.d_updateSliderLabel(d_slider.value);
    }

    // Function to toggle between peak algos
    function showgsd() {
        document.getElementById('peak-algo').addEventListener('change', function () {
            if (this.value == 'Local Maxima') {
                document.getElementById('gsdparams').hidden = true;
                document.getElementById('lmparams').hidden = false;
            }
            else if (this.value == 'Savitzky-Golay') {
                document.getElementById('gsdparams').hidden = false;
                document.getElementById('lmparams').hidden = true;
            }
        });
    }

    return {
        showgsd: showgsd,
        w_updateSliderLabel: w_updateSliderLabel,
        w_updateSliderFromInput: w_updateSliderFromInput,
        w_initSlider: w_initSlider,
        d_updateSliderLabel: d_updateSliderLabel,
        d_updateSliderFromInput: d_updateSliderFromInput,
        d_initSlider: d_initSlider,
    };

})();

softypo.onepager = (function () {

    function run() {
        wpd.busyNote.show();
        pagemanager = wpd.appData.getPageManager()

        // Define the page range you want to stack
        const startPage = parseInt(document.getElementById('min-page').value);  // Specify the starting page
        const endPage = parseInt(document.getElementById('max-page').value);    // Specify the ending page
        const scale = parseFloat(document.getElementById('scale-page').value); // Adjust scale as needed

        convertPdfToPng(startPage, endPage, scale)
            .then((pngDataUrl) => {
                console.log('PDF converted to PNG successfully');
                wpd.messagePopup.show('Turn 1pager', 'Check your "Downloads" folder for a file called "stacked_pages.png"');
                // wpd.imageManager.load1p(pngDataUrl);
                // _newLoad = true;
                // let metadata = {
                //     type: "image/png"
                // };
                // let file = new File([pngDataUrl], "test.png", metadata);
                // wpd.imageManager.initializeFileManager([file]);
                // wpd.appData.setPageManager(null);
                // wpd.imageManager.loadFromFile(file);
                // const pngStream = canvas.createPNGStream();
                // const pngOutput = createWriteStream(outputPath);
                // pngStream.pipe(pngOutput);

                // // Create a download link for the PNG image
                const downloadLink = document.createElement('a');
                downloadLink.href = pngDataUrl;
                downloadLink.download = 'stacked_pages.png';
                downloadLink.click();
                wpd.busyNote.close();
            })
            .catch((error) => {
                wpd.busyNote.close();
                wpd.messagePopup.show('Turn 1pager', 'Error converting PDF to PNG');
                console.error('Error converting PDF to PNG:', error);
            });

    }

    async function convertPdfToPng(startPage, endPage, scale) {
        const pdfData = await wpd.appData.getFileManager().files[0].arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let currentY = 0;


        let totalHeight = 0;
        for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale });
            totalHeight += viewport.height;
        }
        if (totalHeight > 32700) {
            scale = (32700 * scale) / totalHeight;
            totalHeight = 0;
            for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale });
                totalHeight += viewport.height;
            }
        }

        const pageWidth = await pdf.getPage(startPage).then(page => page.getViewport({ scale }).width);

        console.log('scale: ', scale)

        canvas.width = pageWidth;
        canvas.height = totalHeight;

        for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale });
            const canvasPage = document.createElement('canvas');
            const ctxPage = canvasPage.getContext('2d');
            canvasPage.width = viewport.width;
            canvasPage.height = viewport.height;
            await page.render({ canvasContext: ctxPage, viewport }).promise;
            ctx.drawImage(canvasPage, 0, currentY);
            currentY += viewport.height;
        }

        // Convert the canvas to a data URL
        const pngDataUrl = canvas.toDataURL('image/png');
        return pngDataUrl;
    }

    return {
        run: run,
    };

})();

window.softypo = softypo;
window.onload = function () {
    softypo.listeners.showgsd();
    softypo.listeners.d_initSlider();
    softypo.listeners.w_initSlider();
};
