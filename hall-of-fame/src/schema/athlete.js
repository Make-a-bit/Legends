const getAthleteSchema = (t, options = {}) => {
    const { withWidths = false, forForm = false } = options;

    const baseSchema = [
        {
            field: "urheilukategoria_id",
            headerName: t("sportCategory"),
            width: withWidths ? 150 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            required: false,
            renderCell: (params) => {
                const category = params.row?.urheilukategoria;
                if (!category) return "";
                return category.kategoria || category.nimi || "";
            },
            sortable: true,
            filterable: true
        },
        {
            field: "maa_id",
            headerName: t("country"),
            width: withWidths ? 120 : undefined,
            flex: !withWidths ? 1 : undefined,
            ...(forForm && { type: "autocomplete" }),
            required: false,
            renderCell: (params) => {
                const country = params.row?.maa;
                if (!country) return "";
                return country.maa || country.name || "";
            },
            sortable: true,
            filterable: true
        },
        {
            field: "etunimi",
            headerName: t("firstName"),
            width: withWidths ? 150 : undefined,
            flex: !withWidths ? 1 : undefined,
            required: true,
            sortable: true,
            filterable: true
        },
        {
            field: "sukunimi",
            headerName: t("lastName"),
            width: withWidths ? 150 : undefined,
            flex: !withWidths ? 1 : undefined,
            required: true,
            sortable: true,
            filterable: true
        },
        {
            field: "kutsumanimi",
            headerName: t("nickname"),
            width: withWidths ? 120 : undefined,
            flex: !withWidths ? 1 : undefined,
            required: false,
            sortable: true,
            filterable: true
        },
        {
            field: "syntymavuosi",
            headerName: t("birthYear"),
            width: withWidths ? 100 : undefined,
            flex: !withWidths ? 1 : undefined,
            type: "number",
            required: true,
            sortable: true,
            filterable: true
        },
        {
            field: "paino",
            headerName: t("weight"),
            width: withWidths ? 100 : undefined,
            flex: !withWidths ? 1 : undefined,
            type: "number",
            required: false,
            sortable: true,
            filterable: true
        },
        {
            field: "kuva_url",
            headerName: t("imageUrl"),
            width: withWidths ? 200 : undefined,
            flex: !withWidths ? 1 : undefined,
            required: false,
            sortable: true,
            filterable: true
        },
        {
            field: "info",
            headerName: t("info"),
            width: withWidths ? 200 : undefined,
            flex: !withWidths ? 2 : undefined,
            required: false,
            sortable: true,
            filterable: true
        }
    ];

    return baseSchema;
};

export default getAthleteSchema;
