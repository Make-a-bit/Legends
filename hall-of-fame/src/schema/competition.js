const getCompetitionSchema = (t, options = {}) => {
    const { withWidths = false, forForm = false } = options;

    const baseSchema = [
        {
            field: "vuosi",
            headerName: t("year"),
            width: withWidths ? 70 : undefined,
            flex: !withWidths ? 0 : undefined,
            sortable: true,
            filterable: true,
            required: true
        },
        {
            field: "kisatyyppi",
            headerName: t("competitionType"),
            width: withWidths ? 150 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            renderCell: (params) => {
                const competitionType = params.row?.kisatyyppi;
                if (!competitionType) return "";
                return competitionType.nimi || "";
            },
            sortable: true,
            filterable: true,
            required: true
        },
        {
            field: "nimi",
            headerName: t("competitionName"),
            flex: 1,
            sortable: true,
            filterable: true,
            required: true
        },
        {
            field: "maa",
            headerName: t("country"),
            width: withWidths ? 120 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            renderCell: (params) => {
                const country = params.row?.maa;
                if (!country) return "";
                return country.nimi || "";
            },
            sortable: true,
            filterable: true,
            required: false
        },
        {
            field: "kaupunki",
            headerName: t("city"),
            flex: 1,
            sortable: true,
            filterable: true,
            required: true
        },
    ];

    return baseSchema;
};

export default getCompetitionSchema;