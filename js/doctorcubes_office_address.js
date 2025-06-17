function changeOffice() {
    const officeSelect = document.getElementById('officeSelect');
    const streetAddress = document.getElementById('streetAddress');
    const emailAddress = document.getElementById('emailAddress');
    const phoneNumber = document.getElementById('phoneNumber');
    
    switch(officeSelect.value) {
        case 'moscow':
            // Russia Adr
            streetAddress.textContent = ' Бульвар строителей 43  Кемерово Россия';
            emailAddress.textContent = 'doctorscube71@gmail.com';
            phoneNumber.textContent = '+91 7517036564';
            break;
        case 'spb':
            //india
            streetAddress.textContent = 'Kranti chowk,near santh eknath mandir above Punjab and Sindh bank 2nd floor Aurangabad Maharashtra 431003';
            emailAddress.textContent = 'doctorscube71@gmail.com';
            phoneNumber.textContent = '+91 7517036564';
            break;
        case 'kazan':
            streetAddress.textContent = 'Faridabad Delhi Haryana';
            emailAddress.textContent = 'doctorscube71@gmail.com';
            phoneNumber.textContent = '+91 7517036564';
            break;
    }
}
