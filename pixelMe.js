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

    options = extend(defaults, options);

}