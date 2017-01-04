function pixelMe(options) {
    if (!options.image) {
        throw new Error('image is not passed in options');
    }
    if (!options.targetElement) {
        throw new Error('targetElement is not passed in options');
    }
    // default options
    var defaults = {
        'image': null,
        'tileWidth': 3,
        'tileHeight': 3,
        'targetElement': null,
        'tileShape': 'circle',
        'opacity': 1,
        'width': null,
        'height': null
    };

    // extend the default options
    function extend(destination, sources) {
        for (var source in sources) {
            if (sources.hasOwnProperty(source)) {
                destination[source] = sources[source];
            }
        }
        return destination;
    };

    function process() {
        // Number of tiles on x & y in integers
        options.divX = Math.floor(options.width / options.tileWidth);
        options.divY = Math.floor(options.height / options.tileHeight);
        var context = getContext();
        tileCanvas(context);
    }

    // returns the 2d context of canvas with image values rendered on it
    function getContext() {
        var canvas = document.createElement('canvas');
        canvas.width = options.tileWidth * options.divX;
        canvas.height = options.tileHeight * options.divY;
        var context = canvas.getContext('2d');
        context.drawImage(options.image, 0, 0, canvas.width, canvas.height);
        return context;
    }

    function tileCanvas(context) {
        // create new canvas to get and work with pixelArray
        var processedCanvas = document.createElement('canvas');
        var width = processedCanvas.width = context.canvas.width;
        processedCanvas.height = context.canvas.height;
        var processedContext = processedCanvas.getContext('2d');
        var originalImageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

        for (var i = 0; i < options.divY; i++) {
            for (var j = 0; j < options.divX; j++) {
                var x = j * options.tileWidth;
                var y = i * options.tileHeight;
                var imagePixels = getImagePixels(x, y, width, originalImageData);
                var averageColor = getAverageColor(imagePixels);
                var color = 'rgba(' + averageColor.r + ',' + averageColor.g + ',' + averageColor.b + ',' + options.opacity + ')';
                processedContext.fillStyle = color;
                render(x, y, processedContext);
            }
        }

        options.targetElement.appendChild(processedCanvas);
    }

    function getImagePixels(startX, startY, width, originalImageData) {
        var data = [];
        var tileWidth = options.tileWidth;
        var tileHeight = options.tileHeight;

        for (var x = startX; x < (startX + tileWidth); x++) {
            var xPos = x * 4;
            for (var y = startY; y < (startY + tileHeight); y++) {
                var yPos = y * width * 4;
                data.push(
                    originalImageData.data[xPos + yPos + 0],
                    originalImageData.data[xPos + yPos + 1],
                    originalImageData.data[xPos + yPos + 2],
                    originalImageData.data[xPos + yPos + 3]
                );
            }
        }
        return data
    }

    function getAverageColor(data) {

        var count = 0,
            rgb = { r: 0, g: 0, b: 0 },
            length = data.length;

        for (var i = 0; i < length; i += 4) {
            ++count;
            rgb.r += data[i];
            rgb.g += data[i + 1];
            rgb.b += data[i + 2];
        }

        rgb.r = Math.floor(rgb.r / count);
        rgb.g = Math.floor(rgb.g / count);
        rgb.b = Math.floor(rgb.b / count);

        return rgb;
    }

    function render(x, y, context) {
        var tileWidth = options.tileWidth;
        var tileHeight = options.tileHeight;
        if (options.tileShape === 'circle') {
            var centerX = x + tileWidth / 2;
            var centerY = y + tileHeight / 2;
            var radius = Math.min(tileWidth, tileHeight) / 2;
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            context.closePath();
            context.fill();
        } else if (options.tileShape === 'rectangle') {
            var height = tileHeight;
            var width = tileWidth;
            context.beginPath();
            context.rect(x, y, width, height);
            context.closePath();
            context.fill();
        }
    }

    options = extend(defaults, options);

    if (options.image.complete) {
        process();
    }

}
