const challengeSelectors = [
    '*', // all elements
    'element-cow', // all cows
    'element-wheat', // all wheat plants
    '#rosie', // the pig "rosie",
    '#donald', // the duck "donald"
    'element-wheat, element-corn', // all wheat and corn plants
    'element-cow, element-pig', // all cows and pigs
    '#rosie, #donald', // rosie and donald
    'area-water element-duck', // all ducks on water
    'area-road element-pig', // all pigs on the road
    '.sleepy', // all sleepy animals
    '.ripe', // all ripe plants
    'element-corn.ripe', // all ripe corn
    'element-sheep.sleepy', // all sleepy sheep
    'element-chicken + element-duck', // the duck next to the chickens
    'element-pig + element-chicken', // the chicken next to the pig
    'element-cow.sleepy + element-cow', // the cow next to the sleepy cow
    'area-road element-chicken, element-chicken.sleepy', // chicken on the road and the sleepy chicken
    'element-corn.ripe + element-wheat.ripe', // ripe wheat next to ripe corn
    '#donald + element-duck.sleepy' // sleepy duck next to donald
];

const styleChallenge = document.querySelector("#style-challenge");
const styleInput = document.querySelector("#style-input");

window.addEventListener(
    "message",
    (event) => {
        const challenge = event.data.challenge;
        const selector = event.data.selector;

        if(challenge !== undefined){
            styleChallenge.innerText = `${challengeSelectors[challenge]} { outline: 0.2rem solid var(--color-outline); --color: var(--color-success); }`;
            styleInput.innerText = '';
        }

        if(selector !== undefined){
            styleInput.innerText = `${selector} { background: var(--color) }`;
        }
    },
    false,
);

class Animal extends HTMLElement {
    emoji = '❌';

    connectedCallback() {
        let adornment = '';
        // if(this.classList.contains("eating")){
        //     adornment = '<span class="food">🌿</span>';
        // }
        if(this.classList.contains("sleepy")){
            adornment = '<span class="zzz">💤</span>';
        }
        this.innerHTML = `${adornment}${this.emoji}`;
    }
}

class Plant extends HTMLElement {
    emoji = '❌';

    connectedCallback() {
        let adornment = '';
        if(this.classList.contains("ripe")){
            adornment = '<span class="ripe">✨</span>';
        }
        this.innerHTML = `${adornment}${this.emoji}`;
    }
}

class ElementPig extends Animal {
    emoji = '🐖';
}

class ElementCow extends Animal {
    emoji = '🐄';
}

class ElementSheep extends Animal {
    emoji = '🐑';
}

class ElementChicken extends Animal {
    emoji = '🐓';
}

class ElementDuck extends Animal {
    emoji= '🦆';
}

class ElementCorn extends Plant {
    emoji = '🌽';
}

class ElementWheat extends Plant {
    emoji = '🌾';
}

class AreaWater extends HTMLElement {
}

class AreaField extends HTMLElement {
}

class AreaMeadow extends HTMLElement {
}

class AreaDirt extends HTMLElement {
}

try {
    customElements.define("element-chicken", ElementChicken);
    customElements.define("element-corn", ElementCorn);
    customElements.define("element-cow", ElementCow);
    customElements.define("element-duck", ElementDuck);
    customElements.define("element-pig", ElementPig);
    customElements.define("element-sheep", ElementSheep);
    customElements.define("element-wheat", ElementWheat);

    customElements.define('area-dirt', AreaDirt);
    customElements.define('area-field', AreaField);
    customElements.define('area-meadow', AreaMeadow);
    customElements.define('area-water', AreaWater);
} catch (error) {
    console.error(error);
}
