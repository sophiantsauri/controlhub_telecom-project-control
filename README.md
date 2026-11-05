# Telecom Project Control — ControlHub

A React-based portfolio simulation for an Assistant Project Controller role. The interface demonstrates project portfolio monitoring, WBS/schedule tracking, cost control, resource allocation, PO & billing monitoring, risk tracking, and reporting.

## Requirements
- Node.js 
- npm

## Run in VS Code
1. Extract this ZIP.
2. Open the extracted `telecom-project-control` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL shown by Vite (usually `http://localhost:5173`).

## Included modules
- Overview dashboard with KPIs and progress charts
- Project portfolio with search and add-project modal
- WBS & Schedule table
- Cost Control with budget vs actual chart and variance
- Resource allocation
- PO & Billing tracker
- Risk & Issues register
- CSV exports for reporting

## Data behavior
This first version runs in **demo mode**. Project records, tasks, and purchase orders are sample/synthetic data. New projects are saved in browser `localStorage`, so they remain after refreshing the same browser.

## Important
- This is a frontend prototype, not connected to a live PHP API or MySQL database yet.
- All project names, clients, budgets, people, and progress figures are fictional simulation data.
- Do not present the sample data as actual Huawei or customer project data.

## Suggested next development steps
1. Add PHP REST API endpoints and MySQL persistence.
2. Add editable task, cost, resource, PO, and billing records.
3. Add Gantt chart with dependency and baseline schedule.
4. Add role-based access, authentication, and audit log.
