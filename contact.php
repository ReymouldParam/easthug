<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect and sanitize data from form
    $name    = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email   = htmlspecialchars(trim($_POST['email'] ?? ''));
    $phone   = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));
    $privacy = isset($_POST['privacy']); // checkbox

    // If privacy not checked, stop execution
    if (!$privacy) {
        header("Location: contact.html?emailSuccess=false&reason=privacy");
        exit;
    }

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        header("Location: contact.html?emailSuccess=false&reason=missing_fields");
        exit;
    }

    // Email recipient
    $to = "naresh.narnapati@reymould.com";

    // Subject and body
    $subject = "Email Enquiry from shekarandco.com website";
    $body = "Name: $name\n"
          . "Email: $email\n"
          . "Phone: $phone\n"
          . "Message:\n$message";

    $headers = "From: $email\r\nReply-To: $email";

    // Send the email
    $emailSent = mail($to, $subject, $body, $headers);

    // Redirect with status
    if ($emailSent) {
        header("Location: contact.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>
