import {getButtons} from './components/ShowBlock.js';
import {chooseShape} from './components/chooseShape.js'

import Process from './shapes/Process.js'
import {physicallyFlow} from './shapes/PhysicallyFlow.js'
import {informationFlow} from './shapes/InformationFlow.js'
import Input from './shapes/Input.js';
// import Output from './shapes/Output.js';
import EndOfInstance from './shapes/EndOfInstance.js';
// import EventTransition from './shapes/EventTransition.js';
// import TwoBranches from './shapes/TwoBranches.js';
// import ThreeBranches from './shapes/ThreeBranches.js';
// import SplitBranches from './shapes/SplitBranches.js';
// import Parallel from './shapes/Parallel.js';
// import EndOfTwoProcess from './shapes/EndOfTwoProcess.js';
// import EndOfThreeProcess from './shapes/EndOfThreeProcess.js';

// later, to make this navbar to be dynamic, that means, to move it wherever i want either with showing block and to minimazi and maximazi as well

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

    const updateElement = (id, nexX1, nexY1, w, h, type, increase) => {
        if(type === "process"){
            elements[id] = new Process(id, ctx, type, nexX1, nexY1, nexX1 + w, nexY1 + h, 10, increase);
        }
        else if(type === "input"){
            elements[id] = new Input(id, ctx, type, nexX1, nexY1, nexX1 + w, nexY1 + h, 3);
        }
        else if(type === "end-of-instance"){
            elements[id] = new EndOfInstance(id, ctx, type, nexX1 + w/2, nexY1 + h/2,nexX1, nexY1, nexX1 + w, nexY1 + h, 50);
        }else{
            throw new Error(`Type not recognised" ${type}`)
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        elements.forEach(element => {
            element.getShape()
        })
    }

    const nearPoint = (clientX, clientY, peakWidth, peakHeight, name) => {
        return Math.abs(clientX - peakWidth) < 5 && Math.abs(clientY, peakHeight) < 5 ? name : null;
    }

    const cursorForPosition = (position) =>{
        switch(position){
            case 'start':
                return 'nwse-resize';
            default:
                return 'move';
        }
    }


    const positionWithinElement = (clientX, clientY, element) => {
        if(element.type === "end-of-instance"){
            const {width2, height2, width3, height3} = element;
            const inside = clientX >= width2 && clientX <= width3 && clientY >= height2 && clientY <= height3 ? 'inside' : null;         
            return inside;
        }
        else{
            const {width, height, width2, height2} = element;
            const inside = clientX >= width && clientX <= width2 && clientY >= height && clientY <= height2 ? 'inside' : null;         
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
            // if(element.position === 'start'){
            //     action = "rotation"
            // }
        }
    }

    const finishDrawing = () => {
        action = 'none'
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
                updateElement(id, nexX1, nexY1, w, h, type);
            }else{
                const {id, width, height, width2, height2, type, offSetX, offSetY} = selectedElement;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = clientX - offSetX;
                const nexY1 = clientY - offSetY;
                updateElement(id, nexX1, nexY1, w, h, type);
            }
            const result = elements.filter(element => element.id !== selectedElement.id)
            const enlarge = getElementAtPosition(clientX, clientY, result);

            if(enlarge){
                const offSetX = clientX - enlarge.width;
                const offSetY = clientY - enlarge.height;

                const {id, width, height, width2, height2, type} = enlarge;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = clientX - offSetX;
                const nexY1 = clientY - offSetY;
                updateElement(id, nexX1, nexY1, w, h, type, 100);
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
    } 

    //adding functions to canvas
    canvas.onmousedown = startDrawing;
    canvas.onmouseup = finishDrawing;
    canvas.onmousemove = adjustment;

    for(const button of getButtons)
    button.ref.addEventListener('click', () =>chooseShape(button.shape, elements, ctx))
})
