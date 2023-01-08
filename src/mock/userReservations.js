const userReservations = [
    {
        _id: 1,
        bookId: 1,
        userId: 1,
        status: "RESERVED",
        validTill: "2023-01-14"
    },
    {
        _id: 2,
        bookId: 2,
        userId: 2,
        status: "CANCELLED",
        validTill: "2023-01-15"
    },
    {
        _id: 3,
        bookId: 3,
        userId: 1,
        status: "BORROWED",
        validTill: "2023-01-16"
    },
    {
        _id: 4,
        bookId: 1,
        userId: 1,
        status: "EXPIRED",
        validTill: "2023-01-01"
    },
    {
        _id: 5,
        bookId: 1,
        userId: 1,
        status: "EXPIRED",
        validTill: "2023-01-01"
    },
    {
        _id: 6,
        bookId: 1,
        userId: 1,
        status: "EXPIRED",
        validTill: "2023-01-01"
    }
];

export default userReservations;