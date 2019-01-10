# ColorPalette

An easy tool to display multiples colors on your screen. It can be used to check the similitude between colors.

## How to use ?

First, make sure that you include the script before creating any Palette.

```html
<script src="colorpalette.js"></script>
<script>
  // My Palette goes here
</script>
```

There are two ways to create Palettes, you can pass an array or an object to the method.

### 1. Array
```html
<script>
var MyPalette = new ColorPalette(['#002a4a', '#17607d', '#fff1ce', '#ff9311', '#d64700'])
</script>
```

ColorPalette will generate a text area with the color code and stick it to the top of each color layer.


### 2. Object
If you want to customize the text that is added to the layers, you can pass your colors through an object.

```html
<script>
  var MyPalette = new ColorPalette({
    '#002a4a': 'What',
    '#17607d': 'Do you',
    '#fff1ce': 'Want',
    '#ff9311': 'From me',
    '#d64700': '' // If you don't set a value, the color code will be used
  })
</script>
```


## Credits
Example palette from [color.adobe.com](https://color.adobe.com/fr/%EB%8B%A4%EC%9D%8C%EC%9D%98-%EB%B3%B5%EC%82%AC%EB%B3%B8-Ping-Pong-palette-color-theme-8490451/)
