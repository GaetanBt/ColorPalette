class ColorPalette {
  /**
   * @param {Object|String[]} colors
   * @constructor
   */
  constructor (colors) {
    // CSS classes
    this.wrapperClass = 'ColorPalette'
    this.layerClass = `${this.wrapperClass}-layer`
    this.layerContentClass = `${this.layerClass}Content`

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
   * Create a HTML element with some attributes
   */
  createElement ({
    el = null,
    classes = [],
    styles = {},
    appendTo = null
  }) {
    if (el === null) {
      throw new Error('ColorPalette.createElement() -> Missing `el` attribute')
    }

    const element = document.createElement(el)

    if (classes.length) {
      element.classList.add(...classes)
    }

    if (Object.keys(styles).length) {
      Object.assign(element.style, styles)
    }

    if (appendTo !== null) {
      appendTo.appendChild(element)
    }

    return element
  }

  /**
   * Create palette wrapper and append it to the document body
   */
  createWrapper () {
    this.wrapper = this.createElement({
      el: 'div',
      classes: [this.wrapperClass],
      styles: {
        display: 'flex',
        height: '100vh',
        width: '100%'
      },
      appendTo: document.body
    })
  }

  /**
   * Create each layer which represent the color areas on the palette and append them to their container
   * @param {String} color
   * @param {String} content
   */
  createLayer (color, content) {
    let layer = this.createElement({
      el: 'div',
      classes: [this.layerClass],
      styles: {
        backgroundColor: color,
        flexGrow: 1,
        textAlign: 'center'
      },
      appendTo: this.wrapper
    })

    // If no content is provided, we use the color instead
    content = content || color
    this.layerContent(layer, content)
  }

  layerContent (parentLayer, content) {
    let layerContent = this.createElement({
      el: 'div',
      classes: [this.layerContentClass],
      styles: {
        background: 'rgba(255, 255, 255, .4)',
        boxShadow: '0 0 2px rgba(0, 0, 0, .25)',
        display: 'inline-block',
        padding: '.5em 1em'
      },
      appendTo: parentLayer
    })

    layerContent.innerHTML = content
  }
}
