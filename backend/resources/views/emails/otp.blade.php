<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mã xác thực OTP</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 32px;
            font-weight: bold;
            color: #ff6b35;
            margin-bottom: 10px;
        }
        .otp-box {
            background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-code {
            font-size: 48px;
            font-weight: bold;
            letter-spacing: 8px;
            margin: 10px 0;
        }
        .content {
            color: #555;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #888;
            font-size: 14px;
        }
        .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🎬 Vie Cinema</div>
            <h2 style="color: #333; margin: 0;">Xác thực tài khoản của bạn</h2>
        </div>

        <div class="content">
            <p>Xin chào,</p>
            <p>Bạn đã đăng ký tài khoản tại <strong>Vie Cinema</strong>. Vui lòng sử dụng mã OTP bên dưới để hoàn tất quá trình đăng ký:</p>
        </div>

        <div class="otp-box">
            <div style="font-size: 18px; margin-bottom: 10px;">Mã xác thực OTP của bạn là:</div>
            <div class="otp-code">{{ $otp }}</div>
            <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">Mã có hiệu lực trong 10 phút</div>
        </div>

        <div class="warning">
            <strong>⚠️ Lưu ý:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Không chia sẻ mã OTP này với bất kỳ ai</li>
                <li>Vie Cinema sẽ không bao giờ yêu cầu mã OTP qua điện thoại</li>
                <li>Nếu bạn không thực hiện đăng ký này, vui lòng bỏ qua email</li>
            </ul>
        </div>

        <div class="content">
            <p>Nếu bạn gặp vấn đề gì, vui lòng liên hệ với chúng tôi qua email hoặc hotline hỗ trợ.</p>
            <p style="margin-top: 20px;">Trân trọng,<br><strong>Đội ngũ Vie Cinema</strong></p>
        </div>

        <div class="footer">
            <p>Email này được gửi tự động, vui lòng không trả lời.</p>
            <p>&copy; {{ date('Y') }} Vie Cinema. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
