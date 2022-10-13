export default class Input{
    constructor(ctx, width, height, color){
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    getShape(){
        const {ctx} = this;
        ctx.beginPath();
        ctx.moveTo(1000, 402);
        ctx.arcTo(1000, 460, 1150, 460, 3);
        ctx.arcTo(1150, 460, 1150, 500, 3);
        ctx.arcTo(1150, 500, 1210, 430, 3);
        ctx.arcTo(1210, 430, 1150, 360, 3);
        ctx.arcTo(1150, 360, 1150, 400, 3);
        ctx.arcTo(1150, 400, 1000, 400, 3);
        ctx.arcTo(1000, 400, 1000, 460, 3);
        ctx.stroke();
    }
}