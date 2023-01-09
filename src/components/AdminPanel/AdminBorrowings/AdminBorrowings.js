import React from 'react';
import {Paper, Table, TableBody, TableContainer} from "@mui/material";
import userBorrowings from "../../../mock/userBorrowings";

const AdminBorrowings = () => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="Lista wypożyczeń" sx={{ tableLayout: "fixed" }}>
                <TableBody>
                    {
                        userBorrowings.map((borrowing, i) => (
                            <></>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminBorrowings;