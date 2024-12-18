import Swal from 'sweetalert2';

export async function deleteDataAlert() {
  return Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!"
  });
}

export const showSuccessAlert = (titleMessage, message) => {
  Swal.fire({
    title: titleMessage,
    text: message,
    icon: 'success',
    confirmButtonColor: '#3085d6'
  });
};

export const showErrorAlert = (titleMessage, message) => {
  Swal.fire({
    title: titleMessage,
    text: message,
    icon: 'error',
    confirmButtonColor: '#d33'
  });
};