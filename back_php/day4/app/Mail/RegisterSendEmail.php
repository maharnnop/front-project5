<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Attachment;


use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Tip\Register;// add use model

class RegisterSendEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $email;
    public $username;
    public $password;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email,$username,$password)
    {
        $this->email = $email;
        $this->password = $password;
        $this->username = $username;
    }
    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Thank you for signup to our app')
        ->markdown('email.register-send-email')
        ->with("username",$this->username)
        ->with('password',$this->password);
    }
    /**
     * Get the attachments for the message.
     *
     * @return \Illuminate\Mail\Mailables\Attachment[]
     */
    public function attachments()
    {
        // $registers = Register::all()->toArray();

        // $pdf = Pdf::loadView('pdf.test', array('registers' => $registers));
        // return [
        //     Attachment::fromData(fn () => $pdf->output(), 'Report.pdf')
        // ];
    }
}
