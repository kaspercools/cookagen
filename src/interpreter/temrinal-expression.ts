import {IExpression} from "./abstract-interpreter";

export default class DataExpression implements IExpression{
    
    private data:string;
    private needle:string;

    constructor(needle:string, data:string) {
        this.data=data;
        this.needle=needle;
    }

    interpret(context =''): string {
        if(context == this.needle){
           context = context.replace(this.needle,this.data);
        }
        return context;
    }
}