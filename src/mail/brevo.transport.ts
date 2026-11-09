import { MailTransport, type MailMessage } from '@nestjs/mail'

interface BrevoAddress {
  email: string
  name?: string
}

const toBrevo = (a: { address: string; name?: string }): BrevoAddress => (a.name ? { email: a.address, name: a.name } : { email: a.address })

export class BrevoTransport extends MailTransport {
  constructor(private readonly apiKey: string) {
    super()
  }

  async send(message: MailMessage, { signal }: { signal: AbortSignal }) {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      signal,
      headers: { 'api-key': this.apiKey, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        sender: toBrevo(message.from),
        to: message.to.map(toBrevo),
        ...(message.cc.length && { cc: message.cc.map(toBrevo) }),
        ...(message.bcc.length && { bcc: message.bcc.map(toBrevo) }),
        ...(message.replyTo[0] && { replyTo: toBrevo(message.replyTo[0]) }),
        subject: message.subject,
        ...(message.html && { htmlContent: message.html }),
        ...(message.text && { textContent: message.text }),
      }),
    })
    const body = (await res.json().catch(() => ({}))) as { messageId?: string; message?: string }
    if (!res.ok) {
      throw new Error(`Brevo ${res.status}: ${body.message ?? res.statusText}`)
    }
    return { accepted: message.to.map((a) => a.address), providerMessageId: body.messageId }
  }
}
