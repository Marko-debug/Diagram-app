import Process from '../shapes/Process.js'
import {physicallyFlow} from '../shapes/PhysicallyFlow.js'
import {informationFlow} from '../shapes/InformationFlow.js'
import Input from '../shapes/Input.js';
// import Output from '../shapes/Output.js';
import EndOfInstance from '../shapes/EndOfInstance.js';
// import EventTransition from '../shapes/EventTransition.js';
// import TwoBranches from '../shapes/TwoBranches.js';
// import ThreeBranches from '../shapes/ThreeBranches.js';
// import SplitBranches from '../shapes/SplitBranches.js';
// import Parallel from '../shapes/Parallel.js';
// import EndOfTwoProcess from '../shapes/EndOfTwoProcess.js';
// import EndOfThreeProcess from '../shapes/EndOfThreeProcess.js';

const chooseShape = (shape, elements, ctx) =>{
    const id = elements.length;
    
    if(shape === 'btn-process'){
        //ctx.roundRect(100, 10, 50, 50, [10]);       Appears an Error: roundRect is not a function
       //  const process = new Process(ctx);
       //  process.getShape()
       //  console.log(process.getShape())
       const width = 500;
       const height = 60;
       const type = "process"
       const element = new Process(id, ctx, type, width, height, width + 300, height + 200, 10);
       elements.push(element)
   }
   if(shape === "btn-physically-flow"){

       const position = physicallyFlow(ctx, 1000, 300, 10)
       const element = {id, position}
       elements.push(element)
   }
   if(shape === "btn-information-flow"){
       const position = informationFlow(ctx, 1000, 300, 10)
       const element = {id, position}
       elements.push(element)
   }
   if(shape === 'btn-input'){

       const width = 500;
       const height = 60;
       const type = "input";
       const element = new Input(id, ctx, type, width, height, width + 180, height + 60, 3);
       elements.push(element)
   }
   if(shape === 'btn-output'){
       //rectangle(ctx)
   }

   if(shape === 'btn-end-of-instance'){
    // width and height is the spot for center in circle, width2 and height2 is the beginning of left side, width3 and height3 is the beginning of right side 
        const width = 550;
        const height = 110;
        const type = "end-of-instance";
        const element = new EndOfInstance(id, ctx, type, width, height, width - 40, height - 40, width + 40, height + 40,50);
        elements.push(element)
   }

   if(shape === 'btn-event-transition'){
       //rectangle(ctx)
   }

   if(shape === 'btn-two-branches'){
       //rectangle(ctx)
   }

   if(shape === 'btn-three-branches'){
       //rectangle(ctx)
   }

   if(shape === 'btn-split-branches'){
       //rectangle(ctx)
   }

   if(shape === 'btn-parallel'){
       //rectangle(ctx)
   }

   if(shape === 'btn-rediraction'){
       //rectangle(ctx)
   }
   if(shape === 'btn-end-of-two-process'){
       //rectangle(ctx)
   }
   if(shape === 'btn-end-of-three-process'){
       //rectangle(ctx)
   }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach(element => {
        element.getShape()
    })
}
export {chooseShape}