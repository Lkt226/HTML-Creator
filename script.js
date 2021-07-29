//Facilitador via preguiça apagar dps
function cL(_value){return console.log(_value)}
function RandomImg (_width, _height){return `https://picsum.photos/${_width}/${_height}`} //"http://source.unsplash.com/random"
let fullWidth = "100%"

//Variaveis
let selected = "";
let allIDs = []
let allElements = []


//Funções de suporte
function draggableElement(_id) {
    const element = inElement(_id)
    let posX, posY, backPosX, backPosY
    element.onmousedown = grab

    function grab(event) {
        e = event || window.event;
        backPosX = e.clientX
        backPosY = e.clientY
        document.onmouseup = closeDragElement;
        document.onmousemove = drop;
    }

    function drop(event) {
        e = event || window.event;
        e.preventDefault();
        posX = backPosX - e.clientX;
        posY = backPosY - e.clientY;
        backPosX = e.clientX
        backPosY = e.clientY

        element.style.left = `${(element.offsetLeft - posX)}px`
        element.style.top  = `${(element.offsetTop - posY)}px`  
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function padronizer(_argument, _default){
    switch(_argument){
        case undefined: case null: case "": 
        _argument = _default
            break
        default: 
            break}
    return _argument
}

function findInList(_item, _list){
    if (_list.includes(_item)){
        let i = 0
        for (item of _list){
            if(item.includes(_item)){i++}
        } 
        return i
    }else{return ""}
}

function inElement(_id){
    _id = padronizer(_id, "_body");
    return document.getElementById(_id)
}

//Funções de criação

function addText(_value){
    _value = padronizer(_value, ""); 
    return document.createTextNode(_value);
}


function addGroup(_type, _id, _width, _height, _aling, _padding ,_inTag, _selectable) {
    const momTag = inElement(padronizer(_inTag, "_body"))
    _type = padronizer (_type, "div")
    this.element = momTag.appendChild(document.createElement(padronizer(_type, "div")));
    this.element.id = padronizer (_id, "div")
    this.element.style.width = padronizer(_width, "100%")
    this.element.style.height = padronizer(_height, "100%")
    this.element.style.verticalAlign = padronizer(_aling, "top")
    this.element.style.padding = padronizer(_padding, "0px");
    if (this.element.id != ""){
        this.element.id = padronizer(_id, _type)+findInList(_type,allIDs)
        allIDs.push(this.element.id);
    }
    _selectable = padronizer(_selectable, true)
    if (_selectable === true){this.element.onclick = toolBox}
    return this.element
}

function addElement(_type, _id, _value, _inTag, _selectable) {
    const momTag = inElement(padronizer(_inTag, "_body"));
    this.element = momTag.appendChild(document.createElement(padronizer(_type, "p")));
    _selectable = padronizer(_selectable, true)
    if (padronizer(_id, _type) != ""){
        this.element.id = padronizer(_id, _type)+findInList(_type,allIDs)
        allIDs.push(this.element.id);
    }
    if (_selectable === true){this.element.onclick = toolBox}
    switch (_type) {
        case "text": case "p":
            this.element.innerHTML = padronizer(_value, "");
            break;

        case "img": case "image":
            this.element.src = padronizer(_value, "");
            break;
    
        case "input":
            this.element.placeholder = padronizer(_value, this.element.id)
            break
        default:
            this.element.innerHTML = padronizer(_value, "");
            break;
    }
    return this.element
}


function toolBox(_selected) {
    _toolGroup = inElement("_toolGroup")
    if (_toolGroup == null){
        _toolGroup = addGroup("div", "_toolGroup","100%","100%","","","_toolBox",false)
    }
        if (padronizer(_selected, null) != null){
        element = _selected.target

        function _toolTexts(_textInputs, _buttonInput){
            if (_toolGroup.childElementCount == 0){
            let _return = []
                if (padronizer(_textInputs, true)){
                    this._labelType = new addElement("label", "_toolType", "Tag", "_toolGroup",false); this._labelType.style.fontSize = "0px";
                    this._type = new addElement("input", "_type", padronizer(element.localName, "Tag"), "_toolGroup",false);this._type.style.width = "97.5%";
        
                    this._labelID = new addElement("label", "_labelID", "Id", "_toolGroup",false); this._labelID.style.fontSize = "0px";
                    this._id = new addElement("input", "_id", padronizer(element.id, "Tag"), "_toolGroup",false);this._id.style.width = "97.5%";
                    
                    this._labelText = new addElement("label", "_labelText", "Texto", "_toolGroup",false); this._labelText.style.fontSize = "0px";
                    this._text = new addElement("input", "_text", padronizer(element.innerText, "Tag"), "_toolGroup",false);this._text.style.width = "97.5%";
                    
                    _return.push(this._type); _return.push(this._id); _return.push(this._text);
                }
                if (padronizer(_buttonInput, true)){
                    this._labelRemove = new addElement("label", "_labelRemove", "Remover", "_toolGroup",false); this._labelRemove.style.fontSize = "0px";
                    this._btnRemove = new addElement("button", "_btnRemove", "Remover", "_toolGroup",false); this._btnRemove.style.width = "100%";        
                    _return.push(this._btnRemove)
                }            
                        
            cL(_return)
            return _return; 
            }
        }

        switch (element.localName) {
            case 'div': case "span": case "container": case "header":
                selected = element.id
                break;

            case "h1": case "p": case "h2": case "h3":
                let toolText = new _toolTexts();
                _type.onchange = function(){
                let _old = element
                let _new = addElement(_type.value, element.id, element.innerText, element.parentNode.id)
                element.parentNode.replaceChild(_new, _old);}
                _id.onchange = function(){element.id = _id.value}
                _text.onchange = function(){element.innerHTML = _text.value}
                _btnRemove.onclick = function(){element.remove()}
                break

            default:
                break;
        }
        cL(_selected)
    }else{
        _toolGroup.remove()
    }
}
//Botões
function btnImage() {
    let tempElement = new addElement("img","",RandomImg(1400, 500), selected,)
    allElements.push(tempElement)
}

function btnText() {
    let tempElement = new addElement("p","", "eu sou um texto",selected)
    allElements.push(tempElement)
}

function btnButton() {
    let tempElement = new addElement("button","","Botão",selected)
    allElements.push(tempElement)
}

function btnDiv(_col) {
    _col = Number(padronizer(_col, 1))
    col = `${100/_col}%`
    if (_col > 1){type = "span"} else {type = "div"}
    for(let i = 0; i < _col; i++){
        let tempElement = new addGroup(type,"",col,"100px","middle","0px","")
        allElements.push(tempElement)
    }
}

draggableElement("_toolBox")

document.onclick = function(){
    let missClick = inElement("_body").contains(event.target) || inElement("_toolBox").contains(event.target) ||
    inElement("_editor").contains(event.target) 
    if (!missClick){ selected = ""; toolBox(undefined)}
}

inElement("_btnDiv").onclick = function(){btnDiv();}
inElement("_btnText").onclick = function(){btnText();}
inElement("_btnImage").onclick = function(){btnImage();}
inElement("_btnButton").onclick = function(){btnButton();}
