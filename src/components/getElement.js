const positionWithinElement = (pageX, pageY, element) => {
    if(element.type === "end-of-instance"){
        const {width2, height2, width3, height3} = element;
        const inside = pageX >= width2 && pageX <= width3 && pageY >= height2 && pageY <= height3 ? "inside" : null;         
        return inside;
    }
    else if(element.type === "physically-flow"){
        const {width, height, width2, height2, centerW, centerH} = element;
        const start = nearPoint(pageX, pageY, width, height, "start");
        const end = nearPoint(pageX, pageY, width2, height2, "end");
        // const movingHorizontal = nearPoint(pageX, pageY, w/2 + width, height, "movingHorizontal"); 
        // const movingVertical = nearPoint(pageX, pageY, width2 - 15, h/2 + height,"movingVertical");
        const inside = nearPoint(pageX, pageY, centerW, centerH, "inside");     
        // console.log(`pageX: ${pageX}, pageY: ${pageY}, width: ${centerW}, height: ${centerH}`)
        return start || end || inside;
    }
    else if(element.type === "process"){
        const {width, height, width2, height2} = element;
        const topLeft = nearPoint(pageX, pageY, width, height, "tl")
        const topRight = nearPoint(pageX, pageY, width2, height, "tr")
        const bottomLeft = nearPoint(pageX, pageY, width, height2, "bl")
        const bottomRight = nearPoint(pageX, pageY, width2, height2, "br")
        const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;     
        return topLeft || topRight || bottomLeft || bottomRight || inside;
    }
    else if(element.type === "text"){
        const {width, height, width2, height2} = element;
        const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;    
        return inside;
    }
    else if(element.type === "input"){
        const {width, height, width2, height2, angle} = element;
        if (0 <= angle <= 45) {
            const turn = nearPoint(pageX, pageY, width2 + 30, height2 - 30, "turn");
            const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;         
            return inside || turn;
        }
        else if (45 < angle <= 120 ){
            const turn = nearPoint(pageX, pageY, width2 + 30 , height2 + 30, "turn");
            const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;         
            return inside || turn;
        }
        else if (120 < angle <= 225 ){
            const turn = nearPoint(pageX, pageY, width2 - 30 , height2 + 30, "turn");
            const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;         
            return inside || turn;
        }
        else if (225 < angle <= 360 ){
            const turn = nearPoint(pageX, pageY, width2 - 30 , height2 - 30, "turn");
            const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;         
            return inside || turn;
        }
    }
    else{
        const {width, height, width2, height2} = element;
        const inside = pageX >= width && pageX <= width2 && pageY >= height && pageY <= height2 ? "inside" : null;         
        return inside;
    }
}

const getElementAtPosition = (pageX, pageY, elements) => {
    return elements
        .map(element => ({...element, position: positionWithinElement(pageX, pageY, element)}))
        .find(element => element.position !== null)
}

const nearPoint = (pageX, pageY, width, height, name) => {
    return Math.abs(pageX - width) < 5 && Math.abs(pageY - height) < 5 ? name : null;
}

export {getElementAtPosition}