import PDFParser from 'pdf2json';

/**
 * Extract text from PDF buffer using pdf2json
 * @param {Buffer} fileBuffer - PDF file as buffer
 * @returns {Object} { success, text, pages } or { success: false, error }
 */
export async function extractTextFromPDF(fileBuffer) {
  return new Promise((resolve) => {
    try {
      const pdfParser = new PDFParser();
      
      // Handle parsing completion
      pdfParser.on('pdfParser_dataReady', (pdfData) => {
        try {
          // Extract text from all pages
          let fullText = '';
          let pageCount = 0;
          
          if (pdfData.Pages && Array.isArray(pdfData.Pages)) {
            pageCount = pdfData.Pages.length;
            
            pdfData.Pages.forEach((page) => {
              if (page.Texts && Array.isArray(page.Texts)) {
                page.Texts.forEach((text) => {
                  if (text.R && Array.isArray(text.R)) {
                    text.R.forEach((r) => {
                      if (r.T) {
                        // Decode URI component (pdf2json encodes text)
                        const decodedText = decodeURIComponent(r.T);
                        fullText += decodedText + ' ';
                      }
                    });
                  }
                });
              }
            });
          }
          
          // Clean extracted text
          fullText = fullText.replace(/\s+/g, ' ').trim();
          
          console.log(`PDF extracted: ${pageCount} pages, ${fullText.length} characters`);
          
          resolve({
            success: true,
            text: fullText,
            pages: pageCount,
            info: {}
          });
        } catch (error) {
          console.error('PDF data processing failed:', error);
          resolve({
            success: false,
            error: error.message
          });
        }
      });
      
      // Handle parsing errors
      pdfParser.on('pdfParser_dataError', (error) => {
        console.error('PDF parsing failed:', error);
        resolve({
          success: false,
          error: error.parserError || error.message || 'PDF parsing failed'
        });
      });
      
      // Parse the PDF buffer
      pdfParser.parseBuffer(fileBuffer);
      
    } catch (error) {
      console.error('PDF extraction failed:', error);
      resolve({
        success: false,
        error: error.message
      });
    }
  });
}
