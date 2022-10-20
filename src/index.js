import {getButtons} from './components/ShowBlock.js';
import {chooseShape} from './components/chooseShape.js'
import {updateElement} from './components/updateElement.js'

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

    const finishDrawing = (event) => {
        const {clientX, clientY} = event;
        const result = elements.filter(element => element.id !== selectedElement.id)
        
        //basic is the process, which should be enlarged
        const basic = getElementAtPosition(clientX, clientY, result);
        if(basic && basic.type === "process"){
            const {id, width, height, width2, height2, type, shapes} = basic;
            const offSetX = clientX - width;
            const offSetY = clientY - height;
            const w = width2 - width;   
            const h = height2 - height;
            const nexX1 = clientX - offSetX;
            const nexY1 = clientY - offSetY;
            
            //pushing to the array
            shapes.push(selectedElement)
            // console.log(shapes)
            // console.log(`id: ${id}, nexX1: ${nexX1}, nexY1: ${nexY1}, w: ${w}, h: ${h}`)
            // updateElement(id, nexX1, nexY1, w + 100, h + 100, type, 100, selectedElement);     !! fix w + 100 and h + 100 
            updateElement(elements ,ctx,id, nexX1, nexY1, w, h, type, shapes, 100);
            
            const processes = elements.filter(element => element.type === "process")
            let propertyOfProcesses = processes.map(process => process.w)
            const theBiggest = Math.max(propertyOfProcesses)
            console.log(theBiggest)
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
                const {id, width, height, width2, height2, type, offSetX, offSetY, shapes} = selectedElement;
                const w = width2 - width;   
                const h = height2 - height;
                const nexX1 = clientX - offSetX;
                const nexY1 = clientY - offSetY;
                updateElement(elements, ctx, id, nexX1, nexY1, w, h, type, shapes);
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
                const nexX1 = clientX - offSetX;
                const nexY1 = clientY - offSetY;
                updateElement(elements, ctx,id, nexX1, nexY1, w, h, type, shapes, 100);
                // if(enlarge && element.type === "process"){
                //     updateElement(id, nexX1, nexY1, w, h, type, 100, selectedElement);
                // }
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