import axios from 'axios'

export interface EmailNotification {
  to: string | string[]
  subject: string
  template?: string
  templateData?: Record<string, any>
  html?: string
  text?: string
  attachments?: {
    filename: string
    content: string | Buffer
    contentType?: string
  }[]
}

// SendGrid Email Service
export class SendGridEmailService {
  private apiKey = process.env.SENDGRID_API_KEY

  async sendEmail(notification: EmailNotification) {
    if (!this.apiKey) {
      console.warn('SendGrid API key not configured')
      return { success: false, error: 'SendGrid not configured' }
    }

    try {
      const response = await axios.post(
        'https://api.sendgrid.com/v3/mail/send',
        {
          personalizations: [
            {
              to: Array.isArray(notification.to)
                ? notification.to.map((email) => ({ email }))
                : [{ email: notification.to }],
              dynamicTemplateData: notification.templateData,
            },
          ],
          from: { email: 'noreply@travelai.com', name: 'TravelAI' },
          subject: notification.subject,
          ...(notification.template && { templateId: notification.template }),
          ...(notification.html && {
            content: [
              {
                type: 'text/html',
                value: notification.html,
              },
            ],
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      )

      return { success: true, messageId: response.data }
    } catch (error) {
      console.error('SendGrid email error:', error)
      throw error
    }
  }

  async sendBookingConfirmation(email: string, bookingData: any) {
    return this.sendEmail({
      to: email,
      subject: '✈️ Booking Confirmation - TravelAI',
      template: 'd-booking-confirmation',
      templateData: {
        bookingId: bookingData.id,
        destination: bookingData.destination,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        totalAmount: bookingData.totalAmount,
        hotelName: bookingData.hotelName,
      },
    })
  }

  async sendTripReminder(email: string, tripData: any) {
    return this.sendEmail({
      to: email,
      subject: '📍 Your Trip is Coming Up - TravelAI',
      template: 'd-trip-reminder',
      templateData: {
        tripName: tripData.destination,
        startDate: tripData.startDate,
        daysUntil: tripData.daysUntil,
      },
    })
  }

  async sendPriceAlert(email: string, priceAlertData: any) {
    return this.sendEmail({
      to: email,
      subject: '💰 Price Drop Alert - TravelAI',
      template: 'd-price-alert',
      templateData: {
        destination: priceAlertData.destination,
        oldPrice: priceAlertData.oldPrice,
        newPrice: priceAlertData.newPrice,
        savings: priceAlertData.oldPrice - priceAlertData.newPrice,
      },
    })
  }

  async sendItineraryDownload(email: string, itineraryUrl: string) {
    return this.sendEmail({
      to: email,
      subject: '📅 Your Itinerary is Ready - TravelAI',
      template: 'd-itinerary-download',
      templateData: {
        downloadUrl: itineraryUrl,
      },
    })
  }
}

// AWS SES Email Service
export class AWSSESEmailService {
  private region = process.env.AWS_SES_REGION || 'us-east-1'

  async sendEmail(notification: EmailNotification) {
    try {
      const response = await axios.post('/api/email/send', {
        to: notification.to,
        subject: notification.subject,
        html: notification.html,
        text: notification.text,
        attachments: notification.attachments,
      })

      return { success: true, messageId: response.data.messageId }
    } catch (error) {
      console.error('AWS SES email error:', error)
      throw error
    }
  }

  async sendBookingConfirmation(email: string, bookingData: any) {
    const html = `
      <h2>Booking Confirmation</h2>
      <p>Thank you for booking with TravelAI!</p>
      <table>
        <tr><td>Booking ID:</td><td>${bookingData.id}</td></tr>
        <tr><td>Destination:</td><td>${bookingData.destination}</td></tr>
        <tr><td>Hotel:</td><td>${bookingData.hotelName}</td></tr>
        <tr><td>Check-in:</td><td>${bookingData.checkIn}</td></tr>
        <tr><td>Check-out:</td><td>${bookingData.checkOut}</td></tr>
        <tr><td>Total Amount:</td><td>₹${bookingData.totalAmount}</td></tr>
      </table>
      <p>We look forward to your trip!</p>
    `

    return this.sendEmail({
      to: email,
      subject: '✈️ Booking Confirmation - TravelAI',
      html,
    })
  }

  async sendTripReminder(email: string, tripData: any) {
    const html = `
      <h2>Your Trip is Coming Up!</h2>
      <p>Don't forget about your trip to ${tripData.destination}!</p>
      <p>Your trip starts in ${tripData.daysUntil} days.</p>
      <p><a href="https://travelai.com/trips/${tripData.tripId}">View Trip Details</a></p>
    `

    return this.sendEmail({
      to: email,
      subject: '📍 Your Trip is Coming Up - TravelAI',
      html,
    })
  }

  async sendPriceAlert(email: string, priceAlertData: any) {
    const html = `
      <h2>Price Drop Alert!</h2>
      <p>Great news! The price for ${priceAlertData.destination} has dropped!</p>
      <p>Old Price: ₹${priceAlertData.oldPrice}</p>
      <p><strong>New Price: ₹${priceAlertData.newPrice}</strong></p>
      <p>You're saving ₹${priceAlertData.oldPrice - priceAlertData.newPrice}!</p>
    `

    return this.sendEmail({
      to: email,
      subject: '💰 Price Drop Alert - TravelAI',
      html,
    })
  }
}

// Notification Manager
export class NotificationManager {
  private emailService: SendGridEmailService | AWSSESEmailService

  constructor(provider: 'sendgrid' | 'aws-ses' = 'sendgrid') {
    if (provider === 'sendgrid') {
      this.emailService = new SendGridEmailService()
    } else {
      this.emailService = new AWSSESEmailService()
    }
  }

  async sendBookingConfirmation(email: string, bookingData: any) {
    try {
      return await this.emailService.sendBookingConfirmation(email, bookingData)
    } catch (error) {
      console.error('Error sending booking confirmation:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async sendTripReminder(email: string, tripData: any) {
    try {
      return await this.emailService.sendTripReminder(email, tripData)
    } catch (error) {
      console.error('Error sending trip reminder:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async sendPriceAlert(email: string, priceAlertData: any) {
    try {
      return await this.emailService.sendPriceAlert(email, priceAlertData)
    } catch (error) {
      console.error('Error sending price alert:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  async sendCustomEmail(notification: EmailNotification) {
    try {
      return await this.emailService.sendEmail(notification)
    } catch (error) {
      console.error('Error sending custom email:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }
}

export const sendGridService = new SendGridEmailService()
export const awsSesService = new AWSSESEmailService()
export const notificationManager = new NotificationManager('sendgrid')
