/**
 * @param {Object|String[]} colors
 * @param {Object} options
 * @constructor
 */
function ColorPalette (colors, options) {

  // CSS classes
  this.wrapperClass = 'ColorPalette';
  this.wrapperTitleClass = `${this.wrapperClass}-title`;
  this.layerContainerClass = 'Layers-container';
  this.layerClass = 'Layer';
  this.layerContentClass = `${this.layerClass}-content`;

  // Breakpoint is actually used in a max-width `@media` rule
  this.breakpoint = '48em';

  // Create structure and title if you set one
  this.createWrapper();
  this.createLayerContainer();

  if ( options ) this.createPaletteTitle(options);

  if ( colors ) {

    this.colorsLength = Array.isArray(colors) ? colors.length : Object.keys(colors).length;
    this.layerWidth = Math.round(100 / this.colorsLength * 1000) / 1000 + '%';


    // You can pass either an object or an array to the `createLayer()` function
    for ( let color in colors ) {
      const layerColor = Array.isArray(colors) ? colors[color] : color;
      this.createLayer(layerColor, colors[color]);
    }


    // We do not generate the styles each time we instanciate the object
    if ( !ColorPalette.styleGenerated ) {
      this.generateStyle();
      ColorPalette.styleGenerated = true;
    }

  }
  else {
    console.warn('Missing colors to build colorpalette.');
  }

}

ColorPalette.styleGenerated = false;



/**
 * Create palette wrapper and append it to the document body
 */
ColorPalette.prototype.createWrapper = function () {

  this.wrapper = document.createElement('div');
  this.wrapper.classList.add(this.wrapperClass);
  document.body.appendChild(this.wrapper);

};



/**
 * Create palette title and append it on top of the wrapper content
 * @param {Object} options
 */
ColorPalette.prototype.createPaletteTitle = function (options) {

  this.paletteTitle = document.createElement(options.titleLevel);
  this.paletteTitle.classList.add(this.wrapperTitleClass);
  this.paletteTitle.innerHTML = options.title;
  this.wrapper.insertBefore(this.paletteTitle, this.wrapper.firstChild);

};



/**
 * Create layers container and append it to the wrapper
 */
ColorPalette.prototype.createLayerContainer = function () {

  this.layerContainer = document.createElement('div');
  this.layerContainer.classList.add(this.layerContainerClass);
  this.wrapper.appendChild(this.layerContainer);

};



/**
 * Create each layer which represent the color areas on the palette and append them to their container
 * @param {String} color
 * @param {String} content
 */
ColorPalette.prototype.createLayer = function (color, content) {

  let layer = document.createElement('div');
  layer.classList.add(this.layerClass);
  layer.setAttribute('style', `background-color: ${color};`);

  // If no content is provided, we use the color instead
  content = content || color;
  this.layerContent(layer, content);

  this.layerContainer.appendChild(layer);

};



ColorPalette.prototype.layerContent = function (parentLayer, content) {

  let layerContent = document.createElement('div');

  layerContent.classList.add(this.layerContentClass);
  layerContent.innerHTML = content;

  parentLayer.appendChild(layerContent);

};



ColorPalette.prototype.generateStyle = function () {

  const style = document.createElement('style');
  const css = `
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    html {
      box-sizing: border-box;
    }

    body {
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      font-size: 1em;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }

    .${this.layerContainerClass} {
      display: flex;
      height: 100vh;
      width: 100%;
    }

    .${this.wrapperClass}:nth-of-type(n+2) {
      margin-top: 5em;
    }

    .${this.layerClass} {
      flex-basis: ${this.layerWidth};
      text-align: center;
    }

    .${this.layerContentClass} {
      background: rgba(255, 255, 255, .4);
      box-shadow: 0 0 2px rgba(0, 0, 0, .25);
      display: inline-block;
      padding: .5em 1em;
    }

    @media screen and (max-width: ${this.breakpoint}) {
      .${this.layerContainerClass} {
        flex-direction: column;
      }
    }
  `;

  style.appendChild(document.createTextNode(css));

  document.head.appendChild(style);

};
