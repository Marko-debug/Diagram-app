// const process = (ctx, width, height, radius) => {
//     //default numbers are width: 1000, height: 300, radius: 10
//     ctx.beginPath();
//     ctx.moveTo(width, height + 9);
//     ctx.arcTo(width, height + 200, width + 300, width + 200, radius);
//     ctx.arcTo(width + 300, height + 200, width + 300, height, radius);
//     ctx.arcTo(width + 300, height, width, height, radius);
//     ctx.arcTo(width, height, width, height + 200, radius);
//     ctx.stroke();

//     //expected time
//     ctx.beginPath();
//     ctx.moveTo(width + 200, height);
//     ctx.arcTo(width + 125, height, width + 125, height + 60, radius);
//     ctx.arcTo(width + 125, height + 60, width + 300, height + 60, radius);
//     ctx.arcTo(width + 300, height + 60, width + 300, height, radius);
//     ctx.stroke();

//     //process owner
//     ctx.beginPath();
//     ctx.moveTo(width + 50, height + 200);
//     ctx.arcTo(width + 175, height + 200, width + 175, height + 140, radius);
//     ctx.arcTo(width + 175, height + 140, width, height + 140, radius);
//     ctx.arcTo(width, height + 140, width, height + 200, radius);
//     ctx.stroke();
// }

// export {process}

export default class Process{
     constructor(id, ctx, type, width, height, width2, height2, w, radius, shapes,increase){
        this.id = id;
        this.ctx = ctx;
        this.type = type
        this.width = width;
        this.height = height;
        this.width2 = width2;
        this.height2 = height2;
        this.w = w;
        this.radius = radius;
        this.increase = increase;
        this.shapes = shapes;
    }
    
    // arrayShapes(){
    //     const {shape} = this
    //     shapes.push(shape);
    //     console.log(shapes);
    // }
    

    getShape(){
        const {ctx, width, height, radius, increase} = this;
        
        if(increase){    
            
            //main round rectangle
            ctx.beginPath();
            ctx.moveTo(width, height + 9);
            ctx.arcTo(width, height + 200 + increase, width + 300 + increase, height + 200 + increase, radius);
            ctx.arcTo(width + 300 + increase, height + 200 + increase, width + 300 + increase, height, radius);
            ctx.arcTo(width + 300 + increase, height, width, height, radius);
            ctx.arcTo(width, height, width, height + 200 + increase, radius);
            ctx.font = '28px serif';
            ctx.fillText('INSERT', width + 150, height + 170)
            ctx.stroke();
            
            //expected time
            ctx.beginPath();
            ctx.moveTo(width + 200 + increase, height);
            ctx.arcTo(width + 125 + increase, height, width + 125 + increase, height + 60, radius);
            ctx.arcTo(width + 125 + increase, height + 60, width + 300 + increase, height + 60, radius);
            ctx.arcTo(width + 300 + increase, height + 60, width + 300 + increase, height, radius);
            ctx.stroke();
            
            //process owner
            ctx.beginPath();
            ctx.moveTo(width + 50, height + 200 + increase);
            ctx.arcTo(width + 175, height + 200 + increase, width + 175, height + 140 + increase, radius);
            ctx.arcTo(width + 175, height + 140 + increase, width, height + 140 + increase, radius);
            ctx.arcTo(width, height + 140 + increase, width, height + 200 + increase, radius);
            ctx.stroke();
            
        }else{
            //main round rectangle
            ctx.beginPath();
            ctx.moveTo(width, height + 9);
            ctx.arcTo(width, height + 200, width + 300, height + 200, radius);
            ctx.arcTo(width + 300, height + 200, width + 300, height, radius);
            ctx.arcTo(width + 300, height, width, height, radius);
            ctx.arcTo(width, height, width, height + 200, radius);
            ctx.stroke();
            //expected time
            ctx.beginPath();
            ctx.moveTo(width + 200, height);
            ctx.arcTo(width + 125, height, width + 125, height + 60, radius);
            ctx.arcTo(width + 125, height + 60, width + 300, height + 60, radius);
            ctx.arcTo(width + 300, height + 60, width + 300, height, radius);
            ctx.stroke();
        
            //process owner
            ctx.beginPath();
            ctx.moveTo(width + 50, height + 200);
            ctx.arcTo(width + 175, height + 200, width + 175, height + 140, radius);
            ctx.arcTo(width + 175, height + 140, width, height + 140, radius);
            ctx.arcTo(width, height + 140, width, height + 200, radius);
            ctx.stroke();
        }
    }
}