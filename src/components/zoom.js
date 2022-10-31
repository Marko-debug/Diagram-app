// in the browser is possible to zoom with Shift-key and mouseWheel up / down

const zoom = (ctx, elements) =>{
    const btnZoomIn = document.querySelector(".zoom-in");
    const btnZoomOut = document.querySelector(".zoom-out");

    btnZoomIn.addEventListener("click", () => {
        zoomIn();
    })

    btnZoomOut.addEventListener("click", () => {
        zoomOut();
    })

    let scale = 1;
    const zoomIn = () => {
        scale = scale + 0.01;
        drawContents();
    }
    
    const zoomOut = () => {
        scale = scale -0.01;
        drawContents();
    }

    const drawContents = () => {
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const newWidth = width * scale;
        const newHeight = height * scale;
        
        ctx.save();
        ctx.translate(-((newWidth-width)/2), -((newHeight-height)/2));
        console.log(scale)
        ctx.scale(scale, scale);
        ctx.clearRect(0, 0, width, height);
        elements.forEach(element => {
            element.getShape()
        })
        ctx.restore();
    }
}

export {zoom}