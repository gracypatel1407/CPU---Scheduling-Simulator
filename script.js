let count = 0;


// =========================
// ADD PROCESS
// =========================

function addProcess() {

    count++;

    let table = document.getElementById("inputTable");

    let row = table.insertRow();

    row.innerHTML = `
        <td>P${count}</td>

        <td>
            <input type="number" class="at" min="0">
        </td>

        <td>
            <input type="number" class="bt" min="1">
        </td>

        <td>
            <button onclick="this.parentElement.parentElement.remove()">
                X
            </button>
        </td>
    `;
}


// =========================
// RUN ALGORITHM
// =========================

function run(type) {

    let rows = document.querySelectorAll("#inputTable tr");

    let p = [];

    // Read process data
    for (let i = 1; i < rows.length; i++) {

        let at = Number(rows[i].querySelector(".at").value);
        let bt = Number(rows[i].querySelector(".bt").value);

        if (bt <= 0) {
            alert("Enter valid Burst Time");
            return;
        }

        p.push({
            name: rows[i].cells[0].innerText,
            at: at,
            bt: bt
        });
    }

    if (p.length == 0) {
        alert("Add at least one process");
        return;
    }


    // =========================
    // FCFS
    // =========================

    if (type == "FCFS") {

        p.sort(function(a, b) {
            return a.at - b.at;
        });
    }


    // =========================
    // SJF
    // =========================

    if (type == "SJF") {

        let order = [];
        let done = [];
        let time = 0;

        while (order.length < p.length) {

            let shortest = -1;

            for (let i = 0; i < p.length; i++) {

                if (!done.includes(i) && p[i].at <= time) {

                    if (shortest == -1 ||
                        p[i].bt < p[shortest].bt) {

                        shortest = i;
                    }
                }
            }

            // No process has arrived
            if (shortest == -1) {

                time++;
            }

            else {

                order.push(p[shortest]);

                done.push(shortest);

                time = time + p[shortest].bt;
            }
        }

        p = order;
    }



    // =========================
// ROUND ROBIN
// =========================

if (type == "RR") {

    let quantum = Number(document.getElementById("quantum").value);

    if (quantum <= 0) {
        alert("Enter valid Time Quantum");
        return;
    }

    let remaining = [];

    for (let i = 0; i < p.length; i++) {
        remaining.push(p[i].bt);
    }

    let completed = 0;
    let time = 0;
    let queue = [];
    let added = [];

    let ganttData = [];

    // Start with processes that arrive at 0
    for (let i = 0; i < p.length; i++) {
        if (p[i].at == 0) {
            queue.push(i);
            added[i] = true;
        }
    }

    while (completed < p.length) {

        // If queue is empty, move time forward
        if (queue.length == 0) {

            time++;

            for (let i = 0; i < p.length; i++) {
                if (p[i].at <= time &&
                    !added[i]) {

                    queue.push(i);
                    added[i] = true;
                }
            }

            continue;
        }

        // Take first process from queue
        let current = queue.shift();

        let start = time;

        // Run for quantum or remaining time
        let runTime = Math.min(
            quantum,
            remaining[current]
        );

        time = time + runTime;

        remaining[current] =
            remaining[current] - runTime;

        // Store Gantt information
        ganttData.push({
            name: p[current].name,
            start: start,
            end: time
        });

        // Add newly arrived processes
        for (let i = 0; i < p.length; i++) {

            if (p[i].at <= time &&
                !added[i]) {

                queue.push(i);
                added[i] = true;
            }
        }

        // Process completed
        if (remaining[current] == 0) {

            completed++;

            p[current].ct = time;
        }

        else {

            // Put process back in queue
            queue.push(current);
        }
    }

    // Show RR result
    showResult(p, ganttData);

    return;
}


    // =========================
    // SRTN
    // =========================

    if (type == "SRTN") {

        let remaining = [];

        for (let i = 0; i < p.length; i++) {

            remaining.push(p[i].bt);
        }

        let completed = 0;
        let time = 0;

        let ganttData = [];

        let lastProcess = "";
        let start = 0;

        while (completed < p.length) {

            let shortest = -1;

            // Find shortest remaining process
            for (let i = 0; i < p.length; i++) {

                if (p[i].at <= time && remaining[i] > 0) {

                    if (shortest == -1 ||
                        remaining[i] < remaining[shortest]) {

                        shortest = i;
                    }
                }
            }


            // CPU idle
            if (shortest == -1) {

                time++;
                continue;
            }


            // New process starts
            if (lastProcess != p[shortest].name) {

                if (lastProcess != "") {

                    ganttData.push({
                        name: lastProcess,
                        start: start,
                        end: time
                    });
                }

                lastProcess = p[shortest].name;
                start = time;
            }


            // Execute for 1 unit
            remaining[shortest]--;

            time++;


            // Process completed
            if (remaining[shortest] == 0) {

                completed++;
            }
        }


        // Add last process
        if (lastProcess != "") {

            ganttData.push({
                name: lastProcess,
                start: start,
                end: time
            });
        }


        // Calculate CT
        for (let i = 0; i < p.length; i++) {

            p[i].ct = 0;

            for (let j = 0; j < ganttData.length; j++) {

                if (ganttData[j].name == p[i].name) {

                    p[i].ct = ganttData[j].end;
                }
            }
        }


        // Show SRTN result
        showResult(p, ganttData);

        return;
    }


    // FCFS / SJF result
    showResult(p);
}


