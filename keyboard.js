const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false
  },

  init() {


    let textarea1 = document.createElement("textarea");
    textarea1.classList.add("keyboard-input");
    document.body.append(textarea1);
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard-keys");
    this.elements.keysContainer.appendChild(this._createKeys());



    //text windows and language check
    let text1 = document.createElement("p");
    let t = document.createTextNode("Клавиатура создана в операционной системе Windows. Для переключения языка комбинация: левыe alt + shift (shift + alt)");
    text1.classList.add("description");
    text1.appendChild(t);
    document.body.append(text1);


    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard-key");


    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        })
      });
    });


  },

  _createKeys() {
    const fragment = document.createDocumentFragment();



    const keyLayout = {
      key1: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "done", "ShiftL", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "ShiftR",
        "ControlL", "AltL", "space", "AltR", "ControlR", "arrowup", "adown", "aleft", "aright"
      ],

      key2: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з",
        "caps", "ф", "і", "в", "а", "п", "р", "о", "л", "д", "enter",
        "done", "ShiftLeft", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "shiftRight",
        "ControlL", "AltL", "space", "AltR", "ControlR", "arrowup", "adown", "aleft", "aright"]

    }

    //switch keyboard language
    /* const keyb = document.getElementById('keyboard'); */

    let currentLayout = keyLayout.key1;

    switchLayout(currentLayout);

    function switchLayout(layout) {
      /*  keyb.innerHTML = ''; */
      currentLayout = layout;
    }

    document.addEventListener('keydown', event => {
      if (event.key === 'Shift' && event.altKey) {
        switchLayout(keyLayout.key1);
      } else {
        switchLayout(keyLayout.key2)
      }
    });

    /*     function gfg_Run() {
          window.addEventListener("keydown", function(e) {
              if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1){
                  e.preventDefault();
              }
          }, false);
            
          keyElement.innerHTML =
              "Scrolling from arrow keys is disabled.";
      }     */

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    currentLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard-key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard-key-wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard-key-wide", "keyboard-key-activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard-key-active", this.properties.capsLock);
          });

          break;

       /*  case "arrowup":
          keyElement.classList.add("keyboard-key");
          keyElement.innerHTML = createIconHTML("ArrowUp");

          keyElement.addEventListener("click", function () {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break; */

        /* case "adown":
          keyElement.classList.add("keyboard-key");
          keyElement.innerHTML = createIconHTML("ArrowDown");

          keyElement.addEventListener("click", function () {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "aleft":
          keyElement.classList.add("keyboard-key");
          keyElement.innerHTML = createIconHTML("arrowdown");

          keyElement.addEventListener("click", function () {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break; */

        case "aright":
          keyElement.classList.add("keyboard-key-wide", "keyboard-key-activatable");
          keyElement.innerHTML = createIconHTML("arrowdown");

          keyElement.addEventListener("click", function () {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard-key-wide");
          keyElement.innerHTML = createIconHTML("keyboard-return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard-key-extra-wide");
          keyElement.innerHTML = createIconHTML("space-bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard-key-wide", "keyboard-key-dark");
          keyElement.innerHTML = createIconHTML("check-circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this._triggerEvent("oninput");
          });

          break;
      }

      document.addEventListener('keydown', function (event) {
        if (event.code == 'ArrowUp') {
          /*  alert('Undo!'); */
          /* event.preventDefault(); */
        }
      });

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },



  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard-hidden");
  },

  /*  close() {
     this.properties.value = "";
     this.eventHandlers.oninput = oninput;
     this.eventHandlers.onclose = onclose;
     this.elements.main.classList.add("keyboard-hidden");
   } */
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
  Keyboard.gfg_Run();
});
