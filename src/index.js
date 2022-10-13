import {getButtons} from './components/ShowBlock.js';
//import History from './components/History.js'
import Process from './shapes/Process.js'
import {physicallyFlow} from './shapes/PhysicallyFlow.js'
import {informationFlow} from './shapes/InformationFlow.js'
import Input from './shapes/Input.js';

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
        // console.log(elements[id]);
        elements[id] = new Process(id, ctx, type, x1, y1, x2, y2, 10);
        // console.log(elements[id]);
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
            const offsetX = clientX - element.width;
            const offsetY = clientY - element.height;
            selectedElement = {...element, offsetX, offsetY};
            
            if(element.position === 'inside'){
                action = "moving";
            }
        }
    }

    const finishDrawing = (event) => {
        const {clientX, clientY} = event;
        console.log("finishDrawing")
    }

    const adjustment = (event) => {
        const {clientX, clientY} = event;
        const element = getElementAtPosition(clientX, clientY, elements);
        event.target.style.cursor = element ? "move" : "default";
        // console.log("adjustment")
        // console.log(action)

        if(action === "moving"){
            const {id, width, height, width2, height2, type, offSetX, offSetY} = selectedElement;
            console.log(selectedElement)
            const w = width2 - width;   
            const h = height2 - height;
            const nexX1 = clientX - offSetX;
            const nexY1 = clientY - offSetY;
            updateElement(id, nexX1, nexY1, nexX1 + w, nexY1 + h, type)
        }
    } 

    //adding functions to canvas
    canvas.onmousedown = startDrawing;
    canvas.onmouseup = finishDrawing;
    canvas.onmousemove = adjustment;

    const chooseShape = (shape) =>{

         if(shape === 'btn-process'){
             //ctx.roundRect(100, 10, 50, 50, [10]);       Appears an Error: roundRect is not a function
            //  const process = new Process(ctx);
            //  process.getShape()
            //  console.log(process.getShape())
            const width = 1000;
            const height = 300;

            const id = elements.length;
            const type = "process"
            const element = new Process(id, ctx, type, width, height, width + 300, height + 200, 10);
            element.getShape()
            elements.push(element)
            return;
        }
        if(shape === "btn-physically-flow"){

            const id = elements.length;
            const position = physicallyFlow(ctx, 1000, 300, 10)
            const element = {id, position}
            elements.push(element)
            console.log(elements)
            return;
        }
        if(shape === "btn-information-flow"){
            infoArrow(ctx)
            const id = elements.length;
            const position = informationFlow(ctx, 1000, 300, 10)
            const element = {id, position}
            elements.push(element)
            console.log(elements)
            return;
        }
        if(shape === 'btn-input'){
            const input = new Input(ctx);
            input.getShape();
            elements.push(input)
            return;
        }
        if(shape === 'btn-output'){
            //rectangle(ctx)
            return;
        }

        if(shape === 'btn-end-of-instance'){
            //rectangle(ctx)
            return;
        }

        if(shape === 'btn-event-transition'){
            //rectangle(ctx)
            return;
        }

        if(shape === 'btn-two-branches'){
            //rectangle(ctx)
            return;
        }

        if(shape === 'btn-two-branches'){
            //rectangle(ctx)
            return;
        }

        if(shape === 'btn-two-branches'){
            //rectangle(ctx)
            return;
        }

        if(shape === 'btn-two-branches'){
            //rectangle(ctx)
            return;
        }

        if(shape === 'btn-two-branches'){
            //rectangle(ctx)
            return;
        }
        if(shape === 'btn-two-branches'){
            //rectangle(ctx)
            return;
        }

    }

    for(const button of getButtons)
    button.ref.addEventListener('click', () =>chooseShape(button.shape))
})
