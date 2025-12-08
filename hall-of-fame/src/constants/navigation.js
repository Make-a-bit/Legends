const navigationLinks = [
    { path: "/", labelKey: "home" },
    { path: "/athletes", labelKey: "members" },
    {
        labelKey: "sportTypes",
        dropDownParent: true,
        dropDown:
            [
                { path: "/sports", labelKey: "sports" },
                { path: "/events", labelKey: "events" }
            ]
    },
    {
        labelKey: "competitionsHeader",
        dropDownParent: true,
        dropDown:
            [
                { path: "/competitions", labelKey: "competitions" },
                { path: "/competitionTypes", labelKey: "competitionTypes" }
            ]
    },
    {
        labelKey: "settings",
        dropDownParent: true,
        dropDown:
            [
                { path: "/countries", labelKey: "countries" },
                { path: "/achievements", labelKey: "achievementTypes" }
            ]
    }
]

export default navigationLinks;