//Obtener los td
window.onload= function(){
    let td=document.querySelectorAll('td')
    td.forEach(element=>{
        let average=parseFloat(element.textContent)

        if (element.classList.contains('tdpm2')) {
            //PM 2.5
            if(average>250.5){
                element.classList.add('tdMMM')
            }else if(average>150.5){
                element.classList.add('tdEM')
            }else if(average>55.5){
                element.classList.add('tdMM')
            }else if(average>35.5){
                element.classList.add('tdM')
            }else if(average>12.1){
                element.classList.add('tdA')
            }else{
                element.classList.add('tdG')
            }
        }else if(element.classList.contains('tdpm10')){
            //PM 10
            if(average>425){
                element.classList.add('tdMMM')
            }else if(average>355){
                element.classList.add('tdEM')
            }else if(average>255){
                element.classList.add('tdMM')
            }else if(average>155){
                element.classList.add('tdM')
            }else if(average>55){
                element.classList.add('tdA')
            }else{
                element.classList.add('tdG')
            }
        }
    })
    /*
    const myModalEl = document.querySelector('#ModalAlertStations')

    const modal = new bootstrap.Modal(myModalEl) // initialized with defaults
    modal.show()
    */
}


document.getElementById('selectStation')
.addEventListener('change',()=>{
    let station=document.getElementById('selectStation').value;
    window.location.replace(`/historics/${station}`);
})

