import { BrevoTransport } from './brevo.transport.js'

const message = {
  from: { name: 'REM', address: 'sender@gmail.com' },
  to: [{ address: 'user@example.com' }],
  cc: [],
  bcc: [],
  replyTo: [],
  subject: 'REM: tasdiqlash kodi 123456',
  html: '<p>123456</p>',
  text: '123456',
}

describe('BrevoTransport', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('sends the message to the Brevo HTTPS API', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 201, json: () => Promise.resolve({ messageId: '<abc@brevo>' }) })
    vi.stubGlobal('fetch', fetchMock)

    const res = await new BrevoTransport('key-1').send(message as never, { signal: new AbortController().signal })

    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.brevo.com/v3/smtp/email')
    expect(init.headers['api-key']).toBe('key-1')
    expect(JSON.parse(init.body)).toEqual({
      sender: { email: 'sender@gmail.com', name: 'REM' },
      to: [{ email: 'user@example.com' }],
      subject: 'REM: tasdiqlash kodi 123456',
      htmlContent: '<p>123456</p>',
      textContent: '123456',
    })
    expect(res).toEqual({ accepted: ['user@example.com'], providerMessageId: '<abc@brevo>' })
  })

  it('throws with the Brevo error message when the API rejects the mail', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401, statusText: 'Unauthorized', json: () => Promise.resolve({ message: 'Key not found' }) }))
    await expect(new BrevoTransport('bad').send(message as never, { signal: new AbortController().signal })).rejects.toThrow('Brevo 401: Key not found')
  })
})
