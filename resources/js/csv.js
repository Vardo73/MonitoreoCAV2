let selectedFile;

let data=[{
    "name":"jayanth",
    "data":"scd",
    "abc":"sdef"
}]

let btnCreaEstacion = document.getElementById('LeerCSV');

document.getElementById('csvfile').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
});

let InicioEstacionPage=function(){
    btnCreaEstacion.addEventListener('click', LeerCSV);
}


function LeerCSV(){
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if(selectedFile){
        let fileReader = new FileReader();

        fileReader.readAsBinaryString(selectedFile);

        fileReader.onload = (event)=>{
         let data = event.target.result;

         let workbook = XLSX.read(data,{type:"binary"});

         //console.log(workbook);

         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
              //console.log(rowObject);
              document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4);
         });
        }
    }
}


window.onload = InicioEstacionPage;