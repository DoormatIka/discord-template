
class Argument {
    constructor(
        public name: string,
        public value: string | undefined,
        public isNullFunction: () => Promise<void>
    ) {}
}

class CommandHandler {
    private run: (...args: Argument[]) => Promise<void>
    constructor(
        public name: string,
        execute: (...args: Argument[]) => Promise<void>,
        public args: Argument[]
    ) { this.run  = execute; }
    
    async execute() {
        await this.run(...this.args);
    }
}

// export const command = new CommandHandler()
// calculate(operator: "plus" | "minus", number: "number");
const exampleCommand = ["plus", "21"];
const handler = new CommandHandler("calculate", 
    async (operator, number) => {
        
    },
    [ new Argument("operator", exampleCommand.at(0), async () => {}),
      new Argument("number", exampleCommand.at(1), async () => {})    ]
)