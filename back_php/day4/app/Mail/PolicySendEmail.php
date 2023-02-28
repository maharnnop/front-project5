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

class PolicySendEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $email;
    public $datas;
    // public $password;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email,$datas)
    {
        $this->email = $email;
        $this->datas = $datas;

    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function build()
    {
        // dd($this->datas);
        return $this->subject('Thank you for buy our insure')
        ->markdown('email.policy-send-email')
        ->with("datas",$this->datas);
    }

    /**
     * Get the attachments for the message.
     *
     * @return \Illuminate\Mail\Mailables\Attachment[]
     */
    public function attachments()
    {
        $registers = Register::all()->toArray();


        $pdf = Pdf::loadView('pdf.test', array('datas' => $this->datas));
        return [
            Attachment::fromData(fn () => $pdf->output(), 'Report.pdf')
        ];
    }
}
