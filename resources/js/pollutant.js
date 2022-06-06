import AppGlobal from '../js/app.js'


let services=new AppGlobal()

document.getElementById('btnCancelPollutant')
.addEventListener('click',Clear)
document.getElementById('btnCancelarPollutant')
.addEventListener('click',Clear)

document.getElementById('formStorePullatant')
.addEventListener('submit',e =>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    let url='/pollutant/store'
    let method='POST'
    let dat={
        name:data.name,
        description:data.description
    }
    services.requestAxios(url,method,dat)
})

function Clear(){
    document.getElementById('txtNamePollutantEdit').value='';
    document.getElementById('txtDescriptionPollutantEdit').value='';
    document.getElementById('name').value='';
    document.getElementById('description').value='';
}