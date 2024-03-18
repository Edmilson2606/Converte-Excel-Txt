document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var fileInput = document.getElementById('excelFile');
    var file = fileInput.files[0];
    
    if (file) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });
            
            var firstSheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[firstSheetName];
            
            var csv = XLSX.utils.sheet_to_csv(worksheet, { header: 0 });
            
            // Converte o CSV em texto
            var txt = csv.replace(/,/g, '');
            
            // Cria um arquivo de texto e o faz o download
            var blob = new Blob([txt], { type: 'text/plain' });
            var downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = 'dados.txt';
            downloadLink.click();
        };
        
        reader.readAsArrayBuffer(file);
    } else {
        alert('Por favor, selecione um arquivo .xlsx');
    }
});