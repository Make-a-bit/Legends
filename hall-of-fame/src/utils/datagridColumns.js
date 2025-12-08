import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from '@mui/material';

const dataGridColumns = (
    schema,
    onDelete,
    t,
    options = {}
) => {
    const {
        actionHeader = t('delete'),
        actionIcon = <DeleteIcon />,
        editable = true,
        actionField = "actions"
    } = options;

    const baseColumns = schema.map(item => {
        // Use width if defined, otherwise flex, otherwise default flex: 1
        const columnProps = {};
        if (item.width !== undefined) columnProps.width = item.width;
        else columnProps.flex = item.flex !== undefined ? item.flex : 1;

        return {
            field: item.field,
            headerName: item.headerName,
            editable: item.editable !== undefined ? item.editable : editable,
            ...columnProps,
            ...item // include any other custom props in schema
        };
    });

    const actionColumn = {
        field: actionField,
        headerName: actionHeader,
        sortable: false,
        filterable: false,
        width: 80,
        renderCell: (params) => (
            <IconButton
                size="small"
                color="error"
                onClick={e => {
                    e.stopPropagation();
                    onDelete(params.row);
                }}
            >
                {actionIcon}
            </IconButton>
        ),
    };

    return [...baseColumns, actionColumn];
};

export default dataGridColumns;