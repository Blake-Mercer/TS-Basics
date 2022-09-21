
// implementing Pick Utility 
// Constructs a type by picking the set of properties K from T.
type MyPick<T, K extends keyof T> =
    { [P in K]: T[P] };
//  P is used to constrain new properties to the values of K
//  K is constrained to the keys in T

interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
};

console.log(todo)

type Chainable<O = {}> = {
    option<K extends string, V>(key: K, value: V):
        Chainable<O & { [P in K]: V }>;
    get(): O;
};

declare const config: Chainable;

const result: Result = config
    .option("foo", 123)
    .option("name", "type-challenges")
    .option("bar", { value: "Hello World" })
    .get();

const fooType = result['foo']

interface Result {
    foo: number;
    name: string;
    bar: {
        value: string;
    };
}

interface Person {
    name: string;
    age: number;
}
type Partial2<T> = {
    [P in keyof T]?: T[P]; // P will be each key of T and optional
}
type PersonPartial = Partial<Person>;

const blake2: PersonPartial = {
    name: 'blake'
}