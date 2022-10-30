export default class PhysicallyFlow{
    constructor(id, ctx, type, width, height, width2, height2, w, angle){
       this.id = id;
       this.ctx = ctx;
       this.type = type;
       this.width = width;
       this.height = height;
       this.width2 = width2;
       this.height2 = height2;
       this.w = w;
       this.angle = angle;
    }
    
    getShape(){
        const{ctx, width, height, width2, height2, w, angle} = this;
        ctx.beginPath();
        ctx.moveTo(width, height);
        ctx.lineTo(width2 - 15, height2);
        ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(width2 - 30, height2);
        // ctx.lineTo(width2 - 15, height2);
        // ctx.stroke();

        ctx.save()
        ctx.beginPath();
        ctx.translate(width2 - 15, height2);
        ctx.rotate(angle*(Math.PI/180));   // 0 is a start and the 359 is the end
        ctx.translate(-(width2 -15), -height2);
        ctx.moveTo(width2, height2);
        ctx.lineTo(width2 - 15, height2 - 7);
        ctx.lineTo(width2 - 15, height2 + 7);
        ctx.closePath()
        ctx.fill();
        ctx.restore()
    }
}
    // const form = document.createElement("form")
    // const input = document.createElement("input");
    // input.setAttributeNS(null, "style", "padding:30px")
    // document.body.appendChild(form);
    // form.appendChild(input)
    
    // const svg = document.createElement("svg");
    // const defs = document.createElement("defs");
    // const marker = document.createElement("marker");
    // const line = document.createElement("line");
    // const polygon = document.createElement("polygon");
    // svg.setAttributeNS(null ,"viewBox", "0 0 350 100");
    // marker.id = "arrowhead";
    // marker.setAttributeNS(null, "markerWidth", "10")
    // marker.setAttributeNS(null, "markerHeight", "7")
    // marker.setAttributeNS(null, "refX", "0")
    // marker.setAttributeNS(null, "refY", "3.5")
    // marker.setAttributeNS(null, "orient", "auto")

    // polygon.setAttributeNS(null, "points", "0 0, 10 3.5, 0 7")
    // line.setAttributeNS(null, "x1", "0")
    // line.setAttributeNS(null, "y1", "50")
    // line.setAttributeNS(null, "x2", "250")
    // line.setAttributeNS(null, "y2", "50")
    // line.setAttributeNS(null, "stroke", "#000")
    // line.setAttributeNS(null, "stroke-width", "8")
    // line.setAttributeNS(null, "style", "z-index: 1")
    // line.setAttributeNS(null, "marker-end", "url(#arrowhead)")

    // document.body.appendChild(svg);
    // svg.appendChild(defs);
    // svg.appendChild(line);
    // defs.appendChild(marker); 
    // marker.appendChild(polygon); 
//    }
// }


// const physicallyFlow = (ctx, width, height) => {
//     ctx.beginPath();
//     ctx.moveTo(width, height);
//     ctx.lineTo(width + 200, height);
//     ctx.stroke();


// export {physicallyFlow}
// // export default class PhysicallyFlow{
// //     constructor(ctx, width, height, color){
// //         this.ctx = ctx;
// //         this.width = width;
// //         this.height = height;
// //         this.color = color;
// //     }

// //     getShape(){
// //         const{ctx, width, height} = this;

// //         ctx.beginPath();
// //         ctx.moveTo(width, height);
// //         ctx.lineTo(width + 200, height);
// //         ctx.stroke();

// //         ctx.beginPath();
// //         ctx.moveTo(width + 200, height);
// //         ctx.lineTo(width + 185, height - 7);
// //         ctx.lineTo(width + 185, height + 7);
// //         ctx.fill()
// //     }
// // }