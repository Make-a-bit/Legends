const getAchievementTypeSchema = (t, { withWidths = true } = {}) => [
    withWidths
        ? { field: "saavutusluokka", headerName: t('achievementType'), type: "string", flex: 1 }
        : { field: "saavutusluokka", headerName: t('achievementType'), type: "string" },
];

export default getAchievementTypeSchema;