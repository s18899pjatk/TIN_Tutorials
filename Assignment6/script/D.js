const addRow = (tableID) => {
  let table = document.getElementById(tableID);
  let rowCount = table.rows.length;
  let row = table.insertRow(rowCount);

  let cell1 = row.insertCell(0);
  cell1.innerHTML = rowCount + 1;

  let cell2 = row.insertCell(1);
  let element2 = document.createElement("input");
  element2.value = document.getElementById("txt").value;
  cell2.appendChild(element2);
};
