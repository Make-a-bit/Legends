const getCompetitionTypeSchema = (t, { withWidths = true } = {}) => [
    withWidths
        ? {
            field: "kisatyyppi",
            headerName: t('competitionType'),
            type: "string",
            flex: 1,
            required: true
        }
        : {
            field: "kisatyyppi",
            headerName: t('competitionType'),
            type: "string",
            required: true
        },
    withWidths
        ? {
            field: "ranking_value",
            headerName: t('rankingValue'),
            type: "string",
            width: 100,
            required: false
        }
        : {
            field: "ranking_value",
            headerName: t('rankingValue'),
            type: "number",
            required: false
        }
]

export default getCompetitionTypeSchema;