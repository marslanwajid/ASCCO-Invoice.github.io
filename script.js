       
    let rowIndex = 1;

function addRow() {
    const tableBody = document.getElementById('table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${rowIndex}</td>
        <td><input autocomplete="off" type="text" class="description" placeholder="Description"></td>
        <td><input type="number" class="quantity" value="1" oninput="updateTotal(this)"></td>
        <td><input type="number" class="price" value="" placeholder="Price" oninput="updateTotal(this)"></td>
        <td><input type="number" class="total" value="" readonly></td>
        <td class="actions">
            <button id="actionbtn" onclick="removeRow(this)">Remove Row</button>
        </td>
    `;
    tableBody.appendChild(row);
    rowIndex++;
    updateTotals();
}

function removeRow(button) {
    const row = button.closest('tr');
    const index = Array.from(row.parentNode.children).indexOf(row);
    row.remove();
    rowIndex--;

    // Reindex all rows after the removed row
    const rows = document.querySelectorAll('#table-body tr');
    rows.forEach((row, index) => {
        row.querySelector('td:first-child').textContent = index + 1;
    });

    updateTotals();
}

function updateTotal(input) {
    const row = input.closest('tr');
    const quantity = row.querySelector('.quantity');
    const price = row.querySelector('.price');
    const totalEl = row.querySelector('.total');
    totalEl.value = price.value * quantity.value;
    updateTotals();
}

function updateTotals() {
    const rows = document.querySelectorAll('#table-body tr');
    let total = 0;
    rows.forEach(row => {
        const totalEl = row.querySelector('.total');
        total += parseFloat(totalEl.value || 0); // Convert empty string to 0
    });
    document.querySelector('#subtotal').value = total.toFixed(2);
    const vat = total * 0.15;
    document.querySelector('#vat').value = vat.toFixed(2);
    document.querySelector('#grand-total').value = (total + vat).toFixed(2);
}

function printInvoice() {
    window.print();
}