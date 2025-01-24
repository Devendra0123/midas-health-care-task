Clinical Management Dashboard
A Clinical Management Dashboard designed for managing patient data efficiently. The system allows filtering, searching, pagination, and tab-based navigation for different patient categories. It also includes dynamic modals, data export, and smooth UI/UX transitions for a seamless experience.

Features
Core Functionalities
Patient Management:
View patient details by category (e.g., New Patients, Nurse Seen, Doctor Visited, Appointment).
Search and filter patients by name, department, doctor, or status.
Pagination support for large datasets.
Filters:
Date-based filtering (e.g., "From Date" and "To Date").
Doctor-based filtering with multi-select options.
Reset filters to default state.
Search:
Full-text search across patient names, doctor names, statuses, and departments.
Export:
Download patient data as an Excel file with customizable columns.
Dynamic Modals:
View patient details or previous records in modals with structured data.
Breadcrumb Navigation:
Hierarchical navigation with customizable breadcrumb paths.
UI/UX Enhancements
Smooth scrolling effects for hiding/showing headers.
Tab-based navigation with sticky headers.
Hover effects on table rows for better user interaction.
Summary cards to display quick stats for each category.
Toast notifications for user actions like filtering or downloading.
Technologies Used
Frontend Framework: React (with TypeScript for type safety).
State Management: React's built-in hooks (e.g., useState, useEffect, useRef).
UI Library: Ant Design for components and styles.
Icons: React Icons and Ant Design Icons.
Styling: Tailwind CSS for responsive design.
Utilities:
Moment.js for date formatting.
XLSX.js for Excel file generation.
Routing: React Router for navigation.
Installation
Prerequisites
Node.js and npm installed.
Steps
Clone the repository:

bash
Copy
Edit
git clone https://github.com/Devendra0123/midas-health-care-task.git
cd clinical-management-dashboard
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm start
Access the app: Open your browser and navigate to http://localhost:3000.

