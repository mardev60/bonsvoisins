export function filterValidData(data: { [key: string]: any }): { [key: string]: any } {
    const filteredData: { [key: string]: any } = {};

    Object.entries(data).forEach(([key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
        filteredData[key] = value;
        }
    });

    return filteredData;
}