export default class AppGlobal {

    constructor(){

    }

    notificationSwal(message,type){
        Swal.fire({
            text:message,
            icon: type,
            timer:1000,
            timerProgressBar: true
        }).then((result)=>{
            location.reload();
        });
    }

    requestAxios(url,method,data){
        axios({
            url:url,
            method:method,
            data:data
        })
        .then(response=>{
            console.log(response.data)
            this.notificationSwal(response.data,'success')
        })
        .catch(error=>{
            console.log(error)
            this.notificationSwal(error,'error')
        })
    }

    validator(element){
        if(element!='' && element!=0){
            return true;
        }
        return false
    }
}