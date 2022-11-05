import {updateElement, updateElementWithAngle} from './updateElement.js'
import { movingArrows} from './joining.js';


const updateEndOfInstance = (pageX, pageY, ctx, selectedElement, elements) => {
    const {id, width2, height2, width3, height3, type, offSetX, offSetY} = selectedElement;
    const w = width3 - width2;   
    const h = height3 - height2;
    const nexX1 = pageX - offSetX;
    const nexY1 = pageY - offSetY;
    updateElement(elements, ctx, id, nexX1, nexY1, w, h, type);
}
const updateProcess = (pageX, pageY, ctx, selectedElement, elements) => {
        const {id, width, height, width2, height2, type, offSetX, offSetY, shapes, increaseWidth, increaseHeight, connectArrows} = selectedElement;
        const w = width2 - width;  
        const h = height2 - height;
        const nexX1 = pageX - offSetX;
        const nexY1 = pageY - offSetY;
        const gapW = nexX1 - width;  
        const gapH = nexY1 - height;  
        if(shapes){
            shapes.forEach(shape => {
                if(shape.type === "end-of-instance"){
                    updateEndOfInstance(pageX, pageY, ctx, shape, elements);
                }else if(shape.type === "process"){
                    const {id, width, height, width2, height2, type, shapes, increaseWidth, increaseHeight, connectArrows} = shape;
                    const w = width2 - width;  
                    const h = height2 - height;
                    const nexX1 =  width + gapW;
                    const nexY1 = height + gapH;
                    updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, shapes, increaseWidth + 300, increaseHeight + 200, connectArrows);
                }else if(shape.type === "text"){
                    const {id, width, height, width2, height2, type, text} = shape;
                    const w = width2 - width;   
                    const h = height2 - height;
                    const nexX1 = width + gapW;
                    const nexY1 = height + gapH;
                    updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, null, null, null, text);
                }else if(shape.type === "physically-flow"){
                    const {id, width, height, width2, height2, type, angle} = shape;
                    const w = width2 - width;   
                    const h = height2 - height;
                    const nexX1 = width + gapW;
                    const nexY1 = height + gapH;
                    updateElementWithAngle(elements, ctx, id, nexX1, nexY1, w, h, type, angle);
                }else if(shape.type === "input"){
                    const {id, width, height, width2, height2, type, angle} = shape;
                    const w = width2 - width;   
                    const h = height2 - height;
                    const nexX1 = width + gapW;
                    const nexY1 = height + gapH;
                    updateElementWithAngle(elements, ctx,id, nexX1, nexY1, w, h, type, angle);
                }else {
                    const {id, width, height, width2, height2, type} = shape;
                    const w = width2 - width;   
                    const h = height2 - height;
                    // console.log(`width: ${width},height:${height} gapW: ${gapW} gapH: ${gapH}`)
                    const nexX1 = width + gapW;
                    const nexY1 = height + gapH;
                    updateElement(elements, ctx,id, nexX1, nexY1, w, h, type);
                }
            })
        }
        if(connectArrows){
            updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, shapes, increaseWidth + 300, increaseHeight + 200, null, connectArrows);
            connectArrows.forEach(connectArrow => {
                movingArrows(connectArrow, nexX1, nexY1, w, h) // connectArrow gives a flood paramters, thats the reason why is not working a moving
            })
        }else{
            updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, shapes, increaseWidth + 300, increaseHeight + 200, connectArrows);
        }
    }

const updateText = (pageX, pageY, ctx, selectedElement, elements) =>{
    const {id, width, height, width2, height2, type, offSetX, offSetY, text} = selectedElement;
    const w = width2 - width;   
    const h = height2 - height;
    const nexX1 = pageX - offSetX;
    const nexY1 = pageY - offSetY;
    updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, null, null, null, text);
}
const updatePhysicallyFlow = (pageX, pageY, ctx, selectedElement, elements) =>{
    const {id, width, height, width2, height2, type, offSetX, offSetY, angle} = selectedElement;
    const w = width2 - width;   
    const h = height2 - height;
    const nexX1 = pageX - offSetX;
    const nexY1 = pageY - offSetY;
    updateElementWithAngle(elements, ctx, id, nexX1, nexY1, w, h, type, angle);
}
const updateInput = (pageX, pageY, ctx, selectedElement, elements) => {
    const {id, width, height, width2, height2, type, offSetX, offSetY, angle} = selectedElement;
    const w = width2 - width;   
    const h = height2 - height;
    const nexX1 = pageX - offSetX;
    const nexY1 = pageY - offSetY;
    updateElementWithAngle(elements, ctx,id, nexX1, nexY1, w, h, type, angle);
} 
const updateElse = (pageX, pageY, ctx, selectedElement, elements) => {
    const {id, width, height, width2, height2, type, offSetX, offSetY} = selectedElement;
    const w = width2 - width;   
    const h = height2 - height;
    const nexX1 = pageX - offSetX;
    const nexY1 = pageY - offSetY;
    updateElement(elements, ctx,id, nexX1, nexY1, w, h, type);
}


export {updateEndOfInstance, updateProcess, updateText, updatePhysicallyFlow, updateInput, updateElse}