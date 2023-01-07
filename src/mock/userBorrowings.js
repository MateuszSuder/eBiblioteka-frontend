const userBorrowings = [
    {
        bookId: 1,
        userId: 1,
        status: "BORROWED",
        expiryDate: "2023-01-14",
        renewalRequest: false,
        renewedBefore: false,
        debt: 0
    },
    {
        bookId: 2,
        userId: 1,
        status: "BORROWED",
        expiryDate: "2023-01-14",
        renewalRequest: true,
        renewedBefore: true,
        debt: 0
    },
    {
        bookId: 3,
        userId: 1,
        status: "BORROWED",
        expiryDate: "2023-01-14",
        renewalRequest: false,
        renewedBefore: true,
        debt: 0
    },
    {
        bookId: 1,
        userId: 1,
        status: "OVERDUE",
        expiryDate: "2023-01-06",
        renewalRequest: false,
        renewedBefore: false,
        debt: 0
    },
    {
        bookId: 2,
        userId: 1,
        status: "RETURNED",
        expiryDate: "2023-01-07",
        renewalRequest: false,
        renewedBefore: false,
        debt: 0
    },
];

export default userBorrowings;