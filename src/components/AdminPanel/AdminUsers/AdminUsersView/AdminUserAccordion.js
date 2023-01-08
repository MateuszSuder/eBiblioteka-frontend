import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import theme from "../../../theme/theme";

const AdminUserAccordion = ({ListComponent, list, title, listEmptyMessage}) => {
    if(!list) return (
        <></>
    )
    return (
        <Accordion sx={{ width: "100%" }}>
            <AccordionSummary
                expandIcon={<ExpandMore/>}
                aria-controls={`${title}-content`}
                id={`${title}-header`}
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    list.length ?
                        (
                            list.map((item, i) => (
                                <ListComponent key={`reservation-${i}`} item={item}/>
                            ))
                        ) :
                        (
                            <Typography align="center" color={theme.palette.grey["400"]}>
                                {listEmptyMessage}
                            </Typography>
                        )
                }

            </AccordionDetails>
        </Accordion>
    );
};

export default AdminUserAccordion;