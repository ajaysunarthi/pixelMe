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
        console.log(context);
    }

    function getContext() {
        var canvas = document.createElement('canvas');
        canvas.width = options.tileWidth * options.divX;
        canvas.height = options.tileHeight * options.divY;
        var context = canvas.getContext('2d');
        context.drawImage(options.image, 0, 0, canvas.width, canvas.height);
        return context;
    }

    options = extend(defaults, options);

    if (options.image.complete) {
        process();
    }

}
