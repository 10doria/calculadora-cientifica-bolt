const Alert = `<script>
function SuccessAlert(){
    Swal.fire({
        title: 'Bolt Alert',
        text: 'Success Alert is Working!',
        icon: 'success',
        confirmButtonText: 'Cool',
        confirmButtonColor: '#021c3d'
      })
}
function ErrorAlert(){
    Swal.fire({
        title: 'Bolt Alert',
        text: 'Error Alert is Working!',
        icon: 'error',
        confirmButtonText: 'Cool',
        confirmButtonColor: '#021c3d'
      })
}
function infoAlert(){
    Swal.fire({
        title: 'Bolt Alert',
        text: 'Info Alert is Working!',
        icon: 'info',
        confirmButtonText: 'Cool',
        confirmButtonColor: '#021c3d'
      })
}


</script>
`;


module.exports = Alert;