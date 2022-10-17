export default class EndOfInstance{
    constructor(id, ctx, type, width, height, width2, height2, width3, height3, radius){
        this.id = id;
        this.ctx = ctx;
        this.type = type;
        this.width = width;
        this.height = height;
        this.width2 = width2;
        this.height2 = height2; 
        this.width3 = width3;
        this.height3 = height3; 
        this.radius = radius; 
    }

    getShape(){
        const {ctx, width, height, radius} = this;
        ctx.beginPath();
        ctx.arc(width, height, radius, 0, Math.PI * 2, true);
        ctx.font = '38px serif';
        ctx.fillText('E', width - 10, height + 10)
        ctx.stroke();
    }
}
