export default class Text{
    constructor(id, ctx, type, width, height, width2, height2, text){
        this.id = id;
        this.ctx = ctx;
        this.type = type
        this.width = width;
        this.height = height;
        this.width2 = width2;
        this.height2 = height2;
        this.text = text;
    }

    getShape(){
        const {ctx, width, height, text} = this;
        ctx.font = "24px sans-serif";
        ctx.textBaseline = "top";
        ctx.fillText(text, width, height)
    }
}