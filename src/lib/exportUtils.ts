/**
 * Client-side utility for exporting dynamic data to CSV and PDF formats.
 */

export const exportToCSV = (data: any[], filename: string) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.map(h => h.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())).join(","),
        ...data.map(row => 
            headers.map(header => {
                const val = row[header] === null || row[header] === undefined ? "" : String(row[header]);
                // Escape quotes and wrap in quotes if contains commas, newlines or quotes
                const escaped = val.replace(/"/g, '""');
                return `"${escaped}"`;
            }).join(",")
        )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportToPDF = (data: any[], title: string, headers?: string[]) => {
    if (!data || data.length === 0) return;
    
    const keys = Object.keys(data[0]);
    const displayHeaders = headers || keys.map(k => k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()));

    const htmlContent = `
        <html>
        <head>
            <title>${title}</title>
            <style>
                body { 
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
                    padding: 40px; 
                    color: #1e293b; 
                }
                h1 { 
                    font-size: 24px; 
                    margin-bottom: 4px; 
                    color: #0f172a; 
                    font-weight: 700;
                }
                p.meta { 
                    font-size: 12px; 
                    color: #64748b; 
                    margin-bottom: 24px; 
                }
                table { 
                    width: 100%; 
                    border-collapse: collapse; 
                    margin-top: 20px; 
                    font-size: 12px; 
                }
                th, td { 
                    border-bottom: 1px solid #e2e8f0; 
                    padding: 10px 12px; 
                    text-align: left; 
                }
                th { 
                    background-color: #f8fafc; 
                    font-weight: 600; 
                    color: #475569; 
                    text-transform: uppercase;
                    font-size: 10px;
                    letter-spacing: 0.05em;
                }
                tr:nth-child(even) { 
                    background-color: #f8fafc; 
                }
                @media print {
                    body { padding: 20px; }
                    button { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <p class="meta">Exported on ${new Date().toLocaleString()}</p>
            <table>
                <thead>
                    <tr>
                        ${displayHeaders.map(h => `<th>${h}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => `
                        <tr>
                            ${keys.map(k => {
                                const val = row[k];
                                const formattedVal = typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val ?? '');
                                return `<td>${formattedVal}</td>`;
                            }).join("")}
                        </tr>
                    `).join("")}
                </tbody>
            </table>
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() { window.close(); }, 500);
                }
            </script>
        </body>
        </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
        printWindow.document.write(htmlContent);
        printWindow.document.close();
    }
};
