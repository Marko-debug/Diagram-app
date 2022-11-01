export default class Input{
    constructor(id, ctx, type, width, height, width2, height2,radius, angle){
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
        this.angle = angle;
    }

    getShape(){
        const {ctx, width, height, width2, height2, radius, angle} = this;
        ctx.beginPath();
        ctx.save();
        ctx.translate((width2 - width)/2 + width, (height2 - height)/2 + height);
        ctx.rotate(0*(Math.PI/180));   // 0 is a start and the 359 is the end
        ctx.translate(-((width2 - width)/2 + width), -((height2 - height)/2 + height));
        ctx.moveTo(width, height + 2);
        ctx.arcTo(width, height + 60, width + 150, height + 60, radius);
        ctx.arcTo(width + 150, height + 60, width + 150, height + 100, radius);
        ctx.arcTo(width + 150, height + 100, width + 210, height + 30, radius);
        ctx.arcTo(width + 210, height + 30, width + 150, height - 40, radius);
        ctx.arcTo(width + 150, height - 40, width + 150, height, radius);
        ctx.arcTo(width + 150, height, width, height, radius);
        ctx.arcTo(width, height, width, height + 60, radius);
        ctx.stroke();
        ctx.restore();
        ctx.closePath();
    }
    selected(){
        const{ctx, width, height, width2, height2, angle} = this;
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0, 172, 230)';
        if(0 <= angle <= 45)ctx.arc(width + 210, height + 30, 6, 0, 2 * Math.PI);
        else if(45 < angle <= 90 )ctx.arc(width + 30, height + 210, 6, 0, 2 * Math.PI);
        // else if(width2 - width)ctx.arc(width2 + 30, height2 - 30, 6, 0, 2 * Math.PI);
        // else if(width2 - width)ctx.arc(width2 + 30, height2 - 30, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}