// =========================
// SHOW RESULT
// =========================

function showResult(p, ganttData = null) {

    let time = 0;

    let totalWT = 0;
    let totalTAT = 0;

    let result = document.getElementById("result");
    let gantt = document.getElementById("gantt");


    result.innerHTML = `
        <tr>
            <th>Process</th>
            <th>AT</th>
            <th>BT</th>
            <th>CT</th>
            <th>TAT</th>
            <th>WT</th>
        </tr>
    `;

    gantt.innerHTML = "";


    // =========================
    // SRTN GANTT
    // =========================

    if (ganttData != null) {

        for (let i = 0; i < ganttData.length; i++) {

            let x = ganttData[i];

            gantt.innerHTML += `
                <span class="gantt">
                    ${x.name}
                    <br>
                    ${x.start} - ${x.end}
                </span>
            `;
        }


        for (let i = 0; i < p.length; i++) {

            let x = p[i];

            let ct = x.ct;

            let tat = ct - x.at;

            let wt = tat - x.bt;

            totalWT += wt;

            totalTAT += tat;


            result.innerHTML += `
                <tr>
                    <td>${x.name}</td>
                    <td>${x.at}</td>
                    <td>${x.bt}</td>
                    <td>${ct}</td>
                    <td>${tat}</td>
                    <td>${wt}</td>
                </tr>
            `;
        }
    }


    // =========================
    // FCFS / SJF
    // =========================

    else {

        for (let i = 0; i < p.length; i++) {

            let x = p[i];


            if (time < x.at) {

                time = x.at;
            }


            let start = time;

            let ct = time + x.bt;

            let tat = ct - x.at;

            let wt = tat - x.bt;


            time = ct;


            totalWT += wt;

            totalTAT += tat;


            result.innerHTML += `
                <tr>
                    <td>${x.name}</td>
                    <td>${x.at}</td>
                    <td>${x.bt}</td>
                    <td>${ct}</td>
                    <td>${tat}</td>
                    <td>${wt}</td>
                </tr>
            `;


            gantt.innerHTML += `
                <span class="gantt">
                    ${x.name}
                    <br>
                    ${start} - ${ct}
                </span>
            `;
        }
    }


    // =========================
    // AVERAGE
    // =========================

    let avgWT = totalWT / p.length;

    let avgTAT = totalTAT / p.length;


    document.getElementById("average").innerHTML =
        `Average Waiting Time = ${avgWT.toFixed(2)}
        &nbsp;&nbsp; | &nbsp;&nbsp;
        Average Turnaround Time = ${avgTAT.toFixed(2)}`;
}


// =========================
// START WITH 3 PROCESSES
// =========================

addProcess();
addProcess();
addProcess();
