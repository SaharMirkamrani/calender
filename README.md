# Calendar Component Task

## Overview

This task involved building a reusable **Calendar Component** with the ability to select a range of dates. The component is designed for Persian users, making use of **RTL (Right-to-Left)** layout and **Jalaali calendar** logic for better user experience. The component integrates state management using **MobX** and fetches Persian days and months from an external API.

## Features

1. **Reusable Component**: 
   - The calendar component is built to be easily reusable in other parts of the project.
2. **Range Selection**: 
   - Users can select a range of dates, ensuring the start date is earlier than the end date.
   - Validations are included to restrict ranges beyond a specified number of days (`minRangeDays`).
3. **RTL Layout**: 
   - The component layout follows a Right-to-Left (RTL) direction for better alignment with Persian users.
4. **State Management**: 
   - **MobX** is used to store and manage the selected date range, making it accessible across the application.
5. **Jalaali Date Support**: 
   - The **Jalaali-js** library is utilized to handle Persian dates.
6. **Custom Styles**: 
   - Fully styled from scratch using **TailwindCSS**, without relying on any pre-built styling libraries or calendar components.
7. **API Integration**: 
   - Days and months are fetched from the following API:
     ```
     https://persian-calendar-api.sajjadth.workers.dev
     ```

## Libraries Used

- **React**: For building the component.
- **TypeScript**: For type safety and cleaner development.
- **TailwindCSS**: For styling the component from scratch.
- **MobX**: For state management to store the selected range object globally.
- **Jalaali-js**: For converting and working with Jalaali dates.
- **API Endpoint**: 
  - Fetched Persian calendar data (days, months) from:
    ```
    https://persian-calendar-api.sajjadth.workers.dev
    ```

## Implementation Details

1. **Custom Design**: 
   - The calendar was implemented entirely from scratch to match the provided Figma design.
   - Adjustments were made to use **RTL** instead of the original **LTR** layout for improved user experience.
   
2. **State Management**: 
   - The selected date range (`start` and `end`) is stored in a **MobX store** and is accessible throughout the application.

3. **Validation**: 
   - Ensured the start date is earlier than the end date.
   - Limited the maximum number of days in the selected range based on `minRangeDays`.

4. **Reusable Hook**: 
   - A custom hook, `useMonthYear`, was implemented to handle month and year navigation.

5. **API Integration**: 
   - Used the **Persian Calendar API** to fetch days and months dynamically for each month.
   
6. **Custom Styling**: 
   - All styles were written from scratch using **TailwindCSS** without relying on pre-built libraries.

## Installation and Setup

I used NPM to install packages.

## Key Notes
- Development Time: Completed the task in approximately 5-6 hours.
- Custom Implementation: The calendar component was built completely from scratch without using any external calendar packages or pre-built components.
- Enhancements: Although the Figma design was in LTR, I switched to RTL for a better experience for Persian users.
