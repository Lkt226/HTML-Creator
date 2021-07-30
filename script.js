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


function addGroup(_type, _id, _col, _height, _aling, _padding ,_inTag, _selectable) {
    _col = Number(padronizer(_col, 1))
    col = `${100/_col}%`
    if (_col > 1){_type = "span"} else {_type = "div"}
    const momTag = inElement(padronizer(_inTag, "_body"))
    //_type = padronizer (_type, "div")
    this.element = momTag.appendChild(document.createElement(_type));
    this.element.style.width = col
    this.element.style.height = padronizer(_height, "100%")
    this.element.style.verticalAlign = padronizer(_aling, "top")
    this.element.style.padding = padronizer(_padding, "0px");
    _selectable = padronizer(_selectable, true)
    if (padronizer(_id, _type) != ""){
        let preID = padronizer(_id, _type)
        this.element.id = padronizer(_id, _type)+findInList(preID,allIDs)
        if(_selectable === true){
            allIDs.push(this.element.id);
        }
    }
    if (_selectable === true){this.element.onclick = toolBox}
    return this.element
}

function addElement(_type, _id, _value, _inTag, _selectable) {
    const momTag = inElement(padronizer(_inTag, "_body"));
    this.element = momTag.appendChild(document.createElement(padronizer(_type, "p")));
    _selectable = padronizer(_selectable, true)
    if (padronizer(_id, _type) != ""){
        this.element.id = padronizer(_id, _type)+findInList(_type,allIDs)
        if(_selectable === true){
                allIDs.push(this.element.id);
        }
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
        _toolGroup = addGroup("div", "_toolGroup", 1,"100%","","","_toolBox",false)
    }else{_toolGroup.remove(); _toolGroup = addGroup("div", "_toolGroup", 1,"100%","","","_toolBox",false)}
        if (padronizer(_selected, null) != null){
        element = _selected.target

        function _tools(_globalInputs, _textInputs, _srcInputs, _buttonInput, _sizeInputs){
            if (_toolGroup.childElementCount == 0){
            let _return = []
                if (padronizer(_globalInputs, true)){
                    this._labelType = new addElement("label", "_toolType", "Tag", "_toolGroup",false); this._labelType.style.fontSize = "0px";
                    this._type = new addElement("input", "_type", "Tag: "+padronizer(element.localName, "Tag"), "_toolGroup",false);this._type.style.width = "45.5%";this._type.style.padding = "2px";
                    _type.onchange = function(){
                        let _old = element
                        let _new = addElement(_type.value, element.id, element.innerText, element.parentNode.id)
                        element.parentNode.replaceChild(_new, _old);}

                    this._labelID = new addElement("label", "_labelID", "Id", "_toolGroup",false); this._labelID.style.fontSize = "0px";
                    this._id = new addElement("input", "_id", "ID: "+padronizer(element.id, "Tag"), "_toolGroup",false);this._id.style.width = "45.5%";this._id.style.padding = "2px";
                    _id.onchange = function(){element.id = _id.value} 
                    
                    _return.push(this._type); _return.push(this._id);
                }

                if (padronizer(_textInputs, true)){
                    this._labelText = new addElement("label", "_labelText", "Texto", "_toolGroup",false); this._labelText.style.fontSize = "0px";
                    this._text = new addElement("textarea", "_text", ""+padronizer(element.innerText, "Tag"), "_toolGroup",false);this._text.style.width = "97%";this._text.style.padding = "2px";this._text.style.height = "60px";
                    _text.onchange = function(){element.innerHTML = _text.value}

                    _return.push(this._text)
                }

                if (padronizer(_srcInputs, true)){
                    this._labelUrl = new addElement("label", "_labelUrl", "Url", "_toolGroup",false); this._labelUrl.style.fontSize = "0px";
                    this._url = new addElement("input", "_url", "", "_toolGroup",false);this._url.style.width = "95.5%";
                    this._url.style.padding = "2px"; this._url.type = "url"; this._url.value = padronizer(element.src, "")
                    _url.onchange = function(){element.src = _url.value}

                    _return.push(this._url)
                }

                if (padronizer(_sizeInputs, true)){
                    this._labelWidth = new addElement("label", "_labelWidth", "Tag", "_toolGroup",false); this._labelWidth.style.fontSize = "0px";
                    this._width = new addElement("input", "_width", "Width: "+padronizer(element.style.width, "100%"), "_toolGroup",false);this._width.style.width = "45.5%";this._width.style.padding = "2px";
                    _width.onchange = function(){element.style.width = _width.value}

                    this._labelHeight = new addElement("label", "_labelHeight", "Id", "_toolGroup",false); this._labelHeight.style.fontSize = "0px";
                    this._height = new addElement("input", "_height", "Height: "+padronizer(element.style.height, "100%"), "_toolGroup",false);this._height.style.width = "45.5%";this._height.style.padding = "2px";
                    _height.onchange = function(){element.style.height = _height.value} 
                    
                    this._labelCol = new addElement("label", "_labelCol", "Tag", "_toolGroup",false); this._labelCol.style.fontSize = "0px";
                    this._col = new addElement("input", "_col", "Colunas: "+1, "_toolGroup",false);this._col.style.width = "95.5%";this._col.style.padding = "2px";
                    _col.onchange = function(){
                        let _old = element
                        let _new = new addGroup(element.localName, "", 1,"",element.style.verticalAlign, element.style.padding)
                        element.parentNode.replaceChild(_new, _old);
                        for(let i = 0; i < _col.value; i++){
                            let tempElement = new addGroup("","",_col.value,"100px","middle","0px",_new.id)
                            allElements.push(tempElement)
                        }
                        //Resolução temporaria, para um bug
                        toolBox(undefined)
                    }

                    _return.push(this._width); _return.push(this._height); _return.push(this._col);
                }

                if (padronizer(_buttonInput, true)){
                    this._labelRemove = new addElement("label", "_labelRemove", "Remover", "_toolGroup",false); this._labelRemove.style.fontSize = "0px";
                    this._btnRemove = new addElement("button", "_btnRemove", "Remover", "_toolGroup",false); this._btnRemove.style.width = "100%";this._btnRemove.style.padding = "2px";        
                    _btnRemove.onclick = function(){element.remove()}

                    _return.push(this._btnRemove)
                }            
            return _return; 
            }
        }

        switch (element.localName) {
            case 'div': case "span": case "container": case "header":
                new _tools("",false,false,"","");
                break;

            case "h1": case "p": case "h2": case "h3":
                new _tools("","",false,"",false);
                break

            case "img": case "image":
                new _tools("",false,"","",false);
                break

            default:
                break;
        }
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
    for(let i = 0; i < _col; i++){
        let tempElement = new addGroup("","",_col,"100px","middle","0px","")
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
