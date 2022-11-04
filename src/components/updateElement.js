import Process from '../shapes/Process.js'
import PhysicallyFlow from '../shapes/PhysicallyFlow.js'
// import {informationFlow} from '../shapes/InformationFlow.js'
import Input from '../shapes/Input.js';
import Output from '../shapes/Output.js';
import EndOfInstance from '../shapes/EndOfInstance.js';
import EventTransition from '../shapes/EventTransition.js';
// import TwoBranches from '../shapes/TwoBranches.js';
// import ThreeBranches from '../shapes/ThreeBranches.js';
// import SplitBranches from '../shapes/SplitBranches.js';
// import Parallel from '../shapes/Parallel.js';
// import EndOfTwoProcess from '../shapes/EndOfTwoProcess.js';
// import EndOfThreeProcess from '../shapes/EndOfThreeProcess.js';
import Text from '../shapes/Text.js';

const updateElement = (elements, ctx, id, nexX1, nexY1, w, h, type, shapes, increaseWidth, increaseHeight, text, connectArrows) => {
    if(type === "process"){
        elements[id] = new Process(id, ctx, type, nexX1, nexY1, nexX1 + w, nexY1 + h, w, 10, shapes, increaseWidth - 300, increaseHeight - 200, connectArrows);
    }
    else if(type === "output"){
        elements[id] = new Output(id, ctx, type, nexX1, nexY1, nexX1 + w, nexY1 + h, 3);
    }
    else if(type === "end-of-instance"){
        elements[id] = new EndOfInstance(id, ctx, type, nexX1 + w/2, nexY1 + h/2,nexX1, nexY1, nexX1 + w, nexY1 + h, 50);
    }
    else if(type === "event-transition"){
        elements[id] = new EventTransition(id, ctx, type, nexX1, nexY1, nexX1 + w, nexY1 + h, 25);
    }
    else if(type === "text"){
        elements[id] = new Text(id, ctx, type, nexX1, nexY1, nexX1 + w, nexY1 + h, text);
    }
    else{
        throw new Error(`Type not recognised" ${type}`)
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach(element => {
        element.getShape()
    })
}

const updateElementWithAngle = (elements, ctx, id, nexX1, nexY1, w, h, type, angle, connect, position) => {
    
    if(type === "physically-flow"){
        elements[id] = new PhysicallyFlow(id, ctx, type, nexX1, nexY1, nexX1 + w, nexY1 + h, nexX1 + w - 15, nexY1, w, h, angle, connect, position);
    }
    else if(type === "input"){
        elements[id] = new Input(id, ctx, type, nexX1, nexY1, nexX1 + w, nexY1 + h, 3);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach(element => {
        element.getShape()
    })
}

export {updateElement, updateElementWithAngle}