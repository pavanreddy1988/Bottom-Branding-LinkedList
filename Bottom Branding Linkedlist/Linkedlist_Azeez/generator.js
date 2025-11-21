let parentCount = 0;
let childCounts = {};

document.getElementById("addParent").onclick = function () {
    parentCount++;
    childCounts[parentCount] = 0;

    let box = document.createElement("div");
    box.className = "parent-box";
    box.id = "parent-" + parentCount;

    box.innerHTML = `
        <label><b>Parent Header:</b></label><br>
        <input id="ph-${parentCount}" style="width:300px"><br><br>

        <b>Child Items:</b>
        <div id="child-list-${parentCount}"></div>

        <button onclick="addChild(${parentCount})">Add Child</button>
        <button class="remove-btn" onclick="removeParent(${parentCount})">Delete Parent</button>
    `;

    document.getElementById("parents").appendChild(box);
};

function removeParent(id) {
    let el = document.getElementById("parent-" + id);
    if (el) el.remove();
}

function addChild(pid) {
    childCounts[pid]++;
    let cid = childCounts[pid];

    let row = document.createElement("div");
    row.className = "child-row";
    row.id = `child-${pid}-${cid}`;

    row.innerHTML = `
        <input placeholder="Label" id="lbl-${pid}-${cid}" style="width:200px;">
        <input placeholder="URL https://..." id="url-${pid}-${cid}" style="width:300px;">
        <button class="remove-btn" onclick="removeChild(${pid},${cid})">X</button>
    `;

    document.getElementById("child-list-" + pid).appendChild(row);
}

function removeChild(pid, cid) {
    let row = document.getElementById(`child-${pid}-${cid}`);
    if (row) row.remove();
}

document.getElementById("generate").onclick = function () {

    let columns = [];

    for (let p = 1; p <= parentCount; p++) {
        let header = document.getElementById("ph-" + p);
        if (!header || !header.value.trim()) continue;

        let children = [];
        let max = childCounts[p];

        for (let c = 1; c <= max; c++) {
            let lbl = document.getElementById(`lbl-${p}-${c}`);
            let url = document.getElementById(`url-${p}-${c}`);

            if (lbl && url && lbl.value.trim() && url.value.trim()) {
                children.push({
                    label: lbl.value.trim(),
                    URL: url.value.trim()
                });
            }
        }

        columns.push({
            header: header.value.trim(),
            linklist: children
        });
    }

    let json = JSON.stringify({
        width: "1000px",
        mainHeader: "",
        imgOverride: "",
        columns: columns
    }, null, 4);

    let scriptText =
        "<script type=\"eptemplate/linklist\">\n" +
        json +
        "\n</script>";

    document.getElementById("output").value = scriptText;
};
