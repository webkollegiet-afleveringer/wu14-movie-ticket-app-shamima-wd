import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Pdf({ setShowPopup }) {
   const handleDownload = () => {
      const ticketElement = document.querySelector('.eticket-content__details');
      
      if (ticketElement) {
         const downloadButton = document.querySelector('.eticket-content__button');
         if (downloadButton) {
            downloadButton.style.display = 'none';
         }

         html2canvas(ticketElement, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#1b1e25',
            width: ticketElement.scrollWidth,
            height: ticketElement.scrollHeight
         }).then(canvas => {
            if (downloadButton) {
               downloadButton.style.display = 'block';
            }

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
               orientation: 'portrait',
               unit: 'mm',
               format: 'a4'
            });

            const imgWidth = 160;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            const x = (210 - imgWidth) / 2;
            const y = 30;
            
            pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
            
            const orderId = Math.floor(Math.random() * 9000000) + 1000000;
            pdf.save(`e-ticket-${orderId}.pdf`);
            
            setShowPopup(true);
         }).catch(error => {
            if (downloadButton) {
               downloadButton.style.display = 'block';
            }
            console.error('Error generating PDF:', error);
         });
      }
   };

   return (
     <div className="eticket-content__button">  
       <button className="download-button" onClick={handleDownload}>
         Download E-Ticket
       </button>
     </div>
   );
}


export default Pdf;