const getCountrySchema = (t, { withWidths = true } = {}) => [
    withWidths
        ? {
            field: "maa",
            headerName: t('countryName'),
            type: "string",
            width: 120,
            required: true
        }
        : {
            field: "maa",
            headerName: t('countryName'),
            type: "string",
            required: true
        },

    withWidths
        ? {
            field: "lippu_url",
            headerName: t('countryFlagUrl'),
            type: "string",
            flex: 1,
            required: false
        }
        : {
            field: "lippu_url",
            headerName: t('countryFlagUrl'),
            type: "string",
            required: false
        },
];
export default getCountrySchema;