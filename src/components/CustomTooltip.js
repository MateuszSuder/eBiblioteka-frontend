import {Tooltip, Typography} from "@mui/material";
import React from "react";

const CustomTooltip = ({content}) => {
    return (
        <Tooltip title={content} followCursor>
            <Typography noWrap>
                {content}
            </Typography>
        </Tooltip>
    )
}

export default CustomTooltip;