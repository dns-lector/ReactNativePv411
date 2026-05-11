export {}

declare global {
    interface Date {   // у TS повторна декларація інтерфейсу додає до нього вміст 
        toDotted: () => string,
    }
    // Статичні методи розширень класів (типів) декларуються за 
    // іменем типа + Constructor
    interface DateConstructor {
        fromDotted: (str:string) => Date
    }
}

// статичні декларації - без .prototype
Date.fromDotted = function(str:string): Date {
    const dateParts = str.split(".");
    return new Date(
        +dateParts[2], 
        +dateParts[1] - 1, 
        +dateParts[0]
    ) ;
}

// об'єктні розширення - з .prototype
Date.prototype.toDotted = function(): string {
    return `${this.getDate().pad2()}.${(this.getMonth() + 1).pad2()}.${this.getFullYear()}`;
}