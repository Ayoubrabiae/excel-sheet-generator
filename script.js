let alertEl = document.createElement("div");
alertEl.className = "alert";
let rowsInp = document.createElement("input");
rowsInp.type = "number";
rowsInp.placeholder = "Enter number of rows";
rowsInp.className = "rowsInp";

let columnsInp = document.createElement("input");
columnsInp.type = "number";
columnsInp.placeholder = "Enter number of columns";
columnsInp.className = "columnsInp";

alertEl.appendChild(rowsInp);
alertEl.appendChild(columnsInp);

let table = document.getElementsByClassName("sheet-body")[0];
let okGenBtn = document.getElementsByClassName("swal-button");
tableExists = false;

const generateTable = () => {
  swal({ content: alertEl });
  console.log(okGenBtn[0]);

  okGenBtn[0].onclick = () => {
    let rowsNumber = parseInt(rowsInp.value),
      columnsNumber = parseInt(columnsInp.value);
    table.innerHTML = "";
    for (let i = 0; i < rowsNumber; i++) {
      var tableRow = "";
      for (let j = 0; j < columnsNumber; j++) {
        tableRow += `<td contenteditable></td>`;
      }
      table.innerHTML += tableRow;
    }
    if (rowsNumber > 0 && columnsNumber > 0) {
      tableExists = true;
    }
  };
};

const ExportToExcel = (type, fn, dl) => {
  if (!tableExists) {
    generateTable();
    return;
  }
  var elt = table;
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "MyNewSheet." + (type || "xlsx"));
};
