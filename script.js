let count = 0;

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


function run(type) {

    let rows = document.querySelectorAll("#inputTable tr");

    let p = [];

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


    // FCFS
    p.sort((a, b) => a.at - b.at);


    // SJF
    if (type == "SJF") {

        let done = [];
        let time = 0;

        while (done.length < p.length) {

            let available = p.filter(x =>
                !done.includes(x) && x.at <= time
            );

            if (available.length == 0) {
                time = Math.min(
                    ...p.filter(x => !done.includes(x))
                    .map(x => x.at)
                );
                continue;
            }

            available.sort((a, b) => a.bt - b.bt);

            done.push(available[0]);

            time += available[0].bt;
        }

        p = done;
    }


    let time = 0;
    let totalWT = 0;
    let totalTAT = 0;

    let result = document.getElementById("result");

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

    let gantt = document.getElementById("gantt");

    gantt.innerHTML = "";


    p.forEach(x => {

        if (time < x.at)
            time = x.at;

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
                ${time - x.bt} - ${time}
            </span>
        `;

    });


    document.getElementById("average").innerHTML =
        `Average Waiting Time = ${(totalWT / p.length).toFixed(2)}
        &nbsp;&nbsp; | &nbsp;&nbsp;
        Average Turnaround Time = ${(totalTAT / p.length).toFixed(2)}`;

}


// Start with 3 processes
addProcess();
addProcess();
addProcess();