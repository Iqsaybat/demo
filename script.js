function generateQRCode() {
    const inputText = document.getElementById('text-input').value;
    if (inputText !== '') {
        QRCode.toDataURL(inputText, function (err, url) {
            if (err) {
                console.error(err);
                return;
            }
            document.getElementById('qr-code-img').src = url;
            window.qrCodeDataURL = url; // Save the URL globally for PDF and PNG generation
        });
    } else {
        alert('Please enter a URL or text to generate a QR code.');
    }
}

function printPDF() {
    if (!window.qrCodeDataURL) {
        alert('Please generate a QR code first.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Add the QR code image to the PDF
    pdf.addImage(window.qrCodeDataURL, 'PNG', 15, 40, 80, 80); // Increased size for better readability

    // Save the PDF
    pdf.save('QR_Code.pdf');
}

function downloadPNG() {
    if (!window.qrCodeDataURL) {
        alert('Please generate a QR code first.');
        return;
    }

    // Create a link element, use it to download the PNG, and remove it when done
    const downloadLink = document.createElement('a');
    downloadLink.href = window.qrCodeDataURL;
    downloadLink.download = 'QR_Code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
