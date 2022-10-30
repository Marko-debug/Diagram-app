import {getButtons} from './components/ShowBlock.js';
import {chooseShape} from './components/chooseShape.js'
import {updateElement, updatePhysicalFlow} from './components/updateElement.js'
import { zoom } from './components/zoom.js';

// later, to make this navbar to be dynamic, that means, to move it wherever i want either with showing block and to minimazi and maximazi as well

// inserting every shapes to the main process
// to create action with inserting text
// to create action with basket
// to maximize and minimize view of window

// try to change clientX and clientY to pageX and pageY (it should be relative positon of mouse)

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

    const nearPoint = (clientX, clientY, width, height, name) => {
        return Math.abs(clientX - width) < 5 && Math.abs(clientY - height) < 5 ? name : null;
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
            default:
                return 'move';
        }
    }

    const resizedCoordinates = (clientX, clientY)=> {
        const {position, width, height, width2, height2} = selectedElement;
        switch(position){
            case 'tl':
            case 'start':
                return {width: clientX, height: clientY, width2, height2};
            case 'tr':
                return {width, height: clientY, width2: clientX, height2};
            case 'bl':
                return {width: clientX, height, width2, height2: clientY};
            case 'br':
            case 'end':
                return {width, height, width2: clientX, height2: clientY};
            default:
                return null; //should not really get here...
        }
    }

    const getAngle = (width, height, width2, height2) => {
        if(height2 > height){
            return 90;
        }
        if (height2 === height && width2 > width){
            return 0;
        }
        if(height2 < height){
            return 270;
        }
        if(height2 === height && width2 < width){
            return 180;
        }
    }

    const positionWithinElement = (clientX, clientY, element) => {
        if(element.type === "end-of-instance"){
            const {width2, height2, width3, height3} = element;
            const inside = clientX >= width2 && clientX <= width3 && clientY >= height2 && clientY <= height3 ? "inside" : null;         
            return inside;
        }
        else if(element.type === "physically-flow"){
            const {width, height, width2, height2} = element;
            const start = nearPoint(clientX, clientY, width, height, "start");
            const end = nearPoint(clientX, clientY, width2, height2, "end");
            const inside = clientX >= width && clientX <= width2 && clientY >= height && clientY <= height2 ? "inside" : null;     
            // console.log(`clientX: ${clientX}, clientY: ${clientY}, width: ${width}, height: ${height}, width2: ${width2}, height2: ${height2}`)
            return start || end || inside;
        }
        else if(element.type === "process"){
            const {width, height, width2, height2} = element;
            const topLeft = nearPoint(clientX, clientY, width, height, "tl")
            const topRight = nearPoint(clientX, clientY, width2, height, "tr")
            const bottomLeft = nearPoint(clientX, clientY, width, height2, "bl")
            const bottomRight = nearPoint(clientX, clientY, width2, height2, "br")
            const inside = clientX >= width && clientX <= width2 && clientY >= height && clientY <= height2 ? "inside" : null;     
            return topLeft || topRight || bottomLeft || bottomRight || inside;
        }
        else if(element.type === "text"){
            const {width, height, width2, height2} = element;
            const inside = clientX >= width && clientX <= width2 && clientY >= height && clientY <= height2 ? "inside" : null;    
            return inside;
        }
        else{
            const {width, height, width2, height2} = element;
            const inside = clientX >= width && clientX <= width2 && clientY >= height && clientY <= height2 ? "inside" : null;         
            return inside;
        }
    }

    const getElementAtPosition = (clientX, clientY, elements) => {
        return elements
            .map(element => ({...element, position: positionWithinElement(clientX, clientY, element)}))
            .find(element => element.position !== null)
    }

    const startDrawing = (event) => {
        const {clientX, clientY} = event;

        const element = getElementAtPosition(clientX, clientY, elements)
        if(element){
            if(element.type==="end-of-instance"){
                const offSetX = clientX - element.width2;
                const offSetY = clientY - element.height2;
                selectedElement = {...element, offSetX, offSetY};
            }else{
                const offSetX = clientX - element.width;
                const offSetY = clientY - element.height;
                selectedElement = {...element, offSetX, offSetY};
            }

            if(element.position === 'inside'){
                action = "moving";
            }
            else{
                action = "resizing";
            }
            // if(element.position === 'start'){ 
            //     action = "rotation"
            // }
        }
    }

    const finishDrawing = (event) => {
        const {clientX, clientY} = event;
        if(selectedElement === null)return;

        // if(selectedElement.type === "text" && clientX - selectedElement.offsetX === selectedElement.x1 && clientY - selectedElement.offsetY === selectedElement.y1) {
        //     action = "writing";
        //     return;
        // }

        const result = elements.filter(element => element.id !== selectedElement.id)
        const basic = getElementAtPosition(clientX, clientY, result);
        if(basic && basic.type === "process"){
            const {shapes} = basic;
            
            //pushing to the array
            const matched = shapes.filter(shape => shape.id === selectedElement.id)
            console.log(shapes)
            if(matched.length === 0){
                shapes.push(selectedElement)
                console.log('pushing another shape')
            }

            // updateElement(elements, ctx, id, width, height, w, h, type, shapes, 400, 300);
            
            // insert everey inserted shapes to the biggest process beacuse, when I move the main process then every element inside, will move
            // const processes = result.filter(element => shapes.length > 0 && result.type === "process");
            // const theBiggest = Math.max(processes.map(process => process.w));
            // console.log(theBiggest.id);
        }
        action = 'none';
    }

    const adjustment = (event) => {
        const {clientX, clientY} = event;
        const element = getElementAtPosition(clientX, clientY, elements);
        event.target.style.cursor = element ?  cursorForPosition(element.position) : "default";
        if(action === "moving"){
            if(selectedElement.type === "end-of-instance"){
                const {id, width2, height2, width3, height3, type, offSetX, offSetY} = selectedElement;
                const w = width3 - width2;   
                const h = height3 - height2;
                const nexX1 = clientX - offSetX;
                const nexY1 = clientY - offSetY;
                updateElement(elements, ctx, id, nexX1, nexY1, w, h, type);
            }else if(selectedElement.type === "process"){
                const {id, width, height, width2, height2, type, offSetX, offSetY, shapes, increaseWidth, increaseHeight} = selectedElement;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = clientX - offSetX;
                const nexY1 = clientY - offSetY;
                updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, shapes, increaseWidth + 300, increaseHeight + 200);
            }else if(selectedElement.type === "text"){
                const {id, width, height, width2, height2, type, offSetX, offSetY, text} = selectedElement;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = clientX - offSetX;
                const nexY1 = clientY - offSetY;
                updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, null, null, null, text);
            }else if(selectedElement.type === "physically-flow"){
                const {id, width, height, width2, height2, type, offSetX, offSetY, angle} = selectedElement;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = clientX - offSetX;
                const nexY1 = clientY - offSetY;
                updatePhysicalFlow(elements, ctx,id, nexX1, nexY1, w, h, type, angle);
            }
            else{
                const {id, width, height, width2, height2, type, offSetX, offSetY} = selectedElement;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = clientX - offSetX;
                const nexY1 = clientY - offSetY;
                updateElement(elements, ctx,id, nexX1, nexY1, w, h, type);
            }
            const result = elements.filter(element => element.id !== selectedElement.id && element.type === "process")
            const enlarge = getElementAtPosition(clientX, clientY, result);

            if(enlarge){
                const offSetX = clientX - enlarge.width;
                const offSetY = clientY - enlarge.height;

                const {id, width, height, width2, height2, type, shapes} = enlarge;
                const w = width2 - width;   
                const h = height2 - height;
                if(w === 300 && h === 200){  // 300 and 200 because, it is default size for inserting first element to process
                    const nexX1 = clientX - offSetX;
                    const nexY1 = clientY - offSetY;
                    updateElement(elements, ctx,id, nexX1, nexY1, w + 100, h + 100, type, shapes, 400, 300);
                }
            }

            // else if(selectedElement.type === "input"){
            //     const {id, width, height, width2, height2, type, offSetX, offSetY} = selectedElement;
            //     const w = width2 - width;   
            //     const h = height2 - height;
            //     const nexX1 = clientX - offSetX;
            //     const nexY1 = clientY - offSetY;
            //     updateElement(id, nexX1, nexY1, nexX1 + w, nexY1 + h, type , nexX1 + w + h, (nexY1 + h)/2);
            // }
        }
        else if(action === "resizing"){
            const {id, type, shapes} = selectedElement;
            const {width, height, width2, height2} = resizedCoordinates(clientX, clientY);
            // console.log(`id: ${id}, type: ${type}, width: ${width}, height: ${height}, width2: ${width2}, height2: ${height2}`);
            const w = width2 - width; 
            const h = height2 - height; 
            if(type === "physically-flow"){
                const angle = getAngle(width, height, width2, height2)
                // console.log(angle)
                updatePhysicalFlow(elements, ctx, id, width, height, w, h, type, angle)
            }
            else{
                updateElement(elements, ctx, id, width, height, w, h, type, shapes, w, h)
            }
        }
    } 

    // const writing = (event) => {
    //     const {clientX, clientY} = event;
    //     const element = getElementAtPosition(clientX, clientY, elements)
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
    //     const {clientX, clientY} = event;
    //     const {id, width, height, width2, height2, type, offSetX, offSetY} = selectedElement;
    //     console.log(clientX, clientY)
    //     // const {id, width, height, type} = selectedElement;
    //     const getTextarea = document.querySelector(".text-area");
    //     const text = getTextarea.value;
    //     const w = width2 - width;   
    //     const h = height2 - height;
    //     const nexX1 = clientX - offSetX;
    //     const nexY1 = clientY - offSetY;
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

    //show window up after click on any button  
    for(const button of getButtons)
    button.ref.addEventListener('click', () => chooseShape(button.shape, elements, ctx))
})