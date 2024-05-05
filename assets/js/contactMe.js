const submitHandler = () => {
  let nama = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let subject = document.getElementById("subject").value;

  if (subject!="let's collaboration") {
    let subject = " let's"+ document.getElementById("subject").value;
  }
  
  let message = document.getElementById("message").value;

  if (nama == "") {
    return alert("isi kolom nama");
  } else if (email == "") {
    return alert("isi kolom email");
  } else if (phoneNumber == "") {
    return alert("isi kolom nomor telepon");
  } else if (subject == "") {
    return alert("isi kolom subject");
  } else if (message == "") {
    return alert("isi kolom message");
  }

  const myEmail = "aditdwiramadhan@students.unnes.ac.id"

  let data = {
    nama,
    email,
    phoneNumber,
    subject,
    message,
  };

  // Membuat elemen <a> baru
  let a = document.createElement("a");
  // Mengatur atribut href ke URL yang valid
  a.href = `https://mail.google.com/mail?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${message}`
  a.target = "_blank"

  // Melakukan klik otomatis
  a.click();
};
