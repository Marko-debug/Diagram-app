const grid = (ctx) => {

    ctx.lineWidth = 0.1;
    ctx.beginPath();

    for(let x=0.5; x<500; x+=10){
        ctx.moveTo(x,0);
        ctx.lineTo(x,375);
    }

    for(let y=0.5; y<375; y += 10){

        ctx.moveTo(0,y);
        ctx.lineTo(500, y);
    }
    ctx.stroke();
}

export {grid}