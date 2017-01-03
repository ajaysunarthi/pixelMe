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

}