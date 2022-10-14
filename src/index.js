import {getButtons} from './components/ShowBlock.js';
import {chooseShape} from './components/chooseShape.js'

import Process from './shapes/Process.js'
import {physicallyFlow} from './shapes/PhysicallyFlow.js'
import {informationFlow} from './shapes/InformationFlow.js'
import Input from './shapes/Input.js';
// import Output from './shapes/Output.js';
// import EndOfInstatnce from './shapes/EndOfInstance.js';
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

    const updateElement = (id, x1, y1, x2, y2, type) => {
        if(type === "process"){
            elements[id] = new Process(id, ctx, type, x1, y1, x2, y2, 10);
        }else{
            throw new Error(`Type not recognised" ${type}`)
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        elements.forEach(element => {
            element.getShape()
        })
    }
    
    const positionWithinElement = (clientX, clientY, element) => {
        const {width, height, width2, height2} = element;
        //  default values: width=1000, height=300, width=100, height=500
        const inside = clientX >= width && clientX <= width2 && clientY >= height && clientY <= height2 ? 'inside' : null;         
        return inside;
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
            const offSetX = clientX - element.width;
            const offSetY = clientY - element.height;
            selectedElement = {...element, offSetX, offSetY};
            
            if(element.position === 'inside'){
                action = "moving";
            }
        }
    }

    const finishDrawing = () => {
        action = 'none'
    }

    const adjustment = (event) => {
        const {clientX, clientY} = event;
        const element = getElementAtPosition(clientX, clientY, elements);
        event.target.style.cursor = element ? "move" : "default";
        // console.log("adjustment")
        // console.log(action)
        
        if(action === "moving"){
            const {id, width, height, width2, height2, type, offSetX, offSetY} = selectedElement;
            const w = width2 - width;   
            const h = height2 - height;
            const nexX1 = clientX - offSetX;
            const nexY1 = clientY - offSetY;
            updateElement(id, nexX1, nexY1, nexX1 + w, nexY1 + h, type);
        }
    } 

    //adding functions to canvas
    canvas.onmousedown = startDrawing;
    canvas.onmouseup = finishDrawing;
    canvas.onmousemove = adjustment;

    for(const button of getButtons)
    button.ref.addEventListener('click', () =>chooseShape(button.shape, elements, ctx))
})
