const getAchievementSchema = (t, options = {}) => {
    const { withWidths = false, forForm = false } = options;

    const baseSchema = [
        {
            field: "kilpailu",
            headerName: t('competition'),
            width: withWidths ? 200 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            renderCell: (params) => {
                return params.row?.kilpailu?.nimi || "";
            },
            sortable: true,
            filterable: true,
            required: false
        },
        {
            field: "laji",
            headerName: t('event'),
            width: withWidths ? 150 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            renderCell: (params) => {
                return params.row?.laji?.laji || "";
            },
            sortable: true,
            filterable: true
        },
        {
            field: "saavutustyyppi",
            headerName: t('achievementType'),
            width: withWidths ? 120 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            renderCell: (params) => {
                return params.row?.saavutustyyppi?.saavutusluokka || "";
            },
            sortable: true,
            filterable: true
        },
        {
            field: "tulos",
            headerName: t('result'),
            width: withWidths ? 120 : undefined,
            flex: !withWidths ? 1 : undefined,
            sortable: true,
            filterable: true
        },
        {
            field: "lisatieto",
            headerName: t('additionalInfo'),
            flex: 1,
            sortable: false,
            filterable: false
        }
    ];

    return baseSchema;
};

export default getAchievementSchema;