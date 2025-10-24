export class State {
    register_a = 0;
    register_b = 0;
    register_c = 0;
    programCounter = 0;
    program = [];
    output = [];
    instructions = {
        0: (operand) => this.adv(operand),
        1: (operand) => this.bxl(operand),
        2: (operand) => this.bst(operand),
        3: (operand) => this.jnz(operand),
        4: (operand) => this.bxc(operand),
        5: (operand) => this.out(operand),
        6: (operand) => this.bdv(operand),
        7: (operand) => this.cdv(operand),
    };
    
    /**
     * @param {string} registerAText 
     * @param {string} registerBText 
     * @param {string} registerCText 
     * @param {string} instructions
     */
    constructor(registerAText, registerBText, registerCText, instructions) {
        this.register_a = parseInt(registerAText.split(": ")[1]);
        this.register_b = parseInt(registerBText.split(": ")[1]);
        this.register_c = parseInt(registerCText.split(": ")[1]);
        this.program = instructions.split(": ")[1].split(",").map(o => parseInt(o));
    };

    /**
     * A Division (opcode 0)
     * @param {number} operand combo
     */
    adv(operand) {
        let numerator = this.register_a;

        let denominator = 2**this.parseComboOperand(operand);
        this.register_a = Math.floor(numerator / denominator);
        this.incrementPC();
    }

    /**
     * Bitwise XOR B (opcode 1)
     * @param {number} operand literal
     */
    bxl(operand) {
        this.register_b = this.register_b ^ operand;
        this.incrementPC();
    }

    /**
     * modulo 8 (opcode 2)
     * @param {number} operand combo
     */
    bst(operand) {
        this.register_b = this.parseComboOperand(operand) % 8;
        this.incrementPC();
    }

    /**
     * Jump if not zero (opcode 3)
     * @param {number} operand literal
     */
    jnz(operand) {
        if (this.register_a == 0) {
            this.incrementPC();
            return;
        }
        this.programCounter = operand;
    }

    /**
     * Bitwise XOR B & C (opcode 4)
     * @param {number} operand IGNORED
     */
    bxc(operand) {
        this.register_b = this.register_b ^ this.register_c;
        this.incrementPC();
    }

    /**
     * Output combo mod 8 (opcode 5)
     * @param {number} operand combo
     */
    out(operand) {
        this.output.push(this.parseComboOperand(operand) % 8);
        this.incrementPC();
    }

    /**
     * B Division (opcode 6)
     * @param {number} operand combo
     */
    bdv(operand) {
        let numerator = this.register_a;
        let denominator = 2**this.parseComboOperand(operand);
        this.register_b = Math.floor(numerator / denominator);
        this.incrementPC();
    }

    /**
     * C Division (opcode 7)
     * @param {number} operand combo
     */
    cdv(operand) {
        let numerator = this.register_a;
        let denominator = 2**this.parseComboOperand(operand);
        this.register_c = Math.floor(numerator / denominator);
        this.incrementPC();
    }

    /**
     * Increment the program counter by 2
     */
    incrementPC() {
        this.programCounter += 2;
    }

    /**
     * Execute the instruction at the program counter
     */
    execute() {
        while (true) {
            if (this.programCounter >= this.program.length)
                break;
            let opcode = this.program[this.programCounter];
            let operand = this.program[this.programCounter+1];

            let instruction = this.instructions[opcode];
            instruction(operand);
        }
    }

    /**
     * Convert a combo operand to a value
     * @param {number} operand 
     */
    parseComboOperand(operand) {
        operand = parseInt(operand);
        if (operand >= 0 && operand <= 3)
            return operand;
        if (operand == 4)
            return this.register_a;
        if (operand == 5)
            return this.register_b;
        if (operand == 6)
            return this.register_c;
        if (operand == 7)
            throw "invalid";
    }
}