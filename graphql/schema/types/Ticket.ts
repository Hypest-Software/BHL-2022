import { objectType } from "nexus";

export const Ticket = objectType({
    name: "Ticket",
    definition: (t) => {
        t.string("id");
        t.string("name");
        t.float("price");
        t.int("duration");
    },
});