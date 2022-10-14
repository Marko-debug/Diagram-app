import Process from '../shapes/Process.js'
import {physicallyFlow} from '../shapes/PhysicallyFlow.js'
import {informationFlow} from '../shapes/InformationFlow.js'
import Input from '../shapes/Input.js';
// import Output from '../shapes/Output.js';
// import EndOfInstatnce from '../shapes/EndOfInstance.js';
// import EventTransition from '../shapes/EventTransition.js';
// import TwoBranches from '../shapes/TwoBranches.js';
// import ThreeBranches from '../shapes/ThreeBranches.js';
// import SplitBranches from '../shapes/SplitBranches.js';
// import Parallel from '../shapes/Parallel.js';
// import EndOfTwoProcess from '../shapes/EndOfTwoProcess.js';
// import EndOfThreeProcess from '../shapes/EndOfThreeProcess.js';

const chooseShape = (shape, elements, ctx) =>{

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
       elements.push(element)
   }
   if(shape === "btn-physically-flow"){

       const id = elements.length;
       const position = physicallyFlow(ctx, 1000, 300, 10)
       const element = {id, position}
       elements.push(element)
       return;
   }
   if(shape === "btn-information-flow"){
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

   if(shape === 'btn-three-branches'){
       //rectangle(ctx)
       return;
   }

   if(shape === 'btn-split-branches'){
       //rectangle(ctx)
       return;
   }

   if(shape === 'btn-parallel'){
       //rectangle(ctx)
       return;
   }

   if(shape === 'btn-rediraction'){
       //rectangle(ctx)
       return;
   }
   if(shape === 'btn-end-of-two-process'){
       //rectangle(ctx)
       return;
   }
   if(shape === 'btn-end-of-three-process'){
       //rectangle(ctx)
       return;
   }
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   elements.forEach(element => {
       element.getShape()
   })
}
export {chooseShape}