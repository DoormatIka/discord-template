
class Argument {
    constructor(
        public name: string,
        public value: string,
        private isNullFunction: () => Promise<void>,
    ) {}

    async getIsNull(): Promise<boolean> {
        const isNull = this.value ? false : true;
        if (isNull) {
            await this.isNullFunction();
            return true;
        }
        return false;
    }
}

class CommandHandler {
    private run: (...args: Argument[]) => Promise<void>
    constructor(
        public name: string,
        execute: (...args: Argument[]) => Promise<void>,
        private args: Argument[]
    ) { this.run  = execute; }
    
    async execute() {
        const isNull = this.checkNull(this.args);

        if (isNull === false) {
        }
        await this.run(...this.args);
    }

    private async checkNull(args: Argument[]) {
        for (const arg of args) {
            const isNull = await arg.getIsNull();
            if (isNull) return true;
        }
        return false;
    }
}

// export const command = new CommandHandler()
// calculate(operator: "plus" | "minus", number: "number");
const exampleCommand = ["plus", "21"];
const handler = new CommandHandler("calculate", 
    async (operator, number) => {
        operator.getIsNull()
    },
    [ new Argument("operator", exampleCommand[0], async () => {}),
      new Argument("number", exampleCommand[1], async () => {})    ]
)
