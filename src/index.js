import {getButtons} from './components/ShowBlock.js';
import {chooseShape} from './components/chooseShape.js'
import {updateElement, updateElementWithAngle} from './components/updateElement.js'
import { zoom } from './components/zoom.js';
import { grid } from './components/grid.js';
import { join } from './components/joining.js';

// later, to make this navbar to be dynamic, that means, to move it wherever i want either with showing block and to minimazi and maximazi as well

// inserting every shapes to the main process
// to create action with inserting text
// to create action with basket
// to maximize and minimize view of window  (in the browser is possible to zoom page)

// dont use clientX and clientY, because there are not relative like pageX and pageY

window.addEventListener("load", (event)=>{
    event.preventDefault();
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // set size of canvas
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // declared global variables
    const elements = [];
    let action = 'none';
    let selectedElement = null;

    const nearPoint = (pageX, pageY, width, height, name) => {
        return Math.abs(pageX - width) < 5 && Math.abs(pageY - height) < 5 ? name : null;
    }

    const cursorForPosition = (position) =>{
        switch(position){
            case 'tl':
            case 'start':
            case 'br':
                return 'nwse-resize';
            case 'tr':
            case 'end':
            case 'bl':
                return 'nesw-resize';
            case 'movingHorizontal':
                return 'row-resize';
            case 'movingVertical':
                return 'col-resize';
            case 'turn':
                return 'grab';
            default:
                return 'move';
        }
    }

    const resizedCoordinates = (pageX, pageY)=> {
        const {position, width, height, width2, height2} = selectedElement;
        switch(position){
            case 'tl':
            case 'start':
                return {width: pageX, height: pageY, width2, height2};
            case 'tr':
                return {width, height: pageY, width2: pageX, height2};
            case 'bl':
                return {width: pageX, height, width2, height2: pageY};
            case 'br':
            case 'end':
                return {width, height, width2: pageX, height2: pageY};
            default:
                return null; //should not really get here...
        }
    }

    const getAngle = (width, height, width2, height2, centerW) => {
        if(height2 < height &&  width2 - 15 === centerW){
            return 270;
        }
        else if (height2 === height && width2 > width){
            return 0;
        }
        else if(height2 > height && width2 - 15 === centerW){
            return 90;
        }
        else if(height2 === height && width2 < width){
            return 180;
        }
    }

    const positionWithinElement = (pageX, pageY, element) => {
        if(element.type === "end-of-instance"){
            const {width2, height2, width3, height3} = element;
            const inside = pageX >= width2 && pageX <= width3 && pageY >= height2 && pageY <= height3 ? "inside" : null;         
            return inside;
        }
        else if(element.type === "physically-flow"){
            const {width, height, width2, height2, centerW, centerH} = element;
            const start = nearPoint(pageX, pageY, width, height, "start");
            const end = nearPoint(pageX, pageY, width2, height2, "end");
            // const movingHorizontal = nearPoint(pageX, pageY, w/2 + width, height, "movingHorizontal"); 
            // const movingVertical = nearPoint(pageX, pageY, width2 - 15, h/2 + height,"movingVertical");
            const inside = nearPoint(pageX, pageY, centerW, centerH, "inside");     
            // console.log(`pageX: ${pageX}, pageY: ${pageY}, width: ${centerW}, height: ${centerH}`)
            return start || end || inside;
        }
        else if(element.type === "process"){
            const {width, height, width2, height2} = element;
            const topLeft = nearPoint(pageX, pageY, width, height, "tl")
            const topRight = nearPoint(pageX, pageY, width2, height, "tr")
            const bottomLeft = nearPoint(pageX, pageY, width, height2, "bl")
            const bottomRight = nearPoint(pageX, pageY, width2, height2, "br")
            const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;     
            return topLeft || topRight || bottomLeft || bottomRight || inside;
        }
        else if(element.type === "text"){
            const {width, height, width2, height2} = element;
            const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;    
            return inside;
        }
        else if(element.type === "input"){
            const {width, height, width2, height2, angle} = element;
            if (0 <= angle <= 45) {
                const turn = nearPoint(pageX, pageY, width2 + 30, height2 - 30, "turn");
                const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;         
                return inside || turn;
            }
            else if (45 < angle <= 120 ){
                const turn = nearPoint(pageX, pageY, width2 + 30 , height2 + 30, "turn");
                const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;         
                return inside || turn;
            }
            else if (120 < angle <= 225 ){
                const turn = nearPoint(pageX, pageY, width2 - 30 , height2 + 30, "turn");
                const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;         
                return inside || turn;
            }
            else if (225 < angle <= 360 ){
                const turn = nearPoint(pageX, pageY, width2 - 30 , height2 - 30, "turn");
                const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;         
                return inside || turn;
            }
        }
        else{
            const {width, height, width2, height2} = element;
            const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;         
            return inside;
        }
    }

    const getElementAtPosition = (pageX, pageY, elements) => {
        return elements
            .map(element => ({...element, position: positionWithinElement(pageX, pageY, element)}))
            .find(element => element.position !== null)
    }

    const nearElement = (pageX, pageY, result) => {
            const join = result.find(element => pageX >= element.width - 5 && pageX <= element.width + 5 && pageY >= element.height -5 && pageY <= element.height + 5);
            return join ? join : null
    }

    const startDrawing = (event) => {
        const {pageX, pageY} = event;

        const element = getElementAtPosition(pageX, pageY, elements)
        if(element){
            if(element.type==="end-of-instance"){
                const offSetX = pageX - element.width2;
                const offSetY = pageY - element.height2;
                selectedElement = {...element, offSetX, offSetY};
            }else{
                const offSetX = pageX - element.width;
                const offSetY = pageY - element.height;
                selectedElement = {...element, offSetX, offSetY};
            }

            if(element.position === 'inside')action = "moving";
            else if(element.position === "movingHorizontal") action = " movingHorizontal";
            else if(element.position === "movingVertical") action = " movingVertical";
            else if(element.position === "turn") action = " turning";
            else  action = "resizing";
            
            // if(element.position === 'start'){ 
            //     action = "rotation"
            // }
        }else{
            selectedElement = null;
        }
    }

    const finishDrawing = (event) => {
        const {pageX, pageY} = event;
        if(selectedElement){
            
            // if(selectedElement.type === "text" && pageX - selectedElement.offsetX === selectedElement.x1 && pageY - selectedElement.offsetY === selectedElement.y1) {
                //     action = "writing";
                //     return;
                // }
                
            // this loop is for rendering blue circles for manipulation
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            elements.forEach(element => {
                element.getShape()
                if(element.id === selectedElement.id)element.selected();
            })  
                
            const result = elements.filter(element => element.id !== selectedElement.id)
            const basic = getElementAtPosition(pageX, pageY, result);
            if(basic && basic.type === "process"){
                const {shapes} = basic;
                
                //pushing to the array
                const matched = shapes.filter(shape => shape.id === selectedElement.id)
                // console.log(shapes)
                if(matched.length === 0){
                    shapes.push(selectedElement)
                    // console.log('pushing another shape')
                }
    
                // updateElement(elements, ctx, id, width, height, w, h, type, shapes, 400, 300);
                
                // insert everey inserted shapes to the biggest process beacuse, when I move the main process then every element inside, will move
                // const processes = result.filter(element => shapes.length > 0 && result.type === "process");
                // const theBiggest = Math.max(processes.map(process => process.w));
                // console.log(theBiggest.id);
            }
            action = 'none';
        }else{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            elements.forEach(element => {
                element.getShape()
            })
        }

    }

    const adjustment = (event) => {
        const {pageX, pageY} = event;
        const element = getElementAtPosition(pageX, pageY, elements);
        if(element)console.log(element.position)
        event.target.style.cursor = element ?  cursorForPosition(element.position) : "default";
        if(action === "moving"){
            if(selectedElement.type === "end-of-instance"){
                const {id, width2, height2, width3, height3, type, offSetX, offSetY} = selectedElement;
                const w = width3 - width2;   
                const h = height3 - height2;
                const nexX1 = pageX - offSetX;
                const nexY1 = pageY - offSetY;
                updateElement(elements, ctx, id, nexX1, nexY1, w, h, type);
            }else if(selectedElement.type === "process"){
                const {id, width, height, width2, height2, type, offSetX, offSetY, shapes, increaseWidth, increaseHeight, connectArrow} = selectedElement;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = pageX - offSetX;
                const nexY1 = pageY - offSetY;
                if(connectArrow){
                    updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, shapes, increaseWidth + 300, increaseHeight + 200, null, connectArrow);
                    const wArrow = nexX1 - connectArrow.width;
                    const hArrow = nexY1 - connectArrow.height;                
                    updateElementWithAngle(elements, ctx, connectArrow.id, connectArrow.width, connectArrow.height, wArrow, hArrow, connectArrow.type, connectArrow.shapes, connectArrow.increaseWidth, connectArrow.increaseHeight, connectArrow.connect);
                }else{
                    updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, shapes, increaseWidth + 300, increaseHeight + 200);
                }
            }else if(selectedElement.type === "text"){
                const {id, width, height, width2, height2, type, offSetX, offSetY, text} = selectedElement;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = pageX - offSetX;
                const nexY1 = pageY - offSetY;
                updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, null, null, null, text);
            }else if(selectedElement.type === "physically-flow"){
                const {id, width, height, width2, height2, type, offSetX, offSetY, angle} = selectedElement;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = pageX - offSetX;
                const nexY1 = pageY - offSetY;
                updateElementWithAngle(elements, ctx, id, nexX1, nexY1, w, h, type, angle);
            }
            else if(selectedElement.type === "input"){
                const {id, width, height, width2, height2, type, offSetX, offSetY, angle} = selectedElement;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = pageX - offSetX;
                const nexY1 = pageY - offSetY;
                updateElementWithAngle(elements, ctx,id, nexX1, nexY1, w, h, type, angle);
            }else {
                const {id, width, height, width2, height2, type, offSetX, offSetY} = selectedElement;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = pageX - offSetX;
                const nexY1 = pageY - offSetY;
                updateElement(elements, ctx,id, nexX1, nexY1, w, h, type);
            }
            const result = elements.filter(element => element.id !== selectedElement.id && element.type === "process")
            const enlarge = getElementAtPosition(pageX, pageY, result);

            if(enlarge){
                const offSetX = pageX - enlarge.width;
                const offSetY = pageY - enlarge.height;

                const {id, width, height, width2, height2, type, shapes} = enlarge;
                const w = width2 - width;   
                const h = height2 - height;
                if(w === 300 && h === 200){  // 300 and 200 because, it is default size for inserting first element to process
                    const nexX1 = pageX - offSetX;
                    const nexY1 = pageY - offSetY;
                    updateElement(elements, ctx,id, nexX1, nexY1, w + 100, h + 100, type, shapes, 400, 300);
                }
            }

            // else if(selectedElement.type === "input"){
            //     const {id, width, height, width2, height2, type, offSetX, offSetY} = selectedElement;
            //     const w = width2 - width;   
            //     const h = height2 - height;
            //     const nexX1 = pageX - offSetX;
            //     const nexY1 = pageY - offSetY;
            //     updateElement(id, nexX1, nexY1, nexX1 + w, nexY1 + h, type , nexX1 + w + h, (nexY1 + h)/2);
            // }
        }
        else if(action === "movingHorizontal"){
            
        }
        else if(action === "movingVertical"){
            console.log("bingo")
        }
        else if(action === "turning"){
            
        }
        else if(action === "resizing"){
            const {id, type, shapes} = selectedElement;
            const {width, height, width2, height2} = resizedCoordinates(pageX, pageY);
            // console.log(`id: ${id}, type: ${type}, width: ${width}, height: ${height}, width2: ${width2}, height2: ${height2}`);
            const w = width2 - width; 
            const h = height2 - height; 
            if(type === "physically-flow"){
                const angle = getAngle(width, height, width2, height2, width2 - 15);
                // const result = elements.filter(element => element.id !== selectedElement.id);
                // const connect = nearElement(pageX, pageY, result);
                updateElementWithAngle(elements, ctx, id, width, height, w, h, type, angle); // for working it have to be like that (elements, ctx, id, width, height, w, h, type, angle, connect)
                // if(connect){
                //     const connectw = connect.width2 - connect.width;
                //     const connecth = connect.height2 - connect.height;
                //     updateElement(elements, ctx, connect.id, connect.width, connect.height, connectw, connecth, connect.type, connect.shapes, connect.increaseWidth, connect.increaseHeight, null, selectedElement);
                //     ctx.clearRect(0, 0, canvas.width, canvas.height);
                //     elements.forEach(element => {
                //         element.getShape()
                //         if(element.id === selectedElement.id)element.joining(); // to show green dot for connecting
                //     })  
                // }
            }
            else{
                updateElement(elements, ctx, id, width, height, w, h, type, shapes, w, h);
            }
        }
    } 

    // const writing = (event) => {
    //     const {pageX, pageY} = event;
    //     const element = getElementAtPosition(pageX, pageY, elements)
    //     if(element && element.type === 'text'){
    //         const getTextarea = document.querySelector(".text-area");
    //         getTextarea.style.position = "fixed";
    //         getTextarea.style.top = `${element.height}px`;
    //         getTextarea.style.left = `${element.width}px`;
    //         // getTextarea.onblur = handleBlur;
    //         getTextarea.addEventListener("blur", handleBlur(event))
    //         getTextarea.hidden = false;
    //         getTextarea.value = element.text;
    //         getTextarea.focus();
    //     }
    // }

    // function handleBlur (event) {
    //     const {pageX, pageY} = event;
    //     const {id, width, height, width2, height2, type, offSetX, offSetY} = selectedElement;
    //     console.log(pageX, pageY)
    //     // const {id, width, height, type} = selectedElement;
    //     const getTextarea = document.querySelector(".text-area");
    //     const text = getTextarea.value;
    //     const w = width2 - width;   
    //     const h = height2 - height;
    //     const nexX1 = pageX - offSetX;
    //     const nexY1 = pageY - offSetY;
    //     getTextarea.hidden = true;
    //     selectedElement = null;
    //     action = 'none';
    //     updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, null, null, null, text);
    //     // updateElement(elements, ctx, id, width, height, null, null, type, null, null, null, text);
    // }

    //adding functions to canvas
    canvas.onmousedown = startDrawing;
    canvas.onmouseup = finishDrawing;
    canvas.onmousemove = adjustment;
    // canvas.addEventListener('dblclick', writing);

    // zoom in / zoom out
    zoom(ctx, elements);
    
    //to make grid on canvas
    const btnGrid = document.querySelector(".grid")
    btnGrid.addEventListener('click', ()  => grid(ctx))

    //show window up after click on any button  
    for(const button of getButtons)
    button.ref.addEventListener('click', () => chooseShape(button.shape, elements, ctx))
})