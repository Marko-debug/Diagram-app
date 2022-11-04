const join = () => {
    
}

const nearElement = (pageX, pageY, result) => {
    const joinA = result.find(element => 
        pageX >= element.width + 15 && pageX <= element.width2 - 15 && pageY >= element.height -5 && pageY <= element.height + 5);
    const joinB = result.find(element => 
        pageX >= element.width + 15 && pageX <= element.width2 - 15 && pageY >= element.height2 -5 && pageY <= element.height2 + 5 );
    const joinL = result.find(element => 
        pageX <= element.width + 5 && pageX >= element.width - 5 && pageY >= element.height + 15 && pageY <= element.height2 - 15);
    const joinR = result.find(element => 
        pageX <= element.width2 + 5 && pageX >= element.width2 - 5 && pageY >= element.height + 15 && pageY <= element.height2 - 15);
    if(joinA)return {connect: joinA, position: "above"};
    else if(joinB)return {connect: joinB, position: "beneath"};
    else if(joinL)return {connect: joinL, position: "left"};
    else if(joinR)return {connect: joinR, position: "rigth"};
    else null;
}

const movingArrows = (connectArrow, nexX1, nexY1, w, h) => {
    if(connectArrow.position === "above"){                           
        const wArrow = nexX1 + w/2 - connectArrow.width;
        const hArrow = nexY1 - connectArrow.height;
        updateElementWithAngle(elements, ctx, connectArrow.id, connectArrow.width, connectArrow.height, wArrow, hArrow, connectArrow.type, connectArrow.angle, connectArrow.connect, connectArrow.position);}
    if(connectArrow.position === "right"){ 
        const wArrow = nexX1 + w - connectArrow.width;
        const hArrow = nexY1 + h/2 - connectArrow.height;
        updateElementWithAngle(elements, ctx, connectArrow.id, connectArrow.width, connectArrow.height, wArrow, hArrow, connectArrow.type, connectArrow.angle, connectArrow.connect, connectArrow.position);}
    if(connectArrow.position === "beneath"){
        const wArrow = nexX1 + w/2 - connectArrow.width;
        const hArrow = nexY1 + h - connectArrow.height;
        updateElementWithAngle(elements, ctx, connectArrow.id, connectArrow.width, connectArrow.height, wArrow, hArrow, connectArrow.type, connectArrow.angle, connectArrow.connect, connectArrow.position);}
    if(connectArrow.position === "left"){
        const wArrow = nexX1 - connectArrow.width;
        const hArrow = nexY1 + h/2 - connectArrow.height;
        updateElementWithAngle(elements, ctx, connectArrow.id, connectArrow.width, connectArrow.height, wArrow, hArrow, connectArrow.type, connectArrow.angle, connectArrow.connect, connectArrow.position);}
}

export {join, nearElement, movingArrows}