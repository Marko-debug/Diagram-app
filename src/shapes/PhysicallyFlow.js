
const physicallyFlow = (ctx, width, height) => {
    ctx.beginPath();
    ctx.moveTo(width, height);
    ctx.lineTo(width + 200, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width + 200, height);
    ctx.lineTo(width + 185, height - 7);
    ctx.lineTo(width + 185, height + 7);
    ctx.fill()
}

export {physicallyFlow}
// export default class PhysicallyFlow{
//     constructor(ctx, width, height, color){
//         this.ctx = ctx;
//         this.width = width;
//         this.height = height;
//         this.color = color;
//     }

//     getShape(){
//         const{ctx, width, height} = this;

//         ctx.beginPath();
//         ctx.moveTo(width, height);
//         ctx.lineTo(width + 200, height);
//         ctx.stroke();

//         ctx.beginPath();
//         ctx.moveTo(width + 200, height);
//         ctx.lineTo(width + 185, height - 7);
//         ctx.lineTo(width + 185, height + 7);
//         ctx.fill()
//     }
// }