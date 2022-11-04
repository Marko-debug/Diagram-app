export default class Process{
     constructor(id, ctx, type, width, height, width2, height2, w, radius, shapes, increaseWidth, increaseHeight, connectArrows){
        this.id = id;
        this.ctx = ctx;
        this.type = type;
        this.width = width;
        this.height = height;
        this.width2 = width2;
        this.height2 = height2;
        this.w = w;
        this.radius = radius;
        this.increaseWidth = increaseWidth;
        this.increaseHeight = increaseHeight;
        this.shapes = shapes;
        this.connectArrows = connectArrows;
    }

    getShape(){
        const {ctx, width, height, radius, increaseWidth, increaseHeight, shapes} = this;
        
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors
        // let offset = 0;
        // function draw() {
        // ctx.setLineDash([4, 2]);
        // ctx.lineDashOffset = -offset;
        // ctx.strokeRect(width + 50, height + 80, 300, 200);
        // }

        // function march() {
        // offset++;
        // if (offset > 16) {
        //     offset = 0;
        // }
        // draw();
        // setTimeout(march, 20);
        // }

        // march();
        
        if(increaseWidth === 100 && increaseHeight === 100){    

            //main round rectangle
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.moveTo(width, height + 9);
            ctx.arcTo(width, height + 200 + increaseHeight, width + 300 + increaseWidth, height + 200 + increaseHeight, radius);
            ctx.arcTo(width + 300 + increaseWidth, height + 200 + increaseHeight, width + 300 + increaseWidth, height, radius);
            ctx.arcTo(width + 300 + increaseWidth, height, width, height, radius);
            ctx.arcTo(width, height, width, height + 200 + increaseHeight, radius);
            ctx.font = '28px serif';
            ctx.fillText('INSERT', width + 150, height + 170)
            ctx.stroke();



            //expected time
            ctx.beginPath();
            ctx.moveTo(width + 200 + increaseWidth, height);
            ctx.arcTo(width + 125 + increaseWidth, height, width + 125 + increaseWidth, height + 60, radius);
            ctx.arcTo(width + 125 + increaseWidth, height + 60, width + 300 + increaseWidth, height + 60, radius);
            ctx.arcTo(width + 300 + increaseWidth, height + 60, width + 300 + increaseWidth, height, radius);
            ctx.stroke();

            //process owner
            ctx.beginPath();
            ctx.moveTo(width + 50, height + 200 + increaseHeight);
            ctx.arcTo(width + 175, height + 200 + increaseHeight, width + 175, height + 140 + increaseHeight, radius);
            ctx.arcTo(width + 175, height + 140 + increaseHeight, width, height + 140 + increaseHeight, radius);
            ctx.arcTo(width, height + 140 + increaseHeight, width, height + 200 + increaseHeight, radius);
            ctx.stroke();
        } 
        else if(increaseWidth || increaseHeight){
            // console.log(`width: ${increaseWidth}, height: ${increaseHeight} from`);

            //main round rectangle
            ctx.beginPath();
            ctx.moveTo(width, height + 9);
            ctx.arcTo(width, height + 200 + increaseHeight, width + 300 + increaseWidth, height + 200 + increaseHeight, radius);
            ctx.arcTo(width + 300 + increaseWidth, height + 200 + increaseHeight, width + 300 + increaseWidth, height, radius);
            ctx.arcTo(width + 300 + increaseWidth, height, width, height, radius);
            ctx.arcTo(width, height, width, height + 200 + increaseHeight, radius);
            ctx.stroke();
            
            //expected time
            ctx.beginPath();
            ctx.moveTo(width + 200 + increaseWidth, height);
            ctx.arcTo(width + 125 + increaseWidth, height, width + 125 + increaseWidth, height + 60, radius);
            ctx.arcTo(width + 125 + increaseWidth, height + 60, width + 300 + increaseWidth, height + 60, radius);
            ctx.arcTo(width + 300 + increaseWidth, height + 60, width + 300 + increaseWidth, height, radius);
            ctx.stroke();
            
            //process owner
            ctx.beginPath();
            ctx.moveTo(width + 50, height + 200 + increaseHeight);
            ctx.arcTo(width + 175, height + 200 + increaseHeight, width + 175, height + 140 + increaseHeight, radius);
            ctx.arcTo(width + 175, height + 140 + increaseHeight, width, height + 140 + increaseHeight, radius);
            ctx.arcTo(width, height + 140 + increaseHeight, width, height + 200 + increaseHeight, radius);
            ctx.stroke();

            // console.log(shapes)
        }
        else{
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
            ctx.closePath();

            // console.log(connectArrow)
        }
    }

    selected(){
        const{ctx, width, height, width2, height2} = this;
        ctx.beginPath();
        ctx.fillStyle = 'rgb(0, 172, 230)';
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