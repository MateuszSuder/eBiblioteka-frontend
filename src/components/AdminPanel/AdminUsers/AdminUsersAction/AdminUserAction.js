import React from 'react';
import CustomModal from "../../../CustomModal";
import useFindUser from "../../../../hooks/useFindUser";

const AdminUserDelete = ({userId}) => {
    return (
        <>Delete</>
    )
}

const AdminUserBlock = ({userId}) => {
    return (
        <>Block</>
    )
}

const AdminUserModify = ({userId}) => {
    const user = useFindUser(userId);

    console.log(user);

    return (
        <>Modify</>
    )
}

/**
 * @param open
 * @param setOpen
 * @param userId
 * @param {"MODIFY" | "BLOCK" | "DELETE"} action
 * @return {JSX.Element}
 * @constructor
 */
const AdminUserAction = ({open, setOpen, userId, action}) => {
    const Component = (() => {
        switch (action) {
            case "MODIFY":
                return AdminUserModify
            case "BLOCK":
                return AdminUserBlock
            case "DELETE":
                return AdminUserDelete
            default:
                return (
                    <></>
                )
        }
    })()

    if(!userId) return (
        <></>
    )

    return (
        <CustomModal open={open} setOpen={setOpen}>
            <Component userId={userId} />
        </CustomModal>
    )
};

export default AdminUserAction;