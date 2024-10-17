// Calculate the total inflows, outflows, and imbalance for each hour and member
export const calculateImbalance = (members) => {
    const hourlyData = {}; // To store inflows, outflows, and imbalance per hour

    // Ensure members exist and is an array
    if (!members || !Array.isArray(members)) {
        console.error('Invalid members data:', members);
        return [];
    }

    members.forEach(member => {
        // Ensure the member has a forecast array
        if (!member.forecast || !Array.isArray(member.forecast)) {
            console.error(`No forecast data for member ${member.id}`);
            return; // Skip this member if no forecast is available
        }

        member.forecast.forEach(forecast => {
            // Convert date to a consistent string format (ISO)
            const dateKey = new Date(forecast.date).toISOString();
            const { value } = forecast;

            // Initialize the data at each hour (dateKey) if not already set
            if (!hourlyData[dateKey]) {
                hourlyData[dateKey] = { inflows: 0, outflows: 0, imbalance: 0 };
            }

            // Add the forecast value: inflows are positive for producers, outflows are negative for consumers
            if (member.type === 'Producer') {
                hourlyData[dateKey].inflows += value;  // Producers add to inflows
            } else {
                hourlyData[dateKey].outflows += value; // Consumers add to outflows (negative)
            }

            // Calculate the imbalance at each hour (inflows + outflows)
            hourlyData[dateKey].imbalance = hourlyData[dateKey].inflows + hourlyData[dateKey].outflows;
        });
    });

    // Convert the hourlyData object into an array for easier rendering
    return Object.entries(hourlyData).map(([date, { inflows, outflows, imbalance }]) => ({
        date,
        inflows,
        outflows,
        imbalance
    }));
};
