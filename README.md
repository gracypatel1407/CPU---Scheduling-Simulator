# CPU---Scheduling-Simulator
Interactive CPU Scheduling Simulator implementing FCFS and SJF algorithms.


web-based CPU Scheduling Simulator that demonstrates the working of **First-Come First-Serve (FCFS)** and **Shortest Job First (SJF)** CPU scheduling algorithms.

Project Overview

This project provides an interactive interface where users can enter processes along with their **Arrival Time** and **Burst Time**. The simulator executes the selected scheduling algorithm and displays the results in the form of a **Gantt Chart** and a result table.

The simulator calculates:

* Completion Time (CT)
* Turnaround Time (TAT)
* Waiting Time (WT)
* Average Waiting Time
* Average Turnaround Time

Algorithms Implemented

1. FCFS – First-Come First-Serve

FCFS is a non-preemptive scheduling algorithm where processes are executed according to their **Arrival Time**.

2. SJF – Shortest Job First

SJF is a non-preemptive scheduling algorithm that selects the process with the **shortest Burst Time** among the processes that have already arrived.

Technologies Used

* **HTML** – Structure of the web page
* **CSS** – Styling and layout
* **JavaScript** – Scheduling algorithms, calculations and Gantt Chart
* **GitHub** – Project repository and version control

**Backend:** Not required. All processing is performed on the client side using JavaScript.

Scheduling Formulas

**Completion Time (CT)**
CT = Start Time + Burst Time

**Turnaround Time (TAT)**
TAT = CT − Arrival Time

**Waiting Time (WT)**
WT = TAT − Burst Time

Features

* Add multiple processes
* Enter Arrival Time and Burst Time
* Delete processes
* Run FCFS scheduling
* Run SJF scheduling
* Generate Gantt Chart
* Display CT, TAT and WT
* Calculate average waiting and turnaround time
* Simple and user-friendly interface

Project Structure

```text
CPU-Scheduling/
│
├── index.html
├── style.css
└── script.js
```

Objective

The main objective of this project is to understand and visualize how **CPU scheduling algorithms** work and how different scheduling techniques affect waiting time and turnaround time.

Conclusion

The CPU Scheduling Simulator successfully implements **FCFS and SJF scheduling algorithms** and provides a visual representation of process execution along with important scheduling parameters.

