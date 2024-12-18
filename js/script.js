$(document).ready(function() {
    $('#submitOrder').click(function() {
        let isValid = true;

        // Xóa thông báo trước đó
        $('.invalid-feedback').text('').hide();
        $('.form-control').removeClass('is-invalid');

        // Kiểm tra Họ và Tên
        const fullName = $('#fullName').val();
        const namePattern = /^[A-Z][a-z]*(?: [A-Z][a-z]*){1,}$/;
        if (!fullName || !namePattern.test(fullName)) {
            $('#fullName').addClass('is-invalid');
            $('#fullName').siblings('.invalid-feedback').text('Họ và tên không hợp lệ.').show();
            isValid = false;
        }

        // Kiểm tra Số Điện Thoại
        const phone = $('#phone').val();
        const phonePattern = /^0\d{3}\.\d{3}\.\d{3}$/;
        if (!phone || !phonePattern.test(phone)) {
            $('#phone').addClass('is-invalid');
            $('#phone').siblings('.invalid-feedback').text('Số điện thoại không hợp lệ.').show();
            isValid = false;
        }

        // Kiểm tra Ngày Đặt
        const orderDate = new Date($('#orderDate').val());
        const today = new Date();
        if (!orderDate || orderDate <= today) {
            $('#orderDate').addClass('is-invalid');
            $('#orderDate').siblings('.invalid-feedback').text('Ngày đặt phải sau ngày hiện tại.').show();
            isValid = false;
        }

        // Kiểm tra Email
        const email = $('#email').val();
        const emailPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{3,}@iuh\.edu\.vn$/;
        if (!email || !emailPattern.test(email)) {
            $('#email').addClass('is-invalid');
            $('#email').siblings('.invalid-feedback').text('Email không hợp lệ.').show();
            isValid = false;
        }

        // Kiểm tra Loại Hoa
        if (!$('#flowerType').val()) {
            $('#flowerType').addClass('is-invalid');
            $('#flowerType').siblings('.invalid-feedback').text('Bạn phải chọn loại hoa.').show();
            isValid = false;
        }

        // Kiểm tra Loại Thanh Toán
        if (!$('input[name="paymentMethod"]:checked').val()) {
            $('input[name="paymentMethod"]').first().siblings('.invalid-feedback').text('Bạn phải chọn loại thanh toán.').show();
            isValid = false;
        }

        if (isValid) {
            // Thu thập dữ liệu và thêm vào bảng
            const rowCount = $('table tbody tr').length;
            $('table tbody').append(`
                <tr>
                    <td>${rowCount + 1}</td>
                    <td>${fullName}</td>
                    <td>${phone}</td>
                    <td>${$('#orderDate').val()}</td>
                    <td>${email}</td>
                    <td>${$('#flowerType').val()}</td>
                    <td>${$('input[name="paymentMethod"]:checked').val()}</td>
                </tr>
            `);
            $('#orderModal').modal('hide');
            $('#orderForm')[0].reset(); // Đặt lại form
        }
    });
});