const getEventSchema = (t, options = {}) => {
    const { withWidths = false, forForm = false } = options;

    const baseSchema = [
        {
            field: "urheilukategoria",
            headerName: t("sportName"),
            width: withWidths ? 150 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            // Display the sport name from the nested object
            renderCell: (params) => {
                const category = params.row?.urheilukategoria;
                if (!category) return "";
                return category.kategoria || category.nimi || "";
            },
            // Make the field sortable by the displayed value
            sortable: true,
            filterable: true
        },
        {
            field: "laji",
            headerName: t("eventName"),
            flex: 1,
            sortable: true,
            filterable: true
        }
    ];

    return baseSchema;
};

export default getEventSchema;