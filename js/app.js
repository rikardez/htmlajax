//obtener referencia del elemento
var btnActualizar = document.getElementById('btnActualizar');
var btnGuardar = document.getElementById('btnGuardar');


//aregar un listener al boton
btnActualizar.addEventListener('click',actualizar);
btnGuardar.addEventListener('click', guardar);

actualizar();
function guardar()
{
  var xhttp = new XMLHttpRequest();
  var data = new FormData();
  var first_name = document.getElementById('first_name').value;
  var last_name = document.getElementById('last_name').value;
  var email = document.getElementById('email').value;
  var phone_number = document.getElementById('phone_number').value;

  data.append('first_name', first_name );
  data.append('last_name', last_name );
  data.append('email', email );
  data.append('phone_number', phone_number);

  xhttp.onreadystatechange = function()
  {
  if (this.readyState == 4 && this.status == 200)
    {

      var response = JSON.parse(this.responseText);
      if (response.status == "error")
      {
        alert( response.errors[0] );
      } else{
        //alert(this.responseText);
        alert("se guardò");
        if(response.status == "ok")
        {
          document.getElementById('first_name').value = '';
          document.getElementById('last_name').value = '';
          document.getElementById('email').value = '';
          document.getElementById('phone_number').value = '';

        }
      }
    }
  };
xhttp.open("POST","http://nyc.pixan.io/ajax/public/api/students", true);
xhttp.send(data);
}
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


          var html = "<tr><td>"
            + student.id
            + "</td><td>"
            + student.first_name
            + "</td><td>"
            + student.last_name
            + "</td><td><button idstudent=\"" + student.id
            + "\" class=\"eliminar\">&#9003; Borrar </button>"
            + "</td></tr>";
          document.getElementsByTagName('tbody')[0].innerHTML += html;
          var botonesEliminar = document.getElementsByClassName('eliminar');
          for (i=0 ; i<botonesEliminar.length ; i++)
          {
            console.log("x");
            botonesEliminar[i].addEventListener('click', eliminarUsuario(response.students[i]));
          }


        });

      }
    }
  };
xhttp.open("GET","http://nyc.pixan.io/ajax/public/api/students", true);
xhttp.send();
}
function eliminarUsuario(event)
{
  /*
  var data = new FormData();
  data.append('_method','DELETE');
  */

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function()
  {
    if( this.readyState==4 && this.status==200 )
    {
      console.log("y");
      //alert("se elimio ");
      event.target.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode);
    }
    xhr.open("DELETE","http://nyc.pixan.io/ajax/public/api/students/"+student.id, true);
    xhr.send();
  };

}
