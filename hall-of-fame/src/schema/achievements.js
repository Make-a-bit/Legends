const getAchievementsSchema = (t, options = {}) => {
    const { withWidths = false, forForm = false } = options;

    const baseSchema = [
        {
            field: "vuosi",
            headerName: t('year'),
            width: withWidths ? 75 : undefined,
            flex: !withWidths ? 1 : undefined,
            // Display the year from the nested object
            renderCell: (params) => {
                const year = params.row?.kilpailu;
                if (!year) return "";
                return year.vuosi || "";
            },
            sortable: true,
            filterable: true
        },
        {
            field: "kisatyyppi",
            headerName: t('competitionType'),
            width: withWidths ? 250 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            // Display the competition name from the nested object
            renderCell: (params) => {
                const competitionType = params.row?.kilpailu;
                if (!competitionType) return "";
                return competitionType.kilpailukategoria.nimi || "";
            },
            // Make the field sortable by the displayed value
            sortable: true,
            filterable: true
        },
        {
            field: "kaupunki",
            headerName: t('city'),
            width: withWidths ? 120 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            // Display the competition name from the nested object
            renderCell: (params) => {
                const competitionCity = params.row?.kilpailu;
                if (!competitionCity) return "";
                return competitionCity.kaupunki || "";
            },
            // Make the field sortable by the displayed value
            sortable: true,
            filterable: true
        },
        {
            field: "laji",
            headerName: t('eventName'),
            width: withWidths ? 150 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            // Display the event name from the nested object
            renderCell: (params) => {
                const event = params.row?.saavutus;
                if (!event) return "";
                return event.laji.laji || "";
            },
            // Make the field sortable by the displayed value
            sortable: true,
            filterable: true
        },
        {
            field: "saavutusluokka",
            headerName: t('achievementType'),
            width: withWidths ? 120 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            // Display the achievement type from the nested object
            renderCell: (params) => {
                const achievementType = params.row?.saavutus;
                if (!achievementType) return "";
                return achievementType.saavutus || "";
            },
        },
        {
            field: "tulos",
            headerName: t('result'),
            width: withWidths ? 100 : undefined,
            flex: !withWidths ? 1 : undefined,
            renderCell: (params) => {
                const achievementType = params.row?.saavutus;
                if (!achievementType) return "";
                return achievementType.tulos || "";
            },
            sortable: true,
            filterable: true
        },
        {
            field: "lisatieto",
            headerName: t('additionalInfo'),
            flex: 1,
            renderCell: (params) => {
                const achievementType = params.row?.saavutus;
                if (!achievementType) return "";
                return achievementType.lisatiedot || "";
            },
            sortable: false,
            filterable: false
        }
    ];

    return baseSchema;
};

export default getAchievementsSchema;