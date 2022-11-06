export default class EventTransition{
    constructor(id, ctx, type, width, height, width2, height2, radius){
        this.id = id;
        this.ctx = ctx;
        this.type = type;
        this.width = width;
        this.height = height;
        this.width2 = width2;
        this.height2 = height2;
        this.radius = radius;
    }
    getShape(){
        const {ctx, width, height, radius, width2, height2} = this;
        // console.log(`width: ${width},height:${height} width2: ${width2} height2: ${height2}`)

        ctx.beginPath();
        ctx.moveTo(width, height + 25);
        ctx.arcTo(width, height + 50, width + 150, height + 50, radius)
        ctx.arcTo(width + 150, height + 50, width + 150, height, radius)
        ctx.arcTo(width + 150, height, width, height, radius)
        ctx.arcTo(width, height, width, height + 50, radius)
        ctx.stroke();
    }
    selected(){
        const{ctx, width, height, width2, height2} = this;
        ctx.fillStyle = 'rgb(0, 172, 230)';
        ctx.beginPath();
        ctx.arc(width, height, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(width2, height, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(width, height2, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(width2, height2, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}