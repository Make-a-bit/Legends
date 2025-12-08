const getSportSchema = (t, { withWidths = true } = {}) => [
    withWidths
        ? {
            field: "kategoria",
            headerName: t('sportName'),
            type: "string",
            flex: 1
        }
        : {
            field: "kategoria",
            headerName: t('sportName'),
            type: "string"
        },
];

export default getSportSchema;