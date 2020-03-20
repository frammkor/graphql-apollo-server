class Client {
    constructor(id, { firstName, lastName, company, emails, type, orders }) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.company = company;
        this.emails = emails;
        this.type = type;
        this.orders = orders;
    }
}

const clientsDB = {};

export const resolvers = {
    Query: {
        getClient: (prop) => {
            return new Client(id, clientsDB[id]);
        }
    },
    Mutation: {
        createClient: ({ input }) => {
            const id = require("crypto")
                .randomBytes(10)
                .toString("hex");
            clientsDB[id] = input;
            return new Client(id, input);
        }
    }
};
