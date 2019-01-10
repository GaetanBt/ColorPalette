/**
 * @param {Object|String[]} colors
 * @param {Object} options
 * @constructor
 */
function ColorPalette (colors, options) {
  // CSS classes
  this.wrapperClass = 'ColorPalette'
  this.layerClass = `${this.wrapperClass}-layer`
  this.layerContentClass = `${this.layerClass}Content`

  // Breakpoint is actually used in a max-width `@media` rule
  this.breakpoint = '48em'

  // Create structure
  this.createWrapper()

  if (!colors) {
    throw new Error('ColorPalette() -> Missing colors to build colorpalette.')
  }

  // You can pass either an object or an array to the `createLayer()` function
  for (let color in colors) {
    const layerColor = Array.isArray(colors) ? colors[color] : color
    this.createLayer(layerColor, colors[color])
  }
}

/**
 * Create palette wrapper and append it to the document body
 */
ColorPalette.prototype.createWrapper = function () {
  this.wrapper = document.createElement('div')
  this.wrapper.classList.add(this.wrapperClass)

  Object.assign(this.wrapper.style, {
    display: 'flex',
    height: '100vh',
    width: '100%'
  })

  document.body.appendChild(this.wrapper)
}

/**
 * Create each layer which represent the color areas on the palette and append them to their container
 * @param {String} color
 * @param {String} content
 */
ColorPalette.prototype.createLayer = function (color, content) {
  let layer = document.createElement('div')
  layer.classList.add(this.layerClass)

  Object.assign(layer.style, {
    backgroundColor: color,
    flexGrow: 1,
    textAlign: 'center'
  })

  // If no content is provided, we use the color instead
  content = content || color
  this.layerContent(layer, content)

  this.wrapper.appendChild(layer)
}

ColorPalette.prototype.layerContent = function (parentLayer, content) {
  let layerContent = document.createElement('div')
  layerContent.classList.add(this.layerContentClass)

  Object.assign(layerContent.style, {
    background: 'rgba(255, 255, 255, .4)',
    boxShadow: '0 0 2px rgba(0, 0, 0, .25)',
    display: 'inline-block',
    padding: '.5em 1em'
  })

  layerContent.innerHTML = content

  parentLayer.appendChild(layerContent)
}
