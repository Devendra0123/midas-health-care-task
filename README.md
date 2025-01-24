# Clinical Management Dashboard

A **Clinical Management Dashboard** designed for managing patient data efficiently. The system allows filtering, searching, pagination, and tab-based navigation for different patient categories. It also includes dynamic modals, data export, and smooth UI/UX transitions for a seamless experience.

## Features

### Core Functionalities

#### Patient Management
- **View patient details by category** (e.g., New Patients, Nurse Seen, Doctor Visited, Appointment).
- **Search and filter** patients by name, department, doctor, or status.
- **Pagination support** for large datasets.

#### Filters
- **Date-based filtering** (e.g., "From Date" and "To Date").
- **Doctor-based filtering**.
- **Reset filters** to default state.

#### Search
- **Full-text search** across patient names, doctor names, statuses, and departments.

#### Export
- **Download patient data** as an Excel file with customizable columns.

#### Dynamic Modals
- **View patient details** or previous records in modals with structured data.

#### Breadcrumb Navigation
- **Hierarchical navigation** with customizable breadcrumb paths.

### UI/UX Enhancements
- **Smooth scrolling effects**.
- **Hover effects**
- **Summary cards**

## Technologies Used

- **Frontend Framework:** React (with TypeScript for type safety).
- **State Management:** React's built-in hooks (e.g., `useState`, `useEffect`, `useRef`).
- **UI Library:** Ant Design for components and styles.
- **Icons:** React Icons and Ant Design Icons.
- **Styling:** Tailwind CSS for responsive design.
- **Utilities:**
  - Moment.js for date formatting.
  - XLSX.js for Excel file generation.
- **Routing:** React Router for navigation.

## Installation

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Devendra0123/midas-health-care-task.git
    cd midas-health-care-task
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm start
    ```

4. **Access the app:** Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
