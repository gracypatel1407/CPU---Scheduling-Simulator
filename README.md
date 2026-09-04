# CPU Scheduling Simulator

An interactive **Web-Based CPU Scheduling Simulator** that demonstrates and visualizes different CPU scheduling algorithms.

The simulator allows users to enter processes with their **Arrival Time (AT)** and **Burst Time (BT)** and then execute different scheduling algorithms. The results are displayed using a **Gantt Chart** and a detailed result table.

## Project Overview

CPU scheduling is an important function of an Operating System. It determines which process should be executed by the CPU and in what order.

This project provides an interactive way to understand and visualize CPU scheduling algorithms and compare their performance based on:

* Completion Time (CT)
* Turnaround Time (TAT)
* Waiting Time (WT)
* Average Waiting Time
* Average Turnaround Time

## Algorithms Implemented

### 1. FCFS – First-Come, First-Serve

FCFS is a **non-preemptive** scheduling algorithm.

The process that arrives first gets executed first.

**Main concept:**

> First process to arrive → First process to execute

---

### 2. SJF – Shortest Job First

SJF is a **non-preemptive** scheduling algorithm.

Among the processes that have already arrived, the process with the **shortest Burst Time** is selected for execution.

**Main concept:**

> Shortest Burst Time → Execute first

---

### 3. SRTN – Shortest Remaining Time Next

SRTN is a **preemptive** CPU scheduling algorithm.

It is the preemptive version of SJF. The CPU always selects the process having the **shortest remaining execution time**.

If a new process arrives with a shorter remaining time than the currently running process, the current process is preempted.

**Main concept:**

> Shortest Remaining Time → Execute first

---

### 4. Round Robin (RR)

Round Robin is a **preemptive** CPU scheduling algorithm.

Each process gets a fixed amount of CPU time called a **Time Quantum**.

If a process does not finish within its time quantum, it is moved to the end of the ready queue and the next process gets the CPU.

**Main concept:**

> Each process gets CPU time in a circular manner.

The user can enter the required **Time Quantum** before running the Round Robin algorithm.

##  Scheduling Parameters

For every process, the simulator calculates:

### Completion Time (CT)

The time at which a process finishes execution.

```text
CT = Time at which process completes
```

### Turnaround Time (TAT)

```text
TAT = CT - AT
```

### Waiting Time (WT)

```text
WT = TAT - BT
```

### Average Waiting Time

```text
Average WT = Total Waiting Time / Number of Processes
```

### Average Turnaround Time

```text
Average TAT = Total Turnaround Time / Number of Processes
```

##  Features

* Add multiple processes
* Enter Arrival Time
* Enter Burst Time
* Delete processes
* Implement FCFS scheduling
* Implement SJF scheduling
* Implement SRTN scheduling
* Implement Round Robin scheduling
* Enter Time Quantum for Round Robin
* Generate Gantt Chart
* Display Completion Time (CT)
* Display Turnaround Time (TAT)
* Display Waiting Time (WT)
* Calculate Average Waiting Time
* Calculate Average Turnaround Time
* Simple and user-friendly interface
* Runs directly in the web browser
* No backend required

##  Technologies Used

* **HTML** – Structure of the web page
* **CSS** – Styling and layout
* **JavaScript** – Scheduling algorithms, calculations and Gantt Chart
* **GitHub** – Repository hosting and version control

##  Project Structure

```text
CPU-Scheduling/
│
├── index.html
├── style.css
└── script.js
```

##  How It Works

1. Open the CPU Scheduling Simulator.
2. Add the required number of processes.
3. Enter the **Arrival Time** and **Burst Time** for each process.
4. Select a scheduling algorithm:

   * FCFS
   * SJF
   * SRTN
   * Round Robin
5. For Round Robin, enter the **Time Quantum**.
6. Click the selected algorithm button.
7. The simulator generates the **Gantt Chart**.
8. The result table displays CT, TAT and WT.
9. Average Waiting Time and Average Turnaround Time are also displayed.

##  Objective

The main objective of this project is to **understand, implement and visualize CPU scheduling algorithms used in Operating Systems**.

The project also helps in understanding the difference between **preemptive and non-preemptive scheduling** and how different scheduling algorithms affect waiting time and turnaround time.

##  Preemptive vs Non-Preemptive

| Algorithm   | Type           |
| ----------- | -------------- |
| FCFS        | Non-Preemptive |
| SJF         | Non-Preemptive |
| SRTN        | Preemptive     |
| Round Robin | Preemptive     |

##  Future Improvements

The project can be further improved by adding:

* Priority Scheduling
* Multilevel Queue Scheduling
* Multilevel Feedback Queue Scheduling
* CPU utilization calculation
* Throughput calculation
* Response Time calculation
* Better Gantt Chart visualization
* Scheduling algorithm comparison charts
* Reset/Clear All option
* Dark mode

##  Conclusion

The **CPU Scheduling Simulator** successfully implements four important CPU scheduling algorithms: **FCFS, SJF, SRTN and Round Robin**.

The simulator provides a visual representation of process execution through a Gantt Chart and calculates important scheduling parameters such as **Completion Time, Turnaround Time, Waiting Time, Average Waiting Time and Average Turnaround Time**.

This project provides a simple and interactive way to understand how different CPU scheduling algorithms work and how they affect process performance.

---

##  Project

**CPU Scheduling Simulator**

Developed as an Operating Systems project to understand and visualize CPU scheduling algorithms.
