//obtener referencia del elemento
var btnActualizar = document.getElementById('btnActualizar');

//aregar un listener al boton
btnActualizar.addEventListener('click',actualizar);
/*
function actualizar()
{
  alert('actualizar listado');
}
*/
actualizar();
function actualizar()
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
  if (this.readyState == 4 && this.status == 200)
    {
      /*alert(this.responseText);*/
      var response = JSON.parse(this.responseText);
      if(response.status == "ok")
      {
        document.getElementsByTagName('tbody')[0].innerHTML = "";
        response.students.forEach(function(student)
        {
          /*alert(student.first_name);*/

          var row = document.createElement("tr");
          var idCell = document.createElement("td");
          var firstNameCell = document.createElement("td");
          var lastNameCell = document.createElement("td");

          var idText = document.createTextNode(student.id);
          var firstNameText = document.createTextNode(student.first_name);
          var lastNameText = document.createTextNode(student.last_name);

          idCell.appendChild(idText);
          firstNameCell.appendChild(firstNameText);
          lastNameCell.appendChild(lastNameText);

          row.appendChild(idCell);
          row.appendChild(firstNameCell);
          row.appendChild(lastNameCell);

          document.getElementsByTagName('tbody')[0].appendChild(row);

          /*
          var html= "<tr><td>"
            + student.id
            + "</td><td>"
            + student.first_name
            + "</td><td>"
            + student.last_name
            + "</td></tr>";
            document.getElementsByTagName('tbody')[0].appendChild(html);
            */
        });

      }
    }
  };
xhttp.open("GET","http://nyc.pixan.io/ajax/public/api/students", true);
xhttp.send();
}
