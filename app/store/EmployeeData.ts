export interface Employee {
    id: number;
    name: string;
    age: number;
    email: string;
    address: string;
}

const Data: Employee[] = [
     {
        id: 1,
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com',
        address: '123 Main St'
    },
    {
        id: 2,
        name: 'Jane Smith',
        age: 25,
        email: 'jane.smith@example.com',
        address: '456 Elm St'
    },
    {
        id: 3,
        name: 'Bob Johnson',
        age: 28,
        email: 'bob.johnson@example.com',
        address: '789 Oak St'
    },
    {

        id: 4,
        name: 'Alice Wilson',
        age: 32,
        email: 'alice.wilson@example.com',
        address: '101 Pine St'
    },
    {
        id: 5,
        name: 'Charlie Brown',
        age: 35,
        email: 'charlie.brown@example.com',
        address: '123 Maple St'
    }
]

export default Data;