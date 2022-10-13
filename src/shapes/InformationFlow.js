const informationFlow = (ctx, width, height) => {
    ctx.beginPath();
    ctx.moveTo(width, height);
    ctx.lineTo(width + 200, height);
    ctx.lineTo(width + 175, height - 7);
    ctx.moveTo(width + 200, height)
    ctx.lineTo(width + 175, height + 7);
    ctx.stroke()
}

export {informationFlow}

// export default class InformationFlow{
//     constructor(ctx, width, height, color){
//         this.ctx = ctx;
//         this.width = width;
//         this.height = height;
//         this.color = color;
//     }

//     getShape(){
//         const {ctx} = this;
//         ctx.beginPath();
//         ctx.moveTo(1000, 400);
//         ctx.lineTo(1200, 400);
//         ctx.lineTo(1170, 390);
//         ctx.moveTo(1200, 400);
//         ctx.lineTo(1170, 410);
//         ctx.stroke();
//     }
// }