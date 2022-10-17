export default class Input{
    constructor(id, ctx, type, width, height, width2, height2,radius){
        this.id = id;
        this.ctx = ctx;
        this.type = type
        this.width = width;
        this.height = height;
        this.width2 = width2;
        this.height2 = height2;
        // this.peakWidth = peakWidth;
        // this.peakHeight = peakHeight;
        this.radius = radius;
    }

    getShape(){
        const {ctx, width, height, radius} = this;

        ctx.beginPath();
        ctx.moveTo(width, height + 2);
        ctx.arcTo(width, height + 60, width + 150, height + 60, radius);
        ctx.arcTo(width + 150, height + 60, width + 150, height + 100, radius);
        ctx.arcTo(width + 150, height + 100, width + 210, height + 30, radius);
        ctx.arcTo(width + 210, height + 30, width + 150, height - 40, radius);
        ctx.arcTo(width + 150, height - 40, width + 150, height, radius);
        ctx.arcTo(width + 150, height, width, height, radius);
        ctx.arcTo(width, height, width, height + 60, radius);
        ctx.stroke();
    }
}