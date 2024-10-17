# Energy Imbalance Calculator

## Overview

The Energy Imbalance Calculator is a web application designed to retrieve and display energy imbalance data from a provided API. It calculates imbalances for balancing circles based on forecast data from energy producers and consumers. The application allows users to view hourly imbalances at both the balancing circle and member levels.

## Requirements

### 1. Retrieve Data and Calculate Imbalances

- Utilize the **Axpo.Challenge.Balancing** NuGet package to query the API:
  - Retrieve a list of balancing circles and their associated members from `/api/v1/balancing`.
  - For each member, retrieve forecasted data using the endpoint `/api/v1/balancing/member/{id}/forecast`.
  - Members can be categorized as either energy producers or energy consumers.
  - Calculate the day-ahead imbalance for each hour using the formula:
  
    \[
    \text{Imbalance}(t) = \text{Total Inflows}(t) - \text{Total Outflows}(t)
    \]
  
    **Note:** Inflows are contributed by producers, while outflows are from consumers.

### 2. Display Data

- Display the hourly imbalance data aggregated at the balancing circle level.
- Implement a drill-down feature to view the breakdown of imbalance data at the member level:
  - Show inflows from producers as positive values (+{forecast value}).
  - Show outflows from consumers as negative values (-{forecast value}).
  
  **Note:** Imbalance data should be displayed only at the balancing circle level.

### 3. Nice to Have

- A README file that describes how to run the application and any key architectural decisions made.
- Comments on potential improvements for future iterations.
- Unit tests to ensure the functionality of the application.

### 4. Code Submission

- Ensure that the solution includes all source code and that it compiles successfully.
- Submit the solution via:
  - A link to a hosted source control repository (e.g., GitHub).
  - A cloud storage link to a zipped file.
  - As a zipped email attachment.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ZBC21/AxpoEnergyMarketBalancing

2. Navigate to the project directory:

    cd your-repo
    
3. Install the required dependencies:

    npm install

4. Start the application:

    npm start

5. Access the application in your browser at http://localhost:3000.

## Features
- Data Retrieval: Efficiently fetches balancing circles and member forecasts using RESTful API calls.
- Imbalance Calculation: Accurately computes inflows and outflows to determine energy imbalances for each balancing circle.
- Data Visualization: Presents imbalance data in a user-friendly manner with charts and tables.

## Drill-Down Feature Issues
- The drill-down feature is intended to allow users to click on a balancing circle to view more detailed information about the inflows and outflows at the member level. However, some issues are being encountered:

- Data Display: Currently, when a user selects a balancing circle, the detailed inflow and outflow values may not display correctly.
- Implementation: The drill-down functionality needs to properly aggregate and display forecast values as positive for producers and negative for consumers.

## Steps to Troubleshoot
- Check Data Structure: Ensure that the data structure returned from the API is correctly processed to separate producers and consumers.
- Debugging: Add console logs to confirm that the expected data is being passed to the drill-down component.
- Refactor Logic: Review and refactor the logic used to calculate and display inflows and outflows to ensure they align with the expected behavior.

## Future Improvements
- Implement better error handling for API calls to enhance user experience.
- Add user authentication for personalized data retrieval.
- Improve the UI for better responsiveness and user interaction.



