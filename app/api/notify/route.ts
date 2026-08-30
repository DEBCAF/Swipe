import {NextResponse} from "next/server"
import {Resend} from "resend"

const allowedEvents = new Set(['Dinner Date', 'Shopping', 'Explore', 'Simple Walk', 'Brunch', 'Surprise Me'])

function escapeHTML(value: string) {
  return value.replace(/[&<>'"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&qout;',
  })[character]!)
}

export async function POST(request: Request) {
    try{
        if (!process.env.RESEND_API_KEY || !process.env.NOTIFICATION_EMAIL || !process.env.NOTIFICATION_FROM) {
            return NextResponse.json(
                {success: false, error: 'Notification not configured'},
                {status: 500}
            )
        }
        
        const {event, date, start_time, end_time, name} = await request.json()
        if (typeof event !== 'string' || !allowedEvents.has(event) || typeof name !== 'string'){
            return NextResponse.json({success: false, error: 'Invalid event'}, {status: 404})
        }

        const safe_name = escapeHTML(name)
        const safe_event = escapeHTML(event)
        const safe_date = escapeHTML(date)
        const safe_start_time = escapeHTML(start_time)
        const safe_end_time = escapeHTML(end_time)

        const subject = '[New Date Booking] ${safe_name} for ${event}'
        let htmlContent = `
            <h2>New Date Booking</h2>
            <p><strong>Name:</strong> ${safe_name}</p>
            <p><strong>Date:</strong> ${safe_date}</p>
            <p><strong>Event:</strong> ${safe_event}</p>
            <p><strong>Time:</strong> ${safe_start_time} - ${safe_end_time}</p>
        `

        const resend = new Resend(process.env.RESEND_API_KEY)
        const data = await resend.emails.send({
            from: process.env.NOTIFICATION_FROM,
            to: process.env.NOTIFICATION_EMAIL,
            subject: subject,
            html: htmlContent,
        })

        return NextResponse.json({success: true, data})
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to send notification'
        return NextResponse.json({success: false, error: message}, {status: 500})
    }
}