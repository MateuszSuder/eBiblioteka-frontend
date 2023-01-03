import React, {useEffect, useState} from 'react';
import {
    Grid,
    Paper,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from "@mui/material";
import roomList from "../../mock/roomList";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import {useNavigate} from "react-router-dom";

const RoomTableRow = ({room, selectRoom}) => {
    return (
        <TableRow key={room.roomNumber} hover onClick={() => selectRoom(room._id)} sx={{cursor: "pointer"}}>
            <TableCell width="70%">
                <Typography>
                    {room.name}
                </Typography>
            </TableCell>
            <TableCell width="15%">
                <Grid container display="flex" gap={1}>
                    <Typography>
                        {room.capacity}
                    </Typography>
                    <PeopleAltIcon fontSize="small"/>
                </Grid>
            </TableCell>
            <TableCell width="15%">
                <Grid container display="flex" gap={1}>
                    <Typography>
                        {room.price} zł / noc
                    </Typography>
                </Grid>
            </TableCell>
        </TableRow>
    )
}

const RoomListTable = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const selectRoom = (roomId) => {
        navigate(`room/${roomId}`);
    }

    if(loading)
        return (
            <Stack spacing={0.5}>
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
                <Skeleton variant={"rounded"} animation={"wave"} height={60} />
            </Stack>
        )

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="Dostępne pokoje">
                    <TableBody>
                        {roomList.rooms.map(room => (
                            <RoomTableRow room={room} selectRoom={selectRoom} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default RoomListTable;