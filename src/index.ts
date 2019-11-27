import { ExpressionInterpreter } from "./interpreter/expression-builder";

const world = '🗺️';

export function hello(word: string = world): string {
  return `Hello ${world}! `;
}

export function interpreterTest(){
    const interpreter = new ExpressionInterpreter();
    const expression = "{{$Entity|lowerCase}}";
    const result = interpreter.interpret(expression.replace("{{","").replace("}}",""), "TenantSubscription");

    console.log(result.interpret(expression.replace("{{","").replace("}}","")));
  
}

console.log(hello());
interpreterTest();
