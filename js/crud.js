function clear_form(id) {
    document.getElementById('data-clave').value = '';
    document.getElementById('data-clase').value = '';
    document.getElementById('data-coreografo').value = '';
    document.getElementById('data-alumnos').value = '';
    document.getElementById('data-detail').value = '';
    if ( id === 1 ) {
        setTimeout(function() { alert('Cancelando ...');
        clean_result();
        }, 500);
        document.getElementById('cancelResult').innerHTML = `
        <div class="message-header">
        <p>Limpiando Forma</p>
        </div>
        <span style='color: red; align:center;'>Cancelando registro de la clase...</span>`;

    }
}

function clean_result () {
    document.getElementById('cancelResult').innerHTML='';
}

function save_record() {

    const items = document.getElementById("container").querySelectorAll(".input");
    
    let warning = `<article class="message is-primary">
                    <div class="message-header">
                        <p>Faltan Valores !!!</p>
                    </div>
                    `;
    let show_warning = 0;
    let field_warning = '';
    for ( const item of items ) {
          if ( item.value.length < 1 ) {
               if ( item.name === 'data-clave')       field_warning = 'Clave';
               if ( item.name === 'data-clase')       field_warning = 'Clase';
               if ( item.name === 'data-coreografo')  field_warning = 'Coreográfo';
               if ( item.name === 'data-alumnos')     field_warning = 'Alumnos';
               if ( item.name === 'data-detail')      field_warning = 'Detalle';
               warning += `<span class="message-body"> Debes llenar el campo ${field_warning}</span><br>`;
               show_warning = 1;
          }
    }

    if ( show_warning ) {
        warning += `</article>`;
        setTimeout(function() { alert('Revisar campos faltantes ...');
        clean_result_save();
        }, 500);
        document.getElementById('saveResult').innerHTML = `${warning}`;
    }
    else {
        alert("Guardando Datos ...");
        let clave = '';
        let clase = '';
        let coreografo = '';
        let alumnos = '';
        let detail = '';
        let data = `<table class="table">
                    <thead>
                       <th>Clave</th>
                       <th>Clase</th>
                       <th>Coreográfo</th>
                       <th>Alumnos</th>
                       <th>Detalle</th>
                    </thead>
                    <tbody>`;
        for ( const item of items ) {
              if ( item.name === 'data-clave') {
                   clave = item.value;
                   data += `<tr>
                            <td>${clave}</td>`;
              }
              if ( item.name === 'data-clase') {
                   clase = item.value;
                   data += `<td>${clase}</td>`;
              }
              if ( item.name === 'data-coreografo') {
                   coreografo = item.value;
                   data += `<td>${coreografo}</td>`;
              }
              if ( item.name === 'data-alumnos') {
                   alumnos = item.value;
                   data += `<td>${alumnos}</td>`;
              }
              if ( item.name === 'data-detail') {
                   detail = item.value;
                   data += `<td>${detail}</td>
                            </tr>`;
              }
              let myItem = {
                  clave: clave,
                  clase: clase,
                  coreografo: coreografo,
                  alumnos: alumnos,
                  detail: detail
              }
              localStorage.setItem(clave, JSON.stringify(myItem));
        }
        data += `<tr>
                </tbody>
                </table>`;
        document.getElementById('saveResult').innerHTML = `${data}`;
        clear_form(2);
    }
}

function show_data() {
    let data = `<table class="table">
    <thead>
       <th>Clave</th>
       <th>Clase</th>
       <th>Coreográfo</th>
       <th>Alumnos</th>
       <th>Detalle</th>
       <th>Modificar</th>
       <th>Eliminar</th>
    </thead>
    <tbody>`;

    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let guardado = JSON.parse(localStorage.getItem(key));
        //alert(`${key}: ${localStorage.getItem(key)}`);
        //console.log('objeto:', guardado.clase);
        data += `<tr>
                    <td>${guardado.clave}</td>
                    <td>${guardado.clase}</td>
                    <td>${guardado.coreografo}</td>
                    <td>${guardado.alumnos}</td>
                    <td>${guardado.detail}</td>
                    <td><button class="button is-info is-small" id = "data-edit" name ="data-edit" onclick="edit_data(${i}); return false;">Editar</button></td>
                    <td><button class="button is-info is-small" id = "data-delete" name ="data-delete" onclick="delete_data(${i}); return false;">Eliminar</button></td>
                 </tr>`;
    }
    data += `<tr>
    </tbody>
    </table>`;
    document.getElementById('saveResult').innerHTML = `${data}`;
}


function edit_data(item) {

         let key = localStorage.key(item);

         let guardado = JSON.parse(localStorage.getItem(key));

         document.getElementById("data-clave").value = guardado.clave;
         document.getElementById("data-clase").value = guardado.clase;
         document.getElementById("data-coreografo").value = guardado.coreografo;
         document.getElementById("data-alumnos").value = guardado.alumnos;
         document.getElementById("data-detail").value = guardado.detail;
}

function delete_data(item) {
    let key = localStorage.key(item);
    localStorage.removeItem(key);
    show_data();
}

function clearLocalStorage() {
    localStorage.clear();
    document.getElementById('saveResult').innerHTML = '';
}

function clean_result_save () {
    document.getElementById('saveResult').innerHTML='';
}