import {getButtons} from './components/showBlock.js';
import {chooseShape} from './components/chooseShape.js'
import {updateElement, updateElementWithAngle} from './components/updateElement.js'
import { zoom } from './components/buttons/btnZoom.js';
import { grid } from './components/buttons/btnGrid.js';
import { join, nearElement} from './components/joining.js';
import { getElementAtPosition} from './components/getElement.js';
import  {updateEndOfInstance, updateProcess, updateText, updatePhysicallyFlow, updateInput, updateElse} from './components/movingAction.js';

// later, to make this navbar to be dynamic, that means, to move it wherever i want either with showing block and to minimazi and maximazi as well    ✓
// inserting every shapes to the main process
// to create action with inserting text
// to create deleting of instance of class with backspace and delete
// to maximize and minimize view of window  (in the browser is possible to zoom page)                                                                 ✓

// dont use clientX and clientY, because there are not relative like pageX and pageY                                                                  ✓

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
    let selectedElement;

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
            if(selectedElement.type === "physically-flow"){
                const result = elements.filter(element => element.id !== selectedElement.id);
                const shape = nearElement(pageX, pageY, result);
                if(shape){
                    const connect = shape.connect;
                    const connectw = connect.width2 - connect.width;
                    const connecth = connect.height2 - connect.height;
                    connect.connectArrows.push(selectedElement)  // Here is pushed selectedElement with its flood parameters, not current/updated paramters in adjustment(resizing section)
                    updateElement(elements, ctx, connect.id, connect.width, connect.height, connectw, connecth, connect.type, connect.shapes, connect.increaseWidth + 300, connect.increaseHeight + 200, null, connect.connectArrows);
                }
            }
        
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
        event.target.style.cursor = element ?  cursorForPosition(element.position) : "default";
        if(action === "moving"){
            if(selectedElement.type === "end-of-instance"){
                updateEndOfInstance(pageX, pageY, ctx, selectedElement, elements);
            }else if(selectedElement.type === "process"){
                updateProcess(pageX, pageY, ctx, selectedElement, elements);
            }else if(selectedElement.type === "text"){
                updateText(pageX, pageY, ctx, selectedElement, elements);
            }else if(selectedElement.type === "physically-flow"){
                updatePhysicallyFlow(pageX, pageY, ctx, selectedElement, elements);
            }else if(selectedElement.type === "input"){
                updateInput(pageX, pageY, ctx, selectedElement, elements);
            }else {
                updateElse(pageX, pageY, ctx, selectedElement, elements);
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
                const result = elements.filter(element => element.id !== selectedElement.id);
                const connect = nearElement(pageX, pageY, result);
                if(connect){
                    updateElementWithAngle(elements, ctx, id, width, height, w, h, type, angle, connect.connect, connect.position); 
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    elements.forEach(element => {
                        element.getShape()
                        if(element.id === selectedElement.id)element.joining(); // to show green dot for connecting
                    })  
                }else{
                    updateElementWithAngle(elements, ctx, id, width, height, w, h, type, angle); 
                }
            }else{
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