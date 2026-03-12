<?php

namespace App\Services;

use Microsoft\Graph\GraphServiceClient;
use Microsoft\Kiota\Authentication\Oauth\ClientCredentialContext;
use Microsoft\Graph\Generated\Users\Item\SendMail\SendMailPostRequestBody;
use Microsoft\Graph\Generated\Models\Message;
use Microsoft\Graph\Generated\Models\Recipient;
use Microsoft\Graph\Generated\Models\EmailAddress;
use Microsoft\Graph\Generated\Models\ItemBody;
use Microsoft\Graph\Generated\Models\BodyType;

class MicrosoftGraphMailer
{
    protected $graphClient;
    protected $senderEmail;

    public function __construct()
    {
        $tenantId = config('services.microsoft_graph.tenant_id');
        $clientId = config('services.microsoft_graph.client_id');
        $clientSecret = config('services.microsoft_graph.client_secret');
        $this->senderEmail = config('services.microsoft_graph.sender_email');

        if (!$tenantId || !$clientId || !$clientSecret || !$this->senderEmail) {
            \Log::warning('Microsoft Graph credentials are not fully configured in .env. Emails will not be sent.');
            $this->graphClient = null;
            return;
        }

        $tokenRequestContext = new ClientCredentialContext(
            (string) $tenantId,
            (string) $clientId,
            (string) $clientSecret
        );

        $this->graphClient = new GraphServiceClient($tokenRequestContext);
    }

    /**
     * Enviar correo usando Microsoft Graph API
     */
    public function send($to, $subject, $body, $isHtml = true)
    {
        if (!$this->graphClient) {
            \Log::warning("Skipping email test due to missing Azure config. Would have sent to: {$to}");
            return false;
        }

        try {
            $message = new Message();
            $message->setSubject($subject);

            $messageBody = new ItemBody();
            $messageBody->setContentType(new BodyType($isHtml ? 'html' : 'text'));
            $messageBody->setContent($body);
            $message->setBody($messageBody);

            $toRecipient = new Recipient();
            $toEmailAddress = new EmailAddress();
            $toEmailAddress->setAddress($to);
            $toRecipient->setEmailAddress($toEmailAddress);
            $message->setToRecipients([$toRecipient]);

            $requestBody = new SendMailPostRequestBody();
            $requestBody->setMessage($message);
            $requestBody->setSaveToSentItems(true);

            $this->graphClient->users()
                ->byUserId((string) $this->senderEmail)
                ->sendMail()
                ->post($requestBody)
                ->wait();

            return true;
        } catch (\Microsoft\Graph\Generated\Models\ODataErrors\ODataError $e) {
            $errorMessage = 'Microsoft Graph ODataError: ';
            if ($e->getError()) {
                $errorMessage .= $e->getError()->getMessage() ?? 'Unknown error';
                $errorMessage .= ' (Code: ' . ($e->getError()->getCode() ?? 'N/A') . ')';
            }
            \Log::error($errorMessage);
            throw new \Exception($errorMessage);
        } catch (\Exception $e) {
            \Log::error('Error enviando correo con Microsoft Graph: ' . $e->getMessage());
            throw $e;
        }
    }
}
