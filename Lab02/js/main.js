
const SliderTagName = 'slider-root'
const TileTagName = 'slider-tile'

class Slider extends HTMLDivElement {

    constructor(tiles, properties = {}) {
        super();

        for (const [property, value] of Object.entries(properties)) {
            this[property] = value;
        }
        this.tiles = tiles
        this.body = this.embedTiles()
        this.hasControls ? this.drawControls() : null;
    }

    embedTiles() {
        var sliderBody = document.createElement('div');
        this.tiles.forEach(tile => {
            sliderBody.appendChild(tile);
        });
        this.appendChild(sliderBody);
        return sliderBody;
    }

    drawControls() {
        var sliderBody = this.body;

        var previousButton = document.createElement('div');
        previousButton.setAttribute('class', 'sliderprv')
        var nextButton = document.createElement('div');
        nextButton.setAttribute('class', 'slidernxt')


        this.insertBefore(previousButton,sliderBody);
        sliderBody.after(nextButton);
    }

    pauseAutoplay() {

    }

}

class SliderTile extends HTMLDivElement {
    constructor(innerHTML) {
        super();
        this.innerHTML = innerHTML
    }
}

customElements.define(SliderTagName, Slider, { extends: "div" });
customElements.define(TileTagName, SliderTile, { extends: "div" });

function handleCustomTags() {

    // function getProperties()

    var sliderTags = document.getElementsByTagName('slider')
    for (var sliderTag of sliderTags) {
        
        var tileTags = sliderTag.getElementsByTagName('tile');
        var tiles = [];
        for (var tileTag of tileTags) {
            tiles.push(new SliderTile(tileTag.innerHTML));
            sliderTag.removeChild(tileTag);
        }

        var properties = {};
        var attributes = {};
        for (const attr of sliderTag.attributes) {
            var key = attr.name
            var value = attr.value;
            if (key.startsWith("p_")) {
                var propertyName = key.replace("p_","");
                properties[propertyName] = value;
            } else {
                attributes[key] = value;
            }
        }
        var slider = new Slider(tiles, properties);

        for (const [key, value] of Object.entries(attributes))
            slider.setAttribute(key, value)

        var parentNode = sliderTag.parentNode;
        parentNode.appendChild(slider);
        parentNode.removeChild(sliderTag);
    }

}

handleCustomTags()